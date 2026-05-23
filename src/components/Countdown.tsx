"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 800);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center animate-slide-up" key={count}>
        {count > 0 ? (
          <p className="text-8xl font-black text-accent">{count}</p>
        ) : (
          <p className="text-5xl font-black text-accent">GO!</p>
        )}
      </div>
    </div>
  );
}
