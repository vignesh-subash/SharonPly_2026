"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// Client-designed banners (2000×1125, 16:9) with their headline baked into the artwork,
// so nothing is overlaid; alt carries the banner copy for screen readers and SEO.
const SLIDES = [
  {
    desktop: "/images/2026/home/hero-16x9-1.webp",
    mobile: "/images/2026/home/hero-16x9-1-mobile.webp",
    alt: "India's largest plywood manufacturing facility, Gummidipoondi",
  },
  {
    desktop: "/images/2026/home/hero-16x9-2.webp",
    mobile: "/images/2026/home/hero-16x9-2-mobile.webp",
    alt: "Performance, built into every layer: plywood, decorative veneers and flush doors",
  },
  {
    desktop: "/images/2026/home/hero-16x9-3.webp",
    mobile: "/images/2026/home/hero-16x9-3-mobile.webp",
    alt: "Sharon Gold: strength you can build around",
  },
  {
    desktop: "/images/2026/home/hero-16x9-4.webp",
    mobile: "/images/2026/home/hero-16x9-4-mobile.webp",
    alt: "Calibrated plywood: perfection starts with precision",
  },
] as const;

const TOTAL = SLIDES.length;
const TRANSITION_MS = 900;
const SLIDE_DELAYS = [9000, 8000, 8000, 8000] as const;
const getDelay = (idx: number) => SLIDE_DELAYS[idx] ?? 8000;

function HeroSlideImage({
  desktop,
  mobile,
  alt,
  slideIndex,
  priority = false,
  active,
}: {
  desktop: string;
  mobile: string;
  alt: string;
  slideIndex: number;
  priority?: boolean;
  active: boolean;
}) {
  if (!active && !priority) return null;

  return (
    <picture className="absolute inset-0 block">
      <source media="(max-width: 767px)" srcSet={mobile} type="image/webp" />
      <source srcSet={desktop} type="image/webp" />
      <img
        src={desktop}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover hero-slide-img-${slideIndex}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTrans] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    if (transitioning || next === current) return;
    setTrans(true);
    setTimeout(() => { setCurrent(next); setTrans(false); }, TRANSITION_MS);
  }, [current, transitioning]);

  useEffect(() => {
    if (paused) return;
    autoRef.current = setTimeout(() => goTo((current + 1) % TOTAL), getDelay(current));
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [current, paused, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goTo(dx < 0 ? (current + 1) % TOTAL : (current - 1 + TOTAL) % TOTAL);
    }
    touchStartX.current = null; touchStartY.current = null;
  };

  const ss = (idx: number): React.CSSProperties => ({
    position: "absolute", inset: 0,
    transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.25,0.1,0.15,1)`,
    opacity: current === idx ? 1 : 0,
    pointerEvents: current === idx ? "auto" : "none",
  });

  const shouldLoadImage = (idx: number) =>
    idx === current || idx === (current + 1) % TOTAL || idx === (current - 1 + TOTAL) % TOTAL;

  return (
    <section
      className="relative w-full overflow-hidden select-none hero-carousel-height"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Hero carousel"
    >
      <h1 className="sr-only">SharonPly: India&apos;s largest plywood manufacturer since 1987</h1>
      {SLIDES.map((slide, idx) => (
        <div key={idx} style={ss(idx)} aria-hidden={current !== idx}>
          <HeroSlideImage
            desktop={slide.desktop}
            mobile={slide.mobile}
            alt={slide.alt}
            slideIndex={idx}
            priority={idx === 0}
            active={shouldLoadImage(idx)}
          />
        </div>
      ))}

      {(["prev", "next"] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => goTo(dir === "prev" ? (current - 1 + TOTAL) % TOTAL : (current + 1) % TOTAL)}
          aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
          className="absolute top-1/2 -translate-y-1/2 z-30 hero-carousel-arrow"
          style={{
            [dir === "prev" ? "left" : "right"]: "clamp(8px,2vw,24px)",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,121,58,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.transform = "translateY(-50%)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={dir === "prev" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ))}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0 sm:gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="carousel-dot-btn sm:min-w-0 sm:min-h-0 sm:p-0"
            style={{
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: current === i ? 22 : 7,
                height: 7,
                background: current === i ? "#ffc107" : "rgba(255,255,255,0.45)",
              }}
            />
          </button>
        ))}
      </div>

      <style>{`
        /* Banners are 16:9 (2000×1125). Phones and portrait tablets show them whole. */
        .hero-carousel-height { aspect-ratio: 2000 / 1125; }
        /* Landscape screens: fill exactly the space under the sticky header (65px below
           1024px, 121px above), so there is no white band under the banner on 16:10
           laptops. Trimming is capped at 20% of the height (headlines sit between
           ~20% and ~85%) and stretching at 14%; any side trim comes off the right,
           away from the left-aligned copy. */
        @media (min-width: 768px) and (orientation: landscape) {
          .hero-carousel-height {
            aspect-ratio: auto;
            height: clamp(45vw, calc(100svh - 65px), 64vw);
          }
          .hero-carousel-height img { object-position: left center; }
        }
        @media (min-width: 1024px) and (orientation: landscape) {
          .hero-carousel-height { height: clamp(45vw, calc(100svh - 121px), 64vw); }
        }
        .hero-carousel-arrow {
          width: 40px;
          height: 40px;
        }
        @media (min-width: 640px) {
          .hero-carousel-arrow {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
