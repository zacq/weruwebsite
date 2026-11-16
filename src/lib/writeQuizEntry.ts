import { getDb, schema } from "@/db";
import { normalizePhone } from "@/lib/quizStatus";
import type { PendingQuizEntry } from "@/lib/quizPendingEntries";

export type WriteResult =
  | { ok: true }
  | { ok: false; duplicate: true }
  | { ok: false; duplicate: false; error: string };

// The UNIQUE(quiz_id, phone_normalized) index is the duplicate check — one entry
// per phone per quiz, so people can enter every weekly quiz.
export async function writeQuizEntry(entry: PendingQuizEntry): Promise<WriteResult> {
  try {
    const inserted = await getDb()
      .insert(schema.quizEntries)
      .values({
        quizId: entry.quizId,
        name: entry.name,
        phone: entry.phone,
        phoneNormalized: normalizePhone(entry.phone),
        email: entry.email,
        county: entry.county,
        answers: entry.answers,
        screenshots: entry.screenshots,
        total: entry.answers.length,
        submittedAt: new Date(entry.submittedAt),
      })
      .onConflictDoNothing()
      .returning({ id: schema.quizEntries.id });

    return inserted.length > 0 ? { ok: true } : { ok: false, duplicate: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[writeQuizEntry] Database error:", error);
    return { ok: false, duplicate: false, error };
  }
}
