import { HeroSection } from "@/components/HeroSection";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080f1e] text-white overflow-hidden select-none">
      {/* -- ?? HERO SECTION LAYOUT LAYER -- */}
      <HeroSection />

      {/* -- ?? 3D SPECIALTY VERTICAL CARD MATRIX DECK LAYER -- */}
      <VerticalImageStack />

      {/* Booking section container shell target anchor */}
      <section id="booking" className="relative bg-[#0d1b3e] py-20 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-semibold mb-4">Secure Your Appointment Window</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-8">
            Select an available time slot for your diagnostic scan or OB/GYN evaluation at our Ngong Road Sanctuary.
          </p>
          <div className="inline-block px-8 py-4 rounded-full bg-[#FFD43A] text-[#080f1e] font-body font-semibold tracking-wide text-sm cursor-pointer">
            Launch Appointment Scheduler ?
          </div>
        </div>
      </section>
    </main>
  );
}
