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
    const contentType = req.headers.get("content-type") ?? "";
    let name: string | undefined;
    let email: string | undefined;
    let phone: string | undefined;
    let experience: string | undefined;
    let role: string | undefined;
    let source = "careers_page";
    let website: string | undefined;
    let metadata: Record<string, unknown> | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = formData.get("name")?.toString();
      email = formData.get("email")?.toString();
      phone = formData.get("phone")?.toString();
      experience = formData.get("experience")?.toString();
      role = formData.get("role")?.toString();
      source = formData.get("source")?.toString() ?? "careers_page";
      website = formData.get("website")?.toString();

      const resume = formData.get("resume");
      if (resume instanceof File && resume.size > 0) {
        metadata = {
          resumeName: resume.name,
          resumeSize: resume.size,
          resumeType: resume.type,
        };
      }
    } else {
      const body = await req.json();
      name = body.name;
      email = body.email;
      phone = body.phone;
      experience = body.experience;
      role = body.role;
      source = body.source ?? "careers_page";
      website = body.website;
      metadata = body.metadata;
    }

    const result = await handleFormSubmission(req, {
      type: "careers",
      source,
      name,
      email,
      phone,
      experience,
      role,
      website,
      metadata,
    });

    return NextResponse.json({ ok: true, id: result.id }, { headers });
  } catch (err) {
    console.error("Careers form error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
