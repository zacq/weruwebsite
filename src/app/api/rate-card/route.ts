import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblaRTNBlhZAAfA07";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, adType, budget, message } = body;

    if (!name || !phone || !email || !adType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[RATE CARD] AIRTABLE_PAT env var not set");
      return NextResponse.json({ success: true });
    }

    const fields: Record<string, unknown> = {
      Name: name,
      Phone: phone,
      Email: email,
      "Ad Type": adType,
      "Submitted At": new Date().toISOString(),
      Status: "New",
    };
    if (company)  fields.Company = company;
    if (budget)   fields.Budget  = budget;
    if (message)  fields.Message = message;

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      console.error("[RATE CARD] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[RATE CARD ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
