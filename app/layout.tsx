import type { Metadata } from 'next'
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/app/providers'
import { Footer } from '@/components/Footer/Footer'


const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-marquee' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-ticket-mono' })


export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: 'Explore movies from The Movie Database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Footer />
      </body>
    </html>
  )
}