import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { BASE_ID, getTableConfig } from "@/lib/dashboardTables";
import { CONTENT_ROLES, QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { getDb, schema } from "@/db";
import { deleteScreenshots } from "@/lib/quizScreenshots";

type AirtableRecord = { id: string; createdTime: string; fields: Record<string, unknown> };

// Quiz entries live in Postgres; the other lead tables are still on Airtable
// until Phase 3. The quiz rows are shaped like Airtable records so the existing
// DataTable / CSV export / overview cards keep working unchanged.
const DRAW_LABEL = { pending: "Pending", contacted: "Contacted", winner: "Winner", disqualified: "Disqualified" } as const;
type DrawStatus = keyof typeof DRAW_LABEL;
const DRAW_FROM_LABEL = Object.fromEntries(Object.entries(DRAW_LABEL).map(([k, v]) => [v, k])) as Record<string, DrawStatus>;

async function quizEntryRecords(): Promise<AirtableRecord[]> {
  const rows = await getDb()
    .select({ entry: schema.quizEntries, quizTitle: schema.quizzes.title })
    .from(schema.quizEntries)
    .innerJoin(schema.quizzes, eq(schema.quizEntries.quizId, schema.quizzes.id))
    .orderBy(desc(schema.quizEntries.submittedAt))
    .limit(5000);

  return rows.map(({ entry, quizTitle }) => ({
    id: entry.id,
    createdTime: entry.submittedAt.toISOString(),
    fields: {
      Quiz: quizTitle,
      Name: entry.name,
      Phone: entry.phone,
      Email: entry.email,
      "County/Town": entry.county,
      Score: entry.score,
      "Total Questions": entry.total,
      Reviewed: entry.reviewed ? "Yes" : "No",
      "Eligible for Draw": entry.eligible ? "Yes" : "No",
      "Draw Status": DRAW_LABEL[entry.drawStatus],
      "Submitted At": entry.submittedAt.toISOString(),
      "Answers (JSON)": JSON.stringify(entry.answers ?? []),
    },
  }));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  const config = getTableConfig(table);
  if (!config) {
    return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  }

  const auth = await requireRole(table === "quiz" ? QUIZ_ROLES : CONTENT_ROLES);
  if (auth instanceof NextResponse) return auth;

  if (table === "quiz") {
    return NextResponse.json({ records: await quizEntryRecords() });
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

  const auth = await requireRole(table === "quiz" ? QUIZ_ROLES : CONTENT_ROLES);
  if (auth instanceof NextResponse) return auth;

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

  if (table === "quiz") {
    const set: Partial<typeof schema.quizEntries.$inferInsert> = {};
    if ("Draw Status" in safeFields) {
      const status = DRAW_FROM_LABEL[String(safeFields["Draw Status"])];
      if (!status) return NextResponse.json({ error: "Invalid draw status" }, { status: 400 });
      set.drawStatus = status;
    }
    const [updated] = await getDb()
      .update(schema.quizEntries)
      .set(set)
      .where(eq(schema.quizEntries.id, recordId))
      .returning({ id: schema.quizEntries.id });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await audit(auth, "update", "quiz_entry", recordId, set);
    return NextResponse.json({ id: recordId });
  }

  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });
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

  const auth = await requireRole(table === "quiz" ? QUIZ_ROLES : CONTENT_ROLES);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { recordId } = body as { recordId?: string };
  if (!recordId) {
    return NextResponse.json({ error: "recordId is required" }, { status: 400 });
  }

  if (table === "quiz") {
    const [deleted] = await getDb()
      .delete(schema.quizEntries)
      .where(eq(schema.quizEntries.id, recordId))
      .returning({ screenshots: schema.quizEntries.screenshots });
    if (deleted) await deleteScreenshots(deleted.screenshots);
    await audit(auth, "delete", "quiz_entry", recordId);
    return NextResponse.json({ success: true });
  }

  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });
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
