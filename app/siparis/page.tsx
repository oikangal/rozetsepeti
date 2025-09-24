// app/siparis/page.tsx
'use client'

import { useState } from 'react'

type SubmitState = { status: 'idle'|'sending'|'ok'|'error'; message?: string }

const URUNLER = [
  { key: 'akrilik-rozet', label: 'Akrilik Rozet' },
  { key: 'kumas-anahtarlik', label: 'Kumaş Anahtarlık' },
  { key: 'yaka-isimligi', label: 'Yaka İsimliği' },
  { key: 'akrilik-anahtarlik', label: 'Akrilik Anahtarlık' },
]

export default function SiparisPage() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    // Dosya kontrolü (tip + 20MB limit)
    const files = (fd.getAll('files') as File[]).filter(Boolean)
    for (const f of files) {
      if (f.size > 20 * 1024 * 1024) {
        setState({ status: 'error', message: `“${f.name}” 20MB sınırını aşıyor.` })
        return
      }
      const okTypes = [
        'application/pdf','image/jpeg','image/png','image/tiff',
        'image/jpg','application/postscript','application/illustrator',
        'application/vnd.adobe.illustrator'
      ]
      if (!okTypes.some(t => f.type === t || f.name.toLowerCase().endsWith('.ai'))) {
        setState({ status: 'error', message: `“${f.name}” desteklenmeyen dosya türü.` })
        return
      }
    }

    setState({ status: 'sending' })
    try {
      const res = await fetch('/api/order', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Gönderim hatası')
      setState({ status: 'ok' })
      form.reset()
    } catch (err: any) {
      setState({ status: 'error', message: err?.message || 'Bir hata oluştu' })
    }
  }

  return (
    <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sipariş Formu</h1>
      <p className="mt-2 text-gray-600">Bilgilerinizi iletin, 24 saat içinde size dönüş yapalım.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        {/* Ad Soyad */}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Ad Soyad</span>
          <input
            name="adsoyad" required
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
            placeholder="Adınız ve Soyadınız"
          />
        </label>

        {/* Telefon */}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Telefon Numarası</span>
          <input
            name="telefon" required inputMode="tel" placeholder="05xx xxx xx xx"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
          />
        </label>

        {/* E-posta */}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">E-Posta Adresi</span>
          <input
            name="email" type="email" required placeholder="ornek@eposta.com"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
          />
        </label>

        {/* Ürün/Ürünler */}
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">İstenilen Ürün/Ürünler</legend>
          <div className="grid sm:grid-cols-2 gap-2">
            {URUNLER.map(u => (
              <label key={u.key} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 cursor-pointer hover:border-[var(--brand)]">
                <input type="checkbox" name="urunler" value={u.key} className="accent-[var(--brand)]" />
                <span className="text-sm">{u.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Adet */}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">İstenilen Adet</span>
          <input
            name="adet" type="number" min={1} required placeholder="Örn. 100"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
          />
        </label>

        {/* Mesaj */}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Mesaj</span>
          <textarea
            name="mesaj" rows={4} placeholder="Notlarınız / talepleriniz…"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
          />
        </label>

        {/* Dosya yükleme */}
        <div className="grid gap-1 text-sm">
          <span className="font-medium">Logo / Dosya Yükleme</span>
          <input
            name="files" type="file" multiple
            accept=".pdf,.ai,.jpg,.jpeg,.png,.tif,.tiff,application/pdf,image/jpeg,image/png,image/tiff"
            className="rounded-2xl border px-3 py-2 file:mr-3 file:rounded-xl file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 hover:file:bg-gray-200"
          />
          <p className="text-xs text-gray-500">Maks. 20 MB. Desteklenen: PDF, AI, JPG, PNG, TIFF.</p>
        </div>

        {/* Gönder butonu */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={state.status === 'sending'}
            className="
              group relative overflow-hidden
              inline-flex items-center justify-center
              rounded-full px-6 py-2.5 min-w-[200px]
              text-sm font-medium shadow-sm text-white
            "
            style={{ background: 'var(--brand)' }}
          >
            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full" />
            <span className="relative z-10 group-hover:text-black">
              {state.status === 'sending' ? 'Gönderiliyor…' : 'Formu Gönder'}
            </span>
          </button>
        </div>

        {/* Durum mesajları */}
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