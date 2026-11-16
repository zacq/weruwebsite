import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { ADMIN_ROLES, audit, requireRole } from "@/lib/auth";
import type { Role } from "@/lib/session";

const ROLES: Role[] = ["admin", "editor", "quiz_manager"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(ADMIN_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { name, role, active, password } = (await req.json().catch(() => ({}))) as {
    name?: string; role?: Role; active?: boolean; password?: string;
  };

  if (id === auth.userId && (active === false || (role && role !== "admin"))) {
    return NextResponse.json({ error: "You can't deactivate or demote your own account" }, { status: 400 });
  }

  const set: Partial<typeof schema.users.$inferInsert> = { updatedAt: new Date() };
  if (name !== undefined) set.name = name.trim();
  if (role !== undefined) {
    if (!ROLES.includes(role)) return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    set.role = role;
  }
  if (active !== undefined) set.active = active;
  if (password !== undefined) {
    if (password.length < 10) return NextResponse.json({ error: "Password must be at least 10 characters" }, { status: 400 });
    set.passwordHash = await bcrypt.hash(password, 10);
  }

  const [user] = await getDb()
    .update(schema.users)
    .set(set)
    .where(eq(schema.users.id, id))
    .returning({ id: schema.users.id, email: schema.users.email, name: schema.users.name, role: schema.users.role, active: schema.users.active });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await audit(auth, "update", "user", id, { name, role, active, passwordReset: password !== undefined });
  return NextResponse.json({ user });
}
