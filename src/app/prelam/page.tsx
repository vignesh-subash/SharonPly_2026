import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export const metadata = {
  title: "Prelam Boards - SharonPly | Pre-laminated Boards & Particle Board",
  description: "Explore SharonPly's Prelam range: Sharon PRELAM pre-laminated boards, Sharon Particle Board, and Sharon Super Strong. Ready-to-use decorative surfaces for modern interiors.",
  keywords: "prelam board, pre-laminated board, particle board, decorative board, SharonPly, modular furniture",
};

const prelamProducts = [
  {
    id: "sharon-prelam",
    name: "Sharon PRELAM",
    tagline: "Pre-Laminated Decorative Boards",
    description:
      "Sharon PRELAM boards come with factory-applied decorative laminate surfaces in a wide range of colours, textures, and wood grains. Ready to use straight from the pack — no additional lamination needed. The melamine-impregnated surface is scratch-resistant, stain-resistant, and UV-stable, making it ideal for wardrobes, shelving, modular kitchens, and commercial fit-outs.",
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?w=700&q=80",
    features: [
      "Factory-Applied Decorative Surface",
      "Scratch & Stain Resistant",
      "Wide Range of Colours & Textures",
      "UV Stable — No Fading",
      "Ready to Use — No Lamination Cost",
      "Consistent Quality Across Batches",
    ],
    specs: [
      { label: "Surface", value: "Melamine Impregnated Paper" },
      { label: "Core", value: "MDF / Particle Board" },
      { label: "Finish Options", value: "Matte, Gloss, Wood Grain, Solid" },
      { label: "Thickness", value: "8mm, 12mm, 18mm, 25mm" },
      { label: "Size", value: "8' x 4', 8' x 3'" },
      { label: "Edge", value: "Compatible with PVC Edge Band" },
    ],
    applications: ["Wardrobes", "Modular Kitchens", "Shelving", "Office Furniture", "Retail Displays", "Partition Systems"],
  },
  {
    id: "particle-board",
    name: "Sharon Particle Board",
    tagline: "Engineered Wood for Modern Interiors",
    description:
      "Sharon Particle Board is manufactured from carefully graded wood particles bonded under high pressure with synthetic resin. The resulting board offers excellent surface smoothness, uniform density, and good screw-holding capacity. Ideal as a substrate for lamination, veneering, or direct painting in furniture and interior applications.",
    image: "https://images.unsplash.com/photo-1566312922674-4e3c1e8a9a4e?w=700&q=80",
    features: [
      "Uniform Density Throughout",
      "Smooth Surface for Lamination",
      "Good Screw Holding Capacity",
      "Dimensionally Stable",
      "Economical Alternative to Plywood",
      "Eco-Friendly — Uses Recycled Wood",
    ],
    specs: [
      { label: "Core", value: "Graded Wood Particles" },
      { label: "Bonding", value: "Synthetic Resin (UF/MUF)" },
      { label: "Density", value: "600-680 kg/m³" },
      { label: "Thickness", value: "8mm, 12mm, 18mm, 25mm" },
      { label: "Size", value: "8' x 4', 8' x 6'" },
      { label: "Surface", value: "Sanded Both Sides" },
    ],
    applications: ["Furniture Substrate", "Office Partitions", "Shelving", "Counter Tops (with laminate)", "False Ceilings", "Storage Units"],
  },
  {
    id: "super-strong",
    name: "Sharon Super Strong",
    tagline: "High-Density Engineered Board for Heavy-Duty Use",
    description:
      "Sharon Super Strong is a high-density particle board engineered for applications that demand extra load-bearing capacity and durability. With higher resin content and increased pressing pressure, it delivers superior mechanical properties compared to standard particle board. Perfect for commercial furniture, heavy shelving, and industrial applications.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=700&q=80",
    features: [
      "High Density — Superior Strength",
      "Enhanced Load Bearing",
      "Better Screw Retention",
      "Moisture Resistant Option Available",
      "Smooth Finish Both Sides",
      "Ideal for Commercial Furniture",
    ],
    specs: [
      { label: "Core", value: "High-Density Wood Particles" },
      { label: "Bonding", value: "Enhanced Resin (MUF)" },
      { label: "Density", value: "700-780 kg/m³" },
      { label: "Thickness", value: "12mm, 18mm, 25mm" },
      { label: "Size", value: "8' x 4'" },
      { label: "Special", value: "MR Grade Available" },
    ],
    applications: ["Commercial Furniture", "Heavy-Duty Shelving", "Industrial Cabinets", "Library Shelving", "Shop Fixtures", "Workbenches"],
  },
];

export default function PrelamPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Products" }, { label: "Prelam" }]}
      title="Prelam & Particle Board"
      subtitle="Pre-laminated Boards & Engineered Wood for Modern Interiors"
      heroImage="https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?w=1400&q=80"
    >
      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label mb-4 inline-block">SharonPly Prelam</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ready-to-Use Decorative Surfaces
            </h2>
            <p className="text-[#5a5a5a] leading-relaxed">
              SharonPly&apos;s Prelam range offers pre-finished decorative boards that eliminate the need for additional lamination.
              From elegant wood grains to contemporary solid colours, our boards are ready to transform your spaces straight from the pack.
              Engineered for modern modular interiors where speed, consistency, and finish quality matter.
            </p>
          </div>
        </div>
      </section>

      {/* Products - Alternating Layout */}
      {prelamProducts.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
          className="section-padding scroll-mt-24"
          style={{ background: index % 2 === 1 ? "linear-gradient(180deg, #f7f5f0 0%, #ffffff 100%)" : "#ffffff" }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{ background: "linear-gradient(135deg, #ffc107, #e5ac00)", color: "#2d2d2d" }}>
                    {product.tagline.split(" ")[0]}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #00793A, #ffc107)" }} />
                  <span className="text-sm font-semibold text-[#00793A] tracking-wider uppercase">SharonPly</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {product.name}
                </h2>
                <p className="text-sm text-[#00793A] font-medium mb-4">{product.tagline}</p>
                <p className="text-[#5a5a5a] leading-relaxed mb-6">{product.description}</p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,121,58,0.1)" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="text-xs text-[#5a5a5a]">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Specs Table */}
                <div className="border border-[#e8e4dc] rounded-xl overflow-hidden mb-6">
                  {product.specs.map((s, i) => (
                    <div key={s.label} className={`grid grid-cols-2 px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#f7f5f0]/50"} ${i < product.specs.length - 1 ? "border-b border-[#e8e4dc]/60" : ""}`}>
                      <span className="text-[#5a5a5a] text-left">{s.label}</span>
                      <span className="font-semibold text-[#2d2d2d] text-left">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Applications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.applications.map((a) => (
                    <span key={a} className="text-[10px] px-2.5 py-1 rounded-full bg-[#00793A]/6 text-[#00793A] font-medium">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link href="/contact" className="btn-primary text-sm">Get a Quote</Link>
                  <Link href="/catalogue" className="btn-outline text-sm">Download Brochure</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #00793A, #005a2b)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Need Prelam Boards for Your Project?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            We offer a wide range of colours, textures, and finishes. Contact us to see our full catalogue.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-gold">Talk to an Expert</Link>
            <Link href="/dealers" className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold text-[15px] transition-all duration-300 border-2 border-white/30 text-white hover:bg-white/10" style={{ fontFamily: "var(--font-display)" }}>
              Find a Dealer
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
