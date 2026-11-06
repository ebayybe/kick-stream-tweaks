<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · **Hrvatski** · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream podešavanja — Dnevnik promjena

Napomene o izdanju za [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), korisničku skriptu koja pamti postavke igrača Kick i dodaje podesivu upravljačku ploču.

## v1.3.1 — 2026-11-06

> Učvršćivanje izgleda za svaki jezik i veličinu teksta, doista poseban minimalistički stil, nagrade i pomoćnici u rasporedu, alarm za zamrzavanje igrača i pametniji zadani jezik.

### Dodano

- **Alarm za zamrzavanje igrača.** Detektuje zaustavljeni igrač ili crni ekran (vrijeme videozapisa koje se kreće bez dekodiranih okvira), reproducira glasan zvuk alarma i prikazuje obavijest, čak i kada je kartica minimizirana. Podesivo vrijeme detekcije (5–60 s), neovisno uključivanje zvuka i gumb za testiranje.
- **Automatsko traženje nagrada** (isključeno prema zadanim postavkama): otvara prozor s nagradama, traži ono što je dostupno, ponovno ga zatvara i vraća se na stream. Dobici koji se pojavljuju na ploči s nagradama također se traže. Uključuje gumb *Zatraži sada*.
- **Raspored nagrađivanja.** Prema zadanim postavkama skripta čeka Kickovu vlastitu obavijest o "preuzmi svoju nagradu" i preuzima je odmah (s izbornom odgodom od 0–60 s), umjesto anketiranja. Dostupan je i zakazani način rada (svakih 5–60 min).
- **Gumb za brzo preuzimanje.** Mali plutajući gumb na streamu koji traži vašu nagradu jednim klikom. Povucite ga bilo gdje (pozicija se pamti), odaberite jedan od četiri dizajna (Kugla, Pilula, Staklo, Ravno), pet ugrađenih ikona, veličinu i neprozirnost, po želji ga prikažite samo kada je nagrada dostupna. Svijetli i pokazuje točku kada se pojavi Kickova obavijest o nagradi. Stranica postavki ima pregled uživo.
- **Vaša vlastita ikona.** Učitajte PNG, JPG, WebP, GIF ili SVG (do 2 MB) kao ikonu gumba, po želji ispunjavajući cijeli gumb. Slika se ponovno kodira u mali kvadrat i pohranjuje samo u vašem pregledniku.
- **Kotačić miša na klizačima.** Svaki klizač može se podešavati kotačićem miša dok lebdite nad njim, bez pomicanja ploče.
- **Referenca funkcije.** Novi `en_FUNCTIONS.md` dokumentira arhitekturu, svaku postavku, svaku funkciju i dijelove Kickove stranice o kojima skripta ovisi.
- **Vođeno spremanje kanala.** Kartica korak po korak "Kako funkcioniraju spremljeni kanali", jedan gumb **Spremi ovaj kanal** koji pohranjuje trenutnu kvalitetu, glasnoću, brzinu i zvuk za kanal koji gledate, savjet jednim klikom u reprodukciji za nespremljene kanale, potvrdni tost, označeni gumbi *Uredi* / *Gotovo* na popisu i prekidač za pauziranje spremljenih postavki bez njihovog brisanja.
- **Tiha reprodukcija.** Utišava stream bez isključivanja zvuka playera, tako da se nastavlja reproducirati u kartici u pozadini. Radi globalno i po spremljenom kanalu (na popisu kanala prikazana je oznaka *Tiho*).
- **Višejezično pretraživanje postavki.** Pretraživanje je neosjetljivo na naglaske i također odgovara engleskim nazivima, tako da upisivanjem `volume` pronalazite postavku na bilo kojem jeziku sučelja. Pretraživanje po odjeljku ili naslovu kartice prikazuje cijeli odjeljak.
- **Kontrole izgleda stranice**: sakrijte chat i sažmite lijevi izbornik s ploče ili pomoću prečaca (`Alt+C`, `Alt+S`), s opcijom pamćenja izgleda za svaki stream.
- **Animacije ikona** za bočnu traku, ikone za resetiranje i pomoć, s vlastitim prekidačem (također dio unaprijed postavljenih postavki animacije).
- **Avatari kanala** su snimljeni iz Kicka i prikazani na spremljenom popisu kanala.
- 14 akcentnih boja (prije 6).
- Potvrdni dijaloški okvir unutar ploče koji izgleda identično u svakom pregledniku.

### Promijenjeno

- **Jezik sučelja** sada slijedi jezik preglednika pri prvom pokretanju. Jednom kada odaberete jezik, on se pamti. Postavke premještene iz starijih verzija prate preglednik dok se izričito ne odabere jezik.
- Skripta sada počinje na `document-start` tako da se njezina izolacija tipkovnice registrira prije vlastitih slušatelja stranice.
- Redovi postavki složeni su (oznaka iznad kontrole) tako da se tekst nikada ne može preklapati ili isjecati, na bilo kojem jeziku, veličini teksta ili širini ploče. Oznake bočne trake prelamaju se na granice riječi.
- Birači animacija ponovno su izgrađeni kao redovi pune širine s ikonama, tako da dugi prijevodi odgovaraju.
- **Minimalni** stil ploče sada je ravan i četvrtast bez sjaja, rubovi su zamijenjeni razdjelnicima i odabir stila podcrtavanja, tako da je razlika u odnosu na **Kick** očita.
- Panel ima fiksnu širinu od 680 px (smanjuje se kako bi odgovarao malim prozorima). Postavka širine panela i regulator za promjenu veličine su uklonjeni, tako da su izgledi isti za sve.
- Naslov animacije indikatora više ne kaže "zeleno" kada se koristi druga boja naglaska.

