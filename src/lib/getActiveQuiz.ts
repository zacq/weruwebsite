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

const FALLBACK_QUIZ: ActiveQuiz = {
  title: "96+4 Quiz",
  prize: "KSh 5,000 shopping voucher plus a visit to the Weru Studios",
  questions: [
    { q: "When did Weru FM begin broadcasting?", options: ["26th Dec 2016", "3rd July 2017", "26th Dec 2017"], correct: 1 },
    { q: "Who is the current host of Weru Beats?", options: ["Empress Natty", "Ajelyne George", "Mwenda H the Pilot"], correct: 0 },
    { q: "Who among these is not a news anchor on Weru FM?", options: ["Mercy Ndumba", "Dorcas Kaaria", "Raymond Mwenda"], correct: 1 },
    { q: "Who was the first host of Reggae Kuruka?", options: ["Dj Tush untamed", "Selector Prince", "Empress Rita"], correct: 1 },
    { q: "Which is the Weru FM frequency?", options: ["96.4", "94.6", "96.6"], correct: 0 },
    { q: "Who is the current host of Mantu Kimencu?", options: ["Mc Kithumba", "Empress Rita", "Prince Ken"], correct: 0 },
    { q: "Who is the current host of Chanchamuka?", options: ["Martin Gichunge & Karimi Kaunty", "Martin Gichunge & Makena Matiri", "Makena Matiri"], correct: 2 },
    { q: "Who are the current hosts of Reggaemania on Weru FM?", options: ["Empress Rita & Dj Tush untamed", "Empress Rita & Empress Natty", "Empress Natty & Dj Tush untamed"], correct: 1 },
    { q: "Munene wa Kagwi hosts which shows on Weru FM?", options: ["Tuthunkume & Choir Kanisene", "Tuthunkume & Tuborerie", "Tuthunkume & Tutharimwe"], correct: 0 },
    { q: "Who among these have never hosted Chanchamuka on Weru FM?", options: ["Mc Kithumba", "Betty Ntinyari", "Morgan Mwiti"], correct: 2 },
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

    if (questions.length !== 10) {
      console.warn(`[getActiveQuiz] Active quiz "${title}" has ${questions.length}/10 valid questions — falling back.`);
      return FALLBACK_QUIZ;
    }

    return { title, prize, questions };
  } catch (err) {
    console.error("[getActiveQuiz] Fetch failed:", err);
    return FALLBACK_QUIZ;
  }
}
