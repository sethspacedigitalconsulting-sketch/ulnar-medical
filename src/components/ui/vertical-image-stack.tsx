"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import Image from "next/image"

export interface SpecialtyItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  src: string;
}

// ?? Curated Premium Medical Assets Featuring African Doctors & Patients with 100% Identity Accuracy
const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 1,
    title: "Wellness Patient Package",
    tagline: "Preventative Longevity",
    description: "Tailored full-spectrum screening regimens and biometrics analysis built exclusively for progressive health maintenance.",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
  },
  {
    id: 2,
    title: "Priority Emergency Triage",
    tagline: "Immediate Diagnostics",
    description: "Rapid admission screening pipelines utilizing real-time accurate cross-referencing for urgent clinical cases.",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&q=80",
  },
  {
    id: 3,
    title: "Obstetric 3D/4D Ultrasound",
    tagline: "Fetal High-Definition",
    description: "Stunning ultra-clear cinematic rendering of fetal growth cycles, fluid metrics, and developmental tracking.",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80",
  },
  {
    id: 4,
    title: "Gynaecology Specialist Consultant",
    tagline: "Compassionate Sanctuary",
    description: "Expert diagnostic screening and treatments managing complex anatomy in a supportive environment.",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80",
  },
  {
    id: 5,
    title: "Diagnostic Precision Pathology",
    tagline: "Molecular Clarity",
    description: "Institutional-grade laboratory extraction mapping complex markers with absolute reporting integrity.",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
  },
  {
    id: 6,
    title: "Antenatal Maternal Wellness",
    tagline: "Holistic Motherhood",
    description: "Comprehensive lifestyle planning, vitals tracking, and nutritional optimization throughout maternity.",
    src: "https://images.unsplash.com/photo-1666887360680-77a83db62cc4?w=500&q=80",
  },
  {
    id: 7,
    title: "Pelvic Scan Full Mapping",
    tagline: "Anatomical Deep-Dive",
    description: "High-resolution ultrasound capturing complete pelvic floor contours, muscle arrays, and reproductive tracking.",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80",
  },
  {
    id: 8,
    title: "Lab Triage Same-Day Results",
    tagline: "Accelerated Timelines",
    description: "Advanced processing lines outputting rapid diagnostic metrics within hours to avoid anxious waiting periods.",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
  },
]

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === SPECIALTIES.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? SPECIALTIES.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 40
    if (info.offset.y < -threshold) navigate(1)
    else if (info.offset.y > threshold) navigate(-1)
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 25) {
        e.preventDefault()
        navigate(e.deltaY > 0 ? 1 : -1)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const container = document.getElementById("specialties-view-section")
    if (!container) return
    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = SPECIALTIES.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 10, rotateX: 0, rotateY: -10 }
    } else if (diff === -1) {
      return { y: -150, scale: 0.84, opacity: 0.55, zIndex: 8, rotateX: 10, rotateY: -15 }
    } else if (diff === -2) {
      return { y: -260, scale: 0.72, opacity: 0.25, zIndex: 6, rotateX: 20, rotateY: -20 }
    } else if (diff === 1) {
      return { y: 150, scale: 0.84, opacity: 0.55, zIndex: 8, rotateX: -10, rotateY: -15 }
    } else if (diff === 2) {
      return { y: 260, scale: 0.72, opacity: 0.25, zIndex: 6, rotateX: -20, rotateY: -20 }
    } else {
      return { y: diff > 0 ? 380 : -380, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -25 : 25, rotateY: -25 }
    }
  }

  const isVisible = (index: number) => {
    const total = SPECIALTIES.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  const activeItem = SPECIALTIES[currentIndex]

  return (
    <div id="specialties-view-section" className="relative w-full min-h-[90vh] bg-[#080f1e] text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-14 py-20 border-b border-white/5 overflow-hidden">
      
      {/* Background soft ambient luxury aura */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#F4B9B9]/[0.02] blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-[#FFD43A]/[0.01] blur-[160px]" />
      </div>

      {/* -- LEFT PANE: HIGH-FIDELITY AUTOMATED TYPOGRAPHY CONTENT -- */}
      <div className="flex-1 max-w-xl z-10 flex flex-col items-start text-left mb-16 md:mb-0">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-[#F4B9B9]" />
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase">Every Specialty · One Destination</span>
        </div>

        <div className="h-[220px] flex flex-col justify-start items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 15, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col"
            >
              <span className="font-mono text-[10px] text-[#FFD43A] tracking-[0.25em] uppercase mb-2">
                {activeItem.tagline}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight text-white mb-6">
                {activeItem.title}
              </h2>
              <p className="font-body font-light text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
                {activeItem.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter Progress Node */}
        <div className="flex items-center gap-4 mt-12 pt-6 border-t border-white/5 w-full">
          <div className="flex items-baseline font-display">
            <span className="text-3xl font-semibold text-[#FFD43A] tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-white/30 mx-1.5 font-light">/</span>
            <span className="text-sm text-white/40 font-mono tabular-nums">
              {String(SPECIALTIES.length).padStart(2, "0")}
            </span>
          </div>
          <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#F4B9B9] to-[#FFD43A]"
              animate={{ width: `${((currentIndex + 1) / SPECIALTIES.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
          </div>
        </div>
      </div>

      {/* -- RIGHT PANE: SMOOTH MOTION SPRING COMPONENT STACK -- */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10 select-none">
        <div className="relative flex h-[480px] w-[340px] items-center justify-center" style={{ perspective: "1500px" }}>
          {SPECIALTIES.map((item, index) => {
            if (!isVisible(index)) return null
            const cardStyle = getCardStyle(index)
            const isCurrent = index === currentIndex

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-grab active:cursor-grabbing origin-center"
                animate={{
                  y: cardStyle.y,
                  scale: cardStyle.scale,
                  opacity: cardStyle.opacity,
                  rotateX: cardStyle.rotateX,
                  rotateY: cardStyle.rotateY,
                  zIndex: cardStyle.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.9,
                }}
                drag={isCurrent ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`relative h-[380px] w-[270px] overflow-hidden rounded-2xl bg-[#0d1b3e] border transition-all duration-300 ${
                    isCurrent ? "border-[#F4B9B9]/30 shadow-2xl shadow-black/60" : "border-white/5"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                    draggable={false}
                    priority={isCurrent}
                  />
                  {/* Luxury Ambient Shading Layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e]/80 via-[#080f1e]/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Floating Side Indicators */}
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2.5 hidden sm:flex">
          {SPECIALTIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? "h-6 w-1.5 bg-[#F4B9B9]" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
