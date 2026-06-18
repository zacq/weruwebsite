import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_RATE_CARD_TABLE_ID ?? "tbliYbLcpLfLal9An";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, adType, packages, message } = body;

    if (!name || !phone || !adType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.log("[RATE CARD]", { name, company, phone, email, adType, packages, message });
      return NextResponse.json({ success: true });
    }

    const fields: Record<string, unknown> = {
      Name:           name,
      Phone:          phone,
      "Ad Type":      adType,
      "Submitted At": new Date().toISOString(),
      Status:         "New",
    };
    if (email)    fields.Email    = email;
    if (company)  fields.Company  = company;
    if (packages) fields.Packages = packages;
    if (message)  fields.Message  = message;

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
