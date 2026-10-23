"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SEGMENTS = [
  {
    id: "architects",
    num: "01",
    title: "Architects",
    label: "DESIGN & SPECIFICATION",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    description:
      "SharonPly delivers precision-engineered plywood, veneer, and door solutions that meet demanding architectural specifications — from structural performance to surface finish.",
    features: [
      "Custom specifications & cut-to-size",
      "E0 low-emission certified products",
      "Fire-retardant options available",
      "Premium veneer surface finishes",
    ],
    accent: "#1a3a6c",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=85",
  },
  {
    id: "interior-designers",
    num: "02",
    title: "Interior Designers",
    label: "AESTHETICS & FINISH",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    description:
      "SharonPly's product range empowers interior designers to realise any creative vision with materials that match both beauty and performance.",
    features: [
      "500+ veneer shades & exotic grains",
      "Designer flush door collection",
      "Consistent grain continuity sheets",
      "Dedicated design support",
    ],
    accent: "#7c4f1e",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85",
  },
  {
    id: "builders-developers",
    num: "03",
    title: "Builders & Developers",
    label: "CONSTRUCTION & PROJECTS",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    description:
      "SharonPly supports large-scale real estate and construction projects with consistent quality, reliable supply, and a dedicated account team.",
    features: [
      "BWP / BWR grade structural plywood",
      "High nail-holding strength",
      "Moisture & humidity resistant",
      "Bulk supply with dedicated logistics",
    ],
    accent: "#00793A",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=85",
  },
  {
    id: "carpentry-contractors",
    num: "04",
    title: "Carpentry Contractors",
    label: "WORKABILITY & RELIABILITY",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    description:
      "Reliable grades, consistent thickness, and easy workability make SharonPly the preferred choice for carpentry contractors who need materials that perform on site, every time.",
    features: [
      "Precise calibration for clean cuts",
      "Smooth surfaces for direct finishing",
      "Strong bonding for hardware fixtures",
      "MR & BWP grades for every application",
    ],
    accent: "#78350f",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85",
  },
  {
    id: "homeowners",
    num: "05",
    title: "Homeowners",
    label: "YOUR HOME. YOUR STANDARD",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    description:
      "Your home deserves materials that are safe, durable, and beautiful. SharonPly's premium range is waterproof, termite-resistant, and E0 certified — for a home that stands the test of time.",
    features: [
      "100% termite & borer resistant",
      "Waterproof BWP & Marine grade",
      "E0 emission-safe for families",
      "Stable & warp-free over years",
    ],
    accent: "#5c3a1e",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
  },
];

