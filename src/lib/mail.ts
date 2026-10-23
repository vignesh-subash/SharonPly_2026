import nodemailer from "nodemailer";

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  _transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT ?? "465", 10),
    secure: process.env.SMTP_PORT !== "587",
    auth: { user, pass },
  });

  return _transporter;
}

export async function sendFormNotification({ subject, html, replyTo }: MailOptions) {
  const transporter = getTransporter();
  // All contact, enquiry and careers submissions go to admin@sharonply.com unless overridden.
  const to = process.env.FORM_NOTIFY_EMAIL || "admin@sharonply.com";
  if (!transporter || !to) return false;

  await transporter.sendMail({
    from: `"SharonPly Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });

  return true;
}

export function buildFormEmail(fields: Record<string, string | undefined>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#374151">${k}</td><td style="padding:6px 12px;color:#111827">${v}</td></tr>`)
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#00793A;margin:0 0 16px">New Website Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:8px">
        ${rows}
      </table>
    </div>
  `;
}
