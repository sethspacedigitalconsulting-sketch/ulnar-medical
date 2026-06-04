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
  title: 'Ulnar Medical & Diagnostic Centre | OB/GYN, Ultrasound & Maternal-Fetal Medicine — Nairobi',
  description: 'Ulnar Medical & Diagnostic Centre offers expert OB/GYN consultations, 3D/4D obstetric ultrasound, maternal-fetal medicine, fetal anomaly scans, amniocentesis, radiology reporting, and diagnostic lab screening on Ngong Road, Nairobi, Kenya.',
  keywords: [
    'OB/GYN Nairobi', 'ultrasound clinic Nairobi', 'obstetric ultrasound Kenya',
    'gynecologist Ngong Road', '3D 4D ultrasound Nairobi', 'fetal scan Nairobi',
    'maternal fetal medicine Nairobi', 'maternal fetal specialist Kenya',
    'high risk pregnancy specialist Nairobi', 'MFM specialist Nairobi',
    'fetal echo Nairobi', 'amniocentesis Kenya', 'amnioreduction Nairobi',
    'fetal anomaly scan Nairobi', 'fetal anatomical survey Kenya',
    'pre-conception consultation Nairobi', 'radiology reporting Nairobi',
    'CT scan reporting Kenya', 'MRI report Nairobi', 'HSG scan Nairobi',
    'X-ray reporting Kenya', 'consultant radiologist Nairobi', 'ultrasound guided procedure Kenya',
    'diagnostic imaging Nairobi', 'antenatal care Nairobi', 'pelvic ultrasound Nairobi',
    'gynecological consultation Kenya', 'same day ultrasound results Nairobi',
    'Ulnar Medical Nairobi', 'Luna Med Imaging', 'best obstetrician Nairobi'
  ].join(', '),
  openGraph: {
    title: 'Ulnar Medical & Diagnostic Centre — Modern OB/GYN & Maternal-Fetal Medicine Nairobi',
    description: 'Expert fetal scans, maternal-fetal medicine, radiology reporting & OB/GYN consultations. Ngong Road, Nairobi.',
    url: 'https://www.ulnar-medical.com',
    siteName: 'Ulnar Medical & Diagnostic Centre',
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulnar Medical & Diagnostic Centre',
    description: 'OB/GYN, 3D/4D Ultrasound & Maternal-Fetal Medicine on Ngong Road, Nairobi.',
  },
  robots: 'index, follow',
  alternates: { canonical: 'https://www.ulnar-medical.com' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Ulnar Medical and Diagnostic Centre",
    "description": "OB/GYN, maternal-fetal medicine, 3D/4D ultrasound, radiology reporting, and diagnostic lab screening.",
    "url": "https://www.ulnar-medical.com",
    "telephone": "+254724273996",
    "email": "lunamedimaging@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ngong Road",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "medicalSpecialty": ["Obstetrics", "Gynecology", "Radiology", "DiagnosticLaboratory"],
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$"
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
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