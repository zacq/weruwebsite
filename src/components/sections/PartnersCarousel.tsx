"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Safaricom"   },
  { name: "KCB Bank"    },
  { name: "Equity Bank" },
  { name: "Nation Media"},
  { name: "NCBA Bank"   },
  { name: "Kenya Airways"},
  { name: "Twiga Foods" },
  { name: "Jambojet"    },
  { name: "Co-op Bank"  },
  { name: "EABL"        },
];

function LogoTile({ name }: { name: string }) {
  return (
    <div
      className="shrink-0 mx-2 sm:mx-3 px-5 sm:px-7 py-3 rounded-xl flex items-center justify-center transition-all duration-250 hover:scale-[1.04]"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        minWidth: "120px",
        height: "48px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.20)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <span className="text-white/55 text-sm font-bold tracking-wide whitespace-nowrap hover:text-white/85 transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <section
      className="py-10 sm:py-14 overflow-hidden"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(249,125,0,0.18)",
      }}
    >
      <motion.div
        className="text-center mb-7 px-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-1">
          Trusted by Leading Brands
        </p>
        <h2 className="text-white font-extrabold text-xl sm:text-2xl">
          Our Partners &{" "}
          <span className="font-headline italic" style={{ color: "#f97d00" }}>
            Advertisers
          </span>
        </h2>
      </motion.div>

      {/* Auto-scrolling strip */}
      <div className="relative flex overflow-hidden">
        <div className="scroll-slow flex items-center">
          {doubled.map((p, i) => (
            <LogoTile key={`${p.name}-${i}`} name={p.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
