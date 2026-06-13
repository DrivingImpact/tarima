/**
 * Tarima Pro redeem-code backend — Google Apps Script.
 *
 * WHAT IT DOES
 *   Validates a one-time Pro code against a private Google Sheet and marks it
 *   used, atomically. The app calls it; the Sheet is your tracking dashboard.
 *
 * ── SETUP (one time) ───────────────────────────────────────────────
 *   1. Create a Google Sheet. Add a tab named exactly:  codes
 *      Row 1 headers (exact, lowercase):
 *        code | creator | status | redeemed_at | note
 *   2. Extensions → Apps Script. Paste this whole file. Save.
 *   3. Run `generateCodes` once (see bottom) to mint a batch — grant the
 *      script Sheet permission when prompted.
 *   4. Deploy → New deployment → type "Web app".
 *        Execute as: Me.   Who has access: Anyone.
 *      Copy the Web app URL (https://script.google.com/macros/s/…/exec).
 *   5. Put it in the app build env:
 *        NEXT_PUBLIC_REDEEM_URL=<that url>
 *      then rebuild (it's baked at build time for the static export).
 *
 *   To mint more codes later: edit the call at the bottom and run again, OR
 *   add rows by hand (code uppercase, status "unused"). Re-deploy is NOT
 *   needed when you only add rows; only when you change this code.
 *
 * ── HOW TO READ THE DASHBOARD ──────────────────────────────────────
 *   Each row is a code. `creator` is who you handed it to (e.g. @plazakid).
 *   `status` flips unused → used the moment they redeem; `redeemed_at` stamps
 *   when. Filter by creator to see who actually converts.
 */

var SHEET_NAME = 'codes';
// Unambiguous alphabet (no 0/O, 1/I/L) so codes are easy to read aloud / type.
var ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** Web-app entry point. GET ?code=XXXX → JSON. */
function doGet(e) {
  var code = (e && e.parameter && e.parameter.code ? e.parameter.code : '')
    .toString().trim().toUpperCase().replace(/\s+/g, '');

  if (!code) return json_({ ok: false, reason: 'invalid' });

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // serialise redemptions so a code can't be used twice
  } catch (err) {
    return json_({ ok: false, reason: 'network' });
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) return json_({ ok: false, reason: 'invalid' });

    var values = sheet.getDataRange().getValues();
    // Row 0 is headers. Columns: 0 code, 1 creator, 2 status, 3 redeemed_at.
    for (var i = 1; i < values.length; i++) {
      var rowCode = (values[i][0] || '').toString().trim().toUpperCase();
      if (rowCode !== code) continue;

      var status = (values[i][2] || '').toString().trim().toLowerCase();
      var creator = (values[i][1] || '').toString();

      if (status === 'used') {
        return json_({ ok: false, reason: 'used', creator: creator });
      }

      // Claim it. Sheet rows are 1-indexed; data row i → sheet row i+1.
      sheet.getRange(i + 1, 3).setValue('used');           // status
      sheet.getRange(i + 1, 4).setValue(new Date());       // redeemed_at
      SpreadsheetApp.flush();
      return json_({ ok: true, creator: creator });
    }

    return json_({ ok: false, reason: 'invalid' });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Mint `count` codes for `creator` and append them as unused rows.
 *  Run from the Apps Script editor: set the args below and click Run. */
function generateCodes(count, creator, note) {
  count = count || 10;
  creator = creator || '';
  note = note || '';

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Tab "' + SHEET_NAME + '" not found.');

  // Collect existing codes to guarantee uniqueness.
  var existing = {};
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    existing[(data[i][0] || '').toString().trim().toUpperCase()] = true;
  }

  var rows = [];
  while (rows.length < count) {
    var code = makeCode_();
    if (existing[code]) continue;
    existing[code] = true;
    rows.push([code, creator, 'unused', '', note]);
  }
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 5).setValues(rows);
  Logger.log('Minted ' + rows.length + ' codes for "' + creator + '":');
  Logger.log(rows.map(function (r) { return r[0]; }).join('\n'));
}

/** One code like TAR-7XK2-QW9P (prefix + two 4-char groups). */
function makeCode_() {
  return 'TAR-' + group_(4) + '-' + group_(4);
}
function group_(n) {
  var s = '';
  for (var i = 0; i < n; i++) {
    s += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return s;
}

/** Convenience: mint a batch with one click. Edit and Run. */
function mintBatch() {
  generateCodes(10, '@example_handle', 'reto junio');
}
