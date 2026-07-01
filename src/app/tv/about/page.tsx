import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Weru TV — Our Story",
  description:
    "From a single Nyeri studio to a 6-country broadcast footprint — the history and growth of Weru TV, Central Kenya's premier Kikuyu-language television channel.",
  openGraph: {
    title: "About Weru TV",
    description: "The history and growth of Weru TV — Central Kenya's home for Kikuyu television.",
    siteName: "Weru Digital",
    type: "website",
  },
};

const STATS = [
  { n: "2014",  sup: "", label: "Channel launched" },
  { n: "6",     sup: "", label: "Countries reached" },
  { n: "8",     sup: "+", label: "Studio sets built" },
  { n: "40",    sup: "+", label: "Weekly original shows" },
];

const TIMELINE = [
  {
    year: "2014",
    title: "First signal on air",
    body: "Weru TV launched as a small free-to-air digital channel out of Nyeri, broadcasting a handful of hours a day — largely repeats of Weru FM's radio content read to camera, plus a nightly news bulletin sourced from wire agencies.",
  },
  {
    year: "2016",
    title: "Original newsroom established",
    body: "The station built its first dedicated television newsroom, hiring anchors and field reporters rather than relying on agency-fed content. This marked the beginning of Weru TV's identity as a genuine broadcaster rather than a radio simulcast.",
  },
  {
    year: "2018",
    title: "DStv 368 and Startimes 440",
    body: "Weru TV secured carriage on DStv (channel 368) and Startimes (channel 440), taking the signal beyond free-to-air terrestrial reception and into satellite and cable households across Kenya and neighbouring countries for the first time.",
  },
  {
    year: "2020",
    title: "Weru Studios is built",
    body: "A purpose-built studio complex opened on the Nyeri site — a flagship news desk, a talk-show set, and a recreated heritage village used for cultural and entertainment programming. Production that had previously been outsourced moved fully in-house.",
  },
  {
    year: "2021",
    title: "Azam TV — 6-country reach",
    body: "Carriage on Azam TV (channel 342) extended Weru TV's satellite footprint to six countries — Kenya, Tanzania, Uganda, Rwanda, Malawi and Zimbabwe — turning a regional Central Kenya channel into an East and Southern Africa broadcaster.",
  },
  {
    year: "2023",
    title: "Free online streaming",
    body: "Weru TV began streaming live on YouTube and its own website, making the channel freely accessible anywhere in the world for the Kikuyu diaspora, alongside its existing terrestrial, satellite and cable carriage.",
  },
  {
    year: "Today",
    title: "Part of Weru Digital",
    body: "Weru TV now produces more than 40 original weekly programmes — news, culture, farming, entertainment and community shows — from Weru Studios, broadcasting on DStv 368, Azam TV 342, Startimes 440, Zuku, Pang & Signet, and free online streaming, alongside sister station Weru FM 96.4 under the Weru Digital brand.",
  },
];

export default function TvAboutPage() {
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
            Weru TV
          </em>
        </h1>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(244,241,236,.82)", maxWidth: "600px" }}>
          From a single free-to-air signal in Nyeri to a 6-country satellite footprint —
          this is how Weru TV grew, and where it stands today.
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
            Watch the channel{" "}
            <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00", fontWeight: 600 }}>
              6 countries tune into.
            </em>
          </h2>
          <div className="flex flex-col min-[480px]:flex-row gap-3 relative mt-8">
            <Link
              href="/tv"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(180deg,#FF9425,#FF7A00)",
                color: "#1a1003",
                boxShadow: "0 12px 30px rgba(255,122,0,.32)",
              }}
            >
              ▶ Watch Live →
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
