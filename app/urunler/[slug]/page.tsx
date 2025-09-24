import { PRODUCTS } from '@/lib/products'
import MiniCalculator from '@/components/MiniCalculator'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductPage({ params }:{ params: { slug: string }}){
  const product = PRODUCTS.find(p=>p.slug === params.slug)
  if(!product){
    return (
      <div className="py-10">
        <h1 className="text-2xl font-bold mb-2">Ürün bulunamadı</h1>
        <Link className="text-primary-700 underline" href="/">Ana sayfaya dön</Link>
      </div>
    )
  }
  return (
    <article className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.subtitle}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 items-start">
        <div className="aspect-video relative rounded-xl overflow-hidden border bg-gray-50">
          <Image src={product.heroImg} alt={product.title} fill className="object-cover" />
        </div>
        <div className="grid gap-4">
          <section className="grid gap-2">
            <h2 className="text-lg font-semibold">Kısa Bilgi</h2>
            <p className="text-sm text-gray-700">Ürün hakkında yer tutucu bilgi. Malzeme, ebatlar, baskı türü, sabitleme seçenekleri burada.</p>
          </section>
          <section className="grid gap-2">
            <h2 className="text-lg font-semibold">Hızlı Hesap</h2>
            <MiniCalculator />
            <p className="text-xs text-gray-500">Detaylı hesaplama ve opsiyonlar Sprint 2’de eklenecek.</p>
          </section>
        </div>
      </div>

      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">Nasıl Sipariş Verilir?</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-700 grid gap-1">
          <li>İhtiyacınıza uygun boyut ve adedi belirleyin.</li>
          <li>İletişim formu ile talebinizi gönderin.</li>
          <li>Ekibimiz sizinle detayları netleştirip teklif paylaşsın.</li>
        </ol>
      </section>

      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">Galeri</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="aspect-square rounded-lg bg-gray-100 border" />
          <div className="aspect-square rounded-lg bg-gray-100 border" />
          <div className="aspect-square rounded-lg bg-gray-100 border" />
          <div className="aspect-square rounded-lg bg-gray-100 border" />
          <div className="aspect-square rounded-lg bg-gray-100 border" />
          <div className="aspect-square rounded-lg bg-gray-100 border" />
        </div>
      </section>
    </article>
  )
}
