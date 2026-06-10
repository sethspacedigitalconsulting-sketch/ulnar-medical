"use client";

import React from "react";
import { ShieldCheck, Award, Heart } from "lucide-react";

export function AboutSection() {
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
    <section id="about" className="relative bg-[#080f1e] py-24 px-4 sm:px-6 md:px-14 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Mission Text */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">Our Core Foundation</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Engineering Excellence in <span className="text-[#FFD43A] italic">Women's Healthcare</span>
            </h2>
            
            <div className="space-y-5 font-body font-light text-[rgba(248,246,242,0.65)] leading-relaxed text-sm md:text-base">
              <p>
                Ulnar Medical & Diagnostic Centre is a premier specialist facility committed to redefining clinical accuracy and premium patient care. Located in Nairobi, our clinic bridges the gap between advanced medical diagnostic infrastructure and compassionate, expert specialty treatment.
              </p>
              
              {/* ✅ UPDATED: The phrase "women of African descent" has been cleanly removed from this paragraph */}
              <p>
                We recognize that modern healthcare demands customized, precision approaches. By combining advanced 3D/4D ultrasonic tracking systems with an elite clinical environment, we deliver tailored screening diagnostics and specialist consultations that meet international benchmarks right here on Ngong Road.
              </p>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4 md:gap-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-[#0d1b3e]/40 border border white/5 backdrop-blur-sm hover:border-[#F4B9B9]/20 transition-all duration-300 text-left"
                >
                  <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-[#FFD43A]/10 text-[#FFD43A] shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display font-semibold text-lg text-white mb-1">{value.title}</h3>
                    <p className="font-body font-light text-xs md:text-sm text-[rgba(248,246,242,0.5)] leading-relaxed">{value.desc}</p>
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