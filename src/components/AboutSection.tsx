"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const SPECIALISTS = [
  {
    name: "Dr. Amina Ochieng",
    specialty: "Obstetric Radiologist",
    bio: "15 years in fetal imaging; pioneer of high-definition 3D/4D diagnostics across East Africa.",
    avatarUrl: "https://ui-avatars.com/api/?name=Amina+Ochieng&background=122954&color=FFD43A&size=128&bold=true&format=svg",
  },
  {
    name: "Dr. Faith Wanjiku",
    specialty: "Consultant Gynaecologist",
    bio: "Specialist in women's reproductive health, maternal-fetal medicine, and pelvic diagnostics.",
    avatarUrl: "https://ui-avatars.com/api/?name=Faith+Wanjiku&background=122954&color=F4B9B9&size=128&bold=true&format=svg",
  },
  {
    name: "Dr. Grace Mutua",
    specialty: "Diagnostic Pathologist",
    bio: "Clinical pathology and hormonal screening expert, delivering precision lab insight same-day.",
    avatarUrl: "https://ui-avatars.com/api/?name=Grace+Mutua&background=122954&color=FFD43A&size=128&bold=true&format=svg",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 md:py-36 px-8 md:px-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f1e 0%, #0d1a30 100%)" }}
    >
      {/* Background ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,212,58,0.04) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,185,185,0.04) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Mission block ── */}
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#FFD43A]" />
            <span className="label-mono text-[rgba(248,246,242,0.45)]">About Us</span>
          </div>

          <h2
            className="font-display italic font-semibold text-[#F8F6F2] mb-8"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <AnimatedText text="A clinic built on precision, trust," />
            {" "}
            <AnimatedText text="and compassion." style={{ color: "#F4B9B9" }} delay={0.22} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <AnimatedText
              text="Founded in 2021 along Ngong Road, Nairobi, Ulnar Medical and Diagnostic Centre was established with one mission: to deliver world-class obstetric and gynaecological diagnostics in an environment where every woman feels genuinely seen and cared for."
              as="p"
              splitBy="word"
              className="font-body text-[rgba(248,246,242,0.55)]"
              delay={0.1}
            />
            <AnimatedText
              text="We specialize in diagnostic services tailored for women of African descent — combining advanced 3D/4D imaging technology with deeply personalized clinical care. Our multidisciplinary team works under one roof, making your diagnostic journey seamless, clear, and warm."
              as="p"
              splitBy="word"
              className="font-body text-[rgba(248,246,242,0.55)]"
              delay={0.15}
            />
          </div>
          <AnimatedText
            text="Every scan, every result, and every conversation we have is guided by a commitment to accuracy, dignity, and trust. Because great diagnostics is not just science — it is care made visible."
            as="p"
            splitBy="word"
            className="mt-5 font-body text-[rgba(248,246,242,0.5)] text-sm leading-relaxed max-w-2xl"
            delay={0.2}
          />
        </motion.div>

        {/* ── Specialist cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXURY }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#F4B9B9]" />
            <span className="label-mono text-[rgba(248,246,242,0.4)]">Our Specialists</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIALISTS.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE_LUXURY }}
                className="rounded-2xl p-7 border border-[rgba(255,255,255,0.07)] group hover:border-[rgba(255,212,58,0.2)] transition-colors duration-400"
                style={{
                  background: "rgba(18,41,84,0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  width={72}
                  height={72}
                  className="rounded-full border-2 border-[rgba(255,212,58,0.2)] mb-5 group-hover:border-[rgba(255,212,58,0.5)] transition-colors duration-300"
                />

                <h3
                  className="font-display italic font-semibold text-[#F8F6F2] mb-1"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  <AnimatedText text={doc.name} splitBy="word" delay={0.3 + i * 0.1} />
                </h3>
                <p className="label-mono text-[#FFD43A] mb-3">
                  <AnimatedText text={doc.specialty} splitBy="word" delay={0.35 + i * 0.1} />
                </p>
                <p className="font-body text-[rgba(248,246,242,0.48)] text-xs leading-relaxed">
                  {doc.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Accreditation badge ── */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4 px-6 py-5 rounded-2xl border border-[rgba(255,212,58,0.15)] bg-[rgba(255,212,58,0.03)]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE_LUXURY }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(255,212,58,0.12)] flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFD43A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="label-mono text-[#FFD43A] mb-0.5">
              Registered &amp; Accredited
            </p>
            <p className="font-body text-[rgba(248,246,242,0.5)] text-sm">
              Kenya Medical Practitioners &amp; Dentists Council (KMPDC) —
              Certified Diagnostic Centre
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
