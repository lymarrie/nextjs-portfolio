import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import Sidebar from './components/sidebar';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://nextjs-portfolio-ten-neon.vercel.app/'),
  title: {
    default: 'Luc Yuki Marrie',
    template: '%s | Luc Yuki Marrie',
  },
  description: "Luc's Portfolio Website.",
  openGraph: {
    title: 'Luc Yuki Marrie',
    description: "Luc's Portfolio Website.",
    url: 'https://nextjs-portfolio-ten-neon.vercel.app/',
    siteName: 'Luc Yuki Marrie',
    locale: 'en_US',
    type: 'website',
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
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'text-white bg-[#111010] dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col sm:flex-row mx-8 mt-8 md:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Sidebar />
          {children}
          <Analytics />
          <Footer />
        </main>
      </body>
    </html>
  );
}
