"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RomanticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export default function RomanticButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: RomanticButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white shadow-lg shadow-pink-500/25"
      : "border border-pink-200/80 bg-white/68 text-pink-800 shadow-sm";

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`min-h-12 rounded-full px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${classes} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
