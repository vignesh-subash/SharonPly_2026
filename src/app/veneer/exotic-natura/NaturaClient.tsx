"use client";

import Link from "next/link";
import DesignedHeroBanner from "@/components/DesignedHeroBanner";
import { useState } from "react";
import { natzuraProducts } from "@/data/veneerProducts";

const ACCENT = "#c4922a";

const HERO_TITLE = "Sharon Exoti Natura";

// SVG icon components for the marquee
const IconLeaf = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const IconSparkles = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>
  </svg>
);
const IconShieldCheck = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconBadge = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconTrees = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>
  </svg>
);
const IconSun = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MARQUEE_FEATURES = [
  { Icon: IconLeaf,       label: "Natural Wood Grain",      desc: "Every sheet carries genuine grain patterns unique to its timber origin." },
  { Icon: IconSparkles,   label: "Premium Surface Finish",  desc: "Precision-sanded to a consistent, polish-ready surface quality." },
  { Icon: IconShieldCheck,label: "Eco-Certified",           desc: "FSC-certified supply chain — legally harvested, sustainably managed." },
  { Icon: IconBadge,      label: "Authentic Character",     desc: "No two sheets are identical — true natural variation in every panel." },
  { Icon: IconTrees,      label: "Wide Species Range",      desc: "Walnut, Oak, Teak, Maple, Cherry, Ash, Mahogany and more." },
  { Icon: IconSun,        label: "UV Stable Finish",        desc: "Colour-stable formulation resists fading under sustained light exposure." },
];

