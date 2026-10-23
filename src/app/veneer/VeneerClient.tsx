"use client";

import Link from "next/link";
import { useState } from "react";
import DesignedHeroBanner from "@/components/DesignedHeroBanner";
import { veneerCollections } from "@/data/veneerData";

// ── Certificates ─────────────────────────────────────────────────────────────
const NATURA_CERTS = [
  { name: "FSC", sub: "Forest Stewardship Council" },
  { name: "IS 1328", sub: "Bureau of Indian Standards" },
  { name: "IS 848:2006", sub: "Bureau of Indian Standards" },
  { name: "ISO 9001:2015", sub: "Quality Management" },
  { name: "ISO 14001:2015", sub: "Environmental Management" },
  { name: "ISO 45001:2018", sub: "Occupational Safety" },
  { name: "IGBC", sub: "Indian Green Building Council" },
];

const AURA_CERTS = [
  { name: "FSC", sub: "Forest Stewardship Council" },
  { name: "BIS / ISI", sub: "Bureau of Indian Standards" },
  { name: "IS 1328", sub: "Decorative Veneer Standard" },
  { name: "IS 848:2006", sub: "Adhesive Standard" },
  { name: "ISO 9001", sub: "Quality Management" },
  { name: "ISO 14001", sub: "Environmental Management" },
  { name: "IGBC", sub: "Green Building Certified" },
];

