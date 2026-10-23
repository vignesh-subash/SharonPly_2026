import { Metadata } from "next";
import AuraClient from "./AuraClient";

export const metadata: Metadata = {
  title: "Sharon Exoti Aura | Factory Finished Decorative Veneer | SharonPly",
  description: "Sharon Exoti Aura — premium reconstituted wood veneer with UV-cured factory finish. Available in Matte, Satin, High-Gloss, and Textured surfaces, offering superior scratch resistance and zero on-site finishing.",
  alternates: { canonical: "https://sharonply.com/veneer/sharon-exoti-aura" },
  openGraph: {
    title: "Sharon Exoti Aura — Factory Pre-Polished Veneer | SharonPly",
    description:
      "Reconstituted wood veneer with UV-cured factory finish. 4 finish types, 6 species, 19 shades. Delivered site-ready.",
    url: "https://sharonply.com/veneer/sharon-exoti-aura",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sharon Exoti Aura Veneer" }],
  },
};

export default function AuraPage() {
  return <AuraClient />;
}
