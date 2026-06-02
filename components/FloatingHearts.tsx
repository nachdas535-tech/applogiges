"use client";

import type { CSSProperties } from "react";
import type { FloatingHeart } from "./types";

const hearts: FloatingHeart[] = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  size: 12 + ((index * 7) % 18),
  drift: -34 + ((index * 13) % 72),
  duration: 7 + ((index * 3) % 8),
  delay: -1 * ((index * 5) % 9),
  opacity: 0.18 + ((index % 5) * 0.1),
}));

export default function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle absolute bottom-[-40px] text-pink-400"
          style={
            {
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
              "--drift": `${heart.drift}px`,
              "--duration": `${heart.duration}s`,
              "--delay": `${heart.delay}s`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}
