"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const SECTION_LABELS = [
  "SharonPly",
  "Solutions",
  "Applications",
  "Built For",
  "Testimonials",
  "Technology",
  "Videos",
  "Footer",
];

function getSectionElements(): HTMLElement[] {
  const snapSections = Array.from(document.querySelectorAll<HTMLElement>(".snap-section"));
  const footer = document.querySelector<HTMLElement>("footer");
  return footer ? [...snapSections, footer] : snapSections;
}

export default function HomepageScrollSnap({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeIndexRef = useRef(0);

  const scrollToSection = useCallback((index: number) => {
    const sections = getSectionElements();
    if (index < 0 || index >= sections.length) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
    sections[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) {
      document.documentElement.classList.add("homepage-snap-active");
    }

    const sections = getSectionElements();
    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }

        let bestIdx = activeIndexRef.current;
        let bestRatio = -1;

        sections.forEach((section, idx) => {
          const ratio = ratios.get(section) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });

        if (bestRatio > 0) {
          activeIndexRef.current = bestIdx;
          setActiveIndex(bestIdx);
        }
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = Math.max(1, scrollHeight - clientHeight);
      setScrollProgress(Math.min(1, Math.max(0, scrollTop / total)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.documentElement.classList.remove("homepage-snap-active");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const totalSections = SECTION_LABELS.length;

  return (
    <div className="homepage-scroll-snap" style={{ position: "static" }}>
      {/* ── Progress bar (top) ── */}
      <div
        className="hp-snap-progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${scrollProgress * 100}%`,
          background: "linear-gradient(90deg, #00793A, #ffc107)",
          zIndex: 2147483647,
          transition: "width 0.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* ── Side navigation dots ── */}
      <nav
        className="hp-snap-nav"
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 2147483647,
        }}
      >
        {Array.from({ length: totalSections }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${i + 1}`}
            style={{
              width: activeIndex === i ? 8 : 5,
              height: activeIndex === i ? 28 : 5,
              borderRadius: activeIndex === i ? 3 : "50%",
              background: activeIndex === i ? "#00793A" : "rgba(0,0,0,0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              padding: 0,
              boxShadow: activeIndex === i ? "0 0 6px rgba(0,121,58,0.5)" : "none",
            }}
          />
        ))}
      </nav>

      {children}
    </div>
  );
}
