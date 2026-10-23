"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const allProducts = [
  { name: "Sharon Platinum Ply",       href: "/plywood/sharon-platinum-ply",           tags: ["plywood","bwp","virasafe","firesave","premium","waterproof","termite"] },
  { name: "Sharon Gold",               href: "/plywood/sharon-gold-marine-plywood",     tags: ["plywood","bwp","marine","gold","waterproof","termite"] },
  { name: "Sharon Prima Armor",        href: "/plywood/sharon-prima-710",               tags: ["plywood","commercial","furniture","is710"] },
  { name: "Sovereign 710",             href: "/plywood/sovereign-710",                  tags: ["plywood","bwp","waterproof","calibrated","sovereign"] },
  { name: "Kumki OEM BWP Ply",         href: "/plywood/kumki-oem-bwp-ply",             tags: ["plywood","bwp","oem","modular","kumki"] },
  { name: "Sovereign MR",              href: "/plywood/sovereign-mr",                   tags: ["plywood","mr","moisture","interior","sovereign"] },
  { name: "Sharon GOLD Door",          href: "/door/sharon-gold-door",                  tags: ["door","bwp","flush","termite","waterproof","gold","warranty"] },
  { name: "Sovereign BWP Doors",       href: "/door/sovereign-bwp-doors",              tags: ["door","bwp","flush","termite","waterproof"] },
  { name: "Sovereign Door",            href: "/door/sovereign-door",                    tags: ["door","flush","interior","sovereign"] },
  { name: "Flush Doors",               href: "/door/flush-doors",                       tags: ["door","flush","mr","interior"] },
  { name: "Natural Wood Veneer",       href: "/veneer/natural-wood-veneer",             tags: ["veneer","wood","natural","grain"] },
  { name: "Decorative Veneer",         href: "/veneer",                                 tags: ["veneer","decorative","interior"] },
  { name: "Teak Plywood",              href: "/teak",                                   tags: ["teak","plywood","hardwood"] },
];

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const lower = q.toLowerCase();

  const results = q
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.includes(lower))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00793A] mb-2">Search Results</p>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {q ? <>Results for &ldquo;<span className="text-[#00793A]">{q}</span>&rdquo;</> : "Search SharonPly"}
          </h1>
          {results.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">{results.length} product{results.length !== 1 ? "s" : ""} found</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((p) => (
              <Link key={p.href} href={p.href}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#00793A]/30 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-gray-900 group-hover:text-[#00793A] transition-colors leading-snug">{p.name}</h2>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="flex-shrink-0 mt-0.5 text-gray-300 group-hover:text-[#00793A] group-hover:translate-x-0.5 transition-all">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <p className="text-xs text-gray-400 mt-2 capitalize">{p.href.split("/")[1]}</p>
              </Link>
            ))}
          </div>
        ) : q ? (
          <div className="text-center py-16">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className="mx-auto text-gray-200 mb-4">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8l6 6"/><path d="M14 8l-6 6"/>
            </svg>
            <p className="text-gray-500 font-medium">No results for &ldquo;{q}&rdquo;</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">Try searching for plywood, doors, veneer, or teak</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Plywood","Doors","Veneer","Teak"].map((cat) => (
                <Link key={cat} href={`/search?q=${cat.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[#00793A]/8 text-[#00793A] hover:bg-[#00793A]/15 transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p>Enter a search term above to find products.</p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Browse Categories</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "All Plywood", href: "/plywood" },
              { label: "Doors", href: "/door" },
              { label: "Veneer", href: "/veneer" },
              { label: "Teak", href: "/teak" },
              { label: "Find a Dealer", href: "/dealers" },
              { label: "Contact Us", href: "/contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-[#00793A] hover:text-[#00793A] transition-all">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center text-gray-400">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}
