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
    <div className="fixed inset-0 top-20 bottom-0 left-0 right-0 z-50 flex flex-col bg-[#080f1e]/98 backdrop-blur-xl border-t border-[#F4B9B9]/20 px-6 py-8 md:hidden overflow-y-auto">
      <div className="flex flex-col gap-y-6 w-full">
        
        <div className="flex flex-col gap-y-3">
          <span className="text-xs font-mono text-[#F4B9B9] tracking-widest uppercase">Clinic Services</span>
          {serviceLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-white/80 hover:text-[#F4B9B9] transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-y-3">
          <span className="text-xs font-mono text-[#F4B9B9] tracking-widest uppercase">About Us</span>
          {aboutLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-white/80 hover:text-[#F4B9B9] transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-y-3">
          <span className="text-xs font-mono text-[#F4B9B9] tracking-widest uppercase">Contact Channels</span>
          {contactLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-white/80 hover:text-[#F4B9B9] transition-colors"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <Button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); 
            }} 
            className="w-full h-12"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
