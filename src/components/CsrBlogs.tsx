"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { allBlogPosts } from "@/data/allBlogPosts";
import { getPostUrl, getExcerpt, getReadTime, getMonthName } from "@/data/blogPosts";

function getBlogCard(slug: string, categoryColor: string) {
  const post = allBlogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    category: post.category,
    categoryColor,
    date: `${getMonthName(post.month)} ${post.year}`,
    title: post.title,
    excerpt: getExcerpt(post.contentHTML, 140),
    readTime: getReadTime(post.contentHTML),
    image: post.image,
    link: getPostUrl(post),
  };
}

const blogs = [
  getBlogCard("the-advantages-of-using-marine-plywood-in-outdoor-projects", "#00793A"),
  getBlogCard("virasafe-your-home-with-sharonply-a-quick-analysis", "#7c3aed"),
  getBlogCard("why-should-you-choose-anti-bacterial-anti-microbial-anti-fungal-plywood", "#ea580c"),
].filter((card): card is NonNullable<typeof card> => card !== null);

const csrInitiatives = [
  {
    id: "quench",
    title: "Quench The Thirst",
    tag: "#QuenchTheThirst",
    counter: "10,000+",
    counterLabel: "Lives Impacted",
    description:
      "Distributing water bowls across Chennai every summer for birds and stray animals, ensuring they survive the scorching heat.",
    color: "#0ea5e9",
    colorBg: "rgba(14,165,233,0.12)",
    image: "/images/csr-quench-the-thirst.jpg",
    link: "/corporate-social-responsibility/quenchthethirst/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: "green",
    title: "Grow The Green",
    tag: "#GrowTheGreen",
    counter: "100,000+",
    counterLabel: "Trees Planted",
    description:
      "A 10-year reforestation drive planting thousands of trees across Tamil Nadu to restore green cover and combat climate change.",
    color: "#16a34a",
    colorBg: "rgba(22,163,74,0.12)",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=460&fit=crop&q=80",
    link: "/corporate-social-responsibility/growthegreen/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.93A2 2 0 0 0 5.6 22h12.8a2 2 0 0 0 1.78-2.9C18.12 16.12 18 10 18 10" />
        <path d="M12 22V10" />
      </svg>
    ),
  },
  {
    id: "plastic",
    title: "Say No To Plastic",
    tag: "#iSayNoToPlastic",
    counter: "50,000+",
    counterLabel: "Kg Plastic Eliminated",
    description:
      "Annual paper bag distribution drives at Vandalur Zoo since 2009, encouraging visitors to go plastic-free for a cleaner planet.",
    color: "#00793A",
    colorBg: "rgba(0,121,58,0.12)",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=700&h=460&fit=crop&q=80",
    link: "https://isaynotoplastic.com/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
];

