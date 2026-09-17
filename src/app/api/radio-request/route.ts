import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tbl97g7j9lQ8WJXJU"; // Radio Requests

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, request } = body;

    if (typeof request !== "string" || request.trim().length < 2 || request.trim().length > 200) {
      return NextResponse.json(
        { success: false, error: "Please enter a song or shoutout." },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[RADIO REQUEST] AIRTABLE_PAT env var not set");
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
          Name: typeof name === "string" ? name.trim().slice(0, 80) : "",
          Request: request.trim(),
          "Submitted At": new Date().toISOString(),
          Status: "New",
        },
      }),
    });

    if (!res.ok) {
      console.error("[RADIO REQUEST] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[RADIO REQUEST ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
