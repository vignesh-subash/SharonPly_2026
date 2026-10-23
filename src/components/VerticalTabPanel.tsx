"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Recommendation {
  image: string;
  benefit: string;
  href: string;
}

interface Persona {
  label: string;
  mobileLabel?: string;
  heroImage: string;
  heroHeadline: string;
  heroSentence: string;
  recommendations: Recommendation[];
}

const PERSONAS: Persona[] = [
  {
    label: "Architect & Interior Designer",
    mobileLabel: "Architects & Designers",
    heroImage: "/images/hero-slide1-interior.jpg",
    heroHeadline: "Design with elegance. Deliver with confidence.",
    heroSentence: "Premium plywood and veneers that bring your vision to life with beauty and precision.",
    recommendations: [
      {
        image: "/images/2026/built-for/architect-veneer.webp",
        benefit: "Veneers — natural wood finish specified daily for premium interiors.",
        href: "/veneer/",
      },
      {
        image: "/images/2026/built-for/architect-plywood.webp",
        benefit: "BWP plywood — waterproof core for kitchen, bathroom, and exterior joinery.",
        href: "/plywood/sharon-platinum-ply",
      },
      {
        image: "/images/2026/built-for/architect-door.webp",
        benefit: "Flush doors — precision-engineered for seamless interior installations.",
        href: "/door/sharon-gold-door",
      },
    ],
  },
  {
    label: "Builders & Developers",
    mobileLabel: "Builders & Developers",
    heroImage: "/images/our-history-hero.jpg",
    heroHeadline: "Build stronger. Scale faster.",
    heroSentence: "Structural-grade plywood and certified materials engineered for large-scale projects.",
    recommendations: [
      {
        image: "/images/2026/built-for/builders-plywood.webp",
        benefit: "BWP plywood — waterproof grade built for high-moisture and structural applications.",
        href: "/plywood/sharon-gold-marine-plywood",
      },
      {
        image: "/images/2026/built-for/builders-veneer.webp",
        benefit: "Veneers — natural wood finish for premium commercial interiors.",
        href: "/veneer/",
      },
      {
        image: "/images/2026/built-for/builders-door.webp",
        benefit: "Flush doors — uniform dimensions for large-scale residential and commercial projects.",
        href: "/door/sharon-gold-door",
      },
    ],
  },
  {
    label: "Carpentry Contractors",
    mobileLabel: "Carpentry Contractors",
    heroImage: "/images/sharon-prima-armor-card.jpg",
    heroHeadline: "Craft with precision. Build to last.",
    heroSentence: "Workmanship-friendly materials designed for flawless on-site execution.",
    recommendations: [
      {
        image: "/images/2026/built-for/carpentry-plywood.webp",
        benefit: "BWP plywood — dense core for clean screw-hold and precise on-site fabrication.",
        href: "/plywood/sharon-prima-710",
      },
      {
        image: "/images/2026/built-for/carpentry-veneer.webp",
        benefit: "Veneers — natural wood finish for custom joinery and cabinetry.",
        href: "/veneer/",
      },
      {
        image: "/images/2026/built-for/carpentry-door.webp",
        benefit: "Flush doors — ready to install, saves on-site fabrication time.",
        href: "/door/sharon-gold-door",
      },
    ],
  },
  {
    label: "Home Owners",
    mobileLabel: "Home Owners",
    heroImage: "/images/hero-slide3-interior.jpg",
    heroHeadline: "Create spaces you'll love forever.",
    heroSentence: "Lifetime-backed materials that make every home beautiful, safe, and resilient.",
    recommendations: [
      {
        image: "/images/2026/built-for/homeowners-plywood.webp",
        benefit: "BWP plywood — warranty-backed protection for wardrobes, shelves, and cabinets.",
        href: "/plywood/sharon-gold-marine-plywood",
      },
      {
        image: "/images/2026/built-for/homeowners-veneer.webp",
        benefit: "Veneers — natural wood finish for warm, elegant interiors.",
        href: "/veneer/",
      },
      {
        image: "/images/2026/built-for/homeowners-door.webp",
        benefit: "Flush doors — elegant, durable doors for every room in your home.",
        href: "/door/sharon-gold-door",
      },
    ],
  },
];

// ── SVG Icon Components ──────────────────────────────────────────────────────
const ArchitectIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Drafting triangle */}
    <path d="M4 21L12 4l8 17H4z" />
    {/* Pencil/scale line */}
    <path d="M12 4v6" />
    {/* Measurement marks */}
    <path d="M7 17h4M7 14h6" strokeWidth="1" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const BuilderIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Building structure */}
    <path d="M4 21V8l8-6 8 6v13" />
    {/* Floors with windows */}
    <rect x="8" y="10" width="3" height="4" rx="0.5" />
    <rect x="13" y="10" width="3" height="4" rx="0.5" />
    <rect x="8" y="16" width="3" height="4" rx="0.5" />
    <rect x="13" y="16" width="3" height="4" rx="0.5" />
  </svg>
);

const CarpenterIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Carpenter's square */}
    <path d="M5 21V5h16" />
    {/* Saw blade */}
    <circle cx="16" cy="16" r="5" />
    <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
    {/* Saw teeth marks */}
    <path d="M16 11v2M16 19v2M11 16h2M19 16h2" strokeWidth="1" />
  </svg>
);

const HomeownerIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* House roof */}
    <path d="M4 11l8-7 8 7" />
    {/* House body */}
    <rect x="6" y="11" width="12" height="10" rx="1" />
    {/* Door */}
    <rect x="11" y="15" width="2" height="6" rx="0.5" />
    {/* Windows */}
    <rect x="7.5" y="13.5" width="2.5" height="2.5" rx="0.5" />
    <rect x="14" y="13.5" width="2.5" height="2.5" rx="0.5" />
  </svg>
);

