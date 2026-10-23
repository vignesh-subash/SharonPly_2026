"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";

export interface MediaSlide {
  label: string;
  src: string;
}

interface MediaPreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** Accent colour for header bar and controls */
  accentColor?: string;
  /** Optional badge shown next to the title */
  badge?: string;
  /** Optional actions in the header (e.g. download link) */
  headerActions?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  children: ReactNode;
  /** Max width of the dialog — defaults to 900px */
  maxWidth?: number | string;
  ariaLabel?: string;
}

export function MediaPreviewModal({
  open,
  onClose,
  title,
  subtitle,
  accentColor = "#00793A",
  badge,
  headerActions,
  footer,
  children,
  maxWidth = 900,
  ariaLabel,
}: MediaPreviewModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: visible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background 0.22s ease",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ?? title}
    >
      <div
        className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{
          maxWidth,
          maxHeight: "min(92vh, 900px)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.28s cubic-bezier(0.34,1.2,0.64,1), opacity 0.22s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5"
          style={{ borderTop: `3px solid ${accentColor}` }}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {badge && (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: `${accentColor}15`, color: accentColor }}
                >
                  {badge}
                </span>
              )}
              <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">{title}</h3>
            </div>
            {subtitle && <p className="mt-0.5 truncate text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {headerActions}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              aria-label="Close preview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-4 py-2.5 sm:px-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Video preview ── */
export function VideoPreviewContent({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="relative bg-black" style={{ paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

/* ── PDF preview ── */
export function PdfPreviewContent({ src, title }: { src: string; title: string }) {
  return (
    <div className="bg-gray-100" style={{ height: "min(70vh, 640px)" }}>
      <iframe src={src} title={title} className="h-full w-full border-0" />
    </div>
  );
}

/* ── Image slideshow preview ── */
export function ImageSlideshowContent({
  slides,
  accentColor = "#00793A",
  initialIndex = 0,
}: {
  slides: MediaSlide[];
  accentColor?: string;
  initialIndex?: number;
}) {
  const [slide, setSlide] = useState(initialIndex);
  const [fading, setFading] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    if (next === slide || next < 0 || next >= slides.length) return;
    setFading(true);
    setTimeout(() => {
      setSlide(next);
      setFading(false);
    }, 150);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && slide < slides.length - 1) goTo(slide + 1);
      if (e.key === "ArrowLeft" && slide > 0) goTo(slide - 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [slide, slides.length]);

  useEffect(() => {
    const el = thumbRef.current?.children[slide] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [slide]);

  if (slides.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center bg-gray-900" style={{ maxHeight: "min(60vh, 520px)" }}>
        <img
          key={slide}
          src={slides[slide].src}
          alt={slides[slide].label}
          className="block max-h-[min(60vh,520px)] w-full object-contain"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.15s ease" }}
        />
        {slide > 0 && (
          <button
            onClick={() => goTo(slide - 1)}
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Previous page"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}
        {slide < slides.length - 1 && (
          <button
            onClick={() => goTo(slide + 1)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Next page"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-2.5 pt-8">
          <p className="text-xs text-white/80">{slides[slide].label}</p>
        </div>
      </div>

      {slides.length > 1 && (
        <div
          ref={thumbRef}
          className="flex gap-1.5 overflow-x-auto border-t border-gray-100 bg-gray-50 px-3 py-2"
          style={{ scrollbarWidth: "none" }}
        >
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="shrink-0 overflow-hidden rounded"
              style={{
                width: 40,
                height: 52,
                border: slide === i ? `2px solid ${accentColor}` : "2px solid transparent",
                opacity: slide === i ? 1 : 0.55,
                padding: 0,
                cursor: "pointer",
                transition: "opacity 0.2s, border 0.2s",
              }}
              aria-label={s.label}
            >
              <img src={s.src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── PDF download-only fallback ── */
export function PdfDownloadContent({ href, label }: { href: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="1.8" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      </div>
      <p className="mb-1 text-base font-bold text-gray-900">{label}</p>
      <p className="mb-5 text-sm text-gray-500">This edition is available as a downloadable PDF.</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="inline-flex items-center gap-2 rounded-xl bg-[#00793A] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PDF
      </a>
    </div>
  );
}
