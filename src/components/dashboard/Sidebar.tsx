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
    <aside
      className="w-56 shrink-0 min-h-screen flex flex-col gap-1 p-4"
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
            className="text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: isActive ? "rgba(249,125,0,0.15)" : "transparent",
              color: isActive ? "#f97d00" : "rgba(255,255,255,0.55)",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
