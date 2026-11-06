<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · **Svenska** · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks — Ändringslogg

Releasenotes för [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), ett användarskript som kommer ihåg Kick-spelares inställningar och lägger till en konfigurerbar kontrollpanel.

## v1.3.1 — 2026-11-06

> Layouthärdning för varje språk och textstorlek, en verkligt distinkt Minimal-stil, belöningar och layouthjälpmedel, ett larm för spelares frysning och ett smartare standardspråk.

### Tillagd

- **Larm för frysning av spelare.** Upptäcker en avstängd spelare eller en svart skärm (videotiden rör sig utan avkodade ramar), spelar upp ett högt larmljud och visar ett meddelande, även när fliken är minimerad. Konfigurerbar detekteringstid (5–60 s), oberoende ljudomkopplare och en testknapp.
- **Automatisk anspråk på belöningar** (av som standard): öppnar belöningsfönstret, gör anspråk på vad som är tillgängligt, stänger det igen och återgår till strömmen. Droppar som visas i belöningspanelen görs också anspråk på. Innehåller en *Kräva nu*-knapp.
- **Belöningsschema.** Som standard väntar skriptet på Kicks egen "hämta din belöning"-avisering och gör anspråk på den direkt (med en valfri 0–60 s fördröjning), istället för polling. Ett schemalagt läge (var 5–60:e minut) är också tillgängligt.
- **Knapp för snabb anspråk.** En liten flytande knapp på strömmen som gör anspråk på din belöning med ett klick. Dra den var som helst (positionen kommer ihåg), välj en av fyra mönster (Orb, Pill, Glass, Flat), fem inbyggda ikoner, en storlek och en opacitet, visa det valfritt bara när en belöning är tillgänglig. Den lyser och visar en prick när Kicks belöningsmeddelande visas. Inställningssidan har en liveförhandsvisning.
- **Din egen ikon.** Ladda upp en PNG, JPG, WebP, GIF eller SVG (upp till 2 MB) som knappikon, valfritt att fylla hela knappen. Bilden kodas om till en liten kvadrat och lagras endast i din webbläsare.
- **Mushjul på skjutreglage.** Varje skjutreglage kan justeras med mushjulet medan du håller det, utan att rulla panelen.
- **Funktionsreferens.** Ny `en_FUNCTIONS.md` dokumenterar arkitekturen, varje inställning, varje funktion och de delar av Kicks sida som skriptet beror på.
- **Guidad kanalsparning.** Ett steg-för-steg-kort "Så fungerar sparade kanaler", en enda **Spara den här kanalen**-knapp som lagrar aktuell kvalitet, volym, hastighet och ljud för kanalen du tittar på, ett tips med ett klick i Uppspelning för osparade kanaler, en bekräftelsetoast, märkt *Redigera* / *Klart för att radera inställningarna och en knapp för att radera dem i listan.
- **Tyst uppspelning.** Stänger av strömmen utan att stänga av spelaren, så att den fortsätter att spela på en bakgrundsflik. Fungerar globalt och per sparad kanal (en *Tyst*-tagg visas i kanallistan).
- **Sökning av flerspråkiga inställningar.** Sökningen är accentokänslig och matchar även de engelska namnen, så om du skriver `volym` hittar du inställningen på valfritt gränssnittsspråk. Sökning efter avsnitt eller korttitel visar hela avsnittet.
- **Sidlayoutkontroller**: dölj chatten och komprimera den vänstra menyn från panelen eller med snabbtangenter (`Alt+C`, `Alt+S`), med ett alternativ att komma ihåg layouten för varje stream.
- **Ikonanimationer** för sidofältet, återställnings- och hjälpikoner, med sin egen switch (också en del av animationsförinställningarna).
- **Kanalavatarer** fångas från Kick och visas i den sparade kanallistan.
- 14 accentfärger (var 6).
- Bekräftelsedialogruta på panelen som ser identisk ut i alla webbläsare.

### Ändrad

