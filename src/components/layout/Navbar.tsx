"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "TV",         href: "/tv#tv-schedule" },
  { label: "Radio",      href: "/radio" },
  { label: "Presenters", href: "/presenters" },
  { label: "Studios",    href: "/studios" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Contact",    href: "#contact",    dropdown: true },
];

const WHATSAPP = "https://wa.me/254707065000?text=Weru%20TV%20Digital%20Hotline%20Number";
const MAPS     = "https://www.google.com/maps/search/Weru+TV+Meru+Kenya";

function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const ref  = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 180);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold tracking-widest rounded-lg transition-all duration-150 hover:bg-white/[0.06]"
        style={{ color: open ? "#f97d00" : "rgba(255,255,255,0.65)" }}
      >
        Contact
        <svg
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 mt-2 rounded-2xl overflow-hidden"
            style={{
              width: "240px",
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.80)",
            }}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="px-4 pt-4 pb-3 flex flex-col gap-3">

              {/* Reception */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest uppercase mb-1.5"
                  style={{ color: "#f97d00" }}>Reception</p>
                <a href="tel:+254700117026"
                  className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#f97d00] transition-all duration-150 hover:scale-105 origin-left"
                  style={{ color: "#ffffff" }}>
                  📞 0700 117026
                </a>
                <a href="tel:+254738970438"
                  className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#f97d00] transition-all duration-150 hover:scale-105 origin-left"
                  style={{ color: "#ffffff" }}>
                  📞 0738 970438
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }} />

              {/* Commercials */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest uppercase mb-1.5"
                  style={{ color: "#f97d00" }}>Commercials</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#25D366] transition-all duration-150 hover:scale-105 origin-left"
                  style={{ color: "#ffffff" }}>
                  💬 0707 065000
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }} />

              {/* News */}
              <div>
                <p className="text-[9px] font-extrabold tracking-widest uppercase mb-1.5"
                  style={{ color: "#f97d00" }}>News Hotline</p>
                <a href="tel:+254703223363"
                  className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#f97d00] transition-all duration-150 hover:scale-105 origin-left"
                  style={{ color: "#ffffff" }}>
                  📞 0703 223363
                </a>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }} />

              {/* Email */}
              <a href="mailto:weruofficial@gmail.com"
                className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#f97d00] transition-all duration-150 hover:scale-105 origin-left"
                style={{ color: "#ffffff" }}>
                ✉️ weruofficial@gmail.com
              </a>
              <a href="mailto:news@werutv.co.ke"
                className="flex items-center gap-2 py-1 text-xs font-semibold hover:text-[#f97d00] transition-all duration-150 hover:scale-105 origin-left"
                style={{ color: "#ffffff" }}>
                ✉️ news@werutv.co.ke
              </a>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pb-1">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-white text-xs font-bold transition-all duration-150 hover:scale-[1.04] hover:opacity-90"
                  style={{ background: "#25D366" }}
                >
                  💬 WhatsApp Us
                </a>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-white text-xs font-bold transition-all duration-150 hover:scale-[1.04] hover:opacity-90"
                  style={{ background: "#4285F4" }}
                >
                  📍 Find Us on Google Maps
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TVDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref   = useRef<HTMLDivElement>(null);
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 180); };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = pathname.startsWith("/tv");

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold tracking-widest rounded-lg transition-all duration-150 hover:bg-white/[0.06]"
        style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.65)" }}
      >
        TV
        <svg
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden"
            style={{
              width: "180px",
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.80)",
            }}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="px-3 py-3 flex flex-col gap-1">
              <Link
                href="/tv#tv-schedule"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:text-[#f97d00]"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                <span className="text-base">📅</span>
                Program
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="glass-strong w-full px-4 h-14 flex items-center justify-between gap-4"
        style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}
      >
            {/* Logo */}
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

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  if (link.label === "Contact") return <ContactDropdown key={link.label} />;
                  return <TVDropdown key={link.label} pathname={pathname} />;
                }
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-1.5 text-sm font-bold tracking-widest rounded-lg transition-all duration-150 hover:bg-white/[0.06]"
                    style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.65)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}

            </div>

            {/* Right: Live buttons + Advertise */}
            <div className="flex items-center gap-2">
              <motion.a
                href="/radio"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.18)" }}
                whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.75)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[#f97d00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f97d00]" />
                </span>
                <span>LIVE RADIO</span>
              </motion.a>

              {/* Watch Live — primary CTA, visible on all screen sizes */}
              <motion.a
                href="/tv"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: "linear-gradient(180deg,#FF9425,#FF7A00)",
                  color: "#1a1003",
                  boxShadow: "0 4px 14px rgba(255,122,0,.35)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 22px rgba(255,122,0,.55)" }}
                whileTap={{ scale: 0.95 }}
              >
                ▶ Watch Live
              </motion.a>

              {/* Advertise — desktop only on mobile to keep navbar clean */}
              <motion.a
                href="/advertise"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{ background: "rgba(249,125,0,0.18)", border: "1px solid rgba(249,125,0,0.35)" }}
                whileHover={{ scale: 1.06, background: "rgba(249,125,0,0.28)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden lg:inline">📢 Advertise</span>
                <span className="lg:hidden">📢</span>
              </motion.a>

              <MobileMenu pathname={pathname} open={menuOpen} setOpen={setMenuOpen} />
            </div>
          </div>
    </nav>
  );
}

