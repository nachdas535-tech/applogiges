"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import ConfettiBurst from "./ConfettiBurst";
import {
  SECRET_CODE,
  birthdayLetter,
  quizMemories,
} from "./content";
import FloatingHearts from "./FloatingHearts";
import ProgressIndicator from "./ProgressIndicator";
import RomanticButton from "./RomanticButton";
import TypewriterText from "./TypewriterText";
import type { StepId } from "./types";

const pageMotion = {
  initial: { opacity: 0, y: 22, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.98 },
};

const normalizeAnswer = (value: string) => value.trim().toLowerCase();
const CODE_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"];

export default function BirthdayExperience() {
  const [step, setStep] = useState<StepId>("code");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeAttempts, setCodeAttempts] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentMemory = quizMemories[quizIndex];
  const isLastMemory = quizIndex === quizMemories.length - 1;

  const birthdayWish = useMemo(() => {
    const wishes = [
      "শুভ জন্মদিন, আমার প্রিয় মানুষ",
      "তোমার হাসি আমার সবচেয়ে সুন্দর উপহার",
      "আজ শুধু তোমার জন্য ভালোবাসা আর শান্তি",
      "আরেকটা সুযোগ চাই, আরও ভালোভাবে ভালোবাসার জন্য",
    ];

    return wishes[Math.min(quizIndex, wishes.length - 1)];
  }, [quizIndex]);

  useEffect(() => {
    if (!showConfetti) return;

    const timer = window.setTimeout(() => setShowConfetti(false), 2800);
    return () => window.clearTimeout(timer);
  }, [showConfetti]);

  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCodeAttempts((value) => value + 1);
    if (code === SECRET_CODE) {
      setCodeError("");
      setCodeAttempts(0);
      setStep("quiz");
      return;
    }

    setCodeError("ভুল কোড, আবার চেষ্টা করো ❤️");
  }

  function handleCodeKey(key: string) {
    setCodeError("");

    if (key === "clear") {
      setCode("");
      return;
    }

    if (key === "back") {
      setCode((value) => value.slice(0, -1));
      return;
    }

    setCode((value) => `${value}${key}`.slice(0, 6));
  }

  function submitQuizAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isCorrect =
      normalizeAnswer(answer) === normalizeAnswer(currentMemory.answer);

    setHasSubmittedAnswer(true);
    setQuizFeedback(
      isCorrect
        ? "Perfect ❤️ তুমি মনে রেখেছো"
        : `Not quite ❤️ Correct answer: ${currentMemory.answer}`,
    );
  }

  function goToNextMemory() {
    setAnswer("");
    setQuizFeedback("");
    setHasSubmittedAnswer(false);

    if (isLastMemory) {
      setShowConfetti(true);
      setStep("video");
      return;
    }

    setQuizIndex((value) => value + 1);
  }

  function goToFinalCall() {
    window.location.href = "tel:+916295301151";
  }

  function openWhatsApp() {
    window.open("https://wa.me/916295301151", "_blank", "noopener,noreferrer");
  }

  return (
    <main className="romantic-bg relative min-h-dvh overflow-hidden px-4 py-20 text-purple-950 sm:px-6">
      <FloatingHearts />
      {showConfetti ? <ConfettiBurst /> : null}
      <ProgressIndicator
        currentStep={step}
        quizIndex={quizIndex}
        quizTotal={quizMemories.length}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-10rem)] w-full max-w-4xl items-center justify-center">
        <AnimatePresence mode="wait">
          {step === "code" ? (
            <motion.section
              key="code"
              {...pageMotion}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="glass-panel soft-ring w-full max-w-lg rounded-[28px] px-4 py-6 text-center sm:px-8 sm:py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-white/70 text-4xl shadow-inner"
              >
                ❤️
              </motion.div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-pink-600">
                A little secret
              </p>
              <h1 className="text-4xl font-black tracking-normal text-pink-700 sm:text-5xl">
                Happy Birthday ❤️
              </h1>
              <p className="mt-3 text-lg font-semibold text-purple-800">
                Enter our secret code
              </p>
              <p className="mt-2 text-sm text-purple-700/75">
                শুধু তুমি আর আমি জানি ( My mobile password)।
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 text-left text-[11px] font-semibold text-purple-800/75">
                <div className="rounded-2xl bg-white/55 p-3">
                  <span className="block text-pink-600">Memory</span>
                  4 photos
                </div>
                <div className="rounded-2xl bg-white/55 p-3">
                  <span className="block text-pink-600">Promise</span>
                  gentle love
                </div>
                <div className="rounded-2xl bg-white/55 p-3">
                  <span className="block text-pink-600">For you</span>
                  sorry letter
                </div>
              </div>

              <form onSubmit={submitCode} className="mt-8 space-y-4">
                <input
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  aria-label="Enter six digit secret code"
                  className="h-14 w-full rounded-2xl border border-pink-200/80 bg-white/80 px-5 text-center text-2xl font-bold tracking-[0.5em] text-purple-950 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-200/70"
                  placeholder="------"
                />
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div
                      key={index}
                      className={`h-11 rounded-2xl border text-center text-xl font-black leading-11 transition ${
                        code[index]
                          ? "border-pink-300 bg-pink-50 text-pink-700 shadow-sm"
                          : "border-white/80 bg-white/45 text-purple-300"
                      }`}
                    >
                      {code[index] ? "♥" : ""}
                    </div>
                  ))}
                </div>
                {codeError ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="rounded-3xl border border-pink-200 bg-white/72 p-4 text-center"
                  >
                    <p className="text-sm font-bold text-pink-700">
                      {codeError}
                    </p>
                    <button
                      type="button"
                      onClick={() => setCode(SECRET_CODE)}
                      className="mt-3 rounded-2xl bg-pink-100 px-4 py-2 text-sm font-black text-purple-900"
                    >
                      Original code: {SECRET_CODE}
                    </button>
                    <p className="mt-2 text-xs font-semibold text-purple-700/65">
                      Attempts: {codeAttempts}. Tap the code above to fill it.
                    </p>
                  </motion.div>
                ) : null}
                <div className="grid grid-cols-3 gap-2">
                  {CODE_KEYS.map((key) => (
                    <motion.button
                      key={key}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleCodeKey(key)}
                      className={`h-12 rounded-2xl text-sm font-black shadow-sm transition ${
                        key === "clear" || key === "back"
                          ? "bg-white/65 text-purple-700"
                          : "bg-white/85 text-pink-700"
                      }`}
                    >
                      {key === "clear" ? "Clear" : key === "back" ? "⌫" : key}
                    </motion.button>
                  ))}
                </div>
                <RomanticButton type="submit" className="w-full">
                  Open my heart
                </RomanticButton>
              </form>
            </motion.section>
          ) : null}

          {step === "quiz" ? (
            <motion.section
              key={`quiz-${quizIndex}`}
              {...pageMotion}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-3xl"
            >
              <div className="mb-5 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-pink-600">
                  Memory {quizIndex + 1} of {quizMemories.length}
                </p>
                <h2 className="mt-2 text-2xl font-black text-purple-950 sm:text-4xl">
                  {birthdayWish}
                </h2>
              </div>

              <div className="glass-panel rounded-[28px] p-4 sm:p-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-pink-100 sm:aspect-[16/10]">
                  <Image
                    src={currentMemory.image}
                    alt={`Romantic memory ${quizIndex + 1}`}
                    fill
                    priority={quizIndex === 0}
                    sizes="(max-width: 768px) 92vw, 768px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-950/70 to-transparent p-4 text-white">
                    <p className="text-sm font-semibold">
                      এই মুহূর্তটা আমার কাছে এখনও খুব দামী।
                    </p>
                  </div>
                </div>

                <form onSubmit={submitQuizAnswer} className="mt-5 space-y-4">
                  <label className="block text-center text-xl font-black text-purple-950">
                    Where was this photo taken?
                  </label>
                  <input
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    disabled={hasSubmittedAnswer}
                    className="h-13 w-full rounded-2xl border border-purple-200/80 bg-white/80 px-4 text-center font-semibold text-purple-950 outline-none transition placeholder:text-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-200/70 disabled:opacity-70"
                    placeholder="Type the place name"
                  />
                  {quizFeedback ? (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm font-bold text-pink-700"
                    >
                      {quizFeedback}
                    </motion.p>
                  ) : null}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <RomanticButton
                      type="submit"
                      disabled={!answer.trim() || hasSubmittedAnswer}
                      className="w-full"
                    >
                      Check memory
                    </RomanticButton>
                    <RomanticButton
                      type="button"
                      variant="ghost"
                      disabled={!hasSubmittedAnswer}
                      onClick={goToNextMemory}
                      className="w-full"
                    >
                      {isLastMemory ? "Finish quiz" : "Next memory"}
                    </RomanticButton>
                  </div>
                </form>
              </div>
            </motion.section>
          ) : null}

          {step === "video" ? (
            <motion.section
              key="video"
              {...pageMotion}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="glass-panel w-full max-w-3xl rounded-[28px] p-5 sm:p-8"
            >
              <div className="mb-5 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-pink-600">
                  I am sorry
                </p>
                <h2 className="mt-2 text-3xl font-black text-purple-950 sm:text-5xl">
                  আমার ভুলের জন্য ক্ষমা চাই
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-purple-800/80 sm:text-base">
                  I made this because your feelings matter to me. Please watch
                  this with a soft heart, and know that I want to love you with
                  more care than before.
                </p>
              </div>
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                controls
                playsInline
                className="aspect-video w-full rounded-[22px] bg-purple-950 shadow-2xl shadow-purple-900/20"
                src="/apology.mp4"
              />
              <div className="mt-6 flex justify-center">
                <RomanticButton onClick={() => setStep("letter")}>
                  Read my letter
                </RomanticButton>
              </div>
            </motion.section>
          ) : null}

          {step === "letter" ? (
            <motion.section
              key="letter"
              {...pageMotion}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-full max-w-3xl"
            >
              <div className="glass-panel rounded-[28px] p-5 sm:p-8">
                <div className="mb-5 text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-pink-600">
                    For you
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-purple-950 sm:text-5xl">
                    A letter from my heart
                  </h2>
                </div>
                <div className="rounded-[22px] border border-pink-100 bg-white/72 p-5 shadow-inner sm:p-7">
                  <TypewriterText text={birthdayLetter} />
                </div>
                <div className="mt-6 flex justify-center">
                  <RomanticButton onClick={() => setStep("final")}>
                    One last thing
                  </RomanticButton>
                </div>
              </div>
            </motion.section>
          ) : null}

          {step === "final" ? (
            <motion.section
              key="final"
              {...pageMotion}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="glass-panel soft-ring w-full max-w-lg rounded-[28px] px-6 py-9 text-center sm:px-10"
            >
              <div className="big-heart mx-auto mb-6 text-8xl">❤️</div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-pink-600">
                Forever grateful
              </p>
              <h2 className="mt-3 text-4xl font-black text-purple-950 sm:text-5xl">
                Thank you for watching ❤️
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-purple-800/80 sm:text-base">
                শুভ জন্মদিন, আমার ভালোবাসা। If your heart is ready, I am here
                to listen, apologize, and love you better.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <RomanticButton onClick={goToFinalCall}>
                  Video Call Me 📞
                </RomanticButton>
                <RomanticButton variant="ghost" onClick={openWhatsApp}>
                  WhatsApp Me 💬
                </RomanticButton>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
