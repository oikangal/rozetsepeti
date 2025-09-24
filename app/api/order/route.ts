// app/api/order/route.ts
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function envOrThrow(name: string) {
    const v = process.env[name]
    if (!v) throw new Error(`Missing env ${name}`)
    return v
}

export async function POST(req: Request) {
    try {
        // 1) ENV
        const host = envOrThrow('MAILTRAP_HOST')
        const port = Number(envOrThrow('MAILTRAP_PORT'))
        const user = envOrThrow('MAILTRAP_USER')
        const pass = envOrThrow('MAILTRAP_PASS')

        // ✅ Mail doğrudan info@rozetsepeti.com adresine gidecek
        const to = 'info@rozetsepeti.com'

        // 2) Form verisi
        const fd = await req.formData()
        const adsoyad = String(fd.get('adsoyad') || '')
        const telefon = String(fd.get('telefon') || '')
        const email   = String(fd.get('email')   || '')
        const adet    = String(fd.get('adet')    || '')
        const mesaj   = String(fd.get('mesaj')   || '')
        const urunler = fd.getAll('urunler').map(String)

        // 3) Dosyalar → attachments
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

        // 4) Transport
        const transporter = nodemailer.createTransport({
            host,
            port,
            auth: { user, pass },
        })

        // 5) Gövde
        const html = `
      <h2>Yeni Sipariş Talebi</h2>
      <p><b>Ad Soyad:</b> ${escapeHtml(adsoyad)}</p>
      <p><b>Telefon:</b> ${escapeHtml(telefon)}</p>
      <p><b>E-posta:</b> ${escapeHtml(email)}</p>
      <p><b>İstenilen Ürün(ler):</b> ${urunler.map(escapeHtml).join(', ') || '-'}</p>
      <p><b>Adet:</b> ${escapeHtml(adet)}</p>
      <p><b>Mesaj:</b><br/>${escapeHtml(mesaj).replace(/\n/g, '<br/>') || '-'}</p>
    `.trim()

        // 6) Gönder
        const info = await transporter.sendMail({
            from: `"RozetSepeti Site" <no-reply@rozetsepeti.com>`,
            to,
            subject: `Yeni Sipariş Talebi – ${adsoyad || 'İsimsiz'}`,
            html,
            attachments,
            replyTo: email || undefined,
        })

        return Response.json({ ok: true, id: info.messageId })
    } catch (err: any) {
        console.error('ORDER_API_ERROR:', err?.message || err)
        return new Response(
            JSON.stringify({ ok: false, error: err?.message || 'Server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}

// XSS kaçışı
function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[m] as string))
}