/**
 * /kaynaklar/muzikal-secme-sarkilari — ses tipine göre müzikal seçme şarkıları.
 * Her liste, kaynağında yayımlandığı gibi (şarkı + müzikal). Kaynak URL'leri
 * 7 Ekim 2026'da kontrol edildi. Listeye kendi şarkımızı EKLEMİYORUZ; bu sayfa
 * bir derleme ve yorum sayfası.
 */
export type Song = { song: string; show: string }
export type SongList = {
  key: string
  label: string
  voice: string
  note: string
  source: { name: string; url: string }
  songs: Song[]
}

export const VOICE_LISTS: SongList[] = [
  {
    key: 'soprano',
    label: 'Soprano',
    voice: 'Yüksek kadın sesi; legit (klasik tınılı) müzikal repertuvarı',
    note: 'Klasik tınının öne çıktığı legit şarkılarla, karakter ve komedi şarkıları bir arada. İkisinden birer tane hazırlamak, seçmede ikinci bir şey istendiğinde elinizi güçlendirir.',
    source: { name: 'BroadwayWorld — 25 Great Audition Songs for Sopranos', url: 'https://www.broadwayworld.com/industry/article/25-Great-Audition-Songs-for-Sopranos-20241120' },
    songs: [
      { song: 'What Only Love Can See', show: 'Chaplin' },
      { song: 'Two Little Words', show: 'Steel Pier' },
      { song: 'I’ll Show Him', show: 'Plain and Fancy' },
      { song: 'Happy Working Song', show: 'Enchanted' },
      { song: 'The Ballad of Jane Doe', show: 'Ride the Cyclone' },
      { song: 'Take Me to the World', show: 'Evening Primrose' },
      { song: 'All the Things You Are', show: 'Very Warm for May' },
      { song: 'Follow Your Dream', show: 'The Musical of Musicals' },
      { song: 'Soon', show: 'Thumbelina' },
      { song: 'A Little Bit Less Than', show: 'It Shoulda Been You' },
      { song: 'Falling in Love with Love', show: 'The Boys from Syracuse' },
      { song: 'I Could Have Danced All Night', show: 'My Fair Lady' },
    ],
  },
  {
    key: 'mezzo',
    label: 'Mezzo / Belter',
    voice: 'Orta-alçak kadın sesi; belt ve mix ağırlıklı çağdaş repertuvar',
    note: 'Liste klasik dönemden (Annie Get Your Gun, On the Town) çağdaş yapımlara (In the Heights, The Color Purple) uzanıyor. Dönem çeşitliliği, seçme panelinin sizi farklı renklerde duymasını sağlar.',
    source: { name: 'Backstage — The Best Audition Songs for Mezzo-Sopranos', url: 'https://www.backstage.com/magazine/article/mezzo-sopranos-singer-advice-77159/' },
    songs: [
      { song: 'Got the Sun in the Morning', show: 'Annie Get Your Gun' },
      { song: 'I Can Cook, Too', show: 'On the Town' },
      { song: 'Shy', show: 'Once Upon a Mattress' },
      { song: 'I Remember', show: 'Evening Primrose' },
      { song: 'I’ve Never Said I Love You', show: 'Dear World' },
      { song: 'Another Hundred People', show: 'Company' },
      { song: 'I Don’t Know How to Love Him', show: 'Jesus Christ Superstar' },
      { song: 'The Story Goes On', show: 'Baby' },
      { song: 'I’m Here', show: 'The Color Purple' },
      { song: 'Everything I Know', show: 'In the Heights' },
      { song: 'Even Though', show: 'I Love You Because' },
      { song: 'Fly Into the Future', show: 'Vanities' },
    ],
  },
  {
    key: 'tenor',
    label: 'Tenor',
    voice: 'Yüksek erkek sesi',
    note: 'Liste bilinen hitlerden çok, daha az söylenen ama ses için yazılmış şarkılara yaslanıyor. Seçmede “yeni” bir şarkı, panelin dikkatini taze tutar.',
    source: { name: 'Backstage — Best Tenor Audition Songs', url: 'https://www.backstage.com/magazine/article/best-tenor-audition-songs-77141/' },
    songs: [
      { song: 'Lost in the Wilderness', show: 'Children of Eden' },
      { song: 'I Met a Girl', show: 'Bells Are Ringing' },
      { song: 'Fifty Million Years Ago', show: 'Celebration' },
      { song: 'Winter’s on the Wing', show: 'The Secret Garden' },
      { song: 'Take a Chance on Me', show: 'Little Women' },
      { song: 'I Chose Right', show: 'Baby' },
      { song: 'Easy to Love', show: 'Anything Goes' },
      { song: 'She Was There', show: 'The Scarlet Pimpernel' },
      { song: 'Later', show: 'A Little Night Music' },
      { song: 'Where Do I Go?', show: 'Hair' },
    ],
  },
  {
    key: 'bariton',
    label: 'Bariton',
    voice: 'Orta-alçak erkek sesi',
    note: 'Komedi (The Brain, Modern Major-General) ile dramatik şarkılar (Stars, Make Them Hear You) yan yana. Seçmede biri komik biri ciddi iki şarkı hazırlamak en sık verilen öğütlerden biri.',
    source: { name: 'Backstage — 12 Broadway Bangers for Baritones', url: 'https://www.backstage.com/magazine/article/baritone-audition-songs-77071/' },
    songs: [
      { song: 'I Am the Very Model of a Modern Major-General', show: 'The Pirates of Penzance' },
      { song: 'My Time of Day', show: 'Guys and Dolls' },
      { song: 'Put on a Happy Face', show: 'Bye Bye Birdie' },
      { song: 'Camelot', show: 'Camelot' },
      { song: 'Being Alive', show: 'Company' },
      { song: 'Pretty Women', show: 'Sweeney Todd' },
      { song: 'Stars', show: 'Les Misérables' },
      { song: 'Me', show: 'Beauty and the Beast' },
      { song: 'Make Them Hear You', show: 'Ragtime' },
      { song: 'The Brain', show: 'Young Frankenstein' },
      { song: 'Yesterday, Tomorrow and Today', show: 'Women on the Verge of a Nervous Breakdown' },
      { song: 'Wait for It', show: 'Hamilton' },
    ],
  },
]

