"use client";

import type { CSSProperties } from "react";
import type { ConfettiPiece } from "./types";

const colors = ["#f472b6", "#c084fc", "#fb7185", "#ffffff", "#f9a8d4"];

const pieces: ConfettiPiece[] = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: (index * 19) % 100,
  x: -120 + ((index * 29) % 240),
  duration: 1.8 + ((index % 9) * 0.14),
  delay: (index % 12) * 0.025,
  color: colors[index % colors.length],
  rotate: (index * 31) % 180,
}));

export default function ConfettiBurst() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-0 h-3 w-2 rounded-[2px]"
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotate}deg)`,
              "--x": `${piece.x}px`,
              "--duration": `${piece.duration}s`,
              "--delay": `${piece.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
