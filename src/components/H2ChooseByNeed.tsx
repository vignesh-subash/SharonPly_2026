"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";

const needs = [
  { label: "Plywood", href: "/plywood" }, { label: "Veneer", href: "/veneer" },
  { label: "Doors", href: "/door" }, { label: "Teak Wood", href: "/teak" },
  { label: "Sharon Collection", href: "/catalogue" },
  { label: "Since 1987", href: "/our-history" }, { label: "Made in India", href: "/our-history" },
];

export default function H2ChooseByNeed() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".pill");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <style>{`
        .pill { opacity: 0; transform: scale(0.85); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pill.in-view { opacity: 1; transform: scale(1); }
        .pill:nth-child(1) { transition-delay: 0s; }
        .pill:nth-child(2) { transition-delay: 0.05s; }
        .pill:nth-child(3) { transition-delay: 0.1s; }
        .pill:nth-child(4) { transition-delay: 0.15s; }
        .pill:nth-child(5) { transition-delay: 0.2s; }
        .pill:nth-child(6) { transition-delay: 0.25s; }
        .pill:nth-child(7) { transition-delay: 0.3s; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">Browse by Category</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">What are you building?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {needs.map((n) => (
            <Link key={n.label} href={n.href}
              className="pill inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ background: "rgba(0,121,58,0.06)", color: "#333", border: "1px solid rgba(0,121,58,0.1)" }}>
              {n.label} <svg className="w-3.5 h-3.5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
