export type StoredQuizStatus = "draft" | "published" | "archived";
export type EffectiveQuizStatus = "draft" | "scheduled" | "live" | "closed" | "archived";

export const QUIZ_CACHE_TAG = "quiz";

export function effectiveQuizStatus(
  quiz: { status: StoredQuizStatus; startsAt: Date | string; endsAt: Date | string | null },
  now: Date = new Date()
): EffectiveQuizStatus {
  if (quiz.status !== "published") return quiz.status;
  if (new Date(quiz.startsAt) > now) return "scheduled";
  if (quiz.endsAt && new Date(quiz.endsAt) <= now) return "closed";
  return "live";
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-9);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
