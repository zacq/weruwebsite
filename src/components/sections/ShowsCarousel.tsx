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

export default function ShowsCarousel({ title = "Our TV Presenters and Shows" }: { title?: string }) {
  const [current, setCurrent] = useState(0);
  const count = tvShows.length;

  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  const show = tvShows[current];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="text-center py-5" style={{ background: "#f97d00" }}>
        <h2 className="text-white font-extrabold text-xl sm:text-2xl">{title}</h2>
        <div className="flex items-center justify-center gap-1.5 mt-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#f97d00", border: "2px solid #fff" }} />
          <span className="text-white/80 text-xs font-medium">On Air Now</span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden" style={{ background: show.bg, minHeight: "320px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={show.id}
            className="flex flex-col md:flex-row items-center gap-6 px-6 py-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Text side */}
            <div className="flex-1 z-10">
              {/* Weru TV small badge */}
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-sm font-black text-white/80">
                  w<span style={{ color: "#FACC15" }}>e</span>ru
                </span>
                <sup className="text-[9px] font-bold" style={{ color: "#f97d00" }}>TV</sup>
              </div>

              <p className="text-white/70 text-sm font-medium mb-1">{show.presenter}</p>
              <h3
                className="text-3xl sm:text-4xl font-extrabold leading-tight mb-1"
                style={{ color: show.accent }}
              >
                {show.showName}
              </h3>
              {show.subtitle && (
                <p className="text-white font-bold text-base mb-3">{show.subtitle}</p>
              )}
              <p className="text-white/65 text-sm leading-relaxed max-w-sm mb-5">
                {show.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                >
                  🕐 {show.time}
                </span>
                <a
                  href="#rate-card"
                  className="px-3 py-1 rounded-full text-xs font-bold transition-all duration-150"
                  style={{ background: show.accent, color: "#000" }}
                >
                  Sponsor This Show →
                </a>
              </div>
            </div>

            {/* Presenter avatar */}
            <div className="shrink-0 flex items-center justify-center">
              <div
                className="w-40 h-40 sm:w-52 sm:h-52 rounded-full flex items-center justify-center text-5xl font-black"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(0,0,0,0.4))`,
                  border: `3px solid ${show.accent}`,
                  boxShadow: `0 0 40px ${show.accent}55`,
                  color: show.accent,
                }}
              >
                {show.initials}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Previous show"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Next show"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {tvShows.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
              }}
              aria-label={`Show ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
