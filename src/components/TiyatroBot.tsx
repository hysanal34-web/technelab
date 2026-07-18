'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────
   100+ TİYATRO TARİHİ SORUSU
───────────────────────────────────────────────────────────────────────── */
const QUIZ: Array<{
  q: string
  options: [string, string, string, string]
  answer: number // 0-indexed
  fact: string
}> = [
  // ANTIK YUNANİSTAN
  { q: 'Antik Yunan tragedyasının "babası" olarak kabul edilen dramaturg kimdir?', options: ['Sophokles', 'Aiskhylos', 'Euripides', 'Aristophanes'], answer: 1, fact: 'Aiskhylos (MÖ 525–456), koroyu ikinci aktörle genişleterek gerçek dramatik diyaloğu mümkün kıldı.' },
  { q: 'Antik Yunan tiyatrosunda "orchestra" ne anlama gelir?', options: ['Müzisyenlerin bulunduğu alan', 'Koronun dans ettiği dairesel alan', 'Seyircilerin oturduğu yer', 'Oyunların sergilendiği yüksek sahne'], answer: 1, fact: 'Orchestradan "orchestrate" (orkestrasyon) kelimesi de türemiştir.' },
  { q: '"Kral Oidipus" adlı ünlü eserin yazarı kimdir?', options: ['Aiskhylos', 'Euripides', 'Sophokles', 'Aristophanes'], answer: 2, fact: 'Sophokles\'in Kral Oidipus\'u, Aristoteles tarafından Poetika\'da mükemmel tragedyanın örneği olarak gösterilmiştir.' },
  { q: 'Aristoteles\'in tiyatro üzerine yazdığı yapıtın adı nedir?', options: ['Retorik', 'Politika', 'Poetika', 'Nikhomakhos\'a Etik'], answer: 2, fact: 'Aristoteles\'in Poetika\'sı (MÖ 335), tragedyanın katharsis ve mimesis üzerine kurulu analizini sunar.' },
  { q: '"Katharsis" kavramı Aristoteles\'te ne anlama gelir?', options: ['Sahne süslemesi', 'İzleyicide arınma ve duygusal boşalım', 'Oyunun finali', 'Koro şarkısı'], answer: 1, fact: 'Aristoteles, tragedyanın korku ve acıma yoluyla izleyicinin duygularını arındırdığını savunur.' },
  { q: 'Antik Yunan\'da Dionysos festivallerinde kaç tragedya yarışırdı?', options: ['Bir', 'Üç', 'Beş', 'On'], answer: 1, fact: 'Her dramaturg üç tragedya ve bir satirik oyundan oluşan bir tetralojiyle yarışırdı.' },
  { q: '"Medeia" adlı eseri kim yazmıştır?', options: ['Sophokles', 'Aiskhylos', 'Euripides', 'Menandros'], answer: 2, fact: 'Euripides\'in Medeia\'sı (MÖ 431), kadın kahramanın psikolojik derinliğiyle dönemine göre oldukça sıradışıydı.' },
  { q: 'Antik Yunan komedyasının en önemli temsilcisi kimdir?', options: ['Menandros', 'Aristophanes', 'Plautus', 'Terentius'], answer: 1, fact: 'Aristophanes (MÖ 446–386), siyasi hiciv ustası olarak bilinir; Bulutlar, Kuşlar ve Barış başlıca yapıtlarıdır.' },
  { q: 'Antik Yunan tiyatrosunda oyuncular ne tür maskeler takardı?', options: ['Gerçekçi yüz maskeleri', 'Renkli bez maskeler', 'Abartılı ifadeli büyük maskeler', 'Altın maskeler'], answer: 2, fact: 'Büyük açık ağız maskesi hem ifadeyi abartmak hem de sesin açık hava tiyatrosuna yayılmasına yardım ederdi.' },
  { q: '"Oresteia" üçlemesinin yazarı kimdir?', options: ['Sophokles', 'Euripides', 'Aiskhylos', 'Pindaros'], answer: 2, fact: 'Oresteia (MÖ 458), Aiskhylos\'un günümüze ulaşan tek eksiksiz üçlemesidir: Agamemnon, Adak Sunucular, Eumenidler.' },

  // ROMA TİYATROSU
  { q: 'Ünlü Roma komedya yazarı Plautus hangi Yunan geleneğini uyarlamıştır?', options: ['Yeni Komedya', 'Tragedya', 'Satirik Drama', 'Koro şiiri'], answer: 0, fact: 'Plautus (MÖ 254–184), Yeni Yunan komedyasını genellikle daha kaba ve hızlı tempolu bir şekilde Latin\'e uyarladı.' },
  { q: 'Roma\'da en büyük amfiteatrın adı nedir?', options: ['Forum Romanum', 'Circus Maximus', 'Colosseum', 'Teatro di Marcello'], answer: 2, fact: 'Flavius Amfitiyatrosu olarak da bilinen Colosseum, MS 70–80 yılları arasında inşa edilmiş ve 50.000 seyirci alabiliyordu.' },
  { q: 'Roma tiyatrosunda "fabula palliata" ne demektir?', options: ['Toga giyilerek oynanan yerli Roma oyunu', 'Yunan oyunlarının Latin uyarlaması', 'Gladyatör gösterisi', 'Müzikli pantomim'], answer: 1, fact: '"Pallium" Yunan pelerinine verilen isimdir; fabula palliata bu pelerini giyen karakterlerin yer aldığı Yunan uyarlamalarıdır.' },
  { q: '"Seneca" Roma tiyatrosunda hangi türün ustasıdır?', options: ['Komedya', 'Tragedya', 'Pantomim', 'Atellana'], answer: 1, fact: 'Lucius Annaeus Seneca\'nın (MÖ 4 – MS 65) Medea, Thyestes ve Phaedra gibi Stoacı tragedyaları Rönesans dramasını derinden etkiledi.' },
  { q: 'Roma tiyatrosunda "scaena frons" nedir?', options: ['Koronun çıkış kapısı', 'Süslü mimari arka fon duvarı', 'Perde sistemi', 'Zemin altı tünel'], answer: 1, fact: 'Scaena frons, Roma sahnelerinin iki veya üç katlı anıtsal arka duvarıdır; Efes ve Orange tiyatroları iyi örnekler sunar.' },

  // ORTA ÇAĞ
  { q: 'Ortaçağ Avrupası\'nda kilise törenleri içinde gelişen ilk dramatik biçim hangisidir?', options: ['Ahlak oyunları', 'Mucizeleri (Miracle plays)', 'Quem Quaeritis trope', 'İnterlude'], answer: 2, fact: '"Quem Quaeritis" (Kimi arıyorsunuz?) 10. yüzyılda Paskalya ayinlerine eklenen kısa dramatik diyalogdur; modern tiyatronun filizleri burada başlar.' },
  { q: 'Ortaçağ\'da büyük şehirlerde lonca mensuplarının sergilediği İncil sahnelerine ne ad verilir?', options: ['Söyle oyunları (Morality plays)', 'Mucize oyunları (Mystery plays)', 'Yanlış anlama oyunları (Farce)', 'Söyleşi (Interlude)'], answer: 1, fact: 'Mystery plays (veya Corpus Christi cycles), York, Chester ve Wakefield gibi şehirlerde arabalar üzerinde gezici sahnelerle oynandı.' },
  { q: '"Everyman" hangi tür Ortaçağ oyununa örnektir?', options: ['Mystery play', 'Miracle play', 'Morality play', 'Farce'], answer: 2, fact: 'Morality plays\'de soyut değerler kişileştirilirdi: "Everyman"da İnsanlık ölümle yüzleşirken Tanrı\'nın huzuruna Kim eşlik edecek sorusunu işler.' },
  { q: 'Commedia dell\'arte hangi ülkede doğmuştur?', options: ['İspanya', 'Fransa', 'İtalya', 'İngiltere'], answer: 2, fact: 'Commedia dell\'arte, 16. yüzyılda İtalya\'da ortaya çıkmış; doğaçlama, maske ve tip karakterlere dayalı profesyonel tiyatro geleneğidir.' },
  { q: 'Commedia dell\'arte\'nin temel "zanni" (uşak) tiplerinden biri kimdir?', options: ['Pantalone', 'Arlecchino', 'Il Dottore', 'Colombina'], answer: 1, fact: 'Arlecchino (Harlequin), çok renkli yamalı kostümü ve çubuk sopasıyla Commedia\'nın en tanınan figürüdür.' },

  // SHAKESPEARE DÖNEMİ
  { q: 'Shakespeare kaç oyun yazmıştır (genel kabul)?', options: ['18', '27', '37', '44'], answer: 2, fact: 'Shakespeare\'e atfedilen 37 oyun ve 154 sonet, modern Anglo-Sakson dramatik kanonun temel taşını oluşturur.' },
  { q: 'Globe Theatre hangi yıl inşa edilmiştir?', options: ['1576', '1599', '1616', '1642'], answer: 1, fact: 'The Globe, 1599\'da Thames\'in güney kıyısına inşa edildi; 1613\'te sahnede kullanılan sahte top atışı yangına neden olup ahşap yapıyı yaktı.' },
  { q: '"Hamlet"te ünlü "olmak ya da olmamak" (To be, or not to be) soliloku hangi perdededir?', options: ['I. Perde, 1. sahne', 'II. Perde, 2. sahne', 'III. Perde, 1. sahne', 'IV. Perde, 3. sahne'], answer: 2, fact: 'Bu solilok (III, i), Shakespeare\'in tiyatro diline kazandırdığı en tanınan pasajdır.' },
  { q: 'Elizabethan dönem tiyatrolarında kadın rollerini kimler oynardı?', options: ['Yaşlı kadınlar', 'Erkek aktörler', 'Genç erkek aktörler', 'Eğitimli hanımlar'], answer: 2, fact: '1661\'e dek İngiliz sahnelerinde kadınlar oynamadı; kadın rolleri genç erkekler (apprentice) tarafından canlandırıldı.' },
  { q: '"Lear Kralı"nda Lear\'ın kaç kızı vardır?', options: ['İki', 'Üç', 'Dört', 'Bir'], answer: 1, fact: 'Goneril, Regan ve Cordelia — Lear\'ın üç kızı, sadakati ve gücü üzerine kurulu bu tragedyanın merkezi çatışmasını oluşturur.' },
  { q: 'Shakespeare\'in yazarlığına uzun süre itiraz eden teorisyenler kimin yazmış olabileceğini öne sürmüştür?', options: ['Marlowe, Bacon ya da Oxford Kontu', 'Ben Jonson ya da Thomas Kyd', 'John Donne ya da Middleton', 'Webster ya da Ford'], answer: 0, fact: '"Shakespeare Yazarlık Sorunu" akademisyenlerin büyük çoğunluğu tarafından reddedilmektedir; Shakespeare\'in bizzat yazdığına dair kanıtlar güçlüdür.' },
  { q: 'Marlowe\'un Dr. Faustus\'ta işlediği ana tema hangisidir?', options: ['Siyasi hırs', 'Şeytanla anlaşma ve bilgi hırsı', 'Romantik aşk', 'Askeri zafer'], answer: 1, fact: 'Christopher Marlowe\'un Dr. Faustus\'u (1592), sonsuz bilgiyi elde etmek için ruhunu şeytana satan bir bilgenin hikâyesidir.' },
  { q: 'Shakespeare\'in en çok oynanan komedyalarından "Bir Yaz Gecesi Rüyası"nda aşıklar nereye kaçar?', options: ['Bir şatoya', 'Bir ormana', 'Denize', 'Tapınağa'], answer: 1, fact: 'Orman, Bir Yaz Gecesi Rüyası\'nda rüya, büyü ve kimlik karışıklığının yaşandığı karşı-dünya (counter-world) olarak işlev görür.' },
  { q: 'Rönesans döneminde İspanya\'nın en büyük dramatistlerinden biri kimdir?', options: ['Cervantes', 'Lope de Vega', 'Quevedo', 'Gracián'], answer: 1, fact: 'Lope de Vega (1562–1635), tahminen 1.800 oyun yazmış olup bunların 400\'ü günümüze ulaşmıştır.' },

  // 17-18. YÜZYIL
  { q: 'Molière\'nin gerçek adı nedir?', options: ['Jean-Baptiste Poquelin', 'Pierre Corneille', 'Jean Racine', 'Nicolas Boileau'], answer: 0, fact: 'Molière (1622–1673), Fransız klasisizminin komedya ustasıdır; Tartuffe, Kibir Budalası ve Cimri başlıca yapıtlarıdır.' },
  { q: '"Tartuffe" hangi sosyal kurumu hicveder?', options: ['Ordu', 'Burjuvazi', 'Dini ikiyüzlülük', 'Aristocrasi'], answer: 2, fact: 'Tartuffe (1664) ilk sahnelenmesinden itibaren kilise tarafından sansürlendi; dini gösteriş ve ikiyüzlülüğü eleştirir.' },
  { q: 'Fransız klasisizminde "üç birlik kuralı" neyi ifade eder?', options: ['Karakter, diyalog ve aksiyonun birliği', 'Mekân, zaman ve eylem birliği', 'Perde, sahne ve koro birliği', 'Trajik, komik ve epik birliği'], answer: 1, fact: 'Aristoteles\'ten türetilen bu kurallar, 17. yüzyıl Fransız tiyatrosunda dogmaya dönüştü: tek mekân, 24 saat ve tek olay örgüsü.' },
  { q: 'İngiltere\'de Püriten hükümet tiyatroları kaç yıl kapattı?', options: ['5 yıl', '18 yıl', '36 yıl', '50 yıl'], answer: 1, fact: '1642–1660 yılları arasında Püriten Parlamentosu tiyatroları kapattı. Restorasyon dönemiyle birlikte sahneler yeniden açıldı.' },
  { q: 'Fransız sahnelerinde ilk profesyonel kadın aktörlerin göründüğü dönem hangisidir?', options: ['1610\'lar', '1640\'lar', '1680\'ler', '1720\'ler'], answer: 1, fact: 'Paris\'teki İtalyan kumpanyası 1640\'larda profesyonel kadın oyuncuları sahneye çıkardı; Fransız grupları kısa süre sonra bunu benimsedi.' },
  { q: '"İçkin etkinin gücü" kavramını sahneye taşıyan 18. yüzyıl İngiliz aktörü kimdir?', options: ['David Garrick', 'Thomas Betterton', 'Colley Cibber', 'Richard Burbage'], answer: 0, fact: 'David Garrick (1717–1779) abartılı deklarasyonun yerini doğal ve içsel bir oyunculuk anlayışıyla değiştirerek Modern İngiliz sahnesini şekillendirdi.' },
  { q: 'Kabuki tiyatrosu hangi ülkede gelişmiştir?', options: ['Çin', 'Kore', 'Japonya', 'Tayland'], answer: 2, fact: 'Kabuki, 17. yüzyıl başı Japonya\'sında sahne savaş sanatları, dans ve drama birleştiren anlatı biçimiyle ortaya çıktı.' },
  { q: 'Noh tiyatrosu nasıl bir yapıya sahiptir?', options: ['Hızlı diyalog ve akrobasi', 'Yavaş, stilize hareket ve maske geleneği', 'Gerçekçi oyunculuk ve dekor', 'Kalabalık koro ve dans'], answer: 1, fact: 'Noh, 14. yüzyılda Zeami Motokiyo tarafından teorize edilmiş; yüksek stilize hareket, maskeler ve çoğunlukla doğaüstü temalar içerir.' },
  { q: 'Pekin Operası\'nın teknik adı nedir?', options: ['Jingju', 'Kunqu', 'Huangmei', 'Cantonese Opera'], answer: 0, fact: 'Jingju (Pekin Operası) 18. yüzyılda ortaya çıkmış; şarkı, akrobasi, konuşma ve dans dört temel unsurunu oluşturur.' },

  // 19. YÜZYIL / NATÜRALİZM
  { q: '"Modern tiyatronun babası" olarak anılan Norveçli yazar kimdir?', options: ['August Strindberg', 'Henrik Ibsen', 'Bjørnstjerne Bjørnson', 'Holberg'], answer: 1, fact: 'Henrik Ibsen (1828–1906), Nora (Bebek Evi), Hedda Gabler ve Hayaletler gibi yapıtlarıyla sosyal gerçekçi tiyatronun kurucu ismidir.' },
  { q: '"Bebek Evi" (Et Dukkehjem)\'nin baş karakteri kimdir?', options: ['Hedda', 'Nora', 'Rebekka', 'Aase'], answer: 1, fact: 'Nora\'nın finalde kapıyı çarparak evi terk etmesi, 19. yüzyıl sonu Avrupa tiyatrosunda dev bir skandal ve tartışma yarattı.' },
  { q: 'August Strindberg\'in "Baba" adlı oyunu hangi akımla ilişkilidir?', options: ['Natüralizm', 'Sembolizm', 'Ekspresyonizm', 'Sürrealizm'], answer: 0, fact: 'Strindberg\'in ilk dönem yapıtları (1887–1888) Zola\'nın natüralist manifesto anlayışını sahneye taşır.' },
  { q: 'Emile Zola, tiyatroda natüralizmi savunduğu manifestosunu ne zaman yayımladı?', options: ['1860', '1873', '1881', '1895'], answer: 2, fact: 'Zola\'nın "Le Naturalisme au théâtre" (1881) manifestosu, sahneye bilimsel gözlem ve toplumsal gerçekçilik talep etti.' },
  { q: '"Kiraz Bahçesi" kimdir?', options: ['Lev Tolstoy', 'Anton Çehov', 'Maksim Gorki', 'İvan Turgenyev'], answer: 1, fact: 'Kiraz Bahçesi (1904), Çehov\'un son oyunudur. Sahiplerinin taşınamadığı evi temsil eden bahçe, yıkılan aristokrasinin sembolüdür.' },
  { q: 'Stanislavski\'nin kurucusu olduğu tiyatro hangisidir?', options: ['Bolşoy Tiyatrosu', 'Moskova Sanat Tiyatrosu', 'Maly Tiyatrosu', 'Taganka Tiyatrosu'], answer: 1, fact: 'Moskova Sanat Tiyatrosu (MAT), 1898\'de Konstantin Stanislavski ve Vladimir Nemirovich-Danchenko tarafından kurulmuştur.' },
  { q: 'Stanislavski sistemi oyunculardan ne ister?', options: ['Abartılı beden dili ve güçlü ses', 'Karakterin iç dünyasına ve geçmişine derin odak', 'Minimal fiziksel ifade', 'Seyirciye doğrudan hitap'], answer: 1, fact: 'Stanislavski sistemi; duygusal bellek, "eğer böyle olsaydım", super-amaç ve sahne eylemleri gibi araçlarla içten gelen doğal oyunculuğu hedefler.' },
  { q: 'André Antoine\'in 1887\'de Paris\'te kurduğu tiyatronun adı nedir?', options: ['Odéon', 'Comédie-Française', 'Théâtre Libre', 'Théâtre du Soleil'], answer: 2, fact: 'Théâtre Libre (Özgür Tiyatro), dördüncü duvarı yıkmaması için oyuncularını eğitmiş ve sahneyi bilimsel gerçekçiliğe yöneltmiştir.' },
  { q: 'Melodramı popüler kılan 19. yüzyıl geleneğinde temel çatışma nedir?', options: ['Sınıf ve devrim', 'Erdem ve şeytanlık yalın karşıtlığı', 'Kadın-erkek eşitsizliği', 'İmparatorluk ve koloni'], answer: 1, fact: 'Melodramda karakterler net iyi/kötü kutuplarına ayrılır; suç ve erdem temaları duygusal müzikle birleştirilir.' },

  // STANİSLAVSKİ / RUS TİYATROSU
  { q: 'Stanislavski sistemi İngilizce\'ye hangi çevirmenin kitabıyla yayıldı?', options: ['Richard Boleslavsky', 'Elizabeth Hapgood', 'Lee Strasberg', 'Stella Adler'], answer: 1, fact: 'Elizabeth Hapgood\'un çevirileri "An Actor Prepares" (1936) ve "Building a Character"ı Amerikan tiyatrosuna kazandırdı.' },
  { q: 'Lee Strasberg\'in geliştirdiği Stanislavski yorumunun adı nedir?', options: ['Biyomekanik', 'Yöntem Oyunculuğu (The Method)', 'Fiziksel Eylemler Yöntemi', 'Epik Tiyatro'], answer: 1, fact: 'Strasberg\'in The Method\'u duygusal belleği merkezine alır; Marlon Brando, James Dean ve Al Pacino bu geleneğin ürünleridir.' },
  { q: 'Vsevolod Meyerhold\'un sahne yaklaşımının adı nedir?', options: ['Biyomekanik', 'Fiziksel Eylem', 'Metot Oyunculuğu', 'Happenings'], answer: 0, fact: 'Meyerhold\'un biyomekaniği (1920\'ler), oyuncunun bedenini verimli bir makineye dönüştürmeyi hedefler; duygular eylemden türer.' },
  { q: 'Growtowski\'nin "yoksul tiyatro" konsepti ne anlama gelir?', options: ['Ekonomik kısıtlamalarla üretim', 'Dekor, kostüm ve ışığı minuma indirip oyuncu-izleyici ilişkisini temele koymak', 'Yoksullar için üretilen tiyatro', 'Minimal diyalog kullanan tiyatro'], answer: 1, fact: 'Jerzy Grotowski (1933–1999), "tiyatro sahneyi değil, aktör-seyirci ilişkisini gerektirir" diyerek "yoksul tiyatro"yu tanımladı.' },

  // BRECHT / EPİK TİYATRO
  { q: 'Bertolt Brecht\'in tiyatro teorisinin adı nedir?', options: ['Epik Tiyatro', 'Epik Drama', 'Dramaturjik Yöntem', 'Diyalektik Sahne'], answer: 0, fact: 'Epik Tiyatro, Aristoteles\'in duygusal özdeşleşme anlayışına karşı eleştirel düşünce ve yabancılaştırma etkisini (Verfremdungseffekt) öne çıkarır.' },
  { q: 'Brecht\'te "Verfremdungseffekt" ne anlama gelir?', options: ['Derin duygusal özdeşleşme', 'Eleştirel mesafe ve yabancılaştırma etkisi', 'Sahneye gerçeklik katma', 'Kostümün tarihi doğruluğu'], answer: 1, fact: 'V-Efekt, izleyicinin "bu gerçek" yanılsamasını kırarak sahnedekileri eleştirel gözle değerlendirmesini sağlar.' },
  { q: '"Cesaret Ana ve Çocukları" hangi savaşı merkeze alır?', options: ['I. Dünya Savaşı', 'Otuz Yıl Savaşları', 'İspanya İç Savaşı', 'II. Dünya Savaşı'], answer: 1, fact: 'Brecht\'in Cesaret Ana\'sı (1939), 17. yüzyıl Otuz Yıl Savaşları\'nı kapitalizm ve savaş eleştirisi için araç olarak kullanır.' },
  { q: 'Brecht\'in kurduğu Berlin tiyatrosunun adı nedir?', options: ['Deutsches Theater', 'Berliner Ensemble', 'Volkstheater', 'Schaubühne'], answer: 1, fact: 'Berliner Ensemble, Brecht tarafından 1949\'da Doğu Berlin\'de kurulmuştur; bugün hâlâ varlığını sürdürmektedir.' },
  { q: 'Erwin Piscator hangi kavramı sahne tasarımına kazandırmıştır?', options: ['Biyomekanik', 'Politik tiyatro ve film projeksiyonu', 'Çevre tiyatrosu', 'Meditasyon sahnesi'], answer: 1, fact: 'Piscator, 1920\'lerde siyasi konuları işlemek için film projeksiyonu, hareketli platform ve yıkılabilir set kullandı.' },

  // ABSÜRDİST TİYATRO
  { q: '"Godot\'yu Beklerken"in yazarı kimdir?', options: ['Eugène Ionesco', 'Samuel Beckett', 'Jean Genet', 'Harold Pinter'], answer: 1, fact: 'Samuel Beckett\'in Godot\'yu Beklerken\'i (1953, Fransızca), absürdist tiyatronun simgesi olup varoluşsal bekleme ve anlam arayışını işler.' },
  { q: '"Saçma (Absürd) Tiyatro" terimini kim kavramsallaştırdı?', options: ['Martin Esslin', 'Albert Camus', 'Jean-Paul Sartre', 'Simone de Beauvoir'], answer: 0, fact: 'Martin Esslin\'in "The Theatre of the Absurd" (1961) adlı kitabı Beckett, Ionesco, Genet ve Pinter\'ı tek çatı altında tanımladı.' },
  { q: 'Ionesco\'nun "Kel Şarkıcı"sının en belirgin özelliği nedir?', options: ['Melodramatik duygusal patlama', 'Mantıksal tutarsızlık ve dilin anlamsızlaşması', 'Doğa sahneleri ve şiirsel dil', 'Gerçekçi karakter psikolojisi'], answer: 1, fact: 'La Cantatrice chauve (1950), dilin iletişim işlevini kaybetmesini absürd sahne durumlarıyla gösterir; hiçbir zaman kel bir şarkıcı çıkmaz.' },
  { q: '"Balkon" adlı oyunun yazarı kimdir?', options: ['Beckett', 'Arrabal', 'Jean Genet', 'Adamov'], answer: 2, fact: 'Jean Genet\'nin Le Balcon\'u (1956), bir genelev ortamında iktidar, fantezi ve temsil ilişkilerini iç içe geçirir.' },
  { q: 'Harold Pinter\'ın dramatik diline özgü sessizlikler ne anlama gelir?', options: ['Metin yazarının hatası', 'Güç ilişkilerini ve söylenmeyeni barındıran dramatik gerilim', 'Müzik arası', 'Yönetmen yorumu'], answer: 1, fact: '"Pinter pause", tehdit ve belirsizlikle dolu sözaltı gerilimininin fiziksel ifadesidir — karakterler söylemek istediklerini çoğunlukla söylemez.' },

  // ARTAUD / PERFORMANS
  { q: 'Antonin Artaud\'nun tiyatro manifestosunun adı nedir?', options: ['Epik Tiyatro', 'Yoksul Tiyatro', 'Vahşet Tiyatrosu', 'Happenings'], answer: 2, fact: '"Le Théâtre et son Double" (1938)\'de Artaud, seyirciyi sarıp sarmalayan, sözcükleri değil enerjiyi ön plana çıkaran bir tiyatro manifestosu yayımladı.' },
  { q: 'Artaud\'nun "çift" (double) kavramıyla kastettiği nedir?', options: ['İki aktörün sahne paylaşımı', 'Tiyatronun veba gibi toplumu sarsan ikinci gerçekliği', 'Çift perdeli yapı', 'Metinle oyununun ikiliği'], answer: 1, fact: 'Artaud için tiyatronun "çifti" (double) gündelik gerçekliğin altındaki karanlık, bilinçdışı ve ruhsal düzeydir.' },
  { q: '1960\'larda ABD\'de ortaya çıkan "Happenings" akımının öncüsü kimdir?', options: ['Alan Kaprow', 'Richard Schechner', 'Julian Beck', 'Peter Brook'], answer: 0, fact: 'Allan Kaprow, 1950\'lerin sonunda tiyatro-performans sınırını yıkan, müze ve galeri mekânlarında gerçekleşen "18 Happenings in 6 Parts" (1959) ile öncülük etti.' },
  { q: 'Peter Brook\'un "boş mekan" (empty space) teorisi ne anlama gelir?', options: ['Seyircisiz sahne', 'Sahneleme için yeterli koşulun bir adam ile bir boş yer olması', 'Minimal dekor tercihi', 'Aydınlatılmamış sahne'], answer: 1, fact: 'Brook\'un "The Empty Space" (1968) şöyle açar: "Bir adam boş bir mekânı geçiyor, bir diğeri onu izliyor — tiyatro bu kadar basittir."' },

  // ÇAĞDAŞ / POSTMODERN
  { q: 'August Wilson\'un "Pittsburgh Döngüsü" olarak bilinen eser serisinde kaç oyun yer alır?', options: ['5', '8', '10', '12'], answer: 2, fact: 'August Wilson, 20. yüzyılın her on yılını bir oyunla ele aldığı 10 oyunluk "Century Cycle"ı 2005\'e dek tamamladı.' },
  { q: 'Suzan-Lori Parks\'ın tiyatro anlayışı hangi kavramla öne çıkar?', options: ['Siyah tarih deneyimi ve dil inovasyonu', 'Sembolist çerçeve', 'Kadın bedeni ve dans', 'Absürd komedi'], answer: 0, fact: 'Parks, Afrika-Amerikan tarihinin dışlandığı yerleri dil deneyleri ve tarihsel yeniden yazımla sahneye taşır.' },
  { q: '"Tiyatro antropolojisi" kavramını geliştiren araştırmacı kimdir?', options: ['Eugenio Barba', 'Richard Schechner', 'Anne Bogart', 'Tadashi Suzuki'], answer: 0, fact: 'Eugenio Barba ve Nordisk Teaterlaboratorium (Odin Teatret), çeşitli kültürlerin sahne geleneklerindeki ortak beden pratiğini "tiyatro antropolojisi" çerçevesinde inceler.' },
  { q: 'Bertolt Brecht\'ten sonra "post-dramatik tiyatro" kavramını kim teorize etti?', options: ['Hans-Thies Lehmann', 'Heiner Müller', 'Peter Handke', 'René Pollesch'], answer: 0, fact: 'Hans-Thies Lehmann\'ın "Postdramatic Theatre" (1999) adlı kitabı; sahnenin dramatik anlatı yerine duyusal, aleatorik ve çok katmanlı deneyimi öne çıkardığı yeni biçimleri tanımladı.' },

  // TÜRK TİYATROSU
  { q: 'Osmanlı\'da geleneksel halk tiyatrosunun en önemli iki biçimi hangisidir?', options: ['Ortaoyunu ve Meddah', 'Karagöz ve Hacivat', 'Hem Karagöz-Hacivat hem de Ortaoyunu ve Meddah', 'Köy seyirlik oyunları ve Meddah'], answer: 2, fact: 'Karagöz (gölge tiyatrosu), Ortaoyunu (açık meydanda canlandırma), Meddah (sözlü anlatı) ve köy seyirlik oyunları Osmanlı-Türk halk sahnesinin dört temel geleneğidir.' },
  { q: 'Türkiye\'de modern Batı tarzı tiyatronun kurulmasında öncü olan ve "Türk tiyatrosunun babası" sayılan isim kimdir?', options: ['Namık Kemal', 'Güllü Agop', 'Muhsin Ertuğrul', 'Şinasi'], answer: 2, fact: 'Muhsin Ertuğrul (1892–1979), Türkiye\'de çağdaş sahne sanatının kurucu ismidir; Şehir ve Devlet Tiyatroları\'nı kurumsal zemine oturttu.' },
  { q: 'Güllü Agop\'un 1868\'de kurduğu tiyatro hangisidir?', options: ['İstanbul Şehir Tiyatroları', 'Osmanlı Dram Kumpanyası', 'Bursa Devlet Tiyatrosu', 'Darülbedayi'], answer: 1, fact: 'Güllü Agop Fasulyeciyan\'ın Osmanlı Dram Kumpanyası, Osmanlı döneminde Türkçe tiyatronun kurumsallaşmasında kritik rol oynadı.' },
  { q: '"Darülbedayi" hangi yıl kurulmuştur?', options: ['1885', '1914', '1923', '1934'], answer: 1, fact: 'İstanbul Şehir Tiyatroları\'nın çekirdeği olan Darülbedayi, 1914\'te André Antoine\'in öğrencisi Réjane Güllü Agop\'un desteğiyle kuruldu.' },
  { q: 'Devlet Tiyatroları Türkiye\'de hangi yılda kurulmuştur?', options: ['1940', '1949', '1956', '1960'], answer: 1, fact: 'Devlet Tiyatroları 1949\'da kurumsallaşarak Ankara merkezli yapısını kurdu; Muhsin Ertuğrul\'un öncülüğünde Türk sahne sanatı ülke genelinde örgütlendi.' },
  { q: 'Haldun Taner\'in "Keşanlı Ali Destanı" hangi türde öne çıkmaktadır?', options: ['Natüralist dram', 'Epik geekonu tiyatrosu', 'Absürd oyun', 'Müzikal'], answer: 1, fact: 'Haldun Taner\'in Keşanlı Ali Destanı (1964), Brechtçi epik tiyatroyu gecekondu gerçekliğiyle birleştiren Türk dramaturjisinin kilometre taşlarından biridir.' },
  { q: 'Türk tiyatrosunda "şehir efsaneleri" ve mitolojik unsurları sahneye taşımasıyla tanınan tiyatro topluluğu hangisidir?', options: ['Kenter Tiyatrosu', 'BKM', 'Dostlar Tiyatrosu', 'Tiyatro İstanbul'], answer: 2, fact: 'Genco Erkal\'ın kurucusu olduğu Dostlar Tiyatrosu, 1969\'dan bu yana siyasi ve mitolojik metinleri sahnelemesi ile öne çıkar.' },
  { q: 'Türk tiyatrosunda "sivil tiyatro" hareketinin güçlendiği on yıl hangisidir?', options: ['1950\'ler', '1970\'ler', '1990\'lar', '2010\'lar'], answer: 2, fact: '1990\'lardan itibaren Kenter, BKM ve pek çok bağımsız sahne yapısıyla özel tiyatro sektörü büyüdü; İstanbul bağımsız tiyatro sahnelerinin merkezi haline geldi.' },
  { q: 'Türkiye\'de müzikaller sektörünün canlandığı dönem hangisidir?', options: ['1980\'ler', '1990\'lar', '2000\'ler', '2010\'lar'], answer: 3, fact: '2010\'ların başından itibaren yabancı lisanslı müzikaller (Chicago, Mamma Mia, Phantoma of Opera) ve Türk özgün prodüksiyonların sayısı hızla arttı.' },
  { q: 'Türkiye\'de "bağımsız tiyatro" için en canlı şehirler hangisidir?', options: ['Ankara ve İzmir', 'İstanbul ve Ankara', 'İstanbul ve İzmir', 'İstanbul, Ankara ve İzmir'], answer: 3, fact: 'Her üç şehirde de aktif bağımsız tiyatro ekosistemi var; ancak sayı ve çeşitlilik açısından İstanbul açık arayla öndedir.' },
  { q: 'Karagöz ve Hacivat\'ın kökeni hangi bölgeyle ilişkilendirilir?', options: ['Edirne', 'Bursa', 'Konya', 'İstanbul'], answer: 1, fact: 'Gölge tiyatrosunun İki ikonik karakteri Karagöz ve Hacivat\'ın, Bursa\'da aynı cami inşaatında çalışmış tarihi kişilerden ilham aldığı söylenir.' },
  { q: 'Bir tiyatro sahnesi üzerinde "proskyenion" ne anlama gelir?', options: ['Arka sahne deposu', 'Antik Yunan sahnesinin ön bölümü', 'Kostüm odası', 'Mevsimlik kapak'], answer: 1, fact: 'Proskeniyon (proskenion), Helenistik dönemde koronun önüne uzayan yükseltilmiş oyun platformudur; modern "proscenium arch" buradan gelir.' },

  // TEKNİK VE KAVRAMSAL
  { q: '"Çevre tiyatrosu" (environmental theatre) kavramını kim geliştirdi?', options: ['Peter Brook', 'Richard Schechner', 'Jerzy Grotowski', 'Robert Wilson'], answer: 1, fact: 'Richard Schechner ve Performance Group, 1967\'de seyircinin sahne içinde serbest dolaşabildiği çevre tiyatrosunu Garage Tiyatrosu\'nda hayata geçirdi.' },
  { q: '"Thrust stage" (üç tarafı seyirciye açık sahne) neyi ifade eder?', options: ['Tamamen çevrelenmiş sahne', 'Arkası duvar, üç yanı seyirciye açık sahne', 'Arkası kurtaydınlatılmış sahne', 'İki tarafı açık arena sahnesi'], answer: 1, fact: 'Elizabethan dönemi sahneleri bu yapıya sahipti; Shakespearian reprodüksiyonların çoğu bu sahne biçimini tercih eder.' },
  { q: 'Dramaturginin temel işlevi nedir?', options: ['Sahne dekorunu tasarlamak', 'Metnin dramatik ve tarihsel bağlamını analiz etmek ve yapımı desteklemek', 'Yönetmenin yerine reji yapmak', 'Oyuncuların fiziksel antrenmanını yönetmek'], answer: 1, fact: 'Dramaturg, tarihsel araştırma, metin analizi, seyirciyle iletişim ve yazarla diyalog gibi işlevlerle yapımın düşünsel sütununu oluşturur.' },
  { q: '"Tableux vivants" ne demektir?', options: ['Dans sahne öğesi', 'Canlı tablo — oyuncuların hareketsiz pose verdiği sahneler', 'Perde arası gösteri', 'Işık deneyi'], answer: 1, fact: 'Tableux vivants (canlı tablolar), 18-19. yüzyılda tanınmış resim ya da heykel kompozisyonlarını oyuncuların hareketsiz biçimde beden simgeyle canlandırdığı bir gösteri biçimiydi.' },
  { q: 'Tiyatroda "blocking" (oyun yönetimi/blokaj) ne anlama gelir?', options: ['Bilet engellemesi', 'Yönetmenin sahne hareketlerini tasarlaması', 'Perde öncesi hazırlık', 'Ses mühendisi tasarımı'], answer: 1, fact: 'Blokaj, yönetmenin oyuncuların sahnedeki konumlarını, hareketlerini ve birbirleriyle ilişkilerini prova sürecinde belirleme pratiğidir.' },
  { q: '"Site-specific theatre" ne anlama gelir?', options: ['Özel bir sahne için yazılmış oyun', 'Belirli bir mekânla anlam ilişkisi kuran tiyatro', 'Devlet sübvansiyonlu tiyatro', 'Online tiyatro'], answer: 1, fact: 'Site-specific yapımlar tiyatro binası dışında gerçekleşir: fabrikalar, terk edilmiş binalar, dere yatakları ya da sokaklar sahneye dönüşür.' },
  { q: '"Devising theatre" (toplu yaratıcılık süreci) ne demektir?', options: ['Bir yazarın metnini sahnelemek', 'Grup halinde sıfırdan performans üretmek', 'Yabancı dil oyununu uyarlamak', 'Film senaryosunu sahneye taşımak'], answer: 1, fact: 'Devising, tek bir yazar ya da metin olmaksızın oyuncu topluluğunun doğaçlama, araştırma ve prova süreciyle performans ürettiği çağdaş bir yaratım yöntemidir.' },
  { q: 'Koreograf Jerome Robbins hangi ünlü müzikaL\'in sahne koreografisini yapmıştır?', options: ['West Side Story', 'Chicago', 'A Chorus Line', 'Cats'], answer: 0, fact: 'Jerome Robbins, West Side Story\'nin (1957) hem koreograflığını hem de yönetmenliğini üstlenmiş; eserin efsane statüsüne giden yolun en önemli mimarlarından biridir.' },
  { q: '"Method acting" ile "Meisner tekniği" arasındaki temel fark nedir?', options: ['Biri ses diğeri beden odaklı', 'Method duygusal bellekle, Meisner anlık karşılıklı tepkiyle çalışır', 'İkisi aynı şeydir', 'Biri Brecht diğeri Stanislavski geleneğine aittir'], answer: 1, fact: 'Sanford Meisner, "yaşanmış hayatın gerçeği" diyerek öğrencilerini sahne ortağına odaklanmaya yöneltti; geçmiş duygular değil, anlık uyarı esastır.' },

  // EKSTRA / ÇAĞDAŞ
  { q: 'August Boal\'ın "Ezilenlerin Tiyatrosu"nda "forum tiyatrosu" ne yapar?', options: ['Tiyatroyu devlet desteğiyle üretir', 'Seyircilerin sahnedeki ezilen karakterin yerine geçip alternatif çözümler denemesine olanak tanır', 'Çocuklara yönelik eğitici drama üretir', 'Tarihsel belgelere dayalı sahne araştırması yapar'], answer: 1, fact: 'Boal\'ın Forum Tiyatrosu\'nda "joker" adlı kolaylaştırıcı, seyirciyi sahnedeki ezilmeye müdahale etmeye davet eder — izleyici "spect-actor"a dönüşür.' },
  { q: 'Robert Wilson\'un estetik anlayışının merkezinde ne yer alır?', options: ['Hızlı diyalog ve yoğun aksiyon', 'Yavaş, görsel şiirsellik ve zaman deneyimi', 'Doğaçlama ve seyirci katılımı', 'Yoksul tiyatro ve soyutluk'], answer: 1, fact: 'Robert Wilson\'un sahneleri, saniyeler içinde değil saatler içinde açılan görsel tablolar gibidir; zamanın yavaşlatılması sahnenin kendisi haline gelir.' },
  { q: 'Tadeusz Kantor\'un "ölü sınıf" performansında asıl öne çıkan unsur nedir?', options: ['Gerçekçi kostümler', 'Manken ve ölü figürleriyle yaşayanların iç içe geçmesi', 'Büyük kalabalık sahneler', 'Dijital video projeksiyonu'], answer: 1, fact: 'Kantor\'un Umarłej Klasy (1975), sahne varlığının sınırını sorgular; oyuncular çocukluk mannekenleriyle yaşlı bedenler arasında gidip gelir.' },
  { q: 'Anne Bogart\'ın sahne metodu olan "Viewpoints" hangi kategorilerden oluşur?', options: ['Diyalog, kostüm, ışık, ses', 'Zaman (tempo, süre) ve mekân (jestür, şekil, mimari) boyutları', 'Karakter, çatışma ve çözüm', 'Renk, müzik ve hareket'], answer: 1, fact: 'Viewpoints (Mary Overlie\'den geliştirilen), oyuncuların zaman ve mekân içindeki varoluşsal seçimlere odaklandığı somatik-estetik bir egzersiz sistemidir.' },
  { q: 'Tim Etchells ve Forced Entertainment\'ın öne sürdüğü tiyatro biçimi nasıl tanımlanır?', options: ['Natüralist psikoloji çalışması', 'Bağlamsal oyun, ironik mesafe ve popüler kültür', 'Klasik metin yeniden sahnelemeleri', 'Bale ve sahne sanatlarının sentezi'], answer: 1, fact: 'Forced Entertainment, şiddet, kitlesel eğlence ve tüketim kültürünü sahneye ironik bir mesafeyle yerleştiren postmodern tiyatronun en etkili gruplarından biridir.' },
]

