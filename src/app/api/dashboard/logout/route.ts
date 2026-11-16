import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  // Clear the pre-accounts shared-password cookie too.
  res.cookies.set("weru_dashboard_auth", "", { path: "/", maxAge: 0 });
  return res;
}
