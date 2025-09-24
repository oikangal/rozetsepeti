// app/urunler/akrilik-rozet/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Container from '@/components/Container'
import PriceCalculator from '@/components/PriceCalculator'
import Link from 'next/link'
import FaqCarousel from '@/components/FaqCarousel'
import CompareRozet from '@/components/CompareRozet'

export default function AkrilikRozetPage() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!mobileOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
    }, [mobileOpen])

    return (
        <main>
            {/* ===== HERO / BANNER ===== */}
            <section className="relative">
                <div className="px-[12px] mt-3">
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black">
                        <img
                            src="/images/hero/akrilik-rozet-hero.png"
                            alt=""
                            className="h-[42vh] sm:h-[52vh] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

                        <div className="absolute inset-0">
                            <div className="h-full w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-12">
                                <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 items-center">
                                    {/* Sol metin */}
                                    <div className="text-white text-center md:text-left">
                                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                                            Hızlı ve{' '}
                                            <span
                                                className="inline-block rounded-md px-2 py-0.5 text-white"
                                                style={{ background: 'var(--brand)' }}
                                            >
                        Ekonomik
                      </span>{' '}
                                            Akrilik Rozetler
                                        </h1>
                                        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90">
                                            Hızlı üretim, net baskı ve çizilmeye dayanıklı yüzey. Kişiselleştir, hemen fiyatını gör.
                                        </p>

                                        {/* Mobil fiyat butonu */}
                                        <div className="mt-4 md:hidden">
                                            <button
                                                type="button"
                                                onClick={() => setMobileOpen(true)}
                                                className="group relative overflow-hidden inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-sm"
                                                style={{ background: 'var(--brand)' }}
                                            >
                                                <span className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full" />
                                                <span className="relative z-10 group-hover:text-black">Rozet fiyatları için tıklayın</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Desktop hesaplayıcı */}
                                    <div className="hidden md:block bg-white/95 backdrop-blur rounded-2xl p-4 sm:p-5 shadow-xl">
                                        <PriceCalculator product="akrilik-rozet" minDefault={10} orderHref="/siparis" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobil çekmece (banner içinde) */}
                        <div
                            ref={drawerRef}
                            className="md:hidden absolute inset-2 sm:inset-3 z-40 rounded-2xl bg-white shadow-2xl border-2 overflow-auto transition-[transform,opacity] duration-300 ease-out"
                            style={{
                                borderColor: 'var(--brand)',
                                transform: mobileOpen ? 'translateY(0%)' : 'translateY(105%)',
                                opacity: mobileOpen ? 1 : 0,
                            }}
                            aria-hidden={!mobileOpen}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b">
                                <h2 className="text-sm font-semibold text-gray-800">Akrilik Rozet Fiyatı</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-full px-3 py-1.5 text-sm font-medium text-white"
                                    style={{ background: 'var(--brand)' }}
                                >
                                    Kapat
                                </button>
                            </div>
                            <div className="p-4">
                                <PriceCalculator product="akrilik-rozet" minDefault={10} orderHref="/siparis" />
                            </div>
                        </div>

                        {mobileOpen && (
                            <button
                                aria-label="Fiyat penceresini kapat"
                                onClick={() => setMobileOpen(false)}
                                className="md:hidden absolute inset-0 z-30 bg-black/25 backdrop-blur-[2px]"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* ===== SOL VİDEO / SAĞ METİN ===== */}
            <section className="mt-10">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-md">
                            <video
                                className="w-full h-[260px] sm:h-[340px] object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="/videos/akrilik-rozet/poster.jpg"
                            >
                                <source src="/videos/akrilik-rozet/intro.mp4" type="video/mp4" />
                            </video>
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                Net baskı, logonuzun şeklinde, canlı renkler, arkası iğneli
                            </h2>
                            <p className="mt-3 text-gray-700">
                                Akrilik rozetler, logonuzu veya tasarımınızı kristal netlikte yansıtır. Şeffaf ve dayanıklı yüzey,
                                çizilmelere karşı koruma sağlarken, canlı renkler markanızı öne çıkarır. Alt zemin siyah sert akriliktir, kırılmaz. Yakanızda unutup çamaşır
                                makinesinde yıkamanızda bile göz alıcı olmaya devam edecektir.
                            </p>
                            <ul className="mt-4 grid gap-2 text-sm text-gray-700">
                                <li>• Minimum sipariş: 10 adet</li>
                                <li>• Adet arttıkça birim fiyat düşmektedir</li>
                                <li>• Üretim: 7-12 gün (Daha hızlı üretimlerde fiyat değişmektedir)</li>
                                <li>• Türkiye geneli kargo dâhildir</li>
                            </ul>

                            <div className="mt-5">
                                <Link
                                    href="/siparis"
                                    className="group relative overflow-hidden inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-sm"
                                    style={{ background: 'var(--brand)' }}
                                >
                                    <span className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full" />
                                    <span className="relative z-10 group-hover:text-black">Sipariş vermek için tıklayın</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== 4’LÜ ÖZELLİK KARTLARI ===== */}
            <section className="mt-12">
                <Container>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[var(--brand)] text-sm font-semibold">{f.kicker}</div>
                                <h3 className="mt-1 text-lg font-bold">{f.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ===== STICKER MULE TARZI 3’LÜ GÖRSEL BLOĞU ===== */}
            <section className="mt-12">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Özel Üretim Akrilik Rozetler</h2>
                        <p className="mt-3 text-gray-600">
                            Üretimler logonuzun tasarımına göre yapılmaktadır. Şekil sınırı yoktur. Arkası iğnelidir. Parlak ve göz alıcıdır.
                        </p>
                    </div>

                    <div className="mt-6 grid lg:grid-cols-3 gap-5">
                        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-md">
                            <img
                                src="/images/kategoriler/galeri-1.png"
                                alt="Akrilik rozet yığın görüntüsü"
                                className="w-full h-[280px] sm:h-[360px] object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="grid gap-5">
                            <div className="rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="/images/kategoriler/galeri-2.png"
                                    alt="Elde akrilik rozet"
                                    className="w-full h-[170px] sm:h-[175px] object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="/images/kategoriler/galeri-3.png"
                                    alt="Akrilik rozet detay"
                                    className="w-full h-[170px] sm:h-[175px] object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== KARŞILAŞTIRMA / CompareRozet ===== */}
            <section className="mt-12">
                <CompareRozet />
            </section>

            {/* ===== SSS / FaqCarousel ===== */}
            <section className="mt-14">
                <FaqCarousel
                    items={[
                        { q: 'Akrilik rozet ölçüleri nelerdir?', a: 'Fiyatlar uzun kenarı maksimum 30mm olacak şekilde fiyatlardır. Bu ölçüden büyük ürünlerde fiyatlar değişmektedir. Logonuzu paylaştığınızda ekibimiz sizin için boyut tavsiyesinde bulunacaktır.' },
                        { q: 'Kargoya ne zaman verilir?', a: 'Ürünlerin standart üretim süresi 7-12 gündür. Daha hızlı üretim yapılabilmektedir bu durumda fiyatlar değişmektedir.' },
                        { q: 'Şekil sınırı var mı?', a: 'Hayır şekil sınırı bulunmamaktadır.' },
                        { q: 'Metal rozet üretiyor musunuz?', a: 'Metal rozetten daha iyi bir ürün olan akrilik rozet üretiyoruz. Ancak şartnameniz metal rozeti zorunlu kılıyorsa sizi güvenilir ve kaliteli bir firmaya yönlendirebiliriz' },
                        { q: 'Tasarım göndermem şart mı?', a: 'Evet tasarımınızı göndermeniz gerekmektedir. Vektörel (ana dosya) göndermeniz halinde ürününüz mükemmel şekilde üretilebilmektedir.' },
                        { q: 'Hayal ettiğimiz rozeti tasarlayabiliyor musunuz?', a: 'Maalesef, Rozetsepeti ekibi olarak grafik hizmeti veremiyoruz.' },
                        { q: 'Üstü girintili çıkıntılı mı?', a: 'Hayır akrilik rozetler girintili çıkıntılı değildir. Yüksek çözünürlüklü baskı sonrası özel bir kaplama yapılır, bu kaplama cam gibi bir bombe efekti verir, dayanıklıdır.' },
                        { q: 'Arkası mıknatıslı yapılabiliyor mu?', a: 'Evet yapılabilir. Ancak mıknatıs büyüklüklerinden dolayı tasarımınızın uygun olması gerekmektedir. Bunu ekibimize danışabilirsiniz. Mıknatıslı ürünlerde fiyat değişmektedir.' },
                        { q: 'En az 10 adeti örneğin 2 farklı tasarım beşer tane, toplamda 10 adet olacak şekilde üretiyor musunuz?', a: 'Hayır, bir modelden en az 10 adet akrilik rozet üretiyoruz.' },
                    ]}
                />
            </section>
        </main>
    )
}

const FEATURES = [
    { kicker: 'Dayanıklı',            title: 'Çizilmeye Karşı Koruma',    desc: 'Akrilik yüzey baskınızı dış etkenlerden korur; uzun ömürlü kullanım sağlar.' },
    { kicker: 'Kişiselleştirilebilir', title: 'Logo ve Tasarım Sizden',    desc: 'Tüm ürünler siparişinize özel, gönderdiğiniz tasarımla üretilir.' },
    { kicker: 'Hızlı Üretim',         title: '7-12 Gün',                  desc: 'Standart üretimler ödemeye istinaden 7-12 gün sürmektedir. Daha hızlı üretimlerde fiyat değişmektedir.' },
    { kicker: 'Uygun Fiyat',          title: 'Adet Arttıkça Düşen Fiyat', desc: 'Sipariş adeti arttıkça fiyat azalmaktadır' },
]