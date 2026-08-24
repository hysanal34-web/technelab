import Link from 'next/link'
import { SITE_META } from '@/lib/data'
import { BultenForm } from '@/components/BultenForm'

export function Footer() {
  return (
    <footer className="border-t border-border mt-0">
      <div className="px-4 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl tracking-wider text-fg mb-1">TECHNE LAB İSTANBUL</div>
          <div className="font-mono text-[11px] tracking-widest2 uppercase text-dim">Bağımsız Tiyatro &amp; Performans — İstanbul</div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer navigasyon">
          {[
            ['/atolyeler','atölyeler'],
            ['/ekip','ekip'],
            ['/galeri','galeri'],
            ['/makaleler','makaleler'],
            ['/isbirlikleri','işbirliklerimiz'],
            ['/hakkinda','hakkında'],
            ['/iletisim','iletişim'],
          ].map(([href,label]) => (
            <Link key={href} href={href} className="font-mono text-[11px] tracking-[0.12em] lowercase text-stone hover:text-neon transition-colors duration-200 py-2">
              {label}
            </Link>
          ))}
        </nav>

        <div className="md:text-right">
          <a href={`mailto:${SITE_META.email}`} className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block py-1">
            {SITE_META.email}
          </a>
          {/* Tıkla-ara: numara değişirse SITE_META.phone/phoneE164 güncellenir (data.ts). */}
          <a
            href={`tel:${SITE_META.phoneE164}`}
            data-call-cta="footer"
            className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block py-1"
          >
            {SITE_META.phone}
          </a>
          <Link href="/bilgi" className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block py-1">
            fiyat &amp; program bilgisi iste →
          </Link>
          <a href={`https://instagram.com/${SITE_META.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 block py-1">
            {SITE_META.instagram}
          </a>
        </div>
      </div>

      {/* Bülten */}
      <div className="px-4 md:px-10 py-10 border-t border-border bg-bgAlt">
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-start">
          <div>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-3">
              haftalık bülten
            </span>
            <p className="font-mono text-[12px] text-stone leading-relaxed max-w-sm">
              Kültür–sanat gündemi, sanat ve teknolojinin kesiştiği yerler, edebiyat
              önerileri; Techne Lab&apos;in atölye duyuruları ve haberleri — haftada bir,
              tek e-postada.
            </p>
          </div>
          <BultenForm />
        </div>
      </div>

      {/* Kaynaklar & lokasyonlar — SEO iç bağlantı ağı */}
      <div className="px-4 md:px-10 py-8 border-t border-border grid md:grid-cols-3 gap-8">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-3">ücretsiz kaynaklar</span>
          <div className="flex flex-col gap-1">
            {[
              ['/kaynaklar/monologlar', 'monolog kütüphanesi'],
              ['/kaynaklar/sozluk', 'tiyatro sözlüğü'],
              ['/kaynaklar/ses-nefes', 'ses & nefes egzersizleri'],
              ['/atolye-testi', 'hangi atölye sana uygun?'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 py-0.5">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-3">lokasyonlar</span>
          <div className="flex flex-col gap-1">
            {[
              ['/kadikoy-tiyatro-kursu', 'kadıköy tiyatro kursu'],
              ['/beyoglu-tiyatro-kursu', 'beyoğlu · pera tiyatro kursu'],
              ['/isbirlikleri', 'partner mekânlar'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 py-0.5">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-neon block mb-3">english</span>
          <div className="flex flex-col gap-1">
            {[
              ['/en', 'acting classes in istanbul'],
              ['/en/english-drama-istanbul', 'english drama istanbul'],
              ['/en/acting-classes-istanbul', 'acting classes'],
              ['/en/musical-theatre-classes-istanbul', 'musical theatre & dance'],
              ['/en/drama-classes-for-kids-istanbul', 'drama for kids & teens'],
              ['/en/theatre-workshops-for-expats-istanbul', 'for expats'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="font-mono text-[11px] text-stone hover:text-neon transition-colors duration-200 py-0.5">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 pb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4">
        <span className="font-mono text-[11px] text-dim tracking-[0.1em]">© 2026 TECHNE LAB İSTANBUL</span>
        <Link href="/kvkk" className="font-mono text-[11px] text-dim hover:text-neon transition-colors duration-200 tracking-[0.1em] lowercase py-2">
          kvkk aydınlatma metni
        </Link>
        <span className="font-mono text-[11px] text-dim tracking-[0.14em] uppercase hidden md:block" title="τέχνη — zanaat">τέχνη · zanaat · istanbul</span>
        <span className="font-mono text-[11px] text-dim tracking-[0.1em] uppercase">Tüm Hakları Saklıdır</span>
      </div>
    </footer>
  )
}
