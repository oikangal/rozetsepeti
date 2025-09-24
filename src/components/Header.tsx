'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Akrilik Rozetler', href: '/urunler/akrilik-rozet' },
  { label: 'Anahtarlıklar', href: '/' },
  { label: 'Yaka İsimlikleri', href: '/' },
  { label: 'İletişim', href: '/iletisim' },
]

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        d="M3 5c0-1.1.9-2 2-2h2.2a2 2 0 0 1 1.9 1.4l.7 2.2a2 2 0 0 1-.5 2L8.1 9.8c1 2 2.9 3.9 4.9 4.9l1.2-1.2a2 2 0 0 1 2-.5l2.2.7A2 2 0 0 1 20 15.6V18a2 2 0 0 1-2 2h-1C9.3 20 4 14.7 4 8V7a2 2 0 0 1-1-2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const overlay = pathname === '/' // sadece ana sayfada video üstü

  return (
    <header className={overlay ? 'absolute inset-x-0 top-0 z-30' : 'sticky top-0 z-30 bg-white/80 backdrop-blur'}>
      {/* Ana sayfada üstte hafif boşluk: videoya yapışmasın */}
      <div className={overlay ? 'pt-5' : 'py-2.5 border-b'}>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ===== DESKTOP (md+) ===== */}
          <div className="hidden md:grid rounded-full bg-white border shadow-sm px-2.5 py-1.5 grid-cols-[auto_1fr_auto] items-center gap-3">
            {/* Sol: Logo */}
            <Link href="/" className="flex items-center gap-2 pl-1 overflow-visible">
              <img
                src="/logo.svg"
                alt="RozetSepeti"
                className="h-9 w-auto transform scale-[1.18] md:scale-[1.22]"
              />
              <span className="sr-only">Ana sayfa</span>
            </Link>

            {/* Orta: Nav */}
            <nav className="flex items-center justify-center gap-5 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    relative inline-flex items-center
                    text-gray-700 hover:text-gray-900
                    transition-all duration-200
                    hover:scale-[1.04]
                    after:content-[''] after:absolute after:left-0 after:-bottom-1.5
                    after:h-[2px] after:w-0 after:bg-[var(--brand)]
                    after:transition-[width] after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Sağ: WhatsApp + Telefon (masaüstü) */}
            <div className="flex items-center justify-end gap-1.5">
              <a
                href="https://wa.me/908503464484"
                className="inline-flex items-center justify-center rounded-full p-2"
                aria-label="WhatsApp ile mesaj gönder"
                target="_blank" rel="noopener noreferrer"
              >
                <img src="/icons/icons8-whatsapp.svg" alt="WhatsApp" className="h-7 w-7" />
              </a>

              {/* Telefon: sarı zemin/siyah yazı; hover mor/beyaz */}
              <a
                href="tel:08503464484"
                className="
                  group no-underline inline-flex items-center gap-2
                  rounded-full px-3 py-1.5 text-sm
                  bg-[#F9B233] text-black
                  transition-colors duration-200
                  hover:bg-[var(--brand)] hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40
                "
                aria-label="0850 346 44 84 numarasını ara"
              >
                <PhoneIcon className="transition-colors duration-200" />
                <span className="font-medium">0850 346 44 84</span>
              </a>
            </div>
          </div>

          {/* ===== MOBILE (md-) — Dynamic Island tarzı, TAM YUVARLATILMIŞ ===== */}
          <div className="md:hidden px-3">
            <div
              className="
                mx-auto max-w-[92%]
                rounded-full bg-white/95 backdrop-blur
                border border-black/5 shadow-md
                px-4 py-1.5
                grid grid-cols-[auto_1fr_auto] items-center gap-3
              "
            >
              {/* Sol: ☰ Menü */}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-base"
                aria-label="Menüyü aç/kapat"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <span aria-hidden className="text-lg">☰</span>
                <span className="font-medium">Menü</span>
              </button>

              {/* Orta: Logo */}
              <div className="flex justify-center overflow-visible">
                <Link href="/" className="inline-flex items-center overflow-visible">
                  <img src="/logo.svg" alt="RozetSepeti" className="h-10 w-auto" />
                  <span className="sr-only">Ana sayfa</span>
                </Link>
              </div>

              {/* Sağ: WhatsApp + Telefon */}
              <div className="flex justify-end items-center gap-1.5">
                <a
                  href="https://wa.me/908503464484"
                  className="inline-flex items-center justify-center rounded-full p-2"
                  aria-label="WhatsApp ile mesaj gönder"
                  target="_blank" rel="noopener noreferrer"
                >
                  <img src="/icons/icons8-whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
                </a>

                <a
                  href="tel:08503464484"
                  className="no-underline inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white"
                  style={{ backgroundColor: '#6E15CC' }}
                  aria-label="0850 346 44 84 numarasını ara"
                >
                  <PhoneIcon />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobil açılır menü paneli */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <nav className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-gray-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:08503464484"
              className="no-underline inline-flex items-center gap-2 rounded-xl px-3 py-2 mt-1 w-max"
              onClick={() => setOpen(false)}
            >
              <PhoneIcon /> <span>0850 346 44 84</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}