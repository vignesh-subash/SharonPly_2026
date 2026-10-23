import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Certifications | SharonPly Quality Standards & Compliance",
  description: "View SharonPly awards, certifications, product standards, quality credentials, sustainability certifications, and compliance documents for plywood, veneer, doors, and manufacturing excellence.",
  alternates: { canonical: "https://sharonply.com/awards-certifications" },
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
