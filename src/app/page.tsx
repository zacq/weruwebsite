import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import { getNewsFeed, type Headline } from "@/lib/getNewsFeed";

// Re-fetch RSS and regenerate page every 10 minutes on Netlify (ISR)
export const revalidate = 600;

function toTimeAgo(pubDate?: string): string {
  if (!pubDate) return "Just now";
  const diff = Date.now() - new Date(pubDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

function toHeroHeadlines(feed: Headline[]) {
  return feed.map((h, i) => ({
    id: String(i + 1),
    category: h.category,
    categoryColor: h.color,
    isBreaking: h.category === "BREAKING",
    headline: h.text,
    author: "Weru Newsdesk",
    timeAgo: toTimeAgo(h.pubDate),
  }));
}

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function toShortDate(pubDate?: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function toNewsArticles(feed: Headline[]) {
  return feed.slice(0, 6).map((h, i) => ({
    id: String(i + 1),
    title: h.text,
    excerpt: h.excerpt ?? "",
    category: h.category,
    date: toShortDate(h.pubDate),
    link: h.link,
    image: h.image,
  }));
}

const VideoGrid = dynamic(
  () => import("@/components/sections/VideoGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const TVProgramLineup = dynamic(
  () => import("@/components/sections/TVProgramLineup"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const RadioSection = dynamic(
  () => import("@/components/sections/RadioSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const AdvertiseSection = dynamic(
  () => import("@/components/sections/AdvertiseSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const NewsGrid = dynamic(
  () => import("@/components/sections/NewsGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const ReviewsCarousel = dynamic(
  () => import("@/components/sections/ReviewsCarousel"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const PartnersCarousel = dynamic(
  () => import("@/components/sections/PartnersCarousel"),
  { loading: () => <div className="h-24 mx-4 my-6 rounded-2xl bg-black/20" /> }
);

const RateCardForm = dynamic(
  () => import("@/components/sections/RateCardForm"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const Footer = dynamic(() => import("@/components/layout/Footer"));

export default async function HomePage() {
  const feed = await getNewsFeed();
  const heroHeadlines = toHeroHeadlines(feed);

  return (
    <>
      {/* 1. Hero — Live TV player (left) + headline carousel (right) */}
      <HeroSection heroHeadlines={heroHeadlines} />

      {/* 2. Scrolling headlines ticker */}
      <HeadlineTicker headlines={feed} />

      {/* 3. Latest Videos grid + View All on YouTube button */}
      <VideoGrid />

      {/* 4. TV Programs Lineup — day-tabbed schedule with notifications */}
      <TVProgramLineup />

      {/* 5. Live Radio player + radio schedule */}
      <RadioSection />

      {/* 6. Grow Your Brand / Advertise section */}
      <AdvertiseSection />

      {/* 7. Latest Headlines news grid */}
      <NewsGrid articles={toNewsArticles(feed)} />

      {/* 8. Google Reviews carousel */}
      <ReviewsCarousel />

      {/* 9. Partners & Advertisers strip */}
      <PartnersCarousel />

      {/* 10. Rate Card enquiry form */}
      <RateCardForm />

      {/* Footer */}
      <Footer />
    </>
  );
}
