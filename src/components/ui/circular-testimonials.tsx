"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mercy W.",
    designation: "Expectant Mother — Antenatal Track",
    quote:
      "The 3D/4D ultrasound clarity at Ulnar Medical gave us absolute peace of mind. Dr. Elizabeth explained every developmental marker with so much patience and warmth.",
    src: "/images/mercyw.jpg",
  },
  {
    name: "Dr. Faith O.",
    designation: "Referring General Practitioner",
    quote:
      "I route all my complex obstetric and gynaecological scans straight to Ulnar Diagnostic Centre. Their pathology screening is incredibly precise, and results arrive the same day.",
    src: "/images/Drfaitho.jpg",
  },
  {
    name: "Amina K.",
    designation: "Maternal Wellness Patient",
    quote:
      "Transparent packages, zero hidden clinical fees, and compassionate care. Walking into their clinic on Ngong Road feels like stepping into a premium medical sanctuary.",
    src: "/images/aminak.jpg",
  },
];

function calculateGap(width: number) {
  const minWidth = 1024, maxWidth = 1456, minGap = 70, maxGap = 96;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const ARROWS = [
  { dir: -1 as const, Icon: FaArrowLeft,  label: "Previous testimonial" },
  { dir:  1 as const, Icon: FaArrowRight, label: "Next testimonial" },
];

export function CircularTestimonials({ autoplay = true }: { autoplay?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const len          = TESTIMONIALS.length;
  const active       = TESTIMONIALS[activeIndex];

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => setActiveIndex(p => (p + 1) % len), 6000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay, len]);

  const go = useCallback((dir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveIndex(p => (p + dir + len) % len);
  }, [len]);

  function getImageStyle(i: number): React.CSSProperties {
    const gap      = calculateGap(containerWidth);
    const stickUp  = gap * 0.35;
    const isActive = i === activeIndex;
    const isLeft   = (activeIndex - 1 + len) % len === i;
    const isRight  = (activeIndex + 1) % len === i;

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 0.75, pointerEvents: "auto",
      transform: `translateX(-${gap * 1.15}px) translateY(-${stickUp}px) scale(0.82) rotateY(25deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 0.75, pointerEvents: "auto",
      transform: `translateX(${gap * 1.15}px) translateY(-${stickUp}px) scale(0.82) rotateY(-25deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  const words = useMemo(() => active.quote.split(" "), [active.quote]);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-24 md:py-32 px-4"
      style={{ background: "linear-gradient(180deg, #0d1a30 0%, #080f1e 100%)" }}
    >
      {/* Ambient bloom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,185,185,0.05) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#FFD43A]" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">Patient Stories</span>
            <div className="h-px w-8 bg-[#FFD43A]" />
          </div>
          <h2 className="font-serif italic font-bold text-white"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem,4vw,3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            <AnimatedText text="What our patients" />{" "}
            <AnimatedText text="are saying." style={{ color: "#F4B9B9" }} delay={0.2} />
          </h2>
        </div>

        {/* Image deck */}
        <div ref={containerRef} className="relative flex items-center justify-center"
          style={{ height: "clamp(280px, 40vw, 420px)", perspective: "1200px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name}
              onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setActiveIndex(i); }}
              className="absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: "clamp(200px, 28vw, 300px)",
                height: "clamp(260px, 36vw, 380px)",
                ...getImageStyle(i),
              }}
            >
              <img src={t.src} alt={t.name}
                className="w-full h-full object-cover"
                style={{ filter: i === activeIndex ? "none" : "brightness(0.55) saturate(0.8)" }} />
              {i === activeIndex && (
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(8,15,30,0.85) 0%, transparent 55%)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Text content */}
        <div className="mt-12 text-center max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-serif font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.55rem" }}>
                <AnimatedText text={active.name} splitBy="char" />
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] mb-8"
                style={{ color: "#F4B9B9" }}>
                <AnimatedText text={active.designation} splitBy="word" delay={0.15} />
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: "#FFD43A", fontSize: "1rem" }}>★</span>
                ))}
              </div>

              {/* Word-by-word quote */}
              <p className="font-serif italic leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "#e1e1e7", lineHeight: 1.6 }}>
                &ldquo;
                {words.map((word, wi) => (
                  <motion.span key={`${activeIndex}-${wi}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, delay: wi * 0.035, ease: [0.25, 1, 0.5, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                &rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows — whileHover + whileTap work on both mouse and touch */}
        <div className="flex justify-center gap-4 mt-10">
          {ARROWS.map(({ dir, Icon, label }) => (
            <motion.button
              key={dir}
              onClick={() => go(dir)}
              aria-label={label}
              className="w-11 h-11 rounded-full flex items-center justify-center border"
              style={{ backgroundColor: "#122954", borderColor: "rgba(255,255,255,0.1)" }}
              whileHover={{
                scale: 1.08,
                backgroundColor: "#FFD43A",
                borderColor: "#FFD43A",
                color: "#122954",
              }}
              whileTap={{
                scale: 0.93,
                backgroundColor: "#FFD43A",
                borderColor: "#FFD43A",
                color: "#122954",
              }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon size={14} />
            </motion.button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setActiveIndex(i); }}
              aria-label={`Testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 6,
                height: 6,
                background: i === activeIndex ? "#FFD43A" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CircularTestimonials;
