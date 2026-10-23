"use client";

import CsrDetailTemplate from "@/components/CsrDetailTemplate";
import { csrGallery } from "@/data/csrGallery";

export default function HealthcampsPage() {
  return (
    <CsrDetailTemplate
      heroImage="/images/2026/csr/health-camps.webp"
      photos={csrGallery["health-camps"]}
      title="Health Camps"
      tagline="Caring for communities through accessible healthcare"
      heroDesc="SharonPly organizes targeted health initiatives for students, company workers, and contract employees — including cardiac screening camps and school health programmes."
      color="#dc2626"
      emoji="🏥"
      bgClass="#1f0a0a"
      background="Access to quality healthcare remains a challenge in many communities. SharonPly launched health camp initiatives to bring essential medical services directly to students, employees, and local communities — focusing on preventive care and early detection."
      whatWeDid={["Organized cardiac screening camps for employees and community members", "Conducted school health programmes at Gummidipoondi and surrounding areas", "Provided free health check-ups including vision, dental, and general wellness", "Partnered with local healthcare providers to offer specialist consultations"]}
      impact={[{ label: "Beneficiaries", value: "2,000+" }, { label: "Camps Conducted", value: "25+" }, { label: "Years Active", value: "8+" }, { label: "Villages Covered", value: "10+" }]}
      gallery={[{ emoji: "🏥", label: "Health Camp Setup" }, { emoji: "🩺", label: "Medical Check-ups" }, { emoji: "👨\u200d⚕️", label: "Doctor Consultations" }, { emoji: "❤️", label: "Community Care" }]}
      relatedLinks={[{ label: "COVID-19 Relief", href: "/corporate-social-responsibility/covid-relief" }, { label: "Free Helmet Distribution", href: "/corporate-social-responsibility/free-helmet-distribution" }, { label: "All CSR Initiatives", href: "/corporate-social-responsibility" }]}
    />
  );
}
