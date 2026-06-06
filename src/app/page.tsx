'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { ContactFooter } from '@/components/ContactFooter';
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
    // Lock hydration state once layout is client-safe
    setIsHydrated(true);
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

interface Service {
  id: number;
  badge: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
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
  },
  {
    id: 6,
    badge: 'RADIOLOGY & IMAGING',
    title: 'Advanced Clinical Radiology',
    desc: 'High-precision pelvic mapping and diagnostic imaging reporting by senior clinical imaging specialists.',
    tag: 'Radiology',
    image: '/images/acr.jpg',
  },
];

function LocalServiceShowcase() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-[#0d1b3e] py-24 px-6 md:px-14 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">
            Clinical Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
            Specialized Diagnostic Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setExpandedCard(expandedCard === svc.id ? null : svc.id)}
              className={`p-8 rounded-2xl border bg-[#080f1e]/40 backdrop-blur-md cursor-pointer transition-all duration-300 select-none text-left ${expandedCard === svc.id ? 'border-[#F4B9B9] shadow-lg shadow-black/40' : 'border-white/5 hover:border-white/10'
                }`}
            >
              <span className="font-mono text-[10px] text-[#FFD43A] tracking-wider uppercase bg-[#FFD43A]/5 px-2.5 py-1 rounded-md border border-[#FFD43A]/10">
                {svc.badge}
              </span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{svc.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}