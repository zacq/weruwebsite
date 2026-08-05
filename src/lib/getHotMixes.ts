import { hotMixes as FALLBACK_MIXES, type HotMix } from "@/data/hotMixes";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_HOT_MIXES_TABLE_ID ?? "tblSr20BmPfXkfkat";

type AirtableRecord = {
  fields: Record<string, string | undefined>;
};

function normalizeFeed(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  // Accept either a bare path ("/user/track/") or a full URL pasted from
  // the browser address bar — strip the domain so only the path remains.
  return trimmed.replace(/^https?:\/\/(www\.)?mixcloud\.com/i, "");
}

function mapRecord(record: AirtableRecord): HotMix | null {
  const f = record.fields;
  const title = f.Title?.trim();
  const dj = f.DJ?.trim();

  if (!title || !dj) {
    console.warn("[getHotMixes] Skipping malformed Airtable record:", f.Title ?? "(unnamed)");
    return null;
  }

  return {
    title,
    dj,
    mixcloudFeed: normalizeFeed(f["Mixcloud Feed"]),
  };
}

export async function getHotMixes(): Promise<HotMix[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_MIXES;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${pat}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("[getHotMixes] Airtable error:", await res.text());
      return FALLBACK_MIXES;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records.map(mapRecord).filter((m): m is HotMix => m !== null);

    return mapped.length > 0 ? mapped : FALLBACK_MIXES;
  } catch (err) {
    console.error("[getHotMixes] Fetch failed:", err);
    return FALLBACK_MIXES;
  }
}
