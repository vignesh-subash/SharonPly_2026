"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomepagePins() {
  useEffect(() => {
    // Wait for smoother + DOM to be ready
    const timer = setTimeout(() => {
      const s2 = document.getElementById("hp-s2");
      const s3 = document.getElementById("hp-s3");
      if (!s2 || !s3) return;

      const trigger = ScrollTrigger.create({
        trigger: s2,
        start: "top top",
        // Pin ends the moment section 3 top reaches the viewport top
        end: () => `+=${s3.offsetTop - s2.offsetTop}`,
        pin: true,
        pinSpacing: false,
        // Section 3 slides over the pinned section 2
        anticipatePin: 1,
      });

      // Ensure section 3+ stack above the pinned section 2
      s2.style.zIndex = "1";

      return () => trigger.kill();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
