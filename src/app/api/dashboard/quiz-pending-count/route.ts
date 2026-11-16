import { NextResponse } from "next/server";
import { countPendingEntries } from "@/lib/quizPendingEntries";
import { QUIZ_ROLES, requireRole } from "@/lib/auth";

export async function GET() {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const count = await countPendingEntries();
  return NextResponse.json({ count });
}
