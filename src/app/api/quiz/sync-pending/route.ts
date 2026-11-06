import { NextRequest, NextResponse } from "next/server";
import { listPendingEntries, deletePendingEntry } from "@/lib/quizPendingEntries";
import { writeQuizEntryToAirtable } from "@/lib/writeQuizEntryToAirtable";

// Retries quiz entries stuck in the pending buffer (saved there because Airtable was
// unreachable at submission time) against Airtable, clearing each one once it lands.
// Called on a schedule by netlify/functions/sync-pending-quiz-entries.ts, and can be
// triggered manually with the same header for testing or an on-demand nudge.
export async function POST(req: NextRequest) {
  const secret = process.env.QUIZ_SYNC_SECRET;
  if (!secret || req.headers.get("x-sync-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = await listPendingEntries();
  let synced = 0;
  let stillPending = 0;
  const errors: string[] = [];

  for (const { id, entry } of pending) {
    const result = await writeQuizEntryToAirtable(entry);
    if (result.ok || result.duplicate) {
      // Already in Airtable (freshly synced, or it landed there some other way) — clear it.
      await deletePendingEntry(id);
      synced++;
    } else {
      stillPending++;
      errors.push(result.error);
    }
  }

  return NextResponse.json({ synced, stillPending, errors });
}
