# PLAN B — DANS & MÜZİKAL HATTI · GOOGLE ADS ARAMA KAMPANYALARI

**Tarih:** 2 Eylül 2026 · **Hesap:** 669-492-3541
**Kaynak:** `google-ads/BRIEF-2026-09.md`, `src/lib/data.ts` (id 5, id 6), `src/lib/disiplinler.ts`, `src/content/makaleler/*`
**Kapsam:** İki ayrı kampanya — Broadway Musical Dance · Techne Musical Lab
**Kardeş doküman:** `google-ads/PLAN-A-ingilizce-drama.md` (ortak kurallar ve negatif mantığı oradan devam ediyor)

---

## 0. ÖNCE OKU

### 0.1 Neden iki ayrı kampanya

Brifingin teşhisi tek cümleyle şu: sekiz program tek kampanyada duruyor ve bütçe, en çok gösterim alabilen gruba akıyor. Broadway 14 günde ₺646 harcadı (bütçenin %51'i) çünkü "dans" kelimesi hesabın en geniş arama havuzuna açılan kelimesi. Techne Musical Lab aynı kampanyada 9 tık aldı.

**Bunlar aynı kampanyada kalamaz.** İki programın satın alma kararı taban tabana zıt:

| | Broadway Musical Dance | Techne Musical Lab |
|---|---|---|
| Taahhüt | 6 ya da 12 hafta | 8 ay, haftada 2 gün |
| Karar süresi | Günler | Haftalar |
| Giriş engeli | Yok (seçme yok) | Şarkı videosu ile başvuru |
| Arama hacmi | Yüksek ama kirli | Düşük ama temiz |
| Doğru TBM bandı | Orta | Yüksek (uzun program, yüksek yaşam boyu değer) |

Aynı kampanyada tutulursa Google bütçeyi tık alabilen tarafa — yani Broadway'in kirli havuzuna — verir. Bugün olan tam olarak bu.

### 0.2 Değişmez kurallar — bu dosyadaki her metin bunlara uyuyor

1. Telefon numarası hiçbir metinde ve uzantıda yok
2. Fiyat rakamı yok (6 hafta 9.500 ₺ / 12 hafta 16.500 ₺ yalnızca konumlandırma kararı için kullanıldı, hiçbir metne girmedi)
3. İndirim oranı yok — yalnızca rakamsız "erken kayıt" ifadesi
4. "Genç / gençler / gençlik" kelimesi hiçbir başlıkta, açıklamada ve **hiçbir anahtar kelimede** yok. Yerine "15 yaş ve üzeri", "12–55 yaş", "lise çağı"
5. Ödül/unvan öne çıkarılmadı
6. Ünlem yok, klişe yok, övgü yok

### 0.3 Broadway'de ₺646 nereye gitti — kök neden

Arama terimi dökümündeki 19 tıkın 15'i "dans" kelimesinin genel havuzundan geldi. Ama asıl mesele israfın büyüklüğü değil, **türü**:

| Sızıntı türü | Örnek | Harcama | Kök neden |
|---|---|---|---|
| Stil adı | sirtaki, tango, flamenko, zumba, halk oyunları | ₺153,70 | "Dans" geniş eşleşmede her stile giriyor |
| Ücretsiz arayan | kadıköy belediyesi dans kursu | ₺89,62 | Belediye/İSMEK negatifi yok |
| Fiyat karşılaştıran | kadıköy dans kursu fiyatları | ₺62,80 | Fiyat sitede gizli — bu kullanıcı karşılanamıyor |
| Niteliksiz genel | dans kursu kadıköy, dans kursu kozyatağı | ₺149,25 | Niteleyicisiz "dans kursu" hedefleniyor |
| Rakip markası | ve dans kadıköy | ₺30,44 | Konquest kararı verilmemiş, kazara giriliyor |

Dört tanesi de aynı yapısal hatadan çıkıyor: **program bir kategori adıyla değil, bir hammadde adıyla ("dans") pazarlanmış.** Broadway Musical Dance genel dans kursu pazarında bir ürün değil; kendi dar kategorisinde (müzikal/jazz/theatre dance) neredeyse tek ürün. Kullanıcının talebi de bunu doğruluyor: bu program "müzikal dans / jazz dans / broadway müzikal dans" olarak lanse edilmeli. Bölüm I bunun tam uygulamasını veriyor.

### 0.4 DOSYALAR ARASI ÇELİŞKİLER — DOĞRULANMALI

| # | Konu | Çelişki | Etkisi ve alınan karar |
|---|---|---|---|
| 1 | **Broadway'in Taksim ayağı** | `data.ts` id 6: `venue: 'Kadıköy & Taksim'`, `schedule` içinde **Taksim 17 Eylül Perşembe 19:00–21:00** var · `disiplinler.ts` `taksim-dans-kursu`: *"Taksim'de dans dersi veriyor musunuz? **Hayır**"* · `beyoglu-dans-kursu`: *"dans stüdyosu Beyoğlu'nda değil, Kadıköy Rasimpaşa'da"* | **En kritik çelişki.** Reklamda "Kadıköy ve Taksim" yazıp kullanıcıyı "Taksim'de ders vermiyoruz" diyen sayfaya düşürmek dönüşümü sıfırlar. **Karar: BMD-5 (Taksim/Beyoğlu grubu) sayfa düzeltilmeden AÇILMAZ.** Ayrıca Taksim gerçekten açılıyorsa `taksim-dans-kursu` ve `beyoglu-dans-kursu` sayfaları acilen güncellenmeli — bugünkü hâlleriyle bu iki sayfa Taksim satışını aktif olarak öldürüyor. |
| 2 | **Broadway kontenjanı** | `data.ts`: `maxStudents: 15` · `disiplinler.ts` `kadikoy-dans-kursu`: *"grup 12 kişiyi geçmiyor"* · makale `dansa-kac-yasinda-baslanir`: *"en fazla on iki kişilik"* · makale `broadway-muzikali-dans-kursu-istanbul`: *"maksimum 15 kişilik"* | Reklam "15 kişilik" derken sayfa "12" diyorsa güven kırılır. **Karar: kontenjan rakamı içeren başlıklar D bölümünde işaretlendi ve netleşene kadar yerine "Küçük Gruplar" kullanılacak.** |
| 3 | **Broadway mekânı — makale** | `broadway-muzikali-dans-kursu-istanbul.mdx`: *"Dans programımız Kadıköy'de yürüyor"* (Taksim yok) | 1 numaralı çelişkinin devamı. Makale de güncellenmeli. |
| 4 | **Musical Lab dönem başlangıcı** | `data.ts` `duration`: "Eylül–Mayıs", `schedule`: **28 Eylül Pazartesi** · `blocks`: "Ekim–Aralık / Ocak–Mart / Nisan–Mayıs" · makale: "Eylül'den Mayıs'a" | Metinlerde **"28 Eylül"** ve **"ekim–mayıs"** birlikte kullanıldı (ikisi de aynı anda doğru olabilir: 28 Eylül'de başlayıp müfredat ekimde açılıyor). Netleştirilmeli. |
| 5 | **Broadway erken kayıt** | `data.ts`: `earlyBirdDeadline: '10 Eylül'` var ama `priceEarlyBird` **yok** · `erkenKayit.ts` yorumu: *"Broadway'in %20'lik erken kaydı"* diyor ama kodda böyle bir alan yok | Reklamda rakamsız "Erken Kayıt Dönemi" başlığı kullanılabilir (kural 3'e uygun). Ama **10 Eylül'den sonra bu başlık kaldırılmalı** — bu plan 8 gün içinde uygulanmazsa D bölümündeki erken kayıt başlıkları çıkarılacak. |
| 6 | **"Arkadaşını getir %10"** | Brifingde ve kodda yok. Repoda olan: `DISCOUNT_THRESHOLD = 2`, `DISCOUNT_RATE = 0.25` — yani sepete **2 program** eklenince %25. Bu, "2 kişi gelirse %10" ile aynı şey değil. | **DOĞRULANMALI.** İkisi de reklama yazılmıyor (kural 3), ama WhatsApp/telefon yanıtı ile sitenin sepet mantığı aynı şeyi söylemiyor. |
| 7 | **Tap dans** | `disiplinler.ts` `dans-kursu-istanbul` keywords içinde `'tap dans istanbul'` var · `data.ts` id 6 blokları ve makaleler tap'ten hiç bahsetmiyor | Müfredatta tap yoksa bu kelime hem SEO'da hem reklamda yanlış beklenti üretir. **Karar: "tap dans" kampanya negatifine alındı**, öğretiliyorsa çıkarılır. |
| 8 | **Modern / çağdaş dans** | `disiplinler.ts` keywords: `'modern dans kursu istanbul'`, `'çağdaş dans atölyesi'` · Program içeriği: jazz + theatre dance | Modern/çağdaş dans arayan başka bir kitle (release tekniği, kontakt doğaçlama). **Karar: negatiflendi**, bölüm H-5'te kontrollü yeniden test önerisi var. |
| 9 | **Başvuru URL'i** | `BRIEF`: `/basvuru` · Kodda böyle rota **yok**; gerçek rota `/atolyeler/[slug]/kayit` | Tüm uzantı ve açılış sayfası URL'leri `/kayit` üzerinden yazıldı. `/basvuru` verilirse 404. (PLAN-A'da da aynı tespit var.) |
| 10 | **Google Ads dönüşüm etiketi** | `NEXT_PUBLIC_GOOGLE_ADS_ID` kodda opsiyonel; tanımlı olup olmadığı repodan görünmüyor | Teklif stratejisi buna bağlı — bkz. G bölümleri. Akıllı teklif dönüşüm verisi olmadan çalışmaz. |

### 0.5 İki kampanyanın ortak ayarları

- **Kampanya türü:** Yalnızca Arama Ağı. Görüntülü Reklam Ağı ortağı **kapalı**, arama ortakları **kapalı**
- **Konum:** İstanbul + bölüm E'deki yarıçap hedeflemesi. Hedefleme türü **"Bu konumdaki kişiler"** (varsayılan "ilgi gösteren" değil — sirtaki/flamenko tıklarının bir kısmı büyük olasılıkla şehir dışından)
- **Dil:** Türkçe (+ Broadway'de İngilizce; "broadway dance class istanbul" arayan expat kitlesi gerçek)
- **Eşleşme tipi:** Yalnızca tam `[x]` ve sıralı `"x"`. **Geniş eşleşme hiçbir grupta kullanılmayacak** — bu hesabın israfının tek kaynağı o
- **Reklam rotasyonu:** Optimize et
- **URL soneki:** `?utm_source=google&utm_medium=cpc&utm_campaign=<kampanya>&utm_content=<grup>`
- **Arama terimi raporu:** İlk 21 gün **haftada iki kez** okunacak, yeni sızıntılar aynı gün negatiflenecek. Bu, plandaki en önemli operasyonel madde.

---
---

# 1 · BROADWAY MUSICAL DANCE

> `data.ts` id 6 · slug `broadway-musical-dance` · 12 ya da 6 hafta · Kadıköy & Taksim (bkz. çelişki 1) · 12–55 yaş · Köksal Ünal
> Başlangıç: **17 Eylül Perşembe 19:00–21:00** · Seçme ve seviye sınavı yok
> Konumlandırma: *"Broadway dansı teknikten önce anlatıdır — her hareket bir niyet taşır."* (`disiplinler.ts`)

---

## A) KİTLE TEŞHİSİ — BROADWAY

Bu programın sorunu talep yokluğu değil, **yanlış havuzda yüzmek**. "Dans kursu" pazarı İstanbul'da çok kalabalık ve bu pazarın büyük kısmı sosyal dans, fitness ve folklor. Broadway müzikal dansı ise kendi kategorisinde neredeyse rakipsiz. Persona teşhisi bu yüzden "dans isteyen kim" değil, "**sahne** isteyen kim" sorusundan başlıyor.

### Persona 1 — "Hiç Dans Etmemiş Denemeci" (en büyük hacim, orta niyet)
25–45 yaş. Ofiste çalışıyor, spor salonu sıkıcı geldi, sosyal medyada bir müzikal videosu gördü ve "ben de böyle bir şey yapmak isterdim" dedi. Dansla ilişkisi sıfır; en büyük korkusu rezil olmak. `dansa-kac-yasinda-baslanir.mdx` bu kişi için yazılmış: *"gruplarımızın çoğunluğu 25-45 yaş arası ve büyük kısmı sıfırdan başlıyor."*

**Arama kalıpları:** `dansa kaç yaşında başlanır` · `sıfırdan dans kursu istanbul` · `yetişkin dans kursu istanbul` · `hiç dans etmedim kurs` · `başlangıç seviyesi dans kursu` · `30 yaşında dansa başlamak` · `dans kursu deneyimsizler için`

**Ne satın alıyor:** Cesaret, düşük taahhüt, küçük grup. Fiyat ikincil; **6 haftalık paket tam olarak bu kişinin ürünü.**

### Persona 2 — "Jazz/Bale Geçmişli Geri Dönen" (en yüksek dönüşüm oranı)
20–35 yaş. Çocukken bale ya da halk dansları yaptı, üniversitede dans topluluğundaydı, sonra bıraktı. Teknik bir kelime dağarcığı var: izolasyon, kombinasyon, kanon. Broadway dilini merak ediyor. Bu kişi teklifi anlamak için ikna edilmesi gerekmeyen tek persona — kelimeyi bilerek arıyor.

**Arama kalıpları:** `jazz dans kursu istanbul` · `jazz dance kursu` · `theatre dance istanbul` · `broadway müzikal dansı` · `broadway dans kursu` · `caz dansı kursu` · `sahne dansı kursu` · `koreografi atölyesi istanbul` · `showdance istanbul`

**Ne satın alıyor:** Eğitmen kalitesi, repertuar, stil doğruluğu. **En yüksek teklifi hak eden grup bu.**

### Persona 3 — "Müzikal/Oyunculuk Hedefli" (küçük hacim, en yüksek yaşam boyu değer)
Oyuncu, oyunculuk öğrencisi ya da müzikal hayali olan biri. Dansı kendi başına değil, sahnenin bir ayağı olarak istiyor. `muzikal-oyunculuk-nedir.mdx`'in tarif ettiği "triple threat" arayışının dans kapısından gireni. **Bu kişi Broadway'den Musical Lab'e geçen içsel dönüşüm yolunun ta kendisi** — iki kampanyanın kesişimi burada.

**Arama kalıpları:** `müzikal dans kursu` · `müzikal tiyatro dans` · `oyuncular için dans` · `sahne hareketi kursu` · `müzikal için dans eğitimi` · `broadway müzikal eğitimi`

**Ne satın alıyor:** Kariyer altyapısı. Fiyata en duyarsız persona.

### Persona 4 — "Fitness / Sosyalleşme" — KARAR: MÜŞTERİMİZ DEĞİL

**Karar: kelime düzeyinde hedeflenmeyecek, negatiflenecek. Mesaj düzeyinde kapı açık bırakılacak.**

**Gerekçe (üç ayrı kaynaktan):**
1. **Brifingin verisi:** zumba, sirtaki, halk oyunları, flamenko tıkları — kullanıcı ifadesiyle *"gerçekten flamenko dersi için aradılar"*. Bu tıklar ₺25–30 TBM ile geldi ve tek bir dönüş üretmedi. Bu deneysel olarak kapanmış bir soru.
2. **Ürünün kendi tanımı:** `broadway-muzikali-dans-kursu-istanbul.mdx` bu ayrımı zaten yapıyor: *"Fitness dansı, hareketi amaç olarak görür. Broadway dans dili, hareketi bir araç olarak kullanır."* Programın kendi metni bu kitleyi dışarıda tanımlıyor.
3. **Ekonomi:** 12 haftalık program haftada bir gün, 15 kişilik grup, seçmeli devam. Zumba fiyatına haftada 3 gün arayan kişi bu yapıyı satın alamaz; alsa da ikinci haftada bırakır — ki bu, kontenjanı kapatıp dolduramamak demek.

**Ama tamamen kapatmıyoruz.** `disiplinler.ts` bu programın kitlesini sayarken *"düzenli fiziksel bir pratik arayanlar"* diyor. Bu kişi gerçek — ama arama anında "zumba" değil, "**yetişkin dans kursu**" ya da "**sıfırdan dans**" yazıyor. Yani Persona 1 ile aynı kelimeyi kullanıyor ve zaten BMD-6 grubunda yakalanıyor. Fitness **niyetini** almıyoruz, fitness **ihtiyacını** taşıyan Persona 1'i alıyoruz. Ayrım kelimede, kitlede değil.

---

## B) REKLAM GRUBU MİMARİSİ — BROADWAY

Yedi grup. Ayrım ekseni **niyet katmanı**: ne kadar spesifik arıyorsa o kadar yüksek teklif.

| Grup | Niyet | Teklif tavanı | Açılış sayfası |
|---|---|---|---|
| BMD-1 Marka | Bizi arıyor | ₺8 | `/atolyeler/broadway-musical-dance` |
| BMD-2 Broadway & Müzikal Dans | **Ana omurga** | ₺30 | `/atolyeler/broadway-musical-dance` |
| BMD-3 Jazz & Theatre Dance | Teknik ad | ₺26 | `/atolyeler/broadway-musical-dance` |
| BMD-4 Semt · Kadıköy | Yerel + kategori | ₺24 | `/kadikoy-dans-kursu` |
| BMD-5 Semt · Taksim/Beyoğlu | Yerel + kategori | ₺22 | `/taksim-dans-kursu` — **çelişki 1 çözülmeden AÇILMAZ** |
| BMD-6 Başlangıç & Yaş İtirazı | Bilgi arayan | ₺16 | `/makaleler/dansa-kac-yasinda-baslanir` |
| BMD-7 Kontrollü Genel Dans | Geniş, riskli | **₺12 sert tavan** | `/dans-kursu-istanbul` |

---

### BMD-1 · MARKA & EĞİTMEN (8 kelime)
Ucuz, yüksek dönüşümlü, rakip konquest'ine karşı savunma hattı.

| Kelime | Eşleşme |
|---|---|
| `[broadway musical dance]` | tam |
| `[techne lab]` | tam |
| `[techne lab istanbul]` | tam |
| `[technelab]` | tam |
| `"broadway musical dance istanbul"` | sıralı |
| `"techne lab dans"` | sıralı |
| `"köksal ünal dans"` | sıralı |
| `"köksal ünal broadway"` | sıralı |

---

### BMD-2 · BROADWAY & MÜZİKAL DANS — ANA OMURGA (12 kelime)
Kullanıcının açık talebinin merkezi. Bu grup kampanyanın kalbi; bütçenin en büyük payı buraya.

| Kelime | Eşleşme |
|---|---|
| `[broadway müzikal dansı]` | tam |
| `[broadway dans kursu]` | tam |
| `[müzikal dans kursu]` | tam |
| `[broadway dans istanbul]` | tam |
| `[müzikal dansı]` | tam |
| `"broadway müzikal dans kursu"` | sıralı |
| `"müzikal dans kursu istanbul"` | sıralı |
| `"broadway dansı öğrenmek"` | sıralı |
| `"müzikal dans atölyesi"` | sıralı |
| `"broadway koreografi kursu"` | sıralı |
| `"broadway dance class istanbul"` | sıralı |
| `"musical theatre dance istanbul"` | sıralı |

---

### BMD-3 · JAZZ & THEATRE DANCE (13 kelime)
Persona 2'nin dili. TBM'si BMD-2'den düşük, dönüşüm oranı yüksek. **Uyarı:** "jazz" kelimesi müzik aramalarına açılır — C bölümündeki müzik negatifleri bu grup için hayati.

| Kelime | Eşleşme |
|---|---|
| `[jazz dans kursu]` | tam |
| `[jazz dance istanbul]` | tam |
| `[caz dansı kursu]` | tam |
| `[theatre dance istanbul]` | tam |
| `[sahne dansı kursu]` | tam |
| `"jazz dans kursu istanbul"` | sıralı |
| `"jazz dans dersi"` | sıralı |
| `"jazz dance kursu kadıköy"` | sıralı |
| `"caz dansı dersi istanbul"` | sıralı |
| `"theatre dance kursu"` | sıralı |
| `"tiyatro dansı atölyesi"` | sıralı |
| `"showdance istanbul"` | sıralı |
| `"koreografi atölyesi istanbul"` | sıralı |

---

### BMD-4 · SEMT · KADIKÖY (11 kelime)
Semt kelimeleri brifingdeki israfın kaynağıydı — ama sorun semt değil, semtin **niteleyicisizliği**. `dans kursu kadıköy` çöp; `kadıköy jazz dans` altın. Bu grupta niteleyicisiz olanlar yalnızca **tam eşleşme** ile ve düşük teklifle duruyor.

| Kelime | Eşleşme |
|---|---|
| `[kadıköy broadway dans]` | tam |
| `[kadıköy jazz dans]` | tam |
| `[kadıköy müzikal dans]` | tam |
| `[kadıköy dans atölyesi]` | tam |
| `[kadıköy dans kursu]` | tam — düşük teklif (₺14), ayrı izlenecek |
| `"kadıköy sahne dansı"` | sıralı |
| `"kadıköy koreografi atölyesi"` | sıralı |
| `"anadolu yakası broadway dans"` | sıralı |
| `"anadolu yakası jazz dans"` | sıralı |
| `"moda dans atölyesi"` | sıralı |
| `"rasimpaşa dans stüdyosu"` | sıralı |

---

### BMD-5 · SEMT · TAKSİM / BEYOĞLU (10 kelime) — ŞARTLI
**Bu grup, `taksim-dans-kursu` ve `beyoglu-dans-kursu` sayfaları düzeltilene kadar duraklatılmış olarak kurulacak.** (bkz. çelişki 1)

| Kelime | Eşleşme |
|---|---|
| `[taksim broadway dans]` | tam |
| `[taksim jazz dans]` | tam |
| `[taksim müzikal dans]` | tam |
| `[beyoğlu dans atölyesi]` | tam |
| `[taksim dans kursu]` | tam — düşük teklif (₺13) |
| `"taksim dans atölyesi"` | sıralı |
| `"beyoğlu broadway dans"` | sıralı |
| `"avrupa yakası müzikal dans"` | sıralı |
| `"cihangir dans atölyesi"` | sıralı |
| `"harbiye dans kursu"` | sıralı |

---

### BMD-6 · BAŞLANGIÇ SEVİYESİ & YAŞ İTİRAZI (12 kelime)
Persona 1'in gerçek arama anı. Bu kişi henüz "broadway" kelimesini bilmiyor; bir **itirazı** arıyor. Ayrı grup olmasının sebebi ayrı teklif (₺16) ve ayrı açılış sayfası (makale) verilebilmesi.

| Kelime | Eşleşme |
|---|---|
| `[dansa kaç yaşında başlanır]` | tam |
| `[sıfırdan dans kursu]` | tam |
| `[yetişkin dans kursu istanbul]` | tam |
| `[başlangıç dans kursu istanbul]` | tam |
| `"hiç dans etmedim kurs"` | sıralı |
| `"deneyimsizler için dans kursu"` | sıralı |
| `"30 yaşında dansa başlamak"` | sıralı |
| `"40 yaşında dansa başlamak"` | sıralı |
| `"yetişkinler için dans atölyesi"` | sıralı |
| `"dansa nasıl başlanır"` | sıralı |
| `"dans öğrenmek istiyorum nereden başlamalıyım"` | sıralı |
| `"yetişkin başlangıç dans dersi"` | sıralı |

---

### BMD-7 · KONTROLLÜ GENEL DANS (9 kelime) — SERT TAVANLI
Kullanıcının "diğer dans kursu arayanlara da çıkalım" talebinin uygulandığı yer. Sınır bölüm I'de tanımlı. **Bu grup ₺12 tavanla, yalnızca tam eşleşmeyle ve haftalık zorunlu arama terimi denetimiyle çalışır. 21 günde dönüşüm yoksa kapanır.**

| Kelime | Eşleşme |
|---|---|
| `[dans atölyesi istanbul]` | tam |
| `[dans kursu istanbul]` | tam |
| `[istanbul dans atölyesi]` | tam |
| `[dans dersi istanbul]` | tam |
| `[yetişkin dans atölyesi]` | tam |
| `[sahne dansı atölyesi]` | tam |
| `[dans kursu anadolu yakası]` | tam |
| `[koreografi dersi istanbul]` | tam |
| `[dans eğitimi istanbul]` | tam |

> Neden yalnızca tam eşleşme: sıralı eşleşmede `"dans kursu istanbul"` → "istanbul salsa dans kursu", "istanbul çocuk dans kursu", "istanbul ücretsiz dans kursu" hepsini yakalar. Tam eşleşme bu üçünü de dışarıda bırakır. Brifingdeki israfın büyük kısmı tam olarak bu farkta duruyor.

---

## C) NEGATİF KELİMELER — BROADWAY

### Yöntem kuralı (PLAN-A 0.4'ün devamı)
- **Tek kelimelik negatif yalnızca** o kelimenin bizim için hiçbir meşru sorguda geçmediği durumda kullanılır. `tango`, `zumba`, `salsa` böyledir. `yaş`, `fiyat`, `oyun`, `dans` **asla** tek kelime negatif yapılmaz.
- **Fiyat sorguları için sıralı değil TAM negatif kullanılacak.** `"dans kursu fiyat"` sıralı negatifi, "broadway dans kursu fiyat" sorgusunu da bloklar — o sorgu bizim en niyetli sorgumuz. Bu yüzden aşağıda fiyat negatifleri `[köşeli]` yazıldı.

---

### HESAP SEVİYESİ PAYLAŞIMLI LİSTELER
Bu beş liste **hesaptaki tüm kampanyalara** uygulanır (Broadway, Musical Lab ve PLAN-A'daki üç kampanya dahil). Google Ads → Araçlar → Paylaşılan kitaplık → Negatif anahtar kelime listeleri.

**LİSTE A — "Ücretsiz & Kamu"**
`"ücretsiz"` · `"bedava"` · `"belediye"` · `"belediyesi"` · `"belediye kursu"` · `"ismek"` · `"i̇smek"` · `"halk eğitim"` · `"halk eğitimi"` · `"hem kursu"` · `"ibb"` · `"ibb enstitü"` · `"kültür merkezi kursları"` · `"gençlik merkezi"` · `"kaymakamlık kursu"` · `"burslu kurs"` · `"devlet destekli"`

> Tek başına ₺89'luk "kadıköy belediyesi dans kursu" tıklamasını ve türevlerini keser. Bu kitle ödemez.
> *Not: "gençlik merkezi" bir negatif kelimedir, kullanıcıya gösterilen metin değildir — kural 4'ün kapsamına girmez. Yine de kurucu isterse çıkarılabilir, o zaman "belediye" negatifi trafiğin çoğunu zaten yakalar.*

**LİSTE B — "İş İlanı & Kariyer"**
`"iş ilanı"` · `"iş ilanları"` · `"eleman aranıyor"` · `"eleman alımı"` · `"iş başvurusu"` · `"maaş"` · `"ne kadar maaş"` · `"hoca arıyorum"` · `"eğitmen arıyorum"` · `"eğitmen alımı"` · `"öğretmen alımı"` · `"kariyer"` · `"staj"` · `"part time iş"` · `"franchise"` · `"bayilik"` · `"stüdyo kiralama"` · `"salon kiralama"`

**LİSTE C — "Akademik, Sınav & Diploma"**
`"üniversite"` · `"bölümü"` · `"taban puan"` · `"yks"` · `"tyt"` · `"ayt"` · `"özel yetenek sınavı"` · `"konservatuvar sınavı"` · `"konservatuvar hazırlık"` · `"lisans"` · `"önlisans"` · `"yüksek lisans"` · `"meb onaylı"` · `"sertifika programı"` · `"diploma"` · `"usta öğretici"` · `"eğitmenlik sertifikası"` · `"mülakat soruları"` · `"ders notları"` · `"pdf"` · `"nedir kısaca"` · `"ödev"`

**LİSTE D — "İzleme, Bilet & Etkinlik"**
`"bilet"` · `"biletix"` · `"passo"` · `"gösteri izle"` · `"oyun izle"` · `"seans saatleri"` · `"vizyondaki"` · `"full izle"` · `"türkçe dublaj"` · `"şarkı sözleri"` · `"şarkıları"` · `"soundtrack"` · `"broadway new york"` · `"new york müzikal"` · `"müzikal izle"` · `"müzikal önerileri"` · `"en iyi müzikaller"` · `"hamilton"` · `"wicked"` · `"les miserables"` · `"chicago müzikal"` · `"phantom of the opera"`

> Bu liste küçümsenmemeli. "Broadway" ve "müzikal" kelimelerinin arama hacminin çoğunluğu **izlemek** isteyen kullanıcıdan geliyor, öğrenmek isteyenden değil. Musical Lab için de aynı derecede kritik.

**LİSTE E — "Müfredat Dışı Dans Stilleri"**
`"tango"` · `"salsa"` · `"bachata"` · `"kizomba"` · `"zumba"` · `"flamenko"` · `"sirtaki"` · `"halk oyunları"` · `"halk dansları"` · `"folklor"` · `"zeybek"` · `"horon"` · `"çiftetelli"` · `"oryantal"` · `"göbek dansı"` · `"belly dance"` · `"hip hop dans"` · `"hiphop"` · `"breakdans"` · `"break dance"` · `"pole dans"` · `"twerk"` · `"k-pop dans"` · `"kpop"` · `"swing dans"` · `"lindy hop"` · `"rock and roll dans"` · `"vals"` · `"cha cha"` · `"tap dans"` · `"step dans"` · `"modern dans"` · `"çağdaş dans"` · `"bale kursu"` · `"bale dersi"` · `"bale okulu"` · `"latin dansları"` · `"sosyal dans"` · `"ballroom"`

> Brifingdeki tıkların ₺153,70'ini doğrudan bu liste keserdi. `"bale kursu"` ve `"bale dersi"` sıralı yazıldı, tek başına `bale` değil — çünkü Persona 2'nin "bale geçmişi olanlar için jazz" tipi sorgularını korumak istiyoruz.
> `"tap dans"` ve `"modern dans"` için bkz. çelişki 7 ve 8.

---

### KAMPANYA ÖZEL NEGATİFLER — BROADWAY

**Fiyat & ucuzluk arayanları (TAM eşleşmeli negatif)**
`[dans kursu fiyatları]` · `[dans kursu fiyat]` · `[dans kursu ücretleri]` · `[kadıköy dans kursu fiyatları]` · `[istanbul dans kursu fiyatları]` · `[en ucuz dans kursu]` · `[ucuz dans kursu]` · `[dans kursu ne kadar]` · `[aylık dans kursu ücreti]`

> Fiyat sitede gizli. "Fiyatları" çoğul arayan kişi karşılaştırma yapıyor ve fiyat göremeyeceği bir sayfaya düşüyor — ₺62,80'lik tıklama tam olarak buydu. Ama `[broadway dans kursu fiyat]` gibi **program adı içeren** fiyat sorguları açık bırakıldı; o kişi bizi arıyor, pazarı değil.

**Düğün & çiftlere özel**
`"düğün dansı"` · `"ilk dans"` · `"nikah dansı"` · `"damat dansı"` · `"gelin dansı"` · `"çiftlere özel dans"` · `"çift dansı"` · `"özel ders dans"` · `"birebir dans dersi"` · `"kına dansı"` · `"parti dansı"` · `"koreografi düğün"`

**Yaş dışı (program 12–55)**
`"çocuk dans kursu"` · `"çocuklar için dans"` · `"anaokulu dans"` · `"3 yaş dans"` · `"4 yaş dans"` · `"5 yaş dans"` · `"6 yaş dans"` · `"7 yaş dans"` · `"minikler dans"` · `"okul öncesi dans"` · `"bebek jimnastik"`

> Program 12 yaşından başlıyor, bu yüzden `"10 yaş"`, `"12 yaş"`, `"13 yaş"` **negatiflenmiyor**. PLAN-A 0.4'ün uyarısı burada da geçerli: `yaş` tek kelime negatif yapılırsa 12–55 bandının tamamı ölür.

**Fitness & spor niyeti (Persona 4 kararı)**
`"kilo verme dansı"` · `"yağ yakan dans"` · `"kalori yakma"` · `"dans fitness"` · `"dans aerobik"` · `"spor salonu dans"` · `"fitness dersi"` · `"pilates"` · `"yoga"` · `"crossfit"` · `"aletli pilates"` · `"zayıflama"`

**Müzik karışması (BMD-3 için kritik)**
`"caz müzik"` · `"caz festivali"` · `"caz konseri"` · `"jazz festival"` · `"jazz müzik"` · `"jazz piyano"` · `"jazz gitar"` · `"caz bar"` · `"canlı müzik"` · `"jazz playlist"`

**Yarışma & TV**
`"dancing with the stars"` · `"yetenek sizsiniz"` · `"o ses"` · `"survivor"` · `"dans yarışması"` · `"yarışma başvurusu"` · `"seçmeleri"` · `"kadro alımı"` · `"figüran"` · `"dansçı alımı"`

**Rakip markalar (konquest kararı verilene kadar)**
`"ve dans"` · `"ve dans kadıköy"`

> Brifingde ₺30,44'lük bir rakip marka tıklaması var ve bu kazara alınmış. **Karar: konquest bilinçli yapılır ya da hiç yapılmaz.** Bilinçli versiyonu H-3'te.

**Yer dışı**
`"ankara"` · `"izmir"` · `"bursa"` · `"antalya"` · `"online dans"` · `"uzaktan eğitim"` · `"youtube dans dersi"` · `"ücretsiz video ders"`

---

## D) REKLAM METİNLERİ — BROADWAY

Parantez içindeki sayı karakter sayısıdır (başlık ≤30, açıklama ≤90).
**Sabitleme:** Her grupta 1. başlık Konum 1'e sabitlenir (grup alaka sinyali), gerisi serbest.
**Uyarı:** Kontenjan rakamı içeren başlıklar ⚠ ile işaretlendi — çelişki 2 çözülmeden kullanılmayacak.
**Uyarı:** "Erken Kayıt Dönemi" başlığı 10 Eylül'den sonra çıkarılacak (çelişki 5).

---

### RSA · BMD-1 (Marka)
**Görünen yol:** `/broadway-dans` `/kadikoy`

**Başlıklar**
1. Broadway Musical Dance (22)
2. Techne Lab İstanbul (19)
3. Köksal Ünal ile Çalışma (23)
4. 17 Eylül Perşembe (17)
5. 6 ya da 12 Hafta (16)
6. Jazz ve Theatre Dance (21)
7. Dans Deneyimi Şart Değil (24)
8. 12–55 Yaş Arası (15)
9. Bağımsız Tiyatro Şirketi (24)
10. Program Sayfasında Detay (24)
11. Başvuru Formu Sitede (20)
12. Küçük Gruplar (13)

**Açıklamalar**
1. Köksal Ünal ile Broadway müzikal dansı: jazz, theatre dance ve koreografi. (74)
2. 17 Eylül Perşembe 19:00'da başlıyor. Altı ya da on iki haftalık iki seçenek. (76)
3. Adım ezberletmiyoruz; sahnede taşıyabileceğin bir beden dili kuruyoruz. (68)
4. Program sayfasında haftalık içerik, mekân ve başvuru formu yer alıyor. (70)

---

### RSA · BMD-2 (Broadway & Müzikal Dans — ANA)
**Görünen yol:** `/broadway-dans` `/muzikal-dans`

**Başlıklar**
1. Broadway Müzikal Dansı (22)
2. Müzikal Dans Kursu (18)
3. Jazz ve Theatre Dance (21)
4. Broadway Repertuarından (23)
5. Sahne Koreografisi (18)
6. 17 Eylül Perşembe (17)
7. Perşembe 19:00 · Kadıköy (24)
8. 12 Haftalık Tam Program (24)
9. 6 Haftalık Kısa Program (24)
10. Dans Deneyimi Şart Değil (24)
11. Seçme ve Seviye Sınavı Yok (27)
12. Köksal Ünal ile Çalışma (23)

**Açıklamalar**
1. Jazz ve theatre dance teknikleriyle sahne koreografisi. Deneyim şartı aranmıyor. (81)
2. Broadway dansı teknikten önce anlatıdır — her hareket bir niyet taşıyor. (72)
3. Altı haftalık kısa blok ya da on iki haftalık tam program. Kararı sen veriyorsun. (81)
4. 17 Eylül Perşembe 19:00'da başlıyor. Kadıköy stüdyosunda, haftada bir akşam. (76)

---

### RSA · BMD-3 (Jazz & Theatre Dance)
**Görünen yol:** `/jazz-dans` `/theatre-dance`

**Başlıklar**
1. Jazz Dans Atölyesi (18)
2. Caz Dansı Atölyesi (18)
3. Theatre Dance Kursu (19)
4. Sahne Dansı Atölyesi (20)
5. İzolasyon ve Senkopasyon (24)
6. Jazz Temelinden Başla (22)
7. Broadway Dans Dili (18)
8. Bale Altyapısı Gerekmiyor (25)
9. Koreografi Atölyesi (19)
10. Perşembe 19:00 · Kadıköy (24)
11. 6 ya da 12 Hafta (16)
12. Köksal Ünal ile Çalışma (23)

**Açıklamalar**
1. Jazz dance Broadway sahnesinin omurgası: izolasyon, senkopasyon, stil. (70)
2. Bale altyapısı istemeyen ender sahne dansı formlarından biri. Temelden başlıyoruz. (83)
3. Theatre dance teknik pratiği dramatik anlatıyla birleştirir — hareket karakter taşır. (86)
4. Perşembe akşamları Kadıköy'de; mesai sonrası yetişilebilen bir saatte. (69)

---

### RSA · BMD-4 (Semt · Kadıköy)
**Görünen yol:** `/kadikoy-dans-kursu` `/broadway`

**Başlıklar**
1. Kadıköy Dans Atölyesi (21)
2. Broadway Müzikal Dansı (22)
3. Jazz Dans · Kadıköy (19)
4. Perşembe 19:00 · Kadıköy (24)
5. Anadolu Yakası · Kadıköy (24)
6. Marmaray'a Yürüme Mesafesi (26)
7. 17 Eylül Perşembe (17)
8. Dans Deneyimi Şart Değil (24)
9. 6 ya da 12 Hafta (16)
10. Yetişkin Dans Grupları (22)
11. Seçme ve Seviye Sınavı Yok (27)
12. Sahne Dansı Atölyesi (20)

**Açıklamalar**
1. Kadıköy stüdyosu Marmaray Ayrılık Çeşmesi durağına yürüme mesafesinde. (70)
2. Fitness dersi değil, sahne dansı. Hareket burada anlatının aracı oluyor. (72)
3. Perşembe 19:00–21:00. Üsküdar, Ataşehir ve Bostancı'dan ulaşım kolay. (69)
4. Altı haftalık kısa blok ya da on iki haftalık tam program. Kararı sen veriyorsun. (81)

---

### RSA · BMD-5 (Semt · Taksim / Beyoğlu) — DURAKLATILMIŞ KURULACAK
**Görünen yol:** `/taksim-dans-kursu` `/broadway`

**Başlıklar**
1. Taksim Dans Atölyesi (20)
2. Broadway Müzikal Dansı (22)
3. Perşembe 19:00 · Taksim (23)
4. Avrupa Yakası · Taksim (22)
5. Jazz ve Theatre Dance (21)
6. 17 Eylül Perşembe (17)
7. 6 ya da 12 Hafta (16)
8. Dans Deneyimi Şart Değil (24)
9. Sahne Koreografisi (18)
10. Yetişkin Dans Grupları (22)
11. Seçme ve Seviye Sınavı Yok (27)
12. Köksal Ünal ile Çalışma (23)

**Açıklamalar**
1. Jazz ve theatre dance teknikleriyle sahne koreografisi. Deneyim şartı aranmıyor. (81)
2. 17 Eylül Perşembe 19:00'da başlıyor. Haftada bir akşam, iş çıkışına uygun. (74)
3. Adım ezberletmiyoruz; sahnede taşıyabileceğin bir beden dili kuruyoruz. (68)
4. Program sayfasında haftalık içerik, mekân ve başvuru formu yer alıyor. (70)

> **Bu RSA yayına alınmadan önce:** `taksim-dans-kursu` sayfasındaki *"Taksim'de dans dersi veriyor musunuz? Hayır"* SSS maddesi düzeltilmeli. Aksi hâlde reklam Taksim vaat edip sayfa Taksim'i reddediyor.

---

### RSA · BMD-6 (Başlangıç & Yaş İtirazı)
**Görünen yol:** `/makaleler` `/dansa-baslamak`
Kullanıcının beğendiği cümlenin ana taşındığı grup burası.

**Başlıklar**
1. Dansa Yeni Başlayanlara (23)
2. İster Yeni Başla, İster Dene (28)
3. Dansa Başlamak İçin Geç Değil (29)
4. Yeni Bir Disiplin Dene (22)
5. Sıfırdan Başlayanlara (21)
6. Yaş Değil, Ritim Meselesi (25)
7. Bale Altyapısı Gerekmiyor (25)
8. Seçme ve Seviye Sınavı Yok (27)
9. 12–55 Yaş Arası (15)
10. 6 Haftalık Kısa Program (24)
11. Broadway Müzikal Dansı (22)
12. Perşembe 19:00 · Kadıköy (24)

**Açıklamalar**
1. İster dansa yeni başla, ister yeni bir disiplin dene — program tam sana göre. (77)
2. Dansa yeni başlayan da yeni bir disiplin arayan da aynı yerden başlıyor. (72)
3. 12–55 yaş arası herkese açık. Bale altyapısı ya da esneklik şartı yok. (70)
4. Altı haftalık kısa blokla başla, devam kararını sonunda ver. Seçme yok. (71)

---

### RSA · BMD-7 (Kontrollü Genel Dans)
**Görünen yol:** `/dans-kursu-istanbul` `/broadway`
Bu metnin işi tık toplamak değil, **yanlış kullanıcıyı tıklamadan önce elemek.** Başlıklar bilinçli olarak ayırt edici: "müzikal", "sahne", "Broadway" kelimeleri ilk sırada; salsa arayan bunu görüp geçsin.

**Başlıklar**
1. Sahne Dansı Atölyesi (20)
2. Broadway Müzikal Dansı (22)
3. Jazz ve Theatre Dance (21)
4. Müzikal Dans Kursu (18)
5. Fitness Değil, Sahne Dansı (26)
6. Adım Ezberi Değil, Sahne (24)
7. Yetişkin Dans Grupları (22)
8. Perşembe 19:00 · Kadıköy (24)
9. 6 ya da 12 Hafta (16)
10. Dans Deneyimi Şart Değil (24)
11. Koreografi Atölyesi (19)
12. 17 Eylül Perşembe (17)

**Açıklamalar**
1. Sosyal dans ya da fitness dersi değil: Broadway müzikallerinin dans dili. (74)
2. Jazz ve theatre dance teknikleriyle sahne koreografisi. Deneyim şartı aranmıyor. (81)
3. Perşembe akşamları Kadıköy'de; mesai sonrası yetişilebilen bir saatte. (69)
4. Altı haftalık kısa blok ya da on iki haftalık tam program. Kararı sen veriyorsun. (81)

---

### ⚠ Koşullu başlıklar (çelişki 2 ve 5 çözülünce eklenecek)
- `Grup 15 Kişiyle Sınırlı (23)` — `data.ts` 15 diyor, `kadikoy-dans-kursu` sayfası 12 diyor. Netleşmeden kullanılmaz.
- `Erken Kayıt Dönemi (18)` — yalnızca 10 Eylül'e kadar.

---

## E) UZANTILAR — BROADWAY

### Site bağlantısı (4 adet)
| Başlık (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| Program İçeriği (15) | Üç evre, on iki hafta (21) | Teknik, koreografi, performans (30) | `/atolyeler/broadway-musical-dance` |
| 6 ya da 12 Hafta (16) | İki taahhüt seçeneği (21) | Kısa blokla başlanabiliyor (28) | `/atolyeler/broadway-musical-dance#program` |
| Jazz Dance Nedir (16) | Tekniğin beş temel taşı (24) | Okuması dört dakika (19) | `/makaleler/jazz-dance-nedir` |
| Başvuru Formu (13) | Birkaç dakika sürüyor (21) | Seçme ya da video yok (22) | `/atolyeler/broadway-musical-dance/kayit` |

### Açıklama metni / öne çıkan site metni (callout, ≤25)
`Dans deneyimi şart değil` (24) · `Seçme ve sınav yok` (18) · `Perşembe 19:00` (14) · `6 ya da 12 hafta` (16) · `12–55 yaş` (9) · `Jazz ve theatre dance` (21) · `Haftada bir akşam` (17)

### Yapılandırılmış snippet
**Başlık:** Kurslar
**Değerler:** Broadway dansı (14) · Jazz dance (10) · Theatre dance (13) · Sahne koreografisi (18) · Müzikal dans (12)

**İkinci snippet — Başlık:** Türler
**Değerler:** 6 haftalık blok (15) · 12 haftalık program (18) · Yetişkin grupları (17) · Başlangıç seviyesi (18)

### Görsel uzantısı
`data.ts` id 6 görselleri: `dslr-zl5a1044`, `dslr-zl5a1043`, `dslr-zl5a1064`, `dslr-zl5a1092`. 1200×1200 ve 1200×628 iki formatta. Tercih: hareket hâlinde, grup görüntüsü — "tek kişilik özel ders" izlenimi vermesin.

### Kullanılmayacak uzantılar
- **Çağrı uzantısı:** ❌ kural 1
- **Fiyat uzantısı:** ❌ kural 2
- **Promosyon uzantısı:** ❌ kural 3 (indirim oranı yazmak zorunlu)
- **Konum uzantısı:** ❌ sabit bina yok, partner mekânlarda çalışılıyor — yanlış beklenti üretir

### Konum hedefleme önerisi
| Katman | Ayar | Teklif ayarı |
|---|---|---|
| Kadıköy merkez (Rasimpaşa / Söğütlüçeşme) | 6 km yarıçap | **+%25** |
| Anadolu yakası genişletme (Üsküdar, Ataşehir, Maltepe, Bostancı, Kozyatağı) | ilçe seçimi | +%10 |
| Taksim / Beyoğlu merkez | 5 km yarıçap | 0 (BMD-5 açılırsa) |
| İstanbul geneli — kalan | il seçimi | **−%30** |
| Hedefleme türü | "Bu konumdaki kişiler" | — |

**Gerekçe:** Perşembe 19:00 dersine Beylikdüzü'nden ya da Pendik'ten gelinmiyor. Bu programda gerçek satın alma engeli fiyat değil, ulaşım. Yarıçap ayarı yapılmazsa bütçenin bir kısmı fiziksel olarak gelemeyecek kişilere gider.

---

## F) AÇILIŞ SAYFASI — BROADWAY

| Grup | URL |
|---|---|
| BMD-1, BMD-2, BMD-3 | `https://www.technelabistanbul.com/atolyeler/broadway-musical-dance` |
| BMD-4 | `https://www.technelabistanbul.com/kadikoy-dans-kursu` |
| BMD-5 | `https://www.technelabistanbul.com/taksim-dans-kursu` — **düzeltilmeden kullanılmaz** |
| BMD-6 | `https://www.technelabistanbul.com/makaleler/dansa-kac-yasinda-baslanir` |
| BMD-7 | `https://www.technelabistanbul.com/dans-kursu-istanbul` |

### Mevcut durum
Sayfa ekosistemi güçlü: program sayfası + üç disiplin sayfası (`dans-kursu-istanbul`, `kadikoy-dans-kursu`, `taksim-dans-kursu`, `beyoglu-dans-kursu`) + üç makale (`broadway-muzikali-dans-kursu-istanbul`, `jazz-dance-nedir`, `dansa-kac-yasinda-baslanir`). Reklamın ihtiyacı olan her niyet katmanının bir sayfası var. Bu, hesapta en iyi durumdaki hat.

### Eksikler
1. **Taksim/Beyoğlu sayfaları programı reddediyor** (çelişki 1). Öncelik 1 iş bu.
2. **6/12 hafta seçimi sayfada bir karar noktası olarak sunulmuyor.** Aşağıda ayrı başlık.
3. **`/basvuru` yok** — gerçek rota `/atolyeler/broadway-musical-dance/kayit`. Uzantılarda bu kullanıldı.
4. **Fiyat beklentisi karşılanmıyor.** Fiyat sitede gizli; sayfa bunu **açıkça söylemeli**: "Ücret başvuru sonrası birebir paylaşılıyor" cümlesi fiyat bloğunun olması gereken yerde, ekranın üst yarısında görünmeli. Söylenmezse kullanıcı "fiyat yok" diye okuyup çıkıyor.
5. **`/dans-kursu-istanbul` sayfası Taksim'den hiç bahsetmiyor** ve *"Kadıköy'de, on iki ya da altı hafta"* diyor — BMD-7 buraya iniyor, tutarlılık gerekiyor.
6. **Ücretsiz alternatif itirazı yanıtlanmıyor.** Brifingdeki en pahalı tek tık "kadıköy belediyesi dans kursu" idi. Negatif bu trafiği keser ama `/kadikoy-dans-kursu` sayfasına "Belediye kursundan farkı ne?" başlıklı dürüst bir SSS maddesi eklenirse organik tarafta da kazanılır.
7. **BMD-6'nın açılış sayfası bir makale** — makalede program sayfasına iki iç link var ama **görünür bir CTA butonu yok**. Reklamdan gelen kullanıcı okumaz, tıklar ya da çıkar. Makalenin ilk ekranına "Programa bak" butonu eklenmeli.

### 6/12 hafta seçeneği sayfada nasıl sunulmalı

**Sorun:** Bugün sayfada "12 hafta ya da 6 hafta" bir süre bilgisi olarak duruyor. Oysa bu, programın **en güçlü satış aracı**: taahhüt korkusunu ortadan kaldıran bir kapı.

**Öneri — iki kartlı bir seçim bloğu, fiyat olmadan:**

| | **6 HAFTA — TEMEL BLOK** | **12 HAFTA — TAM PROGRAM** |
|---|---|---|
| Kim için | Dansa yeni başlayan, önce denemek isteyen | Sezonu bitirmek, koreografi çıkarmak isteyen |
| İçerik | Teknik temel + ilk kombinasyonlar | Üstüne stil, ileri koreografi, final çalışması |
| Başlangıç | 17 Eylül Perşembe 19:00 | 17 Eylül Perşembe 19:00 |
| Sonrası | Sonunda tam programa geçebilirsin | — |

**Kurallar:**
- **İki kart aynı boyutta olmalı.** 6 haftalık "küçük/ucuz seçenek" gibi görünürse Persona 1'i utandırır; asıl giriş kapısı o.
- **Fiyat yok** (kural 2 + sitede fiyat gizli kararı). Ayrım süre ve içerikle anlatılır, rakamla değil.
- **"Sonunda tam programa geçebilirsin" cümlesi kritik.** `kadikoy-dans-kursu` sayfası bunu zaten söylüyor: *"6 haftalık kısa programla başlayabilirsin; sonunda 12 haftalık tam programa geçip geçmemek senin kararın."* Bu cümle program sayfasına da taşınmalı.
- **DOĞRULANMALI:** 6 hafta, 12 haftanın ilk yarısı mı yoksa bağımsız bir blok mu? Makale "temel blok (teknik + koreografi)" diyor, `data.ts` blokları 1–4 / 5–8 / 9–12 şeklinde. İkisi uyumlu görünüyor ama sayfada net yazılmalı — kullanıcı "6 hafta sonra kaldığım yerden mi devam ediyorum" diye soruyor.
- **İçeriden not (sayfaya yazılmaz):** 6 hafta 9.500 ₺, 12 hafta 16.500 ₺ — yani 12 haftanın hafta başına maliyeti yaklaşık %13 daha düşük. Bu argüman **satış görüşmesinin** aracıdır, sayfanın değil. Reklamda ve sayfada yalnızca taahhüt merdiveni anlatılır.

---

## G) BÜTÇE VE TEKLİF — BROADWAY

### Günlük bütçe: ₺100 (17 Eylül'e kadar ₺130, sonra ₺70)

**Gerekçe — neden ₺46'dan (bugünkü fiili) yukarı ama %51 payından aşağı:**

Broadway'in bugünkü ₺646/14 gün harcaması iki şeyi birden gösteriyor: (a) bu hatta gerçek arama hacmi **var** — 370 gösterim hesabın en yükseği; (b) o hacmin çoğu bize ait değil. Negatifler ve tam/sıralı eşleşme uygulandığında ulaşılabilir hacim tahminen **%55–70 daralacak**. Yani eski bütçeyi korumak, daralan havuzda TBM'yi şişirmekten başka işe yaramaz.

Ama tersi de doğru: Broadway hesabın **en yakın tarihli** ürünü (17 Eylül) ve **en düşük giriş engelli** ürünü (seçme yok, 6 hafta seçeneği var). Aciliyeti olan tek program bu. Bu yüzden 17 Eylül'e kadar öne yüklenmiş bütçe mantıklı.

| Dönem | Günlük bütçe | Mantık |
|---|---|---|
| 3–10 Eylül | ₺130 | Erken kayıt son tarihi + dönem yaklaşıyor; en yüksek aciliyet |
| 11–17 Eylül | ₺130 | Son hafta; kontenjan kapanma baskısı |
| 18 Eylül–15 Ekim | ₺70 | Dönem başladı; 6 haftalık ikinci blok ve sonraki dönem için liste biriktirme |
| 16 Ekim sonrası | ₺70 · yeniden değerlendir | Bir sonraki dönem tarihi netleşince yeniden kurgula |

### Teklif stratejisi: **Manuel TBM · Gelişmiş TBM KAPALI** (ilk 21 gün)

**Gerekçe:** Hesapta içe aktarılmış Google Ads dönüşümü olduğu doğrulanamıyor (çelişki 10). Dönüşüm verisi olmadan akıllı teklif çalışmaz; "Tıklamaları Maksimuma Çıkar" ise bu hesapta zaten yüksek olan TBM'yi (₺25–30) daha da iter. Brifingin cümlesi geçerli: *"Bu fiyata yanlış tık lüks."*

Ama asıl sebep daha önemli: **manuel teklif, bölüm I'deki sınırın uygulama mekanizmasıdır.** Genel dans aramalarına "gireceğiz ama pahalıya girmeyeceğiz" kararı ancak grup bazlı tavanlarla uygulanabilir. Akıllı teklife geçilirse Google, tık alabildiği için genel gruba yüklenir ve bugünkü durum geri gelir.

**Grup bazlı TBM tavanları**

| Grup | Tavan | Not |
|---|---|---|
| BMD-1 Marka | ₺8 | Marka aramasında rekabet yok |
| BMD-2 Broadway & Müzikal Dans | ₺30 | En yüksek — ana omurga, en yüksek dönüşüm beklentisi |
| BMD-3 Jazz & Theatre Dance | ₺26 | Rekabeti düşük, TBM'nin bu tavana dayanması beklenmiyor |
| BMD-4 Kadıköy | ₺24 · `[kadıköy dans kursu]` için ₺14 | Niteleyicisiz kelime ayrı tavanla |
| BMD-5 Taksim | ₺22 · `[taksim dans kursu]` için ₺13 | Şartlı |
| BMD-6 Başlangıç | ₺16 | Bilgi niyeti, yavaş dönüşüm, yeniden pazarlama besleyicisi |
| BMD-7 Kontrollü Genel | **₺12 sert** | Ana grubun %40'ı. Bu tavan bir bütçe kararı değil, bir **sınır** kararı |

### Geçiş koşulu
30 gün içinde **15+ form dönüşümü** toplanırsa → "Dönüşümleri Maksimuma Çıkar", hedef EBM olmadan, 14 gün öğrenme. Öncesinde geçilmez. Geçilirse BMD-7 **aynı gün kapatılmalı** — akıllı teklifle sert tavan uygulanamaz ve genel grup bütçeyi yutar.

---

## H) YARATICI ÇÖZÜMLER — BROADWAY

**1. 6 haftalık paketi "deneme kapısı" olarak ayrı bir teklif hattına çıkar**
BMD-6'da (başlangıç grubu) tüm metin altı hafta üzerine kurulsun; BMD-2'de (ana omurga) tüm metin on iki hafta üzerine. Aynı ürün, iki farklı taahhüt vaadiyle iki farklı personaya satılıyor.
**Neden işe yarar:** Persona 1'in tek gerçek itirazı "ya beceremezsem / ya sıkılırsam". Bu itiraza fiyatla cevap veremiyoruz (kural 2), **süreyle** verebiliyoruz. Altı hafta, "bir aylık spor salonu üyeliği" psikolojik bandında; on iki hafta değil. Ayrıca bu, geniş dans kitlesini yakalamanın tek meşru yolu: onlara "Broadway dansçısı ol" demiyoruz, "altı hafta dene" diyoruz.

**2. Jazz dance içeriğini huninin üst ucu yap, yeniden pazarlamayla kapat**
`jazz-dance-nedir.mdx` ciddi bir içerik ve şu an reklamda kullanılmıyor. BMD-3 ve BMD-6'nın site bağlantısı olarak konuldu; ayrıca "jazz dance nedir", "caz dansı nedir", "theatre dance nedir" bilgi sorguları için ₺10 tavanlı bir alt grup açılabilir → açılış sayfası makale → okuyan ama dönüşmeyen herkes **yeniden pazarlama listesine** düşer → o liste RLSA olarak BMD-2 ve BMD-3'te **+%40 teklifle** geri hedeflenir.
**Neden işe yarar:** ₺10'luk bilgi tıkı, 2–6 hafta sonra ₺30'luk niyet tıkında dönüşüme çevriliyor. Düşük hacimli bir hesapta yeniden pazarlama listesi biriktirmenin başka yolu yok — ve bu hesabın en büyük yapısal sorunu bütçe değil, **hacim**.

**3. Rakip dans okullarına konquest — bilinçli, küçük, ölçülü**
Bugün rakip markasına kazara giriliyor (₺30,44). Karar: ya bilinçli yap ya hiç yapma. Bilinçli versiyon: ayrı bir grup (BMD-8), **yalnızca tam eşleşme**, ₺10 tavan, rakip marka adı **reklam metninde geçmez** (Google politikası + mevzuat). Metin BMD-2'nin aynısı; tek fark 1. başlığın "Broadway Müzikal Dansı" olarak sabitlenmesi — yani "aradığın stüdyo değiliz ama farklı bir şey yapıyoruz" mesajı.
**Neden işe yarar:** Rakip dans okullarının çoğu sosyal dans ya da fitness tabanlı. Onların sayfasına giden kişinin küçük bir yüzdesi aslında sahne dansı arıyor ve bunu bilmiyor. O yüzdeyi ₺10'a almak ucuz. **Uyarı:** 21 günde dönüşüm yoksa kapat; marka aramalarında dönüşüm düşükse marka sahibinin şikâyet riski maliyete değmez.

**4. 17 Eylül'e doğru kademeli aciliyet — teklif değil, metin ve bütçe**
Aciliyet üç katmanda uygulanır: (a) **bütçe** 17 Eylül'e kadar ₺130, sonra ₺70; (b) **metin** — 10 Eylül'e kadar "Erken Kayıt Dönemi" başlığı açık, 11–17 Eylül arası bu başlık "17 Eylül Perşembe" ve "Yeni Dönem 17 Eylül (19)" ile değiştirilir; (c) **geri sayım** — Google Ads'in yerleşik geri sayım özelliği `{=COUNTDOWN}` ile bir başlıkta kullanılabilir.
**Neden işe yarar:** Fiyat ve indirim yasak olduğu için elimizdeki tek gerçek aciliyet aracı **tarih**. Tarih de gerçek — uydurma kıtlık değil, gerçekten 17 Eylül'de başlıyor ve kontenjan sınırlı. Aciliyeti tekliften değil bütçe ve metinden kurmak, TBM'yi şişirmeden aynı sonucu verir.

**5. Perşembe 19:00 dersine uygun profil için gün/saat teklif ayarı**
Ders Perşembe 19:00–21:00 ve katılımcıların çoğu çalışan yetişkin (`kadikoy-dans-kursu`: *"katılımcıların çoğu çalışan yetişkinler"*). Öneri: **Pazar–Çarşamba 20:00–00:00 +%25** (haftaya bakıp planlayan kişi), **Cumartesi–Pazar 11:00–18:00 +%20**, **hafta içi 09:00–16:00 −%20**, **Perşembe 17:00 sonrası −%30** (ders o akşam başlıyor; o saatte arayan bu döneme yetişemez).
**DOĞRULANMALI:** Bu bir davranış varsayımı; hesapta saat kırılımlı rapor yok. İlk 21 gün ayar yapılmadan veri toplanmalı, sonra uygulanmalı. Erken uygulanırsa zaten dar olan hacim daha da daralır.

**6. Musical Lab'e köprü — iki kampanya arasında bilinçli yönlendirme**
`muzikal-oyunculuk-nedir.mdx` ve `kadikoy-muzikal-tiyatro-kursu` sayfası zaten "hangisini seçmeliyim" sorusunu yanıtlıyor. Broadway'in `/kayit` sayfasına ya da teşekkür sayfasına *"Dansla birlikte şan ve oyunculuk da istiyorsan"* bağlantısı konmalı; ayrıca Broadway sayfasını ziyaret edip dönüşmeyenler Musical Lab kampanyasında RLSA olarak +%30 ile hedeflenmeli.
**Neden işe yarar:** Persona 3 iki programın kesişiminde duruyor ve reklam bütçesi bakımından **iki kez satın alınması gereksiz** bir kitle. Broadway'in ucuz ve hacimli trafiği, Musical Lab'in pahalı ve dar trafiğini besleyebilir. Musical Lab'in birim değeri Broadway'in yaklaşık on katı — bu köprü tek başına Musical Lab kampanyasının bütçesinden daha değerli olabilir.

**7. Ücretsiz/belediye itirazını sayfada karşıla (negatif tek başına yetmez)**
Negatifler bu trafiği reklamdan keser ama organik ve doğrudan trafikte itiraz duruyor. `/kadikoy-dans-kursu` ve `/dans-kursu-istanbul` sayfalarına "Belediye kursundan farkı ne?" SSS'i eklenmeli: rakip adı vermeden, dürüst, karşılaştırmalı — grup büyüklüğü, süreklilik, eğitmen, çıktı.
**Neden işe yarar:** Bu itirazı yanıtlamayan sayfa, tıklanan her ücretsiz-eğilimli kullanıcıyı kaybediyor. Ayrıca bu içerik AI Overview ve LLM alıntılarında iyi performans veren tipte bir karşılaştırma metni.

---

## I) BROADWAY ÖZEL — "MÜZİKAL DANS / JAZZ DANS / BROADWAY MÜZİKAL DANS" OLARAK LANSE ETMEK

Kullanıcının iki talebi ilk bakışta çelişik: *"kendi kategorisinde konumlansın"* ve *"diğer dans kursu arayanlara da çıkalım."* Çelişik değiller — biri **konumlandırma** kararı, diğeri **erişim** kararı. Çözüm, ikisini farklı katmanlara koymak.

### Katman 1 — OMURGA (bütçenin ~%45'i · BMD-2)
`broadway müzikal dansı` · `broadway dans kursu` · `müzikal dans kursu` · `broadway dans istanbul` · `müzikal dansı`

Bu kelimeler **markanın kendisi**. Programın adı, sayfa başlığı (`data.ts` seoTitle), makale başlıkları, RSA'ların 1. başlığı — hepsi bu kelimeyle hizalanmalı. Bir kullanıcı "broadway müzikal dansı" yazdığında İstanbul'da doğru cevap büyük olasılıkla **yalnızca biziz**. Bu grupta en yüksek teklifi vermek, tıklama başına maliyeti değil, **kategori sahipliğini** satın almaktır.

### Katman 2 — TEKNİK AD (bütçenin ~%25'i · BMD-3)
`jazz dans` · `jazz dance` · `caz dansı` · `theatre dance` · `sahne dansı` · `koreografi atölyesi` · `showdance`

Bu kelimeleri arayan kişi **ne aradığını biliyor** ama programın adını bilmiyor. Omurga kadar değerli, hacmi biraz daha yüksek, rekabeti daha düşük. Jazz, Broadway'e giden kapı: `jazz-dance-nedir.mdx`'in dediği gibi *"müzikal tiyatro seçmelerinde dans sınavının ortak dili jazz'dir."* Bu katman, omurganın hacim eksiğini kapatan yer.

### Katman 3 — SEMT + KATEGORİ (bütçenin ~%15'i · BMD-4, BMD-5)
`kadıköy jazz dans` · `kadıköy broadway dans` · `taksim müzikal dans`

Semt kelimesi tek başına değil, **kategori kelimesiyle birlikte** kullanılır. `dans kursu kadıköy` çöp çıktı; `kadıköy jazz dans` altın. Fark, sorguda bir stil/kategori niteleyicisinin bulunması.

### Katman 4 — İTİRAZ / BAŞLANGIÇ (bütçenin ~%10'u · BMD-6)
`sıfırdan dans` · `dansa kaç yaşında başlanır` · `yetişkin dans kursu`

Kategori adını hiç kullanmayan ama tam olarak bizim müşterimiz olan kişi. Kullanıcının beğendiği cümle burada yaşıyor.

### Katman 5 — GENEL DANS (bütçenin ~%5'i · BMD-7) — SINIR BURADA ÇİZİLİYOR

**Bir genel dans araması hangi şartla satın alınır — üç filtre, üçü de geçmeli:**

| Filtre | Kural | Örnek: girilir | Örnek: girilmez |
|---|---|---|---|
| **1. Stil filtresi** | Sorguda müfredat dışı bir stil adı geçmiyorsa | `dans atölyesi istanbul` | `salsa dans kursu`, `flamenko`, `zumba` |
| **2. Ticari niyet filtresi** | Sorguda "ücretsiz / belediye / fiyatları / en ucuz" geçmiyorsa | `yetişkin dans atölyesi` | `kadıköy belediyesi dans kursu`, `dans kursu fiyatları` |
| **3. Niteleyici filtresi** | Sorguda "atölye / sahne / koreografi / yetişkin / başlangıç" gibi bir niyet niteleyicisi varsa **ya da** tam eşleşmeli kategori sorgusuysa | `sahne dansı atölyesi`, `dans atölyesi istanbul` | `dans kursu kozyatağı`, `dans dersi arıyorum` |

**Hangi genel arama değerli:** "Atölye" kelimesi kullanan (sanat niyeti sinyali), "yetişkin/başlangıç" diyen (Persona 1), "koreografi/sahne" diyen (Persona 2–3), tam eşleşmeli `[dans kursu istanbul]` (kategori girişi).

**Hangisi çöp:** Stil adı içeren her şey (istisnasız), fiyat karşılaştıran her şey (fiyatımız gizli — bu kullanıcıyı yapısal olarak karşılayamıyoruz), semt+niteleyicisiz kombinasyonlar, ücretsiz/belediye arayanlar, çocuk ve düğün aramaları.

**Sınırın üç mekanik güvencesi:**
1. **Sert TBM tavanı ₺12** — ana grubun %40'ı. Genel havuzda asla prim ödemiyoruz. Rekabet bizi geçerse geçsin; o tık zaten bizim değildi.
2. **Yalnızca tam eşleşme** — sıralı eşleşme genel kelimede kontrolü kaybettirir.
3. **Haftalık zorunlu arama terimi denetimi + 21 gün kuralı** — 21 günde dönüşüm yoksa BMD-7 kapatılır, bütçesi BMD-2'ye aktarılır.

**Özet cümle:** *Genel dans havuzuna girmiyoruz — havuzun kenarında, bütçenin yirmide biriyle, sadece stil belirtmemiş ve fiyat sormamış kişilere el sallıyoruz. Kimliğimiz omurgada kuruluyor: müzikal dans, jazz dans, Broadway müzikal dans.*

---
---

# 2 · TECHNE MUSICAL LAB

> `data.ts` id 5 · slug `techne-musical-lab` · 8 ay · haftada 2 gün · Kadıköy · 12 kişi · **15–55 yaş** · Köksal Ünal & Sitare Bilge
> Başlangıç: **28 Eylül Pazartesi** · Müfredat: Ekim–Aralık drama · Ocak–Mart müzikal sahneleme · Nisan–Mayıs bitirme performansı
> Başvuru: bir müzikal ya da pop şarkısının seslendirildiği kısa video; **eleme değil, grubu dengelemek için**
> Konumlandırma: *"Şarkı kolajı değil, sahnelenmiş bir müzikal."*

---

## A) KİTLE TEŞHİSİ — MUSICAL LAB

Bu program hesabın **en yüksek birim değerli** ürünü ve **en dar arama havuzu**. Son 14 günde 9 tık aldı ve o tıkların yarısı yanlış: `ismek şan eğitimi`, `istanbul üniversitesi müzikal tiyatro bölümü`, `şan dersi istanbul`. Yalnızca `müzikal tiyatro kursu` doğruydu. Yani bu programda sorun hacim değil, **hacmin yanlış kaynaktan gelmesi**.

Yapısal tespit: "müzikal" ve "şan" kelimelerinin arama hacminin çoğu bize ait değil. "Müzikal" arayanların büyük kısmı **izlemek** istiyor; "şan" arayanların büyük kısmı **bireysel ders** istiyor. Bizim programımız ne biri ne öteki.

### Persona 1 — "Karaokede Herkesi Susturan" (birincil, en büyük hacim)
25–40 yaş. Sesine güveniyor, arkadaş ortamında "sen niye bunu yapmıyorsun" diye duyuyor. Hiç sahneye çıkmamış. `muzikal-oyunculuk-nedir.mdx` bu kişiye açılıyor: *"Karaokede herkesi susturan bir sesin var."* En büyük belirsizliği: ses güzel ama sahnede ne yapılır bilmiyor.

**Arama kalıpları:** `müzikal tiyatro kursu istanbul` · `müzikal kursu istanbul` · `müzikal atölyesi` · `sahne şarkıcılığı kursu` · `müzikal oyunculuk kursu` · `şarkı söyleyerek oyunculuk` · `müzikal eğitimi istanbul`

**Ne satın alıyor:** Sahne. Ses eğitimi tek başına değil — "sesimle ne yapacağım" sorusunun cevabı.

### Persona 2 — "Oyunculuktan Müzikale Geçen" (en yüksek dönüşüm)
Oyunculuk atölyesi görmüş, sahne deneyimi var, şarkı ayağı eksik. Terminolojiyi biliyor, "triple threat" kelimesini duymuş. Bu kişi programın drama-öncelikli kurgusunu (*"Program dramadan başlıyor"*) hemen anlıyor ve ikna oluyor.

**Arama kalıpları:** `müzikal oyunculuk` · `triple threat eğitimi` · `oyuncular için şan` · `müzikal tiyatro atölyesi istanbul` · `musical theatre istanbul` · `müzikal oyunculuk nedir`

### Persona 3 — "Sahne Sanatlarına Yönelen 15–18 Yaş ve Ailesi" (ikincil, uzun karar süresi)
Program 15 yaşından itibaren açık. Lise çağındaki katılımcı ya kendisi arıyor ya velisi. Konservatuvar ya da sahne sanatları düşünüyor; `gencler-icin-muzikal-tiyatro-istanbul` sayfası bu niyeti karşılıyor: *"portföyün ilk parçası."*

**Arama kalıpları:** `15 yaş müzikal kursu` · `lise müzikal kursu` · `müzikal tiyatro kursu 15 yaş` · `sahne sanatları hazırlık` · `müzikal tiyatro atölyesi lise`

> **Kural 4 uyarısı:** Bu personanın kelime kümesinde "genç/gençler/gençlik" **hiçbir varyantta kullanılmayacak** — ne reklam metninde ne anahtar kelimede. `disiplinler.ts` bu kelimeleri SEO tarafında kullanıyor; Google Ads tarafına taşınmamalı.

### Persona 4 — "Uzun Dönem Arayan Yetişkin" (küçük hacim, en sadık)
35–55 yaş. Yıllardır ertelediği bir merakı var, hobi kursundan fazlasını istiyor. `yetiskinler-icin-muzikal-kursu-istanbul` sayfası tam olarak bu kişiye yazılmış. Sekiz aylık taahhüt onu korkutmuyor, aksine ciddiye alınma sinyali.

**Arama kalıpları:** `yetişkin müzikal kursu istanbul` · `yetişkinler için müzikal tiyatro` · `40 yaşında müzikal` · `hobi müzikal kursu` · `çalışanlar için müzikal atölyesi`

---

## B) REKLAM GRUBU MİMARİSİ — MUSICAL LAB

Altı grup.

| Grup | Niyet | Teklif tavanı | Açılış sayfası |
|---|---|---|---|
| TML-1 Marka & Eğitmen | Bizi arıyor | ₺8 | `/atolyeler/techne-musical-lab` |
| TML-2 Müzikal Tiyatro Kursu | **Ana omurga** | ₺32 | `/atolyeler/techne-musical-lab` |
| TML-3 Müzikal Oyunculuk | Persona 2 | ₺26 | `/muzikal-tiyatro-kursu-istanbul` |
| TML-4 Şan → Sahne Köprüsü | Riskli, dar | ₺16 | `/makaleler/muzikal-sesini-bulmak` |
| TML-5 Semt · Kadıköy | Yerel + kategori | ₺24 | `/kadikoy-muzikal-tiyatro-kursu` |
| TML-6 Yaş & Segment | Persona 3–4 | ₺22 | `/yetiskinler-icin-muzikal-kursu-istanbul` |

---

### TML-1 · MARKA & EĞİTMEN (9 kelime)

| Kelime | Eşleşme |
|---|---|
| `[techne musical lab]` | tam |
| `[techne lab]` | tam |
| `[techne lab istanbul]` | tam |
| `[technelab]` | tam |
| `"techne musical lab istanbul"` | sıralı |
| `"techne lab müzikal"` | sıralı |
| `"köksal ünal müzikal"` | sıralı |
| `"sitare bilge şan"` | sıralı |
| `"sitare bilge müzikal"` | sıralı |

---

### TML-2 · MÜZİKAL TİYATRO KURSU — ANA OMURGA (13 kelime)

| Kelime | Eşleşme |
|---|---|
| `[müzikal tiyatro kursu]` | tam |
| `[müzikal tiyatro kursu istanbul]` | tam |
| `[müzikal kursu istanbul]` | tam |
| `[müzikal atölyesi istanbul]` | tam |
| `[müzikal eğitimi istanbul]` | tam |
| `[müzikal tiyatro atölyesi]` | tam |
| `"müzikal tiyatro eğitimi istanbul"` | sıralı |
| `"istanbul müzikal atölyesi"` | sıralı |
| `"müzikal tiyatro kursu kadıköy"` | sıralı |
| `"musical theatre istanbul"` | sıralı |
| `"musical theatre course istanbul"` | sıralı |
| `"müzikal tiyatro dersi"` | sıralı |
| `"müzikal sahneleme atölyesi"` | sıralı |

---

### TML-3 · MÜZİKAL OYUNCULUK & TRIPLE THREAT (11 kelime)

| Kelime | Eşleşme |
|---|---|
| `[müzikal oyunculuk]` | tam |
| `[müzikal oyunculuk kursu]` | tam |
| `[triple threat eğitimi]` | tam |
| `[sahne şarkıcılığı kursu]` | tam |
| `"müzikal oyunculuk eğitimi"` | sıralı |
| `"müzikal oyuncusu nasıl olunur"` | sıralı |
| `"oyunculuk ve şan eğitimi"` | sıralı |
| `"şan dans oyunculuk kursu"` | sıralı |
| `"şan ve dans atölyesi"` | sıralı |
| `"oyuncular için şan eğitimi"` | sıralı |
| `"müzikal oyunculuk nedir"` | sıralı |

---

### TML-4 · ŞAN → SAHNE KÖPRÜSÜ (8 kelime) — RİSKLİ GRUP
**Kural: yalnızca "müzikal / sahne / performans" niteleyicisi taşıyan şan sorguları alınır. Çıplak "şan dersi / şan kursu / vokal dersi" sorguları negatiflenir** — o kişi bireysel ders arıyor, sekiz aylık grup programı değil. Brifingdeki ₺33,51 + ₺17,56 + ₺26,35'lik şan israfının tamamı bu ayrımın yokluğundan geldi.

| Kelime | Eşleşme |
|---|---|
| `[müzikal şan eğitimi]` | tam |
| `[sahne şarkıcılığı]` | tam |
| `[müzikal şarkı söyleme]` | tam |
| `"müzikal şan tekniği"` | sıralı |
| `"müzikal repertuar çalışması"` | sıralı |
| `"sahnede şarkı söylemek"` | sıralı |
| `"müzikal sesini bulmak"` | sıralı |
| `"şarkı söylerken oynamak"` | sıralı |

---

### TML-5 · SEMT · KADIKÖY (9 kelime)

| Kelime | Eşleşme |
|---|---|
| `[kadıköy müzikal kursu]` | tam |
| `[kadıköy müzikal tiyatro kursu]` | tam |
| `[kadıköy müzikal atölyesi]` | tam |
| `[müzikal atölyesi kadıköy]` | tam |
| `"kadıköy şan ve dans kursu"` | sıralı |
| `"anadolu yakası müzikal kursu"` | sıralı |
| `"üsküdar müzikal kursu"` | sıralı |
| `"ataşehir müzikal kursu"` | sıralı |
| `"kadıköy sahne sanatları atölyesi"` | sıralı |

---

### TML-6 · YAŞ & SEGMENT (10 kelime)
"Genç/gençler" kelimesi kullanılmadı (kural 4); yaş bandı sayıyla ve "lise" ile ifade edildi.

| Kelime | Eşleşme |
|---|---|
| `[yetişkin müzikal kursu]` | tam |
| `[yetişkinler için müzikal tiyatro]` | tam |
| `[hobi müzikal kursu]` | tam |
| `"yetişkin müzikal kursu istanbul"` | sıralı |
| `"çalışanlar için müzikal atölyesi"` | sıralı |
| `"40 yaşında müzikal kursu"` | sıralı |
| `"15 yaş müzikal kursu"` | sıralı |
| `"lise müzikal atölyesi"` | sıralı |
| `"müzikal tiyatro kursu 15 yaş"` | sıralı |
| `"sahne sanatları hazırlık atölyesi"` | sıralı |

---

## C) NEGATİF KELİMELER — MUSICAL LAB

### Hesap seviyesi paylaşımlı listeler
**LİSTE A (Ücretsiz & Kamu), LİSTE B (İş İlanı & Kariyer), LİSTE C (Akademik, Sınav & Diploma), LİSTE D (İzleme, Bilet & Etkinlik), LİSTE E (Müfredat Dışı Dans Stilleri)** — beşi de aynen uygulanır (bkz. Broadway C bölümü).

- **LİSTE A** brifingdeki `ismek şan eğitimi` (₺33,51) ve `ismek şan` (₺17,56) tıklarını doğrudan keser.
- **LİSTE C** `istanbul üniversitesi müzikal tiyatro bölümü` (₺33,98) tıkını keser. Kullanıcının özellikle istediği "üniversite bölümü, konservatuvar sınavı" negatifleri bu listede.
- **LİSTE D** bu program için Broadway'den bile kritik: "müzikal" kelimesinin arama hacminin çoğunluğu izleyici niyeti.

### KAMPANYA ÖZEL NEGATİFLER — MUSICAL LAB

**Bireysel şan / enstrüman dersi arayanlar (kullanıcının açık talebi)**
`"şan dersi"` · `"şan kursu"` · `"şan eğitimi fiyat"` · `"özel şan dersi"` · `"birebir şan"` · `"vokal dersi"` · `"vokal kursu"` · `"ses eğitimi kursu"` · `"nota dersi"` · `"solfej"` · `"müzik teorisi"` · `"piyano dersi"` · `"gitar kursu"` · `"bağlama kursu"` · `"koro"` · `"karaoke"` · `"ses kaydı stüdyo"` · `"şarkıcı olmak istiyorum"` · `"ses testi"`

> **Neden bu kadar geniş:** Bu program şan **içeriyor** ama şan **satmıyor**. Bireysel şan dersi arayan kişi haftada bir saatlik özel ders, düşük taahhüt ve düşük bedel bekliyor. Sekiz aylık, haftada iki gün, grup programına dönüşme ihtimali pratik olarak sıfır — brifingdeki üç ayrı şan tıkı bunu ₺77 karşılığında kanıtladı.
> **Sınırda kalan istisna:** `[müzikal şan eğitimi]` ve `"müzikal şan tekniği"` TML-4'te açık — "müzikal" niteleyicisi niyeti değiştiriyor. Sıralı negatif `"şan dersi"` bu iki kelimeyi bloklamaz, çünkü sorgu dizisi farklı.

**Akademik / bölüm / sınav (LİSTE C'ye ek, kampanyaya özel)**
`"müzikal tiyatro bölümü"` · `"müzikal tiyatro taban puan"` · `"sahne sanatları bölümü"` · `"konservatuvar müzikal"` · `"özel yetenek müzikal"` · `"hangi üniversitede var"` · `"bölüm sıralaması"`

**Casting / iş / seçme**
`"müzikal seçmeleri"` · `"müzikal oyuncu alımı"` · `"kadro alımı"` · `"oyuncu arayan"` · `"figüran"` · `"ajans"` · `"cast çağrısı"`

**Yaş dışı (program 15–55)**
`"çocuk müzikal kursu"` · `"çocuklar için müzikal"` · `"anaokulu müzik"` · `"6 yaş şan"` · `"7 yaş müzik kursu"` · `"8 yaş tiyatro"` · `"okul öncesi"` · `"minikler"`

> `"15 yaş"`, `"16 yaş"`, `"17 yaş"` **negatiflenmiyor** — program 15'ten başlıyor.

**İçerik / eğlence niyeti**
`"müzikal şarkıları"` · `"müzikal filmler"` · `"müzikal dizisi"` · `"en iyi müzikal şarkıları"` · `"müzikal nedir kısaca"` · `"müzikal türleri"` · `"broadway tarihi"`

**Yer dışı**
`"ankara"` · `"izmir"` · `"bursa"` · `"online müzikal"` · `"uzaktan şan"` · `"youtube şan dersi"`

**Fiyat (TAM eşleşmeli)**
`[müzikal kursu fiyatları]` · `[şan kursu ücretleri]` · `[en ucuz müzikal kursu]` · `[müzikal kursu ne kadar]`

---

## D) REKLAM METİNLERİ — MUSICAL LAB

Parantez içindeki sayı karakter sayısıdır (başlık ≤30, açıklama ≤90).
**Sabitleme:** 1. başlık Konum 1'e sabit.
**Not:** "Erken kayıt" ifadesi bu programda kullanılmadı — `data.ts` id 5'te `earlyBirdDeadline` yok (`scholarshipPercent` var ama kural 3 gereği oran yazılamaz).

---

### RSA · TML-1 (Marka)
**Görünen yol:** `/muzikal-tiyatro` `/techne-musical-lab`

**Başlıklar**
1. Techne Musical Lab (18)
2. Techne Lab İstanbul (19)
3. Müzikal Tiyatro Kursu (21)
4. Şan, Dans, Oyunculuk (20)
5. 8 Ay · Haftada 2 Gün (20)
6. 28 Eylül'de Başlıyor (20)
7. Seyircili Final Gösterisi (25)
8. Kadıköy Müzikal Atölyesi (24)
9. 15–55 Yaş Arası (15)
10. Bağımsız Tiyatro Şirketi (24)
11. Başvuru Formu Sitede (20)
12. 12 Kişilik Grup (15)

**Açıklamalar**
1. Oyunculuk, şan ve dans ayrı dersler değil; tek sahne pratiği olarak çalışılıyor. (80)
2. Sekiz ay, haftada iki gün, Kadıköy. Yıl seyircili bir performansla kapanıyor. (77)
3. Başvuru için bir müzikal ya da pop şarkısı söylediğin kısa video yeterli. (73)
4. Program sayfasında müfredat, tarihler ve başvuru formu yer alıyor. (66)

---

### RSA · TML-2 (Müzikal Tiyatro Kursu — ANA)
**Görünen yol:** `/muzikal-tiyatro` `/kadikoy`

**Başlıklar**
1. Müzikal Tiyatro Kursu (21)
2. Müzikal Tiyatro Atölyesi (24)
3. Şan, Dans, Oyunculuk (20)
4. Üç Disiplin Tek Program (23)
5. 8 Ay · Haftada 2 Gün (20)
6. Seyircili Final Gösterisi (25)
7. Kadıköy · 8 Aylık Program (25)
8. 28 Eylül'de Başlıyor (20)
9. Nota Bilmek Gerekmiyor (22)
10. 15–55 Yaş Arası (15)
11. Broadway Repertuarı (20)
12. Ses Testi Yok (13)

**Açıklamalar**
1. Oyunculuk, şan ve dans ayrı dersler değil; tek sahne pratiği olarak çalışılıyor. (80)
2. Program dramadan başlıyor: şarkı da bir sahnedir, oynanmadan söylenmez. (71)
3. Sekiz ay, haftada iki gün, Kadıköy. Yıl seyircili bir performansla kapanıyor. (77)
4. Şarkı kolajı değil, sahnelenmiş bir müzikal. Kostüm, ışık ve seyirci ile. (73)

---

### RSA · TML-3 (Müzikal Oyunculuk)
**Görünen yol:** `/muzikal-oyunculuk` `/muzikal-tiyatro`

**Başlıklar**
1. Müzikal Oyunculuk (17)
2. Triple Threat Eğitimi (21)
3. Şarkıyı Oynayarak Söyle (23)
4. Önce Drama, Sonra Şarkı (24)
5. Üç Disiplin Bir Arada (21)
6. Sahne Şarkıcılığı (17)
7. Müzikal Tiyatro Kursu (21)
8. 8 Ay · Haftada 2 Gün (20)
9. Seyircili Final Gösterisi (25)
10. Kadıköy Müzikal Atölyesi (24)
11. Konservatuvar Şartı Yok (23)
12. 28 Eylül'de Başlıyor (20)

**Açıklamalar**
1. Şarkı söyleyen oyuncu ile müzikal oyuncusu aynı şey değil. Fark, eğitimde. (75)
2. Üç beceri ayrı ayrı değil, aynı sahnede aynı anda çalışılıyor. (62)
3. Program dramadan başlıyor: karakter kurmadan şarkıya karakter taşınmıyor. (74)
4. Sekiz ay, haftada iki gün, Kadıköy. Yıl seyircili bir performansla kapanıyor. (77)

---

### RSA · TML-4 (Şan → Sahne Köprüsü)
**Görünen yol:** `/muzikal-tiyatro` `/sahne-sesi`

**Başlıklar**
1. Sahnede Şarkı Söylemek (23)
2. Müzikal Şan ve Sahne (20)
3. Şarkıyı Oynayarak Söyle (23)
4. Sahne Şarkıcılığı (17)
5. Nota Bilmek Gerekmiyor (22)
6. Ses Testi Yok (13)
7. Müzikal Tiyatro Kursu (21)
8. Şan, Dans, Oyunculuk (20)
9. 8 Ay · Haftada 2 Gün (20)
10. Kadıköy Müzikal Atölyesi (24)
11. Seyircili Final Gösterisi (25)
12. 15–55 Yaş Arası (15)

**Açıklamalar**
1. Şan burada ayrı bir ders değil; oyunculuk ve dansla birlikte yürüyor. (69)
2. Nota bilmek gerekmiyor. Şan çalışması kulaktan ve bedenden ilerliyor. (68)
3. Teknik olarak kusursuz söylemek yetmiyor; şarkının içindeki karakter gerekiyor. (79)
4. Sekiz ay, haftada iki gün, Kadıköy. Yıl seyircili bir performansla kapanıyor. (77)

---

### RSA · TML-5 (Semt · Kadıköy)
**Görünen yol:** `/kadikoy-muzikal` `/techne-musical-lab`

**Başlıklar**
1. Kadıköy Müzikal Atölyesi (24)
2. Müzikal Tiyatro Kursu (21)
3. Kadıköy · 8 Aylık Program (25)
4. Şan, Dans, Oyunculuk (20)
5. Marmaray'a Yürüme Mesafesi (26)
6. Anadolu Yakası · Kadıköy (24)
7. 28 Eylül'de Başlıyor (20)
8. Haftada İki Akşam (18)
9. Seyircili Final Gösterisi (25)
10. 15–55 Yaş Arası (15)
11. 12 Kişilik Grup (15)
12. Ses Testi Yok (13)

**Açıklamalar**
1. Kadıköy stüdyosu Marmaray Ayrılık Çeşmesi durağına yürüme mesafesinde. (70)
2. Oyunculuk, şan ve dans ayrı dersler değil; tek sahne pratiği olarak çalışılıyor. (80)
3. Sekiz ay, haftada iki akşam. Üsküdar, Ataşehir ve Bostancı'dan ulaşım kolay. (76)
4. Başvuru için bir müzikal ya da pop şarkısı söylediğin kısa video yeterli. (73)

---

### RSA · TML-6 (Yaş & Segment)
**Görünen yol:** `/yetiskin-muzikal` `/muzikal-tiyatro`

**Başlıklar**
1. Yetişkin Müzikal Grubu (22)
2. Müzikal Tiyatro Kursu (21)
3. 15–55 Yaş Arası (15)
4. 15 Yaş ve Üzeri (15)
5. Deneyim Aranmıyor (17)
6. Ses Testi Yok (13)
7. Nota Bilmek Gerekmiyor (22)
8. 8 Ay · Haftada 2 Gün (20)
9. Seyircili Final Gösterisi (25)
10. Kadıköy Müzikal Atölyesi (24)
11. Konservatuvar Şartı Yok (23)
12. 28 Eylül'de Başlıyor (20)

**Açıklamalar**
1. 15–55 yaş arası katılıma açık. Şan ve dans eğitimi programın içinde veriliyor. (79)
2. Deneyim aranmıyor. Ses testi ya da eleme yok; video grubu dengelemek için. (74)
3. Sekiz ay, haftada iki akşam — çalışan katılımcılara göre planlanmış saatler. (76)
4. Yıl, kostüm ve ışıkla kurulan seyircili bir bitirme performansıyla kapanıyor. (78)

---

## E) UZANTILAR — MUSICAL LAB

### Site bağlantısı (4 adet)
| Başlık (≤25) | Açıklama 1 (≤35) | Açıklama 2 (≤35) | URL |
|---|---|---|---|
| Program İçeriği (15) | Sekiz ayın üç evresi (20) | Drama, müzikal, performans (26) | `/atolyeler/techne-musical-lab` |
| Müzikal Oyunculuk (17) | Şarkı söyleyen oyuncu değil (28) | Aradaki farkı yazdık (20) | `/makaleler/muzikal-oyunculuk-nedir` |
| Eğitmen Kadrosu (15) | Köksal Ünal ve Sitare Bilge (26) | Kimlerle çalışacaksın (21) | `/ekip` |
| Başvuru Formu (13) | Kısa bir şarkı videosu (22) | Eleme değil, gruplama (22) | `/atolyeler/techne-musical-lab/kayit` |

### Açıklama metni / öne çıkan site metni (callout, ≤25)
`8 ay · haftada 2 gün` (20) · `Seyircili final gösterisi` (25) · `12 kişilik grup` (15) · `Nota bilmek gerekmiyor` (22) · `Ses testi yok` (13) · `15–55 yaş` (9) · `Kadıköy stüdyosu` (16)

### Yapılandırılmış snippet
**Başlık:** Kurslar
**Değerler:** Müzikal tiyatro (15) · Şan çalışması (13) · Broadway dansı (14) · Sahne oyunculuğu (18) · Repertuar (9)

**İkinci snippet — Başlık:** Türler
**Değerler:** 8 aylık program (15) · Yetişkin grubu (14) · 15 yaş ve üzeri (15) · Bitirme performansı (19)

### Görsel uzantısı
`data.ts` id 5 görselleri: `musical-01`, `musical-02`, `musical-03`, `dslr-zl5a1045`, `dslr-zl5a1079`. Sahne/performans kareleri tercih edilmeli — "sınıf" değil "sahne" izlenimi.

### Kullanılmayacak uzantılar
Çağrı ❌ (kural 1) · Fiyat ❌ (kural 2) · Promosyon ❌ (kural 3) · Konum ❌ (partner mekân)

### Konum hedefleme önerisi
| Katman | Ayar | Teklif ayarı |
|---|---|---|
| Kadıköy merkez | 6 km yarıçap | **+%25** |
| Anadolu yakası (Üsküdar, Ataşehir, Maltepe, Bostancı, Kozyatağı, Kartal) | ilçe seçimi | +%15 |
| Avrupa yakası — Beşiktaş, Şişli, Beyoğlu, Bakırköy | ilçe seçimi | 0 |
| İstanbul geneli — kalan | il seçimi | −%25 |

**Not:** Broadway'e göre yarıçap daha geniş tutuldu. Sekiz aylık, haftada iki günlük bir programa yazılan kişi, altı haftalık bir kursa yazılandan daha uzun yol gitmeye razı — taahhüt büyüdükçe coğrafi tolerans artıyor.

---

## F) AÇILIŞ SAYFASI — MUSICAL LAB

| Grup | URL |
|---|---|
| TML-1, TML-2 | `https://www.technelabistanbul.com/atolyeler/techne-musical-lab` |
| TML-3 | `https://www.technelabistanbul.com/muzikal-tiyatro-kursu-istanbul` |
| TML-4 | `https://www.technelabistanbul.com/makaleler/muzikal-sesini-bulmak` |
| TML-5 | `https://www.technelabistanbul.com/kadikoy-muzikal-tiyatro-kursu` |
| TML-6 | `https://www.technelabistanbul.com/yetiskinler-icin-muzikal-kursu-istanbul` |

### Eksikler
1. **Başvuru videosu bir engel gibi duruyor.** Sayfa "kısa bir video isteniyor" diyor ama neden istendiğini yeterince öne çıkarmıyor. `disiplinler.ts` ve `muzikal-oyunculuk-nedir.mdx` doğru cümleyi zaten kurmuş: *"eleme değil, grubu dengelemek için"* ve *"profesyonel kayıt değil, telefon çekimi. Baktığımız şey mükemmellik değil, malzeme."* Bu iki cümle **program sayfasında, başvuru butonunun hemen yanında** olmalı. Bugünkü hâliyle bu şart, dönüşümün önündeki en büyük tek engel.
2. **8 aylık taahhüt bir ödeme sorusu doğuruyor ve sayfa cevap vermiyor.** `data.ts`'de `monthlyPrice`/`installments` alanları var ama id 5'te doldurulmamış. Fiyat yazılamaz (kural 2) ama **"aylık ödeme seçeneği var"** bilgisi rakamsız verilebilir — bu bir fiyat değil, bir koşul. **DOĞRULANMALI:** Musical Lab'de taksit var mı?
3. **`/basvuru` yok** — gerçek rota `/atolyeler/techne-musical-lab/kayit`.
4. **Fiyat beklentisi karşılanmıyor** — Broadway'deki 4 numaralı eksiğin aynısı; "ücret başvuru sonrası birebir paylaşılıyor" cümlesi görünür olmalı.
5. **TML-4'ün açılış sayfası bir makale** ve makalede görünür CTA yok. Broadway BMD-6 için söylenen aynen geçerli.
6. **Başlangıç tarihi tutarsızlığı** (çelişki 4): sayfa "28 Eylül" derken müfredat blokları "Ekim–Aralık" diyor. Kullanıcı "eylülde mi ekimde mi başlıyor" diye soruyor — sayfada tek cümleyle çözülmeli: "28 Eylül'de tanışma, ekimde müfredat" gibi.

---

## G) BÜTÇE VE TEKLİF — MUSICAL LAB

### Günlük bütçe: ₺55 (28 Eylül'e kadar ₺70, sonra ₺40)

**Gerekçe:** Bu programda bütçe **istekle değil hacimle** sınırlı. Son 14 günde 150 gösterim, 9 tık alındı — ve o hacmin yarısı negatiflendikten sonra kalan havuz daha da daralacak. ₺55'i harcayamama ihtimali gerçek; bu bir sorun değil, doğru teşhisin sonucu. **Harcanmayan bütçe Broadway'e ya da PLAN-A'daki EDL kampanyasına aktarılır, buraya zorla kelime eklenerek harcatılmaz.** Brifingin en yanıltıcı sayısı "₺550 bütçe ama ₺90 harcama" — çözümü kelime genişletmek değil, doğru kelimede daha görünür olmak.

Buna karşılık **TBM tavanı hesabın en yükseği burada.** Sebep: sekiz aylık program, hesabın en yüksek birim değerli ürünü. Broadway'de kabul edilemez bir ₺32 TBM burada makul; edinme maliyeti tolerans bandı yaklaşık on kat daha geniş.

| Dönem | Günlük bütçe |
|---|---|
| 3–28 Eylül | ₺70 |
| 29 Eylül–31 Ekim | ₺40 (geç kayıt + bir sonraki dönem listesi) |
| Kasım sonrası | Dönem dolduysa duraklat; dolmadıysa ₺40 |

### Teklif stratejisi: **Manuel TBM · Gelişmiş TBM KAPALI**

Broadway'le aynı gerekçe (dönüşüm verisi doğrulanamıyor) + ek gerekçe: bu kampanyanın aylık dönüşüm sayısı akıllı teklifin öğrenme eşiğine (30 gün / 15–30 dönüşüm) **hiçbir senaryoda** ulaşmayacak. Manuel TBM burada geçici bir çözüm değil, kalıcı doğru seçim.

**Grup bazlı tavanlar:** TML-1 ₺8 · TML-2 ₺32 · TML-3 ₺26 · TML-4 ₺16 · TML-5 ₺24 · TML-6 ₺22

### İzleme kuralı
Bu kampanyada tık sayısı istatistiksel anlam taşımayacak kadar az olacak. Bu yüzden **haftalık optimizasyon kararı verilmemeli** — 21 günlük pencerelerle bakılmalı. Az veriyle sık müdahale, bu hacimde en yaygın hatadır.

---

## H) YARATICI ÇÖZÜMLER — MUSICAL LAB

**1. Video şartını engelden filtreye çevir — reklam düzeyinde**
"Ses testi yok" ve "eleme değil" mesajları RSA'lara zaten kondu. Bir adım daha: TML-2'de ikinci bir RSA yazılıp A/B test edilsin, tek farkı `Ses Testi Yok (13)` ve `Konservatuvar Şartı Yok (23)` başlıklarının Konum 1–2'ye sabitlenmesi olsun.
**Neden işe yarar:** Persona 1'in tek itirazı "yeterince iyi miyim". Fiyata cevap veremiyoruz, **yeterlilik korkusuna** verebiliyoruz. Bu programın dönüşüm kaybının büyük kısmı fiyatta değil, bu korkuda.

**2. Broadway → Musical Lab yükseltme hattı (H-6'nın karşı ucu)**
Broadway program sayfasını ziyaret edip dönüşmeyenler ve Broadway'i tamamlayanlar, Musical Lab kampanyasında RLSA olarak **+%30** teklifle hedeflensin. Ayrıca `muzikal-oyunculuk-nedir.mdx`'in "Dans tarafından girmek isteyenlere" bölümü iki yönlü çalışıyor — Broadway sayfasına da karşılıklı bağlantı konmalı.
**Neden işe yarar:** Musical Lab'in arama hacmi yok denecek kadar az; büyümenin tek yolu **var olan trafiği yükseltmek**. Broadway'in hacmi, Musical Lab'in değerini finanse edebilecek tek iç kaynak.

**3. "Şan dersi" arayanı reklamla değil içerikle yakala**
TML-4'ün negatiflediği çıplak "şan dersi" trafiği reklam için değersiz ama organik için değil. `muzikal-sesini-bulmak.mdx` mevcut; buna "Şan dersi mi, müzikal programı mı? Hangisi sana uygun" tipinde dürüst bir karşılaştırma bölümü eklenirse o kitle ücretsiz gelir ve bir kısmı doğru ürüne döner.
**Neden işe yarar:** ₺26'lık tıkla satın alamayacağımız kitleyi ₺0'a alıyoruz. Ayrıca bu tip karşılaştırma içeriği AI Overview'da öne çıkıyor — hafızadaki "27 Ağustos ilk Gemini-referanslı arama" bulgusu bu kanalın çalıştığını gösteriyor.

**4. 28 Eylül aciliyeti — kontenjan üzerinden, tarih üzerinden değil**
Broadway'de aciliyet tarihten geliyor; burada tarihten gelmiyor çünkü sekiz aylık bir programa "üç hafta kaldı" demek kullanıcıyı hazırlıksız hissettiriyor. Bunun yerine **kontenjan** vurgulanmalı: `12 Kişilik Grup (15)` başlığı 15–28 Eylül arasında Konum 2'ye sabitlensin.
**Neden işe yarar:** Uzun taahhütte aciliyet baskısı ters teper; kıtlık sinyali ise "ciddi bir yer" sinyaliyle birlikte gelir. Ayrıca 12 kişi gerçek bir kısıt, uydurma değil.

**5. Persona 3 (15–18 yaş) için ayrı zamanlama, ayrı kampanya değil**
Bu segment veli kararına bağlı ve arama zamanı farklı: okul dönemi başında, akşam ve hafta sonu. TML-6 içinde kalsın ama **ayrı bir RSA** yazılsın: `15 Yaş ve Üzeri (15)` ve `Konservatuvar Şartı Yok (23)` sabitlenmiş, açıklamalarda "portföyün ilk parçası" fikri.
**Neden işe yarar:** Ayrı kampanya açacak hacim yok; ayrı RSA açacak kadar farklı bir mesaj var. Ve kritik: bu grupta **"genç" kelimesi hiçbir yerde geçmemeli** — kural 4 ve hafızadaki Google politika ihlali kaydı.

**6. Bitirme performansını bir pazarlama varlığı olarak kullan**
Mayıs'taki seyircili bitirme performansı bugün yalnızca bir program özelliği. Kaydı alınıp `/galeri` ve program sayfasına konursa, bir sonraki dönemin reklamı için elde **kanıt** olur. Görsel uzantılarında "sınıf" değil "sahne" kareleri kullanılmalı.
**Neden işe yarar:** 140.000 ₺ bandında bir ürünün en büyük satış engeli güven. Sekiz ay sonunda ne olduğunu **gösteren** tek şey o kayıt. Bu, bu sezon değil gelecek sezon için yapılan bir yatırım — ama şimdi planlanmazsa çekilmiyor.

---
---

# 3 · UYGULAMA SIRASI

| Sıra | İş | Neden bu sırada |
|---|---|---|
| 1 | Beş hesap seviyesi negatif listesini oluştur ve **mevcut kampanyalara da uygula** | Yeni yapı kurulmadan önce bile kanamayı durdurur |
| 2 | PLAN-A 0.4'teki tek kelimelik negatif CSV'si yüklüyse temizle | Yeni negatifler onun üstüne binerse kampanya boğulur |
| 3 | Çelişki 1'i çöz: Broadway Taksim'de var mı? | BMD-5 ve tüm Taksim metinleri buna bağlı |
| 4 | Çelişki 2'yi çöz: kontenjan 12 mi 15 mi? | ⚠ işaretli başlıklar buna bağlı |
| 5 | Broadway kampanyasını kur (BMD-1,2,3,4,6,7 — BMD-5 duraklatılmış) | En yakın tarih 17 Eylül |
| 6 | Mevcut "1C Broadway Musical Dance" reklam grubunu **duraklat** | İki yapı aynı anda çalışmamalı |
| 7 | Musical Lab kampanyasını kur | 28 Eylül |
| 8 | Mevcut "1B Techne Musical Lab" grubunu duraklat | Aynı gerekçe |
| 9 | Açılış sayfası düzeltmeleri (F bölümleri) | Reklam yayına girerken sayfa hazır olmalı |
| 10 | 21 gün boyunca haftada iki kez arama terimi raporu | Planın en önemli operasyonel maddesi |

---

## Bu planın en kısa özeti

Broadway bugün **"dans"** kelimesini satın alıyor. Almaya başlaması gereken kelime **"broadway müzikal dansı"**, **"jazz dans"** ve **"müzikal dans"**. Genel dans havuzuna tamamen kapanmıyoruz — bütçenin yirmide biriyle, ana grubun %40'ı teklifle, üç filtreden geçen aramalara giriyoruz. Musical Lab ise hacim değil **niyet** sorunu yaşıyor: şan dersi ve üniversite bölümü arayanı keserek kalan dar ama doğru havuzda en yüksek teklifi veriyor.
