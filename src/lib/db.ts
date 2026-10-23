import mysql from "mysql2/promise";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { sql, count } from "drizzle-orm";
import * as schema from "./schema";
import { DEALERS } from "@/data/dealers";
import { SALES_TEAM } from "@/data/salesTeam";
import { SALES_TEAM_ADDED_COLUMNS, TABLE_DDL, dealerToRow, salesPersonToRow, type TableName } from "./db-tables";

// The made-up people earlier versions seeded into sales_team; replaced by the real team.
const PLACEHOLDER_SALES_NAMES = [
  "Rajesh Subramaniam", "Priya Venkatesh", "Mohammed Salim", "Anitha Krishnamurthy",
  "Karthik Sundar", "Deepa Murali", "Venkat Raman", "Lakshmi Narayanan",
];

export const { dealers, salesTeam, formSubmissions } = schema;
export type { Dealer, NewDealer, SalesTeamMember, NewSalesTeamMember, FormSubmission } from "./schema";

let _pool: mysql.Pool | null = null;
let _db: MySql2Database<typeof schema> | null = null;
let _initPromise: Promise<void> | null = null;

// mysql://USER:PASSWORD@HOST[:PORT]/DATABASE. The password runs to the last "@", so it may
// contain #, *, ! or @ as typed; percent-encoded passwords are decoded as well.
export function parseDatabaseUrl(url: string) {
  const m = url.trim().match(/^mysql:\/\/([^:@/]+)(?::(.*))?@([^@/:]+)(?::(\d+))?\/([^/?]+)\/?(?:\?.*)?$/);
  if (!m) throw new Error("DATABASE_URL must look like mysql://USER:PASSWORD@HOST:3306/DATABASE");
  const decode = (v = "") => {
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  return {
    user: decode(m[1]),
    password: decode(m[2]),
    host: m[3],
    port: m[4] ? parseInt(m[4], 10) : 3306,
    database: decode(m[5]),
  };
}

function getConnectionConfig(): mysql.PoolOptions {
  const url = process.env.DATABASE_URL;
  if (url?.trim().startsWith("mysql://")) {
    return { ...parseDatabaseUrl(url), waitForConnections: true, connectionLimit: 10 };
  }

  return {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: parseInt(process.env.DATABASE_PORT ?? "3306", 10),
    database: process.env.DATABASE_NAME ?? "sharonply",
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "",
    waitForConnections: true,
    connectionLimit: 10,
  };
}

export function getDb() {
  if (!_db) {
    _pool = mysql.createPool(getConnectionConfig());
    _db = drizzle(_pool, { schema, mode: "default" });
  }
  return _db;
}

export async function ensureDb() {
  if (!_initPromise) {
    _initPromise = initDb().catch((err) => {
      _initPromise = null;
      throw err;
    });
  }
  await _initPromise;
  return getDb();
}

/**
 * First-run setup. Creates only the tables that are missing and widens the dealer
 * phone column only when it is too narrow, so a database imported from
 * database/sharonply-database.sql works with a user that can only read and write rows.
 */
export async function initDb() {
  const db = getDb();

  const [tableRows] = (await db.execute(
    sql`SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()`,
  )) as unknown as [{ name: string }[]];
  const existing = new Set(tableRows.map((r) => r.name));

  const created = new Set<TableName>();
  for (const name of Object.keys(TABLE_DDL) as TableName[]) {
    if (existing.has(name)) continue;
    await db.execute(sql.raw(TABLE_DDL[name]));
    created.add(name);
  }

  // sales_team gained division and cities columns; add any that are missing.
  const [teamColumnRows] = (await db.execute(
    sql`SELECT COLUMN_NAME AS name FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sales_team'`,
  )) as unknown as [{ name: string }[]];
  const teamColumns = new Set(teamColumnRows.map((r) => r.name));
  let teamColumnsAdded = false;
  for (const [column, ddl] of Object.entries(SALES_TEAM_ADDED_COLUMNS)) {
    if (teamColumns.has(column)) continue;
    await db.execute(sql.raw(ddl));
    teamColumnsAdded = true;
  }

  // Dealers can list several phone numbers; tables created before this held only 50 characters.
  const [phoneRows] = (await db.execute(
    sql`SELECT CHARACTER_MAXIMUM_LENGTH AS len FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'dealers' AND COLUMN_NAME = 'phone'`,
  )) as unknown as [{ len: number | null }[]];
  if ((phoneRows[0]?.len ?? 255) < 255) {
    await db.execute(sql`ALTER TABLE dealers MODIFY phone VARCHAR(255)`);
  }

  // Fill a dealers table this setup just created, or replace the sample rows
  // (all @example.com addresses) that earlier versions seeded.
  if (created.has("dealers")) {
    await seedDealers(db);
  } else {
    const [dealerRows] = await db.select({ count: count() }).from(dealers);
    const [sampleRows] = await db
      .select({ count: count() })
      .from(dealers)
      .where(sql`${dealers.email} LIKE '%@example.com'`);
    if (dealerRows?.count && sampleRows?.count === dealerRows.count) {
      await db.delete(dealers);
      await seedDealers(db);
    }
  }

  // Fill a sales_team table this setup just created, or one from an earlier version
  // (just given the new columns) that is empty or holds only the placeholder people.
  if (created.has("sales_team")) {
    await seedSalesTeam(db);
  } else if (teamColumnsAdded) {
    const rows = await db.select({ name: salesTeam.name }).from(salesTeam);
    if (rows.every((r) => PLACEHOLDER_SALES_NAMES.includes(r.name))) {
      await db.delete(salesTeam);
      await seedSalesTeam(db);
    }
  }
}

async function seedDealers(db: MySql2Database<typeof schema>) {
  await db.insert(dealers).values(DEALERS.map(dealerToRow));
}

async function seedSalesTeam(db: MySql2Database<typeof schema>) {
  await db.insert(salesTeam).values(SALES_TEAM.map((p, i) => salesPersonToRow(p, i + 1)));
}
