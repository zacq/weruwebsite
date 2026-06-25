import lazyImport from "next/dynamic";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LiveStream from "@/components/sections/LiveStream";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import TVScheduleSection from "@/components/sections/TVScheduleSection";
import ShowsCarousel from "@/components/sections/ShowsCarousel";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";
import { getNewsFeed, type Headline } from "@/lib/getNewsFeed";
import { getStreamSource } from "@/lib/getStreamSource";

const NewsGrid = lazyImport(
  () => import("@/components/sections/NewsGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Weru TV — Watch Live Television Online | DStv 368 · Azam 342",
  description:
    "Watch Weru TV live online and on DStv 368, Azam TV 342 & Startimes 440. Kenya's leading Kikuyu-language channel covering news, culture, agriculture and entertainment across East Africa.",
  openGraph: {
    title: "Weru TV — Watch Live Television Online",
    description: "Live Kikuyu-language TV from Nyeri, Kenya. Watch on DStv 368, Azam TV 342, Startimes 440 or stream free online.",
    url: "https://werudigital.co.ke/tv",
    siteName: "Weru Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Weru TV Live — DStv 368 · Azam 342",
    description: "Kenya's premier Kikuyu-language TV channel. Stream live or watch on DStv, Azam TV and Startimes.",
  },
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
      <ScrollToTop />
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

      <RateCardForm />
      <Footer />
    </>
  );
}
