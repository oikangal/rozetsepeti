'use client'
import { useState } from 'react'

export default function MiniCalculator(){
  const [diameter, setDiameter] = useState(32)
  const [qty, setQty] = useState(100)
  const area = Math.PI * Math.pow(diameter/2, 2) / 100 // cm^2 basit varsayım
  const base = Math.max(250, area * 0.18 * qty)
  const price = Math.round(base)

  return (
    <div className="grid gap-3 sm:grid-cols-3 items-end">
      <label className="block">
        <span className="block text-sm text-gray-600">Çap (mm)</span>
        <input type="number" min={20} max={90} value={diameter}
              onChange={e=>setDiameter(parseInt(e.target.value || '0'))}
              className="mt-1 w-full rounded-lg border p-2" />
      </label>
      <label className="block">
        <span className="block text-sm text-gray-600">Adet</span>
        <input type="number" min={10} step={10} value={qty}
              onChange={e=>setQty(parseInt(e.target.value || '0'))}
              className="mt-1 w-full rounded-lg border p-2" />
      </label>
      <div className="p-3 rounded-lg bg-gray-50 border">
        <div className="text-xs text-gray-500">Hızlı Tahmin</div>
        <div className="text-lg font-semibold">≈ {price.toLocaleString('tr-TR')} TL</div>
      </div>
    </div>
  )
}
