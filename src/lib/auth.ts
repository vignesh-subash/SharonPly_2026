import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "sharon_admin_session";
// No built-in fallbacks: without these settings admin login stays disabled.
const SECRET = process.env.ADMIN_SECRET;
const MAX_AGE = 60 * 60 * 24; // 24 hours

function sign(value: string): string {
  if (!SECRET) throw new Error("ADMIN_SECRET is not set");
  const hmac = createHmac("sha256", SECRET);
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

function verify(signed: string): string | null {
  if (!SECRET) return null;
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;
  const value = signed.slice(0, lastDot);
  const expected = sign(value);
  try {
    const a = Buffer.from(signed);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return value;
  } catch {
    return null;
  }
}

export async function checkAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass || !SECRET) {
    console.error("Admin login is disabled: set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SECRET.");
    return false;
  }
  return username === validUser && password === validPass;
}

export async function createSession(): Promise<string> {
  const payload = `admin:${Date.now()}`;
  return sign(payload);
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const value = verify(token);
  if (!value) return false;
  // Check token age
  const ts = parseInt(value.split(":")[1] ?? "0");
  if (Date.now() - ts > MAX_AGE * 1000) return false;
  return true;
}

export { COOKIE_NAME, MAX_AGE };
