import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export const metadata = {
  title: "Teak Plywood - SharonPly | Sharon Teak Gold+, Gold & Prima",
  description: "Explore SharonPly's Teak range: Sharon Teak Gold+ (premium), Sharon Teak Gold (BWP), and Sharon Teak Prima. Natural teak face veneers for luxurious interiors.",
  keywords: "teak plywood, teak veneer plywood, Sharon Teak, natural teak, premium teak plywood, SharonPly",
};

const teakProducts = [
  {
    name: "Sharon Teak Gold+",
    grade: "Premium",
    description:
      "The finest teak plywood in our range. Sharon Teak Gold+ features hand-selected A-grade natural teak face veneers with rich golden-brown colour and distinctive grain patterns. BWP-grade core with VIRASAFE and E-Zero technology makes it the ultimate choice for luxury interiors where nothing but the best will do.",
    image: "https://images.unsplash.com/photo-1566312922674-4e3c1e8a9a4e?w=700&q=80",
    features: ["A-Grade Teak Face Veneer", "BWP Core (IS:710)", "VIRASAFE Technology", "E-Zero Emission", "Hand-Selected Grain", "Lifetime Warranty"],
    specs: [
      { label: "Face", value: "A-Grade Natural Teak" },
      { label: "Core Grade", value: "BWP (IS:710)" },
      { label: "Technology", value: "VIRASAFE + E-Zero" },
      { label: "Thickness", value: "4mm, 6mm, 9mm, 12mm, 19mm, 25mm" },
    ],
  },
  {
    name: "Sharon Teak Gold",
    grade: "BWP",
    description:
      "A trusted name in teak plywood. Sharon Teak Gold combines natural teak face veneer with a BWP-grade hardwood core for excellent water resistance and structural strength. The teak surface develops a beautiful patina over time, adding character to your furniture and interiors.",
    image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=700&q=80",
    features: ["Natural Teak Face Veneer", "BWP Core (IS:710)", "Termite Resistant", "Calibrated Thickness", "Beautiful Patina Development", "25-Year Warranty"],
    specs: [
      { label: "Face", value: "Natural Teak Veneer" },
      { label: "Core Grade", value: "BWP (IS:710)" },
      { label: "Bonding", value: "Phenol Formaldehyde" },
      { label: "Thickness", value: "4mm, 6mm, 9mm, 12mm, 19mm, 25mm" },
    ],
  },
  {
    name: "Sharon Teak Prima",
    grade: "Commercial",
    description:
      "Teak aesthetics at an accessible price. Sharon Teak Prima features quality teak face veneer on a commercial-grade core, offering the warmth and elegance of teak for budget-conscious projects. Ideal for residential furniture, wall paneling, and decorative applications.",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=700&q=80",
    features: ["Teak Face Veneer", "Commercial Grade Core", "Good Moisture Resistance", "Smooth Finish", "Affordable Luxury", "15-Year Warranty"],
    specs: [
      { label: "Face", value: "Teak Veneer" },
      { label: "Core Grade", value: "Commercial" },
      { label: "Bonding", value: "Phenol Formaldehyde" },
      { label: "Thickness", value: "4mm, 6mm, 9mm, 12mm, 19mm" },
    ],
  },
];

export default function TeakPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Products" }, { label: "Teak" }]}
      title="Teak Plywood"
      subtitle="Natural Teak Face Veneers for Luxurious, Timeless Interiors"
      heroImage="https://images.unsplash.com/photo-1566312922674-4e3c1e8a9a4e?w=1400&q=80"
    >
      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label mb-4 inline-block">SharonPly Teak</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              The Timeless Elegance of Natural Teak
            </h2>
            <p className="text-[#5a5a5a] leading-relaxed">
              Teak has been the gold standard in wood for centuries — prized for its natural beauty, durability, and resistance to moisture and insects.
              SharonPly Teak plywood brings you the warmth and elegance of genuine teak face veneers bonded to engineered cores that deliver modern performance.
              Choose from three grades to match your project requirements and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, #f7f5f0 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {teakProducts.map((product, index) => (
              <div key={product.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "" : ""}`}>
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,45,45,0.5), transparent 50%)" }} />
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: "linear-gradient(135deg, #ffc107, #e5ac00)", color: "#2d2d2d" }}>
                      {product.grade}
                    </span>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #8B6914, #ffc107)" }} />
                    <span className="text-sm font-semibold text-[#8B6914] tracking-wider uppercase">{product.grade} Grade</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {product.name}
                  </h2>
                  <p className="text-[#5a5a5a] leading-relaxed mb-6">{product.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,105,20,0.1)" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span className="text-xs text-[#5a5a5a]">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Specs */}
                  <div className="border border-[#e8e4dc] rounded-xl overflow-hidden mb-6">
                    {product.specs.map((s, i) => (
                      <div key={s.label} className={`grid grid-cols-2 px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#f7f5f0]/50"} ${i < product.specs.length - 1 ? "border-b border-[#e8e4dc]/60" : ""}`}>
                        <span className="text-[#5a5a5a] text-left">{s.label}</span>
                        <span className="font-semibold text-[#2d2d2d] text-left">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link href="/contact" className="btn-primary text-sm">Get a Quote</Link>
                    <Link href="/catalogue" className="btn-outline text-sm">Brochure</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#2d2d2d] mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
            Perfect For
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Living Room Furniture", "Bedroom Wardrobes", "Wall Paneling", "Ceiling Work", "Study Tables", "TV Units", "Dining Tables", "Premium Cabinetry"].map((app) => (
              <div key={app} className="flex items-center gap-3 bg-[#f7f5f0] rounded-xl px-4 py-3.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,121,58,0.12)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span className="text-sm text-[#2d2d2d] font-medium">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #00793A, #005a2b)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Experience the Beauty of Natural Teak
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Visit your nearest dealer to see and feel our teak plywood range in person.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/dealers" className="btn-gold">Find a Dealer</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold text-[15px] transition-all duration-300 border-2 border-white/30 text-white hover:bg-white/10" style={{ fontFamily: "var(--font-display)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
