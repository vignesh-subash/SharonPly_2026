"use client";

import Link from "next/link";
import DesignedHeroBanner from "@/components/DesignedHeroBanner";
import BlogSection from "@/components/BlogSection";
import TechCarousel from "@/components/TechCarousel";

const doorProducts = [
  {
    name: "Sharon GOLD Door",
    href: "/door/sharon-gold-door",
    tag: "Premium BWP",
    description:
      "Sharon GOLD Doors bring the prestige of the Sharon Gold brand to the doors segment. BWP-grade core with phenol-formaldehyde bonding, VIRASAFE antiviral coating, E0 formaldehyde emission, termite-proof treatment, and pre-fitted frame option. The complete premium door package.",
    image: "/images/2026/door/thumb-sharon-gold.webp",
    features: ["BWP Grade (IS:2202)", "VIRASAFE Coating", "E0 Emission", "Pre-Fitted Frame Option"],
  },
  {
    name: "Sovereign Door",
    href: "/door/sovereign-door",
    tag: "BWP Grade",
    description:
      "Sovereign Doors are the trusted choice for architects and builders who need dependable BWP performance at scale. Seasoned hardwood frame, solid BWP core, factory termite treatment, and a paint-ready sanded surface. Proven durability across residential and commercial projects.",
    image: "/images/2026/door/thumb-sovereign.webp",
    features: ["BWP Grade (IS:2202)", "Seasoned Hardwood Frame", "Factory Termite Treatment", "Warp & Twist Free"],
  },
];

export default function DoorsPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <DesignedHeroBanner
        src="/images/2026/door/hero.webp"
        title="Premium Doors, Built to Last"
        breadcrumbs={[{ label: "Products", href: "/door" }, { label: "Doors" }]}
      />

      {/* ── Product Grid ── */}
      <section id="products" className="section-padding" style={{ background: "linear-gradient(180deg, #f7f5f0 0%, #ffffff 100%)" }}>
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d]" style={{ fontFamily: "var(--font-display)" }}>
              Our Door Range
            </h2>
            <p className="text-[#5a5a5a] mt-2 max-w-xl mx-auto">
              Two precisely engineered door solutions for premium interiors and dependable everyday performance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {doorProducts.map((product) => (
              <Link key={product.name} href={product.href} className="card-premium group" style={{ display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", textDecoration: "none" }}>
                <div className="slot-card relative" style={{ flexShrink: 0, overflow: "hidden", background: "#f5f5f5" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                </div>
                <div style={{ flex: 1, padding: "14px 18px 28px", display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
                  <h3 className="text-md font-bold text-[#1a1a1a]" style={{ fontFamily: "var(--font-display)", lineHeight: 1.2, marginBottom: 6 }}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#5a5a5a]" style={{ fontSize: 12, lineHeight: 1.5, margin: 0, flex: 1 }}>
                    {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
                  </p>
                  <span className="text-xs font-semibold text-[#00793A] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ marginTop: 10 }}>
                    Explore Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <TechCarousel variant="door" />

      <BlogSection topic="door" showCsr={false} limit={3} />

      {/* ── CTA Banner ── */}
      <section className="py-8" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="page-container flex flex-col items-center text-center gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-1">Expert Guidance</p>
            <h2 className="text-lg font-bold text-white">Need Help Choosing the Right Door?</h2>
            <p className="text-white/70 text-sm max-w-lg mx-auto mt-1">Our experts can guide you to the perfect door for your application and budget.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">Talk to an Expert</Link>
            <Link href="/dealers" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">Find a Dealer</Link>
          </div>
        </div>
      </section>

    </div>
  );
}