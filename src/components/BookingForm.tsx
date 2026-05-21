"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogoEmblem } from "./Logo";

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

const SERVICES = [
  "3D/4D Obstetric Ultrasound",
  "Gynecological Consultation",
  "Full Pelvic Diagnostic Scan",
  "Comprehensive Antenatal Profile",
  "Executive Well-Woman Screen",
  "Diagnostic Lab Screening",
  "Other / General Inquiry",
];

const SLOTS = [
  "Morning (8:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 4:00 PM)",
  "Evening (4:00 PM – 6:00 PM)",
  "Flexible / First Available",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  slot: z.string().min(1, "Please select a preferred time"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function FloatingInput({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder = " ",
}: {
  id: keyof FormData;
  label: string;
  type?: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="floating-label-group">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={error ? "!border-red-400/60" : ""}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="block mt-1.5 text-xs text-red-400/80 font-mono pl-1"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  options,
  register,
  error,
}: {
  id: keyof FormData;
  label: string;
  options: string[];
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
}) {
  return (
    <div className="floating-label-group">
      <select id={id} {...register(id)} defaultValue="">
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#122954", color: "#F8F6F2" }}>
            {opt}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="block mt-1.5 text-xs text-red-400/80 font-mono pl-1"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_LUXURY }}
    >
      {/* Animated checkmark bloom */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
      >
        <motion.div
          className="absolute inset-[-20px] rounded-full border border-[#FFD43A]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.6, 1.4, 1.8] }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-[-8px] rounded-full border border-[rgba(255,212,58,0.3)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
        <div className="w-20 h-20 rounded-full bg-[#FFD43A] flex items-center justify-center shadow-[0_0_40px_rgba(255,212,58,0.4)]">
          <motion.svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M6 16L13 23L26 10"
              stroke="#080f1e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </motion.svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE_LUXURY }}
        className="flex flex-col items-center"
      >
        <LogoEmblem size={28} className="mx-auto mb-5 opacity-60" />

        <h3
          className="font-display italic font-semibold text-[#F8F6F2] mb-3"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
          }}
        >
          Appointment Request Received!
        </h3>

        <p className="font-body text-[rgba(248,246,242,0.55)] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Our triage team will confirm your appointment within 2 hours. Check
          your email or WhatsApp for confirmation.
        </p>

        <a
          href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[rgba(244,185,185,0.12)] border border-[rgba(244,185,185,0.25)] text-[#F4B9B9] text-sm font-body hover:bg-[rgba(244,185,185,0.2)] transition-all duration-300 mb-4"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat us on WhatsApp
        </a>

        <button
          onClick={onReset}
          className="label-mono text-[rgba(248,246,242,0.35)] hover:text-[#FFD43A] transition-colors duration-300 underline underline-offset-4"
        >
          Book Another Appointment
        </button>
      </motion.div>
    </motion.div>
  );
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Appointment data →", data);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    reset();
  };

  return (
    <section
      id="booking"
      className="relative py-28 md:py-36 px-6 md:px-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1a30 0%, #122954 60%, #0d1a30 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-120px] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,185,185,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-[-80px] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,212,58,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: EASE_LUXURY }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.45)]">Book an Appointment</span>
            </div>
            <h2
              className="font-display italic font-semibold text-[#F8F6F2] mb-6 text-balance"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                lineHeight: 1.08,
              }}
            >
              Your diagnostic journey{" "}
              <span style={{ color: "#FFD43A" }}>starts here.</span>
            </h2>
            <p className="font-body text-[rgba(248,246,242,0.55)] leading-relaxed mb-10 text-sm max-w-sm">
              Fill in the form and our triage team will confirm your appointment
              within 2 hours. Same-day scans often available.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "🛡", text: "100% confidential — patient data never shared" },
                { icon: "⚡", text: "Confirmation within 2 hours of submission" },
                { icon: "📋", text: "Results delivered same-day for most scans" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  <span className="font-body text-[rgba(248,246,242,0.5)] text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl border border-[rgba(244,185,185,0.15)] bg-[rgba(244,185,185,0.05)]">
              <p className="label-mono text-[#F4B9B9] mb-2">Prefer to chat?</p>
              <a
                href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical,%20I%20would%20like%20to%20inquire%20about%20a%20diagnostic%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-[rgba(248,246,242,0.6)] hover:text-[#F4B9B9] transition-colors duration-300 flex items-center gap-2 group"
              >
                WhatsApp us at +254 724 273 996
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, delay: 0.12, ease: EASE_LUXURY }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "rgba(8, 15, 30, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(24px)",
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 md:p-10 flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <FloatingInput
                      id="name"
                      label="Full Name"
                      register={register}
                      error={errors.name?.message}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FloatingInput
                        id="email"
                        label="Email Address"
                        type="email"
                        register={register}
                        error={errors.email?.message}
                      />
                      <FloatingInput
                        id="phone"
                        label="Phone / WhatsApp"
                        type="tel"
                        register={register}
                        error={errors.phone?.message}
                      />
                    </div>

                    <FloatingSelect
                      id="service"
                      label="Diagnostic Service"
                      options={SERVICES}
                      register={register}
                      error={errors.service?.message}
                    />

                    {/* Date picker */}
                    <FloatingInput
                      id="date"
                      label="Preferred Date"
                      type="date"
                      register={register}
                      error={errors.date?.message}
                    />

                    <FloatingSelect
                      id="slot"
                      label="Preferred Appointment Slot"
                      options={SLOTS}
                      register={register}
                      error={errors.slot?.message}
                    />

                    <div className="floating-label-group">
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder=" "
                        {...register("notes")}
                      />
                      <label htmlFor="notes">Additional Notes (optional)</label>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="relative mt-2 w-full py-4 rounded-2xl font-body font-semibold text-sm overflow-hidden"
                      style={{ background: "#FFD43A", color: "#080f1e" }}
                      whileHover={{ scale: submitting ? 1 : 1.01 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                    >
                      <AnimatePresence mode="wait">
                        {submitting ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              className="inline-block w-4 h-4 border-2 border-[#080f1e] border-t-transparent rounded-full"
                            />
                            Sending to clinic...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            Request Appointment →
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <p className="text-center label-mono text-[rgba(248,246,242,0.25)] text-[10px] leading-relaxed">
                      By submitting, you agree to our privacy policy. Your data
                      is used solely for appointment management.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
