"use client";

import React, { createRef, useRef } from "react";
import { motion } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const specialistsList = [
  {
    name: "Dr. Elizabeth Odondi",
    role: "Consultant Radiologist — Lead Diagnostic Imaging Specialist at Ulnar Medical & Diagnostic Centre.",
    badge: "RADIOLOGY LEAD",
    src: "/images/DrElizabeth.jpg",
  },
  {
    name: "Dr. Cyprian Michieka",
    role: "Board-certified OB/GYN Specialist & Fellow in Maternal-Fetal Medicine. 5+ years experience in high-risk obstetric care and advanced fetal diagnostics.",
    badge: "MATERNAL-FETAL MEDICINE",
    src: "/images/DrCyprian.jpg",
  },
];

const TRAIL_IMAGES = [
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
];

function ImageCursorTrail({
  items,
  maxNumberOfImages = 5,
  distance = 22,
  fadeAnimation = true,
}: {
  items: string[];
  maxNumberOfImages?: number;
  distance?: number;
  fadeAnimation?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);
  const globalIndexRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;
    if (currentZIndexRef.current > 40) currentZIndexRef.current = 1;
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;
    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    lastRef.current = { x, y };
  };

  const distanceFromLast = (x: number, y: number) =>
    Math.hypot(x - lastRef.current.x, y - lastRef.current.y);

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleMove = (clientX: number, clientY: number) => {
    const threshold = window.innerWidth / distance;
    if (distanceFromLast(clientX, clientY) > threshold) {
      const idx = globalIndexRef.current;
      const lead = refs.current[idx % refs.current.length].current;
      const tailRef = refs.current[(idx - maxNumberOfImages) % refs.current.length];
      const tail = tailRef?.current;
      if (lead) activate(lead, clientX, clientY);
      if (tail) deactivate(tail);
      globalIndexRef.current++;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Don't prevent default — allow page scroll
    // But still trail on touch drag within the container
    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Seed the last position on touch start so first move registers
    const touch = e.touches[0];
    if (touch) lastRef.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className="relative w-full h-[420px] sm:h-[480px] overflow-hidden cursor-crosshair touch-pan-y"
    >
      {items.map((item, index) => (
        <img
          key={index}
          ref={refs.current[index]}
          src={item}
          alt={`specialist-${index}`}
          data-status="inactive"
          className={cn(
            "absolute -translate-x-[50%] -translate-y-[50%] scale-0 opacity-0 pointer-events-none",
            "w-28 h-36 sm:w-40 sm:h-52 object-cover rounded-3xl",
            "border border-[#F4B9B9]/30 shadow-2xl shadow-black/60",
            "transition-all duration-300 ease-out",
            "data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
          )}
        />
      ))}

      {/* Hint text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-50 gap-2">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="opacity-20">
          <path d="M6 24 C6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M6 24 C6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="24" r="3" fill="#FFD43A" />
        </svg>
        <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase hidden sm:block">
          Move cursor to reveal
        </span>
        <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase sm:hidden">
          Swipe to reveal
        </span>
      </div>
    </div>
  );
}

export function InteractiveClinicalOrbit() {
  return (
    <section className="relative bg-[#080f1e] pt-24 pb-16 overflow-hidden border-t border-white/5">

      {/* Ambient gold orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(255,212,58,0.05) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 text-center mb-12 relative z-20">
        <span className="font-mono text-[10px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-3 py-1 rounded-full border border-[#FFD43A]/15">
          CLINICAL LEADERSHIP
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-4 tracking-tight">
          Our <span className="text-[#F4B9B9] italic">Specialists</span>
        </h2>
        <p className="text-white/40 font-light text-sm max-w-md mx-auto mt-3">
          Meet the senior medical consultants behind every diagnosis.
        </p>
      </div>

      {/* Cursor / Touch trail zone */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 relative z-10">
        <ImageCursorTrail
          items={TRAIL_IMAGES}
          maxNumberOfImages={5}
          distance={22}
          fadeAnimation={true}
        />
      </div>

      {/* Specialist cards */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        {specialistsList.map((doctor) => (
          <motion.div
            key={doctor.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-[#0d1b3e]/40 backdrop-blur-md"
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#F4B9B9]/30 flex-shrink-0">
              <img
                src={doctor.src}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[8px] text-[#FFD43A] tracking-wider uppercase bg-[#080f1e]/80 border border-[#FFD43A]/20 px-2 py-0.5 rounded-md inline-block mb-2 w-fit">
                {doctor.badge}
              </span>
              <h3 className="text-lg font-display font-bold text-white tracking-tight leading-tight mb-1">
                {doctor.name}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                {doctor.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-10 relative z-20">
        {specialistsList.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: i === 0 ? 24 : 6,
              height: 6,
              background: i === 0 ? "#FFD43A" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

    </section>
  );
}