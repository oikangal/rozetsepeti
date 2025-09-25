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

const OK_FILE_TYPES = ['application/pdf','image/jpeg','image/png','image/tiff'] as const
const MAX_FILE_MB = 20
const MIN_QTY = 10

export default function SiparisPage() {
    const [state, setState] = useState<SubmitState>({ status: 'idle' })

    // 🔵 DOLU ALAN KONTÜRÜ için basit durumlar
    const [adsoyad, setAdsoyad] = useState('')
    const [telefon, setTelefon] = useState('')
    const [email, setEmail]     = useState('')
    const [mesaj, setMesaj]     = useState('')

    // adet mantığı (yazarken serbest, blur’da min 10)
    const [qty, setQty] = useState<Record<string, number>>({})
    const [qtyText, setQtyText] = useState<Record<string, string>>({})

    const toggleProduct = (key: string, checked: boolean) => {
        if (checked) {
            setQty((p) => ({ ...p, [key]: p[key] ?? MIN_QTY }))
            setQtyText((t) => ({ ...t, [key]: '' })) // başlangıçta boş görünsün
        } else {
            setQty((p) => { const n = { ...p }; delete n[key]; return n })
            setQtyText((t) => { const n = { ...t }; delete n[key]; return n })
        }
    }

    const onQtyChange = (key: string, raw: string) => {
        const cleaned = raw.replace(/\D/g, '').slice(0, 6)
        setQtyText((t) => ({ ...t, [key]: cleaned }))
        const n = cleaned === '' ? NaN : parseInt(cleaned, 10)
        setQty((p) => ({ ...p, [key]: Number.isFinite(n) ? n : MIN_QTY }))
    }

    const onQtyBlur = (key: string) => {
        const current = qtyText[key] ?? ''
        const n = current === '' ? NaN : parseInt(current, 10)
        const fixed = !Number.isFinite(n) ? MIN_QTY : Math.max(MIN_QTY, n as number)
        setQty((p) => ({ ...p, [key]: fixed }))
        setQtyText((t) => ({ ...t, [key]: String(fixed) }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)

        const chosen = Object.entries(qty).filter(([, n]) => Number.isFinite(n) && n >= MIN_QTY)
        if (chosen.length === 0) {
            setState({ status: 'error', message: `Lütfen en az bir ürün seçip en az ${MIN_QTY} adet girin.` })
            return
        }

        const files = (fd.getAll('files') as File[]).filter(Boolean)
        for (const f of files) {
            if (f.size > MAX_FILE_MB * 1024 * 1024) {
                setState({ status: 'error', message: `“${f.name}” ${MAX_FILE_MB}MB sınırını aşıyor.` }); return
            }
            const isAi = f.name.toLowerCase().endsWith('.ai')
            const typeOk = (OK_FILE_TYPES as readonly string[]).includes(f.type) || isAi
            if (!typeOk) { setState({ status: 'error', message: `“${f.name}” desteklenmeyen dosya türü.` }); return }
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
            // dolu alan kontürü için tuttuğumuz değerleri de sıfırla
            setAdsoyad(''); setTelefon(''); setEmail(''); setMesaj('')
        } catch (err: any) {
            setState({ status: 'error', message: err?.message || 'Bir hata oluştu' })
        }
    }

    // 🔵 ortak sınıflar — dolu/boş durumuna göre kontür rengi
    const baseInput =
        'rounded-2xl border-2 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30'
    const borderOf = (filled: boolean) => (filled ? 'border-[var(--brand)]' : 'border-gray-300')

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
                        onChange={(e) => setAdsoyad(e.target.value)}
                        className={`${baseInput} ${borderOf(adsoyad.trim().length > 0)}`}
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
                        onChange={(e) => setTelefon(e.target.value)}
                        className={`${baseInput} ${borderOf(telefon.trim().length > 0)}`}
                        placeholder="05xx xxx xx xx"
                    />
                </label>

                {/* E-Posta */}
                <label className="grid gap-1 text-sm">
                    <span className="font-medium">E-Posta Adresi</span>
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${baseInput} ${borderOf(email.trim().length > 0)}`}
                        placeholder="ornek@eposta.com"
                    />
                </label>

                {/* Ürün(ler) ve Adet(ler) */}
                <fieldset className="grid gap-2">
                    <legend className="text-sm font-medium">İstenilen Ürün(ler) ve Adet(ler)</legend>

                    <div className="grid gap-2">
                        {URUNLER.map((u) => {
                            const checked = u.key in qty
                            return (
                                <div key={u.key} className="flex items-center justify-between gap-3 rounded-2xl border-2 border-gray-300 px-3 py-2">
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
                                                    value={qtyText[u.key] ?? ''}
                                                    onChange={(e) => onQtyChange(u.key, e.target.value)}
                                                    onBlur={() => onQtyBlur(u.key)}
                                                    onFocus={(e) => e.currentTarget.select()}
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
                        onChange={(e) => setMesaj(e.target.value)}
                        className={`rounded-2xl border-2 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 ${borderOf(mesaj.trim().length > 0)}`}
                        placeholder="Notlarınız / talepleriniz…"
                    />
                </label>

                {/* Dosya (opsiyonel) — burada kontür sabit gri kalıyor */}
                <div className="grid gap-1 text-sm">
                    <span className="font-medium">Logo / Dosya Yükleme (opsiyonel)</span>
                    <input
                        name="files"
                        type="file"
                        multiple
                        accept=".pdf,.ai,.jpg,.jpeg,.png,.tif,.tiff,application/pdf,image/jpeg,image/png,image/tiff"
                        className="rounded-2xl border-2 border-gray-300 px-3 py-2 file:mr-3 file:rounded-xl file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 hover:file:bg-gray-200"
                    />
                    <p className="text-xs text-gray-500">Maks. {MAX_FILE_MB} MB. Desteklenen: PDF, AI, JPG, PNG, TIFF.</p>
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