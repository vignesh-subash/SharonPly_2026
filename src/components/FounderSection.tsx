import Link from "next/link";

const stats = [
  { number: "1987",     label: "Founded" },
  { number: "38+",      label: "Years of excellence" },
  { number: "Japan",    label: "Exports to" },
  { number: "ISO 9001", label: "First in Tamil Nadu" },
];

export default function FounderSection() {
  return (
    <section
      style={{
        background: "#0f0e0c",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background decorative elements ── */}
      {/* Large faint circle top-right */}
      <div style={{
        position: "absolute", top: "-180px", right: "-180px",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,121,58,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Small accent circle bottom-left */}
      <div style={{
        position: "absolute", bottom: "10%", left: "-80px",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,113,74,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Subtle grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* ── Main content ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full"
        style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}
      >
        {/* Eyebrow */}
        <div style={{ marginBottom: 48, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ height: 1, width: 40, background: "rgba(192,113,74,0.5)" }} />
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#c0714a",
          }}>
            A Message from the Founder
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — avatar card */}
          <div className="flex flex-col items-center lg:items-start">

            {/* Avatar with ring + glow */}
            <div style={{ position: "relative", marginBottom: 28 }}>
              {/* outer glow ring */}
              <div style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                background: "conic-gradient(from 180deg, #00793A 0%, #c0714a 50%, #00793A 100%)",
                opacity: 0.25,
              }} />
              {/* ring border */}
              <div style={{
                position: "absolute", inset: -3, borderRadius: "50%",
                background: "conic-gradient(from 180deg, rgba(0,121,58,0.6) 0%, rgba(192,113,74,0.6) 50%, rgba(0,121,58,0.6) 100%)",
              }} />
              {/* avatar circle */}
              <div style={{
                position: "relative",
                width: 140, height: 140, borderRadius: "50%",
                background: "linear-gradient(135deg, #1e1c19 0%, #2a2620 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, fontWeight: 800,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                zIndex: 1,
              }}>
                VK
              </div>
            </div>

            {/* Name + title */}
            <h3 style={{
              fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 900,
              color: "#ffffff", marginBottom: 6, lineHeight: 1.15,
              textAlign: "center",
            }}
              className="lg:text-left"
            >
              Vishnu Khemani
            </h3>
            <p style={{
              fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: 28,
              textAlign: "center",
            }}
              className="lg:text-left"
            >
              Founder &amp; Managing Director
            </p>

            {/* Tenure badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 999,
              background: "rgba(0,121,58,0.12)",
              border: "1px solid rgba(0,121,58,0.25)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00793A" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80", letterSpacing: "0.06em" }}>
                Leading SharonPly since 1987
              </span>
            </div>
          </div>

          {/* Right — quote + values + CTA */}
          <div>
            {/* Large decorative quote mark */}
            <div style={{
              fontSize: 120, lineHeight: 1, color: "rgba(192,113,74,0.15)",
              fontFamily: "var(--font-brand)", marginBottom: -20, marginLeft: -8,
              userSelect: "none",
            }}>
              &ldquo;
            </div>

            <blockquote style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.8,
              marginBottom: 32,
              fontStyle: "italic",
              borderLeft: "3px solid rgba(192,113,74,0.5)",
              paddingLeft: 20,
            }}>
              I started SharonPly with one belief — that Indian craftsmen and architects
              deserved plywood engineered to the same standard as the finest buildings
              they were designing. 38 years later, that belief is every sheet we make.
            </blockquote>

            {/* Values row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {["Quality First", "Made in India", "Zero Compromise", "Built to Outlast"].map((v) => (
                <span key={v} style={{
                  fontSize: 11, fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6, padding: "5px 12px",
                }}>
                  {v}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href="/our-history"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 10,
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                  color: "#ffffff",
                  background: "linear-gradient(135deg, #c0714a 0%, #a85a36 100%)",
                  boxShadow: "0 6px 20px rgba(192,113,74,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                Read Our Story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 10,
                  fontSize: 13, fontWeight: 700,
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                Watch Founder&apos;s Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        position: "relative", zIndex: 1,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 28px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : undefined,
                }}
                className={i < 2 ? "border-b border-white/[0.07] lg:border-b-0" : ""}
              >
                <p style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 900,
                  color: "#ffffff", lineHeight: 1.1, marginBottom: 5,
                  background: "linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {stat.number}
                </p>
                <p style={{
                  fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
