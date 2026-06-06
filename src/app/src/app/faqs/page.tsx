import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQs | Ulnar Medical & Diagnostic Centre",
    description: "Frequently asked questions about our diagnostic, obstetric, and gynaecological services.",
};

const faqs = [
    {
        q: "What services does Ulnar Medical offer?",
        a: "We offer 3D/4D obstetric ultrasound, gynecological consultations, full pelvic diagnostic scans, antenatal wellness packages, maternal-fetal specialist services, advanced clinical radiology, and same-day laboratory triage results.",
    },
    {
        q: "How do I book an appointment?",
        a: "You can book directly through our Calendly scheduling system on this website, via WhatsApp at +254 724 273 996 or +254 724 429 489, by email at lunamedimaging@gmail.com, or by calling us directly during clinic hours.",
    },
    {
        q: "Do I need a referral to visit Ulnar Medical?",
        a: "No referral is required for most of our diagnostic and obstetric services. You are welcome to book directly. However, some specialist consultations may benefit from a referral letter from your GP or obstetrician.",
    },
    {
        q: "How long does a 3D/4D ultrasound scan take?",
        a: "A standard 3D/4D obstetric ultrasound session typically takes 30–45 minutes. The duration may vary depending on the type of scan, fetal position, and any additional assessments required.",
    },
    {
        q: "When is the best time to have a 3D/4D ultrasound?",
        a: "The optimal window for 3D/4D imaging is between 26 and 32 weeks of pregnancy, when there is sufficient amniotic fluid and the baby has developed enough facial features for clear imaging. Scans can still be performed outside this window.",
    },
    {
        q: "How quickly will I receive my results?",
        a: "Most scan reports and lab results are available same-day. Formal written reports are typically dispatched within 2 hours of your appointment via WhatsApp or email.",
    },
    {
        q: "Is the clinic safe for high-risk pregnancies?",
        a: "Yes. We have a maternal-fetal medicine specialist on our clinical team who is experienced in managing and monitoring high-risk pregnancies, including advanced fetal assessments and anomaly scans.",
    },
    {
        q: "What should I bring to my appointment?",
        a: "Please bring your national ID or passport, any previous scan reports or referral letters, your antenatal card (if applicable), and your payment method. Wear comfortable, loose-fitting clothing.",
    },
    {
        q: "Do you accept insurance?",
        a: "Please contact us directly at lunamedimaging@gmail.com or via WhatsApp to confirm whether your insurance provider is accepted. We continuously work to expand our insurance partnerships.",
    },
    {
        q: "Where are you located?",
        a: "We are located along Ngong Road, Nairobi, Kenya. Please contact us via WhatsApp or phone for precise directions and parking guidance.",
    },
    {
        q: "What are your clinic hours?",
        a: "Our clinic is open Monday to Saturday. Please contact us directly for current operating hours as these may vary during public holidays.",
    },
    {
        q: "Can I bring a partner or family member to my scan?",
        a: "Yes, you are welcome to bring one support person to your appointment. For 3D/4D scans especially, many patients enjoy sharing the experience with their partner.",
    },
];

export default function FAQsPage() {
    return (
        <main className="min-h-screen bg-[#080f1e] text-white px-6 md:px-14 py-28 max-w-4xl mx-auto">
            <p className="font-mono text-xs text-[#F4B9B9] uppercase tracking-widest mb-4">Support</p>
            <h1
                className="font-serif italic font-bold text-4xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
                Frequently Asked Questions
            </h1>
            <p className="font-mono text-xs text-white/30 mb-14">
                Everything you need to know before your visit.
            </p>

            <div className="space-y-8">
                {faqs.map((faq, i) => (
                    <div key={i} className="border-t border-white/5 pt-8">
                        <h2 className="text-white font-display font-semibold text-lg mb-3">{faq.q}</h2>
                        <p className="font-sans text-[rgba(248,246,242,0.55)] text-sm leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20 p-8 rounded-2xl border border-[#FFD43A]/20 bg-[#FFD43A]/5">
                <p className="font-mono text-xs text-[#FFD43A] uppercase tracking-widest mb-3">Still have questions?</p>
                <p className="font-sans text-[rgba(248,246,242,0.6)] text-sm mb-4">
                    Our team is happy to help. Reach us directly:
                </p>
                <div className="flex flex-col gap-2">
                    <a href="https://wa.me/254724273996" className="font-mono text-sm text-[#FFD43A] hover:underline">
                        WhatsApp: +254 724 273 996
                    </a>
                    <a href="https://wa.me/254724429489" className="font-mono text-sm text-[#FFD43A] hover:underline">
                        WhatsApp: +254 724 429 489
                    </a>
                    <a href="mailto:lunamedimaging@gmail.com" className="font-mono text-sm text-[#FFD43A] hover:underline">
                        lunamedimaging@gmail.com
                    </a>
                </div>
            </div>
        </main>
    );
}