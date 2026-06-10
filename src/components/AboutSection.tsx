"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Heart, ArrowRight, UserCheck, Activity, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

interface Specialist {
  id: number;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
  stats: { label: string; value: string }[];
  credentials: string[];
}

const SPECIALISTS_DATA: Specialist[] = [
  {
    id: 1,
    name: "Dr. Elizabeth Odondi",
    role: "Lead Consultant Radiologist",
    title: "Chief of Diagnostic Imaging",
    bio: "Senior Consultant Radiologist specializing in high-fidelity pelvic mapping, ultrasound-guided interventional tracking arrays, and advanced diagnostic reporting frameworks.",
    image: "/images/leadC.jpg",
    stats: [
      { label: "Experience", value: "12+ Yrs" },
      { label: "Accuracy Rate", value: "99.8%" }
    ],
    credentials: ["M.Med in Diagnostic Radiology", "Fellowship in Advanced Imaging"]
  },
  {
    id: 2,
    name: "Dr. Cyprian Michieka",
    role: "Board-Certified OB/GYN Specialist",
    title: "Fellow in Maternal-Fetal Medicine",
    bio: "Elite maternal-fetal medical practitioner dedicated to pre-conception screening arrays, detailed 3D/4D anatomical anomaly tracking, and fetal echoes.",
    image: "/images/Aradiology.jpg",
    stats: [
      { label: "Specialization", value: "MFM Specialist" },
      { label: "Consultations", value: "8K+ Cases" }
    ],
    credentials: ["Master of Medicine in OB/GYN", "MFM Clinical Fellowship Pass"]
  }
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const profilesContainerRef = useRef<HTMLDivElement>(null);
  const [activeSpecialistIdx, setActiveSpecialistIdx] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textContainerRef.current?.children || [],
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.12 }
    );

    tl.fromTo(
      profilesContainerRef.current,
      { opacity: 0, scale: 0.98, x: 30 },
      { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  const activeDoc = SPECIALISTS_DATA[activeSpecialistIdx];

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#080f1e] py-28 px-4 sm:px-6 md:px-14 border-b border-white/5 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Ambient Radial Gradient Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,rgba(255,212,58,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT SIDE: REFINED TEXT STRINGS ── */}
          <div ref={textContainerRef} className="lg:col-span-5 flex flex-col items-start text-left relative z-10">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="h-px w-8 bg-[#F4B9B9] group-hover:w-12 transition-all duration-500" />
              <span className="font-mono text-xs text-[#F4B9B9] tracking-[0.2em] uppercase font-medium">Clinical Excellence</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-8 leading-[1.15]">
              Engineering Superiority in <br />
              <span className="text-[#FFD43A] italic font-semibold">Women's Healthcare</span>
            </h2>
            
            <div className="space-y-6 font-body font-light text-[rgba(248,246,242,0.65)] leading-relaxed text-sm md:text-base max-w-xl mb-8">
              <p>
                Ulnar Medical & Diagnostic Centre is a premier specialist facility committed to redefining clinical accuracy and premium patient care. Located in Nairobi, our clinic bridges the gap between advanced medical diagnostic infrastructure and compassionate, expert specialty treatment.
              </p>
              <p>
                We recognize that modern healthcare demands customized, precision approaches. By combining advanced 3D/4D ultrasonic tracking systems with an elite clinical environment, we deliver tailored screening diagnostics and specialist consultations that meet international benchmarks right here on Ngong Road.
              </p>
            </div>

            {/* Quick-switch Slider Toggles */}
            <div className="flex items-center gap-3 mt-4 border border-white/5 p-1.5 rounded-full bg-[#0d1b3e]/30 backdrop-blur-sm">
              {SPECIALISTS_DATA.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveSpecialistIdx(idx)}
                  className={`px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${idx === activeSpecialistIdx ? 'bg-[#FFD43A] text-[#080f1e] font-bold shadow-xl' : 'text-white/40 hover:text-white/80 bg-transparent'}`}
                >
                  {doc.name.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE: ✅ RESTORED ACTIVE SPECIALISTS CARD ANIMATION LOOP ── */}
          <div ref={profilesContainerRef} className="lg:col-span-7 w-full relative z-10 flex flex-col items-center">
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#0d1b3e]/70 to-[#080f1e]/50 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between group">
              
              {/* Decorative Card Accent Ring */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#F4B9B9]/5 to-transparent rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoc.id}
                  initial={{ opacity: 0, y: 15, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.99 }}
                  transition={{ duration: 0.5, ease: EASE_LUXURY }}
                  className="w-full h-full flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-center text-left"
                >
                  {/* Doctor Profile Image Frame */}
                  <div className="relative w-36 h-48 md:w-44 md:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-xl shrink-0">
                    <img 
                      src={activeDoc.image} 
                      alt={activeDoc.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Doctor Profile Metric Narrative Details */}
                  <div className="flex-1 flex flex-col h-full justify-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Star className="size-3.5 fill-[#FFD43A] text-[#FFD43A]" />
                      <span className="font-mono text-[9px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-2 py-0.5 rounded border border-[#FFD43A]/10">
                        {activeDoc.title}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-1">
                      {activeDoc.name}
                    </h3>
                    <p className="font-mono text-xs text-[#F4B9B9] tracking-wider mb-4">
                      {activeDoc.role}
                    </p>
                    
                    <p className="font-sans font-light text-xs md:text-sm text-white/60 leading-relaxed mb-6">
                      &ldquo;{activeDoc.bio}&rdquo;
                    </p>

                    {/* Academic Credentials Stamp Lines */}
                    <div className="space-y-1.5 border-t border-white/5 pt-4">
                      {activeDoc.credentials.map((cred, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-[11px] font-mono text-white/40">
                          <UserCheck className="size-3 text-[#FFD43A]" />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Real-time Counter Stats Drawer Strip */}
              <div className="flex gap-8 border-t border-white/5 pt-6 mt-8 w-full">
                {activeDoc.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-left">
                    <p className="font-display font-semibold text-[#FFD43A] text-xl md:text-2xl italic leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                      {stat.label}
                    </p>
                  </div>
                ))}
                
                {/* Manual Progress Switch Trigger Anchor Link */}
                <button 
                  onClick={() => setActiveSpecialistIdx((prev) => (prev + 1) % SPECIALISTS_DATA.length)}
                  className="ml-auto flex items-center gap-2 font-mono text-[10px] text-[#F4B9B9] uppercase tracking-widest hover:text-[#FFD43A] transition-colors duration-300 group/btn"
                >
                  Next Specialist 
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;