import { NextResponse } from "next/server";
import { generateCsrfToken, getCsrfCookieOptions } from "@/lib/csrf";

export async function GET() {
  const token = await generateCsrfToken();
  const options = getCsrfCookieOptions();

  const response = NextResponse.json({ token });
  
  response.cookies.set({
    name: options.name,
    value: token,
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
    maxAge: options.maxAge,
    path: options.path,
  });

  return response;
}
