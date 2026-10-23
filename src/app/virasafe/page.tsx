import type { Metadata } from "next";
import TechnologyLanding from "@/components/TechnologyLanding";

export const metadata: Metadata = {
  title: "VIRASAFE | Anti-Microbial & Anti-Viral Plywood Technology",
  description:
    "SharonPly VIRASAFE technology provides anti-microbial, anti-fungal, anti-bacterial and anti-viral protection on plywood surfaces for healthier indoor spaces.",
  alternates: { canonical: "https://sharonply.com/virasafe" },
};

export default function VirasafePage() {
  return (
    <TechnologyLanding
      breadcrumbs={[{ label: "Technology", href: "/technology" }, { label: "VIRASAFE" }]}
      title="VIRASAFE Technology"
      subtitle="Anti-microbial, anti-fungal, anti-bacterial and anti-viral protection for healthier interiors."
      heroImage="/images/2026/features/virasafe-hero.webp"
      accentColor="#00793A"
      intro="VIRASAFE is SharonPly's proprietary plywood technology designed to create safer, more hygienic indoor environments. Treated surfaces help inhibit the growth of microbes, making SharonPly ideal for homes, hospitals, schools, hotels, and other high-traffic spaces where hygiene matters."
      features={[
        "Inhibits 99.9% of viruses and bacteria on the board surface",
        "Anti-microbial, anti-fungal, anti-bacterial and anti-viral protection",
        "Ideal for healthcare, hospitality, and residential interiors",
        "Certified technology for healthier living spaces",
      ]}
      sections={[
        {
          heading: "A Shield for Every Surface",
          body:
            "VIRASAFE-treated plywood creates a protective barrier on the board surface, helping reduce microbial growth in areas where cleanliness is essential. From kitchens and bedrooms to clinics and commercial interiors, VIRASAFE helps families and businesses build with greater confidence.",
        },
        {
          heading: "Where VIRASAFE Makes a Difference",
          body:
            "Use VIRASAFE plywood in hospitals, clinics, schools, hotels, restaurants, gyms, and homes where indoor hygiene is a priority. The technology is especially valuable in moisture-prone or high-contact areas where surfaces need an added layer of protection.",
        },
      ]}
      products={[
        {
          name: "Sharon Gold Marine Plywood",
          href: "/plywood/sharon-gold-marine-plywood",
          description: "Premium marine-grade plywood with VIRASAFE protection for demanding interior and exterior applications.",
        },
        {
          name: "Sharon Platinum Ply",
          href: "/plywood/sharon-platinum-ply",
          description: "High-performance plywood engineered with VIRASAFE for superior strength and hygienic surfaces.",
        },
      ]}
      faqs={[
        {
          q: "What is VIRASAFE technology?",
          a: "VIRASAFE is SharonPly's anti-microbial plywood technology that helps inhibit viruses, bacteria, fungi, and other microbes on the board surface.",
        },
        {
          q: "Where can I use VIRASAFE plywood?",
          a: "VIRASAFE plywood is suitable for residential, commercial, healthcare, hospitality, and institutional interiors where hygiene is important.",
        },
      ]}
    />
  );
}
