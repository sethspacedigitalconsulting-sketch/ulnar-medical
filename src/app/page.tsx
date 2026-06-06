'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import ContactFooter from '@/components/ContactFooter';
import { FloatingCTA } from '@/components/ui/floating-cta';

// ✅ Client-safe dynamic bundles
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // ✅ PERF BALANCE LOCK: Enforce the 2-second structural loading buffer window to prevent layout jumps
    const layoutTimer = setTimeout(() => {
      setIsHydrated(true);
    }, 2000);

    return () => clearTimeout(layoutTimer);
  }, []);

  return (
    <main className="min-h-screen bg-[#080f1e] text-white select-none">
      <HeroSection />

      {/* ── MIDDLE SECTIONS ── */}
      <VerticalImageStack />
      <InfiniteParallaxSlider />
      <AboutSection />

      {/* ✅ CRITICAL MOB FIX: Prevent lower layouts from rendering until hydration is complete */}
      {isHydrated ? (
        <>
          <LocalServiceShowcase />
          <CircularTestimonials />
          <BookingHub />
          <MapEmbed />
          <ContactFooter />
        </>
      ) : (
        /* Structural spacer prevents lower modules from creeping under the hero on load */
        <div className="h-[200vh] bg-[#080f1e] w-full" />
      )}

      <FloatingCTA />
    </main>
  );
}

interface ServiceItem {
  id: number;
  badge: string;
  title: string;
  desc: string;
  image: string;
  bullets?: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    badge: 'OBSTETRIC CARE',
    title: '3D/4D Obstetric Ultrasound',
    desc: 'High-definition real-time fetal viewing and vital developmental milestone tracking.',
    image: '/images/3D4DobUl.jpg',
  },
  {
    id: 2,
    badge: 'GYNAECOLOGY',
    title: 'Gynecological Consultations',
    desc: 'Comprehensive reproductive health checks, pelvic pain investigations, and clinical reviews.',
    image: '/images/GandC.jpg',
  },
  {
    id: 3,
    badge: 'DIAGNOSTICS',
    title: 'Full Pelvic Diagnostic Scan',
    desc: 'Advanced ultrasound imaging for deep uterine and ovarian tissue structural analysis.',
    image: '/images/fpdc.jpg',
  },
  {
    id: 4,
    badge: 'WELLNESS',
    title: 'Antenatal Wellness Packages',
    desc: 'Structured maternal health monitoring sequences tailored specifically per trimester.',
    image: '/images/awp.jpg',
  },
  {
    id: 5,
    badge: 'MFM SPECIALIST CARE',
    title: 'Maternal-Fetal Specialist Services',
    desc: 'Expert maternal-fetal medicine consultations and high-fidelity imaging for high-risk pregnancies — delivered with advanced precision.',
    image: '/images/mfss.jpg',
    bullets: [
      'Pre-conception consultation and structural risk screening',
      'Advanced 2D/3D obstetric ultrasounds for high-risk tracking',
      'Fetal interventional monitoring (including amniocentesis paths)',
      'Detailed fetal anatomical surveys and anomaly scans',
      'Targeted fetal echocardiography (Fetal Echo)'
    ]
  },
  {
    id: 6,
    badge: 'RADIOLOGY & IMAGING',
    title: 'Advanced Clinical Radiology',
    desc: 'High-precision pelvic mapping and diagnostic imaging reporting workflows executed by senior clinical imaging specialists.',
    image: '/images/acr.jpg',
    bullets: [
      'Comprehensive pelvic floor mapping profile scans',
      'Transvaginal and follicular monitoring tracking arrays',
      'Same-day rapid reporting dispatch pathways'
    ]
  }
];

// ✅ Internal file module - no named export to clash with page configurations
function LocalServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="services" className="relative bg-[#0d1b3e] py-24 px-4 sm:px-6 md:px-14 border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start text-left mb-16 max-w-2xl">
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">
            Clinical Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
            Specialized Diagnostic Services
          </h2>
          <p className="font-sans text-xs text-white/40 mt-3 hidden md:block">
            Hover across cards to explore individual procedure metrics.
          </p>
          <p className="font-sans text-xs text-[#FFD43A] tracking-wider uppercase font-medium mt-3 md:hidden animate-pulse">
            👉 Tap clinical cards to expand info lines
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-4 min-h-[520px] md:h-[500px] overflow-hidden py-2">
          {services.map((svc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={svc.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`
                  relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#080f1e]/60 border backdrop-blur-sm
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none text-left flex flex-col justify-end
                  ${isActive
                    ? 'w-full md:w-[500px] h-[360px] md:h-full border-[#F4B9B9] shadow-2xl shadow-black/80 ring-1 ring-[#F4B9B9]/20'
                    : 'w-full md:w-[76px] h-[72px] md:h-full border-white/5 hover:border-white/20 hover:bg-[#080f1e]/80'
                  }
                `}
              >
                <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-20 md:opacity-10 md:scale-105 group-hover:opacity-30'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/70 to-transparent pointer-events-none" />
                </div>

                {!isActive && (
                  <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
                    <span className="font-display font-medium text-white/30 text-sm tracking-tight whitespace-nowrap -rotate-90 origin-center select-none uppercase">
                      {svc.title.split(' ')[0]} Care
                    </span>
                  </div>
                )}

                <div
                  className={`
                    relative z-10 p-6 md:p-8 flex flex-col w-full transition-all duration-500
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 md:opacity-0 pointer-events-none translate-y-4 max-md:hidden'}
                  `}
                >
                  <div className="mb-3 w-fit">
                    <span className="font-mono text-[9px] text-[#FFD43A] tracking-widest uppercase bg-[#FFD43A]/5 px-2.5 py-1 rounded-md border border-[#FFD43A]/15 backdrop-blur-md">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-white/70 font-body font-light text-xs md:text-sm leading-relaxed max-w-md">
                    {svc.desc}
                  </p>

                  {svc.bullets && (
                    <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-4 max-w-md">
                      {svc.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-white/50 flex items-center gap-2 animate-fadeIn">
                          <span className="w-1 h-1 rounded-full bg-[#F4B9B9] shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {!isActive && (
                  <div className="absolute bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 font-mono text-[10px] text-white/25 max-md:flex items-center gap-4 w-full px-1">
                    <span className="text-[#FFD43A] font-bold">0{svc.id}</span>
                    <span className="text-white/60 truncate md:hidden text-[11px] font-sans font-medium">{svc.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
