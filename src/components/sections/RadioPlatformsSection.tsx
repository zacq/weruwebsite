"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const listenOptions = [
  {
    abbr: "FM",
    name: "FM Dial",
    channel: "96.4 MHz",
    detail: "Terrestrial radio across Central Kenya — no internet required.",
    featured: true,
    color: "#f97d00",
    glow: "rgba(249,125,0,0.55)",
  },
  {
    abbr: "WEB",
    name: "Live Stream",
    channel: "werudigital.co.ke/radio",
    detail: "Free online streaming — anywhere in the world, any device.",
    featured: false,
    color: "#C8102E",
    glow: "rgba(200,16,46,0.55)",
  },
];

const counties = ["Nyeri", "Meru", "Tharaka-Nithi", "Embu", "Kirinyaga", "Murang'a"];

export default function RadioPlatformsSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden" style={{ background: "#0D1117" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(249,125,0,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(200,16,46,0.05) 0%, transparent 70%)" }}
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
            Weru FM
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Listen to Weru FM{" "}
            <span className="font-headline italic" style={{ color: "#f97d00" }}>
              Everywhere
            </span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            From a kitchen radio in Nyeri to a phone in Harare — Weru FM reaches you wherever you are.
          </p>
        </motion.div>

        {/* Listen options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-12">
          {listenOptions.map((p, i) => (
            <motion.div
              key={p.name}
              className={["rounded-2xl p-4 sm:p-5 flex flex-col gap-3", p.featured ? "glass-card" : "glass"].join(" ")}
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
                  500K+ Listeners
                </span>
              )}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-[10px] shrink-0"
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

        {/* Coverage highlight */}
        <motion.div
          className="rounded-2xl p-6 sm:p-8 mb-12"
          style={{
            background: "rgba(249, 125, 0, 0.10)",
            border: "1px solid rgba(249, 125, 0, 0.25)",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="sm:w-48 shrink-0">
              <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                Weru FM Coverage
              </p>
              <p className="text-white font-extrabold text-xl">500,000+ Listeners</p>
              <p className="text-white/40 text-xs mt-1">Daily, across Central Kenya</p>
            </div>
            <div className="flex-1 flex flex-wrap gap-2 sm:gap-3">
              {counties.map((c) => (
                <span
                  key={c}
                  className="text-white/65 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="inline-flex items-center gap-3">
            <Link
              href="/radio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
              style={{ background: "#f97d00", color: "#000" }}
            >
              ▶ Listen Live →
            </Link>
            <Link
              href="/radio/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-white/[0.06] hover:scale-[1.03]"
              style={{ border: "1px solid rgba(249,125,0,0.40)", color: "#f97d00" }}
            >
              About
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
