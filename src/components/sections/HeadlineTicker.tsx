import { type Headline, FALLBACK_HEADLINES } from "@/lib/getNewsFeed";

// Duplicate for seamless infinite scroll loop
function buildItems(headlines: Headline[]) {
  return [...headlines, ...headlines];
}

export default function HeadlineTicker({
  headlines = FALLBACK_HEADLINES,
}: {
  headlines?: Headline[];
}) {
  const items = buildItems(headlines);

  return (
    <div
      id="headlines"
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
            <span
              className={`text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 shrink-0 ${h.category === "BREAKING" ? "glass-red" : "glass-sm rounded-full"}`}
              style={{ color: h.category === "BREAKING" ? "#fff" : h.color }}
            >
              {h.category}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 live-dot"
              style={{ background: h.color }}
            />
            <span className="text-white/85 text-xs font-medium">{h.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
