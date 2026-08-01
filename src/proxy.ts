import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 Proxy (formerly Middleware).
 *
 * Gating rules:
 *   - `/admin/*` requires ADMIN_SECRET in env AND a valid session cookie.
 *     Login form posts to `/api/admin/login` which sets the cookie.
 *   - All other routes are passed through.
 *
 * Server actions in `src/app/admin/actions.ts` re-check with `requireAdmin()`
 * as defense-in-depth — never rely solely on this layer.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only gate /admin/* (skip the login endpoint itself)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminSecret = process.env.ADMIN_SECRET;
    const session = request.cookies.get("cv_admin_session")?.value;

    if (!adminSecret || session !== "1") {
      // Not configured OR not authenticated → redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
