<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · **Latviešu** · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — funkciju atsauce

Atsauce uz Kick Stream Tweaks 1.3.1. Tajā ir aprakstīts, ko dara katra funkcionālā zona, kā tiek saglabāti iestatījumi, no kurām Kick lapas daļām ir atkarīgs skripts un kā darbojas katra lietotāja skriptā nosauktā funkcija vai metode. Skatiet [repozitoriju](https://github.com/ebayybe/kick-stream-tweaks) un [izmaiņu žurnālu](../CHANGELOG/en_CHANGELOG.md) .

> Nosaukumi atbilst avotam. `void` nozīmē, ka funkcija darbojas, izmantojot blakusparādības. Metode, kas rakstīta kā `Object.method` , atrodas šajā objektā ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Saturs

1. [Arhitektūra](#architecture)
2. [Uzvedība, kas vērsta uz lietotāju](#user-facing-behavior)
3. [Iestatījumu atsauce](#settings-reference)
4. [Galvenās utilītas](#core-utilities)
5. [Iestatījumu krātuve](#settings-storage)
6. [Spēlētāja sinhronizācija ( `PlayerSync` )](#player-synchronization-playersync)
7. [Lapas ekstras ( `Extras` )](#page-extras-extras)
8. [Interfeisa bloki](#interface-building-blocks)
9. [Iestatījumu lapas ( `PAGES` )](#settings-pages-pages)
10.[ Paneļa kontrolleris ( `GUI` )](#panel-controller-gui)
11. [Karstie taustiņi un palaišana](#hotkeys-and-startup)
12. [Kick lapu atkarības](#kick-page-dependencies)
13. [Lokalizācija](#localization)
14. [Drošība, privātums un saderība](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arhitektūra

Lietotāja skripts ir viens pašpietiekams fails, kas tiek palaists `document-start` ar `@grant none` . Tam nav izveides posma, un tas neveic savus tīkla pieprasījumus.

| Slānis | Objekts/apgabals | Atbildība |
|---|---|---|
| Dati | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Tulkojumi 38 valodām, lokalizēti diagnostikas ziņojumi, karoga SVG un valodu nosaukumi. |
| Konfigurācija | `CONFIG` . , `DEFAULTS` | Konstantes (selektori, atkārtota mēģinājuma ierobežojumi, iepriekšējie iestatījumi, sadaļas) un noklusējuma iestatījumi. |
| Uzglabāšana | `sanitizeSettings` , `Store` , `persist` | Validē un saglabā iestatījumus `localStorage` ; saglabā atmiņā esošo atsaukšanas steku. |
| Spēlētāja loģika | `PlayerSync` | Atrod video, atjauno kvalitāti, skaļumu, ātrumu un klusuma režīmu, skatās, vai nav sasalšanas. |
| Lapas palīgi | `Extras` | Izkārtojuma pogas, atlīdzības pieprasīšana, kanāla iemiesojumi un fona plānotājs. |
| Interfeiss | `PAGES` , `GUI` , palīgi | Shadow-DOM panelis, paziņojumi, skaņas, peldoša ātrās pieprasīšanas poga, karstie taustiņi. |

Datu plūsma: 1,5 sekundes `PlayerSync.sync` cilpa nolasa spēkā esošos iestatījumus (vispirms kanāla profils, pēc tam globālais), piemēro tos atskaņotājam un izsauc `Extras.tick` . Lietotāju darbības tiek veiktas, izmantojot `GUI` apdarinātājus, kas atjaunina iestatījumus ar `persist` un nosūta tikai ietekmēto daļu atskaņotājam ( `media` vai `all` ).

<a id="user-facing-behavior"></a>
## Uzvedība, kas vērsta uz lietotāju

| Platība | Uzvedība |
|---|---|
| Spēlētāja neatlaidība | Saglabā tiešraides/VOD kvalitāti, skaļumu, izslēgšanas stāvokli, klusuma režīmu un ātrumu, pēc tam piemēro tos, kad tiek noteikta jauna straume. Lapas pašas veiktās izmaiņas (piemēram, Kick atiestatot skaļumu uz 50%) tiek atjaunotas; saglabātās vērtības atjaunina tikai paša skatītāja darbības. |
| Kvalitāte | Atlasa vēlamo kvalitāti, izmantojot atskaņotāja izvēlni, atgriežas pie nākamās zemākās kvalitātes (vai Auto), ja tas nav pieejams, un vēlreiz aizver izvēlni. Tikai patiesi lietotāja klikšķi iemāca skriptam jaunu "pēdējo lietoto" kvalitāti. |
| Skaļuma un klusa atskaņošana | Katrai straumei tiek atjaunots skaļums un izslēgšana. Klusā atskaņošana novirza video caur Web Audio programmu ar nulles pastiprinājumu, tāpēc straume tiek atskaņota fona cilnē bez skaņas izslēgšanas. |
| Kanālu profili | **Saglabāt šo kanālu** saglabā skatītā kanāla pašreizējo kvalitāti, skaļumu, ātrumu un skaņu. Profilos ir arī piezīmes, grupas, piespraudes stāvoklis, iemiesojums un iespējotie/izslēgtie karodziņi. |
| Sākotnējie iestatījumi | Ietaupiet joslas platumu, vislabāko kvalitāti, klusu skatīšanos un VOD lietojiet ar vienu klikšķi. |
| Panelis | `F2` vai pielāgotais karstais taustiņš atver fiksēta platuma (680 pikseļu) paneli ar grupētu sānjoslu, meklēšanu, Kick un Minimal stiliem, gaišiem/tumšiem motīviem, 14 akcentu krāsām, kā arī krāsu atlasītāju, kompaktu izkārtojumu, fona aizmiglojumu, teksta mērogošanu, augstu kontrastu un animācijas vadīklām. |
| Meklēt | Nejutīgs pret akcentiem, atbilst saskarnes valodai un nosaukumiem angļu valodā, kā arī atbilst sadaļu vai kartīšu nosaukumiem. Panelī ievadītie taustiņsitieni nekad nesasniedz Kick karstos taustiņus. |
| Slīdņi | Katrs slīdnis reaģē uz klikšķiem, vilkšanu, tastatūras bultiņām un peles ritenīti. |
| Skaņas | Web audio norādes izvēlnes darbībām, iestatījumu izmaiņām, kvalitātes panākumiem/neveiksmēm un skaļuma atjaunošanai, katrs ar slēdzi, priekšskatījumu un skaļumu. |
| Paziņojumi | Lokalizēti ziņojumi, kurus var vilkt, mērogot, padarīt caurspīdīgu, apklusināt (netraucēt, kluss pilnekrāna režīms) un ierakstīt vēsturē. |
| Sasalšanas trauksme | Atklāj apstājies atskaņotāju vai melnu ekrānu, atskaņo skaļu signālu (pat slēptā cilnē neatkarīgi no skaņas efektu slēdža) un parāda paziņojumu. |
| Atlīdzības | Izvēles automātiskā pieprasīšana gaida Kick atlīdzības paziņojumu (vai darbojas pēc grafika), tiek atvērts atlīdzības logs, pieprasīts, kas ir pieejams, un tas tiek aizvērts. Peldoša, velkama ātrās pretenzijas poga dara to pašu ar vienu klikšķi. |
| Izkārtojums | Paslēpj tērzēšanu un sakļauj kreisās puses izvēlni no paneļa vai ar karstajiem taustiņiem, pēc izvēles atceroties katras straumes izvēli. |
| Instrumenti | Miega taimeris, fokusa (pilnekrāna) skats, atskaņotāja atkārtota sinhronizācija un drošais režīms, kas aptur visas automātiskās izmaiņas. |
| Diagnostika | Tiešraides statuss, konstatētās īpašības, video izšķirtspēja, kvalitātes skenēšana, konfliktu pārbaude, darbību žurnāls un kopējams ziņojums. |
| Dati | Iestatījumu eksportēšana/importēšana, atsaukšana, atjaunošana pēc atiestatīšanas, saglabāto kanālu dublēšana/atjaunošana. |
| Privātums | Iestatījumi, profili, žurnāli un vēstures paliek pārlūkprogrammas krātuvē. Nekas nekur netiek sūtīts. |

<a id="settings-reference"></a>
## Iestatījumu atsauce

Visas vērtības apstiprina `sanitizeSettings` ; viss nederīgs atgriežas uz noklusējuma vērtību. Diapazoni tiek piemēroti.

### Spēlētājs

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `autoQualityEnabled` | Būla | `true` | Automātiski izmantojiet vēlamo kvalitāti. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalitāte, lai pieteiktos tiešraides straumēm un VOD. `auto` nozīmē "atcerēties manu pēdējo izvēli". |
| `lastLiveQuality` , `lastVodQuality` | tas pats | `auto` | Pēdējā kvalitāte, ko skatītājs izvēlējās ar rokām. |
| `qualityFallback` | `lower` , `auto` | `lower` | Ko darīt, ja vēlamā kvalitāte netiek piedāvāta. |
| `autoVolumeEnabled` | Būla | `true` | Atjaunojiet un aizsargājiet saglabāto skaļumu. |
| `volume` | 0–1 | `1` | Saglabāts apjoms. |
| `muted` | Būla | `false` | Saglabāts izslēgšanas stāvoklis. |
| `silent` | Būla | `false` | Klusa atskaņošana (nulles pastiprinājuma audio diagramma, atskaņotājs nav izslēgts). |
| `playbackRate` | 0,25–2,5 | `1` | Saglabāts ātrums; `1` nekad nav piespiedu kārtā. |
| `warnLoudVolume` , `loudVolumeThreshold` | Būla vērtība; 60–100, 5. darbība | `true` ; `85` | Liela apjoma brīdinājums. |
| `safeMode` | Būla | `false` | Apturiet visas automātiskās izmaiņas. |
| `channelProfiles` | objekts, līdz 200 | `{}` | Katra kanāla profili (skatiet tālāk). |

Kanāla profila lauki: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (tikai `https://…kick.com/images/user/…` URL), `note` (240 rakstzīmes), `group` (40 rakstzīmes), `updatedAt` `lastUsed` .

### Paziņojumi un skaņas

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `notificationsEnabled` | Būla | `true` | Rādīt rezultātu paziņojumus. |
| `doNotDisturb` , `quietFullscreen` | Būla | `false` , `true` | Izslēdziet paziņojumus un skaņas vai tikai pilnekrāna režīmā. |
| `notificationScale` | 0,8–1,4 | `1` | Paziņojuma lielums. |
| `notificationDuration` | 1500–12000 ms, 500. solis | `3500` | Cik ilgi tiek saglabāts paziņojums. |
| `notificationOpacity` | 0,35–1 | `0.95` | Paziņojumu caurspīdīgums. |
| `notificationShowIcon` | Būla | `true` | Parādiet statusa ikonu. |
| `notificationPosition` | `{x, y}` vai `null` | `null` | Pārvilkta pozīcija. |
| `notificationHistoryEnabled` , `notificationHistory` | Būla vērtība; līdz 30 ierakstiem | `true` ; `[]` | Paziņojumu vēsture. |
| `soundEffectsEnabled` , `soundVolume` | Būla vērtība; 0–1 | `false` ; `0.35` | Galvenais slēdzis un skaļums. |
| `soundEvents` , `soundEventVolumes` | katram pasākumam: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | viss ieslēgts; `0.35` | Notikuma slēdzis un skaļums. |

### Izskats, kustība un īsceļi

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Krāsu tēma. |
| `panelStyle` | `kick` , `minimal` | `kick` | Paneļa vizuālais stils. |
| `accentColor` | `#rrggbb` | `#53fc18` | Akcenta krāsa. |
| `compactMode` , `highContrast` | Būla | `false` | Blīvums un kontrasts. |
| `backdropBlur` | 0–12 pikseļi | `6` | Fona izplūdums aiz paneļa (darbojas abos stilos). |
| `textScale` | 0,9–1,3 | `1` | Teksta lielums. |
| `language` , `languageChosen` | lokalizācijas kods; Būla | pārlūkprogrammas valoda; `false` | Saskarne seko pārlūkprogrammas valodai, līdz tiek izvēlēta valoda, pēc tam izvēle tiek atcerēta. |
| `panelPosition` | `{x, y}` vai `null` | `null` | Velkama paneļa pozīcija. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animācijas ātrums. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Paneļa atvēršanas/aizvēršanas efekts. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Kursora novietošanas efekts. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logotipa/indikatora animācija. |
| `iconAnimations` | Būla | `true` | Animējiet sānjoslas, atiestatiet un palīdzības ikonas. |
| `hotkey` | kombinētā virkne | `F2` | Atver vai aizver paneli. |
| `actionHotkeys` | kombinētās stīgas | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Pārslēgt paziņojumus, fokusa skatu, atiestatīt kvalitāti, atjaunot skaļumu, pārslēgt tērzēšanu, pārslēgt kreiso izvēlni. |

Taustiņu kombinācijas tiek saglabātas kā virknes, piemēram, `Alt+Q` un tiek saskaņotas ar fizisko taustiņu, tāpēc tās darbojas jebkurā tastatūras izkārtojumā. Iestatījumi no vecākām versijām ar objekta formas karsto taustiņu tiek konvertēti automātiski. Paneļa platums ir fiksēts 680 pikseļi (ierobežots ar loga izmēru); iepriekšējais platuma iestatījums tiek ignorēts.

### Rīki

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `autoRecoverStall` | Būla | `false` | Mēģiniet `play()` , kad tiek konstatēta sasalšana. |
| `freezeAlertEnabled` , `freezeSound` | Būla | `true` | Iesaldēt paziņojumu un modinātāja skaņu. |
| `freezeSeconds` | 5–60, 5. darbība | `10` | Sekundes bez progresa pirms modinātāja. |
| `layoutHideChat` , `layoutCollapseSidebar` | Būla | `false` | Atcerēts izkārtojums, lietots vienu reizi lapā. |
| `autoClaimRewards` | Būla | `false` | Iespējot automātisku atlīdzības pieprasīšanu. |
| `claimMode` | `notify` , `interval` | `notify` | Pieprasiet, kad Kick parāda savu paziņojumu vai saskaņā ar grafiku. |
| `claimDelaySec` | 0–120, 5. darbība | `5` | Pagaidiet, kad parādās paziņojums (paziņojuma režīms). |
| `claimIntervalMin` | 5–120, 5. darbība | `10` | Minūtes starp pārbaudēm (plānotais režīms). |

### Ātrās pretenzijas poga

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `claimWidget` | Būla | `false` | Parādiet peldošo pogu. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Pogu dizains. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Iebūvēta ikona vai paša lietotāja attēls. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , līdz 90 000 rakstzīmēm | tukšs | Augšupielādētā attēla atkārtoti kodēta kopija. Viss pārējais tiek noraidīts. |
| `claimWidgetImageFill` | Būla | `false` | Ļaujiet pielāgotam attēlam aizpildīt visu pogu (tas netiek izmantots tabletes dizainā). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Pogas izmērs. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Pogas necaurredzamība (pilna necaurredzamība, kamēr ir pieejama atlīdzība). |
| `claimWidgetAutoHide` | Būla | `false` | Rādīt pogu tikai tad, kad ir pieejama atlīdzība. |
| `claimWidgetPos` | `{x, y}` vai `null` | `null` | Pārvilkta pozīcija. |

### Diagnostika un stāvoklis

| Atslēga | Tips / diapazons | Noklusējums | Nozīme |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | Būla vērtība; līdz 60 ierakstiem | `true` ; `[]` | Darbību žurnāls. |
| `activeSection` | sadaļas id | `playback` | Pēdējā atvērtā lapa. |
| `resetBackup` | iestatījumu objekts | `null` | Momentuzņēmums, kas uzņemts pirms atiestatīšanas vai importēšanas. |

<a id="core-utilities"></a>
## Galvenās utilītas

| Funkcija | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `detectLanguage` | — → lokalizācija | Izstaigā `navigator.languages` ​​, kartē reģionālos variantus ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) un atgriež pirmo atbalstīto lokalizāciju vai `en` . |
| `dictFor` | lang → vārdnīca | Atgriež lokalizācijas tulkošanas tabulu, izmantojot tās pamatvalodu un pēc tam angļu valodu. |
| `t` / `T` | lang, taustiņš, vars → virkne | Atrisina atslēgu ar `{placeholder}` aizstāšanu; `T` izmanto pašreizējo valodu. |
| `diagText` | indekss, kvalitāte → virkne | Atgriež vienu no lokalizētajiem diagnostikas teikumiem. |
| `log` | …args → spēkā neesošs | Konsoles reģistrēšana ar skripta prefiksu. |
| `clamp` , `sleep` , `esc` | vērtība → vērtība | Diapazona ierobežošana, uz solījumu balstīta aizkave un HTML aizbēgšana. |
| `normalizeQuality` | teksts → virkne | Samazina kvalitātes marķējumu un noņem atstarpes. |
| `debounce` | fn, gaidiet → funkcija | Trailing atlēciens ar `flush` metodi. |
| `onLocationChange` | atzvanīšana → anulēt | Atklāj vienas lapas navigāciju, iesaiņojot `pushState` / `replaceState` , klausoties `popstate` un aptaujājot vienu reizi sekundē. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | notikums → virkne/būla | Veidojiet un salīdziniet taustiņu kombinācijas no fiziskās atslēgas koda. |
| `mkPointer` | veids, ekstra → pasākums | Izveido `PointerEvent` (vai `MouseEvent` ja tas nav pieejams), ko izmanto Kick's ARIA izvēlņu vadīšanai. |
| `waitFor` | zonde, taimauts, solis → vērtība/nulle | Aptaujas, līdz zonde atgriež vērtību vai beidzas taimauts. |
| `imageToDataUrl` | attēls → virkne | Mērogo attēlu kvadrātveida audeklā (saglabājot proporcijas, `willReadFrequently` ), izmēģina 128, 96 un 64 pikseļus un atgriež PNG datu URL, kas nav lielāks par 70 000 rakstzīmēm. |

<a id="settings-storage"></a>
## Iestatījumu krātuve

| Funkcija | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `sanitizeProfiles` | objekts → objekts | Saglabā ne vairāk kā 200 profilus ar derīgām atslēgām un skavām katrā laukā; iemiesojumam ir jābūt Kick attēla URL. |
| `sanitizeSettings` | objekts, withBackup → objekts | Pārbauda katru iestatījumu (tipi, diapazoni, atļautās vērtības), migrē 1.1–1.3 iestatījumus (mantotā kvalitāte, karstais taustiņš, animācijas un sadaļu atslēgas) un piemēro valodas kārtulu. |
| `legacyHotkey` | vērtība → virkne | Pārvērš objekta formas karsto taustiņu kombinētajā virknē. |
| `Store.load` / `Store.save` | — / iestatījumi → iestatījumi/neesošs | Izlasiet un ierakstiet sanitizēto objektu `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | ielāps, `{undo}` → anulēt | Sapludina ielāpu, veic dezinfekciju, saglabā ar īsu atlēcienu un pēc izvēles nospiež atsaukšanas momentuzņēmumu (tiek saglabāts tikai atmiņā, līdz 15). |
| `storage` klausītājs | notikums → spēkā neesošs | Atkārtoti ielādē iestatījumus, kad cita Kick cilne tos maina, tāpēc cilnes nekad nepārraksta viena otru. |

<a id="player-synchronization-playersync"></a>
## Spēlētāja sinhronizācija ( `PlayerSync` )

### Kanālu un profilu palīgi

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `isVod` | — → Būla | Atklāj VOD lapu no URL. |
| `channelKey` | — → virkne | Izveido stabilu `channel:slug` taustiņu (vai `vod:id` , `kick:home` ), saglabājot rezultātu kešatmiņā trīs sekundes. VOD lapās tiek izmantota atskaņotājam tuvākā kanāla saite. |
| `channelSlug` | — → virkne | Atgriež kanāla atslēgas sliedes daļu. |
| `profile` | taustiņš → objekts/nulle | Nolasa saglabāto profilu. |
| `profileActive` | — → objekts/nulle | Atgriež pašreizējo profilu tikai tad, ja tas ir iespējots un nav izslēgts. |
| `isExcluded` | — → Būla | Pārbauda, ​​vai šim kanālam ir atspējota automatizācija. |
| `updateProfile` | ielāps, atslēga → spēkā neesošs | Izveido vai apvieno profilu un apzīmogo `updatedAt` . |
| `saveCurrentChannel` | — → objekts/nulle | Saglabā skatītāja pašreizējo kvalitāti, skaļumu, skaņu, ātrumu un klusuma režīmu kā iespējotu profilu un skenē lapu, lai atrastu kanāla iemiesojumu. |
| `effective` | — → objekts | Atrisina skaļumu, klusumu, klusumu, ātrumu un tiešraides/VOD kvalitāti no aktīvā profila vai globālajiem iestatījumiem. |
| `setStatus` | statuss, rezultāts → spēkā neesošs | Atjaunina statusa un pēdējā rezultāta kodus, kas parādīti galvenē un diagnostikā. |

### Kick spēlētāja atrašana un vadīšana

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `findMainVideo` | — → video/nulle | Izvēlas lielāko redzamo `<video>` . |
| `streamKey` | — → virkne | Vienreiz vienā straumē atgriež lapas ceļu, kas izmantots kvalitātes piemērošanai. |
| `isAccountButton` | poga → Būla | Noraida galvenes, iemiesojumu un konta pogas. |
| `findSettingsButton` | video → poga/nulle | Atrod atskaņotāja zobrata pogu pēc etiķetes vai tuvuma videoklipa apakšējā labajā stūrī. |
| `revealControls` | video → nederīgs | Nosūtījumi virza kursoru uz notikumiem, lai tiktu parādītas slēptās vadīklas. |
| `simulateClick` | elements → tukšums | Nosūta pilnu rādītāja notikumu secību, kas nepieciešama Kick izvēlnēm. |
| `menuItems` | — → elements[] | Uzskaita redzamos `menuitemradio` ierakstus. |
| `openQualityMenu` | — → poga/nulle | Atver zobrata izvēlni, pāriet uz kvalitātes ierakstu, kad tiek parādīta augstākā līmeņa izvēlne, un gaida opcijas. |
| `closeMenu` | poga → Apsolīt | Aizver izvēlni tikai tad, ja tā joprojām ir atvērta (akls otrs klikšķis var to atkārtoti atvērt), izmantojot atkāpšanās funkciju. |
| `readMenu` | — → elements[] | Reģistrē piedāvātās un pārbaudītās īpašības. |
| `scanQualities` | — → Sola<boolean> | Atver izvēlni, ieraksta pieejamās kvalitātes un aizver to (izmanto diagnostika). |
| `activate` | vienums → Solījums | Noklikšķina uz vienas opcijas un gaida, līdz tā tiek atzīmēta. |
| `selectQuality` | vēlamais, atkāpšanās → Apsolīt | Atlasa pieprasīto kvalitāti, pretējā gadījumā nākamo zemāko vai Auto. |
| `desiredQuality` | — → virkne | Izvēlas piemēroto kvalitāti no profila, preferences vai pēdējās manuālās izvēles. |
| `applyQualityOnce` | streamKey → Apsolījums | Vienreiz straumē piemēro vēlamo kvalitāti, aizver izvēlni un paziņo par panākumiem vai neveiksmēm. |
| `watchManualQuality` | — → spēkā neesošs | Apgūst jaunu pēdējo lietoto kvalitāti tikai no īstiem (uzticamiem) klikšķiem, tāpēc automātiskie klikšķi un atkāpšanās nekad nepārraksta saglabātās vērtības. |

### Skaļums, klusais režīms, ātrums un uzraudzība

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `applyVolume` | video, kluss → tukšs | Ieraksta spēkā esošo skaļumu un izslēgšanas stāvokli (atzīmēts kā paša skripta izmaiņas). |
| `trackInput` | — → spēkā neesošs | Ieraksta pēdējās uzticamās rādītāja, riteņa, pieskāriena vai tastatūras ievades laiku. |
| `reassertVolume` | video → nederīgs | Atgriež saglabāto skaļumu, kad lapa to mainīja bez lietotāja ievades (biežums ir ierobežots līdz astoņām atgriešanās reizēm desmit sekundēs). |
| `watchVolume` | video → nederīgs | Uzklausa `volumechange` : tiek saglabātas lietotāja veiktās izmaiņas, bet ar lapām saistītās tiek atsauktas. |
| `checkLoud` | skaļums, izslēgts → tukšs | Vienreiz brīdina, kad skaļums pārsniedz slieksni. |
| `buildGraph` | video → grafiks/nulle | Ievada video `AudioContext` caur pastiprinājuma mezglu; ziņo, ja vietne to neļauj. |
| `applySilent` | video → nederīgs | Iestata pastiprinājumu uz 0 klusai atskaņošanai vai atpakaļ uz 1, vajadzības gadījumā atsākot kontekstu. |
| `applyRate` | video, piespiest → anulēt | Iestata saglabāto ātrumu; `1` nav piespiedu kārtā, ja vien skatītājs to vienkārši nav izvēlējies, tāpēc paša Kick tiešraides panākšana tiek ievērota. |
| `applyMedia` | video, `{rate}` → anulēts | Atkārtoti lieto skaļumu, klusuma režīmu un pēc izvēles ātrumu, neskarot kvalitāti. |
| `monitorFreeze` | video → nederīgs | Atklāj apstājies atskaņotāju (iestrēdzis laiks) vai melnu ekrānu (laiks kustībā bez dekodētiem kadriem) un iedarbina trauksmi un papildu atkopšanu. Darbojas slēptās cilnēs. |

### Cilpa un dzīves cikls

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `sync` | — → Apsolījums | Galvenā cilpa: monitori sasalst, saista klausītājus, piemēro klusuma režīmu, skaļumu, ātrumu un kvalitāti, ievēro drošo režīmu un izņēmumus, pēc tam izsauc `Extras.tick` . |
| `resync` | — → Apsolījums | Piespiež jaunu caurlaidi (izmanto iepriekš iestatītie iestatījumi, ātras darbības un kvalitātes izmaiņas). |
| `init` | — → spēkā neesošs | Sāk pirmo sinhronizāciju, navigācijas klausītāju un 1,5 sekunžu intervālu. |

<a id="page-extras-extras"></a>
## Lapas ekstras ( `Extras` )

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `root` , `layoutState` | — → elements / `{chat, sidebar}` | Lasiet Kick izkārtojuma stāvokli no `data-chat` un `data-sidebar` lapas konteinerā. |
| `isDesktop` | — → Būla | Izkārtojuma automatizācija darbojas tikai darbvirsmas platumā. |
| `click` | elements → Būla | Klikšķi, izmantojot `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → poga/nulle | Tērzēšanas istabā atrodiet sakukšanas pogu un pogu “Rādīt tērzēšanu” (pēc ikonas, nevis pēc valodas). |
| `setChat` , `setSidebar` | parādīt → Būla | Pārvietojiet tērzēšanu vai kreiso izvēlni pieprasītajā stāvoklī, nospiežot paša Kick pogas. |
| `applyLayout` | — → spēkā neesošs | Atcerēto izkārtojumu lieto vienu reizi lapā, nekad necīnās ar manuālām izmaiņām. |
| `isTyping` | — → Būla | Patiess, kamēr skatītājs raksta laukā; automātiskās pretenzijas gaida. |
| `rewardTrigger` , `popoverCard` | — → poga/nulle | Atrodiet dāvanu pogu un atlīdzības uznirstošo karti. |
| `rewardAvailable` | — → Būla | Atklāj paša Kick signālu “pieejama atlīdzība” (animēts aicinājums uz darbību). |
| `isEnabled` | poga → Būla | Redzams un nav atspējots. |
| `claimDrops` | — → Sola<number> | Nospiež iespējotās pretenziju pogas, lai atlīdzības panelī saņemtu pabeigtus kritumus. |
| `claimDaily` | sprūda → Apsolīt<number> | Atver atlīdzības logu, vienu reizi nospiež katru iespējoto pretenzijas pogu (nekad to pašu pogu divreiz), pēc tam aizver logu. |
| `claimRewards` | `{manual}` → Apsolījums<number> | Izpilda pilnu pretenziju, ziņo par rezultātu un atskaņo skaņu; manuālās darbības ignorē rakstīšanu un ziņo, ja nav par ko pieprasīt. |
| `normName` | teksts → virkne | Normalizē nosaukumus saskaņošanai ( `_` un atstarpes pret `-` ). |
| `findAvatar` | gliemeža → stīga | Atgriež lapā redzamo kanāla iemiesojumu (izmanto pirms kanāla saglabāšanas). |
| `scanAvatars` | — → spēkā neesošs | Saglabā iemiesojumus saglabātajiem kanāliem, kuriem tāda nav. |
| `tick` | streamKey → spēkā neesošs | Plānotājs tiek izsaukts no `sync` : izmanto izkārtojumu, skenē iemiesojumus, gaida atlīdzības paziņojumu (paziņojuma režīms ar aizkavi un divu minūšu atdzišanu) vai pārbauda izvēlēto intervālu un aptauj kritienu paneli. |

<a id="interface-building-blocks"></a>
## Interfeisa veidošanas bloki

| Funkcija | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `I` | nosaukums → svg | Iekļauts insulta ikona. |
| `fmtValue` | formāts, neapstrādāts → virkne | Formatē slīdņa vērtības (procenti, pikseļi, sekundes). |
| `normSearch` , `englishOf` , `searchText` | teksts → virkne | Uzsvaru nejutīgs meklēšanas teksts, tostarp tulkotas etiķetes nosaukums angļu valodā. |
| `row` | taustiņš, etiķete, vadīkla, opcijas → html | Iestatīšanas rinda; sakrauts pēc noklusējuma, iekļauts tikai slēdžiem, ar izvēles palīdzības pārslēgšanu. |
| `sw` , `toggleRow` | … → html | Slēdžu vadība un gatava slēdžu rinda. |
| `chip` , `seg` , `qualityChips` | … → html | Mikroshēmas, segmentētas vadības ierīces un kvalitātes režģis. |
| `range` | attr, atslēga, opcijas → html | Slīdnis ar aizpildīšanas celiņu un reāllaika vērtību. |
| `card` , `btn` , `ib` | … → html | Karte, teksta poga un ikonas poga. |
| `timeStr` | laikspiedols → virkne | Lokalizēts pulksteņa laiks. |
| `setPref` | atslēga, vērtība → spēkā neesošs | Ieraksta atskaņotāja preferences aktīvajā kanāla profilā vai globālajos iestatījumos. |
| `fxBtn` | atslēga, vērtība, etiķete, uz → html | Efektu atlasītāja flīze ar nelielu priekšskatījuma glifu. |
| `avatarHtml` | nosaukums, url → html | Iemiesojums ar atkāpšanās burtu; tiek noņemts neveiksmīgs attēls. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → vērtība | Izveidojiet ātrās pretenzijas pogas marķējumu gan tiešraides pogai, gan iestatījumu priekšskatījumam. |

<a id="settings-pages-pages"></a>
## Iestatījumu lapas ( `PAGES` )

| Lapa | Saturs |
|---|---|
| `playback` | Saglabājiet šo kanālu padomu, sākotnējie iestatījumi, kvalitāte (automātiska lietošana, tiešraide, VOD, atkāpšanās), skaļums (automātiskā lietošana, slīdnis, skaņas izslēgšana, klusa atskaņošana, skaļš brīdinājums) un ātrums. |
| `channels` | Darbības darbības, pašreizējais kanāls ar pogu **Saglabāt šo kanālu** , pauzēt/izslēgt slēdžus un redaktoru, pēc tam saglabāto kanālu saraksts (meklēšana, kārtošana, piespraudes filtrs, grupas, Rediģēt/Gatavs, Dzēst) ar dublēšanu un atjaunošanu. |
| `tools` | Miega taimeris, lapas izkārtojums, balvas (automātiskā pretenzija, režīms, aizkave vai intervāls, Pieprasīt tūlīt), ātrās pretenzijas pogas iestatījumi ar tiešo priekšskatījumu, iesaldēšanas trauksme un ātras darbības. |
| `notifications` | Slēdži, izmērs, ilgums, necaurredzamība, priekšskatījums, pozīcijas atiestatīšana un vēsture. |
| `sounds` | Galvenais slēdzis un skaļums, katra notikuma slēdži, skaļumi un priekšskatījumi. |
| `appearance` | Motīvs, stils, akcentu krāsas, blīvums, kontrasts, teksta lielums, izplūšana, centrēšana un valoda. |
| `motion` | Tiešraides priekšskatījums, sākotnējie iestatījumi un atlasītāji atvērtajam efektam, kursora novietošanas efektam, indikatoram, ātrumam un ikonu animācijām. |
| `shortcuts` | Izvēlnes karstie taustiņi un darbību karstie taustiņi ar pārsiešanu. |
| `diagnostics` | Statuss, skenēšana, atskaite, kvalitātes un konfliktu pārbaudes, drošais režīms un darbību žurnāls. |
| `about` | Versija, saites, eksportēšana/importēšana, atsaukšana, atjaunošana un atiestatīšana. |

<a id="panel-controller-gui"></a>
## Paneļa kontrolleris ( `GUI` )

### Būvniecība un renderēšana

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `build` | — → spēkā neesošs | Izveido Shadow-DOM saimniekdatoru, paneli, tostu un tiešraides reģionu, pēc tam pievieno notikumus. |
| `applyLook` | — → spēkā neesošs | Lieto motīvu, stilu, akcentu, izplūšanu, teksta mērogu, efektus, valodas atribūtus un grauzdiņu iestatījumus kā atribūtus un CSS mainīgos. |
| `renderChrome` | — → spēkā neesošs | Atveido virsrakstu, meklēšanas vietturi, pauzes pogu, kājenes mājienu un ātrās pretenzijas pogu. |
| `renderNav` | — → spēkā neesošs | Atveido grupēto sānjoslu. |
| `renderPage` | opcijas → anulēt | Atveido aktīvo lapu (vai visas lapas meklēšanas laikā), saglabājot ritināšanas un tastatūras fokusu. |
| `filterRows` | — → spēkā neesošs | Lietojiet meklēšanas filtru rindām, kartītēm un lapām. |
| `channelEditor` | atslēga, profils → html | Viena kanāla profila redaktors. |
| `refreshAll` , `onExternalChange` | — → spēkā neesošs | Atkārtoti renderējiet visu pēc atiestatīšanas, importēšanas, atsaukšanas vai izmaiņu veikšanas no citas cilnes. |

### Notikumu un iestatījumu izmaiņas

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `wire` | — → spēkā neesošs | Pievieno deleģētos klikšķu, ievades, izmaiņu, riteņu un ritināšanas apdarinātājus un paneļa vilkšanu. |
| `onClick` , `onInput` , `onChange` | notikums → spēkā neesošs | Nosūtiet iestatījumus, profilus vai darbības klikšķus, slīdņa kustības un teksta labojumus. |
| `applyRange` | atslēga, vērtība → spēkā neesošs | Tiek lietota slīdņa vērtība (skaļums, izplūšana, necaurredzamība, ilgums utt.). |
| `setSetting` , `setChannel` | atslēga/plāksteris → spēkā neesošs | Saglabājiet iestatījumu vai profila maiņu un piespiediet ietekmēto daļu atskaņotājam. |
| `pushToPlayer` | tvērums, atslēga → spēkā neesošs | `media` atkārtoti piemēro skaļumu, klusuma režīmu un ātrumu; `all` arī atkārtoti piemēro kvalitāti. Skaļums, izslēgšana, klusais režīms un ātrums nekad neatver kvalitātes izvēlni. |
| `act` ​​| nosaukums, elements → Apsolījums | Izpilda nosauktas darbības: sākotnējie iestatījumi, kanālu saglabāšana un noņemšana, dublēšana, importēšana/eksportēšana, pretenzijas, miega taimeris, īsceļi, diagnostika un daudz kas cits. |
| `resetSection` | id → spēkā neesošs | Atjauno vienas sadaļas noklusējuma iestatījumus. |
| `restoreVolume` | — → spēkā neesošs | Atkārtoti lieto saglabāto skaļumu. |
| `toggleLayout` | kas → spēkā neesošs | Paslēpj vai parāda tērzēšanu vai kreiso izvēlni un atceras izvēli. |
| `confirm` , `closeModal` | ziņojums, opcijas / rezultāts → Apsolījums/anulēt | Paneļa apstiprinājuma dialoglodziņš (identisks katrā pārlūkprogrammā). |
| `download` , `pickFile` , `pickImage` | … → spēkā neesošs | Saglabājiet JSON, izlasiet JSON un izvēlieties attēlu ātrās pretenzijas pogai. |
| `startCapture` , `finishCapture` | id / kombinācija → spēkā neesošs | Atkārtoti sasiet karsto taustiņu, noraidot dublikātus. |
| `replayMock` | — → spēkā neesošs | Atkārtoti atskaņo atvērto efektu animācijas priekšskatījumā. |

### Rīki un diagnostika

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minūtes / — → spēkā neesošs | Sāciet, atceliet un parādiet miega taimeri (beigās tas aptur video). |
| `toggleFocusView` | — → Apsolījums | Atskaņotāja konteinerā tiek atvērts pilnekrāna režīms vai iziet no tā. |
| `statusText` , `resultText` , `syncDiagnostics` | — → virkne/tukšums | Lokalizēts galvenes un diagnostikas lapas statuss. |
| `record` | ziņojums, līmenis → spēkā neesošs | Darbību žurnālam pievieno ierakstu ar laikspiedolu. |
| `copyDiagnostics` | — → Apsolījums | Kopē īsu pārskatu (versija, statuss, īpašības, lapas veids, lietotāja aģents). |
| `checkQuality` , `checkConflicts` | — → Apsolīt/anulēt | Pārbaudiet, vai tiek piedāvāta vēlamā kvalitāte, un uzskaitiet iestatījumus, kas darbojas viens pret otru. |

### Ātrās pretenzijas poga

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `renderClaimWidget` | — → spēkā neesošs | Izveido, atjaunina vai noņem peldošo pogu un sāk tās vienas sekundes stāvokļa aptauju. |
| `syncClaimWidget` | — → spēkā neesošs | Parāda gredzenu un punktu “pieejama atlīdzība”, aizņemtības stāvokli un automātiskās slēpšanas kārtulu. |
| `placeClaimWidget` | — → spēkā neesošs | Novietojiet pogu, piestiprinot to pie loga. |
| `wireClaimWidget` | elements → tukšums | Velciet ar piecu pikseļu slieksni (vilkšana nekad netiek uzskatīta par klikšķi), pozīcijas saglabāšana un klikšķis, kas veic manuālu pretenziju. |

### Paziņojumi, skaņa un paneļa darbība

| Metode | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `notify` | ziņojums, veids, ilgums, spēks → spēkā neesošs | Parāda tostu (ja vien tas nav apspiests), ieraksta vēsturi un paziņo tekstu tiešraidē. |
| `notifyQuality` | piemērots, kvalitāte → spēkā neesošs | Atskaņo rezultātu skaņu, reģistrē un parāda lokalizētu paziņojumu. |
| `initToastPosition` , `wireToastDrag` | — → spēkā neesošs | Atjaunojiet un saglabājiet vilktā grauzdiņa pozīciju. |
| `onAvatars` | — → spēkā neesošs | Atsvaidzina lapas, kurās tiek rādīti iemiesojumi. |
| `ensureAudio` | — → konteksts | Izveido un atsāk koplietoto `AudioContext` (atbloķēts ar pirmo lietotāja žestu). |
| `playSound` , `stopSounds` | nosaukums, priekšskatījums → spēkā neesošs | Ģenerējiet un apturiet Web audio signālus. |
| `playFreezeAlarm` , `alertFrozen` | spēks → spēkā neesošs | Atskaņojiet piecu nošu signālu un paceliet iesaldēšanas paziņojumu. |
| `placePanel` , `wirePanelDrag` | pozīcija → spēkā neesošs | Novietojiet paneli loga iekšpusē un padariet galveni velkamu. |
| `open` , `close` , `toggle` | — → spēkā neesošs | Kontrolējiet paneļa, aptauju, fokusa un izvēlnes skaņas. |
| `syncVolumeControls` | — → spēkā neesošs | Saglabā skaļuma slīdni sinhronizācijā ar atskaņotāju, kamēr panelis ir atvērts. |

<a id="hotkeys-and-startup"></a>
## Karstie taustiņi un palaišana

| Funkcija | Parametri / atdeve | Ko un kā tas dara |
|---|---|---|
| `isolateKeys` | — → spēkā neesošs | Reģistrēts `document-start` tveršanas fāzē: tastatūras notikumi, kas nāk no paneļa iekšpuses, pārstāj izplatīties uz Kick (tādēļ Space, F, M un bultiņas nekad neizraisa atskaņotāja karstos taustiņus), un Tab tiek iesprostoti dialoglodziņā. |
| `setupHotkeys` | — → spēkā neesošs | Rokturi taustiņu uztveršanu atkārtotai saistīšanai, Escape (modāls, nolaižams, panelis), izvēlnes karsto taustiņu un darbības karstie taustiņi; kombinācijas ar modifikatoru vai taustiņu F darbojas pat rakstīšanas laikā. |
| `init` | — → spēkā neesošs | Izveido paneli, instalē karstos taustiņus un startē `PlayerSync` ; aizsargāts pret dubultu injekciju. |

<a id="kick-page-dependencies"></a>
## Atbrīvojieties no lapu atkarības

Skripts balstās uz Kick pašreizējo marķējumu. Kur vien iespējams, tas izmanto ikonas, atribūtus un struktūru, nevis redzamu tekstu, tāpēc tas turpina darboties visās saskarnes valodās. Ja Kick tos maina, atbilstības funkcija pārstāj darboties (pārējais turpina darboties).

| Funkcija | Ko tas meklē |
|---|---|
| Kvalitāte | Redzams `<video>` , atskaņotāja `button[aria-haspopup="menu"]` un `[role="menuitemradio"]` ieraksti. |
| Izkārtojums | Konteiners ar `data-sidebar` un `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , ikonas `CollapseRight` poga iekšpusē `#channel-chatroom` un ikonas `MessagesOutline` poga tērzēšanas rādīšanai. |
| Paziņojums par atlīdzību | `video` , kura avotā ir ietverts `reward-available` , vai `[role="group"]` kartīte, kurā ir iekļauts `daily-rewards` videoklips. |
| Atlīdzības pieprasīšana | `button[aria-haspopup="dialog"][aria-controls]` (dāvanas ikona), dialoglodziņš, ko tā kontrolē ( `data-state` ), iespējotas pretenziju pogas ar `.contents` pakārtotu un aizvēršanas poga ar `.sr-only` iezīmi. |
| Pilieni | `#rewards-panel` saraksta vienumi ar `[role="progressbar"][data-state="complete"]` un iespējotu pogu. |
| Avatars | `img[alt]` elementi, kuru avots ir `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizācija

Katrs apzīmējums, palīdzības ziņojums, kļūda, dialoglodziņš un paziņojums tiek cauri tulkošanas risinātājam 38 lokalizācijām. Trūkstošie taustiņi tiek atgriezti angļu valodā. Jaunais interfeisa teksts tiek tulkots visās atbalstītajās valodās kopā ar funkciju, kas to pievieno. Valodas atlasītājs parāda karogus un vietējos nosaukumus; saskarne pirmajā palaišanas reizē seko pārlūkprogrammas valodai un pēc tam atceras skaidru izvēli.

<a id="safety-privacy-and-compatibility"></a>
## Drošība, privātums un saderība

- Iestatījumi tiek dezinficēti pirms uzglabāšanas; nederīgās vērtības atgriežas uz drošām noklusējuma vērtībām.
- Kanālu nosaukumi, piezīmes, paziņojumu teksts un diagnostikas izvade tiek izvadīti pirms HTML ievietošanas.
- Pielāgota pogas ikona tiek atkārtoti kodēta no audekla un saglabāta tikai kā atļautā attēla veida datu URL; tas nekad neatstāj pārlūkprogrammu.
- Shadow DOM saglabā skripta stilus izolēti no Kick; tastatūras notikumi no paneļa ir izolēti no Kick karstajiem taustiņiem.
- Automātiskās darbības izlaiž izslēgtos kanālus, drošo režīmu un trūkstošos atskaņotāja elementus. Atlīdzības pieprasīšana nekad nenospiež vienu un to pašu pogu divreiz vienā piegājienā un gaida, kamēr skatītājs raksta.
- Skripts neveic tīkla pieprasījumus; atjauninājumi nāk no lietotāja skriptu pārvaldnieka vai lapas Izlaidumi.
- Pārejot no 1.1.0, 1.2.0 un 1.3.0, esošie vietējie iestatījumi tiek saglabāti.
