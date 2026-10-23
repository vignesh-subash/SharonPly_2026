"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DIVISIONS = ["Plywood", "Veneer"];

interface Member {
  id: number; name: string; designation: string; department: string;
  phone: string; email: string; region: string; division: string; cities: string; photo_url: string | null;
  linkedin: string | null; sort_order: number; active: number;
}

const empty: Omit<Member, "id"> = {
  name: "", designation: "", department: "", phone: "", email: "",
  region: "", division: "Plywood", cities: "", photo_url: null, linkedin: null, sort_order: 0, active: 1,
};

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const colors = ["#00793A", "#1a7fc0", "#8b5cf6", "#d97706"];
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ background: colors[name.charCodeAt(0) % colors.length] }}>
      {initials}
    </div>
  );
}

export default function AdminSalesTeamPage() {
  const router = useRouter();
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [loadError, setLoadError] = useState("");

  const fetchTeam = useCallback(async () => {
    const res = await fetch("/api/admin/sales-team");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json().catch(() => ({}));
    setLoadError(res.ok ? "" : `Could not load from the database (${data.detail ?? "no details"}). Check DATABASE_URL on the hosting.`);
    setTeam(data.team ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchTeam(); }, [fetchTeam]);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); setShowModal(true); };
  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({ name: m.name, designation: m.designation ?? "", department: m.department ?? "",
      phone: m.phone ?? "", email: m.email ?? "", region: m.region ?? "",
      division: m.division ?? "Plywood", cities: m.cities ?? "",
      photo_url: m.photo_url, linkedin: m.linkedin, sort_order: m.sort_order ?? 0, active: m.active });
    setShowModal(true);
  };

  async function handleSave() {
    if (!form.name) return;
    setSaving(true);
    const payload = { ...form, active: !!form.active, photoUrl: form.photo_url };
    const url = editing ? `/api/admin/sales-team/${editing.id}` : "/api/admin/sales-team";
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.ok) { alert("The team member could not be saved. Please try again."); return; }
    setShowModal(false);
    fetchTeam();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this team member?")) return;
    setDeleting(id);
    await fetch(`/api/admin/sales-team/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchTeam();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = team.filter(m =>
    !search || m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.designation?.toLowerCase().includes(search.toLowerCase()) ||
    m.region?.toLowerCase().includes(search.toLowerCase()) ||
    m.cities?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          </Link>
          <img src="/images/sharon-corporate-logo.webp" alt="SharonPly" className="h-7 w-auto object-contain rounded" />
          <span className="font-semibold text-gray-900">Manage Sales Team</span>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Logout</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <input type="text" placeholder="Search members…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30 w-full sm:w-64" />
          <button onClick={openAdd} className="flex items-center gap-2 bg-[#00793A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#006830] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Add Member
          </button>
        </div>

        {loadError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading…</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Member", "Designation", "Division", "Territory", "Phone", "Status", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No members found</td></tr>
                ) : filtered.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {m.photo_url ? (
                          <img src={m.photo_url} alt={m.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0"/>
                        ) : <InitialsAvatar name={m.name} />}
                        <span className="font-medium text-gray-900">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.designation || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{m.division || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{m.region || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{m.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {m.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(m)} className="text-gray-400 hover:text-[#00793A] transition-colors p-1 rounded hover:bg-green-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg>
                        </button>
                        <button onClick={() => handleDelete(m.id)} disabled={deleting === m.id} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editing ? "Edit Member" : "Add Team Member"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: "Full Name *", key: "name", placeholder: "e.g. Rajesh Subramaniam" },
                { label: "Designation", key: "designation", placeholder: "e.g. Regional Sales Manager" },
                { label: "Phone", key: "phone", placeholder: "+91 98400 XXXXX" },
                { label: "Email", key: "email", placeholder: "name@sharonply.com" },
                { label: "Photo URL", key: "photo_url", placeholder: "https://..." },
                { label: "LinkedIn URL", key: "linkedin", placeholder: "https://linkedin.com/in/..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    value={(form as Record<string, unknown>)[key] as string ?? ""}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value || null }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Division</label>
                  <select value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00793A]/30">
                    {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Territory</label>
                  <input list="territory-options" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                    placeholder="e.g. Madurai"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00793A]/30" />
                  <datalist id="territory-options">
                    {Array.from(new Set(team.map(m => m.region).filter(Boolean))).sort().map(r => <option key={r} value={r} />)}
                  </datalist>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cities covered</label>
                <textarea value={form.cities} onChange={e => setForm(f => ({ ...f, cities: e.target.value }))}
                  rows={3} placeholder="e.g. Madurai, Dindigul, Theni"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30" />
                <p className="text-xs text-gray-500 mt-1">Separate cities with commas. Plywood members appear on the Sales Team page under each city listed.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" value={form.sort_order ?? 0}
                    onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" id="activeTeam" checked={!!form.active}
                    onChange={e => setForm(f => ({ ...f, active: e.target.checked ? 1 : 0 }))}
                    className="w-4 h-4 accent-[#00793A]" />
                  <label htmlFor="activeTeam" className="text-sm text-gray-700">Active</label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name}
                className="flex-1 bg-[#00793A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#006830] disabled:opacity-60">
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
