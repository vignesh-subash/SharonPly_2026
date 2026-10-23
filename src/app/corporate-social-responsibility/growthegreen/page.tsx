"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function GrowthegreenPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/growthegreen.webp"
      photos={csrGallery["growthegreen"]}
      title="Grow The Green"
      tagline="A decade-long commitment to greener tomorrows"
      heroDesc="SharonPly has distributed thousands of saplings at schools, public events, government offices, and exhibitions across India — nurturing a greener future one tree at a time."
      color="#16a34a"
      emoji="🌱"
      bgClass="#0a1f10"
      background="Deforestation and rapid urbanization have reduced green cover across India. SharonPly, as a company built on wood products, recognized its responsibility to give back to nature. #GrowTheGreen was launched to actively restore green cover by planting trees and inspiring communities to participate in reforestation."
      whatWeDid={[
        "Distributed thousands of saplings at schools, colleges, and public events",
        "Organized tree-planting drives at government offices and community spaces",
        "Supplied saplings to exhibitions and environmental awareness campaigns",
        "Engaged employees and local communities in active plantation efforts",
      ]}
      impact={[
        { label: "Saplings Distributed", value: "10,000+" },
        { label: "Years Active", value: "10+" },
        { label: "Cities Covered", value: "15+" },
        { label: "Events Participated", value: "100+" },
      ]}
      gallery={[
        { emoji: "🌱", label: "Sapling Distribution" },
        { emoji: "🌳", label: "Tree Plantation" },
        { emoji: "🏫", label: "School Events" },
        { emoji: "🤝", label: "Community Participation" },
      ]}
      relatedLinks={[
        { label: "Quench The Thirst", href: "/corporate-social-responsibility/quenchthethirst" },
        { label: "Clean-up Activities", href: "/corporate-social-responsibility/cleanup" },
        { label: "All CSR Initiatives", href: "/corporate-social-responsibility" },
      ]}
    />
  );
}
