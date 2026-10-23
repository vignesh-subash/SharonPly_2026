"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATES = ["Tamil Nadu", "Pondicherry", "Andhra Pradesh", "Telangana"];
const CITIES_BY_STATE: Record<string, string[]> = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli", "Vellore", "Erode"],
  "Pondicherry": ["Pondicherry"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
};
const DIVISIONS = ["Plywood", "Veneer", "Both"];

interface Dealer {
  id: number; name: string; contact_person: string; address: string;
  city: string; state: string; pincode: string; phone: string;
  email: string; website: string; division: string; lat: number | null;
  lng: number | null; active: number;
}

const empty: Omit<Dealer, "id"> = {
  name: "", contact_person: "", address: "", city: "", state: "Tamil Nadu",
  pincode: "", phone: "", email: "", website: "", division: "Both",
  lat: null, lng: null, active: 1,
};

export default function AdminDealersPage() {
  const router = useRouter();
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Dealer | null>(null);
  const [form, setForm] = useState<typeof empty>({ ...empty });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [loadError, setLoadError] = useState("");

  const fetchDealers = useCallback(async () => {
    const res = await fetch("/api/admin/dealers");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json().catch(() => ({}));
    setLoadError(res.ok ? "" : `Could not load from the database (${data.detail ?? "no details"}). Check DATABASE_URL on the hosting.`);
    setDealers(data.dealers ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchDealers(); }, [fetchDealers]);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); setShowModal(true); };
  const openEdit = (d: Dealer) => {
    setEditing(d);
    setForm({ name: d.name, contact_person: d.contact_person ?? "", address: d.address ?? "",
      city: d.city, state: d.state, pincode: d.pincode ?? "", phone: d.phone ?? "",
      email: d.email ?? "", website: d.website ?? "", division: d.division,
      lat: d.lat, lng: d.lng, active: d.active });
    setShowModal(true);
  };

  async function handleSave() {
    if (!form.name || !form.city || !form.state) return;
    setSaving(true);
    const payload = { ...form, active: !!form.active, contactPerson: form.contact_person };
    const url = editing ? `/api/admin/dealers/${editing.id}` : "/api/admin/dealers";
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.ok) { alert("The dealer could not be saved. Please try again."); return; }
    setShowModal(false);
    fetchDealers();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this dealer?")) return;
    setDeleting(id);
    await fetch(`/api/admin/dealers/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchDealers();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = dealers.filter(d =>
    !search || d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.city?.toLowerCase().includes(search.toLowerCase()) ||
    d.state?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          </Link>
          <img src="/images/sharon-corporate-logo.webp" alt="SharonPly" className="h-7 w-auto object-contain rounded" />
          <span className="font-semibold text-gray-900">Manage Dealers</span>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Logout</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <input
            type="text" placeholder="Search dealers…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30 w-full sm:w-64"
          />
          <button onClick={openAdd} className="flex items-center gap-2 bg-[#00793A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#006830] transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Add Dealer
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
                  {["Dealer Name", "City", "State", "Division", "Phone", "Status", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No dealers found</td></tr>
                ) : filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{d.name}</div>
                      {d.contact_person && <div className="text-xs text-gray-400">{d.contact_person}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.city}</td>
                    <td className="px-4 py-3 text-gray-600">{d.state}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        d.division === "Plywood" ? "bg-green-50 text-green-700 border-green-200" :
                        d.division === "Veneer" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>{d.division}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{d.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {d.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(d)} className="text-gray-400 hover:text-[#00793A] transition-colors p-1 rounded hover:bg-green-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg>
                        </button>
                        <button onClick={() => handleDelete(d.id)} disabled={deleting === d.id} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editing ? "Edit Dealer" : "Add New Dealer"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: "Dealer Name *", key: "name", placeholder: "e.g. Sri Lakshmi Timber" },
                { label: "Contact Person(s)", key: "contact_person", placeholder: "e.g. Mr. Rajan Kumar, Mr. Arun" },
                { label: "Address", key: "address", placeholder: "Street address" },
                { label: "Pincode", key: "pincode", placeholder: "e.g. 600002" },
                { label: "Phone(s)", key: "phone", placeholder: "e.g. 044 - 2XXXXXXX, +91 98400 XXXXX" },
                { label: "Email(s)", key: "email", placeholder: "e.g. dealer@gmail.com" },
                { label: "Website", key: "website", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    value={(form as Record<string, unknown>)[key] as string ?? ""}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500">Separate multiple contacts, phones or emails with commas.</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
                  <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value, city: "" }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30 bg-white">
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                  {/* Free text: dealers are in many towns; known cities are offered as suggestions. */}
                  <input list="dealer-city-options" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="Type or pick a city"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30 bg-white" />
                  <datalist id="dealer-city-options">
                    {Array.from(new Set([
                      ...(CITIES_BY_STATE[form.state] ?? []),
                      ...dealers.filter(d => d.state === form.state).map(d => d.city),
                    ])).sort().map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Division</label>
                  <select value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/30 bg-white">
                    {DIVISIONS.map(d => <option key={d} value={d}>{d === "Both" ? "Plywood & Veneer" : d}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" id="active" checked={!!form.active}
                    onChange={e => setForm(f => ({ ...f, active: e.target.checked ? 1 : 0 }))}
                    className="w-4 h-4 accent-[#00793A]" />
                  <label htmlFor="active" className="text-sm text-gray-700">Active</label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.city}
                className="flex-1 bg-[#00793A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#006830] transition-colors disabled:opacity-60">
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Dealer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
