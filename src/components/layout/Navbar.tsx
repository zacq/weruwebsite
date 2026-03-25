"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { label: "HOME",  href: "/" },
  { label: "TV",    href: "/tv" },
  { label: "RADIO", href: "/radio" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/werutv",   icon: "f"  },
  { label: "YouTube",  href: "https://youtube.com/@werutv",   icon: "▶"  },
  { label: "X",        href: "https://x.com/werutv",          icon: "𝕏"  },
  { label: "TikTok",   href: "https://tiktok.com/@werutv",    icon: "♪"  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ background: "#111111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-1 shrink-0 select-none">
          <span className="text-[1.6rem] font-black tracking-tight leading-none text-white">
            w<span style={{ color: "#FACC15" }}>e</span>ru
          </span>
          <sup
            className="text-[10px] font-extrabold leading-none ml-0.5"
            style={{ color: "#f97d00", verticalAlign: "super" }}
          >
            TV
          </sup>
        </Link>

        {/* ── Nav links ── */}
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-bold tracking-widest rounded transition-colors duration-150"
                style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.65)" }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Advertise pill – desktop */}
          <motion.a
            href="#rate-card"
            className="hidden sm:flex items-center gap-1.5 ml-3 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
            style={{
              background: "#f97d00",
              boxShadow: "0 0 14px rgba(249,125,0,0.35)",
            }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 22px rgba(249,125,0,0.55)" }}
            whileTap={{ scale: 0.95 }}
          >
            📢 Advertise
          </motion.a>
        </div>

        {/* ── Social icons ── */}
        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
