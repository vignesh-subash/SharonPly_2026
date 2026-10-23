import { asc, eq } from "drizzle-orm";
import { ensureDb, salesTeam } from "./db";
import { SALES_TEAM, type SalesPerson } from "@/data/salesTeam";

const splitList = (value: string | null) =>
  (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);

/** Active sales team for /contact/sales-team, in display order. */
export async function getPublicSalesTeam(): Promise<SalesPerson[]> {
  try {
    const db = await ensureDb();
    const rows = await db
      .select()
      .from(salesTeam)
      .where(eq(salesTeam.active, true))
      .orderBy(asc(salesTeam.sortOrder), asc(salesTeam.id));
    return rows.map((r) => ({
      name: r.name,
      designation: r.designation ?? "",
      phone: r.phone ?? "",
      email: r.email ?? "",
      division: r.division === "Veneer" ? "Veneer" : "Plywood",
      territory: r.region ?? "",
      cities: splitList(r.cities),
    }));
  } catch (err) {
    console.error("Sales team page: database unavailable, showing the built-in team:", err);
    return SALES_TEAM;
  }
}
