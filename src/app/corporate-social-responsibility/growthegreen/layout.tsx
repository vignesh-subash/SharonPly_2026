import type { Metadata } from "next";

export const metadata = {
  title: "Grow The Green | SharonPly CSR Tree Plantation Initiative",
  description: "Learn about SharonPly's #GrowTheGreen initiative — a decade-long commitment to distributing saplings and creating greener communities across India.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
