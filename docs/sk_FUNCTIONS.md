<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · **Slovenčina** · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweak — Referenčná funkcia

Referencie pre Kick Stream Tweak 1.3.1. Popisuje, čo robí každá funkčná oblasť, ako sú uložené nastavenia, na ktorých častiach Kickovej stránky závisí skript a ako funguje každá pomenovaná funkcia alebo metóda v užívateľskom skripte. Pozrite si [archív](https://github.com/ebayybe/kick-stream-tweaks) a protokol [zmien](../CHANGELOG/en_CHANGELOG.md) .

> Mená zodpovedajú zdroju. `void` znamená, že funkcia pôsobí prostredníctvom vedľajších účinkov. Metóda napísaná ako `Object.method` žije na tomto objekte ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Obsah

1. [Architektúra](#architecture)
2. [Správanie sa používateľovi](#user-facing-behavior)
3. [Odkaz na nastavenia](#settings-reference)
4. [Základné služby](#core-utilities)
5. [Ukladanie nastavení](#settings-storage)
6. [Synchronizácia prehrávača ( `PlayerSync` )](#player-synchronization-playersync)
7. [Doplnky stránky ( `Extras` )](#page-extras-extras)
8. [Stavebné bloky rozhrania](#interface-building-blocks)
9. [Stránky nastavení ( `PAGES` )](#settings-pages-pages)
10. [Ovládač panela ( `GUI` )](#panel-controller-gui)
11. [Klávesové skratky a spustenie](#hotkeys-and-startup)
12. [Vykopnite závislosti na stránke](#kick-page-dependencies)
13. [Lokalizácia](#localization)
14. [Bezpečnosť, súkromie a kompatibilita](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architektúra

Používateľský skript je samostatný súbor, ktorý sa spúšťa na `document-start` s `@grant none` . Nemá žiadny krok zostavenia a nevytvára žiadne vlastné sieťové požiadavky.

| Vrstva | Objekt / plocha | Zodpovednosť |
|---|---|---|
| Údaje | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Preklady do 38 jazykov, lokalizované diagnostické správy, vlajky SVG a názvy jazykov. |
| Konfigurácia | `CONFIG` , `DEFAULTS` | Konštanty (selektory, limity opakovania, predvoľby, sekcie) a predvolené nastavenia. |
| Skladovanie | `sanitizeSettings` , `Store` , `persist` | Overí a uloží nastavenia v `localStorage` ; uchováva zásobník vrátenia v pamäti. |
| Logika hráča | `PlayerSync` | Nájde video, obnoví kvalitu, hlasitosť, rýchlosť a tichý režim, sleduje, či nezamrzne. |
| Pomocníci stránky | `Extras` | Tlačidlá rozloženia, nárokovanie si odmien, avatary kanálov a plánovač na pozadí. |
| Rozhranie | `PAGES` , `GUI` , pomocníci | Panel Shadow-DOM, upozornenia, zvuky, plávajúce tlačidlo rýchleho nároku, klávesové skratky. |

Dátový tok: 1,5-sekundová slučka `PlayerSync.sync` načíta efektívne nastavenia (najskôr profil kanála, potom globálne), aplikuje ich na prehrávač a vyvolá `Extras.tick` . Akcie používateľa prechádzajú cez obslužné programy `GUI` , ktoré aktualizujú nastavenia s `persist` a tlačia do prehrávača iba dotknutú časť ( `media` alebo `all` ).

<a id="user-facing-behavior"></a>
## Správanie sa používateľom

| Oblasť | Správanie |
|---|---|
| Vytrvalosť hráča | Uloží kvalitu živého vysielania/VOD, hlasitosť, stav stlmenia, tichý režim a rýchlosť a potom ich použije pri zistení nového streamu. Zmeny, ktoré stránka urobí sama (napríklad Kick resetuje hlasitosť na 50%), sa vrátia späť; uložené hodnoty aktualizujú iba vlastné akcie diváka. |
| Kvalita | Vyberie preferovanú kvalitu prostredníctvom ponuky prehrávača, vráti sa späť na najbližšiu nižšiu kvalitu (alebo Auto), keď nie je k dispozícii, a znova zatvorí ponuku. Iba skutočné kliknutia používateľov učia skriptu novú kvalitu „naposledy použité“. |
| Hlasitosť a tiché prehrávanie | Hlasitosť a stlmenie sa obnovia pri každom streame. Tiché prehrávanie smeruje video cez nástroj Web Audio s nulovým ziskom, takže stream sa naďalej prehráva na karte na pozadí bez stlmenia. |
| Profily kanálov | **Uložiť tento kanál** uloží aktuálnu kvalitu, hlasitosť, rýchlosť a zvuk pre sledovaný kanál. Profily tiež obsahujú poznámky, skupiny, stav špendlíka, avatar a povolené/vylúčené príznaky. |
| Predvoľby | Šetrite šírku pásma, najlepšiu kvalitu, tiché sledovanie a VOD jediným kliknutím. |
| Panel | `F2` alebo vlastná klávesová skratka otvorí panel s pevnou šírkou (680 px) so zoskupeným bočným panelom, vyhľadávaním, štýlmi Kick a Minimal, svetlými/tmavými motívmi, 14 akcentujúcimi farbami plus výberom farieb, kompaktným rozložením, rozostrením pozadia, mierkou textu, vysokým kontrastom a ovládacími prvkami animácie. |
| Hľadať | Necitlivý na prízvuk, zhoduje sa s jazykom rozhrania a anglickými názvami a zhoduje sa s názvami sekcií alebo kariet. Stlačenia klávesov napísaných na paneli sa nikdy nedostanú ku Kickovým klávesovým skratkám. |
| Posúvače | Každý posúvač reaguje na kliknutia, ťahanie, šípky na klávesnici a koliesko myši. |
| Zvuky | Web Audio podnety pre akcie menu, zmeny nastavení, úspech/neúspech kvality a obnovenie hlasitosti, každý s prepínačom, náhľadom a hlasitosťou. |
| Oznámenia | Lokalizované správy, ktoré je možné presúvať, meniť ich mierku, spriehľadniť, stlmiť (nerušiť, stíšiť celú obrazovku) a zaznamenať ich do histórie. |
| Alarm mrazu | Detekuje zaseknutý prehrávač alebo čiernu obrazovku, spustí hlasný alarm (dokonca aj na skrytej karte, nezávisle od prepínača zvukových efektov) a zobrazí upozornenie. |
| Odmeny | Voliteľné automatické nárokovanie čaká na Kickovo oznámenie o odmene (alebo prebieha podľa plánu), otvorí okno odmien, nárokuje si, čo je k dispozícii, a zatvorí ho. Plávajúce, presúvateľné tlačidlo rýchleho nároku robí to isté jedným kliknutím. |
| Rozloženie | Skryje chat a zbalí ľavú ponuku z panela alebo pomocou klávesových skratiek, pričom si voliteľne zapamätá výber pre každý stream. |
| Nástroje | Časovač spánku, zobrazenie zaostrenia (na celú obrazovku), opätovná synchronizácia prehrávača a bezpečný režim, ktorý pozastaví každú automatickú zmenu. |
| Diagnostika | Živý stav, zistené kvality, rozlíšenie videa, kontrola kvality, kontrola konfliktov, protokol akcií a kopírovateľná správa. |
| Údaje | Export/import nastavení, vrátenie späť, obnovenie po resetovaní, zálohovanie/obnovenie uložených kanálov. |
| Ochrana osobných údajov | Nastavenia, profily, denníky a história zostávajú v úložisku prehliadača. Nikde sa nič neposiela. |

<a id="settings-reference"></a>
## Odkaz na nastavenia

Všetky hodnoty sú overené `sanitizeSettings` ; všetko, čo je neplatné, sa vráti späť na predvolené nastavenie. Rozsahy sú presadzované.

### Hráč

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Automaticky použiť preferovanú kvalitu. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalita, ktorá sa má použiť na živé prenosy a VOD. `auto` znamená "zapamätať si moju poslednú voľbu". |
| `lastLiveQuality` , `lastVodQuality` | rovnaký | `auto` | Posledná kvalita, ktorú divák vybral ručne. |
| `qualityFallback` | `lower` , `auto` | `lower` | Čo robiť, keď nie je ponúkaná preferovaná kvalita. |
| `autoVolumeEnabled` | boolean | `true` | Obnovte a chráňte uložený zväzok. |
| `volume` | 0–1 | `1` | Uložený objem. |
| `muted` | boolean | `false` | Stav stlmenia bol uložený. |
| `silent` | boolean | `false` | Tiché prehrávanie (zvukový graf s nulovým ziskom, prehrávač nie je stlmený). |
| `playbackRate` | 0,25–2,5 | `1` | Uložená rýchlosť; `1` nie je nikdy nútený. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, krok 5 | `true` ; `85` | Výstraha pri vysokej hlasitosti. |
| `safeMode` | boolean | `false` | Pozastaviť každú automatickú zmenu. |
| `channelProfiles` | objekt, do 200 | `{}` | Profily pre jednotlivé kanály (pozri nižšie). |

Polia profilu kanála: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (len `https://…kick.com/images/user/…` URL), `note` (240 znakov), `group` (40 znakov), `updatedAt` , `lastUsed` .

### Upozornenia a zvuky

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Zobraziť upozornenia na výsledky. |
| `doNotDisturb` , `quietFullscreen` | boolean | `false` , `true` | Potlačiť upozornenia a zvuky alebo iba v režime celej obrazovky. |
| `notificationScale` | 0,8–1,4 | `1` | Veľkosť upozornenia. |
| `notificationDuration` | 1500–12000 ms, krok 500 | `3500` | Ako dlho zostane upozornenie. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparentnosť oznámení. |
| `notificationShowIcon` | boolean | `true` | Zobraziť ikonu stavu. |
| `notificationPosition` | `{x, y}` alebo `null` | `null` | Pretiahnutá pozícia. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; do 30 záznamov | `true` ; `[]` | História upozornení. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Hlavný vypínač a hlasitosť. |
| `soundEvents` , `soundEventVolumes` | na udalosť: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | všetko zapnuté; `0.35` | Prepínač podľa udalosti a hlasitosť. |

### Vzhľad, pohyb a skratky

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Farebný motív. |
| `panelStyle` | `kick` , `minimal` | `kick` | Vizuálny štýl panelu. |
| `accentColor` | `#rrggbb` | `#53fc18` | Farba akcentu. |
| `compactMode` , `highContrast` | boolean | `false` | Hustota a kontrast. |
| `backdropBlur` | 0–12 px | `6` | Rozmazanie pozadia za panelom (funguje v oboch štýloch). |
| `textScale` | 0,9–1,3 | `1` | Veľkosť textu. |
| `language` , `languageChosen` | miestny kód; boolean | jazyk prehliadača; `false` | Rozhranie sa riadi jazykom prehliadača, kým sa nevyberie jazyk, potom sa výber zapamätá. |
| `panelPosition` | `{x, y}` alebo `null` | `null` | Pozícia ťahaného panela. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Rýchlosť animácie. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efekt otvorenia/zatvorenia panelu. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efekt vznášania. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animácia loga/indikátora. |
| `iconAnimations` | boolean | `true` | Animujte bočný panel, resetujte ikony a ikony pomocníka. |
| `hotkey` | kombinovaný reťazec | `F2` | Otvára alebo zatvára panel. |
| `actionHotkeys` | kombinované struny | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Prepnúť upozornenia, zobraziť zameranie, obnoviť kvalitu, obnoviť hlasitosť, prepnúť rozhovor, prepnúť ľavú ponuku. |

Kombinácie klávesov sú uložené ako reťazce, ako napríklad `Alt+Q` , a zodpovedajú fyzickému klávesu, takže fungujú na akomkoľvek rozložení klávesnice. Nastavenia zo starších verzií s klávesovou skratkou v tvare objektu sa konvertujú automaticky. Šírka panelu je pevne stanovená na 680 px (obmedzená na veľkosť okna); predchádzajúce nastavenie šírky sa ignoruje.

### Nástroje

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Keď sa zistí zamrznutie, skúste `play()` . |
| `freezeAlertEnabled` , `freezeSound` | boolean | `true` | Oznámenie o zmrazení a zvuk budíka. |
| `freezeSeconds` | 5–60, krok 5 | `10` | Sekundy bez pokroku pred budíkom. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolean | `false` | Zapamätané rozloženie, použité raz na stránku. |
| `autoClaimRewards` | boolean | `false` | Povoliť automatické vymáhanie odmeny. |
| `claimMode` | `notify` , `interval` | `notify` | Nárokujte si, keď Kick zobrazí upozornenie alebo podľa plánu. |
| `claimDelaySec` | 0–120, krok 5 | `5` | Počkajte, kým sa zobrazí upozornenie (režim upozornenia). |
| `claimIntervalMin` | 5–120, krok 5 | `10` | Minúty medzi kontrolami (plánovaný režim). |

### Tlačidlo rýchleho nároku

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Zobraziť plávajúce tlačidlo. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Dizajn gombíkov. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Vstavaná ikona alebo vlastný obrázok používateľa. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , až 90 000 znakov | prázdny | Znovu zakódovaná kópia nahraného obrázka. Čokoľvek iné je odmietnuté. |
| `claimWidgetImageFill` | boolean | `false` | Nechať vlastný obrázok vyplní celé tlačidlo (nepoužíva ho dizajn piluliek). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Veľkosť gombíka. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Nepriehľadnosť tlačidiel (úplná nepriehľadnosť, kým je k dispozícii odmena). |
| `claimWidgetAutoHide` | boolean | `false` | Zobrazte tlačidlo iba vtedy, keď je k dispozícii odmena. |
| `claimWidgetPos` | `{x, y}` alebo `null` | `null` | Pretiahnutá pozícia. |

### Diagnostika a stav

| Kľúč | Typ / rozsah | Predvolené | Význam |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; do 60 záznamov | `true` ; `[]` | Denník akcií. |
| `activeSection` | ID sekcie | `playback` | Posledná otvorená stránka. |
| `resetBackup` | objekt nastavenia | `null` | Snímka urobená pred resetovaním alebo importom. |

<a id="core-utilities"></a>
## Základné nástroje

| Funkcia | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `detectLanguage` jazyk | — → miestne nastavenie | Prejde `navigator.languages` ​​, zmapuje regionálne varianty ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) a vráti prvé podporované miestne nastavenie alebo `en` . |
| `dictFor` | lang → slovník | Vráti prekladovú tabuľku pre miestne nastavenie, pričom sa vráti k základnému jazyku a potom k angličtine. |
| `t` / `T` | lang, key, vars → string | Vyrieši kľúč so substitúciou `{placeholder}` ; `T` používa aktuálny jazyk. |
| `diagText` | index, kvalita → reťazec | Vráti jednu z lokalizovaných diagnostických viet. |
| `log` | …argumenty → neplatné | Protokolovanie konzoly s predponou skriptu. |
| `clamp` , `sleep` , `esc` | hodnota → hodnota | Obmedzenie rozsahu, oneskorenie založené na prísľube a kódovanie HTML. |
| `normalizeQuality` | text → reťazec | Označenie kvality malými písmenami a odstránenie medzier. |
| `debounce` | fn, počkaj → funkcia | Koncový odraz s `flush` metódou. |
| `onLocationChange` | spätné volanie → neplatné | Zisťuje navigáciu na jednej stránke zabalením `pushState` / `replaceState` , počúvaním `popstate` a dotazovaním raz za sekundu. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | udalosť → reťazec/logická hodnota | Zostavte a porovnajte kľúčové kombinácie z fyzického kódu kľúča. |
| `mkPointer` | typ, extra → udalosť | Vytvorí `PointerEvent` (alebo `MouseEvent` ak nie je k dispozícii), ktorá sa používa na ovládanie Kickových ponúk ARIA. |
| `waitFor` | sonda, časový limit, krok → hodnota/null | Volá, kým sonda nevráti hodnotu alebo kým neskončí časový limit. |
| `imageToDataUrl` | obrázok → reťazec | Zmenší obrázok na štvorcové plátno (zachová proporcie, `willReadFrequently` ), vyskúša 128, 96 a 64 px a vráti adresu URL údajov PNG nie väčšiu ako 70 000 znakov. |

<a id="settings-storage"></a>
## Úložisko nastavení

| Funkcia | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Uchová maximálne 200 profilov s platnými kľúčmi a upne každé pole; avatar musí byť adresa URL obrázka Kick. |
| `sanitizeSettings` | objekt so zálohou → objekt | Overí každé nastavenie (typy, rozsahy, povolené hodnoty), migruje nastavenia 1.1–1.3 (stará kvalita, klávesové skratky, animácie a klávesy sekcií) a aplikuje pravidlo jazyka. |
| `legacyHotkey` | hodnota → reťazec | Konvertuje klávesovú skratku v tvare objektu na kombinovaný reťazec. |
| `Store.load` / `Store.save` | — / nastavenia → nastavenia/zrušenie | Prečítajte si a zapíšte dezinfikovaný objekt v `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | oprava, `{undo}` → neplatné | Zlúči opravu, dezinfikuje, uloží s krátkym odrazom a voliteľne odošle snímku späť (uchováva sa iba v pamäti, do 15). |
| poslucháč `storage` | udalosť → neplatné | Znovu načíta nastavenia, keď ich zmení iná karta Kick, takže sa karty nikdy neprepíšu. |

<a id="player-synchronization-playersync"></a>
## Synchronizácia prehrávača ( `PlayerSync` )

### Pomocníci kanála a profilu

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `isVod` | — → booleovský | Z adresy URL zistí stránku VOD. |
| `channelKey` | — → reťazec | Vytvorí stabilný kľúč `channel:slug` (alebo `vod:id` , `kick:home` ), pričom výsledok uloží na tri sekundy do vyrovnávacej pamäte. Na stránkach VOD sa používa odkaz na kanál najbližšie k prehrávaču. |
| `channelSlug` | — → reťazec | Vráti časť kľúča kanála. |
| `profile` | kľúč → objekt/null | Prečíta uložený profil. |
| `profileActive` | — → objekt/null | Vráti aktuálny profil iba vtedy, keď je povolený a nie je vylúčený. |
| `isExcluded` | — → booleovský | Skontroluje, či je pre tento kanál vypnutá automatizácia. |
| `updateProfile` | záplata, kľúč → neplatné | Vytvorí alebo zlúči profil a pečiatky `updatedAt` . |
| `saveCurrentChannel` kanál | — → objekt/null | Uloží aktuálnu kvalitu, hlasitosť, stlmenie, rýchlosť a tichý stav diváka ako povolený profil a vyhľadá na stránke avatara kanála. |
| `effective` | — → objekt | Rieši hlasitosť, stlmenie, ticho, rýchlosť a kvalitu naživo/VOD z aktívneho profilu alebo globálnych nastavení. |
| `setStatus` | stav, výsledok → neplatné | Aktualizuje stav a kódy posledného výsledku zobrazené v hlavičke a diagnostike. |

### Nájdenie a riadenie Kickovho hráča

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `findMainVideo` | — → video/null | Vyberie najväčšie viditeľné `<video>` . |
| `streamKey` | — → reťazec | Vráti cestu stránky použitú na použitie kvality raz na stream. |
| `isAccountButton` | tlačidlo → boolean | Odmietne tlačidlá hlavičky, avatara a účtu. |
| `findSettingsButton` | video → tlačidlo/null | Vyhľadá tlačidlo ozubeného kolieska prehrávača podľa štítku alebo podľa blízkosti pravého dolného rohu videa. |
| `revealControls` | video → neplatné | Odošle udalosti pri umiestnení kurzora myši, aby sa zobrazili skryté ovládacie prvky. |
| `simulateClick` | prvok → neplatné | Odošle celú sekvenciu ukazovateľa a udalosti, ktorú Kickove ponuky potrebujú. |
| `menuItems` | — → prvok[] | Uvádza viditeľné položky `menuitemradio` . |
| `openQualityMenu` | — → tlačidlo/null | Otvorí ponuku ozubeného kolieska, vstúpi do položky kvality, keď sa zobrazí ponuka najvyššej úrovne, a čaká na možnosti. |
| `closeMenu` | tlačidlo → Sľub | Zatvorí ponuku iba v prípade, že je stále otvorená (druhé slepé kliknutie ju môže znova otvoriť) s možnosťou Escape. |
| `readMenu` | — → prvok[] | Eviduje ponúkané kvality a kontrolovanú. |
| `scanQualities` | — → Sľub<boolean> | Otvorí ponuku, zaznamená dostupné kvality a zatvorí ju (využíva diagnostika). |
| `activate` | položka → Sľub | Klikne na jednu možnosť a počká, kým nebude začiarknutá. |
| `selectQuality` | požadovaný, záložný → Sľub | Vyberie požadovanú kvalitu, inak najbližšiu nižšiu alebo Auto. |
| `desiredQuality` | — → reťazec | Vyberie kvalitu, ktorá sa má použiť, z profilu, preferencie alebo posledného manuálneho výberu. |
| `applyQualityOnce` | streamKey → Promise | Použije požadovanú kvalitu raz za stream, zatvorí ponuku a upozorní na úspech alebo zlyhanie. |
| `watchManualQuality` | — → neplatné | Učí sa novú kvalitu „naposledy použité“ iba z originálnych (dôveryhodných) kliknutí, takže automatické kliknutia a záložné reklamy nikdy neprepíšu uložené hodnoty. |

### Hlasitosť, tichý režim, rýchlosť a monitorovanie

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `applyVolume` | video, ticho → void | Zapíše efektívnu hlasitosť a stav stlmenia (označené ako vlastná zmena skriptu). |
| `trackInput` | — → neplatné | Zaznamenáva čas posledného dôveryhodného ukazovateľa, kolieska, dotyku alebo vstupu z klávesnice. |
| `reassertVolume` | video → neplatné | Vráti uloženú hlasitosť späť, keď ju stránka zmenila bez akéhokoľvek zásahu používateľa (rýchlosť obmedzená na osem návratov za desať sekúnd). |
| `watchVolume` | video → neplatné | Počúva `volumechange` : zmeny vyvolané používateľom sa uložia, zmeny riadené stránkou sa vrátia späť. |
| `checkLoud` | hlasitosť, stlmená → neplatná | Upozorní raz, keď hlasitosť prekročí prah. |
| `buildGraph` | video → graf/null | Prepojí video do `AudioContext` cez uzol zisku; hlási, keď to stránka neumožňuje. |
| `applySilent` | video → neplatné | Nastaví zisk na 0 pre tiché prehrávanie alebo späť na 1, čím sa v prípade potreby obnoví kontext. |
| `applyRate` | video, sila → neplatné | Nastaví uloženú rýchlosť; `1` nie je vynútený, pokiaľ si ho divák práve nevybral, takže Kickov vlastný live-edge catch-up je rešpektovaný. |
| `applyMedia` | video, `{rate}` → void | Znovu použije hlasitosť, tichý režim a voliteľne rýchlosť bez toho, aby sa dotkla kvality. |
| `monitorFreeze` | video → neplatné | Detekuje zablokovaný prehrávač (zaseknutý čas) alebo čiernu obrazovku (čas sa pohybuje bez dekódovaných snímok) a spustí alarm a voliteľné obnovenie. Funguje na skrytých kartách. |

### Slučka a životný cyklus

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `sync` | — → Sľub | Hlavná slučka: monitoruje zamrznutia, spája poslucháčov, aplikuje tichý režim, hlasitosť, rýchlosť a kvalitu, rešpektuje bezpečný režim a vylúčenia, potom volá `Extras.tick` . |
| `resync` | — → Sľub | Vynúti novú prihrávku (využíva ju predvoľby, rýchle akcie a zmeny kvality). |
| `init` | — → neplatné | Spustí prvú synchronizáciu, poslucháč navigácie a 1,5-sekundový interval. |

<a id="page-extras-extras"></a>
## Extra stránky ( `Extras` )

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `root` , `layoutState` | — → prvok / `{chat, sidebar}` | Prečítajte si stav rozloženia Kick z `data-chat` a `data-sidebar` na kontajneri stránky. |
| `isDesktop` | — → booleovský | Automatizácia rozloženia beží iba pri šírkach pracovnej plochy. |
| `click` | prvok → booleovský | Kliknutia cez `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → tlačidlo/null | Nájdite tlačidlo zbalenia v chatovacej miestnosti a tlačidlo „zobraziť chat“ (podľa ikony, nie podľa jazyka). |
| `setChat` , `setSidebar` | zobraziť → boolean | Uveďte chat alebo ľavé menu do požadovaného stavu stlačením Kickových vlastných tlačidiel. |
| `applyLayout` | — → neplatné | Použije zapamätané rozloženie raz na stránku, nikdy nebude bojovať s manuálnymi zmenami. |
| `isTyping` | — → booleovský | Pravda, keď divák píše do poľa; automatické nároky na počkanie. |
| `rewardTrigger` , `popoverCard` | — → tlačidlo/null | Nájdite tlačidlo darčeka a vyskakovaciu kartu s odmenou. |
| `rewardAvailable` | — → booleovský | Detekuje Kickov vlastný signál „dostupná odmena“ (animovaná výzva na akciu). |
| `isEnabled` | tlačidlo → boolean | Viditeľné a nie vypnuté. |
| `claimDrops` | — → Sľub<number> | Na paneli odmien stlačí aktivované tlačidlá nároku na dokončené poklesy. |
| `claimDaily` | spúšť → Sľub<number> | Otvorí okno odmien, stlačí každé povolené tlačidlo nároku raz (nikdy to isté tlačidlo dvakrát) a potom okno zatvorí. |
| `claimRewards` | `{manual}` → Sľub<number> | Spustí úplný nárok, oznámi výsledok a prehrá zvuk; manuálne behy ignorujú písanie a hlásia, keď nie je čo reklamovať. |
| `normName` | text → reťazec | Normalizuje názvy na porovnávanie ( `_` a medzery na `-` ). |
| `findAvatar` | slimák → struna | Vráti avatar kanála viditeľný na stránke (používa sa pred uložením kanála). |
| `scanAvatars` | — → neplatné | Ukladá avatary pre uložené kanály, ktorým jeden chýba. |
| `tick` | streamKey → void | Plánovač vyvolaný zo `sync` : použije rozloženie, naskenuje avatarov, počká na upozornenie na odmenu (režim upozornenia s oneskorením a dvojminútovým vychladnutím) alebo skontroluje zvolený interval a spustí prieskum na paneli kvapiek. |

<a id="interface-building-blocks"></a>
## Stavebné bloky rozhrania

| Funkcia | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `I` | meno → svg | Ikona riadkového ťahu. |
| `fmtValue` | formát, nespracovaný → reťazec | Hodnoty posúvača formátov (percentá, pixely, sekundy). |
| `normSearch` , `englishOf` , `searchText` | text → reťazec | Vyhľadávací text bez prízvuku vrátane anglického názvu preloženého štítku. |
| `row` | kľúč, štítok, ovládanie, možnosti → html | riadok nastavenia; predvolene stohované, vložené iba pre prepínače, s voliteľným prepínačom pomoci. |
| `sw` , `toggleRow` | … → html | Ovládanie výhybiek a hotový rad výhybiek. |
| `chip` , `seg` , `qualityChips` | … → html | Čipy, segmentované ovládacie prvky a mriežka kvality. |
| `range` | attr, key, options → html | Posúvač so stopou plnenia a aktuálnou hodnotou. |
| `card` , `btn` , `ib` | … → html | Karta, textové tlačidlo a tlačidlo ikony. |
| `timeStr` | časová pečiatka → reťazec | Lokalizovaný čas hodín. |
| `setPref` | kľúč, hodnota → neplatné | Zapíše preferenciu hráča do aktívneho profilu kanála alebo do globálnych nastavení. |
| `fxBtn` | kľúč, hodnota, štítok, na → html | Dlaždica výberu efektov s malým náhľadovým glyfom. |
| `avatarHtml` | meno, url → html | Avatar s záložným písmenom; neúspešný obrázok sa odstráni. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → hodnota | Vytvorte označenie tlačidla rýchleho nároku pre živé tlačidlo aj ukážku nastavení. |

<a id="settings-pages-pages"></a>
## stránky nastavení ( `PAGES` )

| Strana | Obsah |
|---|---|
| `playback` | Tip na uloženie tohto kanála, predvoľby, kvalita (automatické použitie, naživo, VOD, záložný režim), hlasitosť (automatické použitie, posuvník, stlmenie, tiché prehrávanie, hlasné upozornenie) a rýchlosť. |
| `channels` | Kroky ako to funguje, aktuálny kanál s tlačidlom **Uložiť tento kanál** , pozastaviť/vylúčiť prepínače a editor, potom zoznam uložených kanálov (vyhľadávanie, triedenie, filter pinov, skupiny, Upraviť/Hotovo, odstrániť) so zálohovaním a obnovením. |
| `tools` | Časovač spánku, rozloženie stránky, odmeny (automatický nárok, režim, oneskorenie alebo interval, Nárokovať teraz), nastavenia tlačidla rýchleho nároku so živým náhľadom, alarm zmrazenia a rýchle akcie. |
| `notifications` | Prepínače, veľkosť, trvanie, nepriehľadnosť, náhľad, reset polohy a história. |
| `sounds` | Hlavný prepínač a hlasitosť, prepínače podľa udalosti, hlasitosti a ukážky. |
| `appearance` | Téma, štýl, zvýrazňujúce farby, hustota, kontrast, veľkosť textu, rozmazanie, centrovanie a jazyk. |
| `motion` | Živý náhľad, predvoľby a výbery pre otvorený efekt, efekt vznášania, indikátor, rýchlosť a animácie ikon. |
| `shortcuts` | Klávesová skratka ponuky a klávesové skratky akcií s previazaním. |
| `diagnostics` | Stav, skenovanie, hlásenie, kontrola kvality a konfliktov, bezpečný režim a denník akcií. |
| `about` | Verzia, odkazy, export/import, vrátenie späť, obnovenie a reset. |

<a id="panel-controller-gui"></a>
## Panelový ovládač ( `GUI` )

### Konštrukcia a vykresľovanie

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `build` | — → neplatné | Vytvorí hostiteľa tieňovej DOM, panel, prípitok a živú oblasť a potom prepojí udalosti. |
| `applyLook` | — → neplatné | Ako atribúty a premenné CSS použije nastavenia motívu, štýlu, zvýraznenia, rozostrenia, mierky textu, efektov, atribútov jazyka a toastu. |
| `renderChrome` | — → neplatné | Vykreslí názov, zástupný symbol vyhľadávania, tlačidlo pauzy, nápovedu v päte a tlačidlo rýchleho nároku. |
| `renderNav` | — → neplatné | Vykreslí zoskupený bočný panel. |
| `renderPage` | možnosti → neplatné | Vykreslí aktívnu stránku (alebo všetky stránky počas vyhľadávania), pričom zachová posúvanie a zameranie klávesnice. |
| `filterRows` | — → neplatné | Použije filter vyhľadávania na riadky, karty a strany. |
| `channelEditor` | kľúč, profil → html | Editor profilu jedného kanála. |
| `refreshAll` , `onExternalChange` | — → neplatné | Po resetovaní, importovaní, vrátení späť alebo zmene z inej karty všetko znova vykreslite. |

### Zmeny udalostí a nastavení

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `wire` | — → neplatné | Pripája delegované ovládacie prvky kliknutia, vstupu, zmeny, kolieska a posúvania a ťahanie panela. |
| `onClick` , `onInput` , `onChange` | udalosť → neplatné | Odosielajte kliknutia, posúvanie posúvača a úpravy textu do nastavení, profilov alebo akcií. |
| `applyRange` | kľúč, hodnota → neplatné | Použije hodnotu posuvníka (hlasitosť, rozmazanie, nepriehľadnosť, trvanie…). |
| `setSetting` , `setChannel` | kľúč/náplasť → neplatné | Uložte nastavenie alebo zmenu profilu a presuňte príslušnú časť do prehrávača. |
| `pushToPlayer` | rozsah, kľúč → neplatné | `media` znovu použijú hlasitosť, tichý režim a rýchlosť; `all` tiež znovu používa kvalitu. Hlasitosť, stlmenie, tichý režim a rýchlosť už nikdy neotvoria ponuku kvality. |
| `act` | meno, prvok → Sľub | Spúšťa pomenované akcie: predvoľby, ukladanie a odstraňovanie kanálov, zálohovanie, import/export, nároky, časovač spánku, skratky, diagnostika a ďalšie. |
| `resetSection` | id → neplatné | Obnoví predvolené hodnoty jednej sekcie. |
| `restoreVolume` | — → neplatné | Znovu použije uložený zväzok. |
| `toggleLayout` | ktoré → neplatné | Skryje alebo zobrazí chat alebo ľavú ponuku a zapamätá si výber. |
| `confirm` , `closeModal` | správa, možnosti / výsledok → Sľub/zrušenie | Potvrdzovacie dialógové okno na paneli (rovnaké v každom prehliadači). |
| `download` , `pickFile` , `pickImage` | … → neplatné | Uložte JSON, prečítajte si JSON a vyberte obrázok pre tlačidlo rýchleho nároku. |
| `startCapture` , `finishCapture` | id / combo → void | Znova pripojte klávesovú skratku a odmietnite duplikáty. |
| `replayMock` | — → neplatné | Prehrá otvorený efekt v ukážke animácie. |

### Nástroje a diagnostika

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minúty / — → neplatné | Spustenie, zrušenie a zobrazenie časovača spánku (na konci pozastaví video). |
| `toggleFocusView` | — → Sľub | Vstúpi alebo opustí celú obrazovku v kontajneri prehrávača. |
| `statusText` , `resultText` , `syncDiagnostics` | — → reťazec/prázdno | Lokalizovaný stav pre hlavičku a diagnostickú stránku. |
| `record` | správa, úroveň → neplatné | Pridá záznam s časovou pečiatkou do denníka akcií. |
| `copyDiagnostics` | — → Sľub | Skopíruje krátku správu (verzia, stav, kvality, typ stránky, používateľský agent). |
| `checkQuality` , `checkConflicts` | — → Sľub/neplatnosť | Skontrolujte, či je ponúkaná preferovaná kvalita a uveďte nastavenia, ktoré navzájom spolupracujú. |

### Tlačidlo rýchleho nároku

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `renderClaimWidget` | — → neplatné | Vytvorí, aktualizuje alebo odstráni plávajúce tlačidlo a spustí jeho jednosekundové zisťovanie stavu. |
| `syncClaimWidget` | — → neplatné | Zobrazuje krúžok a bodku „dostupná odmena“, zaneprázdnený stav a pravidlo automatického skrytia. |
| `placeClaimWidget` | — → neplatné | Umiestňuje tlačidlo a pripevňuje ho k oknu. |
| `wireClaimWidget` | prvok → neplatné | Potiahnutie s päťpixelovým prahom (potiahnutie sa nikdy nepočíta ako kliknutie), uloženie pozície a kliknutie, ktoré spustí manuálny nárok. |

### Oznámenia, zvuk a správanie panela

| Metóda | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `notify` | správa, druh, trvanie, sila → neplatné | Zobrazuje prípitok (pokiaľ nie je potlačený), zaznamenáva históriu a oznamuje text v živej oblasti. |
| `notifyQuality` | aplikované, kvalita → neplatné | Prehrá výsledný zvuk, zaznamená a zobrazí lokalizované upozornenie. |
| `initToastPosition` , `wireToastDrag` | — → neplatné | Obnovte a uložte presunutú polohu toastu. |
| `onAvatars` | — → neplatné | Obnoví stránky, ktoré zobrazujú avatary. |
| `ensureAudio` | — → kontext | Vytvorí a obnoví zdieľaný `AudioContext` (odomknutý pri prvom geste používateľa). |
| `playSound` , `stopSounds` | meno, náhľad → neplatné | Vygenerujte a zastavte podnety Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | sila → neplatné | Zahrajte si päťtónový budík a zvýšte upozornenie na zamrznutie. |
| `placePanel` , `wirePanelDrag` | pozícia → neplatné | Umiestnite panel do okna a urobte hlavičku presúvateľnou. |
| `open` , `close` , `toggle` | — → neplatné | Ovládajte zvuky panela, hlasovania, zaostrovania a ponuky. |
| `syncVolumeControls` | — → neplatné | Udržuje posúvač hlasitosti synchronizovaný s prehrávačom, keď je panel otvorený. |

<a id="hotkeys-and-startup"></a>
## Klávesové skratky a spustenie

| Funkcia | Parametre / návrat | Čo a ako robí |
|---|---|---|
| `isolateKeys` | — → neplatné | Zaregistrované pri `document-start` vo fáze zachytávania: udalosti klávesnice, ktoré prichádzajú zvnútra panela, sa prestanú šíriť do Kick (takže medzerník, F, M a šípky nikdy nespustia klávesové skratky prehrávača) a Tab zostane v dialógu. |
| `setupHotkeys` | — → neplatné | Zaoberá sa zachytením klávesov na opätovné spojenie, Escape (modálny, rozbaľovací, panelový), klávesovou skratkou ponuky a klávesovými skratkami akcií; kombá s modifikátorom alebo F-klávesom fungujú aj počas písania. |
| `init` | — → neplatné | Zostaví panel, nainštaluje klávesové skratky a spustí `PlayerSync` ; chránené pred dvojitým vstreknutím. |

<a id="kick-page-dependencies"></a>
## Zbavte sa závislostí stránok

Scenár sa spolieha na Kickovu aktuálnu značku. Vždy, keď je to možné, používa ikony, atribúty a štruktúru namiesto viditeľného textu, takže funguje v každom jazyku rozhrania. Ak to Kick zmení, funkcia priraďovania prestane fungovať (zvyšok beží ďalej).

| Funkcia | Čo hľadá |
|---|---|
| Kvalita | Viditeľné `<video>` , `button[aria-haspopup="menu"]` a položky `[role="menuitemradio"]` . |
| Rozloženie | Kontajner s `data-sidebar` a `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , tlačidlom ikony `CollapseRight` vnútri `#channel-chatroom` a tlačidlom ikony `MessagesOutline` na zobrazenie rozhovoru. |
| Oznámenie o odmene | `video` , ktorého zdroj obsahuje `reward-available` , alebo karta `[role="group"]` obsahujúca video `daily-rewards` . |
| Nárok na odmenu | `button[aria-haspopup="dialog"][aria-controls]` (ikona darčeka), dialóg, ktorý ovláda ( `data-state` ), aktivované tlačidlá nároku s potomkom `.contents` a tlačidlo zatvorenia s označením `.sr-only` . |
| Kvapky | `#rewards-panel` zoznam položiek s `[role="progressbar"][data-state="complete"]` a povoleným tlačidlom. |
| Avatary | prvky `img[alt]` , ktorých zdroj je `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizácia

Každý štítok, pomocná správa, chyba, dialógové okno a upozornenie prechádza prekladovým resolverom pre 38 miestnych nastavení. Chýbajúce klávesy sa vrátia do angličtiny. Nový text rozhrania je preložený do všetkých podporovaných jazykov spolu s funkciou, ktorá ho pridáva. Selektor jazyka zobrazuje vlajky a rodné mená; rozhranie sa pri prvom spustení riadi jazykom prehliadača a potom si pamätá explicitnú voľbu.

<a id="safety-privacy-and-compatibility"></a>
## Bezpečnosť, súkromie a kompatibilita

- Nastavenia sa pred uložením dezinfikujú; neplatné hodnoty sa vrátia späť na bezpečné predvolené hodnoty.
- Názvy kanálov, poznámky, text upozornení a diagnostický výstup sú pred vložením HTML kódované.
- Ikona vlastného tlačidla je znova zakódovaná z plátna a uložená ako údajová adresa URL iba povoleného typu obrázka; nikdy neopustí prehliadač.
- Shadow DOM udržuje štýly scenára izolované od Kick; udalosti klávesnice z panelu sú izolované od Kickových klávesových skratiek.
- Automatické akcie preskočia vylúčené kanály, bezpečný režim a chýbajúce prvky prehrávača. Nárokovanie si odmeny nikdy nestlačí to isté tlačidlo dvakrát v jednom spustení a počká, kým divák napíše.
- Skript nevytvára žiadne sieťové požiadavky; aktualizácie pochádzajú zo správcu používateľských skriptov alebo zo stránky Vydania.
- Existujúce lokálne nastavenia sa zachovajú pri prechode z 1.1.0, 1.2.0 a 1.3.0.
