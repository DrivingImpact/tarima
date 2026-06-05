import type { MetadataRoute } from "next";

// Required so the manifest route is emitted as a static file under
// `output: "export"` (the Capacitor bundle has no server to generate it).
export const dynamic = "force-static";

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
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
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
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["entertainment", "music", "education"],
  };
}
