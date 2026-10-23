import type { Metadata } from "next";

export const metadata = {
  title: "Free Helmet Distribution | SharonPly CSR",
  description: "SharonPly promotes road safety through free helmet distribution drives, encouraging safer commuting habits and reducing head injury risks.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
