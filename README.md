# SharonPly Website

Website for sharonply.com, built with Next.js 15, React 19 and Tailwind CSS 4, with a MySQL database.

## Requirements

- Linux server, 4 GB RAM minimum (the build uses about 3 GB)
- Node.js 22 LTS and npm 10
- MySQL 8.0 (MySQL 5.7.8+ or MariaDB 10.5+ also work)
- An SMTP mailbox for form notifications

## Hosting settings

| Setting | Value |
|---|---|
| Node.js version | 22 |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `npm start` |
| Port | 3000 (or the value of `PORT`) |

## Configuration

Full details of every setting are in [ENVIRONMENT.md](ENVIRONMENT.md). Copy `.env.example` to `.env` and fill in every value before the first build:

- `NEXT_PUBLIC_SITE_URL`: `https://sharonply.com`
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD` (or a single `DATABASE_URL`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FORM_NOTIFY_EMAIL`
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`: login for the admin panel at `/admin`
- `ADMIN_SECRET`, `CSRF_SECRET`: long random strings, required

`NEXT_PUBLIC_*` values are built into the site, so rebuild after changing them.

## Database

1. Create an empty MySQL database (utf8mb4) and a user for the website.
2. Import `database/sharonply-database.sql` into it once, using phpMyAdmin (Import → choose the file) or:

   ```
   mysql -u USER -p DATABASE_NAME < database/sharonply-database.sql
   ```

   This creates the three tables (`dealers`, `sales_team`, `form_submissions`) and loads the 93 dealers and the 24 sales team members. Form submissions start empty and fill as visitors send forms.

   For a database that already has the dealers but not the sales team, import `database/sharonply-sales-team.sql` instead (it replaces all rows in `sales_team`).
3. The website user needs only SELECT, INSERT, UPDATE and DELETE on this database.

Check the import with `SELECT COUNT(*) FROM dealers;` (93) and `SELECT COUNT(*) FROM sales_team;` (24). Import the file only once: importing it again adds the dealers a second time.

If the file is not imported and the user has full rights, the site creates the same tables and loads the dealers and sales team itself on first use.

Dealers and the sales team are managed in the admin panel at `/admin`; changes show on `/dealers` and `/contact/sales-team` immediately.

## Domain and server mapping

- Point the sharonply.com and www DNS A records to the server's public IP.
- Remove any records still pointing to the previous hosting.
- Leave MX, SPF and DKIM email records unchanged.
- Link sharonply.com and www.sharonply.com to the site on the server (hosting panel, or a web server such as Nginx forwarding to port 3000).
- Enable SSL once the domain points to the server, and redirect http to https.
- Lower the DNS TTL a day before the switch.
- After the switch, check that both addresses open the site over https.

## Updating the site

Make changes, then run `npm ci`, `npm run build` and restart the app.