### Popravljeno

- Promjena glasnoće, isključivanje zvuka, tiha reprodukcija, automatska glasnoća ili brzina ponovno su primijenili i kvalitetu (ponovno otvaranje izbornika kvalitete i prikazivanje obavijesti). Te postavke sada dodiruju samo ono što ste promijenili; kvaliteta se ponovno primjenjuje samo kada se promijeni postavka kvalitete.
- Upisivanje u pretraživanje postavki moglo bi pokrenuti Kickove prečace (na primjer Space je prebacio stream na cijeli zaslon). Tipke unutar ploče više ne dopiru do stranice.
- Preferirana glasnoća je prebrisana kada je Kick resetirao player na vlastitih 50% nakon ponovnog učitavanja, a klizač na ploči pokazao je 50%. Promjene koje stranica napravi sama sada se vraćaju na vaš spremljeni volumen; ažuriraju ga samo vaši vlastiti postupci.
- Izrezivanje i preklapanje teksta u izgledu, animacijama i prečacima (duge oznake, velike veličine teksta, uske ploče, dugi prijevodi).
- Minimal stil tiho je onemogućio postavku zamućenja pozadine; zamućenje sada radi u oba stila.
- Promjena neprozirnosti gumba za brzo potraživanje nije ažurirala pregled.
- Klizači nisu reagirali na kotačić miša.
- Pločice animacije ("Scale", "Pop") koje prelaze svoje kartice.
- Potvrda brisanja profila koristila je izvorni dijalog preglednika.
- Čipovi mjerača vremena mirovanja nisu lokalizirani.
- Spremljeni kanali nisu prikazivali avatare, a trenutni kanal nije prikazivao nijedan dok njegov profil nije spremljen.

### Kompatibilnost

- Postojeće postavke i spremljeni kanali su sačuvani prilikom ažuriranja s v1.3.0, v1.2.0 i v1.1.0.
- Skripta i dalje ne šalje telemetriju i ne postavlja vlastite mrežne zahtjeve.

### Veze

