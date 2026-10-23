"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function CleanupPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/cleanup.webp"
      photos={csrGallery["cleanup"]}
      title="Clean-up Activities"
      tagline="Beach, park & street clean-up drives"
      heroDesc="SharonPly teams organize beach, park, and street clean-up drives — reinforcing environmental stewardship as a core value and inspiring communities to take ownership of their surroundings."
      color="#0891b2"
      emoji="🧹"
      bgClass="#0a1a1f"
      background="Litter and waste in public spaces degrade the environment and quality of life. SharonPly initiated regular clean-up drives to restore natural spaces and inspire communities to take pride in maintaining clean, healthy surroundings."
      whatWeDid={["Organized beach clean-up drives along the Chennai coastline", "Conducted park and street clean-up activities with employee volunteers", "Partnered with local organizations for large-scale environmental events", "Promoted waste segregation and responsible disposal practices"]}
      impact={[{ label: "Clean-up Drives", value: "30+" }, { label: "Waste Collected", value: "3 tonnes+" }, { label: "Volunteers Engaged", value: "500+" }, { label: "Locations Covered", value: "Chennai & Beyond" }]}
      gallery={[{ emoji: "🏖️", label: "Beach Clean-up" }, { emoji: "🧹", label: "Street Cleaning" }, { emoji: "♻️", label: "Waste Segregation" }, { emoji: "🤝", label: "Team Volunteers" }]}
      relatedLinks={[{ label: "Paper Bags Distribution", href: "/corporate-social-responsibility/paper-bags" }, { label: "Grow The Green", href: "/corporate-social-responsibility/growthegreen" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
