"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const segments = [
  {
    id: "builders",
    title: "Builders & Contractors",
    label: "CONSTRUCTION",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M6 20V10l6-6 6 6v10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
    description:
      "The backbone of India's construction industry trusts SharonPly for structural-grade, high-strength plywood that withstands the toughest site conditions. From structural panels to premium finishes — we deliver on time, every time.",
    features: [
      "BWP/BWR grade structural plywood",
      "High nail-holding strength",
      "Moisture & humidity resistant",
      "Consistent thickness & calibration",
      "Bulk supply with dedicated logistics",
      "Pan-India delivery network",
    ],
    stat: "2,500+",
    statLabel: "Active Projects",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    imageAlt: "Builder and contractor at construction site reviewing plywood quality",
  },
  {
    id: "architects",
    title: "Architects",
    label: "DESIGN & SPECIFICATION",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    description:
      "Trusted by 10,000+ architects across India, SharonPly delivers precision-engineered wood solutions that meet the most demanding architectural specifications — from concept to flawless completion.",
    features: [
      "Custom specifications & cut-to-size",
      "E0 low-emission certified",
      "Fire-retardant & acoustic options",
      "Premium surface finishes",
      "Technical material advisory",
      "Green building compliant",
    ],
    stat: "10,000+",
    statLabel: "Architects Trust Us",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    imageAlt: "Architect reviewing architectural plans in a design studio",
  },
  {
    id: "interior-designers",
    title: "Interior Designers",
    label: "AESTHETICS & FINISH",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20" />
        <path d="M2 12h20" />
      </svg>
    ),
    description:
      "Elevate every space with SharonPly's extensive palette of veneers, premium doors, and designer-grade boards. Our products empower interior designers to bring any creative vision to life with precision and elegance.",
    features: [
      "500+ veneer shades & exotic grains",
      "Designer flush door collection",
      "Color-matched & custom lamination",
      "Consistent grain continuity sheets",
      "Quick turnaround for tight timelines",
      "Dedicated design support team",
    ],
    stat: "3,000+",
    statLabel: "Designers Served",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    imageAlt: "Interior designer working on premium wood finish space",
  },
  {
    id: "homeowners",
    title: "Homeowners",
    label: "DREAM HOME",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
    description:
      "Your home deserves the best. SharonPly offers lifetime warranty options on our premium range — 100% waterproof, termite-resistant, and safe for your family with E0 certified low emissions.",
    features: [
      "Lifetime warranty — Platinum range",
      "100% termite & borer resistant",
      "Waterproof BWP & Marine grade",
      "E0 emission safe for families",
      "Easy maintenance & long life",
      "Trusted by 50,000+ Indian families",
    ],
    stat: "50,000+",
    statLabel: "Happy Homes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    imageAlt: "Modern premium home interior with beautiful wood finishes",
  },
  {
    id: "developers",
    title: "Developers",
    label: "LARGE SCALE SUPPLY",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="7" width="8" height="14" rx="1" />
        <rect x="9" y="3" width="6" height="18" rx="1" />
        <rect x="15" y="9" width="8" height="12" rx="1" />
      </svg>
    ),
    description:
      "SharonPly's robust supply chain powers India's largest real estate developments. Consistent quality, guaranteed supply continuity, and a dedicated key account team ensure your project milestones are never missed.",
    features: [
      "Bulk pricing & dedicated supply chain",
      "Consistent quality across large orders",
      "Pan-India logistics & warehousing",
      "Dedicated key account manager",
      "Structural ply for all construction phases",
      "Complete wood solutions under one roof",
    ],
    stat: "500+",
    statLabel: "Mega Projects",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    imageAlt: "Large scale real estate development project",
  },
];

const N = segments.length;

