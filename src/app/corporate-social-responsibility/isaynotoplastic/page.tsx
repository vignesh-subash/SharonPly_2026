"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";

export default function IsaynotoplasticPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/isaynotoplastic.webp"
      title="#ISayNoToPlastic"
      tagline="Encouraging sustainable choices for a cleaner planet"
      heroDesc="A campaign to raise awareness about plastic waste and promote sustainable alternatives. SharonPly has distributed paper bags and eco-friendly products to communities across Chennai, inspiring action against plastic pollution."
      color="#0ea5e9"
      emoji="♻️"
      bgClass="#0a1a2a"
      background="Plastic pollution is one of the most pressing environmental challenges of our time. SharonPly launched #ISayNoToPlastic to drive awareness and provide practical alternatives to single-use plastics, engaging communities in the mission to reduce plastic waste."
      whatWeDid={[
        "Launched a dedicated awareness campaign across digital and offline channels",
        "Distributed thousands of paper bags as alternatives to plastic bags",
        "Partnered with local businesses to reduce plastic packaging",
        "Conducted community workshops on waste reduction and recycling",
        "Inspired individuals and organizations to pledge against single-use plastic",
      ]}
      impact={[
        { label: "Paper Bags Given", value: "10,000+" },
        { label: "Campaign Reach", value: "1M+" },
        { label: "Years Active", value: "5+" },
        { label: "Partner Businesses", value: "50+" },
      ]}
      gallery={[
        { emoji: "♻️", label: "Plastic Awareness" },
        { emoji: "🛍️", label: "Paper Bag Distribution" },
        { emoji: "🌿", label: "Eco-friendly Living" },
        { emoji: "🤝", label: "Community Pledge" },
      ]}
      relatedLinks={[
        { label: "Paper Bags Distribution", href: "/corporate-social-responsibility/paper-bags" },
        { label: "Grow The Green", href: "/corporate-social-responsibility/growthegreen" },
        { label: "All CSR Initiatives", href: "/corporate-social-responsibility" },
      ]}
    />
  );
}
