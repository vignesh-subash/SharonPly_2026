"use client";

import { useState, useCallback } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import { VideoLightbox } from "@/components/VideoLightbox";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";

const HERO = "/images/2026/pages/testimonials-hero.webp";


const testimonials = [
  {
    name: "Ar. Ponni M. Concessao",
    company: "M/s. Oscar & Ponni Architects",
    location: "Chennai",
    quote: "Completely satisfied with the quality of products and services provided by SharonPly. They consistently deliver on their promise — every single time.",
    years: "10+",
    initial: "P",
    color: "#00793A",
  },
  {
    name: "Ar. Vidya Chandar",
    company: "M/s. CS Designs Pvt. Ltd.",
    location: "Chennai",
    quote: "Quality is very consistent. Sharon Platinum is among the best in the market — the surface finish and structural strength set it apart from everything else I've specified.",
    years: "8+",
    initial: "V",
    color: "#1565c0",
  },
  {
    name: "Ar. T. Chandran",
    company: "M/s. CTC Designers",
    location: "Chennai",
    quote: "Fully satisfied with Sharon products. We have used them on prestigious projects including McKinsey, Ashok Leyland, and Brakes India — the quality speaks for itself.",
    years: "12+",
    initial: "T",
    color: "#7b1fa2",
    highlight: true,
  },
  {
    name: "Ar. Rashmi Yadav",
    company: "M/s. Yadav Architects",
    location: "Chennai",
    quote: "We have been growing together since our establishment. Sharon offers a wide variety of products with the best quality — a partnership built on trust and excellence.",
    years: "Founded together",
    initial: "R",
    color: "#e65100",
  },
  {
    name: "Ar. Ravimeenakshisundaram",
    company: "M/s. Aishus Design Connect",
    location: "Chennai",
    role: "Director",
    quote: "Sharon fulfills quality and customer service consistently. In our field, reliability is everything — SharonPly has never let us or our clients down.",
    years: "10+",
    initial: "R",
    color: "#006064",
  },
  {
    name: "Ar. Mahesh Jadav",
    company: "M/s. Jadav Associates",
    location: "Chennai",
    quote: "We have maintained a three-decade relationship built on the highest quality and timely delivery. Over 15 years of personal use — I recommend SharonPly without hesitation.",
    years: "30+",
    initial: "M",
    color: "#880e4f",
    highlight: true,
  },
  {
    name: "Ar. B. Arun",
    company: "M/s. Arun Associates",
    location: "Chennai",
    quote: "One of the best plywoods in Tamil Nadu state. Very satisfied with the product range and the support we receive from the Sharon team throughout every project.",
    years: "8+",
    initial: "B",
    color: "#1b5e20",
  },
  {
    name: "Ar. J. Manoharan",
    company: "IIID — Chennai Region Chapter",
    location: "Chennai",
    role: "Chairman",
    quote: "SharonPly is a valued corporate member and plays an important role in IIID events. Their commitment to the design community reflects the values they bring to their products.",
    years: "15+",
    initial: "J",
    color: "#bf360c",
  },
  {
    name: "Ar. Bhuvaneshwari",
    company: "Independent Architect",
    location: "Tirunelveli",
    quote: "I have been recommending SharonPly for 15 years and have received zero complaints from clients. That track record says everything about the consistency of their quality.",
    years: "15+",
    initial: "B",
    color: "#4a148c",
    highlight: true,
  },
  {
    name: "Ar. Bala",
    company: "M/s. Anutham Architecture Studio",
    location: "Chennai",
    quote: "I have been using SharonPly for 8–10 years and my clients are always happy with the results. I'm looking forward to maintaining this long-lasting relationship.",
    years: "8–10",
    initial: "B",
    color: "#01579b",
  },
  {
    name: "Ar. Sudheer",
    company: "M/s. Projects Studio",
    location: "Chennai",
    quote: "The quality and service SharonPly provides are among the best in the industry. Every interaction, every delivery, every panel reflects a commitment to excellence.",
    years: "7+",
    initial: "S",
    color: "#33691e",
  },
  {
    name: "Ar. R. Karthik Narayanan",
    company: "M/s. Ganesan Builders Limited",
    location: "Chennai",
    quote: "Very satisfied for the past 10 years. Excellent quality and service — SharonPly has been our go-to specification for all residential and commercial projects.",
    years: "10+",
    initial: "K",
    color: "#b71c1c",
    highlight: true,
  },
  {
    name: "Ar. Shripal",
    company: "M/s. SVA Shripal & Venkat Architects",
    location: "Chennai",
    quote: "Sharon provides peace of mind. When you specify SharonPly, you know the quality and consistency will be maintained — project after project, panel after panel.",
    years: "9+",
    initial: "S",
    color: "#004d40",
  },
  {
    name: "Ar. Varadharaj Periyasamy",
    company: "M/s. Eccentric Design Studio",
    location: "Chennai",
    quote: "Quality materials establish great design details. SharonPly consistently delivers on-time and provides the surface quality our designs demand.",
    years: "6+",
    initial: "V",
    color: "#1a237e",
  },
  {
    name: "Ar. Kunnakudi Srinivasan",
    company: "M/s. Bagyaan Associates",
    location: "Chennai",
    quote: "Three decades of partnership with SharonPly — built on the best quality initiatives and a genuinely affectionate relationship. They treat their clients like family.",
    years: "30+",
    initial: "K",
    color: "#3e2723",
    highlight: true,
  },
  {
    name: "Ar. Viapuri Thangavelu",
    company: "M/s. Viapuri Architects",
    location: "Salem",
    role: "Principal Architect",
    quote: "I have recommended SharonPly for 15 years and received zero complaints. A manufacturer you can truly rely on — consistent quality from the first sheet to the last.",
    years: "15+",
    initial: "V",
    color: "#00695c",
  },
  {
    name: "Ar. R. G. Andiyhappan",
    company: "M/s. Vindhaa Hi-Tech Builders",
    location: "Salem",
    quote: "Satisfied with the quality and services provided by SharonPly. They understand the demands of the construction industry and deliver accordingly.",
    years: "5+",
    initial: "A",
    color: "#5d4037",
  },
  {
    name: "Ar. Sheik Abdullah Sam",
    company: "M/s. SAHI Architects & Builders",
    location: "Chennai",
    role: "Co-founder & Principal Architect",
    quote: "Through SharonPly, we found what quality plywood truly means. The product sets the benchmark — everything else in the market is measured against it.",
    years: "8+",
    initial: "S",
    color: "#37474f",
  },
  {
    name: "Ar. Gowri Shankar R.R.",
    company: "M/s. Shankar Ramesh Architect",
    location: "Chennai",
    quote: "Service and products from SharonPly are extraordinary. The quality of your brand defines the quality of your work — and SharonPly makes us look exceptional.",
    years: "11+",
    initial: "G",
    color: "#0d47a1",
    highlight: true,
  },
];

