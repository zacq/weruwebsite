import { NextRequest, NextResponse } from "next/server";
import { isValidFullName, isValidKenyanPhone, isValidEmail } from "@/lib/validateLead";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblukJS1pCXs85ydk";

// Kenyan numbers vary in stored format (0712345678 vs +254712345678) — compare on the last 9 digits.
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-9);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, county, answers } = body;

    if (!isValidFullName(name) || !isValidKenyanPhone(phone) || !isValidEmail(email) || !(typeof county === "string" && county.trim().length > 0)) {
      return NextResponse.json(
        { success: false, error: "Please fill in your full name, phone, email and county/town." },
        { status: 400 }
      );
    }

    // Only a perfect score qualifies for the prize draw — recompute from the answers
    // the client sent rather than trusting a separate score field.
    const answerList = Array.isArray(answers) ? answers : [];
    const score = answerList.filter((a) => a?.correct === true).length;
    const totalQuestions = answerList.length;
    if (totalQuestions === 0 || score !== totalQuestions) {
      return NextResponse.json(
        { success: false, error: "Only a perfect score qualifies for the prize draw." },
        { status: 400 }
      );
    }

    const pat = process.env.AIRTABLE_PAT;
    if (!pat) {
      console.error("[QUIZ ENTRY] AIRTABLE_PAT env var not set");
      return NextResponse.json({ success: true });
    }

    const normalized = normalizePhone(phone);
    if (normalized.length === 9) {
      const filterFormula = `RIGHT(REGEX_REPLACE({Phone}, "[^0-9]", ""), 9) = "${normalized}"`;
      const dupRes = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${encodeURIComponent(filterFormula)}&maxRecords=1`,
        { headers: { Authorization: `Bearer ${pat}` } }
      );
      if (dupRes.ok) {
        const dupData = await dupRes.json();
        if (dupData.records?.length > 0) {
          return NextResponse.json(
            { success: false, duplicate: true, error: "This phone number has already entered." },
            { status: 409 }
          );
        }
      } else {
        console.error("[QUIZ ENTRY] Duplicate-check error:", await dupRes.text());
      }
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
          Email: email,
          "County/Town": county.trim(),
          Score: score,
          "Total Questions": totalQuestions,
          "Answers (JSON)": JSON.stringify(answerList),
          "Submitted At": new Date().toISOString(),
          "Draw Status": "Pending",
        },
      }),
    });

    if (!res.ok) {
      console.error("[QUIZ ENTRY] Airtable error:", await res.text());
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[QUIZ ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
