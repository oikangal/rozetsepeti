// app/gizlilik-politikasi/page.tsx
export const metadata = {
    title: 'Gizlilik Politikası | RozetSepeti',
    description: 'RozetSepeti gizlilik politikası ve kişisel verilerin korunması.',
}

export default function GizlilikPolitikasiPage() {
    return (
        <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gizlilik Politikası</h1>
            <p className="mt-3 text-gray-700 text-sm">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <div className="prose prose-sm sm:prose-base max-w-none mt-6">
                <h2>1. Topladığımız Bilgiler</h2>
                <p>
                    Sipariş ve iletişim formlarımız aracılığıyla ad–soyad, e-posta adresi, telefon numarası ve talebinize
                    ilişkin mesaj/dosya gibi bilgileri toplarız. Bu bilgiler hizmet sunmak ve size geri dönüş yapmak için kullanılır.
                </p>

                <h2>2. Kullanım Amaçları</h2>
                <ul>
                    <li>Sipariş ve fiyatlandırma süreçlerini yürütmek</li>
                    <li>Destek ve müşteri iletişimini sağlamak</li>
                    <li>Yasal yükümlülükleri yerine getirmek</li>
                </ul>

                <h2>3. Saklama Süresi</h2>
                <p>
                    Yasal yükümlülükler ve iş süreçlerimizin gerektirdiği süre boyunca verileri saklarız; amaç ortadan kalktığında veya talep edilmesi halinde sileriz/anonymize ederiz.
                </p>

                <h2>4. Üçüncü Taraflarla Paylaşım</h2>
                <p>
                    Zorunlu olduğu hallerde (barındırma, e-posta gönderimi vb.) hizmet sağlayıcılarımızla asgari düzeyde paylaşım yapabiliriz.
                    Yasal talepler olması halinde yetkili mercilerle paylaşım yapılabilir.
                </p>

                <h2>5. Haklarınız</h2>
                <p>
                    Kişisel verilerinize erişme, düzeltme, silme ve işlemeyi kısıtlama gibi haklara sahipsiniz. Talepleriniz için bizimle iletişime geçebilirsiniz.
                </p>

                <h2>6. İletişim</h2>
                <p>
                    Sorularınız için: <a href="mailto:info@rozetsepeti.com">info@rozetsepeti.com</a> — Tel: <a href="tel:08503464484">0850 346 44 84</a>
                </p>
            </div>
        </main>
    )
}