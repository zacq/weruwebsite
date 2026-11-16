import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { QUIZ_CACHE_TAG } from "@/lib/quizStatus";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { label, question, answerKey } = (await req.json().catch(() => ({}))) as {
    label?: string; question?: string; answerKey?: string;
  };

  const set: Partial<typeof schema.quizQuestions.$inferInsert> = { updatedAt: new Date() };
  if (label !== undefined) set.label = label.trim() || null;
  if (question !== undefined) {
    if (!question.trim()) return NextResponse.json({ error: "Question text is required" }, { status: 400 });
    set.question = question.trim();
  }
  if (answerKey !== undefined) set.answerKey = answerKey.trim() || null;

  const [updated] = await getDb().update(schema.quizQuestions).set(set).where(eq(schema.quizQuestions.id, id)).returning();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, "update", "quiz_question", id, { label, question, answerKey });
  return NextResponse.json({ question: updated });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  await getDb().delete(schema.quizQuestions).where(eq(schema.quizQuestions.id, id));
  revalidateTag(QUIZ_CACHE_TAG);
  await audit(auth, "delete", "quiz_question", id);
  return NextResponse.json({ success: true });
}
