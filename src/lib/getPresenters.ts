import { presenters as FALLBACK_PRESENTERS, type Presenter } from "@/data/presenters";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_PRESENTERS_TABLE_ID ?? "tblPpc43cJb4hD1sq";

type AirtableRecord = {
  fields: Record<string, string | undefined>;
};

function splitParagraphs(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseStats(text: string | undefined): { label: string; value: string }[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label] = line.split("|").map((s) => s.trim());
      return { value: value ?? "", label: label ?? "" };
    })
    .filter((stat) => stat.value && stat.label);
}

function mapRecord(record: AirtableRecord): Presenter | null {
  const f = record.fields;
  const slug = f.Slug?.trim();
  const name = f.Name?.trim();
  const bio = splitParagraphs(f.Bio);

  if (!slug || !name || bio.length === 0) {
    console.warn("[getPresenters] Skipping malformed Airtable record:", f.Name ?? f.Slug ?? "(unnamed)");
    return null;
  }

  const socialLinks: Presenter["socialLinks"] = {};
  if (f.Facebook)  socialLinks.facebook  = f.Facebook;
  if (f.Twitter)   socialLinks.twitter   = f.Twitter;
  if (f.Instagram) socialLinks.instagram = f.Instagram;
  if (f.YouTube)   socialLinks.youtube   = f.YouTube;

  return {
    slug,
    name,
    show: f.Show ?? "",
    role: f.Role ?? "",
    category: (f.Category as Presenter["category"]) ?? "Program Presenters",
    imageSrc: f["Image URL"] ?? "/placeholder-presenter.svg",
    socialLinks,
    tagline: f.Tagline ?? "",
    bio,
    programHistory: splitParagraphs(f["Program History"]),
    stats: parseStats(f.Stats),
  };
}

export async function getPresenters(): Promise<Presenter[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_PRESENTERS;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${pat}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("[getPresenters] Airtable error:", await res.text());
      return FALLBACK_PRESENTERS;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records.map(mapRecord).filter((p): p is Presenter => p !== null);

    return mapped.length > 0 ? mapped : FALLBACK_PRESENTERS;
  } catch (err) {
    console.error("[getPresenters] Fetch failed:", err);
    return FALLBACK_PRESENTERS;
  }
}
