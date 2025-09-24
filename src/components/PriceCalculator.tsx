'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { ProductKey, Tier } from '@/lib/pricing'
import { PRICING_TABLES } from '@/lib/pricing'

function findTier(tiers: Tier[], qty: number): Tier | null {
    if (!tiers?.length) return null
    let chosen: Tier | null = null
    for (const t of tiers) if (qty >= t.min) chosen = t
    return chosen ?? tiers[0]
}

function formatTRY(n: number) {
    try {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            maximumFractionDigits: 2,
        }).format(n)
    } catch {
        return `${n.toFixed(2)} TL`
    }
}

export default function PriceCalculator({
                                            product,
                                            minDefault,
                                            orderHref = '/siparis', // sipariş sayfasına götür
                                        }: {
    product: ProductKey
    minDefault?: number
    orderHref?: string
}) {
    const tiers = PRICING_TABLES[product]
    const minQty = tiers[0]?.min ?? 1

    // hesaplananda tutulan adet
    const [qty, setQty] = useState<number>(Math.max(minDefault ?? minQty, minQty))
    // input’ta görünen metin
    const [qtyInput, setQtyInput] = useState<string>(String(Math.max(minDefault ?? minQty, minQty)))

    // ürün değişince resetle
    useEffect(() => {
        const start = Math.max(minDefault ?? minQty, minQty)
        setQty(start)
        setQtyInput(String(start))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const activeTier = useMemo(() => findTier(tiers, qty), [tiers, qty])
    const unit = activeTier?.unit ?? 0

    const subtotal = unit * qty
    const vatRate = 0.2
    const grandTotal = subtotal * (1 + vatRate)

    // yazdıkça sadece rakamları tut
    const onChangeQtyInput = (raw: string) => {
        const cleaned = raw.replace(/\D/g, '')
        setQtyInput(cleaned) // boş bırakmasına izin ver
    }

    // kullanıcı yazmayı 300ms bırakınca otomatik commit
    useEffect(() => {
        const t = setTimeout(() => {
            if (qtyInput === '') return // boşsa blur'da toparlarız
            const n = parseInt(qtyInput, 10)
            if (Number.isFinite(n)) {
                const next = Math.max(n, minQty)
                setQty(next)
                // input’u normalize et
                if (qtyInput !== String(next)) setQtyInput(String(next))
            }
        }, 300)
        return () => clearTimeout(t)
    }, [qtyInput, minQty])

    // odaktan çıkınca da garantiye al
    const commitQty = () => {
        const n = parseInt(qtyInput || '', 10)
        const next = Number.isFinite(n) ? Math.max(n, minQty) : minQty
        setQty(next)
        setQtyInput(String(next))
    }

    return (
        <div className="grid gap-2">
            {/* İstenilen Adet */}
            <label className="text-sm font-medium text-gray-700">
                İstenilen Adet
                <input
                    type="tel"
                    inputMode="numeric"
                    enterKeyHint="done"
                    pattern="[0-9]*"
                    autoComplete="off"
                    value={qtyInput}
                    onChange={(e) => onChangeQtyInput(e.target.value)}
                    onBlur={commitQty}
                    className="
            mt-0.5 w-full rounded-lg border px-3 py-1.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#6E15CC]/40 focus:border-[#6E15CC]
          "
                    placeholder={String(minQty)}
                    aria-describedby="qtyHelp"
                />
            </label>
            <p id="qtyHelp" className="text-[11px] text-gray-500">
                Minimum {minQty} adettir. Adet arttıkça adet fiyatı otomatik güncellenir.
            </p>

            {/* Fiyat Özeti */}
            <div className="rounded-xl border bg-gray-50 px-3 py-2.5 text-sm grid gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Adet Fiyatı</span>
                    <span className="font-semibold">{formatTRY(unit)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">İstenilen Adet</span>
                    <span className="font-semibold">{qty}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-semibold">{formatTRY(subtotal)}</span>
                </div>
                <div className="mt-0.5 h-px bg-gray-200" />
                <div className="flex items-center justify-between text-base">
                    <span className="font-semibold">Genel Toplam (KDV Dahil %20)</span>
                    <span className="font-extrabold">{formatTRY(grandTotal)}</span>
                </div>
                <p className="-mt-1 text-[10px] leading-none text-gray-600">
                    Fiyatlara kargo dahildir.
                </p>
            </div>

            {/* CTA */}
            <div className="mt-1.5 flex justify-center">
                <Link
                    href={orderHref}
                    className="
            group relative overflow-hidden
            inline-flex items-center justify-center
            rounded-full px-5 py-2
            text-sm font-medium text-white shadow-sm
          "
                    style={{ background: 'var(--brand)' }}
                >
          <span
              className="
              absolute inset-x-0 bottom-0 h-0
              bg-[#F9B233]
              transition-all duration-300 ease-out
              group-hover:h-full
            "
              aria-hidden
          />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            Sipariş vermek için tıklayın
          </span>
                </Link>
            </div>
        </div>
    )
}