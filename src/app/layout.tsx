import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import { DesktopFrame } from "@/components/DesktopFrame";
import { PurchasesInit } from "@/components/PurchasesInit";
import { AppUpdater } from "@/components/AppUpdater";
import { NativeChrome } from "@/components/NativeChrome";
import "./globals.css";

// Type system — "Acid Underground":
//   • Anton (condensed heavy caps)  → display: wordmark, hero titles, the
//     live rhyme word, countdown. Non-variable, single weight.
//   • Archivo                       → body / UI: buttons, cards, labels.
//   • JetBrains Mono                → tabular numerics: timers, beat counter,
//     rhyme-scheme codes.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarima — Entrenamiento de Freestyle",
  description:
    "La tarima del freestyle. Beats sincronizados, palabras al ritmo, múltiples modos de juego.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Tarima",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${anton.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stage text-foreground">
        <PurchasesInit />
        <AppUpdater />
        <NativeChrome />
        <DesktopFrame>{children}</DesktopFrame>
      </body>
    </html>
  );
}
