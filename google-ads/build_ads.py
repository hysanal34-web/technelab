# -*- coding: utf-8 -*-
import csv, sys

SITE = "https://www.technelabistanbul.com"
K1, K2 = "TL - Yetiskin Programlar", "TL - Youth Veli"
B1, B2 = "330", "220"

# (grup, maksTBM, finalURL, [ (kelime, eslesme) ], basliklar, aciklamalar, path1, path2)
GROUPS = [
("1A English Drama Lab","30", SITE+"/atolyeler/english-drama-lab", K1, [
 ("ingilizce drama istanbul","Phrase"),("ingilizce drama kursu","Phrase"),
 ("yetişkinler için ingilizce drama","Phrase"),("ingilizce konuşma kulübü istanbul","Phrase"),
 ("ingilizce konuşma pratiği istanbul","Phrase"),("ingilizce doğaçlama atölyesi","Phrase"),
 ("ingilizce tiyatro istanbul","Phrase"),("english drama istanbul","Phrase"),
 ("english drama classes","Phrase"),("english speaking club istanbul","Phrase"),
 ("english conversation class istanbul","Phrase"),("improv in english istanbul","Phrase"),
 ("ingilizce drama istanbul","Exact"),("english drama istanbul","Exact"),
],[
 "English Drama Lab","Sahnede İngilizce Konuş","Konuşma Kulübü Değil","Yetişkinler İçin · 18+",
 "Doğaçlama İle İngilizce","12 Kişilik Gruplar","Seviye Testi Yok","Kadıköy ve Pera",
 "12 Eylül'de Başlıyor","Online Başvuru Açık",
],[
 "Doğaçlama ve sahne çalışmasıyla İngilizce pratiği. Gramer değil, akıcılık.",
 "On iki kişilik gruplar. Eylül dönemi başvuruları açık. Formu doldurup başvur.",
 "Replik ezberi yok. Dili düşünmeden konuşmayı sahnede öğreniyorsunuz.",
 "Kadıköy ve Pera'da ayrı gruplar. Size yakın olanı seçebilirsiniz.",
],"ingilizce","drama"),

("1B Techne Musical Lab","30", SITE+"/atolyeler/techne-musical-lab", K1, [
 ("müzikal tiyatro kursu istanbul","Phrase"),("müzikal kursu istanbul","Phrase"),
 ("şan kursu istanbul","Phrase"),("müzikal tiyatro eğitimi","Phrase"),
 ("sahne sanatları kursu istanbul","Phrase"),("müzikal atölyesi istanbul","Phrase"),
 ("kadıköy müzikal kursu","Phrase"),("müzikal tiyatro kursu istanbul","Exact"),
 ("oyun çıkarma atölyesi","Phrase"),("oyun çıkartma atölyesi","Phrase"),
 ("oyun çıkarma atölyesi istanbul","Phrase"),("sahne oyunu atölyesi istanbul","Phrase"),
],[
 "Techne Musical Lab","Drama · Tiyatro · Müzikal","8 Ay · Seyircili Final","15–55 Yaş",
 "Oyunculuk Şan ve Dans","12 Kişilik Grup","Köksal Ünal & Sitare Bilge","Kadıköy",
 "28 Eylül'de Başlıyor","Başvurular Değerlendirmeyle",
],[
 "Sekiz ay: drama, şan ve dans. Mayıs'ta seyirci önünde bir müzikal.",
 "Şarkı kolajı değil, sahnelenmiş bir müzikal. Kostüm, ışık, dekor.",
 "On iki kişilik grup. Başvuru kısa bir performans videosuyla değerlendirilir.",
 "15–55 yaş arası katılımcılara açık. Başvuru formu sitede, birkaç dakika sürüyor.",
],"muzikal","lab"),

("1C Broadway Musical Dance","30", SITE+"/atolyeler/broadway-musical-dance", K1, [
 ("broadway dans kursu","Phrase"),("müzikal dans kursu istanbul","Phrase"),
 ("jazz dans kursu istanbul","Phrase"),("theatre dance istanbul","Phrase"),
 ("dans kursu kadıköy","Phrase"),("kadıköy dans atölyesi","Phrase"),
 ("çocuk dans kursu kadıköy","Phrase"),("gençler için dans kursu istanbul","Phrase"),
 ("çocuk müzikal kursu istanbul","Phrase"),("gençler için müzikal kursu","Phrase"),
 ("genç dans atölyesi istanbul","Phrase"),("broadway dans kursu","Exact"),
],[
 "Broadway Musical Dance","Jazz · Theatre Dance","12–55 Yaş","Dans Deneyimi Gerekmiyor",
 "Teknik Temelden Başlıyoruz","15 Kişilik Grup","Köksal Ünal İle","Kadıköy · Perşembe 19:00",
 "17 Eylül'de Başlıyor","Online Başvuru Açık",
],[
 "Broadway müzikal tiyatrosunun dans dili. Jazz ve theatre dance tekniği.",
 "Dans deneyimi gerekmiyor. Teknik temelden başlayan 12 haftalık program.",
 "12–55 yaş arası katılımcılara açık. Aylık katılım seçeneği de var.",
 "Kadıköy'de perşembe akşamları. On beş kişilik grup. Online başvuru açık.",
],"broadway","dans"),

("1D The Auteur Lab","20", SITE+"/atolyeler/auteur-lab", K1, [
 ("oyun yazarlığı kursu","Phrase"),("yaratıcı yazarlık kursu istanbul","Phrase"),
 ("dramaturji eğitimi","Phrase"),("senaryo yazarlığı kursu istanbul","Phrase"),
 ("yaratıcı yazarlık atölyesi","Phrase"),("oyun yazarlığı atölyesi istanbul","Phrase"),
 ("yazarlık kursu kadıköy","Phrase"),("oyun yazarlığı kursu","Exact"),
],[
 "The Auteur Lab","Yaratıcı Yazarlık","Dramaturji Atölyesi","Sophokles'ten Beckett'e",
 "8 Haftalık Modül","10 Kişilik Grup","Halil Yağız Şanal İle","Kadıköy · Marmaray 8 dk",
 "7 Ekim'de Başlıyor","Online Başvuru Açık",
],[
 "Metnin nasıl kurulduğunu görmek için sekiz hafta. Roman, senaryo ve oyun.",
 "On kişilik grup. Modüller ayrı alınabilir; devam kararını sonra verirsiniz.",
 "İKSV ödüllü oyun yazarı Halil Yağız Şanal ile. Kadıköy'de çarşamba akşamları.",
 "Yazma deneyimi gerekmiyor. Program sahne dilini sıfırdan kuruyor.",
],"yaratici","yazarlik"),

("1E English Acting Praxis","32", SITE+"/atolyeler/english-drama-final-project", K1, [
 ("ingilizce oyunculuk","Phrase"),("ingilizce oyunculuk kursu","Phrase"),
 ("ingilizce oyunculuk atölyesi","Phrase"),("ingilizce oyunculuk eğitimi","Phrase"),
 ("ingilizce sahne oyunculuğu","Phrase"),("english acting workshop","Phrase"),
 ("english acting workshop istanbul","Phrase"),("english acting classes istanbul","Phrase"),
 ("acting in english istanbul","Phrase"),("acting workshop in english","Phrase"),
 ("uluslararası oyunculuk eğitimi","Phrase"),
 ("ingilizce oyunculuk kursu","Exact"),("english acting workshop","Exact"),
 ("ingilizce oyunculuk atölyesi","Exact"),
],[
 "English Acting Praxis","Tamamen İngilizce","Harika Uygur Masterclass","Finalde Audition Çekimi",
 "12 Haftalık Yoğun Program","14 Kişilik Grup","Cast Direktörü Süpervizör","Pera · Cumartesi 11:00",
 "26 Eylül'de Başlıyor","Başvurular Değerlendirmeyle",
],[
 "On iki hafta, tamamen İngilizce. Metin, karakter ve prova disiplini.",
 "Finalde Cast Direktörü Harika Uygur ile masterclass ve audition çekimi.",
 "B1 seviyesi İngilizce yeterli. On dört kişilik grup, Pera'da cumartesi.",
 "Performanslar kayıt altına alınıp size teslim ediliyor. Başvurular değerlendirmeyle.",
],"english","acting"),

("2A Turk Velisi - Urun Adi","28", SITE+"/atolyeler/english-drama-youth", K2, [
 ("çocuklar için tiyatro kursu","Phrase"),("gençler için tiyatro kursu istanbul","Phrase"),
 ("çocuk drama kursu istanbul","Phrase"),("çocuklar için ingilizce drama","Phrase"),
 ("gençler için ingilizce drama","Phrase"),("çocuk oyunculuk kursu istanbul","Phrase"),
 ("yaratıcı drama kursu çocuk","Phrase"),("lise tiyatro kursu","Phrase"),
 ("ortaokul tiyatro kursu","Phrase"),("kadıköy çocuk tiyatro kursu","Phrase"),
 ("çocuklar için oyun çıkarma atölyesi","Phrase"),("çocuklar için oyun çıkartma atölyesi","Phrase"),
 ("gençler için oyun çıkarma atölyesi","Phrase"),("gençler için oyun çıkartma atölyesi","Phrase"),
 ("çocuk oyun çıkarma atölyesi","Phrase"),("oyun çıkarma atölyesi çocuk","Phrase"),
 ("çocuklar için ingilizce drama","Exact"),("gençler için tiyatro kursu istanbul","Exact"),
],[
 "English Drama Youth","10–17 Yaş · İngilizce","Yıl Sonu Sahne Gösterisi","Dil Kursu Değil Tiyatro",
 "Haftada Bir Gün","12 Kişilik Grup","Kadıköy ve Pera","Yaşa Göre Ayrı Gruplar",
 "Eylül'de Başlıyor","Veli Başvuru Formu",
],[
 "Çocuğunuz İngilizceyi sahnede kullanarak açıyor. Ders çalışarak değil.",
 "Sekiz ay, haftada bir gün. Mayıs'ta seyirci önünde gerçek bir gösteri.",
 "10–14 ve 15–17 ayrı sınıflarda çalışıyor. On iki kişilik gruplar.",
 "Kadıköy ve Pera'da gruplar. Başvuru formunu doldurun, biz sizi arayalım.",
],"gencler","drama"),

("2B Turk Velisi - Bosluk","28", SITE+"/atolyeler/english-drama-youth", K2, [
 ("hafta sonu çocuk aktivitesi istanbul","Phrase"),("cumartesi çocuk kursu","Phrase"),
 ("okul sonrası aktivite istanbul","Phrase"),("çocuk için hafta sonu kurs","Phrase"),
 ("çocuklar için sanat aktivitesi istanbul","Phrase"),("kadıköy çocuk aktivitesi","Phrase"),
 ("13 yaş çocuk kursu","Phrase"),("15 yaş gençler için kurs","Phrase"),
],[
 "Hafta Sonu İçin Bir Sahne","10–17 Yaş Drama Atölyesi","İngilizce ve Tiyatro","Yıl Sonu Gösterisi",
 "Haftada Bir Gün","12 Kişilik Grup","Kadıköy ve Pera","Ekran Başında Değil Sahnede",
 "Eylül'de Başlıyor","Veli Başvuru Formu",
],[
 "Hafta sonu için ekran başı olmayan bir seçenek. Sahne, oyun ve İngilizce.",
 "Sekiz ay boyunca haftada bir gün. Mayıs'ta seyirci önünde bir gösteri.",
 "Çocuğunuz İngilizceyi sahnede kullanarak açıyor. On iki kişilik gruplar.",
 "Kadıköy ve Pera'da gruplar. Başvuru formunu doldurun, biz sizi arayalım.",
],"hafta-sonu","drama"),

("2C International School EN","32", SITE+"/atolyeler/english-drama-youth", K2, [
 ("after school activities istanbul","Phrase"),("extracurricular activities istanbul","Phrase"),
 ("weekend classes for kids istanbul","Phrase"),("weekend activities for kids istanbul","Phrase"),
 ("drama club for kids istanbul","Phrase"),("english drama for kids istanbul","Phrase"),
 ("drama classes for children istanbul","Phrase"),("kids theatre istanbul","Phrase"),
 ("youth theatre istanbul","Phrase"),("performing arts for kids istanbul","Phrase"),
 ("after school activities istanbul","Exact"),("youth theatre istanbul","Exact"),
 ("english drama for kids istanbul","Exact"),
],[
 "English Drama for Youth","Ages 10–17 · In English","Year-End Stage Show","Not a Language Course",
 "One Day a Week","Groups of 12","Kadikoy and Pera","Taught Entirely in English",
 "Starts in September","Apply Online",
],[
 "Drama and stagework in English. Your child opens up by performing, not studying.",
 "Eight months, one day a week. A real performance in front of an audience in May.",
 "Ages 10-14 and 15-17 work in separate classes. Groups limited to twelve.",
 "Groups in Kadikoy and Pera. Fill in the application form and we will call you.",
],"english","drama"),
]

