import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "weru_dashboard_auth";
const AUTH_MESSAGE = "weru-dashboard-auth";

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
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
