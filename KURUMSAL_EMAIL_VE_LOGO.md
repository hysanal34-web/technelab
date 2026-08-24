# Kurumsal E-posta + Google'da Logo — Yapılacaklar

---

## A · Google'da Logo / Favicon Sorunu (Kod Değişti — Deploy Gerekiyor)

### Neden çıkmıyordu?
İki sorun vardı:
1. `app/icon.png` placeholder'dı, gerçek logo değildi
2. JSON-LD schema'da `logo` düz URL'di; Google `ImageObject` bekliyor
3. Favicon `<link>` etiketleri HTML'e yazılmıyordu

### Yapılan değişiklikler
- ✅ `src/app/icon.png` — logondan üretildi (512×512, şeffaf arka plan)
- ✅ `public/apple-touch-icon.png` — 180×180 (iOS için)
- ✅ `public/icon-192.png` — 192×192 (PWA için)
- ✅ `public/images/techne-logo.png` — 512×512 güncellendi
- ✅ `layout.tsx` → `metadata.icons` eklendi (Next.js otomatik `<link rel="icon">` üretir)
- ✅ JSON-LD → `logo` artık `ImageObject` (Google bu formatı tanıyor)
- ✅ `@type` dizisine `Organization` eklendi

### Deploy et
```bash
cd /Users/macbookpro/Downloads/technelab
npx vercel --prod --yes
```

### Google ne zaman gösterir?
Deploy sonrası Google'ın yeniden crawl etmesi gerekiyor — genellikle **birkaç gün, bazen birkaç hafta**.
Hızlandırmak için Google Search Console'da "URL denetle → Yeniden dizine eklemek için iste" kullan:
→ https://search.google.com/search-console

---

## B · Google Workspace Kurulumu (info@technelabistanbul.com)

Domain **GoDaddy**'de, e-posta servisi **Google Workspace** ($6/ay).

### Adım 1 — Google Workspace'e Kaydol

1. https://workspace.google.com/intl/tr/ adresine git
2. **"Başlayın"** → Business Starter seç ($6/kullanıcı/ay)
3. Şirket adı: `Techne Lab`
4. Çalışan sayısı: 1–9
5. **"Zaten bir alan adım var"** seç
6. Alan adı: `technelabistanbul.com`
7. Hesap oluştur: `info` kullanıcı adı → `info@technelabistanbul.com`

### Adım 2 — GoDaddy'de DNS Kayıtlarını Ekle

Google kurulum sihirbazı sana özel kayıtlar gösterecek — ama standart değerler bunlar:

#### MX Kayıtları (önce mevcut MX'leri sil!)

| Tür | Ad | Değer | Öncelik | TTL |
|-----|----|-------|---------|-----|
| MX | @ | ASPMX.L.GOOGLE.COM | 1 | 3600 |
| MX | @ | ALT1.ASPMX.L.GOOGLE.COM | 5 | 3600 |
| MX | @ | ALT2.ASPMX.L.GOOGLE.COM | 5 | 3600 |
| MX | @ | ALT3.ASPMX.L.GOOGLE.COM | 10 | 3600 |
| MX | @ | ALT4.ASPMX.L.GOOGLE.COM | 10 | 3600 |

#### SPF (spam koruması)
| Tür | Ad | Değer | TTL |
|-----|----|-------|-----|
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | 3600 |

#### DKIM (Google sana özel key verecek — kurulumdan sonra)
Kurulum sihirbazının "E-postayı doğrula" adımında sana bir TXT kaydı verecek, onu ekle.

#### DMARC (spam reddedici — isteğe bağlı ama önerilir)
| Tür | Ad | Değer | TTL |
|-----|----|-------|-----|
| TXT | _dmarc | `v=DMARC1; p=quarantine; rua=mailto:info@technelabistanbul.com` | 3600 |

### GoDaddy'de nasıl eklersin?
1. https://dcc.godaddy.com → giriş yap
2. Sol menü: **"Domains"** → `technelabistanbul.com` → **"DNS"**
3. **"Add"** ile her kaydı tek tek ekle
4. Mevcut MX kayıtları varsa önce onları sil

### Adım 3 — Alan Adını Doğrula

Google sana bir TXT veya CNAME doğrulama kodu verir. GoDaddy'de onu da ekle.
Doğrulama genellikle **5–30 dakika** içinde tamamlanır.

### Adım 4 — DNS Yayılmasını Bekle

MX kayıtları **24–48 saat** içinde yayılır. Kontrol:
```
https://toolbox.googleapps.com/apps/checkmx/
```
`technelabistanbul.com` yaz → Google MX kayıtlarını görüyor mu doğrula.

### Adım 5 — Resend'i Güncelle (kodda)

Workspace aktif olduktan sonra şu değişiklikleri yap:

**`src/lib/data.ts`** içinde:
```typescript
email: 'info@technelabistanbul.com',  // 'technelabistanbul@gmail.com' yerine
```

**Resend'de domain doğrulama** (https://resend.com/domains):
- `technelabistanbul.com` ekle
- Resend'in istediği DNS kayıtlarını da GoDaddy'ye ekle
- Onaylandıktan sonra `actions.ts` dosyalarında `from` adresini güncelle:
  ```
  from: 'Techne Lab <info@technelabistanbul.com>'
  ```

Sonra deploy:
```bash
cd /Users/macbookpro/Downloads/technelab
npx vercel --prod --yes
```

---

## Özet: Yapılacaklar Sırası

1. [ ] `npx vercel --prod --yes` → favicon/logo düzeltmesi canlıya al
2. [ ] workspace.google.com → kayıt ol
3. [ ] GoDaddy DNS → MX + SPF + doğrulama kaydı ekle
4. [ ] 24 saat bekle → MX yayılsın
5. [ ] DKIM kaydını ekle (Google kurulum sihirbazından)
6. [ ] Resend'e domain ekle → DNS kayıtları ekle
7. [ ] `data.ts` + `actions.ts` email güncelle → deploy
8. [ ] Google Search Console'da URL yeniden dizine ekle (logo için)
