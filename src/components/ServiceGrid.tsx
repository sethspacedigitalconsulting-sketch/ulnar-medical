"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

interface Service {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  tag: string;
  accentColor: string;
  imageUrl: string;
  features: string[];
}

/* ── All original service data preserved ── */
const SERVICES: Service[] = [
  {
    id: "obstetric-ultrasound",
    index: "01",
    label: "3D/4D Obstetric Ultrasound",
    title: "High-Fidelity Fetal Imaging",
    description:
      "Highly accurate fetal developmental scanning giving expectant mothers absolute certainty and peace of mind. Every scan is a conversation between precision and compassion.",
    tag: "OB/GYN Scan",
    accentColor: "#FFD43A",
    imageUrl:
      "https://images.pexels.com/photos/5699493/pexels-photo-5699493.jpeg?auto=compress&cs=tinysrgb&w=700",
    features: ["3D/4D imaging", "Fetal growth tracking", "Same-day report"],
  },
  {
    id: "obgyn-consultation",
    index: "02",
    label: "Gynecological Consultations",
    title: "Comprehensive Reproductive Care",
    description:
      "Patient-centered reproductive health mapping in a friendly, unhurried, and deeply trusting clinical environment designed with your comfort in mind.",
    tag: "Specialist Care",
    accentColor: "#F4B9B9",
    imageUrl:
      "https://images.pexels.com/photos/5699504/pexels-photo-5699504.jpeg?auto=compress&cs=tinysrgb&w=700",
    features: ["Hormonal profiling", "Pelvic assessments", "Private consultation"],
  },
  {
    id: "diagnostic-lab",
    index: "03",
    label: "Diagnostic Lab Screening",
    title: "Rapid Precision Pathology",
    description:
      "Advanced clinical pathology markers and precision screening metrics ensuring rapid, trusted lab results delivered with clarity and clinical authority.",
    tag: "Lab Triage",
    accentColor: "#FFD43A",
    imageUrl:
      "https://images.pexels.com/photos/5327574/pexels-photo-5327574.jpeg?auto=compress&cs=tinysrgb&w=700",
    features: ["Full blood panel", "Hormonal markers", "Digital results portal"],
  },
  {
    id: "antenatal-wellness",
    index: "04",
    label: "Antenatal Wellness Packages",
    title: "Elite Maternal Tracking",
    description:
      "Structured screening profiles designed to monitor and safeguard maternal health throughout pregnancy — a complete journey of reassurance from first scan to birth.",
    tag: "Maternal Wellness",
    accentColor: "#F4B9B9",
    imageUrl:
      "https://images.pexels.com/photos/4226270/pexels-photo-4226270.jpeg?auto=compress&cs=tinysrgb&w=700",
    features: ["Priority scheduling", "HD video loops", "Dedicated midwife"],
  },
];

/* Progress dots */
function ProgressDots({ count }: { count: number }) {
  return (
    <div className="flex gap-2 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-0.5 rounded-full bg-[rgba(255,255,255,0.15)]"
          style={{ width: i === 0 ? 28 : 10 }}
        />
      ))}
    </div>
  );
}

