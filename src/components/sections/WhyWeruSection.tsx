"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: "📡",
    title: "Live 24/7",
    copy: "Round-the-clock news, entertainment, and cultural programming — live from the heart of Central Kenya, delivered to screens worldwide.",
    featured: true,
    cta: { label: "Watch Live", href: "/tv" },
  },
  {
    icon: "🌍",
    title: "International Reach",
    copy: "Broadcast across 6 countries on Azam TV, DStv, Startimes & Zuku — reaching over 1.97 million monthly viewers.",
    borderColor: "rgba(21,101,192,0.40)",
  },
  {
    icon: "🎭",
    title: "Arts & Culture Hub",
    copy: "Weru Studios: a cultural centre celebrating Kikuyu heritage, African arts, and the stories that define us.",
    borderColor: "rgba(156,39,176,0.40)",
  },
  {
    icon: "📰",
    title: "Local News Authority",
    copy: "The most trusted source for Central Kenya and the Mount Kenya region — journalism that holds power accountable.",
    borderColor: "rgba(249,125,0,0.40)",
  },
];

export default function WhyWeruSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden" style={{ background: "#111111" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top center, rgba(249,125,0,0.05) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(250,204,21,0.03) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header — crawls up on scroll */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#f97d00" }}>
            WHY CHOOSE US
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-3">
            Why{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>
              Weru TV?
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-md leading-relaxed">
            Central Kenya&apos;s home for live television, news that matters, and culture that connects.
          </p>
        </motion.div>

        {/* Featured card — Live 24/7 */}
        <motion.div
          className="glass-card rounded-2xl p-7 sm:p-10 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start"
          style={{
            border: "1px solid rgba(249,125,0,0.30)",
            boxShadow: "0 0 60px rgba(249,125,0,0.07), inset 0 1px 0 rgba(249,125,0,0.20), inset 0 -1px 0 rgba(0,0,0,0.12)",
          }}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ y: -3 }}
        >
          {/* Satellite dish — spins 360° on scroll entry */}
          <motion.div
            className="shrink-0 text-5xl sm:text-6xl"
            style={{ display: "inline-block", originX: "50%", originY: "50%" }}
            initial={{ rotate: 0, scale: 0.65 }}
            whileInView={{ rotate: 360, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            📡
          </motion.div>

          <div>
            {/* Title + live pulse */}
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-display text-white font-extrabold text-2xl sm:text-3xl">
                {features[0].title}
              </h3>
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[#f97d00] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f97d00]" />
              </span>
            </div>

            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-5" style={{ maxWidth: "540px" }}>
              {features[0].copy}
            </p>

            {/* Watch Live → /tv (internal link, no new tab) */}
            <Link
              href="/tv"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{ background: "#f97d00" }}
            >
              ▶ Watch Live
            </Link>
          </div>
        </motion.div>

        {/* 3 smaller cards — staggered crawl up */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.slice(1).map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 flex flex-col gap-3"
              style={{ borderTop: `2px solid ${f.borderColor}` }}
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.12,
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Icon — spins in with spring bounce */}
              <motion.span
                style={{ display: "inline-block", fontSize: "2.25rem", lineHeight: 1 }}
                initial={{ rotate: 0, scale: 0.55 }}
                whileInView={{ rotate: 360, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.12 + 0.15,
                  duration: 0.75,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {f.icon}
              </motion.span>

              <h3 className="font-display text-white font-bold text-lg leading-snug">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
