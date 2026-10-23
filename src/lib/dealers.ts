import { asc, eq } from "drizzle-orm";
import { ensureDb, dealers } from "./db";
import { DEALERS, type Dealer } from "@/data/dealers";

// The admin panel stores multiple contacts, phones and emails as comma-separated text.
const splitList = (value: string | null) =>
  (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);

/** Active dealers for the public dealer locator, in the order they were added. */
export async function getPublicDealers(): Promise<Dealer[]> {
  try {
    const db = await ensureDb();
    const rows = await db
      .select()
      .from(dealers)
      .where(eq(dealers.active, true))
      .orderBy(asc(dealers.id));
    return rows.map((r) => ({
      name: r.name,
      contacts: splitList(r.contactPerson),
      address: r.address ?? "",
      city: r.city,
      state: r.state,
      pincode: r.pincode ?? "",
      phones: splitList(r.phone),
      emails: splitList(r.email),
      division: r.division === "Both" ? "Plywood / Veneer" : r.division === "Veneer" ? "Veneer" : "Plywood",
    }));
  } catch (err) {
    console.error("Dealer locator: database unavailable, showing the built-in dealer list:", err);
    return DEALERS;
  }
}
