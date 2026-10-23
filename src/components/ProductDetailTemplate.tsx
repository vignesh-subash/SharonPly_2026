"use client";

import { useState, useEffect, useLayoutEffect, useRef, type ReactElement } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import PlywoodSheetViewer, { SheetHotspot } from "./PlywoodSheetViewer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Types ───────────────────────────────────────────────── */
export interface ProductSpec    { label: string; value: string; }
export interface ProductFeature { title: string; description: string; icon: keyof typeof ICONS; }
export interface ProductFAQ     { q: string; a: string; }
export interface RelatedProduct { name: string; href: string; image: string; tag?: string; }
export interface FiresafeTest   { test: string; required: string; result: string; }
export interface ProductUSP     { icon: string; label: string; desc: string; }
export interface TechTableMultiRow { label: string; values: string[]; isHeader?: boolean; }
export interface TechTableRow   { label: string; value?: string; isGroup?: boolean; isSubHeader?: boolean; indent?: boolean; }

export interface ProductDetailProps {
  name: string;
  tagline: string;
  description: string;
  grade: string;
  gradeColor?: string;
  category?: { href: string; label: string };
  images: string[];
  badges?: string[];
  usps: ProductUSP[];
  technology?: string[];
  features: ProductFeature[];
  specifications: ProductSpec[];
  technicalTable?: TechTableRow[];
  technicalTableMulti?: TechTableMultiRow[];
  firesafeTests?: FiresafeTest[];
  blockboardNote?: string;
  /** Note lines shown under the spec table, worded as in the client's content document. */
  specFootnotes?: string[];
  applications: { name: string }[];
  sizes?: string[];
  thickness?: string[];
  faqs?: ProductFAQ[];
  relatedProducts?: RelatedProduct[];
  firesafe?: boolean;
  downloadLinks?: { label: string; href: string }[];
  sheetHotspots?: SheetHotspot[];
}

/* ─── Icons ───────────────────────────────────────────────── */
const ICONS = {
  droplet:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  shield:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  flame:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  leaf:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-3.8 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  layers:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  check:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  award:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  zap:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  bug:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2l1.5 1.5M14.5 3.5L16 2M9 9h6M9 12h6M12 3a5 5 0 00-5 5v3a5 5 0 0010 0V8a5 5 0 00-5-5z"/><path d="M4.5 8.5l-2-2M19.5 6.5l2-2M4 12H2M22 12h-2M4.5 16l-1.5 2M19.5 16l1.5 2"/></svg>,
  surface:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="22" height="22" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  tool:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
};

/* USP icon map */
const USP_ICONS: Record<string, ReactElement> = {
  virasafe:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  termite:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 2l1.5 1.5M14.5 3.5L16 2M9 9h6M9 12h6M12 3a5 5 0 00-5 5v3a5 5 0 0010 0V8a5 5 0 00-5-5z"/></svg>,
  calibrated: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="22" height="22" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  firesafe:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  emission:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-3.8 10-10 10z"/></svg>,
  fortified:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  authentic:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  certified:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  carb:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  centec:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  warranty:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  antifungal: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
};

const HIDDEN_USP_ICONS = new Set(["fortified", "antifungal"]);

function normalizeProductCopy(text: string): string {
  return text.replace(/\s—\s/g, ", ");
}

const SPEC_TH = "border border-gray-200 px-3 py-2 text-left text-xs sm:text-[11px] font-bold text-[#00793A] uppercase tracking-wider bg-[#e6f4ed]";
const SPEC_TD = "border border-gray-200 px-3 py-2 text-left text-sm sm:text-[13px]";
const SPEC_TD_LABEL = `${SPEC_TD} text-[12px] font-bold text-gray-800`;
const SPEC_TD_VALUE = `${SPEC_TD} text-[12px] font-normal text-gray-600 whitespace-pre-line`;

