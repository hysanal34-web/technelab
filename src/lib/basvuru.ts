/**
 * Programa özel başvuru soruları.
 *
 * Genel form (ad, e-posta, telefon, deneyim, motivasyon, KVKK) her programda
 * aynı. Buradaki alanlar programın gerçekten ihtiyaç duyduğu ek sorular —
 * müzikal ve dans için video zorunlu, İngilizce programlarda dil seviyesi vb.
 *
 * Alan adları `kayit/actions.ts` içindeki EXTRA_KEYS listesiyle eşleşmeli;
 * yeni bir alan eklerken oraya da eklemeyi unutma.
 */

export type ExtraField =
  | { kind: 'select';   name: string; label: string; required?: boolean; options: string[]; help?: string }
  | { kind: 'text';     name: string; label: string; required?: boolean; placeholder?: string; help?: string }
  | { kind: 'url';      name: string; label: string; required?: boolean; placeholder?: string; help?: string }
  | { kind: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string; rows?: number; help?: string }

export type BasvuruConfig = {
  /** Formun üstünde görünen kısa uyarı — başvuru koşulu varsa buraya. */
  notice?: string
  fields: ExtraField[]
  /** Genel formda gizlenecek alanlar (o program için anlamsızsa). */
  hide?: ('occupation' | 'portfolyoLink')[]
}

const ENGLISH_LEVELS = [
  'B1 — Orta (sohbet edebiliyorum)',
  'B2 — İyi',
  'C1 — İleri',
  'C2 / Anadil seviyesi',
]

export const BASVURU: Record<string, BasvuruConfig> = {
  // ── 01 · THE AUTEUR LAB ────────────────────────────────────────────
  'auteur-lab': {
    fields: [
      {
        kind: 'select',
        name: 'writingLevel',
        label: 'Yazma Deneyimin',
        required: true,
        options: [
          'Hiç yazmadım — buradan başlıyorum',
          'Kendim için yazıyorum, kimseye göstermedim',
          'Öykü / senaryo / şiir yazdım, oyun yazmadım',
          'Oyun yazdım ama sahnelenmedi',
          'Sahnelenmiş / yayımlanmış metnim var',
        ],
      },
      {
        kind: 'textarea',
        name: 'goal',
        label: 'Aklında Bir Metin Var mı?',
        placeholder:
          'Yazmak istediğin bir hikâye, bir mesele ya da bir sahne varsa birkaç cümleyle anlat. Yoksa "yok" yazman da yeterli — çoğu kişi boş sayfayla geliyor.',
        rows: 4,
      },
    ],
    hide: ['portfolyoLink'],
  },

  // ── 03 · ENGLISH DRAMA LAB ─────────────────────────────────────────
  'english-drama-lab': {
    notice:
      'İki ayrı grup açılıyor — aynı program, farklı gün ve semt. Hangisine katılmak istediğini seçmen yeterli.',
    fields: [
      {
        kind: 'select',
        name: 'location',
        label: 'Grup Tercihi',
        required: true,
        options: [
          'Pera — 12 Eylül Cumartesi 15:00',
          'Kadıköy — 14 Eylül Pazartesi 20:00',
          'İkisi de olur',
        ],
      },
      {
        kind: 'select',
        name: 'englishLevel',
        label: 'İngilizce Seviyen',
        required: true,
        options: ENGLISH_LEVELS,
        help: 'B1 ve üzeri rahat takip eder. Akıcı olman gerekmiyor — sohbet edebiliyorsan yeterli.',
      },
    ],
    hide: ['portfolyoLink'],
  },

  // ── 04 · ENGLISH ACTING PRAXIS ─────────────────────────────────────
  'english-drama-final-project': {
    notice:
      'Bu program İngilizce sahne oyunculuğuna odaklanıyor ve ileri seviye bir çalışma. Başvurular tek tek değerlendirilir.',
    fields: [
      {
        kind: 'select',
        name: 'englishLevel',
        label: 'İngilizce Seviyen',
        required: true,
        options: ENGLISH_LEVELS,
        help: 'Program metin üzerinden ilerliyor — B2 ve üzeri öneriyoruz.',
      },
      {
        kind: 'select',
        name: 'actingLevel',
        label: 'Oyunculuk Deneyimin',
        required: true,
        options: [
          'Profesyonel oyuncuyum',
          'Konservatuvar / oyunculuk eğitimi aldım',
          'Amatör sahne deneyimim var',
          'Atölye deneyimim var, sahneye çıkmadım',
          'Yeni başlıyorum',
        ],
      },
      {
        kind: 'textarea',
        name: 'goal',
        label: 'Bu Programdan Hedefin Ne?',
        placeholder:
          'Uluslararası casting, yurt dışı eğitim, İngilizce sahne pratiği… Ne için geldiğini bilmek programı sana göre kurmamıza yardım ediyor.',
        rows: 3,
      },
      {
        kind: 'url',
        name: 'videoLink',
        label: 'Showreel / Oyunculuk Videosu',
        placeholder: 'https://youtube.com/… veya https://drive.google.com/…',
        help: 'Varsa paylaş — zorunlu değil. Bağlantının herkese açık olduğundan emin ol.',
      },
    ],
  },

  // ── 05 · ENGLISH DRAMA YOUTH (ayrı form, veli alanlı) ──────────────
  // NOT: Youth'un kendi formu var (YouthRegistrationForm) — veli alanları,
  // lokasyon ve İngilizce seviyesi orada tanımlı. Burada ek alan gerekmiyor.
  'english-drama-youth': { fields: [] },

  // ── 06 · TECHNE MUSICAL LAB ────────────────────────────────────────
  'techne-musical-lab': {
    notice:
      'Bu programa kabul video incelemesiyle yapılıyor. Bir müzikal ya da pop şarkısını seslendirdiğin kısa bir video bağlantısı olmadan başvuru değerlendirilemiyor.',
    fields: [
      {
        kind: 'url',
        name: 'videoLink',
        label: 'Şarkı Videosu Bağlantısı',
        required: true,
        placeholder: 'https://youtube.com/… veya https://drive.google.com/…',
        help: 'Bir müzikal ya da pop şarkısı — 1–2 dakika yeterli. Telefonla çekilmiş olması sorun değil, sesin duyulması yeterli. Bağlantıyı herkese açık yapmayı unutma.',
      },
      {
        kind: 'select',
        name: 'vocalLevel',
        label: 'Şan / Vokal Deneyimin',
        required: true,
        options: [
          'Şan eğitimi aldım',
          'Koroda / grupta söyledim',
          'Kendi başıma söylüyorum, eğitim almadım',
          'Yeni başlıyorum',
        ],
      },
      {
        kind: 'select',
        name: 'danceLevel',
        label: 'Dans Deneyimin',
        required: true,
        options: [
          'Düzenli dans eğitimi alıyorum / aldım',
          'Bir dönem dans ettim',
          'Hiç dans etmedim',
        ],
      },
    ],
    hide: ['portfolyoLink'],
  },

  // ── 07 · BROADWAY MUSICAL DANCE ────────────────────────────────────
  'broadway-musical-dance': {
    notice:
      'Kabul video incelemesiyle yapılıyor. Bir müzikal ya da pop şarkısını seslendirdiğin kısa bir video bağlantısı gerekiyor.',
    fields: [
      {
        kind: 'url',
        name: 'videoLink',
        label: 'Şarkı Videosu Bağlantısı',
        required: true,
        placeholder: 'https://youtube.com/… veya https://drive.google.com/…',
        help: '1–2 dakika yeterli. Telefonla çekilmiş olabilir. Bağlantıyı herkese açık yapmayı unutma.',
      },
      {
        kind: 'select',
        name: 'danceLevel',
        label: 'Dans Deneyimin',
        required: true,
        options: [
          'Profesyonel / düzenli eğitim alıyorum',
          'Jazz, modern ya da bale geçmişim var',
          'Bir dönem dans ettim, ara verdim',
          'Hiç dans etmedim — sıfırdan başlıyorum',
        ],
        help: 'Sıfırdan başlayanlar da alınıyor — grubu doğru kurabilmek için soruyoruz.',
      },
    ],
    hide: ['portfolyoLink'],
  },
}

