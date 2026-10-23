"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function FloodreliefPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/flood-relief.webp"
      photos={csrGallery["flood-relief"]}
      title="Flood Relief"
      tagline="Distributing essentials to flood-affected communities"
      heroDesc="SharonPly's flood relief activities in Tamil Nadu — distributing essential supplies, food, and aid to communities affected by annual flooding."
      color="#1d4ed8"
      emoji="🆘"
      bgClass="#0a0f1f"
      background="Tamil Nadu experiences severe flooding during monsoon seasons, displacing families and destroying livelihoods. SharonPly launched flood relief initiatives to provide immediate support to affected communities, ensuring access to food, clean water, and essential supplies."
      whatWeDid={["Distributed food kits and essential supplies to flood-affected families", "Provided temporary shelter materials and hygiene kits", "Supported students with educational materials after flood damage to schools", "Coordinated with local authorities for effective relief distribution"]}
      impact={[{ label: "Families Helped", value: "500+" }, { label: "Food Kits", value: "2,000+" }, { label: "Years Active", value: "Ongoing" }, { label: "Regions Covered", value: "Tamil Nadu" }]}
      gallery={[{ emoji: "🆘", label: "Relief Distribution" }, { emoji: "🍱", label: "Food Supplies" }, { emoji: "🏠", label: "Shelter Support" }, { emoji: "📚", label: "Student Aid" }]}
      relatedLinks={[{ label: "COVID-19 Relief", href: "/corporate-social-responsibility/covid-relief" }, { label: "Solar Umbrella", href: "/corporate-social-responsibility/umbrella" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
