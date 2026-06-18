"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const platforms = [
  {
    abbr: "AZ",
    name: "Azam TV",
    channel: "CH 342",
    detail: "Kenya · Tanzania · Uganda · Rwanda · Malawi · Zimbabwe",
    featured: true,
    color: "#1565C0",
    glow: "rgba(21,101,192,0.55)",
  },
  {
    abbr: "DS",
    name: "DStv",
    channel: "CH 368",
    detail: "Across sub-Saharan Africa",
    featured: false,
    color: "#C62828",
    glow: "rgba(198,40,40,0.55)",
  },
  {
    abbr: "ST",
    name: "Startimes",
    channel: "CH 440",
    detail: "Kenya & East Africa",
    featured: false,
    color: "#2E7D32",
    glow: "rgba(46,125,50,0.55)",
  },
  {
    abbr: "ZK",
    name: "Zuku",
    channel: "CH 39",
    detail: "Kenya",
    featured: false,
    color: "#6A1B9A",
    glow: "rgba(106,27,154,0.55)",
  },
  {
    abbr: "PS",
    name: "Pang & Signet",
    channel: "Digital Terrestrial",
    detail: "Free-to-air digital signal",
    featured: false,
    color: "#E65100",
    glow: "rgba(230,81,0,0.55)",
  },
  {
    abbr: "YT",
    name: "YouTube",
    channel: "@WERU TV & FM",
    detail: "Free online streaming — anywhere in the world",
    featured: false,
    color: "#B71C1C",
    glow: "rgba(183,28,28,0.55)",
  },
];

const countries = [
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇹🇿", name: "Tanzania" },
  { flag: "🇺🇬", name: "Uganda" },
  { flag: "🇷🇼", name: "Rwanda" },
  { flag: "🇲🇼", name: "Malawi" },
  { flag: "🇿🇼", name: "Zimbabwe" },
];

const socials = [
  { label: "TikTok",    handle: "@Werutv.fm96.4",  href: "#" },
  { label: "Facebook",  handle: "@Weru TV",         href: "#" },
  { label: "YouTube",   handle: "@WERU TV & FM",    href: "https://www.youtube.com/@werutvfm3411" },
  { label: "Instagram", handle: "@werutv",           href: "#" },
  { label: "X",         handle: "@WeruTV",           href: "#" },
];

export default function PlatformsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden" style={{ background: "#0D1117" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(249,125,0,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(13,17,23,0) 0%, rgba(21,101,192,0.04) 60%, transparent 100%)" }}
      />
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#f97d00" }}>
            WERU TV GOES INTERNATIONAL
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Watch Weru TV{" "}
            <span className="font-headline italic" style={{ color: "#f97d00" }}>
              Everywhere
            </span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            From your living room in Nyeri to a lounge in Harare — Weru TV reaches you wherever you are.
          </p>
        </motion.div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              className={[
                "rounded-2xl p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300",
                i >= 3 && !showAll ? "hidden lg:flex" : "flex",
                p.featured ? "glass-card" : "glass",
              ].join(" ")}
              style={
                p.featured
                  ? { border: "1px solid rgba(249,125,0,0.35)", boxShadow: "0 0 40px rgba(249,125,0,0.09), inset 0 1px 0 rgba(249,125,0,0.22), inset 0 -1px 0 rgba(0,0,0,0.12)" }
                  : {}
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              {p.featured && (
                <span
                  className="self-start text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded"
                  style={{ background: "#f97d00", color: "#000" }}
                >
                  6 COUNTRIES
                </span>
              )}
              <div className="flex items-center gap-3">
                {/* Coloured animated icon */}
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, color-mix(in srgb, ${p.color} 70%, white), ${p.color})`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 8px ${p.glow}`,
                      `0 0 20px ${p.glow}`,
                      `0 0 8px ${p.glow}`,
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  {p.abbr}
                </motion.div>
                <div>
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">{p.name}</p>
                  <p className="text-[11px] font-bold tabular-nums" style={{ color: "#f97d00" }}>
                    {p.channel}
                  </p>
                </div>
              </div>
              <p className="text-white/45 text-xs leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Show more toggle — mobile only */}
        <div className="flex justify-center lg:hidden mb-10">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
            style={{
              border: "1px solid rgba(249,125,0,0.40)",
              color: "#f97d00",
              background: showAll ? "rgba(249,125,0,0.08)" : "transparent",
            }}
          >
            {showAll ? "Show less" : `+ See ${platforms.length - 3} more platforms`}
          </button>
        </div>

        {/* Spacer for desktop (no toggle shown) */}
        <div className="hidden lg:block mb-12" />

        {/* Azam 6-country highlight */}
        <motion.div
          className="rounded-2xl p-6 sm:p-8 mb-12"
          style={{
            background: "rgba(21, 101, 192, 0.10)",
            border: "1px solid rgba(21, 101, 192, 0.25)",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="sm:w-48 shrink-0">
              <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                Azam TV Coverage
              </p>
              <p className="text-white font-extrabold text-xl">6 Countries</p>
              <p className="text-white/40 text-xs mt-1">Across East & Southern Africa</p>
            </div>
            <div className="flex-1 flex flex-wrap gap-4 sm:gap-6">
              {countries.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1">
                  <span className="text-2xl sm:text-3xl">{c.flag}</span>
                  <span className="text-white/65 text-xs font-semibold">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social handles */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-5">
            Also Follow Us Online
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-sm px-4 py-2.5 rounded-xl flex flex-col items-center gap-0.5 transition-all duration-200 hover:scale-[1.05] hover:border-orange-500/30"
              >
                <span className="text-white/75 text-xs font-bold">{s.label}</span>
                <span className="text-[10px]" style={{ color: "#f97d00" }}>{s.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
