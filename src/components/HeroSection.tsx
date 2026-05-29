"use client";

import React, { useRef, useState } from "react";
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
import { MobileMenu } from "@/components/ui/mobile-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuList,
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

  React.useEffect(() => {
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
      
      {/* â”€â”€ ðŸ¥ BACKGROUND LAYER â”€â”€ */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <HeroScrub />
      </div>

      {/* â”€â”€ Dropdown Navigation System â”€â”€ */}
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
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Action CTA Integration */}
          <div className="hidden items-center gap-4 md:flex">
            <a 
              href="#booking" 
              className="flex items-center gap-2 px-6 h-11 rounded-full border border-[rgba(255,212,58,0.4)] text-[#FFD43A] label-mono hover:bg-[rgba(255,212,58,0.08)] transition-all duration-300 text-xs tracking-wider"
            >
              Book Now <span className="text-sm leading-none">â†—</span>
            </a>
          </div>

          {/* Mobile Controller Handle */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-white/10 text-white bg-transparent"
          >
            <MenuToggleIcon open={mobileMenuOpen} className="size-5" duration={300} />
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Injection */}
      <MobileMenu 
        open={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        serviceLinks={serviceLinks}
        aboutLinks={aboutLinks}
        contactLinks={contactLinks}
      />

      {/* â”€â”€ Hero Presentation Content Shell â”€â”€ */}
      <motion.div
        className="relative z-20 px-6 md:px-14 pt-36 md:pt-40 pb-32"
        style={{ y: textY, opacity, willChange: "transform" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">

          <div className="flex-1 min-w-0 flex flex-col">
            <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE_LUXURY }}>
              <div className="h-px w-10 bg-[#FFD43A]" />
              <span className="label-mono text-[rgba(248,246,242,0.55)]">Ngong Road Â· Nairobi Â· Est. 2021</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">
              Modern OB/GYN <br />
              <span className="text-[#FFD43A] italic">Diagnostics</span>
            </h1>

            <AnimatedText
              text="Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered sanctuary â€” tailored for women of African descent."
              as="p" splitBy="word" className="mt-8 max-w-xl font-body font-light text-[rgba(248,246,242,0.6)] leading-relaxed" style={{ fontSize: "1.05rem" }} delay={0.9}
            />

            <motion.div className="flex flex-wrap items-center gap-4 mt-8" variants={fadeUpVariants} initial="hidden" animate="visible" transition={{ delay: 1.05 }}>
              <motion.button
                style={{ x: springX, y: springY, willChange: "transform" }} onMouseMove={handleMouseMoveCTA} onMouseLeave={handleMouseLeaveCTA}
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm group"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">Book Diagnostic Scan <span>â†’</span></span>
              </motion.button>

              <motion.a href="https://wa.me/254724273996?text=Hello" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-4 rounded-full border border-[rgba(244,185,185,0.3)] text-[#F4B9B9] font-body text-sm hover:border-[#F4B9B9] transition-all group">
                Chat on WhatsApp â†—
              </motion.a>
            </motion.div>

            <motion.div className="flex flex-wrap gap-x-10 gap-y-4 mt-14 pt-10 border-t border-[rgba(255,255,255,0.07)]" variants={fadeUpVariants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
              {[{ value: "3D/4D", label: "Obstetric Ultrasound" }, { value: "99%", label: "Diagnostic Accuracy" }, { value: "Same-Day", label: "Results Available" }].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-semibold italic text-[#FFD43A] text-2xl">{value}</div>
                  <div className="label-mono text-[rgba(248,246,242,0.4)] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="hidden md:block flex-shrink-0" style={{ width: "38%" }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              
              {/* â”€â”€ ðŸš€ SINGLE CLINIC ULTRASOUND IMAGE COMPONENT â”€â”€ */}
              <div style={{ width: "100%", height: "clamp(420px, 55vh, 640px)", overflow: "hidden" }}>
                <img
                  src="/images/clinic-ultrasound.jpg"
                  alt="Ulnar Medical â€” ultrasound procedure in progress"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#FFD43A] animate-pulse" />
                <span className="text-[10px] font-mono text-white/70 tracking-wider">NGONG ROAD, NAIROBI Â· ACCEPTING PATIENTS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

function ListItem({ title, description, icon: Icon, href }: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; href: string }) {
  return (
    <NavigationMenuLink asChild>
      <a 
        href={href} 
        className="flex flex-row gap-3 items-start justify-start p-2.5 rounded-lg hover:bg-white/5 transition-all group select-none text-left"
      >
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