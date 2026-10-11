"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import Navbar from "./Navbar";
import AppHeader from "./AppHeader";
import AppTabBar from "./AppTabBar";
import RadioMiniPlayer from "./RadioMiniPlayer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ViewerCaptureModal from "@/components/ui/ViewerCaptureModal";
import AdTicker from "@/components/sections/AdTicker";
import type { AdTickerItem } from "@/lib/getAdTicker";
import { RadioPlayerProvider, useRadioPlayer } from "@/context/RadioPlayerContext";

function SiteChromeInner({ children, adTicker }: { children: React.ReactNode; adTicker: AdTickerItem[] }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isTvPage = pathname?.startsWith("/tv");
  const [isNative, setIsNative] = useState(false);
  const { visible: playerVisible } = useRadioPlayer();

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  if (isDashboard) {
    return <>{children}</>;
  }

  const bottomInset = isNative
    ? `calc(${playerVisible ? "120px" : "56px"} + env(safe-area-inset-bottom))`
    : undefined;

  return (
    <>
      {isNative ? <AppHeader /> : <Navbar />}
      {!isNative && !isTvPage && (
        <div className="fixed left-0 right-0 z-40" style={{ top: "3.5rem" }}>
          <AdTicker items={adTicker} />
        </div>
      )}
      <main className="flex-1" style={bottomInset ? { paddingBottom: bottomInset } : undefined}>
        {children}
      </main>
      <FloatingCTA />
      <ViewerCaptureModal />
      <RadioMiniPlayer />
      <AppTabBar />
    </>
  );
}

export default function SiteChrome({ children, adTicker }: { children: React.ReactNode; adTicker: AdTickerItem[] }) {
  return (
    <RadioPlayerProvider>
      <SiteChromeInner adTicker={adTicker}>{children}</SiteChromeInner>
    </RadioPlayerProvider>
  );
}
