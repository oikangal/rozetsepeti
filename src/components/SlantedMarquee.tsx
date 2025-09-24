'use client'

const ITEMS = [
  'YENİ GÜNCELLEME', '◆', 'HIZLI ÜRETİM', '◆', '24/7 DESTEK', '◆',
  'KARGO TAKİBİ', '◆', 'KURUMSAL FATURA', '◆'
]

function Row() {
  return (
    <>
      {ITEMS.map((t, i) => (
        <span key={i} className="mx-6 tracking-wide font-semibold">{t}</span>
      ))}
    </>
  )
}

export default function SlantedMarquee() {
  return (
    <div className="relative my-6 px-[12px]">
      {/* Konteyner */}
      <div className="relative w-full max-w-[1600px] mx-auto overflow-hidden">
        {/* ŞERİT (çapraz) */}
        <div
          className="
            relative left-1/2 -translate-x-1/2
            -rotate-6 w-[140%]
            rounded-[28px] border border-white/25
            bg-gradient-to-b from-[#B05CFF] to-[#7E2BDB]
            text-white
            shadow-[0_14px_40px_rgba(0,0,0,0.35)]
          "
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}
        >
          <div className="rs-slanted-track py-3 text-sm sm:text-base">
            <Row /><Row />
          </div>
        </div>

        {/* Şeridin kapladığı kadar boşluk ayır */}
        <div className="h-28 sm:h-32" />
      </div>
    </div>
  )
}