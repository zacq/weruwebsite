import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isValidFullName, isValidKenyanPhone, isValidEmail } from "@/lib/validateLead";
import { writeQuizEntryToAirtable, type QuizEntryPayload } from "@/lib/writeQuizEntryToAirtable";
import { savePendingEntry, deletePendingEntry, findPendingEntryByPhone } from "@/lib/quizPendingEntries";

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

    const entry: QuizEntryPayload = {
      name,
      phone,
      email,
      county: county.trim(),
      score,
      totalQuestions,
      answers: answerList,
      submittedAt: new Date().toISOString(),
    };

    // Catches a duplicate submission made while an earlier entry for the same
    // phone is still sitting in the pending buffer (not yet synced to Airtable,
    // so Airtable's own duplicate check can't see it yet).
    if (await findPendingEntryByPhone(phone)) {
      return NextResponse.json(
        { success: false, duplicate: true, error: "This phone number has already entered." },
        { status: 409 }
      );
    }

    // Write to the durable buffer FIRST — this is the step that must succeed for the
    // entry to be safe. Airtable is written best-effort below; if that fails (quota,
    // outage, network), the entry stays here and a scheduled sync retries it later.
    // This means "success" to the visitor is only ever claimed once the lead is
    // actually captured somewhere durable, never just attempted.
    const entryId = randomUUID();
    const buffered = await savePendingEntry(entryId, entry);
    if (!buffered) {
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    const result = await writeQuizEntryToAirtable(entry);
    if (result.ok) {
      await deletePendingEntry(entryId);
    } else if (result.duplicate) {
      // Someone else's entry for this phone landed in Airtable between our buffer
      // check and now — drop our buffered copy rather than double-entering them.
      await deletePendingEntry(entryId);
      return NextResponse.json(
        { success: false, duplicate: true, error: "This phone number has already entered." },
        { status: 409 }
      );
    }
    // On any other failure the entry simply stays in the pending buffer — already
    // logged inside writeQuizEntryToAirtable — to be retried by the sync job.

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[QUIZ ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
