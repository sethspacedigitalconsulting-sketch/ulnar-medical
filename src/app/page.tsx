'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Activity, Heart, Eye, Sparkles, ShieldAlert, MapPin, Clock, UserCheck, Baby, Users } from 'lucide-react';
import dynamic from 'next/dynamic';
import { HeroSection } from '../components/HeroSection';
import { ContactFooter } from '../components/ContactFooter';
import { FloatingCTA } from '../components/ui/floating-cta';
import { Logo } from '../components/Logo';
import { Button } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuList } from '@/components/ui/navigation-menu';

// Client-safe dynamic bundles
const VerticalImageStack = dynamic(
  () => import('../components/ui/vertical-image-stack').then((m) => ({ default: m.VerticalImageStack })),
  { ssr: false }
);

const InfiniteParallaxSlider = dynamic(
  () => import('../components/ui/argent-loop-infinite-slider').then((m) => ({ default: m.InfiniteParallaxSlider })),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import('../components/AboutSection').then((m) => ({ default: m.AboutSection })),
  { ssr: false }
);

const CircularTestimonials = dynamic(
  () => import('../components/ui/circular-testimonials').then((m) => ({ default: m.CircularTestimonials })),
  { ssr: false }
);

const BookingHub = dynamic(
  () => import('../components/sections/BookingHub').then((m) => ({ default: m.BookingHub })),
  { ssr: false }
);

const MapEmbed = dynamic(
  () => import('../components/MapEmbed').then((m) => ({ default: m.MapEmbed })),
  { ssr: false }
);

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const layoutTimer = setTimeout(() => {
      setIsHydrated(true);
    }, 2000);
    return () => clearTimeout(layoutTimer);
  }, []);

  return (
    <main className="min-h-screen bg-[#080f1e] text-white select-none relative">
      {/* Global Navigation Layer */}
      <GlobalNavbar />
      
      {/* True Homepage Landing Deck: Text morphing slider matches root path priorities instantly */}
      <section id="home" className="w-full h-screen relative">
        <InfiniteParallaxSlider />
      </section>
      
      {/* Detailed Diagnostics Section Container Layout directly under fold */}
      <section id="diagnostics" className="w-full min-h-screen relative">
        <HeroSection />
      </section>
      
      <VerticalImageStack />
      <AboutSection />

      {isHydrated ? (
        <>
          <LocalServiceShowcase />
          <CircularTestimonials />
          <BookingHub />
          <MapEmbed />
          <ContactFooter />
        </>
      ) : (
        <div className="h-[200vh] bg-[#080f1e] w-full" />
      )}

      <FloatingCTA />
    </main>
  );
}

// ── NAV INTEGRATION DIRECTORY ──

interface MenuLinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// ✅ UPDATED ROSTER: Perfectly aligned to match your exact 5-point services taxonomy structure
const dynamicServiceLinks: MenuLinkItem[] = [
  { title: "maternal fetal specialists services", href: "/#services", description: "Expert consultations and high-fidelity diagnostic tracking.", icon: Activity },
  { title: "Antenatal care services", href: "/#services", description: "Structured medical monitoring safely tracking your milestones.", icon: Sparkles },
  { title: "Postnatal care services", href: "/#services", description: "Comprehensive infant checks and maternal recovery support.", icon: Baby },
  { title: "Gynaecological consultations and procedures", href: "/#services", description: "Comprehensive reproductive reviews and targeted medical treatments.", icon: Heart },
  { title: "Radiological imaging services", href: "/#services", description: "High-precision ultrasound, HSG, MCU, and senior specialist reporting.", icon: ShieldAlert }
];

const aboutLinks: MenuLinkItem[] = [
  { title: "Clinical Sanctuary", href: "/#about", description: "Explore our premium patient care destination engineered on Ngong Road.", icon: Eye },
];

const specialistLinks: MenuLinkItem[] = [
  { title: "Dr. Elizabeth Odondi", href: "/#about", description: "Consultant Radiologist — Lead Diagnostic Imaging Specialist at Ulnar.", icon: UserCheck },
  { title: "Dr. Cyprian Michieka", href: "/#about", description: "Board-certified OB/GYN Specialist & Fellow in Maternal-Fetal Medicine.", icon: Users },
];

const contactLinks: MenuLinkItem[] = [
  { title: "Nairobi Office Footprint", href: "/#contact", description: "Find our physical branch footprint at premium medical suites on Ngong Road.", icon: MapPin },
  { title: "+254 724 273 996 / +254 724 429 489", href: "/#contact", description: "Direct clinic routing lines. Admin desk email dispatch pipelines.", icon: Clock },
];

