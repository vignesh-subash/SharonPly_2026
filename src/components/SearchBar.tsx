"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const PLACEHOLDER = "Search plywood, veneer, doors, dealers, certificates...";

const QUICK_RESULTS = [
  { name: "Sharon PlatinumPly",     href: "/plywood/sharon-platinum-ply" },
  { name: "SharonGold",             href: "/plywood/sharon-gold-marine-plywood" },
  { name: "Sovereign 710",          href: "/plywood/sovereign-710" },
  { name: "Veneer",                 href: "/veneer" },
  { name: "Doors",                  href: "/door" },
  { name: "Find Dealer",            href: "/dealers", icon: "📍" },
  { name: "Catalogue",              href: "/catalogue" },
  { name: "E-Zero",                 href: "/e-zero-emission", tag: "Technology" },
  { name: "FIRESAVE",               href: "/sharon-firesave", tag: "Technology" },
];

const allSearchable = [
  { name: "Sharon PlatinumPly",     href: "/plywood/sharon-platinum-ply",           keywords: ["plywood","bwp","premium","platinum","waterproof"] },
  { name: "SharonGold",             href: "/plywood/sharon-gold-marine-plywood",     keywords: ["plywood","bwp","marine","gold","waterproof"] },
  { name: "Sharon Prima Armor",     href: "/plywood/sharon-prima-710",               keywords: ["plywood","prima","armor","is710"] },
  { name: "Sovereign 710",          href: "/plywood/sovereign-710",                  keywords: ["plywood","sovereign","waterproof","calibrated"] },
  { name: "Kumki OEM BWP Ply",      href: "/plywood/kumki-oem-bwp-ply",             keywords: ["plywood","kumki","oem","bwp"] },
  { name: "Sovereign MR",           href: "/plywood/sovereign-mr",                   keywords: ["plywood","mr","moisture","sovereign"] },
  { name: "Veneer",                 href: "/veneer",                                 keywords: ["veneer","natural","reconstituted","wood"] },
  { name: "Sharon Exoti Natura",    href: "/veneer/exotic-natura",                   keywords: ["veneer","natural","natura","exoti"] },
  { name: "Sharon Exoti Aura",      href: "/veneer/sharon-exoti-aura",               keywords: ["veneer","aura","exoti","reconstituted"] },
  { name: "Doors",                  href: "/door",                                   keywords: ["door","flush","bwp"] },
  { name: "Sharon GOLD Door",       href: "/door/sharon-gold-door",                  keywords: ["door","gold","flush","bwp"] },
  { name: "Sovereign Door",         href: "/door/sovereign-door",                    keywords: ["door","sovereign","flush"] },
  { name: "Find Dealer",            href: "/dealers",                                keywords: ["dealer","find","location"] },
  { name: "Catalogue",              href: "/catalogue",                              keywords: ["catalogue","brochure","download"] },
  { name: "E-Zero",                 href: "/e-zero-emission",                        keywords: ["technology","ezero","emission","zero","eco"] },
  { name: "FIRESAVE",               href: "/sharon-firesave",                        keywords: ["technology","fire","save","safety","retardant"] },
  { name: "VIRASAFE",               href: "/virasafe",                               keywords: ["technology","virus","antiviral","safe","health"] },
  { name: "Sharon Secure",          href: "/sharonsecureapp",                        keywords: ["technology","secure","app","qr","authentic"] },
  { name: "Kyoto Pro-Tech",         href: "/technology",                             keywords: ["technology","kyoto","japanese","bonding"] },
  { name: "Teak",                   href: "/teak",                                   keywords: ["teak","hardwood","wood"] },
  { name: "Plywood",                href: "/plywood",                                keywords: ["plywood","bwp","all"] },
  { name: "Contact Us",             href: "/contact",                                keywords: ["contact","support","help","enquiry"] },
];

