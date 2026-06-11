"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
  experience: string;
  accuracy: string;
}

const CLINICAL_ROSTER: Specialist[] = [
  {
    id: 1,
    name: "Dr. Elizabeth Odondi",
    role: "Lead Consultant Radiologist",
    title: "Chief of Diagnostic Imaging",
    bio: "Senior Consultant Radiologist specializing in high-fidelity pelvic mapping, ultrasound-guided interventional tracking arrays, and advanced diagnostic reporting frameworks.",
    image: "/images/DrElizabeth.jpg",
    experience: "12+ Yrs",
    accuracy: "99.8%"
  },
  {
    id: 2,
    name: "Dr. Cyprian Michieka",
    role: "Board-Certified OB/GYN Specialist",
    title: "Fellow in Maternal-Fetal Medicine",
    bio: "Elite maternal-fetal medical practitioner dedicated to pre-conception screening arrays, detailed 3D/4D anatomical anomaly tracking, and fetal echoes.",
    image: "/images/clinician-2.jpg",
    experience: "15+ Yrs",
    accuracy: "99.9%"
  }
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // ✅ PROBLEM 3 FIX: Configure GSAP ScrollTrigger to track scroll inputs inside the main element container
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: "main", // ← Directs the scroll engine to monitor internal container scroll positions
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
  }, { scope: containerRef });

  const activeDoc = CLINICAL_ROSTER[activeIdx];

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#080f1e] py-28 px-4 sm:px-6 md:px-14 border-b border-white/5 overflow-hidden min-h-screen flex items-center w-full"
    >
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,rgba(255,212,58,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clinical Copy Block Text Layers */}
          <div ref={textContainerRef} className="lg:col-span-5 flex flex-col items-start text-left relative z-20">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="h-px w-8 bg-[#F4B9B9] group-hover:w-12 transition-all duration-500" />
              <span className="font-mono text-xs text-[#F4B9B9] tracking-[0.2em] uppercase font-medium">Clinical Sanctuary</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-8 leading-[1.15]">
              Engineering Excellence in <br />
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

            <div className="flex items-center gap-3 border border-white/5 p-1.5 rounded-full bg-[#0d1b3e]/30 backdrop-blur-md">
              {CLINICAL_ROSTER.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${idx === activeIdx ? 'bg-[#FFD43A] text-[#080f1e] font-bold shadow-xl' : 'text-white/40 hover:text-white/80 bg-transparent'}`}
                >
                  {doc.name.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specialists Profiles Animated Card Carousel */}
          <div className="lg:col-span-7 w-full relative z-10 flex flex-col items-center">
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#0d1b3e]/60 to-[#080f1e]/40 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between group">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#F4B9B9]/5 to-transparent rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoc.id}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE_LUXURY }}
                  className="w-full flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-center text-left"
                >
                  <div className="relative w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
                    <img 
                      src={activeDoc.image} 
                      alt={activeDoc.name} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col h-full justify-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="size-3.5 text-[#FFD43A]" />
                      <span className="font-mono text-[9px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-2.5 py-1 rounded-md border border-[#FFD43A]/15">
                        {activeDoc.title}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-1">
                      {activeDoc.name}
                    </h3>
                    <p className="font-mono text-xs text-[#F4B9B9] tracking-wider mb-4">
                      {activeDoc.role}
                    </p>
                    
                    <p className="font-sans font-light text-xs md:text-sm text-white/60 leading-relaxed italic">
                      &ldquo;{activeDoc.bio}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-10 border-t border-white/5 pt-6 mt-8 w-full items-center">
                <div>
                  <p className="font-display font-semibold text-[#FFD43A] text-xl md:text-2xl italic leading-none mb-1">
                    {activeDoc.experience}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">Clinical Track</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-[#FFD43A] text-xl md:text-2xl italic leading-none mb-1">
                    {activeDoc.accuracy}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">Accuracy Metric</p>
                </div>
                
                <button 
                  onClick={() => setActiveIdx((prev) => (prev + 1) % CLINICAL_ROSTER.length)}
                  className="ml-auto flex items-center gap-2 font-mono text-[10px] text-[#F4B9B9] uppercase tracking-widest hover:text-[#FFD43A] transition-colors duration-300 group/btn"
                >
                  View Next 
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