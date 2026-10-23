import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR Initiatives | SharonPly Social Responsibility & Community Impact",
  description: "Explore SharonPly's CSR initiatives across education, environment, health, safety, animal welfare, and community support, including #iamstrongest, #isaynotoplastic, #quenchthethirst, and more.",
  alternates: { canonical: "https://sharonply.com/corporate-social-responsibility" },
};

export default function CsrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
