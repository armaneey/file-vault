import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { DashboardLayout } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FileVault - Secure File Storage',
    template: '%s | FileVault',
  },
  description: 'Store, manage and share your files securely in the cloud with FileVault. Fast, reliable, and secure file storage solution.',
  keywords: ['file storage', 'cloud storage', 'file management', 'secure storage', 'file sharing'],
  authors: [{ name: 'FileVault' }],
  creator: 'FileVault',
  publisher: 'FileVault',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'FileVault - Secure File Storage',
    description: 'Store, manage and share your files securely in the cloud',
    siteName: 'FileVault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileVault - Secure File Storage',
    description: 'Store, manage and share your files securely in the cloud',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