- **Gränssnittsspråk** följer nu webbläsarspråket vid första körningen. När du väl väljer ett språk kommer det ihåg. Inställningar som migrerats från äldre versioner följer webbläsaren tills ett språk valts explicit.
- Skriptet startar nu vid `dokument-start` så dess tangentbordsisolering registreras före sidans egna lyssnare.
- Inställningsrader är staplade (etikett ovanför kontroll) så att text aldrig kan överlappa eller klippa, oavsett språk, textstorlek eller panelbredd. Sidofältsetiketter omsluter ordgränser.
- Animationsväljare byggs om som fullbreddsrader med ikoner, så långa översättningar passar.
- **Minimal** panelstil är nu platt och fyrkantig utan glöd, kanter ersatta av avdelare och urval av understrykningsstil, så skillnaden från **Kick** är uppenbar.
- Panelen har en fast bredd på 680 px (den krymper för att passa små fönster). Panelbreddsinställningen och storleksändringshandtaget togs bort, så layouterna är desamma för alla.
- Indikatoranimationens titel säger inte längre "grön" när en annan accentfärg används.

### Fixat

- Ändring av volym, tyst, tyst uppspelning, automatisk volym eller hastighet återförde kvaliteten också (öppna kvalitetsmenyn igen och visa ett meddelande). Dessa inställningar rör nu bara det du ändrade; kvalitet återtillämpas endast när en kvalitetsinställning ändras.
- Att skriva in inställningssökningen kan utlösa Kicks snabbtangenter (till exempel Space bytte strömmen till helskärm). Tangenttryckningar inuti panelen når inte längre sidan.
- Den föredragna volymen skrevs över när Kick återställde spelaren till sina egna 50 % efter en omladdning, och panelreglaget visade 50 %. Ändringar som sidan gör på egen hand återställs nu till din sparade volym; endast dina egna handlingar uppdaterar den.
- Textklippning och överlappning i Utseende, Animationer och Snabbtangenter (långa etiketter, stora textstorlekar, smala paneler, långa översättningar).
- Den minimala stilen inaktiverade tyst inställningen för bakgrundsoskärpa; oskärpa fungerar nu i båda stilarna.
- Att ändra opaciteten för snabbanspråksknappen uppdaterade inte förhandsvisningen.
– Sliders reagerade inte på mushjulet.
- Animationsbrickor ("Skala", "Pop") svämmar över sina kort.
- Bekräftelse på borttagning av profil använde webbläsarens inbyggda dialogruta.
- Insomningstimerchips var inte lokaliserade.
- Sparade kanaler visade inga avatarer, och den aktuella kanalen visade inga förrän dess profil sparades.

### Kompatibilitet

- Befintliga inställningar och sparade kanaler bevaras vid uppdatering från v1.3.0, v1.2.0 och v1.1.0.
- Skriptet skickar fortfarande ingen telemetri och gör inga egna nätverksbegäranden.

