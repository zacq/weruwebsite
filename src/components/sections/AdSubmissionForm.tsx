"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Constants ─────────────────────────────────────────────────────── */

const DURATIONS = [15, 30, 45, 60, 90] as const;

const TIME_SLOTS = [
  "No Preference",
  "Morning (6AM – 10AM)",
  "Midday (10AM – 2PM)",
  "Afternoon (2PM – 6PM)",
  "Prime Time (6PM – 10PM)",
  "Late Night (10PM – 1AM)",
] as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const TV_SPECS = [
  ["Format",      "MP4 (H.264 codec) — preferred; MOV/AVI accepted"],
  ["Resolution",  "1920 × 1080 (Full HD) minimum; 4K accepted"],
  ["Frame rate",  "25 fps (PAL broadcast standard)"],
  ["Aspect ratio","16:9"],
  ["Audio",       "Stereo, 48 kHz, –23 LUFS integrated, –1 dBFS peak"],
  ["Action safe", "90% of frame (54px from each edge on 1080p)"],
  ["Title safe",  "80% of frame — keep all text and logos inside this zone"],
  ["Deadline",    "Materials submitted 48 hours before first air date"],
];

const RADIO_SPECS = [
  ["Format",    "WAV (preferred) or MP3 at 320 kbps minimum"],
  ["Codec",     "PCM 16-bit (WAV) or MP3 CBR"],
  ["Sample rate","44.1 kHz or 48 kHz"],
  ["Channels",  "Stereo or Mono — both accepted"],
  ["Loudness",  "–23 LUFS integrated, –1 dBFS true peak"],
  ["Durations", "15s / 30s / 45s / 60s / 90s"],
  ["Language",  "Kikuyu, Kiswahili, or English — specify in instructions"],
  ["Deadline",  "Materials submitted 24 hours before first air time"],
];

const TC_CLAUSES = [
  ["1. Advertiser Representations",
   "The advertiser warrants that all submitted ad materials comply with the Kenya Communications (Broadcasting) Regulations 2009 and any applicable laws administered by the Communications Authority of Kenya (CA). The advertiser confirms the ad does not contain misleading, indecent, or prohibited content."],
  ["2. Submission Deadlines",
   "TV ad materials must be submitted at least 48 hours before the first scheduled air date. Radio materials at least 24 hours in advance. Weru Digital reserves the right to reject materials that do not meet technical specifications or content standards."],
  ["3. Content Approval",
   "All ad content is subject to review and approval by Weru Digital's Traffic & Compliance department. Weru Digital may decline, suspend, or withdraw any advertisement that is misleading, offensive, or in violation of KCA regulations or Weru Digital's editorial policies."],
  ["4. Correction Fee",
   "A correction/revision fee of KES 3,000 per amendment applies to approved materials that require re-editing, re-scheduling, or re-transmission due to errors originating from the advertiser."],
  ["5. Scheduling",
   "Air times and program slots are allocated at the sole discretion of Weru Digital's scheduling department. Preferred time slots are noted, but specific placement is subject to availability and cannot be guaranteed."],
  ["6. Payment Terms",
   "Payment must be received in full before the first air date unless a credit agreement is in place. Weru Digital accepts M-Pesa, bank transfer, and cheque. All rates are exclusive of VAT (16%)."],
  ["7. Cancellation Policy",
   "Cancellations more than 72 hours before campaign start: full credit. Within 72 hours: 50% charge. After campaign commencement: no refund."],
  ["8. Intellectual Property",
   "The advertiser grants Weru Digital a non-exclusive licence to broadcast the submitted materials in accordance with the confirmed booking. The advertiser retains ownership of all creative assets."],
  ["9. Liability",
   "Weru Digital's liability is limited to the value of the booked airtime. Weru Digital is not liable for indirect, consequential, or reputational damages arising from the broadcast."],
  ["10. Data Privacy",
   "Contact information submitted through this form is used solely to process the advertising booking. It will not be sold or shared with third parties. Submissions are retained for 24 months. Refer to Weru Digital's Privacy Policy for full details."],
  ["11. Governing Law",
   "These terms are governed by the laws of Kenya. Disputes shall be resolved through arbitration under the Nairobi Centre for International Arbitration (NCIA) rules."],
];

