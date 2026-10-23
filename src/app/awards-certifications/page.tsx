import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import { GPTW_CERTIFICATIONS, BEST_WORKPLACES, type Recognition } from "@/data/recognitions";

const certifications = [
  { name: "ISI Certification", authority: "Bureau of Indian Standards", category: "Product Standards", desc: "Confirms product compliance with Indian standards for quality, safety, and performance." },
  { name: "ISO 9001:2015", authority: "ISO", category: "Quality Systems", desc: "Quality Management System certification ensuring consistent production standards." },
  { name: "ISO 14001:2015", authority: "ISO", category: "Quality Systems", desc: "Environmental Management System certification for sustainable manufacturing." },
  { name: "ISO 45001:2018", authority: "ISO", category: "Quality Systems", desc: "Occupational Health & Safety certification ensuring safe working practices." },
  { name: "FSC Chain of Custody", authority: "Forest Stewardship Council", category: "Sustainability", desc: "Certifies responsible sourcing and chain of custody for sustainable timber." },
  { name: "CARB E0 / E-Zero", authority: "California Air Resources Board", category: "Sustainability", desc: "Low-emission indoor material standard for healthier interiors." },
  { name: "IS:710", authority: "Bureau of Indian Standards", category: "Product Standards", desc: "Standard for BWP marine-grade plywood ensuring boiling waterproof performance." },
  { name: "IS:303", authority: "Bureau of Indian Standards", category: "Product Standards", desc: "Standard for plywood grades including BWP and MR for structural applications." },
  { name: "IS:2202", authority: "Bureau of Indian Standards", category: "Product Standards", desc: "Standard for flush doors ensuring dimensional stability and performance." },
  { name: "IS:5509", authority: "Bureau of Indian Standards", category: "Safety", desc: "Fire-retardant plywood requirements for enhanced safety." },
];

// Recognitions without badge artwork; the badge-backed ones live in @/data/recognitions.
const otherRecognitions = [
  { name: "India's Best Companies To Work For 2025: Top 100", year: "2025", desc: "Featured in the Top 100 Best Companies to Work For in India, reflecting excellence in people practices." },
  { name: "#IAmStrongest Awards", year: "2019 – Present", desc: "An initiative to honour individuals who demonstrate extraordinary strength, courage, resilience, and determination." },
  { name: "Export Recognition", year: "2022", desc: "Recognition from the Government of India for export excellence in plywood manufacturing and international trade." },
];

function BadgeTile({ r, highlight }: { r: Recognition; highlight?: string }) {
  return (
    <figure className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center text-center h-full">
      {highlight && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00793A] text-white">{highlight}</span>
      )}
      <div className="w-full max-w-[200px] mx-auto aspect-square flex items-center justify-center p-2">
        <img src={r.img} alt={`${r.title}, ${r.period}: SharonPly`} loading="lazy" className="max-w-full max-h-full object-contain" />
      </div>
      <figcaption className="mt-3">
        <span className="block text-[13px] font-bold text-[#020202] leading-snug">{r.title}</span>
        <span className="inline-block mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f0faf4] text-[#00793A] border border-[#00793A]/15">{r.period}</span>
      </figcaption>
    </figure>
  );
}

function CertCard({ cert }: { cert: typeof certifications[0] }) {
  const catColors: Record<string, { bg: string; text: string; border: string }> = {
    "Product Standards": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    "Quality Systems": { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    "Sustainability": { bg: "#f0fdfa", text: "#0f766e", border: "#ccfbf1" },
    "Safety": { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  };
  const cc = catColors[cert.category] ?? { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" };
  return (
    <div className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
      style={{ border: "1px solid #e5e7eb" }}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-[14px] font-bold text-[#020202] leading-snug">{cert.name}</h3>
          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 mt-0.5"
            style={{ background: cc.bg, color: cc.text, border: `1px solid ${cc.border}` }}>
            {cert.category}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mb-1">
          Issuing Authority: <span className="font-semibold text-gray-700">{cert.authority}</span>
        </p>
        <p className="text-[11.5px] text-gray-600 leading-relaxed">{cert.desc}</p>
      </div>
    </div>
  );
}

export default function AwardsCertificationsPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "About Us", href: "/our-history" }, { label: "Awards & Certifications" }]}
      title="Awards & Certifications"
      heroImage="/images/2026/pages/awards-hero.webp"
    >
      {/* ══════════════════════════════════════════════
         AWARDS SECTION
      ══════════════════════════════════════════════ */}

      {/* Great Place to Work® Certified: one badge per certification year */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-2">Workplace Culture</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">Great Place to Work® Certified</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">Certified by Great Place to Work® India three years in a row, for a culture built on trust, respect and employee well-being.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {GPTW_CERTIFICATIONS.map((r, i) => (
              <BadgeTile key={r.img} r={r} highlight={i === 0 ? "Current" : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* India's Best Workplaces™ list rankings */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-2">Industry Rankings</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">India&apos;s Best Workplaces™</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">Named on Great Place to Work® India&apos;s Best Workplaces™ lists across manufacturing, building materials, consumer durables and for millennials.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {BEST_WORKPLACES.map((r) => (
              <BadgeTile key={r.img} r={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Awards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">Other Recognitions</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">Additional awards and recognitions across people practices, brand purpose and trade excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {otherRecognitions.map((award, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[#e8ece9] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#f0faf4" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#1a1a1a]">{award.name}</h3>
                    <p className="text-[11.5px] text-gray-500 mt-1.5 leading-relaxed">{award.desc}</p>
                    <div className="flex gap-3 mt-2.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#f0faf4", color: "#00793A" }}>{award.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
         CERTIFICATIONS SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-14 bg-[#f9fafb]" id="certifications">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">Certifications & Quality Standards</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">Verified credentials that support our commitment to quality, safety, and sustainability.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <CertCard key={i} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
         CTA
      ══════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Need Certification Support for Your Project?</h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
            Connect with our team for product documents, technical certificates, datasheets, or compliance support required for project approvals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all shadow-lg">Contact Our Team</a>
            <a href="/plywood" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">View Products</a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}