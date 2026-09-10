#!/usr/bin/env python3
"""
Techne Lab program broşürleri — PDF üretici.

NEDEN VAR: public/dosyalar/*.pdf dosyaları DM otomasyonlarının verdiği
"detay linki". Fiyat ya da tarih değiştiğinde bunlar elle güncellenmediği
için eskiyor (8 Eylül'de yakalanan hata: PDF'lerde Musical Lab tanışması
13 Eylül Pazar yazıyordu, doğrusu 12 Eylül Cumartesi; fiyat 165.000 ₺ (o dönem)
görünüyordu, doğrusu 140.000 ₺).

Bundan sonra fiyat değişince: aşağıdaki PROGRAMLAR sözlüğünü güncelle ve
    python3 scripts/brosur-uret.py
çalıştır. 14 PDF birden yenilenir.

Tek doğruluk kaynağı: src/lib/data.ts ve src/app/tanisma-gunu/sessions.ts

Gereksinim: pip install weasyprint
"""

from pathlib import Path
from weasyprint import HTML

KOK = Path(__file__).resolve().parent.parent
CIKTI = KOK / "public" / "dosyalar"

# ── Ortak ────────────────────────────────────────────────────────────
TEL = "0552 242 59 71"
IG = "@technelabistanbul"
FORM = "technelabistanbul.com/tanisma-gunu"

ORTAK_TR = {
    "sezon": "2026–27 SEZONU",
    "kayit_baslik": "KAYIT NASIL İŞLİYOR?",
    "adimlar": [
        ("Yazın", "WhatsApp ya da Instagram DM — hangi program, hangi şube. Sorularınızı alalım."),
        ("Tanışma atölyesine gelin", "Ücretsiz ve taahhütsüz. Formu doldurun, adresi ve saati yazalım."),
        ("Kaydınızı yapalım", "Ödeme linki ya da havale. Yeriniz ayrıldığında mekân ve saat bilgisini iletiyoruz."),
    ],
    "sss_baslik": "SIKÇA SORULAN SORULAR",
    "isleyis": "PROGRAMIN İŞLEYİŞİ",
    "egitmen": "EĞİTMEN",
    "baslangic": "BAŞLANGIÇ",
    "ucret": "ÜCRET",
    "amac": "AMAÇ",
    "tanisma": "ÜCRETSİZ TANIŞMA",
    "meta": ["YAŞ", "SÜRE", "GRUP", "BAŞVURU"],
    "erken": "Erken kayıt · 10 Eylül'e kadar",
    "arkadas": "Arkadaşınla gel · iki kişi birlikte",
    "burs": "Burs (başvuru değerlendirmesiyle)",
    "taksit": "Kredi kartına taksit yapılabilir; vade farkı kart ve taksite göre değişir.",
    "not": "Tanışma atölyesi ücretsiz ve taahhütsüz. Gruplar küçük olduğu için yer sınırlı; gelmeyi düşünüyorsanız formu doldurup yerinizi ayırtın.",
    "kayit_alt": "Kayıt · profildeki form ya da WhatsApp",
    "form_etiket": "TANIŞMA FORMU",
}

ORTAK_EN = {
    "sezon": "2026–27 SEASON",
    "kayit_baslik": "HOW REGISTRATION WORKS",
    "adimlar": [
        ("Write to us", "WhatsApp or Instagram DM — which program, which location. Ask us anything."),
        ("Come to the intro workshop", "Free, no commitment. Fill in the form and we'll send the address and time."),
        ("We complete your registration", "Payment link or transfer. Once your place is held, we share the venue and schedule."),
    ],
    "sss_baslik": "FREQUENTLY ASKED",
    "isleyis": "HOW THE PROGRAM RUNS",
    "egitmen": "INSTRUCTOR",
    "baslangic": "START",
    "ucret": "TUITION",
    "amac": "AIM",
    "tanisma": "FREE INTRO WORKSHOP",
    "meta": ["AGE", "DURATION", "GROUP", "APPLICATION"],
    "erken": "Early registration · until September 10",
    "arkadas": "Bring a friend · two together",
    "burs": "Scholarship (by application review)",
    "taksit": "Credit card installments available; interest varies by card and plan.",
    "not": "The intro workshop is free and carries no commitment. Groups are small and places are limited — fill in the form to reserve yours.",
    "kayit_alt": "Register · form in bio or WhatsApp",
    "form_etiket": "INTRO WORKSHOP FORM",
}

