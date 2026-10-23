import InnerPageLayout from "@/components/InnerPageLayout";
import AboutTimeline from "@/components/AboutTimeline";

export const metadata = {
  title: "Our History — SharonPly",
  description:
    "Discover SharonPly's journey from 1987 to today — a legacy of trusted plywood, veneers, and doors engineered with advanced technology and certified quality.",
};

export default function OurHistoryPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Our History" }]}
      title="Shaping Stronger Spaces"
      subtitle="From our manufacturing facility in Gummidipoondi, SharonPly has built a legacy of trusted plywood, veneers, and doors engineered with advanced technology, certified quality, and commitment to lasting performance."
      heroImage="/images/2026/about/hero.webp"
    >
      <AboutTimeline />
    </InnerPageLayout>
  );
}
