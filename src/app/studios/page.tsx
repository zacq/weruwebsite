import type { Metadata } from "next";
import Link from "next/link";
import { studioGallery } from "@/data/studios";
import StudioGallery from "./StudioGallery";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inside Weru Studios — Weru TV",
  description:
    "Purpose-built sets where Central Kenya's stories come to life — from our flagship news desk to a living heritage village. Every corner is designed, lit and dressed in-house.",
  openGraph: {
    title: "Inside Weru Studios",
    description: "A visual tour of Weru TV's broadcast sets in Nyeri, Kenya.",
    siteName: "Weru Digital",
    type: "website",
  },
};

const STATS = [
  { n: "8",    sup: "+", label: "Distinct studio sets" },
  { n: "4",    sup: "",  label: "Genres — News, Talk, Sports, Culture" },
  { n: "100",  sup: "%", label: "Designed & built in-house" },
  { n: "6",    sup: "",  label: "Countries reached on air" },
];

export default function StudiosPage() {
  return (
    <div style={{ background: "#08080A", minHeight: "100dvh", color: "#F4F1EC" }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: "clamp(420px,64vh,680px)", isolation: "isolate" }}
      >
        {/* Ken Burns background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/Studio%20images/studio%20area17.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenburns 30s ease-in-out infinite alternate",
            zIndex: -2,
          }}
        />
        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg,rgba(8,8,10,.55) 0%,rgba(8,8,10,.18) 40%,rgba(8,8,10,.97) 100%)",
            zIndex: -1,
          }}
        />

        <div className="w-full px-5 sm:px-10 pb-10 sm:pb-12 pt-20 sm:pt-28 max-w-4xl">
          <p
            className="font-bold text-[13px] tracking-[3px] uppercase mb-4"
            style={{ color: "#FF7A00" }}
          >
            Arts · Culture · Craft
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[.94] mb-5"
            style={{ fontSize: "clamp(32px,6.5vw,84px)", letterSpacing: "clamp(-1px,-.3vw,-2px)" }}
          >
            Inside{" "}
            <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00" }}>
              Weru
            </em>{" "}
            Studios
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(244,241,236,.82)", maxWidth: "600px" }}
          >
            Purpose-built sets where Central Kenya&apos;s stories come to life — from our flagship
            news desk to a living heritage village. Every corner is designed, lit and dressed
            in-house.
          </p>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 px-5 sm:px-10 py-8"
        style={{ background: "#0E0E12", borderBottom: "1px solid rgba(255,255,255,.10)" }}
      >
        {STATS.map(({ n, sup, label }) => (
          <div key={label}>
            <div
              className="font-display font-extrabold text-white"
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

      {/* ── Gallery (client component handles filters + lightbox) */}
      <StudioGallery photos={studioGallery} />

      {/* ── CTA band ──────────────────────────────────────── */}
      <div className="px-5 sm:px-10 pb-16">
        <div
          className="relative overflow-hidden rounded-3xl px-8 sm:px-12 py-12"
          style={{
            background: "linear-gradient(120deg,#1a0f02,#0c0c10)",
            border: "1px solid rgba(255,122,0,.22)",
          }}
        >
          {/* Glow */}
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
            Shoot your next production{" "}
            <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00", fontWeight: 600 }}>
              here.
            </em>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8 relative" style={{ color: "rgba(244,241,236,.62)", maxWidth: "520px" }}>
            Our sets are available for hire — interviews, commercials, music videos and live
            broadcasts. Bring your idea, we&apos;ll bring the studio.
          </p>
          <div className="flex flex-col min-[480px]:flex-row gap-3 relative">
            <a
              href="/#rate-card"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(180deg,#FF9425,#FF7A00)",
                color: "#1a1003",
                boxShadow: "0 12px 30px rgba(255,122,0,.32)",
              }}
            >
              Book the Studio →
            </a>
            <Link
              href="/#rate-card"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}
            >
              📢 Advertise With Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-10 py-6 text-sm"
        style={{ borderTop: "1px solid rgba(255,255,255,.08)", color: "rgba(244,241,236,.40)" }}
      >
        <span>© Weru TV — The Voice of Central Kenya</span>
        <span>Nyeri, Kenya · @WeruTV</span>
      </div>
    </div>
  );
}
