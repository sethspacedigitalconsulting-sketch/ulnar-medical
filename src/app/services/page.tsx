"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactFooter from "@/components/ContactFooter";

const services = [
  {
    title: "Obstetric 3D/4D Ultrasound",
    description: "Advanced 3D and 4D ultrasound imaging providing detailed views of your baby at every stage of pregnancy.",
    tag: "IMAGING",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop",
  },
  {
    title: "Gynecological Consultations",
    description: "Comprehensive gynecological care including pelvic ultrasound, fibroid mapping, and endometrial assessments.",
    tag: "CONSULTATION",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop",
  },
  {
    title: "Diagnostic Lab Screening",
    description: "Full-spectrum laboratory diagnostics — blood panels, hormonal assays, infection screening, antenatal profiles.",
    tag: "LABORATORY",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop",
  },
  {
    title: "Antenatal Wellness Packages",
    description: "Structured antenatal care combining routine scans, blood work, and specialist consultations into one journey.",
    tag: "WELLNESS",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&auto=format&fit=crop",
  },
  {
    title: "Fetal Anomaly Screening",
    description: "Detailed mid-pregnancy anomaly scans (18–22 weeks) performed by maternal-fetal medicine specialists.",
    tag: "SCREENING",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&auto=format&fit=crop",
  },
  {
    title: "Doppler Flow Studies",
    description: "Specialized Doppler ultrasound evaluating blood flow in umbilical and uterine vessels for high-risk pregnancies.",
    tag: "DOPPLER",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.12),
        y: lerp(prev.y, mousePos.y, 0.12),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

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
        <Link href="/#book" className="bg-[#d4a843] text-[#070b1a] text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors">Book Now</Link>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-16 pt-20 pb-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">Our Services</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Diagnostic <br /><span className="text-[#d4a843] italic">Excellence</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl">Hover each service to explore. Every procedure is delivered with precision and compassion.</p>
      </div>

      {/* Service List with hover image trail */}
      <div
        ref={containerRef}
        className="relative px-6 md:px-16 pb-20 max-w-5xl mx-auto"
        onMouseMove={handleMouseMove}
      >
        {/* Floating image preview */}
        <div
          className="pointer-events-none absolute z-50 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: 300,
            height: 190,
            transform: `translate3d(${smoothPos.x + 24}px, ${smoothPos.y - 120}px, 0)`,
            opacity: visible ? 1 : 0,
            scale: visible ? "1" : "0.85",
            transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), scale 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {services.map((s, i) => (
            <img
              key={s.title}
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{
                opacity: hoveredIndex === i ? 1 : 0,
                filter: hoveredIndex === i ? "none" : "blur(8px)",
                transform: `scale(${hoveredIndex === i ? 1 : 1.08})`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a]/60 to-transparent" />
        </div>

        {/* Rows */}
        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="relative border-b border-white/10 py-7 cursor-default group"
              onMouseEnter={() => { setHoveredIndex(i); setVisible(true); }}
              onMouseLeave={() => { setHoveredIndex(null); setVisible(false); }}
            >
              <div
                className="absolute inset-0 -mx-2 rounded-xl bg-white/4 transition-all duration-300"
                style={{ opacity: hoveredIndex === i ? 1 : 0 }}
              />
              <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <span className="text-[10px] tracking-[0.2em] text-[#d4a843] font-mono w-24 shrink-0">{s.tag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-xl font-bold relative">
                        {s.title}
                        <span
                          className="absolute left-0 -bottom-0.5 h-px bg-[#d4a843] transition-all duration-300"
                          style={{ width: hoveredIndex === i ? "100%" : "0%" }}
                        />
                      </h3>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#d4a843] transition-all duration-300"
                        style={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? "translate(0,0)" : "translate(-6px,6px)",
                        }}
                      />
                    </div>
                    <p
                      className="text-sm mt-1 transition-colors duration-300"
                      style={{ color: hoveredIndex === i ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/20 shrink-0">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 border border-[#d4a843]/30 rounded-3xl px-12 py-10">
            <h2 className="text-2xl font-bold mb-3">Ready to Book?</h2>
            <p className="text-white/50 mb-6 text-sm">Monday – Saturday · 8am – 6pm · Ngong Road, Nairobi</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#book" className="bg-[#d4a843] text-[#070b1a] font-bold px-8 py-3 rounded-full hover:bg-white transition-colors text-sm">Book Appointment</Link>
              <a href="tel:+254724273996" className="border border-white/20 px-8 py-3 rounded-full hover:border-[#d4a843] transition-colors text-sm">+254 724 273 996</a>
            </div>
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
