export type Tier = { min: number; unit: number } // min adet ve birim fiyat (TL)

export type ProductKey =
  | 'akrilik-rozet'
  | 'kumas-anahtarlik'
  | 'yaka-isimligi'
  | 'akrilik-anahtarlik'

/**
 * NOT: Birim fiyatlar KDV hariçtir. PriceCalculator toplamda %20 KDV ekler.
 * min değerleri küçükten büyüğe sıralı olmalı.
 */
export const PRICING_TABLES: Record<ProductKey, Tier[]> = {
  // ——— Akrilik Rozet (DEĞİŞMEDİ) ———
  'akrilik-rozet': [
    { min: 10,  unit: 135 }, // 10–19
    { min: 20,  unit: 115 }, // 20–49
    { min: 50,  unit: 95  }, // 50–99
    { min: 100, unit: 65  }, // 100–249
    { min: 250, unit: 60  }, // 250+
  ],

  // ——— Kumaş Anahtarlık (GÜNCEL) ———
  'kumas-anahtarlik': [
    { min: 10,  unit: 125 }, // 10–49
    { min: 50,  unit: 105 }, // 50–99
    { min: 100, unit: 90  }, // 100–499
    { min: 500, unit: 75  }, // 500+
  ],

  // ——— Yaka İsimliği (GÜNCEL) ———
  'yaka-isimligi': [
    { min: 10,  unit: 125 }, // 10–49
    { min: 50,  unit: 105 }, // 50–99
    { min: 100, unit: 90  }, // 100–499
    { min: 500, unit: 75  }, // 500+
  ],

  // ——— Akrilik Anahtarlık (GÜNCEL) ———
  'akrilik-anahtarlik': [
    { min: 10,  unit: 125 }, // 10–49
    { min: 50,  unit: 105 }, // 50–99
    { min: 100, unit: 90  }, // 100–499
    { min: 500, unit: 75  }, // 500+
  ],
}