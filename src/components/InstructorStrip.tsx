import Image from 'next/image'
import Link from 'next/link'
import { TEAM } from '@/lib/ekip'
import { displayRole } from '@/lib/roleLabel'

/**
 * Ana sayfa eğitmen şeridi.
 * Eskiden burada "6 Atölye / 2026 Kuruluş / 3 Mekân / ∞ Pratik" rakamları vardı;
 * yeni bir markanın en zayıf kartı geçmişidir, en güçlü kartı kadrosudur.
 *
 * 22 Ekim 2026 (Yağız): ekip ana sayfada daha görünür olsun diye şerit
 * hero'nun hemen altına, disiplin ızgarasından sonraya alındı.
 *
 * İki hata burada düzeltildi:
 *  1. Bileşenin kendi FACES listesi vardı — ekip.ts'teki TEAM ile ikinci bir
 *     kaynak demekti. Artık doğrudan TEAM okunuyor, sıra da oradan geliyor.
 *  2. Linkler /hakkinda?open=…#ekip'e gidiyordu; o sayfada ne #ekip bölümü
 *     ne de TeamGrid var. Doğru hedef /ekip?open=<slug>.
 */
export function InstructorStrip() {
  return (
    <section className="border-b border-border bg-bgAlt" aria-labelledby="egitmenler-heading">
      <div className="px-4 md:px-14 pt-16 pb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-neon mb-4">
            — kimlerle çalışıyorsun
          </p>
          <h2
            id="egitmenler-heading"
            className="font-display text-fg leading-none"
            style={{ fontSize: 'clamp(28px,4.5vw,60px)', letterSpacing: '0.02em' }}
          >
            EĞİTMEN VE EKİP
          </h2>
        </div>
        <Link
          href="/ekip"
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-stone hover:text-neon transition-colors duration-200 pb-2"
          data-hover
        >
          tüm ekip →
        </Link>
      </div>

      {/* 8 kişi: telefonda 2, tablette 4, masaüstünde 8 sütun — hep tam sıra. */}
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-border border-t border-border">
        {TEAM.map((p) => (
          <li key={p.slug} className="bg-bg">
            {/* Doğrudan o kişinin biyografisine — ekip sayfasında tekrar tıklatmıyoruz */}
            <Link
              href={`/ekip?open=${p.slug}`}
              className="group block"
              aria-label={`${p.name} — biyografi`}
              data-hover
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 12vw"
                    className="object-cover transition-all duration-500"
                    /* 22 Ekim 2026 (Yağız): eğitmen görselleri her durumda siyah beyaz.
                       DİKKAT: gri tonlama buradan, Tailwind'in `grayscale` sınıfından değil.
                       İkisi de CSS `filter`'ı yazıyor; satır içi stil sınıfı eziyordu, bu yüzden
                       renkli portreler (Selen, Yeşim, Ece) renkli basılıyordu. İkisi tek
                       bildirimde birleşti. */
                    style={{ filter: 'grayscale(1) brightness(0.82)' }}
                  />
                )}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,12,0.92), transparent)' }}
                />
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
              {/* min-h: unvan satırı kiminde iki, kiminde üç satır oluyor.
                  Sabit yükseklik olmadan şeridin alt kenarı tırtıklı duruyordu. */}
              <div className="px-3 py-4 min-h-[88px]">
                <p
                  className="font-display text-fg group-hover:text-neon transition-colors duration-200 leading-tight"
                  style={{ fontSize: 16, letterSpacing: '0.02em' }}
                >
                  {p.name.toUpperCase()}
                </p>
                <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-dim mt-1.5">
                  {displayRole(p.role)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
