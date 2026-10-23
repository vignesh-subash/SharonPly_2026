import DealersClient from "@/components/DealersClient";
import { getPublicDealers } from "@/lib/dealers";

// Read the dealer list on every request so admin panel changes show immediately.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Find Dealers – SharonPly | Dealer Locator",
  description: "Locate SharonPly dealers near you. Search by state, city or division across Tamil Nadu, Pondicherry, Andhra Pradesh and Telangana.",
};

export default async function DealersPage() {
  return <DealersClient dealers={await getPublicDealers()} />;
}
