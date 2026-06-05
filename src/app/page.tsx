'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { ContactFooter } from '@/components/ContactFooter';
import { FloatingCTA } from '@/components/ui/floating-cta';

const VerticalImageStack = dynamic(
  () => import('@/components/ui/vertical-image-stack').then((m) => ({ default: m.VerticalImageStack })),
  { ssr: false }
);

const InfiniteParallaxSlider = dynamic(
  () => import('@/components/ui/argent-loop-infinite-slider').then((m) => ({ default: m.InfiniteParallaxSlider })),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import('@/components/AboutSection').then((m) => ({ default: m.AboutSection })),
  { ssr: false }
);

const CircularTestimonials = dynamic(
  () => import('@/components/ui/circular-testimonials').then((m) => ({ default: m.CircularTestimonials })),
  { ssr: false }
);

const BookingHub = dynamic(
  () => import('@/components/sections/BookingHub').then((m) => ({ default: m.BookingHub })),
  { ssr: false }
);

const MapEmbed = dynamic(
  () => import('@/components/MapEmbed').then((m) => ({ default: m.MapEmbed })),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#080f1e] text-white select-none">
      <HeroSection />
      <VerticalImageStack />
      <InfiniteParallaxSlider />
      <AboutSection />
      <LocalServiceShowcase />
      <CircularTestimonials />
      <BookingHub />
      <MapEmbed />
      <ContactFooter />
      <FloatingCTA />
    </main>
  );
}

interface Service {
  id: number;
  badge: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
  bullets?: string[];
}

const services: Service[] = [
  {
    id: 1,
    badge: 'OBSTETRIC CARE',
    title: '3D/4D Obstetric Ultrasound',
    desc: 'High-definition real-time fetal viewing and vital developmental milestone tracking.',
    tag: 'OB/GYN',
    image: '/images/3D4DobUl.jpg',
  },
  {
    id: 2,
    badge: 'GYNAECOLOGY',
    title: 'Gynecological Consultations',
    desc: 'Comprehensive reproductive health checks, pelvic pain investigations, and clinical reviews.',
    tag: 'Specialist Care',
    image: '/images/GandC.jpg',
  },
  {
    id: 3,
    badge: 'DIAGNOSTICS',
    title: 'Full Pelvic Diagnostic Scan',
    desc: 'Advanced ultrasound imaging for deep uterine and ovarian tissue structural analysis.',
    tag: 'Diagnostic',
    image: '/images/fpdc.jpg',
  },
  {
    id: 4,
    badge: 'WELLNESS',
    title: 'Antenatal Wellness Packages',
    desc: 'Structured maternal health monitoring sequences tailored specifically per trimester.',
    tag: 'Maternal Track',
    image: '/images/awp.jpg',
  },
  {
    id: 5,
    badge: 'MFM SPECIALIST CARE',
    title: 'Maternal-Fetal Specialist Services',
    desc: 'Expert maternal-fetal medicine consultations and high-fidelity imaging for high-risk pregnancies.',
    tag: 'MFM',
    image: '/images/mfss.jpg',
    bullets: [
      'Pre-conception consultation and structural risk screening',
      'Advanced 2D/3D obstetric ultrasounds for high-risk tracking',
      'Fetal interventional monitoring including amniocentesis',
      'Detailed fetal anatomical surveys and anomaly scans',
      'Targeted fetal echocardiography (Fetal Echo)',
    ],
  },
  {
    id: 6,
    badge: 'RADIOLOGY & IMAGING',
    title: 'Advanced Clinical Radiology',
    desc: 'High-precision pelvic mapping and diagnostic imaging reporting by senior clinical imaging specialists.',
    tag: 'Radiology',
    image: '/images/acr.jpg',
    bullets: [
      'Comprehensive pelvic floor mapping profile scans',
      'Transvaginal and follicular monitoring tracking arrays',
      'Same-day rapid reporting dispatch pathways',
    ],
  },
];

function LocalServiceShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "0px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setHoveredIndex(index);
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
      setIsVisible(false);
    }
  };

  const handleTap = (index: number) => {
    if (isMobile) {
      setActiveIndex((prev) => (prev === index ? null : index));
    }
  };

  const activeDesktop = hoveredIndex;
  const activeMobile = activeIndex;

  return (
    <section
      id="services"
      className="relative bg-[#0d1b3e] py-24 px-6 md:px-14 border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="flex flex-col items-start text-left mb-16">
          <motion.span
            className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Clinical Capabilities
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            Specialized Diagnostic Services
          </motion.h2>
          <p className="md:hidden font-mono text-[10px] text-white/25 tracking-widest uppercase mt-3">
            Tap a service to reveal
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          <div
            className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl shadow-2xl hidden md:block"
            style={{
              left: containerRect?.left ?? 0,
              top: containerRect?.top ?? 0,
              transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 120}px, 0)`,
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? '1' : '0.85',
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="relative w-[300px] h-[200px] bg-[#0d1b3e] rounded-2xl overflow-hidden border border-[#F4B9B9]/20">
              {services.map((service, index) => (
                <img
                  key={service.id}
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                  style={{
                    opacity: activeDesktop === index ? 1 : 0,
                    transform: activeDesktop === index ? 'scale(1)' : 'scale(1.08)',
                    filter: activeDesktop === index ? 'none' : 'blur(8px)',
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e]/80 to-transparent" />
              {activeDesktop !== null && (
                <div className="absolute bottom-3 left-4">
                  <span className="font-mono text-[9px] text-[#FFD43A] tracking-widest uppercase">
                    {services[activeDesktop]?.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => {
              const isActiveRow = isMobile ? activeMobile === index : activeDesktop === index;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleTap(index)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative py-6 border-t border-white/6 transition-all duration-300 ease-out">
                    <div
                      className={`absolute inset-0 -mx-4 px-4 rounded-xl bg-[#F4B9B9]/5 transition-all duration-300 ease-out ${isActiveRow ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-[9px] text-[#FFD43A] tracking-widest uppercase bg-[#FFD43A]/5 px-2 py-0.5 rounded border border-[#FFD43A]/15">
                            {service.badge}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <h3 className="text-white font-display font-semibold text-xl md:text-2xl tracking-tight relative">
                            <span className="relative">
                              {service.title}
                              <span
                                className={`absolute left-0 -bottom-0.5 h-px bg-[#F4B9B9] transition-all duration-300 ease-out ${isActiveRow ? 'w-full' : 'w-0'}`}
                              />
                            </span>
                          </h3>
                          <ArrowUpRight
                            className={`w-4 h-4 text-[#F4B9B9] transition-all duration-300 ease-out ${isActiveRow ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'}`}
                          />
                        </div>
                        <p
                          className={`text-sm mt-1 leading-relaxed transition-all duration-300 ease-out ${isActiveRow ? 'text-white/70' : 'text-white/40'}`}
                        >
                          {service.desc}
                        </p>
                        <div
                          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isActiveRow ? 'max-h-[220px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
                        >
                          <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-[#F4B9B9]/20">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e]/70 to-transparent" />
                            <div className="absolute bottom-3 left-4">
                              <span className="font-mono text-[9px] text-[#FFD43A] tracking-widest uppercase">
                                {service.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                        {service.bullets && isActiveRow && (
                          <ul className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                            {service.bullets.map((bullet, idx) => (
                              <li key={idx} className="text-xs text-white/50 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#F4B9B9] flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span
                          className={`text-xs font-mono tabular-nums transition-all duration-300 ease-out ${isActiveRow ? 'text-[#FFD43A]' : 'text-white/20'}`}
                        >
                          0{service.id}
                        </span>
                        <span
                          className={`hidden sm:inline text-[9px] font-mono uppercase tracking-wider transition-all duration-300 ease-out ${isActiveRow ? 'text-[#F4B9B9]/70' : 'text-white/20'}`}
                        >
                          {service.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-white/6" />
          </div>
        </div>
      </div>
    </section>
  );
}