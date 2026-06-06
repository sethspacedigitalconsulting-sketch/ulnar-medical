import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";

export default function TermsPage() {
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
        <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="px-6 md:px-16 pt-16 pb-20 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">Legal</p>
        <h1 className="text-4xl font-bold mb-2">Terms of Clinical Service</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: January 2025</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing our services, booking an appointment, or visiting Ulnar Medical &
              Diagnostic Centre, you agree to be bound by these Terms of Clinical Service. If you
              do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Diagnostic Testing Protocols</h2>
            <p>
              All diagnostic procedures at Ulnar Medical are performed by qualified, registered
              specialists. Results are provided for informational purposes and must be interpreted
              in conjunction with a licensed physician. We do not provide diagnoses — we provide
              data to support clinical decision-making.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Appointment Policy</h2>
            <p>
              Appointments are confirmed upon booking. We request at least 24 hours notice for
              cancellations or rescheduling. Repeated no-shows may result in a deposit requirement
              for future bookings. We reserve the right to reassign slots not cancelled in advance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Payment Terms</h2>
            <p>
              Payment is required at the time of service unless a prior billing arrangement has
              been made. We accept cash, M-Pesa, and approved insurance schemes. Disputed charges
              must be raised within 14 days of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              Ulnar Medical & Diagnostic Centre shall not be liable for any indirect, incidental,
              or consequential damages arising from the use or inability to use our diagnostic
              services. Our liability is limited to the direct cost of the service rendered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Republic of Kenya. Any disputes shall be
              resolved through the courts of Nairobi County.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a href="mailto:lunamedimaging@gmail.com" className="text-[#d4a843] hover:underline">
                lunamedimaging@gmail.com
              </a>{" "}
              or{" "}
              <a href="tel:+254724273996" className="text-[#d4a843] hover:underline">
                +254 724 273 996
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
