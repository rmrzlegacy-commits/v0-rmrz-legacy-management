import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PWAProvider } from '@/components/pwa-provider'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RMRZ Legacy Management | Premium Las Vegas Rentals',
  description: 'Discover luxury rental properties in Las Vegas with RMRZ Legacy Management. Premium homes, exceptional service, and a seamless leasing experience.',
  keywords: ['Las Vegas rentals', 'luxury rentals', 'property management', 'RMRZ Legacy', 'Nevada real estate'],
  authors: [{ name: 'RMRZ Legacy Management' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RMRZ Rentals',
  },
  openGraph: {
    title: 'RMRZ Legacy Management | Premium Las Vegas Rentals',
    description: 'Discover luxury rental properties in Las Vegas with RMRZ Legacy Management.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground overscroll-none">
        <PWAProvider>
          {children}
        </PWAProvider>
        <Analytics />
      </body>
    </html>
  )
}
