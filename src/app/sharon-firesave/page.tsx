import type { Metadata } from "next";
import TechnologyLanding from "@/components/TechnologyLanding";

export const metadata: Metadata = {
  title: "FIRESAVE | Fire Resistant Plywood Technology",
  description:
    "SharonPly FIRESAVE fire-retardant plywood technology limits flame spread and smoke, certified to IS:5509 for safer commercial and residential buildings.",
  alternates: { canonical: "https://sharonply.com/sharon-firesave" },
};

export default function FiresavePage() {
  return (
    <TechnologyLanding
      breadcrumbs={[{ label: "Technology", href: "/technology" }, { label: "FIRESAVE" }]}
      title="FIRESAVE Technology"
      subtitle="Best-in-class protection to limit the spread of fire and smoke."
      heroImage="/images/2026/features/firesave-hero.webp"
      accentColor="#b91c1c"
      intro="SharonPly's finest plywood products now come with FIRESAVE Technology — fire-retardant treatment that helps limit flame spread and smoke emission without compromising on strength or finish. FIRESAVE is certified to IS:5509 and tested per IS 5509:2000."
      features={[
        "Fire-retardant treatment certified to IS:5509",
        "Helps limit flame spread and smoke emission",
        "Self-extinguishing behaviour when flame source is removed",
        "Ideal for hotels, hospitals, schools, theatres, and high-rise buildings",
      ]}
      sections={[
        {
          heading: "Safety Built Into Every Board",
          body:
            "FIRESAVE-treated plywood is engineered for spaces where fire safety cannot be compromised. When exposed to flame, treated boards are designed to resist rapid fire propagation and reduce smoke, giving occupants more time to respond in an emergency.",
        },
        {
          heading: "Applications",
          body:
            "Use FIRESAVE plywood in commercial buildings, hotels, hospitals, educational institutions, auditoriums, kitchens, electrical panel areas, and high-rise residential projects where fire-retardant materials are recommended or required.",
        },
      ]}
      products={[
        {
          name: "Sharon Platinum Ply",
          href: "/plywood/sharon-platinum-ply",
          description: "Premium plywood with FIRESAVE technology for superior fire safety and performance.",
        },
        {
          name: "Sharon Gold Marine Plywood",
          href: "/plywood/sharon-gold-marine-plywood",
          description: "Marine-grade plywood with FIRESAVE fire-retardant protection for demanding projects.",
        },
      ]}
      faqs={[
        {
          q: "What is FIRESAVE technology?",
          a: "FIRESAVE is SharonPly's fire-retardant plywood technology that helps limit flame spread and smoke, conforming to IS:5509 standards.",
        },
        {
          q: "Is FIRESAVE plywood suitable for commercial projects?",
          a: "Yes. FIRESAVE is designed for commercial, institutional, and high-rise applications where fire safety is critical.",
        },
      ]}
    />
  );
}
