'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from "@/components/HeroSection";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { InfiniteParallaxSlider } from "@/components/ui/argent-loop-infinite-slider";
import { AboutSection } from "@/components/AboutSection";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { BookingHub } from "@/components/sections/BookingHub";
import { MapEmbed } from "@/components/MapEmbed";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080f1e] text-white overflow-hidden select-none">
      <HeroSection />

      {/* ── Every Specialty · One Destination (Advanced Typography Reveal) ── */}
      <section className="relative bg-[#080f1e] pt-24 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-14 mb-12">
          <div className="flex flex-col items-start text-left">

            {/* Tagline Reveal Mask */}
            <div className="overflow-hidden mb-3">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block font-mono text-xs text-[#FFD43A] tracking-widest uppercase"
              >
                Ulnar Medical Capabilities
              </motion.span>
            </div>

            {/* Heading Word-by-Word Character Glide */}
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight tracking-tight flex flex-wrap gap-x-2.5 gap-y-1">
              {["Every", "Specialty,"].map((word, index) => (
                <span key={index} className="relative inline-flex overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: index * 0.06, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              {["One", "Destination"].map((word, index) => (
                <span key={index} className="relative inline-flex overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: (index + 2) * 0.06, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block text-[#F4B9B9] italic font-medium"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>

          </div>
        </div>
        <VerticalImageStack />
      </section>

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
      id: 5,
      badge: 'MFM SPECIALIST CARE',
      title: 'Maternal-Fetal Specialist Services',
      desc: 'Expert maternal-fetal medicine consultations and high-fidelity imaging for high-risk pregnancies — delivered with advanced precision.',
      bullets: [
        'Pre-conception consultation and structural risk screening',
        'Advanced 2D/3D obstetric ultrasounds for high-risk tracking',
        'Fetal interventional monitoring (including amniocentesis paths)',
        'Detailed fetal anatomical surveys and comprehensive anomaly scans',
        'Targeted fetal echocardiography (Fetal Echo)'
      ]
    },
    {
      id: 6,
      badge: 'RADIOLOGY & IMAGING',
      title: 'Advanced Clinical Radiology',
      desc: 'High-precision pelvic mapping and diagnostic imaging reporting workflows executed by senior clinical imaging specialists.',
      bullets: [
        'Comprehensive pelvic floor mapping profile scans',
        'Transvaginal and follicular monitoring tracking arrays',
        'Same-day rapid reporting dispatch pathways'
      ]
    }
  ];

  return (
    <section id="services" className="relative bg-[#0d1b3e] py-24 px-6 md:px-14 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">Clinical Capabilities</span>
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