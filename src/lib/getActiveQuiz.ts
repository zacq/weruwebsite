import { unstable_cache } from "next/cache";
import { and, asc, desc, eq, gt, isNull, lte, or } from "drizzle-orm";
import { getDb, schema } from "@/db";
import type { QuizPromoCopy } from "@/db/schema";
import { QUIZ_CACHE_TAG } from "@/lib/quizStatus";

// Public shape — deliberately excludes the staff-only answer key.
export type QuizQuestion = {
  id: string;
  label: string | null;
  q: string;
};

export type ActiveQuiz = {
  id: string;
  campaign: string | null;
  title: string;
  tagline: string | null;
  steps: string[];
  prize: string | null;
  description: string | null;
  sponsor: string | null;
  prizeImageUrl: string | null;
  promoCopy: QuizPromoCopy | null;
  endsAt: string | null;
  questions: QuizQuestion[];
};

// Dashboard writes call revalidateTag("quiz") so edits show immediately; the
// 5-minute scheduled tick (/api/quiz/tick) does the same when a quiz crosses
// its start/end time. The 10-minute revalidate is only a backstop.
const loadLiveQuiz = unstable_cache(
  async (): Promise<ActiveQuiz | null> => {
    const db = getDb();
    const now = new Date();

    const [quiz] = await db
      .select()
      .from(schema.quizzes)
      .where(
        and(
          eq(schema.quizzes.status, "published"),
          lte(schema.quizzes.startsAt, now),
          or(isNull(schema.quizzes.endsAt), gt(schema.quizzes.endsAt, now))
        )
      )
      .orderBy(desc(schema.quizzes.startsAt))
      .limit(1);

    if (!quiz) return null;

    const questions = await db
      .select({ id: schema.quizQuestions.id, label: schema.quizQuestions.label, q: schema.quizQuestions.question })
      .from(schema.quizQuestions)
      .where(eq(schema.quizQuestions.quizId, quiz.id))
      .orderBy(asc(schema.quizQuestions.position));

    const valid = questions.filter((q) => q.q.trim());
    if (valid.length === 0) {
      console.warn(`[getActiveQuiz] Live quiz "${quiz.title}" has no questions — not showing it.`);
      return null;
    }

    return {
      id: quiz.id,
      campaign: quiz.campaign,
      title: quiz.title,
      tagline: quiz.tagline,
      steps: quiz.steps,
      prize: quiz.prize,
      description: quiz.description,
      sponsor: quiz.sponsor,
      prizeImageUrl: quiz.prizeImageUrl,
      promoCopy: quiz.promoCopy,
      endsAt: quiz.endsAt?.toISOString() ?? null,
      questions: valid,
    };
  },
  ["active-quiz"],
  { tags: [QUIZ_CACHE_TAG], revalidate: 600 }
);

export async function getActiveQuiz(): Promise<ActiveQuiz | null> {
  try {
    const quiz = await loadLiveQuiz();
    // The cached copy may outlive the quiz's end time by up to one tick.
    if (quiz?.endsAt && new Date(quiz.endsAt) <= new Date()) return null;
    return quiz;
  } catch (err) {
    // Showing "quiz on hold" beats serving a stale or wrong campaign.
    console.error("[getActiveQuiz] Database read failed:", err);
    return null;
  }
}
