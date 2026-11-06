<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · **Nederlands** · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream-aanpassingen - Changelog

Releaseopmerkingen voor [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), een gebruikersscript dat de voorkeuren van de Kick-speler onthoudt en een configureerbaar configuratiescherm toevoegt.

## v1.3.1 — 06-11-2026

> Lay-outverharding voor elke taal en tekstgrootte, een werkelijk onderscheidende minimalistische stijl, beloningen en lay-outhulpmiddelen, een speler-bevriezingsalarm en een slimmere standaardtaal.

### Toegevoegd

- **Spelerbevriezingsalarm.** Detecteert een vastgelopen speler of een zwart scherm (videotijd beweegt zonder gedecodeerde frames), speelt een luid alarmgeluid af en toont een melding, zelfs wanneer het tabblad is geminimaliseerd. Configureerbare detectietijd (5–60 s), onafhankelijke geluidsschakelaar en een testknop.
- **Beloningen automatisch claimen** (standaard uitgeschakeld): opent het beloningsvenster, claimt wat beschikbaar is, sluit het weer en keert terug naar de stream. Drops die in het beloningspaneel verschijnen, worden ook geclaimd. Bevat een knop *Nu claimen*.
- **Beloningsschema.** Standaard wacht het script op Kick's eigen melding "claim je beloning" en claimt deze meteen (met een optionele vertraging van 0-60 seconden), in plaats van te pollen. Er is ook een geplande modus (elke 5-60 minuten) beschikbaar.
- **Knop voor snel claimen.** Een kleine zwevende knop in de stream waarmee u uw beloning met één klik kunt claimen. Sleep het ergens heen (de positie wordt onthouden), kies een van de vier ontwerpen (Orb, Pill, Glass, Flat), vijf ingebouwde pictogrammen, een maat en een dekking, en laat het eventueel alleen zien als er een beloning beschikbaar is. Het licht op en toont een stip wanneer de beloningsmelding van Kick verschijnt. De instellingenpagina heeft een live preview.
- **Uw eigen pictogram.** Upload een PNG, JPG, WebP, GIF of SVG (tot 2 MB) als knoppictogram, waarbij u optioneel de hele knop kunt vullen. De afbeelding wordt opnieuw gecodeerd tot een klein vierkantje en alleen in uw browser opgeslagen.
- **Muiswiel op schuifregelaars.** Elke schuifregelaar kan worden aangepast met het muiswiel terwijl u erover zweeft, zonder door het paneel te scrollen.
- **Functiereferentie.** Nieuwe `en_FUNCTIONS.md` documenteert de architectuur, elke instelling, elke functie en de delen van Kick's pagina waarvan het script afhankelijk is.
- **Begeleide kanalen opslaan.** Een stap-voor-stap "Hoe opgeslagen kanalen werken"-kaart, een enkele knop **Sla dit kanaal op** die de huidige kwaliteit, volume, snelheid en geluid opslaat voor het kanaal dat u bekijkt, een hint met één klik bij het afspelen voor niet-opgeslagen kanalen, een bevestigingstoast met de knoppen *Bewerken* / *Gereed* in de lijst en een schakelaar om opgeslagen instellingen te pauzeren zonder ze te verwijderen.
- **Stille weergave.** Zet de stream stil zonder de speler te dempen, zodat deze op een achtergrondtabblad blijft spelen. Werkt globaal en per opgeslagen kanaal (in de kanalenlijst wordt een *Silent*-tag weergegeven).
- **Zoeken naar meertalige instellingen.** Zoeken is accentongevoelig en komt ook overeen met de Engelse namen, dus als u `volume` typt, vindt u de instelling in elke interfacetaal. Zoeken op sectie of kaarttitel toont de hele sectie.
- **Besturingselementen voor pagina-indeling**: verberg de chat en vouw het linkermenu samen vanuit het paneel of met sneltoetsen (`Alt+C`, `Alt+S`), met een optie om de lay-out voor elke stream te onthouden.
- **Icoonanimaties** voor de zijbalk, reset- en helppictogrammen, met hun eigen schakelaar (ook onderdeel van de animatie-presets).
- **Kanaalavatars** worden vastgelegd van Kick en weergegeven in de opgeslagen kanalenlijst.
- 14 accentkleuren (was 6).
- Bevestigingsdialoogvenster in het paneel dat er in elke browser hetzelfde uitziet.

### Gewijzigd

- **Interfacetaal** volgt nu de browsertaal bij de eerste keer opstarten. Zodra u een taal kiest, wordt deze onthouden. Instellingen die zijn gemigreerd uit oudere versies volgen de browser totdat er expliciet een taal wordt gekozen.
- Het script begint nu bij `document-start`, zodat de toetsenbordisolatie ervan wordt geregistreerd vóór de eigen luisteraars van de pagina.
- Instellingenrijen zijn gestapeld (label boven besturingselement), zodat tekst nooit kan overlappen of afknippen, in welke taal, tekstgrootte of paneelbreedte dan ook. Zijbalklabels lopen rond de woordgrenzen.
- Animatiekiezers worden opnieuw opgebouwd als rijen over de volledige breedte met pictogrammen, zodat lange vertalingen passen.
- **Minimale** paneelstijl is nu plat en vierkant zonder glans, randen vervangen door scheidingslijnen en onderstrepingsstijlselectie, dus het verschil met **Kick** is duidelijk.
- Het paneel heeft een vaste breedte van 680 px (het krimpt zodat het in kleine vensters past). De paneelbreedte-instelling en de formaatgreep zijn verwijderd, zodat de lay-outs voor iedereen hetzelfde zijn.
- De titel van de indicatoranimatie zegt niet langer "groen" wanneer een andere accentkleur wordt gebruikt.