# ── Program verisi ───────────────────────────────────────────────────
# Fiyatlar data.ts ile, tanışma saatleri sessions.ts ile eşit olmalı.
PROGRAMLAR = {
    "auteur": {
        "kod": "01", "dosya": "auteur",
        "tr": {
            "mekan": "KADIKÖY", "baslik": "THE AUTEUR LAB",
            "slogan": "Dürtüden tasarıma — tasarımdan eyleme.",
            "meta": ["Yaş sınırı yok", "8 hafta · modül başına", "En fazla 10 kişi", "Portfolyo aranmıyor"],
            "amac": "Bir metnin neden işlediğini görebilmek; o bakış yerleştiğinde hangi biçimde yazdığın ikincil kalıyor.",
            "aciklama": "Sophokles'ten Beckett'e uzanan bir okuma hattı. Metinlerin nasıl kurulduğunu, anlatının yüzyıllar içinde neyi koruyup neyi bıraktığını izliyoruz. Teknikle başlamıyoruz — roman, senaryo ve oyun aynı zeminden besleniyor.\n\nProgram üç modülden oluşuyor, her biri sekiz hafta. Modüller ayrı ayrı alınabiliyor.",
            "fazlar": [
                ("1–8. HAFTA", "Antikten Moderne", "Sophokles'ten Ibsen'e dramatik yapının temelleri: metin analizi, karakter arkı, çatışma, alt metin."),
                ("9–16. HAFTA", "Çağdaş Yazın", "Beckett, Kane, Zeller, Williams. Parçalanmış yapılar ve çoğul anlatı."),
                ("17–24. HAFTA", "Kendi Sesin", "Kişisel yazarlık sesinin keşfi. Kısa oyun taslakları ve dramaturgik geri bildirim."),
            ],
            "egitmenler": [("Halil Yağız Şanal", "Oyun yazarı, yönetmen ve dramaturg.")],
            "baslangic": [("Kadıköy", "7 Ekim Çarşamba")],
            "fiyat": [("18.000 ₺", "/ MODÜL")],
            "erken": "16.200 ₺",
            "tanisma": "12 Eylül Cumartesi · 16:30 · Kadıköy — Kısa bir okuma, örnek bir çözümleme, programın anlatımı.",
            "sss": [
                ("Hiç yazmadım, olur mu?", "Olur. Program başlangıç seviyesinden kuruluyor; portfolyo ya da yayımlanmış metin aranmıyor."),
                ("Üç modülü de almak zorunda mıyım?", "Hayır. Birinciyle başlayıp devam kararını sonra verebilirsiniz."),
                ("Bütçe nasıl işliyor?", "Modül başına 18.000 ₺. 10 Eylül'e kadar erken kayıtta %10 indirimle 16.200 ₺. Arkadaşınızla birlikte kayıtta ikinize de %10."),
            ],
        },
        "en": {
            "mekan": "KADIKÖY", "baslik": "THE AUTEUR LAB",
            "slogan": "From impulse to design — from design to action.",
            "meta": ["No age limit", "8 weeks · per module", "Max 10 people", "No portfolio required"],
            "amac": "Learning to see why a text works. Once that eye settles in, the form you write in becomes secondary.",
            "aciklama": "A reading line running from Sophocles to Beckett. We look at how texts are built and what narrative has kept — and shed — across centuries. We don't start with technique: the novel, the screenplay and the play all feed from the same ground.\n\nThree modules, eight weeks each. Modules can be taken separately.",
            "fazlar": [
                ("WEEKS 1–8", "From Antiquity to Modern", "From Sophocles to Ibsen: dramatic structure, character arc, conflict and subtext."),
                ("WEEKS 9–16", "Contemporary Writing", "Beckett, Kane, Zeller, Williams. Fragmented structures and plural narrative."),
                ("WEEKS 17–24", "Your Own Voice", "Finding your own voice. Short play drafts and dramaturgical feedback."),
            ],
            "egitmenler": [("Halil Yağız Şanal", "Playwright, director and dramaturg.")],
            "baslangic": [("Kadıköy", "Wednesday, October 7")],
            "fiyat": [("18,000 TL", "/ MODULE")],
            "erken": "16,200 TL",
            "tanisma": "Saturday, September 12 · 16:30 · Kadıköy — A short reading, a sample analysis, and an outline of the program.",
            "sss": [
                ("I've never written before. Is that a problem?", "Not at all. The program starts from the beginning; no portfolio or published work required."),
                ("Do I have to take all three modules?", "No. Start with the first and decide about continuing later."),
                ("How does the budget work?", "18,000 TL per module. 16,200 TL with early registration until September 10. 10% off for two people registering together."),
            ],
        },
    },
    "edl": {
        "kod": "02", "dosya": "edl",
        "tr": {
            "mekan": "PERA & KADIKÖY", "baslik": "ENGLISH DRAMA LAB",
            "slogan": "Dil öğretmiyoruz. Dili deneyimliyoruz.",
            "meta": ["Yetişkin · 18+", "12, 6 ya da 4 hafta", "En fazla 12 kişi", "B1 ve üzeri · test yok"],
            "amac": "İngilizceyi bilen ama konuşurken donan kişide refleksi kurmak — sahnede, kullanarak.",
            "aciklama": "İngilizce, yaratıcı drama egzersizleri ve doğaçlama yoluyla bedene ve sese yerleşiyor. Metin ezberi yok; anlık tepki ve hayal gücü var.\n\nBir konuşma kulübünün pratiğini sahnede yapıyoruz: masada oturmuyorsunuz, bir durumun içindesiniz ve cevap vermeniz gerekiyor. Gramer düzeltmiyoruz, akıcılık çalışıyoruz.",
            "fazlar": [
                ("EKSEN 01", "Isınma & Keşif", "Oyun ve güven egzersizleri, dil oyunları. İngilizce sezginin açılması."),
                ("EKSEN 02", "Doğaçlama & Karakter", "Anlık sahne çalışması, status oyunları. Dili düşünmeden konuşmak."),
                ("EKSEN 03", "Sahne & Bütünleşme", "Grup doğaçlamaları, partner çalışması. Araçların sahnede birleşmesi."),
            ],
            "egitmenler": [
                ("Alara Lokum", "Oyuncu; anadil seviyesinde İngilizce."),
                ("Ece Ertez", "Oyuncu; fiziksel tiyatro ve Chubbuck metodu."),
                ("Yeşim Çelebi", "Yale mezunu; LAMDA disiplini."),
            ],
            "baslangic": [("Kadıköy", "14 Eylül Pazartesi · 20:00"), ("Taksim Pera", "3 Ekim Cumartesi · 15:00")],
            "fiyat": [("19.500 ₺", "/ 12 HAFTA"), ("11.000 ₺", "/ 6 HAFTA"), ("8.000 ₺", "/ 4 HAFTA")],
            "erken": "17.550 ₺ · 9.900 ₺ · 7.200 ₺",
            "tanisma": "12 Eylül Cumartesi · 14:00 · Kadıköy — 19 Eylül Cumartesi · 15:00 · Taksim Pera. Örnek bir egzersiz ve programın anlatımı.",
            "sss": [
                ("Seviye testi var mı?", "Yok. B1 ve üzeri diyoruz; günlük bir sohbeti takip edip cevap verebiliyorsanız yeterli."),
                ("Oyunculuk deneyimim yok.", "Gerekmiyor. Program oyunculuk öğretmek için değil, dili deneyimlemek için kurulu."),
                ("Hangi paketi seçmeliyim?", "Refleksi kırmaya 4–6 hafta yetiyor; kalıcılaştırmak isteyenler için 12 hafta öneriyoruz."),
                ("Bütçe nasıl işliyor?", "12 hafta 19.500 ₺ · 6 hafta 11.000 ₺ · 4 hafta 8.000 ₺. Erken kayıtta %10, arkadaşınızla birlikte kayıtta ikinize de %10."),
            ],
        },
        "en": {
            "mekan": "PERA & KADIKÖY", "baslik": "ENGLISH DRAMA LAB",
            "slogan": "We don't teach the language. We make you live it.",
            "meta": ["Adults · 18+", "12, 6 or 4 weeks", "Max 12 people", "B1 and above · no test"],
            "amac": "Building the reflex in someone who knows English but freezes when speaking — on stage, by using it.",
            "aciklama": "English settles into the body and voice through creative drama and improvisation. No line memorisation — instant reaction and imagination instead.\n\nWe do a conversation club's practice standing up: you're inside a situation and you have to answer. We don't correct grammar; we build fluency.",
            "fazlar": [
                ("AXIS 01", "Warm-Up & Discovery", "Play and trust exercises, language games. Opening up English intuition."),
                ("AXIS 02", "Improvisation & Character", "On-the-spot scene work and character improvisation. Speaking without translating."),
                ("AXIS 03", "Stage & Integration", "Group improvisation and partner work — the tools coming together."),
            ],
            "egitmenler": [
                ("Alara Lokum", "Actor; native-level English."),
                ("Ece Ertez", "Actor; physical theatre and the Chubbuck method."),
                ("Yeşim Çelebi", "Yale graduate; LAMDA discipline."),
            ],
            "baslangic": [("Kadıköy", "Monday, September 14 · 20:00"), ("Taksim Pera", "Saturday, October 3 · 15:00")],
            "fiyat": [("19,500 TL", "/ 12 WEEKS"), ("11,000 TL", "/ 6 WEEKS"), ("8,000 TL", "/ 4 WEEKS")],
            "erken": "17,550 TL · 9,900 TL · 7,200 TL",
            "tanisma": "Saturday, September 12 · 14:00 · Kadıköy — Saturday, September 19 · 15:00 · Taksim Pera. A sample exercise and an outline of the program.",
            "sss": [
                ("Is there a placement test?", "No. B1 and above — if you can follow and answer in an everyday conversation, that's enough."),
                ("I have no acting experience.", "None needed. The program exists to make you live the language, not to teach acting."),
                ("Which package should I choose?", "4–6 weeks breaks the freeze; 12 weeks makes it stick."),
                ("How does the budget work?", "12 weeks 19,500 TL · 6 weeks 11,000 TL · 4 weeks 8,000 TL. 10% off with early registration, 10% off for two people together."),
            ],
        },
    },
    "praxis": {
        "kod": "03", "dosya": "praxis",
        "tr": {
            "mekan": "PERA", "baslik": "ENGLISH ACTING PRAXIS",
            "slogan": "Oyunculuğunu uluslararası arenaya taşımak isteyenler için.",
            "meta": ["Yetişkin · 18+", "12 hafta", "En fazla 14 kişi", "B1 ve üzeri"],
            "amac": "Dili ezberlenen bir replik olmaktan çıkarıp oyuncunun aracı hâline getirmek.",
            "aciklama": "Oyunculuğunu uluslararası bir zeminde denemek isteyenler için on iki haftalık bir uğrak. Profesyonel bir oyuncu da olabilirsiniz, eğitimine devam eden bir öğrenci de.\n\nOn iki hafta boyunca iki şey birden çalışıyor: oyuncunun enstrümanı ve dilin pası. Metin seçimi, karakter kurma, prova disiplini — hepsi İngilizce yürüyor.",
            "fazlar": [
                ("1–4. HAFTA", "Metin & Karakter", "Metin seçimi, analiz, karakter motivasyonu. Alt metin ve sahne niyeti."),
                ("5–8. HAFTA", "Prova Süreci", "Partner çalışması, blocking, sahne dinamiği."),
                ("9–12. HAFTA", "Masterclass & Çekim", "Kişisel geri bildirim. Finalde cast direktörü Harika Uygur ile bir günlük masterclass ve çekim günü."),
            ],
            "egitmenler": [
                ("Ece Ertez", "Yürütücü; İngilizce sahne oyunculuğu ve metin çalışması."),
                ("Harika Uygur", "Cast direktörü; final masterclass ve çekim günü."),
            ],
            "baslangic": [("Taksim Pera", "3 Ekim Cumartesi · 11:00")],
            "fiyat": [("49.000 ₺", "/ 12 HAFTA")],
            "erken": "44.100 ₺",
            "tanisma": "19 Eylül Cumartesi · 17:00 · Taksim Pera — Kısa bir sahne çalışması ve programın anlatımı.",
            "sss": [
                ("İngilizcem yeterli mi?", "B1 ve üzeri yeterli — günlük hayatta kendinizi ifade edebiliyorsanız olur."),
                ("Başvuru için ne gerekiyor?", "Kısa bir özgeçmiş ya da kendinizi anlattığınız birkaç satır, bir de 1 dakikalık İngilizce video. Kamera kalitesi önemli değil."),
                ("Çekim gününde ne oluyor?", "Canlı performanslar izleniyor, kayıt altına alınıyor ve katılımcılara teslim ediliyor."),
                ("Bütçe nasıl işliyor?", "49.000 ₺. 10 Eylül'e kadar erken kayıtta %10 indirimle 44.100 ₺. Arkadaşınızla birlikte kayıtta ikinize de %10."),
            ],
        },
        "en": {
            "mekan": "PERA", "baslik": "ENGLISH ACTING PRAXIS",
            "slogan": "For actors who want to take their craft to an international stage.",
            "meta": ["Adults · 18+", "12 weeks", "Max 14 people", "B1 and above"],
            "amac": "Turning the language from a memorised line into the actor's own instrument.",
            "aciklama": "A twelve-week stop for anyone who wants to test their acting on international ground. You can be a working actor or a student still in training.\n\nTwo things train in parallel: the actor's instrument and command of the language. Text selection, character-building, rehearsal discipline — all in English.",
            "fazlar": [
                ("WEEKS 1–4", "Text & Character", "Text selection, analysis, character motivation. Subtext and scene intention."),
                ("WEEKS 5–8", "Rehearsal Process", "Partner work, blocking, scene dynamics."),
                ("WEEKS 9–12", "Masterclass & Filming", "Personal feedback. The program closes with a one-day masterclass and filming day led by casting director Harika Uygur."),
            ],
            "egitmenler": [
                ("Ece Ertez", "Lead instructor; acting and text work in English."),
                ("Harika Uygur", "Casting director; closing masterclass and filming day."),
            ],
            "baslangic": [("Taksim Pera", "Saturday, October 3 · 11:00")],
            "fiyat": [("49,000 TL", "/ 12 WEEKS")],
            "erken": "44,100 TL",
            "tanisma": "Saturday, September 19 · 17:00 · Taksim Pera — A short scene study and an outline of the program.",
            "sss": [
                ("Is my English good enough?", "B1 and above is enough — if you can express yourself in everyday life, you're fine."),
                ("What does the application need?", "A short CV or a few lines about yourself, plus a 1-minute video in English. Camera quality doesn't matter."),
                ("What happens on the filming day?", "Live performances are watched, recorded, and delivered to participants."),
                ("How does the budget work?", "49,000 TL. 44,100 TL with early registration until September 10. 10% off for two people together."),
            ],
        },
    },
    "youth": {
        "kod": "04", "dosya": "youth",
        "tr": {
            "mekan": "PERA & KADIKÖY", "baslik": "ENGLISH DRAMA YOUTH",
            "slogan": "Dil öğretmiyoruz. Dili deneyimliyoruz.",
            "meta": ["10–17 yaş", "8 ay · haftada 1 gün", "En fazla 12 kişi", "B1 ve üzeri · test yok"],
            "amac": "Okulda öğrenilen İngilizceyi konuşulan dile çevirmek ve sezonu seyirci önünde bir gösteriyle kapatmak.",
            "aciklama": "Bu bir İngilizce kursu değil. Kitap, sınav ve not yok; sahnede bir durumun içinde olmak ve cevap vermek var.\n\nÇocuğun İngilizcesini sıfırdan kurmuyoruz, var olan bilgisini konuşmaya çeviriyoruz. Gruplar yaşa göre ayrılır: 10–14 ve 15–17 ayrı sınıflarda çalışır.",
            "fazlar": [
                ("EKİM–ARALIK", "Keşif & Oyun", "Doğaçlama, beden-ses-hayal gücü egzersizleri. Grup dinamiği ve İngilizce dil güveni."),
                ("OCAK–MART", "Karakter & Metin", "Sahne metni çalışması, karakter inşası, partner çalışması."),
                ("NİSAN–MAYIS", "Final Gösterisi", "Prova süreci ve seyirci önünde İngilizce final performansı."),
            ],
            "egitmenler": [("Alara Lokum", "Oyuncu; anadil seviyesinde İngilizce, gençlerle sahne çalışması.")],
            "baslangic": [("Kadıköy", "3 Ekim Cumartesi"), ("Taksim Pera", "4 Ekim Pazar · 13:00")],
            "fiyat": [("99.000 ₺", "/ 8 AY")],
            "burs": "%25",
            "tanisma": "12 Eylül Cumartesi · 13:00 · Kadıköy — 13 Eylül Pazar · 13:00 · Taksim Pera. Veliler de katılabilir.",
            "sss": [
                ("Çocuğumun İngilizcesi yeterli mi?", "B1 ve üzeri öneriyoruz; sohbet edebiliyorsa yeterli. Seviye testi yok."),
                ("Gruplar yaşa göre ayrı mı?", "Evet. 10–14 ve 15–17 ayrı sınıflarda, ayrı günlerde çalışıyor."),
                ("Final gösterisi nasıl oluyor?", "Mayıs'ta, seyirci önünde, tamamı İngilizce. Sekiz ayın sonunda çocuk sahnede duruyor ve İngilizce konuşuyor."),
                ("Bütçe nasıl işliyor?", "8 aylık sezon 99.000 ₺. Başvuru değerlendirmesiyle %25'e varan burs. Kardeş ya da arkadaşıyla birlikte kayıtta ikisine de %10."),
            ],
        },
        "en": {
            "mekan": "PERA & KADIKÖY", "baslik": "ENGLISH DRAMA YOUTH",
            "slogan": "We don't teach the language. We make you live it.",
            "meta": ["Ages 10–17", "8 months · 1 day/week", "Max 12 people", "B1 and above · no test"],
            "amac": "Turning school English into spoken language, and closing the season with a performance in front of an audience.",
            "aciklama": "This is not an English course. No textbook, no exams, no grades — just being inside a situation on stage and having to answer.\n\nWe don't build your child's English from zero; we turn what they already know into speech. Groups are split by age: 10–14 and 15–17 work in separate classes.",
            "fazlar": [
                ("OCT–DEC", "Discovery & Play", "Improvisation and body–voice exercises. Group dynamics and confidence in English."),
                ("JAN–MAR", "Character & Text", "Scene text, character-building and partner work in English."),
                ("APR–MAY", "Final Showcase", "Rehearsal process and a final performance in English, in front of an audience."),
            ],
            "egitmenler": [("Alara Lokum", "Actor; native-level English, stage work with young people.")],
            "baslangic": [("Kadıköy", "Saturday, October 3"), ("Taksim Pera", "Sunday, October 4 · 13:00")],
            "fiyat": [("99,000 TL", "/ 8 MONTHS")],
            "burs": "25%",
            "tanisma": "Saturday, September 12 · 13:00 · Kadıköy — Sunday, September 13 · 13:00 · Taksim Pera. Parents are welcome.",
            "sss": [
                ("Is my child's English good enough?", "We recommend B1 and above; if they can hold a conversation, that's enough. No placement test."),
                ("Are the groups split by age?", "Yes. 10–14 and 15–17 work in separate classes on separate days."),
                ("What is the final showcase?", "In May, in front of an audience, entirely in English."),
                ("How does the budget work?", "99,000 TL for the 8-month season. Scholarship of up to 25% by application review. 10% off for a sibling or friend registering together."),
            ],
        },
    },
    "musical": {
        "kod": "05", "dosya": "musical",
        "tr": {
            "mekan": "KADIKÖY", "baslik": "TECHNE MUSİCAL LAB",
            "slogan": "Sahne. Ses. Hareket. — Seyircinin karşısında.",
            "meta": ["15–55 yaş", "8 ay · haftada 2 gün", "En fazla 12 kişi", "Kısa şarkı videosu"],
            "amac": "Oyunculuk, şan ve dansı tek bir sahne diline bağlamak ve sezon sonunda seyirci karşısına çıkmak.",
            "aciklama": "Drama ve tiyatro temelinin üzerine müzikal sahneleme eklenen 8 aylık program. Oyunculuk ve dramaturgik çalışmayla başlar, şan ve dansla sahne bütünlüğünü tamamlar. Dönem seyircili bir bitirme performansıyla kapanır.\n\nBaşvuru için bir müzikal ya da pop şarkının seslendirildiği kısa bir video yeterli; kabul video incelemesiyle yapılır.",
            "fazlar": [
                ("EKİM–ARALIK", "Drama & Oyunculuk", "Sahne varlığı, karakter inşası, dramaturgi. Şan tekniğiyle buluşan oyuncu sesi."),
                ("OCAK–MART", "Müzikal Sahneleme", "Müzikal ritim, Broadway dans temelleri. Drama zeminine oturan koreografi."),
                ("NİSAN–MAYIS", "Bitirme Performansı", "Şarkı kolajı değil, sahnelenmiş bir müzikal: kostüm, ışık, dekor, seyirci."),
            ],
            "egitmenler": [
                ("Köksal Ünal", "Koreograf; Broadway dansı ve sahne koreografisi."),
                ("Sitare Bilge", "Oyunculuk, ses ve şan eğitmeni; tiyatro müziği."),
            ],
            "baslangic": [("Kadıköy", "28 Eylül Pazartesi")],
            "fiyat": [("140.000 ₺", "/ 8 AY")],
            "burs": "%25",
            "tanisma": "12 Eylül Cumartesi · 18:30 · Kadıköy — Isınma, kısa bir şan ve hareket çalışması, programın anlatımı.",
            "sss": [
                ("Başvuru videosu nasıl olmalı?", "Bir müzikal ya da pop şarkısından 1–2 dakika; telefonla çekilmiş olması yeterli."),
                ("Dans ya da şan geçmişim yok.", "Program temelden başlıyor; kabul için yetenek değil, çalışma isteği ve potansiyele bakıyoruz."),
                ("Haftada iki gün hangi günler?", "Kayıt tamamlandığında grupla birlikte netleşiyor; akşam saatleri."),
                ("Bütçe nasıl işliyor?", "8 aylık sezon 140.000 ₺. Başvuru değerlendirmesiyle %25'e varan burs. Arkadaşınızla birlikte kayıtta ikinize de %10."),
            ],
        },
        "en": {
            "mekan": "KADIKÖY", "baslik": "TECHNE MUSICAL LAB",
            "slogan": "Stage. Voice. Movement. — In front of an audience.",
            "meta": ["Ages 15–55", "8 months · 2 days/week", "Max 12 people", "Short singing video"],
            "amac": "Binding acting, voice and dance into one stage language, and facing an audience at the end of the season.",
            "aciklama": "Eight months that build musical staging on a foundation of drama and theatre: acting and dramaturgy first, then voice and dance. The season closes with a graduating performance in front of an audience.\n\nTo apply, send a short video of yourself singing a musical or pop song — a phone recording is fine.",
            "fazlar": [
                ("OCT–DEC", "Drama & Acting", "Stage presence, character-building and dramaturgy. The actor's voice meeting vocal technique."),
                ("JAN–MAR", "Musical Staging", "Musical rhythm and Broadway dance fundamentals, built on a drama foundation."),
                ("APR–MAY", "Graduating Performance", "Not a song collage — a staged musical: costume, lighting, set, live audience."),
            ],
            "egitmenler": [
                ("Köksal Ünal", "Choreographer; Broadway dance and stage choreography."),
                ("Sitare Bilge", "Acting, voice and singing coach; theatre music."),
            ],
            "baslangic": [("Kadıköy", "Monday, September 28")],
            "fiyat": [("140,000 TL", "/ 8 MONTHS")],
            "burs": "25%",
            "tanisma": "Saturday, September 12 · 18:30 · Kadıköy — A warm-up, a short singing and movement session, and an outline of the program.",
            "sss": [
                ("What should the application video be?", "1–2 minutes of a musical or pop song; a phone recording is fine."),
                ("I have no dance or singing background.", "The program starts from the basics; we look for willingness and potential, not talent."),
                ("Which two days of the week?", "Set with the group once registration closes; evening hours."),
                ("How does the budget work?", "140,000 TL for the 8-month season. Scholarship of up to 25% by application review. 10% off for two people together."),
            ],
        },
    },
    "broadway": {
        "kod": "06", "dosya": "broadway",
        "tr": {
            "mekan": "KADIKÖY & TAKSİM", "baslik": "BROADWAY MUSICAL DANCE",
            "slogan": "Jazz · Theatre Dance · Koreografi",
            "meta": ["12–55 yaş", "12 ya da 6 hafta", "En fazla 15 kişi", "Deneyim gerekmiyor"],
            "amac": "Broadway müzikal tiyatrosunun dans dilini teknik temelden kurmak.",
            "aciklama": "Jazz ve theatre dance teknikleriyle sahne koreografisi ve kombinasyon çalışması. Dans ettiğiniz değil, sahnede var olduğunuz bir program.\n\nİki seçenek var: 12 haftalık tam program ya da 6 haftalık kısa program. Dans deneyimi şart değil — teknik temelden başlıyoruz.",
            "fazlar": [
                ("1–4. HAFTA", "Teknik Temel", "Jazz ve theatre dance temelleri. Beden hizalaması, ritim, koordinasyon."),
                ("5–8. HAFTA", "Koreografi & Stil", "Broadway repertuvarından sahneler. Stil çalışması, grup koreografisi."),
                ("9–12. HAFTA", "İleri Koreografi", "Uzun kombinasyonlar, tempo ve senkron çalışması."),
            ],
            "egitmenler": [("Köksal Ünal", "Oyuncu, yönetmen ve Broadway dans eğitmeni.")],
            "baslangic": [("Kadıköy", "1 Ekim Perşembe"), ("Taksim Pera", "3 Ekim Cumartesi · 19:00")],
            "fiyat": [("16.500 ₺", "/ 12 HAFTA"), ("9.500 ₺", "/ 6 HAFTA")],
            "erken": "14.850 ₺",
            "tanisma": "12 Eylül Cumartesi · 18:30 · Kadıköy — 19 Eylül Cumartesi · 19:00 · Taksim Pera. Isınma ve kısa bir kombinasyon.",
            "sss": [
                ("Hiç dans etmedim.", "Sorun değil. Teknik temelden başlıyoruz; grubun büyük kısmı da öyle."),
                ("Ne giymeliyim?", "Rahat kıyafet ve hareket edebileceğiniz bir ayakkabı yeterli."),
                ("6 hafta mı 12 hafta mı?", "6 hafta tadına bakmak için; 12 hafta bir koreografiyi baştan sona kurmak için."),
                ("Bütçe nasıl işliyor?", "12 hafta 16.500 ₺, 6 hafta 9.500 ₺. Erken kayıtta %10 indirimle 12 hafta 14.850 ₺. Arkadaşınızla birlikte kayıtta ikinize de %10."),
            ],
        },
        "en": {
            "mekan": "KADIKÖY & TAKSİM", "baslik": "BROADWAY MUSICAL DANCE",
            "slogan": "Jazz · Theatre Dance · Choreography",
            "meta": ["Ages 12–55", "12 or 6 weeks", "Max 15 people", "No experience needed"],
            "amac": "Building the dance language of Broadway musical theatre from technical fundamentals.",
            "aciklama": "Stage choreography and combination work through jazz and theatre dance technique. A program about existing on stage, not just dancing.\n\nTwo options: the full 12-week program or a 6-week short program. No dance experience required.",
            "fazlar": [
                ("WEEKS 1–4", "Technical Fundamentals", "Jazz and theatre dance basics: alignment, rhythm, coordination."),
                ("WEEKS 5–8", "Choreography & Style", "Scenes from the Broadway repertoire. Style and group choreography."),
                ("WEEKS 9–12", "Advanced Choreography", "Long combinations and synchronisation — one choreography, start to finish."),
            ],
            "egitmenler": [("Köksal Ünal", "Actor, director and Broadway dance instructor.")],
            "baslangic": [("Kadıköy", "Thursday, October 1"), ("Taksim Pera", "Saturday, October 3 · 19:00")],
            "fiyat": [("16,500 TL", "/ 12 WEEKS"), ("9,500 TL", "/ 6 WEEKS")],
            "erken": "14,850 TL",
            "tanisma": "Saturday, September 12 · 18:30 · Kadıköy — Saturday, September 19 · 19:00 · Taksim Pera. A warm-up and a short combination.",
            "sss": [
                ("I've never danced.", "That's fine. We start from technical fundamentals; most of the group does too."),
                ("What should I wear?", "Comfortable clothes and shoes you can move in."),
                ("6 weeks or 12?", "6 weeks to get a taste; 12 weeks to build a choreography from start to finish."),
                ("How does the budget work?", "12 weeks 16,500 TL, 6 weeks 9,500 TL. 14,850 TL for 12 weeks with early registration. 10% off for two people together."),
            ],
        },
    },
}

