"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    q: "When did Weru FM begin broadcasting?",
    options: ["26th Dec 2016", "3rd July 2017", "26th Dec 2017"],
    correct: 1,
  },
  {
    q: "Who is the current host of Weru Beats?",
    options: ["Empress Natty", "Ajelyne George", "Mwenda H the Pilot"],
    correct: 0,
  },
  {
    q: "Who among these is not a news anchor on Weru FM?",
    options: ["Mercy Ndumba", "Dorcas Kaaria", "Raymond Mwenda"],
    correct: 1,
  },
  {
    q: "Who was the first host of Reggae Kuruka?",
    options: ["Dj Tush untamed", "Selector Prince", "Empress Rita"],
    correct: 1,
  },
  {
    q: "Which is the Weru FM frequency?",
    options: ["96.4", "94.6", "96.6"],
    correct: 0,
  },
  {
    q: "Who is the current host of Mantu Kimencu?",
    options: ["Mc Kithumba", "Empress Rita", "Prince Ken"],
    correct: 0,
  },
  {
    q: "Who is the current host of Chanchamuka?",
    options: ["Martin Gichunge & Karimi Kaunty", "Martin Gichunge & Makena Matiri", "Makena Matiri"],
    correct: 2,
  },
  {
    q: "Who are the current hosts of Reggaemania on Weru FM?",
    options: ["Empress Rita & Dj Tush untamed", "Empress Rita & Empress Natty", "Empress Natty & Dj Tush untamed"],
    correct: 1,
  },
  {
    q: "Munene wa Kagwi hosts which shows on Weru FM?",
    options: ["Tuthunkume & Choir Kanisene", "Tuthunkume & Tuborerie", "Tuthunkume & Tutharimwe"],
    correct: 0,
  },
  {
    q: "Who among these have never hosted Chanchamuka on Weru FM?",
    options: ["Mc Kithumba", "Betty Ntinyari", "Morgan Mwiti"],
    correct: 1,
  },
];

type Phase = "quiz" | "contact" | "done";