### Vast

- Door het volume te wijzigen, dempen, stil afspelen, automatisch volume of snelheid wordt de kwaliteit ook opnieuw toegepast (het kwaliteitsmenu opnieuw openen en een melding weergeven). Die instellingen hebben nu alleen betrekking op wat je hebt gewijzigd; kwaliteit wordt alleen opnieuw toegepast als een kwaliteitsinstelling verandert.
- Als je de zoekfunctie voor instellingen intypt, kunnen de sneltoetsen van Kick worden geactiveerd (Space schakelt de stream bijvoorbeeld naar volledig scherm). Toetsaanslagen in het paneel bereiken de pagina niet meer.
- Het voorkeursvolume werd overschreven toen Kick de speler na een herlaadbeurt naar zijn eigen 50% resette en de paneelschuifregelaar 50% liet zien. Wijzigingen die de pagina zelf aanbrengt, worden nu teruggezet naar uw opgeslagen volume; alleen uw eigen acties werken het bij.
- Tekst knippen en overlappen in uiterlijk, animaties en sneltoetsen (lange labels, grote tekstformaten, smalle panelen, lange vertalingen).
- De Minimal-stijl schakelde stilletjes de instelling voor achtergrondvervaging uit; vervagen werkt nu in beide stijlen.
- Het wijzigen van de transparantie van de snelclaimknop heeft het voorbeeld niet bijgewerkt.
- Schuifregelaars reageerden niet op het muiswiel.
- Animatietegels ("Scale", "Pop") die overlopen van hun kaarten.
- Verwijderingsprofielbevestiging gebruikte het eigen dialoogvenster van de browser.
- Slaaptimerchips waren niet gelokaliseerd.
- Opgeslagen kanalen vertoonden geen avatars, en het huidige kanaal toonde er geen totdat het profiel werd opgeslagen.

### Compatibiliteit

- Bestaande instellingen en opgeslagen kanalen blijven behouden bij het updaten vanaf v1.3.0, v1.2.0 en v1.1.0.
- Het script verzendt nog steeds geen telemetrie en doet zelf geen netwerkverzoeken.