export default function SearchBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Open overlay and focus input
  const openSearch = () => {
    setIsOpen(true);
    setHighlightIndex(-1);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setHighlightIndex(-1);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const lower = query.toLowerCase().trim();

  // Filter quick results by query
  const filteredQuick = query
    ? QUICK_RESULTS.filter((r) => r.name.toLowerCase().includes(lower))
    : QUICK_RESULTS;

  // Full search results when typing
  const searchResults = query
    ? allSearchable.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.keywords.some((k) => k.includes(lower))
      )
    : [];

  const allItems = query ? searchResults : filteredQuick;

  const handleSelect = (item: typeof allItems[number]) => {
    closeSearch();
    router.push(item.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < allItems.length) {
        handleSelect(allItems[highlightIndex]);
      } else if (query.trim()) {
        closeSearch();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <>
      {/* ── Search icon button (always visible) ── */}
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-full transition-all duration-200 hover:bg-[#00793A]/5 group w-full"
        style={{
          border: "1.5px solid rgba(0,121,58,0.15)",
        }}
        aria-label="Open search"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00793A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="text-xs font-medium text-[#8a9a90] group-hover:text-[#00793A] transition-colors">
          Search
        </span>
      </button>

      {/* ── Full-width overlay ── */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "rgba(0,0,0,0.35)" }}
          onClick={(e) => { if (e.target === overlayRef.current) closeSearch(); }}
        >
          <style>{`
            @keyframes searchOverlayIn {
              0%   { opacity: 0; transform: translateY(-16px) scale(0.98); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes searchFadeIn {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }
            .so-in { animation: searchOverlayIn 0.35s cubic-bezier(0.34,1.2,0.64,1) forwards; }
            .so-fade { animation: searchFadeIn 0.3s ease 0.15s both; }
          `}</style>

          {/* Overlay panel */}
          <div
            className="so-in"
            style={{
              background: "#fff",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            }}
          >
            <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
              {/* Search input row */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8a9a90"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setHighlightIndex(-1); }}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDER}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-base font-medium outline-none transition-shadow"
                    style={{
                      background: "#f5f7f5",
                      border: "1.5px solid transparent",
                      color: "#1a1a1a",
                      boxShadow: query ? "0 0 0 2px rgba(0,121,58,0.15)" : "none",
                    }}
                  />
                </div>
                <button
                  onClick={closeSearch}
                  className="flex-shrink-0 px-4 py-3.5 rounded-xl text-sm font-bold transition-colors hover:bg-gray-100"
                  style={{ color: "#5a5a5a" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Results */}
              <div className="so-fade" style={{ marginTop: query ? 20 : 24 }}>
                {allItems.length > 0 ? (
                  <>
                    {/* Section label */}
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "#8a9a90" }}>
                      {query ? "Search Results" : "Quick Results"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {allItems.map((item, i) => {
                        const hl = highlightIndex === i;
                        const isDealer = "icon" in item && item.icon;
                        return (
                          <button
                            key={item.name}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setHighlightIndex(i)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                            style={{
                              background: hl ? "rgba(0,121,58,0.08)" : "#f5f7f5",
                              color: hl ? "#00793A" : "#4a4a4a",
                              border: `1px solid ${hl ? "rgba(0,121,58,0.2)" : "transparent"}`,
                            }}
                          >
                            {isDealer && <span style={{ fontSize: 14 }}>📍</span>}
                            {"tag" in item && item.tag && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: "rgba(0,121,58,0.1)", color: "#00793A" }}>
                                {item.tag}
                              </span>
                            )}
                            {item.name}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : query ? (
                  <div className="text-center py-8">
                    <p className="text-sm font-medium text-gray-400">No results for &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-gray-300 mt-1">Try searching for plywood, doors, or veneer</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Footer hint */}
            <div className="max-w-4xl mx-auto px-4 lg:px-8 pb-4 flex items-center gap-3 text-[10px] text-gray-400">
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500" style={{ fontFamily: "var(--font-brand)" }}>↑↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500" style={{ fontFamily: "var(--font-brand)" }}>↵</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500" style={{ fontFamily: "var(--font-brand)" }}>Esc</kbd> Close</span>
            </div>
          </div>

          {/* Backdrop click to close */}
          <div className="flex-1" onClick={closeSearch} />
        </div>
      )}
    </>
  );
}
