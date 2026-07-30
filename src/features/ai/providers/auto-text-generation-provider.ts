import type { AIMessage, TextGenerationOptions, TextGenerationProvider } from "@/features/ai/types";
import { ApiTextGenerationProvider } from "@/features/ai/providers/api-text-generation-provider";
import { LocalTextGenerationProvider } from "@/features/ai/providers/local-text-generation-provider";

/** Prefers a server-configured remote provider (e.g. Gemini, better quality —
 * needs GEMINI_API_KEY in .env) and silently falls back to the free in-browser
 * model whenever no remote key is configured or the request fails, so the app
 * never breaks for a visitor without a key. */
export class AutoTextGenerationProvider implements TextGenerationProvider {
  private readonly remote = new ApiTextGenerationProvider();
  private readonly local = new LocalTextGenerationProvider();

  async generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string> {
    try {
      return await this.remote.generate(messages, options);
    } catch {
      return this.local.generate(messages, options);
    }
  }
}
