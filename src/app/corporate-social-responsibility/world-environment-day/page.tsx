"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function WorldenvironmentdayPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/world-environment-day.webp"
      photos={csrGallery["world-environment-day"]}
      title="World Environment Day"
      tagline="Reaffirming commitment every June 5th"
      heroDesc="At SharonPly, World Environment Day is more than a date — it is a reaffirmation of our enduring commitment to environmental responsibility and sustainable practices."
      color="#15803d"
      emoji="🌍"
      bgClass="#0a1a0a"
      background="World Environment Day serves as a global reminder of our collective responsibility to protect the planet. SharonPly observes this day annually with activities that reinforce environmental stewardship and inspire action among employees and communities."
      whatWeDid={["Organized tree plantation drives on World Environment Day each year", "Conducted awareness sessions on environmental conservation", "Distributed saplings to employees and local communities", "Launched sustainability pledges and green workplace initiatives"]}
      impact={[{ label: "Trees Planted", value: "1,000+" }, { label: "Years Observed", value: "10+" }, { label: "Participants Engaged", value: "2,000+" }, { label: "Locations", value: "Across India" }]}
      gallery={[{ emoji: "🌍", label: "Environment Day" }, { emoji: "🌱", label: "Plantation Drive" }, { emoji: "♻️", label: "Sustainability" }, { emoji: "🤝", label: "Employee Participation" }]}
      relatedLinks={[{ label: "Grow The Green", href: "/corporate-social-responsibility/growthegreen" }, { label: "Clean-up Activities", href: "/corporate-social-responsibility/cleanup" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