/* ─────────────────────────────────────────────────────────────────────────
   PROGRAM TAVSİYE MATRİSİ
───────────────────────────────────────────────────────────────────────── */
type ProgramRec = {
  slug: string
  title: string
  sub: string
  duration: string
  tip: string
}

function recommend(interest: string, exp: string, duration: string): ProgramRec[] {
  const recs: ProgramRec[] = []
  const long = duration === 'uzun'

  if (interest === 'ingilizce') {
    if (long) {
      recs.push({ slug: 'english-drama-final-performance', title: 'EDL Final Performance', sub: 'İngilizce Prodüksiyon', duration: '8 ay (Ekim–Mayıs)', tip: "Mayıs'ta gerçek seyirci karşısında final performansı." })
    } else if (exp === 'var') {
      recs.push({ slug: 'english-drama-acting-focus', title: 'EDL Acting Focus', sub: 'İngilizce Oyunculuk', duration: '12 hafta', tip: 'Dili bilenler için metin ve sahne odaklı çalışma.' })
    } else {
      recs.push({ slug: 'english-drama-lab', title: 'English Drama Lab', sub: 'Yaratıcı Drama', duration: '12 hafta', tip: 'Doğaçlama temelli; başlangıç için ideal.' })
    }
  }
  if (interest === 'dans') {
    recs.push({ slug: 'broadway-musical-dance', title: 'Broadway Musical Dance', sub: 'Sahne Koreografisi', duration: '12 hafta', tip: 'Jazz ve theatre dance — deneyim şart değil.' })
  }
  if (interest === 'muzikalsini') {
    recs.push({ slug: 'techne-musical-lab', title: 'Techne Musical Lab', sub: 'Drama + Şan + Dans', duration: '8 ay (Ekim–Mayıs)', tip: 'Üç disiplin tek programda; seyircili bitirme performansıyla.' })
  }
  if (interest === 'kamera') {
    recs.push({ slug: 'camera-praxis', title: 'Camera Praxis', sub: 'Kamera Önü & Audition', duration: '4 hafta', tip: 'Şu an satışa kapalı — yeni dönem duyurusu için bize yaz.' })
  }
  if (interest === 'oyunculuk') {
    if (long) {
      recs.push({ slug: 'techne-musical-lab', title: 'Techne Musical Lab', sub: 'Drama Temelli Uzun Dönem', duration: '8 ay (Ekim–Mayıs)', tip: 'Oyunculuk temeli üzerine sahne bütünlüğü — uzun soluklu.' })
    }
    recs.push({ slug: 'auteur-lab', title: 'The Auteur Lab', sub: 'Oyunculuk & Dramaturji', duration: '8 hafta', tip: exp === 'var' ? '"Düşünen oyuncu" — metin çözümleme + sahne pratiği.' : 'Yoğun ama başlangıca açık; metin ve sahne bir arada.' })
  }
  if (interest === 'yazarlik') {
    recs.push({ slug: 'auteur-lab', title: 'The Auteur Lab', sub: 'Yazarlık & Dramaturji', duration: '8 hafta', tip: 'Oyun kurma, metin çözümleme ve sahne pratiği tek çatıda.' })
  }

  if (recs.length === 0) {
    recs.push(
      { slug: 'auteur-lab', title: 'The Auteur Lab', sub: 'Oyunculuk & Yazarlık', duration: '8 hafta', tip: 'Başlangıç için sağlam bir zemin.' },
      { slug: 'english-drama-lab', title: 'English Drama Lab', sub: 'Yaratıcı Drama', duration: '12 hafta', tip: 'Dil ve sahne birleşimi.' }
    )
  }
  return recs.slice(0, 2)
}

