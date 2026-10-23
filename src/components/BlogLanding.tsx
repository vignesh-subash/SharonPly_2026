"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import InnerPageLayout from "@/components/InnerPageLayout";
import {
  getAllPosts,
  getPostUrl,
  getExcerpt,
  getMonthName,
  getReadTime,
  BlogPost,
} from "@/data/blogPosts";

const ALL_POSTS = getAllPosts();
const POSTS_PER_PAGE = 10;

// ─── PDF-requested category mapping ────────────────────────────────────────────
const PDF_CATEGORIES = [
  "All Posts",
  "Plywood Guide",
  "Veneer Inspiration",
  "Doors",
  "Interior Tips",
  "Product Knowledge",
  "CSR Stories",
  "Brand Updates",
  "Maintenance Tips",
];

const PDF_CAT_COLORS: Record<string, string> = {
  "All Posts":        "#374151",
  "Plywood Guide":    "#2563eb",
  "Veneer Inspiration": "#7c3aed",
  "Doors":            "#d97706",
  "Interior Tips":    "#db2777",
  "Product Knowledge": "#0891b2",
  "CSR Stories":      "#16a34a",
  "Brand Updates":    "#ea580c",
  "Maintenance Tips": "#0d9488",
};

function mapToPdfCategory(post: BlogPost): string {
  const raw = post.category.trim();
  const tag = (post.tags || "").toLowerCase();
  const title = post.title.toLowerCase();

  if (/veneer/.test(title) || /veneer/.test(tag)) return "Veneer Inspiration";
  if (/door/.test(title) || /flush/.test(title) || /door/i.test(tag)) return "Doors";
  if (/maintenance|care|protect|safe/.test(title)) return "Maintenance Tips";
  if (/csr|cares|sharon cares|social|community/.test(raw.toLowerCase())) return "CSR Stories";

  const lower = raw.toLowerCase();
  if (lower === "know about plywood" || lower === "plywood" || lower === "buying guide") return "Plywood Guide";
  if (lower === "contemporary living" || lower === "interior design") return "Interior Tips";
  if (lower === "firesave technology" || lower === "virasafe" || lower === "product guides") return "Product Knowledge";
  if (lower === "company" || lower === "featured" || lower === "company news" || lower === "customer stories") return "Brand Updates";
  if (lower === "sharon cares" || lower === "sustainability" || lower === "case studies") return "CSR Stories";

  if (/waterproof|bwp|marine/.test(tag)) return "Product Knowledge";
  if (/interior|design|furniture|decor/.test(tag)) return "Interior Tips";

  return "Interior Tips";
}

const CATEGORY_COUNTS: Record<string, number> = {};
for (const post of ALL_POSTS) {
  const mapped = mapToPdfCategory(post);
  CATEGORY_COUNTS[mapped] = (CATEGORY_COUNTS[mapped] || 0) + 1;
}

function BlogImage({ src, alt, fill = true, className = "" }: { src: string; alt: string; fill?: boolean; className?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: "#1B4332" }}>
        <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>{String.fromCharCode(0x1FAB5)}</span>
      </div>
    );
  }
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        className={className}
        style={{ objectFit: "cover", objectPosition: "left center" }}
        onError={() => setErr(true)}
        loading="lazy"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className={className}
      style={{ objectFit: "cover", objectPosition: "left center" }}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

