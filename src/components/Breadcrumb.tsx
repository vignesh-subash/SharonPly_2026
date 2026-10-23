import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
  showHome?: boolean;
}

export default function Breadcrumb({
  items,
  variant = "dark",
  className = "",
  showHome = true,
}: BreadcrumbProps) {
  const isLight = variant === "light";

  const linkClass = isLight
    ? "text-white/60 hover:text-white transition-colors"
    : "text-gray-500 hover:text-[#00793A] transition-colors";

  const currentClass = isLight
    ? "text-white/85 font-semibold"
    : "text-gray-800 font-medium";

  const sepClass = isLight ? "text-white/30" : "text-gray-400";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-xs sm:text-sm list-none p-0 m-0">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <Link href="/" className={`${linkClass} inline-flex items-center min-h-11 px-1.5 py-2`}>
              Home
            </Link>
          </li>
        )}
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`${sepClass} shrink-0`}
              aria-hidden
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {item.href ? (
              <Link href={item.href} className={`${linkClass} inline-flex items-center min-h-11 px-1.5 py-2`}>
                {item.label}
              </Link>
            ) : (
              <span className={`${currentClass} inline-flex items-center min-h-11 px-1.5 py-2`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
