import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – SharonPly | Trusted Plywood Manufacturer Since 1987",
  description: "Discover SharonPly's 38+ year journey of innovation, quality, and craftsmanship. Learn about our advanced manufacturing facility in Gummidipoondi, Chennai, and our commitment to delivering premium plywood solutions across India.",
  alternates: { canonical: "https://sharonply.com/our-history" },
  openGraph: { title: "About Us – SharonPly | Trusted Plywood Manufacturer Since 1987", description: "Discover SharonPly's 38+ year journey of innovation, quality, and craftsmanship." },
};

export default function OurHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
