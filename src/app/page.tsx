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
      {/* ✅ INSTANT GLOBAL NAVBAR: Rendered smoothly over your landing layers */}
      <GlobalNavbar />
      
      {/* ✅ TRUE HOMEPAGE LANDING DECK: Assigned id="home" to load the text-morph sliders instantly */}
      <section id="home" className="w-full h-screen relative">
        <InfiniteParallaxSlider />
      </section>
      
      {/* ✅ SECOND VIEW: Detailed Diagnostics layout handles content presentation just below the fold */}
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

// ── INTERNAL MODULES MATRIX ──

interface MenuLinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

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

  React.useEffect(() => {
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

            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-[#F4B9B9] data-[state=open]:text-[#F4B9B9]">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] grid-cols-1 gap-2 p-3 bg-[#080f1e]/95 border border-[#F4B9B9]/30 rounded-xl shadow-2xl backdrop-blur-xl">
                  {serviceLinks.map((item) => (<ListItem key={item.title} {...item} />))}
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
        serviceLinks={[...diagnosticLinks, ...serviceLinks]} 
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
          <span className="font-medium text-sm text-white/90 group-hover:text-[#F4B9B9] transition-colors">{title}</span>
          <span className="text-white/40 text-xs leading-normal mt-0.5">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

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
    title: 'Maternal-Fetal Specialist Services',
    desc: 'Expert maternal-fetal medicine consultations and high-fidelity tracking delivered with advanced precision.',