<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · **Dansk** · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div>

# Kick Stream Tweaks — Changelog

Udgivelsesnoter til [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), et brugerscript, der husker Kick-spillerens præferencer og tilføjer et konfigurerbart kontrolpanel.

## v1.3.2 — 2026-11-10

> Automatisk krav på belønninger fungerer nu, mens Kick er åben i en baggrundsfane.

### Rettet

- Auto-claim belønninger gjorde intet, mens Kick var åben i en baggrundsfane og kun virkede efter at have skiftet tilbage til den. Belønningsplanlæggeren fortsætter nu med at køre i baggrunden, reagerer på Kicks belønningsmeddelelse i det øjeblik, den dukker op, og dens ventetider strækkes ikke længere af browserens baggrunds-fanetimer, der drosler.

### Ændret

- På en baggrundsfane kører kun frysemonitoren og belønningsplanlæggeren. Afspillerens arbejde (kvalitet, lydstyrke, hastighed) venter på, at fanen bliver synlig og anvendes straks, når du skifter tilbage.

### Kompatibilitet

- Verificeret i Firefox med stream-fanen i baggrunden. Chromium-baserede browsere forventes at opføre sig på samme måde.
- Eksisterende indstillinger og gemte kanaler bevares ved opdatering fra v1.3.1, v1.3.0, v1.2.0 og v1.1.0.
- Scriptet sender stadig ingen telemetri og fremsætter ingen egne netværksanmodninger.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.1 — 2026-11-06

> Layouthærdning for alle sprog og tekststørrelser, en virkelig distinkt Minimal-stil, belønninger og layouthjælpere, en spiller-frysningsalarm og et smartere standardsprog.

### Tilføjet

- **Afspillerens frysealarm.** Registrerer en stoppet afspiller eller en sort skærm (videotiden bevæger sig uden afkodede rammer), afspiller en høj alarmlyd og viser en meddelelse, selv når fanen er minimeret. Konfigurerbar detektionstid (5–60 s), uafhængig lydskift og en testknap.
- **Automatisk krav på belønninger** (deaktiveret som standard): åbner belønningsvinduet, gør krav på, hvad der er tilgængeligt, lukker det igen og vender tilbage til strømmen. Dråber, der vises i belønningspanelet, bliver også gjort krav på. Indeholder en *Gør krav nu*-knap.
- **Belønningsplan.** Som standard venter scriptet på Kicks egen "krav på din belønning"-meddelelse og gør krav på den med det samme (med en valgfri 0-60 s forsinkelse) i stedet for at afgive afstemning. En planlagt tilstand (hvert 5.–60. min.) er også tilgængelig.
- **Knap til hurtig krav.** En lille flydende knap på strømmen, der kræver din belønning med et enkelt klik. Træk den hvor som helst (positionen huskes), vælg et af fire designs (Orb, Pill, Glass, Flat), fem indbyggede ikoner, en størrelse og en opacitet, vis det valgfrit kun, når en belønning er tilgængelig. Den lyser og viser en prik, når Kicks belønningsmeddelelse vises. Indstillingssiden har en live forhåndsvisning.
- **Dit eget ikon.** Upload en PNG, JPG, WebP, GIF eller SVG (op til 2 MB) som knapikonet, og udfyld eventuelt hele knappen. Billedet omkodes til en lille firkant og gemmes kun i din browser.
- **Musehjul på skydere.** Hver skyder kan justeres med musehjulet, mens du svæver den, uden at rulle panelet.
- **Funktionsreference.** Ny `en_FUNCTIONS.md` dokumenterer arkitekturen, hver indstilling, hver funktion og de dele af Kicks side, scriptet afhænger af.
- **Guidet kanallagring.** Et trin-for-trin "Sådan fungerer gemte kanaler"-kort, en enkelt **Gem denne kanal**-knap, der gemmer den aktuelle kvalitet, lydstyrke, hastighed og lyd for den kanal, du ser, et tip med et enkelt klik i Afspilning for ikke-gemte kanaler, en bekræftelsesskål, mærket *Rediger* / *Udført* for at slette dem på pauselisten.
- **Lydløs afspilning.** Slår streamen fra uden at slå lyden fra afspilleren, så den bliver ved med at spille på en baggrundsfane. Fungerer globalt og pr. gemt kanal (et *Silent* tag vises i kanallisten).
- **Søgning på flere sprog.** Søgning er ufølsom over for accent og matcher også de engelske navne, så hvis du indtaster "volumen", finder du indstillingen på ethvert grænsefladesprog. Søgning efter sektion eller korttitel viser hele sektionen.
- **Sidelayoutkontroller**: Skjul chatten og skjul venstremenuen fra panelet eller med genvejstaster (`Alt+C`, `Alt+S`), med en mulighed for at huske layoutet for hver stream.
- **Ikonanimationer** til sidebjælken, nulstil og hjælpeikoner med deres egen kontakt (også en del af animationsforudindstillingerne).
- **Kanalavatarer** fanges fra Kick og vises i den gemte kanalliste.
- 14 accentfarver (var 6).
- Bekræftelsesdialog i panelet, der ser identisk ud i alle browsere.

