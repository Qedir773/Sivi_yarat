export interface AIMessage {
  role: "system" | "user";
  content: string;
}

export interface TextGenerationOptions {
  maxNewTokens?: number;
}

/** Implemented by any AI backend (local in-browser model today, a remote API later)
 * without callers needing to change — see registry.ts for the current binding. */
export interface TextGenerationProvider {
  generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string>;
}
