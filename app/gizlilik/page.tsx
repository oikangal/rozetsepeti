// app/gizlilik/page.tsx
export default function GizlilikPage() {
    return (
        <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Gizlilik Politikası
            </h1>
            <div className="prose prose-sm sm:prose lg:prose-lg">
                <p><strong>Son güncelleme:</strong> 25 Eylül 2025</p>
                <p>
                    Rozetsepeti olarak müşterilerimizin gizliliğine önem veriyoruz.
                    Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya ürün
                    satın aldığınızda topladığımız bilgiler, bu bilgilerin nasıl
                    kullanıldığı ve korunmasıyla ilgilidir.
                </p>

                <h2>1. Toplanan Bilgiler</h2>
                <ul>
                    <li>Ad, soyad, telefon numarası, e-posta adresi, teslimat adresi</li>
                    <li>Sipariş detayları (ürün, adet, ödeme bilgileri)</li>
                    <li>Çerezler (cookie) ve kullanım verileri</li>
                </ul>

                <h2>2. Bilgilerin Kullanımı</h2>
                <p>Toplanan bilgiler şu amaçlarla kullanılır:</p>
                <ul>
                    <li>Siparişlerin hazırlanması ve teslim edilmesi</li>
                    <li>Müşteri desteği sağlanması</li>
                    <li>Kampanya ve indirim duyurularının yapılması (onay ile)</li>
                    <li>Site deneyiminin geliştirilmesi</li>
                </ul>

                <h2>3. Bilgilerin Paylaşımı</h2>
                <p>
                    Müşteri bilgileri yalnızca siparişin yerine getirilmesi için gerekli
                    durumlarda (ör. kargo şirketi) üçüncü taraflarla paylaşılır.
                    Yasal zorunluluklar dışında paylaşılmaz.
                </p>

                <h2>4. Güvenlik</h2>
                <p>
                    Kişisel bilgileriniz SSL sertifikası ile korunur ve yalnızca yetkili
                    personel tarafından erişilebilir.
                </p>

                <h2>5. Haklarınız</h2>
                <ul>
                    <li>Kişisel verilerinize erişme</li>
                    <li>Bilgilerinizi düzeltme veya silme</li>
                    <li>İletişim listemizden çıkma</li>
                </ul>

                <h2>6. İletişim</h2>
                <p>
                    Sorularınız için: <br />
                    📧 <a href="mailto:info@rozetsepeti.com">info@rozetsepeti.com</a> <br />
                    📞 0850 346 44 84
                </p>
            </div>
        </main>
    )
}