"use client";

import { useState } from "react";

export function LeadCaptureForm({ show }: { show: string }) {
  const [formData, setFormData]     = useState({ name: "", phone: "" });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/viewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, phone: formData.phone, interests: [show] }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div
          className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center text-xl font-bold"
          style={{
            background: "rgba(249,125,0,0.10)",
            border: "1px solid rgba(249,125,0,0.28)",
            color: "#f97d00",
          }}
        >
          ✓
        </div>
        <p className="text-white font-extrabold text-xl mb-2 tracking-tight">
          You&rsquo;re on the list
        </p>
        <p className="text-white/45 text-sm leading-relaxed">
          We&rsquo;ll reach you before{" "}
          <span style={{ color: "#f97d00" }}>{show}</span> airs with what&rsquo;s coming up next.
        </p>
      </div>
    );
  }

  return (
    <>
      <span
        className="inline-block text-[9px] font-extrabold tracking-widest uppercase mb-3 px-2.5 py-1 rounded-md"
        style={{
          background: "rgba(249,125,0,0.10)",
          border: "1px solid rgba(249,125,0,0.22)",
          color: "#f97d00",
        }}
      >
        {show}
      </span>

      <h2 className="text-white text-lg font-extrabold mb-1.5 leading-tight tracking-tight">
        Know what&rsquo;s airing before anyone else
      </h2>

      <p className="text-white/42 text-sm mb-5 leading-relaxed">
        Drop your name and number — we&rsquo;ll send show updates, guest previews, and
        behind-the-scenes news before each episode.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="p-name"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Your name
          </label>
          <input
            id="p-name"
            type="text"
            required
            placeholder="Jane Muthoni"
            value={formData.name}
            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
            className="form-input w-full"
            style={{ minHeight: "44px" }}
          />
        </div>

        <div>
          <label
            htmlFor="p-phone"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Phone number
          </label>
          <input
            id="p-phone"
            type="tel"
            required
            placeholder="07XX XXX XXX"
            value={formData.phone}
            onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
            className="form-input w-full"
            style={{ minHeight: "44px" }}
          />
        </div>

        {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="presenter-submit-btn w-full rounded-xl text-white text-sm font-extrabold disabled:opacity-50"
          style={{
            background: "#f97d00",
            minHeight: "46px",
            boxShadow: "0 4px 22px rgba(249,125,0,0.32)",
          }}
        >
          {submitting ? "Sending…" : "Get show updates before they air"}
        </button>

        <p className="text-white/20 text-xs text-center">
          No spam. Updates about {show} only.
        </p>
      </form>
    </>
  );
}
