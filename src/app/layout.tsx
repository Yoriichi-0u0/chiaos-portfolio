import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = "https://chiaos-portfolio.vercel.app/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ChiaOS | Chia Yuen Kai",
    template: "%s | ChiaOS",
  },
  alternates: {
    canonical: siteUrl,
  },
  description:
    "ChiaOS is Chia Yuen Kai's original setup and activated system portfolio for development skill, creativity, and career identity.",
  keywords: [
    "Chia Yuen Kai",
    "ChiaOS",
    "AI portfolio",
    "cybersecurity portfolio",
    "cloud architecture",
    "software engineering intern",
  ],
  authors: [{ name: "Chia Yuen Kai" }],
  creator: "Chia Yuen Kai",
  openGraph: {
    title: "ChiaOS | Chia Yuen Kai",
    description:
      "A clean setup landing page and activated system experience for Chia Yuen Kai's development skill, creative direction, and proof of work.",
    url: siteUrl,
    siteName: "ChiaOS",
    images: [
      {
        url: "/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "ChiaOS Open Graph placeholder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChiaOS | Chia Yuen Kai",
    description:
      "Original setup and activated ChiaOS system for AI, cybersecurity, cloud, and software systems.",
    images: ["/og-placeholder.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
