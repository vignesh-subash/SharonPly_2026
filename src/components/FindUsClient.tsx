"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";

const OFFICES = [
  {
    label: "Corporate Headquarters",
    address: "#60, Sriman Srinivasan Road, Alwarpet",
    city: "Chennai, Tamil Nadu – 600018",
    phone: "+91 44 3940 3950",
    email: "admin@sharonply.com",
    type: "HQ",
  },
  {
    label: "South Regional Office",
    address: "Anna Salai, Teynampet",
    city: "Chennai, Tamil Nadu – 600006",
    phone: "+91 98400 10001",
    email: "south@sharonply.com",
    type: "Regional",
  },
  {
    label: "Andhra & Telangana Office",
    address: "Banjara Hills, Road No. 12",
    city: "Hyderabad, Telangana – 500034",
    phone: "+91 98490 10003",
    email: "aptel@sharonply.com",
    type: "Regional",
  },
];

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  region: string;
  photo_url: string | null;
  linkedin: string | null;
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const colors = ["#00793A", "#1a7fc0", "#8b5cf6", "#d97706", "#dc2626", "#0891b2"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ background: color }}>
      {initials}
    </div>
  );
}

export default function FindUsClient() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("All");

  useEffect(() => {
    fetch("/api/sales-team")
      .then(r => r.json())
      .then(d => setTeam(d.team ?? []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  // Region buttons follow the territories actually in the team list.
  const regions = useMemo(() => ["All", ...Array.from(new Set(team.map(m => m.region).filter(Boolean)))], [team]);
  const filtered = region === "All" ? team : team.filter(m => m.region?.includes(region) || m.region === region);

  return (
    <InnerPageLayout
      breadcrumbs={[{ label: "Find Us" }]}
      title="Our Sales Network"
      subtitle="Connect with our regional experts and office locations across South India"
      heroImage="/images/2026/pages/find-us-hero.webp"
    >
    <div className="bg-gray-50">

      {/* ── MAP + ADDRESS / HOURS ── */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden shadow-md border border-gray-200">
          {/* Map — 3/4 width */}
          <div className="lg:col-span-3 relative min-h-[400px] bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8585858585857!2d80.234567!3d13.04321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5268f123456789%3A0xabcdef1234567890!2sSharonPly%20Corporate%20Headquarters!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0, border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SharonPly Corporate Headquarters"
            />
          </div>

          {/* Address + Hours — 1/4 width */}
          <div className="bg-white p-6 lg:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#00793A] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Our Location</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                #60, Sriman Srinivasan Road, Alwarpet<br />
                Chennai, Tamil Nadu – 600018
              </p>
              <div className="mt-3 space-y-1.5">
                <a href="tel:+914439403950" className="flex items-center gap-2 text-sm text-[#00793A] hover:underline">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 44 3940 3950
                </a>
                <a href="mailto:admin@sharonply.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00793A]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  admin@sharonply.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#00793A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#00793A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Working Hours</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{item.day}</span>
                    <span className={`font-semibold ${item.hours === "Closed" ? "text-red-500" : "text-gray-900"}`}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Offices */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFICES.map(o => (
              <div key={o.label} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${o.type === "HQ" ? "bg-[#00793A]" : "bg-[#00793A]/10"}`}>
                    <svg className={`w-4 h-4 ${o.type === "HQ" ? "text-white" : "text-[#00793A]"}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{o.label}</h3>
                    {o.type === "HQ" && (
                      <span className="text-[10px] bg-[#ffc107] text-[#00793A] font-semibold px-2 py-0.5 rounded-full">Headquarters</span>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-gray-600 pl-11">
                  <p>{o.address}</p>
                  <p>{o.city}</p>
                  <a href={`tel:${o.phone}`} className="flex items-center gap-1.5 text-[#00793A] hover:underline">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="flex items-center gap-1.5 text-gray-500 hover:text-[#00793A]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {o.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sales Team */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sales Team</h2>
            <div className="flex flex-wrap gap-1.5">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    region === r
                      ? "bg-[#00793A] text-white"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-[#00793A]/40 hover:text-[#00793A]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0"/>
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3.5 bg-gray-100 rounded w-3/4"/>
                    <div className="h-3 bg-gray-100 rounded w-1/2"/>
                    <div className="h-3 bg-gray-100 rounded w-2/3"/>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No team members found for this region.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(m => (
                <div key={m.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow p-5 flex gap-4">
                  {m.photo_url ? (
                    <img src={m.photo_url} alt={m.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0"/>
                  ) : (
                    <InitialsAvatar name={m.name} />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{m.name}</h3>
                    {m.designation && <p className="text-xs text-[#00793A] font-medium">{m.designation}</p>}
                    {m.department && <p className="text-xs text-gray-400 mt-0.5">{m.department}</p>}
                    {m.region && (
                      <span className="inline-block mt-1.5 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{m.region}</span>
                    )}
                    <div className="mt-2.5 flex flex-col gap-1">
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#00793A] transition-colors">
                          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          {m.phone}
                        </a>
                      )}
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#00793A] truncate transition-colors">
                          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          <span className="truncate">{m.email}</span>
                        </a>
                      )}
                    </div>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-[10px] text-blue-600 hover:underline">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-[#00793A] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Become a SharonPly Dealer</h2>
          <p className="text-white/75 mb-6">Join our growing network of authorised dealers across South India</p>
          <Link href="/contact" className="inline-block bg-[#ffc107] text-[#00793A] font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors">
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
    </InnerPageLayout>
  );
}