function MobileMenu({ pathname, open, setOpen }: { pathname: string; open: boolean; setOpen: (v: boolean) => void }) {
  const [tvOpen, setTvOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1 w-12 h-12 items-center justify-center"
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
            className="absolute top-14 left-0 right-0 flex flex-col overflow-y-auto"
            style={{
              maxHeight: "calc(100dvh - 3.5rem)",
              background: "rgba(8, 8, 8, 0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.60)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                if (link.label === "Contact") {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setContactOpen((o) => !o)}
                        className="w-full flex items-center justify-between py-3.5 text-base font-semibold tracking-wide transition-colors duration-150"
                        style={{ color: contactOpen ? "#f97d00" : "rgba(255,255,255,0.70)" }}
                      >
                        Contact
                        <svg
                          className="w-4 h-4 transition-transform duration-200"
                          style={{ transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                          viewBox="0 0 12 12" fill="none"
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <AnimatePresence>
                        {contactOpen && (
                          <motion.div
                            className="flex flex-col gap-2 pb-4 pl-3"
                            style={{ borderLeft: "2px solid rgba(249,125,0,0.35)" }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-[9px] font-extrabold tracking-widest uppercase mt-1" style={{ color: "#f97d00" }}>Reception</p>
                            <a href="tel:+254700117026" className="flex items-center gap-2 py-1 text-sm font-semibold active:opacity-60 transition-opacity" style={{ color: "#ffffff" }}>📞 0700 117026</a>
                            <a href="tel:+254738970438" className="flex items-center gap-2 py-1 text-sm font-semibold active:opacity-60 transition-opacity" style={{ color: "#ffffff" }}>📞 0738 970438</a>
                            <p className="text-[9px] font-extrabold tracking-widest uppercase mt-1" style={{ color: "#f97d00" }}>Commercials</p>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-1 text-sm font-semibold active:opacity-60 transition-opacity" style={{ color: "#ffffff" }}>💬 0707 065000</a>
                            <p className="text-[9px] font-extrabold tracking-widest uppercase mt-1" style={{ color: "#f97d00" }}>News Hotline</p>
                            <a href="tel:+254703223363" className="flex items-center gap-2 py-1 text-sm font-semibold active:opacity-60 transition-opacity" style={{ color: "#ffffff" }}>📞 0703 223363</a>
                            <a href="mailto:weruofficial@gmail.com" className="flex items-center gap-2 py-1 text-sm font-semibold mt-1 active:opacity-60 transition-opacity" style={{ color: "#ffffff" }}>✉️ weruofficial@gmail.com</a>
                            <div className="flex flex-col gap-2 mt-3">
                              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-bold active:scale-95 transition-transform"
                                style={{ background: "#25D366" }}>
                                💬 WhatsApp Us
                              </a>
                              <a href={MAPS} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-bold active:scale-95 transition-transform"
                                style={{ background: "#4285F4" }}>
                                📍 Find Us on Maps
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const tvActive = pathname.startsWith("/tv");
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setTvOpen((o) => !o)}
                      className="w-full flex items-center justify-between py-3.5 text-base font-semibold tracking-wide transition-colors duration-150"
                      style={{ color: tvActive ? "#f97d00" : "rgba(255,255,255,0.70)" }}
                    >
                      <span className="flex items-center gap-3">
                        {tvActive && <span className="w-1 h-4 rounded-full bg-[#f97d00]" />}
                        TV
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200"
                        style={{ transform: tvOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <AnimatePresence>
                      {tvOpen && (
                        <motion.div
                          className="flex flex-col gap-1 pb-2 pl-4"
                          style={{ borderLeft: "2px solid rgba(249,125,0,0.35)" }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link href="/tv#tv-schedule" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2.5 text-sm font-medium active:opacity-60 transition-opacity" style={{ color: "rgba(255,255,255,0.75)" }}>
                            📅 Program
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-base font-semibold tracking-wide flex items-center gap-3 transition-colors duration-150 active:opacity-60"
                  style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.70)" }}
                >
                  {active && <span className="w-1 h-4 rounded-full bg-[#f97d00] shrink-0" />}
                  {link.label}
                </Link>
              );
            })}

            <div className="flex gap-2 pt-3 mt-1 border-t border-white/[0.08]">
              <a href="/radio" onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition-transform"
                style={{ background: "rgba(249,125,0,0.15)", border: "1px solid rgba(249,125,0,0.25)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[#f97d00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f97d00]" />
                </span>
                LIVE RADIO
              </a>
              <a href="/tv" onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-black text-sm font-bold active:scale-95 transition-transform"
                style={{ background: "#ffffff" }}>
                📺 LIVE TV
              </a>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
