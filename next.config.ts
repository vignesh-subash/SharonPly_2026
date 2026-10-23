import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // ── SEO: 301 redirects (live-site URL preservation) ─────────────────────
  async redirects() {
    return [
      // Catch any WordPress-style trailing slashes Google may have indexed
      { source: "/:path+/", destination: "/:path+", permanent: true },

      // TODO: Any external backlinks to sharon-gold-mr (e.g. from Google, distributors,
      // old marketing materials) will automatically 301 to Sovereign MR.
      { source: "/plywood/sharon-gold-mr", destination: "/plywood/sovereign-mr", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/our-history", permanent: true },
    ];
  },

  // ── Security + Cache headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          ...(!isDev ? [{ key: "X-Frame-Options", value: "SAMEORIGIN" }] : []),
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Cache images
      {
        source: "/images/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      // Cache PDFs
      {
        source: "/pdfs/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Build guards enabled for production safety
  // TODO: Fix any TypeScript/ESLint errors before removing these flags
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    webpackMemoryOptimizations: true,
    optimizePackageImports: [
      "lucide-react",
      "gsap"
    ],
  },
  ...(isDev && {
    turbopack: {
      resolveAlias: {
        "motion": "motion/dist/cjs/index.js",
        "motion/react": "motion/dist/cjs/react-client.js",
      },
    },
  }),
};

export default nextConfig;