NEG = """ücretsiz bedava iş ilanı eleman aranıyor staj indir pdf izle film izle dizi izle
oyun oyna oyuncu kadrosu kimdir biyografi maaş ne kadar maaş üniversite bölüm taban puani
konservatuvar sınavı yks torrent full izle bilet ucuz en ucuz indirimli kampanyalı burslu
bursla taksitli ücretsiz deneme fiyat listesi en uygun hesaplı promosyon anaokulu
okul öncesi 3 yaş 4 yaş 5 yaş 6 yaş bebek kreş""".split()

hata=[]
def kontrol(metin, sinir, etiket):
    if len(metin) > sinir:
        hata.append(f"{etiket}: {len(metin)}/{sinir} -> {metin}")

# ── kelimeler + reklamlar
with open("01-kampanya-yukleme.csv","w",newline="",encoding="utf-8-sig") as f:
    w=csv.writer(f)
    w.writerow(["Campaign","Campaign Daily Budget","Campaign Status","Ad Group","Max CPC",
                "Ad Group Status","Keyword","Criterion Type","Final URL"])
    for g,cpc,url,kamp,kws,_,_,_,_ in GROUPS:
        butce = B1 if kamp==K1 else B2
        for kw,mt in kws:
            w.writerow([kamp,butce,"Paused",g,cpc,"Enabled",kw,mt,url])

