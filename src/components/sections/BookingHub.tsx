"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SocialTooltip } from "@/components/ui/social-media";

/* ── Variant system ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const springScale = {
  hidden: { opacity: 0, scale: 0.82, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      delay: 0.45 + i * 0.12,
    },
  }),
};

/* ── Trust signals ───────────────────────────────────────────── */
const TRUST = [
  { stat: "< 2 hrs",   label: "Confirmation via WhatsApp" },
  { stat: "Same-Day",  label: "Results for most diagnostics" },
  { stat: "3D / 4D",   label: "High-fidelity obstetric imaging" },
];

/* ── Contact shortcuts ───────────────────────────────────────── */
const CONTACTS = [
  {
    label: "WhatsApp",
    value: "+254 724 273 996",
    href: "https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment.",
  },
  {
    label: "Email",
    value: "appointments@ulnarmedical.com",
    href: "mailto:appointments@ulnarmedical.com?subject=Appointment%20Inquiry",
  },
  {
    label: "Phone",
    value: "+254 724 273 996",
    href: "tel:+254724273996",
  },
];

export function BookingHub() {
  /* Inject Visme embed script once on mount */
  useEffect(() => {
    const scriptId = "visme-forms-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section
      id="booking"
      className="relative w-full overflow-hidden bg-[#091428] py-24 px-5 sm:px-8"
    >
      {/* ── Ambient background ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#122954]/10 to-black/40" />

      {/* Gold orb — top right */}
      <motion.div
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-[#FFD43A]/6 blur-[140px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rose orb — bottom left */}
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-[#F4B9B9]/6 blur-[140px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Content grid ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">

        {/* ════════════════ LEFT PANEL ════════════════ */}
        <motion.div
          className="flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="mb-6 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#F4B9B9]"
          >
            — Book an Appointment —
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="mb-5 font-serif text-[clamp(2.6rem,5vw,4rem)] font-bold italic leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Your diagnostic
            <br />
            journey{" "}
            <em className="not-italic text-[#FFD43A]">starts here.</em>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-[42ch] font-sans text-base leading-relaxed text-white/55"
          >
            Specialist care in Nairobi — from first scan to results, we guide
            every step with clinical precision and genuine warmth.
          </motion.p>

          {/* Trust signals */}
          <motion.div className="mb-10 space-y-4" variants={containerVariants}>
            {TRUST.map(({ stat, label }) => (
              <motion.div
                key={stat}
                variants={slideIn}
                className="flex items-center gap-5 border-l-2 border-[#FFD43A] pl-5"
              >
                <span
                  className="min-w-[80px] font-mono text-xl font-bold text-[#FFD43A]"
                >
                  {stat}
                </span>
                <span className="font-sans text-sm text-white/60">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="mb-8 h-px w-full bg-white/8"
          />

          {/* Contact chips */}
          <div className="mb-10 flex flex-wrap gap-3">
            {CONTACTS.map(({ label, value, href }, i) => (
              <motion.a
                key={label}
                custom={i}
                variants={springScale}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-[#FFD43A]/30 bg-[#FFD43A]/5 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD43A]/70 hover:bg-[#FFD43A]/10"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-[#F4B9B9] shadow-[0_0_6px_#F4B9B9]" />
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-white">
                  {label}
                </span>
                <span className="hidden font-mono text-[0.65rem] text-white/35 transition-colors group-hover:text-white/60 sm:inline">
                  {value}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Watermark */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/18"
          >
            Ulnar Medical and Diagnostic Centre · Nairobi, Kenya
          </motion.p>
        </motion.div>

        {/* ════════════════ RIGHT PANEL ════════════════ */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        >
          {/* Glass form card */}
          <div className="visme-card relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a1628]/75 p-6 shadow-2xl shadow-black/60 backdrop-blur-md md:p-8">
            {/* Subtle inner glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(18,41,84,0.4)]" />

            {/* Corner accent — top right */}
            <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 rounded-full bg-[#FFD43A]/8 blur-2xl" />

            {/* Visme form anchor */}
            <div
              className="visme_d"
              data-title="Booking Contact Form"
              data-url="4k97gx1z-booking-contact-form?fullPage=true"
              data-domain="forms"
              data-full-page="true"
              data-min-height="620px"
              data-form-id="181532"
              style={{ width: "100%", minHeight: "620px" }}
            />
          </div>

          {/* Privacy disclaimer */}
          <p className="mt-5 px-2 text-center font-mono text-[0.6rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/28">
            By submitting, you agree to our{" "}
            <a
              href="#privacy"
              className="underline transition-colors hover:text-[#FFD43A]"
            >
              Privacy Policy
            </a>
            . Your data is used solely for appointment management.
          </p>

          {/* Social routing */}
          <div className="mt-7 border-t border-white/5 pt-6">
            <p className="mb-4 text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#F4B9B9]/70">
              Direct Clinic Routing
            </p>
            <SocialTooltip />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default BookingHub;
