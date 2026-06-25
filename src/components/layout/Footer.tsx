import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Home",        href: "/" },
  { label: "TV",          href: "/tv" },
  { label: "Radio",       href: "/radio" },
  { label: "Politics",    href: "/politics" },
  { label: "Sports",      href: "/sports" },
  { label: "Technology",  href: "/technology" },
  { label: "Agriculture", href: "/agriculture" },
  { label: "Weather",     href: "/weather" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/werutv",      icon: "f"  },
  { label: "YouTube",  href: "https://youtube.com/@werutvfm3411", icon: "▶"  },
  { label: "X",        href: "https://x.com/werutv",             icon: "𝕏"  },
  { label: "TikTok",   href: "https://tiktok.com/@werutv",       icon: "♪"  },
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
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "rgba(255,255,255,0.40)" }}>
              Follow Us
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:bg-[#f97d00] hover:text-white hover:border-[#f97d00]"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.70)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {s.icon}
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