SIRA = ["auteur", "edl", "praxis", "youth", "musical", "broadway"]

CSS = """
@page { size: A4; margin: 14mm 15mm 12mm 15mm; }
* { box-sizing: border-box; }
body { font-family: "DejaVu Sans", sans-serif; color: #14140f; font-size: 8.6pt; line-height: 1.5; margin: 0; }
.ust { display: flex; justify-content: space-between; border-bottom: 1.4pt solid #14140f;
       padding-bottom: 4pt; font-size: 6.6pt; letter-spacing: 0.22em; font-weight: 700; }
.ust .sag { color: #6b6b5e; font-weight: 400; }
.sezon { font-size: 6.4pt; letter-spacing: 0.5em; color: #6b6b5e; margin: 16pt 0 6pt; }
h1 { font-family: "DejaVu Serif", serif; font-size: 25pt; letter-spacing: 0.01em; margin: 0 0 4pt; line-height: 1; }
.slogan { font-style: italic; color: #4a4a42; font-size: 9.4pt; margin-bottom: 14pt; }
.meta { display: flex; gap: 6pt; border-top: 0.6pt solid #d8d8ce; border-bottom: 0.6pt solid #d8d8ce;
        padding: 7pt 0; margin-bottom: 12pt; }
.meta div { flex: 1; }
.meta .k { font-size: 5.8pt; letter-spacing: 0.2em; color: #8a8a7d; margin-bottom: 2.5pt; }
.meta .v { font-size: 8.2pt; font-weight: 700; }
.amac { border-left: 2.2pt solid #C8FF00; background: #fafaf5; padding: 7pt 9pt; margin-bottom: 10pt; }
.amac .k { font-size: 5.8pt; letter-spacing: 0.2em; color: #8a8a7d; margin-bottom: 3pt; }
.aciklama p { margin: 0 0 6pt; }
h2 { font-size: 6.4pt; letter-spacing: 0.32em; color: #14140f; font-weight: 700;
     margin: 14pt 0 7pt; padding-bottom: 3pt; border-bottom: 0.6pt solid #d8d8ce; }
.fazlar { display: flex; gap: 9pt; }
.fazlar > div { flex: 1; }
.fazlar .sp { font-size: 5.8pt; letter-spacing: 0.16em; color: #8a8a7d; margin-bottom: 3pt; }
.fazlar .bs { font-family: "DejaVu Serif", serif; font-size: 9.6pt; margin-bottom: 3pt; }
.fazlar .gv { font-size: 7.6pt; color: #4a4a42; line-height: 1.45; }
.egit { display: flex; margin-bottom: 4pt; }
.egit .ad { width: 33%; font-weight: 700; }
.egit .rol { flex: 1; color: #4a4a42; }
.alt { display: flex; gap: 16pt; margin-top: 14pt; }
.alt > div { flex: 1; }
.bas-sat { display: flex; margin-bottom: 3pt; }
.bas-sat .yer { width: 42%; font-weight: 700; }
.fiy { display: flex; align-items: baseline; gap: 5pt; margin-bottom: 2pt; }
.fiy .r { font-family: "DejaVu Serif", serif; font-size: 15pt; }
.fiy .b { font-size: 5.8pt; letter-spacing: 0.16em; color: #8a8a7d; }
.ind { display: flex; justify-content: space-between; gap: 10pt; font-size: 7.4pt;
       border-top: 0.6pt solid #e6e6dc; padding-top: 3pt; margin-top: 5pt; }
.ind .d { color: #4a4a42; }
.ind .v { font-weight: 700; text-align: right; white-space: nowrap; }
.taksit { font-size: 6.8pt; color: #8a8a7d; margin-top: 5pt; line-height: 1.4; }
.tanisma { border: 0.8pt solid #14140f; padding: 8pt 10pt; margin-top: 14pt; display: flex; gap: 12pt; }
.tanisma .et { font-size: 6.2pt; letter-spacing: 0.2em; font-weight: 700; width: 24%; padding-top: 1pt; }
.tanisma .mt { flex: 1; font-size: 8pt; }
.dip { display: flex; justify-content: space-between; border-top: 0.6pt solid #d8d8ce;
       margin-top: 14pt; padding-top: 5pt; font-size: 6.8pt; color: #6b6b5e; }
.adimlar { display: flex; gap: 10pt; }
.adimlar > div { flex: 1; }
.adimlar .n { font-family: "DejaVu Serif", serif; font-size: 13pt; color: #C8B400; margin-bottom: 3pt; }
.adimlar .bs { font-weight: 700; margin-bottom: 2.5pt; }
.adimlar .gv { font-size: 7.6pt; color: #4a4a42; line-height: 1.45; }
.sss div.q { margin-bottom: 7pt; }
.sss .s { font-weight: 700; margin-bottom: 1.5pt; }
.sss .c { color: #4a4a42; }
.notk { background: #fafaf5; border-left: 2.2pt solid #C8FF00; padding: 7pt 9pt;
        margin-top: 12pt; font-size: 7.8pt; color: #4a4a42; }
.formk { display: flex; justify-content: space-between; border-top: 1.4pt solid #14140f;
         margin-top: 14pt; padding-top: 5pt; font-size: 7.4pt; }
.formk .et { font-size: 6.2pt; letter-spacing: 0.2em; font-weight: 700; }
"""


