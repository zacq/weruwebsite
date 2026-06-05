import { NextResponse } from "next/server";
import Parser from "rss-parser";

// Cache for 10 minutes at the Next.js / CDN layer
export const revalidate = 600;

const parser = new Parser();

const FEEDS = [
  "https://www.kbc.co.ke/feed/",
  "https://nation.africa/kenya/rss.xml",
];

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  politics:   { label: "POLITICS",    color: "#1565C0" },
  government: { label: "POLITICS",    color: "#1565C0" },
  business:   { label: "BUSINESS",    color: "#2E7D32" },
  economy:    { label: "BUSINESS",    color: "#2E7D32" },
  finance:    { label: "BUSINESS",    color: "#2E7D32" },
  health:     { label: "HEALTH",      color: "#00695C" },
  medical:    { label: "HEALTH",      color: "#00695C" },
  sports:     { label: "SPORTS",      color: "#E65100" },
  sport:      { label: "SPORTS",      color: "#E65100" },
  breaking:   { label: "BREAKING",    color: "#C8102E" },
  urgent:     { label: "BREAKING",    color: "#C8102E" },
  development:{ label: "DEVELOPMENT", color: "#E65100" },
  technology: { label: "TECH",        color: "#6A1B9A" },
  education:  { label: "EDUCATION",   color: "#1565C0" },
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

export async function GET() {
  const items: { category: string; text: string; color: string }[] = [];

  for (const url of FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items.slice(0, 6)) {
        const title = item.title?.trim();
        if (!title) continue;
        const cats = item.categories ?? (item.category ? [item.category as string] : []);
        const { label, color } = mapCategory(cats);
        items.push({ category: label, text: title, color });
      }
    } catch {
      // Skip failed feed silently — other feed or fallback covers it
    }
    if (items.length >= 10) break;
  }

  return NextResponse.json(items.slice(0, 10));
}
