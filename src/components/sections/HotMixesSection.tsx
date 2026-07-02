"use client";

import { motion } from "framer-motion";
import { hotMixes } from "@/data/hotMixes";

function MixCard({ title, dj, mixcloudFeed, i }: { title: string; dj: string; mixcloudFeed: string | null; i: number }) {
  return (
    <motion.div
      className="glass rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <div>
        <p className="text-white font-bold text-sm sm:text-base leading-tight">{title}</p>
        <p className="text-[11px] font-bold" style={{ color: "#f97d00" }}>{dj}</p>
      </div>

      {mixcloudFeed ? (
        <iframe
          title={`${title} by ${dj}`}
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=${encodeURIComponent(mixcloudFeed)}`}
          width="100%"
          height="120"
          frameBorder="0"
          loading="lazy"
          className="rounded-lg"
        />
      ) : (
        <div
          className="flex items-center gap-3 rounded-lg px-3 py-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.14)" }}
        >
          <span
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
          >
            ▶
          </span>
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
            Mix coming soon
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function HotMixesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden" style={{ background: "#0D1117" }}>
      <div
        className="absolute top-0 right-0 w-[500px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(249,125,0,0.06) 0%, transparent 70%)" }}
      />
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#f97d00" }}>
            Weru FM
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Hot{" "}
            <span className="font-headline italic" style={{ color: "#f97d00" }}>
              Mixes
            </span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Bangers from Weru FM&apos;s resident DJs — mixes dropped straight from the studio.
          </p>
        </motion.div>

        {/* Mix grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {hotMixes.map((mix, i) => (
            <MixCard key={mix.title} title={mix.title} dj={mix.dj} mixcloudFeed={mix.mixcloudFeed} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
