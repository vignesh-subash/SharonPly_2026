import { Metadata } from "next";
import VeneerClient from "./VeneerClient";

export const metadata: Metadata = {
  title: "Veneer | Premium Decorative Wood Veneers | SharonPly",
  description: "Sharon Veneers — premium decorative wood surfaces featuring natural sliced Exoti Natura and UV-cured Exoti Aura collections. CARB E0 compliant and FSC certified, designed for luxury interior applications.",
  alternates: { canonical: "https://sharonply.com/veneer" },
  openGraph: {
    title: "Veneer | Decorative Veneer Plywood | SharonPly",
    description:
      "Premium natural and factory-finished decorative veneers. Sharon Exoti Natura & Aura — FSC certified.",
    url: "https://sharonply.com/veneer",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SharonPly Veneer" }],
  },
};

export default function VeneerPage() {
  return <VeneerClient />;
}
