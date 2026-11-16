import { NextRequest, NextResponse } from "next/server";
import { QUIZ_ROLES, requireRole } from "@/lib/auth";
import { getScreenshot } from "@/lib/quizScreenshots";

// GET ?key=<blob key> — streams an entry screenshot to signed-in quiz staff only.
export async function GET(req: NextRequest) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;

  const key = req.nextUrl.searchParams.get("key");
  if (!key || !/^[0-9a-f-]{36}\/[0-9a-f-]{36}$/.test(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const shot = await getScreenshot(key);
  if (!shot) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return new NextResponse(shot.data, {
    headers: { "Content-Type": shot.contentType, "Cache-Control": "private, max-age=86400" },
  });
}
