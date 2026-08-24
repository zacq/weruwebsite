import { NextRequest, NextResponse } from "next/server";
import { isValidFullName, isValidKenyanPhone } from "@/lib/validateLead";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblWuPMHzBHoc8wjF"; // Viewer Leads

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, interests } = body;

    if (!isValidFullName(name) || !isValidKenyanPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name and a valid Kenyan phone number." },
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
          Interests: Array.isArray(interests) ? interests : interests ? [interests] : [],
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
