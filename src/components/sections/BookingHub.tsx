"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SocialTooltip } from "@/components/ui/social-media";

export function BookingHub() {
  useEffect(() => {
    const scriptId = "visme-forms-embed-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section
      id="booking"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden bg-[#091428]"
    >
      {/* Background aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#122954]/10 to-black/40 pointer-events-none" />
      <div className="absolute -top-40 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#122954]/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md mx-auto z-10 flex flex-col"
      >
        {/* Visme form card */}
        <div className="visme-card w-full bg-[#0a1628]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-black/60">
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

        {/* Legal disclaimer */}
        <div className="mt-6 text-center px-4">
          <p className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.18em] text-gray-400/80 leading-relaxed uppercase">
            By submitting, you agree to our{" "}
            <a href="#privacy" className="underline hover:text-[#FFD43A] transition-colors">
              Privacy Policy
            </a>
            . Your data is used solely for appointment management.
          </p>
        </div>

        {/* Social links */}
        <div className="mt-8 border-t border-white/5 pt-6 w-full">
          <p className="text-center font-mono text-[9px] font-bold tracking-[0.2em] text-[#F4B9B9] uppercase mb-4">
            Direct Clinic Routing Links
          </p>
          <SocialTooltip />
        </div>
      </motion.div>
    </section>
  );
}

export default BookingHub;
