"use client";

import { useState, type ReactNode } from "react";
import { fromLocalInput, toLocalInput, type DashQuiz } from "./quizTypes";

const inputClass = "w-full text-sm px-3 py-2.5 rounded-lg";
const inputStyle = { border: "1px solid rgba(0,0,0,0.15)" };

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wide text-black/45">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-black/35">{hint}</span>}
    </label>
  );
}

export default function QuizDetailsForm({ quiz, onSave }: { quiz: DashQuiz; onSave: (body: Record<string, unknown>) => Promise<void> }) {
  const promo = quiz.promoCopy ?? {};
  const [f, setF] = useState({
    campaign: quiz.campaign ?? "",
    title: quiz.title,
    tagline: quiz.tagline ?? "",
    description: quiz.description ?? "",
    steps: quiz.steps.join("\n"),
    prize: quiz.prize ?? "",
    sponsor: quiz.sponsor ?? "",
    prizeImageUrl: quiz.prizeImageUrl ?? "",
    startsAt: toLocalInput(quiz.startsAt),
    endsAt: toLocalInput(quiz.endsAt),
    primaryLabel: promo.primaryCta?.label ?? "",
    primaryUrl: promo.primaryCta?.url ?? "",
    eyebrow: promo.eyebrow ?? "",
    heading: promo.heading ?? "",
    body: promo.body ?? "",
    highlights: (promo.highlights ?? []).join("\n"),
    secondaryLabel: promo.secondaryCta?.label ?? "",
    secondaryUrl: promo.secondaryCta?.url ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const lines = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);
  const cta = (label: string, url: string) => (label.trim() && url.trim() ? { label: label.trim(), url: url.trim() } : undefined);

  const save = async () => {
    setSaving(true);
    await onSave({
      campaign: f.campaign,
      title: f.title,
      tagline: f.tagline,
      description: f.description,
      steps: lines(f.steps),
      prize: f.prize,
      sponsor: f.sponsor,
      prizeImageUrl: f.prizeImageUrl,
      startsAt: fromLocalInput(f.startsAt) ?? undefined,
      endsAt: fromLocalInput(f.endsAt),
      promoCopy: {
        primaryCta: cta(f.primaryLabel, f.primaryUrl),
        eyebrow: f.eyebrow.trim() || undefined,
        heading: f.heading.trim() || undefined,
        body: f.body.trim() || undefined,
        highlights: lines(f.highlights),
        secondaryCta: cta(f.secondaryLabel, f.secondaryUrl),
      },
    });
    setSaving(false);
  };

  const card = "rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-4";
  const cardStyle = { border: "1px solid rgba(0,0,0,0.06)" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
      <div className="flex flex-col gap-4">
        <div className={card} style={cardStyle}>
          <h3 className="text-sm font-bold">Quiz page</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Campaign" hint="Small label above the title"><input className={inputClass} style={inputStyle} value={f.campaign} onChange={set("campaign")} placeholder="WERU DIGITAL Watch, Like & Win!" /></Field>
            <Field label="Title"><input className={inputClass} style={inputStyle} value={f.title} onChange={set("title")} /></Field>
          </div>
          <Field label="Intro"><textarea rows={3} className={inputClass} style={inputStyle} value={f.description} onChange={set("description")} placeholder="Explore the WERU DIGITAL YouTube channel to find the answers. Think you know WERU DIGITAL? Prove it!" /></Field>
          <Field label="How to win" hint="One step per line — shown as a numbered list"><textarea rows={4} className={inputClass} style={inputStyle} value={f.steps} onChange={set("steps")} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Button label" hint="Shown under the steps and after entry"><input className={inputClass} style={inputStyle} value={f.primaryLabel} onChange={set("primaryLabel")} placeholder="Visit WERU DIGITAL on YouTube" /></Field>
            <Field label="Button link"><input className={inputClass} style={inputStyle} value={f.primaryUrl} onChange={set("primaryUrl")} placeholder="https://www.youtube.com/@…" /></Field>
          </div>
          <Field label="Tagline"><input className={inputClass} style={inputStyle} value={f.tagline} onChange={set("tagline")} placeholder="Watch. Discover. Participate. Win!" /></Field>
        </div>

        <div className={card} style={cardStyle}>
          <h3 className="text-sm font-bold">Prize & sponsor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Prize" hint='Optional. Shown as "Stand a chance to win …"'><input className={inputClass} style={inputStyle} value={f.prize} onChange={set("prize")} /></Field>
            <Field label="Sponsor"><input className={inputClass} style={inputStyle} value={f.sponsor} onChange={set("sponsor")} /></Field>
          </div>
          <Field label="Prize image URL" hint="Cloudinary URL — a media picker arrives with the media library"><input className={inputClass} style={inputStyle} value={f.prizeImageUrl} onChange={set("prizeImageUrl")} /></Field>
        </div>

        <div className={card} style={cardStyle}>
          <h3 className="text-sm font-bold">After-entry promo <span className="font-normal text-black/40">(optional)</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Eyebrow"><input className={inputClass} style={inputStyle} value={f.eyebrow} onChange={set("eyebrow")} /></Field>
            <Field label="Heading"><input className={inputClass} style={inputStyle} value={f.heading} onChange={set("heading")} /></Field>
          </div>
          <Field label="Body"><textarea rows={2} className={inputClass} style={inputStyle} value={f.body} onChange={set("body")} /></Field>
          <Field label="Highlights" hint="One per line — shown as tiles"><textarea rows={3} className={inputClass} style={inputStyle} value={f.highlights} onChange={set("highlights")} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Second button label"><input className={inputClass} style={inputStyle} value={f.secondaryLabel} onChange={set("secondaryLabel")} /></Field>
            <Field label="Second button link"><input className={inputClass} style={inputStyle} value={f.secondaryUrl} onChange={set("secondaryUrl")} /></Field>
          </div>
        </div>
      </div>

      <div className={`${card} lg:sticky lg:top-4`} style={cardStyle}>
        <h3 className="text-sm font-bold">Schedule</h3>
        <Field label="Opens"><input type="datetime-local" className={inputClass} style={inputStyle} value={f.startsAt} onChange={set("startsAt")} /></Field>
        <Field label="Closes" hint="Entries stop automatically at this time. For a weekly quiz, set this 7 days after opening.">
          <input type="datetime-local" className={inputClass} style={inputStyle} value={f.endsAt} onChange={set("endsAt")} />
        </Field>
        <button
          onClick={save}
          disabled={saving || !f.title.trim() || !f.startsAt}
          className="text-sm font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-40 transition-all active:scale-95"
          style={{ background: "#f97d00", boxShadow: "0 2px 10px rgba(249,125,0,0.25)" }}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
