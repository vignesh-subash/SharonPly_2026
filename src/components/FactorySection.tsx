"use client";
import { useEffect, useRef, useState } from "react";

const factoryFeatures = [
  {
    icon: "⚙️",
    title: "Kyoto ProTech Technology",
    description:
      "Licensed technology from Kyoto University's Wood Research Institute, Japan — making SharonPly the only Indian brand with this distinction.",
    color: "#1976d2",
  },
  {
    icon: "🔩",
    title: "Quadruple Press (MAT Process)",
    description:
      "Multi-Action Technology ensures every board is pressed 4 times for unmatched bonding strength, dimensional stability, and uniform thickness.",
    color: "#00793A",
  },
  {
    icon: "☀️",
    title: "1056 KV Solar Power Plant",
    description:
      "Captive solar facility saving approximately 1.5 million units of power annually, powering sustainable manufacturing operations.",
    color: "#f57c00",
  },
  {
    icon: "🏆",
    title: "ISO 9002 & ISO 14001 Certified",
    description:
      "First plywood manufacturer in India to receive both ISO 9002 (Quality) and ISO 14001 (Environmental Management) certifications.",
    color: "#ffc107",
  },
  {
    icon: "🌿",
    title: "FSC & CARB E0 Certified",
    description:
      "FSC Chain of Custody certified and CARB E0 (California Air Resources Board) compliant — zero formaldehyde emission for healthier spaces.",
    color: "#2e7d32",
  },
  {
    icon: "🛡️",
    title: "OHSAS 18001 Safety",
    description:
      "Occupational Health & Safety management certification ensuring world-class safety standards for all factory operations and workforce.",
    color: "#5c6bc0",
  },
];

const productionLines = [
  { label: "Plywood", capacity: "BWP, Marine & MR Grades" },
  { label: "Veneer", capacity: "Natural Decorative Finishes" },
  { label: "Doors", capacity: "Sovereign Premium Range" },
];

export default function FactorySection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ area: 0, power: 0, capacity: 0 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            factoryFeatures.forEach((_, i) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, i]);
              }, i * 150);
            });
            const duration = 2000;
            const steps = 60;
            const targets = { area: 50, power: 15, capacity: 120 };
            let step = 0;
            const interval = setInterval(() => {
              step++;
              const progress = step / steps;
              const ease = 1 - Math.pow(1 - progress, 3);
              setCounters({
                area: Math.round(targets.area * ease),
                power: Math.round(targets.power * ease * 10) / 10,
                capacity: Math.round(targets.capacity * ease),
              });
              if (step >= steps) clearInterval(interval);
            }, duration / steps);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    {/* ── Factory Hero Banner ── */}
    <section style={{ position: "relative", height: "55vh", minHeight: 360, overflow: "hidden" }}>
      <img
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Plywood-resized-1770810953635.jpg?width=1920&height=1080&resize=contain"
        alt="SharonPly Manufacturing Facility, Gummidipoondi"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,20,10,0.80) 0%, rgba(0,60,28,0.60) 60%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      {/* Subtle diagonal stripe overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              padding: "5px 16px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "rgba(255,193,7,0.15)",
              border: "1px solid rgba(255,193,7,0.35)",
              color: "#ffc107",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffc107" }} />
            Gummidipoondi, Chennai
          </div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900,
              color: "white",
              marginBottom: 16,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            World-Class{" "}
            <span style={{ color: "#ffc107" }}>Manufacturing</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
              color: "rgba(255,255,255,0.78)",
              maxWidth: 560,
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Powered by Japanese Kyoto ProTech technology, 4× MAT quadruple press, and India&apos;s first plywood-grade solar captive power plant.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { value: "1056 KV", label: "Solar Plant" },
              { value: "4×", label: "MAT Press" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ffc107" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section ref={sectionRef} style={{ padding: "80px 0", background: "#f4f8f5", position: "relative", overflow: "hidden" }}>
      {/* Subtle grid texture */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025, pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="factory-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke="#00793A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#factory-grid)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
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
              textTransform: "uppercase" as const,
              letterSpacing: "0.12em",
              background: "white",
              color: "#00793A",
              border: "1px solid rgba(0,121,58,0.2)",
              boxShadow: "0 2px 8px rgba(0,121,58,0.08)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00793A" }} />
            Manufacturing Excellence
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "#1a1a1a",
              marginBottom: 12,
            }}
          >
            Our <span style={{ color: "#00793A" }}>Factory</span>
          </h2>
          <div
            style={{
              margin: "0 auto 16px",
              height: 4,
              width: 96,
              borderRadius: 999,
              background: "linear-gradient(90deg, #00793A, #ffc107)",
            }}
          />
          <p style={{ color: "#888", maxWidth: 560, margin: "0 auto", fontSize: 15 }}>
            Our state-of-the-art manufacturing facility in Gummidipoondi, near Chennai, combines Japanese
            precision engineering with Indian craftsmanship — world-class infrastructure built for quality and sustainability.
          </p>
        </div>

        {/* Hero image + stats */}
        <div style={{ position: "relative", marginBottom: 48, borderRadius: 24, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=85"
            alt="SharonPly Manufacturing Facility"
            style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 48,
              transform: "translateY(-50%)",
              maxWidth: 420,
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 900,
                color: "white",
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              Gummidipoondi,<br />Chennai
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              India's premier plywood manufacturing hub — powered by Japanese Kyoto ProTech technology,
              solar energy, and a highly skilled workforce.
            </p>
            <a
              href="/our-history"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                color: "#1a1a1a",
                background: "linear-gradient(135deg, #ffc107, #f57c00)",
                boxShadow: "0 4px 16px rgba(255,193,7,0.35)",
              }}
            >
              Explore Manufacturing →
            </a>
          </div>
        </div>

        {/* Feature cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ marginBottom: 40 }}
        >
          {factoryFeatures.map((feature, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                opacity: visibleCards.includes(i) ? 1 : 0,
                transform: visibleCards.includes(i) ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.1)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  borderRadius: "20px 0 0 20px",
                  background: feature.color,
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: feature.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 14,
                  transition: "transform 0.3s",
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Production lines */}
        <div
          style={{
            background: "linear-gradient(135deg, #0a1f13, #00793A)",
            borderRadius: 28,
            padding: "40px 48px",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Production Lines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: 640, margin: "0 auto" }}>
            {productionLines.map((line, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 16,
                  padding: "16px 12px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,193,7,0.15)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,193,7,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 4 }}>{line.label}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{line.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
