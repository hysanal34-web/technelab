---
description: Tüm kaynaklardaki program tarihlerini karşılaştır, çelişkileri bul
---

Techne Lab'de aynı tarih beş ayrı yerde yaşıyor ve düzenli olarak birbirini tutmuyor.
Bu komut çelişkileri bulur. Hiçbir şeyi kendiliğinden düzeltme — bulguları listele, düzeltmeyi Yağız onaylasın.

## Kontrol edilecek kaynaklar

1. `src/lib/data.ts` — program `startDate` / süre / kontenjan alanları
2. `src/app/tanisma-gunu/sessions.ts` — tanışma günü seansları (tarih + saat + mekân)
3. `TECHNE LAB TÜM PROGRAMLAR` Google Sheet (fileId `1SMfBjHhc080Rjqft5jPbFjMIRGlQcEXtXf0P0Gwl8Ek`) — kayıt tablolarındaki başlangıç tarihleri
4. Yayındaki Meta reklam metinleri — `meta-ads/REKLAM-METINLERI-*.md` içindeki "uygulandı" işaretli metinler
5. Yayındaki Google Ads reklam metinleri — `google-ads/` altındaki dosyalar
6. Mesaj şablonları — `OTOMATIK-MESAJ-SABLONLARI.md`, `KONUSMA-MESAJLARI.md`, `INSTAGRAM_DM_SABLONLARI.md`

## Çıktı

Program program bir tablo:

| Program | data.ts | sessions.ts | Kayıt tablosu | Meta reklamı | Mesaj şablonu | Durum |

Durum sütunu: ✅ hepsi aynı · ⚠️ çelişki var (farkı yaz) · ❔ kaynakta hiç geçmiyor

Sonra ayrı bir blok: **geçmiş tarih duyuran yayındaki metinler.** Bugünün tarihinden
önceki bir tanışma günü ya da başlangıç tarihi hâlâ yayındaysa bu en acil kalem —
tıklayan kişi kaybediliyor.

## Bilinen kronik sorun

Broadway ve EDL'in Kadıköy başlangıç tarihi geçmişte üç kaynakta üç farklı çıktı
(data.ts 1 Ekim · kayıt tablosu 24 Eylül · eski Google reklamı 17 Eylül). Önce buna bak.
