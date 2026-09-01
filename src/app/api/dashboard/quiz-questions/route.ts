import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblBY4sjWC3gztd4V";

export async function GET() {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const records: unknown[] = [];
  let offset: string | undefined;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("sort[0][field]", "Order");
    url.searchParams.set("sort[0][direction]", "asc");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${pat}` }, cache: "no-store" });
    if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });
    const data = (await res.json()) as { records: unknown[]; offset?: string };
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return NextResponse.json({ records });
}

export async function POST(req: NextRequest) {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const body = await req.json();
  const { quizId, question, options, correctAnswer, order } = body as {
    quizId?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    order?: number;
  };

  if (!quizId || !question?.trim() || !options || options.length < 2 || !correctAnswer?.trim()) {
    return NextResponse.json(
      { error: "quizId, question, at least 2 options, and correctAnswer are required" },
      { status: 400 }
    );
  }
  if (!options.includes(correctAnswer)) {
    return NextResponse.json({ error: "correctAnswer must match one of the options exactly" }, { status: 400 });
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        Question: question.trim(),
        Quiz: [quizId],
        Options: options.map((o) => o.trim()).filter(Boolean).join("\n"),
        "Correct Answer": correctAnswer.trim(),
        Order: typeof order === "number" ? order : 1,
      },
    }),
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  const created = await res.json();
  return NextResponse.json(created);
}
