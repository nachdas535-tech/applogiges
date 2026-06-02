"use client";

import { motion } from "framer-motion";
import { stepLabels } from "./content";
import type { StepId } from "./types";

const steps: StepId[] = ["code", "quiz", "video", "letter", "final"];

interface ProgressIndicatorProps {
  currentStep: StepId;
  quizIndex: number;
  quizTotal: number;
}

export default function ProgressIndicator({
  currentStep,
  quizIndex,
  quizTotal,
}: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);
  const quizBoost =
    currentStep === "quiz" ? Math.max(0, quizIndex / Math.max(quizTotal, 1)) : 0;
  const progress = ((currentIndex + quizBoost) / (steps.length - 1)) * 100;

  return (
    <div className="fixed left-1/2 top-4 z-40 w-[min(92vw,520px)] -translate-x-1/2">
      <div className="glass-panel rounded-full px-3 py-2">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-700/70">
          {steps.map((step) => (
            <span
              key={step}
              className={step === currentStep ? "text-pink-700" : "hidden text-purple-700/50 min-[430px]:inline"}
            >
              {stepLabels[step]}
            </span>
          ))}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
