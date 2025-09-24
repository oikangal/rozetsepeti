'use client'

type Step = { no: number; title: string; desc: string }

const STEPS: Step[] = [
  { no: 1, title: 'Logonuzu gönderin', desc: 'Logonuzu veya tasarımınızı bizimle paylaşın. Ürün üzerinde nasıl görüneceğine dair dijital bir ön çalışma hazırlayalım.' },
  { no: 2, title: 'Tasarımı onaylayın', desc: 'Gönderdiğimiz dijital çalışmayı inceleyip onaylayın. Gerekirse hızlıca revize edelim.' },
  { no: 3, title: 'Ödemeyi gerçekleştirin', desc: 'İster kredi kartı ister havale ile, faturanıza istinaden ödemenizi güvenli şekilde gerçekleştirin.' },
  { no: 4, title: 'Ürünleriniz hazır', desc: 'Sipariş verdiğiniz ürünler belirtilen süre içerisinde kargoya hazır hale getirilir ve gönderime hazırlanır.' },
]

export default function Steps() {
  return (
    <section className="my-8">
      {/* Desktop'ta max 1600px, ortalı; kenarlarda ~12px pad */}
      <div className="mx-auto w-full max-w-[1600px] px-[12px]">
        {/* Mobil: 2x2, <360px: 1 kolon; Desktop (lg+): 4 kolon */}
        <div className="grid grid-cols-2 max-[360px]:grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((s) => (
            <article
              key={s.no}
              className="
                group rounded-2xl border bg-white shadow-sm
                px-4 py-4 sm:px-5 sm:py-5
                flex items-center gap-4
                min-h-[116px]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-[var(--brand)]
                hover:border-transparent
                /* Sağ-alt yönlü koyu gölge (sadece hover'da) */
                transition-shadow
                hover:shadow-[12px_14px_36px_rgba(0,0,0,0.35)]
                will-change:transform
              "
            >
              {/* Rozet: MOBİLDE GİZLİ, md+ görünür. Hover'da beyaz zemin + mor rakam */}
              <div
                className="
                  hidden md:grid place-items-center shrink-0
                  w-12 h-12 lg:w-14 lg:h-14
                  rounded-full ring-1 ring-black/5
                  bg-[var(--brand)] text-white
                  font-semibold text-lg lg:text-xl
                  transition-colors duration-200
                  group-hover:bg-white group-hover:text-[color:var(--brand)]
                  group-hover:ring-white/20
                "
                aria-hidden="true"
              >
                {s.no}
              </div>

              {/* Başlık + açıklama (sola hizalı) — hover'da beyaz metin */}
              <div className="min-w-0 text-left">
                <h3
                  className="
                    text-base sm:text-lg font-semibold text-gray-900
                    transition-colors duration-200
                    group-hover:text-white
                  "
                >
                  {s.title}
                </h3>
                <p
                  className="
                    mt-1 text-sm text-gray-600 leading-relaxed
                    transition-colors duration-200
                    group-hover:text-white/90
                  "
                >
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}