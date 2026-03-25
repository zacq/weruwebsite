"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const interests = ["News", "Shows", "Business & Ads", "Entertainment", "Sports"];

export default function ViewerCaptureModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", interests: [] as string[] });

  useEffect(() => {
    const alreadySeen = localStorage.getItem("weru_viewer_seen");
    if (alreadySeen) return;

    // Fire once when the headlines ticker scrolls into view
    const target = document.getElementById("headlines");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem("weru_viewer_seen", "1");
  };

  const toggleInterest = (item: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item)
        ? f.interests.filter((i) => i !== item)
        : [...f.interests, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    try {
      await fetch("/api/viewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // fail silently
    }
    setLoading(false);
    setSubmitted(true);
    localStorage.setItem("weru_viewer_seen", "1");
    setTimeout(dismiss, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            style={{ backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm glass-strong rounded-2xl p-6 relative"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <div className="text-center mb-5">
                    <div className="text-3xl mb-2">📺</div>
                    <h3 className="text-white font-extrabold text-lg">Stay Updated with Weru TV</h3>
                    <p className="text-white/55 text-xs mt-1">
                      Get exclusive content, show alerts & news delivered to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="form-input"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="form-input"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      required
                    />

                    <div>
                      <p className="text-white/50 text-xs mb-2">I&apos;m interested in:</p>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((item) => {
                          const active = form.interests.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleInterest(item)}
                              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
                              style={{
                                background: active ? "#f97d00" : "rgba(255,255,255,0.1)",
                                color: "#fff",
                                border: active ? "1px solid #f97d00" : "1px solid rgba(255,255,255,0.15)",
                              }}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="mt-1 w-full py-3 rounded-xl text-white font-bold text-sm"
                      style={{ background: "#f97d00", boxShadow: "0 0 16px rgba(249,125,0,0.4)" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {loading ? "Subscribing..." : "Subscribe — It's Free"}
                    </motion.button>

                    <button
                      type="button"
                      onClick={dismiss}
                      className="text-white/35 text-xs text-center hover:text-white/60 transition-colors"
                    >
                      No thanks
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-white font-extrabold text-lg">You&apos;re In!</h3>
                  <p className="text-white/60 text-sm mt-2">
                    Welcome to the Weru TV family. Stay tuned!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
