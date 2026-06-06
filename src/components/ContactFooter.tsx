"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  "DIAGNOSTIC SPECIALTIES": [
    { label: "Obstetric 3D/4D Ultrasound", href: "/services" },
    { label: "Gynecological Consultations", href: "/services" },
    { label: "Diagnostic Lab Screening", href: "/services" },
    { label: "Antenatal Wellness Packages", href: "/services" },
  ],
  "PATIENT SUPPORT": [
    { label: "Book Appointment", href: "/#book" },
    { label: "Wellness Packages & Pricing", href: "/services" },
    { label: "Patient Success Stories", href: "/#testimonials" },
    { label: "Medical Triage Enquiries", href: "/#contact" },
  ],
  "CLINIC DIRECTORY": [
    { label: "Our Ngong Road Centre", href: "/about" },
    { label: "Meet the Specialists", href: "/about" },
    { label: "Referring Practitioners", href: "/about" },
    { label: "Clinical Partnerships", href: "/about" },
  ],
  LEGAL: [
    { label: "Patient Privacy Charter", href: "/privacy" },
    { label: "Diagnostic Testing Protocols", href: "/terms" },
    { label: "Terms of Clinical Service", href: "/terms" },
    { label: "Emergency Support", href: "/#contact" },
  ],
};

export default function ContactFooter() {
  return (
    <footer className="bg-[#070b1a] text-white pt-20 pb-10 px-6 md:px-16">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 border-b border-white/10 pb-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#d4a843] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#d4a843" />
              <circle cx="12" cy="12" r="9" stroke="#d4a843" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-bold leading-tight">
              Ulnar <span className="text-[#d4a843] italic">Medical</span>
            </div>
            <div className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
              Diagnostic Centre
            </div>
          </div>
        </motion.div>

        {/* Phone Numbers + Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-right"
        >
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
            DIRECT CLINIC LINE
          </p>
          <a
            href="tel:+254724273996"
            className="block text-[#d4a843] text-2xl font-bold hover:text-white transition-colors"
          >
            +254 724 273 996
          </a>
          <a
            href="tel:+254724429489"
            className="block text-[#d4a843] text-2xl font-bold hover:text-white transition-colors mt-1"
          >
            +254 724 429 489
          </a>
          <a
            href="mailto:lunamedimaging@gmail.com"
            className="block text-white/50 text-sm mt-2 hover:text-white transition-colors"
          >
            lunamedimaging@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mt-12">
        {Object.entries(footerLinks).map(([category, links], colIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.5, delay: colIdx * 0.08 }}
          >
            <h4 className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
              {category}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#d4a843] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30"
      >
        <p>© {new Date().getFullYear()} Ulnar Medical & Diagnostic Centre. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
        </div>
      </motion.div>
    </footer>
  );
}
