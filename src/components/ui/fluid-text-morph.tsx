"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphAnimationProps {
  initialColor?: string;
  animateColor?: string;
  exitColor?: string;
}

export interface FluidTextMorphProps {
  wordPairs?: [string, string][];
  className?: string;
  animationProps?: MorphAnimationProps;
  /** Auto-cycle interval in ms. Set to 0 to disable. */
  autoCycleMs?: number;
}

const DEFAULT_PAIRS: [string, string][] = [
  ["Modern OB/GYN", "Trusted Care"],
  ["Precision Scans", "Absolute Certainty"],
  ["3D/4D Ultrasound", "Maternal Sanctuary"],
  ["Rapid Triage", "Same-Day Results"],
];

export function FluidTextMorph({
  wordPairs = DEFAULT_PAIRS,
  className,
  animationProps = {},
  autoCycleMs = 3200,
}: FluidTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const {
    initialColor = "#F4B9B9",
    animateColor = "#FFD43A",
    exitColor = "#122954",
  } = animationProps;

  const safePairs = wordPairs.length > 0 ? wordPairs : DEFAULT_PAIRS;
  const activeWord = hovered ? safePairs[index][1] : safePairs[index][0];
  const letters = activeWord.split("");

  const advance = useCallback(
    () => setIndex((prev) => (prev + 1) % safePairs.length),
    [safePairs.length],
  );

  useEffect(() => {
    if (autoCycleMs <= 0 || hovered) return;
    const id = setTimeout(advance, autoCycleMs);
    return () => clearTimeout(id);
  }, [index, hovered, autoCycleMs, advance]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click to cycle diagnostic service highlights"
      className={cn(
        "relative flex flex-wrap cursor-pointer items-center justify-center",
        "font-serif font-bold italic tracking-tight select-none py-4 text-center",
        "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43A]/60 rounded-lg",
        className,
      )}
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={advance}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && advance()}
    >
      <AnimatePresence mode="popLayout">
        {letters.map((letter, i) => (
          <motion.span
            key={`${index}-${hovered ? "b" : "a"}-${i}-${letter}`}
            initial={{ opacity: 0, y: 22, scale: 0.82, color: initialColor }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: animateColor,
              transition: {
                type: "spring",
                damping: 14,
                stiffness: 210,
                delay: i * 0.028,
              },
            }}
            exit={{
              opacity: 0,
              y: -18,
              scale: 0.88,
              color: exitColor,
              transition: {
                type: "spring",
                damping: 14,
                stiffness: 210,
                delay: (letters.length - 1 - i) * 0.018,
              },
            }}
            className="inline-block relative whitespace-pre"
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FluidTextMorph;
