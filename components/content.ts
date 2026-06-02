import type { QuizMemory, StepId } from "./types";

export const SECRET_CODE = "909134";

export const quizMemories: QuizMemory[] = [
  { image: "/1.jpeg", answer: "chutir amontron" },
  { image: "/2.jpeg", answer: "lalbandh" },
  { image: "/3.jpeg", answer: "amar kuthi" },
  { image: "/4.jpeg", answer: "sayarbithi" },
];

export const birthdayLetter = `My love,

Happy birthday. Today I want to celebrate you with all the softness, respect, and honesty I have.

I know I have hurt you, and I am truly sorry. I do not want to force your heart or make your pain smaller than it is. I only want to show you that I understand, that I am learning, and that loving you means becoming gentler, calmer, and better.

তুমি আমার জীবনের সবচেয়ে সুন্দর অনুভূতি। তোমার হাসি, তোমার অভিমান, তোমার স্বপ্ন - সবকিছু আমার কাছে খুব দামী।

On your birthday, I wish you peace, happiness, and every little magic your heart deserves. If you can give me one more chance, I promise to love you with more patience, more care, and more truth.

শুভ জন্মদিন, আমার ভালোবাসা।`;

export const stepLabels: Record<StepId, string> = {
  code: "Secret",
  quiz: "Memories",
  video: "Sorry",
  letter: "Letter",
  final: "Love",
};
