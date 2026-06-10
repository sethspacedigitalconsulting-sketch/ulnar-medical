"use client";

import React from "react";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export function ContactFooter() {
  return (
    <footer id="contact" className="relative bg-[#080f1e] text-white/60 text-sm border-t border-white/5 py-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-white text-lg tracking-tight">Ulnar Medical</h4>
          <p className="text-xs font-light leading-relaxed max-w-xs text-white/40">
            Certified Diagnostic Centre delivering precision women's healthcare, 3D/4D ultrasound imaging, and same-day laboratory triage parameters.
          </p>
        </div>

        {/* Col 2: Contact Matrix */}
        <div className="space-y-3 text-left">
          <h5 className="font-mono text-[10px] text-[#FFD43A] tracking-widest uppercase font-bold">Direct Routing</h5>
          <div className="flex items-center gap-2.5 text-xs text-white/80">
            <Phone className="w-3.5 h-3.5 text-[#F4B9B9]" />
            <a href="tel:+254724273996" className="hover:text-[#FFD43A] transition-colors">+254 724 273 996</a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/80">
            <Phone className="w-3.5 h-3.5 text-[#F4B9B9]" />
            <a href="tel:+254724429489" className="hover:text-[#FFD43A] transition-colors">+254 724 429 489</a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/80 pt-1">
            <Mail className="w-3.5 h-3.5 text-[#F4B9B9]" />
            <a href="mailto:admin@ulnarmedical.com" className="hover:text-[#FFD43A] transition-colors">admin@ulnarmedical.com</a>
          </div>
        </div>

        {/* Col 3: Location Channels */}
        <div className="space-y-3 text-left">
          <h5 className="font-mono text-[10px] text-[#FFD43A] tracking-widest uppercase font-bold">Physical Coordinates</h5>
          <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-[#F4B9B9] shrink-0 mt-0.5" />
            <span>Ngong Road Medical Suites,<br />Nairobi, Kenya</span>
          </div>
        </div>

        {/* Col 4: Accreditation */}
        <div className="space-y-3 text-left">
          <h5 className="font-mono text-[10px] text-[#FFD43A] tracking-widest uppercase font-bold">Accreditation</h5>
          <div className="flex items-center gap-2.5 text-xs text-white/40">
            <Shield className="w-3.5 h-3.5 text-[#FFD43A]" />
            <span>KMPDC Certified Facility</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-wider uppercase text-white/20 gap-4">
        <span>© 2026 Ulnar Medical and Diagnostic Centre. All Rights Reserved.</span>
        <span>Space AI Automated Systems</span>
      </div>
    </footer>
  );
}

// ✅ CRITICAL FIX: Export default fallback alias to validate sub-page module imports seamlessly
export default ContactFooter;