"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const initiatives = [
  {
    title: "Quench the Thirst",
    target: 10000,
    suffix: "+",
    link: "/corporate-social-responsibility/quenchthethirst/",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    title: "Grow the Green",
    target: 100000,
    suffix: "+",
    link: "/corporate-social-responsibility/growthegreen/",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M12 20V10" />
        <path d="M12 10c0-4.5 3.5-8 8-8-1 3.5-3.5 6-8 8z" />
        <path d="M12 10c0-4.5-3.5-8-8-8 1 3.5 3.5 6 8 8z" />
      </svg>
    ),
  },
  {
    title: "Say No to Plastic",
    target: 50000,
    suffix: "+",
    link: "https://isaynotoplastic.com/",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 7.5L16.5 16.5" />
        <path d="M16.5 7.5L7.5 16.5" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        <path d="M18.36 5.64A9 9 0 0 1 12 21a9 9 0 0 1-6.36-2.64" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function CounterCard({
  item,
  isVisible,
  index,
}: {
  item: (typeof initiatives)[0];
  isVisible: boolean;
  index: number;
}) {
  const count = useCountUp(item.target, isVisible);

  const isExternal = item.link.startsWith("http");

  return (
    <a
      href={item.link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-out
          hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(255,221,2,0.2)]"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
      >
        {/* Hover glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,221,2,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-4 text-center">
          {/* Icon */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{ background: "rgba(255,221,2,0.15)", color: "#FFDD02" }}
          >
            {item.icon}
          </div>

          {/* Counter */}
          <div
            className="text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "#FFDD02" }}
            suppressHydrationWarning
          >
            {count.toLocaleString('en-IN')}
            {item.suffix}
          </div>

          {/* Title */}
          <p className="text-base font-medium tracking-wide text-white/90 md:text-lg">
            {item.title}
          </p>

          {/* Arrow indicator */}
          <div className="flex items-center gap-1 text-sm text-white/50 transition-all duration-300 group-hover:gap-2 group-hover:text-white/80">
            <span>Learn more</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function CsrBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) setIsVisible(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "#066837" }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient accents */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "#FFDD02" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "#FFDD02" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left heading */}
          <div className="shrink-0 text-center lg:w-[260px] lg:pt-8 lg:text-left">
            <div
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(255,221,2,0.15)", color: "#FFDD02" }}
            >
              Making a Difference
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              OUR CSR{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #FFDD02, #ffc107)",
                }}
              >
                INITIATIVES
              </span>
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full lg:mx-0"
              style={{ background: "linear-gradient(90deg, #FFDD02, transparent)" }}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Committed to building a sustainable future through meaningful social impact.
            </p>
          </div>

          {/* Counter cards */}
          <div className="grid w-full flex-1 grid-cols-1 gap-5 sm:grid-cols-3">
            {initiatives.map((item, i) => (
              <CounterCard key={item.title} item={item} isVisible={isVisible} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