const USP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  virasafe:   { bg: "#e8f5ee", text: "#00793A", border: "#00793A" },
  termite:    { bg: "#fef3c7", text: "#92400e", border: "#d97706" },
  calibrated: { bg: "#eff6ff", text: "#1d4ed8", border: "#3b82f6" },
  firesafe:   { bg: "#fff1f2", text: "#be123c", border: "#f43f5e" },
  emission:   { bg: "#f0fdf4", text: "#166534", border: "#22c55e" },
  fortified:  { bg: "#faf5ff", text: "#7e22ce", border: "#a855f7" },
  authentic:  { bg: "#e0f2fe", text: "#0369a1", border: "#0ea5e9" },
  certified:  { bg: "#fef9c3", text: "#713f12", border: "#eab308" },
  carb:       { bg: "#ecfdf5", text: "#065f46", border: "#10b981" },
  centec:     { bg: "#f0fdf4", text: "#166534", border: "#16a34a" },
  warranty:   { bg: "#fff7ed", text: "#9a3412", border: "#f97316" },
  antifungal: { bg: "#fdf4ff", text: "#6b21a8", border: "#c026d3" },
  droplet:    { bg: "#e0f2fe", text: "#0369a1", border: "#0ea5e9" },
  layers:     { bg: "#f3e8ff", text: "#6b21a8", border: "#a855f7" },
};


/** First-paint guess of the spec split (refined from measured heights on the client):
 *  smallest number of movable rows on the left that makes it at least as tall as the right. */
function estimateSpecSplit(structuralLines: number, rows: { label: string; value: string }[]): number {
  const rowH = (r: { label: string; value: string }) =>
    34 + 18 * Math.max(0, Math.ceil(r.value.length / 38) - 1, Math.ceil(r.label.length / 34) - 1);
  const hs = rows.map(rowH);
  const total = hs.reduce((a, b) => a + b, 0) + 30; // + "Available in Standard Sizes" note
  let left = structuralLines * 27;
  for (let b = 0; b < rows.length; b++) {
    if (left >= total - (left - structuralLines * 27)) return b;
    left += hs[b];
  }
  return Math.max(0, rows.length - 1);
}

