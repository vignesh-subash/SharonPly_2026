import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SharonPly Videos | Brand Films, Product Videos, CSR Stories & Campaigns",
  description: "Watch SharonPly videos including brand films, product videos, TV commercials, CSR stories, customer testimonials, technology videos, and campaign films.",
  alternates: { canonical: "https://sharonply.com/videos" },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
