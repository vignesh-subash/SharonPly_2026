import type { Metadata } from "next";
import InnerPageLayout from "@/components/InnerPageLayout";
import CareersContent from "@/components/CareersContent";

export const metadata: Metadata = {
  title: "Careers at SharonPly",
  description:
    "Join the SharonPly team. Explore open positions across manufacturing, sales, marketing, and corporate functions.",
};

export default function CareersPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Careers" }]}
      title="Careers at SharonPly"
      subtitle="Join Us: Empowering People, Building Futures. At Sharon Ply, we believe our people are our greatest strength."
      heroImage="/images/2026/pages/careers-hero.webp"
      heroImagePosition="center 42%"
    >
      <CareersContent />
    </InnerPageLayout>
  );
}
