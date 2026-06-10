"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const HeroScrub = dynamic(
  () => import("@/components/ui/hero-scrub").then((m) => ({ default: m.HeroScrub })),
  { ssr: false }
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -40]);
  const opacity = 1;

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

  return (
    <div className="relative min-h-screen text-white bg-[#0d1b3e] overflow-hidden flex items-center w-full">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none hidden md:block">
        <HeroScrub />
      </div>

      <motion.div className="relative z-20 px-6 md:px-14 w-full" style={{ y: textY, opacity, willChange: "transform" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          <div className="flex-1 min-w-0 flex flex-col">

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.55)]">Ngong Road · Nairobi · Est. 2021</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">
              Detailed <br /><span className="text-[#FFD43A] italic">Diagnostics</span>
            </h1>

            <p className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed" style={{ fontSize: "1.05rem" }}>
              Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered sanctuary.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <motion.button
                style={{ x: springX, y: springY, willChange: "transform" }}
                onMouseMove={handleMouseMoveCTA} onMouseLeave={handleMouseMoveCTA}
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm group"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">Book Diagnostic Scan <span>&#8594;</span></span>
              </motion.button>
              <motion.a href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20book%20a%20clinical%20appointment." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-4 rounded-full border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] font-body text-sm hover:border-[#F4B9B9] transition-all group">
                Chat on WhatsApp &#8599;
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-6 md:mt-14 pt-6 md:pt-10 border-t border-[rgba(255,255,255,0.07)]">
              {[{ value: "3D/4D", label: "Obstetric Ultrasound" }, { value: "99%", label: "Diagnostic Accuracy" }, { value: "Same-Day", label: "Results Available" }].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-semibold italic text-[#FFD43A] text-2xl">{value}</div>
                  <div className="label-mono text-[rgba(248,246,242,0.4)] mt-0.5">{label}</div>
                </div>
              ))}
            </div>

          </div>
          <div className="hidden md:block flex-shrink-0" style={{ width: "38%" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div style={{ width: "100%", height: "clamp(420px, 55vh, 640px)", overflow: "hidden" }}>
                <img src="/images/clinic-ultrasound.jpg" alt="Ulnar Medical ultrasound procedure Ngong Road Nairobi" className="w-full h-full object-cover object-center" loading="eager" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#FFD43A] animate-pulse" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">NGONG ROAD · NAIROBI · ACCEPTING PATIENTS</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;