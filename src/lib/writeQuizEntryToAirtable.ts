const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblukJS1pCXs85ydk";

export type QuizEntryPayload = {
  name: string;
  phone: string;
  email: string;
  county: string;
  score: number;
  totalQuestions: number;
  answers: unknown[];
  submittedAt: string;
};

export type WriteResult =
  | { ok: true }
  | { ok: false; duplicate: true }
  | { ok: false; duplicate: false; error: string };

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-9);
}

export async function writeQuizEntryToAirtable(entry: QuizEntryPayload): Promise<WriteResult> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return { ok: false, duplicate: false, error: "AIRTABLE_PAT not set" };

  const normalized = normalizePhone(entry.phone);
  if (normalized.length === 9) {
    const filterFormula = `RIGHT(REGEX_REPLACE({Phone}, "[^0-9]", ""), 9) = "${normalized}"`;
    const dupRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${encodeURIComponent(filterFormula)}&maxRecords=1`,
      { headers: { Authorization: `Bearer ${pat}` } }
    );
    if (dupRes.ok) {
      const dupData = await dupRes.json();
      if (dupData.records?.length > 0) {
        return { ok: false, duplicate: true };
      }
    } else {
      console.error("[writeQuizEntryToAirtable] Duplicate-check error:", await dupRes.text());
      // Best-effort check — fall through and attempt the insert anyway.
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
        Name: entry.name,
        Phone: entry.phone,
        Email: entry.email,
        "County/Town": entry.county,
        Score: entry.score,
        "Total Questions": entry.totalQuestions,
        "Answers (JSON)": JSON.stringify(entry.answers),
        "Submitted At": entry.submittedAt,
        "Draw Status": "Pending",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[writeQuizEntryToAirtable] Airtable error:", text);
    return { ok: false, duplicate: false, error: text };
  }

  return { ok: true };
}
