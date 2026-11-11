<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · **Latviešu** · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div>

# Kick Stream Tweaks — izmaiņu žurnāls

[Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks) izlaiduma piezīmes — lietotāja skripts, kas atceras Kick atskaņotāja preferences un pievieno konfigurējamu vadības paneli.

## v1.3.2 — 2026-11-10

> Automātiskā atlīdzību pieprasīšana tagad darbojas, kamēr Kick ir atvērts fona cilnē.

### Labots

- Automātiskās pieprasīšanas atlīdzības neko nedarīja, kamēr Kick bija atvērts fona cilnē, un darbojās tikai pēc pārslēgšanās uz to. Atlīdzības plānotājs tagad turpina darboties fonā, reaģē uz Kick atlīdzības paziņojumu brīdī, kad tas tiek parādīts, un tā gaidīšanas laiku vairs nepailgina pārlūkprogrammas fona cilnes taimera ierobežošana.

### Mainīts

- Fona cilnē darbojas tikai iesaldēšanas monitors un atlīdzības plānotājs. Atskaņotāja darbs (kvalitāte, skaļums, ātrums) gaida, līdz cilne kļūst redzama, un tiek lietota uzreiz, kad pārslēdzaties atpakaļ.

### Saderība

- Pārbaudīts pārlūkprogrammā Firefox ar straumes cilni fonā. Paredzams, ka pārlūkprogrammas, kuru pamatā ir Chromium, darbosies tāpat.
- Esošie iestatījumi un saglabātie kanāli tiek saglabāti, veicot atjaunināšanu no v1.3.1, v1.3.0, v1.2.0 un v1.1.0.
- Skripts joprojām nesūta telemetriju un neveic savus tīkla pieprasījumus.

### Saites

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.1 — 2026-11-06

> Izkārtojuma nostiprināšana katrai valodai un teksta izmēram, patiesi atšķirīgs minimālais stils, balvas un izkārtojuma palīgi, atskaņotāja iesaldēšanas trauksme un viedāka noklusējuma valoda.

### Pievienots

- **Atskaņotāja iesaldēšanas trauksme.** Atklāj apstājies atskaņotāju vai melnu ekrānu (videoklipa laiks pārvietojas bez dekodētiem kadriem), atskaņo skaļu trauksmes signālu un parāda paziņojumu pat tad, ja cilne ir samazināta līdz minimumam. Konfigurējams noteikšanas laiks (5–60 s), neatkarīga skaņas pārslēgšana un pārbaudes poga.
- **Automātiski pieprasīt atlīdzības** (pēc noklusējuma izslēgts): tiek atvērts atlīdzību logs, tiek pieprasīts, kas ir pieejams, to atkal aizver un atgriežas straumē. Tiek pieprasīti arī kritieni, kas tiek parādīti atlīdzības panelī. Ietver pogu *Pieprasīt tūlīt*.
- **Atlīdzības grafiks.** Pēc noklusējuma skripts gaida paša Kick paziņojumu “pieprasīt savu atlīdzību” un pieprasa to uzreiz (ar izvēles 0–60 s aizkavi), nevis aptauju. Ir pieejams arī ieplānotais režīms (ik pēc 5–60 minūtēm).
- **Ātrās pieprasīšanas poga.** Neliela peldoša poga straumē, ar kuru jūs saņemat atlīdzību ar vienu klikšķi. Velciet to jebkur (pozīcija tiek atcerēta), izvēlieties vienu no četriem dizainparaugiem (Orb, Pill, Glass, Flat), piecām iebūvētām ikonām, izmēru un necaurredzamību, pēc izvēles parādiet to tikai tad, kad ir pieejama atlīdzība. Tas spīd un parāda punktu, kad tiek parādīts Kick atlīdzības paziņojums. Iestatījumu lapā ir tiešraides priekšskatījums.
- **Jūsu ikona.** Augšupielādējiet PNG, JPG, WebP, GIF vai SVG formātu (līdz 2 MB) kā pogas ikonu, pēc izvēles aizpildot visu pogu. Attēls tiek atkārtoti kodēts nelielā kvadrātā un tiek saglabāts tikai jūsu pārlūkprogrammā.
- **Peles ritenītis uz slīdņiem.** Katru slīdni var regulēt ar peles ritenīti, turot to kursorā, neritinot paneli.
- **Funkciju atsauce.** Jaunā `en_FUNCTIONS.md` dokumentē arhitektūru, katru iestatījumu, katru funkciju un Kick lapas daļas, no kurām ir atkarīgs skripts.
- ** Kanālu saglabāšana ar vadību.** Soli pa solim kartīte “Kā darbojas saglabātie kanāli”, viena poga **Saglabāt šo kanālu**, kas saglabā pašreizējo kvalitāti, skaļumu, ātrumu un skaņu kanālam, kuru skatāties, viena klikšķa padoms sadaļā Atskaņošana nesaglabātajiem kanāliem, apstiprinājuma tosts, kas apzīmēts ar *Rediģēt* / *Izmantots saraksta saglabāšanas slēdzis un iestatījumu pārslēgšanas poga.
- **Klusa atskaņošana.** Apklusina straumi, neizslēdzot atskaņotāja skaņu, tāpēc tā turpina atskaņot fona cilnē. Darbojas visā pasaulē un katram saglabātajam kanālam (kanālu sarakstā tiek parādīta atzīme *Silent*).
- **Vairāku valodu iestatījumu meklēšana.** Meklēšana ir nejutīga pret akcentiem, un tā atbilst arī nosaukumiem angļu valodā, tāpēc, ierakstot “volume”, iestatījums tiek atrasts jebkurā saskarnes valodā. Meklējot pēc sadaļas vai kartītes nosaukuma, tiek parādīta visa sadaļa.
- **Lapas izkārtojuma vadīklas**: paslēpiet tērzēšanu un sakļaujiet kreiso izvēlni no paneļa vai ar karstajiem taustiņiem (Alt+C, Alt+S), ar iespēju atcerēties katras straumes izkārtojumu.
- **Ikonu animācijas** sānjoslai, atiestatīšanas un palīdzības ikonas ar savu slēdzi (arī daļa no animācijas sākotnējiem iestatījumiem).
- **Kanālu iemiesojumi** tiek uzņemti no Kick un parādīti saglabāto kanālu sarakstā.
- 14 akcentu krāsas (bija 6).
- Paneļa apstiprinājuma dialoglodziņš, kas katrā pārlūkprogrammā izskatās vienādi.

