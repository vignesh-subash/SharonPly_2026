"use client";

import React from "react";
import InnerPageLayout from "@/components/InnerPageLayout";

const SB = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a";
const HERO = `${SB}/Plywood-resized-1770810953635.jpg?width=1600&height=700&resize=cover`;


const productionLines = [
  { label: "Plywood", capacity: "BWP, Marine & MR Grades", icon: "🪵" },
  { label: "Veneer", capacity: "Natural Decorative Finishes", icon: "🌿" },
  { label: "Doors", capacity: "Sovereign Premium Range", icon: "🚪" },
];


export default function OurFactoryPage() {

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "About Us", href: "/our-history" }, { label: "Our Factory" }]}
      title="Our Factory"
      subtitle="State-of-the-art green manufacturing since 1987"
      heroImage={HERO}
    >

      {/* ── Factory Overview ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 24,
                  transform: "translate(16px, 16px)",
                  background: "linear-gradient(135deg, rgba(0,121,58,0.12), rgba(255,193,7,0.12))",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=85"
                alt="SharonPly Manufacturing Facility — Gummidipoondi"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "var(--ratio-card)",
                  objectFit: "cover",
                  borderRadius: 24,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.16)",
                }}
              />
              {/* Overlay badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  padding: "14px 22px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid rgba(0,121,58,0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 900, color: "#00793A" }}>Est. 1987</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Manufacturing Facility
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  padding: "8px 16px",
                  borderRadius: 12,
                  background: "rgba(255,193,7,0.95)",
                  boxShadow: "0 4px 16px rgba(255,193,7,0.35)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Est. 1987</div>
                <div style={{ fontSize: 11, color: "#555" }}>Gummidipoondi</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                  padding: "6px 16px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  background: "#f0faf4",
                  color: "#00793A",
                  border: "1px solid rgba(0,121,58,0.2)",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00793A" }} />
                World-Class Infrastructure
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#1a1a1a",
                  marginBottom: 4,
                  lineHeight: 1.15,
                }}
              >
                India&apos;s Largest
              </h2>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#00793A",
                  marginBottom: 24,
                  lineHeight: 1.15,
                }}
              >
                Plywood Facility
              </h2>

              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  marginBottom: 24,
                  background: "linear-gradient(135deg, #f0faf4, #fffbeb)",
                  borderLeft: "4px solid #ffc107",
                  boxShadow: "0 4px 20px rgba(0,121,58,0.08)",
                }}
              >
                <p style={{ fontSize: 16, fontWeight: 600, color: "#222", lineHeight: 1.7, marginBottom: 12 }}>
                  Our state-of-the-art manufacturing facility in Gummidipoondi, near Chennai, is
                  equipped with Japanese Kyoto ProTech technology and a 1056 KV solar captive power plant —
                  saving approximately 1.5 million units of power annually.
                </p>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>
                  From raw timber to finished board, every step of production is monitored by our in-house
                  quality lab, ensuring every SharonPly product meets the highest international standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Production Lines ── */}
      <section
        style={{
          padding: "40px 0 48px",
          background: "linear-gradient(135deg, #0a1f13 0%, #00793A 50%, #0a1f13 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hex-factory" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 58,17 58,35 30,50 2,35 2,17" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-factory)" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "rgba(255,193,7,0.15)",
                color: "#ffc107",
                border: "1px solid rgba(255,193,7,0.3)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffc107" }} />
              What We Produce
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "white", marginBottom: 12 }}>
              Our <span style={{ color: "#ffc107" }}>Production Lines</span>
            </h2>
            <div
              style={{
                margin: "0 auto",
                height: 4,
                width: 96,
                borderRadius: 999,
                background: "linear-gradient(90deg, #00793A, #ffc107)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 48, maxWidth: 680, margin: "0 auto 48px" }}>
            {productionLines.map((line, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 18,
                  padding: "20px 14px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,193,7,0.15)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,193,7,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{line.icon}</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 4 }}>{line.label}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{line.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "40px 0",
          background: "linear-gradient(135deg, #00793A 0%, #005c2c 50%, #003d1e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "white", marginBottom: 10 }}>
            Experience the <span style={{ color: "#ffc107" }}>SharonPly Difference</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Get in touch to learn more about our products and manufacturing capabilities.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                color: "#1a1a1a",
                background: "linear-gradient(135deg, #ffc107, #f57c00)",
                boxShadow: "0 6px 24px rgba(255,193,7,0.35)",
              }}
            >
              Contact Us
            </a>
            <a
              href="/our-history"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 24px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                color: "white",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              ← About Us
            </a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
