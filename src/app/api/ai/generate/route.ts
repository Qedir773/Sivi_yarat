import { NextResponse } from "next/server";
import { z } from "zod";
import { callOpenRouterChat, type ChatMessage } from "@/lib/openrouter";

const MAX_BODY_BYTES = 1024 * 1024; // 1 MB hard cap

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1).max(8000),
});

const generateBodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
  maxNewTokens: z.number().int().min(1).max(2000).optional(),
});

/**
 * POST /api/ai/generate
 * Body: { messages: ChatMessage[], maxNewTokens?: number }
 *
 * Proxies the request to OpenRouter (https://openrouter.ai), which routes
 * to whichever free model is configured. The actual API key never leaves
 * the server. Returns 501 when no key is configured so the client falls
 * back to a clear "configure OPENROUTER_API_KEY" message in the UI.
 */
export async function POST(request: Request) {
  // Body size cap (cheap, runs before JSON parse)
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  // Rate limit (in-memory per-instance — fine for this app's scope)
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let parsed: z.infer<typeof generateBodySchema>;
  try {
    const json = await request.json();
    const result = generateBodySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: "invalid_body", issues: result.error.issues },
        { status: 400 },
      );
    }
    parsed = result.data;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  try {
    const text = await callOpenRouterChat(
      parsed.messages as ChatMessage[],
      { maxTokens: parsed.maxNewTokens },
    );
    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "network_error";
    if (process.env.NODE_ENV !== "production") {
      console.error("[api/ai/generate]", message);
    }
    // Map "not configured" to 501 so the client can distinguish config from transient.
    const isConfigError = message.includes("konfiqurasiya edilməyib");
    const status = isConfigError ? 501 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Single-instance, in-memory rate limiting — enough for this app's zero-infra
// scope (no Redis/external store); resets on server restart, which is fine here.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

/**
 * Best-effort client key. Trusts x-real-ip first (set by trusted reverse
 * proxies like Render / Vercel), falls back to first hop of x-forwarded-for.
 * Both headers are still spoofable by direct curl; for production-grade
 * limiting, swap the Map for Upstash/Redis behind the same interface.
 */
function getClientKey(request: Request): string {
  return (
    request.headers.get("x-real-ip")?.trim() ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}
