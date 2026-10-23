"use client";

import { useState, useEffect } from "react";
import { submitForm } from "@/lib/submit-form";

export default function StickyFormBar() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitForm({
        endpoint: "/api/forms/enquiry",
        formType: "enquiry",
        source: "sticky_bar",
        body: { ...formData, source: "sticky_bar", website: "" },
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", city: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 z-40 bottom-[60px] md:bottom-0">
      <div className="backdrop-blur-2xl bg-white border-t border-[#00793A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Mobile: Compact layout */}
          <div className="lg:hidden">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#00793A]">
                      Expert Advices are within your reach!
                    </span>
                </div>
                <span className="text-[#00793A]/60 text-xs group-open:rotate-180 transition-transform">
                  ▲
                </span>
              </summary>
              <form
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col gap-2"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitted || submitting}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00793A] to-[#00a04d] hover:from-[#005c2c] hover:to-[#00793A] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#00793A]/20 disabled:opacity-70"
                >
                  {submitted ? "✓ Request Sent!" : "Reach us!"}
                </button>
                <div className="flex items-center justify-center gap-3 text-[10px] text-[#00793A]/60">
                  <span>🔒 100% Secure</span>
                  <span>•</span>
                  <span>✅ Instant Callback</span>
                  <span>•</span>
                  <span>🏆 Best Price</span>
                </div>
              </form>
            </details>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:block">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-4">
                {/* Heading */}
                <div className="shrink-0">
                    <p className="text-sm font-semibold text-[#00793A] whitespace-nowrap">
                      Expert Advices are within your reach!
                    </p>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-[#00793A]/20 shrink-0" />

                {/* Form Fields */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white border border-[#00793A]/30 text-[#00793A] text-sm placeholder:text-[#00793A]/40 focus:outline-none focus:border-[#00793A]/60 focus:ring-1 focus:ring-[#00793A]/30 transition-colors"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitted || submitting}
                  className="shrink-0 px-6 py-2 rounded-lg bg-gradient-to-r from-[#00793A] to-[#00a04d] hover:from-[#005c2c] hover:to-[#00793A] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#00793A]/20 hover:shadow-[#00793A]/40 disabled:opacity-70"
                >
                  {submitted ? "✓ Sent!" : "Reach us!"}
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-[#00793A]/20 shrink-0" />

                {/* Trust Badges */}
                <div className="shrink-0 flex items-center gap-2 text-[10px] text-[#00793A]/60">
                  <span>🔒 Secure</span>
                  <span>✅ Callback</span>
                  <span>🏆 Best Price</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
