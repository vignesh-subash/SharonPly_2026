"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface SubProduct {
  name: string;
  warranty: string;
  features: string[];
  usage: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  href: string;
  thumbImage: string;
  heroImage: string;
  tag: string;
  tagColor: string;
  subProducts: SubProduct[];
}

const categories: Category[] = [
  {
    id: "plywood",
    label: "PLYWOOD",
    href: "/plywood",
    tag: "Our Flagship",
    tagColor: "#00793A",
    thumbImage:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/PlatinumPly-FACELIFT-6FT-WOOD_vertical-resized-1770854252148.jpeg?width=600&height=600&resize=contain",
    heroImage:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/PlatinumPly-FACELIFT-6FT-WOOD_vertical-resized-1770854252148.jpeg?width=800&height=1000&resize=contain",
    subProducts: [
      {
        name: "Sharon Platinum Ply",
        warranty: "Lifetime Warranty + 4x Money-Back Guarantee",
        features: ["Fully Waterproof — IS 710 BWP Certified", "Fire-Safe with FIRESAVE Technology", "99.99% Virus-Protected Surface", "Zero Harmful Emissions — E0 Certified"],
        usage: "The ultimate pick for modular kitchens, luxury wardrobes, and spaces where safety and long-term durability matter most.",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/PlatinumPly-FACELIFT-6FT-WOOD_vertical-resized-1770854252148.jpeg?width=800&height=1000&resize=contain",
      },
      {
        name: "Sharon Gold",
        warranty: "30-Year Warranty — Built to Outlast",
        features: ["Fully Waterproof — IS 710 BWP Grade", "Fire & Virus Resistant Protection", "Stronger Joints with Kyoto Pro-Tech", "Precision-Calibrated for a Flat Finish"],
        usage: "Perfect for kitchens, bathrooms, and premium interiors where moisture resistance and a flawless surface finish matter most.",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Gold_FL_Vertical-resized-1770858517595.jpg?width=800&height=1000&resize=contain",
      },
      {
        name: "Sharon Prima Armor",
        warranty: "21-Year Warranty — Reliable & Proven",
        features: ["Waterproof Grade — IS 710 Certified", "Hygienic VIRASAVE-Treated Surface", "Strong Core with Kyoto Pro-Tech", "Consistent Thickness, Every Sheet"],
        usage: "A smart choice for bedroom furniture, interior panelling, and everyday builds where quality and value go hand in hand.",
        image: "/images/2026/plywood/thumb-prima-armor.webp",
      },
      {
        name: "Sovereign 710",
        warranty: "8-Year Warranty — Strong & Budget-Friendly",
        features: ["Waterproof Grade — IS 710 Compliant", "Tough Phenol Formaldehyde Bonding", "Responsibly Sourced Timber Core", "Built for Heavy-Use Applications"],
        usage: "Ideal for laundry rooms, utility furniture, and partitions where solid waterproof performance is needed without overspending.",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Sovereign-710_FF_Vertical-resized-1770858517583.jpeg?width=800&height=1000&resize=contain",
      },
    ],
  },
  {
    id: "veneer",
    label: "VENEER",
    href: "/veneer",
    tag: "Natural Beauty",
    tagColor: "#7c5c2e",
    thumbImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
    subProducts: [
      {
        name: "Sharon Natural Veneer",
        warranty: "15-Year Warranty — Real Wood, Real Beauty",
        features: ["Genuine Natural Wood Grain Finish", "Available in Reconstituted Options", "Poly-Fibre Backing for Easy Bonding", "Epoxy-Sealed for a Lasting Surface"],
        usage: "Bring warmth and character to wall panels, designer furniture, and accent surfaces — where natural aesthetics make all the difference.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
      },
    ],
  },
  {
    id: "door",
    label: "DOORS",
    href: "/door",
    tag: "Entry Statement",
    tagColor: "#5b4b3a",
    thumbImage:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Door-resized-1770857728288.jpg?width=600&height=600&resize=contain",
    heroImage:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Door-resized-1770857728288.jpg?width=900&height=1100&resize=contain",
    subProducts: [
      {
        name: "Sovereign BWP Flush Door",
        warranty: "10-Year Warranty — Solid, Safe & Stylish",
        features: ["Fully Waterproof BWP Grade", "Termite & Borer Resistant", "Sturdy 25–30mm Thickness", "IS:2202 Certified Quality"],
        usage: "A dependable door for homes, offices, and wet areas — built to withstand daily wear, humidity, and pests without warping.",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Door-resized-1770857728288.jpg?width=900&height=1100&resize=contain",
      },
    ],
  },
  {
    id: "teak",
    label: "TEAK",
    href: "/teak",
    tag: "Timeless",
    tagColor: "#8b4513",
    thumbImage:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=900&q=80",
    subProducts: [
      {
        name: "Sharon Teak Veneer Ply",
        warranty: "25-Year Warranty — A Cut Above the Rest",
        features: ["Genuine Burma Teak Veneer Face", "4mm Thick Natural Grain Veneer", "Rich, Timeless Wood Character", "Premium Grade for Fine Finishes"],
        usage: "Crafted for premium furniture, heritage-style interiors, and upscale cabinetry where only the finest natural material will do.",
        image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=900&q=80",
      },
    ],
  },
];

