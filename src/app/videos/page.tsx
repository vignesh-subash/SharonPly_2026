"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import { VideoLightbox } from "@/components/VideoLightbox";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";

/* ── Media articles (merged from media-press) ── */
const CATEGORIES_MEDIA = ["All", "#IAmStrongest", "CSR & Initiatives", "Product News", "Corporate"] as const;
type CategoryMedia = typeof CATEGORIES_MEDIA[number];

const PUBLICATIONS: Record<string, { color: string; abbr: string }> = {
  "The Hindu":             { color: "#c0392b", abbr: "TH" },
  "Times of India":        { color: "#e67e22", abbr: "TOI" },
  "Indian Express":        { color: "#2980b9", abbr: "IE" },
  "ANI News":              { color: "#8e44ad", abbr: "ANI" },
  "Dhinamalar":            { color: "#16a085", abbr: "DM" },
  "Dinamani":              { color: "#d35400", abbr: "DN" },
  "Tamil Sudar":           { color: "#27ae60", abbr: "TS" },
  "DT Next":               { color: "#2c3e50", abbr: "DTN" },
  "The Better India":      { color: "#00793A", abbr: "TBI" },
  "Andhra Jothi":          { color: "#8e44ad", abbr: "AJ" },
  "Sakshi":                { color: "#e74c3c", abbr: "SK" },
  "News Today":            { color: "#2980b9", abbr: "NT" },
  "PTI":                   { color: "#c0392b", abbr: "PTI" },
  "Ahmedabad Mirror":      { color: "#e67e22", abbr: "AM" },
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  publication: string;
  date: string;
  category: CategoryMedia;
  campaign?: string;
  featured?: boolean;
  image?: string;
  href?: string;
}

