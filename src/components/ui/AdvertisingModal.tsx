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

const AD_TYPE_OPTIONS: { value: AdType; label: string }[] = [
  { value: "TV", label: "TV" },
  { value: "Radio", label: "Radio" },
  { value: "Both", label: "Both" },
];

const empty: FormState = {
  name: "", company: "", phone: "", email: "",
  adType: "", budget: "", message: "",
};

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export default function AdvertisingModal({ isOpen, title, onClose }: Props) {
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
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.adType)       e.adType = "Please select ad type" as AdType;
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

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => { setForm(empty); setErrors({}); setSubmitted(false); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            style={{ backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="glass-strong w-full max-w-lg rounded-none md:rounded-2xl overflow-y-auto fixed inset-0 md:inset-auto md:relative md:max-h-[90dvh]"
              style={{
                background: "#161616",
              }}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <span
                    className="text-[10px] font-extrabold tracking-widest uppercase"
                    style={{ color: "#f97d00" }}
                  >
                    Weru Digital
                  </span>
                  <h2 className="text-white font-extrabold text-lg mt-0.5">{title}</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name + Company */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name *"
                            className={`form-input ${errors.name ? "error" : ""}`}
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                          />
                          {errors.name && <p className="text-[#f97d00] text-[11px] mt-1">{errors.name}</p>}
                        </div>
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="form-input"
                          value={form.company}
                          onChange={(e) => set("company", e.target.value)}
                        />
                      </div>

                      {/* Phone + Email */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            className={`form-input ${errors.phone ? "error" : ""}`}
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                          />
                          {errors.phone && <p className="text-[#f97d00] text-[11px] mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address *"
                            className={`form-input ${errors.email ? "error" : ""}`}
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                          />
                          {errors.email && <p className="text-[#f97d00] text-[11px] mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Ad type */}
                      <div>
                        <p className="text-white/50 text-xs mb-2 font-semibold">Type of Ad *</p>
                        <div className="flex gap-2">
                          {AD_TYPE_OPTIONS.map((opt) => {
                            const active = form.adType === opt.value;
                            return (
                              <motion.button
                                key={opt.value}
                                type="button"
                                onClick={() => set("adType", opt.value)}
                                className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                                style={{
                                  background: active ? "#f97d00" : "rgba(249,125,0,0.08)",
                                  border: "1.5px solid rgba(249,125,0,0.40)",
                                  color: active ? "#fff" : "rgba(249,125,0,0.80)",
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                {opt.label}
                              </motion.button>
                            );
                          })}
                        </div>
                        {errors.adType && <p className="text-[#f97d00] text-[11px] mt-1">{errors.adType}</p>}
                      </div>

                      {/* Budget */}
                      <select
                        className="form-input"
                        value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}
                      >
                        <option value="">Budget Range (optional)</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>

                      {/* Message */}
                      <textarea
                        placeholder="Tell us about your campaign goals... (optional)"
                        className="form-input resize-none"
                        rows={3}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                      />

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm mt-1"
                        style={{
                          background: loading ? "rgba(249,125,0,0.55)" : "#f97d00",
                          boxShadow: loading ? "none" : "0 0 20px rgba(249,125,0,0.35)",
                        }}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        {loading ? "Sending..." : title}
                      </motion.button>

                      <p className="text-white/25 text-[11px] text-center">
                        We respond within 24 hours · Your details are safe
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="text-center py-10"
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="text-white font-extrabold text-xl mb-2">Enquiry Received!</h3>
                      <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
                        Thank you <strong style={{ color: "#f97d00" }}>{form.name}</strong>! Our team will be in touch within 24 hours.
                      </p>
                      <motion.a
                        href="https://wa.me/254700000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-white font-bold text-sm"
                        style={{ background: "#25D366" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        💬 Chat on WhatsApp
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
