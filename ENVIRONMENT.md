# Environment Settings

Every setting the SharonPly website reads, what it does, and an example value. Set them in the hosting panel's environment variables for the Node.js app, or in a `.env` file in the website's main folder (copy `.env.example`).

- **Restart** the app after changing a setting.
- Settings starting with `NEXT_PUBLIC_` are built into the website: **rebuild** (`npm run build`) and then restart.
- Values are case-sensitive. Do not add quotes or spaces around them.
- Never commit the real `.env` file to a code repository.

## 1. Website

| Setting | Required | Example | What it does | Apply by |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://sharonply.com` | The website's public address, used for search engine links, the sitemap, `robots.txt` and share previews. Use the test address while testing. No slash at the end. | Rebuild |

## 2. Database (MySQL)

Use **either** `DATABASE_URL` on its own, **or** the five separate settings. If `DATABASE_URL` is set, the separate settings are ignored.

| Setting | Required | Example | What it does |
|---|---|---|---|
| `DATABASE_URL` | Yes* | `mysql://u123456789_admin:PASSWORD@localhost:3306/u123456789_sharonply` | The full connection: `mysql://USER:PASSWORD@HOST:PORT/DATABASE`. The password may be typed as is, including `#`, `*`, `!`, `%` or `@`. |
| `DATABASE_HOST` | Alternative | `localhost` | Database server; `localhost` when the database is on the same hosting account. |
| `DATABASE_PORT` | Alternative | `3306` | Database port. Default `3306`. |
| `DATABASE_NAME` | Alternative | `u123456789_sharonply` | Database name, exactly as shown in the hosting panel. |
| `DATABASE_USER` | Alternative | `u123456789_admin` | Database username, exactly as shown in the hosting panel. |
| `DATABASE_PASSWORD` | Alternative | `your-db-password` | Database user's password. |

\* Required for the dealer locator, sales team page, admin panel and saving form submissions. Content pages work without it. Apply by: restart.

## 3. Admin panel

All three are needed. If any is missing, admin login stays switched off and the server log names the missing setting.

| Setting | Required | Example | What it does |
|---|---|---|---|
| `ADMIN_USERNAME` | Yes | `sharonadmin` | Username for `/admin`. |
| `ADMIN_PASSWORD` | Yes | `a-strong-password` | Password for `/admin`. Use at least 12 characters. |
| `ADMIN_SECRET` | Yes | 64 random characters | Signs admin login sessions. Changing it signs everyone out. |

## 4. Form security

| Setting | Required | Example | What it does |
|---|---|---|---|
| `CSRF_SECRET` | Yes | 64 random characters | Protects the contact, enquiry and careers forms against forged submissions. Use a different value from `ADMIN_SECRET`. |

Create a random secret with `openssl rand -hex 32`, or any password generator set to 64 characters. The secrets for this website are supplied separately and are not stored in this repository.

## 5. Email for form notifications

Every contact, enquiry and careers submission is emailed. Without these settings, submissions are still saved in the database, but no email is sent.

| Setting | Required | Example | What it does |
|---|---|---|---|
| `SMTP_HOST` | Yes | `smtp.gmail.com` | Mail server. Hostinger email: `smtp.hostinger.com`. |
| `SMTP_PORT` | No | `465` | `465` (SSL, default) or `587` (STARTTLS). |
| `SMTP_USER` | Yes | `website@sharonply.com` | Mailbox that sends the notifications; emails come from this address. |
| `SMTP_PASS` | Yes | `mailbox-password` | Mailbox password. For Gmail, a 16-character App Password (requires 2-Step Verification). |
| `FORM_NOTIFY_EMAIL` | No | `admin@sharonply.com` | Who receives the notifications. Defaults to `admin@sharonply.com`. Replying to a notification goes to the visitor. |

## 6. Not needed

- `NODE_ENV`: set automatically to `production` by `npm start`. Do not set it.
- `PORT`: usually set by the hosting panel; the app uses `3000` if it is not set.
- `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_ENVIRONMENT`: error monitoring is not switched on in this version. Leave them empty.

## Setting up the database

The website uses one MySQL (or MariaDB) database with three tables:

| Table | Holds | Managed in | Shown on |
|---|---|---|---|
| `dealers` | 93 dealers | Admin → Manage Dealers | `/dealers` |
| `sales_team` | 24 members: Plywood staff with the cities they cover, and the Decorative Veneer contact | Admin → Manage Sales Team | `/contact/sales-team`, `/find-us` |
| `form_submissions` | Contact, enquiry and careers submissions (starts empty) | Read in phpMyAdmin; each submission is also emailed | Not shown |

1. **Create the database and user** in the hosting panel (Hostinger: hPanel → Databases → Management). Note the exact database name and username: on Hostinger both start with a lowercase prefix such as `u123456789_`, and capitals matter. The user needs at least SELECT, INSERT, UPDATE and DELETE.
2. **Load the tables and data.** In phpMyAdmin, select the database → **Import** → `database/sharonply-database.sql` → **Go**. This creates the three tables and loads the 93 dealers and 24 sales team members. Import it **once**, into an empty database.
   - A database that already has the dealers but not the sales team: import `database/sharonply-sales-team.sql` instead. It adds the sales team columns if missing and **replaces** all rows in `sales_team`.
   - If you skip the import and the user has full rights, the website creates the same tables and data itself on first use.
3. **Connect the website:** set `DATABASE_URL` with the exact username, password and database name, using `localhost` as the host when the database is on the same hosting account. Restart the app.
4. **Check it works:**
   - `SELECT COUNT(*) FROM dealers;` returns 93 and `SELECT COUNT(*) FROM sales_team;` returns 24.
   - Admin → Manage Dealers lists the dealers with no red message.
   - Add a test dealer, check it on `/dealers`, then delete it.
   - Send the contact form, then check `SELECT * FROM form_submissions ORDER BY id DESC LIMIT 5;`.
5. **Backups:** turn on the hosting panel's automatic backups, or export the database from phpMyAdmin (Export → Quick → SQL) regularly.

## If something fails

- **"Could not load from the database (…)"** in the admin panel: the text in brackets is the database's reason. "Access denied" means a wrong username or password; "to database '…'" or "Unknown database" means a wrong database name or a user not linked to it; "ECONNREFUSED" means a wrong host or port.
- **"Invalid username or password"** with the right details: `ADMIN_USERNAME`, `ADMIN_PASSWORD` or `ADMIN_SECRET` is missing or mistyped.
- **No form emails:** check the `SMTP_` settings; for Gmail use an App Password.
- **A change has no effect:** restart the app, and rebuild first for `NEXT_PUBLIC_` settings.
