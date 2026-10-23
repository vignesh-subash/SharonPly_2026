"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Data ─────────────────────────────────────────── */
const PANELS = [
  {
    id: "plywood",
    num: "01",
    name: "Plywood",
    fullName: "Sharon Plywood",
    sub: "Strength for every structure",
    desc: "Precision-bonded panels from BWP to MR grade — engineered for kitchens, wardrobes, and facades that last a lifetime.",
    stat: "30+",
    statSuffix: " Yrs",
    statLabel: "Trusted Performance",
    href: "/plywood",
    cta: "Explore Plywood",
    accent: "#00793A",
    accentRgb: "0,121,58",
    image: "/images/hero-slide1-interior.jpg",
    imgPos: "center 30%",
    features: ["BWP / MR Grade", "Zero-Emission E0", "FIRESAVE Technology", "Lifetime Warranty"],
  },
  {
    id: "veneer",
    num: "02",
    name: "Veneer",
    fullName: "Sharon Veneer",
    sub: "Natural beauty for premium interiors",
    desc: "Rare grain patterns, engineered reconstituted species, and ultra-thin natural slices for walls, furniture, and signature interiors.",
    stat: "500+",
    statSuffix: "",
    statLabel: "Species & Patterns",
    href: "/veneer",
    cta: "Explore Veneer",
    accent: "#b45309",
    accentRgb: "180,83,9",
    image: "/images/veneer-slide-2.jpg",
    imgPos: "center center",
    features: ["Natural & Reconstituted", "Poly-Fibre Backed", "Epoxy-Sealed Finish", "Custom Sizes"],
  },
  {
    id: "doors",
    num: "03",
    name: "Doors",
    fullName: "Sharon Door",
    sub: "Lasting performance for every entrance",
    desc: "BWP-core flush, membrane, and decorative panel doors built for Indian conditions — termite-proof, moisture-proof, life-proof.",
    stat: "IS:2202",
    statSuffix: "",
    statLabel: "Certified Quality",
    href: "/door",
    cta: "Explore Doors",
    accent: "#1d4ed8",
    accentRgb: "29,78,216",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Door-resized-1770857728288.jpg?width=900&height=1200&resize=cover",
    imgPos: "center top",
    features: ["BWP Waterproof Core", "Termite Resistant", "25–35mm Thickness", "IS:2202 Certified"],
  },
] as const;

