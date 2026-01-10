import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CINEMATIC_TIMING = {
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    dramatic: [0.76, 0, 0.24, 1],
    elastic: [0.68, -0.55, 0.265, 1.55],
    cinematic: [0.83, 0, 0.17, 1],
  },
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.5,
    epic: 2.5,
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;
