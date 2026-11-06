import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "weru_dashboard_auth";
const AUTH_MESSAGE = "weru-dashboard-auth";

// Generic internet-wide bot/scanner probes for paths that don't exist in this app
// (WordPress, login-page hunting, RSS discovery, etc.). None of these are real
// routes — confirmed no src/app directory matches any of them. Answered here, at
// the edge, before a request reaches the root layout — which fetches from Airtable
// on every render, so letting bot noise fall through to a full page render was
// burning API quota for traffic that was never a real visitor.
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

async function expectedToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(AUTH_MESSAGE));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    // No password configured — fail open rather than lock everyone out of a misconfigured deploy,
    // but this should be set in production.
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const valid = cookie && cookie === (await expectedToken(password));

  if (valid) return NextResponse.next();

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
