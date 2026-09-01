import { NextRequest, NextResponse } from "next/server";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = "tbldtDg3hJU0ME5iZ";

export async function GET() {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100`, {
    headers: { Authorization: `Bearer ${pat}` },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return NextResponse.json({ error: "AIRTABLE_PAT not set" }, { status: 500 });

  const body = await req.json();
  const { title, prize } = body as { title?: string; prize?: string };
  if (!title?.trim() || !prize?.trim()) {
    return NextResponse.json({ error: "title and prize are required" }, { status: 400 });
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: { Title: title.trim(), Prize: prize.trim(), Status: "Draft" },
    }),
  });
  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });

  const created = await res.json();
  return NextResponse.json(created);
}
