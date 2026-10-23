import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { ensureDb, dealers } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const { id } = await params;
    const body = await req.json();
    const db = await ensureDb();

    await db.update(dealers).set({
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
    }).where(eq(dealers.id, parseInt(id, 10)));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Dealers PUT error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const { id } = await params;
    const db = await ensureDb();
    await db.delete(dealers).where(eq(dealers.id, parseInt(id, 10)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Dealers DELETE error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
