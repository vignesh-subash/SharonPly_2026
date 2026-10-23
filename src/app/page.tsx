import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Plywood in India | BWP Grade | Since 1987 | SharonPly",
  description: "SharonPly — India's most trusted plywood manufacturer since 1987. Premium BWP Grade, Marine, Fire Retardant and E-Zero plywood. Lifetime warranty on flagship grade.",
  alternates: { canonical: "https://sharonply.com/" },
};

import HeroCarousel from "@/components/HeroCarousel";
import ExpandingProductPanels from "@/components/ExpandingProductPanels";
import UseCaseGrid from "@/components/UseCaseGrid";
import VerticalTabPanel from "@/components/VerticalTabPanel";
import TestimonialBlock from "@/components/TestimonialBlock";
import FeatureGrid from "@/components/FeatureGrid";
import VideoGallery from "@/components/VideoGallery";
import HomepageScrollSnap from "@/components/HomepageScrollSnap";

export default function Home() {
  return (
    <div className="bg-white">
      <HomepageScrollSnap>

        {/* 1. Hero Banner */}
        <section className="snap-section">
          <HeroCarousel />
        </section>

        {/* 2. Solutions — Product Panels */}
        <ExpandingProductPanels />

        {/* 3. By Applications */}
        <UseCaseGrid />

        {/* 4. Built For */}
        <VerticalTabPanel />

        {/* 5. Trusted By Professionals — Testimonials */}
        <TestimonialBlock />

        {/* 6. Technology */}
        <FeatureGrid />

        {/* 7. Videos */}
        <section className="snap-section">
          <VideoGallery />
        </section>

      </HomepageScrollSnap>

    </div>
  );
}
