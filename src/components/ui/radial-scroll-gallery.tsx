"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatedText } from "@/components/ui/animated-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WheelItem {
  id: string;
  title: string;
  sub: string;
  color: string;
}

const WHEEL_ITEMS: WheelItem[] = [
  { id: "01", title: "Obstetric",  sub: "3D/4D Ultrasound",    color: "#FFD43A" },
  { id: "02", title: "Gynaecology", sub: "Specialist Consult", color: "#F4B9B9" },
  { id: "03", title: "Diagnostics", sub: "Precision Pathology", color: "#FFD43A" },
  { id: "04", title: "Antenatal",  sub: "Maternal Wellness",   color: "#F4B9B9" },
  { id: "05", title: "Pelvic Scan", sub: "Full Mapping",       color: "#FFD43A" },
  { id: "06", title: "Lab Triage", sub: "Same-Day Results",    color: "#F4B9B9" },
  { id: "07", title: "Wellness",   sub: "Patient Packages",    color: "#FFD43A" },
  { id: "08", title: "Priority",   sub: "Emergency Triage",    color: "#F4B9B9" },
];

const ITEM_COUNT = WHEEL_ITEMS.length;

export function RadialScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef   = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  /* Responsive orbit radius — shrinks on narrow viewports */
  const [radius, setRadius] = useState(280);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(w < 480 ? 120 : w < 768 ? 180 : 280);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(
    () => {
      /* Wheel rotation driven by scroll */
      gsap.to(orbitRef.current, {
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* Counter-rotate each card so text stays upright */
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          rotation: -180,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      /* Dot pulse as each card passes through 12 o'clock */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const enterAt = i / ITEM_COUNT;
        const peakAt  = enterAt + 0.5 / ITEM_COUNT;

        gsap.fromTo(
          card.querySelector(".wheel-dot"),
          { scale: 1 },
          {
            scale: 1.9,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${enterAt * 100}% bottom`,
              end: `${peakAt * 100}% 60%`,
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [radius] }
  );

  const outerSize = radius * 2 + 160;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col items-center py-28"
      style={{ background: "linear-gradient(180deg, #080f1e 0%, #091220 100%)" }}
    >
      {/* Ambient gold orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(255,212,58,0.04) 0%, transparent 68%)",
        }}
        aria-hidden
      />

      {/* Section header */}
      <motion.div
        className="text-center mb-16 relative z-10 px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#FFD43A]" />
          <span className="label-mono text-[rgba(248,246,242,0.4)]">Specialties</span>
          <div className="h-px w-8 bg-[#FFD43A]" />
        </div>
        <h2
          className="font-display italic font-semibold text-[#F8F6F2]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <AnimatedText text="Every specialty," />{" "}
          <AnimatedText text="one destination." style={{ color: "#F4B9B9" }} delay={0.18} />
        </h2>
      </motion.div>

      {/* ── Orbital wheel — scales responsively via radius state ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: outerSize, height: outerSize }}
      >
        {/* Orbit rings */}
        {[radius * 2, radius * 2 - 50].map((d, ri) => (
          <div
            key={ri}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: d, height: d,
              border: `1px solid rgba(255,212,58,${ri === 0 ? 0.07 : 0.03})`,
            }}
            aria-hidden
          />
        ))}

        {/* Center emblem */}
        <div className="absolute z-10 flex flex-col items-center justify-center gap-1" style={{ width: 80, height: 80 }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <path d="M 6 24 C 6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 6 24 C 6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle cx="24" cy="24" r="2.8" fill="#FFD43A" />
          </svg>
          <span className="label-mono text-center text-[rgba(248,246,242,0.25)]" style={{ fontSize: 8, letterSpacing: "0.22em" }}>
            ULNAR
          </span>
        </div>

        {/* Rotating orbit container */}
        <div
          ref={orbitRef}
          className="absolute"
          style={{ width: radius * 2, height: radius * 2, willChange: "transform" }}
        >
          {WHEEL_ITEMS.map((item, i) => {
            const angleDeg = (i / ITEM_COUNT) * 360 - 90;
            const angleRad = angleDeg * (Math.PI / 180);
            const x = radius + Math.cos(angleRad) * radius;
            const y = radius + Math.sin(angleRad) * radius;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
              >
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="flex flex-col items-center gap-1"
                  style={{ width: 88, willChange: "transform" }}
                >
                  <div className="wheel-dot w-2.5 h-2.5 rounded-full mb-1" style={{ background: item.color }} />
                  <div
                    className="font-display italic font-semibold text-center text-[#F8F6F2]"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="label-mono text-center"
                    style={{ color: item.color, fontSize: "0.58rem", opacity: 0.65 }}
                  >
                    {item.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom contact CTA */}
      <motion.p
        className="mt-10 label-mono text-center text-[rgba(248,246,242,0.35)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <a
          href="https://wa.me/254724273996"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#FFD43A] transition-colors duration-300"
        >
          +254 724 273 996 · Book via WhatsApp ↗
        </a>
      </motion.p>
    </section>
  );
}
