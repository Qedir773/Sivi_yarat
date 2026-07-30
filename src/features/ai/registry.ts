import type { TextGenerationProvider } from "@/features/ai/types";
import { AutoTextGenerationProvider } from "@/features/ai/providers/auto-text-generation-provider";

const textGenerationProvider = new AutoTextGenerationProvider();

/** Single seam for swapping the AI backend later — every caller goes through
 * this function instead of importing a provider directly. Currently returns
 * AutoTextGenerationProvider (remote-if-configured, else the free local model). */
export function getTextGenerationProvider(): TextGenerationProvider {
  return textGenerationProvider;
}
