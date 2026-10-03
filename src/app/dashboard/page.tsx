"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DASHBOARD_TABLES, DASHBOARD_TABLE_KEYS } from "@/lib/dashboardTables";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import TrendChart from "@/components/dashboard/TrendChart";
import DataTable from "@/components/dashboard/DataTable";
import ExportCsvButton from "@/components/dashboard/ExportCsvButton";
import QuizManagementPanel from "@/components/dashboard/QuizManagementPanel";
import type { AirtableRecord } from "@/components/dashboard/types";

type RecordsState = Record<string, AirtableRecord[]>;

const AUTO_REFRESH_MS = 60_000;

export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [records, setRecords] = useState<RecordsState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const results = await Promise.all(
        DASHBOARD_TABLE_KEYS.map(async (key) => {
          const res = await fetch(`/api/dashboard/${key}`, { cache: "no-store" });
          if (!res.ok) throw new Error(`Failed to load ${key}`);
          const data = await res.json();
          return [key, data.records as AirtableRecord[]] as const;
        })
      );
      setRecords(Object.fromEntries(results));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, AUTO_REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const handlePatch = useCallback(
    async (tableKey: string, recordId: string, fields: Record<string, unknown>) => {
      setRecords((prev) => ({
        ...prev,
        [tableKey]: (prev[tableKey] ?? []).map((r) =>
          r.id === recordId ? { ...r, fields: { ...r.fields, ...fields } } : r
        ),
      }));
      try {
        const res = await fetch(`/api/dashboard/${tableKey}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recordId, fields }),
        });
        if (!res.ok) throw new Error("Update failed");
      } catch {
        setError("Failed to save change — refresh to see the current state.");
      }
    },
    []
  );

  const handleDelete = useCallback(async (tableKey: string, recordId: string) => {
    setRecords((prev) => ({
      ...prev,
      [tableKey]: (prev[tableKey] ?? []).filter((r) => r.id !== recordId),
    }));
    try {
      const res = await fetch(`/api/dashboard/${tableKey}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }),
      });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setError("Failed to delete — refresh to see the current state.");
    }
  }, []);

  const recentActivity = useMemo(() => {
    const all: { tableKey: string; record: AirtableRecord }[] = [];
    for (const key of DASHBOARD_TABLE_KEYS) {
      for (const record of records[key] ?? []) all.push({ tableKey: key, record });
    }
    return all
      .sort((a, b) => {
        const dateA = String(a.record.fields[DASHBOARD_TABLES[a.tableKey].dateField] ?? a.record.createdTime);
        const dateB = String(b.record.fields[DASHBOARD_TABLES[b.tableKey].dateField] ?? b.record.createdTime);
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      })
      .slice(0, 15);
  }, [records]);

  const activeConfig = active !== "overview" ? DASHBOARD_TABLES[active] : null;

  const isInitialLoad = loading && Object.keys(records).length === 0;

  return (
    <div className="min-h-screen flex flex-col sm:flex-row" style={{ background: "#F5F5F4" }}>
      <Sidebar active={active} onSelect={setActive} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#0A0A0A" }}>
            {active === "overview" ? "Overview" : active === "quiz-management" ? "Quiz Management" : activeConfig?.label}
          </h1>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {lastUpdated && (
              <span className="text-xs text-black/40">
                Updated {lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={fetchAll}
              disabled={loading}
              className="text-xs font-semibold px-3.5 py-2 rounded-lg text-white transition-all duration-150 active:scale-95 disabled:opacity-50"
              style={{ background: "#f97d00", boxShadow: "0 2px 10px rgba(249,125,0,0.25)" }}
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>
            {error}
          </div>
        )}

        {isInitialLoad ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {DASHBOARD_TABLE_KEYS.map((key) => (
                <div
                  key={key}
                  className="h-24 rounded-2xl bg-white animate-pulse"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                />
              ))}
            </div>
            <div className="h-56 rounded-2xl bg-white animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />
          </div>
        ) : active === "overview" ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {DASHBOARD_TABLE_KEYS.map((key) => {
                const config = DASHBOARD_TABLES[key];
                const rows = records[key] ?? [];
                let subLabel: string | undefined;
                if (key === "quiz") {
                  const perfect = rows.filter((r) => r.fields.Score === 10).length;
                  subLabel = `${perfect} perfect score${perfect === 1 ? "" : "s"}`;
                } else if (key === "cause-nominations") {
                  const counts = rows.reduce<Record<string, number>>((acc, r) => {
                    const cause = r.fields.Cause as string | undefined;
                    if (cause) acc[cause] = (acc[cause] ?? 0) + 1;
                    return acc;
                  }, {});
                  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                  subLabel = top ? `${top[0]} — ${top[1]}` : undefined;
                } else {
                  const fresh = rows.filter((r) => r.fields.Status === "New").length;
                  subLabel = `${fresh} new`;
                }
                return (
                  <StatCard key={key} label={config.label} value={rows.length} subLabel={subLabel} />
                );
              })}
            </div>

            <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(249,125,0,0.05), 0 1px 2px rgba(0,0,0,0.03)" }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: "#0A0A0A" }}>Quiz entries — last 14 days</h2>
              <TrendChart records={records.quiz ?? []} dateField="Submitted At" />
            </div>

            <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(249,125,0,0.05), 0 1px 2px rgba(0,0,0,0.03)" }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: "#0A0A0A" }}>Recent activity</h2>
              <div className="flex flex-col divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                {recentActivity.map(({ tableKey, record }) => {
                  const config = DASHBOARD_TABLES[tableKey];
                  const name = String(record.fields[config.nameField] ?? "Unknown");
                  const date = record.fields[config.dateField] as string | undefined;
                  return (
                    <div key={record.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="shrink-0 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                          style={{ background: "rgba(249,125,0,0.1)", color: "#f97d00" }}
                        >
                          {config.label}
                        </span>
                        <span className="truncate" style={{ color: "#0A0A0A" }}>{name}</span>
                      </div>
                      <span className="text-xs text-black/35 whitespace-nowrap">
                        {date ? new Date(date).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                      </span>
                    </div>
                  );
                })}
                {recentActivity.length === 0 && (
                  <p className="text-sm text-black/30 py-4 text-center">No activity yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : active === "quiz-management" ? (
          <QuizManagementPanel />
        ) : activeConfig ? (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(249,125,0,0.05), 0 1px 2px rgba(0,0,0,0.03)" }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: "#0A0A0A" }}>Entries per day (last 14 days)</h2>
              <TrendChart records={records[active] ?? []} dateField={activeConfig.dateField} />
            </div>

            <div className="flex justify-end">
              <ExportCsvButton config={activeConfig} records={records[active] ?? []} />
            </div>

            <DataTable
              config={activeConfig}
              records={records[active] ?? []}
              onPatch={(recordId, fields) => handlePatch(active, recordId, fields)}
              onDelete={(recordId) => handleDelete(active, recordId)}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
