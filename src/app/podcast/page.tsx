import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { PODCAST_CATEGORIES } from "@/data/podcasts";
import type { Metadata } from "next";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Weru TV & FM Podcasts — News, Culture & Lifestyle",
  description:
    "Catch Weru TV & FM podcasts on news analysis, smart farming, GenZ conversations, health, sports, and more. Stories from Central Kenya, on demand.",
  openGraph: {
    title: "Weru TV & FM Podcasts — News, Culture & Lifestyle",
    description:
      "News analysis, Empress's Corner, Smart Farming, GenZ Conversations, Health, Sports and more — Weru stories on demand.",
    url: "https://werutv.co.ke/podcast",
    siteName: "Weru TV",
    type: "website",
  },
};

export default function PodcastPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 text-center"
        style={{ background: "linear-gradient(160deg, #0A0A0A 0%, #1a0a00 100%)" }}
      >
        <p
          className="text-xs font-extrabold tracking-widest uppercase mb-3"
          style={{ color: "#f97d00" }}
        >
          Weru TV &amp; FM
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Podcasts
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
          Weru stories, on demand. Choose a category and listen to the conversations shaping
          Central Kenya — news, culture, farming, health, and more.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <Link
            href="/radio"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "#f97d00" }}
          >
            🎙 Listen Live on FM
          </Link>
          <Link
            href="/tv"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            📺 Watch Live
          </Link>
        </div>
      </section>

      {/* Category grid */}
      <section
        className="px-4 py-16"
        style={{ background: "#0D0D0D" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PODCAST_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href="/radio"
                className="group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-150 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-3xl" aria-hidden>{cat.icon}</span>
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-white font-bold text-sm leading-snug">{cat.label}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{cat.description}</p>
                </div>
                <p
                  className="text-xs font-bold transition-colors group-hover:text-[#f97d00]"
                  style={{ color: "#FACC15" }}
                >
                  Listen →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO contextual links */}
      <section
        className="px-4 py-12"
        style={{ background: "#111111" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 text-sm leading-relaxed">
            Weru TV &amp; FM serves Meru County and Central Kenya.{" "}
            <Link href="/radio" className="text-[#f97d00] hover:underline">
              Tune in to Weru FM 96.4
            </Link>{" "}
            for live radio, or{" "}
            <Link href="/tv" className="text-[#f97d00] hover:underline">
              watch Weru TV live
            </Link>{" "}
            and browse the{" "}
            <Link href="/tv#tv-schedule" className="text-[#f97d00] hover:underline">
              programme schedule
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
