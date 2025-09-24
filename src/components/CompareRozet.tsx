// src/components/CompareRozet.tsx
'use client'

import Link from 'next/link'

type Plan = {
    title: string
    note?: string
    includesTitle: string
    bullets: string[]
    cta: { label: string; href: string }
    theme: 'akrilik' | 'metal'
}

const PLANS: Plan[] = [
    {
        title: 'Akrilik Rozet',
        note: 'Yeni nesil, ekonomik ve hızlı',
        includesTitle: 'Özellikler',
        bullets: [
            'Kalıp ücretleri yok',
            'Az adetli üretim imkanı',
            'Şekil sınırı yok (Logo formu)',
            'Her rozete ayrı renk verme imkanı',
            'Parlak ve göz alıcı',
            'Ekonomik ve hızlı',
        ],
        cta: { label: 'Akrilik Rozet Siparişi İçin Tıklayın', href: '/siparis' },
        theme: 'akrilik',
    },
    {
        title: 'Metal Rozet',
        note: 'Geleneksel, yüksek fiyat ve yavaş',
        includesTitle: 'Özellikler',
        bullets: [
            'Yüksek kalıp ücretleri',
            'Minimum sipariş problemleri',
            'Mine işçiliği problemleri',
            'Tek kalıp, tek tasarım',
            'Renk geçişi problemleri',
            'Uzun üretim süreleri',
        ],
        // ⇩⇩ WhatsApp yönlendirmesi
        cta: { label: 'Metal Rozet Siparişi İçin Tıklayın', href: 'https://wa.me/905336343434' },
        theme: 'metal',
    },
]

export default function CompareRozet() {
    return (
        <section className="px-[12px]">
            <div className="max-w-6xl mx-auto">
                {/* Mobilde de iki sütun — dar kartlar */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {PLANS.map((p) => {
                        const isAkrilik = p.theme === 'akrilik'
                        return (
                            <div
                                key={p.title}
                                className={`
                  relative flex flex-col
                  rounded-2xl border shadow-sm
                  p-3 sm:p-4 md:p-5
                  ${isAkrilik ? 'border-[#2e9f42]/30 bg-[#40c351]/10' : 'border-gray-200 bg-gray-50'}
                `}
                            >
                                {/* Başlık & kısa not — ORTALI */}
                                <div className="text-center px-1">
                                    <h3
                                        className={`text-[15px] sm:text-base md:text-lg font-semibold ${
                                            isAkrilik ? 'text-[#1e7c31]' : 'text-gray-800'
                                        }`}
                                    >
                                        {p.title}
                                    </h3>
                                    {p.note && <p className="mt-1 text-xs sm:text-sm text-gray-600">{p.note}</p>}
                                </div>

                                {/* Özellikler — liste ortada, tikler sabit kolonda hizalı */}
                                <div className="mt-3 sm:mt-4 text-center">
                                    <div className="text-xs sm:text-sm font-medium text-gray-800">{p.includesTitle}</div>

                                    {/* w-max + mx-auto -> tüm liste ortada, text-left -> içerik düzgün okunur */}
                                    <ul className="mt-2 w-max mx-auto text-left grid gap-1.5 text-[12px] sm:text-[13px] text-gray-700">
                                        {p.bullets.map((b, i) => (
                                            <li key={i} className="grid grid-cols-[20px_auto] items-start gap-2">
                                                {isAkrilik ? (
                                                    // ✅ Akrilik: check (okey) ikonu
                                                    <svg
                                                        className="mt-[2px] h-4 w-4 flex-none"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                    >
                                                        <circle cx="10" cy="10" r="10" fill="#40c351" />
                                                        <path
                                                            d="M6 10.5l2.4 2.4L14 7.3"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    // Metal: sade nokta
                                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                )}
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA — altta ortalı */}
                                <div className="mt-auto pt-4 flex justify-center">
                                    {isAkrilik ? (
                                        <Link
                                            href={p.cta.href}
                                            className="group relative overflow-hidden inline-flex items-center justify-center text-center rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-[12px] sm:text-sm font-medium text-white"
                                            style={{ background: '#40c351' }}
                                        >
                      <span
                          className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full"
                          aria-hidden
                      />
                                            <span className="relative z-10 group-hover:text-black">{p.cta.label}</span>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={p.cta.href}
                                            className="group relative inline-flex items-center justify-center text-center rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-[12px] sm:text-sm font-medium border border-gray-300 bg-white text-black"
                                        >
                      <span
                          className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full rounded-full"
                          aria-hidden
                      />
                                            <span className="relative z-10 group-hover:text-black">{p.cta.label}</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}