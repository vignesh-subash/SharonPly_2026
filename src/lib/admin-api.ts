import { NextResponse } from "next/server";
import { getSession } from "./auth";

export async function requireAdmin() {
  const ok = await getSession();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function dealerToApi(d: {
  id: number;
  name: string;
  contactPerson: string | null;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  division: string;
  lat: number | null;
  lng: number | null;
  active: boolean | null;
}) {
  return {
    id: d.id,
    name: d.name,
    contact_person: d.contactPerson ?? "",
    address: d.address ?? "",
    city: d.city,
    state: d.state,
    pincode: d.pincode ?? "",
    phone: d.phone ?? "",
    email: d.email ?? "",
    website: d.website ?? "",
    division: d.division,
    lat: d.lat,
    lng: d.lng,
    active: d.active ? 1 : 0,
  };
}

export function salesMemberToApi(m: {
  id: number;
  name: string;
  designation: string | null;
  department: string | null;
  phone: string | null;
  email: string | null;
  region: string | null;
  division: string | null;
  cities: string | null;
  photoUrl: string | null;
  linkedin: string | null;
  sortOrder: number | null;
  active: boolean | null;
}) {
  return {
    id: m.id,
    name: m.name,
    designation: m.designation ?? "",
    department: m.department ?? "",
    phone: m.phone ?? "",
    email: m.email ?? "",
    region: m.region ?? "",
    division: m.division ?? "Plywood",
    cities: m.cities ?? "",
    photo_url: m.photoUrl,
    linkedin: m.linkedin,
    sort_order: m.sortOrder ?? 0,
    active: m.active ? 1 : 0,
  };
}

/** Short, password-free reason a database call failed, shown to signed-in admins only. */
export function dbErrorDetail(err: unknown): string {
  const e = err as { cause?: { code?: string; message?: string }; code?: string; message?: string };
  const root = e?.cause ?? e;
  const text = [root?.code, root?.message].filter(Boolean).join(": ") || String(err);
  return text.replace(/mysql:\/\/\S+/g, "mysql://…").slice(0, 300);
}
