"use client";

import Link from "next/link";
import DesignedHeroBanner from "@/components/DesignedHeroBanner";
import BlogSection from "@/components/BlogSection";
import TechCarousel from "@/components/TechCarousel";

const plywoodProducts = [
  // ── Waterproof (BWP) ──
  {
    name: "Sharon Platinum Ply",
    href: "/plywood/sharon-platinum-ply",
    tag: "Premium BWP",
    description: "BIS-certified BWP and specialty plywood from SharonPly. Engineered for strength, durability, and performance across residential, commercial, and industrial applications with advanced protective technologies.",
    image: "/images/2026/plywood/thumb-platinum.webp",
    features: ["BWP Grade (IS:710)", "VIRASAFE Technology", "FIRESAVE Graded", "E-Zero Emission"],
  },
  {
    name: "Sharon Gold",
    href: "/plywood/sharon-gold-marine-plywood",
    tag: "BWP Grade",
    description:
      "The gold standard in boiling water proof plywood. Sharon Gold offers excellent bonding strength, termite resistance, and long-lasting performance for all interiors.",
    image: "/images/2026/plywood/thumb-gold.webp",
    features: ["BWP Grade (IS:710)", "Termite Resistant", "Superior Bonding", "Calibrated Thickness"],
  },
  {
    name: "Sharon Prima Armor",
    href: "/plywood/sharon-prima-710",
    tag: "Commercial",
    description:
      "Versatile commercial-grade plywood ideal for furniture, partitions and everyday applications. Reliable performance at an accessible price point.",
    image: "/images/2026/plywood/thumb-prima-armor.webp",
    features: ["IS:710 Compliant", "High Durability", "Smooth Finish", "Versatile Usage"],
  },
  {
    name: "Sovereign 710",
    href: "/plywood/sovereign-710",
    tag: "Waterproof",
    description:
      "Waterproof plywood engineered for demanding environments. Sovereign 710 withstands moisture, heat, and heavy use with calibrated precision.",
    image: "/images/2026/plywood/thumb-sovereign-710.webp",
    features: ["Waterproof (IS:710)", "Calibrated", "High Strength", "Warp Resistant"],
  },
  {
    name: "Kumki OEM BWP Ply",
    href: "/plywood/kumki-oem-bwp-ply",
    tag: "OEM BWP",
    description:
      "Engineered specifically for OEM manufacturers seeking precision and consistency. Kumki offers advanced calibration technology, IS:303 BWP compliance, and Kyoto Pro-Tech treatment — the perfect substrate for modular furniture production.",
    image: "/images/2026/plywood/thumb-kumki.webp",
    features: ["BWP IS:303", "Calibrated Thickness", "Termite Proof", "OEM Precision"],
  },
  // ── Water Resistant (MR) ──
  {
    name: "Sovereign MR",
    href: "/plywood/sovereign-mr",
    tag: "MR Grade",
    description:
      "Moisture-resistant plywood for interior applications. Ideal for furniture, cabinets, and interior paneling where moderate moisture protection is needed.",
    image: "/images/2026/plywood/thumb-sovereign-mr.webp",
    features: ["MR Grade (IS:303)", "Interior Use", "Smooth Surface", "Cost Effective"],
  },
];


const techBadges = ["VIRASAFE™ Antiviral", "FIRESAVE™ Fire Rating", "E-Zero Emission", "Kyoto Pro-Tech", "ISO 9001:2015"];

export default function PlywoodPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <DesignedHeroBanner
        src="/images/2026/plywood/hero.webp"
        title="Premium Plywood, Built to Last"
        breadcrumbs={[{ label: "Products", href: "/plywood" }, { label: "Plywood" }]}
      />

      {/* ── Product Grid ── */}
      <section id="products" className="section-padding" style={{ background: "linear-gradient(180deg, #f7f5f0 0%, #ffffff 100%)" }}>
        <div className="page-container">
          <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d]" style={{ fontFamily: "var(--font-display)" }}>
              Our Plywood Range
            </h2>
            <p className="text-[#5a5a5a] mt-2 max-w-xl mx-auto">
              Engineered for every application and environment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {plywoodProducts.map((product) => (
              <Link key={product.name} href={product.href} className="card-premium group" style={{ display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", textDecoration: "none" }}>
                <div className="slot-card relative" style={{ flexShrink: 0, overflow: "hidden", background: "#f5f5f5" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />



                </div>
                <div style={{ flex: 1, padding: "14px 18px 44px", display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
                  <h3 className="text-md font-bold text-[#1a1a1a]" style={{ fontFamily: "var(--font-display)", lineHeight: 1.2, marginBottom: 6 }}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#5a5a5a]" style={{ fontSize: 12, lineHeight: 1.5, margin: 0, flex: 1 }}>
                    {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
                  </p>
                  <span className="text-xs font-semibold text-[#00793A] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ marginTop: 10, marginBottom: 8 }}>
                    Explore Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

<TechCarousel />

      <BlogSection showCsr={false} limit={3} topic="plywood" />

      {/* ── CTA Banner ── */}
      <section className="py-6" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-1">Expert Guidance</p>
            <h2 className="text-lg font-bold text-white">Need Help Choosing the Right Plywood?</h2>
            <p className="text-white/70 text-sm">Our experts can guide you to the perfect product for your application and budget.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">Talk to an Expert</Link>
            <Link href="/dealers" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">Find a Dealer</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
