"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";

type Headline = {
  id: string;
  category: string;
  categoryColor: string;
  isBreaking: boolean;
  headline: string;
  author: string;
  timeAgo: string;
};

const headlines: Headline[] = [
  {
    id: "1",
    category: "BREAKING",
    categoryColor: "#C8102E",
    isBreaking: true,
    headline: "Several Injured After 14-Seater Matatu Flips on Haile Selassie Avenue",
    author: "Weru Newsdesk",
    timeAgo: "Just now",
  },
  {
    id: "2",
    category: "POLITICS",
    categoryColor: "#1565C0",
    isBreaking: false,
    headline: "Wetangula Warns MPs: Life After Parliament Is Not What You Expect",
    author: "James Mwangi",
    timeAgo: "15 min ago",
  },
  {
    id: "3",
    category: "BUSINESS",
    categoryColor: "#2E7D32",
    isBreaking: false,
    headline: "Ruto Launches Ksh36,000 Funding Initiative for 90,000 Kenyan Youth",
    author: "Grace Wanjiku",
    timeAgo: "32 min ago",
  },
  {
    id: "4",
    category: "NEWS",
    categoryColor: "#C8102E",
    isBreaking: false,
    headline: "Government to Preserve All Raila Odinga Tributes in National Archives",
    author: "Peter Kariuki",
    timeAgo: "1 hr ago",
  },
  {
    id: "5",
    category: "DEVELOPMENT",
    categoryColor: "#E65100",
    isBreaking: false,
    headline: "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay",
    author: "Mary Njeri",
    timeAgo: "2 hr ago",
  },
  {
    id: "6",
    category: "HEALTH",
    categoryColor: "#00695C",
    isBreaking: false,
    headline: "Truphena Muthoni Plans Next Conservation Milestone After Guinness Record",
    author: "Samuel Gitau",
    timeAgo: "3 hr ago",
  },
  {
    id: "7",
    category: "POLITICS",
    categoryColor: "#1565C0",
    isBreaking: false,
    headline: "Gachagua Threatens Nationwide Protests Over Alleged Systematic Oppression",
    author: "Agnes Kamau",
    timeAgo: "4 hr ago",
  },
  {
    id: "8",
    category: "BUSINESS",
    categoryColor: "#2E7D32",
    isBreaking: false,
    headline: "Nairobi Records 15.4% Rise in Small Business Registrations This Quarter",
    author: "David Ngugi",
    timeAgo: "5 hr ago",
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 100 ticks × 40 ms = 4 s auto-advance
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => setProgress((p) => (p >= 99 ? 100 : p + 1)), 40);
    return () => clearInterval(id);
  }, [isHovered]);

  useEffect(() => {
    if (progress >= 100) {
      setCurrent((c) => (c + 1) % headlines.length);
      setProgress(0);
    }
  }, [progress]);

  const headline = headlines[current];
  const subHeadlines = headlines.filter((h) => h.id !== headline.id).slice(0, 3);

  const embedSrc = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&rel=0`;

  return (
    <section
      className="w-full flex flex-col md:flex-row overflow-hidden pt-14"
      style={{ minHeight: "calc(100dvh - 0px)", background: "#0A0A0A" }}
    >
      {/* ── Left: Live TV Player ─────────────────────────── */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10"
        style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-full" style={{ maxWidth: "640px" }}>
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="glass-red flex items-center gap-1.5 px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white live-dot inline-block" />
              <span className="text-white text-[10px] font-extrabold tracking-wider uppercase">
                Live
              </span>
            </div>
            <span className="text-white/40 text-xs">Weru TV — Streaming Now</span>
          </div>

          {/* 16:9 player */}
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              paddingBottom: "56.25%",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 16px 56px rgba(0,0,0,0.55)",
            }}
          >
            {isPlaying ? (
              <iframe
                src={embedSrc}
                title="Weru TV Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            ) : (
              <button
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
                onClick={() => setIsPlaying(true)}
                aria-label="Watch Weru TV Live"
              >
                <motion.div
                  className="glass-orange w-16 h-16 flex items-center justify-center text-white text-2xl"
                  style={{ borderRadius: "50%" }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶
                </motion.div>
                <span className="text-white/55 text-xs font-medium">Click to Watch Live</span>
              </button>
            )}
          </div>

          {/* Player footer */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                w<span style={{ color: "#FACC15" }}>e</span>ru
              </span>
              <sup className="text-[9px] font-bold" style={{ color: "#f97d00" }}>TV</sup>
            </div>
            <a
              href="#rate-card"
              className="text-[11px] font-bold px-3 py-1 rounded-lg text-white transition-opacity hover:opacity-80"
              style={{ background: "rgba(249,125,0,0.80)" }}
            >
              Advertise Here
            </a>
          </div>
        </div>
      </div>

      {/* ── Right: Rich headline card ─────────────────────── */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full" style={{ maxWidth: "640px" }}>

          {/* Main card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={headline.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="glass rounded-2xl p-5 flex flex-col gap-3"
            >
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {headline.isBreaking && (
                  <span className="glass-red text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1">
                    BREAKING
                  </span>
                )}
                <span
                  className="glass-sm text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md"
                  style={{ color: headline.categoryColor }}
                >
                  {headline.category}
                </span>
              </div>

              {/* Headline — DM Serif */}
              <h2 className="font-headline text-white text-2xl sm:text-3xl md:text-4xl leading-snug line-clamp-2 md:line-clamp-none">
                {headline.headline}
              </h2>

              {/* Author row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: headline.categoryColor, color: "#fff" }}
                >
                  {getInitials(headline.author)}
                </div>
                <span className="text-white/60 text-xs font-medium">{headline.author}</span>
                <span className="text-white/35 text-xs">{headline.timeAgo}</span>
              </div>

              {/* Progress bar */}
              <div className="hero-progress">
                <div className="hero-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 3 sub-headline pills */}
          <div className="flex flex-col gap-2 mt-3">
            {subHeadlines.map((h) => (
              <motion.button
                key={h.id}
                onClick={() => { setCurrent(headlines.findIndex((x) => x.id === h.id)); setProgress(0); }}
                className="glass-sm rounded-xl px-3 py-2.5 text-left transition-all duration-150"
                whileHover={{ x: 4 }}
              >
                <span
                  className="text-[9px] font-extrabold tracking-widest uppercase mr-2"
                  style={{ color: h.categoryColor }}
                >
                  {h.category}
                </span>
                <span className="text-white/70 text-xs leading-snug">{h.headline}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
