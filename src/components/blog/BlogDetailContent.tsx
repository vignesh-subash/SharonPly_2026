"use client";

import { useEffect, useRef, useState } from "react";
import { BlogPost, rewriteInternalLinks, blogPosts, getMonthName, getReadTime } from "@/data/blogPosts";

export default function BlogDetailContent({ post }: { post: BlogPost }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
      const progress = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      setReadProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const processedHTML = rewriteInternalLinks(post.contentHTML, blogPosts);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#00793A] to-[#ffc107] transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div
        ref={contentRef}
        className="transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Meta info bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg, #e6f4ed, #d4eddf)",
              color: "#00793A",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {post.category}
          </span>

          <div className="flex items-center gap-2 text-[13px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {getMonthName(post.month)} {post.year}
          </div>

          <span className="w-1 h-1 rounded-full bg-[#ddd]" />

          <div className="flex items-center gap-1.5 text-[13px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {getReadTime(post.contentHTML)} read
          </div>

          <span className="w-1 h-1 rounded-full bg-[#ddd]" />

          <div className="flex items-center gap-1.5 text-[13px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {post.author}
          </div>
        </div>

        {/* Share bar */}
        <div className="flex items-center gap-2 mb-8 pb-6 border-b border-[#f0f0ed]">
          <span className="text-xs text-[#aaa] font-medium mr-1">Share:</span>
          {[
            {
              label: "Twitter",
              icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              onClick: () => {
                if (typeof window !== "undefined") {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, "_blank");
                }
              },
            },
            {
              label: "LinkedIn",
              icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
              onClick: () => {
                if (typeof window !== "undefined") {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
                }
              },
            },
            {
              label: "WhatsApp",
              icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
              onClick: () => {
                if (typeof window !== "undefined") {
                  window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank");
                }
              },
            },
          ].map((social) => (
            <button
              key={social.label}
              onClick={social.onClick}
              className="w-8 h-8 rounded-lg bg-[#f5f5f3] hover:bg-[#e8e8e5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-sm"
              title={`Share on ${social.label}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={social.icon} />
              </svg>
            </button>
          ))}
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-lg bg-[#f5f5f3] hover:bg-[#e8e8e5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-sm"
            title="Copy link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </button>

          {/* Toast */}
          {showShareToast && (
            <span className="ml-2 px-3 py-1 bg-[#00793A] text-white text-xs font-medium rounded-full animate-[fadeSlideUp_0.3s_ease]">
              Link copied!
            </span>
          )}
        </div>

        {/* Article content */}
        <article
          ref={articleRef}
          className="blog-article-content prose prose-lg max-w-none
            prose-headings:text-[#2d2d2d] prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#f0f0ed]
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#444] prose-p:leading-[1.8] prose-p:mb-5
            prose-a:text-[#00793A] prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-[#00793A]/20 hover:prose-a:border-[#00793A]/60 prose-a:transition-colors
            prose-strong:text-[#2d2d2d] prose-strong:font-semibold
            prose-ul:text-[#444] prose-ol:text-[#444]
            prose-li:text-[#444] prose-li:leading-[1.8] prose-li:mb-1.5
            prose-img:rounded-xl prose-img:shadow-sm
            prose-blockquote:border-l-[#00793A] prose-blockquote:bg-[#f8faf9] prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: processedHTML }}
        />

        {/* Tags section */}
        {post.tags && (
          <div className="mt-10 pt-6 border-t border-[#f0f0ed]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#aaa] font-medium">Tags:</span>
              {post.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#f5f5f3] text-[#666] text-xs rounded-full hover:bg-[#e8e8e5] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author card */}
        <div className="mt-8 p-5 bg-gradient-to-br from-[#f8faf9] to-[#f0f5f2] rounded-2xl border border-[#e6f0ea]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00793A] to-[#005a2b] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#2d2d2d]" style={{ fontFamily: "var(--font-display)" }}>
                {post.author}
              </p>
              <p className="text-xs text-[#888] mt-0.5">
                SharonPly Editorial Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
