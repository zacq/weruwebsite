"use client";

import { motion } from "framer-motion";

const presenterImages = [
  { src: "/Presenters/ajelyne-george.png",   caption: "Ajelyne George" },
  { src: "/Presenters/makena-wa-matiri.png",  caption: "Makena Wa Matiri" },
  { src: "/Presenters/martin-gichunge.png",   caption: "Martin Gichunge" },
  { src: "/Presenters/mc-tash.png",           caption: "MC Tash" },
  { src: "/Presenters/munene-wa-kagwi.png",   caption: "Munene Wa Kagwi" },
  { src: "/Presenters/mwenda-h-pilot.png",    caption: "Mwenda H Pilot" },
  { src: "/Presenters/nelly-githinji.png",    caption: "Nelly Githinji" },
  { src: "/Presenters/ReggaeMania.png",       caption: "DJ Tush" },
  { src: "/Presenters/stella-karimi.png",     caption: "Stella Karimi" },
  { src: "/Presenters/empress-rita-natty.png",caption: "Empress Rita" },
  { src: "/Presenters/edward-mutembei.png",   caption: "Edward Mutembei" },
  {
    src: "/Presenters/Betty%20-Ugima%20Ni%20Utonga.png",
    caption: "Betty",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...presenterImages, ...presenterImages];

export default function CultureSection() {
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
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#FACC15" }}>
            ARTS · CULTURE · COMMUNITY
          </p>
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-5">
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
            every production is rooted in the heritage of Central Kenya and crafted for audiences
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
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Bottom gradient + caption */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 50%)",
                }}
              />
              <p className="absolute bottom-2.5 left-2.5 text-white text-[11px] font-bold">
                {img.caption}
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
    </section>
  );
}
