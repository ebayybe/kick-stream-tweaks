<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · **Nederlands** · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks - Functiereferentie

Referentie voor Kick Stream-aanpassingen 1.3.1. Het beschrijft wat elk functioneel gebied doet, hoe de instellingen worden opgeslagen, van welke delen van Kick's pagina het script afhankelijk is, en hoe elke benoemde functie of methode in het gebruikersscript werkt. Zie de [repository](https://github.com/ebayybe/kick-stream-tweaks) en [de changelog](../CHANGELOG/en_CHANGELOG.md) .

> Namen komen overeen met de bron. `void` betekent dat een functie werkt via bijwerkingen. Een methode geschreven als `Object.method` leeft op dat object ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Inhoud

1. [Architectuur](#architecture)
2. [Gebruikersgericht gedrag](#user-facing-behavior)
3. [Referentie instellingen](#settings-reference)
4. [Kernhulpprogramma's](#core-utilities)
5. [Opslag van instellingen](#settings-storage)
6. [Spelersynchronisatie ( `PlayerSync` )](#player-synchronization-playersync)
7. [Pagina extra's ( `Extras` )](#page-extras-extras)
8. [Interface-bouwstenen](#interface-building-blocks)
9. [Instellingenpagina's ( `PAGES` )](#settings-pages-pages)
10. [Paneelcontroller ( `GUI` )](#panel-controller-gui)
11. [Sneltoetsen en opstarten](#hotkeys-and-startup)
12. [Kick-pagina-afhankelijkheden](#kick-page-dependencies)
13. [Lokalisatie](#localization)
14. [Veiligheid, privacy en compatibiliteit](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architectuur

Het gebruikersscript is één op zichzelf staand bestand dat wordt uitgevoerd bij `document-start` met `@grant none` . Het kent geen bouwstap en doet zelf geen netwerkverzoeken.

| Laag | Object/gebied | Verantwoordelijkheid |
|---|---|---|
| Gegevens | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Vertalingen voor 38 talen, gelokaliseerde diagnostische berichten, vlag-SVG's en taalnamen. |
| Configuratie | `CONFIG` , `DEFAULTS` | Constanten (selectors, limieten voor nieuwe pogingen, presets, secties) en standaardinstellingen. |
| Opslag | `sanitizeSettings` , `Store` , `persist` | Valideert en slaat instellingen op in `localStorage` ; houdt een stapel ongedaan maken in het geheugen bij. |
| Spelerlogica | `PlayerSync` | Vindt de video, herstelt de kwaliteit, het volume, de snelheid en de stille modus, let op vastlopen. |
| Paginahelpers | `Extras` | Indelingsknoppen, claimen van beloningen, kanaalavatars en de achtergrondplanner. |
| Interface | `PAGES` , `GUI` , helpers | Shadow-DOM-paneel, meldingen, geluiden, zwevende snelclaimknop, sneltoetsen. |

Gegevensstroom: de `PlayerSync.sync` -lus van 1,5 seconde leest de effectieve instellingen (eerst kanaalprofiel, dan globaal), past deze toe op de speler en roept `Extras.tick` aan. Gebruikersacties verlopen via `GUI` handlers, die de instellingen bijwerken met `persist` en alleen het getroffen deel naar de speler pushen ( `media` of `all` ).

<a id="user-facing-behavior"></a>
## Gebruikersgericht gedrag

| Gebied | Gedrag |
|---|---|
| Volharding van de speler | Slaat live/VOD-kwaliteit, volume, mute-status, stille modus en snelheid op en past deze vervolgens toe wanneer een nieuwe stream wordt gedetecteerd. Wijzigingen die de pagina zelf aanbrengt (bijvoorbeeld Kick die het volume opnieuw instelt op 50%) worden teruggedraaid; alleen de eigen acties van de kijker werken de opgeslagen waarden bij. |
| Kwaliteit | Selecteert de gewenste kwaliteit via het spelermenu, valt terug naar de eerstvolgende lagere kwaliteit (of Auto) wanneer deze niet beschikbaar is, en sluit het menu weer. Alleen echte gebruikersklikken leren het script een nieuwe "laatst gebruikte" kwaliteit. |
| Volume en stille weergave | Volume en mute worden per stream hersteld. Stil afspelen leidt de video via de Web Audio-engine zonder versterking, zodat de stream op een achtergrondtabblad blijft spelen zonder te worden gedempt. |
| Kanaalprofielen | **Met Save this channel** worden de huidige kwaliteit, het volume, de snelheid en het geluid van het bekeken kanaal opgeslagen. Profielen bevatten ook notities, groepen, pinstatus, een avatar en de ingeschakelde/uitgesloten vlaggen. |
| Voorinstellingen | Bespaar bandbreedte, beste kwaliteit, stille weergave en VOD zijn met één klik van toepassing. |
| Paneel | `F2` of een aangepaste sneltoets opent een paneel met een vaste breedte (680 px) met een gegroepeerde zijbalk, zoek-, Kick- en Minimal-stijlen, lichte/donkere thema's, 14 accentkleuren plus een kleurkiezer, compacte lay-out, achtergrondvervaging, tekstschaling, hoog contrast en animatieregelaars. |
| Zoeken | Accentongevoelig, komt overeen met de interfacetaal en de Engelse namen, en komt overeen met sectie- of kaarttitels. Toetsaanslagen die in het paneel worden getypt, bereiken nooit de sneltoetsen van Kick. |
| Schuifregelaars | Elke slider reageert op klikken, slepen, toetsenbordpijlen en het muiswiel. |
| Geluiden | Webaudio-aanwijzingen voor menuacties, wijzigingen in instellingen, succes/mislukking van de kwaliteit en volumeherstel, elk met een schakelaar, voorbeeld en volume. |
| Meldingen | Gelokaliseerde berichten die kunnen worden gesleept, geschaald, transparant gemaakt, tot zwijgen gebracht (niet storen, stil op volledig scherm) en vastgelegd in de geschiedenis. |
| Bevriezingsalarm | Detecteert een vastgelopen speler of een zwart scherm, speelt een luid alarm af (zelfs in een verborgen tabblad, onafhankelijk van de geluidseffectenschakelaar) en toont een melding. |
| Beloningen | Optionele automatische claim wacht op de beloningsmelding van Kick (of verloopt volgens een schema), opent het beloningsvenster, claimt wat beschikbaar is en sluit het. Een zwevende, versleepbare snelclaimknop doet hetzelfde met één klik. |
| Indeling | Verbergt de chat en vouwt het linkermenu samen vanuit het paneel of met sneltoetsen, waarbij optioneel de keuze voor elke stream wordt onthouden. |
| Gereedschap | Slaaptimer, focusweergave (volledig scherm), hersynchronisatie van de speler en een veilige modus die elke automatische wijziging pauzeert. |
| Diagnostiek | Live status, gedetecteerde kwaliteiten, videoresolutie, kwaliteitsscan, conflictcontrole, actielog en een kopieerbaar rapport. |
| Gegevens | Exporteren/importeren van instellingen, ongedaan maken, herstellen na reset, back-up/herstellen van opgeslagen kanalen. |
| Privé | Instellingen, profielen, logboeken en geschiedenis blijven in de browseropslag. Er wordt niets verzonden. |

<a id="settings-reference"></a>
## Referentie instellingen

Alle waarden worden gevalideerd door `sanitizeSettings` ; alles wat ongeldig is, valt terug naar de standaardwaarde. Bereiken worden afgedwongen.

### Speler

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `autoQualityEnabled` | booleaans | `true` | Pas automatisch de gewenste kwaliteit toe. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kwaliteit om livestreams en VOD's aan te vragen. `auto` betekent "onthoud mijn laatste keuze". |
| `lastLiveQuality` , `lastVodQuality` | hetzelfde | `auto` | Laatste kwaliteit die de kijker met de hand heeft uitgekozen. |
| `qualityFallback` | `lower` , `auto` | `lower` | Wat te doen als de gewenste kwaliteit niet wordt aangeboden? |
| `autoVolumeEnabled` | booleaans | `true` | Herstel en bescherm het opgeslagen volume. |
| `volume` | 0–1 | `1` | Opgeslagen volume. |
| `muted` | booleaans | `false` | Mute-status opgeslagen. |
| `silent` | booleaans | `false` | Stille weergave (audiografiek zonder versterking, speler niet gedempt). |
| `playbackRate` | 0,25–2,5 | `1` | Opgeslagen snelheid; `1` wordt nooit geforceerd. |
| `warnLoudVolume` , `loudVolumeThreshold` | booleaans; 60–100, stap 5 | `true` ; `85` | Waarschuwing voor hoog volume. |
| `safeMode` | booleaans | `false` | Pauzeer elke automatische wijziging. |
| `channelProfiles` | object, tot 200 | `{}` | Profielen per kanaal (zie hieronder). |

Kanaalprofielvelden: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (alleen `https://…kick.com/images/user/…` URLs), `note` (240 tekens), `group` (40 tekens), `updatedAt` , `lastUsed` .

### Meldingen en geluiden

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `notificationsEnabled` | booleaans | `true` | Toon resultaatmeldingen. |
| `doNotDisturb` , `quietFullscreen` | booleaans | `false` , `true` | Onderdruk meldingen en geluiden, of alleen op volledig scherm. |
| `notificationScale` | 0,8–1,4 | `1` | Grootte van melding. |
| `notificationDuration` | 1500–12000 ms, stap 500 | `3500` | Hoe lang een melding blijft staan. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparantie van meldingen. |
| `notificationShowIcon` | booleaans | `true` | Toon het statuspictogram. |
| `notificationPosition` | `{x, y}` of `null` | `null` | Gesleepte positie. |
| `notificationHistoryEnabled` , `notificationHistory` | booleaans; maximaal 30 vermeldingen | `true` ; `[]` | Geschiedenis van meldingen. |
| `soundEffectsEnabled` , `soundVolume` | booleaans; 0–1 | `false` ; `0.35` | Hoofdschakelaar en volume. |
| `soundEvents` , `soundEventVolumes` | per gebeurtenis: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | alles aan; `0.35` | Schakelaar en volume per gebeurtenis. |

### Uiterlijk, beweging en snelkoppelingen

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Kleur thema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Visuele stijl van het paneel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Accentkleur. |
| `compactMode` , `highContrast` | booleaans | `false` | Dichtheid en contrast. |
| `backdropBlur` | 0–12 px | `6` | Achtergrondvervaging achter het paneel (werkt in beide stijlen). |
| `textScale` | 0,9–1,3 | `1` | Tekstgrootte. |
| `language` , `languageChosen` | landcode; booleaans | browsertaal; `false` | De interface volgt de browsertaal totdat er een taal wordt gekozen, waarna de keuze wordt onthouden. |
| `panelPosition` | `{x, y}` of `null` | `null` | Gesleepte paneelpositie. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Animatiesnelheid. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Paneel open/dicht-effect. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Zweefeffect. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logo-/indicatoranimatie. |
| `iconAnimations` | booleaans | `true` | Animeer zijbalk-, reset- en helppictogrammen. |
| `hotkey` | comboreeks | `F2` | Opent of sluit het paneel. |
| `actionHotkeys` | combo-snaren | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Schakel meldingen in, focus weergave, reset kwaliteit, herstel volume, schakel chat in, schakel linkermenu in. |

Toetscombinaties worden opgeslagen als tekenreeksen zoals `Alt+Q` en gekoppeld aan een fysieke toets, zodat ze op elke toetsenbordindeling werken. Instellingen uit oudere versies met een objectvormige sneltoets worden automatisch omgezet. De paneelbreedte is vastgesteld op 680 px (beperkt tot de venstergrootte); de vorige breedte-instelling wordt genegeerd.

### Hulpmiddelen

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `autoRecoverStall` | booleaans | `false` | Probeer `play()` wanneer er een bevriezing wordt gedetecteerd. |
| `freezeAlertEnabled` , `freezeSound` | booleaans | `true` | Melding bevriezen en alarmgeluid. |
| `freezeSeconds` | 5–60, stap 5 | `10` | Seconden zonder voortgang vóór het alarm. |
| `layoutHideChat` , `layoutCollapseSidebar` | booleaans | `false` | Onthoudde lay-out, eenmaal per pagina toegepast. |
| `autoClaimRewards` | booleaans | `false` | Schakel het automatisch claimen van beloningen in. |
| `claimMode` | `notify` , `interval` | `notify` | Claim wanneer Kick de melding laat zien, of volgens een schema. |
| `claimDelaySec` | 0–120, stap 5 | `5` | Wacht nadat de melding verschijnt (meldingsmodus). |
| `claimIntervalMin` | 5–120, stap 5 | `10` | Minuten tussen controles (geplande modus). |

### Knop voor snel claimen

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `claimWidget` | booleaans | `false` | Toon de zwevende knop. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Knop ontwerp. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Ingebouwd pictogram of eigen afbeelding van de gebruiker. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , maximaal 90.000 tekens | leeg | Opnieuw gecodeerde kopie van de geüploade afbeelding. Al het andere wordt afgewezen. |
| `claimWidgetImageFill` | booleaans | `false` | Laat een aangepaste afbeelding de hele knop vullen (niet gebruikt door het pilontwerp). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Knoopgrootte. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Knopdekking (volledige dekking zolang er een beloning beschikbaar is). |
| `claimWidgetAutoHide` | booleaans | `false` | Toon de knop alleen als er een beloning beschikbaar is. |
| `claimWidgetPos` | `{x, y}` of `null` | `null` | Gesleepte positie. |

### Diagnostiek en status

| Sleutel | Soort / bereik | Standaard | Betekenis |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booleaans; tot 60 vermeldingen | `true` ; `[]` | Actielogboek. |
| `activeSection` | sectie-ID | `playback` | Laatst geopende pagina. |
| `resetBackup` | instellingenobject | `null` | Momentopname gemaakt vóór een reset of import. |

<a id="core-utilities"></a>
## Kernhulpprogramma's

| Functie | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `detectLanguage` | — → land | Loopt `navigator.languages` door, brengt regionale varianten in kaart ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) en retourneert de eerste ondersteunde landinstelling, of `en` . |
| `dictFor` | lang → woordenboek | Retourneert de vertaaltabel voor een landinstelling, waarbij wordt teruggevallen op de basistaal en vervolgens op Engels. |
| `t` / `T` | lang, sleutel, vars → string | Lost een sleutel op met `{placeholder}` -vervanging; `T` gebruikt de huidige taal. |
| `diagText` | index, kwaliteit → string | Retourneert een van de gelokaliseerde diagnostische zinnen. |
| `log` | …args → ongeldig | Consolelogboekregistratie met het scriptvoorvoegsel. |
| `clamp` , `sleep` , `esc` | waarde → waarde | Bereikbeperking, op belofte gebaseerde vertraging en HTML-escape. |
| `normalizeQuality` | tekst → tekenreeks | Zet een kwaliteitslabel in kleine letters en verwijdert witruimte. |
| `debounce` | fn, wacht → functie | Trailing debounce met een `flush` methode. |
| `onLocationChange` | terugbellen → ongeldig | Detecteert navigatie op één pagina door `pushState` / `replaceState` in te pakken, naar `popstate` te luisteren en eenmaal per seconde te pollen. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | gebeurtenis → string/boolean | Bouw en vergelijk sleutelcombinaties op basis van de fysieke sleutelcode. |
| `mkPointer` | type, extra → evenement | Creëert een `PointerEvent` (of een `MouseEvent` indien niet beschikbaar) die wordt gebruikt om de ARIA-menu's van Kick aan te sturen. |
| `waitFor` | probe, time-out, stap → waarde/null | Polls totdat de probe een waarde retourneert of de time-out eindigt. |
| `imageToDataUrl` | afbeelding → tekenreeks | Schaalt een afbeelding naar een vierkant canvas (met behoud van de proporties, `willReadFrequently` ), probeert 128, 96 en 64 px en retourneert een PNG-gegevens-URL die niet groter is dan 70.000 tekens. |

<a id="settings-storage"></a>
## Instellingen opslag

| Functie | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `sanitizeProfiles` | voorwerp → voorwerp | Houdt maximaal 200 profielen bij met geldige sleutels en klemt elk veld vast; de avatar moet een Kick-afbeeldings-URL zijn. |
| `sanitizeSettings` | object, metBackup → object | Valideert elke instelling (typen, bereiken, toegestane waarden), migreert instellingen 1.1–1.3 (verouderde kwaliteit, sneltoets, animatie en sectietoetsen) en past de taalregel toe. |
| `legacyHotkey` | waarde → tekenreeks | Converteert een objectvormige sneltoets naar een combostring. |
| `Store.load` / `Store.save` | — / instellingen → instellingen/ongeldig | Lees en schrijf het opgeschoonde object in `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → ongeldig | Voegt een patch samen, zuivert, slaat op met een korte debounce en pusht optioneel een ongedaan gemaakte momentopname (alleen in het geheugen bewaard, maximaal 15). |
| `storage` luisteraar | gebeurtenis → ongeldig | Laadt de instellingen opnieuw wanneer een ander Kick-tabblad deze wijzigt, zodat tabbladen elkaar nooit overschrijven. |

<a id="player-synchronization-playersync"></a>
## Spelersynchronisatie ( `PlayerSync` )

### Kanaal- en profielhelpers

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `isVod` | — → booleaanse | Detecteert een VOD-pagina op basis van de URL. |
| `channelKey` | — → tekenreeks | Bouwt de stabiele `channel:slug` sleutel (of `vod:id` , `kick:home` ), waarbij het resultaat drie seconden in de cache wordt opgeslagen. Op VOD-pagina's wordt de kanaallink gebruikt die het dichtst bij de speler ligt. |
| `channelSlug` | — → tekenreeks | Retourneert het slug-gedeelte van een kanaalsleutel. |
| `profile` | sleutel → object/null | Leest een opgeslagen profiel. |
| `profileActive` | — → object/nul | Retourneert het huidige profiel alleen als dit is ingeschakeld en niet is uitgesloten. |
| `isExcluded` | — → booleaanse | Controleert of automatisering is uitgeschakeld voor dit kanaal. |
| `updateProfile` | patch, sleutel → ongeldig | Creëert of voegt een profiel samen en stempels `updatedAt` . |
| `saveCurrentChannel` | — → object/nul | Slaat de huidige kwaliteit, volume, mute, snelheid en stille status van de kijker op als een ingeschakeld profiel en scant de pagina op zoek naar de kanaalavatar. |
| `effective` | — → voorwerp | Lost volume, mute, stil, snelheid en live/VOD-kwaliteit op vanuit het actieve profiel of de algemene instellingen. |
| `setStatus` | status, resultaat → ongeldig | Werkt de status- en laatste-resultaatcodes bij die worden weergegeven in de koptekst en in de diagnostiek. |

### Kick's speler vinden en besturen

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `findMainVideo` | — → video/null | Kiest de grootste zichtbare `<video>` . |
| `streamKey` | — → tekenreeks | Retourneert het paginapad dat wordt gebruikt om kwaliteit eenmaal per stream toe te passen. |
| `isAccountButton` | knop → boolean | Weigert header-, avatar- en accountknoppen. |
| `findSettingsButton` | video → knop/nul | Vindt de versnellingsknop van de speler op label of op basis van de nabijheid van de rechterbenedenhoek van de video. |
| `revealControls` | video → ongeldig | Zendt gebeurtenissen uit zodat verborgen bedieningselementen verschijnen. |
| `simulateClick` | element → leegte | Verzendt de volledige aanwijzer-gebeurtenisreeks die Kick's menu's nodig hebben. |
| `menuItems` | — → element[] | Geeft zichtbare `menuitemradio` items weer. |
| `openQualityMenu` | — → knop/nul | Opent het tandwielmenu, stapt naar een kwaliteitsitem wanneer een menu op het hoogste niveau verschijnt en wacht op de opties. |
| `closeMenu` | knop → Belofte | Sluit het menu alleen als het nog open is (een blinde tweede klik kan het opnieuw openen), met een Escape-fallback. |
| `readMenu` | — → element[] | Registreert de aangeboden kwaliteiten en de aangevinkte. |
| `scanQualities` | — → Beloofd<boolean> | Opent het menu, registreert de beschikbare kwaliteiten en sluit het (gebruikt door diagnostiek). |
| `activate` | item → Belofte | Klikt op een optie en wacht totdat deze is aangevinkt. |
| `selectQuality` | gewenst, terugval → Belofte | Selecteert de gevraagde kwaliteit, anders de eerstvolgende lagere, of Auto. |
| `desiredQuality` | — → tekenreeks | Kiest de toe te passen kwaliteit uit het profiel, de voorkeur of de laatste handmatige keuze. |
| `applyQualityOnce` | streamKey → Belofte | Past één keer per stream de gewenste kwaliteit toe, sluit het menu en informeert over succes of falen. |
| `watchManualQuality` | — → ongeldig | Leert alleen een nieuwe 'laatst gebruikte' kwaliteit van echte (vertrouwde) klikken, zodat geautomatiseerde klikken en fallbacks nooit opgeslagen waarden overschrijven. |

### Volume, stille modus, snelheid en monitoring

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `applyVolume` | video, stil → leegte | Schrijft het effectieve volume en de mute-status (gemarkeerd als de eigen wijziging van het script). |
| `trackInput` | — → ongeldig | Registreert de tijd van de laatste vertrouwde aanwijzer, wiel, aanraking of toetsenbordinvoer. |
| `reassertVolume` | video → ongeldig | Zet het opgeslagen volume terug wanneer de pagina dit heeft gewijzigd zonder enige gebruikersinvoer (beperkt tot acht herhalingen per tien seconden). |
| `watchVolume` | video → ongeldig | Luistert naar `volumechange` : door de gebruiker aangestuurde wijzigingen worden opgeslagen, door pagina's aangestuurde wijzigingen worden teruggedraaid. |
| `checkLoud` | volume, gedempt → ongeldig | Waarschuwt één keer wanneer het volume de drempel overschrijdt. |
| `buildGraph` | video → grafiek/nul | Verbindt de video met een `AudioContext` via een versterkingsknooppunt; rapporteert wanneer de site dit niet toestaat. |
| `applySilent` | video → ongeldig | Stelt de versterking in op 0 voor stil afspelen of terug op 1, waarbij de context wordt hervat wanneer dat nodig is. |
| `applyRate` | video, kracht → ongeldig | Stelt de opgeslagen snelheid in; `1` wordt niet geforceerd tenzij de kijker er gewoon voor heeft gekozen, dus Kick's eigen live-inhaalslag wordt gerespecteerd. |
| `applyMedia` | video, `{rate}` → ongeldig | Past volume, stille modus en optioneel snelheid opnieuw toe zonder aan kwaliteit te raken. |
| `monitorFreeze` | video → ongeldig | Detecteert een vastgelopen speler (tijd blijft hangen) of een zwart scherm (tijd beweegt zonder gedecodeerde frames) en activeert het alarm en optioneel herstel. Werkt in verborgen tabbladen. |

### Lus en levenscyclus

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `sync` | — → Belofte | De hoofdlus: monitort bevriest, bindt luisteraars, past stille modus, volume, snelheid en kwaliteit toe, respecteert de veilige modus en uitsluitingen en roept vervolgens `Extras.tick` aan. |
| `resync` | — → Belofte | Forceert een nieuwe pass (gebruikt door presets, snelle acties en kwaliteitswijzigingen). |
| `init` | — → ongeldig | Start de eerste synchronisatie, de navigatieluisteraar en het interval van 1,5 seconde. |

<a id="page-extras-extras"></a>
## Pagina extra's ( `Extras` )

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Lees de lay-outstatus van Kick uit `data-chat` en `data-sidebar` op de paginacontainer. |
| `isDesktop` | — → booleaanse | Layoutautomatisering werkt alleen op bureaubladbreedtes. |
| `click` | element → boolean | Klikken via `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → knop/nul | Zoek de knop voor samenvouwen in de chatroom en de knop "chat weergeven" (op pictogram, niet op taal). |
| `setChat` , `setSidebar` | tonen → boolean | Breng de chat of het linkermenu in de gewenste staat door op Kick's eigen knoppen te drukken. |
| `applyLayout` | — → ongeldig | Past de onthouden lay-out eenmaal per pagina toe en vecht nooit tegen handmatige wijzigingen. |
| `isTyping` | — → booleaanse | Waar terwijl de kijker een veld aan het typen is; automatische claims wachten. |
| `rewardTrigger` , `popoverCard` | — → knop/nul | Zoek de cadeauknop en de beloningspopover-kaart. |
| `rewardAvailable` | — → booleaanse | Detecteert Kick's eigen signaal "beloning beschikbaar" (de geanimeerde call-to-action). |
| `isEnabled` | knop → boolean | Zichtbaar en niet uitgeschakeld. |
| `claimDrops` | — → Beloofd<number> | Druk op ingeschakelde claimknoppen voor voltooide drops in het beloningspaneel. |
| `claimDaily` | trigger → Belofte<number> | Opent het beloningsvenster, drukt één keer op elke ingeschakelde claimknop (nooit twee keer op dezelfde knop) en sluit vervolgens het venster. |
| `claimRewards` | `{manual}` → Beloofd<number> | Voert een volledige claim uit, rapporteert het resultaat en speelt een geluid af; handmatige uitvoeringen negeren het typen en rapporteren wanneer er niets te claimen is. |
| `normName` | tekst → tekenreeks | Normaliseert namen voor overeenkomsten ( `_` en spaties tot `-` ). |
| `findAvatar` | naaktslak → string | Retourneert de kanaalavatar die zichtbaar is op de pagina (gebruikt voordat een kanaal wordt opgeslagen). |
| `scanAvatars` | — → ongeldig | Slaat avatars op voor opgeslagen kanalen die er geen hebben. |
| `tick` | streamKey → ongeldig | Planner opgeroepen vanuit `sync` : past de lay-out toe, scant avatars, wacht op de beloningsmelding (meldingsmodus, met vertraging en een cool-down van twee minuten) of controleert het gekozen interval, en peilt het drop-paneel. |

<a id="interface-building-blocks"></a>
## Interfacebouwstenen

| Functie | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `I` | naam → SVG | Inline lijnpictogram. |
| `fmtValue` | formaat, raw → tekenreeks | Formatteert schuifregelaarwaarden (percentage, pixels, seconden). |
| `normSearch` , `englishOf` , `searchText` | tekst → tekenreeks | Accentongevoelige zoektekst inclusief de Engelse naam van een vertaald label. |
| `row` | sleutel, label, besturingselement, opties → html | Een instellingsrij; standaard gestapeld, alleen inline voor schakelaars, met een optionele helpschakelaar. |
| `sw` , `toggleRow` | … → html | Schakelaarbediening en een kant-en-klare schakelaarrij. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, gesegmenteerde controles en het kwaliteitsraster. |
| `range` | attr, sleutel, opties → html | Schuifregelaar met vultrack en live-waarde. |
| `card` , `btn` , `ib` | … → html | Kaart, tekstknop en pictogramknop. |
| `timeStr` | tijdstempel → tekenreeks | Gelokaliseerde kloktijd. |
| `setPref` | sleutel, waarde → ongeldig | Schrijft een spelervoorkeur naar het actieve kanaalprofiel of naar de algemene instellingen. |
| `fxBtn` | sleutel, waarde, label, aan → html | Effectkiezertegel met een kleine voorbeeldglyph. |
| `avatarHtml` | naam, url → html | Avatar met een letterterugval; een mislukte afbeelding wordt verwijderd. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → waarde | Bouw de snelle claimknopmarkering voor zowel de liveknop als het instellingenvoorbeeld. |

<a id="settings-pages-pages"></a>
## Instellingenpagina's ( `PAGES` )

| Pagina | Inhoud |
|---|---|
| `playback` | Bewaar-dit-kanaal-hint, presets, kwaliteit (automatisch toepassen, live, VOD, fallback), volume (automatisch toepassen, schuifregelaar, dempen, stil afspelen, luide waarschuwing) en snelheid. |
| `channels` | Hoe het werkt: huidig ​​kanaal met de knop **Dit kanaal opslaan** , schakelaars voor pauzeren/uitsluiten en editor, en vervolgens de lijst met opgeslagen kanalen (zoeken, sorteren, filter vastzetten, groepen, bewerken/klaar, verwijderen) met back-up en herstel. |
| `tools` | Slaaptimer, pagina-indeling, beloningen (automatisch claimen, modus, vertraging of interval, nu claimen), instellingen voor snelle claimknoppen met live preview, bevriezingsalarm en snelle acties. |
| `notifications` | Schakelaars, grootte, duur, dekking, voorbeeld, positiereset en geschiedenis. |
| `sounds` | Hoofdschakelaar en volume, schakelaars per gebeurtenis, volumes en previews. |
| `appearance` | Thema, stijl, accentkleuren, dichtheid, contrast, tekstgrootte, vervaging, centrering en taal. |
| `motion` | Live preview, presets en pickers voor open effect, hover-effect, indicator-, snelheid- en pictogramanimaties. |
| `shortcuts` | Menusneltoets en actiesneltoetsen met rebinding. |
| `diagnostics` | Status-, scan-, rapport-, kwaliteit- en conflictcontroles, veilige modus en actielogboek. |
| `about` | Versie, koppelingen, exporteren/importeren, ongedaan maken, herstellen en opnieuw instellen. |

<a id="panel-controller-gui"></a>
## Paneelcontroller ( `GUI` )

### Constructie en rendering

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `build` | — → ongeldig | Creëert de schaduw-DOM-host, het paneel, de toast en de live-regio en bedraden vervolgens de gebeurtenissen. |
| `applyLook` | — → ongeldig | Past thema, stijl, accent, vervaging, tekstschaal, effecten, taalkenmerk en toastinstellingen toe als attributen en CSS-variabelen. |
| `renderChrome` | — → ongeldig | Geeft de titel, tijdelijke aanduiding voor zoeken, pauzeknop, voetteksthint en de knop voor snel claimen weer. |
| `renderNav` | — → ongeldig | Geeft de gegroepeerde zijbalk weer. |
| `renderPage` | opties → ongeldig | Rendert de actieve pagina (of alle pagina's tijdens het zoeken), waarbij de scroll- en toetsenbordfocus behouden blijft. |
| `filterRows` | — → ongeldig | Past het zoekfilter toe op rijen, kaarten en pagina's. |
| `channelEditor` | sleutel, profiel → html | Editor voor één kanaalprofiel. |
| `refreshAll` , `onExternalChange` | — → ongeldig | Geef alles opnieuw weer na opnieuw instellen, importeren, ongedaan maken of wijzigen vanaf een ander tabblad. |

### Wijzigingen in gebeurtenissen en instellingen

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `wire` | — → ongeldig | Voegt gedelegeerde klik-, invoer-, wijzigings-, wiel- en scrollhandlers en het slepen van panelen toe. |
| `onClick` , `onInput` , `onChange` | gebeurtenis → ongeldig | Verzend klikken, schuifbewegingen en tekstbewerkingen naar instellingen, profielen of acties. |
| `applyRange` | sleutel, waarde → ongeldig | Past een schuifwaarde toe (volume, vervaging, dekking, duur...). |
| `setSetting` , `setChannel` | sleutel/patch → ongeldig | Sla een instelling of een profielwijziging op en duw het betreffende onderdeel naar de speler. |
| `pushToPlayer` | reikwijdte, sleutel → leegte | `media` past volume, stille modus en snelheid opnieuw toe; `all` geldt ook opnieuw voor kwaliteit. Volume, mute, stille modus en snelheid heropenen nooit het kwaliteitsmenu. |
| `act` | naam, element → Belofte | Voert benoemde acties uit: voorinstellingen, kanalen opslaan en verwijderen, back-up, import/export, claims, slaaptimer, snelkoppelingen, diagnostiek en meer. |
| `resetSection` | id → ongeldig | Herstelt de standaardinstellingen van één sectie. |
| `restoreVolume` | — → ongeldig | Past het opgeslagen volume opnieuw toe. |
| `toggleLayout` | welke → ongeldig | Verbergt of toont de chat of het linkermenu en onthoudt de keuze. |
| `confirm` , `closeModal` | bericht, opties / resultaat → Belofte/nietig | Bevestigingsdialoogvenster in het paneel (identiek in elke browser). |
| `download` , `pickFile` , `pickImage` | … → ongeldig | Sla JSON op, lees JSON en kies een afbeelding voor de snelclaimknop. |
| `startCapture` , `finishCapture` | id / combo → ongeldig | Bind een sneltoets opnieuw, waarbij duplicaten worden afgewezen. |
| `replayMock` | — → ongeldig | Speelt het open effect opnieuw af in het animatievoorbeeld. |

### Hulpmiddelen en diagnostiek

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuten / — → ongeldig | Start, annuleer en geef de slaaptimer weer (de video wordt aan het einde gepauzeerd). |
| `toggleFocusView` | — → Belofte | Opent of verlaat het volledige scherm van de spelercontainer. |
| `statusText` , `resultText` , `syncDiagnostics` | — → tekenreeks/leegte | Gelokaliseerde status voor de header en de diagnosepagina. |
| `record` | bericht, niveau → ongeldig | Voegt een vermelding met tijdstempel toe aan het actielogboek. |
| `copyDiagnostics` | — → Belofte | Kopieert een kort rapport (versie, status, kwaliteiten, paginatype, user-agent). |
| `checkQuality` , `checkConflicts` | — → Belofte/nietigheid | Controleer of de gewenste kwaliteit wordt aangeboden en vermeld instellingen die elkaar tegenwerken. |

### Knop voor snel claimen

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `renderClaimWidget` | — → ongeldig | Creëert, updatet of verwijdert de zwevende knop en start de statuspeiling van één seconde. |
| `syncClaimWidget` | — → ongeldig | Toont de "beloning beschikbare" ring en stip, de bezetstatus en de regel voor automatisch verbergen. |
| `placeClaimWidget` | — → ongeldig | Positioneert de knop en klemt deze tegen het raam. |
| `wireClaimWidget` | element → leegte | Slepen met een drempel van vijf pixels (een slepen telt nooit als een klik), het opslaan van posities en de klik die een handmatige claim uitvoert. |

### Meldingen, geluid en paneelgedrag

| Werkwijze | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `notify` | bericht, soort, duur, kracht → ongeldig | Toont een toost (tenzij onderdrukt), registreert de geschiedenis en kondigt de tekst aan in een live regio. |
| `notifyQuality` | toegepast, kwaliteit → ongeldig | Speelt het resultaatgeluid af, registreert en toont een gelokaliseerde melding. |
| `initToastPosition` , `wireToastDrag` | — → ongeldig | Herstel en sla de gesleepte toastpositie op. |
| `onAvatars` | — → ongeldig | Vernieuwt pagina's die avatars tonen. |
| `ensureAudio` | — → context | Creëert en hervat de gedeelde `AudioContext` (ontgrendeld bij het eerste gebruikersgebaar). |
| `playSound` , `stopSounds` | naam, voorbeeld → ongeldig | Genereer en stop de Web Audio-signalen. |
| `playFreezeAlarm` , `alertFrozen` | kracht → ongeldig | Speel het alarm van vijf noten en activeer de bevriezingsmelding. |
| `placePanel` , `wirePanelDrag` | positie → ongeldig | Plaats het paneel in het venster en maak de koptekst versleepbaar. |
| `open` , `close` , `toggle` | — → ongeldig | Bedien het paneel, polling, focus en menugeluiden. |
| `syncVolumeControls` | — → ongeldig | Houdt de volumeschuifregelaar gesynchroniseerd met de speler terwijl het paneel open is. |

<a id="hotkeys-and-startup"></a>
## Sneltoetsen en opstarten

| Functie | Parameters / retour | Wat en hoe het werkt |
|---|---|---|
| `isolateKeys` | — → ongeldig | Geregistreerd bij `document-start` in de vastlegfase: toetsenbordgebeurtenissen die van binnenuit het paneel komen, worden niet meer doorgegeven aan Kick (zodat Spatie, F, M en de pijlen nooit de sneltoetsen van de speler activeren) en Tab zit vast in het dialoogvenster. |
| `setupHotkeys` | — → ongeldig | Verwerkt sleutelregistratie voor opnieuw binden, Escape (modaal, vervolgkeuzelijst, paneel), de menusneltoets en de actiesneltoetsen; combo's met een modifier of een F-toets werken zelfs tijdens het typen. |
| `init` | — → ongeldig | Bouwt het paneel, installeert sneltoetsen en start `PlayerSync` ; beschermd tegen dubbele injectie. |

<a id="kick-page-dependencies"></a>
## Pagina-afhankelijkheden wegnemen

Het script is afhankelijk van de huidige markup van Kick. Waar mogelijk gebruikt het pictogrammen, attributen en structuur in plaats van zichtbare tekst, zodat het in elke interfacetaal blijft werken. Als Kick deze verandert, stopt de matching-functie met werken (de rest blijft actief).

| Kenmerk | Waar het naar kijkt |
|---|---|
| Kwaliteit | Een zichtbare `<video>` , de `button[aria-haspopup="menu"]` en `[role="menuitemradio"]` vermeldingen. |
| Indeling | Een container met `data-sidebar` en `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , een `CollapseRight` -pictogramknop in `#channel-chatroom` en een `MessagesOutline` -pictogramknop voor het tonen van de chat. |
| Beloningsmelding | Een `video` waarvan de bron `reward-available` bevat, of een `[role="group"]` kaart met een video met `daily-rewards` . |
| Beloning claimen | Een `button[aria-haspopup="dialog"][aria-controls]` (cadeaupictogram), de dialoog die deze bestuurt ( `data-state` ), ingeschakelde claimknoppen met een `.contents` kind en een sluitknop met een label `.sr-only` . |
| Druppels | `#rewards-panel` lijst items met een `[role="progressbar"][data-state="complete"]` en een ingeschakelde knop. |
| Avatars | `img[alt]` elementen waarvan de bron `files.kick.com/images/user/…/profile_image/…` is. |

<a id="localization"></a>
## Lokalisatie

Elk label, helpbericht, fout, dialoog en melding gaat door de vertaaloplosser voor 38 talen. Ontbrekende sleutels vallen terug naar het Engels. Nieuwe interfacetekst wordt vertaald in alle ondersteunde talen, samen met de functie die deze toevoegt. De taalkiezer toont vlaggen en inheemse namen; de interface volgt de browsertaal bij de eerste keer opstarten en onthoudt daarna een expliciete keuze.

<a id="safety-privacy-and-compatibility"></a>
## Veiligheid, privacy en compatibiliteit

- Instellingen worden gezuiverd voordat ze worden opgeslagen; ongeldige waarden vallen terug naar veilige standaardwaarden.
- Kanaalnamen, notities, meldingsteksten en diagnostische uitvoer worden ge-escaped voordat HTML wordt ingevoegd.
- Een aangepast knoppictogram wordt opnieuw gecodeerd vanaf een canvas en alleen opgeslagen als een gegevens-URL van een toegestaan ​​afbeeldingstype; het verlaat nooit de browser.
- Shadow DOM houdt de scriptstijlen geïsoleerd van Kick; toetsenbordgebeurtenissen van het paneel worden geïsoleerd van de sneltoetsen van Kick.
- Automatische acties slaan uitgesloten kanalen, veilige modus en ontbrekende spelerelementen over. Beloning claimt nooit tweemaal op dezelfde knop in één keer en wacht terwijl de kijker typt.
- Het script doet geen netwerkverzoeken; updates komen van de gebruikersscriptbeheerder of de pagina Releases.
- Bestaande lokale instellingen blijven behouden bij het overstappen van 1.1.0, 1.2.0 en 1.3.0.
