"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ── Avatar helpers ─────────────────────────────────────────────────────────── */

const AVATAR_COLORS = ["#00793A", "#1a3a6c", "#7c4f1e", "#5c3a1e"];

function getInitials(name: string): string {
  const parts = name.replace(/^Ar\.\s*/i, "").trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function InitialsAvatar({ name, color, size = 60 }: { name: string; color: string; size?: number }) {
  const initials = getInitials(name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: `2px solid ${color}55`,
      }}
    >
      <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.32, letterSpacing: "0.5px", fontFamily: "var(--font-brand)" }}>
        {initials}
      </span>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const written = [
  {
    id: "w1",
    type: "written" as const,
    rating: 4,
    boldLine: "Quality of SHARON PLYWOOD is very consistent",
    quote:
      "We find the quality of SHARON PLYWOOD to be very consistent and over the years we have used the same extensively. SHARON PLATINUM, the water proof plywood is among the best in the market.",
    name: "Ar. VIDYA CHANDAR",
    title: "Principal Architect",
    company: "M/s. CS DESIGNS PVT. LTD., Chennai",
    avatarColor: AVATAR_COLORS[0],
  },
  {
    id: "w2",
    type: "written" as const,
    rating: 4,
    boldLine: "Happy and satisfied for the past 10 years",
    quote:
      "We are indeed very happy and satisfied with the product as well as the services rendered by Sharon Plywoods in our various projects for the past 10 years.",
    name: "Ar. R. KARTHIK NARAYANAN",
    title: "Project Architect",
    company: "M/s. GANESAN BUILDERS LIMITED, Chennai",
    avatarColor: AVATAR_COLORS[1],
  },
  {
    id: "w3",
    type: "written" as const,
    rating: 5,
    boldLine: "Go-to choice for all premium residential projects",
    quote:
      "Sharon Plywood has been our go-to choice for all premium residential projects. The consistency in quality and timely delivery makes them stand apart from competitors.",
    name: "Ar. SURESH KUMAR",
    title: "Senior Architect",
    company: "KUMAR ASSOCIATES, Bangalore",
    avatarColor: AVATAR_COLORS[2],
  },
  {
    id: "w4",
    type: "written" as const,
    rating: 5,
    boldLine: "VIRASAFE technology gives our clients extra confidence",
    quote:
      "The VIRASAFE technology gives our clients extra confidence. We have been recommending Sharon PLATINUM for all modular kitchen and wardrobe projects with excellent results.",
    name: "Ar. PRIYA RAMACHANDRAN",
    title: "Interior Design Consultant",
    company: "DESIGN STUDIO INTERIORS, Coimbatore",
    avatarColor: AVATAR_COLORS[3],
  },
];

const videos = [
  {
    id: "v1",
    type: "video" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=360&fit=crop",
    name: "Ar. KRISHNAMURTHY",
    company: "SPACE DESIGNERS, Hyderabad",
    title: "Principal Architect",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1:32",
    preview: "An outstanding product range that has transformed how we approach interior construction…",
  },
  {
    id: "v2",
    type: "video" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=640&h=360&fit=crop",
    name: "RAVI SHANKAR",
    company: "RS BUILDERS, Coimbatore",
    title: "Managing Director",
    youtubeId: "dQw4w9WgXcQ",
    duration: "2:08",
    preview: "We've been using Sharon Plywood for 8 years on every site — the quality never disappoints.",
  },
  {
    id: "v3",
    type: "video" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=640&h=360&fit=crop",
    name: "MEENA IYER",
    company: "PRESTIGE INTERIORS, Chennai",
    title: "Lead Interior Designer",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1:47",
    preview: "Sharon Veneer collection is simply unmatched in natural grain consistency and finish.",
  },
  {
    id: "v4",
    type: "video" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=640&h=360&fit=crop",
    name: "Ar. DEEPAK PILLAI",
    company: "NEXUS ARCHITECTURE, Kochi",
    title: "Senior Architect",
    youtubeId: "dQw4w9WgXcQ",
    duration: "2:21",
    preview: "For commercial projects requiring Grade-A fire retardant ply, Sharon is our first call.",
  },
];

/* ── Sub-components ───────────────────────────────────────────────────────── */

function Stars({ count, size = 20 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < count ? "#ffc107" : "#e0e0e0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1.5 text-xs font-semibold text-[#ffc107]">{count}.0</span>
    </div>
  );
}

