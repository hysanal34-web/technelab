# SEO Takip · 17 Eylül 2026 (revizyon turu)

> Aynı günün ikinci raporu. Sabahki [2026-09-17-seo.md](./2026-09-17-seo.md) raporunun iki bulgusu bu turda yanlış çıktı; düzeltmeleri aşağıda.

## Özet

Sıralamalar bu kez **temiz bir tarayıcı profilinden**, kişiselleştirme kapalı ölçüldü. Sonuçlar sabahki rapordan sistematik olarak daha düşük geldi: müzikal 1 yerine 3, oyun yazarlığı 2 yerine 6, Kadıköy 4 yerine 5, kamera önü 3 yerine ilk 8'de yok. Tek yönlü bu sapma, sabahki ölçümün senin kendi Chrome'undan alınmış olmasıyla açıklanıyor; kendi siteni sürekli ziyaret ettiğin için Google sana onu öne çıkarıyor. **Yeni ziyaretçinin gördüğü tablo aşağıdaki.**

İyi haber: "oyunculuk kursu istanbul" sabah "ilk 20'de yok" diye yazılmıştı, **aslında 11. sıradayız** — birinci sayfaya bir basamak. Bu, üzerinde çalışılmaya en değer sorgu.

Sabahki raporun üçüncü aksiyonu ("makalelerin yalnızca 1'i oyunculuk sayfasına link veriyor") da hatalıydı; **gerçek sayı 12**. O aksiyon iptal, yerine gerçek boşluklar kapatıldı.

## Sıralamalar (Google, tr, kişiselleştirme kapalı)

| Sorgu | Bizim yer | Sabahki rapor | 1. sıradaki |
|---|---|---|---|
| Techne Lab istanbul tiyatro | **1** (ilk 7'nin 4'ü bizim) | 1 | biz |
| ingilizce drama istanbul | **1** (+8) | 1 | biz |
| müzikal tiyatro kursu istanbul | **3** | 1 | sinemaakademi.com.tr |
| oyunculuk kursu kadıköy | **5** | 4 | sinemaakademi.com.tr |
| oyun yazarlığı kursu istanbul | **6** | 2 | enstitu.ibb.istanbul |
| **oyunculuk kursu istanbul** | **11** | ilk 20'de yok | sakm.net |
| tiyatro kursu istanbul | ilk 20'de yok | 3 | enstitu.ibb.istanbul |
| yaratıcı drama kursu istanbul | ilk 20'de yok | ilk 20'de yok | istanbuldrama.com.tr |
| kamera önü oyunculuk kursu istanbul | ilk 8'de yok | 3 | enstitu.ibb.istanbul |

Marka sorgusu ve İngilizce drama sağlam duruyor. Bu ikisi en değerli varlığımız.

## Rakip hareketleri

- **sinemaakademi.com.tr** üç ayrı sorguda önümüzde (müzikal 1., Kadıköy 1., oyunculuk 6.). Semt semt açılmış sayfaları var: `/istanbul-oyunculuk-kursu/oyunculuk-kursu-kadikoy`, `/oyunculuk-kursu-pendik`, `/oyunculuk-kursu-beylikduzu`. Bizim semt sayfası yapımız aynı mantıkta ama daha az sayıda.
- **istanbuldrama.com.tr** yaratıcı dramada 1. ve 9. sırada, ayrıca tiyatro kursunda 4. Bu kümede en güçlü rakip.
- **enstitu.ibb.istanbul** (İSMEK) dört sorguda 1. Ücretsiz belediye kursu; rakip değil ama üstünü almak çok zor.
- **atolyecraft.com** blog yazısıyla kamera önü sorgusunda 2. sıraya girmiş. Blogdan hizmet sorgusuna sıçrama yapan tek rakip; model çalışıyor.

## Bu turda yapılanlar (kod)

**1. Marka dili ihlalleri temizlendi — 18 yerde.**
Canlı sayfalarda kendi çalışmalarımızı "ders" diye anlatan 18 cümle vardı ("Her derste herkes sahneye çıkıyor", "Dersler nerede yapılıyor?", "Ders saatleri akşam üzeri"). CLAUDE.md'deki kural gereği atölye/oturum/program ile değiştirildi.
Dosyalar: `src/lib/disiplinler.ts` (11), `src/lib/faq.ts` (5), `src/app/[semt]/page.tsx` (1), `src/content/makaleler/yaratici-drama-ile-drama-kursu-arasindaki-fark.mdx` (1).
Kasten bırakılanlar: arama motoru anahtar kelimeleri ("oyunculuk dersi istanbul" gibi — insanlar böyle arıyor) ve karşıtlık cümleleri ("ders kitabı yok", "İngilizceyi bir ders olmaktan çıkarıyor"). Bunlar kuralı çiğnemiyor, tam tersini söylüyor.