/* ─── Component ───────────────────────────────────────────── */
export default function ProductDetailTemplate({
  name, tagline, description, grade, gradeColor = "#00793A",
  images, badges = [], usps, technology = [], features,
  specifications, technicalTable, technicalTableMulti, blockboardNote, specFootnotes = ["Available in Standard Sizes & Thickness*"], firesafeTests = [], applications, sizes = [], thickness = [],
  faqs = [], relatedProducts = [], firesafe = false,
  downloadLinks = [], sheetHotspots = [], category,
}: ProductDetailProps) {
  const [activeImg, setActiveImg]       = useState(0);
  const [showSticky, setShowSticky]     = useState(false);
  const [overFooter, setOverFooter]     = useState(false);
  const visibleUsps = usps.filter((u) => !HIDDEN_USP_ICONS.has(u.icon));
  const ctaRef      = useRef<HTMLDivElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goToImage = (next: number) => {
    if (images.length <= 1) return;
    setActiveImg((next + images.length) % images.length);
  };

  const onCarouselTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) goToImage(dx < 0 ? activeImg + 1 : activeImg - 1);
    touchStartX.current = null;
  };

  const renderGroupedTechTable = (rows: TechTableRow[], prefix: string) => {
    const els: React.ReactNode[] = [];
    let i = 0;
    while (i < rows.length) {
      const row = rows[i];
      if (row.isGroup) {
        // A strength group (e.g. Static Bending Strength → MoE / MoR → along / across)
        // reads as ONE merged label cell and ONE merged value cell. Each line is still
        // its own <tr> so values stay level with their labels when text wraps, but the
        // horizontal rules inside the block are dropped.
        const lines: { label: string; value: string; kind: "group" | "sub" | "item" }[] = [
          { label: row.label, value: "", kind: "group" },
        ];
        i++;
        while (i < rows.length && !rows[i].isGroup && (rows[i].isSubHeader || rows[i].indent)) {
          const r = rows[i];
          lines.push(r.isSubHeader
            ? { label: r.label, value: "", kind: "sub" }
            : { label: r.label, value: r.value ?? "—", kind: "item" });
          i++;
        }
        lines.forEach((line, j) => {
          const first = j === 0;
          const last = j === lines.length - 1;
          // Compact line rhythm inside the merged block (2px + 18px line) so the bending
          // table sits closer to the height of the test-results table beside it.
          const edge = `border-x border-gray-200 px-3 leading-[18px] ${first ? "border-t pt-2" : "pt-0.5"} ${last ? "border-b pb-2" : "pb-0.5"}`;
          const labelCls =
            line.kind === "group" ? "text-[15px] sm:text-base !leading-snug font-bold text-[#00793A]"
            : line.kind === "sub" ? "text-xs font-bold text-[#00793A] uppercase tracking-wider"
            : "text-sm font-bold text-gray-800 pl-6 sm:pl-8";
          els.push(
            <tr key={`${prefix}-g-${i}-${j}`}>
              <td className={`${edge} text-left ${labelCls}`} style={{ width: "60%" }}>{line.label}</td>
              <td className={`${edge} text-left text-[12px] font-normal text-gray-600`}>{line.value}</td>
            </tr>
          );
        });
      } else if (row.isSubHeader) {
        const leftItems: { label: string; isMain: boolean }[] = [{ label: row.label, isMain: true }];
        const rightItems: string[] = [];
        i++;
        while (i < rows.length && rows[i].indent && !rows[i].isSubHeader && !rows[i].isGroup) {
          leftItems.push({ label: rows[i].label, isMain: false });
          rightItems.push(rows[i].value ?? "—");
          i++;
        }
        els.push(
          <tr key={`${prefix}-m-${i}`}>
            <td className={`${SPEC_TD} align-top`} style={{ width: "60%" }}>
              {leftItems.map((item, j) => (
                <div key={j} className={item.isMain ? "text-xs font-bold text-[#00793A] uppercase tracking-wider mb-0.5" : "text-sm font-bold text-gray-800 pl-3 sm:pl-5 py-0.5"}>
                  {item.label}
                </div>
              ))}
            </td>
            <td className={`${SPEC_TD} align-top`}>
              <div className="h-[14px]"></div>
              {rightItems.map((val, j) => (
                <div key={j} className="text-[12px] font-normal text-gray-600 py-0.5">{val}</div>
              ))}
            </td>
          </tr>
        );
      } else {
        const r = rows[i];
        els.push(
          <tr key={`${prefix}-v-${i}`}>
            <td className={`${SPEC_TD_LABEL} ${r.indent ? "pl-9" : ""}`}>{r.label}</td>
            <td className={SPEC_TD_VALUE}>{r.value ?? "—"}</td>
          </tr>
        );
        i++;
      }
    }
    return els;
  };

  const renderTechnicalTableMulti = (rows: TechTableMultiRow[]) => {
    if (!rows.length) return null;
    const [header, ...dataRows] = rows;
    return (
      <>
        {dataRows.map((row, i) => (
          <tr key={`multi-${i}`}>
            <td className={SPEC_TD_LABEL}>{row.label || "—"}</td>
            {row.values.map((val, j) => (
              <td key={j} className={SPEC_TD_VALUE}>{val}</td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const multiTableHeader = technicalTableMulti?.[0];

  /* ── Spec table balancing ──
     Bending-strength groups (and their sub-rows) always sit in the left table.
     Every plain parameter row, from technicalTable and specifications alike, forms
     one ordered list that is split between the end of the left table and the
     right table. The split is chosen from measured row heights so the left table
     ends level with, or just below, the right one and neither shows empty space. */
  const techRows = technicalTable ?? [];
  const structuralRows = techRows.filter((r) => r.isGroup || r.isSubHeader || r.indent);
  const plainTechRows = techRows.filter((r) => !(r.isGroup || r.isSubHeader || r.indent));
  const movableRows = [
    ...plainTechRows.map((r) => ({ label: r.label, value: r.value ?? "—" })),
    ...specifications.map((s) => ({ label: normalizeProductCopy(s.label), value: normalizeProductCopy(s.value) })),
  ];
  const isMulti = Boolean(technicalTableMulti?.length);
  // Value columns in the left table: 1 normally, or one per size column (FF23 / FF30 …)
  // in a multi-column table, where a moved row's value spans them all.
  const leftValueCols = isMulti ? (technicalTableMulti?.[0]?.values.length ?? 1) : 1;
  const balanceTables = specifications.length > 0;
  const [split, setSplit] = useState(() =>
    balanceTables
      ? estimateSpecSplit(isMulti ? Math.max(0, (technicalTableMulti?.length ?? 1) - 1) * 1.6 : structuralRows.length, movableRows)
      : plainTechRows.length,
  );
  const specGridRef = useRef<HTMLDivElement>(null);
  const specFootRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const grid = specGridRef.current;
    if (!balanceTables || !grid) return;
    const rebalance = () => {
      // Side-by-side only from lg; when stacked, the split doesn't affect layout.
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const rowH = (el: Element) => el.getBoundingClientRect().height;
      const leftBody = grid.querySelector<HTMLTableSectionElement>("[data-spec-left] tbody");
      if (!leftBody) return;
      const groupsH = [...leftBody.rows].filter((r) => !r.dataset.mi).reduce((h, r) => h + rowH(r), 0);
      const heights = movableRows.map((_, i) => {
        const tr = grid.querySelector(`tr[data-mi="${i}"]`);
        return tr ? rowH(tr) : 0;
      });
      const foot = specFootRef.current ? rowH(specFootRef.current) : 0;
      const total = heights.reduce((a, b) => a + b, 0);
      // gap(b) = left height − right height with b movable rows on the left.
      const gap = (b: number) => {
        const moved = heights.slice(0, b).reduce((a, h) => a + h, 0);
        return groupsH + moved - (total - moved + foot);
      };
      let best = movableRows.length - 1;
      for (let b = 0; b < movableRows.length; b++) {
        if (gap(b) >= 0) { best = b; break; }
      }
      // Prefer the left table slightly taller, but if one row fewer leaves the right
      // only a hair taller (≤ 24px, under one row) and that is closer, take the near-equal split.
      if (best > 0 && -gap(best - 1) <= 24 && -gap(best - 1) < gap(best)) best -= 1;
      setSplit((cur) => (cur === best ? cur : best));
    };
    rebalance();
    const ro = new ResizeObserver(rebalance);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [balanceTables, movableRows.length]);

  const renderMovableRows = (from: number, to: number, valueCols = 1) =>
    movableRows.slice(from, to).map((row, k) => (
      <tr key={`mv-${from + k}`} data-mi={from + k}>
        <td className={SPEC_TD_LABEL}>{row.label}</td>
        <td className={SPEC_TD_VALUE} colSpan={valueCols > 1 ? valueCols : undefined}>{row.value}</td>
      </tr>
    ));

  useGSAP(() => {
    const left  = leftColRef.current;
    const right = rightColRef.current;
    if (!left || !right) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: left,
        start: "top 96px",
        endTrigger: left,
        end: "bottom bottom",
        pin: right,
        pinSpacing: false,
      });
    });
  }, {});

  /* auto-play carousel */
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActiveImg((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { threshold: 0 });
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="bg-white min-h-screen product-page-root"
      style={{
        paddingBottom: showSticky ? "calc(72px + env(safe-area-inset-bottom, 0px))" : "env(safe-area-inset-bottom, 0px)",
        transition: "padding-bottom 0.3s",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .product-spec-table { min-width: 0; }
        }
        @media (min-width: 768px) {
          .product-spec-table { min-width: 280px; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            description,
            brand: { "@type": "Brand", name: "SharonPly" },
            image: images[0]?.startsWith("http")
              ? images[0]
              : `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharonply.com"}${images[0]}`,
            category: category?.label ?? grade,
          }),
        }}
      />

      {/* BREADCRUMB */}
      <div className="border-b border-gray-100 bg-[#fafafa]">
        <div className="page-container py-3">
          <Breadcrumb
            items={[
              { label: category?.label ?? "Plywood", href: category?.href ?? "/plywood" },
              { label: name },
            ]}
          />
        </div>
      </div>

      {/* ── HERO: CAROUSEL + OVERVIEW ── */}
      <section className="page-container py-4 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 lg:gap-12">

          {/* Image Carousel */}
          <div>
            <div
              className="product-carousel slot-product relative rounded-2xl overflow-hidden bg-gray-50 group"
              onTouchStart={onCarouselTouchStart}
              onTouchEnd={onCarouselTouchEnd}
            >
              <img
                src={images[activeImg]}
                alt={name}
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-[1.03]"
                loading="eager"
              />
                            {images.length > 1 && (<>
                <button onClick={(e) => { e.stopPropagation(); goToImage(activeImg - 1); }}
                  className="flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/85 backdrop-blur-sm items-center justify-center shadow hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); goToImage(activeImg + 1); }}
                  className="flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/85 backdrop-blur-sm items-center justify-center shadow hover:bg-white transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </>)}
              </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 snap-start w-[72px] h-[54px] sm:w-[80px] sm:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-[#00793A] shadow-md" : "border-transparent opacity-50 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product overview */}
          <div className="flex flex-col" ref={ctaRef}>
                        <h1 className="text-2xl lg:text-[28px] font-extrabold text-[#020202] leading-tight mb-1">{name}</h1>
            <p className="text-[#00793A] font-semibold text-[13px] mb-3">{normalizeProductCopy(tagline)}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{normalizeProductCopy(description)}</p>

            {technology.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {technology.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#00793A]/20 bg-[#00793A]/5 text-[#00793A]">{t}</span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#00793A,#00994D)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6z"/></svg>
                Get Quote
              </Link>
              <Link href="/dealers"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-[#00793A] text-[#00793A] hover:bg-[#00793A]/5 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Find Dealer
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-gray-400">
              <button className="flex items-center gap-1.5 hover:text-[#00793A] transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS PRODUCT ── */}
      <section className="py-0 overflow-hidden">
        <div className="page-container overflow-x-clip">
          <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch min-w-0">

            {/* Left — dark brand panel */}
            <div className="lg:col-span-2 relative flex flex-col justify-center px-6 py-8 lg:px-8 lg:py-20 h-full overflow-hidden min-w-0" style={{ background: "linear-gradient(145deg, #001a0d 0%, #00391d 55%, #004d26 100%)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #ffc107 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #00793A 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ffc107] mb-4">Engineering Advantage</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5 break-words"
                style={{ fontFamily: "var(--font-display)" }}>
                Why Choose<br />{name}?
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-xs">
                Every panel is engineered with multiple layers of protection, built to outlast, outperform, and outlive the competition.
              </p>
            </div>

            {/* Right — USP 2x2 grid */}
            <div className="lg:col-span-3 bg-white p-4 lg:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {visibleUsps.map((u) => {
                  const c = USP_COLORS[u.icon] ?? { bg: "#f3f4f6", text: "#374151", border: "#9ca3af" };
                  return (
                    <div key={u.label}
                      className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-sm hover:border-gray-200 cursor-default bg-white">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: c.bg, color: c.text }}>
                        {USP_ICONS[u.icon] ?? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-[#020202] leading-snug">{u.label}</p>
                        <p className="text-[12px] text-gray-400 leading-relaxed mt-0.5">{normalizeProductCopy(u.desc)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FIRESAFE ── */}
      {firesafe && (
        <section className="py-12 bg-[#f9fafb]">
          <div className="page-container">
            <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0800 0%,#3d1100 40%,#7a2900 100%)" }}>
              <div className="p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-stretch">
                  {/* Left — content + logo + test results */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 mb-5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-orange-300">FIRESAVE Technology</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Class A Fire Rating</h2>
                    <p className="text-white/65 text-sm leading-relaxed mb-6">
                      Sharon Ply&apos;s exclusive FIRESAVE technology provides superior fire resistance conforming to ASTM E84 Standards. Tested per IS 5509:2000 — ideal for commercial spaces, hotels, hospitals, schools, and high-rise buildings.
                    </p>
                    <p className="text-white/40 text-[11px] mb-6">
                      Recommended for: Hotels, Hospitals, Schools, Commercial Offices, High-Rise Apartments
                    </p>

                    {/* Test results table */}
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3">Test Results — IS 5509:2000</p>
                    {/* Mobile: stacked cards */}
                    <div className="md:hidden space-y-2">
                      {firesafeTests.map((row, i) => (
                        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <p className="text-white/90 text-sm font-semibold mb-2">{row.test}</p>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="text-white/50">Required: {row.required}</span>
                            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 font-bold px-2.5 py-0.5 rounded-full">
                              {row.result}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Desktop: table grid */}
                    <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 w-full">
                      <div>
                      <div className="grid grid-cols-3 bg-white/10 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-wide text-orange-300">
                        <span>Test</span>
                        <span>Required Standard</span>
                        <span className="text-left">Result</span>
                      </div>
                      {firesafeTests.map((row, i) => (
                        <div key={i} className={`grid grid-cols-3 px-4 py-3 text-[12px] items-center ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}>
                          <span className="text-white/80 font-medium pr-2">{row.test}</span>
                          <span className="text-white/50 pr-2">{row.required}</span>
                          <span className="text-left">
                            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                              {row.result}
                            </span>
                          </span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>

                  {/* Right — YouTube video fills full column height */}
                  <div className="flex flex-col">
                    <p className="text-orange-300 text-[11px] font-bold uppercase tracking-widest mb-4">Watch It In Action</p>
                    <div className="rounded-2xl overflow-hidden border border-white/10 flex-1 min-h-[300px]">
                      <iframe
                        src="https://www.youtube.com/embed/MMbD9bynFe4?rel=0&modestbranding=1"
                        title="FIRESAVE Technology — SharonPly"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SPECIFICATIONS + APPLICATIONS ── */}
      <section className="py-14 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 items-start">

            {/* Specs — scrollable left column */}
            <div ref={leftColRef}>
              <h2 className="text-2xl font-bold text-[#020202] mb-6">Technical Specifications</h2>

              <div ref={specGridRef} className={`grid grid-cols-1 items-start ${specifications.length > 0 ? "lg:grid-cols-2" : ""} gap-4`}>
                {/* ── LEFT TABLE: Static Bending Strength Hierarchy ── */}
                <div data-spec-left className="spec-table-frame overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full min-w-[280px] border-collapse product-spec-table">
                    <thead>
                      <tr>
                        {technicalTableMulti?.length && multiTableHeader ? (
                          <>
                            <th className={SPEC_TH} style={{ width: "40%" }}>Parameter</th>
                            {multiTableHeader.values.map((col) => (
                              <th key={col} className={SPEC_TH}>{col || "—"}</th>
                            ))}
                          </>
                        ) : (
                          <>
                            <th className={SPEC_TH} style={{ width: "60%" }}>Parameter</th>
                            <th className={SPEC_TH}>Value</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {technicalTableMulti?.length
                        ? <>{renderTechnicalTableMulti(technicalTableMulti)}{balanceTables && renderMovableRows(0, split, leftValueCols)}</>
                        : balanceTables
                          ? <>{renderGroupedTechTable(structuralRows, "r")}{renderMovableRows(0, split)}</>
                          : renderGroupedTechTable(techRows, "r")}
                    </tbody>
                  </table>
                  {specifications.length === 0 && specFootnotes.length > 0 && (
                    <p className="text-[14px] font-bold text-gray-500 px-3 py-1.5 border-t border-gray-200" style={{ fontFamily: "var(--font-brand)" }}>
                      {specFootnotes.map((line, i) => <span key={i} className="block">{line}</span>)}
                    </p>
                  )}
                </div>

                {/* ── RIGHT TABLE: Individual Specs ── */}
                {specifications.length > 0 && (
                <div className="spec-table-frame overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full min-w-[280px] border-collapse product-spec-table">
                    <thead>
                      <tr>
                        <th className={SPEC_TH} style={{ width: "60%" }}>Parameter</th>
                        <th className={SPEC_TH}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderMovableRows(split, movableRows.length)}
                    </tbody>
                  </table>
                  {specFootnotes.length > 0 && (
                    <p ref={specFootRef} className="text-[14px] font-bold text-gray-500 px-3 py-1.5 border-t border-gray-200" style={{ fontFamily: "var(--font-brand)" }}>
                      {specFootnotes.map((line, i) => <span key={i} className="block">{line}</span>)}
                    </p>
                  )}
                </div>
                )}
              </div>


              
              {/* BlockBoard availability note */}
              {blockboardNote && (
                <div className="rounded-xl border border-[#e5ac00]/30 bg-[#fff8e1] px-5 py-3 mt-4 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e5ac00" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                  </svg>
                  <span className="text-[13px] font-semibold text-[#713f12]">{blockboardNote}</span>
                </div>
              )}
            </div>
            </div>
          </div>
        </section>


      {/* ── CTA BANNER ── */}
      <section className="py-6" style={{ background: "linear-gradient(135deg,#00793A 0%,#005a2b 100%)" }}>
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interested in {name}?</h2>
            <p className="text-white/70 text-sm">Connect with our experts for samples, pricing, and project consultation.</p>
          </div>
          <div className="flex flex-col w-full sm:w-auto gap-3 shrink-0">
            <Link href="/contact" className="w-full sm:w-auto text-center px-6 py-3 min-h-[44px] rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all">Get a Free Quote</Link>
            <Link href="/dealers" className="w-full sm:w-auto text-center px-6 py-3 min-h-[44px] rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">Find a Dealer</Link>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="page-container">
            <h2 className="text-xl font-bold text-[#020202] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((rp) => (
                <Link key={rp.name} href={rp.href} className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-[#00793A]/20 hover:shadow-md transition-all duration-200">
                  <div className="slot-card relative overflow-hidden bg-gray-50">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    {rp.tag && <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#ffc107] text-[#020202]">{rp.tag}</span>}
                  </div>
                  <div className="p-3.5">
                    <p className="text-[13px] font-bold text-[#020202] group-hover:text-[#00793A] transition-colors leading-tight mb-1">{rp.name}</p>
                    <span className="text-[11px] text-[#00793A] font-semibold flex items-center gap-1">View Details <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      
      {/* ── STICKY CTA ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
        style={{
          background: overFooter ? "rgba(0,121,58,0.97)" : "rgba(255,255,255,0.97)",
          borderTop: overFooter ? "1px solid rgba(255,255,255,0.15)" : "1px solid #e5e7eb",
          backdropFilter: "blur(12px)",
          transition: "background 0.3s, border-color 0.3s",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}>
        <div className="page-container py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[13px] font-bold truncate" style={{ color: overFooter ? "#fff" : "#020202" }}>{name}</p>
            <p className="text-[11px]" style={{ color: overFooter ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>{grade}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/contact" className="px-5 py-3 min-h-[44px] inline-flex items-center rounded-lg text-[13px] font-semibold transition-all"
              style={{ background: overFooter ? "#ffc107" : "linear-gradient(135deg,#00793A,#00994D)", color: overFooter ? "#020202" : "#fff" }}>
              Get Quote
            </Link>
            <Link href="/dealers" className="px-4 py-3 min-h-[44px] inline-flex items-center rounded-lg text-[13px] font-semibold border-2 transition-all sm:px-5"
              style={{ borderColor: overFooter ? "rgba(255,255,255,0.4)" : "#00793A", color: overFooter ? "#fff" : "#00793A", background: "transparent" }}>
              <span className="sm:hidden" aria-label="Find Dealer">📍</span>
              <span className="hidden sm:inline">Find Dealer</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
