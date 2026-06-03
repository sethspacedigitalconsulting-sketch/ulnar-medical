"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SpecialistItem {
  name: string;
  role: string;
  badge: string;
  src: string;
}

const specialistsList: SpecialistItem[] = [
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

export function InteractiveClinicalOrbit() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(260);

  // Responsive radius
  useEffect(() => {
    const update = () => {
      setRadius(window.innerWidth < 640 ? 130 : window.innerWidth < 1024 ? 200 : 260);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll-driven rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotation = useSpring(rawRotation, { stiffness: 30, damping: 20 });

  // Auto-cycle active card
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % specialistsList.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080f1e] pt-24 pb-16 overflow-hidden border-t border-white/5"
    >
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
      <div className="max-w-7xl mx-auto px-6 md:px-14 text-center mb-16 relative z-20">
        <span className="font-mono text-[10px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-3 py-1 rounded-full border border-[#FFD43A]/15">
          CLINICAL LEADERSHIP
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-4 tracking-tight">
          Our <span className="text-[#F4B9B9] italic">Specialists</span>
        </h2>
        <p className="text-white/40 font-body font-light text-sm max-w-md mx-auto mt-3">
          Meet the senior medical consultants behind every diagnosis.
        </p>
      </div>

      {/* Orbit stage */}
      <div
        className="relative flex items-center justify-center mx-auto"
        style={{ width: radius * 2 + 320, height: radius * 2 + 320, maxWidth: "100vw" }}
      >
        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-[rgba(255,212,58,0.08)] pointer-events-none"
          style={{ width: radius * 2, height: radius * 2 }}
          aria-hidden
        />
        <div
          className="absolute rounded-full border border-[rgba(244,185,185,0.04)] pointer-events-none"
          style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
          aria-hidden
        />

        {/* Center emblem */}
        <div className="absolute z-10 flex flex-col items-center justify-center gap-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M6 24 C6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M6 24 C6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="24" cy="24" r="3" fill="#FFD43A" />
          </svg>
          <span
            className="font-mono text-center text-[rgba(248,246,242,0.25)]"
            style={{ fontSize: 8, letterSpacing: "0.22em" }}
          >
            ULNAR
          </span>
        </div>

        {/* Rotating orbit container */}
        <motion.div
          className="absolute"
          style={{
            width: radius * 2,
            height: radius * 2,
            rotate: rotation,
          }}
        >
          {specialistsList.map((doctor, i) => {
            const angleDeg = (i / specialistsList.length) * 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = radius + Math.cos(angleRad - Math.PI / 2) * radius - 120;
            const y = radius + Math.sin(angleRad - Math.PI / 2) * radius - 170;
            const isActive = i === activeIndex;

            return (
              <motion.div
                key={doctor.name}
                className="absolute"
                style={{ left: x, top: y }}
                // Counter-rotate so card stays upright as orbit spins
                animate={{ rotate: -angleDeg }}
                transition={{ type: "spring", stiffness: 30, damping: 20 }}
              >
                <motion.div
                  onClick={() => setActiveIndex(i)}
                  animate={{
                    scale: isActive ? 1.06 : 0.88,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="cursor-pointer"
                  style={{ width: 240, height: 340 }}
                >
                  <div
                    className={`w-full h-full rounded-[2rem] border relative overflow-hidden bg-[#0d1b3e] flex flex-col justify-end p-6 text-left transition-colors duration-500 ${
                      isActive
                        ? "border-[#F4B9B9] shadow-xl shadow-black/60"
                        : "border-white/5"
                    }`}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={doctor.src}
                        alt={doctor.name}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          isActive ? "grayscale-0 scale-105" : "grayscale"
                        }`}
                        sizes="240px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/60 to-transparent" />
                    </div>

                    {/* Text overlay */}
                    <div className="relative z-10">
                      <span className="font-mono text-[8px] text-[#FFD43A] tracking-wider uppercase bg-[#080f1e]/80 border border-[#FFD43A]/20 px-2 py-0.5 rounded-md inline-block mb-2">
                        {doctor.badge}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white tracking-tight mb-1 leading-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-white/70 font-body font-light text-xs leading-snug">
                        {doctor.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8 relative z-20">
        {specialistsList.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 6,
              background: i === activeIndex ? "#FFD43A" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
}