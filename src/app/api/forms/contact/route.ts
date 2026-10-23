import { NextRequest, NextResponse } from "next/server";
import { handleFormSubmission } from "@/lib/form-handler";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit check
  const rateLimit = checkRateLimit(req);
  const headers = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers }
    );
  }

  try {
    const body = await req.json();
    const result = await handleFormSubmission(req, {
      type: "contact",
      source: body.source ?? "contact_page",
      name: body.name,
      email: body.email,
      phone: body.phone,
      city: body.city,
      subject: body.subject,
      message: body.message,
      website: body.website,
    });

    return NextResponse.json({ ok: true, id: result.id }, { headers });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
