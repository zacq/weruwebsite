import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const COOKIE_NAME = "weru_dashboard_auth";
const AUTH_MESSAGE = "weru-dashboard-auth";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Dashboard password not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { password: submitted } = body as { password?: string };

  if (submitted !== password) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createHmac("sha256", password).update(AUTH_MESSAGE).digest("hex");

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
  return res;
}
