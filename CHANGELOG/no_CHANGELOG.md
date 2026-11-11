<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · **Norsk** · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div>

# Kick Stream Tweaks — Endringslogg

Utgivelsesnotater for [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), et brukerskript som husker Kick-spillerens preferanser og legger til et konfigurerbart kontrollpanel.

## v1.3.2 — 2026-11-10

> Automatisk krav på belønninger fungerer nå mens Kick er åpen i en bakgrunnsfane.

### Rettet

- Belønninger med automatisk krav gjorde ingenting mens Kick var åpen i en bakgrunnsfane og fungerte først etter å ha byttet tilbake til den. Belønningsplanleggeren fortsetter nå å kjøre i bakgrunnen, reagerer på Kicks belønningsvarsling i det øyeblikket den dukker opp, og ventetiden strekkes ikke lenger av nettleserens bakgrunns-tabs-tidtaker.

### Endret

- I en bakgrunnsfane kjører bare frysemonitoren og belønningsplanleggeren. Spillerarbeidet (kvalitet, volum, hastighet) venter på at fanen blir synlig og brukes umiddelbart når du bytter tilbake.

### Kompatibilitet

- Verifisert i Firefox med stream-fanen i bakgrunnen. Chromium-baserte nettlesere forventes å oppføre seg på samme måte.
- Eksisterende innstillinger og lagrede kanaler bevares ved oppdatering fra v1.3.1, v1.3.0, v1.2.0 og v1.1.0.
- Skriptet sender fortsatt ingen telemetri og gjør ingen egne nettverksforespørsler.

### Lenker

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.1 — 2026-11-06

> Layoutherding for alle språk og tekststørrelser, en virkelig distinkt Minimal-stil, belønninger og layouthjelpere, en spiller-frys-alarm og et smartere standardspråk.

### Lagt til

- **Frysealarm for spillere.** Oppdager en stoppet spiller eller en svart skjerm (videotiden beveger seg uten dekodede rammer), spiller av en høy alarmlyd og viser et varsel, selv når fanen er minimert. Konfigurerbar deteksjonstid (5–60 s), uavhengig lydbryter og en testknapp.
- **Automatisk krav på belønninger** (av som standard): åpner belønningsvinduet, gjør krav på det som er tilgjengelig, lukker det igjen og går tilbake til strømmen. Dråper som vises i belønningspanelet blir også gjort krav på. Inkluderer en *Krev nå*-knapp.
- **Belønningsplan.** Som standard venter skriptet på Kicks egen "krav på belønning"-varsling og gjør krav på den med en gang (med en valgfri 0–60 sekunders forsinkelse), i stedet for å sende polling. En planlagt modus (hvert 5.–60. minutt) er også tilgjengelig.
- **Hurtigkravknapp.** En liten flytende knapp på strømmen som krever belønningen din med ett klikk. Dra den hvor som helst (posisjonen huskes), velg en av fire design (Orb, Pill, Glass, Flat), fem innebygde ikoner, en størrelse og en opasitet, vis den eventuelt bare når en belønning er tilgjengelig. Den lyser og viser en prikk når Kicks belønningsvarsel vises. Innstillingssiden har en live forhåndsvisning.
- **Ditt eget ikon.** Last opp en PNG, JPG, WebP, GIF eller SVG (opptil 2 MB) som knappikon, og fyll eventuelt ut hele knappen. Bildet er omkodet til en liten firkant og lagres kun i nettleseren din.
- **Mushjul på glidebrytere.** Hver skyveknapp kan justeres med musehjulet mens du svever den, uten å rulle panelet.
- **Funksjonsreferanse.** Ny `en_FUNCTIONS.md` dokumenterer arkitekturen, hver innstilling, hver funksjon og delene av Kicks side skriptet er avhengig av.
- **Guidet kanallagring.** Et trinn-for-trinn "Hvordan lagrede kanaler fungerer"-kort, en enkelt **Lagre denne kanalen**-knapp som lagrer gjeldende kvalitet, volum, hastighet og lyd for kanalen du ser på, et ett-klikks hint i Avspilling for ulagrede kanaler, en bekreftelsesskål, merket *Rediger* / *Ferdig, og uten å slette dem på pause-listen.
- **Stille avspilling.** Demper strømmen uten å dempe spilleren, slik at den fortsetter å spille i en bakgrunnsfane. Fungerer globalt og per lagret kanal (en *Silent*-tag vises i kanallisten).
- **Flerspråklig innstillingssøk.** Søk er aksentufølsomt og samsvarer også med de engelske navnene, så å skrive "volum" finner innstillingen på et hvilket som helst grensesnittspråk. Søk etter seksjon eller korttittel viser hele seksjonen.
- **Sidelayoutkontroller**: skjul chatten og skjul venstremenyen fra panelet eller med hurtigtaster (`Alt+C`, `Alt+S`), med et alternativ for å huske oppsettet for hver strøm.
- **Ikonanimasjoner** for sidefeltet, tilbakestillings- og hjelpeikoner, med sin egen bryter (også en del av forhåndsinnstillingene for animasjon).
- **Kanalavatarer** fanges opp fra Kick og vises i den lagrede kanallisten.
- 14 aksentfarger (var 6).
- Bekreftelsesdialog i panelet som ser identisk ut i alle nettlesere.

