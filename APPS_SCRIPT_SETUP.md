# Onboarding form backend — Apps Script deploy

Five-minute job. You'll end up with a Google Sheet that fills with every submission, and an email landing in your inbox each time the form is sent.

## 1. Create the spreadsheet

1. Go to [drive.google.com](https://drive.google.com) → **New** → **Google Sheets** → blank
2. Rename it `Wok & Flame onboarding`

## 2. Open the script editor

From the sheet: **Extensions → Apps Script**.

A new tab opens with an empty `Code.gs` file.

## 3. Paste the script

1. Open [`apps-script/Code.gs`](apps-script/Code.gs) in this repo
2. Select all, copy
3. In the Apps Script tab: select all inside `Code.gs`, paste over it
4. Top of the file, leave `NOTIFY_EMAIL` as `william@wmfreelance.com` (or change it if you want submissions to land elsewhere)
5. **Save** (disk icon, or Ctrl+S). When it asks for a project name, call it `Wok & Flame onboarding`

## 4. Deploy as a web app

1. Top right: **Deploy → New deployment**
2. Click the gear icon next to "Select type" → **Web app**
3. Settings:
   - **Description:** `v1`
   - **Execute as:** *Me (your-email@…)*
   - **Who has access:** *Anyone*
4. Click **Deploy**
5. Google will prompt to authorise — click through:
   - "Authorise access"
   - Pick your Google account
   - "Google hasn't verified this app" → **Advanced → Go to Wok & Flame onboarding (unsafe)** (this is your own script — safe)
   - Click **Allow** on the scopes (Drive, Spreadsheet, Mail)
6. Copy the **Web app URL** it shows you. Looks like:
   `https://script.google.com/macros/s/AKfycb…/exec`

## 5. Wire the URL into the form

In [`public/onboarding.html`](public/onboarding.html), find the `CONFIG` block (around line 770):

```js
const CONFIG = {
  ENDPOINT_URL: 'PASTE_APPS_SCRIPT_URL_HERE',
  …
};
```

Replace `PASTE_APPS_SCRIPT_URL_HERE` with your `/exec` URL. Save.

Also replace it in [`wokflame-onboarding.html`](wokflame-onboarding.html) (the project-root master copy) so they stay in sync.

## 6. Test

1. Open http://localhost:3000/onboarding.html
2. Fill in a row with junk data and submit
3. Check: the Google Sheet has a new row, and your inbox has the notification email
4. If something looks off: in the Apps Script tab → **Executions** shows logs from every call

## When you change the script later

After editing `Code.gs`, deploy a new version:

- **Deploy → Manage deployments** → pencil icon next to your existing deployment → **Version: New version** → **Deploy**

The URL **stays the same** — no need to update the form.

---

# Troubleshooting

**Form submit still pops the email client.**
The `ENDPOINT_URL` is still set to the `PASTE_…` placeholder. Replace it in both HTML files.

**"Authorisation required" error in Apps Script logs.**
The deployment wasn't authorised. Re-deploy and walk through the OAuth flow again.

**Submission goes through but no email arrives.**
Check spam. `MailApp.sendEmail` from Google Apps Script lands in Gmail's "All Mail" reliably but external providers can be funny.

**Voice clips upload but appear corrupt.**
Make sure the `mimeType` field on the front-end matches the actual blob type. The form currently records WebM; check the file extension in Drive matches.

---

# What the script does

- Accepts POST with a JSON payload of `{ client, timestamp, fields, voiceClips }`
- Appends one row to the `Submissions` sheet of the bound spreadsheet
- Adds new columns automatically if a future form version sends new field names
- Saves any voice clips to a Drive folder called *"Wok & Flame voice notes"* and writes their share URLs into the row
- Sends a readable plain-text email summary to `NOTIFY_EMAIL`
- Returns `{ ok: true }` so the front-end shows the success screen
- On error, logs to Apps Script's execution log and still returns 200 so the user sees success — the failure surfaces in the logs, not in the user's face

Full code: [`apps-script/Code.gs`](apps-script/Code.gs).
