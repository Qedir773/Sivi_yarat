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

  // sort_order shipped after the table already existed in some deployments —
  // ALTER TABLE ADD COLUMN backfills it as NULL, which getTemplateOrder()
  // treats as "unordered" (falls back to alphabetical), so this is a no-op
  // visually until an admin explicitly reorders something.
  const columns = db.prepare("PRAGMA table_info(template_pricing)").all() as { name: string }[];
  if (!columns.some((c) => c.name === "sort_order")) {
    db.exec("ALTER TABLE template_pricing ADD COLUMN sort_order INTEGER");
  }
}

function seedIfEmpty(db: DatabaseSync) {
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM template_pricing")
    .get() as { count: number };
  if (count > 0) return;

  const insert = db.prepare(
    "INSERT INTO template_pricing (template_id, is_pro, sort_order) VALUES (?, ?, ?)",
  );
  discoverTemplates().forEach((template, index) => {
    insert.run(template.id, template.premium ? 1 : 0, index);
  });
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

/** Server-only: admin panel writes here to flip a template's Free/Pro flag. */
export function setTemplatePricing(templateId: string, isPro: boolean): void {
  const db = getDb();
  ensureSchema(db);
  seedIfEmpty(db);

  db.prepare(
    "INSERT INTO template_pricing (template_id, is_pro) VALUES (?, ?) ON CONFLICT(template_id) DO UPDATE SET is_pro = excluded.is_pro",
  ).run(templateId, isPro ? 1 : 0);
}

/**
 * Server-only: returns every discovered template's id in display order —
 * explicit `sort_order` first (ascending), then any template with no
 * explicit order yet (a row-less new template, or one seeded before this
 * feature existed) falls back to alphabetical-by-id, matching the gallery's
 * previous default so nothing shifts until an admin reorders something.
 */
export function getTemplateOrder(): string[] {
  const db = getDb();
  ensureSchema(db);
  seedIfEmpty(db);

  const rows = db
    .prepare("SELECT template_id, sort_order FROM template_pricing")
    .all() as { template_id: string; sort_order: number | null }[];
  const orderById = new Map(rows.map((row) => [row.template_id, row.sort_order]));

  return discoverTemplates()
    .map((template) => ({ id: template.id, order: orderById.get(template.id) ?? null }))
    .sort((a, b) => {
      if (a.order === null && b.order === null) return a.id.localeCompare(b.id);
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    })
    .map((template) => template.id);
}

/** Server-only: admin panel writes the full reordered id list here after a
 * drag/move — persists each template's position as its index in the array. */
export function setTemplateOrder(orderedIds: string[]): void {
  const db = getDb();
  ensureSchema(db);
  seedIfEmpty(db);

  // A template moved before it ever got its own pricing row needs an is_pro
  // value on first insert — must come from its own template.json `premium`
  // default, never a hardcoded 0, or reordering would silently flip it to
  // Free. ON CONFLICT still only ever touches sort_order, so an existing
  // admin-set price is never overwritten by a reorder.
  const premiumById = new Map(discoverTemplates().map((template) => [template.id, template.premium]));
  const upsert = db.prepare(
    "INSERT INTO template_pricing (template_id, is_pro, sort_order) VALUES (?, ?, ?) ON CONFLICT(template_id) DO UPDATE SET sort_order = excluded.sort_order",
  );
  orderedIds.forEach((templateId, index) => {
    const isPro = premiumById.get(templateId) ? 1 : 0;
    upsert.run(templateId, isPro, index);
  });
}
