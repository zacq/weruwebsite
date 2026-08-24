import { NextRequest, NextResponse } from "next/server";
import { isValidFullName, isValidKenyanPhone } from "@/lib/validateLead";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblYEsFb2gKyPariy"; // Presenter Leads

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
      console.error("[PRESENTER LEAD] AIRTABLE_PAT env var not set");
      return NextResponse.json({ success: true });
    }

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // The Interests field is a single-select keyed on the presenter's show name —
        // typecast auto-creates a new option the first time a given show is requested.
        typecast: true,
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
      console.error("[PRESENTER LEAD] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PRESENTER LEAD ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
