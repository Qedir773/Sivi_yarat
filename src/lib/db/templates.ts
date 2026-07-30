import type { DatabaseSync } from "node:sqlite";
import { getDb } from "./client";
import { discoverTemplates } from "@/lib/templates/discovery";

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
  for (const template of discoverTemplates()) {
    insert.run(template.id, template.premium ? 1 : 0);
  }
}

/**
 * Server-only: reads Free/Pro flags from SQLite. Defaults come from each
 * discovered template's own `template.json` `premium` field (so a newly
 * dropped-in template folder works before it's ever been seeded); once
 * seeded, the `template_pricing` table is the editable source of truth for
 * a future admin panel.
 */
export function getTemplatePricing(): Record<string, boolean> {
  const db = getDb();
  ensureSchema(db);
  seedIfEmpty(db);

  const pricing: Record<string, boolean> = {};
  for (const template of discoverTemplates()) {
    pricing[template.id] = template.premium;
  }

  const rows = db
    .prepare("SELECT template_id, is_pro FROM template_pricing")
    .all() as { template_id: string; is_pro: number }[];
  for (const row of rows) {
    if (row.template_id in pricing) {
      pricing[row.template_id] = row.is_pro === 1;
    }
  }

  return pricing;
}
