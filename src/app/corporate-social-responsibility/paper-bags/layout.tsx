import type { Metadata } from "next";

export const metadata = {
  title: "Paper Bags Distribution | SharonPly CSR",
  description: "SharonPly distributes paper bags to the public to reduce plastic usage — aligned with the #ISayNoToPlastic campaign and a broader commitment to sustai",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
