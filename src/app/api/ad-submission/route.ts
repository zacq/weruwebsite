import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_AD_TABLE_ID ?? "tblifCk8Mp05lyyVo";
const DURATIONS = [15, 30, 45, 60, 90];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      contactName, company, phone, email, adType,
      videoAdLink, documentsLink, adDurationIndex,
      flightStartDate, flightEndDate, timeSlotPref,
      daysOfWeek, instructions,
    } = body;

    if (!contactName || !phone || !email || !adType || !flightStartDate || !flightEndDate) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;

    if (!pat) {
      console.log("[AD SUBMISSION]", {
        contactName, company, phone, email, adType,
        adDuration: `${DURATIONS[adDurationIndex] ?? 30} seconds`,
        flightStartDate, flightEndDate, timeSlotPref,
        daysOfWeek, instructions, videoAdLink, documentsLink,
      });
      return NextResponse.json({ success: true });
    }

    const fields: Record<string, unknown> = {
      "Contact Name": contactName,
      "Phone":        phone,
      "Email":        email,
      "Ad Type":      adType,
      "Ad Duration":  `${DURATIONS[adDurationIndex] ?? 30} seconds`,
      "Flight Start": flightStartDate,
      "Flight End":   flightEndDate,
      "Time Slot":    timeSlotPref,
      "Days of Week": Array.isArray(daysOfWeek) ? daysOfWeek.join(", ") : String(daysOfWeek),
      "Submitted At": new Date().toISOString(),
      "Status":       "New",
    };
    if (company)       fields["Company"]        = company;
    if (videoAdLink)   fields["Video Ad Link"]  = videoAdLink;
    if (documentsLink) fields["Documents Link"] = documentsLink;
    if (instructions)  fields["Instructions"]   = instructions;

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      console.error("[AD SUBMISSION] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[AD SUBMISSION ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
