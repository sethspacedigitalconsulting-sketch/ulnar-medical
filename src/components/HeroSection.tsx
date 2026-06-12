"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";

const HeroScrub = dynamic(
  () => import("@/components/ui/hero-scrub").then((m) => ({ default: m.HeroScrub })),
  { ssr: false }
);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -40]);
  const opacity = 1;

  // Spring values for mouse tracking hover effect
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });

  return (
    <div className="relative min-h-screen text-white bg-[#0d1b3e] overflow-hidden flex items-center w-full">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none hidden md:block">
        <HeroScrub />
      </div>

      {/* HOVER SIDEBAR CTAs: Floats permanently at the right edge of the screen across sections */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-auto">
        <motion.button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center justify-center size-12 rounded-full bg-[#FFD43A] text-[#080f1e] shadow-2xl group relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Calendar className="size-5" />
          <span className="absolute right-14 bg-[#080f1e] text-[#FFD43A] text-xs font-mono tracking-wider uppercase px-3 py-1.5 rounded-md border border-[#FFD43A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
            Book Appointment
          </span>
        </motion.button>

        <motion.a
          href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20book%20a%20clinical%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center size-12 rounded-full bg-[#25D366] text-white shadow-2xl group relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="size-5" />
          <span className="absolute right-14 bg-[#080f1e] text-[#25D366] text-xs font-mono tracking-wider uppercase px-3 py-1.5 rounded-md border border-[#25D366]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
            WhatsApp Clinic
          </span>
        </motion.a>
      </div>

      <motion.div className="relative z-20 px-6 md:px-14 w-full" style={{ y: textY, opacity, willChange: "transform" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          <div className="flex-1 min-w-0 flex flex-col">

            {/* ✅ TOP ANCHOR ROW: Matches your exact text parameters and maintains original styling */}
            <div className="flex items-center gap-3 mb-6">
              <span className="label-mono text-[rgba(248,246,242,0.55)] text-xs uppercase tracking-[0.22em]">
                NGONG ROAD  .  NAIROBI . EST . 2021
              </span>
            </div>

            {/* ── UNIFIED PRIMARY HEADINGS STACK ── */}
            {/* ✅ Both headers are now cleanly stacked using the exact styling and font sizes of the Detailed Diagnostics header */}
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">
                Maternal-Fetal Specialist Care
              </h1>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-[#FFD43A] italic leading-none tracking-tight">
                Detailed Diagnostics
              </h1>
            </div>

            <p className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed mb-6" style={{ fontSize: "1.05rem" }}>
              Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered sanctuary.
            </p>

            <div className="h-4" />

            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-6 md:mt-10 pt-6 md:pt-10 border-t border-[rgba(255,255,255,0.07)]">
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