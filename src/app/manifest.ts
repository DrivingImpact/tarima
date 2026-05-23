import type { MetadataRoute } from "next";

/**
 * PWA manifest. Lets the app be installed to a phone home screen — opens
 * in standalone (no browser chrome), which matters because the home page
 * is already designed around the iPhone-frame DesktopFrame and only feels
 * right full-screen.
 *
 * `theme_color` and `background_color` mirror the `--bg-stage` token in
 * globals.css so the splash and the chrome don't flash a different colour
 * during cold start.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarima — Freestyle",
    short_name: "Tarima",
    description:
      "La tarima del freestyle. Beats sincronizados, palabras al ritmo, múltiples modos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b0b10",
    theme_color: "#0b0b10",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["entertainment", "music", "education"],
  };
}
