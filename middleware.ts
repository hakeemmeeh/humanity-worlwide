import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

// Everything under these paths requires a valid admin session.
// (Public form endpoints /api/contact and /api/volunteer are intentionally NOT listed.)
const PROTECTED_API_PREFIXES = ["/api/content/", "/api/inquiries/", "/api/volunteers/", "/api/admin/"];

function isProtectedApi(pathname: string) {
  return (
    pathname === "/api/media" ||
    PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p))
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const protectedApi = isProtectedApi(pathname);
  if (!protectedPage && !protectedApi) return NextResponse.next();

  const ok = await verifySessionToken(
    req.cookies.get(SESSION_COOKIE)?.value,
    process.env.ADMIN_SESSION_SECRET
  );

  if (!ok) {
    if (protectedApi) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    url.search = "";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // CSRF defence-in-depth: state-changing admin API calls must come from our own origin.
  if (protectedApi && !["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const origin = req.headers.get("origin");
    if (origin && new URL(origin).host !== req.headers.get("host")) {
      return NextResponse.json({ error: "Bad origin." }, { status: 403 });
    }
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/content/:path*",
    "/api/media",
    "/api/inquiries/:path*",
    "/api/volunteers/:path*",
    "/api/admin/:path*",
  ],
};
