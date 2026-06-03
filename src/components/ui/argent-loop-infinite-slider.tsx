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
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Clinical Co-Founder",
    category: "Diagnostic Imaging Chief",
    year: "EST. 2026",
    description: "Advanced Radiology Management",
    image: "https://images.pexels.com/photos/5699504/pexels-photo-5699504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Obstetric 3D/4D Suite",
    category: "Ultrasonic Workspace",
    year: "High-Fidelity",
    description: "Real-time Fetal Growth Scans",
    image: "https://images.pexels.com/photos/5699493/pexels-photo-5699493.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Reproductive Sanctuary",
    category: "Clinical Consultation",
    year: "Patient-Centered",
    description: "Compassionate Women's Health Mapping",
    image: "https://images.pexels.com/photos/4226270/pexels-photo-4226270.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Triage Pathology Facility",
    category: "Diagnostic Laboratory",
    year: "Same-Day Results",
    description: "Precision Biomarker Screening",
    image: "https://images.pexels.com/photos/5327574/pexels-photo-5327574.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const CLINICAL_WORD_PAIRS: [string, string][] = [
  ["Modern OB/GYN", "Trusted Care"],
  ["Precision Scans", "Absolute Certainty"],
  ["3D/4D Ultrasound", "Maternal Sanctuary"],
  ["Rapid Triage", "Same-Day Results"],
];

