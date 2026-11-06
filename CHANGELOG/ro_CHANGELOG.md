<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · **Română** · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Tweaks Kick Stream — Jurnal de modificări

Note de lansare pentru [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), un script de utilizator care reține preferințele jucătorului Kick și adaugă un panou de control configurabil.

## v1.3.1 — 2026-11-06

> Întărirea aspectului pentru fiecare limbă și dimensiune de text, un stil minimal cu adevărat distinct, recompense și ajutoare de aspect, o alarmă de blocare a jucătorului și o limbă implicită mai inteligentă.

### Adăugat

- **Alarma de înghețare a jucătorului.** Detectează un player blocat sau un ecran negru (timpul video se mișcă fără cadre decodificate), redă un sunet de alarmă puternic și afișează o notificare, chiar și atunci când fila este minimizată. Timp de detectare configurabil (5–60 s), comutare independentă a sunetului și un buton de testare.
- **Revendicare automată a recompenselor** (dezactivat implicit): deschide fereastra de recompense, revendică ceea ce este disponibil, îl închide din nou și revine în flux. Sunt revendicate și picăturile care apar în panoul de recompense. Include un buton *Revendicați acum*.
- **Programa de recompense.** În mod implicit, scriptul așteaptă notificarea lui Kick „revendicați-vă recompensa” și o revendică imediat (cu o întârziere opțională de 0–60 s), în loc de sondaj. Este disponibil și un mod programat (la fiecare 5-60 de minute).
- **Buton de revendicare rapidă.** Un mic buton plutitor pe flux care vă revendică recompensa cu un singur clic. Trageți-l oriunde (poziția este reținută), alegeți unul dintre cele patru modele (Orb, Pill, Glass, Flat), cinci pictograme încorporate, o dimensiune și o opacitate, opțional afișați-l numai atunci când este disponibilă o recompensă. Luminează și arată un punct când apare notificarea de recompensă a lui Kick. Pagina de setări are o previzualizare live.
- **Propria pictogramă.** Încărcați un PNG, JPG, WebP, GIF sau SVG (până la 2 MB) ca pictogramă pentru buton, umplând opțional întregul buton. Imaginea este re-codificată într-un pătrat mic și stocată numai în browser.
- **Rotița mouse-ului pe glisoare.** Fiecare glisor poate fi ajustat cu rotița mouse-ului în timp ce treceți cu mouse-ul, fără a derula panoul.
- **Referință la funcție.** Noul `en_FUNCTIONS.md` documentează arhitectura, fiecare setare, fiecare funcție și părțile paginii Kick de care depinde scriptul.
- **Salvare ghidată a canalului.** O cartelă pas cu pas „Cum funcționează canalele salvate”, un singur buton **Salvați acest canal** care stochează calitatea curentă, volumul, viteza și sunetul pentru canalul pe care îl vizionați, un indiciu cu un singur clic în Redare pentru canalele nesalvate, un toast de confirmare, etichetat *Editează* / *Efectuat* pentru a le dezactiva butoanele din lista și setările salvate.
- **Redare silențioasă.** Dezactivează fluxul fără a dezactiva sunetul playerului, astfel încât redarea continuă într-o filă de fundal. Funcționează la nivel global și pe canal salvat (o etichetă *Silent* este afișată în lista de canale).
- **Căutare în setări în mai multe limbi.** Căutarea nu ține cont de accent și se potrivește, de asemenea, cu numele în limba engleză, așa că tastând `volum` se găsește setarea în orice limbă a interfeței. Căutarea după secțiune sau titlul cardului arată întreaga secțiune.
- **Comenzi pentru aspectul paginii**: ascunde chat-ul și restrânge meniul din stânga din panou sau cu taste rapide (`Alt+C`, `Alt+S`), cu o opțiune de a reține aspectul pentru fiecare flux.
- **Animații cu pictograme** pentru bara laterală, pictograme de resetare și ajutor, cu propriul comutator (care face parte, de asemenea, din presetările de animație).
- **Avatarele canalului** sunt capturate din Kick și afișate în lista de canale salvate.
- 14 culori de accent (a fost 6).
- Dialog de confirmare în panou care arată identic în fiecare browser.

### Schimbat

