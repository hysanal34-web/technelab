import type { Metadata } from 'next'
import { SITE_META } from '@/lib/data'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Techne Lab İstanbul — 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
  alternates: { canonical: `${SITE_META.url}/kvkk` },
  robots: { index: false, follow: true },
}

const SECTIONS: [string, string][] = [
  ['1. Veri Sorumlusu',
    `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla Techne Lab İstanbul ("Techne Lab") tarafından aşağıda açıklanan kapsamda işlenmektedir.`],
  ['2. İşlenen Kişisel Veriler',
    `Atölye kayıt ve iletişim süreçlerinde; ad-soyad, e-posta adresi, telefon numarası, adres (isteğe bağlı), sahne deneyimi bilgisi (isteğe bağlı) ve ödeme işlemine ilişkin sipariş bilgileri işlenir. Kredi kartı bilgileri Techne Lab tarafından görülmez ve saklanmaz; ödeme, PayTR güvenli ödeme altyapısı üzerinden gerçekleşir.`],
  ['3. İşleme Amaçları',
    `Kişisel verileriniz; atölye kaydınızın oluşturulması ve yürütülmesi, sizinle program hakkında iletişim kurulması, yasal yükümlülüklerin yerine getirilmesi (fatura, mesafeli satış) ve açık rızanız olması hâlinde duyuru/bilgilendirme gönderimi amaçlarıyla işlenir.`],
  ['4. Aktarım',
    `Verileriniz; ödeme işlemi için PayTR Ödeme Kuruluşu A.Ş.'ye, barındırma için yurt dışında sunucuları bulunan hizmet sağlayıcılara (Vercel Inc.) ve yasal zorunluluk hâlinde yetkili kurumlara aktarılabilir. Verileriniz pazarlama amacıyla üçüncü kişilere satılmaz.`],
  ['5. Toplama Yöntemi ve Hukuki Sebep',
    `Verileriniz, web sitesi üzerindeki kayıt ve iletişim formları aracılığıyla elektronik ortamda; KVKK m.5/2(c) sözleşmenin kurulması ve ifası, m.5/2(ç) hukuki yükümlülük ve açık rıza hukuki sebeplerine dayanılarak toplanır.`],
  ['6. Saklama Süresi',
    `Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.`],
  ['7. Haklarınız (KVKK m.11)',
    `Verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme, aktarıldığı üçüncü kişileri öğrenme, işlemenin sonuçlarına itiraz etme ve zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz. Taleplerinizi ${SITE_META.email} adresine iletebilirsiniz; başvurunuz en geç 30 gün içinde yanıtlanır.`],
]

export default function KvkkPage() {
  return (
    <>
      <section className="px-4 md:px-10 pt-24 pb-12 border-b border-border relative">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-neon" />
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">yasal</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(32px, 5.5vw, 72px)', letterSpacing: '0.01em', lineHeight: 0.95 }}>
          KVKK AYDINLATMA<br />METNİ
        </h1>
        <p className="font-mono text-[12px] text-dim mt-4">Son güncelleme: Temmuz 2026</p>
      </section>

      <section className="px-4 md:px-10 py-16 max-w-3xl">
        {SECTIONS.map(([h, t]) => (
          <div key={h} className="mb-10">
            <h2 className="font-display text-fg mb-3" style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', letterSpacing: '0.02em' }}>{h}</h2>
            <p className="font-mono text-[14px] text-stone leading-relaxed">{t}</p>
          </div>
        ))}
        <p className="font-mono text-[12px] text-dim border-t border-border pt-6">
          Techne Lab İstanbul · {SITE_META.email} · İstanbul, Türkiye
        </p>
      </section>
    </>
  )
}
