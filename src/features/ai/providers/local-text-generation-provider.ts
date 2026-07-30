import type { TextGenerationProvider, AIMessage, TextGenerationOptions } from "@/features/ai/types";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

interface ChatTurn {
  role: string;
  content: string;
}

type Generator = (
  messages: AIMessage[],
  options?: Record<string, unknown>,
) => Promise<{ generated_text: ChatTurn[] }[]>;

let generatorPromise: Promise<Generator> | null = null;

/** Lazily loads the ~0.5B-param instruct model on first use (same module-singleton
 * pattern as getTemplateComponent) so the multi-hundred-MB download only happens
 * once the user actually triggers an AI feature, and is cached by the browser
 * afterwards (transformers.js stores model files via the Cache API). */
function getGenerator(): Promise<Generator> {
  if (!generatorPromise) {
    generatorPromise = import("@huggingface/transformers").then(({ pipeline }) =>
      pipeline("text-generation", MODEL_ID, { dtype: "q4" }),
    ) as Promise<Generator>;
  }
  return generatorPromise;
}

export class LocalTextGenerationProvider implements TextGenerationProvider {
  async generate(messages: AIMessage[], options?: TextGenerationOptions): Promise<string> {
    const generator = await getGenerator();
    const output = await generator(messages, {
      max_new_tokens: options?.maxNewTokens ?? 400,
      do_sample: false,
    });
    const chat = output[0]?.generated_text;
    const lastMessage = Array.isArray(chat) ? chat.at(-1) : undefined;
    return lastMessage?.content?.trim() ?? "";
  }
}