const AUTOPLAY_MS = 3000;
const SNAP_DURATION = 700;
const LERP_FACTOR = 0.12;

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number) => {
  const i = ((index % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length;
  return PROJECT_DATA[i];
};

const getProjectNumber = (index: number) =>
  (((index % PROJECT_DATA.length) + PROJECT_DATA.length) % PROJECT_DATA.length + 1)
    .toString()
    .padStart(2, "0");

export function InfiniteParallaxSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [displaySlide, setDisplaySlide] = React.useState(0);
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Simple autoplay — no scroll hijacking at all
  const startAutoplay = React.useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentSlide(prev => prev + 1);
    }, AUTOPLAY_MS);
  }, []);

  React.useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  // Smooth lerp display index
  const displayRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const rafRef = React.useRef<number>();

  React.useEffect(() => {
    targetRef.current = currentSlide;
  }, [currentSlide]);

  React.useEffect(() => {
    const animate = () => {
      displayRef.current = lerp(displayRef.current, targetRef.current, LERP_FACTOR);
      const rounded = Math.round(displayRef.current * 100) / 100;
      setDisplaySlide(rounded);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Touch swipe support — mobile only
  const touchStartY = React.useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        setCurrentSlide(prev => prev + 1);
      } else {
        setCurrentSlide(prev => prev - 1);
      }
      startAutoplay();
    }
  };

  // Arrow navigation
  const goNext = () => { setCurrentSlide(prev => prev + 1); startAutoplay(); };
  const goPrev = () => { setCurrentSlide(prev => prev - 1); startAutoplay(); };

  // Escape to adjacent sections
  const handleEscapeUp = () => {
    const container = containerRef.current;
    if (!container) return;
    const prev = container.previousElementSibling as HTMLElement | null;
    if (prev) prev.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEscapeDown = () => {
    const container = containerRef.current;
    if (!container) return;
    const next = container.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = Math.round(displaySlide);
  const totalSlides = PROJECT_DATA.length;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#091428]"
      style={{ height: "100vh" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Side gradient masks */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-20 pointer-events-none" />

      {/* Slides */}
      {PROJECT_DATA.map((data, i) => {
        // Calculate offset from current display position
        const offset = i - (displaySlide % totalSlides);
        const wrappedOffset = ((offset + totalSlides / 2) % totalSlides) - totalSlides / 2;
        const translateY = wrappedOffset * 100;
        const isActive = Math.abs(wrappedOffset) < 0.5;

        return (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{
              transform: `translateY(${translateY}%)`,
              transition: "transform 0.05s linear",
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
              style={{
                transform: `translateY(${-wrappedOffset * 25}%) scale(1.4)`,
                transition: "transform 0.05s linear",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-24 z-10"
              style={{ background: "linear-gradient(to top, rgba(8,15,30,0.9) 0%, transparent 55%)" }}
            >
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-[#F4B9B9] mb-1">
                {data.category}
              </p>
              <p className="font-mono text-[0.58rem] tracking-wider text-[#FFD43A]/70">
                {data.year}
              </p>
            </div>
          </div>
        );
      })}

      {/* FluidTextMorph overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 22 }}>
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

      {/* ── Left/Right arrow nav (desktop) ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-4">
        <button
          onClick={goPrev}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-md text-white/50 hover:text-[#FFD43A] hover:border-[#FFD43A]/40 transition-colors duration-300 active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 6H3M3 6l3-3M3 6l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Slide counter */}
        <span className="font-mono text-[0.6rem] text-white/30 tracking-wider tabular-nums">
          {String((((activeIndex % totalSlides) + totalSlides) % totalSlides) + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>

        <button
          onClick={goNext}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-md text-white/50 hover:text-[#FFD43A] hover:border-[#FFD43A]/40 transition-colors duration-300 active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6M9 6L6 3M9 6L6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Escape Up ── */}
      <button
        onClick={handleEscapeUp}
        aria-label="Previous section"
        className="group absolute top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-black/25 backdrop-blur-md text-white/40 hover:text-[#FFD43A] hover:border-[#FFD43A]/45 hover:bg-[#FFD43A]/8 active:scale-95 transition-colors duration-300"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <path d="M5.5 9.5V1.5M1.5 5.5l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em]">Previous Section</span>
      </button>

      {/* ── Escape Down ── */}
      <button
        onClick={handleEscapeDown}
        aria-label="Next section"
        className="group absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-black/25 backdrop-blur-md text-white/40 hover:text-[#FFD43A] hover:border-[#FFD43A]/45 hover:bg-[#FFD43A]/8 active:scale-95 transition-colors duration-300"
      >
        <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em]">Next Section</span>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="transition-transform duration-300 group-hover:translate-y-0.5">
          <path d="M5.5 1.5v8M1.5 5.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Minimap — desktop */}
      <div className="hidden sm:flex absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-[240px] md:w-[320px] h-[220px] bg-[#122954]/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-30 shadow-2xl shadow-black/80 p-3 gap-3">
        <div className="relative flex w-full h-full overflow-hidden gap-3">
          <div className="w-20 h-full relative overflow-hidden rounded-xl border border-white/5 bg-black/20 shrink-0">
            <img
              src={getProjectData(activeIndex).image}
              alt="minimap"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
              <p className="font-mono text-xs font-bold text-[#FFD43A]">{getProjectNumber(activeIndex)}</p>
              <p className="font-serif font-bold text-white text-sm tracking-tight truncate max-w-[110px]">{getProjectData(activeIndex).title}</p>
            </div>
            <div className="flex justify-between font-mono text-[9px] uppercase text-[#F4B9B9] tracking-wider my-2">
              <p>{getProjectData(activeIndex).category}</p>
              <p>{getProjectData(activeIndex).year}</p>
            </div>
            <p className="font-sans text-[10px] text-gray-300 italic line-clamp-2">&ldquo;{getProjectData(activeIndex).description}&rdquo;</p>

            {/* Dot indicators */}
            <div className="flex gap-1.5 mt-2">
              {PROJECT_DATA.map((_, i) => {
                const normalised = ((activeIndex % totalSlides) + totalSlides) % totalSlides;
                return (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: normalised === i ? 16 : 4,
                      height: 4,
                      background: normalised === i ? "#FFD43A" : "rgba(255,255,255,0.2)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute left-4 md:left-12 bottom-6 z-30 font-mono text-[9px] uppercase text-white/30 tracking-[0.2em] flex items-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD43A] animate-pulse" />
        <span className="hidden sm:inline">Use arrows to navigate · Swipe on mobile</span>
        <span className="sm:hidden">Swipe to navigate</span>
      </div>
    </div>
  );
}

export default InfiniteParallaxSlider;