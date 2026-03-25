import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, phone, interests } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // ── Log to console (replace with Supabase/DB insert below) ─────────────
    console.log("[VIEWER CAPTURE]", {
      name, phone, interests,
      timestamp: new Date().toISOString(),
    });

    /*
    ── SUPABASE INTEGRATION (uncomment when ready) ────────────────────────────
    import { createClient } from "@supabase/supabase-js";
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await supabase.from("viewer_leads").insert([{
      name, phone, interests: interests?.join(", ") ?? ""
    }]);
    */

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[VIEWER CAPTURE ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
