import type { Metadata } from 'next';
import './globals.css';

// ✅ OFFLINE BYPASS: Temporary system fallback overrides to skip internet compile blocks
const playfair = { variable: '--font-display' };
const inter = { variable: '--font-sans' };

export const metadata: Metadata = {
  title: {
    default: 'Ulnar Medical & Diagnostic Centre | OB/GYN, Ultrasound & Maternal-Fetal Medicine - Nairobi',
    template: '%s | Ulnar Medical Nairobi',
  },
  description: 'Ulnar Medical & Diagnostic Centre on Ngong Road, Nairobi offers expert OB/GYN consultations, 3D/4D obstetric ultrasound, maternal-fetal medicine, fetal anomaly scans, amniocentesis, HSG scans, radiology reporting, and same-day diagnostic lab results in Kenya.',
  keywords: ['Ulnar Medical Nairobi','OB/GYN Nairobi','obstetrician Nairobi','gynecologist Nairobi','ultrasound clinic Nairobi','obstetric ultrasound Nairobi','3D ultrasound Nairobi','4D ultrasound Nairobi','pregnancy ultrasound Nairobi','fetal scan Nairobi Kenya','pelvic ultrasound Nairobi','maternal fetal medicine Nairobi','MFM specialist Nairobi','high risk pregnancy specialist Nairobi','fetal anomaly scan Nairobi','fetal echo Nairobi','amniocentesis Kenya','HSG scan Nairobi','radiology reporting Nairobi','antenatal care Nairobi','same day results Nairobi','Ngong Road clinic Nairobi','diagnostic centre Nairobi Kenya'].join(', '),
  openGraph: {
    title: 'Ulnar Medical & Diagnostic Centre - OB/GYN, 3D/4D Ultrasound & Maternal-Fetal Medicine, Nairobi',
    description: 'Expert fetal scans, maternal-fetal medicine, radiology reporting & OB/GYN consultations on Ngong Road, Nairobi. Same-day results.',
    url: 'https://www.ulnar-medical.com',
    siteName: 'Ulnar Medical & Diagnostic Centre',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: 'https://www.ulnar-medical.com/images/clinic-ultrasound.jpg', width: 1200, height: 630, alt: 'Ulnar Medical Diagnostic Centre - Nairobi ultrasound clinic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulnar Medical & Diagnostic Centre | OB/GYN & Ultrasound Nairobi',
    description: 'OB/GYN, 3D/4D Ultrasound & Maternal-Fetal Medicine on Ngong Road, Nairobi. Same-day results.',
    images: ['https://www.ulnar-medical.com/images/clinic-ultrasound.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://www.ulnar-medical.com' },
  category: 'health',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        '@id': 'https://www.ulnar-medical.com/#clinic',
        name: 'Ulnar Medical and Diagnostic Centre',
        alternateName: 'Ulnar Medical Nairobi',
        description: 'Expert OB/GYN, maternal-fetal medicine, 3D/4D obstetric ultrasound, fetal anomaly scans, radiology reporting, and same-day diagnostic lab results on Ngong Road, Nairobi, Kenya.',
        url: 'https://www.ulnar-medical.com',
        telephone: '+254724273996',
        email: 'admin@ulnarmedical.com',
        image: 'https://www.ulnar-medical.com/images/clinic-ultrasound.jpg',
        address: { '@type': 'PostalAddress', streetAddress: 'Ngong Road', addressLocality: 'Nairobi', addressRegion: 'Nairobi County', addressCountry: 'KE' },
        geo: { '@type': 'GeoCoordinates', latitude: '-1.3005', longitude: '36.7636' },
        medicalSpecialty: ['Obstetrics','Gynecology','Radiology','DiagnosticLaboratory','MaternalFetalMedicine'],
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' }
        ],
        contactPoint: [{ '@type': 'ContactPoint', telephone: '+254724273996', contactType: 'customer service', areaServed: 'KE', availableLanguage: ['English','Swahili'] }],
        priceRange: '$$',
        areaServed: { '@type': 'City', name: 'Nairobi' }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.ulnar-medical.com/#website',
        url: 'https://www.ulnar-medical.com',
        name: 'Ulnar Medical & Diagnostic Centre',
        publisher: { '@id': 'https://www.ulnar-medical.com/#clinic' }
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-[#0d1b3e] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}