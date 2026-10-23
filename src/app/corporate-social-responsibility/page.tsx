"use client";

import { useState } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

// ─── 12 real CSR initiatives, in the client's numbered order (CSR IMAGES 1–12) ─
const initiatives = [
  {
    id: "iamstrongest",
    hashtag: "#IAmStrongest",
    title: "I Am Strongest",
    tagline: "Celebrating stories of grit, courage, and strength",
    description: "Annual awards recognising stories of grit, courage, and strength. The 6th edition was held in 2025, celebrating individuals who overcame extraordinary challenges.",
    href: "https://www.iamstrongest.com/",
    external: true,
    color: "#9333ea",
    emoji: "💪",
  },
  {
    id: "quenchthethirst",
    hashtag: "#QuenchTheThirst",
    title: "Quench The Thirst",
    tagline: "1,000+ water bowls distributed across Chennai",
    description: "During scorching summers, SharonPly distributes eco-friendly water bowls for birds and street animals across Chennai — helping reduce fatalities caused by dehydration.",
    href: "/corporate-social-responsibility/quenchthethirst/",
    external: false,
    color: "#0284c7",
    emoji: "💧",
  },
  {
    id: "growthegreen",
    hashtag: "#GrowTheGreen",
    title: "Grow The Green",
    tagline: "10+ years · thousands of saplings distributed",
    description: "A decade-long commitment to greener tomorrows. SharonPly has distributed thousands of saplings at schools, public events, government offices, and exhibitions across India.",
    href: "/corporate-social-responsibility/growthegreen/",
    external: false,
    color: "#16a34a",
    emoji: "🌱",
  },
  {
    id: "notoplastic",
    hashtag: "#ISayNoToPlastic",
    title: "I Say No To Plastic",
    tagline: "Encouraging sustainable choices for a cleaner planet",
    description: "A campaign to raise awareness about plastic waste and promote sustainable alternatives. Distributed paper bags and eco-friendly products to communities across Chennai.",
    href: "https://isaynotoplastic.com/",
    external: true,
    color: "#0ea5e9",
    emoji: "♻️",
  },
  {
    id: "health-camps",
    hashtag: "Health Camps",
    title: "Health Camps",
    tagline: "Caring for communities, strengthening lives",
    description: "Targeted health initiatives for students, company workers, and contract employees — including cardiac screening camps and school health programmes at Gummidipoondi.",
    href: "/corporate-social-responsibility/health-camps/",
    external: false,
    color: "#dc2626",
    emoji: "🏥",
  },
  {
    id: "paperbags",
    hashtag: "Paper Bags",
    title: "Paper Bags Distribution",
    tagline: "Reducing plastic one bag at a time",
    description: "Distributing paper bags to the public to reduce plastic usage — aligned with the #ISayNoToPlastic campaign and SharonPly's broader commitment to sustainability.",
    href: "/corporate-social-responsibility/paper-bags", // TODO: slug mismatch — folder is /paper-bags not /paper-bags-distribution-activity
    external: false,
    color: "#65a30d",
    emoji: "🛍️",
  },
  {
    id: "environmentday",
    hashtag: "World Environment Day",
    title: "World Environment Day",
    tagline: "Reaffirming commitment every June 5th",
    description: "At SharonPly, World Environment Day is more than a date — it is a reaffirmation of our enduring commitment to environmental responsibility and sustainable practices.",
    href: "/corporate-social-responsibility/world-environment-day",
    external: false,
    color: "#15803d",
    emoji: "🌍",
  },
  {
    id: "cleanup",
    hashtag: "Clean-up Drives",
    title: "Clean-up Activities",
    tagline: "Beach, park & street clean-up drives",
    description: "SharonPly teams organise beach, park, and street clean-up drives — reinforcing environmental stewardship as a core value and inspiring communities to take ownership.",
    href: "/corporate-social-responsibility/cleanup", // TODO: slug mismatch — folder is /cleanup not /clean-up-activities
    external: false,
    color: "#0891b2",
    emoji: "🧹",
  },
  {
    id: "umbrella",
    hashtag: "Solar Umbrella",
    title: "Umbrella with Solar Light",
    tagline: "Empowering roadside vendors with solar-lit umbrellas",
    description: "SharonPly distributes solar-powered umbrellas to street vendors at Marina Beach, Chennai — providing shade by day and light by night so vendors can operate safely.",
    href: "/corporate-social-responsibility/umbrella", // TODO: slug mismatch — folder is /umbrella not /umbrella-with-solar-powered-light
    external: false,
    color: "#d97706",
    emoji: "☂️",
  },
  {
    id: "covid",
    hashtag: "Covid Relief",
    title: "Covid Relief",
    tagline: "Standing together in a time of crisis",
    description: "During the COVID-19 pandemic, SharonPly rose to the occasion with a firm commitment to public health — distributing essentials and supporting affected families.",
    href: "/corporate-social-responsibility/covid-relief", // TODO: slug mismatch — folder is /covid-relief not /covid
    external: false,
    color: "#6366f1",
    emoji: "🛡️",
  },
  {
    id: "floodrelief",
    hashtag: "Flood Relief",
    title: "Flood Relief",
    tagline: "Distributing essentials to flood-affected communities",
    description: "SharonPly's flood relief activities in Tamil Nadu — distributing essential supplies, food, and aid to communities affected by annual flooding across the state.",
    href: "/corporate-social-responsibility/flood-relief",
    external: false,
    color: "#1d4ed8",
    emoji: "🆘",
  },
  {
    id: "helmet",
    hashtag: "#HelmetSavesLives",
    title: "Free Helmet Distribution",
    tagline: "Road safety awareness in collaboration with Big FM",
    description: "In collaboration with Big FM, SharonPly distributed free helmets to two-wheeler riders — promoting safety gear usage and cultivating a safety-first mindset.",
    href: "/corporate-social-responsibility/free-helmet-distribution",
    external: false,
    color: "#b45309",
    emoji: "⛑️",
  },
];

