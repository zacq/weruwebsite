"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";

const headlines = [
  { category: "BREAKING",    text: "Several Injured After 14-Seater Matatu Flips on Haile Selassie Avenue" },
  { category: "POLITICS",    text: "Wetangula Warns MPs: Life After Parliament Is Not What You Expect" },
  { category: "BUSINESS",    text: "Ruto Launches Ksh36,000 Funding Initiative for 90,000 Kenyan Youth" },
  { category: "NEWS",        text: "Government to Preserve All Raila Odinga Tributes in National Archives" },
  { category: "DEVELOPMENT", text: "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay" },
  { category: "HEALTH",      text: "Truphena Muthoni Plans Next Conservation Milestone After Guinness Record" },
  { category: "POLITICS",    text: "Gachagua Threatens Nationwide Protests Over Alleged Systematic Oppression" },
  { category: "BUSINESS",    text: "Nairobi Records 15.4% Rise in Small Business Registrations This Quarter" },
];

const categoryColors: Record<string, string> = {
  BREAKING:    "#C8102E",
  POLITICS:    "#1565C0",
  BUSINESS:    "#2E7D32",
  NEWS:        "#C8102E",
  DEVELOPMENT: "#E65100",
  HEALTH:      "#00695C",
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % headlines.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const embedSrc = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=0&rel=0`;
  const headline = headlines[current];

  return (
    <section
      className="w-full flex flex-col md:flex-row overflow-hidden"
      style={{ minHeight: "calc(100dvh - 56px)", background: "#0A0A0A" }}
    >
      {/* ── Left: Live TV Player ─────────────────────────── */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-10"
        style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-full" style={{ maxWidth: "640px" }}>
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "#C8102E" }}
            >
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
            <iframe
              src={embedSrc}
              title="Weru TV Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
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

      {/* ── Right: Headline Carousel ──────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full" style={{ maxWidth: "640px" }}>

          {/* Spacer — matches live badge row height */}
          <div style={{ height: "28px" }} />

          {/* Aspect-ratio container — same 56.25% as the player */}
          <div
            className="relative w-full flex flex-col justify-center rounded-xl"
            style={{ paddingBottom: "56.25%" }}
          >
            <div className="absolute inset-0 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <span
                    className="text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md mb-4 inline-block"
                    style={{
                      background: categoryColors[headline.category] ?? "#C8102E",
                      color: "#fff",
                    }}
                  >
                    {headline.category}
                  </span>
                  <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-snug mt-3">
                    {headline.text}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Spacer — matches player footer row height */}
          <div style={{ height: "28px" }} />
        </div>
      </div>
    </section>
  );
}
