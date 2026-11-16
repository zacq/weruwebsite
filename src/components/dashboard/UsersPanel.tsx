"use client";

import { useCallback, useEffect, useState } from "react";

type Role = "admin" | "editor" | "quiz_manager";
type User = { id: string; email: string; name: string; role: Role; active: boolean; lastLoginAt: string | null };

const ROLE_LABEL: Record<Role, string> = { admin: "Admin", editor: "Editor", quiz_manager: "Quiz manager" };

const inputStyle = { border: "1px solid rgba(0,0,0,0.15)" };

export default function UsersPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", name: "", role: "editor" as Role, password: "" });

  const load = useCallback(async () => {
    const res = await fetch("/api/dashboard/users", { cache: "no-store" });
    if (res.ok) setUsers((await res.json()).users);
    else setError("Failed to load users.");
  }, []);

  useEffect(() => { load(); }, [load]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    setError(null);
    const res = await fetch(`/api/dashboard/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) setError((await res.json().catch(() => ({}))).error ?? "Update failed.");
    await load();
  };

  const create = async () => {
    setError(null);
    const res = await fetch("/api/dashboard/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError((await res.json().catch(() => ({}))).error ?? "Failed to create user.");
      return;
    }
    setForm({ email: "", name: "", role: "editor", password: "" });
    await load();
  };

  const resetPassword = (u: User) => {
    const password = window.prompt(`New password for ${u.name} (min 10 characters):`);
    if (password) patch(u.id, { password });
  };

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>
      )}

      <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <h2 className="text-sm font-bold mb-3" style={{ color: "#0A0A0A" }}>Add a staff account</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <input className="text-sm px-3 py-2.5 rounded-lg" style={inputStyle} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="text-sm px-3 py-2.5 rounded-lg" style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="text-sm px-3 py-2.5 rounded-lg bg-white" style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
            {Object.entries(ROLE_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <input className="text-sm px-3 py-2.5 rounded-lg" style={inputStyle} placeholder="Temporary password (10+ chars)" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button
          onClick={create}
          disabled={!form.name || !form.email || form.password.length < 10}
          className="mt-3 text-xs font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-40 transition-all active:scale-95"
          style={{ background: "#f97d00" }}
        >
          Create account
        </button>
      </div>

      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-black/40">
              <th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Last login</th><th className="px-4 py-3">Status</th><th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderTop: "1px solid rgba(0,0,0,0.05)", opacity: u.active ? 1 : 0.5 }}>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-black/60">{u.email}</td>
                <td className="px-4 py-3">
                  <select className="text-xs px-2 py-1.5 rounded-lg bg-white" style={inputStyle} value={u.role} onChange={(e) => patch(u.id, { role: e.target.value })}>
                    {Object.entries(ROLE_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-black/40 tabular-nums">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Never"}
                </td>
                <td className="px-4 py-3 text-xs">{u.active ? "Active" : "Deactivated"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button onClick={() => resetPassword(u)} className="text-xs font-semibold px-2 py-1 hover:opacity-70">Reset password</button>
                  <button onClick={() => patch(u.id, { active: !u.active })} className="text-xs font-semibold px-2 py-1 hover:opacity-70" style={{ color: u.active ? "#b91c1c" : "#15803d" }}>
                    {u.active ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
