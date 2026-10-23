import {
  mysqlTable,
  int,
  varchar,
  text,
  double,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const dealers = mysqlTable("dealers", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }),
  address: text("address"),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  pincode: varchar("pincode", { length: 20 }),
  phone: varchar("phone", { length: 255 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 500 }),
  division: varchar("division", { length: 50 }).notNull().default("Both"),
  lat: double("lat"),
  lng: double("lng"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const salesTeam = mysqlTable("sales_team", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  department: varchar("department", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  region: varchar("region", { length: 255 }),
  division: varchar("division", { length: 50 }).notNull().default("Plywood"),
  cities: text("cities"),
  photoUrl: varchar("photo_url", { length: 500 }),
  linkedin: varchar("linkedin", { length: 500 }),
  sortOrder: int("sort_order").default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const formSubmissions = mysqlTable("form_submissions", {
  id: int("id").primaryKey().autoincrement(),
  type: varchar("type", { length: 50 }).notNull(),
  source: varchar("source", { length: 100 }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  city: varchar("city", { length: 100 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  product: varchar("product", { length: 255 }),
  role: varchar("role", { length: 255 }),
  experience: varchar("experience", { length: 100 }),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Dealer = typeof dealers.$inferSelect;
export type NewDealer = typeof dealers.$inferInsert;
export type SalesTeamMember = typeof salesTeam.$inferSelect;
export type NewSalesTeamMember = typeof salesTeam.$inferInsert;
export type FormSubmission = typeof formSubmissions.$inferSelect;
