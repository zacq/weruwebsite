"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAUSES, type Cause } from "@/data/causes";
import { DONATE_CONTENT } from "@/data/donateContent";

const CAUSE_VOTE_KEY = "weru_cause_voted";

function Divider() {
  return <div className="h-px w-full my-10 sm:my-14" style={{ background: "rgba(255,255,255,0.10)" }} />;
}

function NiceMessageSection() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !name.trim() || !phone.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/nice-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please check your details and try again.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            <h2 className="text-white font-bold leading-tight mb-1.5" style={{ fontSize: "clamp(1.35rem, 4vw, 1.9rem)" }}>
              Tell us something nice ❤️
            </h2>
            <p className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Soothe us kidogo! 😂
            </p>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
              What&apos;s one nice thing you&apos;d like to tell Weru?
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Type your message here..."
              className="form-input w-full mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="form-input flex-1"
                autoComplete="name"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="form-input flex-1"
                autoComplete="tel"
              />
            </div>

            {error && (
              <p className="text-xs text-center mb-3" style={{ color: "#f97d00" }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!message.trim() || !name.trim() || !phone.trim() || submitting}
              className="w-full py-4 rounded-2xl text-black font-bold text-sm uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed presenter-submit-btn"
              style={{ background: "#f97d00" }}
            >
              {submitting ? "Submitting…" : "Submit Your Line"}
            </button>

            <p className="text-xs text-center mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              The most catchy/creative submissions stand a chance to attend the Weru Digital Launch Event.
            </p>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-3" style={{ color: "#FACC15" }}>
              Message received
            </p>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">Thanks for the love!</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              The most catchy/creative submissions stand a chance to attend the Weru Digital Launch Event.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CauseVoteSection() {
  const [selected, setSelected] = useState<Cause | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [votedCause, setVotedCause] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CAUSE_VOTE_KEY);
      if (stored) setVotedCause(stored);
    } catch {
      // localStorage unavailable (private window etc.) — fall through to showing the poll
    }
    setChecked(true);
  }, []);

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/cause-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cause: selected }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Something went wrong. Please try again.");
      } else {
        try { localStorage.setItem(CAUSE_VOTE_KEY, selected); } catch {}
        setVotedCause(selected);
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Avoid a flash of the poll before the one-time localStorage check resolves
  if (!checked) return <div className="glass-card rounded-2xl p-6 sm:p-8 min-h-[280px]" />;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {!votedCause ? (
          <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            <h2 className="text-white font-bold leading-tight mb-1.5" style={{ fontSize: "clamp(1.35rem, 4vw, 1.9rem)" }}>
              Now tell us something that matters.
            </h2>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
              Which cause would you like Weru to support?
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              {CAUSES.map((cause) => {
                const isSelected = selected === cause;
                return (
                  <button
                    key={cause}
                    onClick={() => setSelected(cause)}
                    className="flex items-center gap-3 w-full px-4 sm:px-5 py-3.5 rounded-2xl text-left transition-all duration-150"
                    style={{
                      background: isSelected ? "rgba(250,204,21,0.08)" : "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: isSelected ? "1px solid #FACC15" : "1px solid rgba(255,255,255,0.09)",
                      boxShadow: isSelected
                        ? "inset 0 1px 0 rgba(250,204,21,0.15), 0 0 24px rgba(250,204,21,0.10), 0 4px 16px rgba(0,0,0,0.25)"
                        : "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.20)",
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150"
                      style={{
                        border: isSelected ? "1.5px solid #FACC15" : "1.5px solid rgba(255,255,255,0.25)",
                        background: isSelected ? "#FACC15" : "transparent",
                      }}
                    >
                      {isSelected && (
                        <motion.span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "#0A0A0A" }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        />
                      )}
                    </span>
                    <span className="text-sm sm:text-base font-medium" style={{ color: isSelected ? "#FACC15" : "rgba(255,255,255,0.75)" }}>
                      {cause}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-center mb-3" style={{ color: "#f97d00" }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="w-full py-4 rounded-2xl text-black font-bold text-sm uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed presenter-submit-btn"
              style={{ background: "#FACC15" }}
            >
              {submitting ? "Submitting…" : "Nominate Your Cause"}
            </button>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-3" style={{ color: "#FACC15" }}>
              Vote recorded
            </p>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">
              You nominated &ldquo;{votedCause}&rdquo;.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Thanks for helping us decide. 🙏
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DonatePanel({
  label,
  open,
  onToggle,
  content,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  content: string;
}) {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl glass-sm text-left transition-all duration-150"
      >
        <span className="text-sm font-bold uppercase tracking-wide text-white">{label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="glass-sm rounded-xl p-4 mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DonateSection() {
  const [whatOpen, setWhatOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <h2 className="text-white font-bold leading-tight mb-1.5" style={{ fontSize: "clamp(1.35rem, 4vw, 1.9rem)" }}>
        Let&apos;s do something about it.
      </h2>
      <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
        Your contribution can make someone&apos;s day a little better.
      </p>

      <DonatePanel
        label="What can I donate?"
        open={whatOpen}
        onToggle={() => setWhatOpen((o) => !o)}
        content={DONATE_CONTENT.whatCanIDonate}
      />

      <p className="text-sm mt-6 mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
        Help us make a difference. Find out what you can donate.
      </p>

      <DonatePanel
        label="How to donate?"
        open={howOpen}
        onToggle={() => setHowOpen((o) => !o)}
        content={DONATE_CONTENT.howToDonate}
      />
    </div>
  );
}

export default function WeruExperience() {
  return (
    <div>
      <NiceMessageSection />
      <Divider />
      <CauseVoteSection />
      <Divider />
      <DonateSection />
    </div>
  );
}
