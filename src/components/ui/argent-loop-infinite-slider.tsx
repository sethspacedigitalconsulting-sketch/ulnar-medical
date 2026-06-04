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
  ESCAPE_AFTER_SCROLLS: 6,
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

  // Check if the parallax container is currently in the viewport
  const isInViewport = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
  }, []);

  const escapeToNext = React.useCallback(() => {
    if (escaped.current) return;
    escaped.current = true;
    const container = containerRef.current;
    if (!container) return;
    const next = container.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth" });
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
    const container = containerRef.current;
    if (!container) return;
    const prev = container.previousElementSibling as HTMLElement | null;
    if (prev) prev.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = e.clientX - rect.left - rect.width / 2;
      const clampX = rect.width * 0.38;
      btnTargetX.current = Math.max(-clampX, Math.min(clampX, relX)) * 0.44;
    };

    const onWheel = (e: WheelEvent) => {
      // Only intercept when section is centered in viewport
      if (!isInViewport()) return;
      if (escaped.current) return;

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
      if (!el?.contains(e.target as Node)) return;
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
      if (deltaY < -window.innerHeight * 0.55 && !escaped.current) {
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
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    onResize();
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      el?.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [animationLoop, startAutoplay, resetAutoplay, escapeToNext, isInViewport]);

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);

  return (
    <div
      ref={containerRef}
      className="parallax-container relative w-full overflow-hidden bg-[#091428] cursor-grab active:cursor-grabbing"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-20 pointer-events-none" />
      <ul className="m-0 p-0 list-none w-full h-full relative">
        {indices.map((i) => {
          const data = getProjectData(i);
          return (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-full overflow-hidden will-change-transform"
              ref={(el) => { if (el) projectsRef.current.set(i, el); else projectsRef.current.delete(i); }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover brightness-[0.45] contrast-[1.05] will-change-transform"
                style={{ transformOrigin: "center center" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-24 z-10"
                style={{ background: "linear-gradient(to top, rgba(8,15,30,0.9) 0%, transparent 55%)" }}
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-[#F4B9B9] mb-1">{data.category}</p>
                <p className="font-mono text-[0.58rem] tracking-wider text-[#FFD43A]/70">{data.year}</p>
              </div>
            </div>
          );
        })}
      </ul>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 22 }}
      >
        <div className="pointer-events-auto cursor-pointer text-center px-6 sm:pr-[280px] md:pr-[360px]">
          <FluidTextMorph
            wordPairs={CLINICAL_WORD_PAIRS}
            className="drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]"
          />
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.25em] text-white/25 mt-3 pointer-events-none">
            Hover to reveal · Click to cycle
          </p>
        </div>
      </div>
      <button
        ref={prevBtnRef}
        onClick={handleEscapeUp}
        aria-label="Previous section"
        className="group absolute top-5 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-black/25 backdrop-blur-md text-white/40 hover:text-[#FFD43A] hover:border-[#FFD43A]/45 hover:bg-[#FFD43A]/8 active:scale-95 transition-colors duration-300"
        style={{ left: "50%" }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
          className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <path d="M5.5 9.5V1.5M1.5 5.5l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em]">Previous Section</span>
      </button>
      <button
        ref={nextBtnRef}
        onClick={handleEscapeDown}
        aria-label="Next section"
        className="group absolute bottom-14 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-black/25 backdrop-blur-md text-white/40 hover:text-[#FFD43A] hover:border-[#FFD43A]/45 hover:bg-[#FFD43A]/8 active:scale-95 transition-colors duration-300"
        style={{ left: "50%" }}
      >
        <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em]">Next Section</span>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
          className="transition-transform duration-300 group-hover:translate-y-0.5">
          <path d="M5.5 1.5v8M1.5 5.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="hidden sm:flex minimap absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-[240px] md:w-[320px] h-[220px] bg-[#122954]/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-30 shadow-2xl shadow-black/80 p-3 gap-3">
        <div className="minimap-wrapper relative flex w-full h-full overflow-hidden">
          <div className="w-20 h-full relative overflow-hidden rounded-xl border border-white/5 bg-black/20 shrink-0">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div key={i} className="absolute top-0 left-0 w-full h-full overflow-hidden will-change-transform"
                  ref={(el) => { if (el) minimapRef.current.set(i, el); else minimapRef.current.delete(i); }}>
                  <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
          <div className="flex-1 relative overflow-hidden h-full">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div key={i} className="absolute top-0 left-0 w-full h-full flex flex-col justify-between will-change-transform py-1 pl-3"
                  ref={(el) => { if (el) infoRef.current.set(i, el); else infoRef.current.delete(i); }}>
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                    <p className="font-mono text-xs font-bold text-[#FFD43A]">{getProjectNumber(i)}</p>
                    <p className="font-serif font-bold text-white text-sm tracking-tight truncate max-w-[110px]">{data.title}</p>
                  </div>
                  <div className="flex justify-between font-mono text-[9px] uppercase text-[#F4B9B9] tracking-wider my-2">
                    <p>{data.category}</p>
                    <p>{data.year}</p>
                  </div>
                  <p className="font-sans text-[10px] text-gray-300 italic line-clamp-2">&ldquo;{data.description}&rdquo;</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute left-4 md:left-12 bottom-6 z-30 font-mono text-[9px] uppercase text-white/30 tracking-[0.2em] flex items-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD43A] animate-pulse" />
        <span className="hidden sm:inline">Scroll or swipe to navigate</span>
        <span className="sm:hidden">Swipe to navigate</span>
      </div>
    </div>
  );
}

export default InfiniteParallaxSlider;
