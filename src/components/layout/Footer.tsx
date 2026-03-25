import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "HOME",  href: "/" },
  { label: "TV",    href: "/tv" },
  { label: "RADIO", href: "/radio" },
  { label: "BLOG",  href: "/blog" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/werutv",  icon: "f"  },
  { label: "YouTube",  href: "https://youtube.com/@werutv",  icon: "▶"  },
  { label: "X",        href: "https://x.com/werutv",         icon: "𝕏"  },
  { label: "TikTok",   href: "https://tiktok.com/@werutv",   icon: "♪"  },
];

// Warm off-white — sits naturally between the white #FFFFFF form above and avoids a hard dark jump
const FOOTER_BG = "#F5F4F0";

export default function Footer() {
  return (
    <footer style={{ background: FOOTER_BG, borderTop: "1px solid #E8E6E0" }}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Weru TV"
                width={100}
                height={34}
                className="object-contain"
              />
            </Link>
            <p className="text-xs mt-2 max-w-[200px]" style={{ color: "#888888" }}>
              Kenya&apos;s premier broadcast experience.
            </p>
            <a
              href="#rate-card"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all duration-200"
              style={{ background: "#f97d00", boxShadow: "0 0 14px rgba(249,125,0,0.25)" }}
            >
              📋 Get Rate Card
            </a>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: "#AAAAAA" }}>
              Navigate
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "#555555" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start gap-2 text-sm">
            <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: "#AAAAAA" }}>
              Contact
            </p>
            <a href="tel:+254700000000" className="transition-colors duration-150 hover:text-[#f97d00]" style={{ color: "#555555" }}>
              📞 +254 700 000 000
            </a>
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-[#f97d00]" style={{ color: "#555555" }}>
              💬 WhatsApp Us
            </a>
            <a href="mailto:info@werudigital.co.ke"
              className="transition-colors duration-150 hover:text-[#f97d00]" style={{ color: "#555555" }}>
              ✉️ info@werudigital.co.ke
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "#AAAAAA" }}>
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
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150 hover:bg-[#f97d00] hover:text-white"
                  style={{
                    background: "#E8E6E0",
                    color: "#555555",
                    border: "1px solid #DDDDDD",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
          style={{ borderTop: "1px solid #E0DEDB", color: "#AAAAAA" }}
        >
          <span>© {new Date().getFullYear()} Weru Digital. All rights reserved.</span>
          <span>werudigital.co.ke</span>
        </div>
      </div>
    </footer>
  );
}
