import { NextResponse } from "next/server";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Single-instance, in-memory rate limiting — enough for this app's zero-infra
// scope (no Redis/external store); resets on server restart, which is fine here.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

interface GenerateRequestBody {
  messages?: { role: "system" | "user"; content: string }[];
  maxNewTokens?: number;
}

interface GeminiPart {
  text?: string;
}

/** Server-side only: the actual GEMINI_API_KEY never reaches the browser.
 * Returns 501 when no key is configured so the client falls back to the free
 * in-browser model instead of breaking. */
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ available: false }, { status: 501 });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: GenerateRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "invalid_messages" }, { status: 400 });
  }

  const systemText = body.messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n");
  const userContents = body.messages
    .filter((m) => m.role === "user")
    .map((m) => ({ role: "user", parts: [{ text: m.content }] }));

  if (userContents.length === 0) {
    return NextResponse.json({ error: "invalid_messages" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          ...(systemText ? { systemInstruction: { parts: [{ text: systemText }] } } : {}),
          contents: userContents,
          generationConfig: { maxOutputTokens: body.maxNewTokens ?? 800 },
        }),
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const data = await response.json();
    const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
