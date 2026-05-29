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
    waveYSprings.