export default function QuizModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = () => {
    setStep(0);
    setAnswers(Array(10).fill(null));
    setPhase("quiz");
    setName("");
    setPhone("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (step < 9) {
      setStep((s) => s + 1);
    } else {
      setPhase("contact");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          answers: answers.map((a, i) => ({
            question: QUESTIONS[i].q,
            selected: a !== null ? QUESTIONS[i].options[a] : null,
            correct: a === QUESTIONS[i].correct,
          })),
          score,
        }),
      });
    } finally {
      setSubmitting(false);
      setPhase("done");
    }
  };

  const current = QUESTIONS[step];

  return (
    <>
      {/* Floating card — bottom-left, always visible */}
      <motion.button
        onClick={handleOpen}
        aria-label="Open quiz: 96+4 Quiz"
        className="fixed bottom-6 md:bottom-8 left-4 md:left-8 z-50 w-[290px] sm:w-[310px] text-left rounded-2xl p-4 flex flex-col gap-3"
        style={{
          marginBottom: "env(safe-area-inset-bottom, 0px)",
          background: "linear-gradient(145deg, #4A2000 0%, #7A3A00 55%, #5C2A00 100%)",
          border: "1px solid rgba(250,180,50,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 24px rgba(180,80,0,0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 22 }}
        whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 36px rgba(250,120,0,0.3)" }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            🎯
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight" style={{ color: "#F97D00" }}>
              96+4 Quiz
            </span>
            <span className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.62)" }}>
              10 questions — win a KSh 5,000 shopping voucher + studio visit
            </span>
          </div>
        </div>
        <div
          className="w-full py-2 rounded-full font-bold text-sm text-black text-center"
          style={{ background: "#FACC15" }}
        >
          Start Quiz →
        </div>
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="96+4 Quiz"
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: "rgba(10,10,10,0.97)",
                border: "1px solid rgba(250,204,21,0.22)",
                boxShadow: "0 0 60px rgba(250,204,21,0.1), 0 25px 60px rgba(0,0,0,0.65)",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {/* Sticky header */}
              <div
                className="sticky top-0 px-6 pt-6 pb-4 z-10"
                style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors text-lg leading-none p-1"
                  aria-label="Close quiz"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2.5 mb-0.5">
                  <span className="text-2xl" aria-hidden>🏆</span>
                  <h2 className="text-white font-bold text-lg leading-tight">96+4 Quiz</h2>
                </div>
                <p className="text-white/45 text-xs mb-4 pl-9">
                  10 questions · Win a KSh 5,000 shopping voucher + studio visit
                </p>

                {phase === "quiz" && (
                  <>
                    <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "#FACC15" }}
                        initial={false}
                        animate={{ width: `${((step + 1) / 10) * 100}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 28 }}
                      />
                    </div>
                    <p className="text-white/35 text-xs mt-1.5">Question {step + 1} of 10</p>
                  </>
                )}
              </div>

              {/* Body */}
              <div className="px-6 pt-5 pb-6">
                <AnimatePresence mode="wait">

                  {/* ── Quiz phase ── */}
                  {phase === "quiz" && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="text-white font-semibold text-[15px] leading-snug mb-5">{current.q}</p>

                      <div className="flex flex-col gap-2.5 mb-6">
                        {current.options.map((opt, i) => {
                          const selected = answers[step] === i;
                          return (
                            <button
                              key={i}
                              onClick={() => selectAnswer(i)}
                              className="text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150"
                              style={{
                                border: selected
                                  ? "1px solid #FACC15"
                                  : "1px solid rgba(255,255,255,0.09)",
                                background: selected
                                  ? "rgba(250,204,21,0.11)"
                                  : "rgba(255,255,255,0.04)",
                                color: selected ? "#FACC15" : "rgba(255,255,255,0.75)",
                                transform: selected ? "scale(1.015)" : "scale(1)",
                              }}
                            >
                              <span
                                className="font-bold mr-2.5"
                                style={{ color: selected ? "#FACC15" : "rgba(255,255,255,0.3)" }}
                              >
                                {String.fromCharCode(65 + i)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-3">
                        {step > 0 && (
                          <button
                            onClick={handleBack}
                            className="flex-1 py-3 rounded-xl text-white/55 text-sm font-semibold transition-all hover:text-white"
                            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={answers[step] === null}
                          className="flex-1 py-3 rounded-xl text-black font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{ background: "#FACC15" }}
                        >
                          {step < 9 ? "Next →" : "Finish →"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Contact phase ── */}
                  {phase === "contact" && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3" aria-hidden>🎯</div>
                        <h3 className="text-white font-bold text-lg mb-1">Almost there!</h3>
                        <p className="text-white/45 text-sm">
                          Enter your details to complete your entry into the draw.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 mb-6">
                        <div>
                          <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="form-input w-full"
                            autoComplete="name"
                          />
                        </div>
                        <div>
                          <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 0712 345 678"
                            className="form-input w-full"
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || !phone.trim() || submitting}
                        className="w-full py-3.5 rounded-xl text-black font-bold text-sm transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                        style={{ background: "#FACC15" }}
                      >
                        {submitting ? "Submitting…" : "Submit Entry"}
                      </button>

                      <p className="text-white/25 text-xs text-center mt-4 leading-relaxed">
                        Score 10/10 to win a KSh 5,000 shopping voucher plus a visit to the Weru Studios.
                      </p>
                    </motion.div>
                  )}

                  {/* ── Done phase ── */}
                  {phase === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-center py-4"
                    >
                      <div className="text-5xl mb-4" aria-hidden>🎉</div>
                      <h3 className="text-white font-bold text-xl mb-2">Entry Received!</h3>
                      <p className="text-white/50 text-sm mb-5">
                        You scored{" "}
                        <span className="font-bold" style={{ color: "#FACC15" }}>
                          {score}/10
                        </span>
                      </p>
                      <div
                        className="rounded-xl p-4 mb-7 text-sm leading-relaxed"
                        style={{
                          background: "rgba(250,204,21,0.07)",
                          border: "1px solid rgba(250,204,21,0.18)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        Thanks for playing the 96+4 Quiz! If you scored 10/10 you're in line for a KSh 5,000 shopping voucher and a visit to the Weru Studios. Winners will be announced on Weru TV and FM. Good luck!
                      </div>
                      <button
                        onClick={handleClose}
                        className="px-8 py-3 rounded-xl text-black font-bold text-sm"
                        style={{ background: "#FACC15" }}
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
