import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };
type DrawStatus = "pending" | "contacted" | "winner" | "disqualified";
const DRAW_STATUSES: DrawStatus[] = ["pending", "contacted", "winner", "disqualified"];

// Body: { marks?: (boolean | null)[] — one per answer, in order; drawStatus?: DrawStatus }
// Marking updates score, reviewed (every answer marked) and eligible (every answer correct).
export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { marks, drawStatus } = (await req.json().catch(() => ({}))) as {
    marks?: (boolean | null)[]; drawStatus?: DrawStatus;
  };

  const db = getDb();
  const [entry] = await db.select().from(schema.quizEntries).where(eq(schema.quizEntries.id, id)).limit(1);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const set: Partial<typeof schema.quizEntries.$inferInsert> = {};

  if (marks !== undefined) {
    if (!Array.isArray(marks) || marks.length !== entry.answers.length || marks.some((m) => m !== true && m !== false && m !== null)) {
      return NextResponse.json({ error: "Invalid marks" }, { status: 400 });
    }
    const answers = entry.answers.map((a, i) => ({ ...a, correct: marks[i] }));
    set.answers = answers;
    set.score = answers.filter((a) => a.correct === true).length;
    set.reviewed = answers.every((a) => a.correct !== null);
    set.eligible = answers.every((a) => a.correct === true);
    // An entry that's no longer fully correct can't stay a winner.
    if (!set.eligible && entry.drawStatus === "winner") set.drawStatus = "pending";
  }

  if (drawStatus !== undefined) {
    if (!DRAW_STATUSES.includes(drawStatus)) return NextResponse.json({ error: "Invalid draw status" }, { status: 400 });
    set.drawStatus = drawStatus;
  }

  if (Object.keys(set).length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const [updated] = await db.update(schema.quizEntries).set(set).where(eq(schema.quizEntries.id, id)).returning();
  await audit(auth, marks !== undefined ? "mark" : "update", "quiz_entry", id, { marks, drawStatus });
  return NextResponse.json({ entry: updated });
}
