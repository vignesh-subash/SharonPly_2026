"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function CovidreliefPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/covid-relief.webp"
      photos={csrGallery["covid-relief"]}
      title="COVID-19 Relief"
      tagline="Standing together in a time of crisis"
      heroDesc="During the COVID-19 pandemic, SharonPly rose to the occasion with a firm commitment to public health — distributing essentials and supporting affected families across communities."
      color="#6366f1"
      emoji="🛡️"
      bgClass="#0a0a1f"
      background="The COVID-19 pandemic created unprecedented challenges for communities across India. SharonPly responded swiftly, mobilizing resources to support employees, their families, and surrounding communities with essential supplies and financial assistance during the crisis."
      whatWeDid={["Distributed essential supplies including food kits and hygiene products", "Provided financial support to affected families and daily wage workers", "Supported local healthcare facilities with protective equipment", "Implemented workplace safety protocols to protect employees and their families"]}
      impact={[{ label: "Families Supported", value: "1,000+" }, { label: "Food Kits Distributed", value: "5,000+" }, { label: "Locations Covered", value: "Chennai Region" }, { label: "Year", value: "2020-2022" }]}
      gallery={[{ emoji: "🛡️", label: "Relief Distribution" }, { emoji: "🍱", label: "Food Kits" }, { emoji: "😷", label: "Safety Kits" }, { emoji: "🤝", label: "Community Support" }]}
      relatedLinks={[{ label: "Health Camps", href: "/corporate-social-responsibility/health-camps" }, { label: "Flood Relief", href: "/corporate-social-responsibility/flood-relief" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
