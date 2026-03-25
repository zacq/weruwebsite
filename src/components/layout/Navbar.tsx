"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "HOME",  href: "/" },
  { label: "TV",    href: "/tv" },
  { label: "RADIO", href: "/radio" },
  { label: "BLOG",  href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 10);

      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        // scrolling up
        setVisible(true);
      } else if (currentY > lastScrollY.current + 6) {
        // scrolling down (add threshold to avoid jitter)
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar"
          className="fixed top-0 left-0 right-0 z-50"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <div
            className="w-full px-4 h-14 flex items-center justify-between gap-4 transition-all duration-300"
            style={{
              background: atTop
                ? "rgba(0, 0, 0, 0.25)"
                : "rgba(0, 0, 0, 0.70)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: atTop
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* ── Logo ───────────────────────────────────── */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="Weru TV"
                width={110}
                height={38}
                className="object-contain"
                priority
              />
            </Link>

            {/* ── Nav links ──────────────────────────────── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-xs font-bold tracking-widest rounded transition-colors duration-150"
                    style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.70)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Right: Live buttons + Advertise ────────── */}
            <div className="flex items-center gap-2">
              {/* LIVE RADIO */}
              <motion.a
                href="/radio"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
                whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.75)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[#f97d00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f97d00]" />
                </span>
                <span>LIVE RADIO</span>
              </motion.a>

              {/* LIVE TV */}
              <motion.a
                href="/tv"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-black text-xs font-bold"
                style={{ background: "#ffffff" }}
                whileHover={{ scale: 1.05, background: "#f5f5f5" }}
                whileTap={{ scale: 0.95 }}
              >
                📺 LIVE TV
              </motion.a>

              {/* Advertise CTA */}
              <motion.a
                href="#rate-card"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{
                  background: "#f97d00",
                  boxShadow: "0 0 14px rgba(249,125,0,0.35)",
                }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 22px rgba(249,125,0,0.55)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden lg:inline">📢 Advertise</span>
                <span className="lg:hidden">📢</span>
              </motion.a>

              {/* Mobile nav hamburger */}
              <MobileMenu pathname={pathname} />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1 p-1.5"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-5 h-0.5 bg-white rounded-full"
            animate={
              open
                ? i === 0 ? { rotate: 45, y: 6 }
                : i === 1 ? { opacity: 0 }
                : { rotate: -45, y: -6 }
                : { rotate: 0, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.2 }}
          />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-14 left-0 right-0 px-4 py-3 flex flex-col gap-2"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-bold border-b border-white/8 last:border-0"
                  style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.75)" }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-1">
              <a href="/radio" onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-white text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.12)" }}>
                📻 LIVE RADIO
              </a>
              <a href="/tv" onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-black text-xs font-bold"
                style={{ background: "#ffffff" }}>
                📺 LIVE TV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
