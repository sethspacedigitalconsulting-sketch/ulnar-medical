import { HeroSection } from "@/components/HeroSection";
import { RadialScrollGallery } from "@/components/ui/radial-scroll-gallery";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceShowcase } from "@/components/ui/service-showcase";
import { InfiniteParallaxSlider } from "@/components/ui/argent-loop-infinite-slider";
import { AboutSection } from "@/components/AboutSection";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { BookingHub } from "@/components/sections/BookingHub";
import { MapEmbed } from "@/components/MapEmbed";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingCTA } from "@/components/ui/floating-cta";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <RadialScrollGallery />
      <ServiceGrid />
      <ServiceShowcase />
      <InfiniteParallaxSlider />
      <AboutSection />
      <CircularTestimonials />
      <MapEmbed />
      <BookingHub />
      <ContactFooter />
      <FloatingCTA />
    </main>
  );
}