// ── 08 · CAMERA PRAXIS ──────────────────────────────────────────────
BASVURU['camera-praxis'] = {
  notice:
    'Çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor. Tarih netleştiğinde ön kayıt bırakanlara ilk biz haber veriyoruz.',
  fields: [
    {
      kind: 'select',
      name: 'actingLevel',
      label: 'Oyunculuk Deneyimin',
      required: true,
      options: [
        'Profesyonel oyuncuyum',
        'Konservatuvar / oyunculuk eğitimi aldım',
        'Amatör sahne deneyimim var',
        'Kamera önüne hiç çıkmadım',
        'Yeni başlıyorum',
      ],
    },
    {
      kind: 'select',
      name: 'englishLevel',
      label: 'İngilizce Seviyen',
      required: true,
      options: ENGLISH_LEVELS,
      help: 'Atölye çift dilli — çalışmalar hem Türkçe hem İngilizce metinler üzerinden yürüyor.',
    },
    {
      kind: 'url',
      name: 'videoLink',
      label: 'Showreel / Kamera Kaydı',
      placeholder: 'https://youtube.com/… veya https://drive.google.com/…',
      help: 'Varsa paylaş — zorunlu değil.',
    },
  ],
}

// ── 02 · OYUNCUNUN MEVCUDİYETİ ──────────────────────────────────────
BASVURU['oyuncunun-mevcudiyeti'] = {
  notice:
    'Tarih netleştiğinde ön kayıt bırakanlara ilk biz haber veriyoruz.',
  fields: [
    {
      kind: 'select',
      name: 'actingLevel',
      label: 'Sahne Deneyimin',
      required: true,
      options: [
        'Profesyonel oyuncuyum',
        'Oyunculuk eğitimi aldım',
        'Amatör sahne deneyimim var',
        'Atölye deneyimim var, sahneye çıkmadım',
        'Yeni başlıyorum',
      ],
    },
    {
      kind: 'textarea',
      name: 'goal',
      label: 'Bu Çalışmadan Beklentin Ne?',
      placeholder: 'Sahnede tıkandığın, geliştirmek istediğin bir şey varsa yaz — grubu ona göre kuruyoruz.',
      rows: 3,
    },
  ],
  hide: ['portfolyoLink'],
}

export function getBasvuruConfig(slug: string): BasvuruConfig {
  return BASVURU[slug] ?? { fields: [] }
}
