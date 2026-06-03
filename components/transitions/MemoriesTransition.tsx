"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CinematicTransitionProps } from "../types";

export default function MemoriesTransition({
  onComplete,
  photos = [],
}: CinematicTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const crackRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = Array.from(particleRef.current?.querySelectorAll("span") ?? []);
      const timeline = gsap.timeline({ onComplete });

      timeline
        .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .fromTo(".memory-thumb", { opacity: 0, y: 20, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: "back.out(1.8)" }, 0.25)
        .fromTo([leftRef.current, rightRef.current], { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: "elastic.out(1,0.65)" }, 0.1)
        .fromTo(crackRef.current, { strokeDasharray: 420, strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.85, ease: "power3.in" }, 1.35)
        .to(leftRef.current, { x: -330, rotate: -12, duration: 1.08, ease: "power3.inOut" }, 2.05)
        .to(rightRef.current, { x: 330, rotate: 12, duration: 1.08, ease: "power3.inOut" }, 2.05)
        .to(".memory-thumb", { x: () => gsap.utils.random(-220, 220), y: () => gsap.utils.random(-180, 180), rotate: () => gsap.utils.random(-35, 35), scale: 0.72, opacity: 0, duration: 1.0, stagger: 0.04 }, 2.05)
        .fromTo(particles, { opacity: 0, x: 0, y: 0, scale: 0.4 }, {
          opacity: 1,
          x: () => gsap.utils.random(-420, 420),
          y: () => gsap.utils.random(-260, 260),
          scale: () => gsap.utils.random(0.4, 1.4),
          stagger: 0.004,
          duration: 1.1,
          ease: "power4.out",
        }, 2.12)
        .to(rootRef.current, { opacity: 0, duration: 0.45 }, 3.55);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={rootRef} className="cinematic-overlay bg-[#13051b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.34),transparent_38%),linear-gradient(135deg,rgba(59,7,100,0.96),rgba(131,24,67,0.94))]" />
      <div className="absolute left-1/2 top-1/2 z-20 grid -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-3">
        {photos.slice(0, 4).map((photo, index) => (
          <div key={photo} className="memory-thumb relative size-20 overflow-hidden rounded-2xl border border-white/50 shadow-2xl sm:size-28">
            <Image src={photo} alt={`Memory fragment ${index + 1}`} fill sizes="112px" className="object-cover" />
          </div>
        ))}
      </div>
      <svg viewBox="0 0 600 520" className="relative z-10 h-full w-full overflow-visible">
        <defs>
          <clipPath id="left-heart"><rect x="0" y="0" width="300" height="520" /></clipPath>
          <clipPath id="right-heart"><rect x="300" y="0" width="300" height="520" /></clipPath>
        </defs>
        <path
          ref={leftRef}
          clipPath="url(#left-heart)"
          className="origin-center fill-pink-500/80 stroke-white/50 stroke-[2]"
          d="M300 455C164 338 80 263 80 166 80 92 135 48 201 48c41 0 78 22 99 57 21-35 58-57 99-57 66 0 121 44 121 118 0 97-84 172-220 289Z"
        />
        <path
          ref={rightRef}
          clipPath="url(#right-heart)"
          className="origin-center fill-fuchsia-500/80 stroke-white/50 stroke-[2]"
          d="M300 455C164 338 80 263 80 166 80 92 135 48 201 48c41 0 78 22 99 57 21-35 58-57 99-57 66 0 121 44 121 118 0 97-84 172-220 289Z"
        />
        <path ref={crackRef} d="M304 91 274 163l37 45-45 52 44 54-34 78" fill="none" stroke="#fff7ad" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div ref={particleRef} className="absolute left-1/2 top-1/2 z-30">
        {Array.from({ length: 180 }, (_, index) => (
          <span key={index} className="absolute size-1 rounded-full bg-pink-100 shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
        ))}
      </div>
    </div>
  );
}
