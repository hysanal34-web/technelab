# -*- coding: utf-8 -*-
"""English Drama Youth · 8 aylık program çizelgesi · TR + EN, tek sayfa A4."""
from weasyprint import HTML
from pypdf import PdfReader
import subprocess, os

CSS = r"""
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --bg:#0A0A0C; --bgAlt:#121215; --fg:#F2F2ED; --stone:#9C9C96; --dim:#5A5A5E; --line:#26262B; --neon:#C8FF00; --ink:#0A0A0C; }
html, body { background: var(--bg); color: var(--fg); height: 297mm; overflow: hidden; }
body { width: 210mm; font-family: "Liberation Sans","DejaVu Sans",Arial,sans-serif; font-size: 7.7pt; line-height: 1.34; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.d { font-family: "Liberation Sans Narrow","Nimbus Sans Narrow","Arial Narrow",Impact,sans-serif; font-weight: 700; text-transform: uppercase; line-height: 0.95; letter-spacing: 0.005em; }
.m { font-family: "Liberation Mono","DejaVu Sans Mono",monospace; text-transform: uppercase; letter-spacing: 0.14em; font-size: 6.2pt; }
.neon { color: var(--neon); } .stone { color: var(--stone); } .dim { color: var(--dim); }

.page { width: 210mm; height: 297mm; padding: 8mm 12mm 8mm; display: flex; flex-direction: column; }
.rule { height: 2px; background: var(--neon); }

/* header */
.hd { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 10mm; padding: 3.5mm 0 3.5mm; border-bottom: 1px solid var(--line); }
.hd .eyebrow { color: var(--neon); margin-bottom: 2.4mm; }
.hd h1 { font-size: 40pt; }
.hd .sub { font-size: 9.6pt; color: var(--fg); margin-top: 2.6mm; max-width: 118mm; line-height: 1.35; }
.hd .meta { text-align: right; color: var(--stone); line-height: 2; padding-bottom: 0.5mm; }
.hd .meta b { color: var(--fg); font-weight: 400; }

/* facts */
.facts { display: grid; grid-template-columns: repeat(5, 1fr); border-bottom: 1px solid var(--line); }
.facts > div { padding: 2.8mm 3mm 2.8mm 0; border-right: 1px solid var(--line); margin-right: 3mm; }
.facts > div:last-child { border-right: 0; margin-right: 0; }
.facts .v { font-size: 12.5pt; white-space: nowrap; }
.facts .l { margin-top: 1.1mm; color: var(--stone); }

/* body */
.bd { display: grid; grid-template-columns: 54mm 1fr; gap: 6mm; flex: 1; min-height: 0; padding-top: 4.5mm; }
.sec + .sec { margin-top: 4mm; }
.sec .eyebrow { color: var(--neon); margin-bottom: 1.6mm; }
.sec h2 { font-size: 13pt; margin-bottom: 2.4mm; }

.steps { display: grid; gap: 2.2mm; }
.step { display: grid; grid-template-columns: 7mm 1fr; gap: 1.5mm; align-items: start; }
.step .n { color: var(--neon); padding-top: 0.5mm; }
.step b { display: block; color: var(--fg); margin-bottom: 0.3mm; }
.step span { color: var(--stone); }

.team { border-top: 1px solid var(--line); }
.team > div { display: block; padding: 1.7mm 0; border-bottom: 1px solid var(--line); }
.team .nm { font-size: 10.5pt; display: block; }
.team .rl { color: var(--neon); display: block; margin-top: 0.5mm; }

.note { border-left: 2px solid var(--neon); padding-left: 3mm; }
.note p { position: relative; color: var(--fg); margin-bottom: 1.5mm; }
.note p:last-child { margin-bottom: 0; }
.note p span { color: var(--stone); }

/* timeline table */
.tl { width: 100%; border-collapse: collapse; border-spacing: 0; table-layout: fixed; }
.tl th { text-align: left; color: var(--stone); font-weight: 400; padding: 0 2.5mm 2mm 0; border-bottom: 1px solid var(--neon); vertical-align: bottom; }
.tl th:first-child { padding-left: 0; }
.tl td { vertical-align: top; padding: 2mm 3mm 2mm 0; border-bottom: 1px solid var(--line); }
.tl tr:last-child td { border-bottom: 0; }
.tl .mo { width: 18mm; }
.tl .mo .num { color: var(--dim); }
.tl .mo .nm { font-size: 11pt; margin-top: 0.6mm; letter-spacing: 0; }
.tl .mo .tag { display: inline-block; margin-top: 1.3mm; border: 1px solid var(--neon); color: var(--neon); padding: 0.3mm 1.2mm; font-size: 5.6pt; }
.tl .core b { display: block; color: var(--neon); margin-bottom: 0.5mm; }
.tl .ws { width: 50mm; }
.tl .ws b { display: block; color: var(--fg); margin-bottom: 0.4mm; }
.tl .ws span { color: var(--stone); }
.tl tr.final { background: var(--neon); } .tl tr.final td { background: transparent; color: var(--ink); border: 0; }
.tl tr.final .mo .num, .tl tr.final .ws span { color: rgba(10,10,12,0.62); }
.tl tr.final .core b, .tl tr.final .ws b, .tl tr.final .mo .nm { color: var(--ink); }
.tl tr.final .mo .tag { border-color: var(--ink); color: var(--ink); }
.tl tr.final td:first-child { padding-left: 2.5mm; } .tl tr.final { outline: 0; }

/* footer */
.ft { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 3mm; margin-top: 4mm; }
.ft .brand { font-size: 11pt; }
.ft .q { color: var(--stone); font-style: italic; font-size: 8pt; }
"""

