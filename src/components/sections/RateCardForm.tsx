"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "TV" | "Radio";

interface Package {
  id: string;
  name: string;
  desc: string;
  freq: string;
  obituary: boolean;
  icon: string;
}

const TV_PACKAGES: Package[] = [
  { id: "tv-prime",     name: "Prime Time Package",   desc: "8 ad spots per day across prime time slots",             freq: "Weekly",                  obituary: false, icon: "📺" },
  { id: "tv-sponsor",   name: "Sponsorship",          desc: "Next On, Up Next & Info Board branded mentions",         freq: "Weekly · High Frequency",   obituary: false, icon: "🎙️" },
  { id: "tv-clock",     name: "Clock Sponsorship",    desc: "3 branded clock spots per day",                          freq: "Weekly",                  obituary: false, icon: "🕐" },
  { id: "tv-live-cov",  name: "Live Coverage",        desc: "Full location live broadcast — 1st hour + additional",   freq: "Per event",               obituary: false, icon: "🎬" },
  { id: "tv-interview", name: "Live Interview",       desc: "30-minute prime time studio interview",                  freq: "Per session",             obituary: false, icon: "🎤" },
  { id: "tv-squeeze",   name: "Squeeze Backs",        desc: "On-screen squeeze backs during prime shows, 5 spots/day",freq: "Weekly",                  obituary: false, icon: "📐" },
  { id: "tv-digital",   name: "Digital Spaces",       desc: "Branded posts on Facebook & TikTok",                    freq: "Per post",                obituary: false, icon: "📱" },
  { id: "tv-obituary",  name: "Obituary Placement",   desc: "6 on-screen placements per day. Correction fee applies.", freq: "Per day",               obituary: true,  icon: "🕊️" },
];

const RADIO_PACKAGES: Package[] = [
  { id: "radio-pkg",       name: "Full Advertising Package", desc: "3 mentions/day · 6 ad spots & 3 promos",             freq: "Weekly",                  obituary: false, icon: "📻" },
  { id: "radio-sponsor",   name: "Sponsorship",              desc: "Time checks and branded sponsor mentions",            freq: "Weekly · High Frequency",   obituary: false, icon: "🎙️" },
  { id: "radio-classif",   name: "Classifieds (1 min)",      desc: "4 spots per day — ideal for property & job listings", freq: "Per week",                obituary: false, icon: "📋" },
  { id: "radio-interview", name: "Live Interview",           desc: "30-minute prime time interview on Weru FM 96.4",     freq: "Per session",             obituary: false, icon: "🎤" },
  { id: "radio-digital",   name: "Digital Spaces",           desc: "Branded posts on Facebook & TikTok",                freq: "Per post",                obituary: false, icon: "📱" },
];

interface FormState {
  name: string;
  phone: string;
  businessName: string;
  email: string;
  message: string;
}

const emptyForm: FormState = { name: "", phone: "", businessName: "", email: "", message: "" };

function PackageCard({
  pkg,
  selected,
  onToggle,
}: {
  pkg: Package;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        textAlign: "left",
        padding: "16px",
        borderRadius: "16px",
        background: selected ? "rgba(249,125,0,0.08)" : "rgba(255,255,255,0.04)",
        border: selected
          ? "1.5px solid #f97d00"
          : "1.5px solid rgba(255,255,255,0.10)",
        boxShadow: selected
          ? "0 0 0 1px rgba(249,125,0,0.15), 0 0 20px rgba(249,125,0,0.12)"
          : "none",
        cursor: "pointer",
        position: "relative",
        width: "100%",
        transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
      }}
    >
      {/* Checkmark */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#f97d00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#fff",
              fontWeight: 900,
            }}
          >
            ✓
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ fontSize: 22, marginBottom: 8 }}>{pkg.icon}</div>
      <p
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: "14px",
          color: selected ? "#f97d00" : "#fff",
          marginBottom: 4,
          paddingRight: selected ? 28 : 0,
          transition: "color 0.18s",
        }}
      >
        {pkg.name}
      </p>
      <p style={{ fontSize: "12px", color: "rgba(244,241,236,0.55)", lineHeight: 1.5, marginBottom: 10 }}>
        {pkg.desc}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            color: "rgba(244,241,236,0.38)",
          }}
        >
          {pkg.freq}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(249,125,0,0.55)",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          🔒 Price on request
        </span>
      </div>
    </motion.button>
  );
}