### Mainīts

- **Interfeisa valoda** tagad pirmajā palaišanas reizē seko pārlūkprogrammas valodai. Kad esat izvēlējies valodu, tā tiek atcerēta. Iestatījumi, kas migrēti no vecākām versijām, seko pārlūkprogrammai, līdz tiek skaidri izvēlēta valoda.
- Skripts tagad sākas ar “document-start”, tāpēc tā tastatūras izolācija tiek reģistrēta pirms pašas lapas klausītājiem.
- Iestatījumu rindas ir sakrautas (iezīme virs vadīklas), lai teksts nekad nevarētu pārklāties vai sagriezts jebkurā valodā, teksta lielumā vai paneļa platumā. Sānjoslas etiķetes tiek apvilktas uz vārdu robežām.
- Animācijas atlasītāji tiek pārbūvēti kā pilna platuma rindas ar ikonām, tāpēc ir piemēroti garie tulkojumi.
- **Minimālais** paneļa stils tagad ir plakans un kvadrātveida, bez mirdzuma, apmales ir aizstātas ar sadalītājiem un pasvītrojuma stila izvēli, tāpēc atšķirība no **Kick** ir acīmredzama.
- Panelis ir fiksēts platums 680 px (tas saraujas, lai ietilptu maziem logiem). Paneļa platuma iestatījums un izmēra maiņas rokturis tika noņemts, tāpēc izkārtojumi visiem ir vienādi.
- Indikatora animācijas virsrakstā vairs nav norādīts “zaļš”, ja tiek izmantota cita akcenta krāsa.

### Labots

- Mainot skaļumu, klusumu, klusu atskaņošanu, automātisko skaļumu vai ātrumu, tika atkārtoti piemērota arī kvalitāte (atkārtoti atverot kvalitātes izvēlni un parādot paziņojumu). Šie iestatījumi tagad skar tikai to, ko mainījāt; kvalitāte tiek atkārtoti lietota tikai tad, kad mainās kvalitātes iestatījums.
- Ierakstot iestatījumu meklēšanu, var tikt aktivizēti Kick karstie taustiņi (piemēram, Space pārslēdza straumi uz pilnekrāna režīmu). Taustiņu nospiedumi paneļa iekšpusē vairs nesasniedz lapu.
- Vēlamais skaļums tika pārrakstīts, kad Kick pēc atkārtotas ielādes atiestatīja atskaņotāju uz saviem 50%, un paneļa slīdnis parādīja 50%. Izmaiņas, ko lapa veic atsevišķi, tagad tiek atjaunotas jūsu saglabātajā sējumā; tikai jūsu pašu darbības to atjaunina.
- Teksta izgriešana un pārklāšanās sadaļās Izskats, animācijas un karstie taustiņi (garas etiķetes, lieli teksta izmēri, šauri paneļi, gari tulkojumi).
- Minimālais stils klusi atspējoja fona izplūšanas iestatījumu; izplūšana tagad darbojas abos stilos.
- Mainot ātrās pretenzijas pogas necaurredzamību, priekšskatījums netika atjaunināts.
- Slīdņi nereaģēja uz peles ritenīti.
- Animācijas flīzes ("Scale", "Pop"), kas pārpilda savas kārtis.
- Profila dzēšanas apstiprināšanai tika izmantots pārlūkprogrammas vietējais dialoglodziņš.
- Miega taimera mikroshēmas netika lokalizētas.
- Saglabātajos kanālos netika rādīti iemiesojumi, un pašreizējais kanāls to nerādīja, līdz tika saglabāts tā profils.

