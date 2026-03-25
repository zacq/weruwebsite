"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#rate-card"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-4 z-50 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-white font-bold text-sm shadow-2xl"
          style={{
            background: "#f97d00",
            boxShadow: "0 0 28px rgba(249,125,0,0.55), 0 6px 20px rgba(0,0,0,0.4)",
            marginBottom: "env(safe-area-inset-bottom, 0px)",
          }}
          whileHover={{ scale: 1.07, boxShadow: "0 0 40px rgba(249,125,0,0.7), 0 6px 24px rgba(0,0,0,0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base">📢</span>
          <span>Advertise With Us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
