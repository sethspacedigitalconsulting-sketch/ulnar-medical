"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

interface ShowcaseService {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  /** Accent for number, tag pill, arrow, underline */
  accentColor: string;
  /** Row background token — #122954 (blue) or #F4B9B9 (pink) */
  rowColor: string;
}

/* Blue (#122954 navy) → gold accent | Pink (#F4B9B9 rose) → rose accent
   Sequence: Blue Pink Blue Pink Blue */
const SHOWCASE_SERVICES: ShowcaseService[] = [
  {
    id: "obstetric",
    number: "01",
    name: "3D/4D Obstetric Ultrasound",
    subtitle: "High-fidelity fetal imaging — emotional precision",
    tag: "OB/GYN Scan",
    imageUrl:
      "https://images.pexels.com/photos/5699493/pexels-photo-5699493.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#FFD43A",
    rowColor: "#122954",
  },
  {
    id: "gynaecology",
    number: "02",
    name: "Gynecological Consultations",
    subtitle: "Reproductive care, patient-centered and unhurried",
    tag: "Specialist Care",
    imageUrl:
      "https://images.pexels.com/photos/5699504/pexels-photo-5699504.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#F4B9B9",
    rowColor: "#F4B9B9",
  },
  {
    id: "pelvic",
    number: "03",
    name: "Full Pelvic Diagnostic Scan",
    subtitle: "Precision pelvic mapping for complete certainty",
    tag: "Diagnostic",
    imageUrl:
      "https://images.pexels.com/photos/5327574/pexels-photo-5327574.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#FFD43A",
    rowColor: "#122954",
  },
  {
    id: "antenatal",
    number: "04",
    name: "Antenatal Wellness Packages",
    subtitle: "Elite maternal tracking from first scan to birth",
    tag: "Maternal Track",
    imageUrl:
      "https://images.pexels.com/photos/4226270/pexels-photo-4226270.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#F4B9B9",
    rowColor: "#F4B9B9",
  },
  {
    id: "lab",
    number: "05",
    name: "Diagnostic Lab Screening",
    subtitle: "Rapid precision pathology — same-day results",
    tag: "Lab Triage",
    imageUrl:
      "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600",
    accentColor: "#FFD43A",
    rowColor: "#122954",
  },
];

function rowBg(rowColor: string, active: boolean): string {
  const isBlue = rowColor === "#122954";
  if (isBlue) return active ? "rgba(18,41,84,0.38)" : "rgba(18,41,84,0.16)";
  return active ? "rgba(244,185,185,0.12)" : "rgba(244,185,185,0.05)";
}

