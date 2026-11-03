// Backup copy of every website form submission in a Google Sheet, one tab per form. The receiving end is the
// Apps Script in scripts/google-sheet-logger.gs (setup steps are at the top of that file).
//
//   GOOGLE_SHEET_WEBHOOK_URL   the Apps Script "Web app URL" (ends in /exec)
//   GOOGLE_SHEET_SECRET        shared value that must match SECRET in the script
export async function logToSheet(form: string, fields: Record<string, string | string[] | undefined>): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.GOOGLE_SHEET_SECRET ?? "", form, fields }),
    });
    // Apps Script answers 200 even when it rejects a request, so check its reply too.
    const reply = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !reply?.ok) {
      console.error(`Google Sheet logging (${form}) failed:`, reply?.error ?? `HTTP ${res.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Google Sheet logging (${form}) failed:`, error instanceof Error ? error.message : error);
    return false;
  }
}
