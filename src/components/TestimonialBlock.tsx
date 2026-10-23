"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { VideoLightbox } from "@/components/VideoLightbox";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface VideoTestimonial {
  id: string;
  title: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Quality of Sharon Plywood is very consistent. The waterproof plywood is among the best in the market.",
    author: "Ar. Vidya Chandar",
    role: "Principal Architect · M/s. CS Designs Pvt. Ltd., Chennai",
    image: "/images/testimonial-vidya.png",
  },
  {
    quote: "We specify Sharonply so that we and our clients get peace of mind. Today, you can get many things easily but not peace.",
    author: "Ar. Shripal",
    role: "M/s. SVA Shripal & Venkat Architects, Chennai",
    image: "/images/testimonial-shripal.png",
  },
];

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "H0YOwy1igys",
    title: "Sharon Real Talk | Ar. Dikshit Boadalla, Binge Studio | Choice Of Experts",
  },
  {
    id: "X7XaLpnZL3I",
    title: "SharonBIZCON | Sri Ganesh Glass and Plywood | Stronger Together",
  },
];

export default function TestimonialBlock() {
  const [activeTab, setActiveTab] = useState<"text" | "video">("video");
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <section
      className="snap-section px-5 py-12 md:px-12 md:py-20"
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 2.4vw, 38px)",
            fontWeight: 700,
            color: "#00793A",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Trusted by Professionals
        </h2>
        <div
          style={{
            width: 40,
            height: 3,
            background: "#ffc107",
            margin: "12px auto 0",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginBottom: 36,
        }}
      >
        {([
          { key: "video", label: "Video Testimonials" },
          { key: "text", label: "Text Testimonials" },
        ] as const).map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                padding: "10px 14px",
                minHeight: 44,
                borderRadius: 999,
                border: isActive ? "1px solid #00793A" : "1px solid rgba(0,0,0,0.08)",
                background: isActive ? "#00793A" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#5A5850",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "video" ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[1100px] mx-auto w-full"
        >
          {VIDEO_TESTIMONIALS.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveVideo(video)}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.06)",
                background: "#0F0F0E",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "relative", paddingBottom: "56.25%", background: "#111" }}>
                <YouTubeThumbnail id={video.id} alt={video.title} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.08) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(0,121,58,0.92)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "18px 20px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {video.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 40,
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
          }}
          className="flex-col lg:flex-row"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "28px 20px",
                background: "#FAF9F6",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.04)",
                transition: "box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: 60,
                  color: "#ffc107",
                  lineHeight: 0.5,
                  marginBottom: 20,
                  userSelect: "none",
                  opacity: 0.8,
                }}
              >
                &ldquo;
              </div>

              <blockquote
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "clamp(16px, 1.4vw, 20px)",
                  fontWeight: 400,
                  color: "#0F0F0E",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  margin: "0 0 24px",
                  flex: 1,
                }}
              >
                {t.quote}
              </blockquote>

              <img
                src={t.image}
                alt={t.author}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 16,
                  flexShrink: 0,
                  border: "2px solid rgba(0,121,58,0.1)",
                }}
              />

              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#0F0F0E" }}>
                {t.author}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#9A9890", marginTop: 3 }}>
                {t.role}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom link */}
      <div style={{ textAlign: "center", marginTop: 44 }}>
        <Link
          href="/testimonials"
          className="inline-cta-link"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 600,
            color: "#00793A",
            letterSpacing: 1.5,
            cursor: "pointer",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.25s cubic-bezier(0.22,1,0.36,1)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#0F0F0E";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#00793A";
          }}
        >
          ALL TESTIMONIALS
          <span style={{ fontSize: 14 }}>&rarr;</span>
        </Link>
      </div>

      {activeVideo && (
        <VideoLightbox
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={closeVideo}
        />
      )}
    </section>
  );
}
