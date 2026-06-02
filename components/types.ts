export type StepId = "code" | "quiz" | "video" | "letter" | "final";

export interface QuizMemory {
  image: string;
  answer: string;
}

export interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  drift: number;
  duration: number;
  delay: number;
  opacity: number;
}

export interface ConfettiPiece {
  id: number;
  left: number;
  x: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
}
