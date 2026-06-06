import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-2">Patient Privacy Charter</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: January 2025</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Our Commitment to Your Privacy</h2>
            <p>
              Ulnar Medical & Diagnostic Centre is committed to protecting the privacy and
              confidentiality of all patient information. This charter outlines how we collect,
              use, store, and protect your personal and medical data in compliance with applicable
              Kenyan data protection laws and international healthcare privacy standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>We collect the following categories of information:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/60">
              <li>Personal identification details (name, date of birth, contact information)</li>
              <li>Medical history, current conditions, and treatment records</li>
              <li>Diagnostic imaging data and laboratory results</li>
              <li>Insurance and billing information</li>
              <li>Appointment and consultation records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              Your information is used solely to provide you with accurate medical care, coordinate
              treatments, process billing, and communicate appointment reminders. We do not sell,
              rent, or share your personal data with third parties for commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
            <p>
              All patient records are stored securely using encrypted digital systems with
              restricted access. Only authorised clinical and administrative staff may access your
              records on a need-to-know basis. Physical records are kept in secure, locked
              facilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/60">
              <li>Access your own medical records upon written request</li>
              <li>Request corrections to inaccurate information</li>
              <li>Withdraw consent for non-essential data processing</li>
              <li>Request deletion of non-clinical data where legally permissible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
            <p>
              For any privacy concerns or data requests, please contact us at{" "}
              <a href="mailto:lunamedimaging@gmail.com" className="text-[#d4a843] hover:underline">
                lunamedimaging@gmail.com
              </a>{" "}
              or call{" "}
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
