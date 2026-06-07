import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblYEsFb2gKyPariy";

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

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[VIEWER CAPTURE] AIRTABLE_PAT env var not set");
      return NextResponse.json({ success: true });
    }

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Phone: phone,
          Interests: Array.isArray(interests) ? interests[0] : interests,
          "Submitted At": new Date().toISOString().split("T")[0],
          Status: "New",
        },
      }),
    });

    if (!res.ok) {
      console.error("[VIEWER CAPTURE] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[VIEWER CAPTURE ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
