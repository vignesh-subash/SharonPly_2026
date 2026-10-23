"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import Link from "next/link";
import Image from "next/image";
import InnerPageLayout from "@/components/InnerPageLayout";
import {
  BlogPost,
  getPostUrl,
  getExcerpt,
  getMonthName,
  getReadTime,
  rewriteInternalLinks,
  blogPosts,
  getAllPosts,
} from "@/data/blogPosts";

// ─── helpers ──────────────────────────────────────────────────────────────────
function getEngagement(post: BlogPost) {
  const seed = post.slug.length + post.year.length;
  return { views: 420 + (seed * 137) % 3800, comments: 2 + (seed * 31) % 48 };
}

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#e8f5e9,#a5d6a7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "3rem", opacity: 0.4 }}>🪵</span>
      </div>
    );
  }
  if (fill) {
    return <Image src={src} alt={alt} fill sizes="(max-width:768px) 100vw, 1200px" className={className} style={{ objectFit: "cover", objectPosition: "left center" }} onError={() => setErr(true)} priority={priority} />;
  }
  return <Image src={src} alt={alt} width={width || 80} height={height || 80} className={className} style={{ objectFit: "cover", objectPosition: "left center" }} onError={() => setErr(true)} loading="lazy" />;
}

// ─── Table of Contents parser ─────────────────────────────────────────────────
interface TocItem { id: string; text: string; level: number; }
function parseToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1]);
    const text = m[2].replace(/<[^>]*>/g, "").trim();
    if (text) {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      items.push({ id, text, level });
    }
  }
  return items;
}

// Inject IDs into headings so TOC links work
function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_m, level, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (attrs.includes("id=")) return `<h${level}${attrs}>${inner}</h${level}>`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

// ─── CATEGORY META ────────────────────────────────────────────────────────────
const CAT_META: Record<string, { icon: string; color: string; bg: string }> = {
  "Know about Plywood": { icon: "🏗️", color: "#2563eb", bg: "#eff6ff" },
  "Interior Design":    { icon: "✨", color: "#00793A", bg: "#f0fdf4" },
  "Other":              { icon: "🗂️", color: "#6b7280", bg: "#f9fafb" },
};
function getCat(cat: string) { return CAT_META[cat] || CAT_META["Other"]; }

const LATEST_POSTS = getAllPosts().slice(0, 5);

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  post: BlogPost;
  related: BlogPost[];
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  allPosts: BlogPost[];
}

