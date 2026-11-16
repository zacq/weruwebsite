// Scheduled function — fires every 5 minutes and:
//  1. nudges /api/quiz/sync-pending to retry quiz entries stuck in the Netlify
//     Blobs buffer (see src/lib/quizPendingEntries.ts), and
//  2. calls /api/quiz/tick so quizzes open and close on their scheduled times.
export default async () => {
  const secret = process.env.QUIZ_SYNC_SECRET;
  if (!secret) {
    console.error("[sync-pending-quiz-entries] QUIZ_SYNC_SECRET not set — skipping run");
    return;
  }

  const siteUrl = process.env.URL || "https://werudigital.co.ke";

  for (const path of ["/api/quiz/sync-pending", "/api/quiz/tick"]) {
    try {
      const res = await fetch(`${siteUrl}${path}`, {
        method: "POST",
        headers: { "x-sync-secret": secret },
      });
      const data = await res.json().catch(() => ({}));
      console.log(`[sync-pending-quiz-entries] ${path} ${res.status}`, JSON.stringify(data));
    } catch (err) {
      console.error(`[sync-pending-quiz-entries] ${path} failed:`, err);
    }
  }
};

export const config = {
  schedule: "*/5 * * * *",
};
