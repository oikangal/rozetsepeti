// app/api/order/route.ts
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const env = (k: string) => {
    const v = process.env[k]
    if (!v) throw new Error(`Missing env ${k}`)
    return v
}

export async function POST(req: Request) {
    try {
        // SMTP
        const transporter = nodemailer.createTransport({
            host: env('SMTP_HOST'),
            port: Number(env('SMTP_PORT')),
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
        })

        const fd = await req.formData()

        const adsoyad = String(fd.get('adsoyad') || '')
        const telefon = String(fd.get('telefon') || '')
        const email   = String(fd.get('email')   || '')
        const mesaj   = String(fd.get('mesaj')   || '')

        // Yeni: ürünler+adetler JSON
        let urunMap: Record<string, number> = {}
        try {
            urunMap = JSON.parse(String(fd.get('urunler_json') || '{}'))
        } catch {}

        // attachments (opsiyonel)
        const files = fd.getAll('files') as File[]
        const attachments = await Promise.all(
            files.filter(Boolean).map(async (f) => {
                const ab = await f.arrayBuffer()
                return {
                    filename: f.name || 'dosya',
                    content: Buffer.from(ab),
                    contentType: f.type || undefined,
                }
            })
        )

        // ürün satırları
        const urunSatirlari = Object.entries(urunMap)
            .map(([k, n]) => `• ${k} – ${n} adet`)
            .join('<br/>') || '-'

        const html = `
      <h2>Yeni Sipariş Talebi</h2>
      <p><b>Ad Soyad:</b> ${esc(adsoyad)}</p>
      <p><b>Telefon:</b> ${esc(telefon)}</p>
      <p><b>E-posta:</b> ${esc(email)}</p>
      <p><b>Ürünler:</b><br/>${urunSatirlari}</p>
      <p><b>Mesaj:</b><br/>${esc(mesaj).replace(/\n/g, '<br/>') || '-'}</p>
    `.trim()

        const info = await transporter.sendMail({
            from: env('MAIL_FROM'),
            to:   env('MAIL_TO'),
            subject: `Yeni Sipariş Talebi – ${adsoyad || 'İsimsiz'}`,
            html,
            replyTo: email || undefined,
            attachments,
        })

        return Response.json({ ok: true, id: info.messageId })
    } catch (err: any) {
        console.error('ORDER_API_ERROR:', err?.message || err)
        return new Response(JSON.stringify({ ok: false, error: err?.message || 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

const esc = (s: string) =>
    s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] as string))