- [Repozitorij](https://github.com/ebayybe/kick-stream-tweaks)
- [Izdanja](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemi](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Potpuni redizajn, logična struktura postavki, obnovljeni sustav animacije i niz popravaka pouzdanosti za automatizaciju igrača.

### Dodano

- Redizajnirana ploča s grupiranom bočnom trakom: **Player** (Reprodukcija, Kanali, Alati), **Upozorenja** (Obavijesti, Zvukovi), **Sučelje** (Izgled, Animacije, Prečaci) i **Sustav** (Dijagnostika, Podaci i o).
- Nova stranica **Animacije**: pozornica pregleda uživo, tri unaprijed postavljene postavke jednim klikom (Potpuno, Smanjeno, Isključeno) i zasebni birači za početni učinak (Ništa, Izbljeđivanje, Klizanje, Skala, Pop), efekt lebdenja, animaciju indikatora i brzinu.
- Brze unaprijed postavljene postavke za uštedu propusnosti, najbolju kvalitetu, tiho gledanje i VOD, primjenjuju se odmah.
- Berač kvalitete redizajniran kao rešetka za iver; brzina, skala teksta i mjerač vremena mirovanja koriste čipove i segmentirane kontrole umjesto padajućih izbornika.
- Ugrađeni upravitelj kanala: pretraživanje, sortiranje, prikvačivanje, grupe, bilješke, uređivanje po kanalu i potpuno sigurnosno kopiranje/vraćanje, sve bez ugniježđenih dijaloških okvira.
- Inline postavke zvuka s prekidačem za svaki događaj, glasnoćom i gumbom za pregled.
- Skeniranje kvalitete u dijagnostici: otvara izbornik playera, bilježi dostupne kvalitete i ponovno ga zatvara.
- Prečaci sada rade na bilo kojem rasporedu tipkovnice (odgovara im fizička tipka).
- Sinkronizacija postavki između otvorenih Kick kartica.
- Istaknuti uzorci boja pored prilagođenog birača boja, veći raspon skale teksta i zaštita od smanjenog kretanja.

### Promijenjeno

- Postavke su pohranjene u manjem formatu; konfiguracija 1.2.x, prečaci i izbori animacija migriraju automatski.
- Brzina reprodukcije primjenjuje se samo kada se razlikuje od 1×, tako da se Kickovo vlastito nadoknađivanje u živom rubu više ne nadjačava.
- Povijest poništavanja čuva se u memoriji umjesto da se zapisuje u lokalnu pohranu.
- Zvučni događaji, obavijesti i prečaci dijele jedan dosljedan skup kontrola.
- Izbornik "Profil situacije" zamijenjen je unaprijed postavljenim postavkama jednim klikom.

### Popravljeno

- Zatvaranje izbornika igrača nakon primjene kvalitete više ne predstavlja rizik ponovnog otvaranja.
- Rezervna kvaliteta (na primjer 720p umjesto nedostupnog 1080p) više ne prepisuje željenu kvalitetu spremljenu za kanal.
- Samo stvarni klikovi na kvalitetne artikle ažuriraju kvalitetu "zadnjeg korištenja"; automatski klikovi se zanemaruju.
- Pretraživanje postavki više ne pada nakon upisivanja (cilj događaja izgubljen je unutar Shadow DOM-a).
- Promjene napravljene na jednoj kartici više ne mogu prebrisati postavke s druge kartice.
- Prečaci na ploči više ne rade na nelatiničnom rasporedu.
- Netočne oznake u kontrolama dnevnika dijagnostike i zalutala korejska riječ u naslovu japanskog pisma.
- Provjere zaustavljene reprodukcije i pauza sinkronizacije streama dok je kartica skrivena.

### Uklonjeno

- Značajke koje se nisu mogle provjeriti u odnosu na Kickov igrač ili su ga duplicirale: postavka niske latencije, skrivanje kontrola igrača u mirovanju i provjera ažuriranja unutar ploče temeljena na GitHubu (upotrijebite ažuriranja upravitelja korisničkog skripta ili stranicu Izdanja).
- Pretjerano projektirane opcije: spremljeni profili izgleda, prikazivanje/sakrivanje/promjena redoslijeda odjeljaka, alternativni načini navigacije, provjere kompatibilnosti i pokrivenosti prijevoda, nasumične/pomicane/animacije odjeljaka, trajanja obavijesti po događaju, avatari kanala, grupne boje, ručni poredak, skupni odabir, povijest po kanalu i automatsko čišćenje.

### Kompatibilnost

- Postojeće postavke i spremljeni kanali su sačuvani prilikom ažuriranja s v1.2.0 i v1.1.0.
- Postavke ostaju lokalne za preglednik; skripta ne šalje telemetriju niti postavlja mrežne zahtjeve.

### Veze

- [Repozitorij](https://github.com/ebayybe/kick-stream-tweaks)
- [Izdanja](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemi](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Proširen izvorni pomoćnik za kvalitetu i glasnoću u potpuni alat za postavke playera.

### Dodano

- Profili po kanalu za kvalitetu, glasnoću, brzinu reprodukcije i isključeno stanje.
- Spremljeni popis kanala s bilješkama, grupama, uređivanjem profila i uvozom/izvozom.
- Zvučni efekti s globalnim prekidačem, pojedinačnim prekidačima događaja, pregledima i glasnoćom po događaju.
- Obavijesti o promjenama kvalitete, vraćenom volumenu i neuspješnim radnjama.
- Povijest obavijesti, zapisnik radnji i dijagnostički alati s jasnim kontrolama.
- Provjere dostupnosti kvalitete, provjere sukoba i provjere kompatibilnosti.
- Siguran način rada za privremeno onemogućavanje automatskih promjena igrača.
- Tipkovni prečaci, povlačenje ploče, promjena veličine ploče i radnja središnje ploče.
- Stilovi panela Kick i Minimal, kompaktni izgled i kontrole animacije.
- Mjerač vremena za mirovanje, način fokusa preko cijelog zaslona, ​​ponovna sinkronizacija playera i kontrole reprodukcije.
- Uvoz/izvoz postavki i profila kanala.
- Navigacija tipkovnicom, skaliranje teksta, najave čitača zaslona i visoki kontrast.
- Lokalizacija sučelja za 38 podržanih jezika.

### Popravljeno

- Spriječeno je pojavljivanje više sekundarnih dijaloških okvira u isto vrijeme.
- Popravljen prazan dijaloški okvir koji se pojavljuje iznad prozora postavki zvuka.
- Zanemarene prazne poruke obavijesti umjesto prikazivanja praznih slojeva.
- Poboljšano omatanje dugih naljepnica na uskim pločama i lokaliziranim izgledima.
- Popravljena zamjena rezerviranog mjesta `{quality}` i `{q}` u obavijestima.
- Ažurirana oznaka verzije unutar ploče i usporedba ažuriranja na 1.2.0.

### Kompatibilnost

- Postojeće postavke su sačuvane prilikom ažuriranja s v1.1.0.
- Postavke ostaju lokalne za preglednik; skripta ne šalje telemetriju.
- Provjera ažuriranja čita najnoviju GitHub oznaku izdanja i ne instalira ažuriranja automatski.

### Veze

- [Repozitorij](https://github.com/ebayybe/kick-stream-tweaks)
- [Izdanja](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemi](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Izvorna javna verzija bila je usredotočena na pamćenje kvalitete videozapisa i glasnoće na Kicku, njihovu automatsku primjenu na nove streamove i pružanje ploče s postavkama F2.
