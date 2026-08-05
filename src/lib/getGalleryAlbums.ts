import { albums as FALLBACK_ALBUMS, type Album } from "@/data/gallery";

const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_GALLERY_ALBUMS_TABLE_ID ?? "tblG1ZRKza1Z0s8Fv";

type AirtableRecord = {
  fields: Record<string, string | boolean | undefined>;
};

function parseImages(text: string | undefined): Album["images"] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src, alt] = line.split("|").map((s) => s.trim());
      return { src: src ?? "", alt: alt ?? "" };
    })
    .filter((img) => img.src);
}

function mapRecord(record: AirtableRecord): Album | null {
  const f = record.fields;
  const id = (f.Slug as string | undefined)?.trim();
  const title = (f.Title as string | undefined)?.trim();
  const category = f.Category as Album["category"] | undefined;
  const images = parseImages(f.Images as string | undefined);

  const upcoming = Boolean(f.Upcoming) || undefined;

  if (!id || !title || !category || (images.length === 0 && !upcoming)) {
    console.warn("[getGalleryAlbums] Skipping malformed Airtable record:", f.Title ?? f.Slug ?? "(unnamed)");
    return null;
  }

  return {
    id,
    title,
    category,
    badge: (f.Badge as string | undefined) || undefined,
    date: (f.Date as string | undefined) ?? "",
    location: (f.Location as string | undefined) ?? "",
    images,
    upcoming,
  };
}

export async function getGalleryAlbums(): Promise<Album[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_ALBUMS;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${pat}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("[getGalleryAlbums] Airtable error:", await res.text());
      return FALLBACK_ALBUMS;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records.map(mapRecord).filter((a): a is Album => a !== null);

    return mapped.length > 0 ? mapped : FALLBACK_ALBUMS;
  } catch (err) {
    console.error("[getGalleryAlbums] Fetch failed:", err);
    return FALLBACK_ALBUMS;
  }
}
