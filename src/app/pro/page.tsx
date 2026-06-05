"use client";

/**
 * /pro — Pro pricing page.
 *
 * Today this is a web-only stub: the real checkout will run through the
 * App Store / Play Store (RevenueCat) when the mobile build ships, with
 * Stripe as the optional web-checkout backup. Until those are wired:
 *
 *   - Yearly / monthly CTAs open `NEXT_PUBLIC_STRIPE_YEARLY_URL` /
 *     `NEXT_PUBLIC_STRIPE_MONTHLY_URL` if set in env.
 *   - Otherwise they fall through to a "próximamente" toast so we never
 *     ship a button that 404s a user mid-upgrade.
 *
 * A dev-only "Activar Pro localmente" toggle lives at the bottom so we
 * can QA gated flows without a live checkout. It's gated by
 * `NEXT_PUBLIC_PRO_DEV_TOGGLE=1` so it can't reach production by accident.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { PRO_PRICE, FREE_DAILY_SESSIONS } from "@/lib/entitlements";
import {
  billingAvailable,
  getProPackages,
  purchase,
  restore,
  type ProPackage,
} from "@/lib/purchases";

const STRIPE_YEARLY = process.env.NEXT_PUBLIC_STRIPE_YEARLY_URL ?? "";
const STRIPE_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_URL ?? "";
const DEV_TOGGLE_ON = process.env.NEXT_PUBLIC_PRO_DEV_TOGGLE === "1";

type Plan = "yearly" | "monthly";

export default function ProPage() {
  const { entitlements, setPro } = useAppStore();
  const isPro = entitlements.isPro;
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Native (Capacitor) only: real Play subscriptions from RevenueCat.
  const [pkgs, setPkgs] = useState<ProPackage[]>([]);
  const native = billingAvailable();

  useEffect(() => {
    if (!native) return;
    let active = true;
    void getProPackages().then((p) => {
      if (active) setPkgs(p);
    });
    return () => {
      active = false;
    };
  }, [native]);

  const pkgFor = (plan: Plan): ProPackage | undefined =>
    pkgs.find((p) => p.period === (plan === "yearly" ? "annual" : "monthly"));

  // Display price: real localized Play price on native, anchor price on web.
  const priceFor = (plan: Plan): string =>
    pkgFor(plan)?.priceString ??
    (plan === "yearly" ? PRO_PRICE.yearly : PRO_PRICE.monthly);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubscribe = async () => {
    // Native: run the real Google Play purchase via RevenueCat.
    if (native) {
      const pkg = pkgFor(selectedPlan);
      if (!pkg) {
        flash("Planes no disponibles ahora mismo. Probar de nuevo.");
        return;
      }
      setBusy(true);
      try {
        const ok = await purchase(pkg);
        if (ok) setPro(true);
        else flash("Compra cancelada.");
      } catch {
        flash("No se pudo completar la compra. Probar de nuevo.");
      } finally {
        setBusy(false);
      }
      return;
    }
    // Web: Stripe Payment Link if configured, else coming-soon.
    const url = selectedPlan === "yearly" ? STRIPE_YEARLY : STRIPE_MONTHLY;
    if (url) {
      window.location.href = url;
      return;
    }
    flash("Pago disponible en el lanzamiento móvil. Te avisamos.");
  };

  const handleRestore = async () => {
    setBusy(true);
    try {
      const ok = await restore();
      setPro(ok);
      flash(ok ? "Pro restaurado." : "No hay compras para restaurar.");
    } catch {
      flash("No se pudo restaurar. Probar de nuevo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app-screen flex flex-col px-4 pt-6 pb-10 max-w-lg mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          aria-label="Volver"
          className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
          Tarima Pro
        </span>
        <div className="w-10" />
      </div>

      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-display uppercase tracking-tight leading-[0.9]">
          <span className="text-accent">Sin límites.</span>
        </h1>
        <h1 className="text-6xl font-display uppercase tracking-tight leading-[0.9] mt-1 text-foreground">
          Sin pausas.
        </h1>
        <p className="text-sm text-muted mt-4 max-w-xs mx-auto">
          Todos los beats son gratis. Pro quita el límite diario: sesiones
          ilimitadas, sin pausas.
        </p>
      </div>

      {/* Already Pro? Short-circuit. */}
      {isPro ? (
        <div className="card-dark rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl mb-2">★</p>
          <p className="font-bold mb-1">Ya tienes Pro</p>
          <p className="text-xs text-muted">Gracias por apoyar el proyecto.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 rounded-2xl btn-primary text-sm"
          >
            Volver a rapear
          </Link>
        </div>
      ) : (
        <>
          {/* Plan cards */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`w-full p-5 rounded-2xl text-left transition-all card-dark relative ${
                selectedPlan === "yearly"
                  ? "card-selected ring-2 ring-accent"
                  : "hover:border-white/10"
              }`}
            >
              <span className="absolute -top-2 right-4 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-[#0a0a0b]">
                Ahorra {PRO_PRICE.yearlySavingsPct}%
              </span>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-lg font-bold uppercase tracking-wide">
                  Anual
                </span>
                <span className="text-3xl font-black">{priceFor("yearly")}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Un pago al año</span>
                {!native && <span>~$1.25 / mes</span>}
              </div>
            </button>

            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`w-full p-5 rounded-2xl text-left transition-all card-dark ${
                selectedPlan === "monthly"
                  ? "card-selected ring-2 ring-accent"
                  : "hover:border-white/10"
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-lg font-bold uppercase tracking-wide">
                  Mensual
                </span>
                <span className="text-3xl font-black">
                  {priceFor("monthly")}
                </span>
              </div>
              <div className="text-xs text-muted">Cancela cuando quieras</div>
            </button>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={busy}
            className="w-full py-4 rounded-2xl btn-primary text-lg font-bold mb-3 disabled:opacity-60"
          >
            {busy ? "Procesando…" : "Empezar con Pro"}
          </button>

          {native && (
            <button
              onClick={handleRestore}
              disabled={busy}
              className="w-full py-2 mb-6 text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors disabled:opacity-60"
            >
              Restaurar compras
            </button>
          )}

          {/* Value table */}
          <div className="card-dark rounded-2xl p-5 mb-6">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div></div>
              <div className="text-center font-bold uppercase tracking-wider text-muted">
                Gratis
              </div>
              <div className="text-center font-bold uppercase tracking-wider text-accent">
                Pro
              </div>

              <Row label="Sesiones / día" free={`${FREE_DAILY_SESSIONS}`} pro="∞" />
              <Row label="Todos los beats" free="✓" pro="✓" />
              <Row label="Sin límite diario" free="—" pro="✓" />
              <Row label="Apoyo al proyecto" free="—" pro="✓" />
            </div>
          </div>

          <p className="text-[10px] text-muted text-center px-4 leading-relaxed">
            Los precios pueden variar por región. La suscripción se renueva
            automáticamente; se cancela desde la configuración de la cuenta de
            la tienda.
          </p>
          <p className="text-[10px] text-muted/70 text-center mt-3">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Política de privacidad
            </Link>
          </p>

          {/* Dev-only manual toggle so we can verify Pro paths without a live
              checkout. Hidden in prod unless NEXT_PUBLIC_PRO_DEV_TOGGLE=1. */}
          {DEV_TOGGLE_ON && (
            <button
              onClick={() => setPro(true)}
              className="mt-8 w-full py-2 text-[10px] uppercase tracking-wider text-muted/60 border border-dashed border-muted/20 rounded-lg hover:text-accent hover:border-accent/40 transition-colors"
            >
              [dev] Activar Pro localmente
            </button>
          )}
        </>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] px-5 py-3 rounded-2xl card-dark text-sm shadow-xl animate-fade-in"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  free,
  pro,
}: {
  label: string;
  free: string;
  pro: string;
}) {
  return (
    <>
      <div className="text-muted py-1">{label}</div>
      <div className="text-center py-1">{free}</div>
      <div className="text-center text-accent font-bold py-1">{pro}</div>
    </>
  );
}
