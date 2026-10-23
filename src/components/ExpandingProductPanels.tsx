"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Stacks below 1024px: at tablet widths three side-by-side panels inside a
   full-viewport snap section collapse to a ~0.28:1 sliver. */
function useIsMobile(breakpoint = 1024) {
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

interface PanelData {
  num: string;
  title: string;
  href: string;
  image: string;
  mobileImage?: string;
  gradient: string;
  patternAngle: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
}

const PANELS: PanelData[] = [
  {
    num: "01",
    title: "Sharon Plywood",
    href: "/plywood",
    image: "/images/2026/home/panel-plywood.webp",
    gradient: "linear-gradient(160deg, #5C3A1E 0%, #2C1608 100%)",
    patternAngle: 12,
    objectPosition: "center center",
    mobileObjectPosition: "center 42%",
  },
  {
    num: "02",
    title: "Sharon Veneer",
    href: "/veneer",
    image: "/images/2026/home/panel-veneer.webp",
    gradient: "linear-gradient(160deg, #4A3520 0%, #1E1005 100%)",
    patternAngle: 6,
    mobileObjectPosition: "center 35%",
  },
  {
    num: "03",
    title: "Sharon Door",
    href: "/door",
    image: "/images/2026/home/panel-door.webp",
    mobileImage: "/images/2026/home/panel-door-mobile.webp",
    gradient: "linear-gradient(160deg, #3D2A1A 0%, #150A04 100%)",
    patternAngle: 8,
    mobileObjectPosition: "center center",
  },
];

export default function ExpandingProductPanels() {
  const isMobile = useIsMobile();

  return (
    <section className="snap-section" style={{
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: isMobile ? "40px 20px 24px" : "52px 0 28px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(27px, 2.7vw, 44px)",
            fontWeight: 700,
            color: "#00793A",
            lineHeight: 1.1,
            paddingLeft: isMobile ? 0 : 52,
            paddingRight: isMobile ? 0 : 52,
          }}
        >
          Built without compromise.<br />Across every category.
        </h2>
      </div>

      {/* Expanding panels */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          gap: 1,
          background: "rgba(0,0,0,0.06)",
        }}
      >
        {PANELS.map((panel, i) => (
            <Link
              key={panel.num}
              href={panel.href}
              className={isMobile ? "epp-mobile-panel" : undefined}
              style={{
                flex: isMobile ? "0 0 auto" : "1 1 0%",
                minWidth: 0,
                minHeight: isMobile ? undefined : 220,
                aspectRatio: isMobile ? "var(--ratio-card)" : undefined,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {/* Product image */}
              <div style={{ position: "absolute", inset: 0 }}>
                {isMobile && panel.mobileImage ? (
                  <picture className="absolute inset-0 block">
                    <source media="(max-width: 767px)" srcSet={panel.mobileImage} type="image/webp" />
                    <source srcSet={panel.image} type="image/webp" />
                    <img
                      src={panel.image}
                      alt={panel.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={{
                        objectPosition: panel.mobileObjectPosition ?? panel.objectPosition ?? "center center",
                      }}
                    />
                  </picture>
                ) : (
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      objectPosition: isMobile
                        ? (panel.mobileObjectPosition ?? panel.objectPosition ?? "center center")
                        : (panel.objectPosition ?? "center center"),
                    }}
                  />
                )}
              </div>

              {/* Per-panel colour tint */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: panel.gradient,
                  opacity: 0.28,
                }}
              />

              {/* Wood-grain pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `repeating-linear-gradient(${panel.patternAngle}deg, transparent 0, transparent 22px, rgba(0,0,0,0.05) 22px, rgba(0,0,0,0.05) 23px)`,
                  opacity: 0.65,
                }}
              />

              {/* Bottom fade overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 15%, rgba(0,0,0,0.03) 60%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 28,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: 14,
                  }}
                >
                  {panel.title}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: 1.5,
                  }}
                >
                  EXPLORE →
                </div>
              </div>
            </Link>
        ))}
      </div>

      {isMobile && (
        <style>{`
          .epp-mobile-panel {
            min-height: 200px;
          }
        `}</style>
      )}
    </section>
  );
}
