"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2M+",   label: "Monthly Viewers",   icon: "👥" },
  { value: "500K+", label: "Radio Listeners",    icon: "📻" },
  { value: "1.2M+", label: "Social Followers",   icon: "📱" },
  { value: "24/7",  label: "On Air Coverage",    icon: "🎙️" },
];

const platforms = [
  {
    icon: "📺",
    name: "TV Advertising",
    items: ["Prime-time spots", "Show sponsorships", "Branded content", "Product features"],
  },
  {
    icon: "📻",
    name: "Radio Advertising",
    items: ["Live presenter reads", "Jingles & bumpers", "Sponsored segments", "Time slots"],
  },
  {
    icon: "📱",
    name: "Digital & Social",
    items: ["Reels & stories", "Influencer tie-ins", "YouTube pre-rolls", "Web banners"],
  },
];

export default function AdvertiseSection() {
  return (
    <section id="advertise" className="px-4 py-14" style={{ background: "#111111" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(249,125,0,0.15)",
              border: "1px solid rgba(249,125,0,0.35)",
              color: "#f97d00",
            }}
          >
            💼 Grow Your Brand
          </span>
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight">
            Advertise on{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f97d00, #FACC15)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Weru TV & Radio
            </span>
          </h2>
          <p className="text-white/55 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Reach millions of engaged Kenyan viewers and listeners across TV, FM radio,
            and social platforms — with one trusted media partner.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-sm rounded-2xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold" style={{ color: "#f97d00" }}>{s.value}</div>
              <div className="text-white/50 text-xs mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Platforms */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3">{p.name}</h3>
              <ul className="flex flex-col gap-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                    <span style={{ color: "#f97d00" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          <motion.a
            href="#rate-card"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
            style={{ background: "#f97d00", boxShadow: "0 0 24px rgba(249,125,0,0.45)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(249,125,0,0.65)" }}
            whileTap={{ scale: 0.95 }}
          >
            📋 Request Rate Card
          </motion.a>
          <motion.a
            href="#rate-card"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
            style={{
              background: "rgba(200,16,46,0.85)",
              border: "1px solid rgba(200,16,46,0.5)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📅 Book Advertising Slot
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
