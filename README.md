# OneTap - One Place. Every Official Link.

React + Vite website. You no longer need to change code to add or edit data.

## Run

```bash
npm install
npm run dev        # development
npm run build      # production build (this is what Vercel runs)
```

## How to add / edit data (3 easy ways)

### 1) Admin panel  ->  `/admin`  (easiest)
Open `yoursite.com/admin` and sign in (see "Admin login" below).
- **Add new** - fill in the form (title, category, official link, extra details) -> Save.
- Pencil = edit, Trash = delete.
- Changes show up instantly *in your browser* (preview).
- To make them visible to everyone, click **Download JSON**, replace `src/data/resources.json` with the file, then push / deploy.
- Use **Logout** when you are done.

### 2) Google Sheet  (live updates without a deploy)
1. Import `data-template/resources.csv` into Google Sheets.
2. Choose **File -> Share -> Publish to web -> CSV** and copy the link.
3. Set `VITE_SHEET_URL=<that link>` in Vercel (or in a `.env` file) and deploy once.
4. Now add / edit rows in the sheet -> the site updates right away. No code or deploy needed.

Sheet columns: `title, slug, category, kind, description, website, apply_link, latest_update, updated, tags, popular, quick`.
Any **new column** you create (Last Date, Exam Date, Fee...) automatically appears in the details table.
In `category`, write the category name (for example `Entrance Exams`). In `popular` / `quick`, write `yes`.

### 3) Edit the file
Edit `src/data/resources.json` directly - the format of one resource:

```json
{
  "slug": "neet-ug-result",
  "title": "NEET UG",
  "category": "entrance-exams",
  "kind": "Exam",
  "description": "Official NTA NEET UG portal",
  "website": "https://neet.nta.nic.in/",
  "applyLink": "",
  "updated": "2026-09-21",
  "latestUpdate": "Result declared.",
  "tags": ["neet", "medical"],
  "popular": true,
  "quick": true,
  "details": { "Last Date": "11 March 2026", "Exam Date": "03 May 2026" }
}
```

## Admin login
The `/admin` page asks for an Admin ID and password.

| | Default value |
|---|---|
| Admin ID | `onetap-admin` |
| Password | `OneTap@2026` |

**Change these before you deploy.** Set `VITE_ADMIN_ID` and `VITE_ADMIN_PASSWORD` in your Vercel
environment variables (or in a local `.env` file - see `.env.example`), then redeploy.

> **Important:** this is a front-end login only. The site has no server, so the ID and password
> are bundled into the JavaScript that the browser downloads. It keeps casual visitors out of the
> admin page, but it is not real security. That is acceptable here because the admin panel only
> changes data in the visitor's own browser - nothing goes live until you download the JSON and
> deploy it. Do not reuse a password from any other account. If you ever need admin edits that go
> live directly, add a real backend (for example Supabase, Firebase or a Vercel serverless function).

## Important settings
- `src/config/site.js` -> put your real email in **contactEmail**.
- Logo: `src/assets/logo.png` / `logo-icon.png` (transparent, cropped).
- Colours: `:root` variables at the top of `src/index.css`.

## Folder structure
```
src/
  data/resources.json   <- all the data lives here
  config/site.js        <- site name, email, sheet URL, admin login
  context/DataContext   <- data loading (sheet > admin > json)
  pages/                <- Home, Categories, Details, Latest, Admin, AdminLogin ...
  components/           <- Navbar, Footer, SearchBox, ResourceCard, AdminGate
  lib/                  <- search, helpers, sheet parser, auth
```