/* ── Types ─────────────────────────────────────────────────────────── */

type AdType = "TV" | "Radio" | "Both" | "";

interface FormState {
  contactName:     string;
  company:         string;
  phone:           string;
  email:           string;
  adType:          AdType;
  videoAdLink:     string;
  documentsLink:   string;
  adDurationIndex: number;
  flightStartDate: string;
  flightEndDate:   string;
  timeSlotPref:    string;
  daysOfWeek:      string[];
  instructions:    string;
  termsAccepted:   boolean;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  contactName:     "",
  company:         "",
  phone:           "",
  email:           "",
  adType:          "",
  videoAdLink:     "",
  documentsLink:   "",
  adDurationIndex: 1,
  flightStartDate: "",
  flightEndDate:   "",
  timeSlotPref:    "No Preference",
  daysOfWeek:      [],
  instructions:    "",
  termsAccepted:   false,
};

const today = new Date().toISOString().split("T")[0];

/* ── Validation ─────────────────────────────────────────────────────── */

function validate(form: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!form.contactName.trim())   e.contactName   = "Name is required";
  if (!form.phone.trim())         e.phone         = "Phone number is required";
  if (!form.email.trim())         e.email         = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
  if (!form.adType)               e.adType        = "Please select TV, Radio, or Both";
  if (!form.flightStartDate)      e.flightStartDate = "Start date is required";
  if (!form.flightEndDate)        e.flightEndDate   = "End date is required";
  if (form.flightStartDate && form.flightEndDate &&
      form.flightEndDate < form.flightStartDate)
    e.flightEndDate = "End date must be after start date";
  if (form.daysOfWeek.length === 0) e.daysOfWeek  = "Select at least one day";
  if (!form.termsAccepted)        e.termsAccepted = "You must accept the terms to proceed";
  return e;
}

/* ── Sub-components ─────────────────────────────────────────────────── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 3, height: 20, borderRadius: 2, background: "#f97d00", flexShrink: 0 }} />
      <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(244,241,236,0.50)", margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ color: "#C8102E", fontSize: 11, marginTop: 4 }}>{msg}</p>;
}

/* ── Main component ─────────────────────────────────────────────────── */

