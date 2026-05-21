"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

/* "Pricing" removed — handled by consultation only */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const HEADLINE_LINES: Array<{ words: string[]; accent: boolean }> = [
  { words: ["Modern"], accent: false },
  { words: ["OB/GYN", "&"], accent: false },
  { words: ["Diagnostic"], accent: false },
  { words: ["You", "Can", "Trust."], accent: true },
];

const HERO_IMAGE =
  "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -110]);
  const bgY = useTransform(scrollY, [0, 700], [0, 55]);
  const imgY = useTransform(scrollY, [0, 700], [0, 40]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  /* Magnetic CTA */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  /* GSAP: continuous nav float — animates the inner div, not the FM nav */
  useGSAP(
    () => {
      gsap.to(navInnerRef.current, {
        y: -4,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    },
    { scope: navRef }
  );

  /* GSAP: word-split staggered headline reveal */
  useGSAP(
    () => {
      gsap.from(".gsap-word", {
        y: 40,
        opacity: 0,
        stagger: 0.03,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.3,
        clearProps: "all",
      });
    },
    { scope: headlineRef }
  );

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 bg-navy-gradient"
        style={{ y: bgY, willChange: "transform" }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,212,58,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(244,185,185,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 opacity-[0.04] pointer-events-none select-none" aria-hidden>
          <svg width="700" height="700" viewBox="0 0 48 48" fill="none">
            <path d="M 6 24 C 6 6 42 6 42 24" stroke="#FFD43A" strokeWidth="2" fill="none" />
            <path d="M 6 24 C 6 42 42 42 42 24" stroke="#F4B9B9" strokeWidth="2" fill="none" />
            <path d="M 13 24 C 13 13 35 13 35 24" stroke="#FFD43A" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 13 24 C 13 35 35 35 35 24" stroke="#F4B9B9" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="24" cy="24" r="2.5" fill="#FFD43A" />
          </svg>
        </div>
        <div className="absolute top-[42%] left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,212,58,0.12), transparent)" }} />
      </motion.div>

      {/* ── Navigation ── */}
      <motion.nav
        ref={navRef}
        className="relative z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_LUXURY }}
        style={{
          background: "linear-gradient(to bottom, rgba(18,41,84,0.55) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Inner div for GSAP float */}
        <div
          ref={navInnerRef}
          className="flex items-center justify-between px-6 md:px-14 pt-8 pb-6"
          style={{ willChange: "transform" }}
        >
          <Logo animated size={40} />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="label-mono text-[rgba(248,246,242,0.5)] hover:text-[#FFD43A] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#booking"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,212,58,0.4)] text-[#FFD43A] label-mono hover:bg-[rgba(255,212,58,0.08)] transition-all duration-300"
          >
            Book Now <span className="text-base leading-none">↗</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-[#F8F6F2] rounded-full origin-center"
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-[#F8F6F2] rounded-full"
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-[#F8F6F2] rounded-full origin-center"
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col md:hidden"
            style={{ background: "rgba(8,15,30,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE_LUXURY }}
          >
            {/* Ambient orb */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,212,58,0.07) 0%, transparent 70%)" }} />

            <div className="flex flex-col justify-center flex-1 px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display italic font-semibold text-[#F8F6F2] hover:text-[#FFD43A] transition-colors duration-300 py-3 border-b border-[rgba(255,255,255,0.07)]"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2rem, 8vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: EASE_LUXURY }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile Book Now CTA */}
              <motion.a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#FFD43A] text-[#080f1e] font-body font-semibold text-base"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.28, ease: EASE_LUXURY }}
              >
                Book Appointment →
              </motion.a>

              {/* Contact info */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.38 }}
              >
                <a href="tel:+254724273996" className="label-mono text-[rgba(248,246,242,0.4)] hover:text-[#FFD43A] transition-colors">
                  +254 724 273 996
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero content area ── */}
      <motion.div
        className="relative z-20 px-6 md:px-14 pt-10 md:pt-16 pb-32"
        style={{ y: textY, opacity, willChange: "transform" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">

          {/* ── Left: text ── */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Location label */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_LUXURY }}
            >
              <div className="h-px w-10 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.55)]">
                Ngong Road · Nairobi · Est. 2021
              </span>
            </motion.div>

            {/* GSAP word-split headline */}
            <div ref={headlineRef}>
              {HEADLINE_LINES.map((line, li) => (
                <div key={li} className="overflow-hidden" style={{ marginBottom: "0.04em" }}>
                  <div className="flex flex-wrap gap-x-[0.28em]">
                    {line.words.map((word, wi) => (
                      <span
                        key={wi}
                        className="gsap-word display-hero inline-block"
                        style={{
                          fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                          lineHeight: 0.92,
                          color: line.accent ? "#FFD43A" : "#F8F6F2",
                          ...(line.accent && wi === 0 ? { WebkitTextStroke: "1px rgba(255,212,58,0.3)" } : {}),
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtext */}
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.9 }}
              className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed"
              style={{ fontSize: "1.05rem" }}
            >
              Providing highly accurate ultrasound, compassionate OB/GYN care, and
              specialized diagnostic imaging in a patient-centered sanctuary —
              tailored for women of African descent.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-8"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.05 }}
            >
              <motion.button
                style={{ x: springX, y: springY, willChange: "transform" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Diagnostic Scan
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </motion.button>

              <motion.a
                href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-4 rounded-full border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] font-body text-sm hover:border-[#F4B9B9] hover:bg-[rgba(244,185,185,0.06)] transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
              </motion.a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex flex-wrap gap-x-10 gap-y-4 mt-14 pt-10 border-t border-[rgba(255,255,255,0.07)]"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              {[
                { value: "3D/4D", label: "Obstetric Ultrasound" },
                { value: "99%", label: "Diagnostic Accuracy" },
                { value: "Same-Day", label: "Results Available" },
                { value: "10+", label: "Specialist Services" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-semibold italic text-[#FFD43A]"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", fontFamily: "var(--font-cormorant), serif" }}>
                    {value}
                  </div>
                  <div className="label-mono text-[rgba(248,246,242,0.4)] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: hero image (desktop only) ── */}
          <motion.div
            className="hidden md:block flex-shrink-0"
            style={{ width: "38%", y: imgY, willChange: "transform" }}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE_LUXURY }}
          >
            <div className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 32px 80px rgba(8,15,30,0.7), 0 0 0 1px rgba(255,212,58,0.12)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Expert clinician at Ulnar Medical Diagnostic Centre"
                className="w-full object-cover"
                style={{ height: "clamp(420px, 55vh, 640px)" }}
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,15,30,0.5) 0%, transparent 50%)" }} />
              {/* Bottom badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(8,15,30,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,212,58,0.15)" }}>
                <div className="w-2 h-2 rounded-full bg-[#FFD43A] animate-pulse flex-shrink-0" />
                <span className="label-mono text-[rgba(248,246,242,0.7)]" style={{ fontSize: "0.65rem" }}>
                  Ngong Road, Nairobi · Accepting patients
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="label-mono text-[rgba(248,246,242,0.3)]">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[rgba(255,212,58,0.6)] to-transparent"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
