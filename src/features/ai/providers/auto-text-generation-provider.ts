import type { AIMessage, TextGenerationOptions, TextGenerationProvider } from "@/features/ai/types";
import { ApiTextGenerationProvider } from "@/features/ai/providers/api-text-generation-provider";
import { LocalTextGenerationProvider } from "@/features/ai/providers/local-text-generation-provider";

/** Prefers a server-configured remote provider (e.g. Gemini, better quality —
 * needs GEMINI_API_KEY in .env) and silently falls back to the free in-browser
 * model only when no remote key is configured at all, so the app never breaks
 * for a visitor without a key. If a key IS configured but the request fails
 * (rate limit, network hiccup), the error is rethrown instead of silently
 * degrading to the much lower-quality local model — the tiny in-browser model
 * doesn't reliably follow the Azerbaijani-only instruction, so swapping to it
 * transparently produced garbled/English-mixed output that looked broken. */
export class AutoTextGenerationProvider implements TextGenerationProvider {
  private readonly remote = new ApiTextGenerationProvider();
  private readonly local = new LocalTextGenerationProvider();

  async generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string> {
    try {
      return await this.remote.generate(messages, options);
    } catch (error) {
      const keyNotConfigured = error instanceof Error && error.message === "ai-api-unavailable:501";
      if (!keyNotConfigured) throw error;
      return this.local.generate(messages, options);
    }
  }
}
