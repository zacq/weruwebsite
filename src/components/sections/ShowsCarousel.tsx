"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tvShows = [
  {
    id: 1,
    presenter: "Nkatha Cietu",
    showName: "URIA NDAGITARI",
    subtitle: "Health Insights",
    description:
      "Nkatha Cietu shines a spotlight on the incredible contributions of women in Kenya. Join Makena Wa Matiri every Tuesday to explore their stories, achievements, and the impact they have on our society.",
    time: "Tuesdays 8:00 PM",
    initials: "NC",
    bg: "#6B0A0A",
    accent: "#FACC15",
  },
  {
    id: 2,
    presenter: "Martin Gichunge",
    showName: "GICHUNKI",
    subtitle: "Entertainment & Community",
    description:
      "Join Martin Gichunge for the latest entertainment, community news, and stories that matter most to Central Kenya viewers.",
    time: "Weekdays 6:00 PM",
    initials: "MG",
    bg: "#7A1010",
    accent: "#f97d00",
  },
  {
    id: 3,
    presenter: "Empress Rita",
    showName: "REGGAEMANI",
    subtitle: "Reggae & African Culture",
    description:
      "Your weekly dose of roots reggae, African vibes, and cultural celebration hosted by the incomparable Empress Rita.",
    time: "Weekends 5:00 PM",
    initials: "ER",
    bg: "#6B0A0A",
    accent: "#FACC15",
  },
  {
    id: 4,
    presenter: "MC Tash & DJ Dennie",
    showName: "TUBURUKE NA TASH",
    subtitle: "Music & Entertainment",
    description:
      "An energetic afternoon packed with the latest music and trends. MC Tash brings the vibes while DJ Dennie keeps the beats flowing non-stop.",
    time: "Weekdays 3:00 PM",
    initials: "TT",
    bg: "#7A1010",
    accent: "#f97d00",
  },
  {
    id: 5,
    presenter: "DJ Tush",
    showName: "UNTAMED REGGAEMANI",
    subtitle: "Reggae Fusion",
    description:
      "DJ Tush takes you on an untamed musical journey through the best of reggae, dancehall, and afrobeats fusion.",
    time: "Weekends 7:00 PM",
    initials: "DT",
    bg: "#6B0A0A",
    accent: "#FACC15",
  },
];

export default function ShowsCarousel() {
  const [current, setCurrent] = useState(0);
  const count = tvShows.length;

  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  const show = tvShows[current];

  return (
    <section className="w-full relative overflow-hidden" style={{ background: show.bg, minHeight: "520px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={show.id}
          className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 pt-20 pb-14 max-w-5xl mx-auto min-h-[520px]"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* ── Text side ─────────────────────────────── */}
          <div className="flex-1 z-10">
            {/* Weru TV badge */}
            <div className="flex items-center gap-1.5 mb-5">
              <span className="text-base font-black text-white/70">
                w<span style={{ color: "#FACC15" }}>e</span>ru
              </span>
              <sup className="text-[10px] font-bold" style={{ color: "#f97d00" }}>TV</sup>
            </div>

            <p className="text-white/60 text-sm font-semibold mb-1 tracking-wide">
              {show.presenter}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2"
              style={{ color: show.accent }}
            >
              {show.showName}
            </h2>
            {show.subtitle && (
              <p className="text-white font-bold text-lg mb-4">{show.subtitle}</p>
            )}
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-7">
              {show.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
              >
                🕐 {show.time}
              </span>
              <a
                href="#rate-card"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:opacity-85"
                style={{ background: show.accent, color: "#000" }}
              >
                Sponsor This Show →
              </a>
            </div>
          </div>

          {/* ── Presenter avatar ───────────────────────── */}
          <div className="shrink-0 flex items-center justify-center">
            <motion.div
              className="w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center text-6xl font-black select-none"
              style={{
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.20), rgba(0,0,0,0.45))`,
                border: `4px solid ${show.accent}`,
                boxShadow: `0 0 60px ${show.accent}55, inset 0 0 40px rgba(0,0,0,0.3)`,
                color: show.accent,
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {show.initials}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Nav arrows ─────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all text-2xl"
        aria-label="Previous show"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all text-2xl"
        aria-label="Next show"
      >
        ›
      </button>

      {/* ── Dots ───────────────────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {tvShows.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-250"
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.30)",
            }}
            aria-label={`Show ${i + 1}`}
          />
        ))}
      </div>

      {/* Background glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${show.accent}15 0%, transparent 65%)`,
        }}
      />
    </section>
  );
}
