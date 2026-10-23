"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import CalendarCoverImage from "@/components/CalendarCoverImage";

const HERO = "/images/2026/pages/calendar-hero.webp";

const CALENDAR_PDFS: Record<number, string> = {
  2005: "Calendar 2005.pdf",
  2006: "Calendar 2006.pdf",
  2007: "Calendar 2007_compressed.pdf",
  2008: "Calendar 2008.pdf",
  2009: "Calendar 2009.pdf",
  2010: "Calendar 2010.pdf",
  2011: "Calendar 2011_compressed.pdf",
  2012: "Calendar 2012.pdf",
  2013: "Calendar 2013.pdf",
  2014: "Calendar 2014_compressed.pdf",
  2015: "Calendar 2015.pdf",
  2016: "Calendar 2016.pdf",
  2017: "Calendar 2017.pdf",
  2018: "Calendar 2018.pdf",
  2019: "Calendar 2019 .pdf",
  2020: "Calendar 2020.pdf",
  2021: "Calendar 2021.pdf",
  2022: "Calendar 2022.pdf",
  2023: "Calendar 2023.pdf",
  2024: "Calendar 2024.pdf",
  2025: "Calendar 2025.pdf",
  2026: "Calendar 2026.pdf",
};

function calendarAssetUrl(year: number, filename: string) {
  return `/images/Calendar/${year}/${encodeURIComponent(filename)}`;
}

/** Static cover images where page exports already exist in the repo. */
const CALENDAR_COVER_IMAGES: Partial<Record<number, string>> = {
  2026: calendarAssetUrl(2026, "Calendar sharonPly TTC 2026 - page - 1.jpg"),
  2025: calendarAssetUrl(2025, "Front Cover Page 1.png"),
  2024: calendarAssetUrl(2024, "SharonPly TTC - 1.png"),
  2023: calendarAssetUrl(2023, "SharonPly TT calendar 2023 FINAL_pg-1.png"),
  2017: calendarAssetUrl(2017, "Sharon_Calendar_2017_Front Page_1.jpg"),
  2012: calendarAssetUrl(2012, "1. January.jpg"),
};

function calendarPdfUrl(year: number, filename: string) {
  return `/images/Calendar/${year}/${encodeURIComponent(filename)}`;
}

const CALENDAR_DATA = Object.fromEntries(
  Object.entries(CALENDAR_PDFS).map(([year, filename]) => {
    const y = Number(year);
    const pdfFile = calendarPdfUrl(y, filename);
    const coverImage = CALENDAR_COVER_IMAGES[y];
    return [
      y,
      {
        coverImage,
        pdfFile,
      },
    ];
  }),
) as Record<number, { coverImage?: string; pdfFile: string }>;

const ACCENT_COLORS = [
  "#00793A", "#1565c0", "#6a1b9a", "#e65100", "#00695c",
  "#880e4f", "#1b5e20", "#bf360c", "#4a148c", "#01579b",
  "#33691e", "#b71c1c", "#004d40", "#1a237e", "#3e2723",
  "#006064", "#37474f", "#558b2f", "#c62828", "#283593", "#2e7d32",
  "#4527a0", "#ad1457",
];

const YEARS = Object.keys(CALENDAR_PDFS).map(Number).sort((a, b) => b - a);

const calendars = YEARS.map((year, i) => ({
  year,
  label: year >= 2023 ? `TTC ${year}` : `Edition ${year}`,
  color: ACCENT_COLORS[i % ACCENT_COLORS.length],
  data: CALENDAR_DATA[year],
  isNew: year === 2026,
}));

type CalendarItem = (typeof calendars)[number];

