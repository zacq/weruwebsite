import { NextRequest, NextResponse } from "next/server";
import { isValidFullName, isValidKenyanPhone } from "@/lib/validateLead";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblNd90qLZJDylUR5";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!isValidFullName(name) || !isValidKenyanPhone(phone) || trimmedMessage.length < 3 || trimmedMessage.length > 500) {
      return NextResponse.json(
        { success: false, error: "Please share a short message, your name and a valid Kenyan phone number." },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[NICE MESSAGE] AIRTABLE_PAT env var not set");
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
          Message: trimmedMessage,
          "Submitted At": new Date().toISOString(),
          Status: "New",
        },
      }),
    });

    if (!res.ok) {
      console.error("[NICE MESSAGE] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[NICE MESSAGE ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
