# Kalıcı 1. sıra stratejisi · 20 Ekim 2026

Dürüst çerçeve: Google'da "hepsinde 1." garanti edilemez. Hedef: sorgu başına tek güçlü sayfa, her hafta ölçülen ilerleme, geri düşüşte otomatik uyarı.

## Teşhis (19 Ekim ölçümü)
Marka 1. Gerileyenler: kamera önü (15 → ilk 20 dışı), oyun yazarlığı (2 → 7), Kadıköy (4 → 10), müzikal (11 → 18). Üç temel neden: (1) kod git'te değildi, canlıya karışık sürüm gidiyor; (2) aynı sorguya birden çok sayfamız yarışıyor; (3) sitemap eski, yeni sayfalar Google'a bildirilmedi.

## Ilke 1: Her sorgunun TEK sahibi sayfası
| Sorgu | Sahip sayfa | Diğer sayfalar |
|---|---|---|
| oyunculuk kursu istanbul | /oyunculuk-kursu-istanbul | hepsi buna iç link verir |
| tiyatro kursu istanbul | /tiyatro-kursu-istanbul (yoksa oluştur) | |
| yaratıcı drama kursu istanbul | yaratıcı drama hub | |
| kamera önü oyunculuk | /kamera-onu-oyunculuk-istanbul | makaleler buna çapa metniyle link |
| müzikal tiyatro kursu | /muzikal-tiyatro-kursu-istanbul | program sayfası markaya döner |
| oyun yazarlığı | /oyun-yazarligi-kursu-istanbul | |
| Kadıköy | /kadikoy-tiyatro-kursu | |
Kural: makaleler bilgi niyetini, hub sayfalar "kurs" niyetini karşılar; başlıklar çakışmaz.

## Ilke 2: Rakibin yapmadığını yap
Eğitmen adı + yaş + gün/saat + final gösterisi + seçme kriteri aynı sayfada. Rakipler (Sinema Akademi, Sanat Akademi) uzun şablon metin yazıyor; biz kanıtlı ve spesifik. Eksik veri (Musical Lab gün/saat/toplam saat, Kadıköy Broadway tarihi) Yağız'dan gelmeden sayfa yazılmaz.

## Ilke 3: Haftalık ritim (otomatik)
- Pazartesi: SEO takip raporu (zaten çalışıyor).
- Haftada 5 makale (zaten planlı), hepsi bir hub'a bağlı.
- Her deploy sonrası: sitemap kontrolü + Search Console dizin isteği (panel işi, 10 dk).
- Düşüş kuralı: bir sorgu 3 sıra veya daha fazla düşerse rapor "Acil" açar, o sorgunun sahip sayfası o hafta yenilenir.

## Ilke 4: Otomatik deploy
Hat kuruludur: `.github/workflows/deploy.yml` main'e her push'ta Vercel'e prod deploy eder. Yani "otomatik deploy" = commit + push. Kural: iş commit edilmeden deploy edilmez (`vercel --prod` elle kullanılmaz).

## Ilke 5: Ölçüm
Search Console + GA4 bağlantısı şart (Windsor.ai tek hesap). Bu olmadan neyin işe yaradığı görülmez.

## 30 günlük hedef (gerçekçi)
- Kamera önü: ilk 10. Oyun yazarlığı: tekrar 1-3. Kadıköy: ilk 3. Müzikal: ilk 10. Yetişkin İngilizce drama ve Broadway dans: 1. sırayı koru.
- Genel "oyunculuk/tiyatro kursu istanbul": 3-6 ayda ilk 10 (rakipler yıllık güçlü domainler).
