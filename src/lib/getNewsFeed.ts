import Parser from "rss-parser";

export type Headline = {
  category: string;
  color: string;
  text: string;
  pubDate?: string;
  link?: string;
  excerpt?: string;
  image?: string;
};

const FEEDS = [
  "https://www.kbc.co.ke/feed/",
  "https://nation.africa/kenya/rss.xml",
];

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  politics:    { label: "POLITICS",    color: "#1565C0" },
  government:  { label: "POLITICS",    color: "#1565C0" },
  business:    { label: "BUSINESS",    color: "#2E7D32" },
  economy:     { label: "BUSINESS",    color: "#2E7D32" },
  finance:     { label: "BUSINESS",    color: "#2E7D32" },
  health:      { label: "HEALTH",      color: "#00695C" },
  medical:     { label: "HEALTH",      color: "#00695C" },
  sports:      { label: "SPORTS",      color: "#E65100" },
  sport:       { label: "SPORTS",      color: "#E65100" },
  breaking:    { label: "BREAKING",    color: "#C8102E" },
  urgent:      { label: "BREAKING",    color: "#C8102E" },
  development: { label: "DEVELOPMENT", color: "#E65100" },
  technology:  { label: "TECH",        color: "#6A1B9A" },
  education:   { label: "EDUCATION",   color: "#1565C0" },
};

function mapCategory(cats: string[]): { label: string; color: string } {
  for (const cat of cats) {
    const key = cat.toLowerCase().trim();
    for (const [keyword, value] of Object.entries(CATEGORY_MAP)) {
      if (key.includes(keyword)) return value;
    }
  }
  return { label: "NEWS", color: "#C8102E" };
}

type MediaThumbnail = { $?: { url?: string } };
type MediaContent  = { $?: { url?: string } };
type MediaGroup    = { "media:content"?: MediaContent | MediaContent[] };

function extractImage(item: Record<string, unknown>): string | undefined {
  // KBC: <media:thumbnail url="..."/>
  const thumb = item["media:thumbnail"] as MediaThumbnail | undefined;
  if (thumb?.$?.url) return thumb.$.url;

  // Nation.Africa: <media:group><media:content url="..."/></media:group>
  const group = item["media:group"] as MediaGroup | undefined;
  if (group) {
    const mc = group["media:content"];
    if (Array.isArray(mc)) return mc[0]?.$?.url;
    return mc?.$?.url;
  }

  return undefined;
}

export const FALLBACK_HEADLINES: Headline[] = [
  { category: "NEWS",        color: "#C8102E", text: "Why Wetangʼula is Warning MPs About Life After Parliament" },
  { category: "POLITICS",    color: "#1565C0", text: "Rigathi Gachagua Threatens Nationwide Protests Over Alleged Oppression" },
  { category: "BUSINESS",    color: "#2E7D32", text: "Ruto Launches New Ksh36,000 Funding for 90,000 Kenyan Youth" },
  { category: "BREAKING",    color: "#C8102E", text: "Several Injured After Matatu Flips on Haile Selassie Avenue" },
  { category: "DEVELOPMENT", color: "#E65100", text: "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay" },
  { category: "POLITICS",    color: "#1565C0", text: "Government to Preserve All Raila Odinga Tributes in National Archives" },
  { category: "NEWS",        color: "#C8102E", text: "Junet: Collaboration with President Ruto Brings Quick Development" },
  { category: "HEALTH",      color: "#00695C", text: "Truphena Muthoni Plans Next Move After Guinness World Record" },
];

export async function getNewsFeed(): Promise<Headline[]> {
  const parser = new Parser({
    customFields: {
      item: ["media:thumbnail", "media:group"],
    },
  });
  const items: Headline[] = [];

  for (const url of FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      for (const raw of feed.items.slice(0, 6)) {
        const item = raw as unknown as Record<string, unknown> & {
          title?: string; contentSnippet?: string; pubDate?: string;
          link?: string; categories?: string[]; category?: string;
        };
        const title = item.title?.trim();
        if (!title) continue;
        const cats = item.categories ?? (item.category ? [item.category] : []);
        const { label, color } = mapCategory(cats);
        const excerpt = item.contentSnippet?.trim().slice(0, 160) ?? "";
        const image = extractImage(item);
        items.push({ category: label, text: title, color, pubDate: item.pubDate, link: item.link, excerpt, image });
      }
    } catch {
      // Skip failed feed silently
    }
    if (items.length >= 10) break;
  }

  return items.length > 0 ? items.slice(0, 10) : FALLBACK_HEADLINES;
}
