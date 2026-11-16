import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

export async function GET() {
  const auth = await requireRole(["admin", "editor", "quiz_manager"]);
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ name: auth.name, email: auth.email, role: auth.role });
}
