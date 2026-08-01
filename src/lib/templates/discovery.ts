import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";

const TEMPLATES_DIR = join(process.cwd(), "src", "templates");

export interface TemplateConfig {
  id: string;
  name: string;
  category: string;
  primaryColor: string;
  secondaryColor: string;
  sidebar: "left" | "right" | "none";
  photo: boolean;
  columns: 1 | 2;
  atsCompatible: boolean;
  premium: boolean;
}

function isTemplateConfig(value: unknown): value is TemplateConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.category === "string" &&
    typeof v.primaryColor === "string" &&
    typeof v.secondaryColor === "string" &&
    typeof v.photo === "boolean" &&
    typeof v.atsCompatible === "boolean" &&
    typeof v.premium === "boolean"
  );
}

/**
 * Reads every `template.json` under src/templates/*.
 *
 * Wrapped with React.cache() so multiple components in the same render tree
 * share a single filesystem scan. This addresses the original perf issue:
 * before the wrapper, /templates, /v2/templates, /admin, etc. each did 18+
 * readFileSync calls per render.
 *
 * Note: we don't use unstable_cache here because Next.js 16's
 * `unstable_cache` always returns a Promise and forces callers to await,
 * which would ripple through every page. React.cache is the right tool
 * for per-request memoization of sync work.
 */
function _discoverTemplates(): TemplateConfig[] {
  if (!existsSync(TEMPLATES_DIR)) return [];

  const entries = readdirSync(TEMPLATES_DIR, { withFileTypes: true });
  const configs: TemplateConfig[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const configPath = join(TEMPLATES_DIR, entry.name, "template.json");
    if (!existsSync(configPath)) continue;

    try {
      const raw = JSON.parse(readFileSync(configPath, "utf-8"));
      if (isTemplateConfig(raw) && raw.id === entry.name) {
        configs.push(raw);
      }
    } catch {
      // Skip a malformed template.json rather than crashing the whole gallery.
    }
  }

  return configs.sort((a, b) => a.id.localeCompare(b.id));
}

export const discoverTemplates: () => TemplateConfig[] = cache(_discoverTemplates);
