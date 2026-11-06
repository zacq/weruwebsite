const BASE_ID = "appXyMV3O6ycSVRAi";
const QUIZZES_TABLE_ID   = process.env.AIRTABLE_QUIZZES_TABLE_ID ?? "tbldtDg3hJU0ME5iZ";
const QUESTIONS_TABLE_ID = process.env.AIRTABLE_QUIZ_QUESTIONS_TABLE_ID ?? "tblBY4sjWC3gztd4V";

export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number;
};

export type ActiveQuiz = {
  title: string;
  prize: string;
  questions: QuizQuestion[];
};

// Mirrors whatever quiz campaign is currently live in Airtable (Quizzes table, "The Kisimani
// Experience Quiz Challenge" record) — this is the safety net for when Airtable is unreachable
// (rate-limited, billing-limit exceeded, network error), so it must be kept in sync by hand
// whenever the active campaign changes. It must NEVER be a stale/retired quiz: during an active
// marketing campaign, showing the wrong quiz here is worse than showing a generic "come back
// soon" message, since visitors scanning the campaign QR code would see unrelated content.
const FALLBACK_QUIZ: ActiveQuiz = {
  title: "The Kisimani Experience Quiz Challenge",
  prize: "amazing resort experiences at Kisimani Eco Resort & Spa",
  questions: [
    { q: "Which experience at Kisimani gives visitors the thrill of soaring through treetops while enjoying the natural surroundings?", options: ["Nature Walk", "Archery Session", "Ziplining Experience", "Farm Tour"], correct: 2 },
    { q: "What is one of the main benefits of staying at an eco-resort?", options: ["Conserving natural resources and protecting biodiversity", "Increasing waste production", "Excessive water and energy consumption", "Replacing local products with imported products"], correct: 0 },
    { q: "What is the name of the digital platform that brings WERU TV and WERU FM content together?", options: ["Weru Media Hub", "WERU DIGITAL", "Weru Online", "Weru Network"], correct: 1 },
    { q: "Which language is primarily used in WERU TV broadcasts?", options: ["English", "Kiswahili", "Kimeru", "Kikuyu"], correct: 2 },
    { q: "Which of the following correctly identifies five types of farming practised at Kisimani?", options: ["Organic farming, dairy farming, poultry farming, fish farming and beekeeping", "Tea, coffee, wheat, cotton and sugarcane farming", "Flower, tobacco, rice, tea and coffee farming", "Maize, wheat, barley, cotton and sugarcane farming"], correct: 0 },
    { q: "Which experience allows visitors to explore the natural surroundings at Kisimani?", options: ["Spa Treatment", "Nature Walk", "Farm-to-Table Dining", "Archery"], correct: 1 },
    { q: "What does Farm-to-Table dining mean?", options: ["Preparing meals using fresh produce sourced directly from the farm", "Preparing meals using imported ingredients only", "Serving traditional meals only", "Preparing meals using products sourced exclusively from supermarkets"], correct: 0 },
    { q: "What is the frequency of WERU FM?", options: ["96.4 FM", "98.4 FM", "94.6 FM", "102.4 FM"], correct: 0 },
    { q: "Which combination features five experiences available at Kisimani?", options: ["Swimming, ziplining, nature walks, archery and spa", "Golf, skiing, snowboarding, surfing and skating", "Horse racing, motor racing, skiing, surfing and golf", "Mountain climbing, scuba diving, skiing, skating and surfing"], correct: 0 },
    { q: "Which website should audiences visit to access WERU DIGITAL content?", options: ["www.werutv.co.ke", "www.werufm.co.ke", "www.werudigital.co.ke", "www.werumedia.co.ke"], correct: 2 },
    { q: "After an exciting day of adventure at Kisimani, which experience would be ideal for relaxation?", options: ["Ziplining", "Archery", "Spa Treatment", "Farm Tour"], correct: 2 },
  ],
};

type AirtableRecord = { id: string; fields: Record<string, unknown> };

function mapQuestion(record: AirtableRecord): QuizQuestion | null {
  const f = record.fields;
  const q = (f.Question as string | undefined)?.trim();
  const optionsRaw = (f.Options as string | undefined) ?? "";
  const options = optionsRaw.split("\n").map((o) => o.trim()).filter(Boolean);
  const correctAnswer = (f["Correct Answer"] as string | undefined)?.trim();
  const correct = correctAnswer ? options.indexOf(correctAnswer) : -1;

  if (!q || options.length < 2 || correct === -1) {
    console.warn("[getActiveQuiz] Skipping malformed question record:", q ?? "(unnamed)");
    return null;
  }

  return { q, options, correct };
}

export async function getActiveQuiz(): Promise<ActiveQuiz | null> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_QUIZ;

  try {
    const quizRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${QUIZZES_TABLE_ID}?filterByFormula=${encodeURIComponent(
        "{Status}='Active'"
      )}&maxRecords=1`,
      { headers: { Authorization: `Bearer ${pat}` }, next: { revalidate: 3600 } }
    );

    if (!quizRes.ok) {
      console.error("[getActiveQuiz] Airtable error (quiz):", await quizRes.text());
      return FALLBACK_QUIZ;
    }

    const quizData = (await quizRes.json()) as { records: AirtableRecord[] };
    const quizRecord = quizData.records[0];
    if (!quizRecord) return null; // No active quiz — a deliberate "quiz paused" state, not an error.

    const title = (quizRecord.fields.Title as string | undefined)?.trim() || FALLBACK_QUIZ.title;
    const prize = (quizRecord.fields.Prize as string | undefined)?.trim() || FALLBACK_QUIZ.prize;

    // Linked-record fields resolve to display values (not IDs) inside Airtable formulas,
    // so filtering by quiz ID has to happen client-side against the raw `Quiz` ID array
    // the records API returns, rather than via filterByFormula.
    const questionsRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${QUESTIONS_TABLE_ID}?pageSize=100&sort[0][field]=Order&sort[0][direction]=asc`,
      { headers: { Authorization: `Bearer ${pat}` }, next: { revalidate: 3600 } }
    );

    if (!questionsRes.ok) {
      console.error("[getActiveQuiz] Airtable error (questions):", await questionsRes.text());
      return FALLBACK_QUIZ;
    }

    const questionsData = (await questionsRes.json()) as { records: AirtableRecord[] };
    const questions = questionsData.records
      .filter((r) => (r.fields.Quiz as string[] | undefined)?.includes(quizRecord.id))
      .map(mapQuestion)
      .filter((q): q is QuizQuestion => q !== null);

    if (questions.length < 2) {
      console.warn(`[getActiveQuiz] Active quiz "${title}" has ${questions.length} valid questions — falling back.`);
      return FALLBACK_QUIZ;
    }

    return { title, prize, questions };
  } catch (err) {
    console.error("[getActiveQuiz] Fetch failed:", err);
    return FALLBACK_QUIZ;
  }
}
