/**
 * Wok & Flame onboarding form — submission handler.
 *
 * Deploy as a Google Apps Script web app bound to a Google Sheet.
 * The form posts a JSON payload here; this script writes one row per
 * submission to the sheet, saves any voice clips to a Drive folder,
 * and emails the notification address a copy.
 *
 * See APPS_SCRIPT_SETUP.md at the project root for step-by-step deploy.
 */

// ─── Configure ───────────────────────────────────────────────────────
const NOTIFY_EMAIL      = 'william@wmfreelance.com';
const SHEET_NAME        = 'Submissions';
const VOICE_FOLDER_NAME = 'Wok & Flame voice notes';
// ─────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const payload    = JSON.parse(e.postData.contents);
    const fields     = payload.fields     || {};
    const voiceClips = payload.voiceClips || {};
    const timestamp  = payload.timestamp  || new Date().toISOString();

    // 1. Save any voice clips to Drive and collect their URLs.
    const voiceLinks = {};
    const clipKeys = Object.keys(voiceClips);
    if (clipKeys.length > 0) {
      const folder = getOrCreateFolder(VOICE_FOLDER_NAME);
      clipKeys.forEach(function (key) {
        const clip = voiceClips[key];
        const safeStamp = timestamp.replace(/[:.]/g, '-');
        const filename = safeStamp + '-' + key + '-' + (clip.name || 'note');
        const blob = Utilities.newBlob(
          Utilities.base64Decode(clip.data),
          clip.mimeType,
          filename
        );
        voiceLinks[key] = folder.createFile(blob).getUrl();
      });
    }

    // 2. Append to the spreadsheet, growing columns as new fields appear.
    const sheet = getOrCreateSheet(SHEET_NAME);

    let headers = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];

    if (headers.length === 0) {
      headers = ['timestamp'];
      sheet.getRange(1, 1, 1, 1).setValues([headers]);
    }

    const seen = {};
    headers.forEach(function (h) { seen[h] = true; });

    const newCols = [];
    Object.keys(fields).forEach(function (k) {
      if (!seen[k]) { newCols.push(k); seen[k] = true; }
    });
    Object.keys(voiceLinks).forEach(function (k) {
      const col = k + '_voice';
      if (!seen[col]) { newCols.push(col); seen[col] = true; }
    });

    if (newCols.length > 0) {
      sheet
        .getRange(1, headers.length + 1, 1, newCols.length)
        .setValues([newCols]);
      headers = headers.concat(newCols);
    }

    const row = headers.map(function (h) {
      if (h === 'timestamp') return timestamp;
      if (/_voice$/.test(h)) {
        return voiceLinks[h.replace(/_voice$/, '')] || '';
      }
      const v = fields[h];
      if (v === undefined || v === null) return '';
      if (typeof v === 'boolean') return v ? 'yes' : '';
      return String(v);
    });
    sheet.appendRow(row);

    // 3. Email the notification address a readable copy.
    const fieldLines = Object.keys(fields)
      .filter(function (k) { return fields[k] !== '' && fields[k] !== null && fields[k] !== undefined; })
      .map(function (k) { return k + ': ' + fields[k]; });

    const voiceLines = Object.keys(voiceLinks)
      .map(function (k) { return k + ' (voice): ' + voiceLinks[k]; });

    const body = [
      'New Wok & Flame onboarding submission.',
      'Time: ' + timestamp,
      ''
    ]
      .concat(fieldLines)
      .concat(voiceLines.length > 0 ? [''].concat(voiceLines) : [])
      .concat([
        '',
        'Full submission in the sheet:',
        SpreadsheetApp.getActiveSpreadsheet().getUrl()
      ])
      .join('\n');

    MailApp.sendEmail(
      NOTIFY_EMAIL,
      'Wok & Flame onboarding submission',
      body
    );

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Even on failure, return a 200 — the form's UX is success-on-submit.
    // The error gets logged to Apps Script's execution log for debugging.
    console.error('Submission failed', err);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Wok & Flame onboarding endpoint — POST a JSON submission to this URL.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}
