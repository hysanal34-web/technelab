# English Drama Youth SEO derinleştirme · 8 Ekim 2026

Konumlandırma: **İngilizcesi zaten olan çocuk (B1+) için İngilizce yaratıcı alan.** Hedef kitle: yabancı ve karma aileler, uluslararası okul öğrencileri, iki dilli çocuklar, okul İngilizcesi güçlü olup kullanacak yer bulamayan Türk çocuklar. Vaat: yaratıcılık (aylık yaratıcı yazarlık, tasarım, jazz dance atölyeleri) ve konuşmada akıcılık; seviye atlaması vaadi yok.

## Bulunan hatalar (düzeltildi)
| Yer | Yanlış | Doğru |
|---|---|---|
| /en/drama-classes-for-kids-istanbul | "September to May", yalnız "Kadıköy studio", "programme is built around age, not English level; weak English is fine" | Ekim–Mayıs, Pera & Kadıköy, B1+ |
| /cocuklar-icin-ingilizce-drama-istanbul | "Eylül'den Mayıs'a", "Kadıköy'deki stüdyomuzda" | Ekim–Mayıs, Pera (pazar 13:00) & Kadıköy (cumartesi 15:00) |
| /gencler-icin-ingilizce-drama-istanbul | "Orta seviye yeterli", yalnız Kadıköy | B1+, Pera & Kadıköy |
| /yaratici-drama-istanbul SSS | "Eylül–Mayıs" | Ekim–Mayıs, Pera ve Kadıköy |
| 2 makale (yaş grupları, gençlerde drama) | "Eylül-Mayıs" | "Ekim-Mayıs" |

## Yapılanlar (kodda, commit edilmedi)
- **/en/drama-classes-for-kids-istanbul** baştan yazıldı: 7 bölüm (kimler için, B1 sonrası boşluk, yılın akışı, yaratıcılık, İngilizcede ne değişir, iki yaş grubu iki yaka, Türkçe bilmeyen veliler), 9 SSS, kaynak listesi, hreflang artık Türkçe karşılığa (/cocuklar-icin-ingilizce-drama-istanbul) bağlı.
- **Yeni EN makale:** /en/articles/english-drama-for-kids-teens-istanbul-parents-guide (1.470 kelime, SSS şeması, kaynaklı). Trafik stratejisinde 3. haftaya planlanan yazı öne alındı.
- **Yeni TR makale:** /makaleler/ingilizcesi-iyi-olan-cocuk-icin-ne-var (1.140 kelime). İki makale hreflang ile birbirine bağlı.
- **TR çocuk ve genç hub'ları:** B1+ konumlandırması giriş ve "kimler için"e eklendi, 4 yeni SSS (zaten iyi konuşan çocuk sıkılır mı, akıcılık, yaratıcılık, uluslararası okul/yabancı aileler), 7 satırlık kaynaklı veri bölümü, Pera semt bağlantısı, 6 ilgili yazı sabitlendi.
- **Altyapı:** EN konu sayfalarına kaynak listesi, ilgili İngilizce yazılar ve doğru hreflang; disiplin sayfalarına `enPath`, makalelere `enSlug` (TR↔EN hreflang).
- tsc temiz; tüm bağlantılar betikle kontrol edildi.

## Kullanılan veri (hepsi kaynağı açılıp okundu)
- CEFR Tablo 3 (Avrupa Konseyi): B1 "anlaşılır biçimde sürdürür, duraklamalar belirgin" / B2 "oldukça dengeli tempo".
- Galante & Thomson 2017, TESOL Quarterly: 24 Brezilyalı genç, 4 ay; drama grubunun konuşması daha akıcı ve anlaşılır bulundu, aksanda fark yok.
- Galante 2018, RELC Journal: kaygı iki grupta da düştü, drama grubunda biraz daha fazla.
- Lee vd. 2015, Review of Educational Research: 47 çalışma, olumlu etki; yazarlar tasarım zayıflığını not ediyor.
- Göç Vakfı (GİB verisi): İstanbul'da 610.221 ikamet izinli yabancı, 3 Eylül 2026.
- Kullanılmayanlar: Türkiye'deki tezler ve 2022 meta-analizi (zayıf/İngilizceye özgü değil), MEB uluslararası okul sayısı (güncel veri yok).

## Rakip boşluğu (araştırma özeti)
Bulduğumuz İngilizce çocuk dramalarından hiçbiri B1+ eşiği koymuyor: Speech Bubbles "her seviye", İngilizce Drama Atölyesi (5–15) ve Drama Akademi (5–12) İngilizceyi tanıtma odaklı, British Council Türkiye'de yüz yüze ders vermiyor. 13–17 yaş için yıl boyu süren, tamamen İngilizce gösteriyle biten başka program bulamadık. En yakın rakip Speech Bubbles (dönemlik, cumartesi, gösteri yapıyor). Arama ABD indeksliydi; Instagram ve okul içi kulüpler kapsanmadı.

## Yağız'a (sıralama ve dönüşüm için)
1. **Push + dizine ekleme iste (15 dk):** /en/drama-classes-for-kids-istanbul, iki yeni makale, /cocuklar-icin-ingilizce-drama-istanbul, /gencler-icin-ingilizce-drama-istanbul.
2. **İngilizce tanışma formu (en büyük dönüşüm engeli):** Expat veli şu an Türkçe forma düşüyor; sayfada "email or message us in English" yazdım. /en/intro-session ya da formun İngilizce seçeneği önerilir.
3. **Dağıtım (SEO dışı, hızlı):** Uluslararası okul veli grupları ve expat platformları (ör. Yabangee) için İngilizce makaleyi paylaş; dış bağlantı da getirir.
4. **Kanıt:** Geçen yılın gösterisinden izinli fotoğraf/kısa video ve İngilizce veli yorumu, sayfadaki en güçlü güven sinyali olur.

## Değişen dosyalar
- src/lib/enDisciplines.ts · src/app/en/[topic]/page.tsx
- src/lib/disiplinler.ts · src/app/[semt]/page.tsx
- src/lib/mdx.ts · src/app/makaleler/[slug]/page.tsx
- src/content/articles-en/english-drama-for-kids-teens-istanbul-parents-guide.mdx (yeni)
- src/content/makaleler/ingilizcesi-iyi-olan-cocuk-icin-ne-var.mdx (yeni)
- src/content/makaleler/ingilizce-drama-youth-yas-gruplari-neden-ayri.mdx · genclerde-yaratici-drama-okul-basarisina-etkisi.mdx (tarih düzeltmesi)

## Deploy uyarısı
`src/app/en/[topic]/page.tsx` artık `src/lib/enArticles.ts`'i kullanıyor. Bu dosya ve `/en/articles` altyapısı 8 Ekim trafik stratejisi çalışmasından geliyor ve **henüz commit edilmemiş**. Bu iki çalışma birlikte push edilmeli; yalnız bu rapordaki dosyalar push edilirse Vercel derlemesi kırılır.
