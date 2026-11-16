import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { SESSION_COOKIE, verifySession, type Role, type Session } from "@/lib/session";

export const QUIZ_ROLES: Role[] = ["admin", "quiz_manager"];
export const CONTENT_ROLES: Role[] = ["admin", "editor"];
export const ADMIN_ROLES: Role[] = ["admin"];

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

// Use at the top of every dashboard route handler:
//   const auth = await requireRole(QUIZ_ROLES); if (auth instanceof NextResponse) return auth;
// Re-checks the user against the DB so deactivating or demoting someone takes
// effect immediately rather than when their 7-day cookie expires.
export async function requireRole(roles: Role[]): Promise<Session | NextResponse> {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await getDb()
    .select({ role: schema.users.role, active: schema.users.active })
    .from(schema.users)
    .where(eq(schema.users.id, session.userId))
    .limit(1);

  if (!user || !user.active) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!roles.includes(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return { ...session, role: user.role };
}

export async function audit(
  session: Session,
  action: string,
  entity: string,
  entityId: string | null,
  diff?: unknown
): Promise<void> {
  try {
    await getDb().insert(schema.auditLog).values({
      userId: session.userId,
      action,
      entity,
      entityId,
      diff: diff ?? null,
    });
  } catch (err) {
    console.error("[audit] Failed to write audit log:", err);
  }
}
