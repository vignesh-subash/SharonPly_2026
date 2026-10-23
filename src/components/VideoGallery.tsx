"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { VideoLightbox } from "@/components/VideoLightbox";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";

const videos = [
  { id: "DtRSqfvKcPE", title: "WHAT IS #FIRESAVE TECHNOLOGY?",       fullTitle: "What is #FIRESAVE Technology? | SharonGOLD",                           category: "Product", date: "2025",         duration: "00:45" },
  { id: "9JjY31BWDwY", title: "#IAMSTRONGEST AWARDS 2025",          fullTitle: "SharonPly — #IAmStrongest Awards 2025 | Key Highlights",                category: "Brand",   date: "2025",         duration: "02:00" },
  { id: "7REqAKSzg_0", title: "SHARONPLY CARES | CHOOLAI",          fullTitle: "SharonPly — Choolai Traffic Roundabout & Traffic Islands | SharonPlyCares", category: "CSR", date: "2025",         duration: "01:00" },
  { id: "TfJdHSIiVBE", title: "QUENCH THE THIRST 4.0",              fullTitle: "SharonPly — #QuenchTheThirst 4.0 | 2025",                                 category: "CSR",     date: "2025",         duration: "01:30" },
  { id: "h0lvuUcwA3A", title: "THE FIRE | FIREPROOF PLYWOOD",   fullTitle: "SharonPly — THE FIRE | FIREPROOF PLYWOOD",          category: "Product", date: "Oct 12, 2023", duration: "00:42" },
  { id: "P7ExjHBLx1Q", title: "SOVEREIGN — TVC 30 SEC",         fullTitle: "Sharon Sovereign — TVC 30 sec (Tamil)",             category: "TVC",     date: "Sep 5, 2023",  duration: "00:30" },
  { id: "P7SdEvvIp4I", title: "CRICKET STRENGTH | TVC 60 SEC",  fullTitle: "Sharon Plywoods Cricket Strength — TVC 60 Sec",     category: "TVC",     date: "Aug 18, 2023", duration: "01:00" },
  { id: "cF5qMb5JJwY", title: "THE TRUCK",                      fullTitle: "SharonPlywoods — The Truck",                        category: "TVC",     date: "Jul 30, 2023", duration: "00:45" },
  { id: "MMbD9bynFe4", title: "FIRESAVE TECHNOLOGY",            fullTitle: "SharonPly — FIRESAVE Technology Demo",              category: "Product", date: "Jun 10, 2023", duration: "01:15" },
  { id: "rvO0f6Tvi2k", title: "35 YEARS | FACTORY JOURNEY",     fullTitle: "SharonPly — 35 Years Celebration | #IAmStrongest Journey", category: "Corporate", date: "May 22, 2023", duration: "02:00" },
  { id: "XkyvoMZhnow", title: "A GLIMPSE OF SHARONPLY",         fullTitle: "SharonPly — A Glimpse of SharonPly",                category: "Corporate", date: "Apr 5, 2023",  duration: "01:30" },
  { id: "O0IJC8DC5SQ", title: "BRAND STORY | SINCE 1987",       fullTitle: "SharonPlywoods — Making In India Since 1987",       category: "TVC",     date: "Mar 1, 2023",  duration: "01:30" },
];

const CARDS_PER_PAGE = 8;

