/**
 * Testology website → Google Sheet logger (Google Apps Script).
 *
 * Every website form (contact, lab partnership, …) posts here, and each form gets its own tab. Tabs and
 * their column headers are created automatically from the first submission, and new fields simply add a
 * column — so adding a form to the website never requires editing this script.
 *
 * SETUP (once, in the Google account that should own the sheet):
 *   1. Create a Google Sheet → Extensions → Apps Script. Delete the sample code and paste this whole file.
 *   2. Replace the SECRET below with a long random value. Use the same value for GOOGLE_SHEET_SECRET in the
 *      website's hosting settings (and .env.local).
 *   3. Deploy → New deployment → gear icon → Web app.
 *        Execute as: Me        Who has access: Anyone
 *      Click Deploy and approve the permissions prompt.
 *   4. Copy the "Web app URL" (ends in /exec) into GOOGLE_SHEET_WEBHOOK_URL in the hosting settings.
 *
 * If you edit this script later: Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.
 * That keeps the same URL; "New deployment" would create a different one.
 */

const SECRET = "REPLACE-WITH-THE-SAME-VALUE-AS-GOOGLE_SHEET_SECRET";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // two submissions at once mustn't overwrite each other's row
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.secret !== SECRET) return respond({ ok: false, error: "unauthorized" });

    const tabName = String(payload.form || "Website").slice(0, 90);
    const fields = payload.fields || {};
    const sheet = tabFor(tabName);

    // Header row: "Received" first, then each field; unknown fields get a new column on the right.
    let headers = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    if (headers.length === 0) {
      headers = ["Received"];
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 1).setFontWeight("bold");
    }
    Object.keys(fields).forEach(function (name) {
      if (headers.indexOf(name) === -1) {
        headers.push(name);
        sheet.getRange(1, headers.length).setValue(name).setFontWeight("bold");
      }
    });

    const row = headers.map(function (name) {
      return name === "Received" ? new Date() : asText(fields[name]);
    });
    sheet.appendRow(row);
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function tabFor(name) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  return book.getSheetByName(name) || book.insertSheet(name);
}

// Values starting with = + - @ would be run as spreadsheet formulas; store them as plain text instead.
function asText(value) {
  if (value === undefined || value === null) return "";
  const text = Array.isArray(value) ? value.join("; ") : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
