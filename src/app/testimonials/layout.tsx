import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Testimonials | SharonPly Reviews by Architects, Builders & Homeowners",
  description: "Read SharonPly testimonials from architects, interior designers, builders, contractors, dealers, and homeowners who trust SharonPly plywood, veneers, and doors for quality and lasting performance.",
  alternates: { canonical: "https://sharonply.com/testimonials" },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
