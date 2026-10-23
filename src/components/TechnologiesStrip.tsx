"use client";

import { useState } from "react";
import Link from "next/link";

const TECHNOLOGIES = [
  {
    name: "VIRASAFE",
    href: "/virasafe",
    tagline: "Antiviral Protection",
    desc: "Advanced anti-viral plywood technology designed to create safer, more hygienic interior spaces.",
    detail: "VIRASAFE-treated surfaces actively reduce viral load on contact, making SharonPly ideal for hospitals, schools, clinics, and high-traffic commercial interiors where hygiene is critical.",
    icon: "🛡️",
    color: "#1a56db",
  },
  {
    name: "FIRESAVE",
    href: "/sharon-firesave",
    tagline: "Fire Safety",
    desc: "Fire-retardant plywood certified under IS:5509, helping limit the spread of fire and smoke.",
    detail: "FIRESAVE-treated plywood self-extinguishes when the flame source is removed, significantly slowing fire propagation. Certified to IS:5509 for use in commercial buildings, theatres, and public spaces.",
    icon: "🔥",
    color: "#dc2626",
  },
  {
    name: "E-Zero",
    href: "/e-zero-emission",
    tagline: "Zero Emission",
    desc: "CARB E0 certified low-emission plywood for healthier indoor air quality in homes and offices.",
    detail: "E-Zero plywood emits ≤0.5 mg/L of formaldehyde — far below WHO safe limits. CARB Phase 2 certified for safer indoor air, especially important for bedrooms, kitchens, and children's spaces.",
    icon: "🌱",
    color: "#00793A",
  },
  {
    name: "Kyoto Pro-Tech",
    href: "/technology",
    tagline: "Japanese Technology",
    desc: "Superior Japanese bonding technology from Kyoto University ensuring unmatched strength and durability.",
    detail: "Developed in collaboration with Kyoto University researchers, Kyoto Pro-Tech uses advanced resin bonding that penetrates deeper into veneer layers, delivering 40% higher bond strength than conventional BWP-grade plywood.",
    icon: "⚙️",
    color: "#7c3aed",
  },
];

export default function TechnologiesStrip() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <style>{`
        @keyframes tech-glow {
          0%, 100% { box-shadow: 0 0 0px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
        .tech-glow-hover:hover {
          animation: tech-glow 2s ease-in-out infinite;
        }
        .tech-detail {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, margin 0.3s ease;
          margin-top: 0;
        }
        .tech-card:hover .tech-detail {
          max-height: 140px;
          opacity: 1;
          margin-top: 12px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#00793A] mb-3">
            Technology
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Technology That Strengthens Every Sheet
          </h1>
          <p className="text-[#5a5a5a] text-sm max-w-xl mx-auto">
            SharonPly products are engineered with advanced protective technologies for stronger, safer, and healthier interiors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNOLOGIES.map((tech) => {
            const isHovered = hovered === tech.name;
            return (
              <Link
                key={tech.name}
                href={tech.href}
                className="tech-card p-6 rounded-2xl border border-[#e8ece9] bg-white hover:shadow-xl hover:border-[transparent] transition-all duration-300 group cursor-pointer relative block"
                style={{
                  boxShadow: isHovered ? `0 8px 32px ${tech.color}25` : "none",
                }}
                onMouseEnter={() => setHovered(tech.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow border on hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      border: `1.5px solid ${tech.color}50`,
                      boxShadow: `inset 0 0 30px ${tech.color}15`,
                    }}
                  />
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 tech-glow-hover transition-all duration-300"
                  style={{
                    background: isHovered ? tech.color : `${tech.color}10`,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    color: isHovered ? "#fff" : tech.color,
                    transition: "background 0.3s, transform 0.3s, color 0.3s",
                    boxShadow: isHovered ? `0 4px 20px ${tech.color}50` : "none",
                  }}
                >
                  {isHovered ? (
                    <span style={{ filter: "brightness(10)" }}>{tech.icon}</span>
                  ) : (
                    tech.icon
                  )}
                </div>
                <h3 className="font-bold text-base text-[#1a1a1a] mb-1">{tech.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: tech.color }}>
                  {tech.tagline}
                </p>
                <p className="text-sm text-[#5a5a5a] leading-relaxed">{tech.desc}</p>

                {/* Expandable detail on hover */}
                <div className="tech-detail">
                  <div className="h-px w-full mb-3" style={{ background: `linear-gradient(90deg, ${tech.color}40, transparent)` }} />
                  <p className="text-xs text-[#6a7a6e] leading-relaxed">{tech.detail}</p>
                </div>

                {/* Hover hint */}
                <span
                  className="block text-[10px] font-semibold tracking-wider uppercase mt-3 transition-all duration-300"
                  style={{
                    color: isHovered ? tech.color : "#bcc5be",
                    opacity: isHovered ? 1 : 0.6,
                  }}
                >
                  {isHovered ? "Learn More" : "Hover to learn more"}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/plywood"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00793A] hover:text-[#005c2c] transition-colors"
          >
            Explore All Technologies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}