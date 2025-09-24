// src/components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-14">
      <div className="px-[12px]">
        {/* 1600px bant genişliği */}
        <div className="relative max-w-[1600px] mx-auto">
          <div className="relative rounded-2xl bg-white shadow-md border border-black/5 overflow-visible">
            {/* Mor panel */}
            <div
              className="
                relative rounded-2xl md:rounded-3xl
                px-5 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10
                overflow-visible
                pr-40 md:pr-10   /* mobilde sağda rozete alan */
              "
              style={{ background: 'var(--brand)' }}
            >
              {/* İçerik */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:gap-14 lg:gap-16 text-white">
                {/* Sol: logo + adres */}
                <div className="min-w-[240px] max-w-sm space-y-3 md:mr-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logow.png"
                      alt="RozetSepeti"
                      width={180}
                      height={48}
                      className="h-12 w-auto"
                      priority
                    />
                  </div>

                  <address className="not-italic text-sm leading-relaxed text-white/90">
                    Necip Fazıl Mah., Sarıkaya Sok.
                    <br />
                    No:39B 34773
                    <br />
                    Ümraniye, İstanbul
                  </address>

                  <p className="text-sm">
                    <a href="tel:08503464484" className="no-underline hover:underline text-white">
                      0850 346 44 84
                    </a>
                  </p>
                </div>

                {/* Orta: Menü */}
                <div className="min-w-[220px] space-y-3 mt-4 md:mt-0">
                  <h4 className="text-sm font-semibold tracking-wide text-white/90">MENU</h4>
                  <nav className="grid gap-2 text-[15px]">
                    <Link href="/urunler/akrilik-rozet" className="hover:underline">Akrilik Rozetler</Link>
                    <Link href="/" className="hover:underline">Kumaş Anahtarlıklar</Link>
                    <Link href="/" className="hover:underline">Yaka İsimlikleri</Link>
                    <Link href="/" className="hover:underline">Akrilik Anahtarlıklar</Link>
                  </nav>
                </div>

                {/* Sağ: Kurumsal */}
                <div className="min-w-[220px] space-y-3 md:ml-10 mt-4 md:mt-0">
                  <h4 className="text-sm font-semibold tracking-wide text-white/90">KURUMSAL</h4>
                  <nav className="grid gap-2 text-[15px]">
                    <Link href="/hakkimizda" className="hover:underline">Hakkımızda</Link>
                    <Link href="/iletisim" className="hover:underline">İletişim</Link>
                  </nav>
                </div>
              </div>

              {/* Rozet — MOBİL: %30 küçük ve sağa yaslı */}
              <Image
                src="/images/footer-badge.png"
                alt=""
                width={220}
                height={220}
                priority
                className="
                  block md:hidden
                  absolute right-4 top-1/2
                  -translate-y-1/2     /* dikey ortalı */
                  w-52 sm:w-56 h-auto  /* önceki ~w-72'den ~%30 küçük */
                  z-0
                  pointer-events-none select-none
                  drop-shadow-[0_10px_16px_rgba(0,0,0,.32)]
                "
              />

              {/* Rozet — DESKTOP (dışarı taşan) */}
              <Image
                src="/images/footer-badge.png"
                alt=""
                width={260}
                height={260}
                priority
                className="
                  hidden md:block
                  absolute
                  right-32 lg:right-48
                  -top-10 md:-top-12
                  w-44 md:w-52 lg:w-56 h-auto
                  z-20
                  pointer-events-none select-none
                  drop-shadow-[0_12px_18px_rgba(0,0,0,.35)]
                "
              />
            </div>
          </div>

          {/* Alt kopya */}
          <div className="px-2 sm:px-0">
            <div className="max-w-[1600px] mx-auto text-center text-xs text-gray-500 py-4">
              © {new Date().getFullYear()} RozetSepeti. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}