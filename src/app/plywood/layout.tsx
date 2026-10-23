import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plywood | Premium BWP & MR Grade | SharonPly",
  description: "Explore SharonPly's complete plywood range — from premium BWP marine-grade to economical MR options. IS:710 & IS:303 certified plywood for every application.",
  alternates: { canonical: "https://sharonply.com/plywood" },
};

export default function PlywoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
