import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { ensureDb, salesTeam } from "@/lib/db";
import { salesMemberToApi } from "@/lib/admin-api";

export async function GET() {
  try {
    const db = await ensureDb();
    const rows = await db
      .select()
      .from(salesTeam)
      .where(eq(salesTeam.active, true))
      .orderBy(asc(salesTeam.sortOrder), asc(salesTeam.name));

    return NextResponse.json({ team: rows.map(salesMemberToApi) });
  } catch (err) {
    console.error("Public sales team GET error:", err);
    return NextResponse.json({ team: [] });
  }
}
