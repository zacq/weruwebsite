import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/session";

let DUMMY_HASH: string | undefined;

export async function POST(req: NextRequest) {
  if (!process.env.SESSION_SECRET || !process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Dashboard login is not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return NextResponse.json({ error: "Enter your email and password" }, { status: 400 });
  }

  const db = getDb();
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email.trim().toLowerCase()))
    .limit(1);

  // Compare even when the user doesn't exist so response timing doesn't reveal which emails are registered.
  const hash = user?.passwordHash ?? (DUMMY_HASH ??= bcrypt.hashSync("not-a-real-password", 10));
  const ok = await bcrypt.compare(password, hash);
  if (!user || !ok || !user.active) {
    return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  }

  await db.update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, user.id));

  const token = await signSession({ userId: user.id, email: user.email, name: user.name, role: user.role });
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
