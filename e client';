'use client';
import { useState } from 'react';
import { HeroSection } from "@/components/HeroSection";
import { RadialScrollGallery } from "@/components/ui/radial-scroll-gallery";
import { InfiniteParallaxSlider } from "@/components/ui/argent-loop-infinite-slider";
import { AboutSection } from "@/components/AboutSection";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { BookingHub } from "@/components/sections/BookingHub";
import { MapEmbed } from "@/components/MapEmbed";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingCTA } from "@/components/ui/floating-cta";

// 🏥 Inline High-Performance Diagnostic Services Matrix
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
      title: 'Other Radiological Services',
      desc: 'Full-spectrum expert radiological reporting and ultrasound-guided procedures managed directly by our resident consultant radiologist.',
      bullets: [
        'Expert clinical reporting of X-rays, HSG, CT-Scans, and MRI files',
        'Precision ultrasound-guided interventional outpatient procedures',
        'Same-day rapid digital reporting loops for referring local clinics'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[#0d1b3e]">
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f5679d] font-semibold bg-[#f5679d]/10 px-4 py-1.5 rounded-full">
          Clinical Offerings
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white italic">
          Diagnostic Service Pillars
        </h2>
        <p className="max-w-xl mx-auto text-xs text-white/60 leading-relaxed font-sans">
          Advanced diagnostic imaging, specialty screenings, and dedicated consultant maternal care path options on Ngong Road.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#0f244d] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-[#f5679d]/40 flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono bg-white/5 text-[#FFD43A] px-2.5 py-1 rounded-md tracking-wider font-bold uppercase block w-max">
                {service.badge}
              </span>
              <h3 className="text-xl font-display font-bold text-white group-hover:text-[#f5679d] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {service.desc}
              </p>

              {service.bullets && expandedCard === service.id && (
                <div className="pt-4 border-t border-white/10 space-y-2 dynamic-fade-in">
                  <ul className="list-disc list-inside text-xs text-white/60 space-y-2 font-sans pl-1">
                    {service.bullets.map((bulletItem, itemIdx) => (
                      <li key={itemIdx} className="hover:text-white transition-colors">{bulletItem}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              {service.bullets ? (
                <button
                  onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  className="text-xs font-mono font-bold uppercase text-[#f5679d] hover:text-[#f5679d]/80 transition-colors"
                >
                  {expandedCard === service.id ? 'Collapse Details ↑' : 'Expand Details ↓'}
                </button>
              ) : (
                <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Standard Stream</span>
              )}
              <a href="#booking" className="text-xs font-mono text-white/60 hover:text-[#f5679d] transition-colors uppercase font-medium tracking-wider">
                Book Now →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#0d1b3e] text-white overflow-hidden">
      <HeroSection />
      <RadialScrollGallery />

      {/* 🚀 Deployed Combined Local Service Section */}
      <LocalServiceShowcase />

      <InfiniteParallaxSlider />
      <AboutSection />
      <CircularTestimonials />
      <MapEmbed />
      <BookingHub />
      <ContactFooter />
      <FloatingCTA />
    </main>
  );
}