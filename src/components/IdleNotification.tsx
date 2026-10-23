"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const IDLE_TIMEOUT = 20000;   // 20s inactivity → show
const DISPLAY_DURATION = 10000; // auto-hide after 10s

export default function IdleNotification() {
  const [visible, setVisible]       = useState(false);
  const [entered, setEntered]       = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const timerRef                    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoHideRef                 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleCheckRef                = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastActivityRef             = useRef(Date.now());

  // Only run on desktop
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Idle detection + display logic
  useEffect(() => {
    if (!isDesktop || dismissed) return;

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
      // If notification was visible, dismiss it on any activity
      if (visible) {
        setVisible(false);
        setEntered(false);
        if (autoHideRef.current) clearTimeout(autoHideRef.current);
      }
    };

    window.addEventListener("mousemove", resetActivity, { passive: true });
    window.addEventListener("scroll", resetActivity, { passive: true });
    window.addEventListener("click", resetActivity, { passive: true });
    window.addEventListener("keydown", resetActivity);

    // Check every second if idle threshold crossed
    idleCheckRef.current = setInterval(() => {
      if (dismissed || visible) return;
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= IDLE_TIMEOUT) {
        setVisible(true);
        // Trigger animation after mount
        requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
        // Auto-hide after display duration
        autoHideRef.current = setTimeout(() => {
          setVisible(false);
          setEntered(false);
        }, DISPLAY_DURATION);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", resetActivity);
      window.removeEventListener("scroll", resetActivity);
      window.removeEventListener("click", resetActivity);
      window.removeEventListener("keydown", resetActivity);
      if (idleCheckRef.current) clearInterval(idleCheckRef.current);
      if (autoHideRef.current) clearTimeout(autoHideRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDesktop, dismissed, visible]);

  const handleDismiss = () => {
    setVisible(false);
    setEntered(false);
    setDismissed(true);
    if (autoHideRef.current) clearTimeout(autoHideRef.current);
  };

  if (!isDesktop || !visible) return null;

  return (
    <>
      <style>{`
        @keyframes idleSlideIn {
          0%   { opacity: 0; transform: translateX(40px) scale(0.92); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes idleFadeOut {
          0%   { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(20px) scale(0.95); }
        }
        @keyframes drawArrow {
          0%   { stroke-dashoffset: 320; }
          70%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes arrowTipBounce {
          0%, 70% { transform: translate(0, 0); }
          85%     { transform: translate(2px, -2px); }
          100%    { transform: translate(0, 0); }
        }
        .idle-card {
          animation: idleSlideIn 0.6s cubic-bezier(0.34,1.3,0.64,1) forwards;
        }
        .idle-card-exit {
          animation: idleFadeOut 0.35s ease-in forwards;
        }
        .idle-arrow-line {
          stroke-dasharray: 320;
          animation: drawArrow 1s ease-in-out 0.3s forwards;
        }
        .idle-arrow-tip {
          animation: arrowTipBounce 1.1s ease-in-out 0.3s infinite;
        }
      `}</style>

      <div
        className="fixed z-[999] pointer-events-none"
        style={{
          right: "clamp(72px, 7vw, 100px)",
          bottom: "clamp(100px, 15vh, 160px)",
        }}
      >
        {/* Curled arrow pointing right toward the CTAs */}
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 100,
            height: 80,
          }}
        >
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="overflow-visible">
            {/* Curved line that curls from notification toward CTAs */}
            <path
              d="M95 40 C75 40, 60 55, 45 55 C25 55, 15 38, 15 38 C15 38, 8 30, 2 35"
              stroke="#00793A"
              strokeWidth="2"
              strokeLinecap="round"
              className="idle-arrow-line"
              fill="none"
              strokeDasharray="320"
            />
            {/* Arrow tip (small chevron at the end) */}
            <path
              d="M2 35 L8 30 L4 27"
              stroke="#00793A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="idle-arrow-tip"
            />
            {/* Small dot at the base */}
            <circle cx="95" cy="40" r="3" fill="#00793A" opacity="0.6" className="idle-arrow-tip" style={{ animationDelay: "0.5s" }} />
          </svg>
        </div>

        {/* Notification card */}
        <div
          className={entered ? "idle-card" : "idle-card-exit"}
          style={{
            pointerEvents: "auto",
            background: "#fff",
            borderRadius: 16,
            padding: "20px 24px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,121,58,0.12)",
            maxWidth: 280,
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            style={{ width: 24, height: 24, border: "none", background: "transparent", cursor: "pointer" }}
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0faf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00793A" }}>
              Quick Help
            </span>
          </div>

          {/* Message */}
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.5, margin: "0 0 4px" }}>
            You can reach us&mdash;
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.5, margin: "0 0 14px" }}>
            just a click away!
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: "#00793A", color: "#fff", textDecoration: "none" }}
              onClick={handleDismiss}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Enquire
            </Link>
            <a
              href="https://wa.me/914439403950"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}
              onClick={handleDismiss}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
              Chat
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
