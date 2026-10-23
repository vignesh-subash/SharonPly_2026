"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

// Rotating brand messages shown below the elephant animation
const MESSAGES = [
  {
    line1: "You are about to explore products from",
    line2: "India's Largest Plywood Manufacturing Facility",
  },
  {
    line1: "Every sheet precision-bonded.",
    line2: "Every grade trust-tested. Since 1987.",
  },
  {
    line1: "From Gummidipoondi to your space —",
    line2: "Strength in Every Layer.",
  },
  {
    line1: "Welcome to SharonPly —",
    line2: "Built for Every Creator of Spaces.",
  },
];

const LOGO_SRC = "/images/sharon-corporate-logo.webp";
const CROP_SIZE = 96;
const RENDER_WIDTH = 344;

export default function PageLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    // Skip on initial page load — loading.tsx handles that
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnimKey((k) => k + 1);
    setMsgIndex(0);
    setVisible(true);
    setFadeOut(false);
    const hide = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 480);
    }, 3200);
    return () => clearTimeout(hide);
  }, [pathname, mounted]);

  // Rotate messages every 2.8s within the loader lifespan
  useEffect(() => {
    if (!visible || fadeOut) return;
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [visible, fadeOut]);

  if (!mounted || !visible) return null;

  const imgStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    width: RENDER_WIDTH,
    height: "auto",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f7",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.48s ease",
          pointerEvents: fadeOut ? "none" : "all",
        }}
      >
        {/* Elephant animation */}
        <div
          style={{
            width: CROP_SIZE,
            height: CROP_SIZE,
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            key={`grey-${animKey}`}
            src={LOGO_SRC}
            alt=""
            style={{ ...imgStyle, filter: "brightness(0) invert(1) opacity(0.18)" }}
            draggable={false}
          />
          <div
            key={`fill-${animKey}`}
            style={{
              position: "absolute", bottom: 0, left: 0,
              width: "100%", height: "100%",
              overflow: "hidden",
              animation: "fillRise 1.4s cubic-bezier(0.2,0,0.1,1) forwards",
            }}
          >
            <img
              src={LOGO_SRC}
              alt=""
              style={{
                ...imgStyle,
                filter: "brightness(0) saturate(100%) invert(28%) sepia(60%) saturate(600%) hue-rotate(95deg) brightness(0.85)",
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Rotating brand messages */}
        <div key={msgIndex} style={{ textAlign: "center", marginTop: 28, animation: "msgFadeIn 0.6s cubic-bezier(0.34,1.2,0.64,1) forwards" }}>
          <p style={{ fontSize: 14, color: "#5a5a5a", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
            {MESSAGES[msgIndex].line1}
          </p>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#00793A", lineHeight: 1.3, margin: "6px 0 0", fontFamily: "var(--font-display, sans-serif)", letterSpacing: "-0.02em" }}>
            {MESSAGES[msgIndex].line2}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 200, height: 3, borderRadius: 2, background: "#e8ece9", marginTop: 28, overflow: "hidden" }}>
          <div
            style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg, #00793A, #00a34e)",
              animation: "barProgress 3s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          />
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#00793A", animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fillRise {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }
        @keyframes msgFadeIn {
          0%   { opacity: 0; transform: translateY(10px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes barProgress {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
