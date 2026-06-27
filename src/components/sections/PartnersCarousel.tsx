"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Joy Millers",                       logo: "/PatnerLogo/JoyMillers.png"       },
  { name: "Rhino Mabati",                      logo: "/PatnerLogo/RhinoMabati.png"      },
  { name: "Nice Rice Millers",                 logo: "/PatnerLogo/NiceRice.png"         },
  { name: "Duralong Mabati",                   logo: "/PatnerLogo/Duralong.png"         },
  { name: "Yetu Sacco",                        logo: "/PatnerLogo/Yetu%20Sacco.png"     },
  { name: "Betika",                            logo: "/PatnerLogo/Betika.png"           },
  { name: "Safaricom PLC",                     logo: "/PatnerLogo/Safaricom.png"        },
  { name: "Greenlife Crop Protection Africa",  logo: "/PatnerLogo/Greenlife.png"        },
  { name: "Osho Chemical Industries",          logo: "/PatnerLogo/Osho.png"             },
  { name: "Paleah Millers",                    logo: null                               },
  { name: "Imperial College",                  logo: null                               },
  { name: "The Kambakia Christian Centre",     logo: null                               },
  { name: "Coca Cola",                         logo: null                               },
];

function LogoTile({ name, logo }: { name: string; logo: string | null }) {
  if (logo) {
    return (
      <div
        className="shrink-0 mx-2 sm:mx-3 rounded-xl flex items-center justify-center transition-all duration-250 hover:scale-[1.05] hover:shadow-lg"
        style={{
          background: "rgba(255,255,255,0.96)",
          padding: "10px 20px",
          minWidth: "130px",
          height: "60px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          style={{ maxHeight: "38px", maxWidth: "110px", objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div
      className="shrink-0 mx-2 sm:mx-3 px-5 sm:px-7 py-3 rounded-xl flex items-center justify-center transition-all duration-250 hover:scale-[1.04]"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        minWidth: "120px",
        height: "60px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 2px 8px rgba(0,0,0,0.20)",
      }}
    >
      <span className="text-white/55 text-sm font-bold tracking-wide whitespace-nowrap">
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
        <p className="text-white/30 text-[10px] font-bold tracking-wider mb-1">
          Brands that trust Weru
        </p>
        <h2 className="text-white font-extrabold text-xl sm:text-2xl">
          Our{" "}
          <span className="font-headline italic" style={{ color: "#f97d00" }}>
            Trusted Brands
          </span>
        </h2>
      </motion.div>

      {/* Auto-scrolling strip */}
      <div className="relative flex overflow-hidden">
        <div className="scroll-slow flex items-center">
          {doubled.map((p, i) => (
            <LogoTile key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
