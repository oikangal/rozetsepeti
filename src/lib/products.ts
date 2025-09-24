export type Product = {
  slug: string
  title: string
  subtitle: string
  heroImg: string
}

export const PRODUCTS: Product[] = [
  { slug: 'akrilik-rozet', title: 'Akrilik Rozet', subtitle: 'Dayanıklı akrilik, parlak baskı', heroImg: '/images/akrilik-rozet.svg' },
  { slug: 'kumas-anahtarlik', title: 'Kumaş Anahtarlık', subtitle: 'Yumuşak dokulu, günlük kullanım', heroImg: '/images/kumas-anahtarlik.svg' },
  { slug: 'yaka-isimligi', title: 'Yaka İsimliği', subtitle: 'Profesyonel görünüm, farklı sabitleme', heroImg: '/images/yaka-isimligi.svg' },
  { slug: 'akrilik-anahtarlik', title: 'Akrilik Anahtarlık', subtitle: 'Şeffaf ve canlı, kişiselleştirilebilir', heroImg: '/images/akrilik-anahtarlik.svg' },
]
