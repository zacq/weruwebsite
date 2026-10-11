const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_AD_TICKER_TABLE_ID ?? "tblRtKS9ZxKx4Ursz";

export type AdTickerItem = {
  message: string;
  icon?: string;
};

const FALLBACK_ITEMS: AdTickerItem[] = [
  { message: "Play the 96+4 Quiz — win a KSh 5,000 shopping voucher plus a visit to the Weru Studios.", icon: "🎯" },
  { message: "Want your brand in this spot? Advertise with Weru TV & FM — get your rate card today.", icon: "📋" },
  { message: "Weru FM 96.4 is live right now — tune in across Central Kenya.", icon: "📻" },
];

type AirtableRecord = { fields: Record<string, string | boolean | number | undefined> };

function mapRecord(record: AirtableRecord): (AdTickerItem & { order: number }) | null {
  const f = record.fields;
  const message = (f.Message as string | undefined)?.trim();
  if (!message || f.Active !== true) return null;
  return {
    message,
    icon: (f.Icon as string | undefined)?.trim() || undefined,
    order: typeof f.Order === "number" ? f.Order : 0,
  };
}

export async function getAdTicker(): Promise<AdTickerItem[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_ITEMS;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      { headers: { Authorization: `Bearer ${pat}` }, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error("[getAdTicker] Airtable error:", await res.text());
      return FALLBACK_ITEMS;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records
      .map(mapRecord)
      .filter((item): item is AdTickerItem & { order: number } => item !== null)
      .sort((a, b) => a.order - b.order)
      .map(({ message, icon }) => ({ message, icon }));

    return mapped.length > 0 ? mapped : FALLBACK_ITEMS;
  } catch (err) {
    console.error("[getAdTicker] Fetch failed:", err);
    return FALLBACK_ITEMS;
  }
}
