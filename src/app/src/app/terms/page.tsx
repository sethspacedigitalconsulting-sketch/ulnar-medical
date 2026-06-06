import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Clinical Service | Ulnar Medical & Diagnostic Centre",
    description: "Terms and conditions governing the use of Ulnar Medical diagnostic and clinical services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#080f1e] text-white px-6 md:px-14 py-28 max-w-4xl mx-auto">
            <p className="font-mono text-xs text-[#F4B9B9] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="font-serif italic font-bold text-4xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Terms of Clinical Service
            </h1>
            <p className="font-mono text-xs text-white/30 mb-14">Last updated: June 2026</p>

            <div className="space-y-12 font-sans text-[rgba(248,246,242,0.6)] text-sm leading-relaxed">

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">1. Acceptance of Terms</h2>
                    <p>By booking an appointment, visiting our facility, or using our website at ulnar-medical.com, you agree to be bound by these Terms of Clinical Service. If you do not agree, please refrain from using our services.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">2. Our Services</h2>
                    <p>Ulnar Medical provides obstetric ultrasound, gynaecological consultations, diagnostic imaging, laboratory screening, and maternal-fetal medicine services. All services are delivered by licensed medical professionals registered with the KMPDC. Our services are not a substitute for emergency medical care — in a medical emergency, please contact emergency services immediately.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">3. Appointments and Cancellations</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Appointments may be booked via Calendly, WhatsApp, phone, or in person.</li>
                        <li>We request a minimum of 24 hours' notice for cancellations or rescheduling.</li>
                        <li>Repeated no-shows without notice may result in deposit requirements for future bookings.</li>
                        <li>We reserve the right to reschedule appointments due to clinical emergencies or staff unavailability, with reasonable notice to the patient.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">4. Payment Terms</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Payment is due at the time of service unless prior arrangements have been made.</li>
                        <li>We accept cash, mobile money (M-Pesa), and bank transfers.</li>
                        <li>Prices are subject to change without prior notice. Current pricing is available at our reception or on request via WhatsApp.</li>
                        <li>Refunds for cancelled appointments are at the discretion of management and subject to our cancellation policy.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">5. Clinical Limitations</h2>
                    <p>Diagnostic results provided by Ulnar Medical are based on available technology and clinical expertise at the time of examination. No diagnostic test is 100% conclusive. We strongly recommend discussing all results with your referring physician or specialist. Ulnar Medical shall not be liable for clinical decisions made solely on the basis of our reports without appropriate medical consultation.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">6. Website Use</h2>
                    <p>The content on ulnar-medical.com is for informational purposes only and does not constitute medical advice. You must not use this website for any unlawful purpose. We reserve the right to modify or discontinue any part of the website without notice.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">7. Intellectual Property</h2>
                    <p>All content on this website — including text, images, design, and branding — is the property of Ulnar Medical and Diagnostic Centre. Reproduction or redistribution without written permission is prohibited.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">8. Governing Law</h2>
                    <p>These terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan courts.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">9. Contact</h2>
                    <div className="space-y-1">
                        <p><strong className="text-white">Ulnar Medical and Diagnostic Centre</strong></p>
                        <p>Ngong Road, Nairobi, Kenya</p>
                        <p>Email: <a href="mailto:lunamedimaging@gmail.com" className="text-[#FFD43A] hover:underline">lunamedimaging@gmail.com</a></p>
                        <p>Phone: <a href="tel:+254724273996" className="text-[#FFD43A] hover:underline">+254 724 273 996</a> / <a href="tel:+254724429489" className="text-[#FFD43A] hover:underline">+254 724 429 489</a></p>
                    </div>
                </section>
            </div>
        </main>
    );
}