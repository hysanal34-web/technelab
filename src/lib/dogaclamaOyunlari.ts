/**
 * /kaynaklar/ingilizce-dogaclama-oyunlari — İngilizce doğaçlama (improv) oyunları bankası.
 * Kullanıcı: öğretmen, konuşma kulübü moderatörü, kendi grubunu toplayan kolaylaştırıcı.
 * Oyunlar doğaçlama geleneğinin isimsiz, yaygın oyunları; tüm açıklamalar, yönergeler
 * ve örnek replikler Techne Lab için özgün yazıldı. Statü oyunları Keith Johnstone’un
 * "status" kavramına dayanır.
 * Seviye mantığı: a1-a2 = kısa kalıp + hareket; b1 = tanıdık durum, gerekçe; b2 = hızlı geçiş, ima, ton.
 */
export type Seviye = 'a1-a2' | 'b1' | 'b2'
export type Kategori = 'isinma' | 'dinleme' | 'hikaye' | 'karakter' | 'statu' | 'sahne'
export type Oyun = {
  slug: string
  ad: string
  tr: string
  kategori: Kategori
  seviye: Seviye[]
  kisi: string
  sure: string
  odak: string
  nasil: string
  yonerge: string
  ornek: string[]
  seviyeNotu: string
  ipucu?: string
}

export const KATEGORILER: { key: Kategori; label: string; desc: string }[] = [
  { key: 'isinma', label: 'Isınma', desc: 'Bedeni ve sesi açan, grubu aynı ritme sokan kısa oyunlar. Hata yapmanın bedava olduğu ilk on dakika.' },
  { key: 'dinleme', label: 'Dinleme ve tepki', desc: 'Partnerin söylediğini duymadan cevap verilemeyen oyunlar. Hazır cümle değil, anlık tepki.' },
  { key: 'hikaye', label: 'Hikâye kurma', desc: 'Grubun birlikte anlatı kurduğu oyunlar. Geçmiş zaman, bağlaçlar ve sıralama doğal olarak devreye girer.' },
  { key: 'karakter', label: 'Karakter', desc: 'Beden, ses ve duygu üzerinden başka biri olma oyunları. Kendi adına konuşma baskısı kalkar.' },
  { key: 'statu', label: 'Statü', desc: 'Keith Johnstone’un "status" kavramı üzerine: kim yukarıda, kim aşağıda ve bu dile nasıl yansıyor.' },
  { key: 'sahne', label: 'Sahne', desc: 'İki ya da daha fazla kişiyle kısa sahneler. Kim, nerede, ne istiyor sorularına oyun içinde cevap bulmak.' },
]

