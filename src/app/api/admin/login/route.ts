import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/admin-auth";

const loginSchema = z.object({
  token: z.string().min(1).max(256),
  next: z.string().optional(),
});

/**
 * POST /api/admin/login
 * Body: { token: string, next?: string }
 *
 * If `token` matches ADMIN_SECRET (constant-time), sets a session cookie
 * and redirects to `next` (or /admin).
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { token, next } = parsed.data;

  if (!verifyAdminToken(token)) {
    // Constant delay to discourage timing attacks
    await new Promise((r) => setTimeout(r, 250));
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const redirectTo = next && next.startsWith("/") ? next : "/admin";
  const response = NextResponse.json({ ok: true, redirect: redirectTo });
  response.cookies.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}

/**
 * DELETE /api/admin/login — logout
 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
