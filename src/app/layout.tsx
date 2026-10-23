import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import ClientShell from "@/components/ClientShell";
import ScrollProgress from "@/components/ScrollProgress";
import GoogleTagManager from "@/components/GoogleTagManager";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharonply.com";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/images/elephant-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/elephant-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/images/elephant-icon-192.png", sizes: "192x192", type: "image/png" },
    shortcut: "/images/elephant-icon-192.png",
  },
  title: {
    default: "SharonPly - Premium BWP & Marine Plywood Manufacturer Since 1987",
    template: "%s | SharonPly",
  },
  description:
    "Premium BWP & Marine Plywood with VIRASAFE antiviral & FIRESAFE technology. ISO certified. Products: Plywood, Doors, Teak, Veneer.",
  keywords:
    "plywood, BWP plywood, marine plywood, SharonPly, waterproof plywood, VIRASAFE, FIRESAFE, plywood manufacturer India, flush doors, teak plywood, veneer, sharon ply, plywood company Chennai",
  authors: [{ name: "SharonPly", url: "https://sharonply.com" }],
  creator: "SharonPly",
  publisher: "SharonPly",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharonply.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "SharonPly",
    title: "SharonPly - Premium BWP & Marine Plywood",
    description: "Premium BWP & Marine Plywood with VIRASAFE & FIRESAFE technology. Trusted by architects since 1987.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SharonPly - Premium BWP & Marine Plywood Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SharonPly - Premium BWP Plywood Manufacturer",
    description: "Premium BWP & Marine Plywood with VIRASAFE & FIRESAFE technology. Trusted by architects since 1987.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Replace with actual GSC HTML-tag verification code from
    // Google Search Console → Settings → Ownership verification → HTML tag
    // e.g. google: "abc123xyz_your_actual_code_here",
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          suppressHydrationWarning
          className="antialiased"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <GoogleTagManager />

        {/* ── Google Analytics 4 ─────────────────────────────────────────
            Replace G-XXXXXXXXXX with your GA4 Measurement ID.
            Set NEXT_PUBLIC_GA4_ID in .env.local (dev) and in your hosting
            environment variables (production).
        ────────────────────────────────────────────────────────────────── */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              id="ga4-load"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}
          <Script
            id="structured-data-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "SharonPly",
                url: "https://sharonply.com",
                logo: `${SITE_URL}/images/sharon-corporate-logo.webp`,
                foundingDate: "1987",
                description: "Premium BWP & Marine Plywood manufacturer since 1987 with VIRASAFE & FIRESAFE technology.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "#60, Sriman Srinivasan Road, Alwarpet",
                  addressLocality: "Chennai",
                  addressRegion: "Tamil Nadu",
                  postalCode: "600018",
                  addressCountry: "IN",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+91-4439403950",
                    contactType: "customer service",
                    areaServed: "IN",
                    availableLanguage: ["English", "Tamil", "Hindi"],
                  },
                ],
                sameAs: [
                  "https://www.facebook.com/SharonPlyIndia",
                  "https://www.instagram.com/sharonplyindia",
                  "https://www.youtube.com/sharonply",
                  "https://www.linkedin.com/company/sharonplyindia",
                ],
              }),
            }}
          />
        <ScrollProgress />
        <ClientShell>{children}</ClientShell>

        </body>
    </html>
  );
}