### Koppelingen

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemen](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 03-11-2026

> Volledig herontwerp, een logische instellingenstructuur, een opnieuw opgebouwd animatiesysteem en een reeks betrouwbaarheidsoplossingen voor de spelerautomatisering.

### Toegevoegd

- Opnieuw ontworpen paneel met een gegroepeerde zijbalk: **Speler** (Afspelen, Kanalen, Tools), **Waarschuwingen** (Meldingen, Geluiden), **Interface** (Uiterlijk, Animaties, Snelkoppelingen) en **Systeem** (Diagnostiek, Gegevens en over).
- Nieuwe **Animaties**-pagina: een live preview-fase, drie voorinstellingen met één klik (Volledig, Verkleind, Uit) en afzonderlijke pickers voor het openingseffect (Geen, Vervagen, Schuiven, Schalen, Pop), zweefeffect, indicatoranimatie en snelheid.
- Snelle voorinstellingen voor bandbreedte besparen, beste kwaliteit, stille weergave en VOD, direct toegepast.
- Kwaliteitskiezer opnieuw ontworpen als chipraster; snelheid, tekstschaal en slaaptimer gebruiken chips en gesegmenteerde bedieningselementen in plaats van vervolgkeuzelijsten.
- Inline kanaalbeheer: zoeken, sorteren, vastzetten, groepen, notities, bewerken per kanaal en volledige back-up/herstel, allemaal zonder geneste dialoogvensters.
- Inline geluidsinstellingen met een schakelaar per gebeurtenis, volume en preview-knop.
- Kwaliteitsscan in diagnostiek: opent het spelersmenu, registreert de beschikbare kwaliteiten en sluit deze weer.
- Sneltoetsen werken nu op elke toetsenbordindeling (ze zijn gekoppeld aan een fysieke toets).
- Instellingen synchroniseren tussen geopende Kick-tabbladen.
- Accentkleurstalen naast de aangepaste kleurkiezer, een hoger tekstschaalbereik en een beveiliging tegen verminderde beweging.

### Gewijzigd

- Instellingen worden in een slanker formaat opgeslagen; de 1.2.x-configuratie, sneltoetsen en animatiekeuzes worden automatisch gemigreerd.
- De afspeelsnelheid wordt alleen toegepast als deze afwijkt van 1×, dus Kick's eigen live-edge catch-up wordt niet langer overschreven.
- De geschiedenis van het ongedaan maken wordt in het geheugen bewaard in plaats van naar de lokale opslag te worden geschreven.
- Geluidsgebeurtenissen, meldingen en sneltoetsen delen één consistente set bedieningselementen.
- De selector "Situatieprofiel" is vervangen door voorinstellingen met één klik.

### Vast

- Als u het spelersmenu sluit na het toepassen van kwaliteit, riskeert u niet langer dat u het opnieuw opent.
- Een fallback-kwaliteit (bijvoorbeeld 720p in plaats van een niet-beschikbare 1080p) overschrijft niet langer de voorkeurskwaliteit die voor een kanaal is opgeslagen.
- Alleen echte klikken op kwaliteitsitems updaten de kwaliteit "laatst gebruikt"; geautomatiseerde klikken worden genegeerd.
- Het zoeken naar instellingen mislukt niet meer na het typen (gebeurtenisdoel is verloren gegaan in de Shadow DOM).
- Wijzigingen die op het ene tabblad zijn aangebracht, kunnen de instellingen van een ander tabblad niet meer overschrijven.
- Paneelsneltoetsen werken niet meer bij niet-Latijnse lay-outs.
- Onjuiste labels in de diagnostische logboekbesturingselementen en een verdwaald Koreaans woord in de Japanse scripttitel.
- Controles bij vastgelopen afspelen en pauzeren van streamsynchronisatie terwijl het tabblad verborgen is.

### Verwijderd

- Functies die niet konden worden geverifieerd tegen de speler van Kick of deze konden dupliceren: voorkeur voor lage latentie, spelerbediening verbergen bij inactiviteit en de op GitHub gebaseerde updatecontrole in het paneel (gebruik de updates van je gebruikersscriptmanager of de Releases-pagina).
- Overontwikkelde opties: opgeslagen weergaveprofielen, sectie tonen/verbergen/herordenen, alternatieve navigatiemodi, compatibiliteit en controles van vertalingsdekking, willekeurige/scroll/sectie-animaties, meldingsduur per gebeurtenis, kanaalavatars, groepskleuren, handmatige volgorde, bulkselectie, geschiedenis per kanaal en automatisch opschonen.

### Compatibiliteit

- Bestaande instellingen en opgeslagen kanalen blijven behouden bij het updaten vanaf v1.2.0 en v1.1.0.
- Instellingen blijven lokaal in de browser; het script verzendt geen telemetrie en doet geen netwerkverzoeken.

### Koppelingen

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemen](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 07-10-2026

> De originele kwaliteits- en volumehulp uitgebreid tot een volledige toolkit voor spelerinstellingen.

### Toegevoegd

- Profielen per kanaal voor kwaliteit, volume, afspeelsnelheid en mute-status.
- Opgeslagen zenderlijst met notities, groepen, profielbewerking en import/export.
- Geluidseffecten met een globale schakelaar, individuele gebeurtenisschakelaars, previews en volume per gebeurtenis.
- Meldingen voor kwaliteitswijzigingen, hersteld volume en mislukte acties.
- Meldingsgeschiedenis, actielogboek en diagnostische hulpmiddelen met duidelijke bedieningselementen.
- Kwaliteitsbeschikbaarheidscontroles, conflictcontroles en compatibiliteitscontroles.
- Veilige modus voor het tijdelijk uitschakelen van automatische spelerwisselingen.
- Sneltoetsen, paneel slepen, paneelgrootte wijzigen en een actie op het middenpaneel.
- Kick- en minimale paneelstijlen, compacte lay-out en animatiebediening.
- Slaaptimer, focusmodus op volledig scherm, hersynchronisatie van de speler en afspeelknoppen.
- Import/export van instellingen en kanaalprofielen.
- Toetsenbordnavigatie, tekstschaling, schermlezeraankondigingen en hoog contrast.
- Interfacelokalisatie voor 38 ondersteunde talen.

### Vast

- Voorkomen dat meerdere secundaire dialoogvensters tegelijkertijd verschijnen.
- Probleem opgelost dat een leeg dialoogvenster boven het venster met geluidsinstellingen verscheen.
- Lege meldingsberichten genegeerd in plaats van lege overlays te tonen.
- Verbeterde verpakking van lange labels op smalle panelen en gelokaliseerde lay-outs.
- Vervanging van `{quality}` en `{q}` tijdelijke aanduidingen in meldingen opgelost.
- Het versielabel in het paneel en de updatevergelijking bijgewerkt naar 1.2.0.

### Compatibiliteit

- Bestaande instellingen blijven behouden bij het updaten vanaf v1.1.0.
- Instellingen blijven lokaal in de browser; het script verzendt geen telemetrie.
- De updatecontrole leest de nieuwste releasetag van GitHub en installeert updates niet automatisch.

### Koppelingen

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problemen](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

De originele openbare versie was gericht op het onthouden van de videokwaliteit en het volume op Kick, het automatisch toepassen ervan op nieuwe streams en het bieden van een F2-instellingenpaneel.
