import az from "./az.json";
import tr from "./tr.json";
import en from "./en.json";
import ru from "./ru.json";
import type { Locale } from "@/config/site";

export const dictionaries = { az, tr, en, ru } satisfies Record<Locale, unknown>;

export type Dictionary = typeof az;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
