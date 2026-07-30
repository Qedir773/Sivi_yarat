import type { CVFormValues } from "@/lib/validation/cv-schema";

const STORAGE_KEY = "cvpro:draft";

export function loadDraft(): CVFormValues | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CVFormValues;
  } catch {
    return null;
  }
}

export function saveDraft(values: CVFormValues) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // localStorage may be unavailable (private mode / quota) — fail silently, local-first is best-effort.
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
