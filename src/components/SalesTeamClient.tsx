"use client";

import { useState, useMemo } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import type { SalesPerson } from "@/data/salesTeam";

const HERO = "/images/2026/pages/sales-team-hero.webp";

/* One card per sales person per city they cover, as in the client's mapping sheet. */
interface TeamMember {
  name: string;
  designation: string;
  phone: string;
  email: string;
  city: string;
  territory: string;
}

type Division = "Plywood" | "Veneer";

function getAvatarColor(name: string) {
  const palette = ["#00793A","#1565c0","#7b1fa2","#e65100","#006064","#880e4f","#1b5e20","#bf360c","#4a148c","#01579b","#33691e","#b71c1c","#004d40","#1a237e","#3e2723","#00695c","#5d4037","#37474f","#0d47a1","#827717"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

export default function SalesTeamClient({ team }: { team: SalesPerson[] }) {
  const plywoodTeam = useMemo<TeamMember[]>(
    () => team
      .filter(p => p.division === "Plywood")
      .flatMap(p => p.cities.map(city => ({ name: p.name, designation: p.designation, phone: p.phone, email: p.email, city, territory: p.territory }))),
    [team],
  );
  const veneerContacts = useMemo<TeamMember[]>(
    () => team
      .filter(p => p.division === "Veneer")
      .map(p => ({ name: p.name, designation: p.designation, phone: p.phone, email: p.email, city: p.cities[0] ?? "Tamil Nadu", territory: p.territory })),
    [team],
  );
  const cities = useMemo(() => Array.from(new Set(plywoodTeam.map(m => m.city))).sort(), [plywoodTeam]);

  const [division, setDivision] = useState<Division>("Plywood");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (division === "Veneer") return veneerContacts;
    if (!city && !search.trim()) return [];
    let results = plywoodTeam;
    if (city) {
      results = results.filter(m => m.city === city);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        "plywood".includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.territory.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    }
    return results;
  }, [plywoodTeam, veneerContacts, division, city, search]);

  const handleDivisionChange = (d: Division) => {
    setDivision(d);
    setCity("");
    setSearch("");
  };

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Sales Team" }]}
      title="Our Sales Team"
      subtitle="Dedicated professionals across Tamil Nadu ready to assist you"
      heroImage={HERO}
    >
      {/* ── Filters ── */}
      <section className="sticky top-16 lg:top-24 z-30 bg-white border-b border-gray-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 items-end">
            {/* 1. Division */}
            <div className="relative">
              <select
                value={division}
                onChange={e => handleDivisionChange(e.target.value as Division)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none transition-all bg-white appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="Plywood">Plywood</option>
                <option value="Veneer">Veneer</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {/* 2. State */}
            <div className="relative">
              <select
                value="Tamil Nadu"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 bg-gray-50 appearance-none cursor-not-allowed min-w-[160px]"
              >
                <option>Tamil Nadu</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {/* 3. City */}
            <div className="relative">
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                disabled={division === "Veneer"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none transition-all bg-white appearance-none cursor-pointer min-w-[180px] disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {/* 4. Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by name or division..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                disabled={division === "Veneer"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00793A] focus:ring-2 focus:ring-[#00793A]/10 transition-all disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-14 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {division === "Veneer" ? (
                <>Showing our dedicated <span className="font-semibold text-[#00793A]">Decorative Veneer</span> contact</>
              ) : filtered.length > 0 ? (
                <>Showing <span className="font-semibold text-[#00793A]">{filtered.length}</span> {filtered.length === 1 ? "member" : "members"}
                {city && <span> in <span className="font-semibold">{city}</span></span>}</>
              ) : (
                <span className="text-gray-400">Select a city or search to browse team members</span>
              )}
            </p>
            {division === "Plywood" && (city || search.trim()) && (
              <button onClick={() => { setCity(""); setSearch(""); }}
                className="text-xs text-[#00793A] hover:underline font-medium">
                Clear filters
              </button>
            )}
          </div>

          {division === "Plywood" && filtered.length === 0 && !city && !search.trim() ? (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <p className="text-gray-500 font-medium">Select a city or search to view team members</p>
              <p className="text-gray-400 text-sm mt-1">Choose a location from the dropdown above to find your regional sales contact</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="text-gray-500 font-medium">No team members found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or city filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((m, i) => <MemberCard key={m.name + m.city + i} member={m} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-2">Get In Touch</p>
          <h2 className="text-2xl font-bold text-[#020202] mb-3">Can&apos;t find the right contact?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">Reach our central office and we&apos;ll connect you with the right person for your region and requirements.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90" style={{ background: "#00793A" }}>
              Contact Us
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}

function MemberCard({ member: m }: { member: TeamMember }) {
  const avatarColor = getAvatarColor(m.name);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${avatarColor}, #00793A)` }} />

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-[14px] font-bold text-[#020202] leading-tight">{m.name}</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">{m.designation}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{m.city}</p>
        </div>

        <div className="space-y-2.5">
          <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 group/link">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#e8f5ee" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <span className="text-[12.5px] text-gray-700 group-hover/link:text-[#00793A] transition-colors font-medium">{m.phone}</span>
          </a>

          <a href={`mailto:${m.email}`} className="flex items-center gap-2.5 group/link">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#eff6ff" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <span className="text-[12px] text-gray-600 group-hover/link:text-[#1d4ed8] transition-colors truncate">{m.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
