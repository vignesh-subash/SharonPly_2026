"use client";
import { useState, useEffect } from "react";

const testimonials = [
  { quote: "SharonPly has been our preferred plywood partner for over a decade. The consistency in quality and the technical support they provide is unmatched in the industry.", author: "Ar. Suresh Kumar", role: "Principal Architect, Chennai" },
  { quote: "We specified Sharon Platinum Ply for a 50-unit luxury apartment project. Zero complaints on delamination, excellent thickness tolerance, and E-Zero certification was a big plus.", author: "Ramesh Patel", role: "Project Manager, Bangalore" },
  { quote: "The Sharon Exoti Aura pre-finished veneers saved us weeks of on-site finishing time. Color consistency across batches is exceptional.", author: "Priya Sharma", role: "Interior Designer, Hyderabad" },
];

export default function H2Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-[#00793A] bg-green-50 px-3.5 py-1.5 rounded-full mb-4">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">Trusted by Professionals</h2>
        </div>
        <style>{`
          .testimonial-card { animation: testimonialIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          @keyframes testimonialIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
        <div key={active} className="testimonial-card max-w-2xl mx-auto bg-white rounded-xl p-8 sm:p-10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}>
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 italic">&ldquo;{t.quote}&rdquo;</p>
          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#00793A] flex items-center justify-center text-white font-bold text-xs">
              {t.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{t.author}</div>
              <div className="text-xs text-gray-400">{t.role}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 24 : 6, background: i === active ? "#00793A" : "rgba(0,0,0,0.1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
