"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Activity, Heart, Eye, Sparkles, ShieldAlert, MapPin, Clock, UserCheck, Baby, Users } from "lucide-react";

const HeroScrub = dynamic(
  () => import("@/components/ui/hero-scrub").then((m) => ({ default: m.HeroScrub })),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger, useGSAP);
const EASE_LUXURY = [0.76, 0, 0.24, 1] as const;

interface MenuLinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Submenu Content Matrix Arrays
const diagnosticLinks: MenuLinkItem[] = [
  { title: "Maternal-Fetal Specialist Services", href: "/#services", description: "Pre-conception screening, 2D/3D obstetric tracking, fetal echoes, and anatomical surveys.", icon: Activity },
  { title: "Gynaecological Consultations", href: "/#services", description: "Comprehensive female reproductive reviews and specialist treatment procedures.", icon: Heart },
];

const serviceLinks: MenuLinkItem[] = [
  { title: "Antenatal Care Services", href: "/#services", description: "Structured maternal monitoring and wellness tracking safely mapping out each trimester.", icon: Sparkles },
  { title: "Postnatal Care Services", href: "/#services", description: "Elite recovery tracking, newborn metrics support, and postpartum wellness sequences.", icon: Baby },
  { title: "Radiological Imaging Services", href: "/#services", description: "Reporting of X-rays, HSG, CT, and MRI arrays alongside ultrasound-guided procedures.", icon: ShieldAlert },
];

const aboutLinks: MenuLinkItem[] = [
  { title: "Clinical Sanctuary", href: "/#about", description: "Explore our premium patient care destination engineered on Ngong Road.", icon: Eye },
];

// ✅ UPDATED: Added Dr. Cyprian Michieka alongside Dr. Elizabeth inside the data node array
const specialistLinks: MenuLinkItem[] = [
  { title: "Dr. Elizabeth Odondi", href: "/#about", description: "Consultant Radiologist — Lead Diagnostic Imaging Specialist at Ulnar.", icon: UserCheck },
  { title: "Dr. Cyprian Michieka", href: "/#about", description: "Board-certified OB/GYN Specialist & Fellow in Maternal-Fetal Medicine.", icon: Users },
];

const contactLinks: MenuLinkItem[] = [
  { title: "Nairobi Office Footprint", href: "/#contact", description: "Find our physical branch footprint at premium medical suites on Ngong Road.", icon: MapPin },
  { title: "+254 724 273 996 / +254 724 429 489", href: "/#contact", description: "Direct clinic routing lines. Admin desk email dispatch pipelines.", icon: Clock },
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

  React.useEffect(() => {
    if (mobileMenuOpen) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useGSAP(() => {
    gsap.to(navInnerRef.current, { y: -4, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.4 });
  }, { scope: navRef });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXURY } },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen text-white bg-[#0d1b3e] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none hidden md:block">
        <HeroScrub />
      </div>

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: "linear-gradient(to bottom, rgba(8,15,30,0.8) 0%, rgba(8,15,30,0.4) 100%)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(244, 185, 185, 0.15)" }}
      >
        <div ref={navInnerRef} className="flex items-center justify-between px-6 md:px-14 h-20">
          <Logo animated size={42} />
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-white/70 hover:text-[#FFD43A]">
                  Homepage
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Detailed Diagnostics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[580px] grid-cols-2 gap-3 p-4 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {diagnosticLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {aboutLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {serviceLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ✅ UPDATED: The Dropdown wrapper automatically handles the new multi-specialist grid arrays cleanly */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Our Specialists</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {specialistLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Contact Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                    {contactLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 md:flex">
            <a href="/#booking" className="flex items-center gap-2 px-6 h-11 rounded-full border border-[rgba(255,212,58,0.4)] text-[#FFD43A] label-mono hover:bg-[rgba(255,212,58,0.08)] transition-all duration-300 text-xs tracking-wider">
              Book Now <span className="text-sm leading-none">&#8599;</span>
            </a>
          </div>

          <Button size="icon" variant="outline" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden border-white/10 text-white bg-transparent">
            <MenuToggleIcon open={mobileMenuOpen} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <MobileMenu 
        open={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        serviceLinks={[...diagnosticLinks, ...serviceLinks]} 
        aboutLinks={[...aboutLinks, ...specialistLinks]} 
        contactLinks={contactLinks} 
      />

      <motion.div className="relative z-20 px-6 md:px-14 pt-24 md:pt-40 pb-12 md:pb-32" style={{ y: textY, opacity, willChange: "transform" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          <div className="flex-1 min-w-0 flex flex-col">

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.55)]">Ngong Road · Nairobi · Est. 2021</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">
              Detailed <br /><span className="text-[#FFD43A] italic">Diagnostics</span>
            </h1>

            <p className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed" style={{ fontSize: "1.05rem" }}>
              Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered sanctuary.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <motion.button
                style={{ x: springX, y: springY, willChange: "transform" }}
                onMouseMove={handleMouseMoveCTA} onMouseLeave={handleMouseLeaveCTA}
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm group"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">Book Diagnostic Scan <span>&#8594;</span></span>
              </motion.button>
              <motion.a href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20book%20a%20clinical%20appointment." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-4 rounded-full border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] font-body text-sm hover:border-[#F4B9B9] transition-all group">
                Chat on WhatsApp &#8599;
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-6 md:mt-14 pt-6 md:pt-10 border-t border-[rgba(255,255,255,0.07)]">
              {[{ value: "3D/4D", label: "Obstetric Ultrasound" }, { value: "99%", label: "Diagnostic Accuracy" }, { value: "Same-Day", label: "Results Available" }].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-semibold italic text-[#FFD43A] text-2xl">{value}</div>
                  <div className="label-mono text-[rgba(248,246,242,0.4)] mt-0.5">{label}</div>
                </div>
              ))}
            </div>

          </div>
          <div className="hidden md:block flex-shrink-0" style={{ width: "38%" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div style={{ width: "100%", height: "clamp(420px, 55vh, 640px)", overflow: "hidden" }}>
                <img src="/images/clinic-ultrasound.jpg" alt="Ulnar Medical ultrasound procedure Ngong Road Nairobi" className="w-full h-full object-cover object-center" loading="eager" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#FFD43A] animate-pulse" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">NGONG ROAD · NAIROBI · ACCEPTING PATIENTS</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ListItem({ title, description, icon: Icon, href }: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; href: string }) {
  return (
    <NavigationMenuLink asChild>
      <a href={href} className="flex flex-row gap-3 items-start justify-start p-2.5 rounded-lg hover:bg-white/5 transition-all group select-none text-left">
        <div className="flex aspect-square size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 group-hover:text-[#F4B9B9] group-hover:border-[#F4B9B9]/40 transition-all shadow-sm">
          <Icon className="size-4" />
        </div>
        <div className="flex flex-col items-start justify-center min-w-0">
          <span className="font-medium text-sm text-white/90 group-hover:text-[#F4B9B9] transition-colors">{title}</span>
          <span className="text-white/40 text-xs leading-normal mt-0.5">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}