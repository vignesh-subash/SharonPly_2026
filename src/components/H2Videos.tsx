"use client";
import { useRef, useEffect } from "react";

const videos = [
  { title: "SharonPly Manufacturing Excellence", thumbnail: "/images/sharon-factory-aerial.jpg" },
  { title: "Platinum Ply — Built to Last", thumbnail: "/images/hero-slide1-interior.jpg" },
  { title: "Exclusive Plant Tour", thumbnail: "/images/veneer-slide-2.jpg" },
];

export default function H2Videos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".video-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <style>{`
        .video-card { opacity: 0; transform: scale(0.92); transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .video-card.in-view { opacity: 1; transform: scale(1); }
        .video-card:nth-child(1) { transition-delay: 0s; }
        .video-card:nth-child(2) { transition-delay: 0.15s; }
        .video-card:nth-child(3) { transition-delay: 0.3s; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">Videos</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">See SharonPly in Action</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <div key={v.title} className="video-card group relative rounded-xl overflow-hidden bg-gray-100 h-52 cursor-pointer">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-900 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <p className="text-white text-xs font-bold truncate">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
