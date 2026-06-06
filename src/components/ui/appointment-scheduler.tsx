"use client";

import { useEffect } from "react";
import { MessageSquare } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/lunamedimaging/30min";

function CalendlyEmbed() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="calendly"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const s = document.querySelector('script[src*="calendly"]');
      if (s) document.body.removeChild(s);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-white/10"
      data-url={`${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&primary_color=FFD43A&text_color=F8F6F2&background_color=0a1628`}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

export function AppointmentScheduler({
  userName,
  meetingTitle,
  meetingType,
  duration,
  timezone,
  brandName = "Calendly",
}: {
  userName?: string;
  userAvatar?: string;
  meetingTitle?: string;
  meetingType?: string;
  duration?: string;
  timezone?: string;
  availableDates?: { date: number; hasSlots: boolean }[];
  timeSlots?: { time: string; available: boolean }[];
  onDateSelect?: (date: number) => void;
  onTimeSelect?: (time: string) => void;
  onTimezoneChange?: (timezone: string) => void;
  brandName?: string;
}) {
  return (
    <div className="flex w-full max-w-4xl mx-auto flex-col">

      {/* Dr. Elizabeth info card */}
      <div className="flex items-center gap-4 px-5 py-4 mb-4 rounded-2xl border border-white/10 bg-[#0a1628]/90 backdrop-blur-md">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F4B9B9] flex-shrink-0">
          <img
            src="/images/DrElizabeth.jpg"
            alt="Dr. Elizabeth"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm font-bold text-white leading-tight">
            {userName || "Dr. Elizabeth"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#F4B9B9]">
            Ulnar Lead Specialist
          </p>
          {meetingTitle && (
            <p className="font-sans text-xs text-white/50 mt-0.5 truncate">{meetingTitle}</p>
          )}
        </div>
        <div className="hidden sm:flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
          {duration && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{duration}</p>
          )}
          {meetingType && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{meetingType}</p>
          )}
          {timezone && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">{timezone} (EAT)</p>
          )}
        </div>
      </div>

      {/* Calendly inline embed */}
      <CalendlyEmbed />

      {/* WhatsApp fallback */}
      <div className="mt-4 text-center">
        <a
          href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20diagnostic%20scan%20or%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-[#F4B9B9] transition-colors duration-300 hover:text-[#FFD43A]"
        >
          <MessageSquare className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span>Can't find a quick slot? Chat with our specialist directly on WhatsApp</span>
        </a>
      </div>

      <div className="mt-4 text-right">
        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500">
          Powered by {brandName}
        </p>
      </div>
    </div>
  );
}

export default AppointmentScheduler;