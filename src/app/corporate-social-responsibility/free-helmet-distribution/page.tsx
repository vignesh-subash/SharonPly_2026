"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function FreehelmetdistributionPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/free-helmet-distribution.webp"
      photos={csrGallery["free-helmet-distribution"]}
      title="Free Helmet Distribution"
      tagline="Road safety awareness in collaboration with partners"
      heroDesc="SharonPly promotes road safety through free helmet distribution drives, encouraging safer commuting habits and reducing head injury risks."
      color="#e11d48"
      emoji="⛑️"
      bgClass="#1a0a0f"
      background="Road accidents are a leading cause of injury and death in India, with two-wheeler riders being most vulnerable. SharonPly partnered with local organizations to distribute free helmets and raise awareness about road safety, particularly among daily commuters."
      whatWeDid={["Distributed free ISI-certified helmets to two-wheeler riders", "Conducted road safety awareness campaigns in collaboration with Big FM", "Organized helmet distribution events at high-traffic locations", "Educated commuters about proper helmet usage and road safety practices"]}
      impact={[{ label: "Helmets Distributed", value: "1,000+" }, { label: "Awareness Events", value: "10+" }, { label: "Partner", value: "Big FM" }, { label: "Cities Covered", value: "Chennai & Tamil Nadu" }]}
      gallery={[{ emoji: "⛑️", label: "Helmet Distribution" }, { emoji: "🛵", label: "Road Safety" }, { emoji: "📢", label: "Awareness Drive" }, { emoji: "🤝", label: "Community Partnership" }]}
      relatedLinks={[{ label: "Health Camps", href: "/corporate-social-responsibility/health-camps" }, { label: "COVID-19 Relief", href: "/corporate-social-responsibility/covid-relief" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