/* ─── Helpers ───────────────────────────────────────── */
function splitChars(text: string) {
  return text.split("").map((ch, i) => (
    <span key={i} className="psg-char" style={{ display: "inline-block", paddingBottom: 15 }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

/* ─── Component ─────────────────────────────────────── */
export default function ProductShowcaseGrid() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  /* ── Scroll-triggered entrance ── */
  useGSAP(() => {
    const chars = headRef.current?.querySelectorAll(".psg-char");
    const eyebrow = headRef.current?.querySelector(".psg-eyebrow");
    const sub = headRef.current?.querySelector(".psg-sub");
    const cards = cardsRef.current?.querySelectorAll(".psg-card-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    if (chars && chars.length) {
      tl.fromTo(chars,
        { y: "110%", opacity: 0, rotateX: -40 },
        {
          y: "0%", opacity: 1, rotateX: 0,
          duration: 0.7, ease: "power3.out",
          stagger: 0.025,
        },
        "-=0.3"
      );
    }
    if (sub) {
      tl.fromTo(sub,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.35"
      );
    }
    if (cards && cards.length) {
      tl.fromTo(cards,
        { x: -180, opacity: 0, rotateY: 8 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 0.9, ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.2"
      );
    }
  }, { scope: sectionRef });





  return (
    <>
      <style>{`
        @keyframes psg-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes psg-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes psg-count-up {
          from { clip-path: inset(100% 0 0 0); transform: translateY(100%); }
          to   { clip-path: inset(0 0 0 0); transform: translateY(0); }
        }
        @keyframes psg-border-spin {
          from { background-position: 0% 50%; }
          to   { background-position: 200% 50%; }
        }

        /* Panel expand */
        .psg-panels-grid {
          display: grid;
          transition: grid-template-columns 0.65s cubic-bezier(0.4,0,0.2,1);
          perspective: 1200px;
        }
        @media (min-width: 1024px) {
          .psg-panels-grid[data-active="plywood"] { grid-template-columns: 2.6fr 1fr 1fr; }
          .psg-panels-grid[data-active="veneer"]  { grid-template-columns: 1fr 2.6fr 1fr; }
          .psg-panels-grid[data-active="doors"]   { grid-template-columns: 1fr 1fr 2.6fr; }
          .psg-panels-grid[data-active="hovered-plywood"] { grid-template-columns: 2fr 1fr 1fr; }
          .psg-panels-grid[data-active="hovered-veneer"]  { grid-template-columns: 1fr 2fr 1fr; }
          .psg-panels-grid[data-active="hovered-doors"]   { grid-template-columns: 1fr 1fr 2fr; }
        }

        /* Panel base */
        .psg-panel {
          position: relative; overflow: hidden;
          cursor: pointer; min-height: 520px;
          transform-style: preserve-3d;
        }
        @media (min-width: 1024px) {
          .psg-panel { min-height: 580px; }
        }

        .psg-panel-img {
          position: absolute; inset: -8%;
          width: 116%; height: 116%;
          object-fit: cover;
          will-change: transform;
          transition: filter 0.5s;
        }
        .psg-panel:not([data-is-active="true"]) .psg-panel-img {
          filter: saturate(0.45) brightness(0.7);
        }
        .psg-panel[data-is-active="true"] .psg-panel-img {
          filter: saturate(1) brightness(0.85);
        }

        /* Overlay */
        .psg-panel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.35) 55%,
            transparent 100%
          );
          transition: opacity 0.4s;
        }

        /* Side number */
        .psg-panel-num {
          position: absolute;
          top: 50%; left: 20px;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          white-space: nowrap;
          transition: color 0.3s;
          user-select: none;
        }
        .psg-panel[data-is-active="true"] .psg-panel-num {
          color: rgba(255,255,255,0.45);
        }

        /* Bottom content */
        .psg-panel-foot {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 28px 24px;
          display: flex; flex-direction: column; gap: 0;
        }

        .psg-panel-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 8px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.65);
          width: fit-content; margin-bottom: 10px;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .psg-panel[data-is-active="true"] .psg-panel-tag {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        .psg-panel-name {
          font-size: clamp(1.5rem, 2.4vw, 2.6rem);
          font-weight: 900; line-height: 1;
          letter-spacing: -0.03em;
          color: rgba(255,255,255,0.6);
          margin: 0;
          transition: color 0.35s, font-size 0.35s;
          font-family: var(--font-display);
        }
        .psg-panel[data-is-active="true"] .psg-panel-name {
          color: #fff;
        }

        /* Expanded content (visible only on active) */
        .psg-panel-content {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s;
          margin-top: 0;
        }
        .psg-panel[data-is-active="true"] .psg-panel-content {
          max-height: 240px;
          opacity: 1;
          margin-top: 14px;
        }

        /* Accent bottom line */
        .psg-panel-line {
          position: absolute; bottom: 0; left: 0;
          height: 3px; width: 0%;
          transition: width 0.55s cubic-bezier(0.4,0,0.2,1);
          border-radius: 0;
        }
        .psg-panel[data-is-active="true"] .psg-panel-line {
          width: 100%;
        }

        /* CTA shimmer */
        .psg-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          font-size: 10px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 12px 24px; border-radius: 60px;
          color: #fff;
          isolation: isolate;
        }
        .psg-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.18);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .psg-cta:hover::before { transform: translateX(0); }

        /* Feature pills */
        .psg-feat {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 5px 10px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          white-space: nowrap;
        }

        /* Heading chars */
        .psg-heading-wrap {
          perspective: 800px;
          overflow: hidden;
        }

        /* Mobile swipe */
        .psg-mobile-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 12px;
          padding: 0 20px 4px;
        }
        .psg-mobile-track::-webkit-scrollbar { display: none; }
        .psg-mobile-card {
          scroll-snap-align: start;
          flex: 0 0 78vw;
          min-height: 420px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}

      >
        {/* ── Noise texture overlay ── */}
        

        {/* ── Ticker ── */}
        <div style={{
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden", whiteSpace: "nowrap",
          padding: "9px 0", position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "inline-flex", animation: "psg-ticker 28s linear infinite" }}>
            {[...Array(2)].map((_, ri) => (
              <span key={ri} style={{ display: "inline-flex", alignItems: "center" }}>
                {["Plywood", "Veneer", "Flush Doors", "Teak Wood", "Sharon Collection", "Since 1987", "Made in India"].map((t, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.28em",
                      textTransform: "uppercase", color: "rgba(0,0,0,0.3)",
                      padding: "0 24px",
                    }}>{t}</span>
                    <span style={{ color: "#00793A", fontSize: 10, opacity: 0.7 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── Header ── */}
        <div
          ref={headRef}
          style={{
            position: "relative", zIndex: 2,
            padding: "clamp(36px,5vw,72px) clamp(20px,4vw,64px) clamp(28px,4vw,56px)",
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          }}
        >
          <div>
            {/* Eyebrow */}
            <div className="psg-eyebrow" style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#00793A",
                boxShadow: "0 0 10px #00793A",
                animation: "psg-pulse 2.5s ease-in-out infinite",
              }} />
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.32em",
                textTransform: "uppercase", color: "rgba(0,0,0,0.4)",
              }}>Solutions</span>
              <div style={{ width: 32, height: 1, background: "rgba(0,0,0,0.12)" }} />
            </div>

            {/* Headline with char animation */}
            <div className="psg-heading-wrap">
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,5vw,5rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#1a1a1a",
                margin: 0,
              }}>
                {splitChars("Explore")}
                <br />
                <span style={{ color: "#00793A" }}>{splitChars("SharonPly Solutions")}</span>
              </h2>
            </div>

            {/* Subtext */}
            <p style={{
              fontSize: 14,
              color: "#5a5a5a",
              lineHeight: 1.7,
              maxWidth: 520,
              marginTop: 8,
            }}>
              From high-performance plywood to premium veneers and durable doors, discover materials engineered for every space.
            </p>
          </div>


        </div>

        {/* ── Desktop: 3 Product Verticals ── */}
        <div className="hidden lg:block" style={{
          padding: "0 clamp(24px,4vw,64px) clamp(48px,5vw,80px)",
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PANELS.map((p) => (
              <div
                key={p.id}
                className="group psg-card-item"
                style={{
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#f8faf9",
                  border: "1px solid rgba(0,0,0,0.06)",
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s",
                  minHeight: 480,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
                  const img = el.querySelector('.psg-card-img') as HTMLElement;
                  if (img) img.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  const img = el.querySelector('.psg-card-img') as HTMLElement;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="psg-card-img"
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: p.imgPos,
                      transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                    loading="lazy"
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)",
                  }} />
                  {/* Number badge */}
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    width: 36, height: 36, borderRadius: "50%",
                    background: p.accent, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900, letterSpacing: "-0.02em",
                    boxShadow: `0 4px 16px rgba(${p.accentRgb},0.3)`,
                  }}>{p.num}</div>
                  {/* Category tag */}
                  <div style={{
                    position: "absolute", bottom: 16, left: 20,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{
                      fontSize: 9, fontWeight: 800, letterSpacing: "0.22em",
                      textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
                    }}>{p.sub}</span>
                    <div style={{ width: 24, height: 2, borderRadius: 1, background: p.accent }} />
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem", fontWeight: 900,
                    color: "#1a1a1a", margin: "0 0 8px",
                    letterSpacing: "-0.03em",
                  }}>{p.fullName}</h3>
                  <p style={{
                    fontSize: 13, color: "#666",
                    lineHeight: 1.7, margin: "0 0 20px",
                  }}>{p.desc}</p>
                  {/* Features */}
                  <div style={{
                    display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24,
                  }}>
                    {p.features.map(f => (
                      <span key={f} style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                        padding: "4px 12px", borderRadius: 100,
                        background: `${p.accent}12`,
                        color: p.accent,
                        border: `1px solid ${p.accent}22`,
                      }}>{f}</span>
                    ))}
                  </div>
                  {/* CTA */}
                  <Link
                    href={p.href}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: p.accent, color: "#fff",
                      fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "11px 24px", borderRadius: 60,
                      textDecoration: "none",
                      boxShadow: `0 6px 20px rgba(${p.accentRgb},0.3)`,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 10px 30px rgba(${p.accentRgb},0.4)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 6px 20px rgba(${p.accentRgb},0.3)`;
                    }}
                  >
                    {p.cta}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ── Mobile Cards ── */}        {/* ── Mobile Cards ── */}
        <div className="lg:hidden" style={{ paddingBottom: 40, position: "relative", zIndex: 2 }}>
          <div className="psg-mobile-track">
            {PANELS.map((p) => (
              <div key={p.id} className="psg-mobile-card">
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: p.imgPos,
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)",
                }} />
                {/* Accent line */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${p.accent}, #ffc107)`,
                }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "24px 20px",
                }}>
                  <span style={{
                    fontSize: 8, fontWeight: 800, letterSpacing: "0.22em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
                    display: "block", marginBottom: 6,
                  }}>{p.num} — {p.sub}</span>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem", fontWeight: 900,
                    color: "#fff", margin: "0 0 8px", letterSpacing: "-0.03em",
                  }}>{p.name}</h3>
                  <p style={{
                    fontSize: 12, color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6, margin: "0 0 16px",
                  }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href={p.href} style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: p.accent, color: "#fff",
                      fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                      textTransform: "uppercase", padding: "10px 20px", borderRadius: 60,
                      textDecoration: "none",
                      boxShadow: `0 4px 16px rgba(${p.accentRgb},0.4)`,
                    }}>
                      {p.cta}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <span style={{
                      fontSize: "1.1rem", fontWeight: 900, color: p.accent, letterSpacing: "-0.02em",
                    }}>{p.stat}</span>
                    <span style={{
                      fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "rgba(0,0,0,0.3)",
                    }}>{p.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Trailing spacer */}
            <div style={{ flex: "0 0 8px" }} />
          </div>
        </div>

      </section>
    </>
  );
}
