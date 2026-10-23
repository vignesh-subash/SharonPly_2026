"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function UmbrellaPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/umbrella.webp"
      photos={csrGallery["umbrella"]}
      title="Solar Umbrella Initiative"
      tagline="Empowering roadside vendors with solar-lit umbrellas"
      heroDesc="SharonPly distributes solar-powered umbrellas to street vendors at Marina Beach, Chennai — providing shade by day and light by night so vendors can operate safely and longer."
      color="#d97706"
      emoji="☂️"
      bgClass="#1a1208"
      background="Street vendors at Marina Beach, Chennai, face harsh sun during the day and poor lighting at night, limiting their working hours and income. SharonPly launched the Solar Umbrella initiative to provide vendors with sturdy, solar-powered umbrellas that offer shade by day and light by night."
      whatWeDid={["Distributed solar-powered umbrellas to street vendors at Marina Beach", "Each umbrella equipped with solar panels for nighttime LED lighting", "Provided durable, weather-resistant structures that withstand coastal conditions", "Enabled vendors to extend working hours and improve safety"]}
      impact={[{ label: "Umbrellas Distributed", value: "200+" }, { label: "Vendors Supported", value: "200+" }, { label: "Location", value: "Marina Beach, Chennai" }, { label: "Hours Extended", value: "4+ hrs daily" }]}
      gallery={[{ emoji: "☂️", label: "Solar Umbrella Distribution" }, { emoji: "☀️", label: "Shade by Day" }, { emoji: "💡", label: "Light by Night" }, { emoji: "🤝", label: "Vendor Empowerment" }]}
      relatedLinks={[{ label: "Quench The Thirst", href: "/corporate-social-responsibility/quenchthethirst" }, { label: "Flood Relief", href: "/corporate-social-responsibility/flood-relief" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
