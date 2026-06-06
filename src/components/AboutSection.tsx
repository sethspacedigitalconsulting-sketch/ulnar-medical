"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

const ease = [0.76, 0, 0.24, 1];

const specialists = [
  {
    name: "Dr. Elizabeth Odondi",
    role: "Consultant Radiologist — Lead Diagnostic Imaging Specialist at Ulnar Medical & Diagnostic Centre.",
    badge: "RADIOLOGY LEAD",
    src: "/images/DrElizabeth.jpg",
  },
  {
    name: "Dr. Cyprian Michieka",
    role: "Board-certified OB/GYN Specialist & Fellow in Maternal-Fetal Medicine. 5+ years experience in high-risk obstetric care and advanced fetal diagnostics.",
    badge: "MATERNAL-FETAL MEDICINE",
    src: "/images/clinician-2.jpg",
  },
];

const trailImages = [
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
  "/images/clinician-1.jpg",
  "/images/clinician-2.jpg",
  "/images/DrElizabeth.jpg",
  "/images/DrCyprian.jpg",
  "/images/clinician-1.jpg",
  "/images/clinician-2.jpg",
];

function ImageTrail({ items, maxNumberOfImages = 5, distance = 22, fadeAnimation = true }: { items: string[]; maxNumberOfImages?: number; distance?: number; fadeAnimation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>(items.map(() => null));
  const zCounter = useRef(1);
  const imageIndex = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const activate = (el: HTMLImageElement, x: number, y: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    el.style.left = `${x - rect.left}px`;
    el.style.top = `${y - rect.top}px`;
    if (zCounter.current > 40) zCounter.current = 1;
    el.style.zIndex = String(zCounter.current);
    zCounter.current++;
    el.dataset.status = "active";
    if (fadeAnimation) setTimeout(() => { el.dataset.status = "inactive"; }, 1500);
    lastPos.current = { x, y };
  };

  const deactivate = (el: HTMLImageElement) => { el.dataset.status = "inactive"; };
  const getDistance = (x: number, y: number) => Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

  const handleMove = (x: number, y: number) => {
    const threshold = window.innerWidth / distance;
    if (getDistance(x, y) > threshold) {
      const idx = imageIndex.current;
      const current = imgRefs.current[idx % imgRefs.current.length];
      const prev = imgRefs.current[(idx - maxNumberOfImages + imgRefs.current.length) % imgRefs.current.length];
      if (current) activate(current, x, y);
      if (prev) deactivate(prev);
      imageIndex.current++;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onTouchMove={(e) => { const t = e.touches[0]; if (t) handleMove(t.clientX, t.clientY); }}
      onTouchStart={(e) => { const t = e.touches[0]; if (t) lastPos.current = { x: t.clientX, y: t.clientY }; }}
      className="relative w-full h-[420px] sm:h-[480px] overflow-hidden cursor-crosshair touch-pan-y"
    >
      {items.map((src, i) => (
        <img key={i} ref={(el) => { imgRefs.current[i] = el; }} src={src} alt={`specialist-${i}`} data-status="inactive"
          className="absolute -translate-x-[50%] -translate-y-[50%] scale-0 opacity-0 pointer-events-none w-28 h-36 sm:w-40 sm:h-52 object-cover rounded-3xl border border-[#F4B9B9]/30 shadow-2xl shadow-black/60 transition-all duration-300 ease-out data-[status=active]:scale-100 data-[status=active]:opacity-100 data-[status=active]:duration-500" />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-50 gap-2">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="opacity-20">
          <path d="M6 24 C6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M6 24 C6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="24" r="3" fill="#FFD43A" />
        </svg>
        <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase hidden sm:block">Move cursor to reveal</span>
        <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase sm:hidden">Swipe to reveal</span>
      </div>
    </div>
  );
}

function SpecialistsSection() {
  return (
    <section className="relative bg-[#080f1e] pt-24 pb-16 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-14 text-center mb-12 relative z-20">
        <span className="font-mono text-[10px] tracking-widest text-[#FFD43A] uppercase bg-[#FFD43A]/5 px-3 py-1 rounded-full border border-[#FFD43A]/15">CLINICAL LEADERSHIP</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-4 tracking-tight">Our <span className="text-[#F4B9B9] italic">Specialists</span></h2>
        <p className="text-white/40 font-light text-sm max-w-md mx-auto mt-3">Meet the senior medical consultants behind every diagnosis.</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-14 relative z-10">
        <ImageTrail items={trailImages} maxNumberOfImages={5} distance={22} fadeAnimation />
      </div>
      <div className="max-w-5xl mx-auto px-6 md:px-14 mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        {specialists.map((s) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-[#0d1b3e]/40 backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#F4B9B9]/30 flex-shrink-0">
              <img src={s.src} alt={s.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[8px] text-[#FFD43A] tracking-wider uppercase bg-[#080f1e]/80 border border-[#FFD43A]/20 px-2 py-0.5 rounded-md inline-block mb-2 w-fit">{s.badge}</span>
              <h3 className="text-lg font-display font-bold text-white tracking-tight leading-tight mb-1">{s.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{s.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section ref={ref} id="about" className="relative py-28 md:py-36 px-8 md:px-14 overflow-hidden" style={{ background: "linear-gradient(180deg, #080f1e 0%, #0d1a30 100%)" }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,212,58,0.04) 0%, transparent 70%)" }} aria-hidden />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(244,185,185,0.04) 0%, transparent 70%)" }} aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="max-w-3xl mb-20" initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#FFD43A]" />
            <span className="label-mono text-[rgba(248,246,242,0.45)]">About Us</span>
          </div>
          <h2 className="font-display italic font-semibold text-[#F8F6F2] mb-8" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            <AnimatedText text="A clinic built on precision, trust," />{" "}
            <AnimatedText text="and compassion." style={{ color: "#F4B9B9" }} delay={0.22} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <AnimatedText text="Founded in 2021 along Ngong Road, Nairobi, Ulnar Medical and Diagnostic Centre was established with one mission: to deliver world-class obstetric and gynaecological diagnostics in an environment where every woman feels genuinely seen and cared for." as="p" splitBy="word" className="font-body text-[rgba(248,246,242,0.55)]" delay={0.1} />
            <AnimatedText text="We specialize in diagnostic services tailored for women of African descent - combining advanced 3D/4D imaging technology with deeply personalized clinical care. Our multidisciplinary team works under one roof, making your diagnostic journey seamless, clear, and warm." as="p" splitBy="word" className="font-body text-[rgba(248,246,242,0.55)]" delay={0.15} />
          </div>
          <AnimatedText text="Every scan, every result, and every conversation we have is guided by a commitment to accuracy, dignity, and trust. Because great diagnostics is not just science - it is care made visible." as="p" splitBy="word" className="mt-5 font-body text-[rgba(248,246,242,0.5)] text-sm leading-relaxed max-w-2xl" delay={0.2} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2, ease }}>
          <SpecialistsSection />
        </motion.div>
        <motion.div className="mt-12 flex flex-wrap items-center gap-4 px-6 py-5 rounded-2xl border border-[rgba(255,212,58,0.15)] bg-[rgba(255,212,58,0.03)]" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6, ease }}>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(255,212,58,0.12)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD43A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <div>
            <p className="label-mono text-[#FFD43A] mb-0.5">Registered &amp; Accredited</p>
            <p className="font-body text-[rgba(248,246,242,0.5)] text-sm">Kenya Medical Practitioners &amp; Dentists Council (KMPDC) - Certified Diagnostic Centre</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
