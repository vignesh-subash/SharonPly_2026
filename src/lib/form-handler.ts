import { NextRequest } from "next/server";
import { ensureDb, formSubmissions } from "./db";
import { buildFormEmail, sendFormNotification } from "./mail";
import { validateCsrfToken, validateOrigin } from "./csrf";

export interface FormPayload {
  type: "contact" | "enquiry" | "careers";
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  subject?: string;
  message?: string;
  product?: string;
  role?: string;
  experience?: string;
  website?: string;
  metadata?: Record<string, unknown>;
}

export function isHoneypotTriggered(payload: { website?: string }) {
  return Boolean(payload.website?.trim());
}

export async function handleFormSubmission(req: NextRequest, payload: FormPayload) {
  // Validate CSRF token
  const csrfValid = await validateCsrfToken(req);
  if (!csrfValid) {
    throw new Error("CSRF validation failed");
  }

  // Validate origin
  if (!validateOrigin(req)) {
    throw new Error("Invalid origin");
  }

  if (isHoneypotTriggered(payload)) {
    return { ok: true as const, id: 0 };
  }

  // Save and email independently, so a database outage still delivers the enquiry by email.
  let id: number | null = null;
  try {
    const db = await ensureDb();
    const [result] = await db.insert(formSubmissions).values({
      type: payload.type,
      source: payload.source ?? null,
      name: payload.name ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      city: payload.city ?? null,
      subject: payload.subject ?? null,
      message: payload.message ?? null,
      product: payload.product ?? null,
      role: payload.role ?? null,
      experience: payload.experience ?? null,
      metadata: payload.metadata ?? null,
    });
    id = Number(result.insertId);
  } catch (err) {
    console.error("Form submission could not be saved:", err);
  }

  const typeLabel =
    payload.type === "contact" ? "Contact Form" :
    payload.type === "careers" ? "Careers Application" :
    "Product Enquiry";

  const subject = `[SharonPly] ${typeLabel}${payload.product ? ` — ${payload.product}` : ""}`;

  let emailed = false;
  try {
    emailed = await sendFormNotification({
      subject,
      replyTo: payload.email,
      html: buildFormEmail({
        Type: typeLabel,
        Source: payload.source,
        Name: payload.name,
        Email: payload.email,
        Phone: payload.phone,
        City: payload.city,
        Subject: payload.subject,
        Product: payload.product,
        Role: payload.role,
        Experience: payload.experience,
        Message: payload.message,
      }),
    });
  } catch (err) {
    console.error("Form email failed:", err);
  }

  if (id === null && !emailed) {
    throw new Error("Submission was neither saved nor emailed");
  }

  return { ok: true as const, id: id ?? 0 };
}
