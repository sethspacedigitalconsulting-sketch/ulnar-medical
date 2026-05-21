import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import { ScrollProvider } from "@/components/providers/scroll-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ulnar Medical & Diagnostic Centre — Modern OB/GYN You Can Trust",
  description:
    "Providing highly accurate ultrasound, compassionate OB/GYN care, and specialized diagnostic imaging in a patient-centered clinical sanctuary. Ngong Road, Nairobi.",
  keywords: [
    "OB/GYN Nairobi",
    "3D ultrasound Kenya",
    "maternal diagnostics",
    "Ulnar Medical",
    "Ngong Road clinic",
  ],
  openGraph: {
    title: "Ulnar Medical & Diagnostic Centre",
    description: "Modern OB/GYN & Diagnostic Services You Can Trust",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
