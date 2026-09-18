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
import { RadioPlayerProvider, useRadioPlayer } from "@/context/RadioPlayerContext";

function SiteChromeInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
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

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <RadioPlayerProvider>
      <SiteChromeInner>{children}</SiteChromeInner>
    </RadioPlayerProvider>
  );
}
