import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Weru FM 96.4 — Our Story",
  description:
    "From a 500-watt community transmitter in Nyeri to Central Kenya's most-listened Kikuyu radio station — the story of Weru FM 96.4.",
  openGraph: {
    title: "About Weru FM 96.4",
    description: "The history and growth of Weru FM 96.4 — Central Kenya's home for Kikuyu radio.",
    siteName: "Weru Digital",
    type: "website",
  },
};

const STATS = [
  { n: "2010",  sup: "", label: "Station founded" },
  { n: "96.4",  sup: "", label: "MHz — current frequency" },
  { n: "500",   sup: "K+", label: "Daily listeners" },
  { n: "6",     sup: "", label: "Counties covered" },
];

const TIMELINE = [
  {
    year: "2010",
    title: "A community station is born",
    body: "Weru FM went on air for the first time from a modest studio in Nyeri, broadcasting on a 500-watt transmitter to a roughly 30km radius. The lineup was simple — local news, church announcements, and Kikuyu-language music — but it was the first station of its kind serving the immediate community.",
  },
  {
    year: "2013",
    title: "First transmitter upgrade",
    body: "Growing demand pushed the station to a 4kW transmitter, extending coverage across all of Nyeri County. This was the first year the station began selling advertising slots to local businesses, funding a small news team.",
  },
  {
    year: "2016",
    title: "96.4 MHz and Weru Studios",
    body: "The station moved into what is now Weru Studios and settled on its permanent frequency, 96.4 MHz. A dedicated newsroom was established, and the station began producing its own morning show rather than relying on syndicated content.",
  },
  {
    year: "2019",
    title: "Original programming expands",
    body: "Weru FM introduced a full weekly schedule of original Kikuyu-language shows — farming and agribusiness programs, entertainment and cultural talk shows, and expanded news bulletins — building the presenter lineup that anchors the station today.",
  },
  {
    year: "2022",
    title: "Going online",
    body: "Weru FM launched live online streaming for the first time, allowing the Central Kenya diaspora — in Nairobi, and across the border in Uganda and Tanzania — to tune in from anywhere with an internet connection.",
  },
  {
    year: "2024",
    title: "500,000+ daily listeners",
    body: "Independent listenership surveys placed Weru FM's daily audience above 500,000 across Nyeri, Meru, Tharaka-Nithi, Embu, Kirinyaga and Murang'a — making it one of the most-listened Kikuyu-language stations in Central Kenya.",
  },
  {
    year: "Today",
    title: "Part of Weru Digital",
    body: "Weru FM now broadcasts 24 hours a day, both on the FM dial and via live stream, alongside its sister station Weru TV under the Weru Digital brand — continuing the same mission it started with in 2010: telling Central Kenya's stories, in its own language.",
  },
];

export default function RadioAboutPage() {
  return (
    <div style={{ background: "#08080A", minHeight: "100dvh", color: "#F4F1EC" }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 pt-28 sm:pt-36 pb-10 sm:pb-12 max-w-4xl">
        <p className="font-bold text-[13px] tracking-[3px] uppercase mb-4" style={{ color: "#FF7A00" }}>
          Our Story
        </p>
        <h1
          className="font-display font-extrabold text-white leading-[.94] mb-5"
          style={{ fontSize: "clamp(32px,6.5vw,72px)", letterSpacing: "clamp(-1px,-.3vw,-2px)" }}
        >
          About{" "}
          <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00" }}>
            Weru FM
          </em>
        </h1>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(244,241,236,.82)", maxWidth: "600px" }}>
          From a 500-watt transmitter in Nyeri to Central Kenya&apos;s home for Kikuyu radio —
          this is how Weru FM 96.4 grew, and where it stands today.
        </p>
      </div>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 px-5 sm:px-10 py-8"
        style={{ background: "#0E0E12", borderBottom: "1px solid rgba(255,255,255,.10)" }}
      >
        {STATS.map(({ n, sup, label }) => (
          <div key={label}>
            <div
              className="font-display font-extrabold text-white tabular-nums"
              style={{ fontSize: "clamp(24px,4vw,42px)", letterSpacing: "-1px", lineHeight: 1 }}
            >
              {n}
              {sup && (
                <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00", fontWeight: 600 }}>
                  {sup}
                </em>
              )}
            </div>
            <p className="text-sm mt-1" style={{ color: "rgba(244,241,236,.55)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Timeline ──────────────────────────────────────── */}
      <div className="px-5 sm:px-10 py-16 sm:py-20 max-w-3xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 hidden sm:block"
            style={{ left: "88px", width: "1px", background: "rgba(255,122,0,.22)" }}
          />
          <div className="flex flex-col gap-10 sm:gap-12">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex flex-col sm:flex-row gap-2 sm:gap-8">
                <div className="shrink-0 sm:w-[88px]">
                  <span
                    className="font-display font-extrabold tabular-nums"
                    style={{ color: "#FF7A00", fontSize: "clamp(18px,2vw,22px)" }}
                  >
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(244,241,236,.62)" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA band ──────────────────────────────────────── */}
      <div className="px-5 sm:px-10 pb-16">
        <div
          className="relative overflow-hidden rounded-3xl px-8 sm:px-12 py-12"
          style={{
            background: "linear-gradient(120deg,#1a0f02,#0c0c10)",
            border: "1px solid rgba(255,122,0,.22)",
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-80px", top: "-80px",
              width: "340px", height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(255,122,0,.32),transparent 65%)",
            }}
          />

          <h2
            className="font-display font-extrabold text-white leading-[1.02] mb-4 relative"
            style={{ fontSize: "clamp(26px,4vw,46px)", letterSpacing: "-1.2px", maxWidth: "640px" }}
          >
            Tune in to the station{" "}
            <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00", fontWeight: 600 }}>
              Central Kenya trusts.
            </em>
          </h2>
          <div className="flex flex-col min-[480px]:flex-row gap-3 relative mt-8">
            <Link
              href="/radio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(180deg,#FF9425,#FF7A00)",
                color: "#1a1003",
                boxShadow: "0 12px 30px rgba(255,122,0,.32)",
              }}
            >
              ▶ Listen Live →
            </Link>
            <Link
              href="/advertise"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
            >
              📢 Advertise With Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
