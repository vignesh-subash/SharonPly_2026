"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Feature {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  image: string;
}

const FEATURES: Feature[] = [
  {
    num: "01",
    title: "VIRASAFE",
    subtitle: "ANTIVIRAL PROTECTION",
    desc: "Advanced anti-viral technology on plywood surfaces, actively reducing microbial growth for healthier indoor spaces.",
    href: "/virasafe",
    image: "/images/2026/home/feature-virasafe.webp",
  },
  {
    num: "02",
    title: "FIRESAVE",
    subtitle: "FIRE SAFETY",
    desc: "Fire-retardant plywood certified under IS:5509, designed to limit flame spread and reduce smoke emission.",
    href: "/sharon-firesave",
    image: "/images/2026/home/feature-firesave.webp",
  },
  {
    num: "03",
    title: "E-ZERO",
    subtitle: "ZERO EMISSION",
    desc: "CARB E0 certified with formaldehyde emission ≤0.5 mg/L, ensuring cleaner indoor air for your family.",
    href: "/e-zero-emission",
    image: "/images/2026/home/feature-e-zero.webp",
  },
  {
    num: "04",
    title: "CALIBRATED PLYWOOD",
    subtitle: "PRECISION SURFACE",
    desc: "Precision-calibrated surfaces with uniform thickness from all sides, delivering a perfectly flat finish for seamless installations.",
    href: "/technology#calibrated-plywood",
    image: "/images/2026/home/feature-calibrated.webp",
  },
];

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
function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isTablet;
}

export default function FeatureGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);

  return (
    <section className="snap-section" style={{
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      padding: 0,
    }}>
      {/* Header */}
      <div style={{ padding: isMobile ? "32px 20px 20px" : isTablet ? "48px 40px 28px" : "60px 56px 32px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 2.8vw, 46px)",
            fontWeight: 700,
            color: "#00793A",
            lineHeight: 1.1,
            letterSpacing: "-0.3px",
          }}
        >
          What makes SharonPly<br />{' '}
          different{' '}from every others.
        </h2>
        <div style={{
          width: 40,
          height: 3,
          background: "#ffc107",
          marginTop: 14,
          borderRadius: 2,
        }} />
      </div>

      {/* 4-up grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {FEATURES.map((feature, idx) => (
          <Link
            key={feature.num}
            href={feature.href}
            style={{
              background: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              textDecoration: "none",
              borderRight: idx < FEATURES.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              position: "relative",
              overflow: "hidden",
              transform: hoveredIdx === idx ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredIdx === idx
                ? "0 8px 32px rgba(0,121,58,0.12), 0 2px 8px rgba(0,0,0,0.04)"
                : "none",
              zIndex: hoveredIdx === idx ? 2 : 1,
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Image — logo square */}
            <div style={{
              width: "100%",
              aspectRatio: "var(--ratio-tile)",
              overflow: "hidden",
              background: "#f5f5f5",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? 8 : 0,
            }}>
              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: isMobile ? "contain" : "cover",
                  objectPosition: "center center",
                  transition: isMobile ? undefined : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  transform: !isMobile && hoveredIdx === idx ? "scale(1.06)" : "scale(1)",
                }}
                onError={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.display = "none";
                }}
              />
            </div>
            {/* Content */}
            <div style={{
              padding: isMobile ? "12px 12px 14px" : "20px 24px 24px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: isMobile ? 4 : 6,
            }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? 15 : 20,
                fontWeight: 700,
                color: "#00793A",
                lineHeight: 1.3,
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? 10 : 12,
                color: "rgba(0,0,0,0.48)",
                lineHeight: 1.5,
                margin: 0,
                flex: 1,
                display: isMobile ? "-webkit-box" : "block",
                WebkitLineClamp: isMobile ? 3 : undefined,
                WebkitBoxOrient: isMobile ? "vertical" : undefined,
                overflow: isMobile ? "hidden" : "visible",
              }}>
                {feature.desc}
              </p>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                color: hoveredIdx === idx ? "#00793A" : "rgba(0,121,58,0.6)",
                letterSpacing: 1.5,
                transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)",
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}>
                LEARN MORE
                <span style={{
                  display: "inline-block",
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                  transform: hoveredIdx === idx ? "translateX(4px)" : "translateX(0)",
                }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: isMobile ? "16px 20px" : "24px 56px", flexShrink: 0, borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        <Link
          href="/technology"
          className="inline-cta-link"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 600,
            color: "#00793A",
            letterSpacing: 2,
            cursor: "pointer",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.25s cubic-bezier(0.22,1,0.36,1)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0F0F0E"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#00793A"; }}
        >
          EXPLORE ALL TECHNOLOGIES
          <span style={{ fontSize: 14 }}>→</span>
        </Link>
      </div>
    </section>
  );
}