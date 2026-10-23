import type { Metadata } from "next";

export const metadata = {
  title: "Quench The Thirst | SharonPly CSR Initiative for Birds & Animals",
  description: "Learn about SharonPly's #quenchthethirst initiative, supporting birds and stray animals during summer through water bowl distribution and community participation.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
