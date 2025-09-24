// app/api/send-mail/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type Payload = {
    name?: string
    phone?: string
    email?: string
    products?: string[]        // checkbox’lardan gelebilir
    quantity?: number | string // adet
    message?: string
}

export async function POST(req: Request) {
    try {
        // JSON bekliyoruz (dosya/ek işleri bir sonraki adımda)
        const data = (await req.json()) as Payload

        const name = (data.name || '').trim()
        const phone = (data.phone || '').trim()
        const email = (data.email || '').trim()
        const products = Array.isArray(data.products) ? data.products : []
        const quantity = Number(data.quantity || 0)
        const message = (data.message || '').trim()

        // Basit doğrulama
        if (!name || !phone || !email) {
            return NextResponse.json(
                { ok: false, error: 'Lütfen ad, telefon ve e-posta girin.' },
                { status: 400 }
            )
        }

        // Mailtrap transporter (ENV’den)
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT || 2525),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        })

        const to = process.env.MAIL_TO || 'info@rozetsepeti.com'

        const subject = `Yeni talep: ${name} (${quantity || '-'} adet)`
        const lines = [
            `Ad Soyad: ${name}`,
            `Telefon: ${phone}`,
            `E-posta: ${email}`,
            `İstenilen Ürün/Ürünler: ${products.length ? products.join(', ') : '-'}`,
            `İstenilen Adet: ${quantity || '-'}`,
            '',
            'Mesaj:',
            message || '-',
        ]
        const textBody = lines.join('\n')

        const htmlBody = `
      <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
        <h2 style="margin:0 0 8px">Yeni Talep</h2>
        <p><b>Ad Soyad:</b> ${escapeHtml(name)}</p>
        <p><b>Telefon:</b> ${escapeHtml(phone)}</p>
        <p><b>E-posta:</b> ${escapeHtml(email)}</p>
        <p><b>İstenilen Ürün/Ürünler:</b> ${products.length ? products.map(escapeHtml).join(', ') : '-'}</p>
        <p><b>İstenilen Adet:</b> ${quantity || '-'}</p>
        <p><b>Mesaj:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>') || '-'}</p>
      </div>
    `

        await transporter.sendMail({
            from: '"RozetSepeti Form" <no-reply@rozetsepeti.com>',
            to,
            subject,
            text: textBody,
            html: htmlBody,
        })

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error('send-mail error', err)
        return NextResponse.json(
            { ok: false, error: 'Mail gönderirken bir sorun oluştu.' },
            { status: 500 }
        )
    }
}

// Basit XSS kaçışı
function escapeHtml(str: string) {
    return str
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')
}