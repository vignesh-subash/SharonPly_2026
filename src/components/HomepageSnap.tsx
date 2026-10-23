"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function HomepageSnap({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let animating = false;

    const getSections = (): HTMLElement[] => {
      const snaps = Array.from(document.querySelectorAll<HTMLElement>(".snap-section"));
      const footer = document.querySelector<HTMLElement>("footer");
      return footer ? [...snaps, footer] : snaps;
    };

    const headerHeight = () =>
      (document.querySelector("header") as HTMLElement | null)?.offsetHeight ?? 0;

    const goTo = (index: number) => {
      const sections = getSections();
      if (!sections.length) return;
      index = Math.max(0, Math.min(sections.length - 1, index));
      if (index === currentIndex && animating) return;
      animating = true;
      currentIndex = index;

      // Offset by header so section's first line appears just below the nav
      const target = Math.max(0, sections[index].offsetTop - headerHeight());
      const smoother = (window as any).__gsapSmoother;

      if (smoother) {
        smoother.scrollTo(target, true);
        // Duration matches ScrollSmoother smooth value (~1.4s)
        setTimeout(() => { animating = false; }, 1000);
      } else {
        gsap.to(window, {
          scrollTo: { y: target, autoKill: false },
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => { animating = false; },
        });
      }
    };

    /* ── Wheel ── */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animating) return;
      goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
    };

    /* ── Touch ── */
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (animating) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      e.preventDefault();
      goTo(currentIndex + (dy > 0 ? 1 : -1));
    };

    /* ── Keyboard ── */
    const onKey = (e: KeyboardEvent) => {
      if (animating) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(currentIndex + 1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp"  ) { e.preventDefault(); goTo(currentIndex - 1); }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchend",   onTouchEnd,   { passive: false });
    window.addEventListener("keydown",    onKey);

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("keydown",    onKey);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
