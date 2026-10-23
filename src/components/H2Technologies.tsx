"use client";
import { useRef, useEffect } from "react";

const techs = [
  { name: "Kyoto ProTech", desc: "Japanese technology from Kyoto University's Wood Research Institute" },
  { name: "VIRASAFE", desc: "Anti-microbial technology for healthier indoor spaces" },
  { name: "FIRESAVE", desc: "Fire-retardant plywood certified under IS:5509" },
  { name: "E-Zero", desc: "Zero-emission compliance for safe indoor air quality" },
  { name: "Quadruple Press", desc: "MAT process with 4x pressing for superior bonding" },
];

export default function H2Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".tech-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <style>{`
        .tech-card { opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .tech-card.in-view { opacity: 1; transform: translateY(0); }
        .tech-card:nth-child(1) { transition-delay: 0s; }
        .tech-card:nth-child(2) { transition-delay: 0.1s; }
        .tech-card:nth-child(3) { transition-delay: 0.2s; }
        .tech-card:nth-child(4) { transition-delay: 0.3s; }
        .tech-card:nth-child(5) { transition-delay: 0.4s; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">Technology</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">Engineered with Advanced Technology</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">Every SharonPly product is built with cutting-edge Japanese technology and certified quality processes.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {techs.map((t, i) => (
            <div key={t.name} className="tech-card bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-3 opacity-70">⬡</div>
              <h3 className="text-sm font-black text-gray-900 mb-1">{t.name}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