export default function ExotiNaturaPage() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const STATIC_ROOM_IMG = "/images/2026/veneer/natura-inner.webp";

  const currentCategory = natzuraProducts[activeCat];
  const subcategories = currentCategory.subcategories ?? [{ name: null, products: currentCategory.products }];
  const hasNamedSubs = subcategories.some((s) => s.name);
  const currentSub = subcategories[activeSub] ?? subcategories[0];
  const visibleProducts = currentSub?.products ?? currentCategory.products;

  const handleCatClick = (idx: number) => {
    if (idx === activeCat) return;
    setActiveCat(idx);
    setActiveSub(0);
  };

  return (
    <div style={{ background: "#faf9f7", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <DesignedHeroBanner
        src="/images/2026/veneer/natura-hero.webp"
        title="Sharon Exoti Natura"
        subtitle="Nature's finest grain, every sheet unique: authentic natural wood veneers sourced from sustainable forests."
        breadcrumbs={[{ label: "Veneer", href: "/veneer" }, { label: "Sharon Exoti Natura" }]}
      />

      {/* ── ABOUT ── */}
      <section style={{ padding: "80px 0 0", background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* Left — about text */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 2, background: ACCENT }} />
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: ACCENT }}>About Exoti Natura</p>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#141210", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>India's Finest Natural<br />Wood Veneers</h2>
              <div style={{ width: 40, height: 2, background: ACCENT, marginBottom: 28 }} />
              <p style={{ fontSize: 17, color: "#5a5550", lineHeight: 1.85, marginBottom: 16 }}>Sharon Exoti Natura presents a range of authentic natural veneers sourced from sustainable forests of Africa, South-East Asia, Europe, and the Americas — inspired by natural diversity, crafted to perfection.</p>
              <p style={{ fontSize: 15, color: "#888", lineHeight: 1.85 }}>Each Natura sheet is sliced directly from real timber — the grain patterns, figure, and tonal variation are genuinely natural. No two sheets are identical.</p>
            </div>

            {/* Right — room image */}
            <div style={{ position: "sticky", top: 100 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>Natural Veneer in Space</p>
              <div className="slot-card" style={{ position: "relative", borderRadius: 4, overflow: "hidden" }}>
                <img src={STATIC_ROOM_IMG} alt="Natural veneer in interior" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,7,4,0.7) 0%, rgba(10,7,4,0.1) 55%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 28px", zIndex: 2 }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", marginBottom: 5 }}>Sharon Exoti Natura</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Authentic grain · Sustainably sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── KEY FEATURES MARQUEE ── */}
        <div style={{ marginTop: 64, borderTop: "1px solid #ede9e0", borderBottom: "1px solid #ede9e0", background: "#faf9f7", overflow: "hidden", paddingTop: 0, paddingBottom: 0 }}>
          {/* Label row */}
          <div style={{ padding: "20px 40px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 20, height: 1.5, background: ACCENT }} />
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>Key Features</p>
          </div>

          {/* Scrolling track */}
          <div
            style={{ overflow: "hidden", padding: "20px 0 24px", cursor: "default" }}
            onMouseEnter={(e) => {
              const track = e.currentTarget.querySelector<HTMLDivElement>(".marquee-track");
              if (track) track.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              const track = e.currentTarget.querySelector<HTMLDivElement>(".marquee-track");
              if (track) track.style.animationPlayState = "running";
            }}
          >
            {/* Render items twice for seamless loop */}
            <div className="marquee-track" style={{ display: "flex", gap: 12, width: "max-content", animation: "marqueeScroll 28s linear infinite" }}>
              {[...MARQUEE_FEATURES, ...MARQUEE_FEATURES].map(({ Icon, label, desc }, i) => (
                <div
                  key={i}
                  style={{
                    width: 240,
                    flexShrink: 0,
                    background: "#fff",
                    border: "1px solid #ede9e0",
                    padding: "24px 22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <div style={{ color: ACCENT, lineHeight: 1 }}>
                    <Icon />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#141210", marginBottom: 6, lineHeight: 1.3 }}>{label}</p>
                    <p style={{ fontSize: 12.5, color: "#777", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes marqueeScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .marquee-track { animation-play-state: running; }
        `}</style>
      </section>

      {/* ── NATURA COLLECTIONS ── */}
      <section id="collections" style={{ padding: "80px 0", background: "#faf9f7", scrollMarginTop: 80 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 2, background: ACCENT }} />
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>Browse by Series</p>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#141210", letterSpacing: "-0.02em" }}>Explore Exoti Natura Collections</h2>
          </div>

          {/* Sidebar + Product grid layout */}
          <div className="flex flex-col lg:flex-row" style={{ gap: 0, background: "#fff", border: "1px solid #e8e3d8" }}>

            {/* ── LEFT SIDEBAR — Category list ── */}
            <div className="w-full lg:w-[240px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#f0ece4] bg-[#faf9f7]">
              <div className="flex lg:block overflow-x-auto lg:overflow-visible" style={{ padding: "16px 0" }}>
                {natzuraProducts.map((cat, i) => {
                  const isActive = activeCat === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleCatClick(i)}
                      className="shrink-0 lg:shrink"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        minWidth: "max(160px, 42vw)",
                        padding: "10px 16px 10px 18px",
                        border: "none",
                        borderLeft: isActive ? `3px solid ${ACCENT}` : "3px solid transparent",
                        background: isActive ? "#fff" : "transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#f0ece4"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span style={{ fontSize: 14, fontWeight: isActive ? 800 : 600, color: isActive ? "#141210" : "#555", letterSpacing: "0.02em", transition: "color 0.15s" }}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT — Product grid ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Category header */}
              <div style={{ padding: "20px 24px 12px", borderBottom: "1px solid #f0ece4" }}>
                <p style={{ fontSize: 16, fontWeight: 900, color: "#141210", letterSpacing: "-0.01em" }}>{currentCategory.name}</p>
                {hasNamedSubs && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                    {subcategories.map((sub, i) => (
                      <button
                        key={`${sub.name ?? "all"}-${i}`}
                        onClick={() => setActiveSub(i)}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid",
                          borderColor: activeSub === i ? ACCENT : "#e8e3d8",
                          background: activeSub === i ? `${ACCENT}12` : "#fff",
                          color: activeSub === i ? "#141210" : "#666",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          cursor: "pointer",
                        }}
                      >
                        {sub.name ?? "All"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                  {visibleProducts.map((product) => (
                    <div key={product.code} style={{ border: "1px solid #f0ece4", overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff" }}>
                      <div className="slot-tile" style={{ position: "relative", overflow: "hidden" }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                          className="natura-product-img"
                        />
                      </div>
                      <div style={{ padding: "10px 12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: 12, fontWeight: 800, color: "#141210", lineHeight: 1.2, marginBottom: 2 }}>{product.name}</p>
                        <p style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.04em", marginBottom: 10 }}>{product.code}</p>
                        <Link
                          href={`/veneer/exotic-natura/shade/${product.code}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "7px 14px", background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 2, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", alignSelf: "flex-start" }}
                        >
                          Know More
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <style>{`
          .natura-product-img { transition: transform 0.4s ease; }
          div:hover > .natura-product-img { transform: scale(1.08); }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "40px 0", background: "#141210" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>Get Started</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 6 }}>Find Your Perfect Natural Veneer</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 460, lineHeight: 1.7 }}>Download the shade card, request a physical sample, or speak to a Sharon veneer specialist.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/catalogue" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", background: ACCENT, color: "#fff", fontSize: 12, fontWeight: 700, borderRadius: 2, textDecoration: "none", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Request a Sample
            </Link>
            <Link href="/contact/sales-team" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 700, borderRadius: 2, textDecoration: "none", letterSpacing: "0.08em", border: "1.5px solid rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
