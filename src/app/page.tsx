'use client';

import { useState } from 'react';
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
  return (
    <main className="min-h-screen bg-[#080f1e] text-white overflow-hidden select-none">
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

function LocalServiceShowcase() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services = [
    { id: 1, badge: 'OBSTETRIC CARE', title: '3D/4D Obstetric Ultrasound', desc: 'High-definition real-time fetal viewing and vital developmental milestone tracking.' },
    { id: 2, badge: 'GYNAECOLOGY', title: 'Gynecological Consultations', desc: 'Comprehensive reproductive health checks, pelvic pain investigations, and clinical reviews.' },
    { id: 3, badge: 'DIAGNOSTICS', title: 'Full Pelvic Diagnostic Scan', desc: 'Advanced ultrasound imaging for deep uterine and ovarian tissue structural analysis.' },
    { id: 4, badge: 'WELLNESS', title: 'Antenatal Wellness Packages', desc: 'Structured maternal health monitoring sequences tailored specifically per trimester.' },
    {
      id: 5, badge: 'MFM SPECIALIST CARE', title: 'Maternal-Fetal Specialist Services',
      desc: 'Expert maternal-fetal medicine consultations and high-fidelity imaging for high-risk pregnancies.',
      bullets: ['Pre-conception consultation and structural risk screening','Advanced 2D/3D obstetric ultrasounds for high-risk tracking','Fetal interventional monitoring (including amniocentesis paths)','Detailed fetal anatomical surveys and comprehensive anomaly scans','Targeted fetal echocardiography (Fetal Echo)'],
    },
    {
      id: 6, badge: 'RADIOLOGY & IMAGING', title: 'Advanced Clinical Radiology',
      desc: 'High-precision pelvic mapping and diagnostic imaging reporting by senior clinical imaging specialists.',
      bullets: ['Comprehensive pelvic floor mapping profile scans','Transvaginal and follicular monitoring tracking arrays','Same-day rapid reporting dispatch pathways'],
    },
  ];

  return (
    <section id="services" className="relative bg-[#0d1b3e] py-24 px-6 md:px-14 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">Clinical Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">Specialized Diagnostic Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setExpandedCard(expandedCard === svc.id ? null : svc.id)}
              className={`p-8 rounded-2xl border bg-[#080f1e]/40 backdrop-blur-md cursor-pointer transition-all duration-300 select-none text-left ${expandedCard === svc.id ? 'border-[#F4B9B9] shadow-lg shadow-black/40' : 'border-white/5 hover:border-white/10'}`}
            >
              <span className="font-mono text-[10px] text-[#FFD43A] tracking-wider uppercase bg-[#FFD43A]/5 px-2.5 py-1 rounded-md border border-[#FFD43A]/10">{svc.badge}</span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{svc.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{svc.desc}</p>
              {svc.bullets && expandedCard === svc.id && (
                <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {svc.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-white/50 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#F4B9B9]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
