"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, type PanInfo, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 🏥 Curated Medical Specialties with Authentic African Clinician Asset Streams
const specialties = [
  {
    id: 1,
    title: "Wellness Patient Package",
    badge: "MATERNAL WELLNESS",
    desc: "Comprehensive proactive health monitoring regimens designed around your active cycles.",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
    alt: "African clinician reviewing antenatal wellness trends",
  },
  {
    id: 2,
    title: "Priority Emergency Triage",
    badge: "24/7 CLINICAL CARE",
    desc: "Immediate clinical staging workflows engineered for rapid diagnostic response.",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&q=80",
    alt: "Rapid medical assessment at Ulnar sanctuary",
  },
  {
    id: 3,
    title: "Obstetric 3D/4D Ultrasound",
    badge: "ADVANCED IMAGING",
    desc: "High-fidelity cinematic renderings capturing real-time developmental progression.",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80",
    alt: "High-precision obstetric ultrasound session in progress",
  },
  {
    id: 4,
    title: "Gynaecology Specialist Consultant",
    badge: "REPRODUCTIVE HEALTH",
    desc: "Elite care parameters and structural screening sequences delivered by senior experts.",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80",
    alt: "African medical expert consulting with family member",
  },
  {
    id: 5,
    title: "Diagnostic Precision Pathology",
    badge: "LABORATORY SYSTEMS",
    desc: "Meticulous verification mechanics generating deep data insight arrays.",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
    alt: "Pathology testing array at Ulnar Medical labs",
  },
  {
    id: 6,
    title: "Antenatal Maternal Wellness",
    badge: "OBSTETRIC TRIAD",
    desc: "Compassionate clinical steps keeping both mother and fetus shielded safely.",
    src: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=500&q=80",
    alt: "African expectant mother smile during wellness assessment",
  },
  {
    id: 7,
    title: "Pelvic Scan Full Mapping",
    badge: "DIAGNOSTIC ANATOMY",
    desc: "Detailed structural tissue mapping sequences providing extreme diagnostic clarity.",
    src: "https://images.unsplash.com/photo-1666887360680-77a83db62cc4?w=500&q=80",
    alt: "Pelvic tissue structure scanning array",
  },
  {
    id: 8,
    title: "Lab Triage Same-Day Results",
    badge: "RAPID RECOVERY DISPATCH",
    desc: "Eliminates painful tracking delays. Critical pathology profiles are accelerated and dispatched via rapid channels to provide definitive answers within hours of your visit.",
    src: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=80",
    alt: "African medical specialist verifying rapid lab triage diagnostic metrics",
  },
];

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 450;

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < navigationCooldown) return;
    lastNavigationTime.current = now;

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === specialties.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? specialties.length - 1 : prev - 1;
    });
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.y < -threshold) {
      navigate(1);
    } else if (info.offset.y > threshold) {
      navigate(-1);
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        navigate(e.deltaY > 0 ? 1 : -1);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const container = document.getElementById("ulnar-stack-container");
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const getCardStyle = (index: number) => {
    const total = specialties.length;
    let diff = index - currentIndex;
    
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 10, rotateX: 0, rotateZ: 0 };
    } else if (diff === -1) {
      return { y: -130, scale: 0.84, opacity: 0.5, zIndex: 8, rotateX: 12, rotateZ: -1 };
    } else if (diff === -2) {
      return { y: -230, scale: 0.72, opacity: 0.2, zIndex: 6, rotateX: 22, rotateZ: -2 };
    } else if (diff === 1) {
      return { y: 130, scale: 0.84, opacity: 0.5, zIndex: 8, rotateX: -12, rotateZ: 1 };
    } else if (diff === 2) {
      return { y: 230, scale: 0.72, opacity: 0.2, zIndex: 6, rotateX: -22, rotateZ: 2 };
    } else {
      return { y: diff > 0 ? 350 : -350, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -35 : 35, rotateZ: 0 };
    }
  };

  const isVisible = (index: number) => {
    const total = specialties.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const activeData = specialties[currentIndex];

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
        <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          
          <div className="md:col-span-5 flex flex-col justify-center text-left min-h-[250px] pointer-events-none z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="font-mono text-[10px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-3 py-1 rounded-full border border-[#FFD43A]/15">
                  {activeData.badge}
                </span>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-white mt-5 mb-4 tracking-tight leading-none">
                  {activeData.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed max-w-sm">
                  {activeData.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:col-span-7 flex items-center justify-center relative min-h-[480px]">
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