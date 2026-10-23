import type { Metadata } from "next";
import TechnologiesStrip from "@/components/TechnologiesStrip";

export const metadata: Metadata = {
  title: "Technology | VIRASAFE, FIRESAVE, E-Zero & Kyoto Pro-Tech | SharonPly",
  description: "Discover SharonPly's advanced plywood technologies — VIRASAFE antiviral protection, FIRESAVE fire retardant, E-Zero low emission, and Kyoto Pro-Tech Japanese bonding technology for superior performance and safety.",
  alternates: { canonical: "https://sharonply.com/technology" },
};

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TechnologiesStrip />
    </div>
  );
}