function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: "linear-gradient(to bottom, rgba(8,15,30,0.8) 0%, rgba(8,15,30,0.4) 100%)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(244, 185, 185, 0.15)" }}
    >
      <div className="flex items-center justify-between px-6 md:px-14 h-20">
        <Logo animated size={42} />
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            
            <NavigationMenuItem>
              <NavigationMenuLink href="/#home" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-white/70 hover:text-[#FFD43A]">
                Homepage
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/#diagnostics" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-white/70 hover:text-[#FFD43A]">
                Detailed Diagnostics
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                  {aboutLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ✅ UPDATED DIRECT ROUTING PASS: Clicking "Services" on the taskbar takes you instantly to the webpage section */}
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                onClick={() => window.location.href = '/#services'} 
                className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9] cursor-pointer"
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[480px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl max-h-[400px] overflow-y-auto">
                  {dynamicServiceLinks.map((item) => (<ListItem key={item.title} {...item} />))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

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

      <MobileMenu 
        open={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        serviceLinks={dynamicServiceLinks} 
        aboutLinks={[...aboutLinks, ...specialistLinks]} 
        contactLinks={contactLinks} 
      />
    </nav>
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
          <span className="font-medium text-sm text-white/90 group-hover:text-[#F4B9B9] transition-colors capitalize">{title}</span>
          <span className="text-white/40 text-xs leading-normal mt-0.5">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

// ── SERVICES SCHEMA GRID ──

interface ServiceItem {
  id: number;
  badge: string;
  title: string;
  desc: string;
  image: string;
  bullets?: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    badge: 'MATERNAL-FETAL SPECIALIST CARE',
    title: 'maternal fetal specialists services',
    desc: 'Expert maternal-fetal medicine consultations and high-fidelity tracking delivered with advanced precision.',
    image: '/images/mfss.jpg',
    bullets: [
      'Pre-conception consultation and screening',
      '2D/3D obstetric ultrasounds',
      'Fetal interventions (amniocentesis & amnioreduction)',
      'Fetal anatomical survey and anomaly scans',
      'Fetal echo'
    ]
  },
  {
    id: 2,
    badge: 'OBSTETRIC CARE',
    title: 'Antenatal care services',
    desc: 'Structured medical monitoring pathways and tracking sequences tailored specifically per trimester.',
    image: '/images/awp.jpg',
  },
  {
    id: 3,
    badge: 'POST-NATAL TRIAD',
    title: 'Postnatal care services',
    desc: 'Comprehensive infant milestone metrics checking and maternal recovery tracking arrays.',
    image: '/images/3D4DobUl.jpg',
  },
  {
    id: 4,
    badge: 'GYNAECOLOGY',
    title: 'Gynaecological consultations and procedures',
    desc: 'Comprehensive reproductive checking, pelvic tracking surveys, and medical procedures.',
    image: '/images/GandC.jpg',
  },
  {
    id: 5,
    badge: 'RADIOLOGY & IMAGING',
    title: 'Radiological imaging services',
    desc: 'ultrasound services, HSG, MCU, general radiography, Interventional radiological procedures, CT/MRI reporting.',
    image: '/images/acr.jpg'
  }
];

function LocalServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="services" className="relative bg-[#0d1b3e] py-24 px-4 sm:px-6 md:px-14 border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start text-left mb-16 max-w-2xl">
          <span className="font-mono text-xs text-[#F4B9B9] tracking-widest uppercase mb-3">Clinical Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">Diagnostic Services</h2>
          <p className="font-sans text-xs text-[#FFD43A] tracking-wider uppercase font-medium mt-3 md:hidden animate-pulse">👉 Tap clinical cards to expand info lines</p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-4 min-h-[520px] md:h-[500px] overflow-hidden py-2">
          {services.map((svc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={svc.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#080f1e]/60 border backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none text-left flex flex-col justify-end ${isActive ? 'w-full md:w-[500px] h-[360px] md:h-full border-[#F4B9B9] shadow-2xl shadow-black/80' : 'w-full md:w-[76px] h-[72px] md:h-full border-white/5 hover:border-white/20'}`}
              >
                <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-20 md:opacity-10 md:scale-105'}`}>
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/70 to-transparent pointer-events-none" />
                </div>
                {!isActive && (
                  <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
                    <span className="font-display font-medium text-white/30 text-sm tracking-tight whitespace-nowrap -rotate-90 origin-center uppercase">{svc.title.split(' ')[0]} Care</span>
                  </div>
                )}
                <div className={`relative z-10 p-6 md:p-8 flex flex-col w-full transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4 max-md:hidden'}`}>
                  <div className="mb-3 w-fit"><span className="font-mono text-[9px] text-[#FFD43A] tracking-widest uppercase bg-[#FFD43A]/5 px-2.5 py-1 rounded-md border border-[#FFD43A]/15"> {svc.badge}</span></div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mb-2 capitalize">{svc.title}</h3>
                  <p className="text-white/70 font-body font-light text-xs md:text-sm leading-relaxed max-w-md">{svc.desc}</p>
                  {svc.bullets && (
                    <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-4 max-w-md">
                      {svc.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-white/50 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#F4B9B9] shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {!isActive && (
                  <div className="absolute bottom-4 left-6 font-mono text-[10px] text-white/25 max-md:flex items-center gap-4 w-full px-1">
                    <span className="text-[#FFD43A] font-bold">0{svc.id}</span>
                    <span className="text-white/60 truncate md:hidden text-[11px] font-sans font-medium capitalize">{svc.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}