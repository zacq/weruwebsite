import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tblBY4sjWC3gztd4V";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const body = await req.json();
  const { question, options, correctAnswer, order } = body as {
    question?: string;
    options?: string[];
    correctAnswer?: string;
    order?: number;
  };

  const fields: Record<string, unknown> = {};
  if (question !== undefined) fields.Question = question.trim();
  if (options !== undefined) fields.Options = options.map((o) => o.trim()).filter(Boolean).join("\n");
  if (correctAnswer !== undefined) fields["Correct Answer"] = correctAnswer.trim();
  if (order !== undefined) fields.Order = order;

  if (options !== undefined && correctAnswer !== undefined && !options.includes(correctAnswer)) {
    return NextResponse.json({ error: "correctAnswer must match one of the options exactly" }, { status: 400 });
  }

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  const updated = await res.json();
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?records[]=${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${pat}` },
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  return NextResponse.json({ success: true });
}
