import { NextResponse } from "next/server";

const COOKIE_NAME = "weru_dashboard_auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
