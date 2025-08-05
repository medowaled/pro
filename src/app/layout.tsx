import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const fontBody = Cairo({
  subsets: ['arabic'],
  variable: '--font-body',
});

const fontHeadline = Cairo({
  subsets: ['arabic'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'مستر مصطفى خليل',
  description: 'منصة تعليمية رائدة في العالم العربي',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#29ABE2',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/test-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/test-favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/test-favicon.png',
    apple: '/images/test-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#29ABE2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="مستر مصطفى خليل" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#29ABE2" />
        <meta name="msapplication-TileImage" content="/images/test-favicon.png" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/images/test-favicon.png" />
        <link rel="shortcut icon" href="/images/test-favicon.png" />
        <link rel="apple-touch-icon" href="/images/test-favicon.png" />
      </head>
      <body className={cn("antialiased", fontBody.variable, fontHeadline.variable)}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
