import { getStore } from "@netlify/blobs";

// Durable buffer for quiz entries that couldn't be written to Airtable immediately
// (quota exceeded, network error, etc). Netlify Blobs lives on the same platform as
// the site, so it needs no new account/signup and survives Airtable outages of any
// length. Entries here are the source of truth until they're synced to Airtable.
const STORE_NAME = "quiz-pending-entries";

export type PendingQuizEntry = {
  name: string;
  phone: string;
  email: string;
  county: string;
  score: number;
  totalQuestions: number;
  answers: unknown[];
  submittedAt: string;
};

function store() {
  return getStore(STORE_NAME);
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-9);
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

// Closes the race where the same phone submits twice while the first entry is
// still waiting to sync (Airtable's own duplicate check can't see it yet).
export async function findPendingEntryByPhone(phone: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (normalized.length !== 9) return false;
  const pending = await listPendingEntries();
  return pending.some((p) => normalizePhone(p.entry.phone) === normalized);
}
