import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Generic internet-wide bot/scanner probes for paths that don't exist in this app
// (WordPress, login-page hunting, RSS discovery, etc.). None of these are real
// routes — confirmed no src/app directory matches any of them. Answered here, at
// the edge, before a request reaches a full page render.
const BOT_PROBE_PATHS = new Set([
  "/login",
  "/signin",
  "/signup",
  "/register",
  "/feed",
  "/feed/",
  "/ads.txt",
  "/.well-known/assetlinks.json",
]);
const BOT_PROBE_PREFIXES = ["/wp-json/", "/api/auth/"];

function isBotProbe(pathname: string): boolean {
  if (BOT_PROBE_PATHS.has(pathname)) return true;
  return BOT_PROBE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isBotProbe(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  // The login/logout routes must stay reachable, or nobody could ever authenticate.
  if (pathname === "/dashboard/login" || pathname === "/api/dashboard/login" || pathname === "/api/dashboard/logout") {
    return NextResponse.next();
  }

  // Only checks that a valid session exists — per-role access is enforced by
  // requireRole() in each route handler (src/lib/auth.ts).
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/dashboard")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/dashboard/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/login",
    "/signin",
    "/signup",
    "/register",
    "/feed",
    "/feed/",
    "/ads.txt",
    "/.well-known/assetlinks.json",
    "/wp-json/:path*",
    "/api/auth/:path*",
  ],
};
