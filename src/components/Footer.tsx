"use client";

import Link from "next/link";
import { useState } from "react";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SharonPlyIndia",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    filled: false,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sharonplyindia",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
    filled: false,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/SharonPlyIndia?s=20",
    path: <path d="M4 4l16 16M20 4L4 20" />,
    filled: false,
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@sharonplyindia",
    path: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08C16.71 18.72 14.5 20 12 20z" />
    ),
    filled: false,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/sharonply",
    path: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
    filled: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sharonplyindia",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    filled: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/914439403950",
    path: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    ),
    filled: true,
  },
];

const PRODUCTS = [
  { name: "Plywood", href: "/plywood" },
  { name: "Veneer", href: "/veneer" },
  { name: "Doors", href: "/door" },
];


const TECHNOLOGY_LINKS = [
  { name: "VIRASAFE", href: "/virasafe" },
  { name: "FIRESAVE", href: "/sharon-firesave" },
  { name: "E-ZERO", href: "/e-zero-emission" },
  { name: "Sharon Secure", href: "/sharonsecureapp" },
];

const COMPANY_LINKS = [
  { name: "Our History", href: "/our-history" },
  { name: "CSR", href: "/corporate-social-responsibility" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Videos", href: "/videos" },
  { name: "Calendar", href: "/calendar" },
  { name: "Catalogue", href: "/catalogue" },
];

const CONTACT_LINKS = [
  { name: "Find Us", href: "/contact" },
  { name: "Sales Team", href: "/contact/sales-team" },
  { name: "Careers", href: "/careers" },
  { name: "Dealers", href: "/dealers" },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <footer>
      {/* ── Main Footer ── */}
      <div className="bg-[#00793A] text-white">
        <div className="page-container pt-8 pb-16 lg:pt-10 lg:pb-20">

          {/* ════════════════════════════════════
              ROW 1 — Desktop 5-Column Grid
             ════════════════════════════════════ */}
          <div className="hidden lg:grid grid-cols-6 gap-8 xl:gap-10">

            {/* ── Col 1: Brand (col-span-2) ── */}
            <div className="col-span-2 flex flex-col gap-5">
              <Link href="/" className="inline-block">
                <img
                  src="/images/sharon-corporate-logo.webp"
                  alt="SharonPly — India\'s Most Trusted Plywood Since 1987"
                  className="h-[85px] w-auto object-contain "
                />
              </Link>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                SharonPly has been a trusted name in premium plywood solutions since 1987, delivering quality, innovation, and reliability for projects. Preferred by architects, interior designers, builders, carpenters, and homeowners, our products are engineered for lasting strength and performance.
              </p>
            </div>

            {/* ── Col 2: Products ── */}
            <div className="flex flex-col gap-1">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Products</h4>
              {PRODUCTS.map((p) => (
                <Link key={p.name} href={p.href}
                  className="text-sm text-white/65 hover:text-white transition-colors py-0.5">
                  {p.name}
                </Link>
              ))}
            </div>

            {/* ── Col 3: Technology ── */}
            <div className="flex flex-col gap-1">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Technology</h4>
              {TECHNOLOGY_LINKS.map((t) => (
                <Link key={t.name} href={t.href}
                  className="text-sm text-white/65 hover:text-white transition-colors py-0.5">
                  {t.name}
                </Link>
              ))}
            </div>

            {/* ── Col 4: Company ── */}
            <div className="flex flex-col gap-1">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Company</h4>
              {COMPANY_LINKS.map((c) => (
                <Link key={c.name} href={c.href}
                  className="text-sm text-white/65 hover:text-white transition-colors py-0.5">
                  {c.name}
                </Link>
              ))}
            </div>

            {/* ── Col 5: Contact Us ── */}
            <div className="flex flex-col gap-1">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Contact Us</h4>
              {CONTACT_LINKS.map((c) => (
                <Link key={c.name} href={c.href}
                  className="text-sm text-white/65 hover:text-white transition-colors py-0.5">
                  {c.name}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-1">
<a href="mailto:admin@sharonply.com" className="text-sm text-white/65 hover:text-white transition-colors py-0.5">
                  admin@sharonply.com
                </a>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════
              ROW 2 — Desktop: Get The App + Follow Us
             ════════════════════════════════════ */}
          <div className="hidden lg:flex items-center justify-between mt-12 pt-10 border-t border-white/15">
            
            {/* Left: Get The App */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107]">Get The App</h4>
              <p className="text-sm text-white/80 font-semibold">Sharon Secure</p>
              <div className="flex gap-3 mt-1">
                <a href="https://apps.apple.com/in/app/sharon-secure/id6444338080" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-white/40 leading-none">Download on</div>
                    <div className="text-xs font-semibold text-white">App Store</div>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.loyaltyworks.sharonply&hl=en_IN" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white flex-shrink-0">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 13l2.302-2.302v-.19zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-white/40 leading-none">Get it on</div>
                    <div className="text-xs font-semibold text-white">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Follow Us */}
            <div className="flex flex-col items-end gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107]">Follow us</h4>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-[#ffc107] hover:text-[#00793A] text-white/85 transition-all duration-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={s.filled ? "currentColor" : "none"} stroke={s.filled ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          MOBILE ACCORDION LAYOUT
         ════════════════════════════════════ */}
      <div className="bg-[#00793A] text-white lg:hidden">
        <div className="w-full px-6 py-6">
          {/* Logo + description (always visible) */}
          <div className="mb-6 pb-6 border-b border-white/15">
            <Link href="/" className="inline-block mb-3">
              <img
                src="/images/sharon-corporate-logo.webp"
                alt="SharonPly"
                className="h-[60px] w-auto object-contain "
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              SharonPly has been a trusted name in premium plywood solutions since 1987, delivering quality, innovation, and reliability for projects.
            </p>
          </div>

          {/* Accordion sections */}
          {[
            {
              id: "products",
              title: "Products",
              links: PRODUCTS,
            },
            {
              id: "technology",
              title: "Technology",
              links: TECHNOLOGY_LINKS,
            },
            {
              id: "company",
              title: "Company",
              links: COMPANY_LINKS,
            },
            {
              id: "contact",
              title: "Contact Us",
              extra: (
                <div className="mt-2 pt-2 border-t border-white/15 space-y-2">
                  <a href="mailto:admin@sharonply.com" className="block text-sm text-white/65 hover:text-white">admin@sharonply.com</a>
                </div>
              ),
              links: CONTACT_LINKS,
            },
          ].map((sec) => (
            <div key={sec.id} className="border-b border-white/15">
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-white font-semibold text-sm tracking-wider uppercase">{sec.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`text-white/60 transition-transform duration-200 ${openSection === sec.id ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openSection === sec.id && (
                <div className="pb-4 space-y-2">
                  {sec.links.map((l: any) => (
                    <Link key={l.name} href={l.href} className="block text-sm text-white/65 hover:text-white" onClick={() => setOpenSection(null)}>
                      {l.name}
                    </Link>
                  ))}
                  {sec.extra}
                </div>
              )}
            </div>
          ))}

          {/* Get The App - mobile */}
          <div className="pt-6 pb-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-2">Get The App</h4>
            <p className="text-sm text-white/80 font-semibold mb-3">Sharon Secure</p>
            <div className="flex gap-2">
              <a href="https://apps.apple.com/in/app/sharon-secure/id6444338080" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/15 flex-1 justify-center rounded-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white flex-shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-[10px] text-white/40 leading-none">Download on</div>
                  <div className="text-xs font-semibold text-white">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.loyaltyworks.sharonply&hl=en_IN" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/15 flex-1 justify-center rounded-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white flex-shrink-0">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 13l2.302-2.302v-.19zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div>
                  <div className="text-[10px] text-white/40 leading-none">Get it on</div>
                  <div className="text-xs font-semibold text-white">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Social icons - mobile */}
          <div className="pt-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Follow us</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-[#ffc107] hover:text-[#00793A] text-white/85 transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={s.filled ? "currentColor" : "none"} stroke={s.filled ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          BOTTOM BAR — Copyright + Privacy
         ════════════════════════════════════ */}
      <div className="bg-[#016933]">
        <div className="page-container py-4 flex items-center justify-center text-center">
          <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap justify-center">
            <span>Copyright &copy; 2026 SharonPly</span>
            <span className="text-white/25">|</span>
            <Link href="/terms-and-conditions" className="hover:text-white/80 transition-colors inline-flex items-center min-h-11 py-2">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}