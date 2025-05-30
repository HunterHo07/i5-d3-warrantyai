import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "WarrantyAI - Smart Warranty & Service Management",
  description: "Never miss a warranty again. AI-powered tracking and smart reminders for all your warranties, services, and coverage across electronics, home, vehicles, and more.",
  keywords: "warranty tracking, AI assistant, service management, receipt scanning, warranty reminders, product management",
  authors: [{ name: "WarrantyAI Team" }],
  creator: "WarrantyAI",
  publisher: "WarrantyAI",
  robots: "index, follow",
  openGraph: {
    title: "WarrantyAI - Smart Warranty & Service Management",
    description: "Never miss a warranty again. AI-powered tracking and smart reminders for all your warranties, services, and coverage.",
    url: "https://warrantyai.com",
    siteName: "WarrantyAI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WarrantyAI - Smart Warranty & Service Management",
    description: "Never miss a warranty again. AI-powered tracking and smart reminders for all your warranties, services, and coverage.",
    creator: "@warrantyai",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0066FF",
  icons: {
    icon: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    shortcut: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    apple: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-sans bg-neutral-900 text-neutral-50 overflow-x-hidden`}
      >
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