TR = dict(
  lang="tr", title_html='English Drama<br><span class="neon">Youth</span>',
  eyebrow="Techne Lab İstanbul · 2026–27 Sezonu",
  sub="10–17 yaş için Türkiye'nin ilk İngilizce drama ve yaratıcılık programı. Sekiz aylık program çizelgesi ve işleyiş.",
  meta=["<b>10–17 yaş</b> · iki ayrı grup", "Program dili · <b>İngilizce</b>", "Pera &amp; Kadıköy · İstanbul"],
  facts=[("8 Ay","Ekim – Mayıs"),("Haftada 1 Gün","10–14 · 15–17 ayrı grup"),("Kadıköy · Pera","Cumartesi · Pazar 13:00"),("12 Kişi","Maksimum grup"),("Yıl Sonu Gösterisi","Mayıs · seyircili · İngilizce")],
  how_eb="İşleyiş", how_h="Nasıl işliyor",
  steps=[
    ("İlk üç hafta: drama.","Alara Lokum ile yaratıcı drama, doğaçlama, bireysel ve ensemble çalışmalar. İngilizce kitapta değil, sahnede kullanılır."),
    ("Son hafta: konuk atölye.","Yaratıcı yazarlık, tasarım ve jazz dance dönüşümlü gelir. Her atölye, bir sonraki buluşmaya küçük bir üretim ödeviyle kapanır."),
    ("Üretimler gösteriye dönüşür.","Çocukların metinleri, tasarımları ve hareket parçaları sanatçılar tarafından yeniden ele alınır ve gösterinin malzemesi olur."),
    ("Prova ve gösteri.","Provalar 4. ayın sonunda başlar. Sezon, 8. ayın sonunda seyircili ve tamamen İngilizce bir gösteriyle kapanır."),
  ],
  team_eb="Kadro", team_h="Ekip",
  team=[("Alara Lokum","Ana eğitmen · Drama"),("Itır Karabulut","Yaratıcı yazarlık"),("Özge Dağ","Tasarım · Jazz dance")],
  note_eb="Velilere not",
  notes=[
    "Seviye tespit sınavı yok. <span>Ailenin dil beyanı yeterli; günlük hayatta kendini rahatça ifade edebiliyorsa (B1 ve üzeri) uygundur.</span>",
    "Kitap, sınav ve not yok. <span>Aradığımız mükemmel İngilizce değil, hata yapma özgürlüğü.</span>",
  ],
  tl_eb="Ekim – Mayıs", tl_h="8 Aylık Çizelge",
  th=["Ay","Drama ekseni · Alara Lokum","Ayın son haftası · Konuk atölye ve ödev"],
  rehearsal="Prova", final="Final",
  months=[
    ("01","Ekim",None,"Tanışma ve oyun","Grup dinamiği, güven, doğaçlama oyunları. İngilizceyi ilk kez sahnede kullanma.","Yaratıcı Yazarlık · Itır Karabulut","Ödev: kendi karakterine kısa bir hikâye yaz."),
    ("02","Kasım",None,"Beden, ses, hayal gücü","Beden ve ses egzersizleri, hikâye anlatımı, bireysel doğaçlama.","Tasarım · Özge Dağ","Karakter ve maske tasarımı. Ödev: kendi maskeni ve karakter eskizini tamamla."),
    ("03","Aralık",None,"Doğaçlama sahneler","Ensemble doğaçlamaları, durum çalışmaları, partnerle oynama.","Jazz Dance · Özge Dağ","Ritim ve ensemble hareket. Ödev: grubunla kısa bir hareket cümlesi kur."),
    ("04","Ocak",None,"Karakter ve metin","İngilizce sahne metni, karakter inşası, partner çalışması.","Yaratıcı Yazarlık · Itır Karabulut","Sahne yazımı. Ay sonunda tüm üretimler sanatçılara gider: gösteri malzemesinin ilk derlemesi."),
    ("05","Şubat","r","Prova başlıyor","Çocukların üretimlerinden seçilen sahnelerle ilk provalar; drama çalışması sürer.","Tasarım · Özge Dağ","Dekor ve kostüm eskizleri. Ödev: kendi sahnen için bir tasarım önerisi."),
    ("06","Mart","r","Sahneleme","Sahne geçişleri, ensemble sahneleri, karakter derinleşmesi. Gösterinin iskeleti kurulur.","Jazz Dance · Özge Dağ","Gösteri koreografisi. Ödev: koreografiyi grubunla tekrar et."),
    ("07","Nisan","r","Bütünleme","Akış provaları. Metin, tasarım ve hareket tek gösteride birleşir.","Ortak atölye · Tüm ekip","Alara Lokum, Itır Karabulut ve Özge Dağ ile ortak prova atölyesi."),
    ("08","Mayıs","f","Yıl sonu gösterisi","Genel prova, teknik prova ve seyircili, tamamen İngilizce yıl sonu gösterisi.","Aileler ve seyirci davetli","Tarih ve mekân sezon içinde velilerle paylaşılacak."),
  ],
  foot_q="Dil öğretmiyoruz. Dili deneyimliyoruz.", foot_r="technelabistanbul.com · Pera &amp; Kadıköy",
)

