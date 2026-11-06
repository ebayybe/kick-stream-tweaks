<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · **Norsk** · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Funksjonsreferanse

Referanse for Kick Stream Tweaks 1.3.1. Den beskriver hva hvert funksjonsområde gjør, hvordan innstillingene lagres, hvilke deler av Kicks side skriptet avhenger av, og hvordan hver navngitte funksjon eller metode i brukerskriptet fungerer. Se [depotet](https://github.com/ebayybe/kick-stream-tweaks) og [endringsloggen](../CHANGELOG/en_CHANGELOG.md) .

> Navn samsvarer med kilden. `void` betyr at en funksjon virker gjennom bivirkninger. En metode skrevet som `Object.method` lever på det objektet ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Innhold

1. [Arkitektur](#architecture)
2. [Brukervendt atferd](#user-facing-behavior)
3. [Innstillingsreferanse](#settings-reference)
4. [Kjerneverktøy](#core-utilities)
5. [Lagring av innstillinger](#settings-storage)
6. [Spillersynkronisering ( `PlayerSync` )](#player-synchronization-playersync)
7. [Sidetillegg ( `Extras` )](#page-extras-extras)
8. [Grensesnitt byggesteiner](#interface-building-blocks)
9. [Innstillingssider ( `PAGES` )](#settings-pages-pages)
10. [Panelkontroller ( `GUI` )](#panel-controller-gui)
11. [Hurtigtaster og oppstart](#hotkeys-and-startup)
12. [Kick side-avhengigheter](#kick-page-dependencies)
13. [Lokalisering](#localization)
14. [Sikkerhet, personvern og kompatibilitet](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arkitektur

Brukerskriptet er en selvstendig fil som kjører ved `document-start` med `@grant none` . Den har ingen byggetrinn og gjør ingen egne nettverksforespørsler.

| Lag | Objekt / område | Ansvar |
|---|---|---|
| Data | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Oversettelser for 38 språk, lokaliserte diagnostiske meldinger, flagg-SVG-er og språknavn. |
| Konfigurasjon | `CONFIG` , `DEFAULTS` | Konstanter (velgere, gjentatte forsøksgrenser, forhåndsinnstillinger, seksjoner) og standardinnstillinger. |
| Oppbevaring | `sanitizeSettings` , `Store` , `persist` | Validerer og lagrer innstillinger i `localStorage` ; beholder en angrestabel i minnet. |
| Spillerlogikk | `PlayerSync` | Finner videoen, gjenoppretter kvalitet, volum, hastighet og stille modus, ser etter fryser. |
| Sidehjelpere | `Extras` | Layoutknapper, belønningskrav, kanalavatarer og bakgrunnsplanleggeren. |
| Grensesnitt | `PAGES` , `GUI` , hjelpere | Shadow-DOM-panel, varsler, lyder, flytende hurtigkravknapp, hurtigtaster. |

Dataflyt: 1,5-sekunders `PlayerSync.sync` -løkken leser de effektive innstillingene (kanalprofil først, deretter global), bruker dem på spilleren og kaller `Extras.tick` . Brukerhandlinger går gjennom `GUI` behandlere, som oppdaterer innstillingene med `persist` og skyver kun den berørte delen til spilleren ( `media` eller `all` ).

<a id="user-facing-behavior"></a>
## Brukervendt atferd

| Område | Atferd |
|---|---|
| Spillerens utholdenhet | Lagrer live/VOD-kvalitet, volum, dempet tilstand, stille modus og hastighet, og bruker dem deretter når en ny strøm oppdages. Endringer siden gjør av seg selv (for eksempel Kick tilbakestilling av volumet til 50%) blir tilbakestilt; bare seerens egne handlinger oppdaterer de lagrede verdiene. |
| Kvalitet | Velger den foretrukne kvaliteten gjennom spillermenyen, faller tilbake til den neste lavere (eller Auto) når den ikke er tilgjengelig, og lukker menyen igjen. Bare ekte brukerklikk lærer skriptet en ny "sist brukt" kvalitet. |
| Volum og stille avspilling | Volum og demping gjenopprettes per strøm. Stille avspilling ruter videoen gjennom weblydmotoren med null forsterkning, slik at strømmen fortsetter å spille i en bakgrunnsfane uten å bli dempet. |
| Kanalprofiler | **Lagre denne kanalen** lagrer gjeldende kvalitet, volum, hastighet og lyd for kanalen du ser på. Profiler inneholder også notater, grupper, pin-status, en avatar og de aktiverte/ekskluderte flaggene. |
| Forhåndsinnstillinger | Spar båndbredde, beste kvalitet, stille visning og VOD gjelder med ett klikk. |
| Panel | `F2` eller en egendefinert hurtigtast åpner et panel med fast bredde (680 px) med en gruppert sidefelt, søk, Kick og Minimal-stiler, lyse/mørke temaer, 14 aksentfarger pluss en fargevelger, kompakt layout, bakgrunnsuskarphet, tekstskalering, høykontrast og animasjonskontroller. |
| Søk | Aksentufølsom, matcher grensesnittspråket og de engelske navnene, og matcher seksjons- eller korttitler. Tastetrykk tastet inn i panelet når aldri Kicks hurtigtaster. |
| Skyveknapper | Hver glidebryter reagerer på klikk, dra, tastaturpiler og musehjulet. |
| Høres | Weblydsignaler for menyhandlinger, innstillingsendringer, kvalitetssuksess/-feil og volumgjenoppretting, hver med en bryter, forhåndsvisning og volum. |
| Varsler | Lokaliserte meldinger som kan dras, skaleres, gjøres gjennomsiktige, lydløse (ikke forstyrr, stille fullskjerm) og registreres i historien. |
| Frys alarm | Oppdager en stoppet spiller eller en svart skjerm, spiller av en høy alarm (selv i en skjult fane, uavhengig av lydeffektbryteren) og viser et varsel. |
| Belønninger | Valgfritt automatisk krav venter på Kicks belønningsvarsel (eller kjører på en tidsplan), åpner belønningsvinduet, gjør krav på det som er tilgjengelig og lukker det. En flytende, drabar hurtigkravknapp gjør det samme med ett klikk. |
| Layout | Skjuler chatten og skjuler venstremenyen fra panelet eller med hurtigtaster, og husker eventuelt valget for hver strøm. |
| Verktøy | Innsovningstimer, fokusvisning (fullskjerm), resynkronisering av spilleren og en sikker modus som pauser hver automatisk endring. |
| Diagnostikk | Livestatus, oppdagede kvaliteter, videooppløsning, kvalitetsskanning, konfliktsjekk, handlingslogg og en kopierbar rapport. |
| Data | Eksporter/import av innstillinger, angre, gjenopprett etter tilbakestilling, backup/gjenoppretting av lagrede kanaler. |
| Personvern | Innstillinger, profiler, logger og historier forblir i nettleserlagringen. Ingenting sendes noe sted. |

<a id="settings-reference"></a>
## Innstillingsreferanse

Alle verdier er validert av `sanitizeSettings` ; noe ugyldig faller tilbake til standard. Rekkevidder håndheves.

### Spiller

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `autoQualityEnabled` | boolsk | `true` | Bruk den foretrukne kvaliteten automatisk. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalitet for å søke om direktesendinger og VOD-er. `auto` betyr "husk mitt siste valg". |
| `lastLiveQuality` , `lastVodQuality` | samme | `auto` | Siste kvalitet valgte seeren for hånd. |
| `qualityFallback` | `lower` , `auto` | `lower` | Hva du skal gjøre når den foretrukne kvaliteten ikke tilbys. |
| `autoVolumeEnabled` | boolsk | `true` | Gjenopprett og beskytt det lagrede volumet. |
| `volume` | 0–1 | `1` | Lagret volum. |
| `muted` | boolsk | `false` | Lagret demp-tilstand. |
| `silent` | boolsk | `false` | Stille avspilling (lydgraf med null forsterkning, spilleren er ikke dempet). |
| `playbackRate` | 0,25–2,5 | `1` | Lagret hastighet; `1` blir aldri tvunget. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolsk; 60–100, trinn 5 | `true` ; `85` | Advarsel om høyt volum. |
| `safeMode` | boolsk | `false` | Sett hver automatisk endring på pause. |
| `channelProfiles` | objekt, opptil 200 | `{}` | Profiler per kanal (se nedenfor). |

Kanalprofilfelt: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (kun `https://…kick.com/images/user/…` URLs), `note` (240 tegn), `group` (40 tegn , sist oppdaterte tegn), `updatedAt` `lastUsed` .

### Varsler og lyder

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `notificationsEnabled` | boolsk | `true` | Vis resultatvarsler. |
| `doNotDisturb` , `quietFullscreen` | boolsk | `false` , `true` | Undertrykk varsler og lyder, eller bare i fullskjerm. |
| `notificationScale` | 0,8–1,4 | `1` | Varslingsstørrelse. |
| `notificationDuration` | 1500–12000 ms, trinn 500 | `3500` | Hvor lenge et varsel varer. |
| `notificationOpacity` | 0,35–1 | `0.95` | Varslingsgjennomsiktighet. |
| `notificationShowIcon` | boolsk | `true` | Vis statusikonet. |
| `notificationPosition` | `{x, y}` eller `null` | `null` | Dratt posisjon. |
| `notificationHistoryEnabled` , `notificationHistory` | boolsk; opptil 30 oppføringer | `true` ; `[]` | Historien om varsler. |
| `soundEffectsEnabled` , `soundVolume` | boolsk; 0–1 | `false` ; `0.35` | Hovedbryter og volum. |
| `soundEvents` , `soundEventVolumes` | per hendelse: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | alt på; `0.35` | Bryter og volum per hendelse. |

### Utseende, bevegelse og snarveier

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Fargetema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Visuell stil på panelet. |
| `accentColor` | `#rrggbb` | `#53fc18` | Aksentfarge. |
| `compactMode` , `highContrast` | boolsk | `false` | Tetthet og kontrast. |
| `backdropBlur` | 0–12 px | `6` | Bakgrunnsuskarphet bak panelet (fungerer i begge stiler). |
| `textScale` | 0,9–1,3 | `1` | Tekststørrelse. |
| `language` , `languageChosen` | lokalkode; boolsk | nettleserspråk; `false` | Grensesnittet følger nettleserspråket til et språk er valgt, deretter huskes valget. |
| `panelPosition` | `{x, y}` eller `null` | `null` | Dra panelposisjon. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Animasjonshastighet. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Panel åpen/lukke effekt. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hover effekt. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logo/indikator animasjon. |
| `iconAnimations` | boolsk | `true` | Animer sidefelt, tilbakestill og hjelpeikoner. |
| `hotkey` | kombinasjonsstreng | `F2` | Åpner eller lukker panelet. |
| `actionHotkeys` | combo strenger | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Veksle varsler, fokusvisning, tilbakestill kvalitet, gjenopprett volum, veksle chat, veksle venstre meny. |

Tastekombinasjoner lagres som strenger som `Alt+Q` og matches av fysisk nøkkel, slik at de fungerer på alle tastaturoppsett. Innstillinger fra eldre versjoner med en objektformet hurtigtast konverteres automatisk. Panelbredden er fastsatt til 680 px (begrenset til vindusstørrelsen); den tidligere breddeinnstillingen ignoreres.

### Verktøy

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `autoRecoverStall` | boolsk | `false` | Prøv `play()` når en fryser oppdages. |
| `freezeAlertEnabled` , `freezeSound` | boolsk | `true` | Frys varsling og alarmlyd. |
| `freezeSeconds` | 5–60, trinn 5 | `10` | Sekunder uten fremgang før alarmen. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolsk | `false` | Husket layout, brukt én gang per side. |
| `autoClaimRewards` | boolsk | `false` | Aktiver automatisk krav om belønning. |
| `claimMode` | `notify` , `interval` | `notify` | Gjør krav når Kick viser varselet sitt, eller på en tidsplan. |
| `claimDelaySec` | 0–120, trinn 5 | `5` | Vent etter at varselet vises (varslingsmodus). |
| `claimIntervalMin` | 5–120, trinn 5 | `10` | Minutter mellom kontrollene (planlagt modus). |

### Hurtigkravknapp

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `claimWidget` | boolsk | `false` | Vis den flytende knappen. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Knappdesign. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Innebygd ikon, eller brukerens eget bilde. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , opptil 90 000 tegn | tom | Omkodet kopi av det opplastede bildet. Noe annet blir avvist. |
| `claimWidgetImageFill` | boolsk | `false` | La et tilpasset bilde fylle hele knappen (brukes ikke av pilledesignet). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Knappstørrelse. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Knappopasitet (full opasitet mens en belønning er tilgjengelig). |
| `claimWidgetAutoHide` | boolsk | `false` | Vis knappen bare når en belønning er tilgjengelig. |
| `claimWidgetPos` | `{x, y}` eller `null` | `null` | Dratt posisjon. |

### Diagnostikk og tilstand

| Nøkkel | Type / område | Standard | Betydning |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolsk; opptil 60 oppføringer | `true` ; `[]` | Handlingslogg. |
| `activeSection` | seksjons-ID | `playback` | Sist åpnet side. |
| `resetBackup` | innstillingsobjekt | `null` | Øyeblikksbilde tatt før en tilbakestilling eller en import. |

<a id="core-utilities"></a>
## Kjerneverktøy

| Funksjon | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `detectLanguage` | — → lokalitet | Går `navigator.languages` ​​, kartlegger regionale varianter ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) og returnerer den første støttede lokaliteten, eller `en` . |
| `dictFor` | lang → ordbok | Returnerer oversettelsestabellen for en lokalitet, og faller tilbake til basisspråket og deretter engelsk. |
| `t` / `T` | lang, nøkkel, vars → streng | Løser en nøkkel med `{placeholder}` -erstatning; `T` bruker gjeldende språk. |
| `diagText` | indeks, kvalitet → streng | Returnerer en av de lokaliserte diagnostiske setningene. |
| `log` | …args → void | Konsolllogging med skriptprefikset. |
| `clamp` , `sleep` , `esc` | verdi → verdi | Rekkeviddebegrensning, løftebasert forsinkelse og HTML-escape. |
| `normalizeQuality` | tekst → streng | Små bokstaver på en kvalitetsetikett og fjerner mellomrom. |
| `debounce` | fn, vent → funksjon | Etterfølgende debounce med en `flush` metode. |
| `onLocationChange` | tilbakeringing → void | Oppdager enkeltsidenavigering ved å bryte `pushState` / `replaceState` , lytte til `popstate` og polling én gang per sekund. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | hendelse → streng/boolsk | Bygg og sammenlign nøkkelkombinasjoner fra den fysiske nøkkelkoden. |
| `mkPointer` | type, ekstra → hendelse | Oppretter en `PointerEvent` (eller en `MouseEvent` når den ikke er tilgjengelig) som brukes til å drive Kicks ARIA-menyer. |
| `waitFor` | sonde, tidsavbrudd, trinn → verdi/null | Polls til sonden returnerer en verdi eller tidsavbruddet avsluttes. |
| `imageToDataUrl` | bilde → streng | Skalerer et bilde til et firkantet lerret (beholder proporsjoner, `willReadFrequently` ), prøver 128, 96 og 64 px og returnerer en PNG-data-URL som ikke er større enn 70 000 tegn. |

<a id="settings-storage"></a>
## Lagring av innstillinger

| Funksjon | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Holder maksimalt 200 profiler med gyldige nøkler og klemmer hvert felt; avataren må være en Kick-bilde-URL. |
| `sanitizeSettings` | objekt, med Backup → objekt | Validerer hver innstilling (typer, områder, tillatte verdier), migrerer 1.1–1.3 innstillinger (eldre kvalitet, hurtigtast, animasjon og seksjonsnøkler) og bruker språkregelen. |
| `legacyHotkey` | verdi → streng | Konverterer en objektformet hurtigtast til en kombinasjonsstreng. |
| `Store.load` / `Store.save` | — / innstillinger → innstillinger/ugyldig | Les og skriv det rensede objektet i `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | lapp, `{undo}` → ugyldig | Slår sammen en oppdatering, renser, lagrer med en kort debounce og skyver eventuelt et angre øyeblikksbilde (bare lagret i minnet, opptil 15). |
| `storage` | hendelse → ugyldig | Laster inn innstillingene på nytt når en annen Kick-fane endrer dem, slik at faner aldri overskriver hverandre. |

<a id="player-synchronization-playersync"></a>
## Spillersynkronisering ( `PlayerSync` )

### Kanal- og profilhjelpere

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `isVod` | — → boolsk | Oppdager en VOD-side fra URL-en. |
| `channelKey` | — → streng | Bygger den stabile `channel:slug` nøkkelen (eller `vod:id` , `kick:home` ), og lagrer resultatet i tre sekunder. På VOD-sider brukes kanallinken nærmest spilleren. |
| `channelSlug` | — → streng | Returnerer slugdelen av en kanalnøkkel. |
| `profile` | nøkkel → objekt/null | Leser en lagret profil. |
| `profileActive` | — → objekt/null | Returnerer gjeldende profil bare når den er aktivert og ikke ekskludert. |
| `isExcluded` | — → boolsk | Sjekker om automatisering er deaktivert for denne kanalen. |
| `updateProfile` | patch, nøkkel → ugyldig | Oppretter eller slår sammen en profil og stempler `updatedAt` . |
| `saveCurrentChannel` | — → objekt/null | Lagrer seerens gjeldende kvalitet, volum, demping, hastighet og stille tilstand som en aktivert profil og skanner siden etter kanalavataren. |
| `effective` | — → objekt | Løser volum, demping, lydløs, hastighet og live/VOD-kvalitet fra den aktive profilen eller de globale innstillingene. |
| `setStatus` | status, resultat → ugyldig | Oppdaterer status- og sisteresultatkodene vist i overskriften og diagnostikken. |

### Finne og kjøre Kicks spiller

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `findMainVideo` | — → video/null | Velger den største synlige `<video>` . |
| `streamKey` | — → streng | Returnerer sidebanen som ble brukt til å bruke kvalitet én gang per strøm. |
| `isAccountButton` | knapp → boolsk | Avviser header-, avatar- og kontoknapper. |
| `findSettingsButton` | video → knapp/null | Finner spillerens girknapp etter etikett eller ved nærhet til videoens nedre høyre hjørne. |
| `revealControls` | video → void | Sender hover-hendelser slik at skjulte kontroller vises. |
| `simulateClick` | element → void | Sender hele peker-hendelsessekvensen Kicks menyer trenger. |
| `menuItems` | — → element[] | Viser synlige `menuitemradio` oppføringer. |
| `openQualityMenu` | — → knapp/null | Åpner girmenyen, går inn i en kvalitetsoppføring når en meny på øverste nivå vises, og venter på alternativene. |
| `closeMenu` | knapp → Løfte | Lukker menyen bare hvis den fortsatt er åpen (et blinde andre klikk kan åpne den på nytt), med en Escape-reserve. |
| `readMenu` | — → element[] | Registrerer de tilbudte kvalitetene og den sjekkede. |
| `scanQualities` | — → Løfte<boolean> | Åpner menyen, registrerer tilgjengelige kvaliteter og lukker den (brukes av diagnostikk). |
| `activate` | element → Løfte | Klikker på ett alternativ og venter til det er merket av. |
| `selectQuality` | ønsket, fallback → Løfte | Velger ønsket kvalitet, ellers den nest lavere, eller Auto. |
| `desiredQuality` | — → streng | Velger kvaliteten som skal brukes fra profilen, preferansen eller det siste manuelle valget. |
| `applyQualityOnce` | streamKey → Promise | Bruker ønsket kvalitet én gang per strøm, lukker menyen og varsler om suksess eller fiasko. |
| `watchManualQuality` | — → ugyldig | Lærer en ny "sist brukt" kvalitet kun fra ekte (klarerte) klikk, slik at automatiske klikk og reserver aldri overskriver lagrede verdier. |

### Volum, stille modus, hastighet og overvåking

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `applyVolume` | video, stille → void | Skriver det effektive volumet og demp-tilstanden (merket som skriptets egen endring). |
| `trackInput` | — → ugyldig | Registrerer tiden for siste pålitelige peker-, hjul-, berørings- eller tastaturinndata. |
| `reassertVolume` | video → void | Setter det lagrede volumet tilbake når siden endret det uten brukerinndata (hastighetsbegrenset til åtte tilbakeføringer per ti sekunder). |
| `watchVolume` | video → void | Lytter etter `volumechange` : brukerdrevne endringer lagres, sidedrevne blir tilbakestilt. |
| `checkLoud` | volum, dempet → void | Varsler én gang når volumet passerer terskelen. |
| `buildGraph` | video → graf/null | Kobler videoen til en `AudioContext` gjennom en forsterkningsnode; rapporterer når nettstedet ikke tillater det. |
| `applySilent` | video → void | Setter forsterkningen til 0 for stille avspilling eller tilbake til 1, og gjenopptar konteksten ved behov. |
| `applyRate` | video, tvinge → ugyldig | Stiller inn den lagrede hastigheten; `1` blir ikke tvunget med mindre seeren nettopp valgte det, så Kicks egen live-edge-innhenting respekteres. |
| `applyMedia` | video, `{rate}` → ugyldig | Bruker igjen volum, stille modus og valgfri hastighet uten å berøre kvalitet. |
| `monitorFreeze` | video → void | Oppdager en stoppet spiller (tiden fast) eller en svart skjerm (tiden går uten dekodede rammer) og utløser alarmen og valgfri gjenoppretting. Fungerer i skjulte faner. |

### Sløyfe og livssyklus

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `sync` | — → Løfte | Hovedsløyfen: overvåker fryser, binder lyttere, bruker stille modus, volum, hastighet og kvalitet, respekterer sikker modus og ekskluderinger, og ringer deretter `Extras.tick` . |
| `resync` | — → Løfte | Tvinger et nytt pass (brukes av forhåndsinnstillinger, raske handlinger og kvalitetsendringer). |
| `init` | — → ugyldig | Starter den første synkroniseringen, navigasjonslytteren og 1,5 sekunders intervallet. |

<a id="page-extras-extras"></a>
## Sidetillegg ( `Extras` )

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Les Kicks layouttilstand fra `data-chat` og `data-sidebar` på sidebeholderen. |
| `isDesktop` | — → boolsk | Layoutautomatisering kjører bare på skrivebordsbredder. |
| `click` | element → boolsk | Klikker gjennom `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → knapp/null | Finn kollaps-knappen inne i chatterommet og "vis chat"-knappen (etter ikon, ikke etter språk). |
| `setChat` , `setSidebar` | vis → boolsk | Ta chatten eller venstremenyen til ønsket tilstand ved å trykke på Kicks egne knapper. |
| `applyLayout` | — → ugyldig | Bruker det huskede oppsettet én gang per side, uten å kjempe mot manuelle endringer. |
| `isTyping` | — → boolsk | Sant mens seeren skriver i et felt; automatiske krav venter. |
| `rewardTrigger` , `popoverCard` | — → knapp/null | Finn gaveknappen og belønningskortet. |
| `rewardAvailable` | — → boolsk | Oppdager Kicks eget "belønning tilgjengelig"-signal (den animerte oppfordringen til handling). |
| `isEnabled` | knapp → boolsk | Synlig og ikke deaktivert. |
| `claimDrops` | — → Løfte<number> | Trykker på aktiverte kravknapper for fullførte fall i belønningspanelet. |
| `claimDaily` | utløser → Løfte<number> | Åpner belønningsvinduet, trykker på hver aktiverte kravknapp én gang (aldri den samme knappen to ganger), og lukker deretter vinduet. |
| `claimRewards` | `{manual}` → Løft<number> | Kjører et fullstendig krav, rapporterer resultatet og spiller av en lyd; manuelle kjøringer ignorerer skriving og rapporterer når det ikke er noe å kreve. |
| `normName` | tekst → streng | Normaliserer navn for samsvar ( `_` og mellomrom til `-` ). |
| `findAvatar` | snegl → streng | Returnerer kanalavataren som er synlig på siden (brukt før en kanal lagres). |
| `scanAvatars` | — → ugyldig | Lagrer avatarer for lagrede kanaler som mangler en. |
| `tick` | streamKey → void | Planlegger kalt fra `sync` : bruker oppsettet, skanner avatarer, venter på belønningsvarselet (varslingsmodus, med forsinkelse og en to-minutters nedkjøling) eller sjekker det valgte intervallet, og poller drops-panelet. |

<a id="interface-building-blocks"></a>
## Byggeklosser for grensesnitt

| Funksjon | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `I` | navn → svg | Innebygd strekikon. |
| `fmtValue` | format, rå → streng | Formaterer glidebryterverdier (prosent, piksler, sekunder). |
| `normSearch` , `englishOf` , `searchText` | tekst → streng | Aksentufølsom søketekst inkludert det engelske navnet på en oversatt etikett. |
| `row` | nøkkel, etikett, kontroll, alternativer → html | En innstillingsrad; stablet som standard, innebygd kun for brytere, med en valgfri hjelpebryter. |
| `sw` , `toggleRow` | … → html | Bryterstyring og en ferdig koblingsrekke. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, segmenterte kontroller og kvalitetsnettet. |
| `range` | attr, nøkkel, alternativer → html | Slider med fyllspor og live-verdi. |
| `card` , `btn` , `ib` | … → html | Kort, tekstknapp og ikonknapp. |
| `timeStr` | tidsstempel → streng | Lokalisert klokketid. |
| `setPref` | nøkkel, verdi → void | Skriver en spillerpreferanse til den aktive kanalprofilen eller til de globale innstillingene. |
| `fxBtn` | nøkkel, verdi, etikett, på → html | Effektvelgerflis med en liten forhåndsvisningsglyph. |
| `avatarHtml` | navn, url → html | Avatar med en bokstavreserve; et mislykket bilde fjernes. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → verdi | Bygg oppmerkingen for hurtigkravknapp for både live-knappen og forhåndsvisningen av innstillinger. |

<a id="settings-pages-pages"></a>
## Innstillingssider ( `PAGES` )

| Side | Innhold |
|---|---|
| `playback` | Lagre-denne-kanalen hint, forhåndsinnstillinger, kvalitet (automatisk bruk, live, VOD, fallback), volum (automatisk bruk, skyveknapp, demp, stille avspilling, høy advarsel) og hastighet. |
| `channels` | Slik fungerer-det-trinn, gjeldende kanal med **Lagre denne kanalen-** knappen, pause/ekskluder brytere og editor, deretter listen over lagrede kanaler (søk, sorter, pin filter, grupper, Rediger/Ferdig, slett) med sikkerhetskopiering og gjenoppretting. |
| `tools` | Sovetidtaker, sidelayout, belønninger (automatisk krav, modus, forsinkelse eller intervall, gjør krav nå), innstillinger for hurtigkravknapp med direkte forhåndsvisning, frysealarm og raske handlinger. |
| `notifications` | Brytere, størrelse, varighet, opasitet, forhåndsvisning, tilbakestilling av posisjon og historikk. |
| `sounds` | Hovedbryter og volum, brytere per hendelse, volum og forhåndsvisninger. |
| `appearance` | Tema, stil, aksentfarger, tetthet, kontrast, tekststørrelse, uskarphet, sentrering og språk. |
| `motion` | Live forhåndsvisning, forhåndsinnstillinger og velgere for åpen effekt, sveveeffekt, indikator, hastighet og ikonanimasjoner. |
| `shortcuts` | Meny hurtigtast og handling hurtigtaster med rebinding. |
| `diagnostics` | Status, skanning, rapport, kvalitets- og konfliktkontroller, sikker modus og handlingslogg. |
| `about` | Versjon, koblinger, eksport/import, angre, gjenopprett og tilbakestill. |

<a id="panel-controller-gui"></a>
## Panelkontroller ( `GUI` )

### Konstruksjon og gjengivelse

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `build` | — → ugyldig | Oppretter shadow-DOM-verten, panelet, toast- og live-regionen, og kobler deretter hendelser. |
| `applyLook` | — → ugyldig | Bruker tema, stil, aksent, uskarphet, tekstskala, effekter, språkattributt og toastinnstillinger som attributter og CSS-variabler. |
| `renderChrome` | — → ugyldig | Gjengir tittel, søkeplassholder, pauseknapp, bunnteksthint og hurtigkrav-knappen. |
| `renderNav` | — → ugyldig | Gjengir det grupperte sidefeltet. |
| `renderPage` | alternativer → ugyldig | Gjengir den aktive siden (eller alle sidene mens du søker), og beholder rulle- og tastaturfokus. |
| `filterRows` | — → ugyldig | Bruker søkefilteret på rader, kort og sider. |
| `channelEditor` | nøkkel, profil → html | Redaktør for én kanalprofil. |
| `refreshAll` , `onExternalChange` | — → ugyldig | Gjengi alt på nytt etter tilbakestilling, import, angre eller endring fra en annen fane. |

### Hendelser og innstillinger endres

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `wire` | — → ugyldig | Legger ved delegerte klikk-, inn-, endrings-, hjul- og rullehåndtere og paneldra. |
| `onClick` , `onInput` , `onChange` | hendelse → ugyldig | Send klikk, skyvebevegelser og tekstredigeringer til innstillinger, profiler eller handlinger. |
| `applyRange` | nøkkel, verdi → void | Bruker en glidebryterverdi (volum, uskarphet, opasitet, varighet...). |
| `setSetting` , `setChannel` | nøkkel/patch → ugyldig | Lagre en innstilling eller en profilendring og skyv den berørte delen til spilleren. |
| `pushToPlayer` | omfang, nøkkel → ugyldig | `media` bruker volum, stille modus og hastighet på nytt; `all` gjelder også kvalitet på nytt. Volum, demp, stille modus og hastighet åpner aldri kvalitetsmenyen igjen. |
| `act` | navn, element → Løfte | Kjører navngitte handlinger: forhåndsinnstillinger, lagring og fjerning av kanaler, sikkerhetskopiering, import/eksport, krav, hviletid, snarveier, diagnostikk og mer. |
| `resetSection` | id → void | Gjenoppretter standardinnstillingene for én seksjon. |
| `restoreVolume` | — → ugyldig | Bruker det lagrede volumet på nytt. |
| `toggleLayout` | som → ugyldig | Skjuler eller viser chatten eller venstremenyen og husker valget. |
| `confirm` , `closeModal` | melding, alternativer / resultat → Løfte/ugyldig | Bekreftelsesdialog i panelet (identisk i alle nettlesere). |
| `download` , `pickFile` , `pickImage` | … → ugyldig | Lagre JSON, les JSON og velg et bilde for hurtigkrav-knappen. |
| `startCapture` , `finishCapture` | id / kombinasjon → ugyldig | Bind en hurtigtast på nytt, avvis duplikater. |
| `replayMock` | — → ugyldig | Spiller den åpne effekten på nytt i forhåndsvisningen av animasjonen. |

### Verktøy og diagnostikk

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutter / — → ugyldig | Start, avbryt og vis innsovningstimeren (den pauser videoen på slutten). |
| `toggleFocusView` | — → Løfte | Går inn i eller forlater fullskjerm på spillerbeholderen. |
| `statusText` , `resultText` , `syncDiagnostics` | — → streng/tom | Lokalisert status for overskriften og diagnostikksiden. |
| `record` | melding, nivå → void | Legger til en tidsstemplet oppføring i handlingsloggen. |
| `copyDiagnostics` | — → Løfte | Kopierer en kort rapport (versjon, status, kvaliteter, sidetype, brukeragent). |
| `checkQuality` , `checkConflicts` | — → Løfte/ugyldig | Kontroller at den foretrukne kvaliteten tilbys og liste opp innstillinger som fungerer mot hverandre. |

### Hurtigkravknapp

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `renderClaimWidget` | — → ugyldig | Oppretter, oppdaterer eller fjerner den flytende knappen og starter dens tilstandsmåling på ett sekund. |
| `syncClaimWidget` | — → ugyldig | Viser "belønning tilgjengelig" ring og prikk, opptatt tilstand og auto-skjul regelen. |
| `placeClaimWidget` | — → ugyldig | Plasserer knappen og klemmer den til vinduet. |
| `wireClaimWidget` | element → void | Dra med en terskel på fem piksler (et dra teller aldri som et klikk), posisjonslagring og klikket som kjører et manuelt krav. |

### Varsler, lyd og paneladferd

| Metode | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `notify` | melding, snill, varighet, kraft → void | Viser en skål (med mindre den er undertrykt), registrerer historikk og kunngjør teksten i et levende område. |
| `notifyQuality` | brukt, kvalitet → void | Spiller av resultatlyden, logger og viser et lokalisert varsel. |
| `initToastPosition` , `wireToastDrag` | — → ugyldig | Gjenopprett og lagre den slepte toastposisjonen. |
| `onAvatars` | — → ugyldig | Oppdaterer sider som viser avatarer. |
| `ensureAudio` | — → kontekst | Oppretter og gjenopptar den delte `AudioContext` (låst opp ved første brukerbevegelse). |
| `playSound` , `stopSounds` | navn, forhåndsvisning → void | Generer og stopp nettlydsignalene. |
| `playFreezeAlarm` , `alertFrozen` | kraft → ugyldig | Spill fem-noters alarm og hev frysevarslingen. |
| `placePanel` , `wirePanelDrag` | posisjon → ugyldig | Plasser panelet inne i vinduet og gjør overskriften drabar. |
| `open` , `close` , `toggle` | — → ugyldig | Kontroller panelet, polling, fokus og menylyder. |
| `syncVolumeControls` | — → ugyldig | Holder volumglidebryteren synkronisert med spilleren mens panelet er åpent. |

<a id="hotkeys-and-startup"></a>
## Hurtigtaster og oppstart

| Funksjon | Parametere / retur | Hva og hvordan det gjør |
|---|---|---|
| `isolateKeys` | — → ugyldig | Registrert ved `document-start` i fangstfasen: tastaturhendelser som kommer fra innsiden av panelet slutter å forplante seg til Kick (så Space, F, M og pilene utløser aldri spillerens hurtigtaster) og Tab er fanget inne i dialogen. |
| `setupHotkeys` | — → ugyldig | Håndterer tastefangst for rebinding, Escape (modal, dropdown, panel), meny-hurtigtastene og handlings-hurtigtastene; kombinasjoner med en modifikator eller en F-tast fungerer selv mens du skriver. |
| `init` | — → ugyldig | Bygger panelet, installerer hurtigtaster og starter `PlayerSync` ; beskyttet mot dobbel injeksjon. |

<a id="kick-page-dependencies"></a>
## Kick-sideavhengigheter

Manuset er avhengig av Kicks nåværende markering. Der det er mulig bruker den ikoner, attributter og struktur i stedet for synlig tekst, så den fortsetter å fungere på alle grensesnittspråk. Hvis Kick endrer disse, slutter matchingsfunksjonen å fungere (resten fortsetter å kjøre).

| Funksjon | Hva den ser etter |
|---|---|
| Kvalitet | En synlig `<video>` , spillerens `button[aria-haspopup="menu"]` og `[role="menuitemradio"]` oppføringer. |
| Layout | En beholder med `data-sidebar` og `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , en `CollapseRight` -ikonknapp inne i `#channel-chatroom` og en `MessagesOutline` ikonknapp for å vise chatten. |
| Belønningsvarsel | En `video` hvis kilde inneholder `reward-available` , eller et `[role="group"]` kort som inneholder en video `daily-rewards` . |
| Belønning kreves | En `button[aria-haspopup="dialog"][aria-controls]` (gaveikon), dialogboksen den kontrollerer ( `data-state` ), aktiverte kravknapper med et `.contents` barn og en lukkeknapp med en `.sr-only` etikett. |
| Dråper | `#rewards-panel` listeelementer med en `[role="progressbar"][data-state="complete"]` og en aktivert knapp. |
| Avatarer | `img[alt]` -elementer hvis kilde er `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalisering

Hver etikett, hjelpemelding, feil, dialog og varsling går gjennom oversettelsesløsningen for 38 lokaliteter. Manglende nøkler faller tilbake til engelsk. Ny grensesnitttekst oversettes til alle støttede språk sammen med funksjonen som legger den til. Språkvelgeren viser flagg og innfødte navn; Grensesnittet følger nettleserspråket ved første kjøring og husker et eksplisitt valg etterpå.

<a id="safety-privacy-and-compatibility"></a>
## Sikkerhet, personvern og kompatibilitet

- Innstillinger desinfiseres før lagring; ugyldige verdier faller tilbake til sikre standardverdier.
- Kanalnavn, notater, varslingstekst og diagnostisk utdata escapes før HTML-innsetting.
- Et egendefinert knappikon kodes på nytt fra et lerret og lagres kun som en data-URL for en tillatt bildetype; den forlater aldri nettleseren.
- Shadow DOM holder skriptets stiler isolert fra Kick; tastaturhendelser fra panelet er isolert fra Kicks hurtigtaster.
- Automatiske handlinger hopper over ekskluderte kanaler, sikker modus og manglende spillerelementer. Belønning som kreves, trykker aldri på den samme knappen to ganger i ett løp og venter mens seeren skriver.
- Skriptet gjør ingen nettverksforespørsler; oppdateringer kommer fra brukerskriptbehandlingen eller utgivelsessiden.
- Eksisterende lokale innstillinger bevares ved flytting fra 1.1.0, 1.2.0 og 1.3.0.
