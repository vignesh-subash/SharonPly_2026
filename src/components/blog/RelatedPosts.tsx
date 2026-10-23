"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, getPostUrl, getFirst20Words, getMonthName, getReadTime } from "@/data/blogPosts";

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-idx");
            if (idx) setVisible((prev) => new Set([...prev, Number(idx)]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    containerRef.current.querySelectorAll("[data-idx]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t border-[#e8e8e5]" ref={containerRef}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e6f4ed] to-[#d4eddf] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00793A" strokeWidth="2" strokeLinecap="round">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#2d2d2d]" style={{ fontFamily: "var(--font-display)" }}>
          Related Articles
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => {
          const isVis = visible.has(i);
          return (
            <Link
              key={post.slug}
              href={getPostUrl(post)}
              data-idx={i}
              className="group block bg-white rounded-xl border border-[#f0f0ed] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: isVis ? 1 : 0,
                transform: isVis ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, box-shadow 0.4s ease`,
              }}
            >
              <div className="slot-media relative bg-[#f0f0ed] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Read time badge */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium rounded-md">
                    {getReadTime(post.contentHTML)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-[#999] font-medium">
                    {getMonthName(post.month)} {post.year}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-[#ddd]" />
                  <span className="text-[10px] text-[#bbb]">{post.category}</span>
                </div>
                <h3
                  className="text-[14px] font-bold text-[#2d2d2d] leading-snug line-clamp-2 group-hover:text-[#00793A] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p className="text-[12px] text-[#999] mt-2 line-clamp-2 leading-relaxed">
                  {getFirst20Words(post.contentHTML)}
                </p>
                <div className="flex items-center gap-1 mt-3 text-[#00793A] text-[12px] font-semibold group-hover:gap-2 transition-all duration-300">
                  Read article
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
