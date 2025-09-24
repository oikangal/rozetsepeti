// src/components/InstagramFeed.tsx
'use client'

export default function InstagramFeed() {
  return (
    <section className="mt-10">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık + CTA */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Instagram’dan ilham alın
          </h2>
          <a
            href="https://instagram.com/rozetsepeti" // gerçek hesabı burada güncelleriz
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm"
            style={{ background: 'var(--brand)' }}
          >
            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#F9B233] transition-all duration-300 ease-out group-hover:h-full" />
            <span className="relative z-10 group-hover:text-black">
              Bizi takip edin
            </span>
          </a>
        </div>

        {/* Grid (şimdilik mock kutucuklar) */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <a
              key={i}
              href="#"
              className="
                group relative block aspect-square rounded-xl overflow-hidden
                bg-gradient-to-br from-gray-100 to-gray-200
                border border-black/5
              "
              aria-label="Instagram gönderisi (örnek)"
            >
              {/* İçerik (mock) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-sm">IG</span>
              </div>

              {/* Hover efekt */}
              <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-300" />

              {/* Alt sol köşede hafif etiket (mock) */}
              <div className="absolute left-2 bottom-2 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] text-gray-700">
                @rozetsepeti
              </div>
            </a>
          ))}
        </div>

        {/* Küçük not */}
        <p className="mt-3 text-xs text-gray-500">
          Bu alan şu an <strong>mock</strong> verilerle gösteriliyor. Bir sonraki adımda Instagram verisine bağlayacağız.
        </p>
      </div>
    </section>
  )
}