/* ─────────────────────────────────────────────────────────────────────────
   TİP TANIMLAMALARI
───────────────────────────────────────────────────────────────────────── */
type Msg = { from: 'bot' | 'user'; text: string; options?: { label: string; value: string }[] }
type Step = 'idle' | 'menu' | 'quiz' | 'guide-exp' | 'guide-interest' | 'guide-duration' | 'guide-result'

const SHUFFLE_SIZE = 10 // Her quiz turunda kaç soru çekilsin

/* ─────────────────────────────────────────────────────────────────────────
   ANA COMPONENT
───────────────────────────────────────────────────────────────────────── */
export function TiyatroBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [step, setStep] = useState<Step>('idle')
  const [quizPool, setQuizPool] = useState<typeof QUIZ>([])
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [guideExp, setGuideExp] = useState('')
  const [guideInterest, setGuideInterest] = useState('')
  const [pulsing, setPulsing] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const addMsg = useCallback((msg: Msg) => {
    setMsgs(prev => [...prev, msg])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  // Pulse butonu 5 saniyede bir
  useEffect(() => {
    const timer = setInterval(() => setPulsing(p => !p), 5000)
    return () => clearInterval(timer)
  }, [])

  function startBot() {
    if (msgs.length === 0) {
      setMsgs([{
        from: 'bot',
        text: 'Merhaba! Ben Techne Lab\'ın sahne asistanıyım. Sana ne konusunda yardımcı olayım?',
        options: [
          { label: 'Tiyatro tarihi quizi', value: 'quiz' },
          { label: 'Bana uygun programı bul', value: 'guide' },
        ]
      }])
      setStep('menu')
    }
    setOpen(true)
  }

  function handleOption(value: string) {
    if (step === 'menu') {
      if (value === 'quiz') {
        const shuffled = [...QUIZ].sort(() => Math.random() - 0.5).slice(0, SHUFFLE_SIZE)
        setQuizPool(shuffled)
        setQIdx(0)
        setScore(0)
        setAnswered(null)
        setStep('quiz')
        addMsg({ from: 'user', text: 'Tiyatro tarihi quizi' })
        setTimeout(() => addMsg({
          from: 'bot',
          text: `Harika! ${SHUFFLE_SIZE} soruluk bir tur başlıyor. Hazır mısın?`,
          options: [{ label: 'Başla', value: 'start-quiz' }]
        }), 400)
      } else if (value === 'guide') {
        addMsg({ from: 'user', text: 'Bana uygun programı bul' })
        setStep('guide-exp')
        setTimeout(() => addMsg({
          from: 'bot',
          text: 'Sana en uygun programı bulmak için birkaç soru soracağım.\n\nDaha önce sahne veya tiyatro deneyimin var mı?',
          options: [
            { label: 'Hiç yok', value: 'yok' },
            { label: 'Biraz var', value: 'biraz' },
            { label: 'Deneyimliyim', value: 'var' },
          ]
        }), 400)
      }
    } else if (step === 'quiz' && value === 'start-quiz') {
      showQuestion(0, [])
    } else if (step === 'quiz' && value === 'next') {
      const nextIdx = qIdx + 1
      if (nextIdx < quizPool.length) {
        setQIdx(nextIdx)
        setAnswered(null)
        showQuestion(nextIdx, [])
      } else {
        // Bitir
        setStep('menu')
        const pct = Math.round((score / quizPool.length) * 100)
        setTimeout(() => addMsg({
          from: 'bot',
          text: `Quiz bitti! ${quizPool.length} sorudan ${score} doğru — ${pct}%\n\n${pct >= 80 ? 'Mükemmel! Sahne tarihi bilgin çok güçlü.' : pct >= 50 ? 'İyi bir sonuç! Keşfedecek çok şey var.' : 'Tiyatro tarihi derin bir konu — merak etme, pratik yaparken öğrenilir.'}`,
          options: [
            { label: 'Tekrar quiz', value: 'quiz' },
            { label: 'Program bul', value: 'guide' },
          ]
        }), 400)
      }
    } else if (step === 'guide-exp') {
      setGuideExp(value)
      addMsg({ from: 'user', text: value === 'yok' ? 'Hiç yok' : value === 'biraz' ? 'Biraz var' : 'Deneyimliyim' })
      setStep('guide-interest')
      setTimeout(() => addMsg({
        from: 'bot',
        text: 'Hangi disiplin seni en çok çekiyor?',
        options: [
          { label: 'Oyunculuk', value: 'oyunculuk' },
          { label: 'Dans & Koreografi', value: 'dans' },
          { label: 'Müzikal (Şan+Dans+Oyun)', value: 'muzikalsini' },
          { label: 'Kamera Önü / Set', value: 'kamera' },
          { label: 'Yazarlık & Dramaturji', value: 'yazarlik' },
          { label: 'İngilizce Drama', value: 'ingilizce' },
        ]
      }), 400)
    } else if (step === 'guide-interest') {
      setGuideInterest(value)
      const labels: Record<string,string> = {
        oyunculuk: 'Oyunculuk', dans: 'Dans & Koreografi', muzikalsini: 'Müzikal',
        kamera: 'Kamera Önü', yazarlik: 'Yazarlık', ingilizce: 'İngilizce Drama'
      }
      addMsg({ from: 'user', text: labels[value] ?? value })
      setStep('guide-duration')
      setTimeout(() => addMsg({
        from: 'bot',
        text: 'Programa ne kadar zaman ayırabilirsin?',
        options: [
          { label: 'Kısa (4–8 hafta)', value: 'kisa' },
          { label: 'Orta (12 hafta)', value: 'orta' },
          { label: 'Uzun dönem (8 ay)', value: 'uzun' },
        ]
      }), 400)
    } else if (step === 'guide-duration') {
      const durLabels: Record<string,string> = { kisa: 'Kısa', orta: 'Orta', uzun: 'Uzun dönem' }
      addMsg({ from: 'user', text: durLabels[value] ?? value })
      const recs = recommend(guideInterest, guideExp, value)
      setStep('menu')
      setTimeout(() => {
        const recText = recs.map(r => `▸ **${r.title}** (${r.duration})\n  ${r.tip}`).join('\n\n')
        addMsg({
          from: 'bot',
          text: `Sana en uygun program${recs.length > 1 ? 'lar' : ''}:\n\n${recText}\n\nDetaylara göz atmak ister misin?`,
          options: [
            ...recs.map(r => ({ label: `→ ${r.title}`, value: `go:${r.slug}` })),
            { label: 'Başa dön', value: 'restart' }
          ]
        })
      }, 500)
    } else if (value.startsWith('go:')) {
      const target = value.replace('go:', '')
      window.location.href = target.startsWith('/') ? target : `/atolyeler/${target}`
    } else if (value === 'restart') {
      setMsgs([])
      setStep('idle')
      setTimeout(() => startBot(), 100)
    } else if (value === 'quiz') {
      // Retry quiz from menu state
      const shuffled = [...QUIZ].sort(() => Math.random() - 0.5).slice(0, SHUFFLE_SIZE)
      setQuizPool(shuffled)
      setQIdx(0)
      setScore(0)
      setAnswered(null)
      setStep('quiz')
      addMsg({ from: 'user', text: 'Tekrar quiz' })
      setTimeout(() => addMsg({
        from: 'bot',
        text: `${SHUFFLE_SIZE} yeni soru geliyor!`,
        options: [{ label: 'Başla', value: 'start-quiz' }]
      }), 400)
    } else if (value === 'guide') {
      addMsg({ from: 'user', text: 'Program bul' })
      setStep('guide-exp')
      setTimeout(() => addMsg({
        from: 'bot',
        text: 'Sahne veya tiyatro deneyimin var mı?',
        options: [
          { label: 'Hiç yok', value: 'yok' },
          { label: 'Biraz var', value: 'biraz' },
          { label: 'Deneyimliyim', value: 'var' },
        ]
      }), 400)
    }
  }

  function showQuestion(idx: number, _pool: typeof QUIZ) {
    const pool = _pool.length ? _pool : quizPool
    const q = pool[idx]
    if (!q) return
    addMsg({
      from: 'bot',
      text: `Soru ${idx + 1}/${pool.length || SHUFFLE_SIZE}:\n\n${q.q}`,
      options: q.options.map((opt, i) => ({ label: opt, value: `ans:${i}` }))
    })
  }

  function handleAnswer(answerIdx: number) {
    if (answered !== null) return
    setAnswered(answerIdx)
    const q = quizPool[qIdx]
    const correct = answerIdx === q.answer
    if (correct) setScore(s => s + 1)
    const scoreAfter = correct ? score + 1 : score
    addMsg({ from: 'user', text: q.options[answerIdx] })
    setTimeout(() => {
      addMsg({
        from: 'bot',
        text: `${correct ? '✓ Doğru!' : `✗ Yanlış. Doğru cevap: **${q.options[q.answer]}**`}\n\n${q.fact}\n\nSkor: ${scoreAfter}/${qIdx + 1}`,
        options: [{ label: qIdx + 1 < quizPool.length ? 'Sonraki soru →' : 'Sonuçları gör →', value: 'next' }]
      })
    }, 300)
  }

  // Seçenekleri parse et: quiz cevapları farklı işlenir
  function handleOptionClick(value: string) {
    if (step === 'quiz' && value.startsWith('ans:')) {
      handleAnswer(parseInt(value.replace('ans:', ''), 10))
    } else {
      handleOption(value)
    }
  }

  /* ── Serbest metin — anahtar kelime tabanlı cevaplar ── */
  const [input, setInput] = useState('')

  function freeTextReply(raw: string): Msg {
    const t = raw.toLowerCase()
    const has = (...ws: string[]) => ws.some(w => t.includes(w))
    const menu = [
      { label: 'Bana uygun programı bul', value: 'guide' },
      { label: 'Tiyatro tarihi quizi', value: 'quiz' },
    ]
    if (has('fiyat', 'ücret', 'ucret', 'kaç para', 'kac para', 'taksit', 'ödeme', 'odeme'))
      return { from: 'bot', text: 'Ücret ve kayıt bilgileri için bizimle doğrudan iletişime geçebilirsin — sana en uygun programı birlikte belirleyelim.', options: [{ label: 'İletişim →', value: 'go:/iletisim' }, ...menu.slice(0, 1)] }
    if (has('indirim', 'kampanya', 'erken kayıt', 'erken kayit'))
      return { from: 'bot', text: 'Kayıt ve koşullar hakkında bilgi almak için bize mail atabilirsin.', options: [{ label: 'İletişim →', value: 'go:/iletisim' }] }
    if (has('iletişim', 'iletisim', 'mail', 'e-posta', 'eposta', 'instagram', 'ulaş', 'ulas', 'telefon'))
      return { from: 'bot', text: 'Bize techne.lab.istanbul@gmail.com adresinden ya da Instagram\'da @technelabistanbul üzerinden ulaşabilirsin.', options: [{ label: 'İletişim sayfası →', value: 'go:/iletisim' }] }
    if (has('nerede', 'adres', 'konum', 'mekan', 'mekân', 'taksim', 'kadıköy', 'kadikoy'))
      return { from: 'bot', text: 'Atölyelerimiz Taksim ve Kadıköy\'de — İstanbul\'un iki yakasında da sahnedeyiz.', options: [{ label: 'İletişim →', value: 'go:/iletisim' }] }
    if (has('yaş', 'yas', 'genç', 'genc', 'çocuk', 'cocuk', 'lise', '14', '15', '16', '17'))
      return { from: 'bot', text: '14–17 yaş için English Drama Lab Youth var: 8 ay, haftada 1 gün, yıl sonunda seyircili final gösterisi. Yetişkin programlarımız 18+.', options: [{ label: 'EDL Youth →', value: 'go:english-drama-youth' }] }
    if (has('ingilizce', 'english', 'dil'))
      return { from: 'bot', text: 'English Drama Lab ailesi 4 programdan oluşuyor: temel yaratıcı drama (12 hafta), Acting Focus (12 hafta), Final Performance Project (8 ay) ve Youth (14–17 yaş).', options: [{ label: 'English Drama Lab →', value: 'go:english-drama-lab' }, { label: 'Program bul', value: 'guide' }] }
    if (has('müzikal', 'muzikal', 'şan', 'san eğit', 'şarkı', 'sarki', 'ses eğitimi'))
      return { from: 'bot', text: 'Techne Musical Lab: drama + şan + dans tek programda, 8 ay, seyircili bitirme performansıyla. Köksal Ünal & Sitare Bilge yönetiminde.', options: [{ label: 'Musical Lab →', value: 'go:techne-musical-lab' }] }
    if (has('dans', 'koreografi', 'broadway'))
      return { from: 'bot', text: 'Broadway Musical Dance: jazz, tap ve theatre dance temelli 12 haftalık koreografi programı. Deneyim şart değil.', options: [{ label: 'Broadway Dance →', value: 'go:broadway-musical-dance' }] }
    if (has('kamera', 'dizi', 'film', 'audition', 'cast', 'set'))
      return { from: 'bot', text: 'Camera Praxis kamera önü oyunculuk ve audition tekniklerine odaklanır. Şu an satışa kapalı — yeni dönem için mail listesine yazabilirsin.', options: [{ label: 'Detay →', value: 'go:camera-praxis' }, { label: 'İletişim →', value: 'go:/iletisim' }] }
    if (has('yazar', 'dramaturji', 'metin', 'oyun yazma'))
      return { from: 'bot', text: 'The Auteur Lab: dramaturji, yazarlık ve oyunculuğu birleştiren 8 haftalık laboratuvar. Halil Yağız Şanal yönetiminde.', options: [{ label: 'Auteur Lab →', value: 'go:auteur-lab' }] }
    if (has('kayıt', 'kayit', 'başvur', 'basvur', 'katıl', 'katil', 'nasıl alırım', 'satın'))
      return { from: 'bot', text: 'Başvuru için program sayfasından e-posta ile ulaşabilirsin. Kontenjanlar 10–14 kişiyle sınırlı.', options: [{ label: 'Programlar →', value: 'go:/atolyeler' }, { label: 'İletişim →', value: 'go:/iletisim' }] }
    if (has('deneyim', 'hiç', 'hic', 'yeni başl', 'yeni basl', 'sıfır', 'sifir'))
      return { from: 'bot', text: 'Deneyim şart değil — birçok programımız sıfırdan başlayanlara açık. Sana en uygununu bulalım mı?', options: [{ label: 'Program bul', value: 'guide' }] }
    if (has('quiz', 'soru', 'bilgi yarış'))
      return { from: 'bot', text: 'Tiyatro tarihi quizine hazır mısın? 10 soru, Antik Yunan\'dan post-dramatiğe.', options: [{ label: 'Quizi başlat', value: 'quiz' }] }
    if (has('merhaba', 'selam', 'hey', 'naber'))
      return { from: 'bot', text: 'Merhaba! Programlar, mekân, kayıt... ne merak ediyorsan yaz — ya da aşağıdan seç.', options: menu }
    if (has('teşekkür', 'tesekkur', 'sağol', 'sagol', 'eyv'))
      return { from: 'bot', text: 'Rica ederim. Sahnede görüşmek üzere! ✳', options: menu }
    return { from: 'bot', text: 'Bunu tam anlayamadım — program, kayıt, mekân ya da iletişim hakkında sorabilirsin. İstersen sana uygun programı birlikte bulalım.', options: menu }
  }

  function sendFree() {
    const v = input.trim()
    if (!v) return
    addMsg({ from: 'user', text: v })
    setInput('')
    // Quiz sürerken serbest yazı quiz akışını bozmasın
    if (step === 'quiz') {
      const q = quizPool[qIdx]
      setTimeout(() => addMsg({
        from: 'bot',
        text: 'Quiz sürüyor — önce bu soruyu bitirelim:',
        options: answered === null && q
          ? q.options.map((opt, i) => ({ label: opt, value: `ans:${i}` }))
          : [{ label: qIdx + 1 < quizPool.length ? 'Sonraki soru →' : 'Sonuçları gör →', value: 'next' }],
      }), 300)
      return
    }
    if (step === 'idle') setStep('menu')
    setTimeout(() => addMsg(freeTextReply(v)), 350)
  }

  // Görünürlük: 4 sn sonra tek seferlik davet balonu
  const [teaser, setTeaser] = useState(false)
  useEffect(() => {
    if (open) { setTeaser(false); return }
    const t = setTimeout(() => setTeaser(true), 4000)
    return () => clearTimeout(t)
  }, [open])

  const lastMsg = msgs[msgs.length - 1]
  const hasOptions = lastMsg?.options && lastMsg.options.length > 0

  return (
    <>
      {/* ── Davet balonu ── */}
      {teaser && !open && (
        <button
          onClick={startBot}
          className="teaser-in fixed bottom-[86px] right-6 z-[9999] bg-bgAlt border border-border border-l-2 border-l-neon px-4 py-3 text-left max-w-[240px]"
          style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.45)' }}
          aria-label="Sahne asistanını aç"
          data-hover
        >
          <span className="font-mono text-[12px] text-fg leading-snug block">
            Sana uygun programı 30 saniyede bulayım mı?
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-neon mt-1.5 block">sahne bot →</span>
        </button>
      )}

      {/* ── Floating Button ── */}
      <button
        onClick={startBot}
        aria-label="Sahne asistanını aç"
        className="bot-breath group fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 bg-bg border border-neon text-neon font-mono text-[12px] tracking-[0.2em] uppercase px-5 py-3.5 transition-all duration-300 hover:bg-neon hover:text-bg active:scale-95"
        data-hover
      >
        <span className="text-[15px] leading-none" aria-hidden="true">✳</span>
        <span>Sahne Bot</span>
        {!open && <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse group-hover:bg-bg" aria-hidden="true" />}
      </button>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="fixed bottom-[84px] right-6 z-[9998] w-[380px] max-w-[calc(100vw-24px)] bg-bg border border-border flex flex-col"
          style={{ height: 'min(560px, calc(100vh - 120px))', boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}
        >
          {/* Neon top rule — perde çizgisi */}
          <div className="h-[2px] w-full bg-neon flex-shrink-0" aria-hidden="true" />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-bgAlt flex-shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-fg leading-none" style={{ fontSize: 20, letterSpacing: '0.04em' }}>SAHNE BOT</span>
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-dim mt-0.5">τέχνη asistanı · çevrimiçi</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="font-mono text-[13px] text-dim hover:text-neon transition-colors px-1"
              data-hover
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 font-mono text-[12px] leading-relaxed whitespace-pre-wrap ${
                    m.from === 'user'
                      ? 'bg-neon text-bg'
                      : 'bg-bgAlt text-fg border-l-2 border-neon'
                  }`}
                >
                  {m.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                </div>
              </div>
            ))}

            {/* Options for last bot message */}
            {hasOptions && lastMsg.from === 'bot' && (
              <div className="flex flex-col gap-1.5 mt-2 pl-2">
                {lastMsg.options!.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOptionClick(opt.value)}
                    className="w-full text-left font-mono text-[11px] tracking-[0.06em] border border-border text-stone px-3.5 py-2.5 hover:bg-neon hover:text-bg hover:border-neon transition-all duration-150"
                    data-hover
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input — serbest yazı */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendFree() }}
            className="flex items-stretch border-t border-border flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Yaz — fiyat, program, mekân..."
              aria-label="Mesajını yaz"
              className="flex-1 bg-bg px-4 py-3 font-mono text-[12px] text-fg outline-none placeholder:text-dim min-w-0"
            />
            <button
              type="submit"
              aria-label="Gönder"
              className="px-5 font-mono text-[14px] bg-neon text-bg hover:bg-fg transition-colors duration-200 flex-shrink-0"
              data-hover
            >
              →
            </button>
          </form>

          {/* Footer */}
          <div className="px-4 py-1.5 border-t border-border flex-shrink-0 flex items-center justify-between">
            <p className="font-mono text-[11px] text-dim/60 tracking-[0.1em]">TECHNE LAB İSTANBUL</p>
            <p className="font-mono text-[11px] text-dim/60 tracking-[0.1em]">τέχνη</p>
          </div>
        </div>
      )}
    </>
  )
}
