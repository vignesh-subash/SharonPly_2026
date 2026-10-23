// Table definitions used by the site's first-run setup (src/lib/db.ts); the importable
// database file (database/sharonply-database.sql) creates the same tables.

const TABLE_OPTIONS = "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

export const TABLE_DDL = {
  dealers: `CREATE TABLE IF NOT EXISTS dealers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  address TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(20),
  phone VARCHAR(255),
  email VARCHAR(255),
  website VARCHAR(500),
  division VARCHAR(50) NOT NULL DEFAULT 'Both',
  lat DOUBLE,
  lng DOUBLE,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ${TABLE_OPTIONS}`,

  sales_team: `CREATE TABLE IF NOT EXISTS sales_team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  department VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(255),
  region VARCHAR(255),
  division VARCHAR(50) NOT NULL DEFAULT 'Plywood',
  cities TEXT,
  photo_url VARCHAR(500),
  linkedin VARCHAR(500),
  sort_order INT DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ${TABLE_OPTIONS}`,

  form_submissions: `CREATE TABLE IF NOT EXISTS form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  source VARCHAR(100),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  city VARCHAR(100),
  subject VARCHAR(255),
  message TEXT,
  product VARCHAR(255),
  role VARCHAR(255),
  experience VARCHAR(100),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ${TABLE_OPTIONS}`,
} as const;

export type TableName = keyof typeof TABLE_DDL;

/** Columns added to sales_team after its first release; setup adds any that are missing. */
export const SALES_TEAM_ADDED_COLUMNS = {
  division: "ALTER TABLE sales_team ADD COLUMN division VARCHAR(50) NOT NULL DEFAULT 'Plywood' AFTER region",
  cities: "ALTER TABLE sales_team ADD COLUMN cities TEXT AFTER division",
} as const;

/** A dealer from src/data/dealers.ts as a `dealers` table row. */
export function dealerToRow(d: {
  name: string;
  contacts: string[];
  address: string;
  city: string;
  state: string;
  pincode: string;
  phones: string[];
  emails: string[];
  division: string;
}) {
  return {
    name: d.name,
    contactPerson: d.contacts.join(", "),
    address: d.address,
    city: d.city,
    state: d.state,
    pincode: d.pincode,
    phone: d.phones.join(", "),
    email: d.emails.join(", "),
    division: d.division === "Plywood / Veneer" ? "Both" : d.division,
    active: true,
  };
}

/** A sales person from src/data/salesTeam.ts as a `sales_team` row; `order` sets the display order. */
export function salesPersonToRow(
  p: { name: string; designation: string; phone: string; email: string; division: string; territory: string; cities: string[] },
  order: number,
) {
  return {
    name: p.name,
    designation: p.designation,
    phone: p.phone,
    email: p.email,
    region: p.territory,
    division: p.division,
    cities: p.cities.join(", "),
    sortOrder: order,
    active: true,
  };
}
