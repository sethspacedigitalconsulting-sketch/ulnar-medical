import Link from "next/link";
import Image from "next/image";
import ContactFooter from "@/components/ContactFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      {/* Header */}
      <div className="bg-[#070b1a] border-b border-white/10 px-6 md:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#d4a843] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="#d4a843" />
              <circle cx="12" cy="12" r="9" stroke="#d4a843" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold leading-tight">
              Ulnar <span className="text-[#d4a843] italic">Medical</span>
            </div>
            <div className="text-[9px] tracking-[0.2em] text-white/50 uppercase">Diagnostic Centre</div>
          </div>
        </Link>
        <Link
          href="/#book"
          className="bg-[#d4a843] text-[#070b1a] text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors"
        >
          Book Now
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-16 pt-20 pb-12 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">About Us</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Nairobi&apos;s Trusted <br />
          <span className="text-[#d4a843] italic">Diagnostic Centre</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Founded in 2021 on Ngong Road, Ulnar Medical & Diagnostic Centre was built on a single
          promise — every patient deserves precise diagnostics, delivered with warmth.
        </p>
      </div>

      {/* Doctor Section */}
      <div className="px-6 md:px-16 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-3xl p-10">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/DrElizabeth.jpg"
              alt="Dr. Elizabeth — Lead Specialist"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-3">Lead Specialist</p>
            <h2 className="text-3xl font-bold mb-4">Dr. Elizabeth</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Dr. Elizabeth is a board-certified OB/GYN and maternal-fetal medicine specialist with
              over a decade of experience in diagnostic ultrasound and women&apos;s health. She
              founded Ulnar Medical with a vision to bring world-class diagnostic imaging to Nairobi
              families.
            </p>
            <p className="text-white/60 leading-relaxed">
              Her expertise spans high-risk pregnancy management, fetal anomaly scanning, and
              advanced Doppler studies. She is passionate about patient education and ensuring every
              family leaves with clarity and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Our Clinic */}
      <div className="px-6 md:px-16 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Est.", value: "2021", desc: "Serving Nairobi families for over 3 years" },
          { label: "Location", value: "Ngong Rd", desc: "Conveniently located in Nairobi's heart" },
          { label: "Patients", value: "5,000+", desc: "Trusted by thousands of families" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-[#d4a843]/40 transition-all"
          >
            <p className="text-xs tracking-[0.2em] text-[#d4a843] uppercase mb-2">{stat.label}</p>
            <p className="text-4xl font-bold mb-2">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Location */}
      <div className="px-6 md:px-16 pb-20 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-[#d4a843]/30 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Find Us on Ngong Road</h2>
          <p className="text-white/60 mb-6">
            We are open Monday – Saturday, 8:00am – 6:00pm. Walk-ins welcome, appointments preferred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+254724273996"
              className="bg-[#d4a843] text-[#070b1a] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors"
            >
              Call +254 724 273 996
            </a>
            <a
              href="https://wa.me/254724273996"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-[#d4a843] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
