import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book online through our website booking section, call us on +254 724 273 996 or +254 724 429 489, or send us a WhatsApp message. We are available Monday to Saturday, 8am to 6pm.",
  },
  {
    q: "Do I need a referral to visit Ulnar Medical?",
    a: "No referral is needed for most of our diagnostic services. You can walk in or book directly. However, some advanced procedures may require a referral letter from your primary physician.",
  },
  {
    q: "How long does an ultrasound appointment take?",
    a: "A standard obstetric ultrasound takes approximately 20–30 minutes. 3D/4D sessions may take up to 45 minutes. Fetal anomaly scans are typically 45–60 minutes. Please arrive 10 minutes early.",
  },
  {
    q: "How should I prepare for my ultrasound?",
    a: "For abdominal/obstetric scans, we recommend a full bladder (drink 4–6 glasses of water 1 hour before). For pelvic or transvaginal scans, an empty bladder is preferred. Our team will advise you specifically when booking.",
  },
  {
    q: "When will I receive my results?",
    a: "Most ultrasound reports are available the same day. Laboratory results typically take 24–48 hours depending on the test. Urgent results are communicated as soon as they are available.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes, we work with several insurance providers. Please contact us in advance to confirm whether your scheme is accepted and to understand any pre-authorisation requirements.",
  },
  {
    q: "Is parking available at your clinic?",
    a: "Yes, we have parking available on-site along Ngong Road. If visiting during peak hours, we recommend arriving early or using a ride-share service.",
  },
  {
    q: "Can I bring a support person to my appointment?",
    a: "Absolutely. You are welcome to bring a partner, family member, or support person to your appointment. For 3D/4D baby scans, we encourage you to bring your loved ones to share the experience.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, M-Pesa (till/paybill available at the desk), and approved insurance. We do not currently accept credit/debit card payments.",
  },
  {
    q: "What if I need to cancel or reschedule?",
    a: "Please notify us at least 24 hours before your appointment. You can call, WhatsApp, or email us. Late cancellations or no-shows may result in a deposit requirement for future bookings.",
  },
];

export default function FaqsPage() {
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

      {/* Hero */}
      <div className="px-6 md:px-16 pt-20 pb-12 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#d4a843] uppercase mb-4">Support</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Frequently Asked <br />
          <span className="text-[#d4a843] italic">Questions</span>
        </h1>
        <p className="text-white/60 text-lg">
          Everything you need to know before your visit. Can&apos;t find your answer?{" "}
          <a href="tel:+254724273996" className="text-[#d4a843] hover:underline">
            Call us directly.
          </a>
        </p>
      </div>

      {/* FAQ List */}
      <div className="px-6 md:px-16 pb-20 max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#d4a843]/30 transition-all"
          >
            <h3 className="font-bold text-white mb-3">{faq.q}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-16 pb-20 max-w-3xl mx-auto text-center">
        <div className="bg-white/5 border border-[#d4a843]/30 rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-white/60 mb-6">Our team is happy to help. Reach out anytime.</p>
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
