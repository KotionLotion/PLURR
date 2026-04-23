import type { Metadata } from 'next'
import { Bebas_Neue, Space_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'PLURR | July 24-25 Benque Viejo del Carmen',
  description: 'Peace · Love · Unity · Respect · Responsibility - One Night Only in Benque Viejo del Carmen. July 24-25, 6PM to 6AM.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceMono.variable} ${syne.variable} bg-[#050508]`}>
      <body className="font-syne antialiased bg-[#050508] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
