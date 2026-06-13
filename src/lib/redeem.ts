/**
 * Redeem-code client — validates a Pro code against the Apps Script web app
 * backing the private Google Sheet, and reports the outcome. Granting Pro is
 * the caller's job (store.redeemPro()); this module only talks to the network.
 *
 * Backend: a Google Apps Script web app (see store/redeem-backend.gs) deployed
 * "Anyone". It takes ?code=XXX, atomically marks the code used in the Sheet,
 * and returns JSON. We use a plain GET with a query param so there's no CORS
 * preflight (works from the Capacitor native shell and the web).
 *
 * Set NEXT_PUBLIC_REDEEM_URL to the deployed web-app URL. Without it, redeem is
 * treated as unavailable (the UI hides / disables the input).
 */

const REDEEM_URL = process.env.NEXT_PUBLIC_REDEEM_URL ?? "";

export type RedeemReason = "invalid" | "used" | "network" | "disabled";

export interface RedeemResult {
  ok: boolean;
  /** Present only when ok === false. */
  reason?: RedeemReason;
  /** Optional creator/label echoed back by the backend, for a nicer message. */
  creator?: string;
}

/** Is the redeem feature configured at all? */
export function redeemAvailable(): boolean {
  return REDEEM_URL.length > 0;
}

/** Normalise user input: trim, uppercase, collapse spaces. Codes are
 *  case-insensitive and dash-formatted (e.g. "TAR-7XK2"). */
export function normaliseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

/**
 * Validate + consume a code. Returns {ok:true} exactly once per valid code;
 * any later attempt with the same code returns {ok:false, reason:"used"}.
 * Never throws — network/parse failures resolve to reason:"network" so the
 * caller can show a retry message without a crash.
 */
export async function redeemCode(rawCode: string): Promise<RedeemResult> {
  if (!redeemAvailable()) return { ok: false, reason: "disabled" };

  const code = normaliseCode(rawCode);
  if (!code) return { ok: false, reason: "invalid" };

  try {
    const url = `${REDEEM_URL}?code=${encodeURIComponent(code)}`;
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return { ok: false, reason: "network" };

    const data = (await res.json()) as {
      ok?: boolean;
      reason?: RedeemReason;
      creator?: string;
    };

    if (data.ok) return { ok: true, creator: data.creator };
    return { ok: false, reason: data.reason ?? "invalid", creator: data.creator };
  } catch {
    return { ok: false, reason: "network" };
  }
}