export default function BlogLanding() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All Posts");
  const [page, setPage] = useState(1);
  const featuredRef = useRef<HTMLDivElement>(null);

  const scrollToArticles = useCallback(() => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filtered = useMemo(() => {
    let posts = [...ALL_POSTS];
    if (activeCat !== "All Posts") {
      posts = posts.filter((p) => mapToPdfCategory(p) === activeCat);
    }
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          mapToPdfCategory(p).toLowerCase().includes(q) ||
          (p.tags || "").toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCat, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagedPosts = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const featured = filtered.length > 0 ? filtered[0] : null;
  const gridPosts = featured ? pagedPosts.filter((p) => p.slug !== featured.slug) : pagedPosts;

  useEffect(() => { setPage(1); }, [activeCat, search]);

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Blog" }]}
      title="SharonPly Knowledge Hub"
      subtitle="Ideas, insights, and expert guidance for stronger interiors."
      heroImage="/images/2026/pages/blog-hero.webp"
    >
    <div className="bg-white">
      {/* Explore Articles CTA */}
      <div className="page-container pt-8">
        <button
          onClick={scrollToArticles}
          className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full w-fit cursor-pointer border-0"
          style={{ background: "#ffc107", color: "#1a1a1a", fontSize: "0.95rem" }}
        >
          Explore Articles
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </button>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="page-container" style={{ marginTop: 24, position: "relative", zIndex: 20 }}>
        <div className="flex items-center gap-3 rounded-xl shadow-lg bg-white border" style={{ padding: "0.5rem 1rem", borderColor: "#e5e7eb" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles, plywood tips, veneer ideas, CSR stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none border-0 text-base"
            style={{ padding: "0.75rem 0", color: "#111827" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="flex-shrink-0 cursor-pointer border-0 bg-transparent" style={{ color: "#9ca3af" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── 3. CATEGORY FILTERS ── */}
      <div className="page-container" style={{ marginTop: 24 }}>
        <div className="flex flex-wrap items-center gap-2">
          {PDF_CATEGORIES.map((cat) => {
            const isActive = activeCat === cat;
            const count = cat === "All Posts" ? ALL_POSTS.length : (CATEGORY_COUNTS[cat] || 0);
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium cursor-pointer border-0 min-h-11"
                style={{
                  padding: "0.625rem 1rem",
                  background: isActive ? PDF_CAT_COLORS[cat] : "#f3f4f6",
                  color: isActive ? "#fff" : "#374151",
                }}
              >
                {cat}
                <span className="text-xs rounded-full px-1.5 py-0.5" style={{ background: isActive ? "rgba(255,255,255,0.2)" : "#e5e7eb", minWidth: 20, textAlign: "center" }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. FEATURED ARTICLE ── */}
      <div ref={featuredRef} className="page-container" style={{ marginTop: 40 }}>
        {featured && (
          <>
            <h2 className="text-2xl font-extrabold mb-5" style={{ color: "#111827" }}>Featured Article</h2>
            <Link href={getPostUrl(featured)} className="block group" style={{ textDecoration: "none" }}>
              <div className="rounded-2xl overflow-hidden shadow-md" style={{ background: "#fff", border: "1.5px solid #e5e7eb" }}>
                <div className="slot-hero relative overflow-hidden" style={{ maxHeight: 620, width: "100%" }}>
                  <BlogImage src={featured.image} alt={featured.title} />
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:underline" style={{ color: "#111827" }}>
                    {featured.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "#6b7280", lineHeight: 1.6 }}>
                    {getExcerpt(featured.contentHTML, 200)}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#9ca3af" }}>
                    <span>{getMonthName(featured.month)} {featured.year}</span>
                    <span>&middot;</span>
                    <span>{getReadTime(featured.contentHTML)} read</span>
                  </div>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* ── 5. LATEST ARTICLES GRID ── */}
      <div className="page-container" style={{ marginTop: 48 }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold" style={{ color: "#111827" }}>Latest Articles</h2>
          <span className="text-sm" style={{ color: "#6b7280" }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {gridPosts.length === 0 ? (
          <div className="text-center py-16">
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>{String.fromCharCode(0x1F4ED)}</div>
            <p className="text-lg font-semibold" style={{ color: "#374151" }}>No articles found</p>
            <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => {
              const cat = mapToPdfCategory(post);
              const catColor = PDF_CAT_COLORS[cat] || "#374151";
              return (
                <Link
                  key={post.slug}
                  href={getPostUrl(post)}
                  className="group flex flex-col rounded-xl overflow-hidden shadow-sm"
                  style={{ background: "#fff", border: "1.5px solid #e5e7eb", textDecoration: "none" }}
                >
                  <div className="slot-media relative overflow-hidden">
                    <BlogImage src={post.image} alt={post.title} className="group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col flex-1" style={{ padding: "1.25rem" }}>
                    <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:underline" style={{ color: "#111827" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm line-clamp-2 mb-3" style={{ color: "#6b7280", lineHeight: 1.6, flex: 1 }}>
                      {getExcerpt(post.contentHTML, 120)}
                    </p>
                    <div className="flex items-center justify-between text-xs mt-auto" style={{ color: "#9ca3af" }}>
                      <div className="flex items-center gap-2">
                        <span>{getMonthName(post.month)} {post.year}</span>
                        <span>&middot;</span>
                        <span>{getReadTime(post.contentHTML)} read</span>
                      </div>
                      <span className="font-semibold inline-flex items-center gap-1" style={{ color: catColor }}>
                        Read More
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 pb-4 px-4 max-w-full">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="flex items-center gap-1 px-4 py-2.5 min-h-11 rounded-lg text-sm font-medium"
              style={{
                background: safePage <= 1 ? "#f3f4f6" : "#00793A",
                color: safePage <= 1 ? "#9ca3af" : "#fff",
                border: "none",
                cursor: safePage <= 1 ? "not-allowed" : "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-hide py-1" style={{ scrollbarWidth: "none" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-11 h-11 rounded-lg text-sm font-bold"
                  style={{
                    background: p === safePage ? "#00793A" : "#f3f4f6",
                    color: p === safePage ? "#fff" : "#374151",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="flex items-center gap-1 px-4 py-2.5 min-h-11 rounded-lg text-sm font-medium"
              style={{
                background: safePage >= totalPages ? "#f3f4f6" : "#00793A",
                color: safePage >= totalPages ? "#9ca3af" : "#fff",
                border: "none",
                cursor: safePage >= totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── 6. CONVERSION CTA ── */}
      <section className="py-6 mt-12" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffc107] mb-1">Expert Guidance</p>
            <h2 className="text-lg font-bold text-white">Need Help Choosing the Right Product?</h2>
            <p className="text-white/70 text-sm">Explore SharonPly products or speak to our team for plywood, veneer, and door recommendations.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/plywood" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all whitespace-nowrap">
              Explore Products
            </Link>
            <Link href="/contact" className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all whitespace-nowrap">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
    </InnerPageLayout>
  );
}
