import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { asc } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { ADMIN_ROLES, audit, requireRole } from "@/lib/auth";
import type { Role } from "@/lib/session";

const ROLES: Role[] = ["admin", "editor", "quiz_manager"];

const publicColumns = {
  id: schema.users.id,
  email: schema.users.email,
  name: schema.users.name,
  role: schema.users.role,
  active: schema.users.active,
  lastLoginAt: schema.users.lastLoginAt,
  createdAt: schema.users.createdAt,
};

export async function GET() {
  const auth = await requireRole(ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;

  const users = await getDb().select(publicColumns).from(schema.users).orderBy(asc(schema.users.createdAt));
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const auth = await requireRole(ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;

  const { email, name, role, password } = (await req.json().catch(() => ({}))) as {
    email?: string; name?: string; role?: Role; password?: string;
  };
  if (!email?.includes("@") || !name?.trim() || !role || !ROLES.includes(role) || !password || password.length < 10) {
    return NextResponse.json(
      { error: "Email, name, role and a password of at least 10 characters are required" },
      { status: 400 }
    );
  }

  const [user] = await getDb()
    .insert(schema.users)
    .values({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      role,
      passwordHash: await bcrypt.hash(password, 10),
    })
    .onConflictDoNothing({ target: schema.users.email })
    .returning(publicColumns);

  if (!user) return NextResponse.json({ error: "A user with that email already exists" }, { status: 409 });

  await audit(auth, "create", "user", user.id, { email: user.email, role: user.role });
  return NextResponse.json({ user });
}
