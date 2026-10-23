import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

export interface TechnologySection {
  heading: string;
  body: string;
}

export interface TechnologyProduct {
  name: string;
  href: string;
  description: string;
}

export interface TechnologyLandingProps {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle: string;
  heroImage: string;
  accentColor?: string;
  intro: string;
  sections: TechnologySection[];
  products?: TechnologyProduct[];
  features?: string[];
  faqs?: { q: string; a: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function TechnologyLanding({
  breadcrumbs,
  title,
  subtitle,
  heroImage,
  accentColor = "#00793A",
  intro,
  sections,
  products,
  features,
  faqs,
  ctaLabel = "Explore Plywood Products",
  ctaHref = "/plywood",
}: TechnologyLandingProps) {
  return (
    <InnerPageLayout breadcrumbs={breadcrumbs} title={title} subtitle={subtitle} heroImage={heroImage}>
      <section className="py-12 lg:py-16 bg-white">
        <div className="page-container max-w-4xl">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">{intro}</p>

          {features && features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-[#f8faf9] px-4 py-3"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: accentColor }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>

          {products && products.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Products With This Technology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="group rounded-2xl border border-gray-200 p-5 transition-all hover:border-[#00793A] hover:shadow-md"
                  >
                    <h3 className="font-bold text-gray-900 group-hover:text-[#00793A] transition-colors">{product.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#00793A]">
                      View Product
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {faqs && faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="rounded-xl border border-gray-200 bg-white px-5 py-4">
                    <summary className="cursor-pointer font-semibold text-gray-900">{faq.q}</summary>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: accentColor }}
            >
              {ctaLabel}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-800 transition-colors hover:border-[#00793A] hover:text-[#00793A]"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/914439403950"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366] px-6 py-3 text-sm font-bold text-[#128C7E] transition-colors hover:bg-[#f0fdf4]"
            >
              WhatsApp +91 44 3940 3950
            </a>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
