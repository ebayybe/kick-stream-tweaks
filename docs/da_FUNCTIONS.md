<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · **Dansk** · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Funktionsreference

Reference til Kick Stream Tweaks 1.3.1. Den beskriver, hvad hvert funktionsområde gør, hvordan indstillingerne gemmes, hvilke dele af Kicks side scriptet afhænger af, og hvordan hver navngiven funktion eller metode i brugerscriptet fungerer. Se [lageret](https://github.com/ebayybe/kick-stream-tweaks) og [ændringsloggen](../CHANGELOG/en_CHANGELOG.md) .

> Navne matcher kilden. `void` betyder, at en funktion virker gennem bivirkninger. En metode skrevet som `Object.method` lever på det objekt ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Indhold

1. [Arkitektur](#architecture)
2. [Brugervendt adfærd](#user-facing-behavior)
3. [Indstillingsreference](#settings-reference)
4. [Kerneværktøjer](#core-utilities)
5. [Opbevaring af indstillinger](#settings-storage)
6. [Spillersynkronisering ( `PlayerSync` )](#player-synchronization-playersync)
7. [Side ekstramateriale ( `Extras` )](#page-extras-extras)
8. [Interface byggeklodser](#interface-building-blocks)
9. [Indstillingssider ( `PAGES` )](#settings-pages-pages)
10. [Panelcontroller ( `GUI` )](#panel-controller-gui)
11. [Genvejstaster og opstart](#hotkeys-and-startup)
12. [Kick side afhængigheder](#kick-page-dependencies)
13. [Lokalisering](#localization)
14. [Sikkerhed, privatliv og kompatibilitet](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arkitektur

Brugerscriptet er en selvstændig fil, der kører ved `document-start` med `@grant none` . Den har intet byggetrin og fremsætter ingen netværksanmodninger af sig selv.

| Lag | Objekt / område | Ansvar |
|---|---|---|
| Data | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Oversættelser til 38 sprog, lokaliserede diagnostiske meddelelser, flag SVG'er og sprognavne. |
| Konfiguration | `CONFIG` , `DEFAULTS` | Konstanter (vælgere, genforsøgsgrænser, forudindstillinger, sektioner) og standardindstillinger. |
| Opbevaring | `sanitizeSettings` , `Store` , `persist` | Validerer og gemmer indstillinger i `localStorage` ; beholder en fortrydelsesstak i hukommelsen. |
| Spillerlogik | `PlayerSync` | Finder videoen, gendanner kvalitet, lydstyrke, hastighed og lydløs tilstand, ser efter fryser. |
| Sidehjælpere | `Extras` | Layoutknapper, krav på belønning, kanalavatarer og baggrundsplanlæggeren. |
| Interface | `PAGES` , `GUI` , hjælpere | Shadow-DOM-panel, meddelelser, lyde, flydende hurtig-krav-knap, genvejstaster. |

Dataflow: 1,5 sekunders `PlayerSync.sync` løkken læser de effektive indstillinger (først kanalprofil, derefter global), anvender dem på afspilleren og kalder `Extras.tick` . Brugerhandlinger går gennem `GUI` handlere, som opdaterer indstillinger med `persist` og skubber kun den berørte del til afspilleren ( `media` eller `all` ).

<a id="user-facing-behavior"></a>
## Brugervendt adfærd

| Område | Adfærd |
|---|---|
| Spillerens vedholdenhed | Gemmer live/VOD-kvalitet, lydstyrke, mute-tilstand, lydløs tilstand og hastighed, og anvender dem derefter, når en ny stream registreres. Ændringer, som siden foretager af sig selv (f.eks. Kick, der nulstiller lydstyrken til 50%), tilbageføres; kun seerens egne handlinger opdaterer de gemte værdier. |
| Kvalitet | Vælger den foretrukne kvalitet gennem afspillermenuen, falder tilbage til den næste lavere (eller Auto), når den ikke er tilgængelig, og lukker menuen igen. Kun ægte brugerklik lærer scriptet en ny "sidst brugt" kvalitet. |
| Lydstyrke og lydløs afspilning | Lydstyrke og mute gendannes pr. stream. Lydløs afspilning dirigerer videoen gennem weblydmotoren med nul forstærkning, så streamen fortsætter med at spille på en baggrundsfane uden at blive slået fra. |
| Kanalprofiler | **Gem denne kanal** gemmer den aktuelle kvalitet, lydstyrke, hastighed og lyd for den kanal, der ses. Profiler indeholder også noter, grupper, pin-tilstand, en avatar og de aktiverede/udelukkede flag. |
| Forudindstillinger | Spar båndbredde, bedste kvalitet, stille visning og VOD gælder med et enkelt klik. |
| Panel | `F2` eller en brugerdefineret genvejstast åbner et panel med fast bredde (680 px) med en grupperet sidebjælke, søgning, Kick og Minimal-stile, lyse/mørke temaer, 14 accentfarver plus en farvevælger, kompakt layout, baggrundssløring, tekstskalering, høj kontrast og animationskontroller. |
| Søg | Accentufølsom, matcher grænsefladesproget og de engelske navne og matcher sektions- eller korttitler. Tastanslag indtastet i panelet når aldrig Kicks genvejstaster. |
| Skydere | Hver skyder reagerer på klik, træk, tastaturpile og musehjulet. |
| Lyder | Weblydsignaler til menuhandlinger, indstillingsændringer, kvalitetssucces/fejl og gendannelse af lydstyrke, hver med en switch, forhåndsvisning og lydstyrke. |
| Meddelelser | Lokaliserede beskeder, der kan trækkes, skaleres, gøres gennemsigtige, lydløse (forstyr ikke, stille fuldskærm) og optages i historien. |
| Frost alarm | Registrerer en stoppet afspiller eller en sort skærm, afspiller en høj alarm (selv i en skjult fane, uafhængig af lydeffektkontakten) og viser en notifikation. |
| Belønninger | Valgfrit automatisk krav venter på Kicks belønningsmeddelelse (eller kører efter en tidsplan), åbner belønningsvinduet, gør krav på, hvad der er tilgængeligt og lukker det. En flydende, hurtig-krav-knap, der kan trækkes, gør det samme med et enkelt klik. |
| Layout | Skjuler chatten og skjuler den venstre menu fra panelet eller med genvejstaster, og husker eventuelt valget for hver stream. |
| Værktøjer | Sleep-timer, fokus (fuldskærm), synkronisering af afspiller og en sikker tilstand, der sætter hver automatisk ændring på pause. |
| Diagnostik | Livestatus, opdagede kvaliteter, videoopløsning, kvalitetsscanning, konflikttjek, handlingslog og en kopierbar rapport. |
| Data | Eksport/import af indstillinger, fortryd, gendan efter nulstilling, backup/gendannelse af gemte kanaler. |
| Fortrolighed | Indstillinger, profiler, logfiler og historier forbliver i browserlageret. Intet sendes nogen steder. |

<a id="settings-reference"></a>
## Indstillingsreference

Alle værdier er valideret af `sanitizeSettings` ; alt ugyldigt falder tilbage til standarden. Ranger håndhæves.

### Spiller

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `autoQualityEnabled` | boolsk | `true` | Anvend den foretrukne kvalitet automatisk. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalitet til at ansøge om livestreams og VOD'er. `auto` betyder "husk mit sidste valg". |
| `lastLiveQuality` , `lastVodQuality` | samme | `auto` | Sidste kvalitet valgte seeren i hånden. |
| `qualityFallback` | `lower` , `auto` | `lower` | Hvad skal man gøre, når den foretrukne kvalitet ikke tilbydes. |
| `autoVolumeEnabled` | boolsk | `true` | Gendan og beskyt den gemte diskenhed. |
| `volume` | 0–1 | `1` | Gemt lydstyrke. |
| `muted` | boolsk | `false` | Gemt mute-tilstand. |
| `silent` | boolsk | `false` | Lydløs afspilning (lydgraf med nul forstærkning, afspilleren er ikke slået fra). |
| `playbackRate` | 0,25–2,5 | `1` | Gemt hastighed; `1` er aldrig tvunget. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolesk; 60–100, trin 5 | `true` ; `85` | Advarsel om høj lydstyrke. |
| `safeMode` | boolsk | `false` | Sæt hver automatisk ændring på pause. |
| `channelProfiles` | objekt, op til 200 | `{}` | Profiler pr. kanal (se nedenfor). |

Kanalprofilfelter: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (kun `https://…kick.com/images/user/…` URLs), `note` (240 tegn), `group` (40 karakterer), `updatedAt` `lastUsed` .

### Meddelelser og lyde

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `notificationsEnabled` | boolsk | `true` | Vis resultatmeddelelser. |
| `doNotDisturb` , `quietFullscreen` | boolsk | `false` , `true` | Undertrykk meddelelser og lyde, eller kun i fuld skærm. |
| `notificationScale` | 0,8–1,4 | `1` | Meddelelsesstørrelse. |
| `notificationDuration` | 1500–12000 ms, trin 500 | `3500` | Hvor længe bliver en underretning. |
| `notificationOpacity` | 0,35–1 | `0.95` | Underretningsgennemsigtighed. |
| `notificationShowIcon` | boolsk | `true` | Vis statusikonet. |
| `notificationPosition` | `{x, y}` eller `null` | `null` | Træk position. |
| `notificationHistoryEnabled` , `notificationHistory` | boolesk; op til 30 poster | `true` ; `[]` | Historien om meddelelser. |
| `soundEffectsEnabled` , `soundVolume` | boolesk; 0–1 | `false` ; `0.35` | Hovedafbryder og lydstyrke. |
| `soundEvents` , `soundEventVolumes` | pr. hændelse: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | alt på; `0.35` | Per-hændelse kontakt og lydstyrke. |

### Udseende, bevægelse og genveje

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Farvetema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Visuel stil af panelet. |
| `accentColor` | `#rrggbb` | `#53fc18` | Accent farve. |
| `compactMode` , `highContrast` | boolsk | `false` | Tæthed og kontrast. |
| `backdropBlur` | 0–12 px | `6` | Baggrundssløring bag panelet (fungerer i begge stilarter). |
| `textScale` | 0,9–1,3 | `1` | Tekststørrelse. |
| `language` , `languageChosen` | lokalkode; boolsk | browser sprog; `false` | Interfacet følger browsersproget, indtil et sprog er valgt, så huskes valget. |
| `panelPosition` | `{x, y}` eller `null` | `null` | Træk panelposition. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animationshastighed. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Panel åben/luk effekt. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hover effekt. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logo/indikator animation. |
| `iconAnimations` | boolsk | `true` | Animer sidebjælke, nulstil og hjælpeikoner. |
| `hotkey` | combo streng | `F2` | Åbner eller lukker panelet. |
| `actionHotkeys` | combo strenge | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Skift meddelelser, fokusvisning, nulstil kvalitet, gendan lydstyrke, skift chat, skift venstre menu. |

Tastekombinationer gemmes som strenge såsom `Alt+Q` og matches af fysisk tast, så de fungerer på ethvert tastaturlayout. Indstillinger fra ældre versioner med en objektformet genvejstast konverteres automatisk. Panelbredden er fastsat til 680 px (begrænset til vinduesstørrelsen); den tidligere breddeindstilling ignoreres.

### Værktøjer

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `autoRecoverStall` | boolsk | `false` | Prøv `play()` , når en frysning er opdaget. |
| `freezeAlertEnabled` , `freezeSound` | boolsk | `true` | Frys meddelelse og alarmlyd. |
| `freezeSeconds` | 5–60, trin 5 | `10` | Sekunder uden fremskridt før alarmen. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolsk | `false` | Husket layout, påført én gang pr. side. |
| `autoClaimRewards` | boolsk | `false` | Aktiver automatisk krav om belønning. |
| `claimMode` | `notify` , `interval` | `notify` | Gør krav, når Kick viser sin notifikation eller efter en tidsplan. |
| `claimDelaySec` | 0–120, trin 5 | `5` | Vent efter meddelelsen vises (meddelelsestilstand). |
| `claimIntervalMin` | 5–120, trin 5 | `10` | Minutter mellem kontroller (planlagt tilstand). |

### Knap til hurtig krav

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `claimWidget` | boolsk | `false` | Vis den flydende knap. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Knap design. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Indbygget ikon, eller brugerens eget billede. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , op til 90.000 tegn | tom | Genkodet kopi af det uploadede billede. Alt andet afvises. |
| `claimWidgetImageFill` | boolsk | `false` | Lad et brugerdefineret billede fylde hele knappen (bruges ikke af pilledesignet). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Knap størrelse. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Knapopacitet (fuld gennemsigtighed, mens en belønning er tilgængelig). |
| `claimWidgetAutoHide` | boolsk | `false` | Vis kun knappen, når en belønning er tilgængelig. |
| `claimWidgetPos` | `{x, y}` eller `null` | `null` | Træk position. |

### Diagnostik og tilstand

| Nøgle | Type/område | Standard | Betydning |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolesk; op til 60 poster | `true` ; `[]` | Handlingslog. |
| `activeSection` | afsnit id | `playback` | Sidst åbnede side. |
| `resetBackup` | indstillinger objekt | `null` | Snapshot taget før en nulstilling eller en import. |

<a id="core-utilities"></a>
## Kerneværktøjer

| Funktion | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `detectLanguage` | — → lokalitet | Går `navigator.languages` ​​, kortlægger regionale varianter ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) og returnerer den første understøttede lokalitet eller `en` . |
| `dictFor` | lang → ordbog | Returnerer oversættelsestabellen for en lokalitet, falder tilbage til dets basissprog og derefter engelsk. |
| `t` / `T` | lang, nøgle, vars → streng | Løser en nøgle med `{placeholder}` substitution; `T` bruger det aktuelle sprog. |
| `diagText` | indeks, kvalitet → streng | Returnerer en af ​​de lokaliserede diagnostiske sætninger. |
| `log` | …args → void | Konsollogning med scriptpræfikset. |
| `clamp` , `sleep` , `esc` | værdi → værdi | Rækkeviddebegrænsning, løftebaseret forsinkelse og HTML-escape. |
| `normalizeQuality` | tekst → streng | Små bogstaver i en kvalitetsetiket og fjerner mellemrum. |
| `debounce` | fn, vent → funktion | Efterfølgende debounce med en `flush` metode. |
| `onLocationChange` | tilbagekald → ugyldig | Registrerer enkeltsidesnavigation ved at ombryde `pushState` / `replaceState` , lytte til `popstate` og polling en gang i sekundet. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | begivenhed → streng/boolesk | Byg og sammenlign nøglekombinationer fra den fysiske nøglekode. |
| `mkPointer` | type, ekstra → begivenhed | Opretter en `PointerEvent` (eller en `MouseEvent` når den ikke er tilgængelig), der bruges til at drive Kicks ARIA-menuer. |
| `waitFor` | sonde, timeout, trin → værdi/nul | Polls, indtil sonden returnerer en værdi, eller timeoutet slutter. |
| `imageToDataUrl` | billede → streng | Skalerer et billede til et firkantet lærred (beholder proportioner, `willReadFrequently` ), prøver 128, 96 og 64 px og returnerer en PNG-data-URL, der ikke er større end 70.000 tegn. |

<a id="settings-storage"></a>
## Opbevaring af indstillinger

| Funktion | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Holder højst 200 profiler med gyldige nøgler og klemmer hvert felt; avataren skal være en Kick-billede-URL. |
| `sanitizeSettings` | objekt, med Backup → objekt | Validerer alle indstillinger (typer, intervaller, tilladte værdier), migrerer 1.1-1.3 indstillinger (ældre kvalitet, genvejstast, animation og sektionsnøgler) og anvender sprogreglen. |
| `legacyHotkey` | værdi → streng | Konverterer en objektformet genvejstast til en kombinationsstreng. |
| `Store.load` / `Store.save` | — / indstillinger → indstillinger/ugyldig | Læs og skriv det rensede objekt i `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → ugyldig | Fletter en patch, renser, gemmer med en kort debounce og skubber eventuelt et fortryd snapshot (kun gemt i hukommelsen, op til 15). |
| `storage` lytter | begivenhed → ugyldig | Genindlæser indstillinger, når en anden Kick-fane ændrer dem, så faner aldrig overskriver hinanden. |

<a id="player-synchronization-playersync"></a>
## Spillersynkronisering ( `PlayerSync` )

### Kanal- og profilhjælpere

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `isVod` | — → boolsk | Registrerer en VOD-side fra URL'en. |
| `channelKey` | — → streng | Opbygger den stabile `channel:slug` nøgle (eller `vod:id` , `kick:home` ), cachelagrer resultatet i tre sekunder. På VOD-sider bruges kanallinket nærmest afspilleren. |
| `channelSlug` | — → streng | Returnerer slug-delen af ​​en kanaltast. |
| `profile` | nøgle → objekt/nul | Læser en gemt profil. |
| `profileActive` | — → objekt/nul | Returnerer kun den aktuelle profil, når den er aktiveret og ikke udelukket. |
| `isExcluded` | — → boolsk | Kontrollerer, om automatisering er deaktiveret for denne kanal. |
| `updateProfile` | patch, nøgle → ugyldig | Opretter eller sammenfletter en profil og stempler `updatedAt` . |
| `saveCurrentChannel` | — → objekt/nul | Gemmer seerens aktuelle kvalitet, lydstyrke, mute, hastighed og lydløs tilstand som en aktiveret profil og scanner siden for kanalavataren. |
| `effective` | — → objekt | Løser lydstyrke, mute, lydløs, hastighed og live/VOD-kvalitet fra den aktive profil eller de globale indstillinger. |
| `setStatus` | status, resultat → ugyldig | Opdaterer status og sidste resultatkoder vist i overskriften og diagnostik. |

### Finder og kører Kicks spiller

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `findMainVideo` | — → video/null | Vælger den største synlige `<video>` . |
| `streamKey` | — → streng | Returnerer den sidesti, der bruges til at anvende kvalitet én gang pr. stream. |
| `isAccountButton` | knap → boolesk | Afviser header-, avatar- og kontoknapper. |
| `findSettingsButton` | video → knap/null | Finder afspillerens gearknap efter etiket eller ved at være tæt på videoens nederste højre hjørne. |
| `revealControls` | video → ugyldig | Sender hover-begivenheder, så skjulte kontroller vises. |
| `simulateClick` | element → void | Sender den fulde pointer-begivenhedssekvens Kicks menuer har brug for. |
| `menuItems` | — → element[] | Viser synlige `menuitemradio` poster. |
| `openQualityMenu` | — → knap/nul | Åbner gearmenuen, træder ind i en kvalitetsindgang, når en menu på øverste niveau vises, og venter på valgmulighederne. |
| `closeMenu` | knap → Løfte | Lukker kun menuen, hvis den stadig er åben (et blindt andet klik kunne genåbne den), med en Escape-tilbagegang. |
| `readMenu` | — → element[] | Registrerer de tilbudte kvaliteter og den afkrydsede. |
| `scanQualities` | — → Løfte<boolean> | Åbner menuen, registrerer de tilgængelige kvaliteter og lukker den (bruges af diagnostik). |
| `activate` | vare → Løfte | Klikker på en mulighed og venter, indtil den er markeret. |
| `selectQuality` | ønsket, fallback → Løfte | Vælger den ønskede kvalitet, ellers den næste lavere, eller Auto. |
| `desiredQuality` | — → streng | Vælger den kvalitet, der skal anvendes, fra profilen, præferencen eller det sidste manuelle valg. |
| `applyQualityOnce` | streamKey → Løfte | Anvender den ønskede kvalitet én gang pr. stream, lukker menuen og giver besked om succes eller fiasko. |
| `watchManualQuality` | — → ugyldig | Lærer en ny "sidst brugt" kvalitet kun fra ægte (pålidelige) klik, så automatiske klik og fallbacks overskriver aldrig gemte værdier. |

### Lydstyrke, lydløs tilstand, hastighed og overvågning

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `applyVolume` | video, stille → void | Skriver den effektive lydstyrke og mute-tilstand (markeret som scriptets egen ændring). |
| `trackInput` | — → ugyldig | Registrerer tidspunktet for den sidste betroede markør, hjul, berøring eller tastaturinput. |
| `reassertVolume` | video → ugyldig | Sætter den gemte lydstyrke tilbage, når siden ændrede den uden brugerinput (hastighedsbegrænset til otte tilbagevendinger pr. ti sekunder). |
| `watchVolume` | video → ugyldig | Lytter efter `volumechange` : Brugerdrevne ændringer gemmes, sidedrevne bliver vendt tilbage. |
| `checkLoud` | volumen, dæmpet → void | Advarer én gang, når lydstyrken krydser tærsklen. |
| `buildGraph` | video → graf/nul | Forbinder videoen til en `AudioContext` gennem en forstærkningsknude; rapporterer, når webstedet ikke tillader det. |
| `applySilent` | video → ugyldig | Indstiller forstærkningen til 0 for lydløs afspilning eller tilbage til 1, og genoptager konteksten, når det er nødvendigt. |
| `applyRate` | video, tvinge → ugyldig | Indstiller den gemte hastighed; `1` er ikke tvunget, medmindre seeren lige har valgt det, så Kicks egen live-edge catch-up respekteres. |
| `applyMedia` | video, `{rate}` → ugyldig | Genindsætter lydstyrke, lydløs tilstand og valgfri hastighed uden at røre ved kvalitet. |
| `monitorFreeze` | video → ugyldig | Registrerer en stoppet afspiller (tiden sidder fast) eller en sort skærm (tiden går uden afkodede rammer) og udløser alarmen og valgfri genopretning. Fungerer i skjulte faner. |

### Sløjfe og livscyklus

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `sync` | — → Løfte | Hovedsløjfen: monitorer fryser, binder lyttere, anvender lydløs tilstand, lydstyrke, hastighed og kvalitet, respekterer sikker tilstand og ekskluderinger, og kalder derefter `Extras.tick` . |
| `resync` | — → Løfte | Fremtvinger et nyt pas (bruges af forudindstillinger, hurtige handlinger og kvalitetsændringer). |
| `init` | — → ugyldig | Starter den første synkronisering, navigationslytteren og intervallet på 1,5 sekunder. |

<a id="page-extras-extras"></a>
## Sideekstramateriale ( `Extras` )

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Læs Kicks layouttilstand fra `data-chat` og `data-sidebar` på sidecontaineren. |
| `isDesktop` | — → boolsk | Layoutautomatisering kører kun ved skrivebordsbredder. |
| `click` | element → boolesk | Klik gennem `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → knap/nul | Find skjul-knappen inde i chatrummet og "vis chat"-knappen (efter ikon, ikke efter sprog). |
| `setChat` , `setSidebar` | vis → boolsk | Bring chatten eller den venstre menu til den ønskede tilstand ved at trykke på Kicks egne knapper. |
| `applyLayout` | — → ugyldig | Anvender det huskede layout én gang pr. side, uden at bekæmpe manuelle ændringer. |
| `isTyping` | — → boolsk | Sandt, mens seeren skriver i et felt; automatiske krav venter. |
| `rewardTrigger` , `popoverCard` | — → knap/nul | Find gaveknappen og belønningskortet. |
| `rewardAvailable` | — → boolsk | Registrerer Kicks eget "belønning tilgængelig"-signal (den animerede opfordring til handling). |
| `isEnabled` | knap → boolesk | Synlig og ikke deaktiveret. |
| `claimDrops` | — → Løfte<number> | Trykker på aktiverede kravknapper for gennemførte fald i belønningspanelet. |
| `claimDaily` | udløser → Løfte<number> | Åbner belønningsvinduet, trykker én gang på hver aktiveret kravknap (aldrig den samme knap to gange), og lukker derefter vinduet. |
| `claimRewards` | `{manual}` → Løft<number> | Kører en fuld krav, rapporterer resultatet og afspiller en lyd; manuelle kørsler ignorer indtastning og rapporter, når der ikke er noget at gøre krav på. |
| `normName` | tekst → streng | Normaliserer navne til at matche ( `_` og mellemrum til `-` ). |
| `findAvatar` | snegl → streng | Returnerer den kanalavatar, der er synlig på siden (brugt før en kanal gemmes). |
| `scanAvatars` | — → ugyldig | Gemmer avatarer for gemte kanaler, der mangler en. |
| `tick` | streamKey → ugyldig | Planlægger kaldet fra `sync` : anvender layoutet, scanner avatarer, venter på belønningsmeddelelsen (meddelelsestilstand, med forsinkelse og en to-minutters nedkøling) eller kontrollerer det valgte interval og poller droppanelet. |

<a id="interface-building-blocks"></a>
## Interface byggeklodser

| Funktion | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `I` | navn → svg | Inline streg ikon. |
| `fmtValue` | format, rå → streng | Formaterer skyderværdier (procent, pixels, sekunder). |
| `normSearch` , `englishOf` , `searchText` | tekst → streng | Accentufølsom søgetekst inklusive det engelske navn på en oversat etiket. |
| `row` | nøgle, etiket, kontrol, muligheder → html | En indstillingsrække; stablet som standard, kun inline for switches, med en valgfri hjælpekontakt. |
| `sw` , `toggleRow` | … → html | Afbryderstyring og en færdiglavet kontaktrække. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, segmenterede kontroller og kvalitetsgitteret. |
| `range` | attr, nøgle, muligheder → html | Skyder med fill track og live værdi. |
| `card` , `btn` , `ib` | … → html | Kort, tekstknap og ikonknap. |
| `timeStr` | tidsstempel → streng | Lokaliseret klokkeslæt. |
| `setPref` | nøgle, værdi → ugyldig | Skriver en spillerpræference til den aktive kanalprofil eller til de globale indstillinger. |
| `fxBtn` | nøgle, værdi, etiket, på → html | Effektvælgerflise med en lille preview-glyph. |
| `avatarHtml` | navn, url → html | Avatar med et bogstavtilbagefald; et mislykket billede fjernes. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → værdi | Byg opmærkningen til hurtige krav-knap til både live-knappen og forhåndsvisningen af ​​indstillinger. |

<a id="settings-pages-pages"></a>
## Indstillingssider ( `PAGES` )

| Side | Indhold |
|---|---|
| `playback` | Gem-denne-kanaltip, forudindstillinger, kvalitet (auto-anvend, live, VOD, fallback), lydstyrke (auto-anvend, skyder, mute, lydløs afspilning, høj advarsel) og hastighed. |
| `channels` | Sådan fungerer det, aktuel kanal med knappen **Gem denne kanal** , pause/ekskluder kontakter og editor, derefter listen over gemte kanaler (søg, sorter, pin filter, grupper, Rediger/Udført, slet) med sikkerhedskopiering og gendannelse. |
| `tools` | Sleep-timer, sidelayout, belønninger (automatisk krav, tilstand, forsinkelse eller interval, krav nu), indstillinger for hurtige krav-knap med live forhåndsvisning, frysealarm og hurtige handlinger. |
| `notifications` | Kontakter, størrelse, varighed, opacitet, forhåndsvisning, positionsnulstilling og historie. |
| `sounds` | Hovedkontakt og lydstyrke, kontakter pr. begivenhed, lydstyrker og forhåndsvisninger. |
| `appearance` | Tema, stil, accentfarver, tæthed, kontrast, tekststørrelse, sløring, centrering og sprog. |
| `motion` | Live preview, forudindstillinger og vælgere til åben effekt, svæveeffekt, indikator, hastighed og ikonanimationer. |
| `shortcuts` | Menu-genvejstaster og handlings-genvejstaster med genbinding. |
| `diagnostics` | Status, scanning, rapport, kvalitets- og konfliktkontrol, sikker tilstand og handlingslog. |
| `about` | Version, links, eksport/import, fortryd, gendan og nulstil. |

<a id="panel-controller-gui"></a>
## Panelcontroller ( `GUI` )

### Konstruktion og rendering

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `build` | — → ugyldig | Opretter shadow-DOM-værten, panelet, toast- og liveregionen og forbinder derefter begivenheder. |
| `applyLook` | — → ugyldig | Anvender tema, stil, accent, sløring, tekstskala, effekter, sprogattributter og toastindstillinger som attributter og CSS-variabler. |
| `renderChrome` | — → ugyldig | Gengiver titel, søgepladsholder, pauseknap, sidefodstip og hurtig-krav-knappen. |
| `renderNav` | — → ugyldig | Gengiver den grupperede sidebjælke. |
| `renderPage` | muligheder → ugyldig | Gengiver den aktive side (eller alle sider under søgning), og bevarer scroll- og tastaturfokus. |
| `filterRows` | — → ugyldig | Anvender søgefilteret på rækker, kort og sider. |
| `channelEditor` | nøgle, profil → html | Redaktør for én kanalprofil. |
| `refreshAll` , `onExternalChange` | — → ugyldig | Gengiv alt efter nulstilling, import, fortryd eller en ændring fra en anden fane. |

### Begivenheder og indstillinger ændres

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `wire` | — → ugyldig | Vedhæfter delegerede klik-, input-, ændrings-, hjul- og rullehåndterere og paneltræk. |
| `onClick` , `onInput` , `onChange` | begivenhed → ugyldig | Send klik, skyderbevægelser og tekstredigeringer til indstillinger, profiler eller handlinger. |
| `applyRange` | nøgle, værdi → ugyldig | Anvender en skyderværdi (volumen, sløring, opacitet, varigheder...). |
| `setSetting` , `setChannel` | nøgle/patch → ugyldig | Gem en indstilling eller en profilændring, og skub den berørte del til afspilleren. |
| `pushToPlayer` | omfang, nøgle → ugyldig | `media` genindsætter lydstyrke, lydløs tilstand og hastighed; `all` genbruger også kvalitet. Lydstyrke, mute, lydløs tilstand og hastighed genåbner aldrig kvalitetsmenuen. |
| `act` | navn, element → Løfte | Kører navngivne handlinger: forudindstillinger, lagring og fjernelse af kanaler, backup, import/eksport, krav, sleep-timer, genveje, diagnostik og mere. |
| `resetSection` | id → ugyldig | Gendanner én sektions standardindstillinger. |
| `restoreVolume` | — → ugyldig | Genindsætter den gemte lydstyrke. |
| `toggleLayout` | hvilken → ugyldig | Skjuler eller viser chatten eller venstremenuen og husker valget. |
| `confirm` , `closeModal` | besked, muligheder / resultat → Løfte/ugyldig | Bekræftelsesdialog i panelet (identisk i alle browsere). |
| `download` , `pickFile` , `pickImage` | … → ugyldig | Gem JSON, læs JSON og vælg et billede til knappen for hurtig krav. |
| `startCapture` , `finishCapture` | id / combo → ugyldig | Genbind en genvejstast, afvis dubletter. |
| `replayMock` | — → ugyldig | Genafspiller den åbne effekt i animationseksemplet. |

### Værktøjer og diagnostik

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutter / — → ugyldig | Start, annuller og vis sleep-timeren (den pauser videoen til sidst). |
| `toggleFocusView` | — → Løfte | Går ind i eller forlader fuldskærm på afspillerbeholderen. |
| `statusText` , `resultText` , `syncDiagnostics` | — → streng/tomrum | Lokaliseret status for overskriften og diagnosticeringssiden. |
| `record` | besked, niveau → ugyldig | Tilføjer en tidsstemplet post til handlingsloggen. |
| `copyDiagnostics` | — → Løfte | Kopierer en kort rapport (version, status, kvaliteter, sidetype, brugeragent). |
| `checkQuality` , `checkConflicts` | — → Løfte/ugyldig | Bekræft, at den foretrukne kvalitet tilbydes, og liste indstillinger, der virker mod hinanden. |

### Knap til hurtig krav

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `renderClaimWidget` | — → ugyldig | Opretter, opdaterer eller fjerner den flydende knap og starter dens tilstandsmåling på et sekund. |
| `syncClaimWidget` | — → ugyldig | Viser "belønning tilgængelig" ring og prik, optaget tilstand og automatisk skjul reglen. |
| `placeClaimWidget` | — → ugyldig | Placerer knappen og klemmer den fast til vinduet. |
| `wireClaimWidget` | element → void | Træk med en tærskel på fem pixel (et træk tæller aldrig som et klik), positionslagring og det klik, der kører en manuel krav. |

### Meddelelser, lyd og paneladfærd

| Metode | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `notify` | besked, art, varighed, force → void | Viser en skål (medmindre den er undertrykt), registrerer historik og annoncerer teksten i en live-region. |
| `notifyQuality` | anvendt, kvalitet → ugyldig | Afspiller resultatlyden, logger og viser en lokaliseret meddelelse. |
| `initToastPosition` , `wireToastDrag` | — → ugyldig | Gendan og gem den trukne toastposition. |
| `onAvatars` | — → ugyldig | Opdaterer sider, der viser avatarer. |
| `ensureAudio` | — → kontekst | Opretter og genoptager den delte `AudioContext` (låst op ved den første brugerbevægelse). |
| `playSound` , `stopSounds` | navn, forhåndsvisning → ugyldig | Generer og stop weblyd-signalerne. |
| `playFreezeAlarm` , `alertFrozen` | kraft → ugyldig | Spil alarmen med fem toner, og løft frysemeddelelsen. |
| `placePanel` , `wirePanelDrag` | position → ugyldig | Placer panelet inde i vinduet, og gør overskriften trækbar. |
| `open` , `close` , `toggle` | — → ugyldig | Styr panelet, polling, fokus og menulyde. |
| `syncVolumeControls` | — → ugyldig | Holder lydstyrkeskyderen synkroniseret med afspilleren, mens panelet er åbent. |

<a id="hotkeys-and-startup"></a>
## Genvejstaster og opstart

| Funktion | Parametre / retur | Hvad og hvordan gør det |
|---|---|---|
| `isolateKeys` | — → ugyldig | Registreret ved `document-start` i optagelsesfasen: tastaturbegivenheder, der kommer inde fra panelet, stopper med at forplante sig til Kick (så Space, F, M og pilene udløser aldrig afspillerens genvejstaster), og Tab er fanget inde i dialogen. |
| `setupHotkeys` | — → ugyldig | Håndterer nøgleoptagelse til genbinding, Escape (modal, dropdown, panel), menu-genvejstasten og handlings-genvejstaster; kombinationer med en modifikator eller en F-tast virker, selv mens du skriver. |
| `init` | — → ugyldig | Opbygger panelet, installerer genvejstaster og starter `PlayerSync` ; beskyttet mod dobbelt indsprøjtning. |

<a id="kick-page-dependencies"></a>
## Kick side afhængigheder

Scriptet er afhængigt af Kicks nuværende markup. Hvor det er muligt, bruger det ikoner, attributter og struktur frem for synlig tekst, så det bliver ved med at fungere på alle grænsefladesprog. Hvis Kick ændrer disse, holder matchningsfunktionen op med at virke (resten fortsætter med at køre).

| Funktion | Hvad det ser efter |
|---|---|
| Kvalitet | En synlig `<video>` , afspillerens `button[aria-haspopup="menu"]` og `[role="menuitemradio"]` poster. |
| Layout | En beholder med `data-sidebar` og `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , en `CollapseRight` ikonknap inde i `#channel-chatroom` og en `MessagesOutline` ikonknap til at vise chatten. |
| Belønningsmeddelelse | En `video` , hvis kilde indeholder `reward-available` eller et `[role="group"]` kort, der indeholder en video `daily-rewards` . |
| Belønning krav | En `button[aria-haspopup="dialog"][aria-controls]` (gaveikon), den dialog, den styrer ( `data-state` ), aktiverede kravknapper med et `.contents` underordnet og en lukkeknap med en `.sr-only` etiket. |
| Dråber | `#rewards-panel` listeelementer med en `[role="progressbar"][data-state="complete"]` og en aktiveret knap. |
| Avatarer | `img[alt]` -elementer, hvis kilde er `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalisering

Hver etiket, hjælpemeddelelse, fejl, dialog og notifikation går gennem oversættelsesresolveren for 38 lokaliteter. Manglende nøgler falder tilbage til engelsk. Ny grænsefladetekst oversættes til alle understøttede sprog sammen med den funktion, der tilføjer den. Sprogvælgeren viser flag og indfødte navne; grænsefladen følger browsersproget ved første kørsel og husker et eksplicit valg efterfølgende.

<a id="safety-privacy-and-compatibility"></a>
## Sikkerhed, privatliv og kompatibilitet

- Indstillinger desinficeres før opbevaring; ugyldige værdier falder tilbage til sikre standarder.
- Kanalnavne, noter, meddelelsestekst og diagnostisk output escapes før HTML-indsættelse.
- Et brugerdefineret knapikon genkodes fra et lærred og gemmes kun som en data-URL af en tilladt billedtype; det forlader aldrig browseren.
- Shadow DOM holder scriptets stilarter isoleret fra Kick; tastaturbegivenheder fra panelet er isoleret fra Kicks genvejstaster.
- Automatiske handlinger springer over ekskluderede kanaler, sikker tilstand og manglende spillerelementer. Belønning, der hævder, trykker aldrig på den samme knap to gange på én gang og venter, mens seeren skriver.
- Scriptet laver ingen netværksanmodninger; opdateringer kommer fra brugerscriptmanageren eller udgivelsessiden.
- Eksisterende lokale indstillinger bevares ved flytning fra 1.1.0, 1.2.0 og 1.3.0.