EN = dict(
  lang="en", title_html='English Drama<br><span class="neon">Youth</span>',
  eyebrow="Techne Lab Istanbul · 2026–27 Season",
  sub="Turkey's first English-language drama and creativity programme for ages <span style=\"white-space:nowrap\">10–17</span>. Eight-month schedule and how it works.",
  meta=["<b>Ages 10–17</b> · two separate groups", "Programme language · <b>English</b>", "Pera &amp; Kadıköy · Istanbul"],
  facts=[("8 Months","October – May"),("1 Day a Week","10–14 · 15–17 separate groups"),("Kadıköy · Pera","Saturday · Sunday 13:00"),("12 Students","Maximum group size"),("Year-End Show","May · live audience · in English")],
  how_eb="Format", how_h="How it works",
  steps=[
    ("First three weeks: drama.","Creative drama, improvisation, individual and ensemble work with Alara Lokum. English is used on stage, not in a textbook."),
    ("Last week: guest workshop.","Creative writing, design and jazz dance rotate. Each workshop closes with a small creative assignment for the next meeting."),
    ("The work becomes the show.","The children's texts, designs and movement pieces are reworked by the artists and become the material of the year-end show."),
    ("Rehearsal and performance.","Rehearsals begin at the end of month four. The season closes in month eight with a live, all-English year-end show."),
  ],
  team_eb="Faculty", team_h="The Team",
  team=[("Alara Lokum","Lead instructor · Drama"),("Itır Karabulut","Creative writing"),("Özge Dağ","Design · Jazz dance")],
  note_eb="A note for parents",
  notes=[
    "No placement test. <span>A parent's statement is enough; comfortable everyday English (B1 and above) is all it takes.</span>",
    "No textbooks, exams or grades. <span>Not perfect English, but the freedom to make mistakes in it.</span>",
  ],
  tl_eb="October – May", tl_h="8-Month Schedule",
  th=["Month","Drama track · Alara Lokum","Last week of the month · Guest workshop and assignment"],
  rehearsal="Rehearsal", final="Final",
  months=[
    ("01","October",None,"Meeting and play","Group dynamics, trust, improvisation games. Using English on stage for the first time.","Creative Writing · Itır Karabulut","Assignment: write a short story for your own character."),
    ("02","November",None,"Body, voice, imagination","Body and voice exercises, storytelling, solo improvisation.","Design · Özge Dağ","Character and mask design. Assignment: finish your own mask and character sketch."),
    ("03","December",None,"Improvised scenes","Ensemble improvisation, situation work, playing with a partner.","Jazz Dance · Özge Dağ","Rhythm and ensemble movement. Assignment: build a short movement phrase with your group."),
    ("04","January",None,"Character and text","English stage text, building a character, partner work.","Creative Writing · Itır Karabulut","Scene writing. At month's end all the work goes to the artists: the first draft of the show material."),
    ("05","February","r","Rehearsals begin","First rehearsals with scenes chosen from the children's work; drama work continues.","Design · Özge Dağ","Set and costume sketches. Assignment: a design proposal for your own scene."),
    ("06","March","r","Staging","Transitions, ensemble scenes, deepening the characters. The show takes shape.","Jazz Dance · Özge Dağ","Show choreography. Assignment: rehearse the choreography with your group."),
    ("07","April","r","Putting it together","Run-throughs. Text, design and movement come together in a single show.","Joint workshop · Whole team","Joint rehearsal workshop with Alara Lokum, Itır Karabulut and Özge Dağ."),
    ("08","May","f","Year-end show","Dress rehearsal, technical rehearsal and the year-end show, entirely in English, in front of a live audience.","Families and audience invited","Date and venue will be shared with parents during the season."),
  ],
  foot_q="We don't teach the language. We experience it.", foot_r="technelabistanbul.com · Pera &amp; Kadıköy",
)

