import type { Metadata } from "next";
import TechnologyLanding from "@/components/TechnologyLanding";

export const metadata: Metadata = {
  title: "E-Zero | Zero Emission Plywood",
  description:
    "SharonPly E-Zero emission compliant plywood reduces harmful gas emissions and improves indoor air quality. CARB and EPA compliant for healthier homes.",
  alternates: { canonical: "https://sharonply.com/e-zero-emission" },
};

export default function EZeroPage() {
  return (
    <TechnologyLanding
      breadcrumbs={[{ label: "Technology", href: "/technology" }, { label: "E-Zero" }]}
      title="E-Zero Emission Plywood"
      subtitle="The healthiest and safest plywood with zero harmful emissions."
      heroImage="/images/2026/features/e-zero-hero.webp"
      accentColor="#00793A"
      intro="To promote eco-friendliness, health, and better quality interiors, SharonPly brings you Zero-Emission Compliant Plywood designed to reduce harmful gas emissions and improve indoor air quality. Most pressed wood products use adhesives containing urea-formaldehyde (UF) resins — E-Zero plywood is engineered to keep your indoor air pollutant-free."
      features={[
        "CARB E0 certified with formaldehyde emission ≤0.5 mg/L",
        "Reduces harmful indoor gas emissions",
        "Healthier choice for bedrooms, kitchens, and children's spaces",
        "Eco-friendly plywood for modern interiors",
      ]}
      sections={[
        {
          heading: "Shield Your Home With E-Zero",
          body:
            "Indoor air pollution affects everyone, especially children and elders with compromised immune systems. Choosing E-Zero emission compliant plywood helps reduce exposure to volatile formaldehyde fumes that can cause irritation, respiratory issues, and long-term health concerns.",
        },
        {
          heading: "Why Zero Emission Matters",
          body:
            "E-Zero plywood is designed for homeowners, architects, and interior designers who want premium performance without compromising on indoor air quality. It is especially recommended for bedrooms, living rooms, kitchens, and any space where families spend extended time indoors.",
        },
      ]}
      products={[
        {
          name: "Sharon Gold Marine Plywood",
          href: "/plywood/sharon-gold-marine-plywood",
          description: "Premium plywood with E-Zero compliance for healthier, high-performance interiors.",
        },
        {
          name: "Sharon Platinum Ply",
          href: "/plywood/sharon-platinum-ply",
          description: "Engineered plywood with low-emission bonding for cleaner indoor air.",
        },
      ]}
      faqs={[
        {
          q: "What is E-Zero plywood?",
          a: "E-Zero plywood is emission-compliant plywood with very low formaldehyde levels, designed to improve indoor air quality.",
        },
        {
          q: "Is E-Zero plywood safe for children's rooms?",
          a: "Yes. E-Zero plywood is especially recommended for bedrooms, nurseries, and other family spaces where air quality matters most.",
        },
      ]}
    />
  );
}
