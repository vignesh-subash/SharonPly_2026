"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useHydrated } from "@/hooks/useHydrated";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { submitForm } from "@/lib/submit-form";
import {
  navItems,
  megaCategories,
  contactDropdown,
  moreDropdown,
  plywoodWaterproof,
  plywoodWaterResistant,
} from "@/lib/navigation-data";

/* ── Shared SVG helpers (avoids inline duplication) ── */
const ChevronDown = ({ className }: { className?: string }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ChevronDownSm = ({ className }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ArrowRight = ({ className }: { className?: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
  </svg>
);

/* ── Shared image error handlers (avoids new fn per render) ── */
const onImgErrorFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.currentTarget as HTMLImageElement).src = "/images/sharon-corporate-logo.webp";
};
const onImgErrorHide = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.currentTarget as HTMLImageElement).style.display = "none";
};

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
export default function Header() {
  const rawPath = usePathname();
  const hydrated = useHydrated();
  const activePath = hydrated ? rawPath : "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileProductExpanded, setMobileProductExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    try {
      await submitForm({
        endpoint: "/api/forms/enquiry",
        formType: "enquiry",
        source: "header",
        body: { ...enquiryForm, source: "header", website: "" },
      });
      setEnquirySent(true);
      setTimeout(() => {
        setEnquiryOpen(false);
        setEnquirySent(false);
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      }, 2200);
    } catch {
      setEnquirySent(false);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Clean up pending close-timeout on unmount
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setMobileProductExpanded(null);
  };

  const toggleMobileSection = (label: string) => {
    setMobileExpanded((current) => {
      const next = current === label ? null : label;
      if (next !== label) setMobileProductExpanded(null);
      return next;
    });
  };

  const mobileNavLabelClass =
    "text-[15px] font-bold uppercase tracking-[1.2px] text-gray-800";
  const mobileNavRowClass =
    "flex w-full items-center justify-between gap-3 px-5 py-4 min-h-[52px] text-left transition-colors hover:bg-[#00793A]/5";

  const open = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const close = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-xl shadow-black/10" : ""}`}
      style={{ fontFamily: 'var(--font-brand)' }}>

      {/* ══ DESKTOP HEADER ══ */}
      <div className="bg-white border-b border-gray-200 hidden lg:block">

        {/* ── Full header (default state) ── */}
        <div className="page-container pt-4 flex items-stretch">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 pr-4 h-full"
          >
            <img
              src="/images/sharon-corporate-logo.webp"
              alt="SharonPly"
              width={308}
              height={85}
              className="w-auto object-contain"
              style={{ height: 85 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
            />
          </Link>

          {/* CENTER — Two rows stacked */}
          <div className="flex flex-col flex-1">

            {/* ROW 1 — Search + Contact */}
            <div className="flex items-center justify-between gap-4 h-[58px] border-b border-gray-100">
              <div className="flex-1">
                <SearchBar />
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* WhatsApp */}
              <a href="https://wa.me/914439403950" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                className="flex items-center justify-center rounded-full shrink-0 transition-all duration-200 hover:opacity-80 active:scale-95"
                style={{ width: 34, height: 34, background: "#25D366", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
                {/* Enquiry button */}
                <button onClick={() => setEnquiryOpen(true)} aria-label="Send Enquiry"
                  className="flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-80 active:scale-95"
                  style={{ width: 34, height: 34, background: "#00793A", color: "#fff" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  
                </button>
              </div>
            </div>

            {/* ROW 2 — Nav bar (white, dark text, green active underline) */}
            <nav className="static" style={{ height: 46 }} aria-label="Main navigation">
              <ul className="flex items-center justify-center h-full" role="menubar" style={{ gap: 12 }}>
                {navItems.map((item, itemIdx) => {
                  const isActive = item.href
                    ? activePath === item.href
                    : activePath.startsWith(`/${item.label.toLowerCase().replace(/ /g, "-")}`);
                  const isOpen = activeDropdown === item.label;
                  const cols = item.dropdown ? (item.dropdown.length > 4 ? 2 : 1) : 1;
                  // Anchor right-side dropdowns to right edge so they don't overflow viewport
                  const dropAlign = itemIdx >= navItems.length - 2 ? "right-0" : "left-0";

                  return (
                    <li key={item.label} className="relative flex items-stretch" role="none"
                      onMouseEnter={() => open(item.label)} onMouseLeave={close}>
                      {item.href ? (
                        <Link href={item.href} role="menuitem"
                          aria-haspopup={item.dropdown || item.megaMenu ? "true" : undefined}
                          aria-expanded={item.dropdown || item.megaMenu ? isOpen : undefined}
                          className="nav-item-link group relative flex items-center justify-center gap-1.5 text-[15px] font-light transition-colors duration-200 px-2.5"
                          style={{ fontFamily: 'var(--font-brand)', letterSpacing: "1.2px", textTransform: "uppercase", color: isActive || isOpen ? "#00793A" : "#1a1a1a" }}>
                          {item.label}
                          {(item.dropdown || item.megaMenu) && (
                            <ChevronDown className={`transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`} />
                          )}
                          <span className="nav-underline absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 origin-left"
                            style={{ background: "#00793A", transform: isActive || isOpen ? "scaleX(1)" : "scaleX(0)" }} />
                        </Link>
                      ) : (
                        <button role="menuitem" aria-haspopup="true" aria-expanded={isOpen}
                          className="nav-item-btn group relative flex items-center justify-center gap-1.5 text-[15px] font-light transition-colors duration-200 px-2.5"
                          style={{ fontFamily: 'var(--font-brand)', letterSpacing: "1.2px", textTransform: "uppercase", color: isActive || isOpen ? "#00793A" : "#1a1a1a" }}>
                          {item.label}
                          <ChevronDown className={`transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`} />
                          <span className="nav-underline absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 origin-left"
                            style={{ background: "#00793A", transform: isActive || isOpen ? "scaleX(1)" : "scaleX(0)" }} />
                        </button>
                      )}

                      {/* ── Simple dropdown — sits directly below this li ── */}
                      {item.dropdown && isOpen && (
                        <div className={`absolute top-full ${dropAlign} z-50`}
                          style={{ animation: "dropFadeIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards", minWidth: cols === 2 ? 480 : 240 }}>
                          <div className="bg-white rounded-2xl overflow-hidden"
                            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.16)", border: "1px solid rgba(0,0,0,0.06)" }}>
                            <div className="h-[3px] bg-gradient-to-r from-[#00793A] via-[#ffc107] to-[#00793A]" />
                            <div className="py-2 px-2" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
                              {item.dropdown.map((sub) => (
                                <Link key={sub.label} href={sub.href ?? "#"}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#00793A]/5 transition-all duration-150 group"
                                  onClick={() => setActiveDropdown(null)}>
                                  <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(0,121,58,0.08)", color: "#00793A" }}>
                                    {sub.icon}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[15px] font-semibold text-gray-800 group-hover:text-[#00793A] transition-colors leading-tight whitespace-nowrap">{sub.label}</span>
                                    {sub.desc && <span className="block text-[13px] text-gray-400 leading-tight mt-0.5">{sub.desc}</span>}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Mega menu — sits directly below this li ── */}
                      {item.megaMenu && isOpen && (
                        <div className={`absolute top-full ${dropAlign} z-50`}
                          style={{ animation: "dropFadeIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards" }}>
                          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}>
                            <div className="h-[3px] bg-gradient-to-r from-[#00793A] via-[#ffc107] to-[#00793A]" />
                            <div className="px-5 py-5" style={{ display: "grid", gridTemplateColumns: "300px 240px 240px", gap: 0 }}>
                              {/* ── COL 1: PLYWOOD ── */}
                              <div className="pr-5 border-r border-gray-100">
                                <Link href="/plywood" className="flex items-center gap-2 mb-4 group">
                                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[15px] font-extrabold text-white tracking-[1px] uppercase"
                                    style={{ background: "#00793A", fontFamily: 'var(--font-brand)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" />
                                    </svg>
                                    Sharon Plywood
                                  </span>
                                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00793A]" />
                                </Link>
                                {/* Waterproof group */}
                                <div className="mb-3">
                                  <div className="flex items-center gap-1.5 mb-1.5 px-2">
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0" style={{ background: "#e0f2fe", color: "#0ea5e9" }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                      </svg>
                                    </span>
                                    <span className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#0ea5e9]">Waterproof</span>
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    {plywoodWaterproof.map((p) => (
                                      <Link key={p.name} href={p.href}
                                        className="group flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[#00793A]/5 transition-all duration-150">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00793A]/20 group-hover:bg-[#ffc107] transition-colors flex-shrink-0" />
                                        <span className="text-[15px] font-medium text-gray-700 group-hover:text-[#00793A] transition-colors whitespace-nowrap">{p.name}</span>
                                        {p.tag && <span className="ml-auto text-[12px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold flex-shrink-0">{p.tag}</span>}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                                {/* Water Resistant group */}
                                <div>
                                  <div className="flex items-center gap-1.5 mb-1.5 px-2">
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0" style={{ background: "#ede9fe", color: "#6366f1" }}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                      </svg>
                                    </span>
                                    <span className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#6366f1]">Water Resistant</span>
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    {plywoodWaterResistant.map((p) => (
                                      <Link key={p.name} href={p.href}
                                        className="group flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[#00793A]/5 transition-all duration-150">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00793A]/20 group-hover:bg-[#ffc107] transition-colors flex-shrink-0" />
                                        <span className="text-[15px] font-medium text-gray-700 group-hover:text-[#00793A] transition-colors whitespace-nowrap">{p.name}</span>
                                        {p.tag && <span className="ml-auto text-[12px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold flex-shrink-0">{p.tag}</span>}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {/* ── COL 2: VENEER ── */}
                              <MegaCol cat={megaCategories[0]} />
                              {/* ── COL 3: DOORS ── */}
                              <MegaCol cat={megaCategories[1]} isLast />
                            </div>
                          </div>
                        </div>
                      )}

                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>{/* end right col */}
          {/* RIGHT — Follow Us + Social Icons */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 px-4 ml-2 pb-4"
            style={{ borderLeft: "1px solid #efefef" }}>
            <span className="text-[13px] font-light uppercase tracking-[1.2px] text-gray-600 mb-2.5"
              style={{ fontFamily: 'var(--font-brand)' }}>
              Follow us on
            </span>
            <div className="flex flex-row items-center gap-2.5">
              {/* Instagram */}
              <a href="https://www.instagram.com/sharonplyindia" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
                aria-label="Instagram"
                style={{ width: 34, height: 34, background: "rgba(0,121,58,0.08)", color: "#00793A" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/sharonply" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
                aria-label="YouTube"
                style={{ width: 34, height: 34, background: "rgba(0,121,58,0.08)", color: "#00793A" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/sharonplyindia" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
                aria-label="LinkedIn"
                style={{ width: 34, height: 34, background: "rgba(0,121,58,0.08)", color: "#00793A" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MOBILE TOP BAR ══ */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="page-container flex items-center justify-between" style={{ height: 64 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/sharon-corporate-logo.webp"
            alt="SharonPly"
            width={224}
            height={56}
            className="h-[56px] w-auto object-contain"
          />
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a href="https://wa.me/914439403950" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="flex items-center justify-center rounded-full shrink-0 touch-target-mobile"
            style={{ width: 44, height: 44, background: "#25D366", color: "#fff" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
          <button onClick={() => setEnquiryOpen(true)} aria-label="Enquiry"
            className="flex items-center justify-center rounded-full text-white touch-target-mobile"
            style={{ width: 44, height: 44, background: "#00793A" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
            className="flex items-center justify-center rounded-lg transition-colors touch-target-mobile"
            style={{ width: 44, height: 44, color: "#1a1a1a" }}>
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            }
          </button>
        </div>
        </div>
      </div>

      {/* ══ MOBILE MENU ══ */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ top: 64 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobileMenu} />

        <div
          className={`absolute left-0 top-0 bottom-0 flex w-[min(88vw,20rem)] flex-col bg-white transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ boxShadow: "4px 0 30px rgba(0,0,0,0.15)" }}
        >
          {/* Green strip */}
          <div className="bg-[#00793A] px-5 py-4 shrink-0">
            <img src="/images/sharon-corporate-logo.webp" alt="SharonPly" width={202} height={62} className="h-[62px] w-auto max-w-full object-contain rounded" />
          </div>

          {/* Search */}
          <div className="px-5 pt-4 pb-2 shrink-0">
            <SearchBar />
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-1">
            {navItems.map((item) => {
              const isExpanded = mobileExpanded === item.label;
              const hasChildren = Boolean(item.dropdown || item.megaMenu);

              return (
                <div key={item.label} className="border-b border-gray-100 last:border-0">
                  {!hasChildren && item.href ? (
                    <Link
                      href={item.href}
                      className={`${mobileNavRowClass} ${mobileNavLabelClass} hover:text-[#00793A]`}
                      onClick={closeMobileMenu}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileSection(item.label)}
                        aria-expanded={isExpanded}
                        className={`${mobileNavRowClass} ${isExpanded ? "text-[#00793A] bg-[#00793A]/5" : ""}`}
                      >
                        <span className={mobileNavLabelClass}>{item.label}</span>
                        <ChevronDownSm className={`shrink-0 text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#00793A]" : ""}`} />
                      </button>

                      {item.href && isExpanded && (
                        <div className="border-t border-gray-100 bg-[#f9fafb]">
                          <Link
                            href={item.href}
                            className="flex items-center justify-between gap-3 px-5 py-3 min-h-11 text-[13px] font-semibold uppercase tracking-[0.8px] text-[#00793A] hover:bg-[#00793A]/5 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            <span>View all {item.label.replace("OUR ", "").toLowerCase()}</span>
                            <ArrowRight />
                          </Link>
                        </div>
                      )}

                      {/* Simple dropdown */}
                      {item.dropdown && isExpanded && (
                        <div className="bg-[#f9fafb] border-t border-gray-100 py-2">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href ?? "#"}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-[#00793A]/5 transition-colors group"
                              onClick={closeMobileMenu}
                            >
                              <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(0,121,58,0.08)", color: "#00793A" }}>
                                {sub.icon}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[15px] font-semibold text-gray-700 group-hover:text-[#00793A] leading-tight">{sub.label}</span>
                                {sub.desc && <span className="block text-[13px] text-gray-400 leading-tight mt-0.5">{sub.desc}</span>}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Mega menu mobile — accordion per category */}
                      {item.megaMenu && isExpanded && (
                        <div className="bg-[#f9fafb] border-t border-gray-100 px-4 py-3 space-y-2">

                        {/* Sharon Plywood accordion */}
                        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => setMobileProductExpanded(mobileProductExpanded === "PLYWOOD" ? null : "PLYWOOD")}
                            className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-[#00793A]/5 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-[#00793A]/10 flex items-center justify-center text-[#00793A]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>
                              </div>
                              <span className="text-[14px] font-bold text-[#00793A] tracking-[0.8px] uppercase">Sharon Plywood</span>
                            </div>
                            <ChevronDownSm className={`transition-transform duration-200 text-gray-400 ${mobileProductExpanded === "PLYWOOD" ? "rotate-180" : ""}`} />
                          </button>
                          {mobileProductExpanded === "PLYWOOD" && (
                            <div className="px-4 pb-3 bg-white border-t border-gray-50">
                              {/* Waterproof group */}
                              <div className="flex items-center gap-1.5 mt-3 mb-1.5">
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0" style={{ background: "#e0f2fe", color: "#0ea5e9" }}>
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                                </span>
                                <span className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#0ea5e9]">Waterproof</span>
                              </div>
                              {plywoodWaterproof.map((p) => (
                                <Link key={p.name} href={p.href}
                                  className="flex items-center gap-2.5 py-2.5 pl-1 pr-1 text-[15px] text-gray-600 hover:text-[#00793A] transition-colors border-b border-gray-50 last:border-0"
                                  onClick={closeMobileMenu}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                                  <span className="flex-1">{p.name}</span>
                                  {p.tag && <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold">{p.tag}</span>}
                                </Link>
                              ))}
                              {/* Water Resistant group */}
                              <div className="flex items-center gap-1.5 mt-3 mb-1.5">
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0" style={{ background: "#ede9fe", color: "#6366f1" }}>
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                                </span>
                                <span className="text-[12px] font-bold uppercase tracking-[0.8px] text-[#6366f1]">Water Resistant</span>
                              </div>
                              {plywoodWaterResistant.map((p) => (
                                <Link key={p.name} href={p.href}
                                  className="flex items-center gap-2.5 py-2.5 pl-1 pr-1 text-[15px] text-gray-600 hover:text-[#00793A] transition-colors border-b border-gray-50 last:border-0"
                                  onClick={closeMobileMenu}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                                  <span className="flex-1">{p.name}</span>
                                  {p.tag && <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold">{p.tag}</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Veneer & Doors accordions */}
                        {megaCategories.map((cat) => (
                          <div key={cat.label} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                            <button
                              onClick={() => setMobileProductExpanded(mobileProductExpanded === cat.label ? null : cat.label)}
                              className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-[#00793A]/5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#00793A]/10 flex items-center justify-center text-[#00793A]">
                                  {cat.icon}
                                </div>
                                <span className="text-[14px] font-bold text-[#00793A] tracking-[0.8px] uppercase">Sharon {cat.label}</span>
                              </div>
                              <ChevronDownSm className={`transition-transform duration-200 text-gray-400 ${mobileProductExpanded === cat.label ? "rotate-180" : ""}`} />
                            </button>
                            {mobileProductExpanded === cat.label && (
                              <div className="px-4 pb-3 bg-white border-t border-gray-50">
                                {cat.products.map((p) => (
                                  <Link key={p.name} href={p.href}
                                    className="flex items-start gap-2.5 py-2.5 pl-1 pr-1 text-[15px] text-gray-600 hover:text-[#00793A] transition-colors border-b border-gray-50 last:border-0"
                                    onClick={closeMobileMenu}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-1" />
                                    <span className="flex-1">
                                      <span className="block">{p.name}</span>
                                      {"desc" in p && p.desc && <span className="block text-[13px] text-gray-400">{p.desc}</span>}
                                    </span>
                                    {p.tag && <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold mt-0.5">{p.tag}</span>}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile contact footer */}
          <div className="shrink-0 px-5 py-5 bg-[#f9fafb] border-t border-gray-100">
            <a href="tel:+914439403950" className="flex items-center gap-3 py-2 text-sm text-gray-700">
              <span className="w-8 h-8 rounded-full bg-[#00793A]/10 flex items-center justify-center text-[#00793A] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <span>
                <span className="block text-[9px] text-gray-400 uppercase tracking-wide">Call Us</span>
                <span className="block font-bold text-[#020202] text-sm">+91 44 3940 3950</span>
              </span>
            </a>
            <a href="mailto:admin@sharonply.com" className="flex items-center gap-3 py-2 text-sm text-gray-700">
              <span className="w-8 h-8 rounded-full bg-[#00793A]/10 flex items-center justify-center text-[#00793A] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span className="font-medium">admin@sharonply.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ══ ENQUIRY MODAL ══ */}
      {enquiryOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(2,8,4,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setEnquiryOpen(false); }}
        >
          <div
            className="relative w-full bg-white rounded-2xl overflow-hidden"
            style={{
              maxWidth: 480,
              boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
              animation: "modalSlideUp 0.3s cubic-bezier(0.34,1.2,0.64,1) forwards",
            }}
          >
            {/* Top accent */}
            <div style={{ height: 4, background: "linear-gradient(90deg, #00793A 0%, #ffc107 50%, #00793A 100%)" }} />

            <div className="p-7">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3
                    className="text-xl font-bold text-[#020202] mb-1"
                    style={{ fontFamily: "var(--font-brand)", letterSpacing: "-0.01em" }}
                  >
                    Quick Enquiry
                  </h3>
                </div>
                <button
                  onClick={() => setEnquiryOpen(false)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {enquirySent ? (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,121,58,0.1)" }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-base font-bold text-[#020202]">Enquiry Sent!</p>
                  <p className="text-[13px] text-gray-500 text-center">Thank you. Our team will reach out to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none transition-all"
                        style={{
                          border: "1.5px solid #e5e7eb",
                          fontFamily: 'var(--font-brand)',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#00793A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none transition-all"
                        style={{ border: "1.5px solid #e5e7eb", fontFamily: 'var(--font-brand)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#00793A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none transition-all"
                      style={{ border: "1.5px solid #e5e7eb", fontFamily: 'var(--font-brand)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#00793A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about your requirement..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none transition-all resize-none"
                      style={{ border: "1.5px solid #e5e7eb", fontFamily: 'var(--font-brand)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#00793A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full py-3 rounded-xl text-white text-sm sm:text-base font-bold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)",
                      boxShadow: "0 4px 14px rgba(0,121,58,0.3)",
                      fontFamily: 'var(--font-brand)',
                    }}
                  >
                    {enquirySubmitting ? "Sending…" : "Send Enquiry →"}
                  </button>
                  <p className="text-center text-xs sm:text-sm text-gray-400">
                    Or call us at{" "}
                    <a href="tel:+914439403950" className="font-semibold text-[#00793A]">+91 44 3940 3950</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dropFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-item-link:hover .nav-underline,
        .nav-item-btn:hover .nav-underline { transform: scaleX(1) !important; }
        header, header *, header button, header a, header span, header input, header textarea, header label {
          font-family: var(--font-brand) !important;
        }
        header h1, header h2, header h3 {
          font-family: var(--font-display) !important;
        }
      `}</style>
    </header>
  );
}

/* ══ HELPER: Shared column for Veneer / Doors / Teak ══ */
function MegaCol({
  cat,
  isLast,
}: {
  cat: typeof megaCategories[number];
  isLast?: boolean;
}) {
  return (
    <div className={`pr-5 ${isLast ? "" : "border-r border-gray-100"}`}>
      <Link href={cat.href} className="flex items-center gap-2 mb-4 group">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[15px] font-extrabold text-white tracking-[1px] uppercase whitespace-nowrap"
          style={{ background: "#00793A", fontFamily: 'var(--font-brand)' }}>
          {cat.icon}
          Sharon {cat.label}
        </span>
        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00793A]" />
      </Link>

      {/* Groups with sub-headings */}
      {cat.groups?.map((group, gi) => (
        <div key={gi} className={gi < (cat.groups?.length ?? 0) - 1 ? "mb-3" : ""}>
          <div className="flex items-center gap-1.5 mb-1.5 px-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
              style={{ background: group.bgColor, color: group.color }}>
              {group.icon}
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.8px]" style={{ color: group.color }}>
              {group.label}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {group.products.map((p) => (
              <Link key={p.name} href={p.href}
                className="group flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[#00793A]/5 transition-all duration-150">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00793A]/20 group-hover:bg-[#ffc107] transition-colors flex-shrink-0" />
                <span className="text-[15px] font-medium text-gray-700 group-hover:text-[#00793A] transition-colors whitespace-nowrap">{p.name}</span>
                {p.tag && <span className="ml-auto text-[12px] px-1.5 py-0.5 rounded-full bg-[#ffc107]/20 text-[#8B6914] font-semibold flex-shrink-0">{p.tag}</span>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