export const OVERDONE: SongList[] = [
  {
    key: 'overdone-genel',
    label: 'Çok söylenen şarkılar',
    voice: 'Seçme panellerinin çok sık duyduğu şarkılar',
    note: 'Bu şarkılar kötü değil; aksine çok iyi oldukları için çok söyleniyorlar. Sorun, panelin aklında zaten bir “ideal” versiyonun olması ve sizin onunla karşılaştırılmanız.',
    source: { name: 'Backstage — Avoid These Overdone Audition Songs', url: 'https://www.backstage.com/magazine/article/backstage-experts-answer-overdone-audition-songs-9898/' },
    songs: [
      { song: 'I Dreamed a Dream', show: 'Les Misérables' },
      { song: 'Castle on a Cloud', show: 'Les Misérables' },
      { song: 'Defying Gravity', show: 'Wicked' },
      { song: 'Let It Go', show: 'Frozen' },
      { song: 'If I Loved You', show: 'Carousel' },
      { song: 'Gimme Gimme', show: 'Thoroughly Modern Millie' },
      { song: 'There Are Worse Things I Could Do', show: 'Grease' },
      { song: 'Tomorrow', show: 'Annie' },
      { song: 'Maybe', show: 'Annie' },
      { song: 'Anthem', show: 'Chess' },
    ],
  },
  {
    key: 'overdone-okul',
    label: 'Okul seçmelerinde çok söylenenler',
    voice: 'Konservatuvar ve okul seçmeleri için “söylemeyin” listesi',
    note: 'Aynı kaynak, Waitress şarkılarının da çok sık seçildiğini not ediyor.',
    source: { name: 'Backstage — The “Do Not Sing” List: Overdone College Audition Songs', url: 'https://www.backstage.com/magazine/article/overdone-college-audition-songs-72413/' },
    songs: [
      { song: 'Times Are Hard for Dreamers', show: 'Amélie' },
      { song: 'Try Me', show: 'She Loves Me' },
      { song: 'Santa Fe', show: 'Newsies' },
      { song: 'Dead Mom', show: 'Beetlejuice' },
      { song: 'All I Need Is the Girl', show: 'Gypsy' },
      { song: 'Life I Never Led', show: 'Sister Act' },
      { song: 'Almost Like Being in Love', show: 'Brigadoon' },
    ],
  },
]

export const ALTERNATIVES: SongList = {
  key: 'alternatif',
  label: 'Aynı kaynağın önerdiği alternatifler',
  voice: 'Çok söylenen şarkıların yerine',
  note: 'Daha az duyulan ama güçlü şarkılar.',
  source: { name: 'Backstage — The “Do Not Sing” List', url: 'https://www.backstage.com/magazine/article/overdone-college-audition-songs-72413/' },
  songs: [
    { song: 'Before It’s Over', show: 'Dogfight' },
    { song: 'Gotta Get Out', show: 'Ordinary Days' },
    { song: 'Miracle of Miracles', show: 'Fiddler on the Roof' },
    { song: 'Go the Distance', show: 'Hercules' },
    { song: 'Christmas Lullaby', show: 'Songs for a New World' },
    { song: 'Crossing a Bridge', show: 'Anastasia' },
  ],
}

export const TOPLAM_SARKI =
  VOICE_LISTS.reduce((n, l) => n + l.songs.length, 0) +
  OVERDONE.reduce((n, l) => n + l.songs.length, 0) +
  ALTERNATIVES.songs.length
