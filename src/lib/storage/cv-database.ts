import Dexie, { type EntityTable } from "dexie";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { emptyFormValues } from "@/lib/validation/cv-schema";
import { newId } from "@/lib/utils";

export interface SavedCv {
  id: string;
  name: string;
  templateId: string;
  data: CVFormValues;
  createdAt: number;
  updatedAt: number;
}

type CvDatabase = Dexie & { cvs: EntityTable<SavedCv, "id"> };

let dbInstance: CvDatabase | null = null;

/** Lazily created — IndexedDB doesn't exist during SSR, so this must only ever
 * run from client-side effects/handlers, never at module-eval time on the server. */
function getDb(): CvDatabase {
  if (typeof window === "undefined") {
    throw new Error("cv-database is client-only and cannot run during SSR");
  }
  if (!dbInstance) {
    dbInstance = new Dexie("cvpro") as CvDatabase;
    dbInstance.version(1).stores({ cvs: "id, updatedAt" });
  }
  return dbInstance;
}

export async function listSavedCvs(): Promise<SavedCv[]> {
  return getDb().cvs.orderBy("updatedAt").reverse().toArray();
}

export async function getSavedCv(id: string): Promise<SavedCv | undefined> {
  return getDb().cvs.get(id);
}

export async function createSavedCv(name: string, templateId: string): Promise<SavedCv> {
  const now = Date.now();
  const cv: SavedCv = {
    id: newId(),
    name,
    templateId,
    data: emptyFormValues(),
    createdAt: now,
    updatedAt: now,
  };
  await getDb().cvs.add(cv);
  return cv;
}

export async function updateSavedCvData(id: string, data: CVFormValues): Promise<void> {
  await getDb().cvs.update(id, { data, updatedAt: Date.now() });
}

export async function renameSavedCv(id: string, name: string): Promise<void> {
  await getDb().cvs.update(id, { name, updatedAt: Date.now() });
}

export async function duplicateSavedCv(id: string): Promise<SavedCv | undefined> {
  const source = await getSavedCv(id);
  if (!source) return undefined;
  const now = Date.now();
  const copy: SavedCv = {
    ...source,
    id: newId(),
    name: `${source.name} (Kopya)`,
    createdAt: now,
    updatedAt: now,
  };
  await getDb().cvs.add(copy);
  return copy;
}

export async function deleteSavedCv(id: string): Promise<void> {
  await getDb().cvs.delete(id);
}
