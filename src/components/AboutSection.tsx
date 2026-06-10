"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Award, Heart } from "lucide-react";

// ✅ FIXED PATH: Pointing exactly to the local subfolder component directory file bounds
const AboutScrub = dynamic(
  () => import("./ui/about-scrub").then((m) => ({ default: m.AboutScrub })),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textContainerRef.current?.children || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.15 }
    );

    tl.fromTo(
      cardsContainerRef.current?.children || [],
      { opacity: 0, x: 50, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.12 },
      "-=0.6"
    );
  }, { scope: containerRef });

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Board-Certified Expertise",
      desc: "Our senior consultants bring years of dedicated specialization in maternal-fetal medicine, diagnostic radiology, and advanced gynecology.",
    },
    {
      icon: Award,
      title: "Gold Standard Accuracy",
      desc: "Engineered around top-tier ultrasonic suites to deliver absolute precision on every anatomical check, scan, and laboratory report.",
    },
    {
      icon: Heart,
      title: "Patient-Centered Sanctuary",
      desc: "A compassionate environment designed on Ngong Road to support, respect, and prioritize women's healthcare journeys.",
    },
  ];

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#080f1e] py-28 px-4 sm:px-6 md:px-14 border-b border-white/5 overflow-hidden min-h-screen flex items-center"
    >
      <motion.div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{ y: bgY }}>
        <AboutScrub />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div ref={textContainerRef} className="lg:col-span-5 flex flex-col items-start text-left relative z-10">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="h-px w-8 bg-[#F4B9B9] group-hover:w-12 transition-all duration-500" />
              <span className="font-mono text-xs text-[#F4B9B9] tracking-[0.2em] uppercase font-medium">Our Core Foundation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-8 leading-[1.15]">
              Engineering Excellence in <br />
              <span className="text-[#FFD43A] italic font-semibold">Women's Healthcare</span>
            </h2>
            
            <div className="space-y-6 font-body font-light text-[rgba(248,246,242,0.65)] leading-relaxed text-sm md:text-base max-w-xl">
              <p>
                Ulnar Medical & Diagnostic Centre is a premier specialist facility committed to redefining clinical accuracy and premium patient care. Located in Nairobi, our clinic bridges the gap between advanced medical diagnostic infrastructure and compassionate, expert specialty treatment.
              </p>
              
              <p>
                We recognize that modern healthcare demands customized, precision approaches. By combining advanced 3D/4D ultrasonic tracking systems with an elite clinical environment, we deliver tailored screening diagnostics and specialist consultations that meet international benchmarks right here on Ngong Road.
              </p>
            </div>
          </div>

          <div ref={cardsContainerRef} className="lg:col-span-7 flex flex-col gap-5 md:gap-6 w-full relative z-10">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-gradient-to-br from-[#0d1b3e]/60 to-[#080f1e]/40 border border-white/5 backdrop-blur-md hover:border-[#F4B9B9]/20 hover:bg-[#0d1b3e]/80 transition-all duration-500 text-left shadow-xl group"
                >
                  <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-[#FFD43A]/10 text-[#FFD43A] group-hover:bg-[#FFD43A] group-hover:text-[#080f1e] transition-all duration-500 shrink-0 shadow-inner">
                    <Icon className="size-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="font-display font-semibold text-lg text-white mb-1.5 tracking-tight group-hover:text-[#FFD43A] transition-colors">{value.title}</h3>
                    <p className="font-body font-light text-xs md:text-sm text-[rgba(248,246,242,0.5)] group-hover:text-[rgba(248,246,242,0.7)] transition-colors leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;