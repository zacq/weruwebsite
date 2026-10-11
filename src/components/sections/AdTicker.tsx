import Link from "next/link";
import type { AdTickerItem } from "@/lib/getAdTicker";

// Duplicate for seamless infinite scroll loop
function buildItems(items: AdTickerItem[]) {
  return [...items, ...items];
}

export default function AdTicker({ items }: { items: AdTickerItem[] }) {
  if (items.length === 0) return null;
  const track = buildItems(items);

  return (
    <div
      className="w-full overflow-hidden flex items-stretch"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: "#7A1010",
        height: "3rem",
        borderTop: "2px solid #f97d00",
        borderBottom: "2px solid #f97d00",
        boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
      }}
    >
      <span
        className="shrink-0 flex items-center gap-1.5 px-4 text-xs font-extrabold tracking-widest uppercase"
        style={{ background: "#0A0A0A", color: "#FACC15" }}
      >
        📢 Ads
      </span>
      <div className="flex-1 overflow-hidden">
        <div className="scroll-right inline-flex items-center h-full gap-10 whitespace-nowrap">
          {track.map((item, i) => (
            <Link
              key={i}
              href="/quiz"
              className="inline-flex items-center gap-2 shrink-0 text-sm font-bold text-white hover:text-[#FACC15] transition-colors"
            >
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              {item.message}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
