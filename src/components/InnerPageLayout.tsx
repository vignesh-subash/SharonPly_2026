"use client";

import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import DesignedHeroBanner from "@/components/DesignedHeroBanner";

interface InnerPageLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroImagePosition?: string;
  heroContentAlign?: "center" | "right";
  /** The banner already carries its own designed headline: show it whole, uncropped,
   *  with no overlay, and keep the title for screen readers/SEO only. Defaults to true
   *  for the client's 2026 banners under /images/2026/. */
  heroDesigned?: boolean;
  children: React.ReactNode;
}

export default function InnerPageLayout({
  breadcrumbs,
  title,
  subtitle,
  heroImage,
  heroImagePosition = "center 40%",
  heroContentAlign = "center",
  heroDesigned,
  children,
}: InnerPageLayoutProps) {
  const isRight = heroContentAlign === "right";
  const designed = heroDesigned ?? Boolean(heroImage?.startsWith("/images/2026/"));

  if (designed && heroImage) {
    return (
      <div className="min-h-screen">
        <DesignedHeroBanner src={heroImage} title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
        <style>{`
          .inner-hero { aspect-ratio: var(--ratio-hero); max-height: 620px; }
        `}</style>
        {/* Hero Banner */}
        <section className="inner-hero relative overflow-hidden">
          {/* Background image / gradient */}
          <div className="absolute inset-0">
            {heroImage ? (
              <img src={heroImage} alt={title} className="w-full h-full object-cover" style={{ objectPosition: heroImagePosition }} />
            ) : (
              <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 60%, #003d1e 100%)" }} />
            )}
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0" style={{
              background: isRight
                ? "linear-gradient(to left, rgba(0,40,16,0.88) 0%, rgba(0,40,16,0.55) 38%, rgba(0,0,0,0.15) 62%, transparent 85%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,50,20,0.72) 60%, rgba(0,40,16,0.90) 100%)",
            }} />
            {/* Subtle green tint layer */}
            <div className="absolute inset-0" style={{
              background: isRight
                ? "linear-gradient(to left, rgba(0,121,58,0.4) 0%, transparent 55%)"
                : "linear-gradient(135deg, rgba(0,121,58,0.35) 0%, transparent 60%)",
            }} />
          </div>

          {/* Decorative geometric shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ffc107 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #00793A 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

          {/* Hero content — breadcrumbs left-aligned; title follows heroContentAlign */}
          <div className={`relative z-10 h-full flex flex-col justify-center ${isRight ? "items-stretch" : "items-stretch"}`}>
            <div className="page-container w-full">
              <Breadcrumb
                items={breadcrumbs}
                variant="light"
                className="mb-3 md:mb-5"
              />

              <div className={`flex flex-col ${isRight ? "items-center md:items-end text-center md:text-right" : "items-center text-center"}`}>
                {/* Glassmorphic title block */}
                <div className={`px-4 sm:px-10 py-4 sm:py-8 rounded-2xl w-full max-w-3xl ${isRight ? "md:ml-auto" : ""}`} style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 12px 48px rgba(0,0,0,0.35)" }}>
                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 24px rgba(0,0,0,0.45)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {title}
                  </h1>
                  {subtitle && (
                    <p className={`text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed mt-1 md:mt-2 hidden sm:block ${isRight ? "md:ml-auto" : "mx-auto"}`}>{subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Gold accent line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent 0%, #ffc107 30%, #ffc107 70%, transparent 100%)" }} />
        </section>

      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
}
