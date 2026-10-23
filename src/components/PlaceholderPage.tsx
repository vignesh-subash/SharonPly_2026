import InnerPageLayout from "@/components/InnerPageLayout";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PlaceholderPage({ title, subtitle, breadcrumbs }: PlaceholderPageProps) {
  return (
    <InnerPageLayout breadcrumbs={breadcrumbs} title={title} subtitle={subtitle}>
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#00793A]/8 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2d2d2d] mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Coming Soon
            </h2>
            <p className="text-[#5a5a5a] leading-relaxed">
              We&apos;re working on this page. Check back shortly for the full content.
            </p>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