export default function RateCardForm() {
  const [tab, setTab] = useState<Tab>("TV");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const packages = tab === "TV" ? TV_PACKAGES : RADIO_PACKAGES;

  const needsBusiness =
    selected.size === 0 ||
    [...selected].some((id) => packages.find((p) => p.id === id)?.obituary === false);

  const switchTab = (t: Tab) => {
    setTab(t);
    setSelected(new Set());
    setErrors({});
  };

  const togglePackage = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.phone.trim()) e.phone = "WhatsApp number is required";
    if (needsBusiness && !form.businessName.trim())
      e.businessName = "Business name is required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    const packageNames = [...selected]
      .map((id) => packages.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    try {
      await fetch("/api/rate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          adType: tab,
          company: form.businessName,
          packages: packageNames,
          message: form.message,
        }),
      });
    } catch { /* fail silently */ }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="rate-card"
      className="px-4 py-16 sm:py-20"
      style={{ background: "#0D1117" }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-10 sm:mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <p
          className="text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ color: "#f97d00" }}
        >
          ADVERTISING PACKAGES
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
          Grow Your Brand{" "}
          <span className="font-headline italic" style={{ color: "#f97d00" }}>
            on Air
          </span>
        </h2>
        <p className="text-sm sm:text-base mt-3 max-w-lg mx-auto" style={{ color: "rgba(244,241,236,0.50)" }}>
          Browse our packages, select what interests you, and we&apos;ll WhatsApp you the pricing directly.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              {/* ── LEFT: Package browser ── */}
              <div className="w-full md:flex-1">
                {/* Tab strip */}
                <div
                  style={{
                    display: "inline-flex",
                    gap: 4,
                    background: "rgba(255,255,255,0.06)",
                    padding: 4,
                    borderRadius: 14,
                    marginBottom: 20,
                    width: "100%",
                  }}
                >
                  {(["TV", "Radio"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => switchTab(t)}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        borderRadius: 10,
                        border: "none",
                        fontWeight: 800,
                        fontSize: "14px",
                        letterSpacing: "0.3px",
                        cursor: "pointer",
                        background: tab === t ? "#f97d00" : "transparent",
                        color: tab === t ? "#fff" : "rgba(244,241,236,0.50)",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {t === "TV" ? "📺 Weru TV" : "📻 Weru FM 96.4"}
                    </button>
                  ))}
                </div>

                {/* Package cards grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {packages.map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        selected={selected.has(pkg.id)}
                        onToggle={() => togglePackage(pkg.id)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {selected.size > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      marginTop: 12,
                      fontSize: "12px",
                      color: "rgba(249,125,0,0.70)",
                      fontStyle: "italic",
                    }}
                  >
                    {selected.size} package{selected.size > 1 ? "s" : ""} selected — fill the form to get pricing
                  </motion.p>
                )}
              </div>

              {/* ── RIGHT: Enquiry form ── */}
              <div className="w-full md:w-[360px] md:flex-shrink-0 md:sticky md:top-24">
                <div
                  style={{
                    borderRadius: 24,
                    padding: "28px 24px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      "0 4px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                >
                  <p
                    className="font-display font-extrabold text-xl text-white mb-1"
                  >
                    Get Pricing
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(244,241,236,0.45)", marginBottom: 20 }}>
                    Our team will reply on WhatsApp
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Contact name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        className={`form-input ${errors.name ? "error" : ""}`}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                      />
                      {errors.name && (
                        <p style={{ color: "#f97d00", fontSize: 11, marginTop: 4 }}>{errors.name}</p>
                      )}
                    </div>

                    {/* WhatsApp phone */}
                    <div>
                      <input
                        type="tel"
                        placeholder="WhatsApp Number *"
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                      {errors.phone && (
                        <p style={{ color: "#f97d00", fontSize: 11, marginTop: 4 }}>{errors.phone}</p>
                      )}
                    </div>

                    {/* Business name — required unless obituary-only */}
                    <div>
                      <input
                        type="text"
                        placeholder={
                          needsBusiness
                            ? "Business / Company Name *"
                            : "Business Name (optional)"
                        }
                        className={`form-input ${errors.businessName ? "error" : ""}`}
                        value={form.businessName}
                        onChange={(e) => set("businessName", e.target.value)}
                      />
                      {errors.businessName && (
                        <p style={{ color: "#f97d00", fontSize: 11, marginTop: 4 }}>
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    {/* Email — optional */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address (optional)"
                        className={`form-input ${errors.email ? "error" : ""}`}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                      {errors.email && (
                        <p style={{ color: "#f97d00", fontSize: 11, marginTop: 4 }}>{errors.email}</p>
                      )}
                    </div>

                    {/* Message — optional */}
                    <div>
                      <textarea
                        placeholder="Campaign details or questions... (optional)"
                        className="form-input resize-none"
                        rows={3}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: 14,
                        border: "none",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: "#fff",
                        cursor: loading ? "not-allowed" : "pointer",
                        background: loading ? "rgba(249,125,0,0.55)" : "#f97d00",
                        boxShadow: "0 0 24px rgba(249,125,0,0.35)",
                        marginTop: 4,
                      }}
                      whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 36px rgba(249,125,0,0.55)" } : {}}
                      whileTap={!loading ? { scale: 0.97 } : {}}
                    >
                      {loading ? "Sending..." : "Get Pricing →"}
                    </motion.button>

                    <p
                      style={{
                        fontSize: 11,
                        textAlign: "center",
                        color: "rgba(244,241,236,0.30)",
                      }}
                    >
                      Prices shared via WhatsApp · No spam
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Success state ── */
            <motion.div
              key="success"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(249,125,0,0.12)",
                  border: "2px solid rgba(249,125,0,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  margin: "0 auto 20px",
                }}
              >
                ✓
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-3 text-white">
                Enquiry Received!
              </h3>
              <p className="text-sm sm:text-base max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(244,241,236,0.55)" }}>
                Thank you{" "}
                <strong style={{ color: "#f97d00" }}>{form.name}</strong>! Our team will
                WhatsApp you the pricing details shortly.
              </p>
              <motion.a
                href="https://wa.me/254793004303?text=Hi%2C%20I%20just%20submitted%20a%20rate%20card%20enquiry%20on%20your%20website"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 24,
                  padding: "12px 24px",
                  borderRadius: 14,
                  background: "#25D366",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Chat on WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