export default function BlogPostTemplate({ post, related, prevPost, nextPost }: Props) {
  const hydrated = useHydrated();
  const [readProgress, setReadProgress] = useState(0);
  const [activeToc, setActiveToc] = useState("");
  const [showShareToast, setShowShareToast] = useState(false);
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const eng = getEngagement(post);

  const processedHTML = injectHeadingIds(rewriteInternalLinks(post.contentHTML, blogPosts));
  const tocItems = parseToc(post.contentHTML);
  const hasToc = tocItems.length >= 3;

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const start = rect.top + window.scrollY - window.innerHeight * 0.2;
      const p = Math.min(100, Math.max(0, ((window.scrollY - start) / (rect.height)) * 100));
      setReadProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // TOC scroll spy
  useEffect(() => {
    if (!hasToc) return;
    const ids = tocItems.map((t) => t.id);
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveToc(ids[i]); return; }
      }
      setActiveToc(ids[0] || "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasToc, tocItems]);

  const copyLink = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2200);
    }
  }, []);

  const catMeta = getCat(post.category);
  const breadcrumbTitle = post.title.length > 40 ? `${post.title.slice(0, 40)}…` : post.title;

  return (
    <div style={{ fontFamily: "var(--font-sans)", background: "#fafaf8", minHeight: "100vh" }}>

      {/* ── READING PROGRESS ─────────────────────────────────────────────────── */}
      {hydrated && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 3, background: "transparent" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#00793A,#ffc107)", width: `${readProgress}%`, transition: "width 0.1s linear" }} />
        </div>
      )}

      <InnerPageLayout
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.category, href: "/blog" },
          { label: breadcrumbTitle },
        ]}
        title={post.title}
        heroImage={post.image}
        heroImagePosition="left center"
        heroContentAlign="right"
      >
      {/* ── ARTICLE META ── */}
      <div className="page-container pt-8 pb-2">
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.9rem", flexWrap: "wrap" }}>
          <span style={{ background: "#00793A", color: "#fff", borderRadius: 100, padding: "0.3rem 0.9rem", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {catMeta.icon} {post.category}
          </span>
          <span style={{ background: "#f3f4f6", color: "#374151", borderRadius: 100, padding: "0.28rem 0.85rem", fontSize: "0.72rem", fontWeight: 600 }}>
            📅 {getMonthName(post.month)} {post.year}
          </span>
          <span style={{ background: "#f3f4f6", color: "#374151", borderRadius: 100, padding: "0.28rem 0.85rem", fontSize: "0.72rem", fontWeight: 600 }}>
            ⏱ {getReadTime(post.contentHTML)} read
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00793A,#004825)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 800, color: "#fff", border: "2px solid rgba(0,121,58,0.2)" }}>
              {post.author[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>{post.author}</div>
              <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>Sharon Ply Editorial</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            {[
              { label: "Twitter", action: () => typeof window !== "undefined" && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, "_blank") },
              { label: "LinkedIn", action: () => typeof window !== "undefined" && window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank") },
              { label: "WhatsApp", action: () => typeof window !== "undefined" && window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank") },
            ].map((s) => (
              <button key={s.label} onClick={s.action} title={`Share on ${s.label}`}
                className="touch-target-mobile"
                style={{ width: 44, height: 44, borderRadius: "50%", background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700 }}>
                {s.label[0]}
              </button>
            ))}
            <button onClick={copyLink} title="Copy link"
              className="touch-target-mobile"
              style={{ width: 44, height: 44, borderRadius: "50%", background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700 }}>
              🔗
            </button>
            {showShareToast && (
              <span style={{ background: "#00793A", color: "#fff", borderRadius: 100, padding: "0.25rem 0.75rem", fontSize: "0.72rem", fontWeight: 700 }}>Copied!</span>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ─────────────────────────────────────────────────────────── */}
      <div className="page-container py-10 sm:py-12 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">

        {/* ── ARTICLE COLUMN ───────────────────────────────────────────────── */}
        <div style={{ minWidth: 0 }}>

          {/* Engagement bar */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", background: "#fff", borderRadius: 12, padding: "0.85rem 1.25rem", marginBottom: "2rem", border: "1.5px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "1.25rem", flex: 1 }}>
              {[
                { icon: "👁", val: eng.views.toLocaleString('en-IN'), label: "views" },
                { icon: "💬", val: eng.comments.toString(), label: "comments" },
                { icon: "⏱", val: getReadTime(post.contentHTML), label: "" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "#6b7280" }}>
                  <span>{e.icon}</span>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{e.val}</span>
                  {e.label && <span>{e.label}</span>}
                </div>
              ))}
            </div>
            {/* Share buttons */}
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af", marginRight: "0.25rem" }}>Share:</span>
              {[
                { label: "Facebook", color: "#1877f2", action: () => typeof window !== "undefined" && window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank") },
                { label: "Twitter", color: "#1d9bf0", action: () => typeof window !== "undefined" && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, "_blank") },
                { label: "LinkedIn", color: "#0a66c2", action: () => typeof window !== "undefined" && window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank") },
                { label: "WhatsApp", color: "#25d366", action: () => typeof window !== "undefined" && window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank") },
              ].map((s) => (
                <button key={s.label} onClick={s.action} title={`Share on ${s.label}`}
                  style={{ width: 30, height: 30, borderRadius: 8, background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color, cursor: "pointer", fontSize: "0.68rem", fontWeight: 800, transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = s.color; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${s.color}15`; (e.currentTarget as HTMLButtonElement).style.color = s.color; }}>
                  {s.label[0]}
                </button>
              ))}
              <button onClick={copyLink} title="Copy link"
                style={{ width: 30, height: 30, borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", cursor: "pointer", fontSize: "0.75rem" }}>
                🔗
              </button>
            </div>
          </div>

          {/* Mobile TOC */}
          {hasToc && (
            <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, marginBottom: "2rem", overflow: "hidden" }}>
              <button onClick={() => setTocOpen((o) => !o)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.25rem", background: "none", border: "none", cursor: "pointer", fontWeight: 700, color: "#052e16", fontSize: "0.9rem" }}>
                <span>📋 Table of Contents</span>
                <span style={{ transform: tocOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {tocOpen && (
                <div style={{ padding: "0 1.25rem 1rem", borderTop: "1px solid #86efac" }}>
                  {tocItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      style={{ display: "block", padding: "0.4rem 0", paddingLeft: item.level === 3 ? "1.5rem" : 0, color: activeToc === item.id ? "#00793A" : "#374151", fontSize: item.level === 3 ? "0.82rem" : "0.88rem", fontWeight: item.level === 2 ? 600 : 400, textDecoration: "none", borderLeft: item.level === 3 ? "2px solid #86efac" : "none" }}>
                      {item.level === 2 ? "▸ " : "  · "}{item.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sticky share sidebar (left, floating) — xl+ only */}
          <div style={{ position: "relative" }}>
            <div className="hidden xl:block" style={{ position: "absolute", left: "-80px", top: 0 }}>
              <div style={{ position: "sticky", top: 120, display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                {[
                  { label: "Facebook", color: "#1877f2", bg: "#e8f0fe", action: () => typeof window !== "undefined" && window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank"), icon: "f" },
                  { label: "Twitter", color: "#1d9bf0", bg: "#e8f4fd", action: () => typeof window !== "undefined" && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, "_blank"), icon: "𝕏" },
                  { label: "LinkedIn", color: "#0a66c2", bg: "#e7f0f9", action: () => typeof window !== "undefined" && window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank"), icon: "in" },
                  { label: "WhatsApp", color: "#25d366", bg: "#e8f9ee", action: () => typeof window !== "undefined" && window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank"), icon: "W" },
                  { label: "Copy Link", color: "#6b7280", bg: "#f3f4f6", action: copyLink, icon: "🔗" },
                ].map((s) => (
                  <button key={s.label} onClick={s.action} title={s.label}
                    style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, border: `1.5px solid ${s.color}30`, color: s.color, cursor: "pointer", fontSize: "0.8rem", fontWeight: 800, transition: "all 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = s.color; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = s.bg; (e.currentTarget as HTMLButtonElement).style.color = s.color; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* ARTICLE BODY */}
            <article ref={articleRef} style={{ maxWidth: 760 }}>
              <div
                dangerouslySetInnerHTML={{ __html: processedHTML }}
                style={{
                  fontSize: "1.05rem", lineHeight: 1.85, color: "#374151",
                }}
                className="sharon-article-body"
              />
            </article>
          </div>

          {/* ── TAGS ─────────────────────────────────────────────────────────── */}
          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1.5px solid #e5e7eb" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "#9ca3af", fontWeight: 600 }}>Tags:</span>
              {["Plywood", "Sharon Ply", "Interior", post.category, "Tips"].map((tag) => (
                <Link key={tag} href={`/blog?q=${encodeURIComponent(tag)}`}
                  style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", borderRadius: 100, padding: "0.3rem 0.85rem", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#00793A"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00793A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#f3f4f6"; (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e5e7eb"; }}>
                  #{tag}
                </Link>
              ))}
              <span style={{ background: catMeta.bg, color: catMeta.color, border: `1px solid ${catMeta.color}30`, borderRadius: 100, padding: "0.3rem 0.85rem", fontSize: "0.78rem", fontWeight: 700 }}>
                {catMeta.icon} {post.category}
              </span>
            </div>
          </div>

          {/* ── AUTHOR BIO ────────────────────────────────────────────────────── */}
          <div style={{ marginTop: "2.5rem", background: "linear-gradient(135deg,#f0fdf4,#ecfdf5)", border: "1.5px solid #86efac", borderRadius: 20, padding: "2rem" }}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#00793A,#004825)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: 900, color: "#fff", flexShrink: 0, boxShadow: "0 4px 16px rgba(0,121,58,0.3)" }}>
                {post.author[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: "#052e16", fontSize: "1.05rem", marginBottom: "0.2rem" }}>{post.author}</div>
                <div style={{ color: "#276749", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.6rem" }}>Senior Editor, Sharon Ply Knowledge Hub</div>
                <p style={{ color: "#374151", fontSize: "0.88rem", lineHeight: 1.7, margin: "0 0 1rem" }}>
                  A seasoned writer covering plywood technology, interior design trends and sustainable construction for over 8 years. Passionate about making complex technical topics accessible and actionable for builders, designers and homeowners.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <Link href="/blog" className="inline-cta-link" style={{ background: "#00793A", color: "#fff", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
                    View All Articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── IN-ARTICLE CTA ────────────────────────────────────────────────── */}
          <div style={{ marginTop: "2.5rem", background: "linear-gradient(135deg,#052e16,#064e3b)", borderRadius: 20, padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#86efac", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>EXPLORE SHARON PLY</div>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", margin: "0 0 0.5rem" }}>Discover Our Premium Plywood</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>From BWP Grade to E0 certified — find the right panel for every application.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/plywood" style={{ background: "#ffc107", color: "#1a1a1a", padding: "0.7rem 1.5rem", borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                Explore Products
              </Link>
              <Link href="/contact" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "0.7rem 1.5rem", borderRadius: 100, fontWeight: 600, textDecoration: "none", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                Find a Dealer
              </Link>
            </div>
          </div>

          {/* ── RELATED ARTICLES ──────────────────────────────────────────────── */}
          {related.length > 0 && (
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1.5px solid #e5e7eb" }}>
              <h2 style={{ fontWeight: 800, color: "#111827", fontSize: "1.3rem", margin: "0 0 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ background: "#00793A", color: "#fff", width: 32, height: 32, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📚</span>
                You May Also Like
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
                {related.map((rp) => (
                  <Link key={rp.slug} href={getPostUrl(rp)} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1.5px solid #e5e7eb", transition: "transform 0.2s,box-shadow 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                      <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden", background: "#f3f4f6" }}>
                        <div style={{ position: "absolute", inset: 0 }}>
                          <SafeImage src={rp.image} alt={rp.title} fill />
                        </div>
                      </div>
                      <div style={{ padding: "0.9rem" }}>
                        <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginBottom: "0.35rem" }}>{getMonthName(rp.month)} {rp.year} · {rp.category}</div>
                        <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "0.88rem", lineHeight: 1.4, margin: "0 0 0.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{rp.title}</h3>
                        <span style={{ fontSize: "0.78rem", color: "#00793A", fontWeight: 700 }}>Read More →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}


          {/* ── PREV / NEXT NAV ───────────────────────────────────────────────── */}
          {(prevPost || nextPost) && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link href={getPostUrl(prevPost)} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "1.25rem", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#00793A"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,121,58,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                    <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600, marginBottom: "0.4rem" }}>← Previous Article</div>
                    <h4 style={{ fontWeight: 700, color: "#111827", fontSize: "0.88rem", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{prevPost.title}</h4>
                  </div>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={getPostUrl(nextPost)} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "1.25rem", textAlign: "right", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#00793A"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,121,58,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
                    <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600, marginBottom: "0.4rem" }}>Next Article →</div>
                    <h4 style={{ fontWeight: 700, color: "#111827", fontSize: "0.88rem", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{nextPost.title}</h4>
                  </div>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ────────────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-24 flex flex-col gap-6">

          {/* TOC */}
          {hasToc && (
            <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "3px solid #ffc107" }}>
                <h3 style={{ fontWeight: 800, color: "#111827", margin: 0, fontSize: "0.9rem" }}>📋 Table of Contents</h3>
              </div>
              <nav style={{ padding: "0.5rem 0" }}>
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`}
                    style={{
                      display: "block", padding: "0.4rem 1.25rem",
                      paddingLeft: item.level === 3 ? "2rem" : "1.25rem",
                      fontSize: item.level === 3 ? "0.78rem" : "0.82rem",
                      fontWeight: item.level === 2 ? 600 : 400,
                      color: activeToc === item.id ? "#00793A" : "#374151",
                      background: activeToc === item.id ? "#f0fdf4" : "transparent",
                      textDecoration: "none", borderLeft: activeToc === item.id ? "3px solid #00793A" : "3px solid transparent",
                      transition: "all 0.15s",
                    }}>
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Latest Articles */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "3px solid #ffc107" }}>
              <h3 style={{ fontWeight: 800, color: "#111827", margin: 0, fontSize: "0.9rem" }}>Latest Articles</h3>
            </div>
            {LATEST_POSTS.filter((p) => p.slug !== post.slug).slice(0, 5).map((p, i, arr) => (
              <Link key={p.slug} href={getPostUrl(p)} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ display: "flex", gap: "0.65rem", padding: "0.75rem 1.1rem", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f0fdf4")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <div style={{ width: 60, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, position: "relative", background: "#f3f4f6" }}>
                    <SafeImage src={p.image} alt={p.title} fill />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontWeight: 600, color: "#111827", fontSize: "0.77rem", lineHeight: 1.4, margin: "0 0 0.25rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{p.title}</h4>
                    <span style={{ fontSize: "0.65rem", color: "#9ca3af" }}>{getMonthName(p.month)} {p.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>📬</div>
            <h3 style={{ fontWeight: 800, color: "#052e16", margin: "0 0 0.35rem", fontSize: "0.95rem" }}>Enjoyed this article?</h3>
            <p style={{ color: "#374151", fontSize: "0.8rem", lineHeight: 1.6, margin: "0 0 1rem" }}>Get more insights delivered weekly to your inbox.</p>
            {subscribed ? (
              <div style={{ background: "#fff", borderRadius: 10, padding: "0.65rem", textAlign: "center", fontSize: "0.82rem", color: "#276749", fontWeight: 700 }}>✅ You're subscribed!</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input type="email" placeholder="Your email" value={newsEmail} onChange={e => setNewsEmail(e.target.value)}
                  style={{ padding: "0.6rem 0.8rem", borderRadius: 8, border: "1.5px solid #bbf7d0", fontSize: "0.83rem", outline: "none", background: "#fff" }} />
                <button onClick={() => { if (newsEmail) setSubscribed(true); }}
                  style={{ background: "#00793A", border: "none", color: "#fff", padding: "0.65rem", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                  Subscribe Now
                </button>
              </div>
            )}
          </div>

          {/* Download CTA */}
          <div style={{ background: "linear-gradient(135deg,#1e3a5f,#0d2540)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>📥</div>
            <h3 style={{ fontWeight: 800, color: "#fff", margin: "0 0 0.4rem", fontSize: "0.9rem" }}>Product Catalogue</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", margin: "0 0 1rem", lineHeight: 1.5 }}>Download the complete Sharon Ply product range.</p>
            <Link href="/contact" style={{ display: "block", background: "#ffc107", color: "#1a1a1a", padding: "0.65rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.83rem" }}>
              Download Free
            </Link>
          </div>

          {/* Social Follow */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", padding: "1.25rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontWeight: 800, color: "#111827", margin: "0 0 1rem", fontSize: "0.9rem", borderBottom: "3px solid #ffc107", paddingBottom: "0.6rem" }}>Follow Us</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {[
                { lbl: "f", color: "#1877f2" }, { lbl: "in", color: "#e1306c" },
                { lbl: "𝕏", color: "#000" }, { lbl: "Li", color: "#0a66c2" },
                { lbl: "▶", color: "#ff0000" },
              ].map((s, i) => (
                <div key={i} style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: 8, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: s.color, cursor: "pointer" }}>
                  {s.lbl}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      </InnerPageLayout>

      {/* ── NEWSLETTER STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderTop: "1.5px solid #86efac", padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📬</div>
          <h2 style={{ fontWeight: 800, color: "#052e16", margin: "0 0 0.5rem", fontSize: "1.6rem" }}>Enjoyed this article?</h2>
          <p style={{ color: "#374151", marginBottom: "1.75rem", lineHeight: 1.7 }}>Get more insights on plywood, interiors and design delivered to your inbox every week.</p>
          {subscribed ? (
            <div style={{ background: "#fff", borderRadius: 12, padding: "1rem 2rem", display: "inline-block", color: "#276749", fontWeight: 700, border: "1.5px solid #86efac" }}>✅ You're subscribed!</div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto">
              <input type="email" placeholder="Enter your email address" value={newsEmail} onChange={e => setNewsEmail(e.target.value)}
                style={{ flex: 1, padding: "0.85rem 1rem", borderRadius: 10, border: "1.5px solid #bbf7d0", fontSize: "0.9rem", outline: "none" }} />
              <button onClick={() => { if (newsEmail) setSubscribed(true); }}
                style={{ background: "#00793A", border: "none", color: "#fff", padding: "0.85rem 1.5rem", borderRadius: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
          )}
          <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.75rem" }}>We respect your privacy. Unsubscribe any time.</p>
        </div>
      </section>

      {/* ── ARTICLE BODY STYLES ───────────────────────────────────────────────── */}
      <style>{`
        .sharon-article-body h2 {
          font-size: 1.55rem; font-weight: 800; color: #00793A;
          margin: 2.5rem 0 1rem; padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb; line-height: 1.3;
        }
        .sharon-article-body h3 {
          font-size: 1.2rem; font-weight: 700; color: #1f2937;
          margin: 2rem 0 0.75rem; line-height: 1.4;
        }
        .sharon-article-body h4 {
          font-size: 1.05rem; font-weight: 700; color: #374151;
          margin: 1.5rem 0 0.6rem;
        }
        .sharon-article-body p {
          font-size: 1.05rem; line-height: 1.85; color: #374151;
          margin-bottom: 1.35rem;
        }
        .sharon-article-body a {
          color: #00793A; font-weight: 500;
          text-decoration: none; border-bottom: 1px solid rgba(0,121,58,0.3);
          transition: border-color 0.2s;
        }
        .sharon-article-body a:hover { border-color: #00793A; }
        .sharon-article-body ul, .sharon-article-body ol {
          margin: 0 0 1.35rem 1.5rem; padding: 0;
        }
        .sharon-article-body li {
          font-size: 1.02rem; line-height: 1.78; color: #374151;
          margin-bottom: 0.4rem;
        }
        .sharon-article-body blockquote {
          margin: 2rem 0; padding: 1.25rem 1.5rem;
          background: #f0fdf4; border-left: 4px solid #00793A;
          border-radius: 0 12px 12px 0;
          font-style: italic; font-size: 1.1rem; color: #1f2937;
        }
        .sharon-article-body img {
          max-width: 100%; border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin: 1.5rem auto; display: block;
        }
        .sharon-article-body strong { color: #111827; font-weight: 700; }
        .sharon-article-body table {
          display: block;
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.92rem;
        }
        .sharon-article-body th {
          background: #052e16; color: #fff;
          padding: 0.75rem 1rem; text-align: left; font-weight: 700;
        }
        .sharon-article-body td {
          padding: 0.65rem 1rem; border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        .sharon-article-body tr:nth-child(even) td { background: #f9fafb; }
        @media print {
          .sharon-article-body { font-size: 12pt; color: #000; }
          aside, nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
