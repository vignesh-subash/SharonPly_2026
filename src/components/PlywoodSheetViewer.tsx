"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";

export interface SheetHotspot {
  id: string;
  x: number;        // % from left
  y: number;        // % from top
  label: string;
  detail: string;
  icon: "iso" | "qr" | "warranty" | "virasafe" | "bwp" | "firesave" | "bis" | "barcode";
  color: string;
}

interface Props {
  image: string;
  productName: string;
  hotspots: SheetHotspot[];
  gradeColor?: string;
}

const HOTSPOT_ICONS: Record<SheetHotspot["icon"], ReactElement> = {
  iso: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  qr: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="4" height="4"/>
    </svg>
  ),
  warranty: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  virasafe: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  bwp: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  firesave: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
    </svg>
  ),
  bis: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  barcode: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14"/>
    </svg>
  ),
};

export default function PlywoodSheetViewer({ image, productName, hotspots, gradeColor = "#00793A" }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleHotspotClick = (hs: SheetHotspot) => {
    setActiveId(activeId === hs.id ? null : hs.id);
  };

  const activeHotspot = hotspots.find((h) => h.id === activeId);

  // Tooltip side: prefer right unless hotspot is in right 40% of image
  const tooltipSide = (x: number) => x > 58 ? "left" : "right";

  return (
    <div
      ref={containerRef}
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "none" : "translateY(16px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        // Outer wrapper — provides shadow + perspective stage
        perspective: "1200px",
        position: "relative",
      }}
    >
      {/* Shadow beneath the tilted board */}
      <div style={{
        position: "absolute",
        bottom: -18,
        left: "8%",
        right: "8%",
        height: 32,
        background: "rgba(0,0,0,0.18)",
        filter: "blur(18px)",
        borderRadius: "50%",
        zIndex: 0,
      }} />

      {/* The board wrapper — rotated like a sheet leaning left */}
      <div
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          aspectRatio: "var(--ratio-product)",
          transform: "rotate(-6deg) rotateY(4deg)",
          transformOrigin: "center center",
          boxShadow: "8px 12px 40px rgba(0,0,0,0.28), 2px 4px 12px rgba(0,0,0,0.18)",
          zIndex: 1,
        }}
      >
        {/* Plywood image */}
        <img
          src={image}
          alt={productName}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="eager"
          draggable={false}
        />

        {/* Subtle wood-grain vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.14) 100%)",
        }} />

        {/* Grade stamp — top-left corner like a real board mark */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          padding: "4px 10px",
          borderRadius: 3,
          background: gradeColor,
          color: "#fff",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          zIndex: 5,
        }}>
          {productName}
        </div>

        {/* Hotspot markers — look like ink stamps on the board */}
        {hotspots.map((hs) => {
          const isActive = activeId === hs.id;
          return (
            <button
              key={hs.id}
              onClick={() => handleHotspotClick(hs)}
              style={{
                position: "absolute",
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {/* Pulse ring when active */}
              {isActive && (
                <span style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: "50%",
                  background: `${hs.color}30`,
                  animation: "hsRing 1s ease-out infinite",
                }} />
              )}

              {/* Stamp body — looks like an ink mark on wood */}
              <span style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: isActive ? 30 : 22,
                height: isActive ? 30 : 22,
                borderRadius: isActive ? 8 : 5,
                background: isActive ? hs.color : `${hs.color}dd`,
                color: "#fff",
                boxShadow: isActive
                  ? `0 0 0 3px ${hs.color}50, 0 4px 14px rgba(0,0,0,0.4)`
                  : `0 2px 6px rgba(0,0,0,0.35)`,
                transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                // Slightly irregular rotation to feel hand-stamped
                transform: `rotate(${hs.id.charCodeAt(0) % 7 - 3}deg)`,
              }}>
                {HOTSPOT_ICONS[hs.icon]}
              </span>

              {/* Connector line + Tooltip — NOT rotated (reads upright) */}
              {isActive && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  [tooltipSide(hs.x) === "right" ? "left" : "right"]: "calc(100% + 10px)",
                  zIndex: 30,
                  animation: "tooltipPop 0.22s cubic-bezier(0.22,1,0.36,1) forwards",
                  // Counter-rotate the tooltip so it's perfectly level
                  rotate: "6deg",
                }}>
                  <div style={{
                    width: 200,
                    borderRadius: 10,
                    background: "#fff",
                    border: `1.5px solid ${hs.color}35`,
                    boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                  }}>
                    {/* Arrow */}
                    <div style={{
                      position: "absolute",
                      top: "50%", transform: "translateY(-50%)",
                      [tooltipSide(hs.x) === "right" ? "left" : "right"]: -7,
                      width: 0, height: 0,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      [tooltipSide(hs.x) === "right" ? "borderRight" : "borderLeft"]: `7px solid ${hs.color}35`,
                    }} />
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 10px",
                      background: `${hs.color}10`,
                      borderBottom: `1px solid ${hs.color}18`,
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 6, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        background: hs.color, color: "#fff", flexShrink: 0,
                      }}>
                        {HOTSPOT_ICONS[hs.icon]}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>{hs.label}</span>
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <p style={{ fontSize: 11, color: "#666", lineHeight: 1.55, margin: 0 }}>{hs.detail}</p>
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}

      </div>

      {/* Legend chips — below the board, level (not rotated) */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16,
        animation: "fadeUp 0.35s ease forwards",
        paddingLeft: 4,
      }}>
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => handleHotspotClick(hs)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 6,
              fontSize: 10, fontWeight: 700,
              background: activeId === hs.id ? hs.color : "#f4f4f4",
              color: activeId === hs.id ? "#fff" : "#444",
              border: `1px solid ${activeId === hs.id ? hs.color : "#e0e0e0"}`,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <span style={{ color: activeId === hs.id ? "#fff" : hs.color }}>
              {HOTSPOT_ICONS[hs.icon]}
            </span>
            {hs.label}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes hsRing   { from { transform: scale(0.6); opacity: 0.8; } to { transform: scale(1.8); opacity: 0; } }
        @keyframes tooltipPop { from { opacity: 0; transform: translateY(-50%) scale(0.88); } to { opacity: 1; transform: translateY(-50%) scale(1); } }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse    { from { opacity: 0.4; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
