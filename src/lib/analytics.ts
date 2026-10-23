"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead(formType: string, source?: string) {
  const payload = {
    event: "generate_lead",
    form_type: formType,
    form_source: source ?? "unknown",
  };

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);

    if (window.gtag) {
      window.gtag("event", "generate_lead", {
        form_type: formType,
        form_source: source ?? "unknown",
      });
    }
  }
}
