import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { ensureDb, salesTeam } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const { id } = await params;
    const body = await req.json();
    const db = await ensureDb();

    await db.update(salesTeam).set({
      name: body.name,
      designation: body.designation ?? null,
      department: body.department ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      region: body.region ?? null,
      division: body.division === "Veneer" ? "Veneer" : "Plywood",
      cities: body.cities ?? null,
      photoUrl: body.photoUrl ?? body.photo_url ?? null,
      linkedin: body.linkedin ?? null,
      sortOrder: body.sortOrder ?? body.sort_order ?? 0,
      active: body.active !== false,
    }).where(eq(salesTeam.id, parseInt(id, 10)));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sales team PUT error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const { id } = await params;
    const db = await ensureDb();
    await db.delete(salesTeam).where(eq(salesTeam.id, parseInt(id, 10)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sales team DELETE error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
