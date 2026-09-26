/**
 * TECHNE LAB · OPERASYON OTOMASYONU
 *
 * Ne yapar:
 *  1. Siteden gelen "Tanışma Günü" e-postalarını 15 dakikada bir ADAYLAR sekmesine ekler.
 *  2. Melis bir adayın DURUM'unu değiştirince "Son temas", "Sonraki adım" ve tarihini kendisi doldurur.
 *     Durum "8-KAYIT OLDU" olunca aday KAYIT-TAHSİLAT sekmesine de otomatik eklenir.
 *  3. Her sabah 07:00'de günlük listelerin tiklerini ARŞİV'e yazar ve sıfırlar
 *     (Pazartesi haftalık, ayın 1'i aylık liste de sıfırlanır).
 *  4. MELIS_EMAIL doluysa hafta içi her sabah Melis'e "bugün aranacaklar" e-postası gönderir.
 *
 * Kurulum (bir kez, 5 dakika):
 *  Sheet'te Uzantılar > Apps Script > bu kodun tamamını yapıştır > Kaydet.
 *  Sheet'i yenile > üstte "Techne Lab" menüsü çıkar > "İlk kurulum" > izinleri onayla.
 */

const AYAR = {
  MELIS_EMAIL: '', // Örnek: 'melis@technelabistanbul.com'. Boş kalırsa sabah e-postası gitmez.
  FORM_GONDEREN: 'info@technelabistanbul.com',
};

const SEKME = {
  ADAY: 'ADAYLAR',
  KAYIT: 'KAYIT-TAHSİLAT',
  MELIS: 'MELİS GÜNLÜK',
  YAGIZ: 'YAĞIZ GÜNLÜK',
  HAFTA: 'HAFTALIK',
  AY: 'AYLIK',
  ARSIV: 'ARŞİV',
};

// ADAYLAR sütunları (1'den başlar)
const K = {
  TARIH: 1, KAYNAK: 2, PROGRAM: 3, SEANS: 4, AD: 5, TEL: 6, EPOSTA: 7, IG: 8, YAS: 9,
  MESLEK: 10, INGILIZCE: 11, DENEYIM: 12, DUYDU: 13, IZIN: 14, DURUM: 15, DENEME: 16,
  SON_TEMAS: 17, SONRAKI: 18, SONRAKI_TARIH: 19, TUTAR: 20, NOT: 21, ID: 22,
};

// Durum değişince önerilen sonraki adım ve kaç gün sonra
const AKIS = {
  '1-Yeni':               ['İlk arama (24 saat içinde)', 0],
  '2-Ulaşılamadı':        ['Tekrar ara + WhatsApp "ulaşılamadı" mesajı', 1],
  '3-Görüşüldü':          ['Program dosyasını gönder, tanışmaya davet et', 2],
  '4-Tanışmaya gelecek':  ['Tanışmadan 1 gün önce hatırlatma mesajı', 0],
  '5-Tanışmaya geldi':    ['Aynı akşam teşekkür + ertesi gün kayıt görüşmesi', 1],
  '6-Gelmedi':            ['Yeni tanışma tarihi ya da birebir görüşme öner', 1],
  '7-Ödeme bekleniyor':   ['Ödeme hatırlatması', 2],
  '8-KAYIT OLDU':         ['KAYIT-TAHSİLAT satırını tamamla', 0],
  '9-Kaybedildi':         ['Kayıp nedenini NOT sütununa yaz', 0],
  '10-Sonraki dönem':     ['Yeni dönem duyurusunda haber ver', 30],
};