export function ServiceShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  /* lerp-tracked cursor state for the floating preview panel (desktop only) */
  const rafId = useRef<number>(0);
  const curr  = useRef({ x: 0, y: 0 });
  const tgt   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const LERP = 0.08;
    const tick = () => {
      curr.current.x += (tgt.current.x - curr.current.x) * LERP;
      curr.current.y += (tgt.current.y - curr.current.y) * LERP;
      if (panelRef.current) {
        panelRef.current.style.transform = `translate(${curr.current.x}px, ${curr.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      tgt.current.x = e.clientX - rect.left + 28;
      tgt.current.y = e.clientY - rect.top - 240;
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);
    return () => {
      el?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const activeService = SHOWCASE_SERVICES.find((s) => s.id === activeId) ?? null;

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative py-36 px-8 md:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #080f1e 100%)" }}
    >
      {/* Section label */}
      <motion.div
        className="flex items-center gap-3 mb-14"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="h-px w-8 bg-[#FFD43A]" />
        <span className="label-mono text-[rgba(248,246,242,0.4)]">Clinical Services</span>
      </motion.div>

      {/* ── Service list — alternating Blue / Pink rows ── */}
      <div className="flex flex-col" role="list">
        {SHOWCASE_SERVICES.map((service, i) => {
          const isActive = activeId === service.id;

          return (
            <motion.div
              key={service.id}
              role="listitem"
              /* Desktop hover */
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActiveId(service.id);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setActiveId(null);
              }}
              /* Touch tap toggles active state */
              onPointerDown={(e) => {
                if (e.pointerType !== "mouse") {
                  setActiveId((prev) => (prev === service.id ? null : service.id));
                }
              }}
              className="relative flex items-center gap-4 sm:gap-6 py-6 sm:py-7 px-3 sm:px-4 border-b border-[rgba(255,255,255,0.06)] border-l-2 cursor-pointer rounded-r-md transition-colors duration-300"
              style={{
                background: rowBg(service.rowColor, isActive),
                borderLeftColor: isActive ? service.accentColor : `${service.accentColor}45`,
              }}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Index number */}
              <span
                className="font-display italic font-bold flex-shrink-0 select-none transition-opacity duration-500"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "2.2rem",
                  color: service.accentColor,
                  width: 52,
                  lineHeight: 1,
                  opacity: isActive ? 0.6 : 0.22,
                }}
              >
                {service.number}
              </span>

              {/* Service name */}
              <h3
                className="font-display italic font-semibold flex-1 min-w-0 transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.25rem, 2.8vw, 2.4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: isActive ? "#FFD43A" : "#F8F6F2",
                }}
              >
                <AnimatedText text={service.name} splitBy="word" delay={i * 0.08} />
              </h3>

              {/* Tag pill — hidden on very small screens, visible on sm+ */}
              <span
                className="label-mono px-3 py-1.5 rounded-full border text-xs flex-shrink-0 transition-all duration-300 hidden sm:inline-flex"
                style={{
                  color: service.accentColor,
                  borderColor: `${service.accentColor}40`,
                  background: `${service.accentColor}10`,
                  opacity: isActive ? 1 : 0,
                }}
              >
                {service.tag}
              </span>

              {/* Arrow */}
              <span
                className="label-mono flex-shrink-0 transition-all duration-300"
                style={{
                  color: service.accentColor,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(4px)" : "translateX(0px)",
                }}
                aria-hidden
              >
                ↗
              </span>

              {/* Animated bottom accent line driven by isActive (works on touch too) */}
              <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: service.accentColor }}
                animate={{ width: isActive ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="flex flex-wrap items-center gap-4 mt-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <a
          href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20book%20a%20diagnostic%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold text-sm hover:bg-[#ffe066] transition-colors duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Book via WhatsApp
        </a>
        <a
          href="mailto:lunamedimaging@gmail.com"
          className="label-mono text-[rgba(248,246,242,0.4)] hover:text-[#FFD43A] transition-colors duration-300 underline underline-offset-4"
        >
          lunamedimaging@gmail.com
        </a>
      </motion.div>

      {/* ── Floating glassmorphic preview panel (desktop mouse only) ── */}
      <div
        ref={panelRef}
        className="absolute top-0 left-0 pointer-events-none z-40 hidden md:block"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 0.86, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                width: 280,
                background: "rgba(18, 41, 84, 0.78)",
                backdropFilter: "blur(36px)",
                WebkitBackdropFilter: "blur(36px)",
                border: `1px solid ${activeService.accentColor}28`,
                boxShadow: `0 28px 72px rgba(8,15,30,0.65), 0 0 0 0.5px ${activeService.accentColor}18`,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: 186 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeService.imageUrl}
                  alt={activeService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-transparent to-transparent" />
                <span
                  className="absolute bottom-2 right-4 font-display italic font-bold opacity-20 select-none"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "4rem",
                    color: activeService.accentColor,
                    lineHeight: 1,
                  }}
                >
                  {activeService.number}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="font-body text-[rgba(248,246,242,0.62)] text-xs leading-relaxed">
                  {activeService.subtitle}
                </p>
                <div
                  className="flex items-center gap-1.5 mt-3 label-mono"
                  style={{ color: activeService.accentColor, fontSize: "0.6rem" }}
                >
                  <span>+254 724 273 996</span>
                  <span>·</span>
                  <span>WhatsApp ↗</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