### Endret

- **Grensesnittspråk** følger nå nettleserspråket ved første kjøring. Når du velger et språk, huskes det. Innstillinger migrert fra eldre versjoner følger nettleseren til et språk er valgt eksplisitt.
- Skriptet starter nå ved `dokument-start`, så tastaturisolasjonen blir registrert før sidens egne lyttere.
- Innstillingsrader er stablet (etikett over kontrollen) slik at tekst aldri kan overlappe eller klippes, uansett språk, tekststørrelse eller panelbredde. Sidefeltetiketter omsluttes av ordgrenser.
- Animasjonsvelgere bygges om som rader i full bredde med ikoner, så lange oversettelser passer.
- **Minimal** panelstil er nå flat og firkantet uten glød, kanter erstattet av skillelinjer og understrekingsstil, så forskjellen fra **Kick** er åpenbar.
- Panelet har en fast bredde på 680 px (det krymper for å passe til små vinduer). Innstillingen for panelbredde og håndtaket for endring av størrelse ble fjernet, så oppsettene er de samme for alle.
- Indikatoranimasjonstittel sier ikke lenger "grønn" når en annen aksentfarge brukes.

### Rettet

- Ved å endre volum, dempe, stille avspilling, automatisk volum eller hastighet, ble kvaliteten også brukt på nytt (åpner kvalitetsmenyen på nytt og viser et varsel). Disse innstillingene berører nå bare det du endret; kvalitet brukes bare på nytt når en kvalitetsinnstilling endres.
- Å skrive inn innstillingene for søket kan utløse Kicks hurtigtaster (for eksempel byttet Space strømmen til fullskjerm). Tastetrykk inne i panelet når ikke lenger siden.
- Det foretrukne volumet ble overskrevet da Kick tilbakestilte spilleren til sine egne 50 % etter en omlasting, og panelglideren viste 50 %. Endringer siden gjør på egen hånd, blir nå tilbakestilt til det lagrede volumet; bare dine egne handlinger oppdaterer den.
- Tekstklipp og overlapping i Utseende, animasjoner og hurtigtaster (lange etiketter, store tekststørrelser, smale paneler, lange oversettelser).
- Minimal-stilen deaktiverte stille innstillingen for bakgrunnsuskarphet; uskarphet fungerer nå i begge stiler.
- Å endre opasiteten på knappen for hurtigkrav oppdaterte ikke forhåndsvisningen.
– Slidere reagerte ikke på musehjulet.
- Animasjonsbrikker ("Scale", "Pop") som flyter over kortene deres.
- Bekreftelse av sletting av profil brukte nettleserens opprinnelige dialogboks.
- Tidtakerbrikker for søvn ble ikke lokalisert.
- Lagrede kanaler viste ingen avatarer, og gjeldende kanal viste ingen før profilen ble lagret.

### Kompatibilitet

- Eksisterende innstillinger og lagrede kanaler bevares ved oppdatering fra v1.3.0, v1.2.0 og v1.1.0.
- Skriptet sender fortsatt ingen telemetri og gjør ingen egne nettverksforespørsler.

### Lenker

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Full redesign, en logisk innstillingsstruktur, et gjenoppbygd animasjonssystem og en runde med pålitelighetsfikser for spillerautomatisering.

### Lagt til

- Redesignet panel med en gruppert sidefelt: **Spiller** (avspilling, kanaler, verktøy), **varsler** (varsler, lyder), **grensesnitt** (utseende, animasjoner, snarveier) og **System** (diagnostikk, data og om).
- Ny **Animasjoner**-side: en live forhåndsvisningsfase, tre forhåndsinnstillinger med ett klikk (Full, Redusert, Av) og separate velgere for åpningseffekten (Ingen, Fade, Slide, Scale, Pop), sveveeffekt, indikatoranimasjon og hastighet.
- Raske forhåndsinnstillinger for å spare båndbredde, beste kvalitet, stille visning og VOD, brukes umiddelbart.
- Kvalitetsplukker redesignet som et brikkenett; hastighet, tekstskala og sleep-timer bruker sjetonger og segmenterte kontroller i stedet for rullegardiner.
- Innebygd kanalbehandling: søk, sortering, festing, grupper, notater, redigering per kanal og full sikkerhetskopiering/gjenoppretting, alt uten nestede dialogbokser.
- Innebygde lydinnstillinger med bryter per hendelse, volum og forhåndsvisningsknapp.
- Kvalitetsskanning i diagnostikk: åpner spillermenyen, registrerer tilgjengelige kvaliteter og lukker den igjen.
- Hurtigtaster fungerer nå på alle tastaturoppsett (de matches av fysisk nøkkel).
- Innstillinger synkroniseres mellom åpne Kick-faner.
- Aksentfargeprøver ved siden av den tilpassede fargevelgeren, et høyere tekstskalaområde og en foretrukket-redusert bevegelsesbeskyttelse.

