"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AdType = "TV" | "Radio" | "Both" | "";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  adType: AdType;
  budget: string;
  message: string;
}

const budgetRanges = [
  "Below KSh 50,000",
  "KSh 50,000 – 150,000",
  "KSh 150,000 – 500,000",
  "KSh 500,000 – 1,000,000",
  "Above KSh 1,000,000",
];

const AD_TYPE_OPTIONS: { value: AdType; label: string; icon: string }[] = [
  { value: "TV",    label: "TV",    icon: "📺" },
  { value: "Radio", label: "Radio", icon: "📻" },
  { value: "Both",  label: "Both",  icon: "🎯" },
];

const empty: FormState = {
  name: "", company: "", phone: "", email: "",
  adType: "", budget: "", message: "",
};

export default function RateCardForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.adType)         e.adType  = "Please select ad type" as AdType;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch("/api/rate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="rate-card"
      className="px-4 py-16"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(249,125,0,0.12)",
              border: "1.5px solid rgba(249,125,0,0.50)",
              color: "#f97d00",
            }}
          >
            📋 Rate Card Enquiry
          </span>
          <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ color: "#111111" }}>
            Book Your Advertising Slot
          </h2>
          <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "#666666" }}>
            Fill in your details and our team will send you a full rate card and availability within 24 hours.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 4px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.04)",
            border: "1.5px solid #EBEBEB",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      className={`form-input-light ${errors.name ? "error" : ""}`}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-[#f97d00] text-[11px] mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="form-input-light"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className={`form-input ${errors.phone ? "error" : ""}`}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-[#f97d00] text-[11px] mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-[#f97d00] text-[11px] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Ad type selector */}
                <div>
                  <p className="text-xs mb-2 font-semibold" style={{ color: "#555555" }}>Type of Ad *</p>
                  <div className="flex gap-3">
                    {AD_TYPE_OPTIONS.map((opt) => {
                      const active = form.adType === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => set("adType", opt.value)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                          style={{
                            background: active ? "#f97d00" : "#F5F5F5",
                            border: `1.5px solid ${active ? "#f97d00" : "#DDDDDD"}`,
                            color: active ? "#fff" : "#333333",
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {opt.icon} {opt.label}
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.adType && (
                    <p className="text-[#f97d00] text-[11px] mt-1">{errors.adType}</p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <select
                    className="form-input-light"
                    value={form.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Budget Range (optional)</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder="Tell us about your campaign goals... (optional)"
                    className="form-input resize-none"
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-extrabold text-base mt-1"
                  style={{
                    background: loading ? "rgba(249,125,0,0.6)" : "#f97d00",
                    boxShadow: "0 0 24px rgba(249,125,0,0.4)",
                  }}
                  whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 36px rgba(249,125,0,0.6)" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? "Sending Enquiry..." : "📋 Request Rate Card"}
                </motion.button>

                <p className="text-[11px] text-center" style={{ color: "#AAAAAA" }}>
                  We respond within 24 hours · No spam · Your data is safe
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-extrabold text-2xl mb-2" style={{ color: "#111111" }}>Enquiry Received!</h3>
                <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "#666666" }}>
                  Thank you <strong style={{ color: "#f97d00" }}>{form.name}</strong>! Our advertising team
                  will send your rate card and get in touch within 24 hours.
                </p>
                <motion.a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl text-white font-bold text-sm"
                  style={{ background: "#25D366" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 Chat on WhatsApp
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
