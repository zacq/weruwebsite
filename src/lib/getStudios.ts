import { studioGallery as FALLBACK_STUDIOS, type StudioPhoto } from "@/data/studios";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_STUDIOS_TABLE_ID ?? "tblRnM3U4o8f7W2pq";

type AirtableRecord = {
  fields: Record<string, string | undefined>;
};

function mapRecord(record: AirtableRecord): StudioPhoto | null {
  const f = record.fields;
  const src = f["Image URL"]?.trim();
  const caption = f.Caption?.trim();
  const category = f.Category as StudioPhoto["category"] | undefined;

  if (!src || !caption || !category) {
    console.warn("[getStudios] Skipping malformed Airtable record:", f.Caption ?? "(unnamed)");
    return null;
  }

  return { src, caption, category };
}

export async function getStudios(): Promise<StudioPhoto[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_STUDIOS;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${pat}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("[getStudios] Airtable error:", await res.text());
      return FALLBACK_STUDIOS;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records.map(mapRecord).filter((p): p is StudioPhoto => p !== null);

    return mapped.length > 0 ? mapped : FALLBACK_STUDIOS;
  } catch (err) {
    console.error("[getStudios] Fetch failed:", err);
    return FALLBACK_STUDIOS;
  }
}
