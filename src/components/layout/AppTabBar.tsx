"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";

const TABS = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    href: "/tv",
    label: "TV",
    icon: (active: boolean) => (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/radio",
    label: "Radio",
    icon: (active: boolean) => (
      <>
        <circle cx="12" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <path d="M4 14a8 8 0 0 1 16 0M6 8 3 5M18 8l3-3" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/podcast",
    label: "Shows",
    icon: (active: boolean) => (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      </>
    ),
  },
  {
    href: "/me",
    label: "Me",
    icon: (active: boolean) => (
      <>
        <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
      </>
    ),
  },
];

export default function AppTabBar() {
  const [isNative, setIsNative] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  if (!isNative) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:scale-95 transition-transform"
            style={{ color: active ? "#f97d00" : "rgba(255,255,255,0.5)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">{tab.icon(active)}</svg>
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
