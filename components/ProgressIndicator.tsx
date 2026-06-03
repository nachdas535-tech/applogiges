"use client";

import { motion } from "framer-motion";
import { stepLabels } from "./content";
import type { StepId } from "./types";

const steps: StepId[] = ["code", "quiz", "video", "letter", "final"];

interface ProgressIndicatorProps {
  currentStep: StepId;
  quizIndex: number;
  quizTotal: number;
  unlockedStepIndex: number;
  isTransitioning: boolean;
  onSelectStep: (step: StepId) => void;
}

export default function ProgressIndicator({
  currentStep,
  quizIndex,
  quizTotal,
  unlockedStepIndex,
  isTransitioning,
  onSelectStep,
}: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);
  const quizBoost =
    currentStep === "quiz" ? Math.max(0, quizIndex / Math.max(quizTotal, 1)) : 0;
  const progress = ((currentIndex + quizBoost) / (steps.length - 1)) * 100;

  return (
    <div className="fixed left-1/2 top-3 z-40 w-[min(96vw,780px)] -translate-x-1/2 sm:top-4">
      <div className="luxury-nav rounded-full px-2 py-2.5 sm:px-3 sm:py-3">
        <div className="grid grid-cols-5 gap-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-purple-700/70 min-[390px]:text-[9px] min-[390px]:tracking-[0.18em] sm:gap-1 sm:text-xs sm:tracking-[0.3em]">
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              disabled={index > unlockedStepIndex || isTransitioning}
              onClick={() => onSelectStep(step)}
              className={`relative min-h-8 rounded-full px-0.5 transition sm:px-1 ${
                step === currentStep
                  ? "text-pink-700"
                  : "text-purple-700/55"
              } disabled:cursor-not-allowed disabled:opacity-35`}
            >
              {step === currentStep ? (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_rgba(236,72,153,0.18)]"
                />
              ) : null}
              <span className="relative z-10">{stepLabels[step]}</span>
            </button>
          ))}
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80">
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
