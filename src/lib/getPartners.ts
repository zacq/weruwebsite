const BASE_ID  = "appXyMV3O6ycSVRAi";
const TABLE_ID = process.env.AIRTABLE_PARTNERS_TABLE_ID ?? "tblQMcxwIlTqbQYnK";

export type Partner = {
  name: string;
  logo: string | null;
};

const FALLBACK_PARTNERS: Partner[] = [
  { name: "Joy Millers",                      logo: "/PatnerLogo/JoyMillers.png"   },
  { name: "Rhino Mabati",                     logo: "/PatnerLogo/RhinoMabati.png"  },
  { name: "Nice Rice Millers",                logo: "/PatnerLogo/NiceRice.png"     },
  { name: "Duralong Mabati",                  logo: "/PatnerLogo/Duralong.png"     },
  { name: "Yetu Sacco",                       logo: "/PatnerLogo/Yetu%20Sacco.png" },
  { name: "Betika",                           logo: "/PatnerLogo/Betika.png"       },
  { name: "Safaricom PLC",                    logo: "/PatnerLogo/Safaricom.png"    },
  { name: "Greenlife Crop Protection Africa", logo: "/PatnerLogo/Greenlife.png"    },
  { name: "Osho Chemical Industries",         logo: "/PatnerLogo/Osho.png"         },
  { name: "Paleah Millers",                   logo: null },
  { name: "Imperial College",                 logo: null },
  { name: "The Kambakia Christian Centre",    logo: null },
  { name: "Coca Cola",                        logo: null },
];

type AirtableRecord = {
  fields: Record<string, string | undefined>;
};

function mapRecord(record: AirtableRecord): Partner | null {
  const f = record.fields;
  const name = f.Name?.trim();

  if (!name) {
    console.warn("[getPartners] Skipping malformed Airtable record: (unnamed)");
    return null;
  }

  return { name, logo: f["Logo URL"]?.trim() || null };
}

export async function getPartners(): Promise<Partner[]> {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) return FALLBACK_PARTNERS;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${pat}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("[getPartners] Airtable error:", await res.text());
      return FALLBACK_PARTNERS;
    }

    const data = (await res.json()) as { records: AirtableRecord[] };
    const mapped = data.records.map(mapRecord).filter((p): p is Partner => p !== null);

    return mapped.length > 0 ? mapped : FALLBACK_PARTNERS;
  } catch (err) {
    console.error("[getPartners] Fetch failed:", err);
    return FALLBACK_PARTNERS;
  }
}