const highlights = [
  { value: "12", label: "Active Initiatives" },
  { value: "1,000+", label: "Water Bowls Distributed" },
  { value: "10+", label: "Years of GrowTheGreen" },
  { value: "2005", label: "CSR Since" },
];

// ─── Card component ───────────────────────────────────────────────────────────
function InitiativeCard({ item }: { item: typeof initiatives[0] }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? item.color + "55" : "#e5e7eb"}`,
        boxShadow: hovered ? `0 16px 48px ${item.color}22, 0 4px 16px rgba(0,0,0,0.08)` : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: item.color, opacity: hovered ? 1 : 0.5, transition: "opacity 0.2s" }} />

      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Emoji + hashtag */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: item.color + "15",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>
            {item.emoji}
          </div>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
            textTransform: "uppercase", color: item.color,
          }}>
            {item.hashtag}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 6,
          lineHeight: 1.3,
        }}>
          {item.title}
        </h3>

        {/* Tagline */}
        <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10, lineHeight: 1.5 }}>
          {item.tagline}
        </p>

        {/* Description */}
        <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.65, flex: 1, marginBottom: 18 }}>
          {item.description}
        </p>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: 12, fontWeight: 700, color: hovered ? item.color : "#6b7280",
            transition: "color 0.2s",
          }}>
            "Learn More"
          </span>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: hovered ? item.color : "rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
            flexShrink: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke={hovered ? "#fff" : "#6b7280"} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "stroke 0.2s", marginLeft: item.external ? 0 : 1 }}>
              {item.external
                ? <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>
                : <path d="M5 12h14M12 5l7 7-7 7" />
              }
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
      {inner}
    </Link>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CsrPage() {
  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Corporate Social Responsibility" }]}
      title="Strength Beyond Business"
      subtitle="Building stronger communities through care, responsibility, and action."
      heroImage="/images/2026/csr/hero.webp"
    >
      {/* ── OUR INITIATIVES ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
            At SharonPly, responsibility goes beyond manufacturing. Through meaningful initiatives in education, environment, health, safety, and community welfare, we continue to support people, protect nature, and create lasting social impact.
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#f9fafb]" id="initiatives">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-10">
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#111", marginBottom: 12, letterSpacing: "-0.01em" }}>
              Giving Back to Society
            </h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 680 }}>
              Every initiative reflects the belief that true strength is measured not only by the products we create, but by the positive difference we make in the world around us.
            </p>
            <div style={{ width: 56, height: 3, borderRadius: 99, background: "linear-gradient(90deg, #00793A, #ffc107)", marginTop: 16 }} />
          </div>

          {/* 12-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {initiatives.map((item) => (
              <InitiativeCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GET INVOLVED CTA ── */}
      <section className="py-6" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-1">Get Involved</p>
            <h2 className="text-lg font-bold text-white">Together, We Can Make a Difference</h2>
            <p className="text-white/70 text-sm">Every tree planted, every life touched — join the SharonPly family of changemakers.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="#initiatives" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">
              Explore Our CSR Initiatives
            </Link>
            <Link href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
