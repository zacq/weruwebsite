import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { and, eq, max } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { QUIZ_CACHE_TAG } from "@/lib/quizStatus";

type Params = { params: Promise<{ id: string }> };

const MAX_QUESTIONS = 20;

export async function POST(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id: quizId } = await params;

  const { label, question, answerKey } = (await req.json().catch(() => ({}))) as {
    label?: string; question?: string; answerKey?: string;
  };
  if (!question?.trim()) return NextResponse.json({ error: "Question text is required" }, { status: 400 });

  const db = getDb();
  const [{ top }] = await db
    .select({ top: max(schema.quizQuestions.position) })
    .from(schema.quizQuestions)
    .where(eq(schema.quizQuestions.quizId, quizId));
  if ((top ?? 0) >= MAX_QUESTIONS) {
    return NextResponse.json({ error: `A quiz can have at most ${MAX_QUESTIONS} questions` }, { status: 400 });
  }

  const [created] = await db
    .insert(schema.quizQuestions)
    .values({
      quizId,
      label: label?.trim() || null,
      question: question.trim(),
      answerKey: answerKey?.trim() || null,
      position: (top ?? 0) + 1,
    })
    .returning();

  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, "create", "quiz_question", created.id, { quizId });
  return NextResponse.json({ question: created });
}

// Reorder: body { order: [questionId, ...] } in the desired order.
export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id: quizId } = await params;

  const { order } = (await req.json().catch(() => ({}))) as { order?: string[] };
  if (!Array.isArray(order) || order.length === 0) {
    return NextResponse.json({ error: "order is required" }, { status: 400 });
  }

  const db = getDb();
  const [first, ...rest] = order.map((questionId, i) =>
    db
      .update(schema.quizQuestions)
      .set({ position: i + 1, updatedAt: new Date() })
      .where(and(eq(schema.quizQuestions.id, questionId), eq(schema.quizQuestions.quizId, quizId)))
  );
  await db.batch([first, ...rest]);

  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, "reorder", "quiz", quizId, { order });
  return NextResponse.json({ success: true });
}
