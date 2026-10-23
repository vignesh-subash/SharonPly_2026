import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SharonPly Catalogues | View & Download Product Brochures",
  description: "View and download SharonPly catalogues and product brochures for plywood, veneers, doors, technologies, certifications, and technical product information.",
  alternates: { canonical: "https://sharonply.com/catalogue" },
};

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