export default function WhoWeServe() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index === active || animating) return;
      setAnimating(true);
      setImgLoaded(false);
      setTimeout(() => {
        setActive(index);
        setTimeout(() => setAnimating(false), 50);
      }, 260);
    },
    [active, animating]
  );

  const next = useCallback(() => {
    if (animating) return;
    const nextIdx = (active + 1) % N;
    setAnimating(true);
    setImgLoaded(false);
    setTimeout(() => {
      setActive(nextIdx);
      setTimeout(() => setAnimating(false), 50);
    }, 260);
  }, [active, animating]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  const current = segments[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#f4f8f5" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top accent line */}
      <div className="w-full h-1" style={{ background: "linear-gradient(90deg, #00793A 0%, #ffc107 50%, #00793A 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 lg:pt-14 lg:pb-8">

        {/* Section header */}
        <div className="mb-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(0,121,58,0.1)", color: "#00793A" }}
          >
            Built for Every Builder
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#020202] leading-tight" style={{ letterSpacing: "-0.02em" }}>
            THE RIGHT PLY FOR <span style={{ color: "#00793A" }}>YOUR TRADE</span>
          </h2>
          <div className="mt-2.5 h-1 rounded-full" style={{ width: 64, background: "#ffc107" }} />
          <p className="mt-3 text-sm sm:text-base text-[#020202]/60 max-w-xl" style={{ lineHeight: "1.7" }}>
            Whether you're laying foundations or finishing interiors — SharonPly is engineered to perform at every stage, for every professional.
          </p>
        </div>

        {/* ─── Main 2-col layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-stretch" style={{ minHeight: 520 }}>

          {/* LEFT: Full image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: 320 }}>
            {segments.map((seg, i) => (
              <img
                key={seg.id}
                src={seg.image}
                alt={seg.imageAlt}
                onLoad={() => { if (i === active) setImgLoaded(true); }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition: "opacity 0.55s ease",
                  opacity: i === active && imgLoaded ? 1 : 0,
                }}
              />
            ))}

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.68) 100%)" }}
            />

            {/* Category label */}
            <div className="absolute top-5 left-5">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: "#ffc107",
                  color: "#020202",
                  transition: "opacity 0.3s",
                  opacity: animating ? 0 : 1,
                }}
              >
                {current.label}
              </span>
            </div>

            {/* Right edge dot nav */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2">
              {segments.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${segments[i].title}`}
                  className="carousel-dot-btn sm:min-w-0 sm:min-h-0 sm:p-0"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 6 : 5,
                      height: i === active ? 24 : 5,
                      background: i === active ? "#ffc107" : "rgba(255,255,255,0.45)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Bottom overlay: title + stat */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(12px)" : "translateY(0)",
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-1">{current.title}</h3>

            </div>

            {/* Progress bar */}
            {!paused && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
                <div key={`${active}-pb`} className="h-full bg-[#ffc107]" style={{ animation: "progressBar 4s linear forwards" }} />
              </div>
            )}
          </div>

          {/* RIGHT: top 15% tabs + bottom 85% content */}
          <div className="flex flex-col mt-6 lg:mt-0" style={{ minHeight: 520 }}>

            {/* ── MOBILE: horizontal scroll tabs ── */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
              {segments.map((seg, i) => {
                const isAct = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all duration-300"
                    style={{
                      background: isAct ? "#00793A" : "white",
                      color: isAct ? "white" : "#020202",
                      borderColor: isAct ? "#00793A" : "#e0e0e0",
                      boxShadow: isAct ? "0 4px 14px rgba(0,121,58,0.22)" : "none",
                    }}
                  >
                    <span style={{ color: isAct ? "white" : "#00793A" }}>{seg.icon}</span>
                    <span>{seg.title}</span>
                  </button>
                );
              })}
            </div>

            {/* ── DESKTOP: 15% tab strip ── */}
            <div
              className="hidden lg:flex items-center gap-2 flex-wrap"
              style={{ flex: "0 0 15%", alignContent: "center" }}
            >
              {segments.map((seg, i) => {
                const isAct = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`View ${seg.title}`}
                    className="flex items-center gap-2 rounded-full font-semibold border-2 whitespace-nowrap transition-all duration-350"
                    style={{
                      padding: isAct ? "6px 14px" : "5px 12px",
                      fontSize: 12,
                      background: isAct ? "#00793A" : "white",
                      color: isAct ? "white" : "#4b5563",
                      borderColor: isAct ? "#00793A" : "#e5e7eb",
                      boxShadow: isAct
                        ? "0 4px 14px rgba(0,121,58,0.28), 0 0 0 3px rgba(0,121,58,0.08)"
                        : "0 1px 3px rgba(0,0,0,0.06)",
                      transform: isAct ? "translateY(-1px) scale(1.02)" : "none",
                    }}
                  >
                    <span style={{ color: isAct ? "white" : "#00793A", display: "flex", flexShrink: 0 }}>
                      {seg.icon}
                    </span>
                    <span>{seg.title}</span>
                    {isAct && (
                      <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: "#ffc107" }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── DESKTOP: 85% content card ── */}
            <div
              className="flex-1 relative rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border: "1px solid rgba(0,121,58,0.09)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: "linear-gradient(180deg, #00793A 0%, #ffc107 100%)" }}
              />

              {/* Animated inner content */}
              <div
                className="h-full p-5 lg:p-6"
                style={{
                  transition: "opacity 0.26s ease, transform 0.26s ease",
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(10px)" : "translateY(0)",
                }}
              >
                {/* Title + stat row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(0,121,58,0.09)", color: "#00793A" }}
                    >
                      {current.icon}
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-[#020202] leading-tight" style={{ letterSpacing: "-0.01em" }}>
                        {current.title}
                      </h3>
                      <div className="h-0.5 w-8 rounded-full mt-1" style={{ background: "#ffc107" }} />
                    </div>
                  </div>

                </div>

                {/* Description */}
                <p className="text-[#020202]/60 text-sm mb-4" style={{ lineHeight: "1.7" }}>
                  {current.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
                  {current.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: i % 2 === 0 ? "#f8fdf9" : "#f9fafb",
                        border: "1px solid rgba(0,121,58,0.07)",
                      }}
                    >
                      <div
                        className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "#00793A" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[#020202]/72 text-xs font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    style={{ background: "#00793A", boxShadow: "0 4px 16px rgba(0,121,58,0.28)" }}
                  >
                    Get Expert Advice
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="/our-history"
                    className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:bg-[#00793A]/5 active:scale-95"
                    style={{ borderColor: "rgba(0,121,58,0.25)", color: "#00793A" }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
