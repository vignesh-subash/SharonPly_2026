/**
 * CSRF Protection utilities for form submissions.
 * Uses the Double Submit Cookie pattern for stateless CSRF protection.
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const CSRF_SECRET = process.env.CSRF_SECRET ?? process.env.ADMIN_SECRET ?? 'default-csrf-secret';
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Simple HMAC-based token generation
async function generateToken(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = encoder.encode(CSRF_SECRET);
  const data = encoder.encode(payload + CSRF_SECRET);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Create token: payload.signature
  return `${Buffer.from(payload).toString('base64url')}.${signatureHex.slice(0, 32)}`;
}

// Verify token
async function verifyToken(token: string): Promise<boolean> {
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return false;
  
  const payload = Buffer.from(token.slice(0, lastDot), 'base64url').toString();
  const expected = await generateToken(payload);
  
  // Constant-time comparison
  if (token.length !== expected.length) return false;
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

// Generate a new CSRF token
export async function generateCsrfToken(): Promise<string> {
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));
  const payload = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return generateToken(payload + ':' + Date.now().toString(36));
}

// Get CSRF token from cookies (for server components)
export async function getCsrfTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CSRF_COOKIE_NAME);
  return cookie?.value ?? null;
}

// Validate CSRF token from request
export async function validateCsrfToken(request: NextRequest): Promise<boolean> {
  // Get token from header
  const token = request.headers.get(CSRF_HEADER_NAME);
  if (!token) return false;
  
  // Get secret from cookie
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (!cookieToken) return false;
  
  // Verify tokens match (double submit)
  if (token !== cookieToken) return false;
  
  // Verify token signature
  return verifyToken(token);
}

// Get CSRF token for client-side
export async function getCsrfTokenForClient(): Promise<string> {
  const token = await generateCsrfToken();
  return token;
}

// CSRF validation middleware helper
export function getCsrfCookieOptions() {
  return {
    name: CSRF_COOKIE_NAME,
    httpOnly: false, // Must be readable by JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 2, // 2 hours
    path: '/',
  };
}

// Validate origin header (additional CSRF protection)
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  // In production, verify origin matches expected site
  if (process.env.NODE_ENV === 'production') {
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '');
    if (origin && host && origin !== `https://${host}` && origin !== `http://${host}`) {
      return false;
    }
  }
  
  return true;
}

export { CSRF_HEADER_NAME };
