import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidad — Tarima",
  description: "Política de privacidad de Tarima.",
};

// Plain, honest privacy policy. Tarima stores progress locally on the device
// and collects no personal data. Purchases (native) run through Google Play /
// RevenueCat. Kept as a real route so the deployed web build gives Google a
// public privacy-policy URL for the Play listing.
export default function PrivacyPage() {
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
          Privacidad
        </span>
        <div className="w-10" />
      </div>

      <h1 className="text-4xl font-display uppercase tracking-tight text-foreground mb-2">
        Privacidad
      </h1>
      <p className="text-xs text-muted mb-8">Última actualización: junio 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/90">
        <Section title="Resumen">
          Tarima funciona en el dispositivo. No hay cuentas, no hay inicio de
          sesión y no se recopilan datos personales. El progreso se guarda solo
          de forma local.
        </Section>

        <Section title="Qué se guarda (en el dispositivo)">
          Sesiones, barras, rachas, logros y la preferencia de cada beat
          (sincronización del ritmo) se almacenan en el almacenamiento local del
          dispositivo. Esa información nunca sale del teléfono y se borra al
          desinstalar la aplicación o limpiar los datos.
        </Section>

        <Section title="Qué NO se recopila">
          No se piden ni se recopilan nombre, correo, contactos, ubicación,
          fotos ni identificadores publicitarios. La aplicación no incluye
          anuncios ni rastreadores de terceros.
        </Section>

        <Section title="Compras">
          La suscripción Pro se procesa a través de Google Play Billing, con
          RevenueCat como intermediario para validar la compra. Esos servicios
          gestionan el pago según sus propias políticas; Tarima solo recibe si
          la suscripción está activa o no, sin datos de la tarjeta. Consultar la
          política de privacidad de Google y de RevenueCat para más detalle.
        </Section>

        <Section title="Música">
          Los beats incluidos provienen de Pixabay bajo la Licencia de
          Contenido de Pixabay y se reproducen localmente desde la aplicación.
        </Section>

        <Section title="Menores de edad">
          Tarima no está dirigida a menores de 13 años y no recopila datos de
          forma consciente de ninguna persona.
        </Section>

        <Section title="Cambios">
          Si esta política cambia, se actualizará esta página con una nueva
          fecha.
        </Section>

        <Section title="Contacto">
          Para cualquier consulta sobre privacidad, escribir a{" "}
          <span className="text-accent">hola@tarima.app</span>.
        </Section>
      </div>
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
