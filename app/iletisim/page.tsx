'use client'
import { useState } from 'react'

export default function ContactPage(){
  const [sent, setSent] = useState(false)
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">İletişim</h1>
      {!sent ? (
        <form onSubmit={(e)=>{ e.preventDefault(); setSent(true) }} className="grid gap-3">
          <input className="border rounded-lg p-2" placeholder="Ad Soyad" required />
          <input className="border rounded-lg p-2" placeholder="E-posta" type="email" required />
          <input className="border rounded-lg p-2" placeholder="Telefon (opsiyonel)" />
          <input className="border rounded-lg p-2" placeholder="Konu" />
          <textarea className="border rounded-lg p-2 h-28" placeholder="Mesaj" required />
          <button className="rounded-xl bg-primary-700 text-white px-4 py-2 hover:bg-primary-600">Gönder</button>
        </form>
      ) : (
        <div className="rounded-xl border p-4 bg-green-50">Mesajınız simülasyon olarak gönderildi. Yayın aşamasında form entegrasyonu eklenecek.</div>
      )}
    </div>
  )
}