### Saderība

- Atjauninot no v1.3.0, v1.2.0 un v1.1.0, esošie iestatījumi un saglabātie kanāli tiek saglabāti.
- Skripts joprojām nesūta telemetriju un neveic savus tīkla pieprasījumus.

### Saites

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Pilnīga pārprojektēšana, loģiska iestatījumu struktūra, pārbūvēta animācijas sistēma un virkne uzticamības labojumu atskaņotāja automatizācijai.

### Pievienots

- Pārveidots panelis ar grupētu sānjoslu: **Atskaņotājs** (Atskaņošana, Kanāli, Rīki), **Brīdinājumi** (Paziņojumi, skaņas), **Interfeiss** (Izskats, animācijas, īsceļi) un **Sistēma** (Diagnostika, dati un informācija).
- Jauna lapa **Animācijas**: tiešā priekšskatījuma stadija, trīs viena klikšķa priekšiestatījumi (Pilns, Samazināts, Izslēgts) un atsevišķi sākuma efekta atlasītāji (Nav, Izbalināt, Slaids, Mērogs, Pop), kursora efekts, indikatora animācija un ātrums.
- Ātri priekšiestatījumi, lai saglabātu joslas platumu, vislabākā kvalitāte, klusa skatīšanās un VOD, kas tiek lietoti uzreiz.
- Kvalitatīvs savācējs pārveidots par skaidu režģi; ātrums, teksta skala un miega taimeris izmanto mikroshēmas un segmentētas vadīklas, nevis nolaižamās izvēlnes.
- Iekļauts kanālu pārvaldnieks: meklēšana, kārtošana, piespraušana, grupas, piezīmes, rediģēšana katrā kanālā un pilnīga dublēšana/atjaunošana, bez ligzdotiem dialogiem.
- Iekļauti skaņas iestatījumi ar notikuma slēdzi, skaļuma un priekšskatījuma pogu.
- Kvalitātes skenēšana diagnostikā: atver atskaņotāja izvēlni, ieraksta pieejamās īpašības un atkal to aizver.
- Karstie taustiņi tagad darbojas jebkurā tastatūras izkārtojumā (tie ir saskaņoti ar fizisko taustiņu).
- Iestatījumi tiek sinhronizēti starp atvērtajām Kick cilnēm.
- Akcentu krāsu paraugi blakus pielāgotajam krāsu atlasītājam, lielāks teksta mēroga diapazons un priekšroka samazinātas kustības aizsardzība.

### Mainīts

- Iestatījumi tiek saglabāti plānākā formātā; 1.2.x konfigurācija, karstie taustiņi un animācijas izvēles tiek migrētas automātiski.
- Atskaņošanas ātrums tiek piemērots tikai tad, ja tas atšķiras no 1×, tāpēc paša Kick reāllaika uztveršana vairs netiek ignorēta.
- Atcelšanas vēsture tiek saglabāta atmiņā, nevis tiek ierakstīta vietējā krātuvē.
- Skaņas notikumiem, paziņojumiem un karstajiem taustiņiem ir viena konsekventa vadīklu kopa.
- "Situācijas profila" atlasītājs tiek aizstāts ar viena klikšķa sākotnējiem iestatījumiem.

### Labots

- Aizverot atskaņotāja izvēlni pēc kvalitātes piemērošanas, vairs netiek apdraudēta tās atkārtota atvēršana.
- Atkāpšanās kvalitāte (piemēram, 720p, nevis nepieejama 1080p) vairs nepārraksta kanālam saglabāto vēlamo kvalitāti.
- Tikai reāli klikšķi uz kvalitatīvām precēm atjaunina "pēdējo lietoto" kvalitāti; automātiskie klikšķi tiek ignorēti.
- Iestatījumu meklēšana vairs neizdodas pēc ierakstīšanas (notikuma mērķis tika zaudēts Shadow DOM).
- Izmaiņas, kas veiktas vienā cilnē, vairs nevar pārrakstīt citas cilnes iestatījumus.
- Paneļa karstie taustiņi vairs nedarbojas, ja izkārtojums nav latīņu valoda.
- Nepareizas etiķetes diagnostikas žurnāla vadīklās un klaiņojošs korejiešu vārds japāņu rakstības virsrakstā.
- Apturētas atskaņošanas pārbaudes un straumes sinhronizācijas pauze, kamēr cilne ir paslēpta.

