import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Home",       href: "/" },
  { label: "TV",         href: "/tv" },
  { label: "Radio",      href: "/radio" },
  { label: "Podcast",    href: "/podcast" },
  { label: "Studios",    href: "/studios" },
  { label: "Presenters", href: "/presenters" },
];

const SOCIAL_PATHS: Record<string, string> = {
  Facebook:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  YouTube:   "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  X:         "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L2.009 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  TikTok:    "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z",
};

const socials = [
  { label: "Facebook",  href: "https://facebook.com/werutv" },
  { label: "Instagram", href: "https://instagram.com/werutv" },
  { label: "YouTube",   href: "https://youtube.com/@werutvfm3411" },
  { label: "X",         href: "https://x.com/werutv" },
  { label: "TikTok",    href: "https://tiktok.com/@werutv" },
];

const FOOTER_BG = "#7A1010";

export default function Footer() {
  return (
    <footer style={{ background: FOOTER_BG, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">

        {/* Mobile: brand row + 2-col nav/contact — Desktop: 4-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo.png" alt="Weru TV" width={90} height={30} className="object-contain" />
            </Link>
            <p className="text-xs mt-1.5 text-center md:text-left" style={{ color: "rgba(255,255,255,0.55)" }}>
              Kenya&apos;s premier broadcast experience.
            </p>
            {/* Buttons — inline on mobile */}
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center md:justify-start">
              <a
                href="#rate-card"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{ background: "#f97d00" }}
              >
                📋 Get Rate Card
              </a>
              <a
                href="https://wa.me/254707065000?text=Weru%20TV%20Digital%20Hotline%20Number"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={{ background: "#25D366" }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile: 2-col sub-grid for nav + contact / Desktop: 2 separate columns */}
          <div className="grid grid-cols-2 md:contents gap-4">

            {/* Navigate */}
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="text-[10px] tracking-widest uppercase font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                Navigate
              </p>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs md:text-sm font-medium hover:text-[#FACC15] transition-colors"
                  style={{ color: "rgba(255,255,255,0.70)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                className="text-xs font-bold hover:opacity-80 transition-opacity mt-0.5"
                style={{ color: "#FACC15" }}
              >
                🏆 10 for 10
              </Link>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1 md:gap-1.5 text-xs md:text-sm">
              <p className="text-[10px] tracking-widest uppercase font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                Contact
              </p>

              <p className="text-[9px] font-bold tracking-wider uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Reception</p>
              <a href="tel:+254700117026" className="hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                📞 0700 117026
              </a>
              <a href="tel:+254738970438" className="hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                📞 0738 970438
              </a>

              <p className="text-[9px] font-bold tracking-wider uppercase mt-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>Commercials</p>
              <a href="https://wa.me/254707065000" target="_blank" rel="noopener noreferrer" className="hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                💬 0707 065000
              </a>

              <p className="text-[9px] font-bold tracking-wider uppercase mt-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>News Hotline</p>
              <a href="tel:+254703223363" className="hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                📞 0703 223363
              </a>

              <a href="mailto:weruofficial@gmail.com" className="mt-0.5 hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                ✉️ weruofficial@gmail.com
              </a>
              <a href="mailto:news@werutv.co.ke" className="hover:text-[#f97d00] transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>
                ✉️ news@werutv.co.ke
              </a>
            </div>
          </div>

          {/* Listener CTA */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="https://wa.me/254707065000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold leading-snug hover:text-[#FACC15] transition-colors"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Share your thoughts on<br />
              <span style={{ color: "#FACC15" }}>0707 065000</span>
            </a>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center md:justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-125"
                  style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)" }}
                >
                  {SOCIAL_PATHS[s.label] && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={SOCIAL_PATHS[s.label]} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }}
        >
          <span>© {new Date().getFullYear()} Weru Digital. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="/terms"   className="hover:text-white/60 transition-colors">Terms of Service</a>
            <span>werudigital.co.ke</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
