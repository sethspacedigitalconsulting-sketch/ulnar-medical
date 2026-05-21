"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="px-8 md:px-14 py-16"
      style={{ background: "#0d1a30" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#FFD43A]" />
            <span className="label-mono text-[rgba(248,246,242,0.4)]">
              Find Us — Ngong Road, Nairobi
            </span>
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)]"
            style={{ height: 360 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819!2d36.7468!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNgong+Road+Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ulnar Medical — Ngong Road, Nairobi"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
