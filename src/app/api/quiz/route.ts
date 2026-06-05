import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, answers, score } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    console.log("[QUIZ ENTRY]", {
      name,
      phone,
      score,
      answers,
      timestamp: new Date().toISOString(),
    });

    /*
    ── AIRTABLE INTEGRATION (uncomment when base is ready) ──────────────────────
    Requires: npm install airtable
    Env vars: AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_QUIZ_TABLE

    import Airtable from "airtable";
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID!
    );
    await base(process.env.AIRTABLE_QUIZ_TABLE!).create([
      {
        fields: {
          Name: name,
          Phone: phone,
          Score: score,
          Answers: JSON.stringify(answers),
          "Submitted At": new Date().toISOString(),
        },
      },
    ]);
    ─────────────────────────────────────────────────────────────────────────── */

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[QUIZ ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
