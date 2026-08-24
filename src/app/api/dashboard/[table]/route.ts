import { NextRequest, NextResponse } from "next/server";
import { BASE_ID, getTableConfig } from "@/lib/dashboardTables";

type AirtableRecord = { id: string; createdTime: string; fields: Record<string, unknown> };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  const config = getTableConfig(table);
  if (!config) {
    return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  }

  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });
  }

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${config.tableId}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${pat}` }, cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }
    const data = (await res.json()) as { records: AirtableRecord[]; offset?: string };
    records.push(...data.records);
    offset = data.offset;
  } while (offset && records.length < 1000);

  return NextResponse.json({ records });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  const config = getTableConfig(table);
  if (!config) {
    return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  }

  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });
  }

  const body = await req.json();
  const { recordId, fields } = body as { recordId?: string; fields?: Record<string, unknown> };

  if (!recordId || !fields || typeof fields !== "object") {
    return NextResponse.json({ error: "recordId and fields are required" }, { status: 400 });
  }

  const editableKeys = new Set(config.columns.filter((c) => c.editable).map((c) => c.key));
  const safeFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (editableKeys.has(key)) safeFields[key] = value;
  }

  if (Object.keys(safeFields).length === 0) {
    return NextResponse.json({ error: "No editable fields in request" }, { status: 400 });
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${config.tableId}/${recordId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
    body: JSON.stringify({ typecast: true, fields: safeFields }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: await res.text() }, { status: res.status });
  }

  const updated = await res.json();
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  const config = getTableConfig(table);
  if (!config) {
    return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  }
  if (!config.deletable) {
    return NextResponse.json({ error: "Deletion not permitted for this table" }, { status: 403 });
  }

  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });
  }

  const body = await req.json();
  const { recordId } = body as { recordId?: string };
  if (!recordId) {
    return NextResponse.json({ error: "recordId is required" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${config.tableId}?records[]=${recordId}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${pat}` } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: await res.text() }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
