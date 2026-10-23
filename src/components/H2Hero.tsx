"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    headline: "INDIA'S LARGEST PLYWOOD MANUFACTURING FACILITY",
    tagline: "Since 1987 · Gummidipoondi, Chennai",
    sub: "Trusted by architects, interior designers, and builders across South India for over three decades — delivering world-class plywood, veneer & door from a single state-of-the-art plant.",
    img: "/images/sharon-factory-aerial.jpg", href: "/plywood", cta: "Explore Products",
  },
  {
    headline: "SHARON PLYWOOD", tagline: "BWP Grade · BIS Certified · E1/E0 Emission",
    sub: "Every grade precision-bonded for zero delamination, boiling waterproof, and decades of performance.",
    img: "/images/hero-slide1-interior.jpg", href: "/plywood", cta: "View Plywood",
  },
  {
    headline: "SHARON VENEER", tagline: "Natural & Reconstituted · Factory Cured",
    sub: "Every grain, every shade — factory-cured natural and reconstituted veneer, delivered site-ready finish that defines luxury interiors.",
    img: "/images/veneer-slide-2.jpg", href: "/veneer", cta: "Explore Veneer",
  },
  {
    headline: "SHARON DOOR", tagline: "BWP Core · Termite Resistant · IS:2202",
    sub: "Precision-engineered flush doors built to the same exacting standards as our plywood.",
    img: "/images/hero-slide3-interior.jpg", href: "/doors", cta: "View Doors",
  },
];

export default function H2Hero() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black"
      style={{ height: "calc(100vh - 64px)", minHeight: 500, maxHeight: 860 }}
    >
      <style>{`
        .hero-fade { transition: opacity 0.8s ease-in-out; }
        .hero-text-animate {
          animation: heroTextIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-scroll {
          animation: scrollPulse 1.8s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(8px); opacity: 0.6; }
        }
      `}</style>

      {slides.map((s, i) => (
        <div key={i} className="absolute inset-0 hero-fade" style={{ opacity: current === i ? 1 : 0, pointerEvents: current === i ? "auto" : "none" }}>
          <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(0.85)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-16 lg:px-24">
            <div className="max-w-3xl">
              {current === i && (
                <div className="hero-text-animate">
                  <h1 className="text-[clamp(2rem,4.5vw,4.2rem)] font-black leading-[1.05] tracking-[2px] text-white uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>{s.headline}</h1>
                  <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 mb-3">{s.tagline}</p>
                  <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-md mb-8">{s.sub}</p>
                  <Link href={s.href} className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #ffc107, #f59e0b)", color: "#1a1a1a", boxShadow: "0 8px 32px rgba(255,193,7,0.3)" }}>
                    {s.cta}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-8 left-8 sm:left-16 lg:left-24 flex items-center gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="carousel-dot-btn sm:min-w-0 sm:min-h-0 sm:p-0 rounded-full transition-all duration-500 cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="block h-1 rounded-full transition-all duration-500"
              style={{ width: 32, background: i === current ? "#ffc107" : "rgba(255,255,255,0.2)" }}
            />
          </button>
        ))}
      </div>

      <div className="hero-scroll absolute bottom-8 right-8 sm:right-16 lg:right-24 flex flex-col items-center gap-1 text-white/30">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase">Scroll</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>
  );
}
