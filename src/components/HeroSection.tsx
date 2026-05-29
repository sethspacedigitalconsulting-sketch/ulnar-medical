"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
import { AnimatedText } from "@/components/ui/animated-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ── 🏥 Integrated Stacked 3D Panel Asset Configuration ── */
const PANEL_COUNT = 22;
const WAVE_SPRING = { stiffness: 160, damping: 22, mass: 0.6 };
const SCENE_SPRING = { stiffness: 80, damping: 22, mass: 1 };
const Z_SPREAD = 42;
const SIGMA = 2.8;

const PANEL_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80",
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
  "https://images.unsplash.com/photo-1666887360680-77a83db62cc4?w=400&q=80",
];

const GRADIENT_OVERLAYS = [
  "linear-gradient(135deg, rgba(18,41,84,0.65) 0%, rgba(8,15,30,0.85) 100%)",
  "linear-gradient(135deg, rgba(244,185,185,0.55) 0%, rgba(18,41,84,0.65) 100%)",
  "linear-gradient(135deg, rgba(255,212,58,0.35) 0%, rgba(8,15,30,0.85) 100%)",
];

/* 🩻 Individual 3D Leaflet Card Rendering Logic */
function InteractivePanel({
  index,
  total,
  waveY,
  scaleY,
}: {
  index: number;
  total: number;
  waveY: ReturnType<typeof useSpring>;
  scaleY: ReturnType<typeof useSpring>;
}) {
  const t = index / (total - 1);
  const baseZ = (index - (total - 1)) * Z_SPREAD;

  const w = 200 + t * 80;
  const h = 280 + t * 120;

  const opacity = 0.12 + t * 0.45; 
  const imageUrl = PANEL_IMAGES[index % PANEL_IMAGES.length];
  const gradient = GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length];

  return (
    <motion.div
      className="absolute rounded-xl pointer-events-none overflow-hidden"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        translateZ: baseZ,
        y: waveY,
        scaleY,
        transformOrigin: "bottom center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(8,15,30,0.08) 0%, rgba(8,15,30,0.32) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: `1px solid rgba(255,212,58,${0.04 + t * 0.12})`,
          boxSizing: "border-box",
        }}
      />
    </motion.div>
  );
}

