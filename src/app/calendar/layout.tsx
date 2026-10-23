import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SharonPly Calendar | View & Download Official Calendar",
  description: "View and download the official SharonPly calendar. Explore the latest SharonPly calendar with brand visuals, product inspiration, and monthly reference.",
  alternates: { canonical: "https://sharonply.com/calendar" },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