export function ServiceGrid() {
  /* Outer section ref: drives CSS sticky + GSAP scroll tracking */
  const sectionRef = useRef<HTMLElement>(null);
  /* The sticky inner viewport */
  const stickyRef = useRef<HTMLDivElement>(null);
  /* Individual card refs for GSAP depth peeling */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const headerInView = useInView(sectionRef, { once: true, margin: "-120px" });

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(
        (c): c is HTMLDivElement => c !== null
      );
      if (!cards.length || !sectionRef.current) return;

      /* ── Initial state: cards 1-3 start behind card 0 ── */
      gsap.set(cards.slice(1), {
        z: -110,
        scale: 0.93,
        opacity: 0.42,
        rotateX: 5,
      });

      /* ── Build depth-peel timeline ──
         Each step: active card peels away (z -280, scale 0.83, opacity 0.12)
         while next card rises forward (z 0, scale 1, opacity 1). */
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      for (let i = 0; i < SERVICES.length - 1; i++) {
        tl.to(
          cards[i],
          { z: -280, scale: 0.83, opacity: 0.12, rotateX: 9, duration: 1 },
          i
        ).to(
          cards[i + 1],
          { z: 0, scale: 1, opacity: 1, rotateX: 0, duration: 1 },
          i + 0.08 /* slight cascade offset for physical feel */
        );
      }

      /* ── Link timeline to scroll via scrub:1 ──
         The outer section is (SERVICES.length × 100vh) tall.
         ScrollTrigger maps its full scroll distance → timeline progress. */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        animation: tl,
      });
    },
    { scope: sectionRef }
  );

  return (
    /*
     * Section is SERVICES.length × 100vh tall so we get plenty of
     * scroll runway for card transitions. CSS `sticky` keeps the
     * inner viewport pinned without GSAP's pin (avoids layout shift).
     */
    <section
      ref={sectionRef}
      id="services"
      style={{
        minHeight: `${SERVICES.length * 100}vh`,
        background: "linear-gradient(180deg, #080f1e 0%, #0d1a30 100%)",
      }}
    >
      {/* ── Sticky viewport ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{ perspective: "1400px", perspectiveOrigin: "60% 50%" }}
      >
        {/* Inner layout: header left, card stack right */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-14 gap-10">

          {/* ── Left: Section header (always visible) ── */}
          <motion.div
            className="flex-shrink-0 max-w-sm w-full md:w-auto"
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.45)]">
                Our Diagnostic Specialties
              </span>
            </div>

            <h2
              className="font-display italic font-semibold text-[#F8F6F2]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              <AnimatedText text="Precision diagnostics," />{" "}
              <AnimatedText text="deeply personal" style={{ color: "#F4B9B9" }} delay={0.18} />
              {" "}
              <AnimatedText text="care." delay={0.32} />
            </h2>

            <ProgressDots count={SERVICES.length} />

            <AnimatedText
              text="Every service at Ulnar Medical is designed to deliver clinical accuracy without sacrificing warmth."
              as="p"
              splitBy="word"
              className="font-body text-[rgba(248,246,242,0.45)] text-sm leading-relaxed mt-5 max-w-[240px]"
              delay={0.3}
            />

            {/* View all link */}
            <a
              href="#booking"
              className="inline-flex items-center gap-2 mt-8 text-sm font-body text-[rgba(248,246,242,0.5)] hover:text-[#FFD43A] transition-colors duration-300 group"
            >
              View all packages &amp; pricing
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </motion.div>

          {/* ── Right: Card stack — responsive width for mobile ── */}
          <div
            className="relative flex-shrink-0 w-[86vw] md:w-[46vw] max-w-[500px] h-[clamp(340px,68vh,580px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "absolute inset-0 rounded-3xl overflow-hidden",
                  "cursor-default select-none"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.imageUrl}
                  alt={service.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[rgba(8,15,30,0.45)] to-transparent" />
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `linear-gradient(to top, ${service.accentColor}15, transparent 55%)`,
                  }}
                />

                {/* Card content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="label-mono px-3 py-1.5 rounded-full border text-xs"
                      style={{
                        color: service.accentColor,
                        borderColor: `${service.accentColor}45`,
                        background: `${service.accentColor}10`,
                      }}
                    >
                      {service.tag}
                    </span>
                    <span
                      className="font-display italic font-bold opacity-25"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        color: service.accentColor,
                        fontSize: "2.6rem",
                        lineHeight: 1,
                      }}
                    >
                      {service.index}
                    </span>
                  </div>

                  <span className="label-mono text-[rgba(248,246,242,0.4)] block mb-2">
                    {service.label}
                  </span>

                  <h3
                    className="font-display italic font-semibold text-[#F8F6F2] mb-3"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="font-body text-[rgba(248,246,242,0.52)] text-sm leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.features.map((feat) => (
                      <span
                        key={feat}
                        className="label-mono px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.07)] text-[rgba(248,246,242,0.55)]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Book CTA */}
                  <a
                    href="#booking"
                    className="flex items-center gap-2 mt-5 text-sm font-body group/cta"
                    style={{ color: service.accentColor }}
                  >
                    Book this service
                    <span className="group-hover/cta:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>

                {/* Gold border outline */}
                <div
                  className="absolute inset-0 rounded-3xl border pointer-events-none opacity-20"
                  style={{ borderColor: service.accentColor }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ambient orbs in the sticky view */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,212,58,0.05) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,185,185,0.05) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
