"use client";

import { motion } from "framer-motion";
import { BRAND_LOGOS } from "@/lib/brandAssets";

const BRANDS = [
  { name: "Weru TV",      src: BRAND_LOGOS.weruTv },
  { name: "Weru FM 96.4", src: BRAND_LOGOS.weruFm },
  { name: "Weru Digital", src: BRAND_LOGOS.weruDigital },
];

export default function OurBrandsSection() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8" style={{ background: "#0A0A0A" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#f97d00" }}>
            Our Brands
          </p>
          <h2 className="font-display text-white font-extrabold text-2xl sm:text-3xl md:text-4xl">
            One movement,{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>
              three ways to tune in
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                height: "100px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
