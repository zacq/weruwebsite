import { and, eq, gt, isNull, lt, ne, or, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";
import type { QuizPromoCopy } from "@/db/schema";
import { slugify } from "@/lib/quizStatus";

export type QuizInput = {
  campaign?: string | null;
  title?: string;
  tagline?: string | null;
  description?: string | null;
  steps?: string[];
  prize?: string | null;
  sponsor?: string | null;
  prizeImageUrl?: string | null;
  promoCopy?: QuizPromoCopy | null;
  startsAt?: string;
  endsAt?: string | null;
  status?: "draft" | "published" | "archived";
};

const optional = (v: string | null | undefined) => v?.trim() || null;

function parseDate(value: string | null | undefined): Date | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export function toQuizValues(input: QuizInput): Partial<typeof schema.quizzes.$inferInsert> | string {
  const set: Partial<typeof schema.quizzes.$inferInsert> = {};
  if (input.title !== undefined) {
    if (!input.title.trim()) return "Title is required";
    set.title = input.title.trim();
  }
  if (input.campaign !== undefined) set.campaign = optional(input.campaign);
  if (input.tagline !== undefined) set.tagline = optional(input.tagline);
  if (input.description !== undefined) set.description = optional(input.description);
  if (input.steps !== undefined) set.steps = input.steps.map((s) => s.trim()).filter(Boolean);
  if (input.prize !== undefined) set.prize = optional(input.prize);
  if (input.sponsor !== undefined) set.sponsor = optional(input.sponsor);
  if (input.prizeImageUrl !== undefined) set.prizeImageUrl = optional(input.prizeImageUrl);
  if (input.promoCopy !== undefined) set.promoCopy = input.promoCopy;
  if (input.startsAt !== undefined) {
    const d = parseDate(input.startsAt);
    if (!d) return "Invalid start date";
    set.startsAt = d;
  }
  if (input.endsAt !== undefined) {
    const d = parseDate(input.endsAt);
    if (d === undefined) return "Invalid end date";
    set.endsAt = d;
  }
  if (input.status !== undefined) {
    if (!["draft", "published", "archived"].includes(input.status)) return "Invalid status";
    set.status = input.status;
  }
  return set;
}

export async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "quiz";
  const existing = await getDb()
    .select({ slug: schema.quizzes.slug })
    .from(schema.quizzes)
    .where(sql`${schema.quizzes.slug} = ${base} OR ${schema.quizzes.slug} LIKE ${base + "-%"}`);
  if (existing.length === 0) return base;
  return `${base}-${existing.length + 1}`;
}

// A quiz can only be published if it has questions and its schedule doesn't
// overlap another published quiz — the site shows one quiz at a time.
export async function publishProblem(
  quizId: string,
  startsAt: Date,
  endsAt: Date | null
): Promise<string | null> {
  const db = getDb();
  if (endsAt && endsAt <= startsAt) return "Closing time must be after the opening time";

  const questions = await db
    .select({ question: schema.quizQuestions.question })
    .from(schema.quizQuestions)
    .where(eq(schema.quizQuestions.quizId, quizId));
  if (questions.length === 0) return "Add at least one question before publishing";
  if (questions.some((q) => !q.question.trim())) return "One of the questions is empty";

  const [clash] = await db
    .select({ title: schema.quizzes.title })
    .from(schema.quizzes)
    .where(
      and(
        ne(schema.quizzes.id, quizId),
        eq(schema.quizzes.status, "published"),
        or(isNull(schema.quizzes.endsAt), gt(schema.quizzes.endsAt, startsAt)),
        endsAt ? lt(schema.quizzes.startsAt, endsAt) : undefined
      )
    )
    .limit(1);
  if (clash) return `Schedule overlaps "${clash.title}" — change the dates or close that quiz first`;

  return null;
}
