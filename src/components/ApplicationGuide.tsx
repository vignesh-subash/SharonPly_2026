"use client";

import { useState } from "react";
import Link from "next/link";

interface ProductLink {
  name: string;
  href: string;
  tag?: string;
}

interface Application {
  icon: string;
  app: string;
  desc: string;
  products: ProductLink[];
}

const APPLICATIONS: Application[] = [
  {
    icon: "🍳",
    app: "Kitchen Cabinets",
    desc: "Moisture-resistant BWP grades for long-lasting kitchen interiors",
    products: [
      { name: "Sharon PlatinumPly", href: "/plywood/sharon-platinum-ply", tag: "Premium BWP" },
      { name: "SharonGold", href: "/plywood/sharon-gold-marine-plywood", tag: "BWP Grade" },
      { name: "Sovereign 710", href: "/plywood/sovereign-710", tag: "Waterproof" },
    ],
  },
  {
    icon: "👔",
    app: "Wardrobes",
    desc: "Durable boards for wardrobes with termite resistance and smooth finish",
    products: [
      { name: "Sharon PlatinumPly", href: "/plywood/sharon-platinum-ply", tag: "Premium BWP" },
      { name: "SharonGold", href: "/plywood/sharon-gold-marine-plywood", tag: "BWP Grade" },
      { name: "Sovereign MR", href: "/plywood/sovereign-mr", tag: "MR Grade" },
    ],
  },
  {
    icon: "🚿",
    app: "Bathroom Vanities",
    desc: "Boiling waterproof BWP-grade plywood for high-humidity spaces",
    products: [
      { name: "Sharon PlatinumPly", href: "/plywood/sharon-platinum-ply", tag: "Premium BWP" },
      { name: "SharonGold", href: "/plywood/sharon-gold-marine-plywood", tag: "BWP Grade" },
    ],
  },
  {
    icon: "💼",
    app: "Office Furniture",
    desc: "Fire-safe and high-strength plywood for commercial workspaces",
    products: [
      { name: "Sharon Prima Armor", href: "/plywood/sharon-prima-710", tag: "Fire Retardant" },
      { name: "Sharon PlatinumPly", href: "/plywood/sharon-platinum-ply", tag: "Premium BWP" },
    ],
  },
  {
    icon: "🏢",
    app: "Commercial Interiors",
    desc: "Reliable grades for large-scale commercial and institutional projects",
    products: [
      { name: "Sharon Prima Armor", href: "/plywood/sharon-prima-710", tag: "Fire Retardant" },
      { name: "SharonGold", href: "/plywood/sharon-gold-marine-plywood", tag: "BWP Grade" },
      { name: "Sovereign 710", href: "/plywood/sovereign-710", tag: "Waterproof" },
    ],
  },
  {
    icon: "⚙️",
    app: "OEM Furniture",
    desc: "Precision-calibrated plywood for high-volume modular manufacturing",
    products: [
      { name: "Kumki OEM BWP Ply", href: "/plywood/kumki-oem-bwp-ply", tag: "OEM Grade" },
    ],
  },
  {
    icon: "🖼️",
    app: "Interior Panelling",
    desc: "Veneer-faced and MR-grade options for elegant wall and ceiling panels",
    products: [
      { name: "Sharon Veneers", href: "/veneer", tag: "Decorative" },
      { name: "Sovereign MR", href: "/plywood/sovereign-mr", tag: "MR Grade" },
    ],
  },
  {
    icon: "💰",
    app: "Budget Furniture",
    desc: "Cost-effective plywood options without compromising on reliability",
    products: [
      { name: "Sovereign MR", href: "/plywood/sovereign-mr", tag: "MR Grade" },
      { name: "Sovereign 710", href: "/plywood/sovereign-710", tag: "Waterproof" },
    ],
  },
];

export default function ApplicationGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (app: string) => {
    setExpanded(expanded === app ? null : app);
  };

  return (
    <section className="w-full py-16 lg:py-20 bg-[#fafbfa]">
      <style>{`
        .app-guide-card {
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .app-guide-card.active {
          box-shadow: 0 8px 32px rgba(0,121,58,0.12);
          border-color: #00793A;
        }
        .app-guide-expand {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .app-guide-expand.open {
          grid-template-rows: 1fr;
        }
        .app-guide-expand > div {
          overflow: hidden;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-2">
            By Application
          </span>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#020202] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose Plywood{" "}
            <span className="text-[#00793A]">by Application</span>
          </h2>
          <p className="text-[#5a5a5a] text-sm mt-3 max-w-xl mx-auto">
            Click any application to see which SharonPly products are best suited for your project.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {APPLICATIONS.map((item) => (
            <div key={item.app} className="flex flex-col">
              {/* Card */}
              <div
                onClick={() => toggle(item.app)}
                className={`app-guide-card p-4 md:p-5 rounded-xl border bg-white ${
                  expanded === item.app
                    ? "active border-[#00793A]"
                    : "border-[#e8ece9] hover:border-[#00793A]/30 hover:shadow-sm"
                }`}
              >
                <span className="text-xl md:text-2xl block mb-2">{item.icon}</span>
                <h3 className="text-sm font-bold text-[#1a1a1a]">{item.app}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-[#00793A] font-semibold">
                    {expanded === item.app ? "Hide products" : "View products"}
                  </span>
                  <svg
                    className={`w-3 h-3 text-[#00793A] transition-transform duration-300 ${
                      expanded === item.app ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Expandable Strip */}
              <div className={`app-guide-expand ${expanded === item.app ? "open" : ""}`}>
                <div>
                  <div className="mt-2 p-4 rounded-xl bg-white border border-[#00793A]/10 shadow-sm">
                    <p className="text-[11px] text-[#5a5a5a] mb-3 leading-relaxed">{item.desc}</p>
                    <div className="space-y-2">
                      {item.products.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0faf4] hover:bg-[#e0f0e4] transition-colors group"
                        >
                          <span className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#00793A] transition-colors">
                            {p.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {p.tag && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white text-[#00793A] border border-[#00793A]/20">
                                {p.tag}
                              </span>
                            )}
                            <svg className="w-3.5 h-3.5 text-[#00793A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-xs text-[#5a5a5a] mb-4">Still unsure which plywood fits your project?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#00793A] hover:bg-[#005c2c] transition-all shadow-lg shadow-[#00793A]/20"
          >
            Talk to Our Plywood Expert
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
