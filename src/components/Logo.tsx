"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  variant?: "light" | "dark" | "gold";
  className?: string;
  animated?: boolean;
}

export function Logo({
  size = 44,
  showWordmark = true,
  variant = "light",
  className,
  animated = false,
}: LogoProps) {
  const textColor =
    variant === "light"
      ? "#F8F6F2"
      : variant === "dark"
      ? "#122954"
      : "#FFD43A";

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, x: -16 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Wrapper
      className={cn("flex items-center gap-3 select-none", className)}
      {...(wrapperProps as object)}
    >
      {/* ── SVG Emblem ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer lens: upper arc — Gold (diagnostic precision) */}
        <path
          d="M 6 24 C 6 6 42 6 42 24"
          stroke="#FFD43A"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Outer lens: lower arc — Rose (maternal care) */}
        <path
          d="M 6 24 C 6 42 42 42 42 24"
          stroke="#F4B9B9"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner resonance: upper arc — subtle depth */}
        <path
          d="M 13 24 C 13 13 35 13 35 24"
          stroke="#FFD43A"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
        />
        {/* Inner resonance: lower arc */}
        <path
          d="M 13 24 C 13 35 35 35 35 24"
          stroke="#F4B9B9"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.25"
        />
        {/* Center diagnostic node — gold pulse */}
        <circle cx="24" cy="24" r="2.8" fill="#FFD43A" />
        <circle cx="24" cy="24" r="5" stroke="#FFD43A" strokeWidth="0.8" fill="none" opacity="0.35" />
        {/* Left terminal node */}
        <circle cx="6" cy="24" r="1.8" fill="#F4B9B9" />
        {/* Right terminal node */}
        <circle cx="42" cy="24" r="1.8" fill="#F4B9B9" />
        {/* Horizontal centerline ticks — ultrasound scan markers */}
        <line x1="10" y1="24" x2="14" y2="24" stroke="#FFD43A" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="34" y1="24" x2="38" y2="24" stroke="#FFD43A" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>

      {/* ── Wordmark ── */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-semibold tracking-[0.06em] leading-none"
            style={{
              color: textColor,
              fontSize: size * 0.38,
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            Ulnar{" "}
            <span style={{ color: "#FFD43A", fontStyle: "italic" }}>Medical</span>
          </span>
          <span
            className="font-mono tracking-[0.16em] uppercase"
            style={{
              color: variant === "light" ? "rgba(248,246,242,0.45)" : "rgba(18,41,84,0.45)",
              fontSize: size * 0.18,
              fontFamily: "var(--font-dm-mono), monospace",
              marginTop: 3,
            }}
          >
            Diagnostic Centre
          </span>
        </div>
      )}
    </Wrapper>
  );
}

/* ── Standalone emblem only (icon use) ── */
export function LogoEmblem({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M 6 24 C 6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 6 24 C 6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 13 24 C 13 13 35 13 35 24" stroke="#FFD43A" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d="M 13 24 C 13 35 35 35 35 24" stroke="#F4B9B9" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
      <circle cx="24" cy="24" r="2.8" fill="#FFD43A" />
      <circle cx="6" cy="24" r="1.8" fill="#F4B9B9" />
      <circle cx="42" cy="24" r="1.8" fill="#F4B9B9" />
    </svg>
  );
}
