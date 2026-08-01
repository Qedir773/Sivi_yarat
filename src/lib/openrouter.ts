import "server-only";
import { getServerEnv } from "@/lib/env";

/**
 * OpenRouter configuration.
 *
 * OpenRouter (https://openrouter.ai) is a free-tier-friendly gateway that
 * proxies requests to many models (Gemini, Llama, Mistral, etc.) using an
 * OpenAI-compatible chat completions API. We use it because:
 *
 *   - Free models available without a credit card (e.g. google/gemini-2.0-flash-exp:free)
 *   - Single API key works for many providers
 *   - OpenAI-compatible format means minimal code changes vs. raw Gemini
 *
 * To get a free key: https://openrouter.ai/keys  (sign in with Google/GitHub).
 */
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  /** Defaults to env.OPENROUTER_MODEL or gemini-2.0-flash-exp:free */
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: { role?: string; content?: string };
  }>;
  error?: { message?: string; code?: number };
}

/**
 * Calls OpenRouter's /chat/completions endpoint and returns the assistant text.
 * Throws on network/auth errors with a human-readable message so the UI can
 * surface it directly.
 */
export async function callOpenRouterChat(
  messages: ChatMessage[],
  options: ChatOptions = {},
): Promise<string> {
  const env = getServerEnv();
  if (!env.OPENROUTER_API_KEY) {
    throw new Error(
      "AI xidməti konfiqurasiya edilməyib — .env faylında OPENROUTER_API_KEY təyin edin.",
    );
  }

  const model = options.model ?? env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-exp:free";
  const maxTokens = Math.min(Math.max(options.maxTokens ?? 800, 1), 2000);

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      // OpenRouter recommends these for rankings/analytics (optional but nice).
      "HTTP-Referer": "https://cvpro.example.com",
      "X-Title": "CV Pro",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature: options.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const body = (await response.text().catch(() => "")) as string;
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[openrouter] ${response.status}: ${body.slice(0, 500)}`,
      );
    }
    if (response.status === 401) {
      throw new Error("OpenRouter açarı etibarsızdır — .env-də OPENROUTER_API_KEY-i yoxlayın.");
    }
    if (response.status === 429) {
      throw new Error("OpenRouter rate limit — bir azdan yenidən cəhd edin.");
    }
    throw new Error(`OpenRouter xətası (${response.status}).`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text) {
    throw new Error("OpenRouter boş cavab qaytardı.");
  }
  return text;
}
