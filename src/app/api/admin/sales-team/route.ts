import { NextRequest, NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { ensureDb, salesTeam } from "@/lib/db";
import { dbErrorDetail, requireAdmin, salesMemberToApi } from "@/lib/admin-api";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const db = await ensureDb();
    const rows = await db.select().from(salesTeam).orderBy(asc(salesTeam.sortOrder), asc(salesTeam.name));
    return NextResponse.json({ team: rows.map(salesMemberToApi) });
  } catch (err) {
    console.error("Sales team GET error:", err);
    return NextResponse.json({ error: "Database error", detail: dbErrorDetail(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const body = await req.json();
    const db = await ensureDb();
    const [result] = await db.insert(salesTeam).values({
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
    });

    return NextResponse.json({ id: result.insertId });
  } catch (err) {
    console.error("Sales team POST error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
