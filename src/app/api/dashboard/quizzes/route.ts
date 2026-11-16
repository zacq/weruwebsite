import { NextRequest, NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { effectiveQuizStatus } from "@/lib/quizStatus";
import { toQuizValues, uniqueSlug, type QuizInput } from "@/lib/quizAdmin";

export async function GET() {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;

  const q = schema.quizzes;
  const rows = await getDb()
    .select({
      quiz: q,
      questionCount: sql<number>`(select count(*)::int from ${schema.quizQuestions} where ${schema.quizQuestions.quizId} = ${q.id})`,
      entryCount: sql<number>`(select count(*)::int from ${schema.quizEntries} where ${schema.quizEntries.quizId} = ${q.id})`,
      unreviewedCount: sql<number>`(select count(*)::int from ${schema.quizEntries} where ${schema.quizEntries.quizId} = ${q.id} and not ${schema.quizEntries.reviewed})`,
      winnerCount: sql<number>`(select count(*)::int from ${schema.quizEntries} where ${schema.quizEntries.quizId} = ${q.id} and ${schema.quizEntries.drawStatus} = 'winner')`,
    })
    .from(q)
    .orderBy(desc(q.startsAt));

  return NextResponse.json({
    quizzes: rows.map(({ quiz, ...counts }) => ({
      ...quiz,
      ...counts,
      effectiveStatus: effectiveQuizStatus(quiz),
    })),
  });
}

export async function POST(req: NextRequest) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;

  const input = (await req.json().catch(() => ({}))) as QuizInput;
  if (!input.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const values = toQuizValues({ ...input, status: "draft" });
  if (typeof values === "string") return NextResponse.json({ error: values }, { status: 400 });

  const [quiz] = await getDb()
    .insert(schema.quizzes)
    .values({
      ...values,
      title: values.title!,
      slug: await uniqueSlug(values.title!),
      startsAt: values.startsAt ?? new Date(),
      createdBy: auth.userId,
    })
    .returning();

  await audit(auth, "create", "quiz", quiz.id, { title: quiz.title });
  return NextResponse.json({ quiz: { ...quiz, questionCount: 0, entryCount: 0, unreviewedCount: 0, winnerCount: 0, effectiveStatus: "draft" } });
}
