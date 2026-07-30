import type { DatabaseSync } from "node:sqlite";
import { getDb } from "./client";

const DEFAULT_PRO_PRICE = 4.99;
const PRO_PRICE_KEY = "pro_price_azn";

function ensureSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}

/** Server-only: admin-configurable site-wide settings (currently just the Pro plan price). */
export function getProPrice(): number {
  const db = getDb();
  ensureSchema(db);

  const row = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(PRO_PRICE_KEY) as
    | { value: string }
    | undefined;

  return row ? Number(row.value) : DEFAULT_PRO_PRICE;
}

export function setProPrice(price: number): void {
  const db = getDb();
  ensureSchema(db);

  db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  ).run(PRO_PRICE_KEY, String(price));
}