export default function CsrBlogs() {
  const [activeCsr, setActiveCsr] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchCsr = (idx: number) => {
    if (idx === activeCsr || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveCsr(idx);
      setAnimating(false);
    }, 320);
  };

  useEffect(() => {
    if (hovered) return;
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveCsr((prev) => (prev + 1) % csrInitiatives.length);
        setAnimating(false);
      }, 320);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovered]);

  const active = csrInitiatives[activeCsr];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8faf9 0%, #f0f7f3 100%)" }}
    >
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,121,58,0.045) 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />
      {/* Top gradient accent */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #00793A 0%, #ffc107 50%, #00793A 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-10">
        {/* Section heading */}
        <div className="mb-6">
          <span
            className="inline-block text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(0,121,58,0.08)", color: "#00793A" }}
          >
            Beyond the Board
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight" style={{ letterSpacing: "-0.02em" }}>
            WE BUILD MORE THAN{" "}
            <span style={{ color: "#00793A" }}>PLYWOOD</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl" style={{ lineHeight: "1.7" }}>From forest-care drives to expert guides — see how SharonPly gives back to the community and helps you build smarter.</p>
          <div className="mt-3">
            <div
              className="h-[3px] rounded-full"
              style={{
                width: 72,
                background: "linear-gradient(90deg, #ffc107, #e6a800)",
                animation: "underlineGrow 1s ease forwards",
              }}
            />
          </div>
        </div>

        {/* Main 50/50 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

          {/* ========== LEFT: CSR ========== */}
          <div
            className="flex flex-col gap-4"
            style={{ height: 580 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-6 rounded-full" style={{ background: "#00793A" }} />
                <h3 className="text-base font-extrabold tracking-wide text-gray-900 uppercase">
                  Our CSR Initiatives
                </h3>
              </div>
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(0,121,58,0.10)", color: "#00793A" }}
              >
                #IamStrongest
              </span>
            </div>

            {/* Featured active card — fills ~70% of the column */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                flex: "1 1 0",
                minHeight: 320,
                boxShadow: `0 6px 28px ${active.color}25`,
              }}
            >
              {/* Image with crossfade */}
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
                style={{
                  transition: "opacity 0.32s ease, transform 0.32s ease",
                  opacity: animating ? 0 : 1,
                  transform: animating ? "scale(1.04)" : "scale(1)",
                }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                }}
              />
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: 3, background: `linear-gradient(90deg, ${active.color}, transparent)` }}
              />
              {/* Counter badge */}
              <div className="absolute top-4 right-4">
                <div
                  className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm"
                  style={{ background: active.color }}
                >
                  <span className="text-sm font-extrabold">{active.counter}</span>
                  <span className="opacity-90 font-medium">{active.counterLabel}</span>
                </div>
              </div>
              {/* Bottom overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="p-1.5 rounded-lg text-white"
                    style={{ background: active.color }}
                  >
                    {active.icon}
                  </span>
                  <span className="text-[11px] font-bold" style={{ color: "#ffc107" }}>
                    {active.tag}
                  </span>
                </div>
                <h4 className="text-white font-extrabold text-[1.05rem] leading-tight">{active.title}</h4>
                <p className="text-white/75 text-xs mt-1 line-clamp-2 leading-relaxed">{active.description}</p>
                <a
                  href={active.link}
                  target={active.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-bold rounded-full px-3.5 py-1.5 transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: active.color, color: "#fff" }}
                >
                  Learn More
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 3 selector mini-cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {csrInitiatives.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => switchCsr(i)}
                  className="relative rounded-xl p-3 text-left transition-all duration-200 cursor-pointer group"
                  style={{
                    background: activeCsr === i ? item.colorBg : "#fff",
                    border: `2px solid ${activeCsr === i ? item.color : "#e5e7eb"}`,
                    boxShadow: activeCsr === i ? `0 3px 14px ${item.color}28` : "0 1px 4px rgba(0,0,0,0.05)",
                    transform: activeCsr === i ? "translateY(-2px)" : "none",
                  }}
                >
                  {activeCsr === i && (
                    <div
                      className="absolute top-0 left-0 right-0 rounded-t-[10px]"
                      style={{ height: 3, background: item.color }}
                    />
                  )}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors"
                    style={{ background: item.colorBg, color: item.color }}
                  >
                    <span style={{ width: 16, height: 16, display: "flex" }}>{item.icon}</span>
                  </div>
                  <p
                    className="text-xs font-bold leading-tight"
                    style={{ color: activeCsr === i ? item.color : "#374151", fontSize: "12px" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 font-semibold">
                    {item.counter} {item.counterLabel}
                  </p>
                  {/* Progress bar on active */}
                  {activeCsr === i && !hovered && (
                    <div
                      className="absolute bottom-0 left-0 rounded-b-xl overflow-hidden"
                      style={{ height: 2, right: 0 }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: item.color,
                          animation: "progressFill 4.5s linear forwards",
                        }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ========== RIGHT: BLOGS ========== */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-6 rounded-full" style={{ background: "#ffc107" }} />
                <h3 className="text-base font-extrabold tracking-wide text-gray-900 uppercase">
                  Knowledge Hub
                </h3>
              </div>
              <Link
                href="/blog/"
                className="inline-cta-link text-[11px] font-bold flex items-center gap-1 transition-all hover:gap-2"
                style={{ color: "#00793A" }}
              >
                View All Articles
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 3 full blog cards stacked vertically */}
            <div className="flex flex-col gap-3 flex-1">
              {blogs.map((blog, i) => (
                <Link
                  key={i}
                  href={blog.link}
                  className="group flex bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "1px solid #e8ede9",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,121,58,0.14)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#00793A60";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#e8ede9";
                  }}
                >
                  {/* Image */}
                  <div className="flex-shrink-0 overflow-hidden" style={{ width: 130, minHeight: 108 }}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ height: "100%" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide text-white"
                          style={{ background: blog.categoryColor }}
                        >
                          {blog.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{blog.date}</span>
                        <span className="text-[10px] text-gray-400 ml-auto">{blog.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#00793A] transition-colors duration-200" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                        {blog.title}
                      </h4>
                      <p className="text-[12px] text-gray-500 mt-1.5 line-clamp-2" style={{ lineHeight: "1.65" }}>
                        {blog.excerpt}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 text-[12px] font-bold mt-2.5 group-hover:gap-2 transition-all"
                      style={{ color: "#00793A" }}
                    >
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All CTA */}
            <div className="mt-4 flex justify-center">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)",
                  boxShadow: "0 4px 16px rgba(0,121,58,0.25)",
                }}
              >
                VIEW ALL ARTICLES
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
