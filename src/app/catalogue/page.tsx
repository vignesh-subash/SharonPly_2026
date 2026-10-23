import type { Metadata } from "next";
import Link from "next/link";
import CatalogueClient from "@/components/CatalogueClient";

export const metadata: Metadata = {
  title: "SharonPly Catalogues | View & Download Product Brochures",
  description: "View and download SharonPly catalogues and product brochures for plywood, veneers, doors, technologies, certifications, and technical product information.",
  alternates: { canonical: "https://sharonply.com/catalogue" },
};

export default function CataloguePage() {
  return (
    <div>
      <CatalogueClient />

      {/* Final CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Need Help Choosing the Right Product?</h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
            Download the catalogue or connect with our team for product guidance, dealer support, or project-specific recommendations.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all shadow-lg">Talk to Our Team</Link>
            <Link href="/dealers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">Find a Dealer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}