// app/api/order/route.ts
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'        // Edge değil; Node gerekir
export const dynamic = 'force-dynamic' // Önbelleğe alma

function env(name: string, fallback?: string) {
    const v = process.env[name] ?? fallback
    if (!v) throw new Error(`Missing env: ${name}`)
    return v
}

export async function POST(req: Request) {
    try {
        const form = await req.formData()

        // ---- Alanlar
        const adsoyad = String(form.get('adsoyad') || '')
        const telefon = String(form.get('telefon') || '')
        const email   = String(form.get('email')   || '')
        const adetRaw = String(form.get('adet')    || '')
        const mesaj   = String(form.get('mesaj')   || '')
        const urunler = form.getAll('urunler').map(String) // çoklu checkbox

        const adet = parseInt(adetRaw, 10)
        if (!adsoyad || !telefon || !email || !Number.isFinite(adet) || adet < 10) {
            return Response.json({ ok: false, error: 'Geçersiz veya eksik alanlar.' }, { status: 400 })
        }

        // ---- Dosyalar
        const files = form.getAll('files').filter(Boolean) as File[]
        const attachments = await Promise.all(
            files.map(async (f) => ({
                filename: f.name || 'dosya',
                content: Buffer.from(await f.arrayBuffer()),
                contentType: f.type || undefined,
            }))
        )

        // ---- Mail transporter (Mailtrap SMTP)
        const transporter = nodemailer.createTransport({
            host: env('MAIL_HOST', 'sandbox.smtp.mailtrap.io'),
            port: parseInt(env('MAIL_PORT', '2525'), 10),
            auth: {
                user: env('MAIL_USER'),
                pass: env('MAIL_PASS'),
            },
        })

        // ---- E-posta içeriği
        const to = env('MAIL_TO') // Mailtrap inbox alıcısı (veya kendi mailin)
        const subject = `Yeni Sipariş Talebi · ${adsoyad} · ${urunler.join(', ') || 'Ürün seçilmedi'}`
        const html = `
      <h2>Yeni Sipariş Talebi</h2>
      <ul>
        <li><b>Ad Soyad:</b> ${escapeHtml(adsoyad)}</li>
        <li><b>Telefon:</b> ${escapeHtml(telefon)}</li>
        <li><b>E-posta:</b> ${escapeHtml(email)}</li>
        <li><b>Ürünler:</b> ${urunler.map(escapeHtml).join(', ') || '-'}</li>
        <li><b>Adet:</b> ${adet}</li>
      </ul>
      <p><b>Mesaj:</b><br/>${escapeHtml(mesaj).replace(/\n/g, '<br/>') || '-'}</p>
      <p style="color:#888;font-size:12px">Site: rozetsepeti.com</p>
    `.trim()

        await transporter.sendMail({
            from: `"RozetSepeti Form" <no-reply@rozetsepeti.com>`,
            to,
            subject,
            html,
            attachments,
            replyTo: email || undefined,
        })

        return Response.json({ ok: true })
    } catch (err: any) {
        console.error('ORDER_API_ERROR:', err)
        return Response.json({ ok: false, error: 'Sunucu hatası' }, { status: 500 })
    }
}

// Basit XSS/HTML escape
function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (ch) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[ch]
    )
}