def sayfa1(p, d, t, kod):
    meta = "".join(f'<div><div class="k">{k}</div><div class="v">{v}</div></div>'
                   for k, v in zip(t["meta"], d["meta"]))
    fazlar = "".join(f'<div><div class="sp">{s}</div><div class="bs">{b}</div><div class="gv">{g}</div></div>'
                     for s, b, g in d["fazlar"])
    egit = "".join(f'<div class="egit"><div class="ad">{a}</div><div class="rol">{r}</div></div>'
                   for a, r in d["egitmenler"])
    bas = "".join(f'<div class="bas-sat"><div class="yer">{y}</div><div>{tar}</div></div>'
                  for y, tar in d["baslangic"])
    fiy = "".join(f'<div class="fiy"><div class="r">{r}</div><div class="b">{b}</div></div>'
                  for r, b in d["fiyat"])
    ind = ""
    if d.get("erken"):
        ind += f'<div class="ind"><div class="d">{t["erken"]}</div><div class="v">{d["erken"]}</div></div>'
    if d.get("burs"):
        ind += f'<div class="ind"><div class="d">{t["burs"]}</div><div class="v">{d["burs"]}</div></div>'
    oran = "%10" if t is ORTAK_TR else "10%"
    ind += f'<div class="ind"><div class="d">{t["arkadas"]}</div><div class="v">{oran}</div></div>'
    aciklama = "".join(f"<p>{par}</p>" for par in d["aciklama"].split("\n\n"))
    return f"""
<div class="ust"><div>TECHNE LAB · İSTANBUL</div>
  <div class="sag">PROGRAM {kod} / 06 &nbsp;&nbsp; {d["mekan"]}</div></div>
<div class="sezon">{t["sezon"]}</div>
<h1>{d["baslik"]}</h1>
<div class="slogan">{d["slogan"]}</div>
<div class="meta">{meta}</div>
<div class="amac"><div class="k">{t["amac"]}</div>{d["amac"]}</div>
<div class="aciklama">{aciklama}</div>
<h2>{t["isleyis"]}</h2>
<div class="fazlar">{fazlar}</div>
<h2>{t["egitmen"]}</h2>
{egit}
<div class="alt">
  <div><h2 style="margin-top:0">{t["baslangic"]}</h2>{bas}</div>
  <div><h2 style="margin-top:0">{t["ucret"]}</h2>{fiy}{ind}
    <div class="taksit">{t["taksit"]}</div></div>
</div>
<div class="tanisma"><div class="et">{t["tanisma"]}</div><div class="mt">{d["tanisma"]}</div></div>
<div class="dip"><div>{t["kayit_alt"]}</div><div>{TEL} &nbsp;·&nbsp; {IG}</div></div>
"""


