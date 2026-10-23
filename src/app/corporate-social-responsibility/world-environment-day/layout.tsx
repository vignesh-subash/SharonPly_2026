import type { Metadata } from "next";

export const metadata = {
  title: "World Environment Day | SharonPly CSR",
  description: "At SharonPly, World Environment Day is more than a date — it is a reaffirmation of our enduring commitment to environmental responsibility and sustain",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
