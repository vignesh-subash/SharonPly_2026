"use client";
import { useRef, useEffect } from "react";

const products = [
  {
    name: "Plywood", sub: "Strength for every structure",
    desc: "Precision-bonded panels from BWP to MR grade — engineered for kitchens, wardrobes, and facades that last a lifetime.",
    href: "/plywood", cta: "Explore Plywood",
    accent: "#00793A", image: "/images/hero-slide1-interior.jpg",
    features: ["BWP / MR Grade", "Zero-Emission E0", "FIRESAVE Technology", "Lifetime Warranty"],
  },
  {
    name: "Veneer", sub: "Natural beauty for premium interiors",
    desc: "Rare grain patterns, engineered reconstituted species, and ultra-thin natural slices for walls, furniture, and signature interiors.",
    href: "/veneer", cta: "Explore Veneer",
    accent: "#b45309", image: "/images/veneer-slide-2.jpg",
    features: ["Natural & Reconstituted", "Poly-Fibre Backed", "Epoxy-Sealed Finish", "Custom Sizes"],
  },
  {
    name: "Doors", sub: "Lasting performance for every entrance",
    desc: "BWP-core flush, membrane, and decorative panel doors built for Indian conditions — termite-proof, moisture-proof, life-proof.",
    href: "/doors", cta: "Explore Doors",
    accent: "#1d4ed8", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/1d0b54c2-0fa2-4df4-8167-818730c7902a/Door-resized-1770857728288.jpg?width=600&height=700&resize=cover",
    features: ["BWP Waterproof Core", "Termite Resistant", "25-35mm Thickness", "IS:2202 Certified"],
  },
];

export default function H2Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header elements
    const headers = section.querySelectorAll(".reveal");
    const cards = cardRefs.current.filter(Boolean);

    // Observer for header
    const headerObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.2 }
    );
    headers.forEach((h) => headerObs.observe(h));

    // Observer for cards — staggered left-to-right reveal
    const cardObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => { if (c) cardObs.observe(c); });

    return () => {
      headerObs.disconnect();
      cardObs.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>{`
        .reveal, .product-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .product-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .product-card:nth-child(1) { transition-delay: 0s; }
        .product-card:nth-child(2) { transition-delay: 0.15s; }
        .product-card:nth-child(3) { transition-delay: 0.3s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="reveal inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">
            Explore SharonPly Solutions
          </span>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Engineered for Every <span className="text-[#00793A]">Space</span>
          </h2>
          <p className="reveal text-gray-500 text-sm sm:text-base leading-relaxed mt-3 max-w-lg mx-auto">
            From high-performance plywood to premium veneers and durable doors — discover materials engineered for every space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <a
              key={p.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              href={p.href}
              className="product-card group block bg-white rounded-2xl overflow-hidden transition-shadow duration-500"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
            >
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{p.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: p.accent }}>{p.sub}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.features.map((f) => (
                    <span key={f} className="text-[10px] font-semibold px-2.5 py-1 rounded-md" style={{ background: `${p.accent}12`, color: p.accent }}>{f}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5" style={{ color: p.accent }}>
                  {p.cta}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
