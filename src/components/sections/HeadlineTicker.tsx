const headlines = [
  { category: "NEWS",        color: "#C8102E", text: "Why Wetangʼula is Warning MPs About Life After Parliament" },
  { category: "POLITICS",    color: "#1565C0", text: "Rigathi Gachagua Threatens Nationwide Protests Over Alleged Oppression" },
  { category: "BUSINESS",    color: "#2E7D32", text: "Ruto Launches New Ksh36,000 Funding for 90,000 Kenyan Youth" },
  { category: "BREAKING",    color: "#C8102E", text: "Several Injured After Matatu Flips on Haile Selassie Avenue" },
  { category: "DEVELOPMENT", color: "#E65100", text: "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay" },
  { category: "POLITICS",    color: "#1565C0", text: "Government to Preserve All Raila Odinga Tributes in National Archives" },
  { category: "NEWS",        color: "#C8102E", text: "Junet: Collaboration with President Ruto Brings Quick Development" },
  { category: "HEALTH",      color: "#00695C", text: "Truphena Muthoni Plans Next Move After Guinness World Record" },
];

// Duplicate for seamless infinite loop
const items = [...headlines, ...headlines];

export default function HeadlineTicker() {
  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{ background: "#1A1A1A" }}
    >
      <div className="ticker-track inline-flex gap-3 whitespace-nowrap">
        {items.map((h, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 shrink-0 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {/* Category badge */}
            <span
              className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full shrink-0"
              style={{ background: h.color, color: "#fff" }}
            >
              {h.category}
            </span>

            {/* Live dot */}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 live-dot"
              style={{ background: h.color }}
            />

            {/* Headline */}
            <span className="text-white/85 text-xs font-medium">
              {h.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
