"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
import { AnimatedText } from "@/components/ui/animated-text";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Activity,
  Heart,
  Eye,
  Sparkles,
  ShieldAlert,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

interface MenuLinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 🩺 Categorized Feature Tree Mapping for Ulnar Medical
const serviceLinks: MenuLinkItem[] = [
  { title: "Obstetric Ultrasound", href: "#services", description: "Advanced high-fidelity 3D/4D obstetric imaging tracking fetus health cycles.", icon: Activity },
  { title: "Gynecological Scans", href: "#services", description: "Deep anatomical screenings diagnosing structural health and cysts accurately.", icon: Heart },
  { title: "Fertility Evaluation", href: "#services", description: "Comprehensive follicle diagnostic tracking and pelvic blood flow mapping.", icon: Sparkles },
  { title: "Early Screening", href: "#services", description: "First-trimester structural anomaly checking and anomaly risk assessment.", icon: ShieldAlert },
];

const aboutLinks: MenuLinkItem[] = [
  { title: "Clinical Sanctuary", href: "#about", description: "Explore our premium patient care destination engineered for ultimate relaxation.", icon: Eye },
  { title: "Expert Clinicians", href: "#about", description: "Meet our board-certified radiologists specializing in complex diagnostic execution.", icon: FileText },
];

const contactLinks: MenuLinkItem[] = [
  { title: "Ngong Road Office", href: "#contact", description: "Find our physical branch footprint at premium medical suites in Nairobi.", icon: MapPin },
  { title: "Operating Metrics", href: "#contact", description: "Mon - Sat: 8:00 AM - 6:00 PM. Same-day diagnostics generation window.", icon: Clock },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });

  const handleMouseMoveCTA = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeaveCTA = () => { mx.set(0); my.set(0); };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useGSAP(
    () => {
      gsap.to(navInnerRef.current, {
        y: -4,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    },
    { scope: navRef }
  );

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen text-white bg-[#0d1b3e] overflow-hidden">
      
      {/* ── 🏥 BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <HeroScrub />
      </div>

      {/* ── Dropdown Navigation System ── */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_LUXURY }}
        style={{
          background: "linear-gradient(to bottom, rgba(8,15,30,0.8) 0%, rgba(8,15,30,0.4) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(244, 185, 185, 0.15)",
        }}
      >
        <div ref={navInnerRef} className="flex items-center justify-between px-6 md:px-14 h-20">
          <Logo animated size={42} />
          
          {/* Desktop Matrix Submenu Drops */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[580px] grid-cols-2 gap-3 p-4 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {serviceLinks.map((item) => (
                      <ListItem key={item.title} {...item} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {aboutLinks.map((item) => (
                      <ListItem key={item.title} {...item} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Contact</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {contactLinks.map((item) => (
                      <ListItem key={item.title} {...item} />
                    ))}
                  </div>
                </NavigationMenuContent>