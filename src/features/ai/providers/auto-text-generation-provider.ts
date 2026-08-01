import type { AIMessage, TextGenerationOptions, TextGenerationProvider } from "@/features/ai/types";
import { ApiTextGenerationProvider } from "@/features/ai/providers/api-text-generation-provider";

/**
 * Single-source AI provider. Always uses the server-side remote provider
 * (OpenRouter via /api/ai/generate). No local-model fallback — the in-browser
 * transformers.js model produces unreliable output for Azerbaijani prompts
 * and the WASM bundle often fails to load in restricted environments.
 *
 * If OpenRouter is not configured or the request fails, the UI shows the
 * actual error message so users (and admins) know exactly what to fix.
 */
export class AutoTextGenerationProvider implements TextGenerationProvider {
  private readonly remote = new ApiTextGenerationProvider();

  async generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string> {
    return this.remote.generate(messages, options);
  }
}
