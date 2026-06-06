"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactFooter from "@/components/ContactFooter";

const sections = [
  { num: "01", title: "Our Commitment to Your Privacy", body: "Ulnar Medical & Diagnostic Centre is committed to protecting the privacy and confidentiality of all patient information. This charter outlines how we collect, use, store, and protect your personal and medical data in compliance with applicable Kenyan data protection laws and international healthcare privacy standards." },
  { num: "02", title: "Information We Collect", body: "We collect personal identification details (name, date of birth, contact information), medical history and treatment records, diagnostic imaging data and laboratory results, insurance and billing information, and appointment and consultation records." },
  { num: "03", title: "How We Use Your Information", body: "Your information is used solely to provide you with accurate medical care, coordinate treatments, process billing, and communicate appointment reminders. We do not sell, rent, or share your personal data with third parties for commercial purposes." },
  { num: "04", title: "Data Security", body: "All patient records are stored securely using encrypted digital systems with restricted access. Only authorised clinical and administrative staff may access your records on a need-to-know basis. Physical records are kept in secure, locked facilities." },
  { num: "05", title: "Your Rights", body: "You have the right to access your own medical records upon written request, request corrections to inaccurate information, withdraw consent for non-essential data processing, and request deletion of non-clinical data where legally permissible." },
  { num: "06", title: "Contact Us", body: "For any privacy concerns or data requests, please contact us at lunamedimaging@gmail.com or call +254 724 273 996. We aim to respond to all privacy-related inquiries within 5 business days." },
];

export default function PrivacyPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      {/* Header */}
      <div className="bg-[#070b1a] border-b border-white/10 px-6 md:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#d4a843] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#d4a843" />
              <circle cx="12" cy="12" r="9" stroke="#d4a843" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold leading-tight">Ulnar <span className="text-[#d4a843] italic">Medical</span></div>
            <div className="text-[9px] tracking-[0.2em] text-white/50 uppercase">Diagnostic Centre</div>
          </div>
        </Link>
        <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors">← Back to Home</Link>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-16 pt-20 pb-16 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">Legal</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Patient Privacy<br /><span className="text-[#d4a843] italic">Charter</span>
        </h1>
        <p className="text-white/40 text-sm">Last updated: January 2025</p>
      </div>

      {/* Sections — hover row animation */}
      <div className="px-6 md:px-16 pb-20 max-w-3xl mx-auto">
        <div className="border-t border-white/10">
          {sections.map((s, i) => (
            <div
              key={s.num}
              className="relative border-b border-white/10 py-8 cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 -mx-2 rounded-xl transition-all duration-300"
                style={{ background: hoveredIndex === i ? "rgba(212,168,67,0.05)" : "transparent", borderLeft: hoveredIndex === i ? "2px solid rgba(212,168,67,0.4)" : "2px solid transparent" }}
              />
              <div className="relative flex gap-6">
                <span
                  className="text-2xl font-bold font-mono transition-colors duration-300 shrink-0 w-10"
                  style={{ color: hoveredIndex === i ? "#d4a843" : "rgba(255,255,255,0.15)" }}
                >
                  {s.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg font-bold relative">
                      {s.title}
                      <span
                        className="absolute left-0 -bottom-0.5 h-px bg-[#d4a843] transition-all duration-300"
                        style={{ width: hoveredIndex === i ? "100%" : "0%" }}
                      />
                    </h2>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#d4a843] transition-all duration-300 shrink-0"
                      style={{ opacity: hoveredIndex === i ? 1 : 0, transform: hoveredIndex === i ? "translate(0,0)" : "translate(-4px,4px)" }}
                    />
                  </div>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: hoveredIndex === i ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.40)" }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 border border-[#d4a843]/30 rounded-3xl p-10">
            <h2 className="text-xl font-bold mb-3">Questions about your data?</h2>
            <p className="text-white/50 mb-6 text-sm">We are happy to help with any privacy or data requests.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:lunamedimaging@gmail.com" className="bg-[#d4a843] text-[#070b1a] font-bold px-8 py-3 rounded-full hover:bg-white transition-colors text-sm">Email Us</a>
              <a href="tel:+254724273996" className="border border-white/20 px-8 py-3 rounded-full hover:border-[#d4a843] transition-colors text-sm">+254 724 273 996</a>
            </div>
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
