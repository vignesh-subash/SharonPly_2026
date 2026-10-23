import type { Metadata } from "next";
import TechnologyLanding from "@/components/TechnologyLanding";

export const metadata: Metadata = {
  title: "Sharon Secure App | Product Authentication",
  description:
    "Verify the authenticity of SharonPly products instantly with the Sharon Secure app. Scan the QR code on your plywood to confirm it is genuine.",
  alternates: { canonical: "https://sharonply.com/sharonsecureapp" },
};

export default function SharonSecureAppPage() {
  return (
    <TechnologyLanding
      breadcrumbs={[{ label: "Technology", href: "/technology" }, { label: "Sharon Secure" }]}
      title="Sharon Secure App"
      subtitle="Verify the authenticity of every SharonPly product instantly."
      heroImage="/images/2026/features/sharon-secure-hero.webp"
      accentColor="#1e3a5f"
      intro="Almost every good-quality and reputed product is duplicated and sold as the original. As an esteemed plywood brand, SharonPly has taken counteractive measures to prevent fake products from reaching customers. Sharon Secure integrates unique QR codes on plyboards so you can verify authenticity in seconds."
      features={[
        "Scan QR codes to verify genuine SharonPly products",
        "Designed for customers, dealers, retailers, contractors, and architects",
        "Helps protect against counterfeit plywood in the market",
        "Instant authentication from your mobile phone",
      ]}
      sections={[
        {
          heading: "About The App",
          body:
            "Sharon Secure helps customers determine the authenticity of purchased SharonPly products. Dealers, retailers, contractors, and interior designers can also use the app to confirm products before specification or installation.",
        },
        {
          heading: "How To Use Sharon Secure",
          body:
            "Step 1: Download the Sharon Secure app on your smartphone.\nStep 2: Locate the unique QR code on your SharonPly plyboard.\nStep 3: Scan the code using the app.\nStep 4: View instant verification results confirming product authenticity.",
        },
        {
          heading: "One App — Designed for All",
          body:
            "Whether you are a homeowner checking a recent purchase, a dealer validating stock, or an architect confirming materials on site, Sharon Secure provides a simple and reliable way to protect your project and your brand.",
        },
      ]}
      faqs={[
        {
          q: "Who can use the Sharon Secure app?",
          a: "Customers, dealers, retailers, contractors, and architects/interior designers can all use Sharon Secure to verify SharonPly products.",
        },
        {
          q: "How do I verify a SharonPly product?",
          a: "Download the Sharon Secure app, scan the QR code printed on the plyboard, and view the authentication result instantly.",
        },
      ]}
      ctaLabel="Contact for Support"
      ctaHref="/contact"
    />
  );
}
