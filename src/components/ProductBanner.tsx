import Link from 'next/link'
import MiniCalculator from './MiniCalculator'
import type { Product } from '@/lib/products'

export default function ProductBanner({p}:{p:Product}){
  return (
    <details className="group rounded-2xl border hover:shadow transition bg-white">
      <summary className="list-none cursor-pointer">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5">
          <img src={p.heroImg} alt={p.title} className="h-20 w-20 object-cover rounded-xl border"/>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="caret inline-block">›</span> {p.title}
            </h3>
            <p className="text-gray-600 text-sm">{p.subtitle}</p>
          </div>
          <span className="text-primary-700 text-sm font-medium">Hızlı hesaplamak için tıklayın</span>
        </div>
      </summary>
      <div className="px-4 sm:px-6 pb-5 -mt-2">
        <div className="grid gap-4">
          <p className="text-gray-700 text-sm">Kısa açıklama metni için yer tutucu. Buraya ürünün 1–2 cümlelik özetini yazacağız.</p>
          <MiniCalculator />
          <div className="flex items-center gap-3">
            <Link href={`/urunler/${p.slug}`} className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50">Daha fazla bilgi</Link>
          </div>
        </div>
      </div>
    </details>
  )
}
