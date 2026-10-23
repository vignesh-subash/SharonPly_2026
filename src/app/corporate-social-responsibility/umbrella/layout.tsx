import type { Metadata } from "next";

export const metadata = {
  title: "Solar Umbrella Initiative | SharonPly CSR",
  description: "SharonPly distributes solar-powered umbrellas to street vendors at Marina Beach, Chennai — providing shade by day and light by night so vendors can op",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
