"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionScrollController() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    // Wait for ScrollSmoother to be ready before creating ScrollTriggers
    const id = setInterval(() => {
      const smoother = (window as any).__gsapSmoother;
      if (!smoother) return;
      clearInterval(id);

      const sections = gsap.utils.toArray<HTMLElement>(".home-section");
      if (!sections.length) return;

      sections.forEach((section) => {
        /**
         * Timeline mapped to section's scroll through viewport:
         *   0.00 – 0.20:  enter viewport (fade in: 0.04 → 1)
         *   0.20 – 0.72:  fully visible / embossed (hold)
         *   0.72 – 1.00:  exit viewport  (fade out: 1 → 0.04)
         *
         * pointer-events enabled once mostly visible,
         * disabled before fade-out begins.
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Fade in  (progress 0.0 → 0.20)
        tl.fromTo(
          section,
          { opacity: 0.04 },
          { opacity: 1, duration: 0.20, ease: "power2.out" },
          0
        );
        // Enable interaction once mostly visible
        tl.set(section, { pointerEvents: "auto" }, 0.15);
        // Hold at full opacity  (progress 0.20 → 0.72)
        tl.to(section, { opacity: 1, duration: 0.52, ease: "none" }, 0.20);
        // Disable before fade-out begins
        tl.set(section, { pointerEvents: "none" }, 0.82);
        // Fade out  (progress 0.72 → 1.0)
        tl.to(
          section,
          { opacity: 0.04, duration: 0.28, ease: "power2.in" },
          0.72
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, 100);
  }, []);

  return null;
}
