"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isMobile = useIsMobileViewport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const useNativeScroll = isHomepage || isMobile || prefersReducedMotion;

  useEffect(() => {
    if (useNativeScroll) return;
    if (!wrapperRef.current || !contentRef.current) return;

    let smoother: { kill: () => void; scrollTop?: (n: number) => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollSmoother"),
      ]);
      if (cancelled || !wrapperRef.current || !contentRef.current) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.4,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });
      (window as Window & { __gsapSmoother?: typeof smoother }).__gsapSmoother = smoother;
    })();

    return () => {
      cancelled = true;
      smoother?.kill();
      delete (window as Window & { __gsapSmoother?: unknown }).__gsapSmoother;
    };
  }, [useNativeScroll]);

  useEffect(() => {
    if (isHomepage) return;
    const smoother = (window as Window & { __gsapSmoother?: { scrollTop?: (n: number) => void } }).__gsapSmoother;
    if (smoother && typeof smoother.scrollTop === "function") {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, isHomepage]);

  if (useNativeScroll) {
    return <>{children}</>;
  }

  return (
    <div id="smooth-wrapper" ref={wrapperRef} style={{ overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0 }}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
