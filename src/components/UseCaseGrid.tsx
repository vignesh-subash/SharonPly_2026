"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UseCase {
  num: string;
  title: string;
  href: string;
  icon: string;
}

const USE_CASES: UseCase[] = [
  { num: "01", title: "Kitchen Cabinets", href: "/plywood", icon: "/images/use-cases/icons/kitchen.png" },
  { num: "02", title: "Wardrobes", href: "/plywood", icon: "/images/use-cases/icons/wardrobe.png" },
  { num: "03", title: "Bathroom Vanities", href: "/plywood", icon: "/images/use-cases/icons/vanity.png" },
  { num: "04", title: "Office Furniture", href: "/plywood", icon: "/images/use-cases/icons/office.png" },
  { num: "05", title: "Commercial Interiors", href: "/plywood", icon: "/images/use-cases/icons/commercial.png" },
  { num: "06", title: "Hospitality", href: "/plywood", icon: "/images/use-cases/icons/hospitality.png" },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet(breakpoint = 1024) {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isTablet;
}

export default function UseCaseGrid() {
  const isMobile = useIsMobile(768);
  const isTablet = useIsTablet(1024);
  const isDesktop = !isMobile && !isTablet;
  const columns = isMobile ? 2 : 3;
  const iconSize = isMobile ? 56 : isDesktop ? 100 : 76;

  return (
    <section
      className="snap-section"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: isMobile ? "32px 20px 20px" : isTablet ? "40px 32px 24px" : "52px 52px 28px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(27px, 2.7vw, 44px)",
            fontWeight: 700,
            color: "#00793A",
            lineHeight: 1.1,
          }}
        >
          Right Plywood for<br />
          every purpose.
        </h2>
      </div>

      <div
        className="use-case-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: isMobile ? "repeat(3, auto)" : "1fr 1fr",
          gap: 0,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: 5,
        }}
      >
        {USE_CASES.map((useCase) => (
          <Link
            key={useCase.num}
            href={useCase.href}
            className="use-case-card"
            style={{
              background: "#FFFFFF",
              padding: isMobile ? "14px 8px" : "20px 12px",
              cursor: "pointer",
              textDecoration: "none",
              borderRight: "1px solid rgba(0,0,0,0.06)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              transition: "background 0.35s cubic-bezier(0.22,1,0.36,1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              if (!isDesktop) return;
              const el = e.currentTarget;
              el.style.background = "linear-gradient(135deg, #00793A 0%, #005c2c 55%, #00793A 100%)";
              el.style.backgroundImage = `
                linear-gradient(135deg, #00793A 0%, #005c2c 55%, #00793A 100%),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 8px,
                  rgba(255, 193, 7, 0.22) 8px,
                  rgba(255, 193, 7, 0.22) 9px
                )
              `;
              const title = el.querySelector("[data-uc-title]") as HTMLElement | null;
              const link = el.querySelector("[data-uc-link]") as HTMLElement | null;
              const icon = el.querySelector("[data-uc-icon]") as HTMLElement | null;
              if (title) title.style.color = "#FFFFFF";
              if (link) link.style.color = "#ffc107";
              if (icon) icon.style.filter = "brightness(0) invert(1)";
            }}
            onMouseLeave={(e) => {
              if (!isDesktop) return;
              const el = e.currentTarget;
              el.style.background = "#FFFFFF";
              el.style.backgroundImage = "none";
              const title = el.querySelector("[data-uc-title]") as HTMLElement | null;
              const link = el.querySelector("[data-uc-link]") as HTMLElement | null;
              const icon = el.querySelector("[data-uc-icon]") as HTMLElement | null;
              if (title) title.style.color = "#0F0F0E";
              if (link) link.style.color = "#00793A";
              if (icon) icon.style.filter = "none";
            }}
          >
            <div
              data-uc-icon
              style={{
                width: iconSize,
                height: iconSize,
                marginBottom: isDesktop ? 14 : 10,
                position: "relative",
                transition: "filter 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <Image
                src={useCase.icon}
                alt=""
                fill
                sizes={`${iconSize}px`}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div
              data-uc-title
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                color: "#0F0F0E",
                marginBottom: 4,
                transition: "color 0.3s",
                lineHeight: 1.3,
              }}
            >
              {useCase.title}
            </div>
            <div
              data-uc-link
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                color: "#00793A",
                letterSpacing: 1.2,
                fontWeight: 600,
                transition: "color 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              View Products →
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .use-case-card:nth-child(${columns}n) {
          border-right: none;
        }
        .use-case-card:nth-last-child(-n+${columns}) {
          border-bottom: none;
        }
      `}</style>
    </section>
  );
}
