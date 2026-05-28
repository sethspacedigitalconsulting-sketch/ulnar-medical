"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type AsTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label";

interface AnimatedTextProps {
  text: string;
  as?: AsTag;
  splitBy?: "char" | "word";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  as: Tag = "span",
  splitBy = "word",
  className,
  style,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-50px",
  });

  const segments = splitBy === "char" ? text.split("") : text.split(" ");

  // Cap total reveal to ~0.85s regardless of segment count
  const raw = splitBy === "char" ? 0.025 : 0.055;
  const perItem = Math.min(raw, 0.85 / Math.max(segments.length, 1));

  return (
    // @ts-ignore — polymorphic ref
    <Tag ref={ref} className={className} style={style}>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 220,
            delay: delay + i * perItem,
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {seg}
          {splitBy === "word" && i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export default AnimatedText;
