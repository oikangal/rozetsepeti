'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useId } from 'react'

type Props = {
  title: string
  subtitle?: string
  href?: string                // ürün detay sayfası (örn: /urunler/akrilik-rozet)
  image: string
  children?: React.ReactNode   // genelde <PriceCalculator ... />
}

function priceLabelFor(title: string) {
  const map: Record<string, string> = {
    'Akrilik Rozetler': 'Akrilik Rozet Fiyatları',
    'Kumaş Anahtarlık': 'Kumaş Anahtarlık Fiyatları',
    'Yaka İsimliği': 'Yaka İsimliği Fiyatları',
    'Akrilik Anahtarlık': 'Akrilik Anahtarlık Fiyatları',
  }
  return map[title] ?? 'Fiyatlar'
}

export default function CategoryCard({ title, subtitle, href = '#', image, children }: Props) {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const uid = useId()
  const drawerId = `drawer-${uid}`

  // Açıkken: ESC ile kapat, body scroll kilidi, ilk input’a fokus
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      const el = drawerRef.current?.querySelector<HTMLElement>('input, select, textarea, button, [tabindex]')
      el?.focus()
    }, 50)

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  // Bu kart açıksa: diğer kartlara blur/opacity düşümü uygula
  useEffect(() => {
    const all = document.querySelectorAll<HTMLElement>('[data-rs-card]')
    if (open) {
      all.forEach(el => {
        if (el !== containerRef.current) el.classList.add('rs-dim')
      })
    } else {
      all.forEach(el => el.classList.remove('rs-dim'))
    }
    return () => { all.forEach(el => el.classList.remove('rs-dim')) }
  }, [open])

  const containerRef = useRef<HTMLElement | null>(null)

  return (
    <article
      ref={containerRef as any}
      data-rs-card
      className="relative overflow-visible rounded-[20px] transition-all duration-200"
    >
      {/* Kapak görseli */}
      <div className="relative rounded-[20px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-80 sm:h-72 lg:h-[22rem] w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* Yukarı açılan çekmece (mor çerçeve) */}
        <div
          ref={drawerRef}
          id={drawerId}
          className="absolute left-3 right-3 bottom-3 z-40 overflow-auto rounded-2xl bg-white shadow-xl border-2"
          style={{
            borderColor: 'var(--brand)',
            maxHeight: open ? 460 : 0,
            opacity: open ? 1 : 0,
            transition: 'max-height 300ms ease, opacity 300ms ease',
          }}
          aria-hidden={!open}
        >
          <div className="px-4 py-3">
            {children ? (
              children
            ) : (
              <p className="text-sm text-gray-700 text-center">
                Buraya fiyat hesaplama modülü gelecek.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Beyaz panel — mor kontür */}
      <div
        className="
          absolute left-3 right-3 -bottom-5
          rounded-2xl bg-white shadow-lg
          border-2 px-4 py-3 text-center z-30
        "
        style={{ borderColor: 'var(--brand)' }}
      >
        <h3 className="text-[16px] sm:text-[17px] font-extrabold tracking-tight">{title}</h3>

        {subtitle && (
          <p className="mt-1 text-[13px] sm:text-[13.5px] text-gray-600">{subtitle}</p>
        )}

        {href && (
          <div className="mt-1.5">
            <Link
              href={href}
              className="inline-block w-max mx-auto text-[13px] font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700"
            >
              Ürün Hakkında Detaylı Bilgi İçin Tıklayın
            </Link>
          </div>
        )}

        {/* Fiyatlar butonu – aynı hover efektli */}
        <div className="mt-2.5 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls={drawerId}
            className="
              group relative overflow-hidden
              inline-flex items-center justify-center
              rounded-full px-6 py-2 min-w-[200px]
              text-sm font-medium shadow-sm text-white
            "
            style={{ background: 'var(--brand)' }}
          >
            <span
              className="
                absolute inset-x-0 bottom-0 h-0
                bg-[#F9B233]
                transition-all duration-300 ease-out
                group-hover:h-full
              "
              aria-hidden
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              {priceLabelFor(title)}
            </span>
          </button>
        </div>
      </div>

      {/* Panel taşma payı */}
      <div className="h-16" />

      {/* Backdrop: blur + karartma (tıklayınca kapanır) */}
      {open && (
        <button
          aria-label="Fiyat penceresini kapat"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-black/25 backdrop-blur-[2px]"
        />
      )}

      {/* Diğer kartları dimlemek için global stil */}
      <style jsx global>{`
        [data-rs-card].rs-dim {
          filter: blur(1.5px);
          opacity: 0.6;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: no-preference) {
          [data-rs-card].rs-dim {
            transition: filter 200ms ease, opacity 200ms ease;
          }
        }
      `}</style>
    </article>
  )
}