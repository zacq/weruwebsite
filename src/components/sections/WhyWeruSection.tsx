"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📡",
    title: "Live 24/7",
    copy: "Round-the-clock news, entertainment, and cultural programming — live from the heart of Central Kenya, delivered to screens worldwide.",
    featured: true,
    cta: { label: "Watch Live", href: "https://www.youtube.com/@werutvfm3411/live" },
  },
  {
    icon: "🌍",
    title: "International Reach",
    copy: "Broadcast across 6 countries on Azam TV, DStv, Startimes & Zuku — reaching over 1.97 million monthly viewers.",
  },
  {
    icon: "🎭",
    title: "Arts & Culture Hub",
    copy: "Weru Studios: a cultural centre celebrating Kikuyu heritage, African arts, and the stories that define us.",
  },
  {
    icon: "📰",
    title: "Local News Authority",
    copy: "The most trusted source for Central Kenya and the Mount Kenya region — journalism that holds power accountable.",
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

        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#f97d00" }}>
            WHY CHOOSE US
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl">
            Why{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>
              Weru TV?
            </span>
          </h2>
        </motion.div>

        {/* Featured card — spans full width */}
        <motion.div
          className="glass-card rounded-2xl p-7 sm:p-10 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start"
          style={{
            border: "1px solid rgba(249,125,0,0.30)",
            boxShadow: "0 0 60px rgba(249,125,0,0.07), inset 0 1px 0 rgba(249,125,0,0.20), inset 0 -1px 0 rgba(0,0,0,0.12)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -3 }}
        >
          <div className="text-5xl sm:text-6xl shrink-0">{features[0].icon}</div>
          <div>
            <h3 className="font-display text-white font-extrabold text-2xl sm:text-3xl mb-2">
              {features[0].title}
            </h3>
            <p
              className="text-white/55 text-base sm:text-lg leading-relaxed mb-5"
              style={{ maxWidth: "540px" }}
            >
              {features[0].copy}
            </p>
            <a
              href={features[0].cta!.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#f97d00" }}
            >
              ▶ {features[0].cta!.label}
            </a>
          </div>
        </motion.div>

        {/* 3 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.slice(1).map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.09, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="font-display text-white font-bold text-lg leading-snug">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
