"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface MenuLinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileMenuProps {
  open: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  serviceLinks: MenuLinkItem[];
  aboutLinks: MenuLinkItem[];
  contactLinks: MenuLinkItem[];
}

export function MobileMenu({ open, setMobileMenuOpen, serviceLinks, aboutLinks, contactLinks }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true); 
    return () => setMounted(false); 
  }, []);

  if (!open || !mounted || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 top-20 bottom-0 left-0 right-0 z-50 flex flex-col bg-[#080f1e]/98 backdrop-blur-xl border-t border-[#F4B9B9]/20 px-6 py-6 md:hidden overflow-y-auto">
      <div className="flex flex-col gap-y-6 w-full max-w-md mx-auto">
        
        {/* -- Clinic Services Parity Section -- */}
        <div className="flex flex-col gap-y-2.5">
          <span className="text-[10px] font-mono text-[#F4B9B9] tracking-widest uppercase opacity-60 px-1">Clinic Services</span>
          <div className="flex flex-col gap-y-1.5">
            {serviceLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.title} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex flex-row gap-3 items-start justify-start p-2.5 rounded-lg border border-white/5 bg-white/[0.02] active:bg-[#F4B9B9]/10 transition-all text-left"
                >
                  <div className="flex aspect-square size-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#F4B9B9]">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-white/90">{link.title}</span>
                    <span className="text-white/40 text-xs leading-normal mt-0.5">{link.description}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* -- About Parity Section -- */}
        <div className="flex flex-col gap-y-2.5">
          <span className="text-[10px] font-mono text-[#F4B9B9] tracking-widest uppercase opacity-60 px-1">About Us</span>
          <div className="flex flex-col gap-y-1.5">
            {aboutLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.title} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex flex-row gap-3 items-start justify-start p-2.5 rounded-lg border border-white/5 bg-white/[0.02] active:bg-[#F4B9B9]/10 transition-all text-left"
                >
                  <div className="flex aspect-square size-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#F4B9B9]">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-white/90">{link.title}</span>
                    <span className="text-white/40 text-xs leading-normal mt-0.5">{link.description}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* -- Contact Parity Section -- */}
        <div className="flex flex-col gap-y-2.5">
          <span className="text-[10px] font-mono text-[#F4B9B9] tracking-widest uppercase opacity-60 px-1">Contact Channels</span>
          <div className="flex flex-col gap-y-1.5">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.title} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="flex flex-row gap-3 items-start justify-start p-2.5 rounded-lg border border-white/5 bg-white/[0.02] active:bg-[#F4B9B9]/10 transition-all text-left"
                >
                  <div className="flex aspect-square size-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#F4B9B9]">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-white/90">{link.title}</span>
                    <span className="text-white/40 text-xs leading-normal mt-0.5">{link.description}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* -- Dynamic Action Slot -- */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <Button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); 
            }} 
            className="w-full h-12 text-sm tracking-wider font-semibold"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
