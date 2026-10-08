# Kamera önü ve oyunculuk: derinleştirme · 7 Ekim 2026

Hedef: Camera Praxis tarihi netleşene kadar (yaklaşık 2 hafta) `kamera önü oyunculuk kursu istanbul` ve `oyunculuk kursu istanbul` sorgularında en üste çıkmak.
Başlangıç (5 Ekim ölçümü): kamera önü 16. sıra, oyunculuk kursu ilk 20'de yok (Search Console ortalaması 9,7 konum, 80 gösterim, 30 Eylül).

**Dürüst beklenti:** İki haftada 1. sıra garanti değil. Google yeni içeriği genellikle birkaç gün içinde tarar, sıralamanın oturması daha uzun sürer. Kamera önünde ilk 10 gerçekçi hedef, 1. sıra iddialı hedef. "Oyunculuk kursu istanbul" için 1. sıra iki haftalık bir hedef değil; Sinema Akademi ve Craft yıllardır o sorguda ve onlarca sayfaları var.

## Bu turda yapılan (kodda, commit edilmedi)

### Sayfa derinliği
Canlıda kamera hub'ı 944, oyunculuk hub'ı 1.206 kelimeydi (rakipler: Craft ~2.500, Sinema Akademi ~8.000).

| Sayfa | Eklenen |
|---|---|
| `/kamera-onu-oyunculuk-istanbul` | 12 terimlik **Kamera Önü Sözlüğü** (plan boyu, göz hattı, süreklilik, master/coverage, marka, slate, okuyucu, soğuk okuma, callback, showreel...), 5 yeni SSS (sahne/kamera farkı, self-tape ekipmanı, Camera Praxis tarihi, dizi oyunculuğu için şart mı, grup kaç kişi), "nasıl çalışıyoruz" metni genişletildi, meta açıklamaya "4 hafta, en çok 10 kişi" eklendi, ilgili 6 yazı elle sabitlendi |
| `/oyunculuk-kursu-istanbul` | 10 maddelik **Oyunculuk Yöntemleri Haritası** (Stanislavski, Meisner, Chekhov, Viewpoints, Grotowski, Brecht, devising, doğaçlama, masabaşı, ses-nefes; her biri kendi makalesine bağlı), 4 yeni SSS, 2 gerçek katılımcı yorumu (E.T., E.K., program adlarıyla), ilgili 6 yazı sabitlendi |
| Her iki hub | Kaynaklı veri bölümü (6 Ekim'de eklenmişti). **Bu turda her kaynak tek tek açılıp okundu**, üç düzeltme yapıldı: SAG-AFTRA'nın slate önerisi yanlış aktarılmıştı (doğrusu: slate ayrı video), göz hattı satırı kaynağın söylediğiyle değiştirildi, MEB satırı konuyla ilgisi zayıf olduğu için çıkarıldı (yerine Netflix küresel ilk 10 verisi). |

### Makaleler
- `self-tape-nasil-cekilir.mdx`: "Casting tarafı ne söz veriyor?" bölümü (Equity/CDG 2021 kuralları, SAG-AFTRA 2020 teknik rehberi, Backstage 2024 ile ayrışma). 1.133 → 1.360 kelime.
- `kamera-onunde-oyunculuk.mdx`: "Göz hattı ve süreklilik" bölümü (Backstage 2022 ve 2015, kaynaklı). **Yanlış bilgi düzeltildi:** "Techne Lab'da müstakil kamera programı yok" yazıyordu; Camera Praxis anlatıldı. Yazım hatası düzeltildi. 877 → 1.073 kelime.
- İkisine `updated: 2026-10-07` eklendi.

### Teknik
- `DisciplinePage.tsx`: sözlük/yöntem haritası bölümü + `DefinedTermSet` yapılandırılmış verisi, yorum bölümü, elle sabitlenebilen ilgili yazılar.
- `mdx.ts` + `makaleler/[slug]/page.tsx` + `sitemap.ts`: `updated` alanı; güncellenen makale Google'a "değişti" tarihiyle gidiyor (`dateModified`, sitemap `lastModified`).
- `data.ts`: Camera Praxis program sayfasının başlığı marka öne alınarak değiştirildi ("Camera Praxis: Selen Uçer ile Kamera Önü Oyunculuk Atölyesi (Pera)"). Önceki başlık hub ile aynı sorguda yarışıyordu.
- `tsc --noEmit` temiz; sözlükteki tüm makale bağlantıları, sabitlenen yazılar ve yorum kimlikleri bir betikle kontrol edildi (hepsi yayında ve mevcut). Tam `next build` bu makinede tamamlanamadı (işlem zaman sınırında kesildi); push öncesi Vercel derlemesi asıl kontrol olacak. Değişen dosyalar listesi aşağıda.
- Kontrol betiği silinemediği için `_to_delete/.chk-tmp.ts` içinde duruyor; klasörü silebilirsin, commit'e ekleme.

## Yağız'a: bu hafta (sıralama için en etkili olanlar)

1. **Push (10 dk, kod).** Aşağıdaki dosyalar canlıya gitmeden hiçbir şey sıralamayı etkilemez. Depoda başka bir oturumun eklediği 8 yeni makale de untracked duruyor; onları ayrıca gözden geçir.
2. **Search Console'da dizine ekleme iste (5 dk, panel).** Push'tan sonra URL Denetimi: `/kamera-onu-oyunculuk-istanbul`, `/oyunculuk-kursu-istanbul`, `/makaleler/self-tape-nasil-cekilir`, `/makaleler/kamera-onunde-oyunculuk`, `/atolyeler/camera-praxis`.
3. **Selen Uçer'den iki şey (telefon, 15 dk).** (a) Oynadığı dizi/film/tiyatro işlerinden paylaşmak istediği 3-5 tanesi (ad, yıl). Bu, sayfadaki en güçlü güven sinyali olur ve rakiplerin çoğunda yok. (b) Camera Praxis'te her oturumda kayıt alınıp geri izleniyor mu, kayıtlar katılımcıya veriliyor mu? Bunu doğrulamadan sayfaya yazmadım.

## İkinci hafta

4. **Dış bağlantı (en büyük eksik).** Rakiplerin yıllara dayanan bağlantıları var, bizim yok. En hızlı üçü: Pod Pera'nın sitesi veya Instagram bio linki, Selen Uçer'in ve Harika Uygur'un kendi profillerinden program sayfasına link, bir tiyatro haber sitesinde (ör. Tiyatrolar.com.tr) Camera Praxis duyurusu.
5. **Google İşletme Profili.** "Kadıköy" ve "Pera" aramalarında harita kutusu çıkıyor; profil var mı, kimin hesabında, bilinmiyor.
6. **Camera Praxis tarihi gelince (30 dk, kod):** `data.ts` → `active: true`, `scheduleNote`; hub giriş paragrafı ve "Camera Praxis ne zaman başlıyor?" SSS'si güncellenir. Tarih + kayıt açık, sıralamaya en çok etki edecek tek değişiklik.

## Ölçüm
- 12 Ekim haftalık takip: iki sorgu + "self tape nasıl çekilir".
- 14 Ekim: Search Console önce/sonra (planlı görev zaten kurulu).
- GA4 okuması Windsor plan sınırı yüzünden kapalı (5 Ekim raporu); düzelmeden trafik etkisini ölçemeyiz.

## Değişen dosyalar
- `src/lib/disiplinler.ts`
- `src/components/DisciplinePage.tsx`
- `src/lib/mdx.ts`
- `src/app/makaleler/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/lib/data.ts` (yalnızca Camera Praxis seoTitle)
- `src/content/makaleler/self-tape-nasil-cekilir.mdx`
- `src/content/makaleler/kamera-onunde-oyunculuk.mdx`

## Kaynaklar (7 Ekim 2026'da açılıp okundu)
- https://www.memurlar.net/haber/1131652/2024-te-dizi-film-sektorunde-602-milyon-dolarlik-ihracat.html
- https://www.cnbce.com/veriler/turk-dizileri-rekor-kiriyor-2024-yilinda-200-ulkeye-ihrac-edildi-h8634
- https://www.turkiyegazetesi.com.tr/kultur-sanat/dizi-ihracatinda-1-milyar-dolari-asan-hacim-turk-yapimlarini-170e-yakin-ulkede-1-mily-1812197
- https://www.karar.com/hayat-haberleri/turk-dizileri-ihracat-rekoru-2025-esref-ruya-bolum-basi-fiyati-ne-kadar-2001763
- https://sagaftra.org/self-tape-anatomy
- https://www.backstage.com/magazine/article/tips-winning-self-tape-audition-13472/
- https://www.backstage.com/uk/magazine/article/casting-directors-equity-best-practice-self-tapes-73820/
- https://www.backstage.com/magazine/article/eyelines-film-guide-74961/
- https://www.backstage.com/magazine/article/technical-skill-film-actors-must-learn-7768/

*Kodda commit, push veya deploy yapılmadı.*