- **Limba interfeței** urmează acum limba browserului la prima rulare. Odată ce alegeți o limbă, aceasta este reținută. Setările migrate de la versiuni mai vechi urmează browser-ul până când o limbă este aleasă în mod explicit.
- Scriptul începe acum la `document-start`, astfel încât izolarea tastaturii este înregistrată înaintea ascultătorilor paginii.
- Rândurile de setări sunt stivuite (eticheta deasupra controlului), astfel încât textul nu se poate suprapune sau tăiat niciodată, în orice limbă, dimensiune text sau lățime a panoului. Etichetele din bara laterală se încadrează în limitele cuvintelor.
- Selectorele de animație sunt reconstruite ca rânduri cu lățime completă cu pictograme, astfel încât să se potrivească traduceri lungi.
- Stilul de panou **minimal** este acum plat și pătrat, fără strălucire, marginile înlocuite cu separatoare și selecția stilului subliniat, așa că diferența față de **Kick** este evidentă.
- Panoul are o latime fixa de 680 px (se micsoreaza pentru a se potrivi cu ferestrele mici). Setarea pentru lățimea panoului și mânerul de redimensionare au fost eliminate, astfel încât aspectele sunt aceleași pentru toată lumea.
- Titlul animației indicator nu mai spune „verde” atunci când este utilizată o culoare de accent diferită.

### Fix

- Schimbarea volumului, sunetul, redarea silențioasă, volumul automat sau viteza a aplicat din nou calitatea (redeschiderea meniului de calitate și afișarea unei notificări). Aceste setări ating acum doar ceea ce ați schimbat; calitatea este reaplicată numai atunci când o setare de calitate se modifică.
- Tastarea în căutarea setărilor ar putea declanșa tastele rapide ale lui Kick (de exemplu, Space a comutat fluxul la ecran complet). Apăsările de taste din interiorul panoului nu mai ajung la pagină.
- Volumul preferat a fost suprascris când Kick a resetat playerul la 50% după o reîncărcare, iar glisorul panoului a arătat 50%. Modificările pe care pagina le face singură sunt acum revenite la volumul salvat; doar propriile tale acțiuni îl actualizează.
- Tăierea și suprapunerea textului în Aspect, Animații și Taste rapide (etichete lungi, dimensiuni mari ale textului, panouri înguste, traduceri lungi).
- Stilul Minimal a dezactivat silențios setarea de estompare a fundalului; blur funcționează acum în ambele stiluri.
- Modificarea opacității butonului de revendicare rapidă nu a actualizat previzualizarea.
- Glisoarele nu au reacționat la rotița mouse-ului.
- Dale de animație ("Scale", "Pop") care își debordează cărțile.
- Confirmarea de ștergere a profilului a folosit dialogul nativ al browserului.
- Cipurile temporizatorului de repaus nu au fost localizate.
- Canalele salvate nu au afișat niciun avatar, iar canalul curent nu a afișat niciunul până când profilul său a fost salvat.

### Compatibilitate

- Setările existente și canalele salvate sunt păstrate la actualizarea de la v1.3.0, v1.2.0 și v1.1.0.
- Scriptul încă nu trimite nicio telemetrie și nu face cereri proprii de rețea.

### Link-uri

