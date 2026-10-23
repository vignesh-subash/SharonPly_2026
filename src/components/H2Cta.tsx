"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function H2Cta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".cta-el");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.25 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #00793A, #005c2c)" }}>
      <style>{`
        .cta-el { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .cta-el.in-view { opacity: 1; transform: translateY(0); }
        .cta-el:nth-child(2) { transition-delay: 0.15s; }
        .cta-el:nth-child(3) { transition-delay: 0.3s; }
        .cta-el:nth-child(4) { transition-delay: 0.45s; }
      `}</style>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "50px 50px" }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #ffc107, transparent 70%)" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="cta-el inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-amber-400 bg-white/10 px-3.5 py-1.5 rounded-full mb-5">Get in Touch</span>
        <h2 className="cta-el text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">Experience the <span className="text-amber-400">SharonPly Difference</span></h2>
        <p className="cta-el text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">Join architects and interior designers who trust SharonPly for their most demanding projects.</p>
        <div className="cta-el flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "#ffc107", color: "#1a1a1a", boxShadow: "0 8px 32px rgba(255,193,7,0.35)" }}>
            Find a Dealer <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white transition-all duration-300"
            style={{ border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