/* 🧬 Main Component Module Export Mapping */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const backgroundInteractiveRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  /* Magnetic CTA Layout Physics Matrix */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });

  const handleMouseMoveCTA = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeaveCTA = () => { mx.set(0); my.set(0); };

  /* 💎 3D Stacked Card Tracking Physics Array */
  const waveYSprings = Array.from({ length: PANEL_COUNT }, () => useSpring(0, WAVE_SPRING));
  const scaleYSprings = Array.from({ length: PANEL_COUNT }, () => useSpring(1, WAVE_SPRING));

  const rotY = useSpring(-42, SCENE_SPRING);
  const rotX = useSpring(18, SCENE_SPRING);

  const handleBackgroundMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = backgroundInteractiveRef.current?.getBoundingClientRect();
      if (!rect) return;

      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;

      rotY.set(-42 + (cx - 0.5) * 14);
      rotX.set(18 + (cy - 0.5) * -10);

      const cursorCardPos = cx * (PANEL_COUNT - 1);

      waveYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(-influence * 70);
      });

      scaleYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(0.35 + influence * 0.65);
      });
    },
    [rotY, rotX, waveYSprings, scaleYSprings]
  );

  const handleBackgroundMouseLeave = useCallback(() => {
    rotY.set(-42);
    rotX.set(18);
    waveYSprings.forEach((s) => s.set(0));
    scaleYSprings.forEach((s) => s.set(1));
  }, [rotY, rotX, waveYSprings, scaleYSprings]);

  useGSAP(
    () => {
      gsap.to(navInnerRef.current, {
        y: -4,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    },
    { scope: navRef }
  );

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen text-white bg-[#0d1b3e]">
      
      {/* ── 🏥 INTEGRATED STACKED PANELS CURSOR-INTERACTIVE BACKGROUND LAYER ── */}
      <div 
        ref={backgroundInteractiveRef}
        onMouseMove={handleBackgroundMouseMove}
        onMouseLeave={handleBackgroundMouseLeave}
        className="absolute inset-0 z-0 opacity-40 pointer-events-auto flex items-center justify-center overflow-hidden select-none"
        style={{ perspective: "900px" }}
      >
        <motion.div
          style={{
            rotateY: rotY,
            rotateX: rotX,
            transformStyle: "preserve-3d",
            position: "relative",
            width: 0,
            height: 0,
          }}
        >
          {Array.from({ length: PANEL_COUNT }).map((_, i) => (
            <InteractivePanel
              key={i}
              index={i}
              total={PANEL_COUNT}
              waveY={waveYSprings[i]}
              scaleY={scaleYSprings[i]}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Navigation Block ── */}
      <motion.nav
        ref={navRef}
        className="relative z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_LUXURY }}
        style={{
          background: "linear-gradient(to bottom, rgba(18,41,84,0.55) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div ref={navInnerRef} className="flex items-center justify-between px-6 md:px-14 pt-8 pb-6">
          <Logo animated size={40} />
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="label-mono text-[rgba(248,246,242,0.5)] hover:text-[#FFD43A] transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#booking" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,212,58,0.4)] text-[#FFD43A] label-mono hover:bg-[rgba(255,212,58,0.08)] transition-all duration-300">
            Book Now <span className="text-base leading-none">↗</span>
          </a>
        </div>
      </motion.nav>

      {/* ── Hero Presentation Shell ── */}
      <motion.div
        className="relative z-20 px-6 md:px-14 pt-10 md:pt-16 pb-32"
        style={{ y: textY, opacity, willChange: "transform" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">

          {/* Left Layout Text Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE_LUXURY }}>
              <div className="h-px w-10 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.55)]">Ngong Road · Nairobi · Est. 2021</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">
              Modern OB/GYN <br />
              <span className="text-[#FFD43A] italic">Diagnostics</span>
            </h1>

            <AnimatedText
              text="Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered sanctuary — tailored for women of African descent."
              as="p" splitBy="word" className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed" style={{ fontSize: "1.05rem" }} delay={0.9}
            />

            <motion.div className="flex flex-wrap items-center gap-4 mt-8" variants={fadeUpVariants} initial="hidden" animate="visible" transition={{ delay: 1.05 }}>
              <motion.button
                style={{ x: springX, y: springY, willChange: "transform" }} onMouseMove={handleMouseMoveCTA} onMouseLeave={handleMouseLeaveCTA}
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm group"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">Book Diagnostic Scan <span>→</span></span>
              </motion.button>

              <motion.a href="https://wa.me/254724273996?text=Hello" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-4 rounded-full border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] font-body text-sm hover:border-[#F4B9B9] transition-all group">
                Chat on WhatsApp ↗
              </motion.a>
            </motion.div>

            {/* Metrics Breakdown */}
            <motion.div className="flex flex-wrap gap-x-10 gap-y-4 mt-14 pt-10 border-t border-[rgba(255,255,255,0.07)]" variants={fadeUpVariants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
              {[{ value: "3D/4D", label: "Obstetric Ultrasound" }, { value: "99%", label: "Diagnostic Accuracy" }, { value: "Same-Day", label: "Results Available" }].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-semibold italic text-[#FFD43A] text-2xl">{value}</div>
                  <div className="label-mono text-[rgba(248,246,242,0.4)] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Original Dual Clinician Graphics */}
          <motion.div className="hidden md:block flex-shrink-0" style={{ width: "38%" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div style={{ display: "flex", width: "100%", height: "clamp(420px, 55vh, 640px)", gap: "4px" }}>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <img src="/images/clinician-1.