const articles: Article[] = [
  { id: 1, title: "'Olympics is Special' — Former Hockey Stars Recall Sporting Tales", excerpt: "SharonPly's 5th #IAmStrongest Awards celebrates hockey legends Vasudevan Baskaran, Muneer Sait, and Charles Cornelius who represented India at the Olympics, reflecting on their journeys and the meaning of true strength.", publication: "The Hindu", date: "19 Jul 2024", category: "#IAmStrongest", campaign: "#IAmStrongest 5th Edition", featured: true, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
  { id: 2, title: "SharonPly Hosts 5th Edition of #IAmStrongest Awards Honouring Sports Legends", excerpt: "The fifth edition of the #IAmStrongest Awards was held at the Music Academy, Chennai on July 26, 2024, recognising Olympic hockey veterans.", publication: "ANI News", date: "31 Jul 2024", category: "#IAmStrongest", campaign: "#IAmStrongest 5th Edition", featured: true, image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80" },
  { id: 3, title: "You Have Seen The Elephant Whisperers — Now Meet Chennai's Unsung Animal Activists", excerpt: "SharonPly's 4th #IAmStrongest Awards at Hotel Savera, Chennai, honoured Bomman and Bellie from the Oscar-winning documentary, alongside Chennai's unsung animal welfare champions.", publication: "The Hindu", date: "17 May 2023", category: "#IAmStrongest", campaign: "#IAmStrongest 4th Edition", featured: true, image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80" },
  { id: 4, title: "SharonPly #Yaanaichess Campaign Goes National", excerpt: "Building on the 44th International Chess Olympiad hosted in Chennai, SharonPly launched the #Yaanaichess (Rook) contest celebrating Tamil Nadu's chess heritage.", publication: "Times of India", date: "23 May 2023", category: "CSR & Initiatives", campaign: "#Yaanaichess", image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80" },
  { id: 5, title: "Award Recognises COVID-19 Warriors — 3rd #IAmStrongest Edition", excerpt: "SharonPly honoured frontline COVID warriors including Kalyanasundaram (Chennai), Chandrasekhar & Pushparani (Trichy), and Muthupandi (Thoothukudi) at the 3rd edition of the #IAmStrongest Awards.", publication: "The Hindu", date: "16 Mar 2022", category: "#IAmStrongest", campaign: "#IAmStrongest 3rd Edition", featured: true, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80" },
  { id: 6, title: "SharonPly Joins Chess Celebrations with 'Yaanai Chess'!", excerpt: "As Chennai hosted the 44th International Chess Olympiad, SharonPly launched a unique campaign celebrating the Rook piece — 'Yaanai' in Tamil — with interactive contests.", publication: "Times of India", date: "04 Aug 2022", category: "CSR & Initiatives", campaign: "#Yaanaichess", image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80" },
  { id: 7, title: "Umbrella with Solar Powered Lights for Street Vendors", excerpt: "SharonPly's innovative CSR initiative provided solar-powered umbrellas to street vendors across Tamil Nadu, enabling them to operate safely after dark.", publication: "The Hindu", date: "02 Nov 2022", category: "CSR & Initiatives", image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80" },
  { id: 8, title: "SharonPly Solar Umbrella Initiative Reaches Street Vendors", excerpt: "Following The Hindu's coverage, The Indian Express reported on SharonPly's solar umbrella programme, highlighting its impact on livelihoods across Tamil Nadu.", publication: "Indian Express", date: "31 Oct 2022", category: "CSR & Initiatives", image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80" },
  { id: 9, title: "#IAmStrongest Awards Coverage — Leading Newspapers", excerpt: "The 3rd edition of SharonPly's #IAmStrongest awards received widespread coverage from leading Tamil and Telugu publications.", publication: "Tamil Sudar", date: "18 Aug 2022", category: "#IAmStrongest", campaign: "#IAmStrongest 3rd Edition", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
  { id: 10, title: "Celebrating Heroes of Humanity Who Rose Above Odds", excerpt: "The Better India profiled SharonPly's #IAmStrongest movement — a platform that goes beyond product marketing to genuinely recognise extraordinary Indians.", publication: "The Better India", date: "18 Aug 2022", category: "#IAmStrongest", campaign: "#IAmStrongest 3rd Edition", href: "https://www.thebetterindia.com", image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80" },
  { id: 11, title: "Sharon Ply: Excellence in Plywood Manufacturing", excerpt: "The Hindu MetroPlus featured SharonPly's manufacturing excellence and innovation in plywood technology, highlighting the Gummidipoondi facility.", publication: "The Hindu", date: "29 Jun 2018", category: "Corporate", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 12, title: "SharonPly — Building Trust with Quality", excerpt: "Dhinamalar's special feature on SharonPly's journey from a Chennai-based manufacturer to South India's most trusted plywood brand.", publication: "Dhinamalar", date: "26 Feb 2019", category: "Corporate", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80" },
  { id: 13, title: "#QuenchTheThirst — Water Bowls for Stray Animals", excerpt: "SharonPly's summer initiative to distribute thousands of cement water bowls for stray animals across Chennai and Coimbatore.", publication: "PTI", date: "12 Apr 2023", category: "CSR & Initiatives", campaign: "#QuenchTheThirst", image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80" },
];

const CAMPAIGN_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  "#IAmStrongest 5th Edition": { bg: "#fffbeb", text: "#92400e", accent: "#f59e0b" },
  "#IAmStrongest 4th Edition": { bg: "#fef3c7", text: "#b45309", accent: "#fbbf24" },
  "#IAmStrongest 3rd Edition": { bg: "#fff7ed", text: "#c2410c", accent: "#fb923c" },
  "#Yaanaichess":              { bg: "#eff6ff", text: "#1d4ed8", accent: "#3b82f6" },
  "#QuenchTheThirst":          { bg: "#ecfdf5", text: "#065f46", accent: "#10b981" },
};

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  "#IAmStrongest":   { bg: "#fef3c7", text: "#92400e" },
  "CSR & Initiatives":{ bg: "#e8f5ee", text: "#00793A" },
  "Product News":    { bg: "#eff6ff", text: "#1d4ed8" },
  "Corporate":       { bg: "#f5f3ff", text: "#6d28d9" },
  "All":             { bg: "#f3f4f6", text: "#374151" },
};

const campaigns = [
  { name: "#IAmStrongest", year: "2019 – Present", editions: 5, desc: "Annual awards recognising extraordinary Indians — COVID warriors, animal welfare champions, Olympic legends — who embody true strength.", color: "#f59e0b", icon: "https://img.icons8.com/fluency/48/trophy.png" },
  { name: "#Yaanaichess", year: "2022", editions: 1, desc: "Celebrating Chennai's hosting of the 44th International Chess Olympiad through community contests and the iconic 'Rook' chess piece in Tamil culture.", color: "#3b82f6", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%233b82f6'/%3E%3Cpath fill='%23fff' d='M24 10c-1.5 0-2.5 1.2-2.5 2.5 0 .8.4 1.5 1 2-2.2.8-3.5 2.8-3.5 5.2v1.3h11V19.7c0-2.4-1.3-4.4-3.5-5.2.6-.5 1-1.2 1-2C26.5 11.2 25.5 10 24 10zm-6.5 12v2.5h13V22h-13zm0 4.5v9.5c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V26.5h-13z'/%3E%3C/svg%3E" },
  { name: "#QuenchTheThirst", year: "2023", editions: 1, desc: "Distributing thousands of cement water bowls for stray animals across Chennai and Coimbatore during summer — compassion in action.", color: "#10b981", icon: "https://img.icons8.com/fluency/48/water.png" },
  { name: "Solar Umbrella Initiative", year: "2022", editions: 1, desc: "Providing solar-powered umbrellas to street vendors across Tamil Nadu, enabling safe evening operations and reducing electricity dependence.", color: "#8b5cf6", icon: "https://img.icons8.com/fluency/48/umbrella.png" },
];

/* ── Videos from @sharonplyindia (IDs & titles verified against channel) ── */
const videos = [
  // 2025
  { id: "9JjY31BWDwY", title: "#IAmStrongest Awards 2025 | Key Highlights",                    description: "Highlights from SharonPly's 6th edition of #IAmStrongest Awards 2025 — celebrating strength, service, and extraordinary Indians.",         category: "Brand Campaign",  year: 2025, featured: true  },
  { id: "4akuJEOnhCE", title: "#IAmStrongest Awards 2025 | Glimpse of 6th Edition",            description: "A glimpse into the 6th edition of SharonPly's #IAmStrongest Awards 2025.",                                                                 category: "Brand Campaign",  year: 2025, featured: false },
  { id: "wzHd80ki54M", title: "#IAmStrongest Awards 2025 | Media Voices of Strength",          description: "Media voices on SharonPly's #IAmStrongest Awards 2025 — strength recognised across platforms.",                                              category: "Brand Campaign",  year: 2025, featured: false },
  { id: "qjcSCGUaABI", title: "#IAmStrongest 2025 Awardee | Maj. Gen. Rajiv Narayanan",        description: "#KnowtheAwardee — Maj. Gen. Rajiv Narayanan honoured at SharonPly's #IAmStrongest Awards 2025.",                                          category: "Brand Campaign",  year: 2025, featured: false },
  { id: "sx9jFKO245k", title: "#IAmStrongest 2025 Awardee | Lt. Gen. Dushyant Singh",           description: "#KnowtheAwardee — Lt. Gen. Dushyant Singh honoured at SharonPly's #IAmStrongest Awards 2025.",                                           category: "Brand Campaign",  year: 2025, featured: false },
  { id: "7REqAKSzg_0", title: "Choolai Traffic Roundabout | #SharonPlyCares",                    description: "SharonPly's CSR initiative — Choolai traffic roundabout and traffic islands beautification.",                                             category: "Brand Campaign",  year: 2025, featured: false },
  { id: "TfJdHSIiVBE", title: "#QuenchTheThirst 4.0 | 2025",                                   description: "SharonPly's #QuenchTheThirst 4.0 — distributing water bowls for stray animals across Tamil Nadu.",                                        category: "Brand Campaign",  year: 2025, featured: false },
  // 2024
  { id: "kWX_mYUs7TM", title: "#IAmStrongest Awards | 5th Edition Highlights",                 description: "Highlights from the 5th edition of #IAmStrongest Awards — honouring Olympic hockey legends and extraordinary Indians.",                     category: "Brand Campaign",  year: 2024, featured: false },
  { id: "35P4yWV2NM0", title: "Vasudevan Baskaran | 5th Edition #IAmStrongest Awardee",        description: "Olympic gold-winning hockey captain Vasudevan Baskaran honoured at the 5th edition of #IAmStrongest Awards.",                               category: "Brand Campaign",  year: 2024, featured: false },
  { id: "aXTYEfSRDXU", title: "Charles Cornelius | 5th Edition #IAmStrongest Awardee",         description: "Olympic silver medallist Charles Cornelius honoured at the 5th edition of #IAmStrongest Awards.",                                           category: "Brand Campaign",  year: 2024, featured: false },
  { id: "j_BrCURaqZ4", title: "Sharon Secure App | Tutorial Video",                              description: "Step-by-step guide to verifying the authenticity of your SharonPly product using the Sharon Secure App.",                                   category: "Tutorial",        year: 2024, featured: false },
  // 2023
  { id: "DtRSqfvKcPE", title: "What is #FIRESAVE Technology? | SharonGOLD",                    description: "An introduction to SharonPly's FIRESAVE fire-retardant technology on SharonGOLD plywood.",                                                   category: "Technology",      year: 2023, featured: false },
  { id: "MMbD9bynFe4", title: "FIRESAVE | Technical Explanation (English)",                    description: "SharonPly FireSave — the best fire retardant plywood. Technical explanation in English.",                                                   category: "Technology",      year: 2023, featured: false },
  { id: "w8SqPKKwQmM", title: "VIRASAFE | TVC 60 Sec (English)",                               description: "SharonPly's VIRASAFE technology TVC — 60-second English version.",                                                                         category: "Technology",      year: 2023, featured: false },
  { id: "h0lvuUcwA3A", title: "THE FIRE | FIREPROOF PLYWOOD",                                  description: "SharonPly's fireproof plywood — THE FIRE campaign showcasing fire resistance technology.",                                                  category: "Product TVC",     year: 2023, featured: false },
  { id: "XB77aM5R070", title: "THE SMELL | E0 PLYWOOD",                                        description: "SharonPly's E-Zero formaldehyde campaign — THE SMELL series.",                                                                              category: "Product TVC",     year: 2023, featured: false },
  { id: "vXw8n5Js0AQ", title: "#QuenchTheThirst — Journey of 2023",                            description: "The journey of SharonPly's #QuenchTheThirst water bowl distribution for stray animals in 2023.",                                            category: "Brand Campaign",  year: 2023, featured: false },
  { id: "u43tf0wL36g", title: "#IAmStrongest Awardee | Mr. Booman & Mrs. Bellie",              description: "Honouring Bomman and Bellie from the Oscar-winning documentary 'The Elephant Whisperers' at #IAmStrongest Awards.",                         category: "Brand Campaign",  year: 2023, featured: false },
  // 2022
  { id: "sQ0bYcDRJjw", title: "Sovereign710 — Affordable Waterproof Ply",                      description: "Sovereign710 BWP plywood — affordable waterproof ply built for every home.",                                                                category: "Product TVC",     year: 2022, featured: false },
  { id: "P7ExjHBLx1Q", title: "Sharon Sovereign — TVC 30 Sec (Tamizh)",                        description: "Sharon Sovereign plywood TVC — 30-second Tamil version.",                                                                                   category: "Product TVC",     year: 2022, featured: false },
  { id: "JxnfZB6PeFY", title: "Cricket TNPL — TVC 60 Sec (English)",                           description: "Sharon Plywoods Cricket TNPL — TVC 60 sec, English.",                                                                                      category: "Product TVC",     year: 2022, featured: false },
  { id: "P7SdEvvIp4I", title: "Cricket Strength — TVC 60 Sec (English)",                       description: "Sharon Plywoods Cricket Strength — TVC 60 sec, English.",                                                                                  category: "Product TVC",     year: 2022, featured: false },
  { id: "1RW0RMF80JQ", title: "#IAmStrongest Awards | 4th Edition Highlights",                 description: "Highlights from the 4th edition of #IAmStrongest Awards — celebrating real heroes who embody true strength.",                               category: "Brand Campaign",  year: 2022, featured: false },
  { id: "cF5qMb5JJwY", title: "SharonPlywoods — The Truck",                                    description: "SharonPlywoods brand film — The Truck.",                                                                                                    category: "Product TVC",     year: 2022, featured: false },
  { id: "PFMiuC5tbhw", title: "SharonPlywoods — The Mahoot",                                   description: "A compelling SharonPly brand film featuring 'The Mahoot'.",                                                                                 category: "Corporate",       year: 2022, featured: false },
  { id: "rvO0f6Tvi2k", title: "35 Years Celebration | #IAmStrongest Journey",                  description: "SharonPly's 35 years celebration — the #IAmStrongest journey and a look inside the factory.",                                               category: "Corporate",       year: 2022, featured: false },
  // 2021 & earlier
  { id: "E2Oj_8t-Tvk", title: "#IAmStrongest Awards | 3rd Edition",                            description: "Highlights from the 3rd edition of #IAmStrongest Awards — honouring COVID-19 frontline warriors.",                                          category: "Brand Campaign",  year: 2021, featured: false },
  { id: "h26QbQywZbY", title: "Sharon Secure App — TVC 60 Sec (Tamizh)",                       description: "Sharon Secure App TVC — 60-second Tamil version for product authentication.",                                                               category: "Tutorial",        year: 2021, featured: false },
  { id: "O0IJC8DC5SQ", title: "Making In India Since 1987",                                    description: "SharonPlywoods — the story of Making In India Since 1987. Our journey, values, and manufacturing excellence.",                              category: "Corporate",       year: 2021, featured: false },
  { id: "XkyvoMZhnow", title: "A Glimpse of SharonPly",                                        description: "A glimpse into SharonPly — a trusted plywood manufacturer since 1987.",                                                                     category: "Corporate",       year: 2020, featured: false },
  { id: "hUo2gt9qrnY", title: "#IAmStrongest Awards | 1st Edition",                            description: "The inaugural edition of SharonPly's #IAmStrongest Awards — where the movement began.",                                                     category: "Brand Campaign",  year: 2019, featured: false },
];

const CATEGORIES = ["All", "Product TVC", "Brand Campaign", "Technology", "Tutorial", "Corporate"];

const CAT_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  "All":            { color: "#00793A", bg: "#e8f5ee",  border: "#00793A" },
  "Product TVC":    { color: "#00793A", bg: "#e8f5ee",  border: "#00793A" },
  "Brand Campaign": { color: "#92400e", bg: "#fff8e1",  border: "#ffc107" },
  "Technology":     { color: "#1d4ed8", bg: "#eff6ff",  border: "#3b82f6" },
  "Tutorial":       { color: "#7e22ce", bg: "#fdf4ff",  border: "#a855f7" },
  "Corporate":      { color: "#be123c", bg: "#fff1f2",  border: "#f43f5e" },
};

/* ── Video Card ── */
function VideoCard({ v, onClick }: { v: typeof videos[0]; onClick: () => void }) {
  const cs = CAT_STYLE[v.category] ?? CAT_STYLE.All;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid #f0f0f0", transition: "box-shadow 0.25s, transform 0.25s", boxShadow: hovered ? "0 12px 32px rgba(0,121,58,0.13)" : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-3px)" : "translateY(0)" }}
    >
      {/* Thumbnail */}
      <div className="slot-media" style={{ position: "relative", overflow: "hidden", background: "#111" }}>
        <YouTubeThumbnail
          id={v.id}
          alt={v.title}
          style={{ transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)", opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s" }} />
        {/* Play button */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: hovered ? "#00793A" : "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", transition: "background 0.25s, transform 0.25s", transform: hovered ? "scale(1.12)" : "scale(1)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={hovered ? "#fff" : "#00793A"} style={{ marginLeft: 2, transition: "fill 0.2s" }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
        {/* Year badge */}
        <div style={{ position: "absolute", bottom: 8, right: 8, padding: "2px 7px", borderRadius: 4, background: "rgba(0,0,0,0.72)", color: "#fff", fontSize: 10, fontWeight: 700 }}>{v.year}</div>
      </div>
      {/* Info */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 }}>{v.title}</p>
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: cs.bg, color: cs.color, fontWeight: 700, alignSelf: "flex-start" }}>{v.category}</span>
      </div>
    </div>
  );
}

/* ── Featured Card (large) ── */
function FeaturedCard({ v, onClick }: { v: typeof videos[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="slot-media cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: hovered ? "0 20px 48px rgba(0,121,58,0.2)" : "0 6px 24px rgba(0,0,0,0.12)", transition: "box-shadow 0.3s, transform 0.3s", transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
    >
      <YouTubeThumbnail
        id={v.id}
        alt={v.title}
        loading="eager"
        style={{ transition: "transform 0.5s", transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,30,12,0.92) 0%, rgba(0,30,12,0.3) 55%, transparent 100%)" }} />
      {/* Category chip */}
      <div style={{ position: "absolute", top: 14, left: 14 }}>
        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: "#ffc107", color: "#020202", fontWeight: 800, letterSpacing: "0.06em" }}>{v.category.toUpperCase()}</span>
      </div>
      {/* Play */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: hovered ? "#00793A" : "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(0,0,0,0.35)", transition: "background 0.25s, transform 0.25s", transform: hovered ? "scale(1.15)" : "scale(1)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={hovered ? "#fff" : "#00793A"} style={{ marginLeft: 3, transition: "fill 0.2s" }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 18px" }}>
        <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(14px,2vw,18px)", lineHeight: 1.3, margin: "0 0 6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.title}</p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.description}</p>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playing, setPlaying] = useState<typeof videos[0] | null>(null);
  const closeVideo = useCallback(() => setPlaying(null), []);

  const featured = videos.filter(v => v.featured).slice(0, 3);
  const filtered = activeCategory === "All" ? videos : videos.filter(v => v.category === activeCategory);
  const nonFeatured = activeCategory === "All" ? videos.filter(v => !v.featured) : filtered;

  return (
    <>
    <InnerPageLayout
      breadcrumbs={[{ label: "Videos & Media" }]}
      title="Videos & Media"
      subtitle="Watch SharonPly in action — TVCs, technology demos, brand stories, press coverage & more"
      heroImage="/images/2026/pages/media-hero.webp"
    >

      {/* ── Category Filter ── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-24 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="shrink-0 px-4 py-2.5 min-h-[44px] text-[12.5px] font-semibold rounded-full transition-all"
                  style={{ background: active ? "#00793A" : "transparent", color: active ? "#fff" : "#555", border: active ? "none" : "1px solid #e5e7eb" }}>
                  {cat}
                </button>
              );
            })}
            <a href="https://www.youtube.com/@sharonplyindia" target="_blank" rel="noopener noreferrer"
              className="shrink-0 ml-auto flex items-center gap-1.5 px-4 py-2.5 min-h-11 rounded-full text-[11px] font-bold text-white"
              style={{ background: "#ff0000" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Subscribe
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#f9fafb] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-14">

          {/* ── Featured (All view only) ── */}
          {activeCategory === "All" && featured.length > 0 && (
            <div>
              <FeaturedCard v={featured[0]} onClick={() => setPlaying(featured[0])} />
            </div>
          )}

          {/* ── All Videos Grid ── */}
          <div>
            {activeCategory === "All" && (
              <div className="mb-6">
                <span className="text-[11px] font-semibold text-gray-400">{videos.length} videos</span>
              </div>
            )}
            {activeCategory !== "All" && (
              <div className="mb-6">
                <span className="text-[11px] font-semibold text-gray-400">{filtered.length} videos</span>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {(activeCategory === "All" ? nonFeatured : filtered).map(v => (
                <VideoCard key={v.id} v={v} onClick={() => setPlaying(v)} />
              ))}
            </div>
          </div>

          {/* ── Channel CTA ── */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#00793A 0%,#005a2b 55%,#003d1e 100%)" }}>
            <div className="px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-white mb-1.5">@sharonplyindia</h3>
                <p className="text-white/60 text-sm">Latest TVCs, technology demos &amp; #IAmStrongest campaigns</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href="https://www.youtube.com/@sharonplyindia" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#ff0000" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  Visit Channel
                </a>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border-2 border-white/25 hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
         MEDIA & PRESS SECTION (merged from media-press)
      ══════════════════════════════════════════════ */}

      {/* ── Campaigns strip ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#020202]">Our Campaigns</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaigns.map(c => (
              <div key={c.name} className="rounded-2xl p-5 border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: `${c.color}30`, background: `${c.color}08` }}>
                <img src={c.icon} alt={c.name} className="w-8 h-8 mb-3" />
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[14px] font-black" style={{ color: c.color }}>{c.name}</h3>
                  <span className="ml-auto text-[10px] font-semibold text-gray-400">{c.year}</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed">{c.desc}</p>
                {c.editions > 1 && (
                  <div className="mt-3 inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${c.color}20`, color: c.color }}>
                    {c.editions} Editions
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured coverage ── */}
      <section className="py-14 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#020202]">Featured Coverage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {articles.filter(a => a.featured).map(article => (
              <div key={article.id} className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                style={{ border: "1px solid #e5e7eb", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="slot-media relative overflow-hidden flex-shrink-0">
                  {article.image && (
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: (CAT_COLORS[article.category] ?? CAT_COLORS.All).bg, color: (CAT_COLORS[article.category] ?? CAT_COLORS.All).text }}>
                      {article.category}
                    </span>
                    {article.campaign && (
                      <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: (CAMPAIGN_COLORS[article.campaign] ?? { bg: "#f3f4f6", text: "#374151" }).bg, color: (CAMPAIGN_COLORS[article.campaign] ?? { bg: "#f3f4f6", text: "#374151" }).text }}>
                        {article.campaign}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] text-white/80 font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">{article.date}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ color: (PUBLICATIONS[article.publication] ?? { color: "#6b7280" }).color }}>
                    <span className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-black flex-shrink-0" style={{ background: (PUBLICATIONS[article.publication] ?? { color: "#6b7280" }).color }}>
                      {(PUBLICATIONS[article.publication] ?? { abbr: article.publication.slice(0,2).toUpperCase() }).abbr.slice(0, 2)}
                    </span>
                    {article.publication}
                  </span>
                  <h3 className="text-[15px] font-bold text-[#020202] leading-snug mt-2 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-3 flex-1">{article.excerpt}</p>
                  {article.href && (
                    <a href={article.href} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#00793A] hover:underline">
                      Read Article
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All articles ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#020202]">All Press Coverage</h2>
          </div>
          <div className="flex flex-col gap-3">
            {articles.filter(a => !a.featured).map(article => {
              const cc = CAT_COLORS[article.category] ?? CAT_COLORS.All;
              const p = PUBLICATIONS[article.publication] ?? { color: "#6b7280", abbr: article.publication.slice(0,3).toUpperCase() };
              return (
                <div key={article.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex gap-0"
                  style={{ border: "1px solid #e5e7eb" }}>
                  <div className="w-1 flex-shrink-0 rounded-l-xl" style={{ background: cc.text }} />
                  {article.image && (
                    <div className="slot-doc w-24 sm:w-28 flex-shrink-0 self-center overflow-hidden">
                      <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ color: p.color }}>
                          <span className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-black flex-shrink-0" style={{ background: p.color }}>
                            {p.abbr.slice(0, 2)}
                          </span>
                          {article.publication}
                        </span>
                        <span className="text-[10px] text-gray-400 flex-shrink-0">{article.date}</span>
                      </div>
                      <h3 className="text-[12.5px] font-bold text-[#020202] leading-snug line-clamp-2">{article.title}</h3>
                      <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed line-clamp-2 hidden sm:block">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: cc.bg, color: cc.text }}>{article.category}</span>
                      {article.href && (
                        <a href={article.href} target="_blank" rel="noopener noreferrer"
                          className="inline-cta-link ml-auto text-[11px] font-semibold text-[#00793A] hover:underline flex items-center gap-0.5">
                          Read <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Publications strip ── */}
      <section className="py-12 bg-[#f9fafb] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(PUBLICATIONS).map(([name, p]) => (
              <div key={name} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <span className="w-6 h-6 rounded text-white text-[9px] font-black flex items-center justify-center flex-shrink-0" style={{ background: p.color }}>
                  {p.abbr.slice(0, 2)}
                </span>
                <span className="text-[12px] font-semibold text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press enquiry CTA ── */}
      <section className="py-6" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Media Enquiries</h2>
            <p className="text-white/70 text-sm">Press kits, images, interview requests — get in touch with our communications team.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="mailto:admin@sharonply.com" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">
              Email Media Team
            </a>
            <a href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </InnerPageLayout>

    {playing && (
      <VideoLightbox
        videoId={playing.id}
        title={playing.title}
        onClose={closeVideo}
      />
    )}
    </>
  );
}
