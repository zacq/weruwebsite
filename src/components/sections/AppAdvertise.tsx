"use client";

import { useState } from "react";

type Tab = "TV" | "Radio";

const TV_ROWS = [
  { name: "Prime Time Package", freq: "Weekly" },
  { name: "Sponsorship", freq: "Weekly · High Frequency" },
  { name: "Clock Sponsorship", freq: "Weekly" },
  { name: "Live Coverage", freq: "Per event" },
  { name: "Live Interview", freq: "Per session" },
  { name: "Squeeze Backs", freq: "Weekly" },
  { name: "Digital Spaces", freq: "Per post" },
  { name: "Obituary Placement", freq: "Per day" },
];

const RADIO_ROWS = [
  { name: "Full Advertising Package", freq: "Weekly" },
  { name: "Sponsorship", freq: "Weekly · High Frequency" },
  { name: "Classifieds (1 min)", freq: "Per week" },
  { name: "Live Interview", freq: "Per session" },
  { name: "Digital Spaces", freq: "Per post" },
];

export default function AppAdvertise() {
  const [tab, setTab] = useState<Tab>("TV");
  const rows = tab === "TV" ? TV_ROWS : RADIO_ROWS;

  return (
    <div style={{ background: "#0A0A0A", paddingTop: "calc(56px + env(safe-area-inset-top))" }}>
      <div className="px-4 pt-5 pb-4">
        <p className="text-white font-extrabold text-2xl mb-1.5">Rate card</p>
        <p className="text-white/45 text-sm">Mount Kenya East — TV, radio and digital. Rates exclusive of VAT.</p>
      </div>

      <div className="flex gap-2 px-4 pb-4">
        {(["TV", "Radio"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: tab === t ? "#f97d00" : "rgba(255,255,255,0.08)", color: tab === t ? "#111" : "rgba(255,255,255,0.7)" }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4">
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {rows.map((row, i) => (
            <div
              key={row.name}
              className="flex items-center justify-between px-4 py-3.5"
              style={{ background: "rgba(255,255,255,0.02)", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined }}
            >
              <div className="min-w-0">
                <p className="text-white text-sm font-bold truncate">{row.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{row.freq}</p>
              </div>
              <span className="shrink-0 text-xs font-bold ml-3" style={{ color: "#FACC15" }}>🔒 On request</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-2.5">
        <a
          href="#rate-card"
          className="text-center py-3.5 rounded-xl text-sm font-extrabold text-white"
          style={{ background: "#f97d00" }}
        >
          Request full rate card
        </a>
        <div className="flex gap-2.5">
          <a href="tel:+254700117026" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "rgba(255,255,255,0.06)" }}>
            📞 Call
          </a>
          <a href="https://wa.me/254707065000?text=Weru%20TV%20Advertising%20Enquiry" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#25D366" }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