function ss() { return SpreadsheetApp.getActiveSpreadsheet(); }
function bugun() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function gunEkle(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

/* ---------------- MENÜ ---------------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Techne Lab')
    .addItem('Yeni başvuruları şimdi çek', 'gmaildenAdayCek')
    .addItem('Bugünün arama listesini e-postayla gönder', 'sabahOzeti')
    .addSeparator()
    .addItem('İlk kurulum (bir kez)', 'kurulum')
    .addToUi();
}

function kurulum() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('gmaildenAdayCek').timeBased().everyMinutes(15).create();
  ScriptApp.newTrigger('gunBasi').timeBased().atHour(7).nearMinute(0).everyDays(1).create();
  ScriptApp.newTrigger('durumDegisti').forSpreadsheet(ss()).onEdit().create();

  // Görev listelerindeki ilk sütunu onay kutusuna çevir
  [SEKME.MELIS, SEKME.YAGIZ, SEKME.HAFTA, SEKME.AY].forEach(ad => {
    const sh = ss().getSheetByName(ad);
    if (!sh || sh.getLastRow() < 2) return;
    const r = sh.getRange(2, 1, sh.getLastRow() - 1, 1);
    r.clearDataValidations();
    r.insertCheckboxes();
  });

  gmaildenAdayCek(true);
  SpreadsheetApp.getUi().alert(
    'Kurulum tamam.\n\n' +
    '· Yeni başvurular 15 dakikada bir ADAYLAR sekmesine düşecek.\n' +
    '· Her sabah 07:00 listeler sıfırlanıp ARŞİV\'e yazılacak.\n' +
    (AYAR.MELIS_EMAIL ? '· Melis\'e hafta içi sabah özeti gidecek.' : '· Melis\'e sabah e-postası için koddaki MELIS_EMAIL satırını doldur.')
  );
}

/* ---------------- 1. GMAIL > ADAYLAR ---------------- */

function gmaildenAdayCek(ilkKurulum) {
  const sh = ss().getSheetByName(SEKME.ADAY);
  const gun = ilkKurulum === true ? '45d' : '3d';
  const sorgu = `from:${AYAR.FORM_GONDEREN} subject:"Tanışma Günü" newer_than:${gun}`;

  const sonSatir = sh.getLastRow();
  const mevcut = new Set(
    sonSatir >= 2
      ? sh.getRange(2, K.ID, sonSatir - 1, 1).getValues().map(r => String(r[0]).toLowerCase())
      : []
  );

  const yeni = [];
  GmailApp.search(sorgu, 0, 200).forEach(thread => {
    thread.getMessages().forEach(m => {
      if (!/^Tanışma Günü/.test(m.getSubject())) return;
      const f = formuOku(m.getBody());
      if (!f['Tanışma Günü']) return;

      const [program, ...seansParca] = f['Tanışma Günü'].split(' — ');
      const youth = !!f['Veli Telefon'];
      const eposta = youth ? (f['Veli E-posta'] || '') : (f['E-posta'] || '');
      const tel = youth ? (f['Veli Telefon'] || '') : (f['Telefon'] || '');
      const anahtar = `${(eposta || tel).toLowerCase()}|${program.trim().toLowerCase()}`;
      if (mevcut.has(anahtar)) return;
      mevcut.add(anahtar);

      const dogum = parseInt(f['Doğum Yılı'], 10);
      const deneyim = [
        f['Sahne Deneyimi'] ? 'Deneyim: ' + f['Sahne Deneyimi'] : '',
        f['Beklenti'] ? 'Beklenti: ' + f['Beklenti'] : '',
      ].filter(Boolean).join(' / ');

      const satir = new Array(K.ID).fill('');
      satir[K.TARIH - 1] = m.getDate();
      satir[K.KAYNAK - 1] = 'Form';
      satir[K.PROGRAM - 1] = program.trim();
      satir[K.SEANS - 1] = seansParca.join(' — ').trim();
      satir[K.AD - 1] = f['Ad Soyad'] || f['Öğrenci Adı Soyadı'] || '';
      satir[K.TEL - 1] = tel ? "'" + tel : '';
      satir[K.EPOSTA - 1] = eposta;
      satir[K.IG - 1] = f['Instagram'] || '';
      satir[K.YAS - 1] = dogum ? new Date().getFullYear() - dogum : '';
      satir[K.MESLEK - 1] = f['Meslek'] || f['Okul / Sınıf'] || '';
      satir[K.INGILIZCE - 1] = f['İngilizce Seviyesi'] || '';
      satir[K.DENEYIM - 1] = deneyim;
      satir[K.DUYDU - 1] = f['Nasıl Duydu'] || '';
      satir[K.IZIN - 1] = /^Evet/.test(f['İletişim İzni (duyuru)'] || '') ? 'Evet' : 'Hayır';
      satir[K.DURUM - 1] = '1-Yeni';
      satir[K.DENEME - 1] = 0;
      satir[K.SONRAKI - 1] = AKIS['1-Yeni'][0];
      satir[K.SONRAKI_TARIH - 1] = bugun();
      satir[K.NOT - 1] = youth ? 'Youth · Veli: ' + (f['Veli Adı Soyadı'] || '') : '';
      satir[K.ID - 1] = anahtar;
      yeni.push(satir);
    });
  });

  if (!yeni.length) return 0;
  yeni.sort((a, b) => a[0] - b[0]);
  sh.getRange(sh.getLastRow() + 1, 1, yeni.length, K.ID).setValues(yeni);
  return yeni.length;
}

// E-postadaki "Etiket: değer" tablosunu nesneye çevirir
function formuOku(html) {
  const sonuc = {};
  const re = /<td[^>]*>([^<]+?):<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    sonuc[temizle(m[1])] = temizle(m[2].replace(/<br\s*\/?>/gi, ' / '));
  }
  return sonuc;
}