def render(T):
    facts = "".join(f'<div><div class="v d">{v}</div><div class="l m">{l}</div></div>' for v,l in T["facts"])
    steps = "".join(f'<div class="step"><div class="n m">0{i+1}</div><div><b>{b}</b><span>{s}</span></div></div>' for i,(b,s) in enumerate(T["steps"]))
    team = "".join(f'<div><span class="nm d">{n}</span><span class="rl m">{r}</span></div>' for n,r in T["team"])
    notes = "".join(f'<p>{n}</p>' for n in T["notes"])
    rows = []
    for num,name,phase,ttl,core,who,hw in T["months"]:
        cls = ' class="final"' if phase=="f" else ""
        tag = ""
        if phase=="r": tag = f'<div class="tag m">{T["rehearsal"]}</div>'
        if phase=="f": tag = f'<div class="tag m">{T["final"]}</div>'
        rows.append(f'''<tr{cls}>
          <td class="mo"><div class="num m">{num}</div><div class="nm d">{name}</div>{tag}</td>
          <td class="core"><b>{ttl}</b>{core}</td>
          <td class="ws"><b>{who}</b><span>{hw}</span></td></tr>''')
    meta = "".join(f'<div>{x}</div>' for x in T["meta"])
    th = "".join(f'<th class="m">{x}</th>' for x in T["th"])
    return f'''<!DOCTYPE html><html lang="{T["lang"]}"><head><meta charset="utf-8"><title>English Drama Youth · Techne Lab İstanbul</title><style>{CSS}</style></head>
<body><div class="page">
  <div class="rule"></div>
  <div class="hd">
    <div>
      <div class="eyebrow m">{T["eyebrow"]}</div>
      <h1 class="d">{T["title_html"]}</h1>
      <p class="sub">{T["sub"]}</p>
    </div>
    <div class="meta m">{meta}</div>
  </div>
  <div class="facts">{facts}</div>
  <div class="bd">
    <div class="side">
      <div class="sec"><div class="eyebrow m">{T["how_eb"]}</div><h2 class="d">{T["how_h"]}</h2><div class="steps">{steps}</div></div>
      <div class="sec"><div class="eyebrow m">{T["team_eb"]}</div><h2 class="d">{T["team_h"]}</h2><div class="team">{team}</div></div>
      <div class="sec"><div class="eyebrow m">{T["note_eb"]}</div><div class="note">{notes}</div></div>
    </div>
    <div class="main">
      <div class="sec"><div class="eyebrow m">{T["tl_eb"]}</div><h2 class="d">{T["tl_h"]}</h2>
        <table class="tl"><colgroup><col style="width:20mm"><col><col style="width:45mm"></colgroup><thead><tr>{th}</tr></thead><tbody>{"".join(rows)}</tbody></table>
      </div>
    </div>
  </div>
  <div class="ft">
    <span class="brand d">Techne <span class="neon">Lab</span> İstanbul</span>
    <span class="q">{T["foot_q"]}</span>
    <span class="m stone">{T["foot_r"]}</span>
  </div>
</div></body></html>'''

OUT = "/sessions/trusting-funny-curie/mnt/outputs"
for T, name in [(TR,"EDY-8-Aylik-Program-Cizelgesi-TR"),(EN,"EDY-8-Month-Programme-Schedule-EN")]:
    html = render(T)
    hp = os.path.join(OUT, name+".html"); pp = os.path.join(OUT, name+".pdf")
    open(hp,"w",encoding="utf-8").write(html)
    HTML(hp).write_pdf(pp)
    n = len(PdfReader(pp).pages)
    subprocess.run(["pdftoppm","-png","-r","110","-f","1","-l","1",pp,os.path.join(OUT,name+"-preview")],check=True)
    print(name, "sayfa:", n)
