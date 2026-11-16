import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { and, eq, gt, lte, or } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_CACHE_TAG } from "@/lib/quizStatus";

// Called every 5 minutes by netlify/functions/sync-pending-quiz-entries.ts.
// If any published quiz started or ended within the last window, refresh the
// cached quiz so the site opens/closes it on schedule without anyone clicking.
const WINDOW_MS = 6 * 60 * 1000;

export async function POST(req: NextRequest) {
  const secret = process.env.QUIZ_SYNC_SECRET;
  if (!secret || req.headers.get("x-sync-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const since = new Date(now.getTime() - WINDOW_MS);
  const crossed = await getDb()
    .select({ id: schema.quizzes.id })
    .from(schema.quizzes)
    .where(
      and(
        eq(schema.quizzes.status, "published"),
        or(
          and(gt(schema.quizzes.startsAt, since), lte(schema.quizzes.startsAt, now)),
          and(gt(schema.quizzes.endsAt, since), lte(schema.quizzes.endsAt, now))
        )
      )
    );

  if (crossed.length > 0) revalidateTag(QUIZ_CACHE_TAG);
  return NextResponse.json({ revalidated: crossed.length > 0 });
}