### Länkar

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problem](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Fullständig omdesign, en logisk inställningsstruktur, ett ombyggt animationssystem och en omgång med tillförlitlighetsfixar för spelarens automatisering.

### Tillagd

- Omdesignad panel med ett grupperat sidofält: **Spelare** (Uppspelning, kanaler, verktyg), **Alerts** (Meddelanden, ljud), **Gränssnitt** (Utseende, animeringar, genvägar) och **System** (Diagnostik, Data och om).
- Ny sida **Animationer**: en liveförhandsvisning, tre förinställningar med ett klick (Fullständig, Reducerad, Av) och separata väljare för öppningseffekten (Ingen, Tona, Slide, Skala, Pop), hovringseffekt, indikatoranimering och hastighet.
- Snabba förinställningar för att spara bandbredd, bästa kvalitet, tyst visning och VOD, tillämpas direkt.
- Kvalitetsplockare omdesignad som ett spånnät; hastighet, textskala och vilotimer använder marker och segmenterade kontroller istället för rullgardinsmenyn.
- Inline kanalhanterare: sökning, sortering, fästning, grupper, anteckningar, redigering per kanal och fullständig säkerhetskopiering/återställning, allt utan kapslade dialogrutor.
- Inline ljudinställningar med en omkopplare per händelse, volym och förhandsgranskningsknapp.
- Kvalitetsskanning i diagnostik: öppnar spelarmenyn, registrerar tillgängliga kvaliteter och stänger den igen.
- Snabbtangenter fungerar nu på alla tangentbordslayouter (de matchas av fysiska tangenter).
- Inställningar synkroniseras mellan öppna Kick-flikar.
- Accentfärgsrutor bredvid den anpassade färgväljaren, ett högre textskalaområde och ett skydd mot föredrar-reducerad rörelse.

### Ändrad

- Inställningar lagras i ett smalare format; 1.2.x-konfigurationen, snabbtangenterna och animationsvalen migreras automatiskt.
- Uppspelningshastigheten tillämpas bara när den skiljer sig från 1×, så Kicks egen live-edge catch-up åsidosätts inte längre.
- Ångra historik sparas i minnet istället för att skrivas till lokal lagring.
- Ljudhändelser, meddelanden och snabbtangenter delar en enhetlig uppsättning kontroller.
- Väljaren "Situationsprofil" ersätts av förinställningar med ett klick.

### Fixat

- Att stänga spelarmenyn efter att ha tillämpat kvalitet riskerar inte längre att öppna den igen.
- En reservkvalitet (till exempel 720p istället för en otillgänglig 1080p) skriver inte längre över den önskade kvaliteten som sparats för en kanal.
- Endast riktiga klick på kvalitetsartiklar uppdaterar den "senast använda" kvaliteten; automatiska klick ignoreras.
- Inställningssökning misslyckas inte längre efter att ha skrivit (händelsemålet förlorades i Shadow DOM).
- Ändringar som görs på en flik kan inte längre skriva över inställningar från en annan flik.
- Panelsnabbtangenter går inte längre sönder på icke-latinska layouter.
- Felaktiga etiketter i diagnostikloggens kontroller och ett koreanskt ord i den japanska skripttiteln.
- Avstängd uppspelningskontroll och strömsynkroniseringspaus medan fliken är dold.

### Borttagen

- Funktioner som inte kunde verifieras mot Kicks spelare eller duplicerade den: preferenser med låg latens, dölj spelarkontroller på tomgång och den GitHub-baserade uppdateringskontrollen i panelen (använd din användarskripthanterares uppdateringar eller versionssidan).
- Överkonstruerade alternativ: sparade utseendeprofiler, sektionsvisning/dölj/ordna om, alternativa navigeringslägen, kompatibilitets- och översättningstäckningskontroller, slumpmässiga/rullnings-/avsnittsanimationer, varaktighet för aviseringar per händelse, kanalavatarer, gruppfärger, manuell ordning, massval, historik per kanal och automatisk rensning.

### Kompatibilitet

- Befintliga inställningar och sparade kanaler bevaras vid uppdatering från v1.2.0 och v1.1.0.
- Inställningarna förblir lokala för webbläsaren; skriptet skickar inte telemetri eller gör nätverksbegäranden.

### Länkar

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problem](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Utökade den ursprungliga kvalitets- och volymhjälpen till en komplett verktygslåda för spelarinställningar.

### Tillagd

- Profiler per kanal för kvalitet, volym, uppspelningshastighet och tyst läge.
- Sparad kanallista med anteckningar, grupper, profilredigering och import/export.
- Ljudeffekter med en global switch, individuella händelseomkopplare, förhandsvisningar och volym per händelse.
- Meddelanden om kvalitetsförändringar, återställd volym och misslyckade åtgärder.
- Aviseringshistorik, åtgärdslogg och diagnostiska verktyg med tydliga kontroller.
- Tillgänglighetskontroller av kvalitet, konfliktkontroller och kompatibilitetskontroller.
- Säkert läge för att tillfälligt inaktivera automatiska spelarbyten.
- Snabbtangenter, paneldragning, paneländring av storlek och en mittpanelåtgärd.
- Kick- och Minimal-panelstilar, kompakt layout och animeringskontroller.
- Insomningstimer, helskärmsfokusläge, återsynkronisering av spelaren och uppspelningskontroller.
- Import/export av inställningar och kanalprofiler.
- Tangentbordsnavigering, textskalning, skärmläsarmeddelanden och hög kontrast.
- Gränssnittslokalisering för 38 språk som stöds.

### Fixat

- Förhindrade att flera sekundära dialogrutor visades samtidigt.
- Fixat en tom dialogruta som visas ovanför ljudinställningsfönstret.
- Ignorerade tomma aviseringsmeddelanden istället för att visa tomma överlägg.
- Förbättrad långetikettomslag på smala paneler och lokaliserade layouter.
- Fixat utbyte av `{quality}` och `{q}` platshållare i meddelanden.
- Uppdaterade versionsetiketten på panelen och uppdateringsjämförelsen till 1.2.0.

### Kompatibilitet

- Befintliga inställningar bevaras vid uppdatering från v1.1.0.
- Inställningarna förblir lokala för webbläsaren; skriptet skickar inte telemetri.
- Uppdateringskontrollen läser den senaste GitHub release-taggen och installerar inte uppdateringar automatiskt.

### Länkar

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problem](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Den ursprungliga offentliga versionen fokuserade på att komma ihåg videokvalitet och volym på Kick, applicera dem automatiskt på nya strömmar och tillhandahålla en F2-inställningspanel.
