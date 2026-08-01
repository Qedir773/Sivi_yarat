import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a cryptographically random UUID. Throws in environments where the
 * Web Crypto API is unavailable (very old browsers / Node < 19) — modern
 * targets are guaranteed to support it.
 */
export function newId(): string {
  if (typeof crypto === "undefined" || typeof crypto.randomUUID !== "function") {
    throw new Error("crypto.randomUUID is unavailable in this environment")
  }
  return crypto.randomUUID()
}
