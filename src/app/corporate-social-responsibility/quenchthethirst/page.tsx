"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function QuenchthethirstPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/quenchthethirst.webp"
      photos={csrGallery["quenchthethirst"]}
      title="Quench The Thirst"
      tagline="Providing water for birds and stray animals during harsh summers"
      heroDesc="During scorching summers, SharonPly distributes eco-friendly water bowls for birds and street animals across Chennai — helping reduce fatalities caused by dehydration."
      color="#0284c7"
      emoji="💧"
      bgClass="#0c2533"
      background="Each summer, soaring temperatures in Chennai take a severe toll on birds and stray animals that struggle to find drinking water. SharonPly launched #QuenchTheThirst to address this urgent need by placing water bowls across the city, ensuring that no creature goes thirsty during the hottest months."
      whatWeDid={[
        "Distributed over 1,000 eco-friendly water bowls across Chennai",
        "Placed bowls in parks, streets, and community areas with high bird and animal activity",
        "Partnered with local volunteers to refill and maintain water stations",
        "Conducted awareness drives about the importance of caring for urban wildlife during summer",
      ]}
      impact={[
        { label: "Water Bowls", value: "1,000+" },
        { label: "Years Active", value: "5+" },
        { label: "Locations", value: "Chennai" },
        { label: "Lives Impacted", value: "10,000+" },
      ]}
      gallery={[
        { emoji: "💧", label: "Water Bowl Distribution" },
        { emoji: "🐦", label: "Birds Hydrated" },
        { emoji: "🐕", label: "Stray Animals" },
        { emoji: "🤝", label: "Volunteers in Action" },
      ]}
      relatedLinks={[
        { label: "Grow The Green", href: "/corporate-social-responsibility/growthegreen" },
        { label: "I Say No To Plastic", href: "/corporate-social-responsibility/isaynotoplastic" },
        { label: "All CSR Initiatives", href: "/corporate-social-responsibility" },
      ]}
    />
  );
}