const BIZCON_PLAYLIST = "PL84ygvbFjucLDBqYBJ23y3dgcre2vNRRR";

const bizconVideos = [
  { id: "N4jwxJpP68U", title: "SharonBIZCON | Nilesh Timber Traders | Stronger Together", dealer: "Nilesh Timber Traders", location: "South India" },
  { id: "PFnh8KnFUFA", title: "SharonBIZCON | Sri Ganesh Plywoods | Stronger Together", dealer: "Sri Ganesh Plywoods", location: "South India" },
  { id: "7p1XlVflQAk", title: "SharonBIZCON | Sri Swaraj Ply & Glass, Coimbatore | Stronger Together", dealer: "Sri Swaraj Ply & Glass", location: "Coimbatore" },
  { id: "X7XaLpnZL3I", title: "SharonBIZCON | Sri Ganesh Glass and Plywood | Stronger Together", dealer: "Sri Ganesh Glass and Plywood", location: "South India" },
];


function BizConVideoCard({ v, onPlay }: { v: typeof bizconVideos[0]; onPlay: (id: string, title: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className="group text-left w-full"
      onClick={() => onPlay(v.id, v.title)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.06)",
        background: "#0F0F0E",
        cursor: "pointer",
        padding: 0,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#111" }}>
        <YouTubeThumbnail id={v.id} alt={v.title} />
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
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.25s ease",
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
            top: 8,
            left: 8,
            padding: "2px 8px",
            borderRadius: 20,
            background: "rgba(3,105,161,0.9)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          BIZCON
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "18px 16px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.45,
              margin: "0 0 4px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {v.title}
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            {v.dealer} · {v.location}
          </p>
        </div>
      </div>
    </button>
  );
}

const QuoteIcon = ({ color }: { color: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.15">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill={color}/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill={color}/>
  </svg>
);

export default function TestimonialsPage() {
  const [playingBizCon, setPlayingBizCon] = useState<{ id: string; title: string } | null>(null);
  const closeBizCon = useCallback(() => setPlayingBizCon(null), []);

  return (
    <>
    <InnerPageLayout
      breadcrumbs={[{ label: "Testimonials" }]}
      title="What Our Clients Say"
      subtitle="Trusted by leading architects and builders across South India for over three decades"
      heroImage={HERO}
    >

      {/* ── Voice Of Trust ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">Voice Of Trust</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative bg-[#f9fafb] rounded-2xl p-6 flex flex-col overflow-hidden hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ border: "1px solid #e5e7eb" }}
              >
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: t.color }} />

                <div className="absolute top-4 right-4">
                  <QuoteIcon color={t.color} />
                </div>

                <p className="text-[13px] text-gray-600 leading-relaxed flex-1 mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-bold text-[#020202] truncate leading-tight">{t.name}</p>
                      {t.role && <p className="text-[11px] font-semibold" style={{ color: t.color }}>{t.role}</p>}
                      <p className="text-[11px] text-gray-500 truncate">{t.company}</p>
                    </div>
                  </div>
                                  </div>
              </div>
            ))}
          </div>
                  </div>
      </section>

      {/* ── BizCon Section ── */}
      <section className="py-16 bg-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">SharonBIZCON</h2>
              <p className="text-gray-500 mt-1 text-sm">Our dealer partners share their experience building a stronger business with SharonPly.</p>
            </div>
            <a
              href={`https://www.youtube.com/playlist?list=${BIZCON_PLAYLIST}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white"
              style={{ background: "#0369a1" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              View Full Playlist
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bizconVideos.map(v => (
              <BizConVideoCard key={v.id} v={v} onPlay={(id, title) => setPlayingBizCon({ id, title })} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Choose SharonPly for Your Next Project?</h2>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
            Connect with our team to find the right plywood, veneer, or door solution for your home, commercial, or project requirement.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all shadow-lg">
              Talk to Our Team
            </a>
            <a href="/dealers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">
              Find a Dealer
            </a>
          </div>
        </div>
      </section>

    </InnerPageLayout>
    {playingBizCon && (
      <VideoLightbox
        videoId={playingBizCon.id}
        title={playingBizCon.title}
        onClose={closeBizCon}
      />
    )}
    </>
  );
}