export default function WhoWeServeScrollPinned() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prevImage, setPrevImage] = useState(SEGMENTS[0].image);
  const [prevAccent, setPrevAccent] = useState(SEGMENTS[0].accent);
  const [fadingOut, setFadingOut] = useState(false);
  const seg = SEGMENTS[active];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setFadingOut(true);
      setTimeout(() => {
        setActive((prev) => {
          const next = (prev + 1) % SEGMENTS.length;
          return next;
        });
        setFadingOut(false);
      }, 400);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Track previous image for crossfade
  useEffect(() => {
    setPrevImage(seg.image);
    setPrevAccent(seg.accent);
  }, [active]);

  return (
    <section className="w-full relative overflow-hidden bg-white py-16 lg:py-24">
      <style>{`
        @keyframes fill-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .progress-bar-fill {
          animation: fill-bar 4.5s linear forwards;
        }
        .progress-bar-fill-paused {
          animation-play-state: paused;
        }
        .crossfade-image {
          transition: opacity 0.6s ease;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* ════ HEADER ════ */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00793A]/10 text-[#00793A] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00793A]" />
            Built for
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.8rem] font-extrabold text-[#111] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
          >
            Built for Every{" "}
            <span className="text-[#00793A]">Creator of Spaces</span>
          </h2>
          <p className="text-[#5a5a5a] text-sm md:text-[15px] max-w-2xl mt-5 leading-relaxed">
            Whether you design, build, furnish, or live in the space, SharonPly helps you choose materials with the right strength, finish, safety, and reliability.
          </p>
        </div>

        {/* ════ FULL-WIDTH PILL CONTAINER ════ */}
        <div
          className="relative w-full rounded-2xl bg-[#f3f4f3] p-1.5 mb-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Sliding highlight bar */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-500 ease-in-out"
            style={{
              width: `calc(${100 / SEGMENTS.length}% - 4px)`,
              left: `calc(${active * (100 / SEGMENTS.length)}% + 2px)`,
              background: SEGMENTS[active].accent,
              boxShadow: `0 4px 14px ${SEGMENTS[active].accent}35`,
            }}
          />
          {/* Role buttons */}
          <div className="relative flex w-full">
            {SEGMENTS.map((s, i) => {
              const on = active === i;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActive(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 7000); }}
                  className="relative flex-1 z-10 py-3 px-2 text-center transition-all duration-300 group"
                >
                  <span
                    className="block text-xs font-extrabold tracking-wider uppercase transition-all duration-300"
                    style={{
                      color: on ? "#fff" : "#8a9a90",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    className="block text-[9px] font-semibold tracking-widest uppercase mt-0.5 transition-all duration-300"
                    style={{
                      color: on ? "rgba(255,255,255,0.75)" : "#bcc5be",
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════ CONTENT AREA ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left — Image with crossfade */}
          <div className="relative rounded-2xl overflow-hidden order-2 lg:order-1">
            <div className="aspect-[4/3] relative">
              {/* Previous image — fading out */}
              <img
                key={`prev-${active}`}
                src={prevImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover crossfade-image"
                style={{
                  opacity: fadingOut ? 0 : 1,
                  filter: "brightness(0.92)",
                }}
              />
              {/* Current image — fading in */}
              {!fadingOut && (
                <img
                  key={`curr-${active}`}
                  src={seg.image}
                  alt={seg.title}
                  className="absolute inset-0 w-full h-full object-cover crossfade-image"
                  style={{
                    opacity: 1,
                    filter: "brightness(0.92)",
                  }}
                />
              )}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: `linear-gradient(135deg, ${seg.accent}25 0%, transparent 50%)` }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
                style={{ background: seg.accent }}
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-1 lg:order-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase mb-4 transition-all duration-500"
              style={{
                background: `${seg.accent}12`,
                color: seg.accent,
              }}
            >
              {seg.num} — {seg.label}
            </span>

            <h3
              className="text-2xl lg:text-3xl font-extrabold mb-4 transition-colors duration-500"
              style={{
                fontFamily: "var(--font-display)",
                color: seg.accent,
                letterSpacing: "-0.02em",
              }}
            >
              {seg.title}
            </h3>

            <p className="text-sm text-[#5a5a5a] leading-relaxed mb-6">
              {seg.description}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {seg.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: `${seg.accent}12` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={seg.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-[#4a4a4a]">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href={seg.ctaHref}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-300 hover:gap-4 hover:-translate-y-0.5"
              style={{
                background: seg.accent,
                color: "#fff",
                boxShadow: `0 4px 16px ${seg.accent}40`,
              }}
            >
              {seg.cta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ════ Progress bars (animated) ════ */}
        <div className="flex items-center gap-2 mt-10 lg:mt-12">
          {SEGMENTS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1">
              <button
                onClick={() => { setActive(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 7000); }}
                className="relative h-2 rounded-full transition-all duration-300 overflow-hidden"
                style={{
                  width: active === i ? 32 : 8,
                  background: active === i ? `${s.accent}25` : "#d5dbd7",
                }}
              >
                {/* Animated fill bar — only fills on active */}
                {active === i && (
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${isPaused ? "" : "progress-bar-fill"}`}
                    style={{
                      background: s.accent,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            </div>
          ))}
          <span className="text-[10px] font-semibold text-[#8a9a90] tracking-wider ml-3 uppercase">
            Auto-rotating
          </span>
        </div>
      </div>
    </section>
  );
}