with open("02-reklamlar-rsa.csv","w",newline="",encoding="utf-8-sig") as f:
    w=csv.writer(f)
    basliklar=["Campaign","Ad Group","Ad type","Final URL","Path 1","Path 2"]
    basliklar+= [f"Headline {i}" for i in range(1,11)]
    basliklar+= [f"Description {i}" for i in range(1,5)]
    w.writerow(basliklar)
    for g,cpc,url,kamp,_,hs,ds,p1,p2 in GROUPS:
        for i,h in enumerate(hs,1): kontrol(h,30,f"{g} H{i}")
        for i,d in enumerate(ds,1): kontrol(d,90,f"{g} D{i}")
        kontrol(p1,15,f"{g} Path1"); kontrol(p2,15,f"{g} Path2")
        w.writerow([kamp,g,"Responsive search ad",url,p1,p2]+hs+ds)

with open("03-negatif-kelimeler.csv","w",newline="",encoding="utf-8-sig") as f:
    w=csv.writer(f)
    w.writerow(["Campaign","Keyword","Criterion Type"])
    for kamp in (K1,K2):
        for n in NEG:
            w.writerow([kamp,n,"Campaign Negative Broad"])

print("Reklam grubu:",len(GROUPS))
print("Toplam kelime:",sum(len(g[4]) for g in GROUPS))
print("Negatif:",len(NEG),"x2 kampanya")
if hata:
    print("\n!!! KARAKTER SINIRI ASILDI:")
    for h in hata: print("  ",h)
    sys.exit(1)
print("\nTum basliklar <=30, aciklamalar <=90 karakter. Temiz.")
