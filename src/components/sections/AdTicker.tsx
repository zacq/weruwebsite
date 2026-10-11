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
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", background: "#15120E", height: "2.25rem" }}
    >
      <span
        className="shrink-0 flex items-center px-3 text-[10px] font-extrabold tracking-widest uppercase"
        style={{ background: "#0A0A0A", color: "#f97d00" }}
      >
        Ads
      </span>
      <div className="flex-1 overflow-hidden">
        <div className="scroll-right inline-flex items-center h-full gap-8 whitespace-nowrap">
          {track.map((item, i) => (
            <Link
              key={i}
              href="/quiz"
              className="inline-flex items-center gap-2 shrink-0 text-xs font-medium text-white/75 hover:text-[#f97d00] transition-colors"
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
