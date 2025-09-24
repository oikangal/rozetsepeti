# RozetSepeti — Next.js + Tailwind Skeleton

Bu proje, statik tanıtım sitesi + mini hesaplayıcı placeholder'ı ile başlar.
**Tamamen responsive** ve localhost'ta çalışmaya hazırdır.

## Kurulum (Mac / Windows / Linux)
1) Node.js 18+ kurulu olduğundan emin olun (`node -v`).
2) Klasörü açın ve bağımlılıkları kurun:
```bash
npm install
```
3) Geliştirme sunucusunu başlatın:
```bash
npm run dev
```
4) Tarayıcıdan açın: http://localhost:3000

## Sayfalar
- `/` — Ana Sayfa (yatay bannerlar + collapsible + mini hesaplayıcı)
- `/urunler/[slug]` — Ürün Sayfası (4 ürün: akrilik-rozet, kumas-anahtarlik, yaka-isimligi, akrilik-anahtarlik)
- `/iletisim` — İletişim (mock form)

## Notlar
- Görseller `public/images` altında, SVG placeholder olarak eklendi.
- MiniCalculator şu an demo; Sprint 2'de `pricing.json` ve gerçek hesaplamalar eklenecek.
- Header/Footer, mobil menü dahil, erişilebilirlik odaklıdır.
