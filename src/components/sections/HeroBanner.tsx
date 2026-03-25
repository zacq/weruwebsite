"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section
      className="w-full py-10 flex flex-col items-center justify-center text-center gap-6 px-4"
      style={{ background: "#f97d00", minHeight: "180px" }}
    >
      {/* Live badge */}
      <motion.div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="w-2 h-2 rounded-full bg-white live-dot inline-block"
        />
        <span className="text-white text-xs font-bold tracking-widest uppercase">
          On Air Now
        </span>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <motion.a
          href="/radio"
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-extrabold text-sm tracking-wide"
          style={{
            background: "#000000",
            border: "2px solid rgba(255,255,255,0.15)",
            minWidth: "170px",
          }}
          whileHover={{ scale: 1.04, background: "#111111" }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="text-base">📻</span>
          LIVE RADIO
        </motion.a>

        <motion.a
          href="/tv"
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-black font-extrabold text-sm tracking-wide"
          style={{
            background: "#ffffff",
            minWidth: "170px",
          }}
          whileHover={{ scale: 1.04, background: "#f5f5f5" }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="text-base">📺</span>
          LIVE TV
        </motion.a>
      </motion.div>
    </section>
  );
}
