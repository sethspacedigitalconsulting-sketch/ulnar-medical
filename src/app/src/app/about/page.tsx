import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Ulnar Medical & Diagnostic Centre",
    description: "Learn about Ulnar Medical — Nairobi's specialist obstetric and diagnostic imaging centre on Ngong Road.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#080f1e] text-white px-6 md:px-14 py-28 max-w-4xl mx-auto">
            <p className="font-mono text-xs text-[#F4B9B9] uppercase tracking-widest mb-4">Our Story</p>
            <h1
                className="font-serif italic font-bold text-4xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
                About Ulnar Medical
            </h1>
            <p className="font-mono text-xs text-white/30 mb-14">
                Ngong Road, Nairobi · Established 2021
            </p>

            <div className="space-y-12 font-sans text-[rgba(248,246,242,0.6)] text-sm leading-relaxed">

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Who We Are</h2>
                    <p>Ulnar Medical and Diagnostic Centre is a specialist obstetric and gynaecological diagnostic imaging centre located along Ngong Road, Nairobi, Kenya. Founded in 2021, we were established with a single mission: to deliver world-class diagnostic care to women of all backgrounds in an environment where every patient feels genuinely seen, heard, and cared for.</p>
                    <p className="mt-4">We are registered and accredited by the Kenya Medical Practitioners and Dentists Council (KMPDC), and operate under the highest standards of clinical excellence and patient confidentiality.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Our Mission</h2>
                    <p>To make precision diagnostic imaging and specialist obstetric care accessible, compassionate, and patient-centred — combining advanced medical technology with the warmth and dignity that every woman deserves.</p>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">What We Do</h2>
                    <p>We specialise in a comprehensive range of obstetric and gynaecological diagnostic services including:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>3D and 4D obstetric ultrasound imaging</li>
                        <li>Gynecological consultations and pelvic assessments</li>
                        <li>Full pelvic diagnostic scanning</li>
                        <li>Antenatal wellness packages tailored per trimester</li>
                        <li>Maternal-fetal medicine specialist consultations</li>
                        <li>Advanced clinical radiology and pelvic floor mapping</li>
                        <li>Same-day laboratory triage and rapid results dispatch</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Our Team</h2>
                    <p>Our clinical team is led by experienced specialists who bring decades of combined expertise in obstetric imaging, gynaecology, and maternal-fetal medicine.</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl border border-white/5 bg-[#0d1b3e]/40">
                            <span className="font-mono text-[8px] text-[#FFD43A] uppercase tracking-widest border border-[#FFD43A]/20 px-2 py-0.5 rounded-md inline-block mb-3">
                                RADIOLOGY LEAD
                            </span>
                            <h3 className="text-white font-display font-bold text-lg mb-1">Dr. Elizabeth Odondi</h3>
                            <p className="text-[rgba(248,246,242,0.5)] text-xs leading-relaxed">
                                Consultant Radiologist and Lead Diagnostic Imaging Specialist at Ulnar Medical. Dr. Elizabeth brings expert-level precision to every scan, ensuring patients receive accurate, timely, and compassionate diagnostic reporting.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-[#0d1b3e]/40">
                            <span className="font-mono text-[8px] text-[#FFD43A] uppercase tracking-widest border border-[#FFD43A]/20 px-2 py-0.5 rounded-md inline-block mb-3">
                                MATERNAL-FETAL MEDICINE
                            </span>
                            <h3 className="text-white font-display font-bold text-lg mb-1">Dr. Cyprian Michieka</h3>
                            <p className="text-[rgba(248,246,242,0.5)] text-xs leading-relaxed">
                                Board-certified OB/GYN Specialist and Fellow in Maternal-Fetal Medicine with 5+ years of experience in high-risk obstetric care and advanced fetal diagnostics.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {[
                            { title: "Precision", desc: "Every result we deliver is underpinned by clinical accuracy, advanced imaging technology, and expert interpretation." },
                            { title: "Compassion", desc: "We understand that diagnostic visits can be emotional. We create a warm, respectful environment for every patient." },
                            { title: "Trust", desc: "We operate with full transparency, strict confidentiality, and a commitment to doing what is right for every patient." },
                        ].map((v) => (
                            <div key={v.title} className="p-5 rounded-xl border border-white/5 bg-[#0d1b3e]/30">
                                <h4 className="text-[#FFD43A] font-mono text-xs uppercase tracking-widest mb-2">{v.title}</h4>
                                <p className="text-[rgba(248,246,242,0.5)] text-xs leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Accreditation</h2>
                    <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#FFD43A]/15 bg-[#FFD43A]/5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD43A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <div>
                            <p className="font-mono text-xs text-[#FFD43A] uppercase tracking-widest mb-1">Registered & Accredited</p>
                            <p className="text-[rgba(248,246,242,0.55)] text-sm">Kenya Medical Practitioners & Dentists Council (KMPDC) — Certified Diagnostic Centre</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-white font-display font-semibold text-xl mb-3">Visit Us</h2>
                    <div className="space-y-2">
                        <p><strong className="text-white">Location:</strong> Ngong Road, Nairobi, Kenya</p>
                        <p><strong className="text-white">Phone:</strong>{" "}
                            <a href="tel:+254724273996" className="text-[#FFD43A] hover:underline">+254 724 273 996</a>{" / "}
                            <a href="tel:+254724429489" className="text-[#FFD43A] hover:underline">+254 724 429 489</a>
                        </p>
                        <p><strong className="text-white">Email:</strong>{" "}
                            <a href="mailto:lunamedimaging@gmail.com" className="text-[#FFD43A] hover:underline">lunamedimaging@gmail.com</a>
                        </p>
                        <p><strong className="text-white">WhatsApp:</strong>{" "}
                            <a href="https://wa.me/254724273996" className="text-[#FFD43A] hover:underline">Chat with us</a>
                        </p>
                    </div>
                </section>

            </div>
        </main>
    );
}