"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submit-form";
import { ALL_RECOGNITIONS } from "@/data/recognitions";

const G = "#00793A";

const VALUES = [
  { id: "01", title: "Empowerment", desc: "We trust our people with responsibility and give them the autonomy to make decisions that drive real impact.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { id: "02", title: "Excellence", desc: "From raw material selection to finished product, we pursue the highest standards in everything we do.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "03", title: "Integrity", desc: "Honest dealings, transparent communication, and ethical practices form the foundation of our workplace.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "04", title: "Passion", desc: "We take pride in the quality that goes into every sheet of plywood we manufacture since 1987.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { id: "05", title: "Respect", desc: "A diverse team across manufacturing, sales, design, and technology — everyone's contribution matters.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
];

const DEPARTMENTS = [
  "Sales & Business Development",
  "Manufacturing & Production",
  "Quality Assurance",
  "Logistics & Supply Chain",
  "Design & Marketing",
  "Finance & Accounts",
  "Human Resources",
  "Information Technology",
];

const OPEN_ROLES = [
  {
    title: "Area Sales Manager",
    dept: "Sales & Business Development",
    location: "Chennai / Coimbatore / Madurai",
    type: "Full-time",
    exp: "3–7 years",
    qualification: "MBA / Graduate",
    desc: "Drive dealer network expansion, manage key accounts, and grow Sharon Ply's market share across your territory.",
  },
  {
    title: "Production Supervisor",
    dept: "Manufacturing & Production",
    location: "Factory – Villupuram, Tamil Nadu",
    type: "Full-time",
    exp: "4–8 years",
    qualification: "Diploma / B.Eng",
    desc: "Oversee plywood and door manufacturing lines, ensure quality standards, manage shift operations and team efficiency.",
  },
  {
    title: "Quality Control Inspector",
    dept: "Quality Assurance",
    location: "Factory – Villupuram, Tamil Nadu",
    type: "Full-time",
    exp: "2–5 years",
    qualification: "B.Sc / Diploma",
    desc: "Monitor incoming raw materials and finished products against IS:303 / IS:2202 standards. Document test results and coordinate corrective actions.",
  },
  {
    title: "Digital Marketing Executive",
    dept: "Design & Marketing",
    location: "Chennai (Head Office)",
    type: "Full-time",
    exp: "1–3 years",
    qualification: "Graduate",
    desc: "Manage social media channels, run performance campaigns, produce content for architects, designers, and homeowners.",
  },
  {
    title: "Accounts Executive",
    dept: "Finance & Accounts",
    location: "Chennai (Head Office)",
    type: "Full-time",
    exp: "2–4 years",
    qualification: "B.Com / M.Com",
    desc: "Handle AR/AP, GST filings, vendor reconciliation, and monthly MIS reporting for the sales division.",
  },
  {
    title: "Logistics Coordinator",
    dept: "Logistics & Supply Chain",
    location: "Chennai / Villupuram",
    type: "Full-time",
    exp: "2–4 years",
    qualification: "Graduate",
    desc: "Coordinate outbound shipments, track delivery SLAs, liaise with transporters, and maintain ERP records.",
  },
];

const DEPT_COLORS: Record<string, string> = {
  "Sales & Business Development": "#00793A",
  "Manufacturing & Production": "#b45309",
  "Quality Assurance": "#0369a1",
  "Design & Marketing": "#7c3aed",
  "Finance & Accounts": "#0f766e",
  "Logistics & Supply Chain": "#b91c1c",
  "Human Resources": "#4f46e5",
  "Information Technology": "#0891b2",
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  experience: string;
};
const EMPTY: FormData = {
  name: "", email: "", phone: "", experience: "",
};

export default function CareersContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<null | typeof OPEN_ROLES[0]>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const filtered = activeFilter === "All"
    ? OPEN_ROLES
    : OPEN_ROLES.filter(r => r.dept === activeFilter);

  const depts = ["All", ...Array.from(new Set(OPEN_ROLES.map(r => r.dept)))];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("experience", form.experience);
      fd.append("role", selected?.title ?? "");
      fd.append("source", "careers_page");
      if (resumeFile) fd.append("resume", resumeFile);

      await submitForm({
        endpoint: "/api/forms/careers",
        formType: "careers",
        source: "careers_page",
        body: fd,
      });

      setSubmitted(true);
      setTimeout(() => { setSelected(null); setSubmitted(false); setForm(EMPTY); setResumeFile(null); }, 3500);
    } catch {
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ── CORE VALUES ── */}
      <section className="py-20 bg-[#f8fdf9]">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">What We Stand For</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Five core values that guide everything we do — from the factory floor to the boardroom.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VALUES.map((v) => (
              <div key={v.id} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Icon area */}
                <div className="p-6 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-[#f0faf4] flex items-center justify-center mb-4 group-hover:bg-[#00793A] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#00793A] group-hover:text-white transition-colors duration-300">
                      <path d={v.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed pb-6">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOGNITION ── */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Recognised for Our People</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Great Place to Work® Certified three years running, and named among India’s Best Workplaces™ in Manufacturing, Building Materials, Consumer Durables and for Millennials.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {ALL_RECOGNITIONS.map((r) => (
              <figure key={r.img} className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="w-full aspect-square flex items-center justify-center">
                  <img src={r.img} alt={`${r.title}, ${r.period}: SharonPly`} loading="lazy" className="max-w-full max-h-full object-contain" />
                </div>
                <figcaption className="mt-3">
                  <span className="block text-xs font-bold text-gray-900 leading-snug">{r.title}</span>
                  <span className="block text-[11px] font-semibold text-[#00793A]">{r.period}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="open-roles" className="py-20 bg-white">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Current Opening</h2>
              <p className="text-gray-500 text-sm mt-1">Explore Latest Jobs</p>
            </div>
            <p className="text-sm text-gray-500">{OPEN_ROLES.length} positions available</p>
          </div>

          {/* Department filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {depts.map(d => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                style={{
                  background: activeFilter === d ? G : "transparent",
                  color: activeFilter === d ? "#fff" : "#555",
                  border: activeFilter === d ? `1.5px solid ${G}` : "1.5px solid #e5e7eb",
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Role cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((role, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                onClick={() => setSelected(role)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-black text-gray-900 mb-1.5">{role.title}</h3>
                    <span className="inline-flex text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${DEPT_COLORS[role.dept] ?? G}18`, color: DEPT_COLORS[role.dept] ?? G }}>
                      {role.dept}
                    </span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" className="w-5 h-5 flex-shrink-0 mt-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{role.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {role.exp}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    {role.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                    {role.qualification}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="py-16 bg-[#f8fdf9]">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Departments We Hire In</h2>
            <p className="text-gray-500 text-sm">From the factory floor to the boardroom — we hire across every function.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DEPARTMENTS.map(d => (
              <div key={d} className="bg-white rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-100 flex items-center gap-2 hover:border-[#00793A]/30 hover:shadow-sm transition-all">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: DEPT_COLORS[d] ?? G }} />
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Do you wish to be a part of the Sharon Ply team?</h2>
            <p className="text-gray-500 text-sm">Go ahead and tell us about it!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone <span className="text-red-500">*</span></label>
                <input required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Years of Experience <span className="text-red-500">*</span></label>
                <input required value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} type="text" placeholder="e.g. 5 years" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Attach Resume <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  required
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setResumeFile(e.target.files?.[0] ?? null)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#f0faf4] file:text-[#00793A] hover:file:bg-[#d0e8d8] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00793A]/20 focus:border-[#00793A]"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Accepted formats: PDF, DOC, DOCX</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#00793A]/20"
              style={{ background: "linear-gradient(135deg, #00793A, #005a2b)" }}
            >
              {submitted ? "Application Submitted!" : "Submit Application →"}
            </button>
            <p className="text-xs text-gray-400 text-center">Our HR team responds within 5 working days.</p>
          </form>
        </div>
      </section>

      {/* ── APPLY MODAL (for role cards) ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-7 border-b border-gray-100 flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex text-xs font-bold px-2.5 py-1 rounded-full mb-2" style={{ background: `${DEPT_COLORS[selected.dept] ?? G}18`, color: DEPT_COLORS[selected.dept] ?? G }}>
                  {selected.dept}
                </span>
                <h2 className="text-xl font-black text-gray-900">{selected.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{selected.location} · {selected.exp}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-7">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 text-sm">Thank you! Our HR team will reach out within 5 working days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} type="text" placeholder="Your name" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00793A]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Phone *</label>
                      <input required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00793A]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} type="email" placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00793A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Years of Experience</label>
                    <input value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} type="text" placeholder="e.g. 5 years" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00793A]" />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: G }}>
                    Submit Application →
                  </button>
                  <p className="text-xs text-gray-400 text-center">Our HR team responds within 5 working days.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}