function CalendarCoverPreview({
  cal,
  onClose,
}: {
  cal: CalendarItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pdfPreviewUrl = `${cal.data.pdfFile}#view=FitH&toolbar=1&navpanes=0`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cal.year} calendar preview`}
    >
      <div
        className="relative flex w-full max-w-4xl max-h-[92vh] flex-col rounded-xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-2 px-4 py-3 border-b border-gray-100"
          style={{ borderTop: `3px solid ${cal.color}` }}
        >
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">SharonPly {cal.year}</p>
            <p className="text-xs text-gray-500 truncate">{cal.label}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            aria-label="Close preview"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18" /><path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="shrink-0 border-b border-gray-100 bg-gray-50 p-3 lg:w-52 lg:border-b-0 lg:border-r">
            <CalendarCoverImage
              year={cal.year}
              imageSrc={cal.data.coverImage}
              pdfSrc={cal.data.pdfFile}
              alt={`SharonPly ${cal.year} calendar cover`}
              className="w-full rounded-md overflow-hidden mx-auto"
              style={{ aspectRatio: "var(--ratio-doc)", maxWidth: 200 }}
              priority
            />
            <p className="mt-2 text-center text-[10px] text-gray-400 uppercase tracking-wider">Cover</p>
          </div>

          <div className="min-h-0 flex-1 bg-gray-100 p-2 sm:p-3">
            <iframe
              src={pdfPreviewUrl}
              title={`SharonPly ${cal.year} calendar PDF preview`}
              className="h-full min-h-[50vh] w-full rounded-md border border-gray-200 bg-white lg:min-h-[480px]"
            />
          </div>
        </div>

        <div className="flex shrink-0 gap-2 border-t border-gray-100 bg-white p-3">
          <a
            href={cal.data.pdfFile}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: cal.color }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Full PDF
          </a>
          <a
            href={cal.data.pdfFile}
            download
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold border transition-colors hover:bg-gray-50"
            style={{ borderColor: cal.color, color: cal.color }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [previewYear, setPreviewYear] = useState<number | null>(null);
  const previewCal = previewYear != null ? calendars.find((c) => c.year === previewYear) : null;

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "About Us", href: "/our-history" }, { label: "Calendar" }]}
      title="SharonPly Calendar"
      subtitle="View and download the latest SharonPly calendar."
      heroImage={HERO}
    >
      <section className="py-14 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffc107] mb-2">Browse</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]" id="view-calendar">View Calendar</h2>
            <p className="text-gray-400 text-sm mt-1">Browse covers or download the full PDF</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            {calendars.map((cal) => (
              <div
                key={cal.year}
                className="group relative bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.25s, transform 0.25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.13)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="slot-doc relative overflow-hidden">
                  <CalendarCoverImage
                    year={cal.year}
                    imageSrc={cal.data.coverImage}
                    pdfSrc={cal.data.pdfFile}
                    alt={`SharonPly ${cal.year} Calendar`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cal.color}e0 0%, ${cal.color}20 55%, transparent 100%)` }} />

                  {cal.isNew && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-[#020202]" style={{ background: "#ffc107" }}>New</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-black text-2xl leading-none">{cal.year}</p>
                    <p className="text-white/70 text-[9px] mt-0.5 uppercase tracking-wider">SharonPly · {cal.label}</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setPreviewYear(cal.year)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[11px] hover:scale-105 active:scale-95 transition-transform"
                      style={{ background: "rgba(255,255,255,0.96)", color: cal.color, backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", border: `1.5px solid ${cal.color}40` }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="p-3 mt-auto flex gap-2">
                  <button
                    onClick={() => setPreviewYear(cal.year)}
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-[11px] font-bold transition-all hover:opacity-80 border"
                    style={{ borderColor: cal.color, color: cal.color, background: `${cal.color}08` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    Preview
                  </button>
                  <a
                    href={cal.data.pdfFile}
                    target="_blank" rel="noopener noreferrer" download
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-[11px] font-bold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: cal.color, color: "#fff" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                  </a>
                </div>

              </div>
            ))}
          </div>

          {previewCal && (
            <CalendarCoverPreview cal={previewCal} onClose={() => setPreviewYear(null)} />
          )}
        </div>
      </section>

      <section className="py-14 bg-white" id="download">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-3">Download</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#020202] mb-4">Download SharonPly Calendar</h2>
          <p className="text-[#5a5a5a] text-sm max-w-md mx-auto mb-8">
            Download the latest SharonPly calendar for easy reference and offline use.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#view-calendar"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#00793A] hover:bg-[#005c2c] transition-all shadow-lg shadow-[#00793A]/20"
               onClick={(e) => {
                 e.preventDefault();
                 document.getElementById("view-calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
               }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Calendar
            </a>
          </div>
        </div>
      </section>

      <section className="py-6" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-1">Explore More</p>
            <h2 className="text-lg font-bold text-white">Discover SharonPly</h2>
            <p className="text-white/70 text-sm">Explore our products, latest stories, and get in touch.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-end w-full sm:w-auto">
            <Link href="/plywood" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">Explore Products</Link>
            <Link href="/blog" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">Visit Blog</Link>
            <Link href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">Contact SharonPly</Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