export default function AdSubmissionForm() {
  const [form, setForm]       = useState<FormState>(initialForm);
  const [errors, setErrors]   = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reqTab, setReqTab]   = useState<"TV" | "Radio">("TV");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
  }

  function toggleDay(day: string) {
    setErrors(e => ({ ...e, daysOfWeek: undefined }));
    setForm(f => {
      if (day === "All Week") {
        const allSelected = f.daysOfWeek.includes("All Week");
        return { ...f, daysOfWeek: allSelected ? [] : [...DAYS, "All Week"] };
      }
      const without = f.daysOfWeek.filter(d => d !== "All Week");
      if (without.includes(day)) {
        return { ...f, daysOfWeek: without.filter(d => d !== day) };
      }
      const updated = [...without, day];
      return { ...f, daysOfWeek: updated.length === 7 ? [...DAYS, "All Week"] : updated };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstErrKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/ad-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          daysOfWeek: form.daysOfWeek.filter(d => d !== "All Week"),
        }),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  }

  const cardStyle = {
    borderRadius: 20,
    padding: "24px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    marginBottom: 20,
  };

  const toggleBtn = (active: boolean) => ({
    flex: 1,
    padding: "10px 6px",
    borderRadius: 10,
    border: `1.5px solid ${active ? "#f97d00" : "rgba(255,255,255,0.14)"}`,
    background: active ? "rgba(249,125,0,0.12)" : "transparent",
    color: active ? "#f97d00" : "rgba(244,241,236,0.50)",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.18s",
  } as React.CSSProperties);

  return (
    <section style={{ background: "#0D1117", minHeight: "100dvh" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(249,125,0,0.10) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "60px 16px 40px",
          textAlign: "center",
        }}
      >
        <a
          href="/"
          style={{ fontSize: 12, color: "rgba(244,241,236,0.40)", textDecoration: "none", display: "inline-block", marginBottom: 20 }}
        >
          ← Back to Weru Digital
        </a>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#f97d00", marginBottom: 12 }}>
          AD SUBMISSION PORTAL
        </p>
        <h1
          className="font-display"
          style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", color: "#fff", lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.5px" }}
        >
          Submit Your{" "}
          <span className="font-headline" style={{ color: "#f97d00", fontStyle: "italic" }}>
            Advertisement
          </span>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(244,241,236,0.55)", maxWidth: 480, margin: "0 auto" }}>
          Review the technical requirements, fill in your booking details, and our team will confirm within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start"
            >
              {/* ═══ LEFT: form ═══ */}
              <form onSubmit={handleSubmit} noValidate>

                {/* ── Ad Requirements ── */}
                <div style={{ ...cardStyle, marginBottom: 20 }}>
                  <SectionLabel label="Ad Specifications" />
                  {/* Tab strip */}
                  <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", padding: 4, borderRadius: 12, marginBottom: 16 }}>
                    {(["TV", "Radio"] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setReqTab(t)}
                        style={{
                          flex: 1, padding: "8px 0", borderRadius: 8, border: "none",
                          fontWeight: 800, fontSize: 13, cursor: "pointer",
                          background: reqTab === t ? "#f97d00" : "transparent",
                          color: reqTab === t ? "#fff" : "rgba(244,241,236,0.45)",
                          transition: "all 0.18s",
                        }}
                      >
                        {t === "TV" ? "📺 Weru TV" : "📻 Weru FM 96.4"}
                      </button>
                    ))}
                  </div>
                  {/* Spec rows */}
                  <AnimatePresence mode="wait">
                    <motion.dl
                      key={reqTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ margin: 0 }}
                    >
                      {(reqTab === "TV" ? TV_SPECS : RADIO_SPECS).map(([label, val]) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            gap: 12,
                            padding: "9px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            alignItems: "flex-start",
                          }}
                        >
                          <dt style={{ fontSize: 11, fontWeight: 800, color: "rgba(249,125,0,0.80)", width: 100, flexShrink: 0, lineHeight: 1.4 }}>{label}</dt>
                          <dd style={{ fontSize: 12, color: "rgba(244,241,236,0.65)", lineHeight: 1.5, margin: 0 }}>{val}</dd>
                        </div>
                      ))}
                    </motion.dl>
                  </AnimatePresence>
                </div>

                {/* ── Advertiser Details ── */}
                <div id="field-contactName" style={cardStyle}>
                  <SectionLabel label="Your Details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Contact Name *"
                        className={`form-input ${errors.contactName ? "error" : ""}`}
                        value={form.contactName}
                        onChange={e => set("contactName", e.target.value)}
                      />
                      <FieldError msg={errors.contactName} />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company / Business Name"
                        className="form-input"
                        value={form.company}
                        onChange={e => set("company", e.target.value)}
                      />
                    </div>
                    <div id="field-phone">
                      <input
                        type="tel"
                        placeholder="WhatsApp Number *"
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                    <div id="field-email">
                      <input
                        type="email"
                        placeholder="Email Address *"
                        className={`form-input ${errors.email ? "error" : ""}`}
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>
                </div>

                {/* ── Ad Type ── */}
                <div id="field-adType" style={cardStyle}>
                  <SectionLabel label="Ad Type" />
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["TV", "Radio", "Both"] as AdType[]).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("adType", t)}
                        style={toggleBtn(form.adType === t)}
                      >
                        {t === "TV" ? "📺 TV" : t === "Radio" ? "📻 Radio" : "🎯 Both"}
                      </button>
                    ))}
                  </div>
                  <FieldError msg={errors.adType} />
                </div>

                {/* ── Ad Materials ── */}
                <div style={cardStyle}>
                  <SectionLabel label="Ad Materials" />
                  <p style={{ fontSize: 12, color: "rgba(244,241,236,0.45)", marginBottom: 16, lineHeight: 1.6 }}>
                    Upload your files to Google Drive, Dropbox, or WeTransfer and paste the share link below.
                    Make sure sharing is set to <strong style={{ color: "rgba(244,241,236,0.70)" }}>&quot;Anyone with the link&quot;</strong>.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 6, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        Video Ad Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/…"
                        className="form-input"
                        value={form.videoAdLink}
                        onChange={e => set("videoAdLink", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 6, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        Documents Link
                        <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 6 }}>
                          (script, brief, storyboard)
                        </span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/…"
                        className="form-input"
                        value={form.documentsLink}
                        onChange={e => set("documentsLink", e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "rgba(37,211,102,0.07)",
                        border: "1px solid rgba(37,211,102,0.20)",
                        fontSize: 12,
                        color: "rgba(244,241,236,0.60)",
                        lineHeight: 1.5,
                      }}
                    >
                      💬 Don&apos;t have cloud storage?{" "}
                      <a
                        href="https://wa.me/254793004303?text=Hi%2C%20I%27d%20like%20to%20send%20my%20ad%20materials"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#25D366", fontWeight: 700 }}
                      >
                        Send via WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── Duration Slider ── */}
                <div style={cardStyle}>
                  <SectionLabel label="Ad Duration" />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <p style={{ fontSize: 14, color: "rgba(244,241,236,0.55)", margin: 0 }}>Select your ad length</p>
                    <span
                      className="font-display"
                      style={{ fontWeight: 900, fontSize: 26, color: "#f97d00", letterSpacing: "-0.5px", lineHeight: 1 }}
                    >
                      {DURATIONS[form.adDurationIndex]}
                      <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 4 }}>sec</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={1}
                    value={form.adDurationIndex}
                    onChange={e => set("adDurationIndex", Number(e.target.value))}
                    className="ad-duration-slider"
                    style={{
                      background: `linear-gradient(to right, #f97d00 0%, #f97d00 ${(form.adDurationIndex / 4) * 100}%, rgba(255,255,255,0.14) ${(form.adDurationIndex / 4) * 100}%, rgba(255,255,255,0.14) 100%)`,
                    }}
                    aria-label="Ad duration"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingInline: 2 }}>
                    {DURATIONS.map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set("adDurationIndex", i)}
                        style={{
                          border: "none", cursor: "pointer",
                          fontSize: 11, fontWeight: 800, padding: "4px 6px",
                          borderRadius: 6,
                          color: form.adDurationIndex === i ? "#f97d00" : "rgba(244,241,236,0.30)",
                          background: form.adDurationIndex === i ? "rgba(249,125,0,0.10)" : "transparent",
                          transition: "color 0.18s, background 0.18s",
                        } as React.CSSProperties}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Scheduling ── */}
                <div style={cardStyle}>
                  <SectionLabel label="Campaign Schedule" />

                  {/* Date range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div id="field-flightStartDate">
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 6, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        Campaign Start Date *
                      </label>
                      <input
                        type="date"
                        className={`form-input ${errors.flightStartDate ? "error" : ""}`}
                        min={today}
                        value={form.flightStartDate}
                        onChange={e => set("flightStartDate", e.target.value)}
                        style={{ colorScheme: "dark" }}
                      />
                      <FieldError msg={errors.flightStartDate} />
                    </div>
                    <div id="field-flightEndDate">
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 6, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                        Campaign End Date *
                      </label>
                      <input
                        type="date"
                        className={`form-input ${errors.flightEndDate ? "error" : ""}`}
                        min={form.flightStartDate || today}
                        value={form.flightEndDate}
                        onChange={e => set("flightEndDate", e.target.value)}
                        style={{ colorScheme: "dark" }}
                      />
                      <FieldError msg={errors.flightEndDate} />
                    </div>
                  </div>

                  {/* Time slot */}
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 10, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                    Preferred Time Slot
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
                    {TIME_SLOTS.map(slot => {
                      const active = form.timeSlotPref === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => set("timeSlotPref", slot)}
                          style={{
                            padding: "8px 14px",
                            borderRadius: 999,
                            border: `1.5px solid ${active ? "#f97d00" : "rgba(255,255,255,0.14)"}`,
                            background: active ? "rgba(249,125,0,0.12)" : "transparent",
                            color: active ? "#f97d00" : "rgba(244,241,236,0.50)",
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: "pointer",
                            transition: "all 0.16s",
                            minHeight: 36,
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Days of week */}
                  <div id="field-daysOfWeek">
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(244,241,236,0.40)", display: "block", marginBottom: 10, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                      Days of Week *
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                      {([...DAYS, "All Week"] as string[]).map(day => {
                        const active = form.daysOfWeek.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            style={{
                              padding: "10px 4px",
                              borderRadius: 10,
                              border: `1.5px solid ${active ? "#f97d00" : "rgba(255,255,255,0.12)"}`,
                              background: active ? "rgba(249,125,0,0.12)" : "rgba(255,255,255,0.03)",
                              color: active ? "#f97d00" : "rgba(244,241,236,0.45)",
                              fontWeight: 800,
                              fontSize: 12,
                              cursor: "pointer",
                              transition: "all 0.16s",
                              minHeight: 42,
                              gridColumn: day === "All Week" ? "span 1" : undefined,
                            }}
                          >
                            {day === "All Week" ? "All" : day}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError msg={errors.daysOfWeek} />
                  </div>
                </div>

                {/* ── Additional Instructions ── */}
                <div style={cardStyle}>
                  <SectionLabel label="Additional Instructions" />
                  <textarea
                    placeholder="Target audience, key messages, special requirements, branding notes... (optional)"
                    className="form-input resize-none"
                    rows={4}
                    value={form.instructions}
                    onChange={e => set("instructions", e.target.value)}
                  />
                </div>

                {/* ── Terms & Conditions ── */}
                <div id="field-termsAccepted" style={cardStyle}>
                  <SectionLabel label="Terms & Conditions" />
                  <div
                    className="no-scrollbar"
                    style={{
                      maxHeight: 240,
                      overflowY: "auto",
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "16px",
                      marginBottom: 16,
                    }}
                  >
                    {TC_CLAUSES.map(([title, body]) => (
                      <div key={title} style={{ marginBottom: 14 }}>
                        <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(244,241,236,0.70)", marginBottom: 4 }}>{title}</p>
                        <p style={{ fontSize: 12, color: "rgba(244,241,236,0.45)", lineHeight: 1.6, margin: 0 }}>{body}</p>
                      </div>
                    ))}
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={e => set("termsAccepted", e.target.checked)}
                      style={{
                        width: 18, height: 18, flexShrink: 0, marginTop: 2,
                        accentColor: "#f97d00", cursor: "pointer",
                      }}
                    />
                    <span style={{ fontSize: 13, color: "rgba(244,241,236,0.65)", lineHeight: 1.5 }}>
                      I have read and agree to Weru Digital&apos;s Ad Submission Terms &amp; Conditions
                    </span>
                  </label>
                  <FieldError msg={errors.termsAccepted} />
                </div>

                {/* ── Submit ── */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: 16,
                    border: "none",
                    fontWeight: 900,
                    fontSize: 16,
                    color: "#fff",
                    cursor: loading ? "not-allowed" : "pointer",
                    background: loading ? "rgba(249,125,0,0.55)" : "#f97d00",
                    boxShadow: "0 0 28px rgba(249,125,0,0.40)",
                    letterSpacing: "0.3px",
                  }}
                  whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 44px rgba(249,125,0,0.60)" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? "Submitting…" : "Submit Ad Booking →"}
                </motion.button>

                <p style={{ fontSize: 11, textAlign: "center", color: "rgba(244,241,236,0.28)", marginTop: 12 }}>
                  Our team confirms within 24 hours · VAT exclusive · Subject to availability
                </p>

                {/* Mobile WhatsApp note */}
                <div className="lg:hidden mt-6 text-center">
                  <p style={{ fontSize: 12, color: "rgba(244,241,236,0.40)", marginBottom: 8 }}>Questions? Chat with us</p>
                  <a
                    href="https://wa.me/254793004303"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 20px", borderRadius: 10,
                      background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)",
                      color: "#25D366", fontWeight: 700, fontSize: 13, textDecoration: "none",
                    }}
                  >
                    💬 WhatsApp Support
                  </a>
                </div>
              </form>

              {/* ═══ RIGHT: sticky sidebar ═══ */}
              <div className="hidden lg:block" style={{ position: "sticky", top: 90 }}>
                {/* Submission checklist */}
                <div
                  style={{
                    borderRadius: 20, padding: 24,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    marginBottom: 14,
                  }}
                >
                  <p className="font-display" style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 16 }}>
                    Submission Checklist
                  </p>
                  {[
                    "Ad materials ready (video / audio)",
                    "Google Drive / WeTransfer link prepared",
                    "Campaign dates confirmed",
                    "Budget approved internally",
                    "T&C read and accepted",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(249,125,0,0.12)", border: "1.5px solid rgba(249,125,0,0.35)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#f97d00", fontWeight: 900, marginTop: 1 }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(244,241,236,0.55)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div
                  style={{
                    borderRadius: 20, padding: 24,
                    background: "rgba(37,211,102,0.06)",
                    border: "1px solid rgba(37,211,102,0.18)",
                  }}
                >
                  <p style={{ fontSize: 13, color: "rgba(244,241,236,0.65)", lineHeight: 1.6, marginBottom: 16 }}>
                    Need help with the form or have questions about specifications?
                  </p>
                  <a
                    href="https://wa.me/254793004303?text=Hi%2C%20I%20need%20help%20with%20my%20ad%20submission"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "12px", borderRadius: 12,
                      background: "#25D366", color: "#fff",
                      fontWeight: 800, fontSize: 14, textDecoration: "none",
                    }}
                  >
                    💬 Chat on WhatsApp
                  </a>
                  <p style={{ fontSize: 11, textAlign: "center", color: "rgba(244,241,236,0.28)", marginTop: 10 }}>
                    +254 793 004 303
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Success state ── */
            <motion.div
              key="success"
              className="text-center py-20 max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(249,125,0,0.12)",
                  border: "2px solid rgba(249,125,0,0.40)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, margin: "0 auto 24px",
                  boxShadow: "0 0 30px rgba(249,125,0,0.25)",
                }}
              >
                ✓
              </div>
              <h2 className="font-display" style={{ fontWeight: 900, fontSize: 32, color: "#fff", marginBottom: 12 }}>
                Booking Received!
              </h2>
              <p style={{ fontSize: 15, color: "rgba(244,241,236,0.55)", lineHeight: 1.7, marginBottom: 8 }}>
                Thank you{" "}
                <strong style={{ color: "#f97d00" }}>{form.contactName}</strong>! Our team will review your submission and contact you within{" "}
                <strong style={{ color: "rgba(244,241,236,0.80)" }}>24 hours</strong> to confirm your booking.
              </p>
              <p style={{ fontSize: 13, color: "rgba(244,241,236,0.38)", marginBottom: 28 }}>
                Remember to share your ad materials at the link you provided, or send directly via WhatsApp.
              </p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <motion.a
                  href="https://wa.me/254793004303?text=Hi%2C%20I%20just%20submitted%20my%20ad%20booking%20on%20werutv.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "13px 28px", borderRadius: 14,
                    background: "#25D366", color: "#fff",
                    fontWeight: 800, fontSize: 15, textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 Chat on WhatsApp
                </motion.a>
                <a
                  href="/"
                  style={{ fontSize: 13, color: "rgba(244,241,236,0.38)", textDecoration: "none" }}
                >
                  ← Back to homepage
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
