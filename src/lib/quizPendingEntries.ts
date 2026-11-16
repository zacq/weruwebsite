import { getStore } from "@netlify/blobs";
import type { QuizAnswer } from "@/db/schema";
import { normalizePhone } from "@/lib/quizStatus";

// Durable buffer for quiz entries that couldn't be written to the database
// immediately (outage, network error). Netlify Blobs lives on the same platform
// as the site, so entries survive a DB outage of any length and are retried by
// /api/quiz/sync-pending on a 5-minute schedule.
const STORE_NAME = "quiz-pending-entries";

export type PendingQuizEntry = {
  quizId: string;
  name: string;
  phone: string;
  email: string | null;
  county: string | null;
  answers: QuizAnswer[];
  screenshots: string[];
  submittedAt: string;
};

function store() {
  return getStore(STORE_NAME);
}

export async function savePendingEntry(id: string, entry: PendingQuizEntry): Promise<boolean> {
  try {
    await store().setJSON(id, entry);
    return true;
  } catch (err) {
    console.error("[quizPendingEntries] Failed to save pending entry:", err);
    return false;
  }
}

export async function deletePendingEntry(id: string): Promise<void> {
  try {
    await store().delete(id);
  } catch (err) {
    console.error("[quizPendingEntries] Failed to delete pending entry:", id, err);
  }
}

export async function listPendingEntries(): Promise<{ id: string; entry: PendingQuizEntry }[]> {
  try {
    const { blobs } = await store().list();
    const results = await Promise.all(
      blobs.map(async (b) => {
        const entry = (await store().get(b.key, { type: "json" })) as PendingQuizEntry | null;
        return entry ? { id: b.key, entry } : null;
      })
    );
    return results.filter((r): r is { id: string; entry: PendingQuizEntry } => r !== null);
  } catch (err) {
    console.error("[quizPendingEntries] Failed to list pending entries:", err);
    return [];
  }
}

export async function countPendingEntries(): Promise<number> {
  try {
    const { blobs } = await store().list();
    return blobs.length;
  } catch (err) {
    console.error("[quizPendingEntries] Failed to count pending entries:", err);
    return 0;
  }
}

// Closes the race where the same phone submits twice for the same quiz while the
// first entry is still waiting to sync (the DB unique constraint can't see it yet).
export async function findPendingEntryByPhone(quizId: string, phone: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (normalized.length !== 9) return false;
  const pending = await listPendingEntries();
  return pending.some((p) => p.entry.quizId === quizId && normalizePhone(p.entry.phone) === normalized);
}
