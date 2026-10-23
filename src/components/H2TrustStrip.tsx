"use client";
import { useRef, useEffect } from "react";

const badges = [
  { label: "Since 1987", sub: "Manufacturing Legacy" },
  { label: "BIS / ISI Certified", sub: "IS:710 · IS:303 · IS:5509" },
  { label: "E-Zero Options", sub: "Eco-Friendly Solutions" },
  { label: "Trusted by Professionals", sub: "Architects & Builders" },
  { label: "Manufacturing Facility", sub: "Gummidipoondi, Chennai" },
  { label: "Dealer Network", sub: "South India Wide" },
];

export default function H2TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-5 bg-[#f8faf9] border-y border-gray-100 overflow-hidden">
      <style>{`
        .trust-section { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .trust-section.in-view { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="trust-section max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 px-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00793A]" />
              <span className="text-sm font-bold text-gray-800">{b.label}</span>
              <span className="text-xs text-gray-400">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
