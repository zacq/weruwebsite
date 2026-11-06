import { NextResponse } from "next/server";
import { countPendingEntries } from "@/lib/quizPendingEntries";

// Protected by the dashboard auth middleware (matches /api/dashboard/*).
export async function GET() {
  const count = await countPendingEntries();
  return NextResponse.json({ count });
}