def sayfa2(p, d, t):
    adimlar = "".join(
        f'<div><div class="n">0{i+1}</div><div class="bs">{b}</div><div class="gv">{g}</div></div>'
        for i, (b, g) in enumerate(t["adimlar"]))
    sss = "".join(f'<div class="q"><div class="s">{s}</div><div class="c">{c}</div></div>'
                  for s, c in d["sss"])
    return f"""
<div style="page-break-before: always"></div>
<div class="ust"><div>TECHNE LAB · İSTANBUL</div>
  <div class="sag">{d["baslik"]} &nbsp;&nbsp; {t["sss_baslik"]}</div></div>
<h2 style="margin-top:16pt">{t["kayit_baslik"]}</h2>
<div class="adimlar">{adimlar}</div>
<h2>{t["sss_baslik"]}</h2>
<div class="sss">{sss}</div>
<div class="notk">{t["not"]}</div>
<div class="formk"><div class="et">{t["form_etiket"]}</div><div>{FORM}</div></div>
"""


def uret(anahtar, dil):
    p = PROGRAMLAR[anahtar]
    d = p[dil]
    t = ORTAK_TR if dil == "tr" else ORTAK_EN
    html = f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>" \
           f"{sayfa1(p, d, t, p['kod'])}{sayfa2(p, d, t)}</body></html>"
    ad = p["dosya"] + ("" if dil == "tr" else "-en") + ".pdf"
    HTML(string=html).write_pdf(CIKTI / ad)
    return ad


def uret_tum(dil):
    t = ORTAK_TR if dil == "tr" else ORTAK_EN
    parcalar = []
    for i, k in enumerate(SIRA):
        p = PROGRAMLAR[k]
        d = p[dil]
        if i:
            parcalar.append('<div style="page-break-before: always"></div>')
        parcalar.append(sayfa1(p, d, t, p["kod"]))
    html = f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>" \
           f"{''.join(parcalar)}</body></html>"
    ad = "all.pdf" if dil == "tr" else "all-en.pdf"
    HTML(string=html).write_pdf(CIKTI / ad)
    return ad


if __name__ == "__main__":
    CIKTI.mkdir(parents=True, exist_ok=True)
    for dil in ("tr", "en"):
        for k in SIRA:
            print("✓", uret(k, dil))
        print("✓", uret_tum(dil))
