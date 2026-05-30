"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SpecialtyItem {
  id: number;
  title: string;
  badge: string;
  desc: string;
  src: string;
  alt: string;
}

interface SpecialtyMarkupProps {
  specialties: SpecialtyItem[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  getCardStyle: (index: number) => any;
  isVisible: (index: number) => boolean;
  handleDragEnd: (e: any, info: any) => void;
}

export function SpecialtyMarkup({
  specialties,
  currentIndex,
  setCurrentIndex,
  getCardStyle,
  isVisible,
  handleDragEnd,
}: SpecialtyMarkupProps) {
  return (
    <section className="relative bg-[#080f1e] pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-16 text-left">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
          Every Speciality - <span className="text-[#F4B9B9] italic">One destination</span>
        </h2>
      </div>

      <div 
        id="ulnar-stack-container" 
        className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden bg-transparent max-w-7xl mx-auto px-6 md:px-14"
      >
        <div className="w-full flex items-center justify-center relative min-h-[480px]">
          <div className="relative flex h-[450px] w-[280px] items-center justify-center" style={{ perspective: "1500px" }}>
            {specialties.map((spec, index) => {
              if (!isVisible(index)) return null;
              const style = getCardStyle(index);
              const isCurrent = index === currentIndex;

              return (
                <motion.div
                  key={spec.id}
                  className="absolute cursor-grab active:cursor-grabbing origin-center select-none"
                  animate={{
                    y: style.y,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateX: style.rotateX,
                    rotateZ: style.rotateZ,
                    zIndex: style.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 0.9,
                  }}
                  drag={isCurrent ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`relative h-[370px] w-[250px] overflow-hidden rounded-[2.5rem] bg-[#0d1b3e] border transition-colors duration-300 ${
                      isCurrent ? "border-[#F4B9B9]/40 shadow-2xl shadow-black/90" : "border-white/5"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 via-transparent to-transparent z-10 pointer-events-none" />

                    <Image
                      src={spec.src}
                      alt={spec.alt}
                      fill
                      className="object-cover w-full h-full"
                      draggable={false}
                      sizes="250px"
                      priority={isCurrent}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/40 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2.5 z-30">
            {specialties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "h-6 bg-[#FFD43A] w-1.5" : "bg-white/10 w-1.5 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-14 bottom-4 pointer-events-none select-none font-mono text-xs text-white/20">
        <span className="text-white/60 text-lg font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(specialties.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}