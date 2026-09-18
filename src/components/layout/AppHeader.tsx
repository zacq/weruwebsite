"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO_URL } from "@/lib/brandAssets";

export default function AppHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: "56px",
        paddingTop: "env(safe-area-inset-top)",
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Image src={SITE_LOGO_URL} alt="Weru Digital" width={100} height={33} priority style={{ height: 28, width: "auto" }} />
      <Link
        href="/me"
        aria-label="Notifications"
        className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </Link>
    </header>
  );
}
