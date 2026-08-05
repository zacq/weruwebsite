"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Presenter } from "@/data/presenters";

// Curated order of presenters to feature in this strip — images come from
// the Presenters Airtable data (see src/lib/getPresenters.ts), not local files.
const FEATURED_SLUGS = [
  "mc-kithumba",
  "makena-wa-matiri",
  "martin-gichunge",
  "mc-tash",
  "munene-wa-kagwi",
  "mwenda-h-pilot",
  "nelly-githinji",
  "stella-karimi",
  "empress-rita-natty",
  "edward-mutembei",
  "betty",
  "njumaa-sacco-squad",
];

export default function CultureSection({ presenters }: { presenters: Presenter[] }) {
  const presenterImages = FEATURED_SLUGS
    .map((slug) => presenters.find((p) => p.slug === slug))
    .filter((p): p is Presenter => Boolean(p))
    .map((p) => ({ src: p.imageSrc, caption: p.name, slug: p.slug }));

  // Duplicate for seamless infinite loop
  const doubled = [...presenterImages, ...presenterImages];

  return (
    <section className="py-16 sm:py-24 overflow-hidden relative" style={{ background: "#0A0A0A" }}>
      {/* Ambient glow — gold tint matches cultural/gold accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(250,204,21,0.04) 0%, transparent 65%)" }}
      />

      {/* Text block */}
      <div className="px-6 sm:px-10 md:px-20 max-w-6xl mx-auto mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#FACC15" }}>
            Arts · Culture · Community
          </p>
          <h2 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-5">
            Weru Studios —{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>
              Your Cultural Home
            </span>
          </h2>
          <p
            className="text-white/50 text-sm sm:text-base leading-relaxed mb-7"
            style={{ maxWidth: "620px" }}
          >
            Weru Studios is more than a broadcast facility — it is a cultural centre. From roots
            reggae to investigative journalism, from morning talk shows to agricultural programming,
            every production is rooted in the heritage of Mt Kenya and crafted for audiences
            from Nairobi to Harare.
          </p>
          <a
            href="/studios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
            style={{ background: "#FACC15", color: "#000" }}
          >
            Visit Our Studios →
          </a>
        </motion.div>
      </div>

      {/* Auto-streaming image strip — left to right */}
      <div className="relative flex overflow-hidden">
        <div className="scroll-right flex items-end gap-4 shrink-0">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="group relative shrink-0 overflow-hidden rounded-2xl"
              style={{
                width: "clamp(160px, 18vw, 240px)",
                aspectRatio: "3 / 4",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Bottom gradient + caption */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 50%)",
                }}
              />
              <p className="absolute bottom-2.5 left-2.5 text-white text-[11px] font-bold leading-tight">
                {img.caption}
                {img.slug && (
                  <Link
                    href={`/presenters/${img.slug}`}
                    className="block text-[10px] font-bold mt-0.5 hover:underline"
                    style={{ color: "#FACC15" }}
                  >
                    Read profile →
                  </Link>
                )}
              </p>
              {/* Gold border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: "2px solid #FACC15" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quiz promo card — floats below the ticker */}
      <div className="flex justify-center mt-8 px-4">
        <motion.div
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "linear-gradient(145deg, #4A2000 0%, #7A3A00 55%, #5C2A00 100%)",
            border: "1px solid rgba(250,180,50,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 24px rgba(180,80,0,0.2)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 36px rgba(250,120,0,0.3)" }}
        >
          <motion.span
            className="text-xl shrink-0"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            🎯
          </motion.span>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm leading-tight" style={{ color: "#F97D00" }}>
              10 Over 10: Twine Cietu SN2
            </span>
            <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
              10 questions — win a complimentary ticket to Twine Cietu SN2
            </span>
          </div>
          <Link
            href="/quiz"
            className="shrink-0 ml-2 px-4 py-2 rounded-full font-bold text-xs text-black whitespace-nowrap"
            style={{ background: "#FACC15" }}
          >
            Start Quiz →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