function temizle(s) {
  return s.replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

/* ---------------- 2. DURUM DEĞİŞİNCE ---------------- */

function durumDegisti(e) {
  if (!e || !e.range) return;
  const sh = e.range.getSheet();
  if (sh.getName() !== SEKME.ADAY || e.range.getColumn() !== K.DURUM || e.range.getRow() < 2) return;
  if (e.range.getNumRows() > 1) return;

  const row = e.range.getRow();
  const durum = String(e.value || '');
  const akis = AKIS[durum];
  if (!akis) return;

  sh.getRange(row, K.SON_TEMAS).setValue(bugun());
  sh.getRange(row, K.SONRAKI).setValue(akis[0]);
  sh.getRange(row, K.SONRAKI_TARIH).setValue(gunEkle(bugun(), akis[1]));

  if (durum === '2-Ulaşılamadı') {
    const deneme = Number(sh.getRange(row, K.DENEME).getValue() || 0) + 1;
    sh.getRange(row, K.DENEME).setValue(deneme);
    if (deneme >= 3) {
      sh.getRange(row, K.SONRAKI).setValue('3. deneme oldu: son WhatsApp mesajını at, cevap yoksa 10-Sonraki dönem yap');
    }
  }

  if (durum === '8-KAYIT OLDU') kayitSekmesineEkle(sh, row);
}

function kayitSekmesineEkle(adaySh, row) {
  const kayit = ss().getSheetByName(SEKME.KAYIT);
  const v = adaySh.getRange(row, 1, 1, K.ID).getValues()[0];
  const ad = v[K.AD - 1], program = v[K.PROGRAM - 1];

  const son = kayit.getLastRow();
  if (son >= 2) {
    const var_mi = kayit.getRange(2, 2, son - 1, 2).getValues()
      .some(r => r[0] === ad && r[1] === program);
    if (var_mi) return;
  }
  // İlk boş satırı bul (B sütunu boş olan)
  const b = kayit.getRange('B2:B').getValues();
  let hedef = b.findIndex(r => r[0] === '') + 2;
  if (hedef < 2) hedef = kayit.getLastRow() + 1;

  kayit.getRange(hedef, 1, 1, 3).setValues([[bugun(), ad, program]]);
  const kaynak = [v[K.KAYNAK - 1], v[K.DUYDU - 1]].filter(Boolean).join(' · ');
  kayit.getRange(hedef, 12).setValue(kaynak);
}

/* ---------------- 3. SABAH SIFIRLAMA ---------------- */

function gunBasi() {
  const d = new Date();
  const dun = gunEkle(bugun(), -1);

  listeyiArsivle(SEKME.MELIS, dun, 'Günlük');
  listeyiArsivle(SEKME.YAGIZ, dun, 'Günlük');
  if (d.getDay() === 1) listeyiArsivle(SEKME.HAFTA, dun, 'Haftalık');
  if (d.getDate() === 1) listeyiArsivle(SEKME.AY, dun, 'Aylık');

  if (d.getDay() >= 1 && d.getDay() <= 5) sabahOzeti();
}

function listeyiArsivle(ad, tarih, tur) {
  const sh = ss().getSheetByName(ad);
  if (!sh || sh.getLastRow() < 2) return;
  const n = sh.getLastRow() - 1;
  const tik = sh.getRange(2, 1, n, 1);
  const vals = sh.getRange(2, 1, n, 3).getValues(); // ✓, Saat/Kim, Görev
  const yapilan = vals.filter(r => r[0] === true || r[0] === '✓').length;
  if (yapilan === 0 && (tarih.getDay() === 0 || tarih.getDay() === 6)) return; // boş hafta sonu

  const kalan = vals.filter(r => r[2] && !(r[0] === true || r[0] === '✓')).map(r => r[2]);
  const arsiv = ss().getSheetByName(SEKME.ARSIV);
  arsiv.appendRow([tarih, ad, tur, yapilan, vals.filter(r => r[2]).length,
    kalan.length ? kalan.join(' | ') : 'Hepsi tamam']);

  const kural = tik.getCell(1, 1).getDataValidation();
  if (kural && kural.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX) tik.uncheck();
  else tik.clearContent();
}

/* ---------------- 4. MELİS'E SABAH ÖZETİ ---------------- */

function sabahOzeti() {
  if (!AYAR.MELIS_EMAIL) return;
  const sh = ss().getSheetByName(SEKME.ADAY);
  if (sh.getLastRow() < 2) return;
  const bitis = gunEkle(bugun(), 1);
  const kapali = ['8-KAYIT OLDU', '9-Kaybedildi', '10-Sonraki dönem'];

  const liste = sh.getRange(2, 1, sh.getLastRow() - 1, K.ID).getValues()
    .filter(r => r[K.AD - 1] && !kapali.includes(r[K.DURUM - 1]))
    .filter(r => r[K.DURUM - 1] === '1-Yeni' || (r[K.SONRAKI_TARIH - 1] instanceof Date && r[K.SONRAKI_TARIH - 1] < bitis))
    .sort((a, b) => String(a[K.DURUM - 1]).localeCompare(String(b[K.DURUM - 1]), 'tr'));

  if (!liste.length) return;
  const satirlar = liste.map(r => `<tr>
      <td style="padding:6px 10px">${r[K.AD - 1]}</td>
      <td style="padding:6px 10px">${r[K.PROGRAM - 1]}</td>
      <td style="padding:6px 10px">${String(r[K.TEL - 1]).replace(/^'/, '')}</td>
      <td style="padding:6px 10px">${r[K.DURUM - 1]}</td>
      <td style="padding:6px 10px">${r[K.SONRAKI - 1]}</td></tr>`).join('');

  MailApp.sendEmail({
    to: AYAR.MELIS_EMAIL,
    subject: `Bugün aranacaklar · ${liste.length} kişi`,
    htmlBody: `<p>Günaydın Melis, bugünün listesi aşağıda. Her görüşmeden sonra DURUM sütununu güncellemen yeterli.</p>
      <table style="border-collapse:collapse;font-family:Arial;font-size:13px">
      <tr style="background:#0A0A0C;color:#C8FF00"><th style="padding:6px 10px;text-align:left">Ad</th>
      <th style="padding:6px 10px;text-align:left">Program</th><th style="padding:6px 10px;text-align:left">Telefon</th>
      <th style="padding:6px 10px;text-align:left">Durum</th><th style="padding:6px 10px;text-align:left">Sonraki adım</th></tr>
      ${satirlar}</table>
      <p><a href="${ss().getUrl()}">Operasyon tablosunu aç</a></p>`,
  });
}
