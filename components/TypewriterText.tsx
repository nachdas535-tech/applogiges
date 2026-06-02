"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 24 }: TypewriterTextProps) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleLength((currentLength) => {
        if (currentLength >= text.length) {
          window.clearInterval(timer);
          return currentLength;
        }

        return currentLength + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, text]);

  const visibleText = text.slice(0, visibleLength);

  return (
    <p className="whitespace-pre-line text-left text-[15px] leading-7 text-purple-950 sm:text-base">
      {visibleText}
      <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-pink-500" />
    </p>
  );
}
