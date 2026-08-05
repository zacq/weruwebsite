"use client";

import { motion } from "framer-motion";
import { MULTISTREAM_BG_URL } from "@/lib/brandAssets";

const socials = [
  { label: "TikTok",    handle: "@werutv.fm96.4",  href: "https://tiktok.com/@werutv.fm96.4" },
  { label: "Facebook",  handle: "@Weru FM 96.4",    href: "https://facebook.com/werutv" },
  { label: "YouTube",   handle: "@WeruTVOfficial",  href: "https://www.youtube.com/@WeruTVOfficial" },
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

export default function MultiStreamAdvantageSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden" style={{ background: "#0A0A0A", zIndex: 0 }}>
      {/* Background mural */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${MULTISTREAM_BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -3,
        }}
      />
      {/* Dark scrim — keeps the mural as ambient texture, not a competing focal image */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 85% at center, rgba(6,6,8,0.78) 0%, rgba(6,6,8,0.60) 55%, rgba(6,6,8,0.42) 100%)",
          zIndex: -2,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(249,125,0,0.10) 0%, transparent 70%)", zIndex: -1 }}
      />
      <motion.div
        className="max-w-4xl mx-auto relative z-10 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#f97d00" }}>
          Weru Digital
        </p>
        <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-5">
          The Weru{" "}
          <span className="font-headline italic" style={{ color: "#f97d00" }}>
            Multi-Stream Advantage
          </span>
        </h2>
        <p className="text-white/45 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          “Why choose between TV and radio and digital when you can have all three? Weru is
          the only media house that delivers your message simultaneously – on screen, on
          air, online, on farm, and on ground. One investment. Five platforms. Maximum
          reach. That’s the Weru Multi-Stream Advantage.”
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
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
    </section>
  );
}
