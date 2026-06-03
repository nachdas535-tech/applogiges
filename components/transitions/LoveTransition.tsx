"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { CinematicTransitionProps } from "../types";

export default function LoveTransition({ onComplete }: CinematicTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);
  const fireflyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pieces = Array.from(piecesRef.current?.querySelectorAll("span") ?? []);
      const fireflies = Array.from(fireflyRef.current?.querySelectorAll("span") ?? []);
      const timeline = gsap.timeline({ onComplete });

      timeline
        .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .fromTo(pieces, {
          opacity: 0,
          x: () => gsap.utils.random(-420, 420),
          y: () => gsap.utils.random(-300, 300),
          rotate: () => gsap.utils.random(-160, 160),
          scale: 0.55,
        }, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          stagger: 0.05,
          duration: 2.2,
          ease: "power3.inOut",
        }, 0.25)
        .to(".rebuilt-heart", { scale: 1.16, filter: "drop-shadow(0 0 42px rgba(244,114,182,0.9))", duration: 0.38, yoyo: true, repeat: 2 }, 2.45)
        .fromTo(fireflies, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.025, duration: 0.8, ease: "back.out(2)" }, 2.7)
        .fromTo(".constellation-line", { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1.25, ease: "power2.out" }, 3.0)
        .to(rootRef.current, { opacity: 0, duration: 0.55 }, 4.55);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={rootRef} className="cinematic-overlay bg-[#070817]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_38%),linear-gradient(180deg,#080717,#1f0b2e)]" />
      <svg viewBox="0 0 520 420" className="absolute inset-0 z-10 h-full w-full">
        <path className="constellation-line" d="M132 130 198 88 260 142 322 88 390 132 360 230 260 326 160 230Z" fill="none" stroke="rgba(255,255,255,0.68)" strokeWidth="2" />
      </svg>
      <div ref={piecesRef} className="rebuilt-heart absolute left-1/2 top-1/2 z-20 size-72 -translate-x-1/2 -translate-y-1/2">
        {[
          "polygon(50% 6%, 71% 24%, 50% 48%, 29% 24%)",
          "polygon(29% 24%, 50% 48%, 50% 79%, 18% 48%)",
          "polygon(71% 24%, 82% 48%, 50% 79%, 50% 48%)",
          "polygon(18% 48%, 50% 79%, 50% 94%, 28% 72%)",
          "polygon(82% 48%, 72% 72%, 50% 94%, 50% 79%)",
          "polygon(29% 24%, 18% 48%, 8% 32%, 14% 14%)",
          "polygon(71% 24%, 86% 14%, 92% 32%, 82% 48%)",
        ].map((clip, index) => (
          <span key={index} className="absolute inset-0 bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-500" style={{ clipPath: clip }} />
        ))}
      </div>
      <div ref={fireflyRef} className="absolute inset-0 z-30">
        {Array.from({ length: 74 }, (_, index) => (
          <span key={index} className="absolute size-1.5 rounded-full bg-amber-100 shadow-[0_0_16px_rgba(252,211,77,0.9)]" style={{ left: `${(index * 31) % 100}%`, top: `${(index * 47) % 100}%` }} />
        ))}
      </div>
    </div>
  );
}
