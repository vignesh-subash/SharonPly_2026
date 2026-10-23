import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos & Media | SharonPly TVCs, Brand Films & Press Coverage",
  description: "Watch SharonPly videos — TVCs, technology demos, brand stories, #IAmStrongest campaigns. Browse press coverage, media mentions, and brand news.",
  alternates: { canonical: "https://sharonply.com/videos" },
};

export default function MediaPressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
