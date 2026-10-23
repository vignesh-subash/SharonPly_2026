"use client";

import { useState, useMemo } from "react";
import {
  MediaPreviewModal,
  PdfPreviewContent,
} from "@/components/MediaPreviewModal";

interface CatalogueItem {
  name: string;
  category: string;
  desc: string;
  pdfUrl: string;
  cover?: string;
  productLink?: string;
  productLabel?: string;
}

const catalogues: CatalogueItem[] = [
  {
    name: "Sharon Plywood Products",
    category: "Plywood",
    desc: "Complete SharonPly plywood product catalogue covering BWP, MR, and specialty grades.",
    pdfUrl: "/pdfs/sharon-plywood-products.pdf",
    productLabel: "View Plywood",
    productLink: "/plywood",
  },
  {
    name: "Sharon Exoti Natura",
    category: "Veneer",
    desc: "Sharon Exoti Natura catalogue with natural veneer species and finish options.",
    pdfUrl: "/pdfs/sharon-exoti-natura.pdf",
    productLabel: "Explore Exoti Natura",
    productLink: "/veneer/exotic-natura",
  },
  {
    name: "Sharon Exoti Aura",
    category: "Veneer",
    desc: "Sharon Exoti Aura catalogue with reconstituted veneer shades and applications.",
    pdfUrl: "/pdfs/sharon-exoti-aura.pdf",
    productLabel: "Explore Exoti Aura",
    productLink: "/veneer/sharon-exoti-aura",
  },
];

const FILTERS = ["All", "Plywood", "Veneer"];

const CATEGORY_COLORS: Record<string, { bg: string; light: string; border: string; gradient: string }> = {
  Plywood: { bg: "#8B5E3C", light: "#f8f3ef", border: "#ddd0c4", gradient: "from-[#8B5E3C] to-[#6b4730]" },
  Veneer: { bg: "#2E6B5E", light: "#eff8f5", border: "#c4ddd4", gradient: "from-[#2E6B5E] to-[#1e4f44]" },
};

const PDF_ICON = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default function CatalogueClient() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [preview, setPreview] = useState<CatalogueItem | null>(null);

  const filtered = useMemo(() => {
    return catalogues.filter((c) => {
      const matchFilter = activeFilter === "All" || c.category === activeFilter;
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <>
      {/* Search & Filters */}
      <section className="py-8 bg-white border-b border-[#e8ece9]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search catalogues, brochures, plywood, veneer, doors..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e0e4e0] bg-[#fafafa] text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all"
              />
            </div>
          </div>
          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-semibold px-4 py-2.5 min-h-11 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-[#00793A] text-white border-[#00793A] shadow-sm"
                    : "bg-white text-[#5a5a5a] border-[#e0e4e0] hover:border-[#00793A] hover:text-[#00793A]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Catalogues Grid */}
      <section className="py-14 bg-white" id="catalogues">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#020202]">Product Catalogues & Brochures</h1>
            <p className="text-[#5a5a5a] text-sm mt-2 max-w-xl mx-auto">Browse and download catalogues by product category</p>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#9ca3af] text-sm">No catalogues found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cat, i) => {
                const colors = CATEGORY_COLORS[cat.category] || CATEGORY_COLORS.Plywood;
                return (
                  <div
                    key={i}
                    className="group rounded-2xl border border-[#e8ece9] bg-white overflow-hidden hover:shadow-lg hover:border-[#d0e0d4] transition-all duration-300 flex flex-col"
                  >
                    {/* Cover Area */}
                    <div className={`relative h-44 bg-gradient-to-br ${colors.gradient} flex items-center justify-center overflow-hidden`}>
                      {/* Decorative circles */}
                      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/5" />
                      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5" />
                      <div className="relative text-white/90">{PDF_ICON}</div>
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                          {cat.category}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-sm text-[#1a1a1a] leading-snug mb-2">{cat.name}</h3>
                      <p className="text-xs text-[#5a5a5a] leading-relaxed flex-1">{cat.desc}</p>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#e8ece9]">
                        <button
                          onClick={() => setPreview(cat)}
                          className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg border border-[#e0e4e0] text-[#555] hover:bg-[#f5f5f5] hover:border-[#ccc] transition-all flex items-center justify-center gap-1.5"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          Preview
                        </button>
                        <a
                          href={cat.pdfUrl}
                          download
                          className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg text-white transition-all flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: colors.bg }}
                          onMouseOver={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                          onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Download
                        </a>
                      </div>
                      {cat.productLink && (
                        <a
                          href={cat.productLink}
                          className="text-[10px] font-semibold text-[#00793A] hover:underline mt-3 inline-block text-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {cat.productLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PDF Preview Modal */}
      <MediaPreviewModal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.name ?? ""}
        badge={preview?.category}
        maxWidth={960}
        headerActions={
          preview ? (
            <a
              href={preview.pdfUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#00793A] px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors hover:bg-[#005c2c]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </a>
          ) : undefined
        }
      >
        {preview && <PdfPreviewContent src={preview.pdfUrl} title={preview.name} />}
      </MediaPreviewModal>
    </>
  );
}