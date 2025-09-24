'use client'
import { useEffect, useRef, useState } from 'react'

const LABELS: { text: string; variants?: string[] }[] = [
  {
    text: 'Sayı arttıkça fiyatlar düşmektedir',
    variants: ['arttıkça', 'artıkça', 'ARTTIKÇA'],
  },
  {
    text: 'Tüm ürünler kişiselleştirilebilmektedir',
    variants: ['kişiselleştirilebilmektedir', 'kişiselleştirebilmektedir', 'özelleştirilebilmektedir'],
  },
  { text: 'Tüm ürünlerden en az 10 adet üretilmektedir' },
  { text: 'Fiyatlara kargo dahildir' },
]

function Dot() {
  return (
    <span className="mx-4 sm:mx-6 inline-flex items-center justify-center" aria-hidden="true">
      <span className="inline-block size-1.5 sm:size-2 rounded-full bg-white/95" />
    </span>
  )
}

function SwappableWord({ stack, activeIndex }: { stack: string[]; activeIndex: number }) {
  return (
    <span className="relative inline-block overflow-hidden align-baseline" style={{ height: '1.2em' }}>
      <span
        className="block transition-transform duration-400 ease-out will-change-transform"
        style={{ transform: `translateY(-${activeIndex * 1.2}em)` }}
      >
        {stack.map((w, i) => (
          <span key={i} className="block leading-none">{w}</span>
        ))}
      </span>
    </span>
  )
}

export default function MarqueeSmart() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)
  const [activeMap, setActiveMap] = useState<Record<number, number>>({})

  // AYARLAR
  const speedPxPerSec = 40   // ← hızı buradan değiştir
  const pauseMs = 1200       // ← merkezde bekleme süresi
  const thresholdPx = 6      // ← merkeze yaklaşım toleransı

  useEffect(() => {
    let raf = 0, last = performance.now(), offset = 0
    const step = (now: number) => {
      const dt = (now - last) / 1000; last = now
      const wrap = wrapRef.current, track = trackRef.current
      if (!wrap || !track) return (raf = requestAnimationFrame(step))

      const trackW = track.scrollWidth
      if (!paused) {
        offset -= speedPxPerSec * dt
        const segment = trackW / 3 // 3 kopya var
        if (offset <= -segment) offset += segment
        track.style.transform = `translateX(${offset}px)`
      }

      // merkeze gelen label'ı bul
      const centerX = wrap.getBoundingClientRect().left + wrap.clientWidth / 2
      const labels = track.querySelectorAll<HTMLSpanElement>('[data-label-idx]')
      let hitIndex: number | null = null
      labels.forEach((el) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        if (Math.abs(cx - centerX) <= thresholdPx) hitIndex = Number(el.dataset.labelIdx)
      })

      if (!paused && hitIndex !== null) {
        setPaused(true)
        setActiveMap((m) => {
          const next = { ...m }
          const total = LABELS[hitIndex!].variants?.length ?? 0
          next[hitIndex!] = total ? ((next[hitIndex!] ?? 0) + 1) % total : 0
          return next
        })
        setTimeout(() => setPaused(false), pauseMs)
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const ONE = (
    <>
      {LABELS.map((item, i) => {
        const v = item.variants
        if (i === 0 && v?.length) {
          const before = 'Sayı ', after = ' fiyatlar düşmektedir'
          return (
            <span key={i} data-label-idx={i} className="inline-flex items-baseline">
              <span className="whitespace-nowrap font-medium tracking-wide text-white text-sm sm:text-base">{before}</span>
              <SwappableWord stack={v} activeIndex={activeMap[i] ?? 0} />
              <span className="whitespace-nowrap font-medium tracking-wide text-white text-sm sm:text-base">{after}</span>
            </span>
          )
        }
        if (i === 1 && v?.length) {
          return (
            <span key={i} data-label-idx={i} className="inline-flex items-baseline">
              <SwappableWord stack={v} activeIndex={activeMap[i] ?? 0} />
            </span>
          )
        }
        return (
          <span key={i} data-label-idx={i} className="whitespace-nowrap font-medium tracking-wide text-white text-sm sm:text-base">
            {item.text}
          </span>
        )
      }).reduce<JSX.Element[]>((acc, el, i, arr) => {
        acc.push(el); if (i < arr.length - 1) acc.push(<Dot key={`dot-${i}`} />); return acc
      }, [])}
    </>
  )

  return (
    <div className="px-[12px] mt-0 mb-3">
      <div ref={wrapRef} className="relative overflow-hidden w-full mx-auto rounded-full border border-black/10" style={{ background: 'var(--brand)' }}>
        <div className="flex items-center py-2.5 sm:py-3">
          <div ref={trackRef} className="flex flex-nowrap whitespace-nowrap will-change-transform text-white" style={{ transform: 'translateX(0px)' }}>
            <span className="inline-flex items-center">{ONE}</span>
            <span className="inline-flex items-center" aria-hidden>{ONE}</span>
            <span className="inline-flex items-center" aria-hidden>{ONE}</span>
          </div>
        </div>
      </div>
    </div>
  )
}