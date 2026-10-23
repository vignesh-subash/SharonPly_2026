"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useHydrated } from "@/hooks/useHydrated";
import InnerPageLayout from "@/components/InnerPageLayout";
import type { CsrPhoto } from "@/data/csrGallery";

export interface CsrDetailProps {
  title: string;
  tagline: string;
  heroDesc: string;
  color: string;
  emoji: string;
  bgClass?: string;
  heroImage?: string;
  background: string;
  whatWeDid: string[];
  impact: { label: string; value: string }[];
  gallery: { emoji: string; label: string }[];
  /** Activity photos; when present they replace the emoji gallery tiles. */
  photos?: CsrPhoto[];
  relatedLinks: { label: string; href: string }[];
}

export default function CsrDetailTemplate({
  title, tagline, heroDesc, color, emoji, bgClass, heroImage,
  background, whatWeDid, impact, gallery, photos = [], relatedLinks,
}: CsrDetailProps) {
  const hydrated = useHydrated();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ opacity: hydrated ? 1 : 0, transition: "opacity 0.4s" }}>
    <InnerPageLayout
      breadcrumbs={[
        { label: "CSR", href: "/corporate-social-responsibility" },
        { label: title },
      ]}
      title={title}
      subtitle={tagline}
      heroImage={heroImage}
    >
      {/* Initiative intro */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 12 }}>{emoji}</span>
            <p className="text-gray-600 text-sm leading-relaxed">{heroDesc}</p>
          </div>
        </div>
      </section>

      {/* ── 2. BACKGROUND ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-3">Background</span>
            <h2 className="text-xl font-bold text-[#111] mb-4" style={{ fontFamily: "var(--font-display)" }}>Why This Initiative?</h2>
            <p className="text-[#4b5563] text-sm leading-relaxed">{background}</p>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE DID ── */}
      <section className="py-14 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-3">Activities</span>
            <h2 className="text-xl font-bold text-[#111] mb-4" style={{ fontFamily: "var(--font-display)" }}>What We Did</h2>
            <ul className="space-y-3">
              {whatWeDid.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4b5563] leading-relaxed">
                  <span style={{ color, fontWeight: 700, flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. IMPACT ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-3">Impact</span>
            <h2 className="text-xl font-bold text-[#111]" style={{ fontFamily: "var(--font-display)" }}>Making a Difference</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {impact.map((item, i) => (
              <div key={i} className="text-center p-5 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
                <p style={{ fontSize: "1.5rem", fontWeight: 900, color, marginBottom: 4 }}>{item.value}</p>
                <p className="text-[11px] text-[#5a5a5a] font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY ── */}
      <section className="py-14 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-3">Gallery</span>
            <h2 className="text-xl font-bold text-[#111]" style={{ fontFamily: "var(--font-display)" }}>Moments from the Field</h2>
          </div>
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ece9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00793A]"
                  aria-label={`Open ${title} photo ${i + 1} of ${photos.length}`}
                >
                  <img
                    src={photo.thumb}
                    alt={`${title} — photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {/* The media area holds the ratio so activity photos drop straight in;
                  the caption sits outside it and cannot distort the box. */}
              {gallery.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden bg-white border border-[#e8ece9] hover:shadow-sm transition-all"
                >
                  <div className="slot-media flex items-center justify-center bg-[#f3f6f4]">
                    <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#4b5563] text-center px-3 py-2.5">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 7. RELATED ── */}
      {relatedLinks.length > 0 && (
        <section className="py-12 bg-white border-t border-[#e8ece9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#00793A] mb-2">Explore More</span>
              <h2 className="text-lg font-bold text-[#111]" style={{ fontFamily: "var(--font-display)" }}>Related Initiatives</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedLinks.map((link, i) => (
                <Link key={i} href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-[#e0e4e0] text-[#00793A] hover:bg-[#f0faf4] transition-all">
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. CTA ── */}
      <section className="py-10" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-lg font-bold text-white mb-2">Together, We Can Make a Difference</h2>
          <p className="text-white/70 text-sm mb-6">Every initiative reflects our belief that true strength is measured by the lives we touch.</p>
          <Link href="/corporate-social-responsibility"
            className="inline-flex items-center gap-2 min-h-11 px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all">
            View All CSR Initiatives
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </InnerPageLayout>
    {open !== null && photos[open] && (
      <PhotoLightbox photos={photos} index={open} title={title} onChange={setOpen} />
    )}
    </div>
  );
}

function PhotoLightbox({ photos, index, title, onChange }: {
  photos: CsrPhoto[];
  index: number;
  title: string;
  onChange: (i: number | null) => void;
}) {
  const step = useCallback(
    (d: number) => onChange((index + d + photos.length) % photos.length),
    [index, photos.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [step, onChange]);

  const photo = photos[index];
  const navBtn = "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors";

  // Portalled to <body>: page wrappers carry transforms, which would pin a
  // fixed overlay to the page instead of the viewport.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4 sm:p-10"
      onClick={() => onChange(null)}
    >
      <img
        src={photo.src}
        alt={`${title} — photo ${index + 1}`}
        width={photo.w}
        height={photo.h}
        className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <button type="button" aria-label="Close" onClick={() => onChange(null)}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="Previous photo" className={`${navBtn} left-3 sm:left-6`}
            onClick={(e) => { e.stopPropagation(); step(-1); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button type="button" aria-label="Next photo" className={`${navBtn} right-3 sm:right-6`}
            onClick={(e) => { e.stopPropagation(); step(1); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium">
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </div>,
    document.body,
  );
}