### Ændret

- **Interfacesprog** følger nu browsersproget ved første kørsel. Når du vælger et sprog, huskes det. Indstillinger, der er migreret fra ældre versioner, følger browseren, indtil et sprog er valgt eksplicit.
- Scriptet starter nu ved `dokument-start`, så dets tastaturisolering registreres før sidens egne lyttere.
- Indstillingsrækkerne er stablet (etiket over kontrol), så tekst aldrig kan overlappe eller klippe, uanset sprog, tekststørrelse eller panelbredde. Sidebar-etiketter ombrydes på ordgrænser.
- Animationsvælgere er genopbygget som rækker i fuld bredde med ikoner, så lange oversættelser passer.
- **Minimal** panelstil er nu flad og firkantet uden glød, kanter erstattet af skillevægge og understregningstilvalg, så forskellen fra **Kick** er indlysende.
- Panelet har en fast bredde på 680 px (det krymper for at passe til små vinduer). Panelbreddeindstillingen og størrelseshåndtaget blev fjernet, så layouts er ens for alle.
- Indikatoranimationstitlen siger ikke længere "grøn", når der bruges en anden accentfarve.

### Rettet

- Ændring af lydstyrke, mute, lydløs afspilning, automatisk lydstyrke eller hastighed genindførte også kvaliteten (genåbner kvalitetsmenuen og viser en meddelelse). Disse indstillinger berører nu kun det, du har ændret; kvalitet genanvendes kun, når en kvalitetsindstilling ændres.
- Indtastning af indstillingssøgningen kunne udløse Kicks genvejstaster (f.eks. skiftede Space streamen til fuldskærm). Tastetryk inde i panelet når ikke længere siden.
- Den foretrukne lydstyrke blev overskrevet, da Kick nulstillede afspilleren til sine egne 50 % efter en genindlæsning, og panelskyderen viste 50 %. Ændringer, som siden foretager alene, vendes nu tilbage til dit gemte volumen; kun dine egne handlinger opdaterer det.
- Tekstklip og overlapning i Udseende, animationer og genvejstaster (lange etiketter, store tekststørrelser, smalle paneler, lange oversættelser).
- Minimal-stilen deaktiverede lydløst indstillingen for baggrundssløring; sløring fungerer nu i begge stilarter.
- Ændring af opaciteten på knappen for hurtig krav opdaterede ikke forhåndsvisningen.
- Skydere reagerede ikke på musehjulet.
- Animationsbrikker ("Skala", "Pop"), der flyder over deres kort.
- Slet-profilbekræftelse brugte browserens oprindelige dialogboks.
- Sleep timer-chips var ikke lokaliseret.
- Gemte kanaler viste ingen avatarer, og den aktuelle kanal viste ingen, før dens profil blev gemt.

### Kompatibilitet

- Eksisterende indstillinger og gemte kanaler bevares ved opdatering fra v1.3.0, v1.2.0 og v1.1.0.
- Scriptet sender stadig ingen telemetri og fremsætter ingen egne netværksanmodninger.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Fuldt redesign, en logisk indstillingsstruktur, et genopbygget animationssystem og en runde af pålidelighedsrettelser til afspillerens automatisering.

### Tilføjet

- Redesignet panel med en grupperet sidebjælke: **Afspiller** (afspilning, kanaler, værktøjer), **Alarmer** (meddelelser, lyde), **Grænseflade** (udseende, animationer, genveje) og **System** (diagnostik, data og om).
- Ny **Animationer**-side: en live forhåndsvisningsfase, tre forudindstillinger med et enkelt klik (Fuld, Reduceret, Fra) og separate vælgere til åbningseffekten (Ingen, Fade, Slide, Scale, Pop), svæveeffekt, indikatoranimation og hastighed.
- Hurtige forudindstillinger for at spare båndbredde, bedste kvalitet, stille visning og VOD, anvendes øjeblikkeligt.
- Kvalitetsplukker redesignet som et spångitter; hastighed, tekstskala og sleep-timer bruger chips og segmenterede kontroller i stedet for dropdowns.
- Inline kanalhåndtering: søgning, sortering, fastgørelse, grupper, noter, redigering pr. kanal og fuld backup/gendannelse, alt sammen uden indlejrede dialoger.
- Indbyggede lydindstillinger med en per-hændelsesknap, lydstyrke og forhåndsvisningsknap.
- Kvalitetsscanning i diagnostik: åbner afspillermenuen, registrerer de tilgængelige kvaliteter og lukker den igen.
- Genvejstaster fungerer nu på ethvert tastaturlayout (de matches af fysisk nøgle).
- Indstillinger synkroniseres mellem åbne Kick-faner.
- Accentfarveprøver ved siden af ​​den brugerdefinerede farvevælger, et højere tekstskalaområde og en foretrukket-reduceret bevægelsesbeskyttelse.

