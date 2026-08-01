import "server-only";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { getServerEnv } from "@/lib/env";

/**
 * Cookie adı admin panelə daxil olmuş sessiyanı saxlayır.
 * Proxy (`src/proxy.ts`) və server action-lar eyni adı istifadə edir.
 */
export const ADMIN_COOKIE = "cv_admin_session";

/**
 * Admin sessiya cookie-si üçün constant-time token.
 * Server action-lar bunu cookie ilə müqayisə edir.
 */
const SESSION_TOKEN = "1";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

/**
 * Returns true if ADMIN_SECRET is configured AND the request carries
 * a valid admin session cookie.
 *
 * Use this in server actions and page components to gate writes.
 * The proxy (`src/proxy.ts`) gates the page itself; this is the
 * defense-in-depth check inside the action.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const env = getServerEnv();
  if (!env.ADMIN_SECRET) return false;
  const jar = await cookies();
  const session = jar.get(ADMIN_COOKIE)?.value;
  return session === SESSION_TOKEN;
}

/**
 * Server action-lar üçün qısa guard. `ADMIN_SECRET` təyin olunmayıbsa və ya
 * cookie yoxdursa, çağıran 403 ilə cavab alır.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized: admin session required");
  }
}

/**
 * Token-i constant-time müqayisə edir (env-dən və client-dən gələn).
 * Login endpoint-i bunu istifadə edir.
 */
export function verifyAdminToken(token: string): boolean {
  const env = getServerEnv();
  if (!env.ADMIN_SECRET) return false;
  return safeEqual(token, env.ADMIN_SECRET);
}
