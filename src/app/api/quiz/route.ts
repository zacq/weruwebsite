import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { isValidFullName, isValidKenyanPhone, isValidEmail } from "@/lib/validateLead";
import { getActiveQuiz } from "@/lib/getActiveQuiz";
import { normalizePhone } from "@/lib/quizStatus";
import { writeQuizEntry } from "@/lib/writeQuizEntry";
import { savePendingEntry, deletePendingEntry, findPendingEntryByPhone, type PendingQuizEntry } from "@/lib/quizPendingEntries";
import { MAX_SCREENSHOTS, MAX_SCREENSHOT_BYTES, SCREENSHOT_TYPES, saveScreenshot } from "@/lib/quizScreenshots";

const MAX_ANSWER_LENGTH = 500;

const duplicate = () =>
  NextResponse.json({ success: false, duplicate: true, error: "This phone number has already entered this week's quiz." }, { status: 409 });

// Accepts multipart/form-data: quizId, name, phone, email?, county?,
// answers (JSON: [{ questionId, answer }]), screenshots (0–3 image files).
// Answers are free text and are marked by staff in the dashboard.
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const str = (key: string) => {
      const v = form.get(key);
      return typeof v === "string" ? v.trim() : "";
    };
    const name = str("name");
    const phone = str("phone");
    const email = str("email");
    const county = str("county");

    if (!isValidFullName(name) || !isValidKenyanPhone(phone) || (email && !isValidEmail(email))) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name and a valid Kenyan phone number." },
        { status: 400 }
      );
    }

    const quiz = await getActiveQuiz();
    if (!quiz || quiz.id !== str("quizId")) {
      return NextResponse.json({ success: false, error: "This quiz has closed. Watch out for next week's quiz!" }, { status: 410 });
    }

    let submitted: { questionId?: unknown; answer?: unknown }[] = [];
    try {
      submitted = JSON.parse(str("answers") || "[]");
    } catch {
      // handled by the completeness check below
    }
    const answers = quiz.questions.map((q) => {
      const raw = Array.isArray(submitted) ? submitted.find((a) => a?.questionId === q.id)?.answer : undefined;
      return { questionId: q.id, question: q.q, answer: typeof raw === "string" ? raw.trim().slice(0, MAX_ANSWER_LENGTH) : "", correct: null };
    });
    if (answers.some((a) => !a.answer)) {
      return NextResponse.json({ success: false, error: "Please answer every question." }, { status: 400 });
    }

    const files = form.getAll("screenshots").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_SCREENSHOTS) {
      return NextResponse.json({ success: false, error: `You can attach up to ${MAX_SCREENSHOTS} screenshots.` }, { status: 400 });
    }
    if (files.some((f) => !SCREENSHOT_TYPES.includes(f.type) || f.size > MAX_SCREENSHOT_BYTES)) {
      return NextResponse.json({ success: false, error: "Screenshots must be JPG, PNG or WebP images." }, { status: 400 });
    }

    // Reject duplicates before storing any screenshots.
    if (await findPendingEntryByPhone(quiz.id, phone)) return duplicate();
    try {
      const [existing] = await getDb()
        .select({ id: schema.quizEntries.id })
        .from(schema.quizEntries)
        .where(and(eq(schema.quizEntries.quizId, quiz.id), eq(schema.quizEntries.phoneNormalized, normalizePhone(phone))))
        .limit(1);
      if (existing) return duplicate();
    } catch {
      // DB unreachable — the unique index catches duplicates when the buffered entry syncs.
    }

    const screenshots = await Promise.all(files.map((f) => saveScreenshot(quiz.id, f)));

    const entry: PendingQuizEntry = {
      quizId: quiz.id,
      name,
      phone,
      email: email || null,
      county: county || null,
      answers,
      screenshots,
      submittedAt: new Date().toISOString(),
    };

    // Write to the durable buffer FIRST so "success" is only ever claimed once the
    // entry is captured somewhere durable. If the DB write below fails, the entry
    // stays buffered and the scheduled sync retries it.
    const entryId = randomUUID();
    if (!(await savePendingEntry(entryId, entry))) {
      return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
    }

    const result = await writeQuizEntry(entry);
    if (result.ok) {
      await deletePendingEntry(entryId);
    } else if (result.duplicate) {
      await deletePendingEntry(entryId);
      return duplicate();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[QUIZ ERROR]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
