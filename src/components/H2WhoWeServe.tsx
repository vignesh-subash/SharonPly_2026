"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const roles = [
  { title: "Architects", label: "Design & Specification", desc: "SharonPly delivers precision-engineered plywood, veneer, and door solutions that meet demanding architectural specifications — from structural performance to surface finish.", features: ["Custom specifications & cut-to-size", "E0 low-emission certified", "Fire-retardant options", "Premium veneer finishes"], accent: "#00793A", href: "/contact", img: "/images/hero-slide1-interior.jpg" },
  { title: "Interior Designers", label: "Aesthetics & Finish", desc: "Our product range empowers interior designers to realise any creative vision with materials that match both beauty and performance.", features: ["500+ veneer shades & exotic grains", "Designer flush door collection", "Consistent grain continuity", "Dedicated design support"], accent: "#b45309", href: "/contact", img: "/images/veneer-slide-2.jpg" },
  { title: "Builders & Developers", label: "Construction & Projects", desc: "Reliable supply chain, consistent quality across bulk orders, and technical support that helps you deliver projects on time and on budget.", features: ["Bulk order consistency", "On-time project delivery", "Technical site support", "Competitive project pricing"], accent: "#1d4ed8", href: "/contact", img: "/images/sharon-factory-aerial.jpg" },
  { title: "Homeowners", label: "Peace of Mind", desc: "From kitchen cabinets to wardrobes and flooring — choose materials with certified safety, lifetime warranty options, and the warmth of natural wood.", features: ["E-Zero emission safety", "Lifetime warranty options", "Termite-resistant grades", "Natural wood aesthetics"], accent: "#6d28d9", href: "/contact", img: "/images/hero-slide3-interior.jpg" },
];

export default function H2WhoWeServe() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % roles.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const r = roles[active];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <style>{`
        .role-card { animation: fadeSlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">Who We Serve</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">Built for Every <span className="text-[#00793A]">Creator of Spaces</span></h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-3 max-w-xl">Whether you design, build, furnish, or live in the space — SharonPly helps you choose materials with the right strength, finish, safety, and reliability.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {roles.map((role, i) => (
            <button key={role.title} onClick={() => { setActive(i); if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = setInterval(() => setActive((p) => (p + 1) % roles.length), 5000); }}}
              className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300"
              style={{ background: i === active ? role.accent : "rgba(0,0,0,0.05)", color: i === active ? "white" : "#666" }}>
              {role.title}
            </button>
          ))}
        </div>

        <div key={r.title} className="role-card grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 h-72 sm:h-80">
            <img src={r.img} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wide uppercase" style={{ color: r.accent }}>{r.label}</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 mb-4">{r.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{r.desc}</p>
            <ul className="space-y-2 mb-7">
              {r.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={r.accent} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href={r.href} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white transition-all duration-300 hover:opacity-90" style={{ background: r.accent }}>
              Talk to Our Team <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {roles.map((_, i) => (
            <button key={i} onClick={() => { setActive(i); if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = setInterval(() => setActive((p) => (p + 1) % roles.length), 5000); }}}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 24 : 6, background: i === active ? "#00793A" : "rgba(0,0,0,0.1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
