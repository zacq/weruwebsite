"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RADIO_STREAM_URL = "https://stream.werudigital.co.ke/radio"; // replace with real stream

const radioShows = [
  {
    id: 1,
    name: "TUTHARIMWE",
    subtitle: "Morning Show",
    host: "Makena Wa Matiri",
    time: "4:00 AM – 8:00 AM",
    description:
      "Join Host Makena Wa Matiri for a spiritual start to your day with uplifting discussions and reflections.",
    features: [
      "Explore themes of faith and positivity each morning",
      "Engage in inspiring conversations with like-minded listeners",
      "Start your day refreshed with uplifting music and messages",
    ],
    initials: "MW",
    accent: "#f97d00",
    bg: "#6B0A0A",
  },
  {
    id: 2,
    name: "TUTHUNKUME",
    subtitle: "Show",
    host: "Munene Wa Kagwi",
    time: "",
    description:
      "Join Munene Wa Kagwi for insights, motivation, and advice to make your hustle smarter and more efficient.",
    features: [
      "Tune in for financial insights that really make a difference",
      "Engage with discussions that motivate your entrepreneurial journey",
      "Discover strategies to elevate your career and improve your financial literacy",
    ],
    initials: "MK",
    accent: "#FACC15",
    bg: "#7A1010",
  },
  {
    id: 3,
    name: "TUBURUKE NA TASH",
    subtitle: "",
    host: "MC Tash",
    time: "",
    description:
      "Join MC Tash for an energetic afternoon filled with the latest music and trends.",
    features: [
      "Experience the latest hits and genre explorations",
      "Live interactions with callers and listeners",
      "Special guest appearances and exclusive mixes",
    ],
    initials: "MT",
    accent: "#f97d00",
    bg: "#6B0A0A",
  },
];

export default function RadioSection() {
  const [playing, setPlaying] = useState(false);
  const [currentShow, setCurrentShow] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(RADIO_STREAM_URL);
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // Autoplay — advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShow((c) => (c + 1) % radioShows.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const show = radioShows[currentShow];

  return (
    <section id="radio" className="w-full" style={{ background: "#f97d00" }}>

      {/* ── Live Radio Player ─────────────────── */}
      <div className="px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-5 py-4">
              {/* Play button */}
              <motion.button
                onClick={togglePlay}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-xl"
                style={{
                  background: playing ? "#C8102E" : "#f97d00",
                  boxShadow: playing
                    ? "0 0 24px rgba(200,16,46,0.55)"
                    : "0 0 24px rgba(249,125,0,0.55)",
                  minWidth: "48px",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label={playing ? "Pause radio" : "Play radio"}
              >
                {playing ? "⏸" : "▶"}
              </motion.button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shrink-0"
                    style={{ background: "#C8102E", color: "#fff" }}
                  >
                    {playing ? "PLAYING" : "READY"}
                  </span>
                </div>
                <p className="text-white font-bold text-sm">LIVE RADIO</p>
                <p className="text-white/45 text-xs">Weru FM Radio Station</p>
              </div>

              {/* Equalizer */}
              <div className="shrink-0 flex items-end gap-0.5 h-7">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="eq-bar"
                    style={{
                      height: playing ? undefined : "4px",
                      animationPlayState: playing ? "running" : "paused",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Waveform bar */}
            <div
              className="h-1 w-full"
              style={{ background: "linear-gradient(90deg, #f97d00, #C8102E, #f97d00)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Radio Shows Carousel ──────────────── */}
      <div>
        {/* Header */}
        <div className="text-center pb-4 px-4">
          <h2 className="text-white font-extrabold text-xl sm:text-2xl">
            Exciting Lineup of Radio Programs
          </h2>
          <p className="text-white/70 text-xs mt-1">Join us for engaging shows daily</p>
        </div>

        {/* Show slider */}
        <div
          className="relative overflow-hidden"
          style={{ background: show.bg, minHeight: "clamp(320px, 50vw, 480px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={show.id}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-8 sm:px-12 py-8 sm:py-10 max-w-4xl mx-auto"
              style={{ minHeight: "clamp(320px, 50vw, 480px)" }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              {/* Text */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
                  WERU-FM Radio Station
                </p>
                <h3 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
                  {show.name}
                </h3>
                {show.subtitle && (
                  <h4 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight">
                    {show.subtitle}
                  </h4>
                )}
                <p className="text-white/70 text-xs sm:text-sm mt-2 sm:mt-3 max-w-sm mx-auto sm:mx-0 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {show.description}
                </p>
                {show.time && (
                  <p className="text-white/50 text-xs mt-2 font-medium">🕐 {show.time}</p>
                )}

                {/* Feature list — hidden on very small screens */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                  {show.features.map((f, i) => (
                    <div key={i}>
                      <p className="text-white/40 text-[10px] font-bold mb-0.5">0{i + 1}</p>
                      <p className="text-white/70 text-xs leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host avatar */}
              <div className="shrink-0 order-first sm:order-last">
                <div
                  className="rounded-full flex items-center justify-center font-black"
                  style={{
                    width: "clamp(90px, 20vw, 176px)",
                    height: "clamp(90px, 20vw, 176px)",
                    fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(0,0,0,0.4))`,
                    border: `3px solid ${show.accent}`,
                    boxShadow: `0 0 36px ${show.accent}55`,
                    color: show.accent,
                  }}
                >
                  {show.initials}
                </div>
                <p className="text-center text-white/60 text-xs mt-2 font-medium">{show.host}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={() => setCurrentShow((c) => (c - 1 + radioShows.length) % radioShows.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-2xl"
            aria-label="Previous show"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentShow((c) => (c + 1) % radioShows.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-16 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-2xl"
            aria-label="Next show"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
            {radioShows.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentShow(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentShow ? "20px" : "10px",
                  height: "10px",
                  minWidth: "10px",
                  background: i === currentShow ? "#fff" : "rgba(255,255,255,0.35)",
                }}
                aria-label={`Show ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