### Endret

- Innstillinger lagres i et slankere format; 1.2.x-konfigurasjonen, hurtigtastene og animasjonsvalgene migreres automatisk.
- Avspillingshastighet brukes bare når den er forskjellig fra 1×, så Kicks egen live-edge catch-up blir ikke lenger overstyrt.
- Angrehistorikk lagres i minnet i stedet for å bli skrevet til lokal lagring.
- Lydhendelser, varsler og hurtigtaster deler ett konsekvent sett med kontroller.
- "Situasjonsprofil"-velgeren erstattes av forhåndsinnstillinger med ett klikk.

### Rettet

- Å lukke spillermenyen etter å ha brukt kvalitet risikerer ikke lenger å åpne den på nytt.
- En reservekvalitet (for eksempel 720p i stedet for en utilgjengelig 1080p) overskriver ikke lenger den foretrukne kvaliteten som er lagret for en kanal.
- Bare reelle klikk på kvalitetsvarer oppdaterer "sist brukte"-kvaliteten; automatiserte klikk ignoreres.
- Innstillingssøk mislykkes ikke lenger etter å ha skrevet (hendelsesmålet gikk tapt inne i Shadow DOM).
- Endringer gjort i én fane kan ikke lenger overskrive innstillinger fra en annen fane.
- Panelhurtigtaster bryter ikke lenger på ikke-latinske oppsett.
- Feil etiketter i diagnostikkloggkontrollene og et koreansk ord i den japanske skripttittelen.
- Stoppet avspilling kontroller og strømsynkronisering pause mens fanen er skjult.

### Fjernet

- Funksjoner som ikke kunne verifiseres mot Kicks spiller eller dupliseres: preferanse for lav latens, skjul spillerkontroller på inaktiv og GitHub-basert oppdateringssjekk i panelet (bruk oppdateringene til brukerskriptbehandleren eller utgivelsessiden).
- Overkonstruerte alternativer: lagrede utseendeprofiler, seksjonsvisning/skjul/ombestill, alternative navigasjonsmoduser, kompatibilitets- og oversettelsesdekningskontroller, tilfeldige/rulling/seksjonsanimasjoner, varighet per hendelse, kanalavatarer, gruppefarger, manuell bestilling, massevalg, per-kanal-historikk og automatisk opprydding.

### Kompatibilitet

- Eksisterende innstillinger og lagrede kanaler bevares ved oppdatering fra v1.2.0 og v1.1.0.
- Innstillinger forblir lokale for nettleseren; skriptet sender ikke telemetri eller sender nettverksforespørsler.

### Lenker

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Utvidet den originale kvalitets- og volumhjelperen til et komplett verktøysett for spillerinnstillinger.

### Lagt til

- Profiler per kanal for kvalitet, volum, avspillingshastighet og mute-tilstand.
- Lagret kanalliste med notater, grupper, profilredigering og import/eksport.
- Lydeffekter med en global bryter, individuelle hendelsesbrytere, forhåndsvisninger og volum per hendelse.
- Varsler for kvalitetsendringer, gjenopprettet volum og mislykkede handlinger.
- Varslingshistorikk, handlingslogg og diagnoseverktøy med klare kontroller.
- Tilgjengelighetskontroller av kvalitet, konfliktsjekker og kompatibilitetskontroller.
- Sikker modus for midlertidig deaktivering av automatiske spillerendringer.
- Hurtigtaster, paneldraging, panelendring og en handling på midten av panelet.
- Kick- og Minimal-panelstiler, kompakt layout og animasjonskontroller.
- Dvaletimer, fullskjermsfokusmodus, resynkronisering av spiller og avspillingskontroller.
- Import/eksport av innstillinger og kanalprofiler.
- Tastaturnavigering, tekstskalering, skjermleserkunngjøringer og høy kontrast.
- Grensesnittlokalisering for 38 støttede språk.

### Rettet

- Hindret flere sekundære dialoger fra å vises samtidig.
- Rettet en tom dialog som vises over lydinnstillingsvinduet.
- Ignorerte tomme varslingsmeldinger i stedet for å vise tomme overlegg.
- Forbedret lang etikettinnpakning på smale paneler og lokaliserte layouter.
- Fikset "{kvalitet}" og "{q}" plassholdererstatning i varsler.
- Oppdaterte versjonsetiketten i panelet og oppdateringssammenligning til 1.2.0.

### Kompatibilitet

- Eksisterende innstillinger bevares ved oppdatering fra v1.1.0.
- Innstillinger forblir lokale for nettleseren; skriptet sender ikke telemetri.
- Oppdateringskontrollen leser den siste GitHub-utgivelseskoden og installerer ikke oppdateringer automatisk.

### Lenker

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Den originale offentlige versjonen fokuserte på å huske videokvalitet og volum på Kick, bruke dem automatisk på nye strømmer og gi et F2-innstillingspanel.
