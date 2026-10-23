"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_COVER = "/images/calendar-themed-cover.jpg";

let workerConfigured = false;

async function configurePdfWorker(pdfjs: typeof import("pdfjs-dist")) {
  if (workerConfigured || typeof window === "undefined") return;
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  workerConfigured = true;
}

interface CalendarCoverImageProps {
  year: number;
  imageSrc?: string;
  pdfSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** When true, render the PDF cover immediately (e.g. preview modal). */
  priority?: boolean;
}

export default function CalendarCoverImage({
  year,
  imageSrc,
  pdfSrc,
  alt,
  className = "",
  style,
  priority = false,
}: CalendarCoverImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displaySrc, setDisplaySrc] = useState(imageSrc ?? FALLBACK_COVER);
  const [loadingPdf, setLoadingPdf] = useState(!imageSrc && !!pdfSrc);

  useEffect(() => {
    setDisplaySrc(imageSrc ?? FALLBACK_COVER);
    setLoadingPdf(!imageSrc && !!pdfSrc);
  }, [imageSrc, pdfSrc, year]);

  useEffect(() => {
    if (imageSrc || !pdfSrc) return;

    let cancelled = false;

    const renderPdfCover = async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
        const pdfjs = await import("pdfjs-dist");
        await configurePdfWorker(pdfjs);

        const pdf = await pdfjs.getDocument({
          url: pdfSrc,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }).promise;

        const page = await pdf.getPage(1);
        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.max(container.clientWidth || 0, priority ? 560 : 280);
        const scale = targetWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const context = canvas.getContext("2d");
        if (!context || cancelled) return;

        await page.render({ canvasContext: context, viewport }).promise;
        if (!cancelled) {
          setDisplaySrc(canvas.toDataURL("image/jpeg", 0.9));
          setLoadingPdf(false);
        }
      } catch {
        if (!cancelled) {
          setDisplaySrc(FALLBACK_COVER);
          setLoadingPdf(false);
        }
      }
    };

    if (priority) {
      renderPdfCover();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        renderPdfCover();
      },
      { rootMargin: "160px" },
    );

    const container = containerRef.current;
    if (container) observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [imageSrc, pdfSrc, year, priority]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      <img
        src={displaySrc}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loadingPdf ? "opacity-70" : "opacity-100"}`}
        loading={priority ? "eager" : "lazy"}
      />
      {loadingPdf && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        </div>
      )}
    </div>
  );
}