export default function VideoGallery() {
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const openLightbox = (id: string, title: string) => {
    setLightboxId(id);
    setLightboxTitle(title);
  };

  const closeLightbox = useCallback(() => {
    setLightboxId(null);
    setLightboxTitle("");
  }, []);

  /* Intersection observer — trigger entrance animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cards = videos.slice(0, CARDS_PER_PAGE);

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(250%)  skewX(-12deg); }
        }
        .video-card-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          transform: translateX(-100%) skewX(-12deg);
          pointer-events: none;
        }
        .video-card-shimmer:hover::after {
          animation: shimmer 0.75s ease forwards;
        }
        @keyframes play-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(0,121,58,0.3), 0 0 0px rgba(0,121,58,0.2); }
          50% { box-shadow: 0 0 20px rgba(0,121,58,0.6), 0 0 40px rgba(0,121,58,0.2); }
        }
        .video-play-glow {
          animation: play-glow 1.6s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(0,121,58,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,121,58,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div className="relative px-5 py-12 md:px-[52px] md:pt-20 md:pb-[100px]">

          {/* Header */}
          <div
            className="flex items-end justify-between mb-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 2.8vw, 46px)", fontWeight: 700, color: "#00793A", lineHeight: 1.1 }}>
                Videos, Campaigns &amp; Brand{' '}
              Stories
              </h2>
              <p className="text-gray-500 text-sm mt-1 max-w-xl">
                Discover SharonPly through TV commercials, promotional campaigns, customer testimonials, CSR initiatives, product showcases, factory insights, and brand stories that reflect our commitment to quality, innovation, and trust.
              </p>
              <div className="w-14 h-[3px] rounded-full mt-3" style={{ background: "linear-gradient(90deg, #00793A, #ffc107)" }} />
            </div>
            <Link
              href="/videos/"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[#00793A] text-sm font-bold border-2 border-[#00793A] transition-all hover:bg-[#00793A] hover:text-white flex-shrink-0"
            >
              Watch More →
            </Link>
          </div>

          {/* Cards grid — 2 rows × 4 columns */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {cards.map((video, idx) => {
                const isHovered = hoveredId === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => openLightbox(video.id, video.fullTitle)}
                    onMouseEnter={() => setHoveredId(video.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`group text-left focus:outline-none${idx >= 4 ? " hidden md:block" : ""}`}
                    aria-label={`Play ${video.fullTitle}`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(32px)",
                      transition: `opacity 0.5s ease ${0.1 + idx * 0.1}s, transform 0.5s ease ${0.1 + idx * 0.1}s`,
                    }}
                  >
                    <div
                      className="relative rounded-xl overflow-hidden video-card-shimmer"
                      style={{
                        aspectRatio: "var(--ratio-media)",
                        boxShadow: isHovered
                          ? "0 16px 40px rgba(0,0,0,0.22)"
                          : "0 4px 16px rgba(0,0,0,0.1)",
                        transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                      }}
                    >
                      {/* Thumbnail */}
                      <YouTubeThumbnail
                        id={video.id}
                        alt={video.title}
                        style={{
                          transition: "transform 0.5s ease",
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                        }}
                      />

                      {/* Gradient overlay — deepens on hover */}
                      <div className="absolute inset-0 transition-opacity duration-300" style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
                        opacity: isHovered ? 1 : 0.85,
                      }} />

                      {/* Duration badge */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded text-white"
                          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}>
                          {video.duration}
                        </span>
                      </div>

                      {/* Play button + pulse ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div style={{ position: "relative" }}>
                          {/* Pulse ring — only when hovered */}
                          {isHovered && (
                            <div style={{
                              position: "absolute", inset: -6, borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.6)",
                              animation: "pulse-ring 1.1s ease-out infinite",
                            }} />
                          )}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${isHovered ? 'video-play-glow' : ''}`}
                            style={{
                              background: isHovered ? "#00793A" : "rgba(255,255,255,0.92)",
                              boxShadow: isHovered
                                ? "0 0 0 6px rgba(0,121,58,0.25), 0 6px 24px rgba(0,0,0,0.35)"
                                : "0 4px 20px rgba(0,0,0,0.25)",
                              transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                              transform: isHovered ? "scale(1.2)" : "scale(1)",
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={isHovered ? "#fff" : "#00793A"} style={{ marginLeft: 2, transition: "fill 0.2s" }}>
                              <polygon points="6 3 20 12 6 21 6 3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Title overlay on hover */}
                      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5" style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(6px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                      }}>
                        <p className="text-white text-[11px] font-bold leading-snug line-clamp-2">{video.title}</p>
                      </div>
                    </div>

                    {/* Below-card info */}
                    <div className="mt-2.5 px-0.5">
                      <h3 className="text-[12.5px] font-bold text-[#00793A] leading-snug line-clamp-2 transition-colors duration-200"
                        style={{ color: isHovered ? "#00793A" : "#111827" }}>
                        {video.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">{video.date}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>


          {/* Mobile CTA */}
          <div className="mt-6 text-center md:hidden">
            <Link href="/videos/" className="inline-flex items-center gap-1.5 min-h-11 px-6 py-2.5 rounded-full text-white text-sm font-bold" style={{ background: "#00793A" }}>
              Watch More →
            </Link>
          </div>
        </div>
      </section>

      {lightboxId && (
        <VideoLightbox
          videoId={lightboxId}
          title={lightboxTitle}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
