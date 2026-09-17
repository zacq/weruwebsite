"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import Navbar from "./Navbar";
import AppTabBar from "./AppTabBar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ViewerCaptureModal from "@/components/ui/ViewerCaptureModal";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1" style={isNative ? { paddingBottom: "calc(56px + env(safe-area-inset-bottom))" } : undefined}>
        {children}
      </main>
      <FloatingCTA />
      <ViewerCaptureModal />
      <AppTabBar />
    </>
  );
}
