import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { and, count, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { effectiveQuizStatus } from "@/lib/quizStatus";

type Params = { params: Promise<{ id: string }> };

// Draws one winner uniformly at random (crypto-grade) from entries marked fully
// correct that are still "pending" — so past winners, contacted and disqualified entries are
// never drawn again. Call again to draw more winners or replace a disqualified one.
export async function POST(_req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const db = getDb();
  const [quiz] = await db.select().from(schema.quizzes).where(eq(schema.quizzes.id, id)).limit(1);
  if (!quiz) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const status = effectiveQuizStatus(quiz);
  if (status !== "closed" && status !== "archived") {
    return NextResponse.json({ error: "Close the quiz before drawing a winner" }, { status: 409 });
  }

  // Every entry must be marked first, or a correct-but-unmarked entry would be
  // unfairly left out of the draw.
  const [unreviewed] = await db
    .select({ n: count() })
    .from(schema.quizEntries)
    .where(and(eq(schema.quizEntries.quizId, id), eq(schema.quizEntries.reviewed, false)));
  if (unreviewed.n > 0) {
    return NextResponse.json({ error: `Mark the remaining ${unreviewed.n} entries before drawing` }, { status: 409 });
  }

  const pool = await db
    .select({ id: schema.quizEntries.id })
    .from(schema.quizEntries)
    .where(
      and(
        eq(schema.quizEntries.quizId, id),
        eq(schema.quizEntries.eligible, true),
        eq(schema.quizEntries.drawStatus, "pending")
      )
    );
  if (pool.length === 0) return NextResponse.json({ error: "No eligible entries left to draw from" }, { status: 409 });

  const winnerId = pool[randomInt(pool.length)].id;

  const [updated] = await db.batch([
    db
      .update(schema.quizEntries)
      .set({ drawStatus: "winner" })
      .where(and(eq(schema.quizEntries.id, winnerId), eq(schema.quizEntries.drawStatus, "pending")))
      .returning(),
    db.insert(schema.quizDraws).values({ quizId: id, winnerEntryId: winnerId, poolSize: pool.length, drawnBy: auth.userId }),
  ]);

  await audit(auth, "draw", "quiz", id, { winnerEntryId: winnerId, poolSize: pool.length });
  return NextResponse.json({ winner: updated[0], poolSize: pool.length });
}
