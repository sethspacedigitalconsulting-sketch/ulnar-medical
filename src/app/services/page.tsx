import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";

const services = [
  {
    title: "Obstetric 3D/4D Ultrasound",
    description:
      "Advanced 3D and 4D ultrasound imaging providing detailed views of your baby's development. Our state-of-the-art equipment delivers crystal-clear images for accurate assessment of fetal growth, anatomy, and wellbeing at every stage of pregnancy.",
    icon: "🩻",
  },
  {
    title: "Gynecological Consultations",
    description:
      "Comprehensive gynecological care including pelvic ultrasound, ovarian cyst evaluation, fibroid mapping, and endometrial assessments. Our specialists provide thorough, compassionate consultations tailored to each patient's needs.",
    icon: "👩‍⚕️",
  },
  {
    title: "Diagnostic Lab Screening",
    description:
      "Full-spectrum laboratory diagnostics covering blood panels, hormonal assays, infection screening, and antenatal profiles. Accurate results with fast turnaround times to support informed clinical decisions.",
    icon: "🔬",
  },
  {
    title: "Antenatal Wellness Packages",
    description:
      "Structured antenatal care packages combining routine scans, blood work, and specialist consultations into a seamless journey from first trimester through delivery. Designed to give you peace of mind at every milestone.",
    icon: "🤱",
  },
  {
    title: "Fetal Anomaly Screening",
    description:
      "Detailed mid-pregnancy anomaly scans (18–22 weeks) to assess fetal anatomy and detect any structural differences early. Performed by experienced maternal-fetal medicine specialists using high-resolution imaging.",
    icon: "📡",
  },
  {
    title: "Doppler Flow Studies",
    description:
      "Specialized Doppler ultrasound to evaluate blood flow in the umbilical artery, uterine arteries, and fetal vessels. Essential for monitoring high-risk pregnancies and ensuring optimal fetal circulation.",
    icon: "💓",
  },
];

export default function ServicesPage() {
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
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">Our Services</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Diagnostic Services <br />
          <span className="text-[#d4a843] italic">Built Around You</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          At Ulnar Medical & Diagnostic Centre, every service is delivered with precision equipment,
          expert specialists, and genuine compassion for every patient we serve.
        </p>
      </div>

      {/* Services Grid */}
      <div className="px-6 md:px-16 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#d4a843]/40 hover:bg-white/8 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-bold mb-3">{service.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-16 pb-20 max-w-4xl mx-auto text-center">
        <div className="bg-white/5 border border-[#d4a843]/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-white/60 mb-8">
            Schedule your appointment today. Our team is available Monday – Saturday, 8am – 6pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#book"
              className="bg-[#d4a843] text-[#070b1a] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+254724273996"
              className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-[#d4a843] transition-colors"
            >
              Call +254 724 273 996
            </a>
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
