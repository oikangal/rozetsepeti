'use client'

const ITEMS = [
  'Tüm ürünlerden en az 10 adet üretilmektedir',
  'Sayı arttıkça fiyatlar düşmektedir',
  'Tüm ürünler kişiselleştirilebilmektedir',
  'Fiyatlara kargo dahildir',
]

const REPEAT = 5 // içeriği 5 kez arka arkaya göster

function Dot() {
  return (
    <span className="mx-4 sm:mx-6 inline-flex items-center justify-center" aria-hidden="true">
      <span className="inline-block size-1.5 sm:size-2 rounded-full bg-white/95" />
    </span>
  )
}

// Bir tur (elemanlar arasında nokta vardır)
function Row() {
  const parts: JSX.Element[] = []
  ITEMS.forEach((txt, i) => {
    parts.push(
      <span
        key={`txt-${i}`}
        className="whitespace-nowrap font-medium tracking-wide text-white text-sm sm:text-base"
      >
        {txt}
      </span>
    )
    if (i !== ITEMS.length - 1) parts.push(<Dot key={`dot-${i}`} />)
  })
  return <>{parts}</>
}

export default function Marquee() {
  return (
    <div className="px-[12px] mt-0 mb-3">
      <div
        className="relative overflow-hidden w-full mx-auto rounded-full"
        style={{ background: 'var(--brand)' }}
      >
        <div className="flex items-center py-2.5 sm:py-3">
          {/* Tek satır, sürekli akış: içerik 5 kez zincirlenir, her tur arasında nokta vardır */}
          <div className="rs-marquee text-white">
            {Array.from({ length: REPEAT }).map((_, idx) => (
              <span key={idx} aria-hidden={idx > 0} className="inline-flex">
                {/* tur içeriği */}
                <Row />
                {/* tur sonu → bir sonraki tura geçişte de nokta görünmesi için ara ayırıcı */}
                <Dot />
              </span>
            ))}
          </div>
        </div>

        {/* (opsiyonel) hover'da duraklatma */}
        <style jsx>{`
          .rs-marquee:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </div>
  )
}