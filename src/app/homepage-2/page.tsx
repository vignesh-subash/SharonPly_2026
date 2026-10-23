"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import H2Hero from "@/components/H2Hero";
import H2TrustStrip from "@/components/H2TrustStrip";
import H2Products from "@/components/H2Products";
import H2ChooseByNeed from "@/components/H2ChooseByNeed";
import H2WhoWeServe from "@/components/H2WhoWeServe";
import H2Technologies from "@/components/H2Technologies";
import H2Videos from "@/components/H2Videos";
import H2Testimonials from "@/components/H2Testimonials";
import H2Cta from "@/components/H2Cta";

export default function HomepageV2() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      if (!navRef.current) return;
      navRef.current.style.transform = curr > lastY && curr > 120 ? "translateY(-100%)" : "translateY(0)";
      lastY = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Frosted glass navbar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-transform duration-500"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px) saturate(1.8)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: "linear-gradient(135deg, #00793A, #005c2c)" }}>S</div>
            <span className="font-bold text-gray-900 text-sm">SharonPly</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/our-history" className="text-xs font-semibold text-gray-500 hover:text-[#00793A] transition-colors tracking-wide uppercase">About</Link>
            <Link href="/plywood" className="text-xs font-semibold text-gray-500 hover:text-[#00793A] transition-colors tracking-wide uppercase">Products</Link>
            <Link href="/technology" className="text-xs font-semibold text-gray-500 hover:text-[#00793A] transition-colors tracking-wide uppercase">Technology</Link>
            <Link href="/contact" className="text-xs font-semibold text-gray-500 hover:text-[#00793A] transition-colors tracking-wide uppercase">Contact</Link>
          </div>
          <Link href="/contact" className="text-xs font-bold px-5 py-2 rounded-full text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #00793A, #005c2c)", boxShadow: "0 4px 16px rgba(0,121,58,0.25)" }}>
            Find a Dealer
          </Link>
        </div>
      </nav>

      <main>
        <H2Hero />
        <H2TrustStrip />
        <H2Products />
        <H2ChooseByNeed />
        <H2WhoWeServe />
        <H2Technologies />
        <H2Videos />
        <H2Testimonials />
        <H2Cta />
      </main>

      <footer className="py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-black text-sm"
            style={{ background: "linear-gradient(135deg, #00793A, #005c2c)" }}>S</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} SharonPly. All rights reserved.<br />
            India&apos;s Most Trusted Plywood Manufacturer Since 1987.
          </p>
        </div>
      </footer>
    </div>
  );
}
