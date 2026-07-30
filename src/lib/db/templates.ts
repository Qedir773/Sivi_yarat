import type { DatabaseSync } from "node:sqlite";
import { getDb } from "./client";
import { defaultTemplatePricing } from "@/features/templates/registry";

function ensureSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS template_pricing (
      template_id TEXT PRIMARY KEY,
      is_pro INTEGER NOT NULL DEFAULT 0
    );
  `);
}

function seedIfEmpty(db: DatabaseSync) {
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM template_pricing")
    .get() as { count: number };
  if (count > 0) return;

  const insert = db.prepare(
    "INSERT INTO template_pricing (template_id, is_pro) VALUES (?, ?)",
  );
  for (const [templateId, isPro] of Object.entries(defaultTemplatePricing)) {
    insert.run(templateId, isPro ? 1 : 0);
  }
}

/**
 * Server-only: reads Free/Pro flags from SQLite (seeding on first run from
 * the static defaults). Returns plain serializable data — the React
 * component references stay in `templateComponents` and are only ever
 * imported client-side, since components can't cross the RSC boundary as
 * props. A future admin panel can update the `template_pricing` table
 * without a code change.
 */
export function getTemplatePricing(): Record<string, boolean> {
  const db = getDb();
  ensureSchema(db);
  seedIfEmpty(db);

  const rows = db
    .prepare("SELECT template_id, is_pro FROM template_pricing")
    .all() as { template_id: string; is_pro: number }[];

  const pricing: Record<string, boolean> = { ...defaultTemplatePricing };
  for (const row of rows) {
    pricing[row.template_id] = row.is_pro === 1;
  }
  return pricing;
}
