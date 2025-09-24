'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  return (
    // SAĞ/SOL ~12px; üstte header kadar boşluk (mt-3)
    <div className="px-[12px] mt-3">
      {/* NOT: max-w-6xl KALDIRILDI → desktop’ta da kenara yakın */}
      <section className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl shadow-md">
        {/* Video / Fallback */}
        {!reduceMotion ? (
          <video
            className="h-[40vh] sm:h-[52vh] w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/hero-poster.jpg"
            alt=""
            width={1920}
            height={1080}
            className="h-[40vh] sm:h-[52vh] w-full object-cover"
            priority
          />
        )}

        {/* Okunabilirlik için koyu degrade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

        {/* Metin katmanı */}
        <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-12">
          <div className="w-full max-w-3xl text-white text-center mx-auto">
            <h1 className="leading-tight">
              <span className="block text-3xl sm:text-5xl md:text-6xl font-bold">
                Hızlı ve Ekonomik
              </span>
              <span className="block text-3xl sm:text-5xl md:text-6xl font-bold mt-1">
                Akrilik Rozetler
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/85">
              Sitemizdeki tüm ürünleri sizin logo veya tasarımlarınızla siparişinize özel üretiyoruz.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}