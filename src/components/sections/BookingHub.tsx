"use client";

import { motion } from "framer-motion";
import { SocialTooltip } from "@/components/ui/social-media";
import { AppointmentScheduler } from "@/components/ui/appointment-scheduler";
import { AnimatedText } from "@/components/ui/animated-text";
import { FluidTextMorph } from "@/components/ui/fluid-text-morph";

/* ── Variant system ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

const slideIn = {
  hidden: { opacity: 0, x: -22 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

const springScale = {
  hidden: { opacity: 0, scale: 0.82, y: 8 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18, delay: 0.35 + i * 0.12 },
  }),
};

/* ── Data ────────────────────────────────────────────────────── */
const TRUST = [
  { stat: "< 2 hrs",   label: "Confirmation via WhatsApp" },
  { stat: "Same-Day", label: "Results for most diagnostics" },
  { stat: "3D / 4D",  label: "High-fidelity obstetric imaging" },
];

const CONTACTS = [
  {
    label: "WhatsApp", value: "+254 724 273 996",
    href: "https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment.",
  },
  {
    // ✅ BRANDING SYNC: Swapped completely to your professional business domain parameters
    label: "Email", value: "admin@ulnarmedical.com",
    href: "mailto:admin@ulnarmedical.com?subject=Appointment%20Inquiry",
  },
  {
    label: "Phone", value: "+254 724 273 996",
    href: "tel:+254724273996",
  },
];

const AVAILABLE_DATES = [
  { date: 14, hasSlots: true }, { date: 15, hasSlots: true },
  { date: 20, hasSlots: true }, { date: 21, hasSlots: true },
  { date: 22, hasSlots: true }, { date: 23, hasSlots: true },
  { date: 27, hasSlots: true }, { date: 28, hasSlots: true },
];

const TIME_SLOTS = [
  { time: "09:00", available: true }, { time: "09:45", available: true },
  { time: "10:30", available: true }, { time: "11:15", available: true },
  { time: "13:30", available: true }, { time: "14:15", available: true },
  { time: "15:00", available: true }, { time: "15:45", available: true },
  { time: "16:30", available: true }, { time: "17:15", available: true },
];

export function BookingHub() {
  return (
    <section
      id="booking"
      className="relative w-full overflow-hidden bg-[#091428] py-24 px-5 sm:px-8"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#122954]/10 to-black/40" />
      <motion.div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#FFD43A]/6 blur-[140px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#F4B9B9]/6 blur-[140px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Fluid morphing display headline */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        >
          <FluidTextMorph
            wordPairs={[
              ["Maternal Sanctuary", "3D / 4D Precision"],
              ["Expert Diagnostics", "Same-Day Results"],
              ["Trusted OB/GYN", "Rapid Triage"],
              ["Obstetric Care", "Modern Medicine"],
            ]}
            animationProps={{
              initialColor: "#F4B9B9",
              animateColor: "#FFD43A",
              exitColor: "#122954",
            }}
            autoCycleMs={3400}
          />
          <p className="mt-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.22em] text-white/20">
            Hover to reveal · Click to cycle
          </p>
        </motion.div>

        {/* Section header */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="max-w-2xl">
            <motion.p variants={fadeUp} className="mb-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#F4B9B9]">
              Real-Time Scheduling Hub
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold italic leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              <img className="hidden" src="" alt="" />
              <AnimatedText text="Your diagnostic journey" delay={0.1} />{" "}
              <AnimatedText text="starts here." style={{ color: "#FFD43A" }} delay={0.32} />
            </motion.h2>
          </div>

          {/* Trust signals */}
          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0 lg:gap-6"
          >
            {TRUST.map(({ stat, label }) => (
              <motion.div
                key={stat}
                variants={slideIn}
                className="flex items-center gap-3 border-l-2 border-[#FFD43A] pl-3"
              >
                <span className="font-mono text-lg font-bold text-[#FFD43A]">{stat}</span>
                <span className="font-sans text-xs text-white/55 leading-tight max-w-[10ch]">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scheduler */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
        >
          <AppointmentScheduler
            userName="Dr. Elizabeth"
            userAvatar="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
            meetingTitle="Diagnostic 3D/4D Scan & Consult"
            meetingType="In-Clinic / 4D Ultrasound Suite"
            duration="45 Minutes"
            timezone="Africa/Nairobi"
            availableDates={AVAILABLE_DATES}
            timeSlots={TIME_SLOTS}
            brandName="Space AI Automated Scheduling"
          />
        </motion.div>

        {/* Contact chips + social */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Direct contact chips */}
          <div className="flex flex-wrap justify-center gap-3">
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

          {/* Divider */}
          <motion.div variants={fadeUp} className="h-px w-full max-w-sm bg-white/8" />

          {/* Privacy */}
          <motion.p variants={fadeUp} className="px-4 text-center font-mono text-[0.6rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/28">
            By submitting, you agree to our{" "}
            <a href="#privacy" className="underline transition-colors hover:text-[#FFD43A]">Privacy Policy</a>.
            {" "}Your data is used solely for appointment management.
          </motion.p>

          {/* Social routing */}
          <div className="w-full border-t border-white/5 pt-6">
            <p className="mb-4 text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#F4B9B9]/70">
              Direct Clinic Routing
            </p>
            <SocialTooltip />
          </div>

          {/* Watermark */}
          <motion.p variants={fadeUp} className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/18">
            Ulnar Medical and Diagnostic Centre · Nairobi, Kenya
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}

export default BookingHub;