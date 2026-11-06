<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · **Svenska** · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Funktionsreferens

Referens för Kick Stream Tweaks 1.3.1. Den beskriver vad varje funktionsområde gör, hur inställningarna lagras, vilka delar av Kicks sida som skriptet beror på och hur varje namngiven funktion eller metod i användarskriptet fungerar. Se [arkivet](https://github.com/ebayybe/kick-stream-tweaks) och [ändringsloggen](../CHANGELOG/en_CHANGELOG.md) .

> Namn matchar källan. `void` betyder att en funktion verkar genom biverkningar. En metod skriven som `Object.method` finns på det objektet ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Innehåll

1. [Arkitektur](#architecture)
2. [Användarinriktat beteende](#user-facing-behavior)
3. [Inställningsreferens](#settings-reference)
4. [Kärnverktyg](#core-utilities)
5. [Lagring av inställningar](#settings-storage)
6. [Spelarsynkronisering ( `PlayerSync` )](#player-synchronization-playersync)
7. [Sidtillägg ( `Extras` )](#page-extras-extras)
8. [Gränssnittsbyggstenar](#interface-building-blocks)
9. [Inställningssidor ( `PAGES` )](#settings-pages-pages)
10. [Panelkontroller ( `GUI` )](#panel-controller-gui)
11. [Snabbtangenter och start](#hotkeys-and-startup)
12. [Kick page-beroenden](#kick-page-dependencies)
13. [Lokalisering](#localization)
14. [Säkerhet, integritet och kompatibilitet](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arkitektur

Användarskriptet är en fristående fil som körs vid `document-start` med `@grant none` . Den har inget byggsteg och gör inga egna nätverksbegäranden.

| Lager | Objekt / område | Ansvar |
|---|---|---|
| Data | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Översättningar för 38 språk, lokaliserade diagnostiska meddelanden, flagga SVG och språknamn. |
| Konfiguration | `CONFIG` , `DEFAULTS` | Konstanter (väljare, gränser för försök igen, förinställningar, sektioner) och standardinställningar. |
| Förvaring | `sanitizeSettings` , `Store` , `persist` | Validerar och sparar inställningar i `localStorage` ; behåller en ångringsstack i minnet. |
| Spelarlogik | `PlayerSync` | Hittar videon, återställer kvalitet, volym, hastighet och tyst läge, tittar efter att den fryser. |
| Sidhjälpare | `Extras` | Layoutknappar, belöningsanspråk, kanalavatarer och bakgrundsschemaläggaren. |
| Gränssnitt | `PAGES` , `GUI` , hjälpare | Shadow-DOM-panel, aviseringar, ljud, flytande snabbanspråksknapp, snabbtangenter. |

Dataflöde: den 1,5 sekunder långa `PlayerSync.sync` -slingan läser de effektiva inställningarna (först kanalprofil, sedan global), tillämpar dem på spelaren och anropar `Extras.tick` . Användaråtgärder går via `GUI` hanterare, som uppdaterar inställningarna med `persist` och skickar bara den berörda delen till spelaren ( `media` eller `all` ).

<a id="user-facing-behavior"></a>
## Beteende mot användaren

| Område | Beteende |
|---|---|
| Spelarens uthållighet | Sparar live/VOD-kvalitet, volym, tyst läge, tyst läge och hastighet och tillämpar dem sedan när en ny stream upptäcks. Ändringar som sidan gör av sig själv (till exempel Kick-återställning av volymen till 50%) återställs; endast tittarens egna handlingar uppdaterar de sparade värdena. |
| Kvalitet | Väljer önskad kvalitet via spelarmenyn, går tillbaka till nästa lägre (eller Auto) när den inte är tillgänglig och stänger menyn igen. Endast äkta användarklick lär skriptet en ny "senast använd" kvalitet. |
| Volym och tyst uppspelning | Volym och tystnad återställs per stream. Tyst uppspelning dirigerar videon genom webbljudmotorn med noll förstärkning, så strömmen fortsätter att spelas på en bakgrundsflik utan att tystas. |
| Kanalprofiler | **Spara den här kanalen** lagrar aktuell kvalitet, volym, hastighet och ljud för kanalen som tittas på. Profiler innehåller även anteckningar, grupper, pinstatus, en avatar och de aktiverade/uteslutna flaggorna. |
| Förinställningar | Spara bandbredd, bästa kvalitet, tyst visning och VOD tillämpas med ett klick. |
| Panel | `F2` eller en anpassad snabbtangent öppnar en panel med fast bredd (680 px) med en grupperad sidofält, sök-, Kick- och Minimal-stilar, ljusa/mörka teman, 14 accentfärger plus en färgväljare, kompakt layout, bakgrundsoskärpa, textskalning, högkontrast och animeringskontroller. |
| Sök | Accentokänslig, matchar gränssnittsspråket och de engelska namnen, och matchar avsnitt eller korttitlar. Tangenttryckningar som skrivs i panelen når aldrig Kicks snabbtangenter. |
| Reglage | Varje reglage reagerar på klick, dragning, tangentbordspilar och mushjulet. |
| Låter | Web Audio-signaler för menyåtgärder, inställningsändringar, kvalitetsframgång/-misslyckande och volymåterställning, var och en med en switch, förhandsgranskning och volym. |
| Meddelanden | Lokaliserade meddelanden som kan dras, skalas, göras genomskinliga, tystas (stör ej, tyst i helskärm) och registreras i historiken. |
| Fryslarm | Upptäcker en avstängd spelare eller en svart skärm, spelar ett högt larm (även i en dold flik, oberoende av ljudeffektomkopplaren) och visar ett meddelande. |
| Belöningar | Valfritt automatiskt anspråk väntar på Kicks belöningsmeddelande (eller körs enligt ett schema), öppnar belöningsfönstret, gör anspråk på vad som är tillgängligt och stänger det. En flytande, dragbar snabbanspråksknapp gör samma sak med ett klick. |
| Layout | Döljer chatten och komprimerar den vänstra menyn från panelen eller med snabbtangenter, valfritt att komma ihåg valet för varje stream. |
| Verktyg | Insomningstimer, fokusvy (helskärm), återsynkronisering av spelaren och ett säkert läge som pausar varje automatisk ändring. |
| Diagnostik | Livestatus, upptäckta kvaliteter, videoupplösning, kvalitetsskanning, konfliktkontroll, åtgärdslogg och en kopierbar rapport. |
| Data | Exportera/importera inställningar, ångra, återställ efter återställning, säkerhetskopiering/återställning av sparade kanaler. |
| Sekretess | Inställningar, profiler, loggar och historik finns kvar i webbläsarens lagring. Inget skickas någonstans. |

<a id="settings-reference"></a>
## Inställningsreferens

Alla värden valideras av `sanitizeSettings` ; allt ogiltigt faller tillbaka till standardinställningen. Ranger upprätthålls.

### Spelare

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `autoQualityEnabled` | boolesk | `true` | Tillämpa den önskade kvaliteten automatiskt. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalitet för att ansöka om livestreamar och VOD. `auto` betyder "kom ihåg mitt senaste val". |
| `lastLiveQuality` , `lastVodQuality` | samma | `auto` | Sista kvalitet tittaren valde för hand. |
| `qualityFallback` | `lower` , `auto` | `lower` | Vad ska man göra när den önskade kvaliteten inte erbjuds. |
| `autoVolumeEnabled` | boolesk | `true` | Återställ och skydda den sparade volymen. |
| `volume` | 0–1 | `1` | Sparad volym. |
| `muted` | boolesk | `false` | Har sparat tyst läge. |
| `silent` | boolesk | `false` | Tyst uppspelning (nollförstärkningsljudgraf, spelaren är inte avstängd). |
| `playbackRate` | 0,25–2,5 | `1` | Sparad hastighet; `1` är aldrig tvingad. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolesk; 60–100, steg 5 | `true` ; `85` | Varning för hög volym. |
| `safeMode` | boolesk | `false` | Pausa varje automatisk ändring. |
| `channelProfiles` | objekt, upp till 200 | `{}` | Profiler per kanal (se nedan). |

Kanalprofilfält: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (endast `https://…kick.com/images/user/…` URLs), `note` (240 tecken), `group` (40 tecken , `updatedAt` characters . `lastUsed`

### Aviseringar och ljud

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `notificationsEnabled` | boolesk | `true` | Visa resultataviseringar. |
| `doNotDisturb` , `quietFullscreen` | boolesk | `false` , `true` | Undertryck aviseringar och ljud, eller bara i helskärm. |
| `notificationScale` | 0,8–1,4 | `1` | Aviseringsstorlek. |
| `notificationDuration` | 1500–12000 ms, steg 500 | `3500` | Hur länge en avisering stannar. |
| `notificationOpacity` | 0,35–1 | `0.95` | Aviseringstransparens. |
| `notificationShowIcon` | boolesk | `true` | Visa statusikonen. |
| `notificationPosition` | `{x, y}` eller `null` | `null` | Drag position. |
| `notificationHistoryEnabled` , `notificationHistory` | boolesk; upp till 30 poster | `true` ; `[]` | Historik för aviseringar. |
| `soundEffectsEnabled` , `soundVolume` | boolesk; 0–1 | `false` ; `0.35` | Huvudströmbrytare och volym. |
| `soundEvents` , `soundEventVolumes` | per händelse: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | allt på; `0.35` | Omkopplare och volym per händelse. |

### Utseende, rörelse och genvägar

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Färgtema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Visuell stil på panelen. |
| `accentColor` | `#rrggbb` | `#53fc18` | Accentfärg. |
| `compactMode` , `highContrast` | boolesk | `false` | Densitet och kontrast. |
| `backdropBlur` | 0–12 px | `6` | Bakgrundsoskärpa bakom panelen (fungerar i båda stilarna). |
| `textScale` | 0,9–1,3 | `1` | Textstorlek. |
| `language` , `languageChosen` | lokalkod; boolesk | webbläsarspråk; `false` | Gränssnittet följer webbläsarspråket tills ett språk väljs, sedan kommer valet ihåg. |
| `panelPosition` | `{x, y}` eller `null` | `null` | Drag panelposition. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animationshastighet. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Panel öppen/stäng effekt. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hover effekt. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logotyp/indikatoranimering. |
| `iconAnimations` | boolesk | `true` | Animera sidofält, återställ och hjälpikoner. |
| `hotkey` | combo sträng | `F2` | Öppnar eller stänger panelen. |
| `actionHotkeys` | combo strängar | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Växla meddelanden, fokusera vy, återställ kvalitet, återställ volym, växla chatt, växla vänster meny. |

Tangentkombinationer lagras som strängar som `Alt+Q` och matchas av fysiska tangenter, så de fungerar på alla tangentbordslayouter. Inställningar från äldre versioner med en objektformad snabbtangent konverteras automatiskt. Panelbredden är fixerad till 680 px (begränsad till fönsterstorleken); den tidigare breddinställningen ignoreras.

### Verktyg

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `autoRecoverStall` | boolesk | `false` | Prova `play()` när en frysning upptäcks. |
| `freezeAlertEnabled` , `freezeSound` | boolesk | `true` | Frys avisering och larmljud. |
| `freezeSeconds` | 5–60, steg 5 | `10` | Sekunder utan framsteg innan larmet. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolesk | `false` | Kom ihåg layout, tillämpas en gång per sida. |
| `autoClaimRewards` | boolesk | `false` | Aktivera automatisk belöningsanspråk. |
| `claimMode` | `notify` , `interval` | `notify` | Gör anspråk när Kick visar sitt meddelande, eller enligt ett schema. |
| `claimDelaySec` | 0–120, steg 5 | `5` | Vänta efter att meddelandet visas (aviseringsläge). |
| `claimIntervalMin` | 5–120, steg 5 | `10` | Minuter mellan kontrollerna (schemalagt läge). |

### Snabbanspråksknapp

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `claimWidget` | boolesk | `false` | Visa den flytande knappen. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Knappdesign. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Inbyggd ikon, eller användarens egen bild. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , upp till 90 000 tecken | tom | Omkodad kopia av den uppladdade bilden. Allt annat avvisas. |
| `claimWidgetImageFill` | boolesk | `false` | Låt en anpassad bild fylla hela knappen (används inte av pillerdesignen). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Knappstorlek. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Knappopacitet (full opacitet medan en belöning är tillgänglig). |
| `claimWidgetAutoHide` | boolesk | `false` | Visa knappen endast när en belöning är tillgänglig. |
| `claimWidgetPos` | `{x, y}` eller `null` | `null` | Drag position. |

### Diagnostik och tillstånd

| Nyckel | Typ/intervall | Standard | Betydelse |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolesk; upp till 60 poster | `true` ; `[]` | Åtgärdslogg. |
| `activeSection` | avsnitt id | `playback` | Senast öppnade sida. |
| `resetBackup` | inställningar objekt | `null` | Ögonblicksbild tagen före en återställning eller en import. |

<a id="core-utilities"></a>
## Kärnverktyg

| Funktion | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `detectLanguage` | — → språk | Går `navigator.languages` ​​, kartlägger regionala varianter ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) och returnerar den första platsen som stöds, eller `en` . |
| `dictFor` | lang → ordbok | Returnerar översättningstabellen för en plats, faller tillbaka till dess basspråk och sedan engelska. |
| `t` / `T` | lang, nyckel, vars → sträng | Löser en nyckel med `{placeholder}` substitution; `T` använder det aktuella språket. |
| `diagText` | index, kvalitet → sträng | Returnerar en av de lokaliserade diagnostiska meningarna. |
| `log` | …args → void | Konsolloggning med skriptprefixet. |
| `clamp` , `sleep` , `esc` | värde → värde | Räckviddsbegränsning, löftesbaserad fördröjning och HTML-escape. |
| `normalizeQuality` | text → sträng | Minskar en kvalitetsetikett och tar bort blanksteg. |
| `debounce` | fn, vänta → funktion | Efterföljande debounce med en `flush` . |
| `onLocationChange` | återuppringning → void | Upptäcker ensidig navigering genom att slå `pushState` / `replaceState` , lyssna på `popstate` och polling en gång per sekund. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | händelse → sträng/boolesk | Bygg och jämför nyckelkombinationer från den fysiska nyckelkoden. |
| `mkPointer` | typ, extra → händelse | Skapar en `PointerEvent` (eller en `MouseEvent` när den inte är tillgänglig) som används för att driva Kicks ARIA-menyer. |
| `waitFor` | sond, timeout, steg → värde/null | Polls tills proben returnerar ett värde eller timeouten slutar. |
| `imageToDataUrl` | bild → sträng | Skalar en bild till en fyrkantig arbetsyta (behåller proportioner, `willReadFrequently` ), försöker 128, 96 och 64 px och returnerar en PNG-data-URL som inte är större än 70 000 tecken. |

<a id="settings-storage"></a>
## Lagring av inställningar

| Funktion | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Håller högst 200 profiler med giltiga nycklar och klämmer fast varje fält; avataren måste vara en Kick-bild-URL. |
| `sanitizeSettings` | objekt, med Backup → objekt | Validerar alla inställningar (typer, intervall, tillåtna värden), migrerar 1.1–1.3 inställningar (äldre kvalitet, snabbtangenter, animering och sektionsnycklar) och tillämpar språkregeln. |
| `legacyHotkey` | värde → sträng | Konverterar en objektformad snabbtangent till en kombinationssträng. |
| `Store.load` / `Store.save` | — / inställningar → inställningar/void | Läs och skriv det sanerade objektet i `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → void | Slår ihop en patch, sanerar, sparar med en kort avstudsning och skjuter valfritt en ångra ögonblicksbild (endast sparas i minnet, upp till 15). |
| `storage` | händelse → ogiltig | Laddar om inställningar när en annan Kick-flik ändrar dem, så flikar skriver aldrig över varandra. |

<a id="player-synchronization-playersync"></a>
## Spelarsynkronisering ( `PlayerSync` )

### Kanal- och profilhjälpare

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `isVod` | — → boolesk | Upptäcker en VOD-sida från URL:en. |
| `channelKey` | — → sträng | Bygger den stabila `channel:slug` nyckeln (eller `vod:id` , `kick:home` ), cachelagrar resultatet i tre sekunder. På VOD-sidor används kanallänken närmast spelaren. |
| `channelSlug` | — → sträng | Returnerar slugdelen av en kanalnyckel. |
| `profile` | nyckel → objekt/null | Läser en sparad profil. |
| `profileActive` | — → objekt/null | Returnerar den aktuella profilen endast när den är aktiverad och inte exkluderad. |
| `isExcluded` | — → boolesk | Kontrollerar om automatisering är inaktiverad för den här kanalen. |
| `updateProfile` | patch, nyckel → void | Skapar eller slår samman en profil och stämplar `updatedAt` . |
| `saveCurrentChannel` | — → objekt/null | Lagrar tittarens aktuella kvalitet, volym, avstängning, hastighet och tyst läge som en aktiverad profil och skannar sidan efter kanalavatar. |
| `effective` | — → objekt | Löser volym, tyst, tyst, hastighet och live/VOD-kvalitet från den aktiva profilen eller de globala inställningarna. |
| `setStatus` | status, resultat → void | Uppdaterar status- och senaste resultatkoder som visas i rubriken och diagnostiken. |

### Hitta och köra Kicks spelare

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `findMainVideo` | — → video/null | Väljer den största synliga `<video>` . |
| `streamKey` | — → sträng | Returnerar sidsökvägen som används för att tillämpa kvalitet en gång per stream. |
| `isAccountButton` | knapp → boolesk | Avvisar header, avatar och kontoknappar. |
| `findSettingsButton` | video → knapp/null | Hittar spelarens kugghjulsknapp efter etikett eller i närheten av videons nedre högra hörn. |
| `revealControls` | video → void | Skickar svävarhändelser så att dolda kontroller visas. |
| `simulateClick` | element → void | Skickar hela pekarens händelsesekvens Kicks menyer behöver. |
| `menuItems` | — → element[] | Listar synliga `menuitemradio` . |
| `openQualityMenu` | — → knapp/null | Öppnar kugghjulsmenyn, går in i en kvalitetspost när en meny på toppnivå visas och väntar på alternativen. |
| `closeMenu` | knapp → Lova | Stänger menyn endast om den fortfarande är öppen (ett blindt andra klick kan öppna den igen), med en Escape-återgång. |
| `readMenu` | — → element[] | Registrerar de erbjudna egenskaperna och den kontrollerade. |
| `scanQualities` | — → Lova<boolean> | Öppnar menyn, registrerar tillgängliga kvaliteter och stänger den (används av diagnostik). |
| `activate` | objekt → Löfte | Klickar på ett alternativ och väntar tills det är markerat. |
| `selectQuality` | önskad, fallback → Löfte | Väljer önskad kvalitet, annars den näst lägre, eller Auto. |
| `desiredQuality` | — → sträng | Väljer den kvalitet som ska tillämpas från profilen, preferensen eller det senaste manuella valet. |
| `applyQualityOnce` | streamKey → Lova | Tillämpar önskad kvalitet en gång per stream, stänger menyn och meddelar om framgång eller misslyckande. |
| `watchManualQuality` | — → ogiltig | Lär sig en ny "senast använd" kvalitet endast från äkta (pålitliga) klick, så automatiska klick och reservalternativ skriver aldrig över sparade värden. |

### Volym, tyst läge, hastighet och övervakning

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `applyVolume` | video, tyst → void | Skriver den effektiva volymen och tyst läge (markerad som skriptets egen ändring). |
| `trackInput` | — → ogiltig | Registrerar tiden för den senaste betrodda pekaren, hjulet, pek- eller tangentbordsinmatningen. |
| `reassertVolume` | video → void | Sätter tillbaka den sparade volymen när sidan ändrade den utan någon användarinmatning (hastighetsbegränsad till åtta återgångar per tio sekunder). |
| `watchVolume` | video → void | Lyssnar efter `volumechange` : användardrivna ändringar sparas, siddrivna återställs. |
| `checkLoud` | volym, dämpad → void | Varnar en gång när volymen passerar tröskeln. |
| `buildGraph` | video → graf/null | Kopplar videon till en `AudioContext` genom en förstärkningsnod; rapporterar när webbplatsen inte tillåter det. |
| `applySilent` | video → void | Ställer in förstärkningen till 0 för tyst uppspelning eller tillbaka till 1, återupptar sammanhanget vid behov. |
| `applyRate` | video, tvinga → void | Ställer in den sparade hastigheten; `1` är inte påtvingad om inte tittaren precis valt det, så Kicks egen live-edge catch-up respekteras. |
| `applyMedia` | video, `{rate}` → void | Återställer volym, tyst läge och valfritt hastighet utan att beröra kvalitet. |
| `monitorFreeze` | video → void | Upptäcker en avstängd spelare (tiden har fastnat) eller en svart skärm (tiden går utan avkodade ramar) och utlöser larmet och valfri återställning. Fungerar i dolda flikar. |

### Slinga och livscykel

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `sync` | — → Löfte | Huvudslingan: övervakar fryser, binder lyssnare, tillämpar tyst läge, volym, hastighet och kvalitet, respekterar säkert läge och undantag, anropar sedan `Extras.tick` . |
| `resync` om | — → Löfte | Framtvingar ett nytt pass (används av förinställningar, snabba åtgärder och kvalitetsändringar). |
| `init` | — → ogiltig | Startar den första synkroniseringen, navigeringslyssnaren och 1,5-sekundersintervallet. |

<a id="page-extras-extras"></a>
## Sidtillägg ( `Extras` )

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Läs Kicks layouttillstånd från `data-chat` och `data-sidebar` på sidbehållaren. |
| `isDesktop` | — → boolesk | Layoutautomatisering körs bara på skrivbordsbredder. |
| `click` | element → booleskt | Klick genom `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → knapp/null | Leta reda på komprimeringsknappen inne i chattrummet och knappen "visa chatt" (efter ikon, inte efter språk). |
| `setChat` , `setSidebar` | visa → boolesk | Ta chatten eller vänstermenyn till önskat läge genom att trycka på Kicks egna knappar. |
| `applyLayout` | — → ogiltig | Tillämpar den ihågkomna layouten en gång per sida, utan att bekämpa manuella ändringar. |
| `isTyping` | — → boolesk | Sant medan tittaren skriver i ett fält; automatiska anspråk väntar. |
| `rewardTrigger` , `popoverCard` | — → knapp/null | Hitta presentknappen och belöningskortet. |
| `rewardAvailable` | — → boolesk | Upptäcker Kicks egen "belöning tillgänglig"-signal (den animerade uppmaningen). |
| `isEnabled` | knapp → boolesk | Synlig och inte inaktiverad. |
| `claimDrops` | — → Lova<number> | Trycker på aktiverade anspråksknappar för slutförda droppar i belöningspanelen. |
| `claimDaily` | utlösa → Lova<number> | Öppnar belöningsfönstret, trycker på varje aktiverad anspråksknapp en gång (aldrig samma knapp två gånger), stänger sedan fönstret. |
| `claimRewards` | `{manual}` → Lova<number> | Kör ett fullständigt anspråk, rapporterar resultatet och spelar ett ljud; manuella körningar ignorerar skrivning och rapporterar när det inte finns något att göra anspråk på. |
| `normName` | text → sträng | Normaliserar namn för matchning ( `_` och mellanslag till `-` ). |
| `findAvatar` | snigel → sträng | Returnerar kanalens avatar som är synlig på sidan (används innan en kanal sparas). |
| `scanAvatars` | — → ogiltig | Lagrar avatarer för sparade kanaler som saknar en. |
| `tick` | streamKey → void | Schemaläggare anropad från `sync` : tillämpar layouten, skannar avatarer, väntar på belöningsmeddelandet (aviseringsläge, med fördröjning och en nedkylning på två minuter) eller kontrollerar det valda intervallet och avsöker dropppanelen. |

<a id="interface-building-blocks"></a>
## Gränssnittsbyggstenar

| Funktion | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `I` | namn → svg | Inline stroke ikon. |
| `fmtValue` | format, rå → sträng | Formaterar skjutreglagevärden (procent, pixlar, sekunder). |
| `normSearch` , `englishOf` , `searchText` | text → sträng | Accentokänslig söktext inklusive det engelska namnet på en översatt etikett. |
| `row` | nyckel, etikett, kontroll, alternativ → html | En inställningsrad; staplade som standard, inline endast för switchar, med en valfri hjälpväxel. |
| `sw` , `toggleRow` | … → html | Brytarstyrning och en färdig kopplingsrad. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, segmenterade kontroller och kvalitetsnätet. |
| `range` | attr, nyckel, alternativ → html | Skjutreglage med fyllspår och live-värde. |
| `card` , `btn` , `ib` | … → html | Kort, textknapp och ikonknapp. |
| `timeStr` | tidsstämpel → sträng | Lokaliserad klocktid. |
| `setPref` | nyckel, värde → void | Skriver en spelarpreferens till den aktiva kanalprofilen eller till de globala inställningarna. |
| `fxBtn` | nyckel, värde, etikett, på → html | Effektväljarbricka med en liten förhandsvisningsglyph. |
| `avatarHtml` | namn, url → html | Avatar med en reservbokstav; en misslyckad bild tas bort. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → värde | Bygg upp markeringen av snabbanspråksknappar för både live-knappen och förhandsgranskningen av inställningar. |

<a id="settings-pages-pages"></a>
## Inställningssidor ( `PAGES` )

| Sida | Innehåll |
|---|---|
| `playback` | Spara-denna-kanaltips, förinställningar, kvalitet (automatisk applicering, live, VOD, reserv), volym (automatisk applicering, skjutreglage, tyst, tyst uppspelning, hög varning) och hastighet. |
| `channels` | Så här fungerar det, aktuell kanal med knappen **Spara den här kanalen** , pausa/uteslut växlar och redigerare, sedan listan över sparade kanaler (sök, sortera, fästa filter, grupper, Redigera/Klar, radera) med säkerhetskopiering och återställning. |
| `tools` | Insomningstimer, sidlayout, belöningar (automatiskt anspråk, läge, fördröjning eller intervall, gör anspråk nu), inställningar för snabbanspråksknappar med liveförhandsvisning, fryslarm och snabba åtgärder. |
| `notifications` | Omkopplare, storlek, varaktighet, opacitet, förhandsgranskning, positionsåterställning och historik. |
| `sounds` | Huvudströmbrytare och volym, omkopplare per händelse, volymer och förhandsvisningar. |
| `appearance` | Tema, stil, accentfärger, densitet, kontrast, textstorlek, oskärpa, centrering och språk. |
| `motion` | Liveförhandsvisning, förinställningar och väljare för öppen effekt, hovringseffekt, indikator, hastighet och ikonanimationer. |
| `shortcuts` | Meny snabbtangenter och åtgärd snabbtangenter med återbindning. |
| `diagnostics` | Status, skanning, rapport, kvalitets- och konfliktkontroller, säkert läge och åtgärdslogg. |
| `about` | Version, länkar, export/import, ångra, återställ och återställ. |

<a id="panel-controller-gui"></a>
## Panelkontroller ( `GUI` )

### Konstruktion och rendering

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `build` | — → ogiltig | Skapar shadow-DOM-värden, panelen, toast- och liveregionen och kopplar sedan händelser. |
| `applyLook` | — → ogiltig | Tillämpar tema, stil, accent, oskärpa, textskala, effekter, språkattribut och toastinställningar som attribut och CSS-variabler. |
| `renderChrome` | — → ogiltig | Återger titel, sökplatshållare, pausknapp, sidfotstips och snabbanspråksknappen. |
| `renderNav` | — → ogiltig | Återger det grupperade sidofältet. |
| `renderPage` | alternativ → ogiltig | Återger den aktiva sidan (eller alla sidor under sökning), behåller bläddrings- och tangentbordsfokus. |
| `filterRows` | — → ogiltig | Tillämpar sökfiltret på rader, kort och sidor. |
| `channelEditor` | nyckel, profil → html | Redaktör för en kanalprofil. |
| `refreshAll` , `onExternalChange` | — → ogiltig | Återrendera allt efter återställning, import, ångra eller en ändring från en annan flik. |

### Händelser och inställningar ändras

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `wire` | — → ogiltig | Bifogar delegerade klick-, inmatnings-, ändrings-, hjul- och rullhanterare och paneldrag. |
| `onClick` , `onInput` , `onChange` | händelse → ogiltig | Skicka klick, skjutreglage och textredigeringar till inställningar, profiler eller åtgärder. |
| `applyRange` | nyckel, värde → void | Använder ett skjutreglage (volym, oskärpa, opacitet, varaktighet...). |
| `setSetting` , `setChannel` | nyckel/patch → void | Spara en inställning eller en profiländring och skjut den berörda delen till spelaren. |
| `pushToPlayer` | omfattning, nyckel → void | `media` återställer volym, tyst läge och hastighet; `all` återställer också kvalitet. Volym, tyst, tyst läge och hastighet öppnar aldrig kvalitetsmenyn igen. |
| `act` | namn, element → Löfte | Kör namngivna åtgärder: förinställningar, spara och ta bort kanaler, säkerhetskopiering, import/export, anspråk, vilotimer, genvägar, diagnostik och mer. |
| `resetSection` | id → void | Återställer en sektions standardinställningar. |
| `restoreVolume` | — → ogiltig | Använder den sparade volymen igen. |
| `toggleLayout` | vilken → void | Döljer eller visar chatten eller vänstermenyn och kommer ihåg valet. |
| `confirm` , `closeModal` | meddelande, alternativ / resultat → Löfte/void | Dialogrutan för bekräftelse på panelen (identisk i alla webbläsare). |
| `download` , `pickFile` , `pickImage` | … → ogiltig | Spara JSON, läs JSON och välj en bild för snabbanspråksknappen. |
| `startCapture` , `finishCapture` | id / combo → void | Bind om en snabbtangent, avvisa dubbletter. |
| `replayMock` | — → ogiltig | Spelar upp den öppna effekten i förhandsvisningen av animeringen. |

### Verktyg och diagnostik

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuter / — → void | Starta, avbryt och visa insomningstimern (den pausar videon i slutet). |
| `toggleFocusView` | — → Löfte | Går in i eller lämnar helskärm på spelarbehållaren. |
| `statusText` , `resultText` , `syncDiagnostics` | — → sträng/tomt | Lokaliserad status för rubriken och diagnostiksidan. |
| `record` | meddelande, nivå → void | Lägger till en tidsstämplad post i åtgärdsloggen. |
| `copyDiagnostics` | — → Löfte | Kopierar en kort rapport (version, status, kvaliteter, sidtyp, användaragent). |
| `checkQuality` , `checkConflicts` | — → Löfte/void | Kontrollera att önskad kvalitet erbjuds och lista inställningar som fungerar mot varandra. |

### Snabbanspråksknapp

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `renderClaimWidget` | — → ogiltig | Skapar, uppdaterar eller tar bort den flytande knappen och startar dess tillståndsundersökning på en sekund. |
| `syncClaimWidget` | — → ogiltig | Visar "belöning tillgänglig" ring och prick, upptaget tillstånd och auto-dölj regeln. |
| `placeClaimWidget` | — → ogiltig | Placerar knappen och klämmer fast den i fönstret. |
| `wireClaimWidget` | element → void | Dra med en tröskel på fem pixlar (en dragning räknas aldrig som ett klick), positionssparande och klicket som kör ett manuellt anspråk. |

### Aviseringar, ljud och panelbeteende

| Metod | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `notify` | meddelande, slag, varaktighet, kraft → void | Visar en skål (om den inte är undertryckt), registrerar historik och tillkännager texten i en live-region. |
| `notifyQuality` | tillämpas, kvalitet → void | Spelar upp resultatljudet, loggar och visar ett lokaliserat meddelande. |
| `initToastPosition` , `wireToastDrag` | — → ogiltig | Återställ och spara den släpade toastpositionen. |
| `onAvatars` | — → ogiltig | Uppdaterar sidor som visar avatarer. |
| `ensureAudio` | — → sammanhang | Skapar och återupptar den delade `AudioContext` (upplåst vid den första användargesten). |
| `playSound` , `stopSounds` | namn, förhandsgranskning → ogiltig | Generera och stoppa webbljudsignalerna. |
| `playFreezeAlarm` , `alertFrozen` | kraft → void | Spela femtonslarmet och höj frysmeddelandet. |
| `placePanel` , `wirePanelDrag` | position → void | Placera panelen inuti fönstret och gör rubriken dragbar. |
| `open` , `close` , `toggle` | — → ogiltig | Styr panelen, polling, fokus och menyljud. |
| `syncVolumeControls` | — → ogiltig | Håller volymreglaget synkroniserat med spelaren medan panelen är öppen. |

<a id="hotkeys-and-startup"></a>
## Snabbtangenter och start

| Funktion | Parametrar / retur | Vad och hur det gör |
|---|---|---|
| `isolateKeys` | — → ogiltig | Registrerad vid `document-start` i fångstfasen: tangentbordshändelser som kommer inifrån panelen slutar spridas till Kick (så Mellanslag, F, M och pilarna utlöser aldrig spelarens snabbtangenter) och Tab är fångad i dialogrutan. |
| `setupHotkeys` | — → ogiltig | Hanterar tangentinfångning för återbindning, Escape (modal, dropdown, panel), meny-snabbtangenten och åtgärdskommandon; kombinationer med en modifierare eller en F-tangent fungerar även när du skriver. |
| `init` | — → ogiltig | Bygger panelen, installerar snabbtangenter och startar `PlayerSync` ; skyddad mot dubbelinsprutning. |

<a id="kick-page-dependencies"></a>
## Kick sida beroenden

Manuset förlitar sig på Kicks nuvarande uppmärkning. Där det är möjligt använder den ikoner, attribut och struktur snarare än synlig text, så det fortsätter att fungera på alla gränssnittsspråk. Om Kick ändrar dessa, slutar matchningsfunktionen att fungera (resten fortsätter att köras).

| Funktion | Vad den letar efter |
|---|---|
| Kvalitet | En synlig `<video>` , spelarens `button[aria-haspopup="menu"]` och `[role="menuitemradio"]` poster. |
| Layout | En behållare med `data-sidebar` och `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , en `CollapseRight` -ikonknapp inuti `#channel-chatroom` och en `MessagesOutline` ikonknapp för att visa chatten. |
| Belöningsmeddelande | En `video` vars källa innehåller `reward-available` , eller ett `[role="group"]` kort som innehåller en video `daily-rewards` . |
| Anspråk på belöning | En `button[aria-haspopup="dialog"][aria-controls]` (presentikon), dialogrutan som den kontrollerar ( `data-state` ), aktiverade anspråksknappar med ett `.contents` barn och en stängningsknapp med en `.sr-only` etikett. |
| Droppar | `#rewards-panel` listobjekt med en `[role="progressbar"][data-state="complete"]` och en aktiverad knapp. |
| Avatarer | `img[alt]` element vars källa är `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalisering

Varje etikett, hjälpmeddelande, fel, dialog och meddelande går igenom översättningslösaren för 38 språk. Saknade nycklar faller tillbaka till engelska. Ny gränssnittstext översätts till alla språk som stöds tillsammans med funktionen som lägger till den. Språkväljaren visar flaggor och infödda namn; gränssnittet följer webbläsarens språk vid första körning och kommer ihåg ett uttryckligt val efteråt.

<a id="safety-privacy-and-compatibility"></a>
## Säkerhet, integritet och kompatibilitet

- Inställningar saneras före förvaring; ogiltiga värden faller tillbaka till säkra standardvärden.
- Kanalnamn, anteckningar, meddelandetext och diagnostisk utdata escapes före HTML-infogning.
- En anpassad knappikon kodas om från en duk och lagras endast som en data-URL av en tillåten bildtyp; den lämnar aldrig webbläsaren.
- Shadow DOM håller skriptets stilar isolerade från Kick; tangentbordshändelser från panelen är isolerade från Kicks snabbtangenter.
- Automatiska åtgärder hoppar över uteslutna kanaler, säkert läge och saknade spelarelement. Belöningskrav trycker aldrig på samma knapp två gånger i en körning och väntar medan tittaren skriver.
- Skriptet gör inga nätverksbegäranden; uppdateringar kommer från användarskripthanteraren eller versionssidan.
- Befintliga lokala inställningar bevaras vid övergång från 1.1.0, 1.2.0 och 1.3.0.
