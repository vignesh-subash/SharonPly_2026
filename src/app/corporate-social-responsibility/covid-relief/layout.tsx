import type { Metadata } from "next";

export const metadata = {
  title: "COVID-19 Relief | SharonPly CSR",
  description: "During the COVID-19 pandemic, SharonPly rose to the occasion with a firm commitment to public health — distributing essentials and supporting affected",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
