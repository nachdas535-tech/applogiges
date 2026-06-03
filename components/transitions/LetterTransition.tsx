"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { CinematicTransitionProps } from "../types";

export default function LetterTransition({ onComplete }: CinematicTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete });

      timeline
        .fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .fromTo(".envelope", { y: -420, rotate: -14, scale: 0.72 }, { y: 0, rotate: 0, scale: 1, duration: 0.9, ease: "back.out(1.6)" }, 0.15)
        .to(".seal", { scale: 0, rotate: 180, duration: 0.34, ease: "back.in(2)" }, 1.05)
        .to(".flap", { rotateX: 180, transformOrigin: "50% 100%", duration: 0.72, ease: "power3.inOut" }, 1.15)
        .fromTo(".letter-paper", { y: 80, scaleY: 0.2, opacity: 0 }, { y: -100, scaleY: 1, opacity: 1, duration: 0.92, ease: "power3.out" }, 1.52)
        .fromTo(".ink-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0 50%", stagger: 0.11, duration: 0.42, ease: "power2.out" }, 2.0)
        .to(rootRef.current, { opacity: 0, duration: 0.42 }, 2.75);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={rootRef} className="cinematic-overlay bg-[#f7dfbf]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_34%),linear-gradient(135deg,rgba(255,241,242,0.8),rgba(245,158,11,0.18))]" />
      <div className="envelope absolute left-1/2 top-1/2 h-52 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-96">
        <div className="letter-paper absolute left-8 top-0 z-10 h-64 w-[calc(100%-4rem)] rounded-t-2xl bg-[#fffaf0] p-6 shadow-2xl">
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} className="ink-line mb-4 block h-2 rounded-full bg-pink-400/50" style={{ width: `${92 - index * 7}%` }} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 h-44 rounded-3xl bg-pink-100 shadow-2xl" />
        <div className="flap absolute inset-x-0 bottom-28 z-30 mx-auto h-36 w-full bg-rose-200 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        <div className="seal absolute left-1/2 top-[58%] z-40 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-2xl text-white shadow-xl">
          ♥
        </div>
      </div>
    </div>
  );
}
