import type { Metadata } from "next";
import Link from "next/link";
import { PRO_PRICE } from "@/lib/entitlements";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Términos — Tarima",
  description: "Términos de servicio de Tarima.",
};

// Plain-language Terms of Service. Covers the subscription disclosures that
// auto-renewing IAP legally needs (price, renewal, cancellation, who bills),
// plus the usual licence / disclaimer / liability clauses. Hosted as a real
// route so the deployed web build gives a public Terms URL.
export default function TermsPage() {
  return (
    <div className="app-screen flex flex-col px-5 pt-8 pb-12 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
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
          Términos
        </span>
        <div className="w-10" />
      </div>

      <h1 className="text-4xl font-display uppercase tracking-tight text-foreground mb-2">
        Términos
      </h1>
      <p className="text-xs text-muted mb-8">Última actualización: junio 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <Section title="Aceptación">
          Al usar Tarima se aceptan estos términos. Si no se está de acuerdo, no
          usar la aplicación.
        </Section>

        <Section title="Uso de la aplicación">
          Tarima es una herramienta de entrenamiento de freestyle. Se concede
          una licencia personal, no exclusiva e intransferible para usar la
          aplicación. No se permite copiar, redistribuir ni extraer el contenido
          de la aplicación para distribuirlo por separado.
        </Section>

        <Section title="Suscripción Tarima Pro">
          Todos los beats son gratuitos para todas las personas. La versión
          gratuita incluye un número limitado de sesiones por día; Tarima Pro
          ofrece sesiones ilimitadas. Precios de referencia:{" "}
          {PRO_PRICE.monthly}/mes o {PRO_PRICE.yearly}/año (pueden
          variar por región e impuestos). La suscripción se compra y se gestiona
          a través de Google Play y <strong>se renueva automáticamente</strong>{" "}
          al final de cada período, salvo que se cancele al menos 24 horas antes
          de la renovación. La cancelación se realiza desde la configuración de
          suscripciones de la cuenta de Google Play; el acceso Pro continúa
          hasta el final del período ya pagado.
        </Section>

        <Section title="Pagos y reembolsos">
          Los pagos los procesa Google Play. Los reembolsos se rigen por la
          política de Google Play. Tarima no almacena datos de pago.
        </Section>

        <Section title="Música y propiedad intelectual">
          La música incluida en la aplicación se usa con la licencia
          correspondiente para su reproducción dentro de la app y no se
          distribuye por separado. La marca, el diseño y el código de Tarima
          pertenecen a sus autores.
        </Section>

        <Section title="Sin garantías">
          La aplicación se ofrece “tal cual”, sin garantías de ningún tipo. No se
          garantiza que funcione sin interrupciones ni errores.
        </Section>

        <Section title="Límite de responsabilidad">
          En la máxima medida permitida por la ley, Tarima no será responsable
          de daños indirectos o derivados del uso o la imposibilidad de uso de la
          aplicación.
        </Section>

        <Section title="Cambios">
          Estos términos pueden actualizarse. El uso continuado tras un cambio
          implica la aceptación de la versión actualizada.
        </Section>

        <Section title="Contacto">
          Consultas: <span className="text-accent">{SUPPORT_EMAIL}</span>.
        </Section>
      </div>

      <p className="text-[10px] text-muted/70 text-center mt-8">
        <Link href="/privacy" className="hover:text-accent transition-colors">
          Política de privacidad
        </Link>
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-2">
        {title}
      </h2>
      <p className="text-foreground/80">{children}</p>
    </section>
  );
}