export const OYUNLAR: Oyun[] = [
  // ─── ISINMA ───────────────────────────────────────────────
  {
    slug: 'zip-zap-zop', ad: 'Zip Zap Zop', tr: 'Zip Zap Zop', kategori: 'isinma',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '8–20 kişi', sure: '5–10 dk',
    odak: 'Göz teması, ritim ve sırayı takip etme; dil yükü sıfıra yakın olduğu için ilk dakikalar için uygun.',
    nasil: 'Grup çember olur. Biri ellerini birine doğru uzatıp "Zip" der, o kişi bir başkasına "Zap", sonraki "Zop" der ve döngü sürer. Sıra şaşarsa oyun durmaz, herkes güler ve devam edilir. Tempo ısındıkça hızlandırılır. Ritim oturunca üç hece yerine üç kelimelik bir kategori konabilir.',
    yonerge: 'Stand in a circle. Send the energy to someone with your hands and say "Zip". They send it on with "Zap", the next person says "Zop". If you make a mistake, smile and keep going.',
    ornek: ['Zip!', 'Zap!', 'Zop!'],
    seviyeNotu: 'B2 grupta heceler yerine bir sözcük zinciri kullanın: her kişi bir öncekinin kelimesiyle ilişkili yeni bir kelime göndersin.',
    ipucu: 'Hata yapan kişiyi oyundan çıkarmayın; çıkarma kuralı ilk dakikada grubun en çekingen üyesini susturur.',
  },
  {
    slug: 'sound-ball', ad: 'Sound Ball', tr: 'Ses Topu', kategori: 'isinma',
    seviye: ['a1-a2', 'b1'], kisi: '6–16 kişi', sure: '5–10 dk',
    odak: 'Sesi ve bedeni açma, alınanı aynen geri verme; telaffuzda taklit cesareti.',
    nasil: 'Çemberde hayali bir top bir sesle birlikte atılır. Topu yakalayan kişi önce o sesi aynen tekrar eder, sonra yeni bir sesle başka birine atar. Bir süre sonra ikinci ve üçüncü top eklenir. Sesler yerine tek kelimeler, sonra kısa ifadeler kullanılabilir.',
    yonerge: 'We have an invisible ball. Throw it with a sound. When you catch it, repeat the sound exactly, then throw it to someone new with a new sound.',
    ornek: ['Whoosh! — Whoosh! Boing!', 'Banana! — Banana! Umbrella!', 'Good morning! — Good morning! See you later!'],
    seviyeNotu: 'A1–A2 grupta ses yerine o haftaki kelime listesinden kelimeler fırlatın; tekrar zorunlu olduğu için telaffuz doğal olarak düzelir.',
  },
  {
    slug: 'name-and-gesture', ad: 'Name and Gesture', tr: 'İsim ve Hareket', kategori: 'isinma',
    seviye: ['a1-a2', 'b1'], kisi: '6–16 kişi', sure: '10 dk',
    odak: 'Tanışma kalıpları, isim ezberi ve "I like…" gibi kısa kişisel cümleler.',
    nasil: 'Herkes sırayla adını söylerken bir hareket yapar. Çember adı ve hareketi hep birlikte tekrar eder. İkinci turda isme bir sevilen şey eklenir ve hareketi o şeye bağlanır. Son turda biri bir başkasının hareketini yapar, grup ismini hatırlamaya çalışır.',
    yonerge: 'Say your name and add a movement. We all repeat it together. In the next round, add one thing you like and show it with your body.',
    ornek: ['I’m Deniz and I like swimming.', 'This is Arda. He likes coffee.', 'Is this Selin? Yes, she likes dancing!'],
    seviyeNotu: 'B1 grupta "I like" yerine "Last weekend I…" ile başlatın; geçmiş zaman tek cümleyle oyuna girer.',
  },
  {
    slug: 'what-are-you-doing', ad: 'What Are You Doing?', tr: 'Ne Yapıyorsun?', kategori: 'isinma',
    seviye: ['a1-a2', 'b1'], kisi: 'ikili ya da çember, 6–16 kişi', sure: '10 dk',
    odak: 'Şimdiki zaman (present continuous) ve fiil dağarcığı; söylenenle yapılanı ayırma.',
    nasil: 'Bir kişi bir hareketi mim ile yapar, örneğin diş fırçalar. Yanındaki "What are you doing?" diye sorar. Mim yapan, yaptığından tamamen farklı bir şey söyler: "I’m riding a horse." Soran kişi hemen o şeyi yapmaya başlar ve sıra ona geçer. Söylenen eylemle yapılan eylem asla aynı olmamalıdır.',
    yonerge: 'Mime an action. When someone asks "What are you doing?", say a completely different action. They start doing what you said.',
    ornek: ['What are you doing? — I’m cooking pasta.', 'What are you doing? — I’m painting a wall.', 'What are you doing? — I’m looking for my keys.'],
    seviyeNotu: 'B1 grupta cevaba bir sebep ekletin: "I’m painting a wall because my landlord is coming."',
    ipucu: 'Grup takılırsa tahtaya on fiil yazın; ilk turda bakmak serbest, ikinci turda değil.',
  },
  {
    slug: 'machine', ad: 'Machine', tr: 'Makine', kategori: 'isinma',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '6–14 kişi', sure: '10–15 dk',
    odak: 'Ses ve hareketle birlikte üretim; kısa tekrar eden cümle ya da sesi ritimde tutma.',
    nasil: 'Biri ortaya çıkıp tekrar eden bir hareket ve ses yapar. Sıradaki kişi ona fiziksel olarak bağlanan yeni bir parça ekler. Herkes katıldığında makine hızlanır, yavaşlar ve durur. İkinci turda kolaylaştırıcı makinenin ne ürettiğini söyler, örneğin "a compliment machine", ve parçalar kelime ya da cümle üretir.',
    yonerge: 'One person starts a movement with a sound and repeats it. Join one by one and connect to the machine. Keep your part going until I say stop.',
    ornek: ['Tick… tock… tick… tock…', 'Nice shoes! Nice shoes!', 'Next, please! Next, please!'],
    seviyeNotu: 'B2 grupta makineye bir tema verin ("a machine that makes excuses") ve her parça farklı bir bahane cümlesi tekrarlasın.',
  },
  {
    slug: 'mirror', ad: 'Mirror', tr: 'Ayna', kategori: 'isinma',
    seviye: ['a1-a2', 'b1'], kisi: 'ikili', sure: '5–10 dk',
    odak: 'Sözsüz odak ve partneri izleme; ikinci aşamada eşzamanlı konuşma ile dinleme.',
    nasil: 'İkililer karşı karşıya durur. Biri yavaşça hareket eder, diğeri ayna gibi aynısını yapar. Bir süre sonra roller değişir, sonra kimsenin lider olmadığı bir tur oynanır. Son aşamada lider yavaşça konuşur ve ayna aynı kelimeleri aynı anda söylemeye çalışır.',
    yonerge: 'Face your partner. One of you leads, the other is the mirror. Move slowly, so your partner can follow you exactly.',
    ornek: ['I… am… opening… a… window.', 'Now… I… am… waking… up.'],
    seviyeNotu: 'A1–A2 grupta konuşmalı aşamada liderin kullanacağı cümleleri önceden verin, ayna yalnızca ritmi yakalasın.',
  },
  {
    slug: 'object-transformation', ad: 'Pass the Object', tr: 'Nesneyi Dönüştür', kategori: 'isinma',
    seviye: ['a1-a2', 'b1'], kisi: '6–16 kişi', sure: '10 dk',
    odak: 'Nesne adları ve "This is…/It’s a…" kalıbı; hayal gücünü tek cümleye sığdırma.',
    nasil: 'Çemberde gerçek bir nesne, örneğin bir kalem ya da şal, elden ele dolaşır. Her kişi nesneyi başka bir şeymiş gibi kullanır ve bir cümleyle adlandırır. Grup "Yes, it is!" diye onaylar. Aynı fikir ikinci kez kullanılamaz.',
    yonerge: 'This is not a scarf. Take it and use it as something else. Tell us what it is in one sentence.',
    ornek: ['This is not a pen. It’s a toothbrush.', 'It’s a snake! Be careful!', 'This is my phone. Hello? Mum?'],
    seviyeNotu: 'B1 grupta cümleye kime ait olduğunu ekletin: "This is my grandmother’s magic wand. She used it every Sunday."',
  },

  // ─── DİNLEME VE TEPKİ ─────────────────────────────────────
  {
    slug: 'yes-and', ad: 'Yes, And', tr: 'Evet, Üstelik', kategori: 'dinleme',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: 'ikili ya da 4–12 kişi', sure: '10–15 dk',
    odak: 'Partnerin fikrini kabul edip üstüne ekleme; öneri yapma ve sebep-sonuç bağlama.',
    nasil: 'İkililer ortak bir plan yapar, örneğin bir doğum günü partisi. İlk kişi bir öneri söyler. Diğeri "Yes, and…" ile başlayarak onu kabul eder ve yeni bir ayrıntı ekler. Plan her cümleyle büyür. Önce "Yes, but…" ile bir tur oynayıp sonra "Yes, and…" ile karşılaştırmak farkı görünür kılar.',
    yonerge: 'Plan something together with your partner. Every sentence must start with "Yes, and…". Accept the idea, then add something new.',
    ornek: ['Let’s have a picnic. — Yes, and let’s go to the island.', 'Yes, and we can take the ferry at nine.', 'Yes, and I’ll bring my grandmother’s börek.'],
    seviyeNotu: 'A1–A2 grupta "Let’s…" ve "We can…" kalıplarını tahtaya yazın ve konuyu somut tutun (piknik, parti, tatil).',
    ipucu: 'Turun sonunda "Yes, but" ile "Yes, and" arasında planın nasıl farklılaştığını grupla iki dakika konuşun.',
  },
  {
    slug: 'last-word-response', ad: 'Last Word Response', tr: 'Son Kelimeyle Başla', kategori: 'dinleme',
    seviye: ['b1', 'b2'], kisi: 'ikili', sure: '10 dk',
    odak: 'Cümlenin sonuna kadar dinleme; duyulan kelimeyi yeni bir cümlenin başına yerleştirme.',
    nasil: 'İkililer basit bir sahne konuşması yapar. Her replik, partnerin bir önceki repliğinin son kelimesiyle başlamak zorundadır. Bu, cevabı önceden hazırlamayı engeller. Konuşma tuhaf yerlere gidebilir; amaç zaten bu.',
    yonerge: 'Have a conversation with your partner. Start each sentence with the last word your partner said. Listen until the very end.',
    ornek: ['I bought a new bicycle.', 'Bicycle? I can’t ride a bicycle.', 'Bicycle lessons are cheap, you know. Ask my brother.'],
    seviyeNotu: 'B2 grupta son kelime yerine son cümlenin ana fikrini başka kelimelerle tekrar ederek başlatın ("So you’re saying…").',
  },
  {
    slug: 'questions-only', ad: 'Questions Only', tr: 'Sadece Soru', kategori: 'dinleme',
    seviye: ['b1', 'b2'], kisi: '4–12 kişi, sahnede ikili', sure: '10–15 dk',
    odak: 'Soru kurma: yardımcı fiil, soru kelimesi, kuyruk soru; hızlı soru üretme.',
    nasil: 'İki kişi kısa bir sahne oynar ama yalnızca soruyla konuşabilir. Soru olmayan bir cümle kuran, duraksayan ya da aynı soruyu tekrar eden çıkar ve yerine sıradaki girer. Sahnenin bir yeri ve durumu olmalıdır, örneğin bir mutfak ya da bir bilet gişesi. Seyirciler hataları değil, en iyi soruyu not eder.',
    yonerge: 'You can only speak in questions. If you make a statement or hesitate too long, the next person takes your place.',
    ornek: ['Why is the fridge open?', 'Did you eat my cake?', 'Isn’t it a bit late to ask that?'],
    seviyeNotu: 'B2 grupta yalnızca dolaylı soruya izin verin ("Do you know why…", "Could you tell me…").',
  },
  {
    slug: 'gift-giving', ad: 'Gift Giving', tr: 'Hediye Alıp Vermek', kategori: 'dinleme',
    seviye: ['a1-a2', 'b1'], kisi: 'ikili', sure: '10 dk',
    odak: 'Teşekkür etme, duygu ifade etme ve sıfatla betimleme.',
    nasil: 'Bir kişi partnerine görünmez bir hediye uzatır ama ne olduğunu söylemez; yalnızca boyutunu ve ağırlığını bedeniyle gösterir. Alan kişi kutuyu açar ve hediyenin ne olduğuna kendisi karar verir. Ardından teşekkür eder ve neden tam da bunu istediğini anlatır. Veren kişi "Yes, I knew you…" diyerek hikâyeyi kabul eder.',
    yonerge: 'Give your partner an invisible gift. Don’t say what it is. Open your gift, say what it is, and tell us why you love it.',
    ornek: ['Oh, a teapot! Thank you so much!', 'I always wanted a red umbrella, because my old one broke.', 'Yes, I knew you needed it.'],
    seviyeNotu: 'A1–A2 grupta yalnızca "It’s a…" + bir sıfat + "Thank you!" isteyin; sebep cümlesi isteğe bağlı kalsın.',
  },
  {
    slug: 'group-counting', ad: 'Group Counting', tr: 'Birlikte Saymak', kategori: 'dinleme',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '6–16 kişi', sure: '5–10 dk',
    odak: 'Grubu sözsüz dinleme; sıra kuralı olmadan söz alma ve susmayı bilme.',
    nasil: 'Grup gözleri kapalı ya da yere bakarak birden yirmiye sayar. Herkes istediği zaman bir sayı söyleyebilir ama iki kişi aynı anda konuşursa sayım bire döner. Kimse sırayla gitmeyi önceden planlayamaz. Hedefe ulaşan grup sayılar yerine haftanın günleri ya da alfabe ile tekrar dener.',
    yonerge: 'Close your eyes. We count to twenty together, one number at a time. Anyone can speak, but if two people speak at once, we start again from one.',
    ornek: ['One.', 'Two.', 'Three… — Three! — Okay, one.'],
    seviyeNotu: 'B2 grupta sayı yerine bir cümleyi kelime kelime kurun; aynı anda konuşulursa cümle baştan başlar.',
    ipucu: 'Konuşma kulübünde yarı yolda tıkanan bir tartışmadan sonra iyi bir sıfırlama oyunudur.',
  },
  {
    slug: 'mind-meld', ad: 'Mind Meld', tr: 'Zihin Buluşması', kategori: 'dinleme',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '6–16 kişi', sure: '10 dk',
    odak: 'Kelime çağrışımı ve partnerin düşünce yolunu tahmin etme; kelime dağarcığını yüksek sesle tarama.',
    nasil: 'İki kişi üçe kadar sayar ve aynı anda birer kelime söyler. Sonra ikisi birlikte bu iki kelimeyi birleştiren üçüncü bir kelimeyi bulmaya çalışır ve yine aynı anda söyler. Aynı kelimeyi söyleyene kadar devam ederler. Grup her eşleşmeyi alkışlar.',
    yonerge: 'Count to three and say any word at the same time as your partner. Then find a word that connects your two words and say it together. Continue until you say the same word.',
    ornek: ['Cat! — Ocean! … Fish! — Fish!', 'Winter… — Coffee… Hot! — Warm!'],
    seviyeNotu: 'B2 grupta eşleştikten sonra iki kişiye kelimeye nasıl vardıklarını bir cümleyle açıklatın.',
  },
  {
    slug: 'advice-line', ad: 'Advice Line', tr: 'Tavsiye Hattı', kategori: 'dinleme',
    seviye: ['b1', 'b2'], kisi: '5–10 kişi', sure: '10–15 dk',
    odak: 'Öneri ve tavsiye kalıpları: should, could, why don’t you, if I were you.',
    nasil: 'Üç ya da dört kişi bir radyo programındaki uzman paneli olur. Seyirciden biri arayan dinleyici olarak bir sorunu anlatır. Paneldekiler sırayla tek cümlelik tavsiye verir ve her biri bir öncekinin tavsiyesinin üstüne kurmak zorundadır. Arayan sonunda hangi tavsiyeyi uygulayacağını söyler.',
    yonerge: 'You are experts on a radio show. A listener calls with a problem. Each expert gives one piece of advice and builds on the advice before.',
    ornek: ['My neighbour plays the drums at night.', 'You should talk to him tomorrow morning.', 'And if I were you, I’d bring him a cake when you go.'],
    seviyeNotu: 'B2 grupta panele birer karakter verin (kaygılı, aşırı iyimser, eski asker) ve tavsiyenin tonu o karaktere uysun.',
  },

  // ─── HİKÂYE KURMA ─────────────────────────────────────────
  {
    slug: 'one-word-story', ad: 'One Word Story', tr: 'Tek Kelime Hikâye', kategori: 'hikaye',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '4–12 kişi', sure: '10 dk',
    odak: 'Cümle yapısı, kelime sırası ve geçmiş zaman; grubun cümleyi birlikte bitirmesi.',
    nasil: 'Grup çember olur ve sırayla yalnızca bir kelime söyleyerek bir hikâye anlatır. Hikâye "Once upon a time" ile başlar. Cümle bittiğinde sıradaki kişi "full stop" der. Kolaylaştırıcı bir başlık verir ya da gruptan alır. Hikâye kendi mantığı içinde tutarlı kaldıkça devam eder.',
    yonerge: 'We tell a story together, one word each, around the circle. Listen to the sentence so far and add only one word.',
    ornek: ['Once — upon — a — time — there — was — a — tired — dragon.', 'He — wanted — to — sleep — but — the — phone — rang.'],
    seviyeNotu: 'A1–A2 grupta kelime yerine iki kelimelik parçalar kullanın ve geçmiş zaman fiillerini tahtaya yazın.',
    ipucu: 'Hikâye dağılırsa durdurup son cümleyi grupla birlikte yüksek sesle tekrar edin, sonra devam edin.',
  },
  {
    slug: 'fortunately-unfortunately', ad: 'Fortunately, Unfortunately', tr: 'Neyse ki, Ne Yazık ki', kategori: 'hikaye',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '4–12 kişi', sure: '10 dk',
    odak: 'Geçmiş zaman anlatı ve zıtlık bağlama; olayı tersine çeviren cümle kurma.',
    nasil: 'İlk kişi basit bir olayla başlar. Sıradaki kişi "Unfortunately…" ile kötü bir gelişme ekler. Sonraki "Fortunately…" ile durumu kurtarır. Cümleler dönüşümlü devam eder ve her cümle bir öncekine bağlı olmalıdır. Kolaylaştırıcı uygun bir anda "And finally…" diyerek bitirir.',
    yonerge: 'We tell a story in turns. Start your sentence with "Fortunately" or "Unfortunately", and change what happened just before.',
    ornek: ['Yesterday I went to the airport.', 'Unfortunately, I forgot my passport.', 'Fortunately, my cat brought it in her mouth.'],
    seviyeNotu: 'A1–A2 grupta kelimeleri "Good news… / Bad news…" ile değiştirin; B2 grupta "luckily, sadly, as it turned out" gibi çeşitler isteyin.',
  },
  {
    slug: 'story-spine', ad: 'Story Spine', tr: 'Hikâye Omurgası', kategori: 'hikaye',
    seviye: ['b1', 'b2'], kisi: '4–10 kişi', sure: '15 dk',
    odak: 'Geçmiş zaman, alışkanlık ("every day") ve sebep-sonuç bağlaçları; olay örgüsünü sıralama.',
    nasil: 'Hikâye sabit cümle başlangıçlarıyla kurulur: "Once upon a time…", "Every day…", "But one day…", "Because of that…" (birkaç kez), "Until finally…", "And ever since then…". Her kişi sıradaki başlangıcı alır ve cümleyi tamamlar. "Because of that" bölümü hikâye yeterince ilerleyene kadar tekrar eder. Sonunda grup hikâyeyi bir kez baştan anlatır.',
    yonerge: 'Each person takes the next sentence starter and completes it. "Because of that" can repeat several times. Listen, because your sentence must follow from the one before.',
    ornek: ['Once upon a time there was a bus driver in Kadıköy.', 'Every day he drove the same route.', 'But one day a seagull sat in the driver’s seat.'],
    seviyeNotu: 'B2 grupta hikâyeyi bir karakterin ağzından birinci tekil şahısla anlatın; "had already" gibi geçmiş zaman katmanları kendiliğinden gelir.',
  },
  {
    slug: 'conducted-story', ad: 'Conducted Story', tr: 'Şefli Hikâye', kategori: 'hikaye',
    seviye: ['b1', 'b2'], kisi: '4–6 kişi sahnede', sure: '10–15 dk',
    odak: 'Yarıda kalan cümleyi doğru dilbilgisiyle devralma; dikkatli dinleme.',
    nasil: 'Anlatıcılar sahnede yan yana durur, kolaylaştırıcı önlerinde bir orkestra şefi gibi durur. Şef kimi gösterirse o anlatmaya başlar. Şef başka birini gösterdiğinde yeni kişi, cümle kelimenin ortasında bile kalsa, tam o noktadan devam eder. Seyirci bir başlık verir.',
    yonerge: 'I am the conductor. When I point at you, tell the story. When I point at someone else, they continue from the exact word where you stopped.',
    ornek: ['The princess opened the door and saw a…', '…a very small elephant wearing a hat.'],
    seviyeNotu: 'B2 grupta şef her geçişte bir tür söylesin (korku, haber bülteni, aşk mektubu) ve hikâye aynı olay örgüsüyle tür değiştirsin.',
  },
  {
    slug: 'slideshow', ad: 'Slideshow', tr: 'Tatil Fotoğrafları', kategori: 'hikaye',
    seviye: ['b1', 'b2'], kisi: '4–8 kişi', sure: '10–15 dk',
    odak: 'Geçmiş zaman anlatı ve betimleme: "Here we are…", "This is where we…".',
    nasil: 'Bir kişi tatilden dönmüş biri olarak seyirciye fotoğraflarını gösterdiğini söyler. "Next slide" dediğinde diğer oyuncular donmuş bir fotoğraf pozu verir. Anlatıcı pozu görür ve fotoğrafı anlatır: nerede, ne oldu, kim kimdi. Oyuncular her fotoğrafta yeni bir poz verir, anlatıcı hikâyeyi pozlara göre kurar.',
    yonerge: 'You just came back from a holiday. Show us your photos. When you say "Next slide", the players freeze in a new picture, and you tell us what happened there.',
    ornek: ['And here we are in Cappadocia. This is the morning we lost the guide.', 'Next slide. Ah, this is my uncle. He tried to ride the camel.'],
    seviyeNotu: 'B2 grupta seyirci her fotoğraf sonrası bir soru sorabilsin; anlatıcı tutarlılığı korumak zorunda kalır.',
  },

  // ─── KARAKTER ─────────────────────────────────────────────
  {
    slug: 'character-walk', ad: 'Character Walk', tr: 'Karakter Yürüyüşü', kategori: 'karakter',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '6–20 kişi', sure: '10–15 dk',
    odak: 'Beden üzerinden karakter bulma; ardından o karakterle kısa selamlaşma ve kendini tanıtma.',
    nasil: 'Herkes odada serbestçe yürür. Kolaylaştırıcı bedende bir merkez söyler: burun önde, göğüs önde, dizler önde. Herkes o merkezle yürür ve bir karakterin belirmesine izin verir. Bir noktada kolaylaştırıcı "Meet someone" der; karşılaşanlar karakter olarak selamlaşıp kendilerini birer cümleyle tanıtır.',
    yonerge: 'Walk around the room. Lead with your nose. Let it change how you walk and who you are. When I clap, meet someone and introduce yourself in character.',
    ornek: ['Good evening. I’m Lord Higgins. I own this building.', 'Hi! I’m Tom, I sell balloons. Do you want one?'],
    seviyeNotu: 'A1–A2 grupta tanıtmayı üç bilgiyle sınırlayın: isim, meslek, sevdiği bir şey.',
  },
  {
    slug: 'expert-interview', ad: 'Expert Interview', tr: 'Uzman Röportajı', kategori: 'karakter',
    seviye: ['b1', 'b2'], kisi: 'ikili ya da 3 kişi', sure: '10–15 dk',
    odak: 'Soru sorma, açıklama yapma ve uydurma da olsa bir konuyu kendinden emin anlatma.',
    nasil: 'Bir kişi televizyon sunucusu, diğeri saçma bir alanın dünyaca ünlü uzmanıdır, örneğin kedilerin hava durumu tahmini. Sunucu açık uçlu sorular sorar. Uzman her şeyi bildiği varsayılarak cevap verir ve asla "I don’t know" demez. Üç kişilik versiyonda uzman yalnızca uydurma bir dilde konuşur, üçüncü kişi tercüme eder.',
    yonerge: 'You are the world’s leading expert on a strange topic. The host will ask you questions. Answer with confidence. You know everything.',
    ornek: ['Professor, how do cats predict the weather?', 'Well, it’s simple. When a cat sleeps on its back, rain is coming.', 'And what is the biggest mistake people make?'],
    seviyeNotu: 'B1 grupta sunucuya önceden beş soru kartı verin; B2 grupta seyirci de soru sorabilsin.',
  },
  {
    slug: 'party-quirks', ad: 'Party Quirks', tr: 'Partideki Tuhaflar', kategori: 'karakter',
    seviye: ['b1', 'b2'], kisi: '4–5 kişi sahnede', sure: '15 dk',
    odak: 'Soru sorarak tahmin etme ve ipucu verme; dolaylı anlatım.',
    nasil: 'Bir kişi ev sahibi olur ve dışarı çıkar. Diğer oyuncular gizli bir tuhaflık alır: her şeyden korkan biri, aslında bir kedi olduğunu düşünen biri gibi. Ev sahibi partiye döner, misafirler tek tek gelir ve tuhaflıklarını göstererek sohbet eder. Ev sahibi soru sorarak her misafirin tuhaflığını tahmin eder.',
    yonerge: 'You are hosting a party. Each guest has a secret. Talk to them, ask questions, and guess who they are.',
    ornek: ['Would you like a drink? — Only if it’s in a bowl.', 'Why are you hiding under the table?', 'Are you… a cat?'],
    seviyeNotu: 'B2 grupta tuhaflıkları soyut yapın ("thinks everyone is lying", "is secretly in love with the host").',
  },
  {
    slug: 'emotional-rollercoaster', ad: 'Emotional Rollercoaster', tr: 'Duygu Treni', kategori: 'karakter',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: 'ikili ya da 4–12 kişi', sure: '10–15 dk',
    odak: 'Duygu ifadesi ve sıfatları; aynı cümleyi farklı tonlamalarla söyleme.',
    nasil: 'İki kişi sıradan bir sahne oynar, örneğin bir kafede sipariş vermek. Kolaylaştırıcı ya da seyirci bir duygu adı seslendirir: angry, jealous, bored, delighted. Oyuncular sahneyi bozmadan o duyguya geçer. Duygular giderek hızlanır.',
    yonerge: 'Play a simple scene. When I call out an emotion, switch to it immediately, but keep the same scene going.',
    ornek: ['Can I have a coffee, please? (bored)', 'Can I have a coffee, PLEASE? (angry)', 'Oh, you remembered my name! (delighted)'],
    seviyeNotu: 'A1–A2 grupta tek bir cümleyi sabitleyin ve yalnızca duygu değiştirin; dil yükü sıfıra iner, tonlama çalışılır.',
    ipucu: 'Duygu adlarını kartlara yazıp oyunculara seçtirin; böylece kelime de oyunun parçası olur.',
  },
  {
    slug: 'superheroes', ad: 'Superheroes', tr: 'Süper Kahramanlar', kategori: 'karakter',
    seviye: ['b1', 'b2'], kisi: '4 kişi sahnede', sure: '10–15 dk',
    odak: 'Problem anlatma ve çözüm önerme; gelecek zaman ve "I will…" ile söz verme.',
    nasil: 'Seyirci bir kriz verir, örneğin İstanbul’daki bütün vapurlar kayboldu. İlk oyuncu sahneye bir süper kahraman olarak çıkar. Sıradaki oyuncu sahneye girer ve ilk kahraman ona bir isim ve güç verir. Her yeni kahraman bir öncekinin verdiği isimle girer. Krizi çözmek için hepsi birlikte plan yapar.',
    yonerge: 'There is a crisis in the city. Enter as a superhero. When someone new arrives, give them a superhero name and a power. Together, solve the crisis.',
    ornek: ['Ah, Captain Simit! Thank God you’re here!', 'I will fly to the Bosphorus and find the ferries.', 'Traffic Woman, can you stop the cars?'],
    seviyeNotu: 'B2 grupta kahramanlar planı tartışsın ve en az bir öneriyi gerekçeyle reddetsin.',
  },
  {
    slug: 'dubbing', ad: 'Dubbing', tr: 'Dublaj', kategori: 'karakter',
    seviye: ['b1', 'b2'], kisi: '4 kişi', sure: '10–15 dk',
    odak: 'Bedene ve ağız hareketine uygun söz bulma; anlık tepki ve ritim.',
    nasil: 'İki oyuncu sahnede yalnızca dudak hareketi ve beden kullanır, ses çıkarmaz. Kenarda duran iki kişi onların seslendirmesini yapar. Oyuncular seslendirmenin söylediğini fiziksel olarak hemen yapar; seslendirenler de oyuncuların yaptığını sözle açıklar. İki taraf da öbürünü izlemek zorundadır.',
    yonerge: 'Players, move your lips but make no sound. Voices, speak for them from the side. Everybody watch each other and follow.',
    ornek: ['I can’t believe you’ve eaten the whole pizza!', 'Wait, why am I lifting this chair?', 'Because you’re very, very strong.'],
    seviyeNotu: 'B2 grupta oyuncular yabancı bir film çeviriyor gibi uydurma bir dilde konuşsun, seslendirenler İngilizce "tercüme" etsin.',
  },

  // ─── STATÜ ────────────────────────────────────────────────
  {
    slug: 'status-cards', ad: 'Status Cards', tr: 'Statü Kartları', kategori: 'statu',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: '8–20 kişi', sure: '15 dk',
    odak: 'Ses, göz teması ve cümle uzunluğunda statü farkını fark etme; nezaket kalıpları.',
    nasil: 'Herkes bir oyun kartını bakmadan alnına tutar; kartın değeri statüsüdür. Odada bir parti varmış gibi dolaşılır ve herkes karşısındakine onun kartına göre davranır. Kendi kartını göremeyen her oyuncu nasıl davranıldığına bakarak statüsünü tahmin eder. Sonunda herkes tahminine göre sıraya dizilir ve kartlara bakılır.',
    yonerge: 'Hold your card on your forehead without looking at it. Treat other people according to their card. At the end, guess your own number.',
    ornek: ['Oh, hello! Can I get you anything? Please, sit down.', 'Hm. Excuse me. You’re in my way.', 'Sorry… sorry, is this chair taken?'],
    seviyeNotu: 'A1–A2 grupta yalnızca "Hello", "Sorry", "Excuse me", "Please" ile oynayın; statüyü ton ve beden taşır.',
    ipucu: 'Turdan sonra hangi cümle yapısının yüksek, hangisinin düşük statü gösterdiğini grupla listeleyin.',
  },
  {
    slug: 'status-party', ad: 'Status Party', tr: 'Statü Partisi', kategori: 'statu',
    seviye: ['b1', 'b2'], kisi: '5–10 kişi', sure: '15 dk',
    odak: 'Rica, emir ve özür arasındaki dil farkı: modal fiiller ve dolaylı ifade.',
    nasil: 'Oyunculara gizlice birden ona kadar bir statü numarası verilir. Sahnede bir parti ya da ofis toplantısı oynanır. Herkes kendi numarasına göre konuşur, durur, söz alır ya da söz verir. Sahne bitince seyirci kimin hangi numarada olduğunu tahmin eder ve neye bakarak tahmin ettiğini söyler.',
    yonerge: 'Each of you has a secret status number. Play the party scene. Don’t say your number — show it in how you speak and move.',
    ornek: ['Get me a glass of water.', 'Would it be possible to get some water, if it’s not too much trouble?', 'I’m so sorry, I’ll get it myself.'],
    seviyeNotu: 'B2 grupta sahnenin ortasında kolaylaştırıcı iki kişinin numarasını değiştirsin; geçiş sahne içinde gerekçelenmeli.',
  },
  {
    slug: 'status-ladder', ad: 'Status Ladder', tr: 'Statü Merdiveni', kategori: 'statu',
    seviye: ['a1-a2', 'b1'], kisi: '6–14 kişi', sure: '10 dk',
    odak: 'Karşılaştırma yapıları (more…than, the most) ve meslek, rol kelimeleri.',
    nasil: 'Kolaylaştırıcı bir mekân söyler, örneğin bir hastane. Herkes o mekânda bir rol seçer ve bunu kimseye söylemez. Grup konuşmadan, yalnızca bedenle en düşükten en yükseğe sıraya girer. Sonra her kişi rolünü söyler ve grup sırayı İngilizce karşılaştırmalarla tartışır.',
    yonerge: 'We are in a hospital. Choose a role, but keep it secret. Without speaking, line up from lowest to highest status. Then tell us who you are.',
    ornek: ['I’m the cleaner. I think I’m lower than the nurse.', 'The doctor is more important than the visitor.', 'But the patient is the most important person here!'],
    seviyeNotu: 'B1 grupta sıranın neye göre kurulduğunu sorgulatın: para mı, bilgi mi, o anki ihtiyaç mı?',
  },
  {
    slug: 'status-seesaw', ad: 'Status Seesaw', tr: 'Statü Tahterevallisi', kategori: 'statu',
    seviye: ['b2'], kisi: 'ikili', sure: '10–15 dk',
    odak: 'Sahne boyunca dil kaydını kademeli değiştirme: kibarlık, kesinlik, cümle uzunluğu.',
    nasil: 'İki kişi sahneye birinin yüksek, diğerinin düşük statüyle başladığı bir durumla girer, örneğin bir yönetici ve yeni bir stajyer. Sahne boyunca statüler yavaş yavaş yer değiştirir. Sahne sonunda başlangıçta yüksek olan düşükte, düşük olan yüksekte olmalıdır. Geçiş tek bir ani olayla değil, küçük adımlarla olmalıdır.',
    yonerge: 'One of you starts high status, the other low. Little by little, swap. By the end of the scene, the positions are reversed.',
    ornek: ['You’re late. Sit down.', 'I’m sorry, the metro was… actually, can I ask you something?', 'Of course. Please, tell me what you need.'],
    seviyeNotu: 'B1 grupta değişimi üç sabit noktaya bölün ve kolaylaştırıcı her noktada el çırpsın.',
  },

  // ─── SAHNE ────────────────────────────────────────────────
  {
    slug: 'three-line-scene', ad: 'Three-Line Scene', tr: 'Üç Replikte Sahne', kategori: 'sahne',
    seviye: ['a1-a2', 'b1', 'b2'], kisi: 'ikili', sure: '10–15 dk',
    odak: 'Kim, nerede, ne sorularını üç replikte netleştirme; kısa ve somut cümle.',
    nasil: 'İki oyuncu yalnızca üç replikle bir sahne kurar: birinci kişi, ikinci kişi, yine birinci kişi. Üç replik sonunda seyirci ilişkiyi, yeri ve durumu söyleyebilmelidir. Ardından sıradaki ikili oynar. Grup her seferinde neyin işe yaradığını tek cümleyle not eder.',
    yonerge: 'You have only three lines. In three lines, show us who you are, where you are, and what is happening.',
    ornek: ['Mum, the dog ate my homework again.', 'We don’t have a dog, Ali.', 'Then who is sleeping in my bed?'],
    seviyeNotu: 'A1–A2 grupta ilk repliği kolaylaştırıcı versin, ikili yalnızca ikinci ve üçüncü repliği bulsun.',
  },
  {
    slug: 'freeze-tag', ad: 'Freeze Tag', tr: 'Dondur ve Değiştir', kategori: 'sahne',
    seviye: ['b1', 'b2'], kisi: '6–14 kişi', sure: '15 dk',
    odak: 'Bir pozdan yeni bir bağlam üretme; sahneyi hızlı başlatma ve ilk replikle durumu kurma.',
    nasil: 'İki kişi fiziksel bir sahne oynar. Seyirciden biri "Freeze!" dediğinde oyuncular oldukları pozda donar. Seslenen kişi oyunculardan birine dokunup yerine geçer, aynı pozdan başlayarak tamamen yeni bir sahne açar. Yeni sahnenin ilk repliği durumu netleştirmelidir.',
    yonerge: 'When you see an interesting position, shout "Freeze!". Tap one player out, take the same position, and start a completely new scene.',
    ornek: ['(arms up) — Freeze! — Hands up! Give me the money!', 'Darling, I think the baby is coming.', 'This is the biggest fish I’ve ever caught!'],
    seviyeNotu: 'B2 grupta yeni sahnenin bir öncekiyle aynı ilişkiyi korumasını ama yerini değiştirmesini isteyin.',
  },
  {
    slug: 'bus-stop', ad: 'Bus Stop', tr: 'Otobüs Durağı', kategori: 'sahne',
    seviye: ['a1-a2', 'b1'], kisi: 'ikili ya da 3 kişi', sure: '10 dk',
    odak: 'Sohbet başlatma ve küçük konuşma (small talk); bir karakterin tarzını taklit etme.',
    nasil: 'Bir oyuncu otobüs durağında bekler. İkinci oyuncu belirgin bir karakterle gelir, örneğin çok aceleci ya da çok neşeli biri. Bekleyen kişi bu karakterin tarzını yavaş yavaş benimser. Sonra ilk kişi çıkar, üçüncü kişi yeni bir karakterle gelir ve döngü sürer.',
    yonerge: 'You’re waiting at a bus stop. A stranger arrives with a strong character. Talk to them, and slowly become like them.',
    ornek: ['Excuse me, is this the bus to Taksim?', 'Oh, I love buses! Do you love buses?', 'Yes! I love buses too!'],
    seviyeNotu: 'A1–A2 grupta sabit açılış soruları verin ("Is this the bus to…?", "What time is it?") ve karakteri tek bir sıfatla sınırlayın.',
  },
  {
    slug: 'park-bench', ad: 'Park Bench', tr: 'Park Bankı', kategori: 'sahne',
    seviye: ['b1', 'b2'], kisi: 'ikili', sure: '10–15 dk',
    odak: 'Banktan kalkmak için gerekçe üretme; ikna etme, bahane bulma ve rica.',
    nasil: 'Bir kişi bir park bankında oturur. İkinci kişi gelir ve tek amacı ilk kişinin banktan kalkmasını sağlamaktır, ama ona dokunamaz ve doğrudan "kalk" diyemez. Karakter ve durum içinden bir sebep yaratmalıdır. İlk kişi kalkınca rol değiştirilir ya da sıradaki ikili oynar.',
    yonerge: 'Your partner is sitting on a bench. Get them to leave, but you can’t touch them and you can’t just say "Go away". Give them a reason.',
    ornek: ['Excuse me, I think someone is giving away free ice cream over there.', 'This bench was just painted. Didn’t you see the sign?', 'Are you Mr. Kaya? Your wife is looking for you.'],
    seviyeNotu: 'B2 grupta oturan kişiye "I’ll only leave if…" ile bir koşul koşturun; ikna müzakereye döner.',
  },
  {
    slug: 'new-choice', ad: 'New Choice', tr: 'Yeni Seçenek', kategori: 'sahne',
    seviye: ['b1', 'b2'], kisi: 'ikili + kolaylaştırıcı', sure: '10–15 dk',
    odak: 'Aynı anlamı farklı kelimeyle söyleme; eşanlamlı ve alternatif kalıp üretme.',
    nasil: 'İki kişi bir sahne oynar. Kolaylaştırıcı herhangi bir anda "New choice!" dediğinde son repliği söyleyen kişi o repliği değiştirip yeni bir seçenek söyler. Kolaylaştırıcı birkaç kez üst üste seslenebilir. Sahne her zaman son seçilen repliğe göre devam eder.',
    yonerge: 'Play a scene. When I say "New choice", replace your last line with a different one. Keep the scene going from the new line.',
    ornek: ['I love your new haircut. — New choice! — Did you cut your hair yourself?', 'New choice! — Is that a wig?'],
    seviyeNotu: 'B2 grupta "New choice" yerine "New tone" ya da "More polite" gibi yönler de verin.',
  },
  {
    slug: 'alphabet-scene', ad: 'Alphabet Scene', tr: 'Alfabe Sahnesi', kategori: 'sahne',
    seviye: ['b2'], kisi: 'ikili', sure: '10 dk',
    odak: 'Cümle başlangıçlarında esneklik: sıradaki harfle başlayan doğal bir replik bulma.',
    nasil: 'Seyirci bir harf ve bir mekân verir. İki oyuncu sahneyi o harfle başlayan bir replikle açar. Her yeni replik alfabede bir sonraki harfle başlamak zorundadır. Sahne alfabeyi dolaşıp başladığı harfin bir öncesinde biter. Takılan oyuncuya grup yardım etmez, o kendisi bulur.',
    yonerge: 'Each line must start with the next letter of the alphabet. We start with the letter you get from the audience. Keep the scene real, not just the letters.',
    ornek: ['Are you sure this is the right train?', 'Because the ticket says platform four, yes.', 'Can you check again? This one is going to Ankara.'],
    seviyeNotu: 'B1 grupta alfabenin yalnızca bir yarısını oynayın ve X, Z gibi harfleri atlamaya izin verin.',
  },
  {
    slug: 'hitchhiker', ad: 'Hitchhiker', tr: 'Otostopçu', kategori: 'sahne',
    seviye: ['a1-a2', 'b1'], kisi: '4 kişi', sure: '10–15 dk',
    odak: 'Karakter tarzını taklit etme ve yolculuk dili: yön, yer, plan cümleleri.',
    nasil: 'Dört sandalye arabayı temsil eder. Sürücü ve bir yolcu yolculuğa başlar. Bir otostopçu belirgin bir tarzla, örneğin ağlayarak ya da şarkı söyleyerek arabaya biner. Arabadaki herkes onun tarzını hemen benimser. Bir yolcu iner, yeni bir otostopçu yeni bir tarzla biner.',
    yonerge: 'We are in a car. A hitchhiker gets in with a special way of behaving. Everyone in the car starts behaving the same way.',
    ornek: ['Where are you going? — To the airport!', 'Turn left here… no, right… I’m so nervous!', 'Can we stop for tea, please?'],
    seviyeNotu: 'A1–A2 grupta otostopçuya tek bir duygu kartı verin ve yolculuk cümlelerini önceden tahtaya yazın.',
  },
]

export const OYUN_SAYISI = OYUNLAR.length