**2. Link verilmeyen hizmet sayfalarına bağlantı kuruldu.**
Dört sayfaya makalelerden hiç link gelmiyordu. Şimdi geliyor:

| Sayfa | Önce | Sonra |
|---|---|---|
| /dans-kursu-istanbul | 0 | 3 |
| /kamera-onu-oyunculuk-istanbul | 0 | 1 |
| /yetiskinler-icin-tiyatro-kursu-istanbul | 0 | 2 |
| /kadikoy-tiyatro-kursu | 0 | 1 |
| /yaratici-drama-istanbul | 3 | 4 |
| /muzikal-tiyatro-kursu-istanbul | 1 | 2 |

**3. Teknik makale kümesi birbirine bağlandı.**
Hiç iç link vermeyen 8 makale vardı (Lecoq, Michael Chekhov, Viewpoints, devising, karakter yaratma, intimacy direction, genç seyirci, co-production). Google konu kümelerini birbirine bağlı sayfalardan tanıyor; hepsi ilgili kardeş yazılara bağlandı. Artık yayındaki 79 makalenin tamamı en az bir iç link veriyor.

**4. Zayıf makale listesi bitti.**
680 kelimenin altındaki 6 makale tamamlandı: festival, Genco Erkal, Şişli Tiyatrosu, Kadıköy sezonu, Harbiye, TİYAPDER. Yayındaki hiçbir makale artık 680'in altında değil.

## 🚨 Acil

1. ~~**Search Console hâlâ bağlı değil.**~~ **ÇÖZÜLDÜ — 17 Eylül akşamı doğrulandı.** Bundan sonra sıralama verisi el ölçümünden değil buradan okunacak. Yukarıdaki tablo, Search Console verisi dolana kadar geçerli olan son el ölçümüdür.
2. **GA4'te olaylar hâlâ "önemli etkinlik" değil.** Sabahki raporun 1. aksiyonu; yapılmadı. SEO'nun ve reklamın kaç kayıt getirdiği görünmüyor.

## Bu hafta yapılacak (3 madde)

**1. ~~Search Console doğrulaması~~ → YAPILDI (17 Eylül akşamı).**
Kalan tek adım: Search Console → Site haritaları → `sitemap.xml` gönder (1 dakika). Veri 2-3 gün içinde dolmaya başlar; ilk anlamlı okuma 21 Eylül kontrolünde yapılabilir.

**2. GA4'te üç olayı önemli etkinlik yap (5 dakika, panel).**
Yönetici → Veri görünümü → Etkinlikler → `generate_lead`, `whatsapp_click`, `phone_call`. Ardından Google Ads → Hedefler → Dönüşümler → İçe aktar.

**3. ~~"oyunculuk kursu istanbul" sayfasını güçlendir~~ → YAPILDI, ama altından bir sorun çıktı.**

Sayfaya iki yeni bölüm eklendi:
- **"Hangisi sana uygun?"** — programları süre, kontenjan, mekân ve kayıt durumuyla yan yana koyan gerçek bir HTML tablosu. Satırlar `data.ts`'ten türetiliyor, elle veri girilmiyor; tek kaynak kuralı korunuyor, fiyat yok.
- **"Neye bakmalı?"** — program seçerken bakılacak beş ölçüt (blok mu dönem mi, kontenjan, eğitmenin ekolü, seyircili kapanış, deneyimsizlik). Bizi seçmeyen birine de yarayan, özgün metin. Rakiplerin ilk üçünde bu tür içerik var, bizde yoktu.

Dosyalar: `src/lib/disiplinler.ts` (yeni `criteria` alanı + oyunculuk içeriği), `src/components/DisciplinePage.tsx` (iki yeni bölüm). Tablo tüm disiplin sayfalarında otomatik çıkıyor; kriter bölümü yalnızca `criteria` dolu olanlarda.

> ⚠️ **Asıl sorun bu değil.** Tabloyu kurarken görüldü: "oyunculuk kursu istanbul" sayfasındaki üç programın **ikisi kayıt kapalı** (Oyuncunun Mevcudiyeti, Camera Praxis). Açık olan tek program **English Acting Praxis** — yani İngilizce. Türkçe "oyunculuk kursu istanbul" araması yapan biri, sayfaya geldiğinde satın alabileceği tek şey olarak İngilizce bir program görüyor.
>
> Bu, sıralamadan daha büyük bir kayıp. 11. sıradan 5. sıraya çıksak bile gelen trafik alacak bir şey bulamıyor. En yüksek hacimli sorguda kayıt açık bir Türkçe oyunculuk programı olmadan bu sayfaya yapılan SEO yatırımı geri dönmez.
>
> Karar senin: yeni dönem açılacaksa tarihi girip `active: true` yapalım; açılmayacaksa sayfanın en azından "sıradaki dönem için haber ver" gibi bir toplama noktası sunması gerekiyor. Şu haliyle ziyaretçi elimizden kayıyor.

