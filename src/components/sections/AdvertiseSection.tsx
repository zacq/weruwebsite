"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdvertisingModal from "@/components/ui/AdvertisingModal";

const stats = [
  { value: "1.97M+", label: "Monthly Viewers",  icon: "👥" },
  { value: "483K+",  label: "Radio Listeners",   icon: "📻" },
  { value: "1.2M+",  label: "Social Followers",  icon: "📱" },
  { value: "24/7",   label: "On Air Coverage",   icon: "🎙️" },
];

const platforms = [
  {
    icon: "📺",
    name: "TV Advertising",
    sub: "Kenya's most-watched Kikuyu channel",
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

const adCards = [
  { label: "Prime Time Spot", sub: "7 PM – 9 PM",       bg: "#C8102E" },
  { label: "Morning Drive",   sub: "6 AM – 9 AM",        bg: "#1a1a1a" },
  { label: "Sponsored Show",  sub: "Custom placement",   bg: "#7A1010" },
  { label: "Digital Banner",  sub: "Web & App",          bg: "#0A0A0A" },
  { label: "Weekend Special", sub: "Sat & Sun prime",    bg: "#C8102E" },
  { label: "Radio Jingle",    sub: "30 sec · 60 sec",    bg: "#1a1a1a" },
];

function MiniAdStrip() {
  const CARD_H = 72;  // px — visible card height
  const GAP    = 8;   // px — gap between cards (gap-2)
  const VISIBLE = 3;  // cards shown at once

  const scrollH = VISIBLE * CARD_H + (VISIBLE - 1) * GAP; // 232px
  const slotH   = CARD_H + GAP;                            // 80px per slot
  const totalH  = adCards.length * slotH;                  // full scroll distance

  const cards = [...adCards, ...adCards]; // duplicate for seamless loop

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl shrink-0"
      style={{
        width: "160px",
        background: "rgba(0,0,0,0.30)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="shrink-0 px-3 py-2 text-[8px] font-extrabold tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.28)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        Running Ads
      </div>

      {/* Scroll area — locked to exactly 3 cards */}
      <div className="overflow-hidden relative" style={{ height: scrollH }}>
        <motion.div
          animate={{ y: [0, -totalH] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="flex flex-col p-1.5"
          style={{ gap: GAP }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-lg p-3 shrink-0 flex flex-col justify-between"
              style={{
                height: CARD_H,
                background: card.bg,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <p className="text-white font-bold text-[11px] leading-tight">{card.label}</p>
                <p className="text-white/55 text-[9px] mt-0.5">{card.sub}</p>
              </div>
              <span
                className="self-start text-[7px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded"
                style={{ background: "rgba(249,125,0,0.22)", color: "#f97d00" }}
              >
                WERU
              </span>
            </div>
          ))}
        </motion.div>

        {/* Fade masks */}
        <div
          className="absolute top-0 left-0 right-0 h-7 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-7 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
        />
      </div>
    </div>
  );
}

export default function AdvertiseSection() {
  const [openModal, setOpenModal] = useState<"rate-card" | "booking" | null>(null);

  return (
    <>
      <section id="advertise" className="px-4 py-14" style={{ background: "#111111" }}>
        <div className="max-w-6xl mx-auto">

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
              Grow Your Brand
            </span>

            <motion.h2
              className="text-white font-extrabold text-3xl sm:text-4xl leading-tight"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
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
            </motion.h2>

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
                <div className="text-2xl font-extrabold" style={{ color: "#f97d00", fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </div>
                <div className="text-white/50 text-xs mt-1 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Platforms — asymmetric 5-col */}
          <div className="grid sm:grid-cols-5 gap-5 mb-12">

            {/* TV card — featured, with embedded ad strip */}
            <motion.div
              className="sm:col-span-3 glass rounded-2xl p-5 flex flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              {/* Left: text content */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="text-3xl mb-3">{platforms[0].icon}</div>
                <h3 className="text-white font-bold text-lg mb-0.5">{platforms[0].name}</h3>
                <p className="text-white/40 text-xs mb-4">{platforms[0].sub}</p>
                <ul className="flex flex-col gap-1.5">
                  {platforms[0].items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/65 text-xs">
                      <span style={{ color: "#f97d00" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOpenModal("rate-card")}
                  className="inline-flex items-center gap-1.5 mt-6 px-4 py-2 rounded-xl text-white text-xs font-bold self-start transition-opacity hover:opacity-80"
                  style={{ background: "#f97d00" }}
                >
                  Get TV rate card →
                </button>
              </div>

              {/* Right: scrolling ad carousel */}
              <MiniAdStrip />
            </motion.div>

            {/* Radio + Digital — stacked in 2 cols */}
            <div className="sm:col-span-2 flex flex-col gap-5">
              {platforms.slice(1).map((p, i) => (
                <motion.div
                  key={p.name}
                  className="glass-sm rounded-2xl p-5 flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.1, duration: 0.45 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <h3 className="text-white font-bold text-base mb-2">{p.name}</h3>
                  <ul className="flex flex-col gap-1">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/55 text-xs">
                        <span style={{ color: "#f97d00" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            <motion.button
              onClick={() => setOpenModal("rate-card")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
              style={{ background: "#f97d00", boxShadow: "0 0 24px rgba(249,125,0,0.45)" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(249,125,0,0.65)" }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Request Rate Card
            </motion.button>
            <motion.button
              onClick={() => setOpenModal("booking")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
              style={{
                background: "rgba(200,16,46,0.85)",
                border: "1px solid rgba(200,16,46,0.5)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📅 Book Advertising Slot
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AdvertisingModal
        isOpen={openModal === "rate-card"}
        title="Request Rate Card"
        onClose={() => setOpenModal(null)}
      />
      <AdvertisingModal
        isOpen={openModal === "booking"}
        title="Book Advertising Slot"
        onClose={() => setOpenModal(null)}
      />
    </>
  );
}
