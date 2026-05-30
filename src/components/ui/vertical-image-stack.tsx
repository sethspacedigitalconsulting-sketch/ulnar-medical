"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { type PanInfo } from "framer-motion";
import { SpecialtyMarkup } from "./specialty-markup";

interface SpecialtyItem {
  id: number;
  title: string;
  badge: string;
  desc: string;
  src: string;
  alt: string;
}

const specialties: SpecialtyItem[] = [
  {
    id: 1,
    title: "Wellness Patient Package",
    badge: "MATERNAL WELLNESS",
    desc: "Comprehensive proactive health monitoring regimens designed around your active cycles.",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
    alt: "African clinician reviewing antenatal wellness trends"
  },
  {
    id: 2,
    title: "Priority Emergency Triage",
    badge: "24/7 CLINICAL CARE",
    desc: "Immediate clinical staging workflows engineered for rapid diagnostic response.",
    src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&q=80",
    alt: "Rapid medical assessment at Ulnar sanctuary"
  },
  {
    id: 3,
    title: "Obstetric 3D/4D Ultrasound",
    badge: "ADVANCED IMAGING",
    desc: "High-fidelity cinematic renderings capturing real-time developmental progression.",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80",
    alt: "High-precision obstetric ultrasound session in progress"
  },
  {
    id: 4,
    title: "Gynaecology Specialist Consultant",
    badge: "REPRODUCTIVE HEALTH",
    desc: "Elite care parameters and structural screening sequences delivered by senior experts.",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80",
    alt: "African medical expert consulting with family member"
  },
  {
    id: 5,
    title: "Diagnostic Precision Pathology",
    badge: "LABORATORY SYSTEMS",
    desc: "Meticulous verification mechanics generating deep data insight arrays.",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
    alt: "Pathology testing array at Ulnar Medical labs"
  },
  {
    id: 6,
    title: "Antenatal Maternal Wellness",
    badge: "OBSTETRIC TRIAD",
    desc: "Compassionate clinical steps keeping both mother and fetus shielded safely.",
    src: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=500&q=80",
    alt: "African expectant mother smile during wellness assessment"
  },
  {
    id: 7,
    title: "Pelvic Scan Full Mapping",
    badge: "DIAGNOSTIC ANATOMY",
    desc: "Detailed structural tissue mapping sequences providing extreme diagnostic clarity.",
    src: "/images/psfm.jpg", 
    alt: "Pelvic scan full mapping diagnostic procedure"
  },
  {
    id: 8,
    title: "Lab Triage Same-Day Results",
    badge: "RAPID RECOVERY DISPATCH",
    desc: "Eliminates painful tracking delays. Critical pathology profiles are accelerated and dispatched via rapid channels to provide definitive answers within hours of your visit.",
    src: "/images/ltsdr.jpg",
    alt: "Black female nurse or doctor in a diagnostic laboratory verifying rapid triage results"
  }
];

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lastNavigationTime = useRef<number>(0);
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

  const handleDragEnd = (_e: any, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.y < -threshold) {
      navigate(1);
    } else if (info.offset.y > threshold) {
      navigate(-1);
    }
  };

  const handleWheel = useCallback(
    (e: any) => {
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

  return (
    <SpecialtyMarkup
      specialties={specialties}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      getCardStyle={getCardStyle}
      isVisible={isVisible}
      handleDragEnd={handleDragEnd}
    />
  );
}