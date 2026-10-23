"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function PaperbagsPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/paper-bags.webp"
      photos={csrGallery["paper-bags"]}
      title="Paper Bags Distribution"
      tagline="Reducing plastic one bag at a time"
      heroDesc="SharonPly distributes paper bags to the public to reduce plastic usage — aligned with the #ISayNoToPlastic campaign and a broader commitment to sustainability."
      color="#65a30d"
      emoji="🛍️"
      bgClass="#0a1a08"
      background="Plastic waste is one of the biggest environmental challenges facing our planet. SharonPly launched the Paper Bags Distribution initiative as a practical step toward reducing single-use plastic consumption, encouraging communities to adopt eco-friendly alternatives."
      whatWeDid={["Distributed thousands of paper bags at public events and marketplaces", "Collaborated with local shops to promote paper bag usage over plastic", "Conducted awareness campaigns about the environmental impact of plastic waste", "Provided sustainable alternatives that communities can use daily"]}
      impact={[{ label: "Paper Bags Distributed", value: "10,000+" }, { label: "Plastic Reduced", value: "5 tonnes+" }, { label: "Years Active", value: "5+" }, { label: "Campaigns Conducted", value: "20+" }]}
      gallery={[{ emoji: "🛍️", label: "Paper Bag Distribution" }, { emoji: "♻️", label: "Eco-friendly Alternative" }, { emoji: "🌿", label: "Environmental Awareness" }, { emoji: "🤝", label: "Community Engagement" }]}
      relatedLinks={[{ label: "I Say No To Plastic", href: "/corporate-social-responsibility/isaynotoplastic" }, { label: "Clean-up Activities", href: "/corporate-social-responsibility/cleanup" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
