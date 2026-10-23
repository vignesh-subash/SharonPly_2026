import type { Metadata } from "next";

export const metadata = {
  title: "Health Camps | SharonPly CSR",
  description: "SharonPly organizes targeted health initiatives for students, company workers, and contract employees — including cardiac screening camps and school h",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
