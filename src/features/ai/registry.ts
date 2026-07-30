import type { TextGenerationProvider } from "@/features/ai/types";
import { LocalTextGenerationProvider } from "@/features/ai/providers/local-text-generation-provider";

const localTextGenerationProvider = new LocalTextGenerationProvider();

/** Single seam for swapping the AI backend later (e.g. a remote provider) —
 * every caller goes through this function instead of importing a provider directly. */
export function getTextGenerationProvider(): TextGenerationProvider {
  return localTextGenerationProvider;
}
