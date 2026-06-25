export type PodcastCategory = {
  slug: string;
  label: string;
  description: string;
  icon: string;
};

export const PODCAST_CATEGORIES: PodcastCategory[] = [
  {
    slug: "news-analysis",
    label: "News Analysis",
    icon: "📰",
    description: "In-depth breakdowns of Kenya's top stories with Weru journalists.",
  },
  {
    slug: "empress-corner",
    label: "Empress's Corner",
    icon: "👑",
    description: "Culture, fashion, and conversation hosted by Empress Ritta & Natty.",
  },
  {
    slug: "smart-farming",
    label: "Smart Farming",
    icon: "🌿",
    description: "Agricultural insights for Kenyan farmers — crops, markets, weather.",
  },
  {
    slug: "dance-challenge",
    label: "Dance Challenge",
    icon: "🎵",
    description: "Music, dance trends, and challenges from across East Africa.",
  },
  {
    slug: "genz-conversations",
    label: "GenZ Conversations",
    icon: "💬",
    description: "Youth voices on life, tech, and Kenya's future.",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    icon: "🥗",
    description: "Diets, nutrition, wellness, and everyday living.",
  },
  {
    slug: "health",
    label: "Health",
    icon: "❤️",
    description: "Medical experts on the health issues that matter to Kenyans.",
  },
  {
    slug: "sports",
    label: "Sports",
    icon: "⚽",
    description: "Football, athletics, and all Kenyan sports — highlights and opinion.",
  },
];
