"use client";

import { trackLead } from "./analytics";

type FormType = "contact" | "enquiry" | "careers";

interface SubmitOptions {
  endpoint: `/api/forms/${FormType}`;
  body: Record<string, unknown> | FormData;
  formType: FormType;
  source?: string;
}

// The form APIs require a CSRF token (double-submit cookie): /api/csrf sets the cookie
// and returns the same token, which is sent back in the x-csrf-token header.
async function getCsrfToken(): Promise<string> {
  const res = await fetch("/api/csrf", { credentials: "same-origin", cache: "no-store" });
  if (!res.ok) throw new Error("Submission failed");
  const { token } = (await res.json()) as { token: string };
  return token;
}

export async function submitForm({ endpoint, body, formType, source }: SubmitOptions) {
  const isFormData = body instanceof FormData;
  const csrfToken = await getCsrfToken();

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "x-csrf-token": csrfToken,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? body : JSON.stringify({ ...body, source }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Submission failed");
  }

  trackLead(formType, source);
  return res.json();
}
