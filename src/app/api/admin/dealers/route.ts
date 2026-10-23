import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { ensureDb, dealers } from "@/lib/db";
import { dbErrorDetail, dealerToApi, requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const db = await ensureDb();
    const rows = await db.select().from(dealers).orderBy(asc(dealers.state), asc(dealers.city));
    return NextResponse.json({ dealers: rows.map(dealerToApi) });
  } catch (err) {
    console.error("Dealers GET error:", err);
    return NextResponse.json({ error: "Database error", detail: dbErrorDetail(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const body = await req.json();
    const db = await ensureDb();
    const [result] = await db.insert(dealers).values({
      name: body.name,
      contactPerson: body.contactPerson ?? body.contact_person ?? null,
      address: body.address ?? null,
      city: body.city,
      state: body.state,
      pincode: body.pincode ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      division: body.division ?? "Both",
      lat: body.lat ?? null,
      lng: body.lng ?? null,
      active: body.active !== false,
    });

    return NextResponse.json({ id: result.insertId });
  } catch (err) {
    console.error("Dealers POST error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
