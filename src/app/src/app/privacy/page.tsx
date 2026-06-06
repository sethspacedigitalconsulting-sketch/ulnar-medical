import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Patient Privacy Charter | Ulnar Medical & Diagnostic Centre",
    description: "How Ulnar Medical collects, uses, and protects your personal and medical data.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#080f1e] text-white px-6 md:px-14 py-28 max-w-4xl mx-auto">
            <p className="font-mono text-xs text-[#F4B9B9] uppercase tracking-widest mb-4">Legal</p>
            <h1 className="font-serif italic font-bold text-4xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Patient Privacy Charter
            </h1>
            <p className="font-mono text-xs text-white/30 mb-14">Last updated: June 2026</p>

            <div className="space-y-12 font-sans text-[rgba(248,246,242,0.6)] text-sm leading-relaxed">

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">1. Who We Are</h2>
                    <p>Ulnar Medical and Diagnostic Centre ("Ulnar Medical", "we", "us") is a licensed diagnostic and obstetric imaging centre located along Ngong Road, Nairobi, Kenya. We are registered with the Kenya Medical Practitioners and Dentists Council (KMPDC). This Privacy Charter explains how we collect, use, store, and protect your personal and medical information when you interact with our services, website, or staff.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">2. Information We Collect</h2>
                    <p>We may collect the following categories of information:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li><strong className="text-white">Identity data:</strong> full name, date of birth, gender, national ID or passport number.</li>
                        <li><strong className="text-white">Contact data:</strong> phone number, email address, physical address.</li>
                        <li><strong className="text-white">Medical data:</strong> obstetric history, gynaecological records, scan reports, lab results, referral notes, and clinical correspondence.</li>
                        <li><strong className="text-white">Appointment data:</strong> booking history, visit timestamps, and communication logs via WhatsApp or email.</li>
                        <li><strong className="text-white">Payment data:</strong> transaction records (we do not store card details).</li>
                        <li><strong className="text-white">Website usage data:</strong> IP address, browser type, pages visited (via anonymised analytics only).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">3. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To deliver diagnostic, obstetric, and gynaecological services to you.</li>
                        <li>To manage and confirm appointments via WhatsApp, phone, or email.</li>
                        <li>To communicate scan results, clinical reports, and follow-up care instructions.</li>
                        <li>To maintain accurate medical records required by Kenyan health regulations.</li>
                        <li>To send appointment reminders or clinical updates (you may opt out at any time).</li>
                        <li>To improve our services through anonymised data analysis.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">4. Medical Data Confidentiality</h2>
                    <p>All medical records, scan results, and clinical reports are treated as strictly confidential. Your medical data will never be shared with third parties without your explicit written consent, except where required by Kenyan law (e.g. court orders, public health emergencies, or mandatory reporting obligations). Our clinical staff are bound by professional codes of conduct and confidentiality obligations.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">5. Data Storage and Security</h2>
                    <p>Patient records are stored securely in encrypted digital systems and/or locked physical files at our Ngong Road facility. We implement appropriate technical and organisational measures to prevent unauthorised access, loss, or disclosure of your data. Access to patient records is restricted to authorised clinical staff only.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">6. Data Retention</h2>
                    <p>We retain patient medical records for a minimum of 7 years in accordance with Kenyan medical records regulations, or longer where clinically necessary. After the retention period, records are securely destroyed.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">7. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Access your own medical records upon written request.</li>
                        <li>Request correction of inaccurate data.</li>
                        <li>Withdraw consent for marketing communications at any time.</li>
                        <li>Request deletion of non-medical personal data where legally permissible.</li>
                    </ul>
                    <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:lunamedimaging@gmail.com" className="text-[#FFD43A] hover:underline">lunamedimaging@gmail.com</a>.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">8. Third-Party Services</h2>
                    <p>We use Calendly for appointment scheduling. Calendly operates under its own privacy policy. We use WhatsApp Business for patient communication — WhatsApp is operated by Meta Platforms Inc. We do not share your data with these platforms beyond what is necessary to deliver our services.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">9. Contact Us</h2>
                    <p>For any privacy-related queries or concerns:</p>
                    <div className="mt-3 space-y-1">
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