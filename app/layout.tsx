import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AnimatedBackground } from '@/components/animated-background';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shahraiz-ahmad.vercel.app'),
  title: {
    default: 'Shahraiz Ahmad — AI & Shopify Specialist',
    template: '%s | Shahraiz Ahmad',
  },
  description:
    'Shahraiz Ahmad is an AI prompt engineer and Shopify specialist helping brands build high-converting stores, AI workflows, and digital experiences.',
  keywords: [
    'Shahraiz Ahmad',
    'AI Prompt Engineer',
    'Shopify Expert',
    'AI Workflow',
    'Shopify Theme Customization',
    'AI Content Creation',
    'Digital Consulting',
  ],
  authors: [{ name: 'Shahraiz Ahmad' }],
  creator: 'Shahraiz Ahmad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shahraiz-ahmad.vercel.app',
    title: 'Shahraiz Ahmad — AI & Shopify Specialist',
    description:
      'AI prompt engineer and Shopify specialist helping brands build high-converting stores, AI workflows, and digital experiences.',
    siteName: 'Shahraiz Ahmad',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahraiz Ahmad — AI & Shopify Specialist',
    description:
      'AI prompt engineer and Shopify specialist helping brands build high-converting stores, AI workflows, and digital experiences.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {/* Background Animation */}
        <AnimatedBackground />

        {/* Website Content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Toast Notifications */}
        <Toaster />
      </body>
    </html>
  );
}
