<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · **Čeština** · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Vylepšení Kick Stream — Reference funkcí

Reference pro Kick Stream Tweak 1.3.1. Popisuje, co každá funkční oblast dělá, jak se ukládají nastavení, na kterých částech Kickovy stránky skript závisí a jak funguje každá pojmenovaná funkce nebo metoda v uživatelském skriptu. Podívejte se na [repozitář](https://github.com/ebayybe/kick-stream-tweaks) a [changelog](../CHANGELOG/en_CHANGELOG.md) .

> Názvy odpovídají zdroji. `void` znamená, že funkce působí prostřednictvím vedlejších účinků. Metoda napsaná jako `Object.method` žije na tomto objektu ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Obsah

1. [Architektura](#architecture)
2. [Chování vůči uživateli](#user-facing-behavior)
3. [Odkaz na nastavení](#settings-reference)
4. [Základní nástroje](#core-utilities)
5. [Uložení nastavení](#settings-storage)
6. [Synchronizace přehrávače ( `PlayerSync` )](#player-synchronization-playersync)
7. [Extra stránky ( `Extras` )](#page-extras-extras)
8. [Stavební bloky rozhraní](#interface-building-blocks)
9. [Stránky nastavení ( `PAGES` )](#settings-pages-pages)
10. [Ovládací panel ( `GUI` )](#panel-controller-gui)
11. [Klávesové zkratky a spuštění](#hotkeys-and-startup)
12. [Kick závislosti na stránce](#kick-page-dependencies)
13. [Lokalizace](#localization)
14. [Bezpečnost, soukromí a kompatibilita](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architektura

Uživatelský skript je jeden samostatný soubor, který se spouští na `document-start` s `@grant none` . Nemá žádný krok sestavení a nevytváří žádné vlastní síťové požadavky.

| Vrstva | Objekt / plocha | Odpovědnost |
|---|---|---|
| Údaje | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Překlady pro 38 jazyků, lokalizované diagnostické zprávy, příznakové SVG a názvy jazyků. |
| Konfigurace | `CONFIG` , `DEFAULTS` | Konstanty (selektory, limity opakování, předvolby, sekce) a výchozí nastavení. |
| Skladování | `sanitizeSettings` , `Store` , `persist` | Ověřuje a ukládá nastavení v `localStorage` ; uchovává v paměti zásobník pro vrácení zpět. |
| Logika hráče | `PlayerSync` | Najde video, obnoví kvalitu, hlasitost, rychlost a tichý režim, sleduje, zda nezamrzne. |
| Pomocníci stránky | `Extras` | Tlačítka rozvržení, nárokování odměn, avatary kanálu a plánovač na pozadí. |
| Rozhraní | `PAGES` , `GUI` , pomocníci | Panel Shadow-DOM, upozornění, zvuky, plovoucí tlačítko rychlého nároku, klávesové zkratky. |

Datový tok: 1,5sekundová smyčka `PlayerSync.sync` přečte efektivní nastavení (nejprve profil kanálu, poté globální), aplikuje je na přehrávač a zavolá `Extras.tick` . Uživatelské akce procházejí obslužnými rutinami `GUI` , které aktualizují nastavení s `persist` a do přehrávače posílají pouze postiženou část ( `media` nebo `all` ).

<a id="user-facing-behavior"></a>
## Chování vůči uživateli

| Oblast | Chování |
|---|---|
| Vytrvalost hráče | Ukládá kvalitu živého vysílání/VOD, hlasitost, stav ztlumení, tichý režim a rychlost a poté je použije, když je detekován nový stream. Změny, které stránka sama provede (například Kick resetování hlasitosti na 50 %), jsou vráceny zpět; uložené hodnoty aktualizují pouze vlastní akce diváka. |
| Kvalita | Vybere preferovanou kvalitu prostřednictvím nabídky přehrávače, přejde zpět na nejbližší nižší kvalitu (nebo Auto), pokud není dostupná, a nabídku znovu zavře. Pouze skutečná uživatelská kliknutí učí skript nové kvalitě „naposledy použitého“. |
| Hlasitost a tiché přehrávání | Hlasitost a ztlumení jsou obnoveny pro každý stream. Tiché přehrávání vede video přes Web Audio engine s nulovým ziskem, takže stream pokračuje v přehrávání na kartě na pozadí, aniž by byl ztlumen. |
| Profily kanálů | **Uložit tento kanál** uloží aktuální kvalitu, hlasitost, rychlost a zvuk pro sledovaný kanál. Profily také obsahují poznámky, skupiny, stav špendlíku, avatar a příznaky povolené/vyloučené. |
| Předvolby | Ušetřete šířku pásma, nejlepší kvalitu, tiché sledování a VOD na jedno kliknutí. |
| Panel | `F2` nebo vlastní klávesová zkratka otevře panel s pevnou šířkou (680 px) se seskupeným bočním panelem, vyhledáváním, styly Kick a Minimal, světlými/tmavými motivy, 14 zvýrazňujícími barvami plus výběr barev, kompaktním rozložením, rozostřením pozadí, změnou měřítka textu, vysokým kontrastem a ovládacími prvky animace. |
| Hledat | Necitlivý na akcent, odpovídá jazyku rozhraní a anglickým názvům a odpovídá názvům sekcí nebo karet. Stisky kláves napsané na panelu nikdy nedosáhnou Kickových klávesových zkratek. |
| Posuvníky | Každý posuvník reaguje na kliknutí, tažení, šipky na klávesnici a kolečko myši. |
| Zvuky | Web Audio podněty pro akce nabídky, změny nastavení, úspěch/selhání kvality a obnovení hlasitosti, každý s přepínačem, náhledem a hlasitostí. |
| Oznámení | Lokalizované zprávy, které lze přetáhnout, zmenšit, zprůhlednit, ztišit (nerušit, ztišit celou obrazovku) a zaznamenat do historie. |
| Alarm zamrznutí | Detekuje zablokovaný přehrávač nebo černou obrazovku, přehraje hlasitý alarm (i na skryté kartě, nezávisle na přepínači zvukových efektů) a zobrazí upozornění. |
| Odměny | Volitelné automatické nárokování čeká na Kickovo oznámení o odměně (nebo běží podle plánu), otevře okno odměn, nárokuje, co je k dispozici, a zavře je. Plovoucí, přetahovatelné tlačítko pro rychlý nárok dělá totéž jedním kliknutím. |
| Rozložení | Skryje chat a sbalí levou nabídku z panelu nebo pomocí klávesových zkratek, volitelně si zapamatuje volbu pro každý stream. |
| Nástroje | Časovač spánku, zaostření (celá obrazovka), opětovná synchronizace přehrávače a bezpečný režim, který pozastaví každou automatickou změnu. |
| Diagnostika | Živý stav, zjištěné kvality, rozlišení videa, kontrola kvality, kontrola konfliktů, protokol akcí a kopírovatelná zpráva. |
| Údaje | Export/import nastavení, vrácení zpět, obnovení po resetu, záloha/obnova uložených kanálů. |
| Ochrana osobních údajů | Nastavení, profily, protokoly a historie zůstávají v úložišti prohlížeče. Nikam se nic neposílá. |

<a id="settings-reference"></a>
## Odkaz na nastavení

Všechny hodnoty jsou ověřeny pomocí `sanitizeSettings` ; cokoli neplatné se vrátí zpět na výchozí hodnotu. Rozsahy jsou vynuceny.

### Hráč

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `autoQualityEnabled` | booleovský | `true` | Automaticky použít preferovanou kvalitu. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvalita, kterou lze použít pro živé přenosy a VOD. `auto` znamená "pamatovat si moji poslední volbu". |
| `lastLiveQuality` , `lastVodQuality` | stejný | `auto` | Poslední kvalita, kterou divák vybral ručně. |
| `qualityFallback` | `lower` , `auto` | `lower` | Co dělat, když není nabízena preferovaná kvalita. |
| `autoVolumeEnabled` | booleovský | `true` | Obnovte a chraňte uložený svazek. |
| `volume` | 0–1 | `1` | Uložený objem. |
| `muted` | booleovský | `false` | Uložený stav ztlumení. |
| `silent` | booleovský | `false` | Tiché přehrávání (graf s nulovým ziskem, přehrávač není ztlumený). |
| `playbackRate` | 0,25–2,5 | `1` | Uložená rychlost; `1` není nikdy nucen. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, krok 5 | `true` ; `85` | Upozornění na vysokou hlasitost. |
| `safeMode` | booleovský | `false` | Pozastavit každou automatickou změnu. |
| `channelProfiles` | objekt, do 200 | `{}` | Profily pro jednotlivé kanály (viz níže). |

Pole profilu kanálu: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (pouze `https://…kick.com/images/user/…` URL), `note` (240 znaků), `group` (40 znaků), `updatedAt` , `lastUsed` .

### Upozornění a zvuky

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `notificationsEnabled` | booleovský | `true` | Zobrazit oznámení o výsledcích. |
| `doNotDisturb` , `quietFullscreen` | booleovský | `false` , `true` | Potlačit oznámení a zvuky, nebo pouze v režimu celé obrazovky. |
| `notificationScale` | 0,8–1,4 | `1` | Velikost oznámení. |
| `notificationDuration` | 1500–12000 ms, krok 500 | `3500` | Jak dlouho oznámení zůstane. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparentnost oznámení. |
| `notificationShowIcon` | booleovský | `true` | Zobrazit ikonu stavu. |
| `notificationPosition` | `{x, y}` nebo `null` | `null` | Přetažená pozice. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; až 30 záznamů | `true` ; `[]` | Historie upozornění. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Hlavní vypínač a hlasitost. |
| `soundEvents` , `soundEventVolumes` | na událost: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | vše zapnuto; `0.35` | Přepínač podle události a hlasitost. |

### Vzhled, pohyb a zkratky

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Barevný motiv. |
| `panelStyle` | `kick` , `minimal` | `kick` | Vizuální styl panelu. |
| `accentColor` | `#rrggbb` | `#53fc18` | Barva přízvuku. |
| `compactMode` , `highContrast` | booleovský | `false` | Hustota a kontrast. |
| `backdropBlur` | 0–12 px | `6` | Rozostření pozadí za panelem (funguje v obou stylech). |
| `textScale` | 0,9–1,3 | `1` | Velikost textu. |
| `language` , `languageChosen` | kód národního prostředí; booleovský | jazyk prohlížeče; `false` | Rozhraní se řídí jazykem prohlížeče, dokud není jazyk vybrán, poté je výběr zapamatován. |
| `panelPosition` | `{x, y}` nebo `null` | `null` | Pozice přetaženého panelu. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Rychlost animace. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efekt otevření/zavření panelu. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efekt vznášení. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animace loga/indikátoru. |
| `iconAnimations` | booleovský | `true` | Animujte postranní panel, resetujte ikony a ikony nápovědy. |
| `hotkey` | kombinovaný řetězec | `F2` | Otevře nebo zavře panel. |
| `actionHotkeys` | kombinované struny | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Přepínání oznámení, zobrazení zaměření, resetování kvality, obnovení hlasitosti, přepínání chatu, přepínání levé nabídky. |

Kombinace kláves jsou uloženy jako řetězce, jako je `Alt+Q` , a odpovídají fyzické klávese, takže fungují na jakémkoli rozložení klávesnice. Nastavení ze starších verzí s klávesovou zkratkou ve tvaru objektu se převedou automaticky. Šířka panelu je pevně nastavena na 680 px (omezeno na velikost okna); předchozí nastavení šířky je ignorováno.

### Nástroje

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `autoRecoverStall` | booleovský | `false` | Když je zjištěno zamrznutí, zkuste `play()` . |
| `freezeAlertEnabled` , `freezeSound` | booleovský | `true` | Oznámení o zmrazení a zvuk budíku. |
| `freezeSeconds` | 5–60, krok 5 | `10` | Vteřiny žádného pokroku před alarmem. |
| `layoutHideChat` , `layoutCollapseSidebar` | booleovský | `false` | Zapamatované rozvržení, použité jednou na stránku. |
| `autoClaimRewards` | booleovský | `false` | Povolit automatické nárokování odměny. |
| `claimMode` | `notify` , `interval` | `notify` | Nárokujte, když Kick zobrazí oznámení nebo podle plánu. |
| `claimDelaySec` | 0–120, krok 5 | `5` | Počkejte, až se zobrazí oznámení (režim oznámení). |
| `claimIntervalMin` | 5–120, krok 5 | `10` | Minuty mezi kontrolami (plánovaný režim). |

### Tlačítko rychlého nároku

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `claimWidget` | booleovský | `false` | Zobrazit plovoucí tlačítko. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Design tlačítka. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Vestavěná ikona nebo vlastní obrázek uživatele. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , až 90 000 znaků | prázdný | Překódovaná kopie nahraného obrázku. Cokoli jiného je odmítnuto. |
| `claimWidgetImageFill` | booleovský | `false` | Nechte vlastní obrázek vyplnit celé tlačítko (nepoužívá ho design pilulek). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Velikost knoflíku. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Neprůhlednost tlačítka (plná neprůhlednost, dokud je k dispozici odměna). |
| `claimWidgetAutoHide` | booleovský | `false` | Zobrazte tlačítko pouze v případě, že je k dispozici odměna. |
| `claimWidgetPos` | `{x, y}` nebo `null` | `null` | Přetažená pozice. |

### Diagnostika a stav

| Klíč | Typ / rozsah | Výchozí | Význam |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; až 60 záznamů | `true` ; `[]` | Záznam akcí. |
| `activeSection` | ID sekce | `playback` | Naposledy otevřená stránka. |
| `resetBackup` | objekt nastavení | `null` | Snímek pořízený před resetováním nebo importem. |

<a id="core-utilities"></a>
## Základní nástroje

| Funkce | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `detectLanguage` | — → locale | Projde `navigator.languages` ​​, zmapuje regionální varianty ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) a vrátí první podporované národní prostředí nebo `en` . |
| `dictFor` | lang → slovník | Vrátí překladovou tabulku pro národní prostředí, přičemž se vrátí k základnímu jazyku a poté k angličtině. |
| `t` / `T` | lang, key, vars → string | Vyřeší klíč se substitucí `{placeholder}` ; `T` používá aktuální jazyk. |
| `diagText` | index, kvalita → řetězec | Vrátí jednu z lokalizovaných diagnostických vět. |
| `log` | …args → neplatné | Protokolování konzoly s předponou skriptu. |
| `clamp` , `sleep` , `esc` | hodnota → hodnota | Omezení rozsahu, zpoždění založené na slibech a escapování HTML. |
| `normalizeQuality` | text → řetězec | Označí kvalitu malými písmeny a odstraní mezery. |
| `debounce` | fn, čekej → funkce | Trailing debounce s `flush` metodou. |
| `onLocationChange` | zpětné volání → neplatné | Zjišťuje navigaci po jedné stránce zabalením `pushState` / `replaceState` , poslechem `popstate` a dotazováním jednou za sekundu. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | událost → řetězec/logická hodnota | Sestavte a porovnejte kombinace kláves z fyzického kódu klíče. |
| `mkPointer` | typ, extra → událost | Vytvoří `PointerEvent` (nebo událost `MouseEvent` , pokud není k dispozici) používanou k ovládání nabídek Kick ARIA. |
| `waitFor` | sonda, časový limit, krok → hodnota/null | Dotazuje se, dokud sonda nevrátí hodnotu nebo dokud neskončí časový limit. |
| `imageToDataUrl` | obrázek → řetězec | Změní měřítko obrázku na čtvercové plátno (zachová proporce, `willReadFrequently` ), zkusí 128, 96 a 64 px a vrátí adresu URL dat PNG ne větší než 70 000 znaků. |

<a id="settings-storage"></a>
## Úložiště nastavení

| Funkce | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Uchová maximálně 200 profilů s platnými klíči a upne každé pole; avatar musí být adresa URL obrázku Kick. |
| `sanitizeSettings` | objekt se Zálohou → objekt | Ověřuje každé nastavení (typy, rozsahy, povolené hodnoty), migruje nastavení 1.1–1.3 (starší kvalita, klávesové zkratky, animace a klávesy sekcí) a aplikuje pravidlo jazyka. |
| `legacyHotkey` | hodnota → řetězec | Převede klávesovou zkratku ve tvaru objektu na kombinovaný řetězec. |
| `Store.load` / `Store.save` | — / nastavení → nastavení/zrušit | Přečtěte a zapište dezinfikovaný objekt v `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → void | Sloučí opravu, dezinfikuje, uloží s krátkým odrazem a volitelně vrátí snímek zpět (uchovává se pouze v paměti, až 15). |
| posluchač `storage` | událost → neplatná | Znovu načte nastavení, když je změní jiná karta Kick, takže se karty nikdy navzájem nepřepisují. |

<a id="player-synchronization-playersync"></a>
## Synchronizace přehrávače ( `PlayerSync` )

### Pomocníci kanálu a profilu

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `isVod` | — → booleovský | Detekuje stránku VOD z adresy URL. |
| `channelKey` | — → řetězec | Vytvoří stabilní klíč `channel:slug` (nebo `vod:id` , `kick:home` ) a uloží výsledek do mezipaměti po dobu tří sekund. Na stránkách VOD se používá odkaz na kanál nejblíže přehrávači. |
| `channelSlug` | — → řetězec | Vrací část slug klíče kanálu. |
| `profile` | klíč → objekt/null | Přečte uložený profil. |
| `profileActive` | — → objekt/null | Vrátí aktuální profil pouze v případě, že je povolen a není vyloučen. |
| `isExcluded` | — → booleovský | Zkontroluje, zda je pro tento kanál zakázána automatizace. |
| `updateProfile` | patch, klíč → neplatný | Vytvoří nebo sloučí profil a razítka `updatedAt` . |
| `saveCurrentChannel` | — → objekt/null | Ukládá aktuální kvalitu, hlasitost, ztlumení, rychlost a tichý stav diváka jako povolený profil a vyhledá na stránce avatara kanálu. |
| `effective` | — → objekt | Řeší hlasitost, ztlumení, ticho, rychlost a kvalitu živého vysílání/VOD z aktivního profilu nebo globálního nastavení. |
| `setStatus` | stav, výsledek → neplatné | Aktualizuje stavové kódy a kódy posledního výsledku zobrazené v záhlaví a diagnostice. |

### Hledání a řízení Kickova hráče

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `findMainVideo` | — → video/null | Vybere největší viditelné `<video>` . |
| `streamKey` | — → řetězec | Vrátí cestu ke stránce použitou k použití kvality jednou na stream. |
| `isAccountButton` | tlačítko → boolean | Odmítne tlačítka záhlaví, avatara a účtu. |
| `findSettingsButton` | video → tlačítko/null | Vyhledá tlačítko ozubeného kola přehrávače podle štítku nebo podle blízkosti pravého dolního rohu videa. |
| `revealControls` | video → neplatné | Odešle události při umístění kurzoru, takže se objeví skryté ovládací prvky. |
| `simulateClick` | prvek → neplatný | Odešle celou sekvenci události ukazatele, kterou Kickovy nabídky potřebují. |
| `menuItems` | — → prvek[] | Vypisuje viditelné položky `menuitemradio` . |
| `openQualityMenu` | — → tlačítko/null | Otevře nabídku ozubeného kola, vstoupí do položky kvality, když se zobrazí nabídka nejvyšší úrovně, a čeká na možnosti. |
| `closeMenu` | tlačítko → Slib | Zavře nabídku pouze v případě, že je stále otevřená (druhé slepé kliknutí ji může znovu otevřít), s návratem Escape. |
| `readMenu` | — → prvek[] | Zaznamenává nabízené kvality a kontrolovanou. |
| `scanQualities` | — → Slibuji<boolean> | Otevře nabídku, zaznamená dostupné kvality a zavře ji (využívá diagnostika). |
| `activate` | položka → Slib | Klikne na jednu možnost a počká, dokud nebude zaškrtnuta. |
| `selectQuality` | požadovaný, záložní → Slib | Vybere požadovanou kvalitu, jinak nejbližší nižší nebo Auto. |
| `desiredQuality` | — → řetězec | Vybírá kvalitu, která se má použít, z profilu, preference nebo poslední ruční volby. |
| `applyQualityOnce` | streamKey → Slib | Použije požadovanou kvalitu jednou na stream, zavře nabídku a upozorní na úspěch nebo neúspěch. |
| `watchManualQuality` | — → neplatný | Učí se novou kvalitu „naposledy použité“ pouze ze skutečných (důvěryhodných) kliknutí, takže automatická kliknutí a nouzová řešení nikdy nepřepisují uložené hodnoty. |

### Hlasitost, tichý režim, rychlost a monitorování

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `applyVolume` | video, tiché → void | Zapíše efektivní hlasitost a stav ztlumení (označeno jako vlastní změna skriptu). |
| `trackInput` | — → neplatný | Zaznamenává čas posledního důvěryhodného ukazatele, kolečka, dotyku nebo vstupu z klávesnice. |
| `reassertVolume` | video → neplatné | Vrátí uložený svazek zpět, když jej stránka změnila bez jakéhokoli zásahu uživatele (rychlost omezena na osm návratů za deset sekund). |
| `watchVolume` | video → neplatné | Poslouchá `volumechange` : změny řízené uživatelem se uloží, změny řízené stránkou se vrátí zpět. |
| `checkLoud` | hlasitost, ztlumená → neplatná | Varuje jednou, když hlasitost překročí práh. |
| `buildGraph` | video → graf/null | Propojí video do `AudioContext` přes uzel zisku; hlásí, když to stránka neumožňuje. |
| `applySilent` | video → neplatné | Nastaví zesílení na 0 pro tiché přehrávání nebo zpět na 1, v případě potřeby obnoví kontext. |
| `applyRate` | video, síla → neplatné | Nastaví uloženou rychlost; `1` není vynucený, pokud si ho divák právě nevybral, takže je respektováno Kickovo vlastní live-edge catch-up. |
| `applyMedia` | video, `{rate}` → void | Znovu použije hlasitost, tichý režim a volitelně rychlost bez ovlivnění kvality. |
| `monitorFreeze` | video → neplatné | Detekuje zablokovaný přehrávač (zaseknutý čas) nebo černou obrazovku (čas se pohybuje bez dekódovaných snímků) a spustí alarm a volitelnou obnovu. Funguje na skrytých kartách. |

### Smyčka a životní cyklus

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `sync` | — → Slib | Hlavní smyčka: monitoruje zamrznutí, váže posluchače, aplikuje tichý režim, hlasitost, rychlost a kvalitu, respektuje bezpečný režim a výjimky, poté volá `Extras.tick` . |
| `resync` | — → Slib | Vynutí nový průchod (používá se předvolbami, rychlými akcemi a změnami kvality). |
| `init` | — → neplatný | Spustí první synchronizaci, posluchač navigace a 1,5sekundový interval. |

<a id="page-extras-extras"></a>
## Extra stránky ( `Extras` )

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `root` , `layoutState` | — → prvek / `{chat, sidebar}` | Přečtěte si stav rozložení Kick z `data-chat` a `data-sidebar` na kontejneru stránky. |
| `isDesktop` | — → booleovský | Automatizace rozvržení běží pouze na šířku pracovní plochy. |
| `click` | prvek → booleovský | Kliknutí přes `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → tlačítko/null | Najděte tlačítko pro sbalení uvnitř chatovací místnosti a tlačítko „zobrazit chat“ (podle ikony, nikoli podle jazyka). |
| `setChat` , `setSidebar` | zobrazit → booleovský | Uveďte chat nebo levé menu do požadovaného stavu stisknutím Kickových vlastních tlačítek. |
| `applyLayout` | — → neplatný | Použije zapamatované rozvržení jednou na stránku, nikdy nebude bojovat s ručními změnami. |
| `isTyping` | — → booleovský | Pravda, když divák píše do pole; automatické nároky čekají. |
| `rewardTrigger` , `popoverCard` | — → tlačítko/null | Najděte dárkové tlačítko a vyskakovací kartu s odměnou. |
| `rewardAvailable` | — → booleovský | Detekuje Kickův vlastní signál „dostupná odměna“ (animovaná výzva k akci). |
| `isEnabled` | tlačítko → boolean | Viditelné a ne deaktivované. |
| `claimDrops` | — → Slibuji<number> | Stisknutím aktivovaných tlačítek nároku na dokončené poklesy na panelu odměn. |
| `claimDaily` | spoušť → Slib<number> | Otevře okno odměn, stiskne každé povolené tlačítko nároku jednou (nikdy stejné tlačítko dvakrát) a potom okno zavře. |
| `claimRewards` | `{manual}` → Slib<number> | Spustí plný nárok, ohlásí výsledek a přehraje zvuk; ruční běhy ignorují psaní a hlásí, když není co reklamovat. |
| `normName` | text → řetězec | Normalizuje názvy pro shodu ( `_` a mezery na `-` ). |
| `findAvatar` | slimák → struna | Vrátí avatar kanálu viditelný na stránce (používá se před uložením kanálu). |
| `scanAvatars` | — → neplatný | Ukládá avatary pro uložené kanály, kterým chybí. |
| `tick` | streamKey → void | Plánovač volaný ze `sync` : použije rozvržení, naskenuje avatary, čeká na oznámení o odměně (režim oznámení se zpožděním a dvouminutovým ochlazením) nebo zkontroluje zvolený interval a provede dotaz na panelu kapek. |

<a id="interface-building-blocks"></a>
## Stavební bloky rozhraní

| Funkce | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `I` | jméno → svg | Vložená ikona tahu. |
| `fmtValue` | formát, raw → řetězec | Hodnoty posuvníku formátů (procenta, pixely, sekundy). |
| `normSearch` , `englishOf` , `searchText` | text → řetězec | Vyhledávací text bez zvýraznění včetně anglického názvu přeloženého štítku. |
| `row` | klíč, popisek, ovládání, možnosti → html | Nastavovací řádek; ve výchozím nastavení skládaný, vložený pouze pro přepínače, s volitelným přepínačem nápovědy. |
| `sw` , `toggleRow` | … → html | Ovládání spínačů a hotová řada spínačů. |
| `chip` , `seg` , `qualityChips` | … → html | Čipy, segmentové ovládání a mřížka kvality. |
| `range` | attr, key, options → html | Posuvník se stopou plnění a aktuální hodnotou. |
| `card` , `btn` , `ib` | … → html | Karta, textové tlačítko a tlačítko ikony. |
| `timeStr` | časové razítko → řetězec | Lokalizovaný čas hodin. |
| `setPref` | klíč, hodnota → neplatnost | Zapíše předvolbu hráče do aktivního profilu kanálu nebo do globálního nastavení. |
| `fxBtn` | klíč, hodnota, štítek, na → html | Dlaždice výběru efektů s malým náhledovým glyfem. |
| `avatarHtml` | jméno, url → html | Avatar se záložním písmenem; neúspěšný obrázek je odstraněn. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → hodnota | Vytvořte označení tlačítka rychlého nároku pro živé tlačítko i náhled nastavení. |

<a id="settings-pages-pages"></a>
## Stránky nastavení ( `PAGES` )

| Strana | Obsah |
|---|---|
| `playback` | Tip pro uložení tohoto kanálu, předvolby, kvalita (automatické použití, živé vysílání, VOD, záložní), hlasitost (automatické použití, posuvník, ztlumení, tiché přehrávání, hlasité varování) a rychlost. |
| `channels` | Kroky jak to funguje, aktuální kanál pomocí tlačítka **Uložit tento kanál** , pozastavení/vyloučení přepínačů a editoru, poté seznam uložených kanálů (hledání, řazení, filtr pinů, skupiny, Upravit/Hotovo, smazat) se zálohou a obnovením. |
| `tools` | Časovač spánku, rozvržení stránky, odměny (automatický nárok, režim, zpoždění nebo interval, Nárokovat nyní), nastavení tlačítka rychlého nároku s živým náhledem, alarm proti zmrazení a rychlé akce. |
| `notifications` | Přepínače, velikost, trvání, neprůhlednost, náhled, reset pozice a historie. |
| `sounds` | Hlavní přepínač a hlasitost, přepínače podle události, hlasitosti a náhledy. |
| `appearance` | Motiv, styl, zvýrazňující barvy, hustota, kontrast, velikost textu, rozostření, centrování a jazyk. |
| `motion` | Živý náhled, předvolby a výběry pro otevřený efekt, efekt vznesení, indikátor, rychlost a animace ikon. |
| `shortcuts` | Klávesové zkratky nabídky a klávesové zkratky akcí s převázáním. |
| `diagnostics` | Stav, skenování, hlášení, kontrola kvality a konfliktů, bezpečný režim a protokol akcí. |
| `about` | Verze, odkazy, export/import, zpět, obnovení a reset. |

<a id="panel-controller-gui"></a>
## Ovladač panelu ( `GUI` )

### Konstrukce a vykreslování

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `build` | — → neplatný | Vytvoří hostitele stínového DOM, panel, přípitek a živou oblast a poté spojí události. |
| `applyLook` | — → neplatný | Aplikuje nastavení motivu, stylu, zvýraznění, rozostření, měřítka textu, efektů, atributů jazyka a toastu jako atributů a proměnných CSS. |
| `renderChrome` | — → neplatný | Vykreslí název, zástupný symbol pro vyhledávání, tlačítko pauzy, nápovědu pro zápatí a tlačítko rychlého nároku. |
| `renderNav` | — → neplatný | Vykreslí seskupený postranní panel. |
| `renderPage` | možnosti → neplatné | Vykreslí aktivní stránku (nebo všechny stránky během vyhledávání), přičemž zachová posouvání a zaměření klávesnice. |
| `filterRows` | — → neplatný | Použije vyhledávací filtr na řádky, karty a stránky. |
| `channelEditor` | klíč, profil → html | Editor profilu jednoho kanálu. |
| `refreshAll` , `onExternalChange` | — → neplatný | Po resetování, importu, vrácení zpět nebo změně z jiné karty vše znovu vykreslete. |

### Události a změny nastavení

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `wire` | — → neplatný | Připojuje delegované ovladače kliknutí, vstupu, změny, kolečka a posouvání a tažení panelu. |
| `onClick` , `onInput` , `onChange` | událost → neplatná | Odesílejte kliknutí, pohyby posuvníku a úpravy textu do nastavení, profilů nebo akcí. |
| `applyRange` | klíč, hodnota → neplatnost | Použije hodnotu posuvníku (hlasitost, rozostření, neprůhlednost, trvání…). |
| `setSetting` , `setChannel` | klíč/patch → neplatný | Uložte nastavení nebo změnu profilu a přesuňte postiženou část do přehrávače. |
| `pushToPlayer` | rozsah, klíč → neplatné | `media` znovu použijí hlasitost, tichý režim a rychlost; `all` také znovu aplikuje kvalitu. Hlasitost, ztlumení, tichý režim a rychlost již nikdy znovu neotevřou nabídku kvality. |
| `act` | jméno, prvek → Slib | Spouští pojmenované akce: předvolby, ukládání a odstraňování kanálů, zálohování, import/export, nároky, časovač spánku, zkratky, diagnostika a další. |
| `resetSection` | id → neplatné | Obnoví výchozí hodnoty jedné sekce. |
| `restoreVolume` | — → neplatný | Znovu použije uložený svazek. |
| `toggleLayout` | který → neplatný | Skryje nebo zobrazí chat nebo levé menu a zapamatuje si výběr. |
| `confirm` , `closeModal` | zpráva, možnosti / výsledek → Slib/neplatnost | Dialog pro potvrzení na panelu (stejný v každém prohlížeči). |
| `download` , `pickFile` , `pickImage` | … → neplatné | Uložte JSON, přečtěte si JSON a vyberte obrázek pro tlačítko rychlého nároku. |
| `startCapture` , `finishCapture` | id / combo → void | Znovu připojte klávesovou zkratku a odmítněte duplikáty. |
| `replayMock` | — → neplatný | Znovu přehraje otevřený efekt v náhledu animace. |

### Nástroje a diagnostika

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuty / — → neplatné | Spustit, zrušit a zobrazit časovač vypnutí (na konci pozastaví video). |
| `toggleFocusView` | — → Slib | Vstoupí nebo opustí celou obrazovku v kontejneru přehrávače. |
| `statusText` , `resultText` , `syncDiagnostics` | — → řetězec/prázdno | Lokalizovaný stav pro záhlaví a stránku diagnostiky. |
| `record` | zpráva, úroveň → neplatná | Přidá záznam s časovým razítkem do protokolu akcí. |
| `copyDiagnostics` | — → Slib | Zkopíruje krátkou zprávu (verze, stav, kvality, typ stránky, uživatelský agent). |
| `checkQuality` , `checkConflicts` | — → Slib/neplatnost | Ověřte, zda je nabízena preferovaná kvalita, a uveďte seznam nastavení, která vzájemně spolupracují. |

### Tlačítko rychlého nároku

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `renderClaimWidget` | — → neplatný | Vytvoří, aktualizuje nebo odstraní plovoucí tlačítko a spustí jeho jednosekundové dotazování stavu. |
| `syncClaimWidget` | — → neplatný | Zobrazuje prsten a tečku „dostupná odměna“, stav zaneprázdnění a pravidlo automatického skrytí. |
| `placeClaimWidget` | — → neplatný | Umístí tlačítko a připevní jej k oknu. |
| `wireClaimWidget` | prvek → neplatný | Přetažení s pětipixelovým prahem (přetažení se nikdy nepočítá jako kliknutí), uložení pozice a kliknutí, které spustí manuální nárokování. |

### Oznámení, zvuk a chování panelu

| Metoda | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `notify` | zpráva, druh, trvání, síla → neplatnost | Ukazuje přípitek (pokud není potlačen), zaznamenává historii a oznamuje text v živé oblasti. |
| `notifyQuality` | použito, kvalita → neplatná | Přehraje výsledný zvuk, zaprotokoluje a zobrazí lokalizované upozornění. |
| `initToastPosition` , `wireToastDrag` | — → neplatný | Obnovte a uložte pozici přetaženého toastu. |
| `onAvatars` | — → neplatný | Obnoví stránky, které zobrazují avatary. |
| `ensureAudio` | — → kontext | Vytvoří a obnoví sdílený `AudioContext` (odemknutý při prvním uživatelském gestu). |
| `playSound` , `stopSounds` | jméno, náhled → neplatné | Vygenerujte a zastavte narážky Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | síla → neplatné | Zahrajte si pětitónový budík a zvedněte upozornění na zamrznutí. |
| `placePanel` , `wirePanelDrag` | pozice → neplatné | Umístěte panel do okna a udělejte záhlaví přetahovatelné. |
| `open` , `close` , `toggle` | — → neplatný | Ovládejte zvuky panelu, dotazování, zaměření a nabídky. |
| `syncVolumeControls` | — → neplatný | Udržuje posuvník hlasitosti synchronizovaný s přehrávačem, když je panel otevřený. |

<a id="hotkeys-and-startup"></a>
## Klávesové zkratky a spuštění

| Funkce | Parametry / návrat | Co a jak to dělá |
|---|---|---|
| `isolateKeys` | — → neplatný | Registrováno na `document-start` ve fázi zachycení: události klávesnice, které přicházejí zevnitř panelu, se přestanou šířit do Kick (takže mezerník, F, M a šipky nikdy nespustí klávesové zkratky přehrávače) a Tab zůstane uvězněn uvnitř dialogu. |
| `setupHotkeys` | — → neplatný | Zvládá zachycení kláves pro opětovné svázání, Escape (modální, rozevírací, panel), klávesovou zkratku nabídky a klávesové zkratky akcí; komba s modifikátorem nebo F-klávesou fungují i ​​při psaní. |
| `init` | — → neplatný | Sestaví panel, nainstaluje klávesové zkratky a spustí `PlayerSync` ; chráněno proti dvojitému vstřiku. |

<a id="kick-page-dependencies"></a>
## Vykopněte závislosti na stránce

Scénář se opírá o aktuální označení Kick. Kdekoli je to možné, používá ikony, atributy a strukturu spíše než viditelný text, takže funguje ve všech jazycích rozhraní. Pokud je Kick změní, funkce porovnávání přestane fungovat (zbytek běží dál).

| Funkce | Co hledá |
|---|---|
| Kvalita | Viditelné `<video>` , `button[aria-haspopup="menu"]` a položky `[role="menuitemradio"]` . |
| Rozložení | Kontejner s `data-sidebar` a `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , tlačítko ikony `CollapseRight` uvnitř `#channel-chatroom` a tlačítko ikony `MessagesOutline` pro zobrazení chatu. |
| Oznámení o odměně | `video` , jehož zdroj obsahuje `reward-available` , nebo kartu `[role="group"]` obsahující video `daily-rewards` . |
| Nárok na odměnu | `button[aria-haspopup="dialog"][aria-controls]` (ikona dárku), dialog, který ovládá ( `data-state` ), aktivovaná tlačítka nároku s podřízeným prvkem `.contents` a tlačítko Zavřít s popiskem `.sr-only` . |
| Kapky | `#rewards-panel` uvádí položky s `[role="progressbar"][data-state="complete"]` a povoleným tlačítkem. |
| Avataři | prvky `img[alt]` , jejichž zdrojem je `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizace

Každý štítek, nápověda, chyba, dialog a upozornění prochází překladovým nástrojem pro 38 národních prostředí. Chybějící klíče se vrátí do angličtiny. Nový text rozhraní je přeložen do všech podporovaných jazyků spolu s funkcí, která jej přidává. Selektor jazyka zobrazuje vlajky a rodná jména; rozhraní se při prvním spuštění řídí jazykem prohlížeče a poté si pamatuje explicitní volbu.

<a id="safety-privacy-and-compatibility"></a>
## Bezpečnost, soukromí a kompatibilita

- Nastavení jsou před uložením dezinfikována; neplatné hodnoty se vrátí zpět na bezpečné výchozí hodnoty.
- Názvy kanálů, poznámky, text upozornění a diagnostický výstup jsou před vložením HTML escapovány.
- Vlastní ikona tlačítka je překódována z plátna a uložena jako datová URL pouze povoleného typu obrázku; nikdy neopustí prohlížeč.
- Shadow DOM udržuje styly scénáře izolované od Kick; události klávesnice z panelu jsou izolovány od Kickových klávesových zkratek.
- Automatické akce přeskakují vyloučené kanály, bezpečný režim a chybějící prvky hráče. Nárok na odměnu nikdy nestiskne stejné tlačítko dvakrát během jednoho běhu a čeká, dokud divák nezadá.
- Skript nevytváří žádné síťové požadavky; aktualizace pocházejí ze správce uživatelských skriptů nebo ze stránky Vydání.
- Stávající místní nastavení jsou zachována při přechodu z 1.1.0, 1.2.0 a 1.3.0.