**~~Eski madde 3~~ (arşiv):**
11. sıradayız, ilk sayfaya bir adım kaldı. Rakiplerin ilk üçünde olan ama bizde olmayan şey: fiyat/süre karşılaştırma tablosu, eğitmen isimleriyle birlikte program listesi, ve blogdan hizmet sayfasına giden yoğun link. Üçüncüsünü bu turda kısmen yaptık. Sıradaki adım `src/lib/disiplinler.ts` içindeki `oyunculuk-kursu-istanbul` bloğuna program karşılaştırma bölümü eklemek. Fiyat yazmadan: süre, haftalık gün sayısı, kontenjan, seviye.

## Bekleme listesi (aynı gün, ek iş)

Kapalı programlarda ziyaretçiye yalnızca bir `mailto:` linki veriliyordu. Mail istemcisi açılınca çoğu kişi vazgeçer; o trafik ölçülmeden kayboluyordu. Yerine iki aşamalı bir bekleme listesi kuruldu.

**1. adım (zorunlu):** ad, e-posta, hangi program, KVKK onayı. Kısa tutuldu çünkü bekleme listesinin işi hacim.
**2. adım (isteğe bağlı, kayıttan sonra):** yaka tercihi, uygun gün/saat, deneyim, hedef, yaş, meslek, telefon, serbest not. Cevaplamasa da e-posta elde kalıyor.

Yaka ve gün/saat soruları operasyonel: yeni dönemi hangi mekânda ve hangi saatte açacağını doğrudan bu iki cevap belirleyecek.

Yeni dosyalar:
- `src/app/bekleme-listesi/page.tsx` — `?program=<slug>` ile gelen program önseçili gelir. `noindex`, çünkü hedef sayfa değil dönüşüm sayfası.
- `src/app/bekleme-listesi/actions.ts` — `joinWaitlist` + `enrichWaitlist`. Mevcut Resend deseni birebir izlendi: honeypot, KVKK kontrolü, önce bize bildirim maili sonra audience kaydı.
- `src/components/WaitlistForm.tsx` — iki aşamalı form.

Değişen:
- `src/app/atolyeler/[slug]/page.tsx` — kapalı program kutusundaki mailto, birincil "haber ver" butonuna dönüştü; mailto ikincil bağlantı olarak duruyor.
- `src/components/DisciplinePage.tsx` — kapalı programı olan disiplin sayfalarına bekleme listesi bandı eklendi.

Kapalı program listesi `data.ts`'ten okunuyor; Mevcudiyet ve Camera Praxis'i `active: true` yaptığın gün form ve bandlar kendiliğinden kaybolur, elle temizlik gerekmez.

**Kontrol edilmesi gereken:** `RESEND_LEADS_AUDIENCE_ID` (yoksa `RESEND_AUDIENCE_ID`) Vercel'de tanımlı mı. Tanımlı değilse kayıtlar yine info@ adresine mail olarak düşer, kaybolmaz; ama liste hâline gelmez.

## Notlar

- **Deploy yapılmadı.** Sandbox `api.vercel.com`'a erişemiyor. Değişiklikler diskte duruyor. Sen çalıştıracaksın:
  `cd /Users/macbookpro/Downloads/technelab && npx vercel --prod --yes --scope techne-lan`
- `npx tsc --noEmit` temiz geçti. `next build` sandbox'ta zaman aşımına uğradı, tamamlanmadı — deploy öncesi bir kez yerelde çalıştırmakta fayda var.
- MDX/frontmatter doğrulaması temiz, kırık ya da taslağa giden iç link yok.
- `src/lib/data.ts` içinde bana ait olmayan, commit edilmemiş bir değişiklik duruyor: English Drama Lab paketleri 12/6/4 haftadan 12/8/4'e, fiyatlar 19.500/11.000/8.000'den 21.000/17.000/8.500'e çekilmiş; Kadıköy grubu "14 Eylül'de başladı · katılım açık" olarak güncellenmiş. Dokunmadım ama deploy edince bu da yayına girecek — kasıtlıysa sorun yok, kontrol et. Reklam metinlerindeki tarih ve paket bilgisi buna eşitlenmeli (`/tarih-kontrol`).
- **Karar bekleyen bir konu:** CLAUDE.md "kullanıcıya gidecek metinlerde em dash (—) kullanılmaz" diyor. Kural reklam metni, post, mesaj şablonu ve broşür için yazılmış görünüyor; ama makalelerin neredeyse tamamı em dash kullanıyor ve site metinleri de öyle. Blog yazıları bu kurala dahil mi? Dahilse ayrı bir temizlik turu gerekiyor, tek tek yapılmalı çünkü bazıları noktalama olarak gerçekten gerekli.

*Sonraki planlı kontrol: 21 Eylül 2026.*
