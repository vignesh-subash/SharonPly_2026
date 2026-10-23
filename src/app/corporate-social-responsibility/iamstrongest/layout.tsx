import type { Metadata } from "next";

export const metadata = {
  title: "#IAmStrongest | SharonPly CSR Initiative Celebrating Real Heroes",
  description: "Learn about SharonPly's #IAmStrongest initiative — annual awards recognising stories of grit, courage, and strength from ordinary people doing extraordinary things.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
