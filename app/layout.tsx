import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Red_Hat_Text } from 'next/font/google'

const redHat = Red_Hat_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'RozetSepeti',
  description: 'Rozet ve anahtarlık ürünleri için statik tanıtım sitesi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`antialiased ${redHat.className}`}>
        <Header />
        <main className="min-h-[60vh]">
          {/* DİKKAT: Buradaki container’ı kaldırdık; sayfalar gerektiği yerde kendi Container'ını kullanacak */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}