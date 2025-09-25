import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Steps from '@/components/Steps'
import Container from '@/components/Container'
import CategoryCard from '@/components/CategoryCard'
import PriceCalculator from '@/components/PriceCalculator'
// import InstagramFeed from '@/components/InstagramFeed' // şimdilik pasif

export default function HomePage() {
    return (
        <>
            {/* HERO – full-bleed */}
            <div className="mb-3">
                <Hero />
            </div>

            {/* Düz Marquee */}
            <Marquee />

            {/* Kategori kartları (Desktop: 2x2) — arka plan şerit */}
            <div className="bg-[#f8fafb] pt-0 py-8">
                <Container>
                    <section className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
                        <CategoryCard
                            title="Akrilik Rozetler"
                            subtitle="Yeni nesil, hızlı ve ekonomik çözüm"
                            href="/urunler/akrilik-rozet"            // aktif kalsın
                            image="/images/kategoriler/akrilik-rozet.jpg"
                        >
                            <PriceCalculator product="akrilik-rozet" minDefault={10} />
                        </CategoryCard>

                        <CategoryCard
                            title="Kumaş Anahtarlık"
                            subtitle="Logonuz ve sloganınızla birlikte size özel"
                            href="#"                                   // tıklayınca aynı sayfada kal
                            image="/images/kategoriler/kumas-anahtarlik.jpg"
                        >
                            <PriceCalculator product="kumas-anahtarlik" minDefault={10} />
                        </CategoryCard>

                        <CategoryCard
                            title="Yaka İsimliği"
                            subtitle="Fuar, Otel v.b. işletmeler için şık çözümler"
                            href="#"                                   // tıklayınca aynı sayfada kal
                            image="/images/kategoriler/yaka-isimligi.jpg"
                        >
                            <PriceCalculator product="yaka-isimligi" minDefault={10} />
                        </CategoryCard>

                        <CategoryCard
                            title="Akrilik Anahtarlık"
                            subtitle="Logonuz, tasarımlarınız ve daha fazlası"
                            href="#"                                   // tıklayınca aynı sayfada kal
                            image="/images/kategoriler/akrilik-anahtarlik.jpg"
                        >
                            <PriceCalculator product="akrilik-anahtarlik" minDefault={10} />
                        </CategoryCard>
                    </section>
                </Container>
            </div>

            {/* 4 Adımda Sipariş – KARTLARIN ALTINDA */}
            <div className="mt-10">
                <Steps />
            </div>

            {/* Instagram Feed (pasif) */}
            {/*
      <div className="mt-10">
        <InstagramFeed />
      </div>
      */}
        </>
    )
}