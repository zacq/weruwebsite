import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, requireRole } from "@/lib/auth";
import { emailConfigured, smsConfigured } from "@/lib/notify";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const db = getDb();
  const [entries, draws, notifications] = await Promise.all([
    db.select().from(schema.quizEntries).where(eq(schema.quizEntries.quizId, id)).orderBy(desc(schema.quizEntries.submittedAt)),
    db
      .select({ draw: schema.quizDraws, drawnByName: schema.users.name })
      .from(schema.quizDraws)
      .leftJoin(schema.users, eq(schema.quizDraws.drawnBy, schema.users.id))
      .where(eq(schema.quizDraws.quizId, id))
      .orderBy(desc(schema.quizDraws.createdAt)),
    db.select().from(schema.notifications).where(eq(schema.notifications.quizId, id)).orderBy(desc(schema.notifications.createdAt)),
  ]);

  return NextResponse.json({
    entries,
    draws: draws.map(({ draw, drawnByName }) => ({ ...draw, drawnByName })),
    notifications,
    channels: { sms: smsConfigured(), email: emailConfigured() },
  });
}
