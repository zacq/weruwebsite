"use client";

import { DASHBOARD_TABLES } from "@/lib/dashboardTables";

type SidebarProps = {
  active: string;
  onSelect: (key: string) => void;
};

const NAV_ITEMS = [
  { key: "overview", label: "Overview" },
  ...Object.values(DASHBOARD_TABLES).map((t) => ({ key: t.key, label: t.label })),
];

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <>
      {/* Desktop — fixed vertical sidebar */}
      <aside
        className="hidden sm:flex w-56 shrink-0 min-h-screen flex-col gap-1 p-4"
        style={{ background: "#0A0A0A" }}
      >
        <div className="px-2 py-3 mb-2">
          <span className="font-bold text-lg" style={{ color: "#f97d00" }}>Weru</span>
          <span className="font-bold text-lg text-white"> Command Center</span>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98]"
              style={{
                background: isActive ? "rgba(249,125,0,0.15)" : "transparent",
                color: isActive ? "#f97d00" : "rgba(255,255,255,0.55)",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              {item.label}
            </button>
          );
        })}
      </aside>

      {/* Mobile — sticky top bar with horizontally scrollable pill nav */}
      <div className="sm:hidden sticky top-0 z-20" style={{ background: "#0A0A0A" }}>
        <div className="px-4 pt-3.5 pb-1">
          <span className="font-bold text-base" style={{ color: "#f97d00" }}>Weru</span>
          <span className="font-bold text-base text-white"> Command Center</span>
        </div>
        <div
          className="flex gap-2 px-4 py-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelect(item.key)}
                className="shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95"
                style={{
                  background: isActive ? "#f97d00" : "rgba(255,255,255,0.08)",
                  color: isActive ? "#0A0A0A" : "rgba(255,255,255,0.65)",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