function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="Video testimonial"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
          <span className="text-white/70 text-sm">Video Testimonial — Sharon Ply</span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<"written" | "video">("written");
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Pair written testimonials 2-per-page */
  const writtenPages: (typeof written)[] = [];
  for (let i = 0; i < written.length; i += 2) writtenPages.push(written.slice(i, i + 2));
  const totalPages = activeTab === "written" ? writtenPages.length : Math.ceil(videos.length / 2);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setPage((p) => {
          const next = p + dir;
          if (next < 0) return totalPages - 1;
          if (next >= totalPages) return 0;
          return next;
        });
        setIsAnimating(false);
      }, 320);
    },
    [isAnimating, totalPages]
  );

  /* Reset page when switching tabs */
  useEffect(() => { setPage(0); }, [activeTab]);

  /* Auto-rotate every 6s */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => navigate(1), 6000);
    return () => clearInterval(timer);
  }, [navigate, isPaused]);

  const currentWritten = writtenPages[page] ?? [];
  const videoStart = page * 2;
  const currentVideos = videos.slice(videoStart, videoStart + 2);

  const slideClass = `transition-all duration-300 ${
    isAnimating
      ? `opacity-0 ${direction === 1 ? "-translate-x-4" : "translate-x-4"}`
      : "opacity-100 translate-x-0"
  }`;

  return (
    <>
      {videoModal && (
        <VideoModal youtubeId={videoModal} onClose={() => setVideoModal(null)} />
      )}

      <section
        ref={sectionRef}
        className="py-10 relative overflow-hidden"
        style={{ background: "#F5F5F5" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300793A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00793A]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#ffc107]/6 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          {/* ── Section header ───────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#ffc107] mb-3">
                Trusted by Professionals
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight" style={{ letterSpacing: "-0.02em" }}>
                What Our{" "}
                <span style={{ color: "#00793A" }}>Clients Say</span>
              </h2>
              <p className="text-gray-500 mt-2 text-base max-w-lg" style={{ lineHeight: "1.7" }}>
                Trusted by architects, builders, interior professionals, carpentry contractors, and homeowners across India — hear directly from the people who choose SharonPly for quality, reliability, and lasting performance.
              </p>
              {/* Gold underline */}
              <div className="mt-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#ffc107] to-[#e6a800]"
                style={{ animation: "underlineGrow 0.7s ease-out forwards" }} />
            </div>

            {/* Tab switcher */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("written")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === "written"
                    ? "bg-[#00793A] text-white shadow-sm"
                    : "text-[#555] hover:text-[#00793A]"
                }`}
              >
                Written
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === "video"
                    ? "bg-[#00793A] text-white shadow-sm"
                    : "text-[#555] hover:text-[#00793A]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Video
              </button>
            </div>
          </div>

          {/* ── Cards ────────────────────────────────────────────────────── */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${slideClass}`}>
            {activeTab === "written"
              ? currentWritten.map((t) => (
                  <WrittenCard key={t.id} t={t} />
                ))
              : currentVideos.map((v) => (
                  <VideoCard key={v.id} v={v} onPlay={() => setVideoModal(v.youtubeId)} />
                ))}
          </div>

          {/* ── Bottom row ───────────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Stacked avatars + rating pill */}
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100">
              <div className="flex -space-x-2.5">
                {written.slice(0, 4).map((t, i) => (
                  <div key={i} className="rounded-full border-2 border-white shadow-sm">
                    <InitialsAvatar name={t.name} color={t.avatarColor} size={32} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a1a1a]">Trusted by Professionals</p>
                <p className="text-[11px] text-[#555] mt-0.5 font-medium">Architects · Builders · Homeowners</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === page ? "w-7 h-2.5 bg-[#00793A]" : "w-2.5 h-2.5 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40"
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full border-2 border-[#00793A]/25 flex items-center justify-center text-[#00793A] hover:bg-[#00793A] hover:border-[#00793A] hover:text-white transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-full border-2 border-[#00793A]/25 flex items-center justify-center text-[#00793A] hover:bg-[#00793A] hover:border-[#00793A] hover:text-white transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Read more CTA ─────────────────────────────────────────────── */}
          <div className="mt-8 flex justify-center">
            <a
              href="/testimonials/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #00793A, #25a864)" }}
            >
              READ MORE TESTIMONIALS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Written card ─────────────────────────────────────────────────────────── */

function WrittenCard({ t }: { t: (typeof written)[number] }) {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setQuoteVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 relative"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Decorative quotation mark — fades in on scroll */}
      <div
        className="absolute -top-2 -left-2 pointer-events-none transition-all duration-700"
        style={{
          opacity: quoteVisible ? 0.08 : 0,
          transform: quoteVisible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.8)",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 100 100" fill="#00793A">
          <path d="M30 20 Q15 20 15 40 L15 60 L35 60 L35 40 L25 40 Q25 30 30 30 Z M70 20 Q55 20 55 40 L55 60 L75 60 L75 40 L65 40 Q65 30 70 30 Z" />
        </svg>
      </div>

      {/* Top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#00793A] via-[#ffc107] to-[#00793A]" />

      <div className="p-7 flex flex-col flex-1 relative z-10">
        {/* Bold opening line */}
        <p className="text-[#1a1a1a] font-bold text-[18px] leading-snug mb-3">
          &ldquo;{t.boldLine}&rdquo;
        </p>

        {/* Full quote */}
        <p className="text-[#555] text-[15px] flex-1 italic" style={{ lineHeight: "1.8" }}>
          {t.quote}
        </p>

        {/* Divider + attribution */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-4">
          <InitialsAvatar name={t.name} color={t.avatarColor} size={60} />
          <div>
            <p className="font-bold text-[#00793A] text-[15px] leading-tight">{t.name}</p>
            <p className="text-[13px] text-[#666] mt-0.5">{t.title}</p>
            <p className="text-[12px] text-[#999] mt-0.5">{t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Video card ───────────────────────────────────────────────────────────── */

function VideoCard({
  v,
  onPlay,
}: {
  v: (typeof videos)[number];
  onPlay: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden cursor-pointer" onClick={onPlay}>
        <img
          src={v.thumbnail}
          alt={v.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
          {v.duration}
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-white shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#00793A">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <p className="text-white font-bold text-[13px] leading-tight">{v.name}</p>
          <p className="text-white/80 text-[11px]">{v.title}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[#555] text-[15px] italic flex-1" style={{ lineHeight: "1.75" }}>
          &ldquo;{v.preview}&rdquo;
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] text-[#999]">{v.company}</p>
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-1.5 text-[#00793A] text-[12px] font-semibold hover:underline"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#00793A">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Video Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}
