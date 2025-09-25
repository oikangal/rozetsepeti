// app/siparis/page.tsx
'use client'

import { useState } from 'react'

type SubmitState = { status: 'idle' | 'sending' | 'ok' | 'error'; message?: string }

const URUNLER = [
    { key: 'akrilik-rozet',      label: 'Akrilik Rozet' },
    { key: 'kumas-anahtarlik',   label: 'Kumaş Anahtarlık' },
    { key: 'yaka-isimligi',      label: 'Yaka İsimliği' },
    { key: 'akrilik-anahtarlik', label: 'Akrilik Anahtarlık' },
]

const OK_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'] as const
const MAX_FILE_MB = 20
const MIN_QTY = 10

export default function SiparisPage() {
    const [state, setState] = useState<SubmitState>({ status: 'idle' })
    const [qty, setQty] = useState<Record<string, number>>({})
    // 👇 Görünen metni ayrı tutuyoruz; başlangıçta boş olacak
    const [qtyText, setQtyText] = useState<Record<string, string>>({})

    // ürün seç/kaldır
    const toggleProduct = (key: string, checked: boolean) =>
        setQty((p) => {
            const next = { ...p }
            if (checked) {
                next[key] = next[key] ?? MIN_QTY // backend için min hazır olsun
                setQtyText((t) => ({ ...t, [key]: '' })) // ama input boş görünsün
            } else {
                delete next[key]
                setQtyText((t) => {
                    const nt = { ...t }
                    delete nt[key]
                    return nt
                })
            }
            return next
        })

    // adet değişimi: boş bırakılırsa görünüm boş kalır; 1–9 → hemen 10; 10+ → olduğu gibi
    const changeQty = (key: string, raw: string) => {
        const cleaned = raw.replace(/\D/g, '').slice(0, 6)

        if (cleaned === '') {
            setQtyText((t) => ({ ...t, [key]: '' }))
            // backend tarafında min’i koruyoruz
            setQty((p) => ({ ...p, [key]: MIN_QTY }))
            return
        }

        const n = parseInt(cleaned, 10)
        if (!Number.isFinite(n) || n < MIN_QTY) {
            setQtyText((t) => ({ ...t, [key]: String(MIN_QTY) }))
            setQty((p) => ({ ...p, [key]: MIN_QTY }))
        } else {
            setQtyText((t) => ({ ...t, [key]: cleaned }))
            setQty((p) => ({ ...p, [key]: n }))
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)

        // en az bir ürün + min 10 adet
        const chosen = Object.entries(qty).filter(([, n]) => Number.isFinite(n) && n >= MIN_QTY)
        if (chosen.length === 0) {
            setState({ status: 'error', message: `Lütfen en az bir ürün seçip en az ${MIN_QTY} adet girin.` })
            return
        }

        // dosyalar (opsiyonel)
        const files = (fd.getAll('files') as File[]).filter(Boolean)
        for (const f of files) {
            if (f.size > MAX_FILE_MB * 1024 * 1024) {
                setState({ status: 'error', message: `“${f.name}” ${MAX_FILE_MB}MB sınırını aşıyor.` })
                return
            }
            const isAi = f.name.toLowerCase().endsWith('.ai')
            const typeOk = (OK_FILE_TYPES as readonly string[]).includes(f.type) || isAi
            if (!typeOk) {
                setState({ status: 'error', message: `“${f.name}” desteklenmeyen dosya türü.` })
                return
            }
        }

        fd.append('urunler_json', JSON.stringify(qty))

        setState({ status: 'sending' })
        try {
            const res = await fetch('/api/order', { method: 'POST', body: fd })
            const json = await res.json().catch(() => ({}))
            if (!res.ok || !json?.ok) throw new Error(json?.error || 'Gönderim hatası')
            setState({ status: 'ok' })
            form.reset()
            setQty({})
            setQtyText({})
        } catch (err: any) {
            setState({ status: 'error', message: err?.message || 'Bir hata oluştu' })
        }
    }

    return (
        <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sipariş Formu</h1>
            <p className="mt-2 text-gray-600">Bilgilerinizi iletin, 24 saat içinde size dönüş yapalım.</p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
                {/* Ad Soyad */}
                <label className="grid gap-1 text-sm">
                    <span className="font-medium">Ad Soyad</span>
                    <input
                        name="adsoyad"
                        required
                        autoComplete="name"
                        className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
                        placeholder="Adınız ve Soyadınız"
                    />
                </label>

                {/* Telefon */}
                <label className="grid gap-1 text-sm">
                    <span className="font-medium">Telefon Numarası</span>
                    <input
                        name="telefon"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="05xx xxx xx xx"
                        className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
                    />
                </label>

                {/* E-posta */}
                <label className="grid gap-1 text-sm">
                    <span className="font-medium">E-Posta Adresi</span>
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="ornek@eposta.com"
                        className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
                    />
                </label>

                {/* Ürünler */}
                <fieldset className="grid gap-2">
                    <legend className="text-sm font-medium">İstenilen Ürün(ler) ve Adet(ler)</legend>

                    <div className="grid gap-2">
                        {URUNLER.map((u) => {
                            const checked = u.key in qty
                            return (
                                <div
                                    key={u.key}
                                    className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2"
                                >
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="accent-[var(--brand)]"
                                            checked={checked}
                                            onChange={(ev) => toggleProduct(u.key, ev.currentTarget.checked)}
                                        />
                                        <span className="text-sm">{u.label}</span>
                                    </label>

                                    {checked && (
                                        <div className="flex items-center">
                                            <div className="flex items-center bg-[#33258C] text-white rounded-full pl-4 pr-2 py-1.5">
                                                <span className="text-xs font-semibold mr-2">Adet</span>
                                                <input
                                                    type="tel"
                                                    inputMode="numeric"
                                                    value={qtyText[u.key] ?? ''}          // başlangıçta boş
                                                    onFocus={(e) => e.currentTarget.select()}
                                                    onChange={(e) => changeQty(u.key, e.target.value)}
                                                    className="w-24 rounded-md bg-white text-black px-2 py-1 text-right outline-none border-0"
                                                    placeholder={`${MIN_QTY}`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-xs text-gray-500 mt-1">Her ürün için minimum {MIN_QTY} adettir.</p>
                </fieldset>

                {/* Mesaj */}
                <label className="grid gap-1 text-sm">
                    <span className="font-medium">Mesaj</span>
                    <textarea
                        name="mesaj"
                        rows={4}
                        placeholder="Notlarınız / talepleriniz…"
                        className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
                    />
                </label>

                {/* Dosya yükleme */}
                <div className="grid gap-1 text-sm">
                    <span className="font-medium">Logo / Dosya Yükleme (opsiyonel)</span>
                    <input
                        name="files"
                        type="file"
                        multiple
                        accept=".pdf,.ai,.jpg,.jpeg,.png,.tif,.tiff,application/pdf,image/jpeg,image/png,image/tiff"
                        className="rounded-2xl border px-3 py-2 file:mr-3 file:rounded-xl file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 hover:file:bg-gray-200"
                    />
                    <p className="text-xs text-gray-500">
                        Maks. {MAX_FILE_MB} MB. Desteklenen: PDF, AI, JPG, PNG, TIFF.
                    </p>
                </div>

                {/* Gönder */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={state.status === 'sending'}
                        className="group relative overflow-hidden inline-flex items-center justify-center rounded-full px-6 py-2.5 min-w-[200px] text-sm font-medium shadow-sm text-white disabled:opacity-60"
                        style={{ background: 'var(--brand)' }}
                        aria-busy={state.status === 'sending'}
                    >
                        <span className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full" />
                        <span className="relative z-10 group-hover:text-black">
              {state.status === 'sending' ? 'Gönderiliyor…' : 'Formu Gönder'}
            </span>
                    </button>
                </div>

                {state.status === 'ok' && (
                    <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                        Talebiniz başarıyla alınmıştır. 24 saat içerisinde size dönüş sağlanacaktır.
                    </div>
                )}
                {state.status === 'error' && (
                    <div className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                        {state.message || 'Gönderim sırasında bir hata oluştu.'}
                    </div>
                )}
            </form>
        </main>
    )
}