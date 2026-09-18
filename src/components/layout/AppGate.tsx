"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

/**
 * Swaps between the real, SSR'd web content and an app-specific layout once
 * running inside the Capacitor shell. Defaults to web content so browser
 * visitors get correct markup with no client-side gating delay — only
 * swaps to `appContent` after confirming native, which means a brief flash
 * of web content on app launch is possible but never a regression for the
 * public site.
 */
export default function AppGate({ appContent, webContent }: { appContent: React.ReactNode; webContent: React.ReactNode }) {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  return isNative ? <>{appContent}</> : <>{webContent}</>;
}
