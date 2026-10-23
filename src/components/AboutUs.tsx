"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-20 lg:py-28"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00793A]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffc107]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00793A]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00793A] animate-pulse" />
              <span className="text-[#00793A] text-sm font-semibold tracking-wide uppercase">
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
              ABOUT{" "}
              <span className="text-[#00793A]">US</span>
            </h2>

            {/* Gold underline */}
            <div className="relative h-1 w-20 mb-8 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffc107] to-[#ffdb58]" />
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#ffc107] to-[#ffdb58] transition-transform duration-1000 ease-out ${
                  visible ? "translate-x-0" : "-translate-x-full"
                }`}
              />
            </div>

            {/* Subheading */}
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-6 leading-snug">
              SHARONPLY &mdash;{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00793A, #00a84f)",
                }}
              >
                SETTING STANDARDS IN THE PLYWOOD INDUSTRY
              </span>
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
              SharonPly is committed to exceeding your expectations with its
              innovative solutions. We at SharonPly take all the measures to
              achieve it. This has earned us the reputation of the best plywood
              manufacturers in India. From boards and sheets to doors, our
              products are engineered to deliver unparalleled quality and
              performance for your projects.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: "25+", label: "Years Experience" },
                { value: "10K+", label: "Happy Clients" },
                { value: "500+", label: "Dealers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #00793A, #ffc107)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="/our-history"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #00793A, #00a84f)",
              }}
            >
              READ MORE
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:translate-x-1 transition-transform duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Decorative frame */}
            <div
              className="absolute -inset-3 rounded-2xl opacity-20 blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, #00793A 0%, #ffc107 100%)",
              }}
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-[#ffc107] rounded-tr-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-[#00793A] rounded-bl-2xl" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* Placeholder image using gradient and overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00793A]/30 via-transparent to-transparent" />

                {/* Zoom on hover */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-xl bg-white/90 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #00793A, #00a84f)",
                        }}
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          ISO 9001:2015 Certified
                        </div>
                        <div className="text-xs text-gray-500">
                          Quality Assured Manufacturing
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3">
                      {["BWP Grade", "Marine Grade", "Fire Safe"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#00793A]/10 text-[#00793A]"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
