"use client";

import * as React from "react";
import { FluidTextMorph } from "@/components/ui/fluid-text-morph";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Dr. Elizabeth",
    category: "Lead Consultant",
    year: "EST. 2026",
    description: "Expert OB/GYN Specialization",
    image: "/images/leadC.jpg",
  },
  {
    title: "Clinical Co-Founder",
    category: "Diagnostic Imaging Chief",
    year: "EST. 2026",
    description: "Advanced Radiology Management",
    image: "/images/Aradiology.jpg",
  },
  {
    title: "Obstetric 3D/4D Suite",
    category: "Ultrasonic Workspace",
    year: "High-Fidelity",
    description: "Real-time Fetal Growth Scans",
    image: "/images/obgyn3.jpg",
  },
  {
    title: "Reproductive Sanctuary",
    category: "Clinical Consultation",
    year: "Patient-Centered",
    description: "Compassionate Women's Health Mapping",
    image: "/images/patientc.jpg",
  },
  {
    title: "Triage Pathology Facility",
    category: "Diagnostic Laboratory",
    year: "Same-Day Results",
    description: "Precision Biomarker Screening",
    image: "/images/rapidtriage.jpg",
  },
];

const CLINICAL_WORD_PAIRS: [string, string][] = [
  ["Modern OB/GYN", "Trusted Care"],
  ["Precision Scans", "Absolute Certainty"],
  ["3D/4D Ultrasound", "Maternal Sanctuary"],
  ["Rapid Triage", "Same-Day Results"],
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.12,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 700,
  AUTOPLAY_MS: 3000,
  ESCAPE_AFTER_SCROLLS: 4, // Snappier exit flow transition matrix
};

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
const getProjectData = (index: number) => {
  const i = ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length;
  return PROJECT_DATA[i];
};
const getProjectNumber = (index: number) =>
  (((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length + 1)
    .toString()
    .padStart(2, "0");

export function InfiniteParallaxSlider() {
  const [visibleRange, setVisibleRange] = React.useState({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });
  const containerRef  = React.useRef<HTMLDivElement>(null);
  const prevBtnRef    = React.useRef<HTMLButtonElement>(null);
  const nextBtnRef    = React.useRef<HTMLButtonElement>(null);
  const btnTargetX    = React.useRef(0);
  const btnCurrentX   = React.useRef(0);
  const downScrollCount = React.useRef(0);
  const escaped       = React.useRef(false);

  const state = React.useRef({
    currentY: 0, targetY: 0,
    isDragging: false, isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0, minimapHeight: 250,
  });
  const projectsRef   = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef    = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef       = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef    = React.useRef<number>();
  const autoplayRef   = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

  // ✅ FIXED: Enforce absolute truth evaluation check for layout frame entry states
  const isInViewport = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    const el = containerRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return window.scrollY < window.innerHeight;
  }, []);

  const escapeToNext = React.useCallback(() => {
    if (escaped.current) return;
    escaped.current = true;
    const container = containerRef.current;
    if (!container) return;
    const next = container.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback fallback if layout trees are processing out-of-order bounds
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  const advanceSlide = React.useCallback(() => {
    const s = state.current;
    if (s.projectHeight === 0) return;
    const nextIndex = Math.round(-s.targetY / s.projectHeight) + 1;
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.targetY, target: -nextIndex * s.projectHeight };
    s.lastScrollTime = Date.now();
  }, []);

  const startAutoplay = React.useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(advanceSlide, CONFIG.AUTOPLAY_MS);
  }, [advanceSlide]);

  const resetAutoplay = React.useCallback(() => { startAutoplay(); }, [startAutoplay]);

  const handleEscapeUp = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleEscapeDown = React.useCallback(() => {
    escapeToNext();
  }, [escapeToNext]);

  const updateParallax = (img: HTMLImageElement | null, scroll: number, idx: number, height: number) => {
    if (!img) return;
    if (!img.dataset.pc) img.dataset.pc = "0";
    let cur = parseFloat(img.dataset.pc);
    const target = (-scroll - idx * height) * 0.25;
    cur = lerp(cur, target, 0.1);
    if (Math.abs(cur - target) > 0.01) {
      img.style.transform = `translateY(${cur}px) scale(1.4)`;
      img.dataset.pc = cur.toString();
    }
  };

  const snapToProject = () => {
    const s = state.current;
    const cur = Math.round(-s.targetY / s.projectHeight);
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.targetY, target: -cur * s.projectHeight };
  };

  const updatePositions = () => {
    const s = state.current;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;
    projectsRef.current.forEach((el, i) => {
      el.style.transform = `translateY(${i * s.projectHeight + s.currentY}px)`;
      updateParallax(el.querySelector("img"), s.currentY, i, s.projectHeight);
    });
    minimapRef.current.forEach((el, i) => {
      el.style.transform = `translateY(${i * s.minimapHeight + minimapY}px)`;
    });
    infoRef.current.forEach((el, i) => {
      el.style.transform = `translateY(${i * s.minimapHeight + minimapY}px)`;
    });
  };

  const animationLoop = React.useCallback(() => {
    const s = state.current;
    const now = Date.now();
    if (s.isSnapping) {
      const prog = Math.min((now - s.snapStart.time) / CONFIG.SNAP_DURATION, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
      if (prog >= 1) s.isSnapping = false;
    } else if (!s.isDragging && now - s.lastScrollTime > 100) {
      const snap = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snap) > 1) snapToProject();
    }
    if (!s.isDragging) s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    updatePositions();
    btnCurrentX.current = lerp(btnCurrentX.current, btnTargetX.current, 0.06);
    const bx = btnCurrentX.current;
    if (prevBtnRef.current) {
      prevBtnRef.current.style.transform = `translateX(calc(-50% + ${bx.toFixed(1)}px))`;
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.style.transform = `translateX(calc(-50% + ${(bx * 0.76).toFixed(1)}px))`;
    }
    const ci  = Math.round(-s.targetY / s.projectHeight);
    const min = ci - CONFIG.BUFFER_SIZE;
    const max = ci + CONFIG.BUFFER_SIZE;
    if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
      renderedRange.current = { min, max };
      setVisibleRange({ min, max });
    }
    requestRef.current = requestAnimationFrame(animationLoop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    state.current.projectHeight = window.innerHeight;
    const el = containerRef.current;
    startAutoplay();
    
    // Track global reset checks if users jump straight back up to top boundary markers
    const handleScrollReset = () => {
      if (window.scrollY === 0) {
        escaped.current = false;
        downScrollCount.current = 0;
      }
    };
    window.addEventListener("scroll", handleScrollReset, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = e.clientX - rect.left - rect.width / 2;
      const clampX = rect.width * 0.38;
      btnTargetX.current = Math.max(-clampX, Math.min(clampX, relX)) * 0.44;
    };
    const onWheel = (e: WheelEvent) => {
      if (!isInViewport()) return;
      if (escaped.current) return;
      if (navigator.maxTouchPoints > 0) return;
      if (e.deltaY > 0) {
        downScrollCount.current += 1;
        if (downScrollCount.current > CONFIG.ESCAPE_AFTER_SCROLLS) {
          escapeToNext();
          return;
        }
      } else {
        downScrollCount.current = Math.max(0, downScrollCount.current - 1);
      }
      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY), -CONFIG.MAX_VELOCITY);
      s.targetY -= delta;
      resetAutoplay();
    };
    const onTouchStart = (e: TouchEvent) => {
      if (!isInViewport()) return;
      const s = state.current;
      s.isDragging = true; s.isSnapping = false;
      s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };
    const onTouchMove = (e: TouchEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      const deltaY = e.touches[0].clientY - s.dragStart.y;
      if (deltaY < -window.innerHeight * 0.45 && !escaped.current) {
        escapeToNext();
        return;
      }
      s.targetY = s.dragStart.scrollY + deltaY * 1.5;
      s.lastScrollTime = Date.now();
    };
    const onTouchEnd = () => { state.current.isDragging = false; resetAutoplay(); };
    const onResize = () => {
      state.current.projectHeight = window.innerHeight;
      if (el) el.style.height = `${window.innerHeight}px`;
    };
    el?.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    el?.addEventListener("touchstart", onTouchStart, { passive: true });
    el?.addEventListener("touchmove", onTouchMove, { passive: true });
    el?.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    onResize();
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => {
      el?.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchmove", onTouchMove);
      el?.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScrollReset);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [animationLoop, startAutoplay, resetAutoplay, escapeToNext, isInViewport]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);

  return (
    <div
      ref={containerRef}
      // ✅ UPDATED: Locked to layout index z-30 with native hardware-accelerated rendering