import SalesTeamClient from "@/components/SalesTeamClient";
import { getPublicSalesTeam } from "@/lib/salesTeam";

// Read the team on every request so admin panel changes show immediately.
export const dynamic = "force-dynamic";

export default async function SalesTeamPage() {
  return <SalesTeamClient team={await getPublicSalesTeam()} />;
}
