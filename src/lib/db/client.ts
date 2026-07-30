import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const DB_DIR = join(process.cwd(), "data");
const DB_PATH = join(DB_DIR, "cvpro.db");

const globalForDb = globalThis as unknown as { cvProDb?: DatabaseSync };

export function getDb(): DatabaseSync {
  if (!globalForDb.cvProDb) {
    mkdirSync(DB_DIR, { recursive: true });
    globalForDb.cvProDb = new DatabaseSync(DB_PATH);
  }
  return globalForDb.cvProDb;
}
