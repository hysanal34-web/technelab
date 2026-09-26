# Dönüşüm aktarımı — kurulum

21 Eylül 2026'da eklendi. Amaç: Google ve Meta'nın "form dolduruldu"ya göre değil,
**gerçekten kaydolup para ödeyene** göre optimize etmesi.

Kod tarafı bitti. Aşağıdaki üç adım panelden yapılıyor, kodla yapılamıyor.

---

## Önce: deploy

```bash
cd /Users/macbookpro/Downloads/technelab
npm run build          # yerelde bir kez derleyip gör
npx vercel --prod --yes --scope techne-lan
```

Derleme kum havuzunda tamamlanamadı (kaynak yetersiz), tip denetimi (`npx tsc --noEmit`)
temiz geçti. Deploy öncesi yerelde bir kez `npm run build` çalıştır.

---

## 1 · Google Ads'de iki dönüşüm işlemi aç

Araçlar → Hedefler → Dönüşümler → Yeni işlem → **İçe aktar → Manuel yüklemeler**

| İşlem adı | Ne zaman | Değer |
|---|---|---|
| `Kayıt Oldu` | offline yükleme (panelden) | değişken, TRY |
| `Tanışma Günü Kaydı` | site formu | değişken, TRY |

İkincisinin **etiketini** (send_to değerindeki `AW-xxx/` sonrası kısım) al ve Vercel'e yaz:

```
NEXT_PUBLIC_ADS_LABEL_TANISMA=<etiket>
```

Bu değişken bugün tanımsız. Tanımsız olduğu için ücretsiz tanışma kaydı ile ücretli
program başvurusu **aynı dönüşüme** yazılıyor, ikisi ayrı optimize edilemiyor.

> Dönüşüm adı panelde yazdığınla harfi harfine aynı olmalı. Farklıysa yükleme hata
> vermez, sessizce hiçbir şey yazmaz.

## 2 · Meta'da offline olay kümesi aç

Events Manager → Veri Kaynakları → Ekle → **Offline Event Set** → reklam hesabına bağla
(`act_1943993929852674`).

Aynı ekranda CAPI erişim belirteci üret ve Vercel'e yaz:

```
META_CAPI_ACCESS_TOKEN=<token>
```

Bu da bugün tanımsız görünüyor. Tanımsızken sunucu tarafı olaylar **sessizce atlanıyor**
(kod hata fırlatmıyor). `/admin/araclar` hangi değişkenin eksik olduğunu gösteriyor.

## 3 · Haftada bir: `/admin/donusumler`

1. Drive'daki "TÜM PROGRAMLAR" tablosunda ödeme yapmış satırları seç, kopyala
2. Panele yapıştır
3. Değer kaynağını seç (ödenen / toplam ücret)
4. İki dosyayı indir, Google Ads ve Meta'ya yükle

---

## Neyin gidip neyin gitmediği

| | Google Ads | Meta |
|---|---|---|
| Tıklama kimliği (`gclid`) | **zorunlu** | gerekmiyor |
| Hash'lenmiş telefonla eşleşme | hayır | **evet** |
| Siteden form doldurmamış kayıt | gönderilemez | gönderilebilir |

Bu yüzden Meta dosyası Google dosyasından daha kalabalık çıkıyor. DM'den, tavsiyeyle,
kapıdan gelen kayıtlar Google'a hiçbir şekilde gönderilemiyor — tıklama kimlikleri yok.

**Rıza kuralı:** dışa aktarma yalnızca formda "reklam ölçümü" kutusunu işaretlemiş
kayıtları alıyor. Kutu 21 Eylül 2026'da eklendi, ondan önceki başvurularda yok, dolayısıyla
mevcut kayıtların tamamı ilk başta engelli görünecek. Bu kasıtlı: duyuru izni ile
yurt dışına aktarım rızası KVKK'da ayrı amaçlar, birine verilen onay diğerini kapsamıyor.

---

## Kayıt tablosunda düzeltilmesi gerekenler

Panel bunları "telefon okunamadı" diye işaretliyor ve aktarım dışında bırakıyor:

- Telefon sütununda Instagram kullanıcı adı yazan satırlar (`@fatmanursunbul`, `@Hoyaflowy`)
- Yurt dışı numaraları (`52 5512018734`, `46739853514`) — normalleştirme Türkiye cebine göre
- Telefonu hiç olmayan satırlar (ESMA TAŞCI, ÇİĞDEM KARAÇAM, ALP, GÜLCE HANIM, İpek Yağcı…)
- `45.00` yazılmış tutar (Acting Praxis / Helin Hayat) — `45.000` olmalı, şu an 4.500 okunuyor

Bunlar düzeltilirse aktarılabilir kayıt sayısı belirgin artar.

---

## Kodda ne değişti

| Dosya | Ne |
|---|---|
| `src/components/TiklamaKimligi.tsx` | yeni · `gclid`/`wbraid`/`gbraid`'i 90 günlük çereze yazar |
| `src/lib/donusumEslestir.ts` | yeni · telefon normalleştirme, eşleştirme, SHA-256, CSV üretimi |
| `src/app/admin/(panel)/donusumler/` | yeni · aktarım ekranı |
| `src/lib/basvuruStore.ts` | `gclid`, `fbc`, `fbp`, `reklamRizasi` alanları (hepsi opsiyonel) |
| `tanisma-gunu/actions.ts`, `kayit/actions.ts` | tıklama kimliklerini ve rızayı kayda yazar |
| `TanismaForm`, `RegistrationForm`, `YouthRegistrationForm` | reklam ölçümü rıza kutusu |
| `YouthRegistrationForm` | **hiç atmadığı** `Lead` olayını artık atıyor |
| `BilgiForm` | **hiç atmadığı** olayı artık atıyor, `Contact` olarak (Lead'i kirletmesin) |

Son iki satır önemli: bu iki form 21 Eylül'e kadar reklam tarafında tamamen görünmezdi.
Youth, en yüksek bedelli program.
