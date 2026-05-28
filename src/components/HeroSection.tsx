"use client";

import { useRef, useState } from "react";
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
import { HeroScrub } from "@/components/ui/hero-scrub";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

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
      
      {/* ── 🎥 EXPLICIT HERO-SCRUB FRAME TRANSITION BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <HeroScrub
          frameCount={120}
          frameUrl={(i) =>
            `https://raw.githubusercontent.com/duthiljean/ferrari-hero-demo/main/${String((i % 300) + 1).padStart(4, "0")}.webp`
          }
          titleTop=""
          titleBottom=""
          bgClassName="bg-transparent"
          accentHex="#0d1b3e"
        />
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
                style={{ x: springX, y: springY, willChange: "transform" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
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
                  <img src="/images/clinician-1.jpg" alt="Female Clinician" className="w-full h-full object-cover" />
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <img src="/images/clinician-2.jpg" alt="Male Doctor" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#FFD43A] animate-pulse" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">NGONG ROAD, NAIROBI · ACCEPTING PATIENTS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}