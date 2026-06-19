import lazyImport from "next/dynamic";
import LiveStream from "@/components/sections/LiveStream";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import TVScheduleSection from "@/components/sections/TVScheduleSection";
import ShowsCarousel from "@/components/sections/ShowsCarousel";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";
import { getNewsFeed, type Headline } from "@/lib/getNewsFeed";
import { getStreamSource } from "@/lib/getStreamSource";

const AdvertiseSection = lazyImport(
  () => import("@/components/sections/AdvertiseSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const NewsGrid = lazyImport(
  () => import("@/components/sections/NewsGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Weru TV — Live Television",
  description: "Watch Weru TV live stream and browse the latest TV shows and videos.",
};

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

export default async function TVPage() {
  const [feed, initialStream] = await Promise.all([getNewsFeed(), getStreamSource()]);

  return (
    <>
      {/* Live stream hero */}
      <LiveStream initialStream={initialStream} />

      {/* Scrolling headlines ticker */}
      <HeadlineTicker headlines={feed} />

      {/* Full program schedule */}
      <TVScheduleSection />

      {/* TV Shows */}
      <ShowsCarousel />

      {/* Latest Videos */}

      {/* Latest Headlines */}
      <NewsGrid articles={toNewsArticles(feed)} />

      <AdvertiseSection />
      <RateCardForm />
      <Footer />
    </>
  );
}
