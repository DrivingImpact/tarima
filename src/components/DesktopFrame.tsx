"use client";

import { useEffect, useState } from "react";

// Wraps app content in a phone-shaped frame on desktop (≥md). On mobile the
// frame is invisible (display: contents) so the app fills the device viewport
// exactly as before.
export function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop-frame-stage">
      <div className="desktop-frame">
        <div className="desktop-frame-inner">
          <div className="desktop-frame-notch" aria-hidden />
          <StatusBar />
          <div className="desktop-frame-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="desktop-frame-statusbar" aria-hidden>
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
      <rect x="9" y="3" width="3" height="8" rx="0.5" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M1 4.2 A 9 9 0 0 1 14 4.2" strokeLinecap="round" />
      <path d="M3.5 6.5 A 6 6 0 0 1 11.5 6.5" strokeLinecap="round" />
      <path d="M6 8.8 A 3 3 0 0 1 9 8.8" strokeLinecap="round" />
      <circle cx="7.5" cy="10" r="0.7" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
      <rect x="23" y="4" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
