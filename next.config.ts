import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → a self-contained `out/` directory. This is what Capacitor
  // bundles into the Android app, so the whole game (incl. the 11 beats in
  // public/beats-v2) ships offline with no server / R2 / Sheet dependency.
  output: "export",
  // No next/image loader at runtime in an exported build.
  images: { unoptimized: true },
  // Emit `/route/index.html` so the Android WebView resolves deep paths from
  // the file system if it ever hard-loads one (SPA nav is client-side anyway).
  trailingSlash: true,
};

export default nextConfig;
