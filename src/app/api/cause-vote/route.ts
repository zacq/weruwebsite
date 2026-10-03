import { NextRequest, NextResponse } from "next/server";
import { CAUSES } from "@/data/causes";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblW0fenNcFlHDpbM";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cause } = body;

    if (!CAUSES.includes(cause)) {
      return NextResponse.json(
        { success: false, error: "Please choose a valid cause." },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[CAUSE VOTE] AIRTABLE_PAT env var not set");
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
          Cause: cause,
          "Submitted At": new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      console.error("[CAUSE VOTE] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CAUSE VOTE ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
