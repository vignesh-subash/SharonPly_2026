import { Metadata } from "next";
import NaturaClient from "./NaturaClient";

export const metadata: Metadata = {
  title: "Sharon Exoti Natura | Natural Wood Veneer Collection | SharonPly",
  description: "Sharon Exoti Natura — premium natural wood veneers crafted for luxury interiors. Boiling water resistant, FSC certified, and protected against borer and termite attack, sourced responsibly from global timber species.",
  alternates: { canonical: "https://sharonply.com/veneer/exotic-natura" },
  openGraph: {
    title: "Sharon Exoti Natura — Natural Wood Veneer | SharonPly",
    description:
      "Authentic natural wood veneers. 7 species, 24 shades, FSC certified. No two sheets alike — every panel carries the signature of its tree.",
    url: "https://sharonply.com/veneer/exotic-natura",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sharon Exoti Natura Natural Veneer" }],
  },
};

export default function ExotiNaturaPage() {
  return <NaturaClient />;
}
