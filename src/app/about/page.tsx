"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ContactFooter from "@/components/ContactFooter";

function useCounter(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const specialists = [
  {
    name: "Dr. Elizabeth Odondi",
    role: "Lead OB/GYN & Founder",
    specialty: "Obstetric Ultrasound · Maternal-Fetal Medicine",
    initials: "EO",
    bio: "Dr. Elizabeth Odondi leads Ulnar Medical with a focus on obstetric ultrasound and maternal-fetal medicine. She founded the centre on the belief that every family in Nairobi deserves world-class diagnostic imaging delivered with compassion.",
  },
  {
    name: "Dr. Cyprian Michieka",
    role: "Specialist Physician",
    specialty: "Gynecological Consultations · Diagnostic Imaging",
    initials: "CM",
    bio: "Dr. Cyprian Michieka brings specialist expertise in gynecological consultations and diagnostic imaging, ensuring every patient receives thorough, evidence-based care tailored to their individual needs.",
  },
];

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const patients = useCounter(5000, 2000, statsVisible);
  const years = useCounter(3, 1200, statsVisible);
  const scans = useCounter(12000, 2200, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      {/* Header */}
      <div className="bg-[#070b1a] border-b border-white/10 px-6 md:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#d4a843] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#d4a843" />
              <circle cx="12" cy="12" r="9" stroke="#d4a843" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold leading-tight">Ulnar <span className="text-[#d4a843] italic">Medical</span></div>
            <div className="text-[9px] tracking-[0.2em] text-white/50 uppercase">Diagnostic Centre</div>
          </div>
        </Link>
        <Link href="/#booking" className="bg-[#d4a843] text-[#070b1a] text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors">Book Now</Link>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-16 pt-20 pb-16 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">About Us</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Where Precision<br /><span className="text-[#d4a843] italic">Meets Compassion</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl">
          Founded in 2021 on Ngong Road, Nairobi — built on the promise that every patient deserves world-class diagnostics delivered with genuine human care.
        </p>
      </div>

      {/* Dr. Elizabeth Feature */}
      <div className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-white/10">
          <div className="relative h-96 md:h-auto overflow-hidden group">
            <Image
              src="/images/DrElizabeth.jpg"
              alt="Dr. Elizabeth Odondi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[10px] tracking-[0.3em] text-[#d4a843] uppercase mb-1">Lead Specialist & Founder</p>
              <h2 className="text-2xl font-bold">Dr. Elizabeth Odondi</h2>
              <p className="text-white/50 text-sm">OB/GYN · Maternal-Fetal Medicine · Obstetric Ultrasound</p>
            </div>
          </div>
          <div className="bg-white/4 p-10 md:p-12 flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-6">Our Story</p>
            <p className="text-white/70 leading-relaxed mb-4">
              Dr. Elizabeth Odondi founded Ulnar Medical & Diagnostic Centre with a clear conviction — that families in Nairobi deserve the same quality of diagnostic imaging available in the world&apos;s leading hospitals.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Specialising in obstetric ultrasound and maternal-fetal medicine, she built a centre where precision and compassion are never in conflict — where every scan is performed with the care it deserves.
            </p>
            <p className="text-white/70 leading-relaxed">
              Today, Ulnar Medical has supported thousands of Nairobi families through their most important health milestones, and the team continues to grow with that same founding mission at its core.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div ref={statsRef} className="px-6 md:px-16 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Patients Served", value: patients.toLocaleString(), suffix: "+", note: "Families who trusted us" },
          { label: "Years of Excellence", value: years, suffix: "+", note: "Since 2021, Ngong Road" },
          { label: "Scans Completed", value: scans.toLocaleString(), suffix: "+", note: "Diagnostic procedures performed" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#d4a843]/40 transition-all duration-300 group"
          >
            <p className="text-5xl font-bold text-[#d4a843] mb-1 transition-transform duration-300 group-hover:scale-110 inline-block">
              {stat.value}{stat.suffix}
            </p>
            <p className="font-semibold mt-2">{stat.label}</p>
            <p className="text-white/40 text-xs mt-1">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Specialists */}
      <div className="px-6 md:px-16 pb-20 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-8">Meet the Specialists</p>
        <div className="border-t border-white/10">
          {specialists.map((member, i) => (
            <div
              key={member.name}
              className="relative border-b border-white/10 py-8 cursor-default"
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div
                className="absolute inset-0 -mx-2 rounded-xl transition-all duration-300"
                style={{ background: hoveredMember === i ? "rgba(212,168,67,0.05)" : "transparent" }}
              />
              <div className="relative flex gap-6 items-start">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    borderColor: hoveredMember === i ? "#d4a843" : "rgba(255,255,255,0.15)",
                    background: hoveredMember === i ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: hoveredMember === i ? "#d4a843" : "rgba(255,255,255,0.4)" }}>
                    {member.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold relative">
                      {member.name}
                      <span
                        className="absolute left-0 -bottom-0.5 h-px bg-[#d4a843] transition-all duration-300"
                        style={{ width: hoveredMember === i ? "100%" : "0%" }}
                      />
                    </h3>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#d4a843] shrink-0 transition-all duration-300"
                      style={{ opacity: hoveredMember === i ? 1 : 0, transform: hoveredMember === i ? "translate(0,0)" : "translate(-4px,4px)" }}
                    />
                  </div>
                  <p className="text-[#d4a843]/70 text-xs tracking-wide mb-2">{member.role}</p>
                  <p className="text-white/40 text-xs mb-3">{member.specialty}</p>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: hoveredMember === i ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.35)" }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location CTA */}
      <div className="px-6 md:px-16 pb-20 max-w-4xl mx-auto text-center">
        <div className="bg-white/5 border border-[#d4a843]/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-3">Visit Us on Ngong Road</h2>
          <p className="text-white/50 mb-2">Open Monday – Saturday · 8:00am – 6:00pm</p>
          <p className="text-white/30 text-sm mb-8">Walk-ins welcome · Appointments preferred</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+254724273996" className="bg-[#d4a843] text-[#070b1a] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">+254 724 273 996</a>
            <a href="https://wa.me/254724273996" target="_blank" rel="noopener noreferrer" className="border border-white/20 px-8 py-4 rounded-full hover:border-[#d4a843] transition-colors">WhatsApp Us</a>
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
