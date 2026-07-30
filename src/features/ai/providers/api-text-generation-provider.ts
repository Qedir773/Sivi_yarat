import type { AIMessage, TextGenerationOptions, TextGenerationProvider } from "@/features/ai/types";

/** Talks to our own /api/ai/generate Route Handler — never calls a third-party
 * AI API directly from the browser, so no key is ever exposed client-side. */
export class ApiTextGenerationProvider implements TextGenerationProvider {
  async generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string> {
    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, maxNewTokens: options?.maxNewTokens }),
    });

    if (!response.ok) {
      throw new Error(`ai-api-unavailable:${response.status}`);
    }

    const data = (await response.json()) as { text?: string };
    if (!data.text) {
      throw new Error("ai-api-empty-response");
    }
    return data.text;
  }
}
