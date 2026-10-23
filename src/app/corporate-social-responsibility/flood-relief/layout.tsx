import type { Metadata } from "next";

export const metadata = {
  title: "Flood Relief | SharonPly CSR",
  description: "SharonPly's flood relief activities in Tamil Nadu — distributing essential supplies, food, and aid to communities affected by annual flooding.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