- [Depozitar](https://github.com/ebayybe/kick-stream-tweaks)
- [Versiuni](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Reproiectare completă, o structură logică a setărilor, un sistem de animație reconstruit și o serie de remedieri de fiabilitate pentru automatizarea jucătorului.

### Adăugat

- Panou reproiectat cu o bară laterală grupată: **Player** (Redare, Canale, Instrumente), **Alerte** (Notificări, Sunete), **Interfață** (Aspect, Animații, Comenzi rapide) și **Sistem** (Diagnosticare, Date și despre).
- Nouă pagină **Animări**: o etapă de previzualizare live, trei presetări cu un singur clic (Complet, Redus, Dezactivat) și selecționare separate pentru efectul de deschidere (Niciun, Fade, Slide, Scale, Pop), efect de hover, animație de indicator și viteză.
- Presetări rapide pentru Salvare lățime de bandă, Cea mai bună calitate, Vizionare silențioasă și VOD, aplicate instantaneu.
- Selector de calitate reproiectat ca grilă de cipuri; viteza, scala textului și temporizatorul de oprire folosesc cipuri și comenzi segmentate în loc de meniuri derulante.
- Manager de canale inline: căutare, sortare, fixare, grupuri, note, editare pe canal și backup/restaurare completă, toate fără dialoguri imbricate.
- Setări de sunet în linie cu un comutator pentru fiecare eveniment, volum și buton de previzualizare.
- Scanare calitate în diagnosticare: deschide meniul playerului, înregistrează calitățile disponibile și îl închide din nou.
- Tastele rapide funcționează acum pe orice aspect de tastatură (sunt corelate cu tasta fizică).
- Setările se sincronizează între filele Kick deschise.
- Accentuați mostrele de culoare lângă selectorul de culori personalizat, o gamă mai mare de scară a textului și o protecție pentru mișcare redusă.

### Schimbat

- Setările sunt stocate într-un format mai slab; configurația 1.2.x, tastele rapide și opțiunile de animație sunt migrate automat.
- Viteza de redare este aplicată numai atunci când diferă de 1×, astfel încât recuperarea în timp reală a lui Kick nu mai este anulată.
- Istoricul anulărilor este păstrat în memorie în loc să fie scris în stocarea locală.
- Evenimentele sonore, notificările și tastele rapide au un set consistent de comenzi.
- Selectorul „Profil de situație” este înlocuit cu presetări cu un singur clic.

### Fix

- Închiderea meniului playerului după aplicarea calității nu mai riscă să-l redeschidă.
- O calitate de rezervă (de exemplu 720p în loc de un 1080p indisponibil) nu mai suprascrie calitatea preferată salvată pentru un canal.
- Numai clicurile reale pe articole de calitate actualizează calitatea „ultimul utilizat”; clicurile automate sunt ignorate.
- Căutarea setărilor nu mai eșuează după tastare (ținta evenimentului a fost pierdută în Shadow DOM).
- Modificările efectuate într-o filă nu mai pot suprascrie setările din altă filă.
- Tastele rapide din panou nu se mai întrerup pe aspectele non-latine.
- Etichete incorecte în comenzile jurnalului de diagnosticare și un cuvânt coreean rătăcit în titlul scriptului japonez.
- Verificările de redare blocate și sincronizarea fluxului se întrerup în timp ce fila este ascunsă.

### Eliminat

- Funcții care nu au putut fi verificate față de player-ul lui Kick sau care l-au duplicat: preferință de latență scăzută, ascunde comenzile jucătorului în mod inactiv și verificarea actualizării în panou bazată pe GitHub (utilizați actualizările managerului de script de utilizator sau pagina Versiuni).
- Opțiuni supraproiectate: profiluri de aspect salvate, afișare/ascunde/reordonare a secțiunilor, moduri alternative de navigare, verificări de compatibilitate și traducere-acoperire, animații aleatorii/defilare/secțiuni, durate de notificare pe eveniment, avatare de canal, culori de grup, comanda manuală, selecție în bloc, istoric pe canal și curățare automată.

### Compatibilitate

- Setările existente și canalele salvate sunt păstrate la actualizarea de la v1.2.0 și v1.1.0.
- Setările rămân locale pentru browser; scriptul nu trimite telemetrie și nu face solicitări de rețea.

### Link-uri

- [Depozitar](https://github.com/ebayybe/kick-stream-tweaks)
- [Versiuni](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Am extins calitatea originală și ajutorul de volum într-un set complet de instrumente pentru setările playerului.

### Adăugat

- Profiluri pe canal pentru calitate, volum, viteza de redare și stare de sunet.
- Lista de canale salvată cu note, grupuri, editare de profil și import/export.
- Efecte sonore cu un comutator global, comutatoare pentru evenimente individuale, previzualizări și volum pentru fiecare eveniment.
- Notificări pentru modificări de calitate, volum restaurat și acțiuni eșuate.
- Istoricul notificărilor, jurnalul de acțiuni și instrumente de diagnosticare cu comenzi clare.
- Verificări de disponibilitate a calității, verificări de conflict și verificări de compatibilitate.
- Modul sigur pentru dezactivarea temporară a modificărilor automate ale jucătorului.
- Taste rapide, tragerea panoului, redimensionarea panoului și o acțiune pe panoul central.
- Stiluri de panou Kick și Minimal, aspect compact și controale pentru animație.
- Temporizator de repaus, modul de focalizare pe ecran complet, resincronizare player și comenzi de redare.
- Import/export de setări și profiluri de canal.
- Navigare prin tastatură, scalare a textului, anunțuri pentru cititor de ecran și contrast ridicat.
- Localizare interfață pentru 38 de limbi acceptate.

### Fix

- A împiedicat apariția mai multor dialoguri secundare în același timp.
- S-a remediat un dialog gol care apare deasupra ferestrei de setări de sunet.
- S-au ignorat mesajele de notificare goale în loc să arate suprapuneri goale.
- Îmbunătățirea împachetare a etichetelor lungi pe panouri înguste și machete localizate.
- S-a remediat înlocuirea substituentului `{quality}` și `{q}` în notificări.
- S-a actualizat eticheta versiunii din panou și a actualizat comparația la 1.2.0.

### Compatibilitate

- Setările existente sunt păstrate la actualizarea de la v1.1.0.
- Setările rămân locale pentru browser; scriptul nu trimite telemetrie.
- Verificatorul de actualizări citește cea mai recentă etichetă de lansare GitHub și nu instalează actualizările automat.

### Link-uri

- [Depozitar](https://github.com/ebayybe/kick-stream-tweaks)
- [Versiuni](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Versiunea publică originală s-a concentrat pe reamintirea calității și volumului video pe Kick, aplicându-le automat noilor fluxuri și oferind un panou de setări F2.
