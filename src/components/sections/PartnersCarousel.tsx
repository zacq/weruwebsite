"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Safaricom",       abbr: "Safaricom",   color: "#4CAF50" },
  { name: "KCB Bank",        abbr: "KCB",         color: "#1B5E20" },
  { name: "Equity Bank",     abbr: "Equity",      color: "#E53935" },
  { name: "Nation Media",    abbr: "NMG",         color: "#1565C0" },
  { name: "NCBA Bank",       abbr: "NCBA",        color: "#37474F" },
  { name: "Kenya Airways",   abbr: "KQ",          color: "#C62828" },
  { name: "Twiga Foods",     abbr: "Twiga",       color: "#F9A825" },
  { name: "Jambojet",        abbr: "Jambojet",    color: "#E65100" },
  { name: "Co-op Bank",      abbr: "Co-op",       color: "#2E7D32" },
  { name: "EABL",            abbr: "EABL",        color: "#4A148C" },
];

function LogoChip({ partner }: { partner: (typeof partners)[0] }) {
  return (
    <div
      className="shrink-0 mx-2 sm:mx-4 px-4 sm:px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-default"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        minWidth: "100px",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0"
        style={{ background: partner.color }}
      >
        {partner.abbr.slice(0, 2)}
      </div>
      <span className="text-white/70 text-sm font-semibold whitespace-nowrap">{partner.name}</span>
    </div>
  );
}

export default function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <section className="py-10 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <motion.div
        className="text-center mb-6 px-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-white/35 text-[11px] font-bold tracking-widest uppercase">
          Trusted by Leading Brands
        </p>
        <h2 className="text-white font-extrabold text-xl sm:text-2xl mt-1">
          Our Partners & Advertisers
        </h2>
      </motion.div>

      {/* Slow scroll strip */}
      <div className="relative flex overflow-hidden">
        <div className="scroll-slow flex items-center">
          {doubled.map((p, i) => (
            <LogoChip key={`${p.name}-${i}`} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
