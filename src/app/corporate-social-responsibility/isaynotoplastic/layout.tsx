import type { Metadata } from "next";

export const metadata = {
  title: "#ISayNoToPlastic | SharonPly CSR Environmental Initiative",
  description: "Learn about SharonPly's #ISayNoToPlastic campaign — raising awareness about plastic waste and promoting sustainable alternatives for a cleaner planet.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
