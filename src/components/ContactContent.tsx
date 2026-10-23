"use client";

import { useState } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import { submitForm } from "@/lib/submit-form";
import { validateContactForm } from "@/lib/validation";

// ── Premium outline SVG icons ──

function IconLocation({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.5-6.5 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconBuilding({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="15" y2="6" />
      <line x1="9" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="15" y2="14" />
      <path d="M9 18h1v4h-1z" />
      <path d="M14 18h1v4h-1z" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const SUBJECTS = [
  "Product Inquiry",
  "Dealer / Distributor Enquiry",
  "Technical Support",
  "Warranty Claim",
  "Order Status",
  "Complaint / Feedback",
  "Partnership Opportunity",
  "Career Inquiry",
  "Other",
];

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const validationErrors = validateContactForm(form);
    const e: Record<string, string> = {};
    for (const err of validationErrors) {
      e[err.field] = err.message;
    }
    setErrors(e);
    return validationErrors.length === 0;
  }

  function handleChange(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitForm({
        endpoint: "/api/forms/contact",
        formType: "contact",
        source: "contact_page",
        body: { ...form, source: "contact_page", website: "" },
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const inp = (k: string) =>
    `w-full px-4 py-[14px] rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all bg-white placeholder-gray-400 ${errors[k] ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Contact Us" }]}
      title="Let's Connect"
      subtitle="Whether you're an architect, builder, dealer, or homeowner — we'd love to hear from you. Reach out for product enquiries, technical support, or partnership opportunities."
      heroImage="/images/2026/pages/find-us-hero.webp"
    >
    <div className="bg-white" style={{ fontFamily: 'var(--font-brand)' }}>

      {/* ── MAP + CONTACT INFORMATION ── */}
      <div className="page-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10 items-start">

          {/* ── LEFT: Google Map (65%) ── */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.18!2d80.25307!3d13.04147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526648ffffffff%3A0xf6c90ae99ad27818!2sSharonPly!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="460"
              style={{ border: "none", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SharonPly Office Location"
            />
            <a href="https://maps.app.goo.gl/QvbnsMcUWwRV4k8FA" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#00793A] hover:bg-[#00793A]/5 transition-colors border-t border-gray-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Open in Google Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          {/* ── RIGHT: Contact Information (35%) ── */}
          <div className="space-y-8">

            {/* Administrative Office */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-[#00793A]/10 flex items-center justify-center text-[#00793A]">
                  <IconBuilding />
                </span>
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-wide">Administrative Office</h2>
              </div>
              <div className="pl-0 sm:pl-[52px] space-y-3 text-sm">
                <p className="text-gray-600 leading-relaxed">
                  #60, Sriman Srinivasan Road,<br />
                  Alwarpet, Chennai – 600 018,<br />
                  Tamil Nadu, India.
                </p>
                <div className="flex items-center gap-2">
                  <IconPhone className="w-4 h-4 text-[#00793A]" />
                  <a href="tel:+914439403950" className="text-gray-600 hover:text-[#00793A] transition-colors font-semibold">+91 44 3940 3950</a>
                </div>
                <div className="flex items-center gap-2">
                  <IconMail className="w-4 h-4 text-[#00793A]" />
                  <a href="mailto:admin@sharonply.com" className="text-gray-600 hover:text-[#00793A] transition-colors font-semibold">admin@sharonply.com</a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-[#00793A]/10 flex items-center justify-center text-[#00793A]">
                  <IconClock />
                </span>
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">Office Hours</h2>
              </div>
              <div className="pl-0 sm:pl-[52px] text-sm space-y-1.5">
                <div className="flex justify-between text-gray-600 gap-4">
                  <span>Monday – Saturday</span>
                  <span className="font-semibold text-gray-800 whitespace-nowrap">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-600 gap-4">
                  <span>Sunday</span>
                  <span className="font-semibold text-gray-800">Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CONTACT FORM ── */}
      <div className="border-t border-gray-100 bg-[#f8f9fa]">
        <div className="page-container py-14">
          <div className="max-w-3xl mx-auto">
            {/* Section heading */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm">Fill in your details and we&apos;ll get back to you at the earliest.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-10 h-10 text-[#00793A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-500 text-sm mb-8 max-w-xs">
                    Thank you, {form.name.split(" ")[0]}! Our team will reach out to you at {form.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", city: "", subject: "", message: "" }); }}
                    className="bg-[#00793A] text-white rounded-full px-8 py-3 font-bold text-sm hover:bg-[#005a2b] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  {submitError && (
                    <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{submitError}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={inp("name")}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className={inp("phone")}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        className={inp("email")}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => handleChange("city", e.target.value)}
                        placeholder="Your city"
                        className={inp("city")}
                      />
                      {errors.city && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => handleChange("subject", e.target.value)}
                      className={inp("subject") + " bg-white"}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.subject}</p>}
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                      <span>Your Message <span className="text-red-400">*</span></span>
                      <span className="font-normal normal-case text-gray-400">{form.message.length}/500</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => handleChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={3}
                      maxLength={500}
                      className={inp("message") + " resize-none"}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">⚠ {errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 ${
                      submitting
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#00793A] text-white hover:bg-[#005a2b] shadow-lg shadow-[#00793A]/20 hover:shadow-xl active:scale-[0.98]"
                    }`}
                  >
                    {submitting ? (
                      <><span className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" /> Sending your message...</>
                    ) : (
                      <>Submit Message <IconArrowRight /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
    </InnerPageLayout>
  );
}
