"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "gold" | "outline-gold" | "outline-rose" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: "bg-[#FFD43A] text-[#080f1e]",
  "outline-gold":
    "border border-[rgba(255,212,58,0.4)] text-[#FFD43A] hover:bg-[rgba(255,212,58,0.06)]",
  "outline-rose":
    "border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] hover:bg-[rgba(244,185,185,0.06)]",
  ghost: "text-[rgba(248,246,242,0.65)]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs rounded-full",
  md: "px-8 py-4 text-sm rounded-full",
  lg: "px-10 py-5 text-base rounded-full",
};

/* Parent variants — both button and sheen child read from these */
const containerVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  tap: { scale: 0.97, transition: { duration: 0.08 } },
};

/* The letter-spacing is on the inner span so it doesn't affect layout */
const labelVariants = {
  rest: { letterSpacing: "0.02em" },
  hover: {
    letterSpacing: "0.07em",
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* Diagonal sheen streak sweeps left→right on hover */
const sheenVariants = {
  rest: { x: "-130%", skewX: "-18deg" },
  hover: {
    x: "230%",
    skewX: "-18deg",
    transition: { duration: 0.46, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "gold", size = "md", className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(
        "relative overflow-hidden font-body font-semibold transition-colors duration-200",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      style={{ willChange: "transform" }}
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Label with expanding letter-spacing */}
      <motion.span
        className="relative z-10 flex items-center gap-2 pointer-events-none"
        variants={labelVariants}
      >
        {children}
      </motion.span>

      {/* Diagonal sheen streak */}
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          width: "55%",
          background:
            "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%)",
        }}
        variants={sheenVariants}
      />
    </motion.button>
  )
);

Button.displayName = "Button";
