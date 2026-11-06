// Scheduled function — fires every 5 minutes and nudges /api/quiz/sync-pending to
// retry any quiz entries stuck in the Netlify Blobs buffer against Airtable. See
// src/lib/quizPendingEntries.ts for why the buffer exists.
export default async () => {
  const secret = process.env.QUIZ_SYNC_SECRET;
  if (!secret) {
    console.error("[sync-pending-quiz-entries] QUIZ_SYNC_SECRET not set — skipping run");
    return;
  }

  const siteUrl = process.env.URL || "https://werudigital.co.ke";

  try {
    const res = await fetch(`${siteUrl}/api/quiz/sync-pending`, {
      method: "POST",
      headers: { "x-sync-secret": secret },
    });
    const data = await res.json().catch(() => ({}));
    console.log(`[sync-pending-quiz-entries] ${res.status}`, JSON.stringify(data));
  } catch (err) {
    console.error("[sync-pending-quiz-entries] Failed:", err);
  }
};

export const config = {
  schedule: "*/5 * * * *",
};