const PERSONA_ICONS = [<ArchitectIcon />, <BuilderIcon />, <CarpenterIcon />, <HomeownerIcon />];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function VerticalTabPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile(768);
  const persona = PERSONAS[activeTab];

  return (
    <section className="snap-section" style={{
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      padding: isMobile ? "0 16px 0" : "0 52px 0", justifyContent: "flex-start",
    }}>
      {/* Section Heading */}
      <div style={{ flexShrink: 0, padding: isMobile ? "32px 0 20px" : "52px 0 28px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(27px, 2.7vw, 44px)",
            fontWeight: 700,
            color: "#00793A",
            lineHeight: 1.1,
          }}
        >
          Built for every creator<br />of spaces.
        </h2>
      </div>

      {/* Two-column CSS Grid body */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "270px 1fr",
          overflow: "hidden",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          minHeight: 0,
        }}
      >
        {/* ── Column 1: Audience Navigation ── */}
        <div
          style={{
            borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.06)",
            borderBottom: isMobile ? "1px solid rgba(0,0,0,0.06)" : "none",
            display: isMobile ? "grid" : "flex",
            gridTemplateColumns: isMobile ? "1fr 1fr" : undefined,
            flexDirection: isMobile ? undefined : "column",
            overflow: isMobile ? "visible" : "hidden",
            gap: isMobile ? 8 : 0,
            padding: isMobile ? "0 0 12px" : 0,
          }}
        >
          {PERSONAS.map((p, i) => {
            const isActive = i === activeTab;
            const displayLabel = isMobile ? (p.mobileLabel ?? p.label) : p.label;
            return (
              <button
                key={p.label}
                onClick={() => setActiveTab(i)}
                style={{
                  flex: isMobile ? undefined : 1,
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? 6 : 10,
                  padding: isMobile ? "12px 10px" : "10px 18px",
                  cursor: "pointer",
                  borderLeft: isMobile ? "none" : isActive ? "4px solid #00793A" : "4px solid transparent",
                  borderBottom: isMobile ? "none" : "none",
                  border: isMobile ? (isActive ? "2px solid #00793A" : "1px solid rgba(0,0,0,0.08)") : undefined,
                  borderRadius: isMobile ? 10 : 0,
                  background: isActive ? "#f0faf5" : "#FFFFFF",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  borderTop: isMobile ? undefined : "none",
                  borderRight: isMobile ? undefined : "none",
                  width: "100%",
                  position: "relative",
                  minHeight: isMobile ? 88 : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "#f9faf7";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                }}
              >
                <span style={{
                  flexShrink: 0,
                  color: isActive ? "#00793A" : "rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  transform: isMobile ? "scale(0.72)" : undefined,
                  transformOrigin: "top left",
                }}>
                  {PERSONA_ICONS[i]}
                </span>
                <span style={{
                  flex: 1,
                  fontFamily: 'var(--font-brand)',
                  fontSize: isMobile ? 12 : 18,
                  fontWeight: 700,
                  color: isActive ? "#00793A" : "#1a1a1a",
                  lineHeight: 1.25,
                  letterSpacing: "0.02em",
                  whiteSpace: "normal",
                }}>
                  {isMobile
                    ? displayLabel
                    : (p.label.includes(" & ") ? <>{p.label.split(" & ")[0] + " &"}<br />{p.label.split(" & ")[1]}</> : <>{p.label}</>)}
                </span>
                <span style={{
                  flexShrink: 0,
                  color: isActive ? "#00793A" : "rgba(0,0,0,0.2)",
                  display: isMobile ? "none" : "flex",
                  alignItems: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Column 2: Product Recommendations ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            overflow: "hidden",
            padding: isMobile ? "0 0 6px" : "0 28px 6px",
            background: "#FFFFFF",
            gap: 6,
          }}
        >
          {/* Recommended for you */}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: "#00793A",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-brand)',
                fontSize: 11,
                fontWeight: 700,
                color: "#00793A",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                Recommended for you
              </span>
            </div>

            {/* Exactly 3 recommendation cards */}
            <div style={{
              display: isMobile ? "flex" : "grid",
              gridTemplateColumns: isMobile ? undefined : "repeat(3, 1fr)",
              gap: 10,
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: isMobile ? "touch" : undefined,
              scrollSnapType: isMobile ? "x mandatory" : undefined,
              paddingBottom: isMobile ? 4 : 0,
            }}>
              {persona.recommendations.map((rec) => (
                <Link
                  key={rec.href}
                  href={rec.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                    flex: isMobile ? "0 0 78%" : undefined,
                    scrollSnapAlign: isMobile ? "start" : undefined,
                    minWidth: isMobile ? 0 : undefined,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 6px 20px rgba(0,121,58,0.10), 0 2px 6px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(-2px)";
                    el.style.borderColor = "rgba(0,121,58,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)";
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "rgba(0,0,0,0.04)";
                  }}
                >
                  <div style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "#f5f5f5",
                  }}>
                    <img
                      src={rec.image}
                      alt={rec.benefit}
                      style={{
                        width: "100%",
                        aspectRatio: "var(--ratio-tile)",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      onError={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.display = "none";
                      }}
                    />
                  </div>
                  <div style={{
                    padding: "6px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    background: "#FFFFFF",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                      margin: 0,
                    }}>
                      {rec.benefit}
                    </p>
                    <div style={{
                      marginTop: "auto",
                      fontFamily: 'var(--font-brand)',
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#00793A",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>
                      Explore →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
