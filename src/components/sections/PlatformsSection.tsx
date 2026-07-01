"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

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
  { label: "TikTok",    handle: "@werutv.fm96.4",  href: "https://tiktok.com/@werutv.fm96.4" },
  { label: "Facebook",  handle: "@Weru FM 96.4",    href: "https://facebook.com/werutv" },
  { label: "YouTube",   handle: "@WERU TV & FM",    href: "https://www.youtube.com/@werutvfm3411" },
  { label: "Instagram", handle: "@werutv",           href: "https://instagram.com/werutv" },
  { label: "X",         handle: "@WeruTV",           href: "https://x.com/werutv" },
];

const SOCIAL_PATHS: Record<string, string> = {
  TikTok:    "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z",
  Facebook:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  YouTube:   "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  X:         "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L2.009 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

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
          <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#f97d00" }}>
            Weru TV
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

        {/* About CTA */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Link
            href="/tv/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-white/[0.06] hover:scale-[1.03]"
            style={{ border: "1px solid rgba(249,125,0,0.40)", color: "#f97d00" }}
          >
            About
          </Link>
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
                target="_blank"
                rel="noopener noreferrer"
                className="glass-sm px-4 py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-[1.05] hover:border-orange-500/30"
              >
                {SOCIAL_PATHS[s.label] && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/70" aria-hidden="true">
                    <path d={SOCIAL_PATHS[s.label]} />
                  </svg>
                )}
                <span className="text-white/75 text-[11px] font-bold">{s.label}</span>
                <span className="text-[10px]" style={{ color: "#f97d00" }}>{s.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