### Ændret

- Indstillinger gemmes i et mere slankt format; 1.2.x-konfigurationen, genvejstaster og animationsvalg migreres automatisk.
- Afspilningshastigheden anvendes kun, når den adskiller sig fra 1×, så Kicks egen live-edge catch-up tilsidesættes ikke længere.
- Fortryd-historik gemmes i hukommelsen i stedet for at blive skrevet til lokalt lager.
- Lydbegivenheder, meddelelser og genvejstaster deler et ensartet sæt kontrolelementer.
- Vælgeren "Situationsprofil" erstattes af forudindstillinger med et enkelt klik.

### Rettet

- At lukke afspillermenuen efter at have anvendt kvalitet risikerer ikke længere at genåbne den.
- En reservekvalitet (f.eks. 720p i stedet for en utilgængelig 1080p) overskriver ikke længere den foretrukne kvalitet, der er gemt for en kanal.
- Kun rigtige klik på kvalitetsvarer opdaterer den "sidst brugte" kvalitet; automatiske klik ignoreres.
- Indstillingssøgning mislykkes ikke længere efter indtastning (hændelsesmål gik tabt inde i Shadow DOM).
- Ændringer foretaget på en fane kan ikke længere overskrive indstillinger fra en anden fane.
- Panel-genvejstaster går ikke længere i stykker på ikke-latinske layouts.
- Forkerte etiketter i kontrolelementerne i diagnostikloggen og et koreansk ord i den japanske scripttitel.
- Stoppet afspilningstjek og stream-synkronisering pause, mens fanen er skjult.

### Fjernet

- Funktioner, der ikke kunne verificeres mod Kicks spiller eller duplikeres: præference med lav latens, skjul afspillerkontroller i inaktiv tilstand og det GitHub-baserede opdateringstjek i panelet (brug din brugerscriptmanagers opdateringer eller udgivelsessiden).
- Overkonstruerede muligheder: gemte udseendeprofiler, sektionsvisning/skjul/genbestil, alternative navigationstilstande, kontrol af kompatibilitet og oversættelsesdækning, tilfældige/scroll/sektionsanimationer, varigheder af notifikationer pr. hændelse, kanalavatarer, gruppefarver, manuel bestilling, massevalg, historik pr. kanal og automatisk oprydning.

### Kompatibilitet

- Eksisterende indstillinger og gemte kanaler bevares ved opdatering fra v1.2.0 og v1.1.0.
- Indstillinger forbliver lokale for browseren; scriptet sender ikke telemetri eller foretager netværksanmodninger.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Udvidede den originale kvalitets- og lydstyrkehjælper til et komplet værktøjssæt til afspillerindstillinger.

### Tilføjet

- Profiler pr. kanal for kvalitet, lydstyrke, afspilningshastighed og mute-tilstand.
- Gemt kanalliste med noter, grupper, profilredigering og import/eksport.
- Lydeffekter med en global switch, individuelle begivenhedskontakter, forhåndsvisninger og volumen pr. begivenhed.
- Meddelelser om kvalitetsændringer, gendannet lydstyrke og mislykkede handlinger.
- Notifikationshistorik, handlingslog og diagnostiske værktøjer med klare kontroller.
- Kvalitetskontrol af tilgængelighed, konfliktkontrol og kompatibilitetskontrol.
- Sikker tilstand til midlertidigt at deaktivere automatiske spillerskift.
- Genvejstaster, paneltræk, panelstørrelse og en handling på midten af ​​panelet.
- Kick og Minimal panelstile, kompakt layout og animationskontroller.
- Sleep-timer, fuldskærmsfokustilstand, afspillergensynkronisering og afspilningskontroller.
- Import/eksport af indstillinger og kanalprofiler.
- Tastaturnavigation, tekstskalering, skærmlæsermeddelelser og høj kontrast.
- Grænsefladelokalisering til 38 understøttede sprog.

### Rettet

- Forhindret flere sekundære dialoger i at blive vist på samme tid.
- Rettede en tom dialog, der vises over vinduet med lydindstillinger.
- Ignorerede tomme meddelelser i stedet for at vise tomme overlejringer.
- Forbedret lang etiketindpakning på smalle paneler og lokaliserede layouts.
- Rettet udskiftning af `{kvalitet}` og `{q}` pladsholder i meddelelser.
- Opdaterede versionsetiketten i panelet og opdateringssammenligning til 1.2.0.

### Kompatibilitet

- Eksisterende indstillinger bevares ved opdatering fra v1.1.0.
- Indstillinger forbliver lokale for browseren; scriptet sender ikke telemetri.
- Opdateringskontrollen læser det seneste GitHub-udgivelsestag og installerer ikke opdateringer automatisk.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Den originale offentlige version fokuserede på at huske videokvalitet og lydstyrke på Kick, anvende dem automatisk på nye streams og give et F2-indstillingspanel.
