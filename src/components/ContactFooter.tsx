"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Logo } from "./Logo";
import { AnimatedText } from "@/components/ui/animated-text";

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const FOOTER_COLS = [
  {
    title: "Diagnostic Specialties",
    links: [
      { label: "Obstetric 3D/4D Ultrasound", href: "#services" },
      { label: "Gynecological Consultations", href: "#services" },
      { label: "Diagnostic Lab Screening", href: "#services" },
      { label: "Antenatal Wellness Packages", href: "#services" },
    ],
  },
  {
    title: "Patient Support",
    links: [
      { label: "Book Appointment", href: "#booking" },
      { label: "Wellness Packages & Pricing", href: "#booking" },
      { label: "Patient Success Stories", href: "#testimonials" },
      { label: "Medical Triage Enquiries", href: "#booking" },
    ],
  },
  {
    title: "Clinic Directory",
    links: [
      { label: "Our Ngong Road Centre", href: "#" },
      { label: "Meet the Specialists", href: "#" },
      { label: "Referring Practitioners", href: "#" },
      { label: "Clinical Partnerships", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Patient Privacy Charter", href: "#" },
      { label: "Diagnostic Testing Protocols", href: "#" },
      { label: "Terms of Clinical Service", href: "#" },
      { label: "Emergency Support", href: "tel:+254724273996" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment.",
    color: "#25D366",
    live: true,
  },
  {
    label: "Email",
    href: "mailto:lunamedimaging@gmail.com?subject=Appointment%20Inquiry",
    color: "#EA4335",
    live: true,
  },
  {
    label: "Facebook",
    href: "#",
    color: "#1877F2",
    live: false,
  },
  {
    label: "Instagram",
    href: "#",
    color: "#E4405F",
    live: false,
  },
  {
    label: "TikTok",
    href: "#",
    color: "#ffffff",
    live: false,
  },
];

/* SVG icon paths per platform */
function SocialSVG({ label }: { label: string }) {
  switch (label) {
    case "WhatsApp":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "Email":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "TikTok":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
        </svg>
      );
    default:
      return null;
  }
}

function SocialIcon({
  item,
  index,
}: {
  item: (typeof SOCIAL_LINKS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      target={item.live ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={item.live ? item.label : `${item.label} (coming soon)`}
      onClick={(e) => !item.live && e.preventDefault()}
      className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border border-[rgba(255,255,255,0.1)] cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.04)",
        opacity: item.live ? 1 : 0.45,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: item.live ? 1 : 0.45, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 260, damping: 18 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.1, opacity: 1, borderColor: `${item.color}60` }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Liquid fill from bottom */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: item.color, transformOrigin: "bottom" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* SVG icon */}
      <span
        className="relative z-10 flex items-center justify-center transition-colors duration-200"
        style={{ color: hovered ? "#fff" : "rgba(248,246,242,0.55)" }}
      >
        <SocialSVG label={item.label} />
      </span>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-white whitespace-nowrap pointer-events-none"
        style={{ background: item.live ? item.color : "rgba(255,255,255,0.15)" }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.18 }}
      >
        {item.live ? item.label : "Coming Soon"}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderTop: `4px solid ${item.live ? item.color : "rgba(255,255,255,0.15)"}`,
          }}
        />
      </motion.div>
    </motion.a>
  );
}

export function ContactFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const colVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#122954" }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,212,58,0.05) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,185,185,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(248,246,242,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 py-20 md:py-28">

        {/* Top — Logo + contact block */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-10 pb-16 border-b border-[rgba(255,255,255,0.08)]"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
        >
          <Logo size={48} />
          <div className="flex flex-col md:items-end gap-2">
            <span className="label-mono text-[rgba(248,246,242,0.4)]">Direct Clinic Line</span>
            <a
              href="tel:+254724273996"
              className="font-display italic font-semibold text-[#FFD43A] hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
            >
              +254 724 273 996
            </a>
            <a
              href="mailto:lunamedimaging@gmail.com"
              className="font-body text-[rgba(248,246,242,0.45)] text-sm hover:text-[#F4B9B9] transition-colors duration-300"
            >
              lunamedimaging@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Nav columns */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-14 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FOOTER_COLS.map((col) => (
            <motion.div key={col.title} variants={colVariants}>
              <h4 className="label-mono text-[#F4B9B9] mb-5">
                <AnimatedText text={col.title} splitBy="word" delay={0.2} />
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="font-body text-[rgba(248,246,242,0.45)] text-sm hover:text-[#FFD43A] transition-colors duration-300 inline-block relative group"
                      whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    >
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 h-px bg-[#FFD43A] w-0 group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-[rgba(255,255,255,0.07)]">

          {/* Giant wordmark */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease: EASE_LUXURY }}
          >
            <div
              className="font-display italic font-bold select-none leading-[0.85]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, rgba(248,246,242,0.9) 0%, rgba(248,246,242,0.3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                cursor: "default",
              }}
            >
              <AnimatedText text="Ulnar" splitBy="char" delay={0.5} />{" "}
              <AnimatedText text="Medical" splitBy="char" delay={0.68} />
            </div>
            <p
              className="font-mono uppercase select-none mt-2"
              style={{
                fontSize: "clamp(0.5rem, 0.9vw, 0.72rem)",
                letterSpacing: "0.26em",
                color: "rgba(248,246,242,0.22)",
              }}
            >
              Diagnostic Centre
            </p>
            <p className="font-body text-[rgba(248,246,242,0.35)] text-xs mt-3 tracking-wide">
              ©2026 Ulnar Medical and Diagnostic Centre. All rights reserved.<br />
              Ngong Road, Nairobi, Kenya.
            </p>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex flex-col items-start md:items-end gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.6, ease: EASE_LUXURY }}
          >
            <span className="label-mono text-[rgba(248,246,242,0.3)]">Patient Digital Gateways</span>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((item, i) => (
                <SocialIcon key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
