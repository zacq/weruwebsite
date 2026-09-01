import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tbldtDg3hJU0ME5iZ";

type AirtableRecord = { id: string; fields: Record<string, unknown> };

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const body = await req.json();
  const { title, prize, status } = body as { title?: string; prize?: string; status?: string };

  const fields: Record<string, unknown> = {};
  if (title !== undefined) fields.Title = title;
  if (prize !== undefined) fields.Prize = prize;
  if (status !== undefined) fields.Status = status;

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updates: { id: string; fields: Record<string, unknown> }[] = [{ id, fields }];

  // Activating this quiz? Auto-archive any other quiz currently marked Active,
  // so the live site never has to guess which one to serve.
  if (status === "Active") {
    const activeRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${encodeURIComponent("{Status}='Active'")}`,
      { headers: { Authorization: `Bearer ${pat}` }, cache: "no-store" }
    );
    if (activeRes.ok) {
      const activeData = (await activeRes.json()) as { records: AirtableRecord[] };
      for (const record of activeData.records) {
        if (record.id !== id) updates.push({ id: record.id, fields: { Status: "Archived" } });
      }
    }
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: updates.slice(0, 10) }),
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  const updated = await res.json();
  return NextResponse.json(updated);
}
