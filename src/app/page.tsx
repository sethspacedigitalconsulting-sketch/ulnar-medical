import { HeroSection } from "@/components/HeroSection";
import { RadialScrollGallery } from "@/components/ui/radial-scroll-gallery";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceShowcase } from "@/components/ui/service-showcase";
import { AboutSection } from "@/components/AboutSection";
import { Testimonials } from "@/components/Testimonials";
import { BookingHub } from "@/components/sections/BookingHub";
import { MapEmbed } from "@/components/MapEmbed";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero — parallax scroll, GSAP word-split, magnetic CTA, right-side image */}
      <HeroSection />

      {/* Radial specialty wheel — GSAP orbital rotation scrub:1.5 */}
      <RadialScrollGallery />

      {/* Service card stack — CSS sticky + GSAP depth-peel timeline */}
      <ServiceGrid />

      {/* Interactive service list — lerp-0.08 glassmorphic hover panel */}
      <ServiceShowcase />

      {/* About — mission, specialist cards, accreditation badge */}
      <AboutSection />

      {/* Patient testimonials */}
      <Testimonials />

      {/* Visme booking hub — embedded form + social routing */}
      <BookingHub />

      {/* Google Maps embed */}
      <MapEmbed />

      {/* Footer — social SVG icons, nav columns, giant wordmark */}
      <ContactFooter />

      {/* Floating Book Now button — hides when #booking is visible */}
      <FloatingCTA />
    </main>
  );
}
