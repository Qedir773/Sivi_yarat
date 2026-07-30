import { getDictionary, type Dictionary } from "@/locales";
import { siteConfig, type Locale } from "@/config/site";

type Join<K extends string, V> = V extends string
  ? K
  : V extends readonly unknown[]
    ? never
    : V extends Record<string, unknown>
      ? `${K}.${DotPath<V>}`
      : never;

type DotPath<T> = {
  [K in Extract<keyof T, string>]: Join<K, T[K]>;
}[Extract<keyof T, string>];

export type TranslationKey = DotPath<Dictionary>;

function resolve(dict: Dictionary, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>((acc, part) => (acc as Record<string, unknown> | undefined)?.[part], dict);
  return typeof value === "string" ? value : key;
}

export function createTranslator(locale: Locale = siteConfig.defaultLocale) {
  const dict = getDictionary(locale);
  return (key: TranslationKey): string => resolve(dict, key);
}
