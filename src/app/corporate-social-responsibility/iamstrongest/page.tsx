"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";

export default function IamStrongestPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/iamstrongest.webp"
      title="#IAmStrongest"
      tagline="Annual awards recognising grit, courage & strength"
      heroDesc="Celebrating individuals who overcome extraordinary challenges. The 6th edition was held in 2025, honouring real-life heroes from across India."
      color="#9333ea"
      emoji="💪"
      bgClass="#1a0a2a"
      background="#IAmStrongest was born from SharonPly's belief that true strength is found in the human spirit. The initiative recognizes ordinary people who have displayed extraordinary courage in the face of adversity — from survivors of accidents and illnesses to community heroes who selflessly serve others."
      whatWeDid={[
        "Conducted annual awards ceremony recognizing exceptional individuals",
        "Accepted nominations from across India for various categories of courage",
        "Provided financial support and recognition to award winners",
        "Shared inspiring stories to motivate and uplift communities",
        "The 6th edition in 2025 celebrated even more heroes across new categories",
      ]}
      impact={[
        { label: "Award Editions", value: "6" },
        { label: "Heroes Honoured", value: "60+" },
        { label: "Nominations Received", value: "1,000+" },
        { label: "Years Running", value: "Since 2019" },
      ]}
      gallery={[
        { emoji: "💪", label: "Award Ceremony" },
        { emoji: "🏆", label: "Hero Recognition" },
        { emoji: "🌟", label: "Inspiring Stories" },
        { emoji: "🤝", label: "Community Spirit" },
      ]}
      relatedLinks={[
        { label: "Quench The Thirst", href: "/corporate-social-responsibility/quenchthethirst" },
        { label: "I Say No To Plastic", href: "/corporate-social-responsibility/isaynotoplastic" },
        { label: "All CSR Initiatives", href: "/corporate-social-responsibility" },
      ]}
    />
  );
}