### Noņemts

- Funkcijas, kuras nevarēja pārbaudīt, salīdzinot ar Kick's atskaņotāju, vai tās tika dublētas: zema latentuma preference, atskaņotāja vadīklu slēpšana dīkstāvē un GitHub balstīta paneļa atjauninājumu pārbaude (izmantojiet lietotāja skriptu pārvaldnieka atjauninājumus vai lapu Izlaidumi).
- Pārāk izstrādātas opcijas: saglabāti izskatu profili, sadaļu rādīšana/slēpšana/pārkārtošana, alternatīvi navigācijas režīmi, saderības un tulkojuma pārklājuma pārbaudes, nejaušas/ritināšanas/sadaļu animācijas, katra pasākuma paziņojumu ilgums, kanālu iemiesojumi, grupu krāsas, manuāla pasūtīšana, lielapjoma atlase, katra kanāla vēsture un automātiskā tīrīšana.

### Saderība

- Atjauninot no v1.2.0 un v1.1.0, esošie iestatījumi un saglabātie kanāli tiek saglabāti.
- Iestatījumi paliek lokāli pārlūkprogrammai; skripts nesūta telemetriju un neveic tīkla pieprasījumus.

### Saites

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Paplašināts sākotnējās kvalitātes un skaļuma palīgs pilnā atskaņotāja iestatījumu rīkkopā.

### Pievienots

- Katra kanāla profili kvalitātei, skaļumam, atskaņošanas ātrumam un izslēgšanas stāvoklim.
- Saglabāts kanālu saraksts ar piezīmēm, grupām, profila rediģēšanu un importēšanu/eksportēšanu.
- Skaņas efekti ar globālu slēdzi, atsevišķiem notikumu slēdžiem, priekšskatījumiem un skaļumu katram notikumam.
- Paziņojumi par kvalitātes izmaiņām, atjaunotu apjomu un neveiksmīgām darbībām.
- Paziņojumu vēsture, darbību žurnāls un diagnostikas rīki ar skaidrām vadīklām.
- Kvalitātes pieejamības pārbaudes, konfliktu pārbaudes un saderības pārbaudes.
- Drošais režīms, lai īslaicīgi atspējotu automātiskās atskaņotāja maiņas.
- Karstie taustiņi, paneļa vilkšana, paneļa izmēru maiņa un darbība ar centrālo paneli.
- Kick un Minimal paneļu stili, kompakts izkārtojums un animācijas vadīklas.
- Miega taimeris, pilnekrāna fokusa režīms, atskaņotāja atkārtota sinhronizācija un atskaņošanas vadīklas.
- Iestatījumu un kanālu profilu importēšana/eksportēšana.
- Tastatūras navigācija, teksta mērogošana, ekrāna lasītāja paziņojumi un augsts kontrasts.
- Interfeisa lokalizācija 38 atbalstītajām valodām.

### Labots

- Novērsa vairāku sekundāro dialoglodziņu parādīšanos vienlaikus.
- Novērsts tukšs dialoglodziņš, kas parādās virs skaņas iestatījumu loga.
- Ignorēti tukši paziņojumu ziņojumi, nevis rādīti tukši pārklājumi.
- Uzlabota garo etiķešu ietīšana uz šauriem paneļiem un lokalizēts izkārtojums.
- Novērsta vietturu `{quality}` un `{q}` aizstāšana paziņojumos.
- Atjaunināts paneļa versijas marķējums un atjaunināts salīdzinājums uz 1.2.0.

### Saderība

- Atjauninot no v1.1.0, esošie iestatījumi tiek saglabāti.
- Iestatījumi paliek lokāli pārlūkprogrammai; skripts nesūta telemetriju.
- Atjauninājumu pārbaudītājs nolasa jaunāko GitHub laidiena tagu un neinstalē atjauninājumus automātiski.

### Saites

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Sākotnējā publiskā versija koncentrējās uz video kvalitātes un skaļuma atcerēšanos pakalpojumā Kick, automātisku to piemērošanu jaunām straumēm un F2 iestatījumu paneļa nodrošināšanu.
