"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllPosts,
  getPostUrl,
  getFirst20Words,
  getMonthName,
  getReadTime,
  BlogPost,
} from "@/data/blogPosts";

const allPosts = getAllPosts();
const categorySet = new Set(allPosts.map((p) => p.category));
const categories = ["All", ...Array.from(categorySet)];

const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  All: { bg: "#00793A", text: "#fff", accent: "#e6f4ed" },
  Other: { bg: "#6b7280", text: "#fff", accent: "#f3f4f6" },
  "Know about Plywood": { bg: "#2563eb", text: "#fff", accent: "#eff6ff" },
  "Interior Design": { bg: "#00793A", text: "#fff", accent: "#e6f4ed" },
};

function getColor(cat: string) {
  return categoryColors[cat] || categoryColors["Other"];
}

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);
  const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());

  const filtered = allPosts.filter((b) => {
    const matchesCat = activeCategory === "All" || b.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const featured = allPosts.slice(0, 3);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-idx");
            if (idx) setAnimatedCards((prev) => new Set([...prev, Number(idx)]));
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((el, idx) => {
      if (!animatedCards.has(idx) && observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, [visible, animatedCards]);

  useEffect(() => {
    setVisibleCount(9);
    setAnimatedCards(new Set());
  }, [activeCategory, searchQuery]);

  const setRef = useCallback((idx: number, el: HTMLElement | null) => {
    if (el) cardRefs.current.set(idx, el);
    else cardRefs.current.delete(idx);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero Featured Section */}
      <section className="relative bg-gradient-to-br from-[#00793A] via-[#006432] to-[#004825] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#ffc107]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-10 pb-8">
          <div
            className="mb-8 transition-all duration-700"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#ffc107]" />
              <span className="text-[#ffc107] text-xs font-semibold uppercase tracking-[0.2em]">
                SharonPly Blog
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Stories
            </h2>
            <p className="text-white/50 text-sm max-w-lg">
              Expert insights on plywood, interior design, and sustainable building
            </p>
          </div>

          {/* Featured grid */}
          <div className="grid md:grid-cols-12 gap-4 md:gap-5">
            {/* Main featured */}
            <Link
              href={getPostUrl(featured[0])}
              className="md:col-span-7 group relative rounded-2xl overflow-hidden bg-black/20 min-h-[280px] md:min-h-[340px] transition-all duration-500"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "0.1s",
              }}
            >
              <Image
                src={featured[0].image}
                alt={featured[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-left origin-left transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span
                  className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full mb-3"
                  style={{ background: getColor(featured[0].category).bg, color: "#fff" }}
                >
                  {featured[0].category}
                </span>
                <h3
                  className="text-white text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-[#ffc107] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured[0].title}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-3 max-w-lg">
                  {getFirst20Words(featured[0].contentHTML)}
                </p>
                <div className="flex items-center gap-4 text-white/40 text-xs">
                  <span>{getMonthName(featured[0].month)} {featured[0].year}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{getReadTime(featured[0].contentHTML)} read</span>
                </div>
              </div>
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </Link>

            {/* Secondary featured */}
            <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
              {featured.slice(1, 3).map((post, i) => (
                <Link
                  key={post.slug}
                  href={getPostUrl(post)}
                  className="group relative flex-1 rounded-2xl overflow-hidden bg-black/20 min-h-[140px] md:min-h-0 transition-all duration-500"
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${0.2 + i * 0.1}s`,
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-left origin-left transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <span
                      className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full mb-2"
                      style={{ background: getColor(post.category).bg, color: "#fff" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-white text-sm md:text-base font-bold leading-snug line-clamp-2 group-hover:text-[#ffc107] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-white/40 text-[11px]">
                      <span>{getMonthName(post.month)} {post.year}</span>
                      <span>{getReadTime(post.contentHTML)} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40V20C240 0 480 0 720 10C960 20 1200 30 1440 20V40H0Z" fill="#fafaf8" />
          </svg>
        </div>
      </section>

      {/* Search + Filter Bar */}
      <section className="sticky top-16 lg:top-24 z-40 bg-white/80 backdrop-blur-xl border-b border-[#e8e8e5]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#f5f5f3] border border-transparent rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#aaa] focus:outline-none focus:border-[#00793A]/30 focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
              {categories.map((cat) => {
                const count = cat === "All" ? allPosts.length : allPosts.filter((b) => b.category === cat).length;
                const isActive = activeCategory === cat;
                const color = getColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="group relative flex items-center gap-1.5 px-3.5 py-2.5 min-h-11 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all duration-300"
                    style={{
                      background: isActive ? color.bg : "transparent",
                      color: isActive ? color.text : "#6a6a6a",
                    }}
                  >
                    {cat}
                    <span
                      className="text-[10px] min-w-[18px] text-center px-1 py-0.5 rounded-md font-bold transition-all duration-300"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.2)" : "#f0f0ed",
                        color: isActive ? "#fff" : "#999",
                      }}
                    >
                      {count}
                    </span>
                    {!isActive && (
                      <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#e0e0e0] transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results info */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-[#999] text-sm">
            {filtered.length === 0 ? "No articles found" : (
              <>
                Showing <span className="font-semibold text-[#2d2d2d]">{Math.min(visibleCount, filtered.length)}</span> of{" "}
                <span className="font-semibold text-[#2d2d2d]">{filtered.length}</span> articles
              </>
            )}
          </p>
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-xs text-[#00793A] font-medium hover:underline">
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#f0f0ed] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-[#888] text-sm">No articles match your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="inline-cta-link mt-3 text-sm text-[#00793A] font-medium hover:underline"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
              {visible.map((post, i) => {
                const color = getColor(post.category);
                const globalIdx = filtered.indexOf(post);
                const isVis = animatedCards.has(globalIdx);
                return (
                  <Link
                    key={`${post.slug}-${i}`}
                    href={getPostUrl(post)}
                    ref={(el) => setRef(globalIdx, el)}
                    data-idx={globalIdx}
                    className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                    style={{
                      opacity: isVis ? 1 : 0,
                      transform: isVis ? "translateY(0)" : "translateY(32px)",
                      transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.08}s, box-shadow 0.4s ease`,
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f0ed]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-left origin-left transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md transition-all duration-300"
                          style={{ background: `${color.bg}dd`, color: "#fff" }}
                        >
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <span className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium rounded-lg">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {getReadTime(post.contentHTML)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        className="text-[#2d2d2d] font-bold text-[15px] leading-snug mb-2.5 line-clamp-2 group-hover:text-[#00793A] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-[#888] text-[13px] leading-relaxed line-clamp-2 mb-4">
                        {getFirst20Words(post.contentHTML)}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0ed]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#f0f0ed] flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                          <span className="text-xs text-[#999]">{getMonthName(post.month)} {post.year}</span>
                        </div>
                        <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300" style={{ color: color.bg }}>
                          Read
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + 9)}
                className="group relative px-8 py-3 rounded-full bg-[#00793A] text-white text-sm font-semibold overflow-hidden transition-all duration-400 hover:shadow-[0_4px_20px_rgba(0,121,58,0.3)] active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Load More Articles
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-y-0.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-[#005a2b] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-gradient-to-r from-[#00793A] to-[#004825] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ffc107]/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8 md:gap-12">
              {[
                { val: `${allPosts.length}+`, label: "Articles Published", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" },
                { val: `${categories.length - 1}`, label: "Categories", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
                { val: "2023\u201325", label: "Years Covered", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{s.val}</div>
                    <div className="text-[11px] text-white/50">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ffc107] hover:bg-[#e5ac00] text-[#2d2d2d] text-sm font-bold rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
