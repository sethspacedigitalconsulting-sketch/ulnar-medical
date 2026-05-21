"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const TESTIMONIALS = [
  {
    quote:
      "Seeing my baby in 3D for the first time moved me to tears. The team at Ulnar Medical explained every detail of the scan and made me feel completely at ease throughout.",
    name: "Wanjiru M.",
    service: "3D/4D Obstetric Ultrasound",
    rating: 5,
  },
  {
    quote:
      "I had been searching for a gynaecologist who truly listened. Dr. Faith took her time, explained my results with genuine care, and I left feeling understood — not just processed.",
    name: "Fatuma A.",
    service: "Gynecological Consultation",
    rating: 5,
  },
  {
    quote:
      "Same-day results, a beautifully clean clinic, and a team that treated me with warmth and professionalism. Ulnar Medical is the gold standard for women's diagnostics in Nairobi.",
    name: "Cynthia O.",
    service: "Executive Well-Woman Screen",
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-28 md:py-36 px-8 md:px-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1a30 0%, #080f1e 100%)" }}
    >
      {/* Ambient bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,185,185,0.04) 0%, transparent 65%)" }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#FFD43A]" />
            <span className="label-mono text-[rgba(248,246,242,0.45)]">Patient Stories</span>
            <div className="h-px w-8 bg-[#FFD43A]" />
          </div>
          <h2
            className="font-display italic font-semibold text-[#F8F6F2] text-balance"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            What our patients{" "}
            <span style={{ color: "#FFD43A" }}>are saying.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.12, ease: EASE_LUXURY }}
              className="relative rounded-2xl p-8 overflow-hidden group hover:border-[rgba(255,212,58,0.2)] transition-colors duration-400"
              style={{
                background: "rgba(18,41,84,0.45)",
                border: "1px solid rgba(255,212,58,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-4 right-6 font-display italic font-bold text-[#FFD43A] opacity-[0.08] select-none pointer-events-none"
                style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "6rem", lineHeight: 1 }}
                aria-hidden
              >
                "
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} style={{ color: "#FFD43A", fontSize: "1.1rem" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-display italic text-[#F8F6F2] leading-relaxed mb-7"
                style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.12rem", lineHeight: 1.55 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #F4B9B9 0%, #FFD43A 100%)",
                    color: "#080f1e",
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-body font-semibold text-[#F8F6F2] text-sm">{t.name}</p>
                  <p className="label-mono text-[#F4B9B9]" style={{ fontSize: "0.6rem" }}>
                    {t.service}
                  </p>
                </div>
              </div>

              {/* Bottom gold accent line — reveals on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
                style={{ background: "linear-gradient(to right, #FFD43A, #F4B9B9)" }}
                initial={{ width: "0%" }}
                whileHover={{ width: "100%", transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
