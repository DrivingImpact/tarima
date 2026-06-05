"use client";

import Link from "next/link";
import { FREE_DAILY_SESSIONS, PRO_PRICE } from "@/lib/entitlements";

interface PaywallProps {
  // Why the paywall is open. Drives the headline + CTA copy so the
  // ask matches the moment — hitting the cap reads differently from
  // bumping into a locked beat.
  reason: "daily-cap" | "pro-beat";
  onClose: () => void;
}

export function Paywall({ reason, onClose }: PaywallProps) {
  const headline =
    reason === "daily-cap"
      ? `Llegaste a las ${FREE_DAILY_SESSIONS} sesiones de hoy`
      : "Beat de Pro";

  const subhead =
    reason === "daily-cap"
      ? "El contador se reinicia mañana. O bien — sin límites con Pro."
      : "Este beat es parte de la biblioteca completa de Pro.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md card-dark rounded-t-3xl sm:rounded-3xl p-6 pb-8 sm:pb-6 animate-slide-up"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Tarima Pro
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full card-dark flex items-center justify-center text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <h2 id="paywall-title" className="text-2xl font-black mb-2 leading-tight">
          {headline}
        </h2>
        <p className="text-sm text-muted mb-6">{subhead}</p>

        {/* Value props — kept tight, every line earns its space */}
        <ul className="space-y-2 mb-6 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span>
            <span>Sesiones ilimitadas todos los días</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span>
            <span>Más variedad de beats para entrenar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">✓</span>
            <span>Sin anuncios, sin distracciones</span>
          </li>
        </ul>

        <Link
          href="/pro"
          onClick={onClose}
          className="block w-full py-4 rounded-2xl btn-primary text-center text-lg font-bold"
        >
          Ver Pro · desde {PRO_PRICE.yearly}/año
        </Link>

        <button
          onClick={onClose}
          className="block w-full mt-3 py-3 text-center text-xs text-muted uppercase tracking-wider"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}
