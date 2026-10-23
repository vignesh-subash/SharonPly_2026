import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";

/**
 * Hero for the client's designed banners (2400×1028, headline baked into the
 * artwork). Shows the banner whole and uncropped with nothing overlaid; the page
 * title stays in the DOM for screen readers and SEO only.
 */
export default function DesignedHeroBanner({
  src,
  title,
  subtitle,
  breadcrumbs,
}: {
  src: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <>
      <section className="relative">
        <img src={src} alt={title} className="block w-full h-auto" style={{ aspectRatio: "2400 / 1028" }} fetchPriority="high" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent 0%, #ffc107 30%, #ffc107 70%, transparent 100%)" }} />
      </section>
      <div className="bg-[#f8f9f8] border-b border-gray-100">
        <div className="page-container py-3">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>
      <h1 className="sr-only">{title}</h1>
      {subtitle && <p className="sr-only">{subtitle}</p>}
    </>
  );
}
