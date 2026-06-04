import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    default: 'Ulnar Medical & Diagnostic Centre | OB/GYN, Ultrasound & Maternal-Fetal Medicine — Nairobi',
    template: '%s | Ulnar Medical Nairobi',
  },
  description:
    'Ulnar Medical & Diagnostic Centre on Ngong Road, Nairobi offers expert OB/GYN consultations, 3D/4D obstetric ultrasound, maternal-fetal medicine, fetal anomaly scans, amniocentesis, HSG scans, radiology reporting, and same-day diagnostic lab results in Kenya.',
  keywords: [
    // ── Core clinic identity ──
    'Ulnar Medical Nairobi', 'Ulnar Diagnostic Centre Nairobi', 'Luna Med Imaging Nairobi',
    'medical clinic Ngong Road Nairobi', 'diagnostic centre Nairobi Kenya',
    // ── OB/GYN ──
    'OB/GYN Nairobi', 'obstetrician Nairobi', 'gynecologist Nairobi',
    'OB/GYN specialist Ngong Road', 'best obstetrician Nairobi Kenya',
    'gynecological consultation Nairobi', 'women health clinic Nairobi',
    'reproductive health clinic Nairobi', 'women specialist doctor Kenya',
    // ── Ultrasound ──
    'ultrasound clinic Nairobi', 'obstetric ultrasound Nairobi', 'ultrasound scan Nairobi Kenya',
    '3D ultrasound Nairobi', '4D ultrasound Nairobi', '3D 4D obstetric ultrasound Nairobi',
    'pregnancy ultrasound Nairobi', 'baby scan Nairobi', 'fetal scan Nairobi Kenya',
    'pelvic ultrasound Nairobi', 'transvaginal ultrasound Nairobi', 'abdominal ultrasound Nairobi',
    'follicular monitoring Nairobi', 'dating scan Nairobi',
    // ── Maternal-Fetal Medicine ──
    'maternal fetal medicine Nairobi', 'MFM specialist Nairobi', 'MFM doctor Kenya',
    'high risk pregnancy specialist Nairobi', 'high risk pregnancy doctor Kenya',
    'perinatologist Nairobi', 'maternal fetal specialist Kenya',
    'fetal medicine consultant Nairobi',
    // ── Fetal procedures ──
    'fetal anomaly scan Nairobi', 'fetal anatomical survey Kenya', 'anomaly scan Nairobi',
    'fetal echo Nairobi', 'fetal echocardiography Kenya', 'fetal heart scan Nairobi',
    'amniocentesis Kenya', 'amniocentesis Nairobi', 'amnioreduction Nairobi',
    'chorionic villus sampling Kenya',
    // ── Radiology ──
    'radiology reporting Nairobi', 'consultant radiologist Nairobi', 'radiologist Kenya',
    'CT scan reporting Nairobi Kenya', 'MRI reporting Nairobi', 'X-ray reporting Kenya',
    'HSG scan Nairobi', 'hysterosalpingography Kenya', 'diagnostic imaging Nairobi',
    'ultrasound guided procedure Nairobi', 'radiology second opinion Kenya',
    // ── Antenatal & prenatal ──
    'antenatal care Nairobi', 'antenatal clinic Nairobi', 'prenatal care Kenya',
    'antenatal package Nairobi', 'pregnancy check-up Nairobi', 'first trimester scan Nairobi',
    'second trimester scan Kenya', 'third trimester scan Nairobi',
    'pre-conception consultation Nairobi',
    // ── Lab & diagnostics ──
    'diagnostic lab Nairobi', 'same day results Nairobi', 'rapid lab testing Nairobi Kenya',
    'pathology lab Nairobi', 'blood test Nairobi', 'medical testing Nairobi',
    // ── Location ──
    'Ngong Road clinic Nairobi', 'clinic Ngong Road', 'Nairobi women clinic',
    'Nairobi private clinic', 'Karen Nairobi medical clinic', 'Lavington clinic Nairobi',
    'Kilimani medical centre Nairobi',
  ].join(', '),

  openGraph: {
    title: 'Ulnar Medical & Diagnostic Centre — OB/GYN, 3D/4D Ultrasound & Maternal-Fetal Medicine, Nairobi',
    description:
      'Expert fetal scans, maternal-fetal medicine, radiology reporting & OB/GYN consultations on Ngong Road, Nairobi. Same-day results. Book via WhatsApp.',
    url: 'https://www.ulnar-medical.com',
    siteName: 'Ulnar Medical & Diagnostic Centre',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: 'https://www.ulnar-medical.com/images/clinic-ultrasound.jpg',
        width: 1200,
        height: 630,
        alt: 'Ulnar Medical & Diagnostic Centre — Nairobi ultrasound clinic',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ulnar Medical & Diagnostic Centre | OB/GYN & Ultrasound Nairobi',
    description: 'OB/GYN, 3D/4D Ultrasound & Maternal-Fetal Medicine on Ngong Road, Nairobi. Same-day results.',
    images: ['https://www.ulnar-medical.com/images/clinic-ultrasound.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: { canonical: 'https://www.ulnar-medical.com' },
  category: 'health',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.ulnar-medical.com/#clinic",
        "name": "Ulnar Medical and Diagnostic Centre",
        "alternateName": "Ulnar Medical Nairobi",
        "description": "Expert OB/GYN, maternal-fetal medicine, 3D/4D obstetric ultrasound, fetal anomaly scans, radiology reporting, HSG scans, and same-day diagnostic lab results on Ngong Road, Nairobi, Kenya.",
        "url": "https://www.ulnar-medical.com",
        "telephone": "+254724273996",
        "email": "lunamedimaging@gmail.com",
        "logo": "https://www.ulnar-medical.com/logo.png",
        "image": "https://www.ulnar-medical.com/images/clinic-ultrasound.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ngong Road",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "addressCountry": "KE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-1.3005",
          "longitude": "36.7636"
        },
        "medicalSpecialty": [
          "Obstetrics", "Gynecology", "Radiology",
          "DiagnosticLaboratory", "MaternalFetalMedicine"
        ],
        "availableService": [
          { "@type": "MedicalProcedure", "name": "3D/4D Obstetric Ultrasound" },
          { "@type": "MedicalProcedure", "name": "Fetal Anomaly Scan" },
          { "@type": "MedicalProcedure", "name": "Maternal-Fetal Medicine Consultation" },
          { "@type": "MedicalProcedure", "name": "Gynecological Consultation" },
          { "@type": "MedicalProcedure", "name": "Amniocentesis" },
          { "@type": "MedicalProcedure", "name": "Fetal Echocardiography" },
          { "@type": "MedicalProcedure", "name": "HSG Scan" },
          { "@type": "MedicalProcedure", "name": "Radiology Reporting" },
          { "@type": "MedicalProcedure", "name": "Diagnostic Lab Screening" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "14:00"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+254724273996",
            "contactType": "customer service",
            "areaServed": "KE",
            "availableLanguage": ["English", "Swahili"]
          }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "KES",
        "paymentAccepted": "Cash, Mobile Money, Card",
        "areaServed": { "@type": "City", "name": "Nairobi" }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ulnar-medical.com/#website",
        "url": "https://www.ulnar-medical.com",
        "name": "Ulnar Medical & Diagnostic Centre",
        "description": "OB/GYN, Ultrasound & Maternal-Fetal Medicine Clinic — Nairobi, Kenya",
        "publisher": { "@id": "https://www.ulnar-medical.com/#clinic" }
      }
    ]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0d1b3e" />
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.3005;36.7636" />
        <meta name="ICBM" content="-1.3005, 36.7636" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0d1b3e] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}