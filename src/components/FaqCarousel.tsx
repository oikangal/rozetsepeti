'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type Item = { q: string; a: string }

const AKRILIK_FAQ: Item[] = [
    { q: 'Akrilik rozet ölçüleri nelerdir?', a: 'Fiyatlar uzun kenarı maksimum 30mm olacak şekilde fiyatlardır. Bu ölçüden büyük ürünlerde fiyatlar değişmektedir. Logonuzu paylaştığınızda ekibimiz sizin için boyut tavsiyesinde bulunacaktır.' },
    { q: 'Kargoya ne zaman verilir?', a: 'Ürünlerin standart üretim süresi 7-12 gündür. Daha hızlı üretim yapılabilmektedir bu durumda fiyatlar değişmektedir.' },
    { q: 'Şekil sınırı var mı?', a: 'Hayır şekil sınırı bulunmamaktadır.' },
    { q: 'Metal rozet üretiyor musunuz?', a: 'Metal rozetten daha iyi bir ürün olan akrilik rozet üretiyoruz. Ancak şartnameniz metal rozeti zorunlu kılıyorsa sizi güvenilir ve kaliteli bir firmaya yönlendirebiliriz' },
    { q: 'Tasarım göndermem şart mı?', a: 'Evet tasarımınızı göndermeniz gerekmektedir. Vektörel (ana dosya) göndermeniz halinde ürününüz mükemmel şekilde üretilebilmektedir.' },
    { q: 'Hayal ettiğimiz rozeti tasarlayabiliyor musunuz?', a: 'Maalesef, Rozetsepeti ekibi olarak grafik hizmeti veremiyoruz.' },
    { q: 'Üstü girintili çıkıntılı mı?', a: 'Hayır akrilik rozetler girintili çıkıntılı değildir. Yüksek çözünürlüklü baskı sonrası özel bir kaplama yapılır, bu kaplama cam gibi bir bombe efekti verir, dayanıklıdır.' },
    { q: 'Arkası mıknatıslı yapılabiliyor mu?', a: 'Evet yapılabilir. Ancak mıknatıs büyüklüklerinden dolayı tasarımınızın uygun olması gerekmektedir. Bunu ekibimize danışabilirsiniz. Mıknatıslı ürünlerde fiyat değişmektedir.' },
    { q: 'En az 10 adeti örneğin 2 farklı tasarım beşer tane, toplamda 10 adet olacak şekilde üretiyor musunuz?', a: 'Hayır, bir modelden en az 10 adet akrilik rozet üretiyoruz.' },
]

export default function FaqCarousel({ items = AKRILIK_FAQ }: { items?: Item[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)
    const cardRefs = useRef<HTMLDivElement[]>([])
    const [index, setIndex] = useState(1)
    const [offsets, setOffsets] = useState<number[]>([])
    const [padPx, setPadPx] = useState(0)

    const clamp = (n: number) => Math.max(0, Math.min(n, items.length - 1))

    const recalc = () => {
        const c = containerRef.current
        const t = trackRef.current
        if (!c || !t) return

        const cw = c.clientWidth
        const firstW = cardRefs.current[0]?.getBoundingClientRect().width ?? 0
        const pad = Math.max(0, (cw - firstW) / 2)
        setPadPx(pad)

        const rt = t.getBoundingClientRect()
        const centers = cardRefs.current.map((el) => {
            const r = el.getBoundingClientRect()
            const left = r.left - rt.left
            return left + r.width / 2
        })

        const containerCenter = cw / 2
        setOffsets(centers.map((center) => center - containerCenter))
    }

    useLayoutEffect(() => {
        recalc()
        const ro = new ResizeObserver(() => recalc())
        if (containerRef.current) ro.observe(containerRef.current)
        window.addEventListener('resize', recalc)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', recalc)
        }
    }, [items.length])

    useEffect(() => {
        if (offsets.length) requestAnimationFrame(() => setIndex((i) => clamp(i)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offsets.length])

    const go = (dir: -1 | 1) => setIndex((i) => clamp(i + dir))
    const goTo = (i: number) => setIndex(clamp(i))

    const translate = useMemo(() => (offsets.length ? offsets[index] ?? 0 : 0), [offsets, index])

    return (
        <section className="px-[12px]">
            <div className="max-w-6xl mx-auto">
                {/* Başlık — ortalı */}
                <div className="mb-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold inline-block">
                        Sıkça Sorulan <span className="text-[var(--brand)]">Sorular</span>
                    </h2>
                </div>

                {/* Görünüm kutusu */}
                <div ref={containerRef} className="relative overflow-hidden px-4 sm:px-8">
                    {/* Track */}
                    <div
                        ref={trackRef}
                        className="flex items-stretch gap-4 sm:gap-6 will-change-transform transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${translate}px)` }}
                    >
                        {/* BAŞ SPACER */}
                        <div className="shrink-0" style={{ width: padPx }} aria-hidden />

                        {items.map((it, i) => {
                            const active = i === index
                            return (
                                <div
                                    key={i}
                                    ref={(el) => { if (el) cardRefs.current[i] = el }}
                                    className={`
                    basis-[68%] sm:basis-[66%] lg:basis-[60%]
                    shrink-0 rounded-3xl border shadow-sm p-5 sm:p-6 cursor-pointer
                    transition-all duration-300
                    ${active
                                        ? 'text-white border-2 border-[#F9B233] scale-[1.02]'
                                        : 'bg-white text-gray-800 border-gray-200 opacity-85'}
                  `}
                                    style={active ? { background: 'var(--brand, #6E15CC)' } : undefined}
                                    onClick={() => goTo(i)}
                                >
                                    <h3 className={`text-lg sm:text-xl font-semibold ${active ? 'text-white' : 'text-gray-900'}`}>
                                        {it.q}
                                    </h3>
                                    <p className={`mt-3 text-sm leading-relaxed ${active ? 'text-white/90' : 'text-gray-600'}`}>
                                        {it.a}
                                    </p>
                                </div>
                            )
                        })}

                        {/* SON SPACER */}
                        <div className="shrink-0" style={{ width: padPx }} aria-hidden />
                    </div>
                </div>

                {/* Oklar */}
                <div className="mt-4 flex justify-center gap-3">
                    <button
                        onClick={() => go(-1)}
                        disabled={index === 0}
                        className="rounded-full border px-4 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                        aria-label="Önceki soru"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => go(1)}
                        disabled={index === items.length - 1}
                        className="rounded-full border px-4 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                        aria-label="Sonraki soru"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    )
}