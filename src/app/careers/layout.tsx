import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at SharonPly | Job Openings & Career Opportunities",
  description: "Explore career opportunities at SharonPly across sales, marketing, manufacturing, quality, logistics, administration, and support functions. Apply online or submit your resume.",
  alternates: { canonical: "https://sharonply.com/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
