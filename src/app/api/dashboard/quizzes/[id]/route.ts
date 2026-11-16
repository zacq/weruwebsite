import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { asc, count, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { QUIZ_CACHE_TAG, effectiveQuizStatus } from "@/lib/quizStatus";
import { publishProblem, toQuizValues, type QuizInput } from "@/lib/quizAdmin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const db = getDb();
  const [quiz] = await db.select().from(schema.quizzes).where(eq(schema.quizzes.id, id)).limit(1);
  if (!quiz) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const questions = await db
    .select()
    .from(schema.quizQuestions)
    .where(eq(schema.quizQuestions.quizId, id))
    .orderBy(asc(schema.quizQuestions.position));

  return NextResponse.json({ quiz: { ...quiz, effectiveStatus: effectiveQuizStatus(quiz) }, questions });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const db = getDb();
  const [existing] = await db.select().from(schema.quizzes).where(eq(schema.quizzes.id, id)).limit(1);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const input = (await req.json().catch(() => ({}))) as QuizInput;
  const values = toQuizValues(input);
  if (typeof values === "string") return NextResponse.json({ error: values }, { status: 400 });
  if (Object.keys(values).length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const nextStatus = values.status ?? existing.status;
  if (nextStatus === "published") {
    const problem = await publishProblem(
      id,
      values.startsAt ?? existing.startsAt,
      values.endsAt !== undefined ? values.endsAt : existing.endsAt
    );
    if (problem) return NextResponse.json({ error: problem }, { status: 409 });
  }

  const [quiz] = await db
    .update(schema.quizzes)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(schema.quizzes.id, id))
    .returning();

  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, values.status && values.status !== existing.status ? `status:${values.status}` : "update", "quiz", id, input);
  return NextResponse.json({ quiz: { ...quiz, effectiveStatus: effectiveQuizStatus(quiz) } });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const db = getDb();
  const [{ n }] = await db.select({ n: count() }).from(schema.quizEntries).where(eq(schema.quizEntries.quizId, id));
  if (n > 0) {
    return NextResponse.json({ error: "This quiz has entries — archive it instead of deleting" }, { status: 409 });
  }

  await db.delete(schema.quizzes).where(eq(schema.quizzes.id, id));
  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, "delete", "quiz", id);
  return NextResponse.json({ success: true });
}
