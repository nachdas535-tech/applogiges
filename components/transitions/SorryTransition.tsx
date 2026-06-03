"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { CinematicTransitionProps } from "../types";

export default function SorryTransition({ onComplete }: CinematicTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rain = Array.from(rainRef.current?.querySelectorAll("span") ?? []);
      const timeline = gsap.timeline({ onComplete });

      timeline
        .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(".foot-left", { opacity: 0, x: 0, y: 140, rotate: -4 }, { opacity: 1, x: -170, y: -180, rotate: -23, stagger: 0.18, duration: 2.2, ease: "power2.out" }, 0.35)
        .fromTo(".foot-right", { opacity: 0, x: 0, y: 140, rotate: 4 }, { opacity: 1, x: 170, y: -180, rotate: 23, stagger: 0.18, duration: 2.2, ease: "power2.out" }, 0.35)
        .fromTo(rain, { opacity: 0, y: -160 }, { opacity: 0.7, y: 460, stagger: 0.01, duration: 1.9, ease: "none" }, 1.5)
        .fromTo(".sorry-word", { y: 34, letterSpacing: "0.35em", opacity: 0 }, { y: 0, letterSpacing: "0.18em", opacity: 1, duration: 1.2, ease: "power3.out" }, 2.15)
        .to(rootRef.current, { opacity: 0, duration: 0.55 }, 4.45);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={rootRef} className="cinematic-overlay overflow-hidden bg-[#160b18]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,146,60,0.36)_0%,rgba(88,28,135,0.48)_42%,rgba(24,24,27,0.95)_100%)]" />
      <div className="absolute bottom-0 left-1/2 h-[72vh] w-[130vw] -translate-x-1/2 rounded-t-[50%] bg-gradient-to-b from-zinc-700/60 to-zinc-950" />
      <div className="absolute left-1/2 top-[55%] h-[70vh] w-1 -translate-x-1/2 -translate-y-1/2 bg-white/20" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={`l-${index}`} className="foot-left absolute block h-9 w-5 rounded-[50%] bg-pink-100/55 shadow-[0_0_24px_rgba(255,255,255,0.28)]" style={{ top: index * 42, left: -28 }} />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <span key={`r-${index}`} className="foot-right absolute block h-9 w-5 rounded-[50%] bg-purple-100/55 shadow-[0_0_24px_rgba(255,255,255,0.28)]" style={{ top: index * 42, left: 28 }} />
        ))}
      </div>
      <div ref={rainRef} className="absolute inset-0 z-20">
        {Array.from({ length: 96 }, (_, index) => (
          <span key={index} className="absolute h-12 w-px rotate-12 bg-blue-100/60" style={{ left: `${(index * 17) % 100}%`, top: `${-20 - (index % 12) * 8}%` }} />
        ))}
      </div>
      <p className="sorry-word absolute left-0 top-[22%] z-30 w-full text-center text-5xl font-black uppercase text-white/90 drop-shadow-2xl sm:text-7xl">
        Sorry
      </p>
    </div>
  );
}
