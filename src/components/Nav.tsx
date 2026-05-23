"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/diccionario", label: "Diccionario" },
  { href: "/perfil", label: "Perfil" },
];

export function Nav() {
  const pathname = usePathname();
  // Cheap selector — re-renders are rare on Nav, and only flip when the
  // user toggles Pro.
  const isPro = useAppStore((s) => s.entitlements.isPro);
  // Persisted store means SSR doesn't know if you're Pro yet. Defer the
  // styled badge until mount so we don't ship a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (pathname === "/juego") return null;

  return (
    <nav className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Tarima
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Pro entry. Shown to everyone — upgrade path for free users,
              "you're in" badge for subscribers. */}
          <Link
            href="/pro"
            className={`ml-1 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
              pathname === "/pro"
                ? "bg-accent/10 text-accent"
                : mounted && isPro
                  ? "bg-gradient-to-r from-accent to-gold text-black"
                  : "text-accent hover:bg-accent/10"
            }`}
          >
            {mounted && isPro ? "★ Pro" : "Pro"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