export default function ProductShowcase() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const cat = categories[activeCat];
  const sub = cat.subProducts[activeSub] ?? cat.subProducts[0];

  // crossfade image on sub change
  const switchSub = useCallback((catIdx: number, subIdx: number) => {
    setImgVisible(false);
    setContentVisible(false);
    setTimeout(() => {
      setActiveCat(catIdx);
      setActiveSub(subIdx);
      setImgVisible(true);
      setContentVisible(true);
    }, 320);
  }, []);

  const handleCatClick = useCallback(
    (idx: number) => {
      if (idx === activeCat) return;
      switchSub(idx, 0);
    },
    [activeCat, switchSub]
  );

  const handleArrowNext = useCallback(() => {
    const nextSub = (activeSub + 1) % cat.subProducts.length;
    if (nextSub === 0) {
      const nextCat = (activeCat + 1) % categories.length;
      switchSub(nextCat, 0);
    } else {
      switchSub(activeCat, nextSub);
    }
  }, [activeCat, activeSub, cat.subProducts.length, switchSub]);

  const handleArrowPrev = useCallback(() => {
    if (activeSub > 0) {
      switchSub(activeCat, activeSub - 1);
    } else {
      const prevCat = (activeCat - 1 + categories.length) % categories.length;
      const prevSubs = categories[prevCat].subProducts;
      switchSub(prevCat, prevSubs.length - 1);
    }
  }, [activeCat, activeSub, switchSub]);

  // auto-cycle every 5s
  useEffect(() => {
    if (isPaused) return;
    autoTimer.current = setInterval(() => {
      handleArrowNext();
    }, 5000);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [isPaused, handleArrowNext]);

  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{ paddingTop: "28px", paddingBottom: "28px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* faint wood grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #00793A 0px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADING ───────────────────────────────────── */}
        <div className="mb-6">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#00793A] mb-3">
            Built to Last
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#020202] leading-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            FIND THE RIGHT{" "}
            <span className="relative inline-block text-[#00793A]">
              PRODUCT FOR YOU
              <span
                className="absolute left-0 -bottom-1.5 h-[3px] rounded-full"
                style={{
                  background: "linear-gradient(90deg,#ffc107,#ffdb58,#ffc107)",
                  width: "100%",
                  animation: "underlineGrow 1.2s ease forwards",
                }}
              />
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-4xl leading-relaxed" style={{ lineHeight: "1.75" }}>
            Every space deserves material that holds up — SharonPly is engineered for exactly that.<br />
            Chosen by architects, builders, and homeowners who won&apos;t settle for less.
          </p>
        </div>

        {/* ── MAIN SPLIT ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT 60% ─────────────────────────────── */}
          <div className="w-full lg:w-[60%] flex flex-col">

            {/* 4 Category Cards */}
            <div className="grid grid-cols-4 gap-3 mb-10">
              {categories.map((c, i) => {
                const isActive = activeCat === i;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleCatClick(i)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      height: "180px",
                      boxShadow: isActive
                        ? "0 0 0 2.5px #ffc107, 0 12px 32px rgba(0,121,58,0.22)"
                        : "0 2px 10px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)",
                      transform: isActive ? "translateY(-6px)" : "translateY(0)",
                    }}
                    aria-label={`View ${c.label}`}
                  >
                    {/* thumb image */}
                    <img
                      src={c.thumbImage}
                      alt={c.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* overlay */}
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: isActive
                          ? "linear-gradient(to top, rgba(0,121,58,0.85) 0%, rgba(0,0,0,0.1) 100%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.05) 100%)",
                      }}
                    />
                    {/* active top accent bar */}
                    {isActive && (
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ background: "linear-gradient(90deg,#ffc107,#ffdb58)" }}
                      />
                    )}
                    {/* label + arrow */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                      <span className="text-white text-xs font-bold tracking-wider">{c.label}</span>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: isActive ? "#ffc107" : "rgba(255,255,255,0.15)",
                        }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                    {/* tag badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full text-white"
                        style={{ background: c.tagColor, opacity: 0.92 }}
                      >
                        {c.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sub-product detail content */}
            <div
              className="flex-1 flex flex-col"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.32s ease, transform 0.32s ease",
              }}
            >
              {/* product name + warranty */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-1.5 h-12 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(to bottom,#00793A,#ffc107)" }}
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#020202] leading-tight" style={{ letterSpacing: "-0.015em" }}>
                    {sub.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(0,121,58,0.1)", color: "#00793A" }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {sub.warranty}
                  </span>
                </div>
              </div>

              {/* features grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4 pl-5">
                {sub.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 p-2 rounded-lg" style={{ background: "rgba(0,121,58,0.04)", border: "1px solid rgba(0,121,58,0.08)" }}>
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#00793A" }}
                    >
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* usage */}
              <div className="pl-5 mb-6 p-3 rounded-xl" style={{ background: "linear-gradient(135deg,#fdf8f0,#f7f0e4)", border: "1px solid rgba(212,168,75,0.2)" }}>
                <p className="text-[10px] text-[#8B6914] uppercase tracking-wider mb-1 font-bold">Best Used For</p>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ lineHeight: "1.7" }}>{sub.usage}</p>
              </div>

              {/* CTAs + navigation arrows */}
              <div className="pl-4 flex items-center gap-3 flex-wrap">
                <Link
                  href={cat.href}
                  className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-green-200 hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg,#00793A,#00994D)" }}
                >
                  See Full Product Details
                </Link>
                <Link
                  href="/catalogue"
                  className="px-5 py-2.5 rounded-lg text-gray-600 font-semibold text-sm border border-gray-200 bg-gray-50 transition-all hover:bg-gray-100"
                >
                  Get the Brochure
                </Link>

                {/* functional arrow controls */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={handleArrowPrev}
                    className="w-11 h-11 lg:w-9 lg:h-9 rounded-full border-2 border-[#00793A] flex items-center justify-center text-[#00793A] transition-all duration-200 hover:bg-[#00793A] hover:text-white"
                    aria-label="Previous product"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleArrowNext}
                    className="w-11 h-11 lg:w-9 lg:h-9 rounded-full bg-[#00793A] flex items-center justify-center text-white transition-all duration-200 hover:bg-[#00994D] hover:shadow-lg hover:shadow-green-200"
                    aria-label="Next product"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* sub-product dots (if multiple) */}
              {cat.subProducts.length > 1 && (
                <div className="flex items-center gap-1.5 mt-4 pl-4">
                  {cat.subProducts.map((s, idx) => (
                    <button
                      key={s.name}
                      onClick={() => switchSub(activeCat, idx)}
                      className="carousel-dot-btn sm:min-w-0 sm:min-h-0 sm:p-0 rounded-full transition-all duration-400"
                      aria-label={`Switch to ${s.name}`}
                    >
                      <span
                        className="block rounded-full transition-all duration-400"
                        style={{
                          width: activeSub === idx ? "22px" : "7px",
                          height: "7px",
                          background: activeSub === idx ? "#00793A" : "rgba(0,0,0,0.15)",
                        }}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    {activeSub + 1} / {cat.subProducts.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT 40% ─────────────────────────────── */}
          <div className="w-full lg:w-[40%] flex items-stretch">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: "480px" }}>
              {/* gradient border */}
              <div
                className="absolute -inset-[1.5px] rounded-2xl z-0"
                style={{
                  background: "linear-gradient(135deg,#00793A 0%,#ffc107 50%,#00793A 100%)",
                  opacity: 0.7,
                }}
              />
              {/* image crossfade */}
              <div
                className="absolute inset-[2px] rounded-2xl overflow-hidden z-10 bg-gray-100"
                style={{
                  opacity: imgVisible ? 1 : 0,
                  transform: imgVisible ? "scale(1)" : "scale(1.03)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "420px" }}
                />
                {/* bottom gradient label */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <p className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">
                    Sharon Collection
                  </p>
                  <p className="text-white text-lg font-bold">{sub.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: "rgba(255,193,7,0.25)", color: "#ffc107" }}
                    >
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {sub.warranty}
                    </span>
                    <Link
                      href={cat.href}
                      className="inline-cta-link inline-flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>

              {/* category label top-right */}
              <div className="absolute top-4 right-4 z-30">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white tracking-wider"
                  style={{ background: "rgba(0,121,58,0.85)", backdropFilter: "blur(8px)" }}
                >
                  {cat.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
