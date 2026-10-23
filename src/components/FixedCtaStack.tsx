"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { submitForm } from "@/lib/submit-form";

/* ─── Icons ──────────────────────────────────────────────────────── */
const EnquiryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);



/* ─── Desktop pill config ────────────────────────────────────────── */
const G = "#00793A";

type DesktopItem = {
  id: string; label: string; icon: React.ReactNode;
  href?: string; isExternal?: boolean; pulse?: boolean;
  action?: "enquiry";
};

const DESKTOP_ITEMS: DesktopItem[] = [
  { id: "enquiry",  label: "Quick Enquiry",    icon: <EnquiryIcon />,  action: "enquiry",   pulse: true  },
  { id: "whatsapp", label: "Chat on WhatsApp", icon: <WAIcon />,       href: "https://wa.me/914439403950", isExternal: true },
  { id: "call",     label: "+91 44 3940 3950", icon: <PhoneIcon />,    href: "tel:+914439403950" },
];

type Form = { name: string; mobile: string; city: string; email: string; message: string };
const EMPTY: Form = { name: "", mobile: "", city: "", email: "", message: "" };

export default function FixedCtaStack() {
  const [mounted, setMounted]       = useState(false);
  const [hovered, setHovered]       = useState<string | null>(null);
  const [panel, setPanel]           = useState<"enquiry" | null>(null);
  const [form, setForm]             = useState<Form>(EMPTY);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [heroGone, setHeroGone]     = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const enquiryBtnRef               = useRef<HTMLButtonElement>(null);
  const panelRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  /* Show after hero scrolls away */
  useEffect(() => {
    const hero = document.querySelector("main > div > *:first-child");
    if (!hero) { setHeroGone(true); return; }
    const obs = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), { threshold: 0 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, [mounted]);

  /* Detect when near bottom of page (within 300px) */
  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setOverFooter(docHeight - scrollBottom < 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  /* Close panel on outside click */
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (enquiryBtnRef.current?.contains(t)) return;
      setPanel(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [panel]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitForm({
        endpoint: "/api/forms/enquiry",
        formType: "enquiry",
        source: "fixed_cta",
        body: { ...form, mobile: form.mobile, source: "fixed_cta", website: "" },
      });
      setSubmitted(true);
      setTimeout(() => { setPanel(null); setSubmitted(false); setForm(EMPTY); }, 2800);
    } catch {
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const inputField = (name: keyof Form, label: string, placeholder: string, type = "text", required = false) => (
    <div key={name}>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
        {label}{required && " *"}
      </label>
      <input name={name} value={form[name]} onChange={change} type={type} placeholder={placeholder} required={required}
        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "#fafafa" }}
        onFocus={e => (e.target.style.borderColor = G)} onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
      />
    </div>
  );

  if (!mounted) return null;

  const pathname  = usePathname();
  const isHomepage = pathname === "/";
  const show      = overFooter;
  const pillBg    = overFooter ? "#fff" : G;
  const pillColor = overFooter ? G : "#fff";
  const pillGlow  = overFooter ? "rgba(0,0,0,0.10)" : "rgba(0,121,58,0.40)";

  return (
    <>
      {/* ════════════════════════════════════
          SLIDE-OUT PANEL (enquiry)
         ════════════════════════════════════ */}
      <div ref={panelRef} style={{
        position: "fixed", right: 58, top: "50%",
        transform: panel ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(20px)",
        opacity: panel ? 1 : 0, pointerEvents: panel ? "auto" : "none",
        transition: "transform 0.32s cubic-bezier(0.34,1.4,0.64,1), opacity 0.22s ease",
        zIndex: 1000, width: 308, background: "#fff",
        borderRadius: "16px 0 0 16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.16), 0 4px 16px rgba(0,121,58,0.10)",
        border: "1px solid rgba(0,121,58,0.08)", overflow: "hidden", display: "flex", flexDirection: "column",
      }}>
        {/* Panel header */}
        <div style={{ background: "linear-gradient(135deg,#00793A,#005a2b)", padding: "14px 16px 12px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
                "Quick Connect"
              </p>
              <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 800, margin: "3px 0 1px", lineHeight: 1.2 }}>
                "Make an Enquiry"
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", margin: 0 }}>
                "We'll get back within 24 hours"
              </p>
            </div>
            <button onClick={() => setPanel(null)}
              style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <CloseIcon />
            </button>
          </div>
          <div style={{ height: 3, background: "linear-gradient(90deg,#ffc107,#ff9800)", borderRadius: 2, marginTop: 10 }} />
        </div>

        {/* Panel body */}
        <div style={{ padding: "14px 16px 16px", overflowY: "auto", flex: 1 }}>



          {/* ── ENQUIRY panel ── */}
          {panel === "enquiry" && (
            submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,121,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p style={{ color: G, fontWeight: 800, fontSize: "15px", margin: "0 0 6px" }}>Enquiry Submitted!</p>
                <p style={{ color: "#777", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>Thank you! Our team will reach out to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {inputField("name",  "Full Name", "Your full name",   "text",  true)}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {inputField("mobile", "Mobile", "+91 XXXXX XXXXX",  "tel",   true)}
                  {inputField("city",   "City",   "Your city",        "text",  true)}
                </div>
                {inputField("email", "Email", "your@email.com", "email")}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Message</label>
                  <textarea name="message" value={form.message} onChange={change} rows={3}
                    placeholder="Tell us about your requirement..."
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", background: "#fafafa" }}
                    onFocus={e => (e.target.style.borderColor = G)} onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <button type="submit"
                  style={{ width: "100%", padding: "11px", borderRadius: 10, border: "none", background: G, color: "#fff", fontSize: "13px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.04em", marginTop: 2 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#005a2b")}
                  onMouseLeave={e => (e.currentTarget.style.background = G)}
                >
                  SEND ENQUIRY →
                </button>
                <p style={{ textAlign: "center", fontSize: "10px", color: "#aaa", margin: "2px 0 0" }}>Your data is safe. No spam.</p>
              </form>
            )
          )}
        </div>
      </div>

      {/* ════════════════════════════════════
          DESKTOP RIGHT PILL STACK
         ════════════════════════════════════ */}
      <div className="fixed z-[999] hidden md:flex flex-col items-end"
        style={{ right: 0, top: "50%", transform: "translateY(-50%)", gap: 8, opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none", transition: "opacity 0.4s ease" }}>
        {DESKTOP_ITEMS.map((item, idx) => {
          const open    = hovered === item.id;
          const active  = (item.action === "enquiry" && panel === "enquiry");

          const inner = (
            <>
              <span style={{
                flex: 1, paddingLeft: 14, fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)", letterSpacing: "0.2px", pointerEvents: "none",
                opacity: 1, transform: "translateX(0)",
                transition: "none",
              }}>
                {active ? (item.action === "enquiry" ? "Close Form" : "Close") : item.label}
              </span>
              <span style={{ width: 1, height: 22, background: "rgba(255,255,255,0.25)", flexShrink: 0, opacity: 1 }} />
              <div style={{
                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                transform: open ? "scale(1.16) rotate(-8deg)" : "scale(1)",
              }}>
                {active ? <CloseIcon /> : item.icon}
              </div>
            </>
          );

          const sharedStyle: React.CSSProperties = {
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            height: 48, width: 200,
            borderRadius: "24px 0 0 24px",
            background: active ? "#005a2b" : pillBg,
            color: active ? "#fff" : pillColor,
            overflow: "hidden", cursor: "pointer", textDecoration: "none",
            border: overFooter && !active ? `1.5px solid ${G}` : "none",
            boxShadow: open || active ? `0 6px 22px ${pillGlow}` : `0 3px 10px ${pillGlow}`,
            transition: "width 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.22s, background 0.18s, color 0.18s, transform 0.22s",
            transform: open ? "scale(1.04)" : "scale(1)",
          };

          const events = { onMouseEnter: () => setHovered(item.id), onMouseLeave: () => setHovered(null) };

          if (item.action === "enquiry") {
            return (
              <button key={item.id} ref={enquiryBtnRef}
                onClick={() => setPanel(p => p === "enquiry" ? null : "enquiry")}
                {...events} aria-label={item.label}
                className={`cta-pill${item.pulse && panel !== "enquiry" ? " cta-pulse" : ""}`}
                style={{ ...sharedStyle, animationDelay: `${idx * 0.08}s` }}>
                {inner}
              </button>
            );
          }

          return (
            <a key={item.id} href={item.href!}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              {...events} aria-label={item.label}
              className="cta-pill"
              style={{ ...sharedStyle, animationDelay: `${idx * 0.08}s` }}>
              {inner}
            </a>
          );
        })}
      </div>

      {/* ════════════════════════════════════
          MOBILE FLOATING ACTION BAR
          Compact pill-style, not full-width taskbar
         ════════════════════════════════════ */}
      {!isHomepage && (
        <div className="fixed z-[999] md:hidden"
          style={{
          bottom: 20, left: "50%", transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(80px)",
          opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
          transition: "transform 0.4s cubic-bezier(0.34,1.3,0.64,1), opacity 0.35s ease",
        }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(0,0,0,0.82)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderRadius: 50, padding: "8px 10px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}>
          {/* Quick Enquiry — highlighted CTA */}
          <button onClick={() => setPanel(p => p === "enquiry" ? null : "enquiry")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: G, color: "#fff", border: "none", borderRadius: 50,
              padding: "10px 18px 10px 14px", cursor: "pointer", fontWeight: 800, fontSize: "13px",
              letterSpacing: "0.3px", whiteSpace: "nowrap",
              boxShadow: panel === "enquiry" ? "none" : "0 2px 12px rgba(0,121,58,0.5)",
            }}>
            <EnquiryIcon />
            <span>Enquire Now</span>
          </button>

          {/* Divider */}
          <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

          {/* WhatsApp */}
          <a href="https://wa.me/914439403950" target="_blank" rel="noopener noreferrer"
            style={{ width: 44, height: 44, borderRadius: "50%", background: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
            <WAIcon />
          </a>

          {/* Call */}
          <a href="tel:+914439403950"
            style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
            <PhoneIcon />
          </a>
        </div>
      </div>
      )}

      {/* ════════════════════════════════════
          MOBILE ENQUIRY SHEET
         ════════════════════════════════════ */}
      {panel === "enquiry" && (
        <div className="fixed inset-0 z-[1001] md:hidden flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setPanel(null)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px 20px 36px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ width: 36, height: 4, background: "#e5e7eb", borderRadius: 2, margin: "0 auto 16px" }} />
            <h3 style={{ fontWeight: 800, fontSize: "17px", color: G, margin: "0 0 4px" }}>Quick Enquiry</h3>
            <p style={{ fontSize: "12px", color: "#888", margin: "0 0 16px" }}>We'll get back to you within 24 hours.</p>
            {submitted ? (
              <p style={{ color: G, fontWeight: 700, textAlign: "center", padding: "20px 0" }}>Submitted! We'll be in touch soon.</p>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(["name","mobile","city","email"] as const).map(f => (
                  <input key={f} name={f} value={form[f]} onChange={change}
                    type={f === "mobile" ? "tel" : f === "email" ? "email" : "text"}
                    placeholder={{ name: "Full name", mobile: "+91 XXXXX XXXXX", city: "Your city", email: "your@email.com" }[f]}
                    required={f !== "email"}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                ))}
                <textarea name="message" value={form.message} onChange={change} rows={3} placeholder="Your message..."
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: "14px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                <button type="submit" style={{ padding: 13, borderRadius: 12, border: "none", background: G, color: "#fff", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}>
                  SEND ENQUIRY →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cta-pill { animation: pillIn 0.5s cubic-bezier(0.34,1.4,0.64,1) both; }
        @keyframes pillIn {
          from { transform: translateX(56px) scale(0.78); opacity: 0; }
          to   { transform: translateX(0) scale(1);       opacity: 1; }
        }
        .cta-pulse { animation: pillIn 0.5s cubic-bezier(0.34,1.4,0.64,1) both, pulse 2.8s ease-in-out 0.8s infinite; }
        @keyframes pulse {
          0%,100% { box-shadow: 0 3px 10px rgba(0,121,58,0.40); }
          50%      { box-shadow: 0 3px 20px rgba(0,121,58,0.70), 0 0 0 5px rgba(0,121,58,0.10); }
        }
        .cta-pulse:hover { animation: none; }
      `}</style>
    </>
  );
}
