import type { Metadata } from "next";

export const metadata = {
  title: "Clean-up Activities | SharonPly CSR",
  description: "SharonPly teams organize beach, park, and street clean-up drives — reinforcing environmental stewardship as a core value and inspiring communities to ",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