// ── Blogs ─────────────────────────────────────────────────────────────────────
const VENEER_BLOGS = [
  {
    slug: "why-is-veneer-a-good-option-for-your-home-interiors",
    year: "2023",
    month: "09",
    title: "Why is Veneer a Good Option for Your Home Interiors?",
    image: "/images/blogs/why-is-veneer-a-good-option-for-your-home-interiors.jpg",
    date: "Sep 2023",
    tag: "Veneer",
  },
  {
    slug: "diy-decorative-projects-using-decorative-veneer-plywood",
    year: "2024",
    month: "11",
    title: "DIY Decorative Projects Using Decorative Veneer Plywood",
    image: "/images/blogs/diy-decorative-projects-using-decorative-veneer-plywood.jpg",
    date: "Nov 2024",
    tag: "Veneer",
  },
  {
    slug: "understanding-veneer-sheets_-a-comprehensive-guide-for-woodworking-enthusiasts",
    year: "2024",
    month: "06",
    title: "Understanding Veneer Sheets: A Comprehensive Guide",
    image: "/images/blogs/understanding-veneer-sheets_-a-comprehensive-guide-for-woodworking-enthusiasts.jpg",
    date: "Jun 2024",
    tag: "Veneer",
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function VeneerPage() {
  // suppress unused-variable warning — veneerCollections used for future expansion
  void veneerCollections;

  // Active tab shared by USPs + Certs combined section
  const [activeTab, setActiveTab] = useState<"natura" | "aura">("natura");

  return (
    <div style={{ background: "#faf9f7", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* ── HERO ── */}
      <DesignedHeroBanner
        src="/images/2026/veneer/hero.webp"
        title="Sharon Veneer"
        breadcrumbs={[{ label: "Products" }, { label: "Veneer" }]}
      />

      {/* ── COLLECTIONS ───────────────────────────────────────────────────── */}
      {/* Merged: Products Intro + 80/20 Split → single section with intro text + 2 equal side-by-side cards */}
      <section id="collections" style={{ padding: "60px 0", background: "#fff", borderBottom: "1px solid #ede9e0" }}>
        <div className="page-container">

          {/* Intro row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-end mb-10">
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#141210", lineHeight: 1.12, fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 0 }}>
                Natural Beauty.<br />Refined Surfaces.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 15, color: "#5a5550", lineHeight: 1.8 }}>
                Sharon Exoti is India&apos;s premier source for decorative wood veneer — natural sliced and factory-finished veneers for architects, interior designers, and luxury projects.
              </p>
            </div>
          </div>

          {/* Two equal product cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3px]">

            {/* NATURA card */}
            <Link href="/veneer/exotic-natura" className="slot-card group" style={{ display: "flex", flexDirection: "column", overflow: "hidden", textDecoration: "none", background: "#fff" }}>
              <div style={{ overflow: "hidden" }}>
                <img
                  src="/images/2026/veneer/thumb-natura.webp"
                  alt="Sharon Exoti Natura"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.5s" }}
                  className="group-hover:scale-105"
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", fontWeight: 900, color: "#141210", fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12, lineHeight: 1.2 }}>
                  Sharon Exoti Natura
                </h3>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "#c4922a", letterSpacing: "0.08em" }}>
                  Explore Natura
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </Link>

            {/* AURA card */}
            <Link href="/veneer/sharon-exoti-aura" className="slot-card group" style={{ display: "flex", flexDirection: "column", overflow: "hidden", textDecoration: "none", background: "#fff" }}>
              <div style={{ overflow: "hidden" }}>
                <img
                  src="/images/2026/veneer/thumb-aura.webp"
                  alt="Sharon Exoti Aura"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.5s" }}
                  className="group-hover:scale-105"
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", fontWeight: 900, color: "#141210", fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12, lineHeight: 1.2 }}>
                  Sharon Exoti Aura
                </h3>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "#7c6aba", letterSpacing: "0.08em" }}>
                  Explore Aura
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── KEY FEATURES + USPs + CERTIFICATIONS ──────────────────────────── */}
      <section style={{ padding: "72px 0", background: "#faf9f7", borderTop: "1px solid #ede9e0", borderBottom: "1px solid #ede9e0" }}>
        <div className="page-container">

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44, gap: 20, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#141210", fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.1 }}>Features &amp; Certifications</h2>
            </div>
            <div style={{ display: "flex", gap: 1, background: "#e8e3d8", padding: 2, borderRadius: 4 }}>
              {(["natura", "aura"] as const).map((tab) => {
                const isActive = activeTab === tab;
                const accent = tab === "natura" ? "#c4922a" : "#7c6aba";
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ padding: "8px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", border: "none", background: isActive ? "#fff" : "transparent", color: isActive ? "#141210" : "#999", borderRadius: 3, transition: "all 0.2s", boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>
                    Exoti {tab === "natura" ? "Natura" : "Aura"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Key Features (2x2 grid with SVG icons) ── */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: 20 }}>Key Features</p>
            {activeTab === "natura" ? (
              /* ── Natura: 5 features from reference ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: 1, background: "#e8e3d8" }}>
                {[
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#c4922a" strokeWidth="2" />
                        <line x1="12" y1="12" x2="48" y2="48" stroke="#c4922a" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="30" cy="30" r="16" stroke="#c4922a" strokeWidth="1" />
                        <g transform="translate(22, 20)" stroke="#c4922a" strokeWidth="1.5" strokeLinecap="round" fill="none">
                          <ellipse cx="8" cy="4" rx="5" ry="3" />
                          <line x1="6" y1="3" x2="5" y2="0" />
                          <line x1="10" y1="3" x2="11" y2="0" />
                          <line x1="4" y1="5.5" x2="2" y2="7" />
                          <line x1="12" y1="5.5" x2="14" y2="7" />
                          <line x1="6" y1="7" x2="4" y2="11" />
                          <line x1="10" y1="7" x2="12" y2="11" />
                        </g>
                      </svg>
                    ),
                    title: "Borer & Termite Resistant",
                    desc: "Advanced treatment protects against wood-boring pests and termite damage throughout the panel's service life."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <rect x="8" y="18" width="18" height="24" rx="1" fill="#c4922a" />
                        <rect x="34" y="18" width="18" height="24" rx="1" fill="#141210" />
                        <path d="M20 28 C24 24, 30 34, 36 28" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Hot-melt Thread Splicing",
                    desc: "Hot-melt adhesive splicing technology delivers seamless, durable longitudinal joins across every veneer sheet."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#c4922a" strokeWidth="2" />
                        <circle cx="30" cy="30" r="22" stroke="#c4922a" strokeWidth="0.5" strokeDasharray="3 2" />
                        <path d="M30 16 L34 26 L30 22 L26 26Z" fill="#c4922a" />
                        <path d="M30 32 C28 42, 20 44, 22 46 C24 48, 30 44, 30 44 C30 44, 36 48, 38 46 C40 44, 32 42, 30 32Z" fill="#c4922a" opacity="0.7" />
                      </svg>
                    ),
                    title: "Boiling Water Resistant",
                    desc: "BWR-grade phenolic resin bonds withstand continuous boiling water exposure — ideal for kitchens, bathrooms, and exteriors."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#c4922a" strokeWidth="2" />
                        <path d="M22 30 L28 30 C30 24, 36 22, 38 28 C40 30, 38 38, 30 38 C24 38, 22 34, 22 30Z" fill="#c4922a" opacity="0.7" />
                        <text x="30" y="49" textAnchor="middle" fontSize="6" fontWeight="800" fill="#c4922a" letterSpacing="1">PROTECTION</text>
                      </svg>
                    ),
                    title: "Glue Line Protection",
                    desc: "Reinforced glue-line technology prevents delamination and ensures durable, long-lasting panel integrity under stress."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <line x1="6" y1="46" x2="54" y2="46" stroke="#c4922a" strokeWidth="1.5" />
                        <g transform="translate(18, 22)" stroke="#141210" strokeWidth="1.8" fill="none">
                          <rect x="0" y="4" width="14" height="14" rx="2" />
                          <rect x="10" y="6" width="14" height="14" rx="2" />
                          <circle cx="25" cy="12" r="2" fill="#141210" stroke="none" />
                          <circle cx="5" cy="12" r="2" fill="#141210" stroke="none" />
                        </g>
                        <path d="M36 26 L40 22 M32 30 L36 26 M38 30 L40 28" stroke="#c4922a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <circle cx="15" cy="20" r="1.2" fill="#c4922a" />
                        <circle cx="10" cy="24" r="0.8" fill="#c4922a" />
                        <circle cx="20" cy="17" r="0.8" fill="#c4922a" />
                      </svg>
                    ),
                    title: "German Sanding Technology",
                    desc: "German precision sanding equipment delivers ultra-smooth, uniform surface finish — ready for veneering without additional calibration."
                  },
                ].map((u, i) => (
                  <div key={i} style={{ background: "#fff", padding: "28px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
                    <div style={{ flexShrink: 0, lineHeight: 1 }}>
                      {u.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 13.5, fontWeight: 800, color: "#141210", lineHeight: 1.3, marginBottom: 8 }}>{u.title}</h3>
                      <p style={{ fontSize: 11.5, color: "#777", lineHeight: 1.65 }}>{u.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Aura: 5 features from reference ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: 1, background: "#dddae8" }}>
                {[
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="22" cy="20" r="10" stroke="#7c6aba" strokeWidth="1.5" fill="none" />
                        <circle cx="22" cy="20" r="4" fill="#7c6aba" />
                        <rect x="16" y="28" width="12" height="14" rx="2" stroke="#7c6aba" strokeWidth="1.5" fill="none" />
                        <circle cx="15" cy="42" r="2" fill="#7c6aba" />
                        <circle cx="29" cy="42" r="2" fill="#7c6aba" />
                        <path d="M42 14 L50 14 L46 20Z" fill="#7c6aba" opacity="0.6" />
                        <path d="M42 20 L50 20 L46 26Z" fill="#7c6aba" opacity="0.6" />
                        <path d="M42 26 L50 26 L46 32Z" fill="#7c6aba" opacity="0.6" />
                        <path d="M38 32 L46 32 L42 38Z" fill="#7c6aba" opacity="0.6" />
                        <text x="46" y="46" textAnchor="middle" fontSize="5" fontWeight="800" fill="#7c6aba">AI</text>
                      </svg>
                    ),
                    title: "State-of-the Art Manufacturing Process",
                    desc: "Advanced automated production lines ensure precision, consistency, and quality at every stage."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#7c6aba" strokeWidth="2" />
                        <circle cx="22" cy="22" r="2" fill="#7c6aba" />
                        <circle cx="30" cy="20" r="2" fill="#7c6aba" />
                        <circle cx="38" cy="22" r="2" fill="#7c6aba" />
                        <circle cx="20" cy="28" r="2" fill="#7c6aba" />
                        <circle cx="28" cy="28" r="2" fill="#7c6aba" />
                        <circle cx="36" cy="28" r="2" fill="#7c6aba" />
                        <circle cx="24" cy="34" r="2" fill="#7c6aba" />
                        <circle cx="32" cy="34" r="2" fill="#7c6aba" />
                        <circle cx="40" cy="34" r="2" fill="#7c6aba" />
                        <circle cx="22" cy="40" r="2" fill="#7c6aba" />
                        <circle cx="30" cy="40" r="2" fill="#7c6aba" />
                        <circle cx="38" cy="40" r="2" fill="#7c6aba" />
                        <path d="M8 12 L16 12 L12 18Z" fill="#7c6aba" />
                        <text x="12" y="10" textAnchor="middle" fontSize="5" fontWeight="800" fill="#7c6aba">HAND</text>
                      </svg>
                    ),
                    title: "Wide Variety",
                    desc: "Extensive range of shades, textures, and finishes to suit every design requirement."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#7c6aba" strokeWidth="2" />
                        <path d="M22 34 L26 38 L38 24" stroke="#7c6aba" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M42 18 L44 14 M44 14 L40 12 M44 14 L48 16" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="30" cy="30" r="16" stroke="#7c6aba" strokeWidth="0.5" strokeDasharray="2 2" />
                      </svg>
                    ),
                    title: "Superior Quality Raw Material",
                    desc: "Premium-grade timber and materials sourced from certified sustainable forests."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#7c6aba" strokeWidth="2" />
                        <rect x="18" y="22" width="14" height="16" rx="2" stroke="#7c6aba" strokeWidth="1.5" fill="none" />
                        <path d="M20 30 L26 30 L26 26" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M26 34 L30 30 L34 34" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M38 18 L42 14 M42 14 L46 18 M42 14 L42 24" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M38 42 L42 46 M42 46 L46 42 M42 46 L42 36" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 38 L18 42 M18 42 L22 38 M18 42 L8 42" stroke="#7c6aba" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "End Product",
                    desc: "Factory-finished panels ready for immediate installation — no on-site polishing required."
                  },
                  {
                    icon: (
                      <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="26" stroke="#7c6aba" strokeWidth="2" />
                        <line x1="12" y1="14" x2="48" y2="14" stroke="#7c6aba" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M16 14 Q20 22, 24 14 Q28 22, 32 14 Q36 22, 40 14 Q44 22, 48 14" stroke="#7c6aba" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <line x1="12" y1="46" x2="48" y2="46" stroke="#7c6aba" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M16 46 Q20 38, 24 46 Q28 38, 32 46 Q36 38, 40 46 Q44 38, 48 46" stroke="#7c6aba" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <line x1="12" y1="14" x2="12" y2="46" stroke="#7c6aba" strokeWidth="2" strokeLinecap="round" />
                        <line x1="48" y1="14" x2="48" y2="46" stroke="#7c6aba" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Uniform Drying",
                    desc: "Controlled kiln-drying process ensures uniform moisture content across every panel."
                  },
                ].map((u, i) => (
                  <div key={i} style={{ background: "#fff", padding: "28px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
                    <div style={{ flexShrink: 0, lineHeight: 1 }}>
                      {u.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 13.5, fontWeight: 800, color: "#141210", lineHeight: 1.3, marginBottom: 8 }}>{u.title}</h3>
                      <p style={{ fontSize: 11.5, color: "#777", lineHeight: 1.65 }}>{u.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Certifications Grid ── */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: 16 }}>Certifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7" style={{ gap: 1, background: activeTab === "natura" ? "#e8e3d8" : "#dddae8" }}>
              {(activeTab === "natura" ? NATURA_CERTS : AURA_CERTS).map((c, i) => (
                <div key={i} style={{ background: "#fff", padding: "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: activeTab === "natura" ? "#fdf5e8" : "#f4f2fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: activeTab === "natura" ? "#c4922a" : "#7c6aba", lineHeight: 1.1, textAlign: "center" }}>{c.name.split(" ").slice(0, 2).join("\n")}</span>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#141210" }}>{c.name}</p>
                  <p style={{ fontSize: 9, color: "#999", lineHeight: 1.3 }}>{c.sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BLOGS ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0", background: "#faf9f7" }}>
        <div className="page-container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 20, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 900, color: "#141210", fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Veneer Design Insights</h2>
            </div>
            <Link href="/blog" className="inline-cta-link" style={{ fontSize: 12, fontWeight: 700, color: "#141210", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1.5px solid #141210", paddingBottom: 2 }}>View All →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-[#e8e3d8]">
            {VENEER_BLOGS.map((b) => (
              <Link key={b.slug} href={`/${b.year}/${b.month}/${b.slug}`} style={{ textDecoration: "none", display: "block", background: "#fff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fdf8f0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; }}
              >
                <div className="slot-media" style={{ overflow: "hidden" }}>
                  <img src={b.image} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center", transformOrigin: "left center", transition: "transform 0.5s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", background: "#f5f0e8", color: "#c4922a", letterSpacing: "0.1em", textTransform: "uppercase" }}>{b.tag}</span>
                    <span style={{ fontSize: 10, color: "#aaa" }}>{b.date}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#141210", lineHeight: 1.45 }}>{b.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "40px 0", background: "#141210" }}>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c4922a", marginBottom: 10 }}>Get Started</p>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 900, color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Find Your Perfect Veneer</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 460, lineHeight: 1.7 }}>Download the shade card, request a physical sample, or speak to a Sharon veneer specialist.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/catalogue" style={{ display: "block", textAlign: "center", padding: "12px 24px", background: "#c4922a", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", borderRadius: 2, whiteSpace: "nowrap" }}>Download Shade Card</Link>
              <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "12px 24px", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 2, whiteSpace: "nowrap" }}>Get a Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
