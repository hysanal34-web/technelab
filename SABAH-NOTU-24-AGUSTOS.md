# Sabah Notu · 24 Ağustos Pazartesi

Gece yaptıklarım ve senin yapman gerekenler.

---

## ✅ BİTTİ

### Linktree
Dört program eksikti, hepsi eklendi ve **aktif**:

| Sıra | Bağlantı |
|---|---|
| 1 | Başvuru — THE AUTEUR LAB |
| 2 | Başvuru — BROADWAY MUSICAL DANCE |
| 3 | Başvuru — TECHNE MUSICAL LAB |
| 4 | Başvuru — ENGLISH ACTING PRAXIS |
| 5 | ENGLISH DRAMA LAB (eski Google Form · 541 tıklama) |
| 6 | English Drama Lab YOUTH (eski Google Form · 71 tıklama) |
| 7 | Instagram — kapalıydı, **açtım** |

Yeni dördü **Google Forms değil, sitenin kendi kayıt formuna** gidiyor.
Sebebi: o formlarda KVKK onayı zaten var, onay tarihi kaydediliyor,
başvuru `info@technelabistanbul.com` adresine düşüyor ve **Meta CAPI
dönüşüm olayı tetikleniyor** — yani reklamdan gelen kayıt pixel'e
yazılıyor. Google Forms bunu yapamıyor.

Fiyat bilgisi formlarda yok, senin istediğin gibi.

Kapalı duran üç eski bağlantıya dokunmadım: Özlem Saraç Özcan Hikâye
Tasarımı, Konservatuara Hazırlık, TECHNE YOUTH (Kids & Teens). Bunlar
bu dönem yoksa silebilirsin.

Adres: **linktr.ee/techne.lab.istanbul**

### Kurumsal yazışma şablonları
`KURUMSAL_MESAJLAR.md` — on bir başlık: form dönüşü, burs (alındı /
olumlu / olumsuz), veli iletişimi, fiyat yanıtı, kontenjan doldu,
ödeme bilgisi, program öncesi bilgilendirme, sessiz kalana hatırlatma,
kurum başvurusu. Hepsi "siz" dili, imzalı, kurumsal.

Instagram için olan samimi şablonlar ayrı dosyada duruyor
(`INSTAGRAM_DM_SABLONLARI.md`) — ikisi farklı mecra, farklı ton.

### Site SEO kontrolü
Temiz. Pasif programlar (Mevcudiyet, Camera Praxis) hiçbir yerde
görünmüyor, kayıt almıyor, schema'da `SoldOut` işaretli. Eski fiyat
ya da tarih kalıntısı yok. Tip kontrolü hatasız.

---

## ⚠️ YAPAMADIĞIM ÜÇ ŞEY

### 1 · Deploy
Vercel kimlik bilgin bu ortamda yok, oturum açamıyorum. **Site hâlâ
dünkü halinde.** Yeni fiyatlar, Broadway'in üç aylık yapısı, Auteur
Lab'in modülleri, Acting Praxis'in yeni tanımı — hiçbiri canlıda değil.

```
cd ~/Downloads/technelab && npx vercel --prod --yes
```

**Bunu ilk iş yap.** Linktree'ye eklediğim dört form canlı sitedeki
sayfalara gidiyor; deploy edilmeden eski içerik görünür.

### 2 · iOS hedeflemesi
API bu ayarı kabul etmiyor — `user_os` parametresini gönderdim, Meta
sessizce yok saydı. Sadece "yalnızca mobil" uygulanabildi (Auteur
Lab'de yapıldı).

Arayüzden yapılabiliyor: Reklam seti → Düzenle → Hedef Kitle →
**Cihazlar** → Yalnızca iOS.

Ama altı kampanyaya birden uygulamadım, sebebini söyleyeyim: iOS
Türkiye'de kullanıcıların yaklaşık dörtte biri. Altı setin hepsini
birden daraltmak erişimi sert düşürür ve **hepsinin öğrenmesini aynı
anda sıfırlar.** Broadway'de 20 günde 22 kişi bulman gerekiyor;
orada erişim daraltmak riskli.

Önerim: önce **Musical Lab ve Youth**'ta dene — ikisi de yüksek
bedelli programlar, iOS kitlesi oraya daha uygun. Bir hafta sonuca
bakıp diğerlerine yaymaya karar verirsin.

### 3 · Drive'a görsel yükleme
Hangi görselleri kastettiğini bilmiyorum — yeni çekimler mi, program
kapakları mı? Dosya yolunu söylersen yüklerim.

Bu arada program dosyaları (`Program-Dosyalari/`, altı PDF, iki
sayfa, fiyatlı) hazır duruyor. Drive'a onları koyup Linktree'ye
"Program Kataloğu" diye tek bağlantı eklemek de mantıklı olur.

---

## Bugünün asıl işi

Dün konuştuğumuz şey duruyor: **Broadway'de 42 DM var, 2-3 kayıt.**
Dönüşüm %6. O 40 kişiye tek tek yaz — aylık 8.000 TL seçeneği
onların çoğunun bilmediği yeni bir şey.

Yazarken not al: **ne diyorlar?** Fiyat mı, gün mü, semt mi, yoksa
sessiz mi kalıyorlar. Bu cevap olmadan hangi kolun kırık olduğunu
bilemeyiz.

---

## Bir de şu

Bilgisayarı kapatmadım. Vercel deploy'u ve Google politika onayı
bekliyor; makine açık kalsın ki sabah kaldığın yerden devam edebil.

İyi sabahlar.
