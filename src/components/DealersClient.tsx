"use client";

import { useState, useMemo } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import type { Dealer } from "@/data/dealers";

const HERO = "/images/2026/pages/dealers-hero.webp";

const G = "#00793A";

/* ─────────────────────────────────────────────
   Division filter
───────────────────────────────────────────── */
const DIVISIONS_LIST = ["Plywood", "Veneer"] as const;
type DivisionKey = typeof DIVISIONS_LIST[number];

function matchesDivision(dealer: Dealer, division: DivisionKey) {
  return dealer.division === division || dealer.division === "Plywood / Veneer";
}

function displayDealerName(name: string) {
  return name.replace(/^(M\/s\.|Mr\.|Mrs\.|Ms\.)\s*/i, "").trim();
}

function displayContact(contact?: string) {
  if (!contact) return "";
  return contact.replace(/^(M\/s\.|Mr\.|Mrs\.|Ms\.)\s*/i, "").trim();
}

function mapsUrl(dealer: Dealer) {
  const query = `${dealer.name.replace(/^M\/s\.\s*/i, "")}, ${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.pincode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function DealersClient({ dealers }: { dealers: Dealer[] }) {
  const [division, setDivision] = useState<DivisionKey>("Plywood");
  const [activeState, setActiveState] = useState<string>("Tamil Nadu");
  const [cityFilter, setCityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const handleDivisionChange = (d: DivisionKey) => {
    setDivision(d);
    setCityFilter("All");
    setSearch("");
    setCommittedSearch("");
    setSearched(false);
  };

  const handleStateChange = (s: string) => {
    setActiveState(s);
    setCityFilter("All");
    setSearch("");
    setCommittedSearch("");
    setSearched(false);
  };

  const handleCityChange = (city: string) => {
    setCityFilter(city);
    setSearched(city !== "All");
  };

  const handleSearch = () => {
    setCommittedSearch(search.trim());
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setSearch("");
    setCommittedSearch("");
    setCityFilter("All");
    setSearched(false);
  };

  const statesList = useMemo(() => Array.from(new Set(dealers.map(d => d.state))).sort(), [dealers]);
  const cities = useMemo(
    () => Array.from(new Set(dealers.filter(d => d.state === activeState).map(d => d.city))).sort(),
    [dealers, activeState],
  );

  const filtered = useMemo(() => {
    if (!searched) return [];

    const q = committedSearch.toLowerCase().trim();

    return dealers
      .filter(d => {
        if (!matchesDivision(d, division)) return false;
        if (d.state !== activeState) return false;
        if (cityFilter !== "All" && d.city !== cityFilter) return false;
        if (q) {
          return (
            displayDealerName(d.name).toLowerCase().includes(q) ||
            d.city.toLowerCase().includes(q) ||
            d.contacts.some(c => displayContact(c).toLowerCase().includes(q)) ||
            d.address.toLowerCase().includes(q) ||
            d.phones.some(p => p.includes(q)) ||
            d.emails.some(e => e.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [dealers, division, activeState, cityFilter, committedSearch, searched]);


  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Find a Dealer" }]}
      title="Find a Dealer"
      subtitle="Locate authorised SharonPly dealers across Tamil Nadu and Puducherry"
      heroImage={HERO}
    >


      {/* ── Filters bar ── */}
      <section className="sticky top-16 lg:top-24 z-30 bg-white border-b border-gray-100 shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">

            {/* Division dropdown */}
            <div className="relative">
              <select
                value={division}
                onChange={e => handleDivisionChange(e.target.value as DivisionKey)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                {DIVISIONS_LIST.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            {/* State dropdown */}
            <div className="relative">
              <select
                value={activeState}
                onChange={e => handleStateChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                {statesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            {/* City dropdown */}
            <div className="relative">
              <select
                value={cityFilter}
                onChange={e => handleCityChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search dealer or city…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>

            {/* Search button */}
            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: G }}
              >
                Search
              </button>
            </div>

          </div>

          {searched && (
            <div className="flex items-center justify-end mt-2.5">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-medium text-[#00793A] hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>
      {/* ── Dealer grid ── */}
      <section className="py-12 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {!searched ? (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="text-gray-500 font-medium">Select a city or search to find dealers</p>
              <p className="text-gray-400 text-sm mt-1">Enter a dealer or city name and click Search, or choose a city from the dropdown</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="text-gray-500 font-medium">No dealers found</p>
              <p className="text-gray-400 text-sm mt-1">Try changing the city or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {filtered.map((d, i) => (
                <DealerCard key={`${d.name}-${i}`} dealer={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-2">Can't Find One?</p>
          <h2 className="text-2xl font-bold text-[#020202] mb-3">Looking for a dealer in your area?</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">If you don't find a dealer near you, contact our sales team directly. We'll help you locate the nearest authorised partner.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact/sales-team" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90" style={{ background: G }}>
              Talk to Sales Team
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}

/* ── Dealer Card ── */

function DealerCard({ dealer: d }: { dealer: Dealer }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="p-5 flex flex-col gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[12.5px] font-bold text-[#020202] leading-tight">
              {displayDealerName(d.name)}
            </h3>
            <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "#e8f5ee", color: G }}>
              {d.division}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{d.city}, {d.state}</p>
        </div>

        {d.contacts.length > 0 && (
          <p className="text-[12px] text-gray-700 font-medium leading-snug">
            {d.contacts.map(displayContact).join(", ")}
          </p>
        )}

        <div className="flex flex-col gap-0.5">
          {d.phones.map((p, i) => {
            const telHref = p.replace(/[^+\d]/g, "");
            return (
              <a key={i} href={`tel:${telHref}`} className="text-[12px] text-gray-700 hover:text-[#00793A] transition-colors font-medium">
                {p}
              </a>
            );
          })}
        </div>

        {d.emails.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {d.emails.map((e, i) => (
              <a key={i} href={`mailto:${e}`} className="text-[11px] text-gray-500 hover:text-[#00793A] transition-colors break-all">
                {e}
              </a>
            ))}
          </div>
        )}

        <p className="text-[11px] text-gray-500 leading-relaxed">
          {d.address}, {d.city} — {d.pincode}
        </p>

        <a
          href={mapsUrl(d)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11.5px] font-bold mt-1 transition-colors"
          style={{ color: G }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}
