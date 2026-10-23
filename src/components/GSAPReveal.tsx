"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  /** px to slide up from. default 56 */
  fromY?: number;
  /** stagger between children (only when animateChildren=true). default 0.11 */
  stagger?: number;
  duration?: number;
  ease?: string;
  /** animate each direct child individually with stagger. default false = animate wrapper as one */
  animateChildren?: boolean;
  /** additional delay before animation starts */
  delay?: number;
  /** ScrollTrigger start position. default "top 88%" */
  start?: string;
}

export default function GSAPReveal({
  children,
  className = "",
  fromY = 56,
  stagger = 0.11,
  duration = 0.9,
  ease = "power3.out",
  animateChildren = false,
  delay = 0,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = animateChildren
        ? gsap.utils.toArray<Element>(el.children)
        : [el];

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay,
          stagger: animateChildren ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
