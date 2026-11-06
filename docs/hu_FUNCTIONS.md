<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · **Magyar** · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Funkcióreferencia

Hivatkozás a Kick Stream Tweaks-hez 1.3.1. Leírja, hogy az egyes funkcionális területek mit csinálnak, hogyan tárolódnak a beállítások, a Kick oldal mely részeitől függ a szkript, és hogyan működnek a felhasználói szkriptben szereplő egyes megnevezett függvények vagy metódusok. Tekintse meg a [tárolót](https://github.com/ebayybe/kick-stream-tweaks) és [a változásnaplót](../CHANGELOG/en_CHANGELOG.md) .

> A nevek megegyeznek a forrással. `void` azt jelenti, hogy egy funkció mellékhatásokon keresztül hat. Az `Object.method` néven írt metódus az objektumon él ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Tartalom

1. [Építészet](#architecture)
2. [Felhasználói magatartás](#user-facing-behavior)
3. [Beállítások referencia](#settings-reference)
4. [Alapvető segédprogramok](#core-utilities)
5. [Beállítások tárolása](#settings-storage)
6. [A lejátszó szinkronizálása ( `PlayerSync` )](#player-synchronization-playersync)
7. [Oldal extrák ( `Extras` )](#page-extras-extras)
8. [Interfész építőelemek](#interface-building-blocks)
9. [Beállítások oldalak ( `PAGES` )](#settings-pages-pages)
10. [Panelvezérlő ( `GUI` )](#panel-controller-gui)
11. [Gyorsbillentyűk és indítás](#hotkeys-and-startup)
12. [Kick oldalfüggőségek](#kick-page-dependencies)
13. [Lokalizáció](#localization)
14. [Biztonság, adatvédelem és kompatibilitás](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Építészet

A felhasználói parancsfájl egy önálló fájl, amely `document-start` `@grant none` karakterlánccal fut. Nincs építési lépése, és nem kér saját hálózati kérelmet.

| Réteg | Objektum/terület | Felelősség |
|---|---|---|
| Adatok | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Fordítások 38 nyelvre, lokalizált diagnosztikai üzenetek, jelző SVG-k és nyelvnevek. |
| Konfiguráció | `CONFIG` , `DEFAULTS` | Állandók (választók, újrapróbálkozási korlátok, előre beállított értékek, szakaszok) és alapértelmezett beállítások. |
| Tárolás | `sanitizeSettings` , `Store` , `persist` | Érvényesíti és elmenti a beállításokat `localStorage` ban; a memóriában tárolja a visszavonási veremet. |
| Játékos logika | `PlayerSync` | Megkeresi a videót, visszaállítja a minőséget, a hangerőt, a sebességet és a néma módot, figyeli a lefagyást. |
| Oldal segítők | `Extras` | Elrendezés gombok, jutalom igénylése, csatorna avatarok és a háttérben ütemező. |
| Interfész | `PAGES` , `GUI` , helpers | Shadow-DOM panel, értesítések, hangok, lebegő gyorsigénylő gomb, gyorsbillentyűk. |

Adatfolyam: a 1,5 másodperces `PlayerSync.sync` ciklus beolvassa az érvényes beállításokat (először csatornaprofil, majd globális), alkalmazza azokat a lejátszóra, és meghívja `Extras.tick` . A felhasználói műveletek `GUI` kezelőkön mennek keresztül, amelyek a beállításokat `persist` mellett frissítik, és csak az érintett részt küldik a lejátszónak ( `media` vagy `all` ).

<a id="user-facing-behavior"></a>
## Felhasználói viselkedés

| Terület | Viselkedés |
|---|---|
| A játékosok kitartása | Menti az élő/VOD minőséget, a hangerőt, a némítási állapotot, a néma módot és a sebességet, majd alkalmazza ezeket, ha új adatfolyamot észlel. Az oldal által önmagában végrehajtott változtatások (például a hangerő 50%-ra történő visszaállítása) visszaállnak; csak a néző saját műveletei frissítik a mentett értékeket. |
| Minőség | Kiválasztja a kívánt minőséget a lejátszó menüjében, visszaugrik a következő alacsonyabbra (vagy Auto), ha nem elérhető, és ismét bezárja a menüt. Csak a valódi felhasználói kattintások tanítják meg a szkriptet egy új „utoljára használt” minőségre. |
| Hangerő és néma lejátszás | A hangerő és a némítás adatfolyamonként visszaáll. A néma lejátszás nulla erősítéssel vezeti át a videót a Web Audio motoron, így a stream a háttérben, némítás nélkül folytatódik. |
| Csatornaprofilok | **A csatorna mentése** tárolja a nézett csatorna aktuális minőségét, hangerejét, sebességét és hangját. A profilok jegyzeteket, csoportokat, pin állapotot, avatart és az engedélyezett/kizárt jelzőket is tartalmazzák. |
| Előbeállítások | Mentse el a sávszélességet, a legjobb minőséget, a csendes megtekintést és a VOD-t egyetlen kattintással. |
| Panel | `F2` vagy egy egyéni gyorsbillentyű egy fix szélességű (680 px) panelt nyit meg csoportosított oldalsávval, kereséssel, Kick és Minimal stílusokkal, világos/sötét témákkal, 14 hangsúlyos színnel, valamint színválasztóval, kompakt elrendezéssel, háttérelmosással, szövegméretezéssel, nagy kontraszttal és animációvezérlőkkel. |
| Keresés | Ékezet-érzéketlen, megfelel a felület nyelvének és az angol neveknek, valamint megfelel a szakaszok vagy kártyák címeinek. A panelen begépelt billentyűleütések soha nem érik el Kick gyorsbillentyűit. |
| Csúszkák | Minden csúszka reagál a kattintásra, húzásra, a billentyűzet nyilaira és az egérgörgőre. |
| Hangok | Webes hangjelzések a menüműveletekhez, a beállítások módosításához, a minőség sikeréhez/kudarcához és a hangerő visszaállításához, mindegyik kapcsolóval, előnézettel és hangerővel. |
| Értesítések | Lokalizált üzenetek, amelyek áthúzhatók, méretezhetők, átláthatóvá tehetők, elnémíthatók (ne zavarjanak, csendes teljes képernyős) és rögzíthetők az előzményekben. |
| Fagyriasztó | Érzékeli az elakadt lejátszót vagy a fekete képernyőt, hangos riasztást ad (még egy rejtett lapon is, függetlenül a hangeffektusok kapcsolójától), és értesítést jelenít meg. |
| Jutalmak | Az opcionális automatikus igénylés megvárja a Kick jutalomértesítését (vagy ütemezetten fut), megnyitja a jutalmak ablakát, igényli a rendelkezésre állóakat és bezárja azt. Egy lebegő, húzható gyorskövetelés gomb ugyanezt egyetlen kattintással teszi meg. |
| Elrendezés | Elrejti a csevegést, és összecsukja a bal oldali menüt a panelről vagy a gyorsbillentyűkkel, opcionálisan megjegyzi a választást minden adatfolyamnál. |
| Eszközök | Elalvásidőzítő, fókusz (teljes képernyős) nézet, lejátszó újraszinkronizálása és biztonságos mód, amely szüneteltet minden automatikus változtatást. |
| Diagnosztika | Élő állapot, észlelt minőségek, videofelbontás, minőségellenőrzés, ütközésellenőrzés, műveletnapló és másolható jelentés. |
| Adatok | Beállítások exportálása/importálása, visszavonás, visszaállítás visszaállítás után, mentett csatornák biztonsági mentése/visszaállítása. |
| Adatvédelem | A beállítások, profilok, naplók és előzmények a böngésző tárhelyén maradnak. Semmit nem küldenek sehova. |

<a id="settings-reference"></a>
## Beállítások hivatkozás

Az összes értéket `sanitizeSettings` ellenőrzi; minden érvénytelen visszaáll az alapértelmezettre. A tartományok érvényesülnek.

### Játékos

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `autoQualityEnabled` | logikai | `true` | Automatikusan alkalmazza a kívánt minőséget. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Élő közvetítésekhez és VOD-okhoz alkalmazható minőség. `auto` azt jelenti, hogy "emlékezz az utolsó választásomra". |
| `lastLiveQuality` , `lastVodQuality` | ugyanaz | `auto` | Az utolsó minőség, amelyet a néző kézzel választott. |
| `qualityFallback` | `lower` , `auto` | `lower` | Mi a teendő, ha nem a kívánt minőséget kínálják. |
| `autoVolumeEnabled` | logikai | `true` | Állítsa vissza és védje meg a mentett kötetet. |
| `volume` | 0–1 | `1` | Mentett kötet. |
| `muted` | logikai | `false` | Mentett némítási állapot. |
| `silent` | logikai | `false` | Csendes lejátszás (nulla erősítésű hanggrafikon, a lejátszó nincs némítva). |
| `playbackRate` | 0,25–2,5 | `1` | Mentett sebesség; `1` soha nem kényszerül. |
| `warnLoudVolume` , `loudVolumeThreshold` | logikai érték; 60–100, 5. lépés | `true` ; `85` | Nagy mennyiségű figyelmeztetés. |
| `safeMode` | logikai | `false` | Minden automatikus változtatás szüneteltetése. |
| `channelProfiles` | tárgy, legfeljebb 200 | `{}` | Csatornánkénti profilok (lásd alább). |

Csatornaprofil mezői: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (csak `https://…kick.com/images/user/…` URL-ek), `note` (240 karakter), `group` (40 karakter), `lastUsed` `updatedAt` .

### Értesítések és hangok

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `notificationsEnabled` | logikai | `true` | Eredményértesítések megjelenítése. |
| `doNotDisturb` , `quietFullscreen` | logikai | `false` , `true` | Értesítések és hangok letiltása, vagy csak teljes képernyőn. |
| `notificationScale` | 0,8–1,4 | `1` | Értesítés mérete. |
| `notificationDuration` | 1500–12000 ms, 500. lépés | `3500` | Mennyi ideig marad az értesítés. |
| `notificationOpacity` | 0,35–1 | `0.95` | Az értesítések átláthatósága. |
| `notificationShowIcon` | logikai | `true` | Az állapotikon megjelenítése. |
| `notificationPosition` | `{x, y}` vagy `null` | `null` | Elhúzott pozíció. |
| `notificationHistoryEnabled` , `notificationHistory` | logikai érték; legfeljebb 30 bejegyzés | `true` ; `[]` | Az értesítések története. |
| `soundEffectsEnabled` , `soundVolume` | logikai érték; 0–1 | `false` ; `0.35` | Főkapcsoló és hangerő. |
| `soundEvents` , `soundEventVolumes` | eseményenként: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | minden bekapcsolva; `0.35` | Eseményenkénti kapcsoló és hangerő. |

### Megjelenés, mozgás és parancsikonok

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Színes téma. |
| `panelStyle` | `kick` , `minimal` | `kick` | A panel vizuális stílusa. |
| `accentColor` | `#rrggbb` | `#53fc18` | Kiemelt szín. |
| `compactMode` , `highContrast` | logikai | `false` | Sűrűség és kontraszt. |
| `backdropBlur` | 0–12 px | `6` | Háttér elmosódás a panel mögött (mindkét stílusban működik). |
| `textScale` | 0,9–1,3 | `1` | Szöveg mérete. |
| `language` , `languageChosen` | területi kód; logikai | böngésző nyelve; `false` | Az interfész a böngésző nyelvét követi, amíg egy nyelvet ki nem választanak, majd a választást megjegyzik. |
| `panelPosition` | `{x, y}` vagy `null` | `null` | Elhúzott panel helyzete. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animáció sebessége. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Panel nyitás/zárás hatása. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Lebegő hatás. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logó/jelző animáció. |
| `iconAnimations` | logikai | `true` | Az oldalsáv animálása, visszaállítása és súgóikonok. |
| `hotkey` | kombinált karakterlánc | `F2` | Kinyitja vagy bezárja a panelt. |
| `actionHotkeys` | kombinált húrok | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Értesítések váltása, fókusznézet, minőség visszaállítása, hangerő visszaállítása, csevegés váltása, bal oldali menü váltása. |

A billentyűkombinációk karakterláncokként, például `Alt+Q` vannak tárolva, és a fizikai billentyűvel párosulnak, így bármilyen billentyűzetkiosztáson működnek. Az objektum alakú gyorsbillentyűvel rendelkező régebbi verziók beállításai automatikusan konvertálódnak. A panel szélessége 680 px (az ablak méretére korlátozva); a korábbi szélességbeállítást figyelmen kívül hagyja.

### Eszközök

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `autoRecoverStall` | logikai | `false` | Próbáld ki `play()` t, ha lefagyást észlel. |
| `freezeAlertEnabled` , `freezeSound` | logikai | `true` | Az értesítési és riasztási hang lefagyása. |
| `freezeSeconds` | 5–60, 5. lépés | `10` | Másodpercekkel nincs előrelépés a riasztás előtt. |
| `layoutHideChat` , `layoutCollapseSidebar` | logikai | `false` | Megjegyzett elrendezés, oldalanként egyszer alkalmazva. |
| `autoClaimRewards` | logikai | `false` | Automatikus jutalomkövetelés engedélyezése. |
| `claimMode` | `notify` , `interval` | `notify` | Igényeljen, amikor a Kick megjeleníti az értesítést, vagy az ütemezés szerint. |
| `claimDelaySec` | 0–120, 5. lépés | `5` | Várja meg az értesítés megjelenését (értesítési mód). |
| `claimIntervalMin` | 5–120, 5. lépés | `10` | Az ellenőrzések közötti percek (ütemezett mód). |

### Gyors igénylés gomb

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `claimWidget` | logikai | `false` | Mutasd meg a lebegő gombot. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Gomb kialakítás. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Beépített ikon, vagy a felhasználó saját képe. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , legfeljebb 90 000 karakter | üres | A feltöltött kép újrakódolt másolata. Minden mást elutasítanak. |
| `claimWidgetImageFill` | logikai | `false` | Hagyja, hogy egy egyéni kép töltse ki az egész gombot (a tabletta kialakítása nem használja). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Gomb mérete. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Gomb átlátszatlansága (teljes átlátszatlanság, amíg jutalom elérhető). |
| `claimWidgetAutoHide` | logikai | `false` | Csak akkor jelenítse meg a gombot, ha jutalom elérhető. |
| `claimWidgetPos` | `{x, y}` vagy `null` | `null` | Elhúzott pozíció. |

### Diagnosztika és állapot

| Kulcs | Típus/tartomány | Alapértelmezett | Jelentése |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | logikai érték; legfeljebb 60 bejegyzés | `true` ; `[]` | Műveletnapló. |
| `activeSection` | szakasz azonosítója | `playback` | Utoljára megnyitott oldal. |
| `resetBackup` | beállítások objektum | `null` | Pillanatkép visszaállítás vagy importálás előtt. |

<a id="core-utilities"></a>
## Alapvető segédprogramok

| Funkció | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `detectLanguage` | — → területi beállítás | Sétál `navigator.languages` ​​oldalon, leképezi a regionális változatokat ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ), és visszaadja az első támogatott területi beállítást, vagy `en` . |
| `dictFor` | lang → szótár | Visszaadja a nyelvi beállítás fordítási tábláját, visszatérve az alapnyelvre, majd az angolra. |
| `t` / `T` | lang, key, vars → string | Felold egy kulcsot `{placeholder}` helyettesítéssel; `T` az aktuális nyelvet használja. |
| `diagText` | index, minőség → string | Az egyik lokalizált diagnosztikai mondatot adja vissza. |
| `log` | …args → semmis | Konzolnaplózás a szkript előtagjával. |
| `clamp` , `sleep` , `esc` | érték → érték | Tartománykorlátozás, ígéret alapú késleltetés és HTML kilépés. |
| `normalizeQuality` | szöveg → karakterlánc | Kisbetűsre csökkenti a minőségi címkét és eltávolítja a szóközt. |
| `debounce` | fn, várjon → függvény | Utolsó visszapattanás `flush` módszerrel. |
| `onLocationChange` | visszahívás → érvénytelen | Érzékeli az egyoldalas navigációt `pushState` / `replaceState` tördelésével, `popstate` meghallgatásával és másodpercenként egyszeri lekérdezéssel. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | esemény → string/boolean | Építsen és hasonlítson össze kulcskombinációkat a fizikai kulcskódból. |
| `mkPointer` | típus, extra → esemény | Létrehoz egy `PointerEvent` (vagy egy `MouseEvent` ha nem érhető el), amely a Kick ARIA menüinek irányítására szolgál. |
| `waitFor` | szonda, időtúllépés, lépés → érték/null | Lekérdezés egészen addig, amíg a próba értéket nem ad vissza, vagy az időtúllépés véget nem ér. |
| `imageToDataUrl` | kép → string | A képet négyzet alakú vászonra méretezi (az arányok megtartása, `willReadFrequently` ), 128, 96 és 64 képpontot próbál ki, és egy 70 000 karakternél nem hosszabb PNG adat URL-t ad vissza. |

<a id="settings-storage"></a>
## Beállítások tárhely

| Funkció | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `sanitizeProfiles` | tárgy → tárgy | Legfeljebb 200 profilt tart meg érvényes kulccsal, és minden mezőt rögzít; az avatarnak egy Kick kép URL-jének kell lennie. |
| `sanitizeSettings` | objektum, withBackup → object | Érvényesíti az összes beállítást (típusok, tartományok, engedélyezett értékek), átállítja az 1,1–1,3 beállításokat (örökölt minőség, gyorsbillentyű, animáció és szakaszbillentyűk), és alkalmazza a nyelvi szabályt. |
| `legacyHotkey` | érték → karakterlánc | Tárgy alakú gyorsbillentyűket kombinált karakterláncsá alakít át. |
| `Store.load` / `Store.save` | — / beállítások → beállítások/érvénytelen | Olvassa el és írja be a megtisztított objektumot `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | javítás, `{undo}` → érvénytelen | Egyesít egy javítást, fertőtlenít, ment egy rövid visszapattanással, és opcionálisan leküld egy visszavonási pillanatképet (csak a memóriában tárolva, legfeljebb 15). |
| `storage` figyelő | esemény → érvénytelen | Újratölti a beállításokat, ha egy másik Kick lap megváltoztatja azokat, így a lapok soha nem írják felül egymást. |

<a id="player-synchronization-playersync"></a>
## Játékos szinkronizálás ( `PlayerSync` )

### Csatorna és profil segítői

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `isVod` | — → logikai | VOD oldalt észlel az URL-ből. |
| `channelKey` | — → húr | Stabil `channel:slug` key (vagy `vod:id` , `kick:home` ) létrehozása, az eredmény gyorsítótárazása három másodpercig. A VOD oldalakon a lejátszóhoz legközelebbi csatornalinket használják. |
| `channelSlug` | — → húr | Egy csatornakulcs slug részét adja vissza. |
| `profile` | gomb → objektum/null | Beolvassa a mentett profilt. |
| `profileActive` | — → objektum/null | Csak akkor adja vissza az aktuális profilt, ha az engedélyezve van, és nincs kizárva. |
| `isExcluded` | — → logikai | Ellenőrzi, hogy az automatizálás le van-e tiltva ennél a csatornánál. |
| `updateProfile` | folt, kulcs → érvénytelen | Létrehoz vagy egyesít egy profilt, és `updatedAt` bélyegzőt látja el. |
| `saveCurrentChannel` | — → objektum/null | Engedélyezett profilként tárolja a néző aktuális minőségét, hangerejét, némítását, sebességét és néma állapotát, és megkeresi az oldalt a csatorna avatarja után. |
| `effective` | — → tárgy | Feloldja a hangerőt, némítást, némaságot, sebességet és élő/VOD minőséget az aktív profilból vagy a globális beállításokból. |
| `setStatus` | állapot, eredmény → érvénytelen | Frissíti a fejlécben és a diagnosztikában megjelenő állapot- és utolsó eredménykódokat. |

### Kick játékosának megtalálása és vezetése

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `findMainVideo` | — → video/null | Kiválasztja a legnagyobb látható `<video>` . |
| `streamKey` | — → húr | A minőség alkalmazásához használt oldal elérési útját adja vissza folyamonként egyszer. |
| `isAccountButton` | gomb → logikai | Elutasítja a fejléc-, avatár- és fiókgombokat. |
| `findSettingsButton` | videó → gomb/null | Címke vagy a videó jobb alsó sarkához való közelség alapján találja meg a lejátszó fogaskerék gombját. |
| `revealControls` | videó → érvénytelen | A küldemények az eseményeket lebegtetik, így rejtett vezérlők jelennek meg. |
| `simulateClick` | elem → semmis | Elküldi a teljes mutató-eseménysorozatot, amelyre a Kick menüinek szüksége van. |
| `menuItems` | — → elem[] | Felsorolja a látható `menuitemradio` rádióbejegyzéseket. |
| `openQualityMenu` | — → gomb/null | Megnyitja a fogaskerék menüt, minőségi bejegyzésbe lép, amikor megjelenik egy legfelső szintű menü, és várja a lehetőségeket. |
| `closeMenu` | gomb → Ígéret | Csak akkor zárja be a menüt, ha az továbbra is nyitva van (egy vak második kattintás újra megnyithatja), Escape-visszaállítással. |
| `readMenu` | — → elem[] | Rögzíti a felkínált és az ellenőrzött tulajdonságokat. |
| `scanQualities` | — → Ígéret<boolean> | Megnyitja a menüt, rögzíti az elérhető minőségeket és bezárja (a diagnosztika használja). |
| `activate` | tétel → Ígéret | Rákattint az egyik lehetőségre, és megvárja, amíg be van jelölve. |
| `selectQuality` | kívánt, tartalék → Ígéret | Kiválasztja a kívánt minőséget, egyébként a következő alacsonyabbat, vagy Auto. |
| `desiredQuality` | — → húr | Kiválasztja az alkalmazni kívánt minőséget a profilból, a preferenciából vagy az utolsó manuális választásból. |
| `applyQualityOnce` | streamKey → Promise | Adatfolyamonként egyszer alkalmazza a kívánt minőséget, bezárja a menüt és értesít a sikerről vagy a kudarcról. |
| `watchManualQuality` | — → semmis | Csak a valódi (megbízható) kattintásokból tanul meg egy új „utoljára használt” minőséget, így az automatikus kattintások és a tartalékok soha nem írják felül a mentett értékeket. |

### Hangerő, néma üzemmód, sebesség és felügyelet

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `applyVolume` | videó, csendes → érvénytelen | Megírja a tényleges hangerőt és a némítási állapotot (a szkript saját változásaként jelölve). |
| `trackInput` | — → semmis | Rögzíti az utolsó megbízható mutató, kerék, érintés vagy billentyűzet bevitelének idejét. |
| `reassertVolume` | videó → érvénytelen | Visszaállítja a mentett kötetet, ha az oldal felhasználói beavatkozás nélkül megváltoztatta (a sebesség tíz másodpercenként nyolc visszaállításra korlátozódik). |
| `watchVolume` | videó → érvénytelen | Figyeli `volumechange` : a felhasználó által vezérelt módosítások mentésre kerülnek, az oldalvezérelt módosítások visszaállításra kerülnek. |
| `checkLoud` | hangerő, néma → érvénytelen | Egyszer figyelmeztet, ha a hangerő átlépi a küszöböt. |
| `buildGraph` | videó → grafikon/null | A videót egy erősítési csomóponton keresztül `AudioContext` köti; jelent, ha a webhely nem engedélyezi. |
| `applySilent` | videó → érvénytelen | Az erősítést 0-ra állítja néma lejátszáshoz vagy vissza 1-re, szükség esetén folytatva a kontextust. |
| `applyRate` | videó, erő → érvénytelen | Beállítja a mentett sebességet; `1` nem erőltetik, hacsak a néző nem éppen azt választotta, így tiszteletben tartják Kick saját élvonalbeli felzárkóztatását. |
| `applyMedia` | videó, `{rate}` → érvénytelen | Újra alkalmazza a hangerőt, a néma módot és opcionálisan a sebességet a minőség érintése nélkül. |
| `monitorFreeze` | videó → érvénytelen | Érzékeli az elakadt lejátszót (elakadt idő) vagy egy fekete képernyőt (dekódolt képkockák nélkül mozgó idő), és elindítja a riasztást és az opcionális helyreállítást. Rejtett lapokon működik. |

### Hurok és életciklus

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `sync` | — → Ígéret | A fő hurok: lefagy a monitorok, leköti a hallgatókat, alkalmaz néma módot, hangerőt, sebességet és minőséget, tiszteletben tartja a biztonságos módot és a kizárásokat, majd meghívja `Extras.tick` . |
| `resync` | — → Ígéret | Új átlépést kényszerít ki (előre beállított értékek, gyors műveletek és minőségi változások használják). |
| `init` | — → semmis | Elindítja az első szinkronizálást, a navigációs figyelőt és a 1,5 másodperces intervallumot. |

<a id="page-extras-extras"></a>
## Oldal extrák ( `Extras` )

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `root` , `layoutState` | — → elem / `{chat, sidebar}` | Olvassa el a Kick elrendezési állapotát `data-chat` és az `data-sidebar` . |
| `isDesktop` | — → logikai | Az elrendezés automatizálása csak az asztali szélességben fut. |
| `click` | elem → logikai | Kattintások `PlayerSync.simulateClick` segítségével. |
| `chatHideButton` , `chatShowButton` | — → gomb/null | Keresse meg az összecsukás gombot a csevegőszobán belül és a "csevegés megjelenítése" gombot (ikon szerint, ne nyelv szerint). |
| `setChat` , `setSidebar` | mutat → logikai | Állítsa a chat vagy a bal oldali menüt a kívánt állapotba a Kick saját gombjainak megnyomásával. |
| `applyLayout` | — → semmis | Oldalanként egyszer alkalmazza a megjegyzett elrendezést, soha nem küzd a kézi változtatásokkal. |
| `isTyping` | — → logikai | Igaz, amíg a néző egy mezőbe gépel; automatikus követelések várnak. |
| `rewardTrigger` , `popoverCard` | — → gomb/null | Keresse meg az ajándék gombot és a jutalom felbukkanó kártyát. |
| `rewardAvailable` | — → logikai | Érzékeli Kick saját „elérhető jutalom” jelét (az animált cselekvésre ösztönzést). |
| `isEnabled` | gomb → logikai | Látható és nem letiltott. |
| `claimDrops` | — → Ígéret<number> | Megnyomja az engedélyezett követelés gombokat a teljesített dobásokért a jutalompanelen. |
| `claimDaily` | trigger → Ígéret<number> | Megnyitja a jutalom ablakot, megnyomja az összes engedélyezett követelés gombot egyszer (soha ugyanazt a gombot kétszer), majd bezárja az ablakot. |
| `claimRewards` | `{manual}` → Ígéret<number> | Teljes követelést futtat, jelenti az eredményt és lejátszik egy hangot; A kézi futtatások figyelmen kívül hagyják a gépelést, és jelentenek, ha nincs semmi követelés. |
| `normName` | szöveg → karakterlánc | Normalizálja a megfelelő neveket ( `_` és szóközt `-` ). |
| `findAvatar` | csiga → húr | Az oldalon látható csatornaavatart adja vissza (a csatorna mentése előtt használatos). |
| `scanAvatars` | — → semmis | Avatarokat tárol azokhoz a mentett csatornákhoz, amelyekből hiányzik. |
| `tick` | streamKey → void | `sync` hívott ütemező: alkalmazza az elrendezést, megvizsgálja az avatarokat, várja a jutalomértesítést (értesítési mód, késleltetéssel és kétperces lehűléssel), vagy ellenőrzi a kiválasztott intervallumot, és lekérdezi a csepp panelt. |

<a id="interface-building-blocks"></a>
## Interfész építőelemek

| Funkció | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `I` | név → svg | Soron belüli körvonal ikon. |
| `fmtValue` | formátum, nyers → string | Formázza a csúszka értékeket (százalék, pixel, másodperc). |
| `normSearch` , `englishOf` , `searchText` | szöveg → karakterlánc | Ékezetet nem érzékeny keresőszöveg, amely tartalmazza a lefordított címke angol nevét. |
| `row` | kulcs, címke, vezérlőelem, beállítások → html | Beállító sor; alapértelmezés szerint halmozott, csak a kapcsolókhoz beépített, opcionális súgókapcsolóval. |
| `sw` , `toggleRow` | … → html | Kapcsolóvezérlés és kész kapcsolósor. |
| `chip` , `seg` , `qualityChips` | … → html | Chipek, szegmentált vezérlők és minőségi rács. |
| `range` | attr, kulcs, beállítások → html | Csúszka kitöltési sávval és élő értékkel. |
| `card` , `btn` , `ib` | … → html | Kártya, szöveg gomb és ikon gomb. |
| `timeStr` | időbélyeg → karakterlánc | Lokalizált óraidő. |
| `setPref` | kulcs, érték → érvénytelen | Beír egy játékos preferenciát az aktív csatornaprofilba vagy a globális beállításokba. |
| `fxBtn` | kulcs, érték, címke, on → html | Hatásválasztó csempe kis előnézeti jellel. |
| `avatarHtml` | név, url → html | Avatar levélvisszaeséssel; a sikertelen kép eltávolításra kerül. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → érték | Készítse el a gyorskövetelés gomb jelölését mind az élő gombhoz, mind a beállítások előnézetéhez. |

<a id="settings-pages-pages"></a>
## Beállítások oldalak ( `PAGES` )

| Oldal | Tartalom |
|---|---|
| `playback` | Mentse el ezt a csatornát, előre beállított értékek, minőség (automatikus alkalmazás, élő, VOD, tartalék), hangerő (automatikus alkalmazás, csúszka, némítás, néma lejátszás, hangos figyelmeztetés) és sebesség. |
| `channels` | Működési lépések, az aktuális csatorna a **Csatorna mentése** gombbal, a kapcsolók és a szerkesztő szüneteltetése/kizárása, majd a mentett csatornalista (keresés, rendezés, rögzítési szűrő, csoportok, Szerkesztés/Kész, törlés) biztonsági mentéssel és visszaállítással. |
| `tools` | Elalváskapcsoló, oldalelrendezés, jutalmak (automatikus igénylés, mód, késleltetés vagy intervallum, Igénylés most), gyors igénylés gombbeállítások élő előnézettel, lefagyási riasztás és gyors műveletek. |
| `notifications` | Kapcsolók, méret, időtartam, átlátszatlanság, előnézet, pozíció visszaállítása és előzmények. |
| `sounds` | Főkapcsoló és hangerő, eseményenkénti kapcsolók, hangerő és előnézet. |
| `appearance` | Téma, stílus, kiemelő színek, sűrűség, kontraszt, szövegméret, elmosódás, középre igazítás és nyelv. |
| `motion` | Élő előnézet, előbeállítások és kiválasztók a nyitott effektusokhoz, a lebegési effektusokhoz, a jelző-, a sebesség- és az ikonanimációkhoz. |
| `shortcuts` | Menü gyorsbillentyűk és műveleti gyorsbillentyűk újrakötéssel. |
| `diagnostics` | Állapot, vizsgálat, jelentés, minőség- és ütközési ellenőrzés, csökkentett mód és műveletnapló. |
| `about` . | Verzió, hivatkozások, exportálás/importálás, visszavonás, visszaállítás és visszaállítás. |

<a id="panel-controller-gui"></a>
## Panelvezérlő ( `GUI` )

### Építés és renderelés

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `build` | — → semmis | Létrehozza a shadow-DOM gazdagépet, panelt, pirítóst és élő régiót, majd összeköti az eseményeket. |
| `applyLook` | — → semmis | Alkalmazza a témát, a stílust, az ékezetet, az elmosódást, a szöveg léptékét, az effektusokat, a nyelvi attribútumokat és a pirítós beállításokat attribútumként és CSS-változóként. |
| `renderChrome` | — → semmis | Megjeleníti a címet, a keresési helyőrzőt, a szünet gombot, a lábléc tippjét és a gyorskövetelés gombot. |
| `renderNav` | — → semmis | Rendereli a csoportosított oldalsávot. |
| `renderPage` | opciók → érvénytelen | Megjeleníti az aktív oldalt (vagy az összes oldalt keresés közben), megőrzi a görgetést és a billentyűzet fókuszát. |
| `filterRows` | — → semmis | A keresési szűrőt alkalmazza a sorokra, kártyákra és oldalakra. |
| `channelEditor` | kulcs, profil → html | Szerkesztő egy csatornaprofilhoz. |
| `refreshAll` , `onExternalChange` | — → semmis | Mindent újra rendereljen az alaphelyzetbe állítás, az importálás, a visszavonás vagy egy másik lapon történt módosítás után. |

### Események és beállítások módosításai

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `wire` | — → semmis | Hozzákapcsolja a delegált kattintás-, bevitel-, változtatás-, görgő- és görgetéskezelőket és a panel húzását. |
| `onClick` , `onInput` , `onChange` | esemény → érvénytelen | Kattintások, csúszkamozgatások és szövegszerkesztések küldése a beállításokhoz, profilokhoz vagy műveletekhez. |
| `applyRange` | kulcs, érték → érvénytelen | Csúszkaértéket alkalmaz (hangerő, elmosódás, átlátszatlanság, időtartamok…). |
| `setSetting` , `setChannel` | kulcs/patch → érvénytelen | Mentsen el egy beállítást vagy egy profilmódosítást, és nyomja meg az érintett részt a lejátszóhoz. |
| `pushToPlayer` | hatókör, kulcs → érvénytelen | `media` újra alkalmazza a hangerőt, a néma módot és a sebességet; `all` újra alkalmazza a minőséget is. A hangerő, a némítás, a néma mód és a sebesség soha nem nyitja meg újra a minőség menüt. |
| `act` | név, elem → Ígéret | Elnevezett műveleteket futtat: előre beállított beállítások, csatornák mentése és eltávolítása, biztonsági mentés, importálás/exportálás, követelések, elalvási időzítő, parancsikonok, diagnosztika és egyebek. |
| `resetSection` | azonosító → érvénytelen | Visszaállítja az egyik szakasz alapértelmezett beállításait. |
| `restoreVolume` | — → semmis | Újra alkalmazza a mentett kötetet. |
| `toggleLayout` | amely → semmis | Elrejti vagy megjeleníti a csevegést vagy a bal oldali menüt, és megjegyzi a választást. |
| `confirm` , `closeModal` | üzenet, opciók / eredmény → Promise/void | A panelen belüli megerősítő párbeszédpanel (minden böngészőben azonos). |
| `download` , `pickFile` , `pickImage` | … → érvénytelen | Mentse a JSON-t, olvassa el a JSON-t, és válasszon egy képet a gyorskövetelés gombhoz. |
| `startCapture` , `finishCapture` | id / kombó → érvénytelen | Gyorsbillentyűk újrakötése a duplikációk elutasításával. |
| `replayMock` | — → semmis | Újrajátssza a nyitott effektust az animáció előnézetében. |

### Eszközök és diagnosztika

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | perc / — → érvénytelen | Indítsa el, törölje és jelenítse meg az elalvási időzítőt (a végén szünetelteti a videót). |
| `toggleFocusView` | — → Ígéret | Teljes képernyőre lép be vagy kilép a lejátszó tárolójából. |
| `statusText` , `resultText` , `syncDiagnostics` | — → karakterlánc/üres | A fejléc és a diagnosztikai oldal lokalizált állapota. |
| `record` | üzenet, szint → érvénytelen | Időbélyegzett bejegyzést ad a műveletnaplóhoz. |
| `copyDiagnostics` | — → Ígéret | Rövid jelentést másol (verzió, állapot, minőség, oldaltípus, felhasználói ügynök). |
| `checkQuality` , `checkConflicts` | — → Ígéret/érvénytelen | Győződjön meg arról, hogy az előnyben részesített minőséget kínálja, és sorolja fel az egymással ellentétes beállításokat. |

### Gyors igénylés gomb

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `renderClaimWidget` | — → semmis | Létrehozza, frissíti vagy eltávolítja a lebegő gombot, és elindítja az egy másodperces állapotlekérdezést. |
| `syncClaimWidget` | — → semmis | Megjeleníti az „elérhető jutalom” gyűrűt és pontot, a foglalt állapotot és az automatikus elrejtés szabályát. |
| `placeClaimWidget` | — → semmis | Helyezze el a gombot, és rögzítse az ablakhoz. |
| `wireClaimWidget` | elem → semmis | Húzás öt képpontos küszöbértékkel (a húzás soha nem számít kattintásnak), pozíciómentés és a manuális követelést futtató kattintás. |

### Értesítések, hang és panel viselkedése

| Módszer | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `notify` | üzenet, kedves, időtartam, erő → érvénytelen | Pirítóst mutat (hacsak nincs elnyomva), rögzíti az előzményeket és bemondja a szöveget egy élő régióban. |
| `notifyQuality` | alkalmazott, minőség → érvénytelen | Lejátssza az eredmény hangját, naplózza és lokalizált értesítést jelenít meg. |
| `initToastPosition` , `wireToastDrag` | — → semmis | Állítsa vissza és mentse el a húzott pirítós pozíciót. |
| `onAvatars` | — → semmis | Frissíti az avatarokat megjelenítő oldalakat. |
| `ensureAudio` | — → kontextus | Létrehozza és folytatja a megosztott `AudioContext` (az első felhasználói kézmozdulattal feloldva). |
| `playSound` , `stopSounds` | név, előnézet → érvénytelen | A Web Audio jelzések létrehozása és leállítása. |
| `playFreezeAlarm` , `alertFrozen` | erő → semmis | Játssza le az öthangos riasztást, és emelje fel a lefagyásértesítést. |
| `placePanel` , `wirePanelDrag` | pozíció → semmis | Helyezze a panelt az ablakba, és tegye húzhatóvá a fejlécet. |
| `open` , `close` , `toggle` | — → semmis | Vezérelje a panelt, a lekérdezést, a fókuszt és a menü hangjait. |
| `syncVolumeControls` | — → semmis | Szinkronban tartja a hangerő-csúszkát a lejátszóval, amíg a panel nyitva van. |

<a id="hotkeys-and-startup"></a>
## Gyorsbillentyűk és indítás

| Funkció | Paraméterek / visszatérés | Mit és hogyan csinál |
|---|---|---|
| `isolateKeys` | — → semmis | A rögzítési fázisban a `document-start` regisztrálva: a panelen belülről érkező billentyűzetesemények leállnak továbbterjedni a Kick-re (így a Space, F, M és a nyilak soha nem váltják ki a játékos gyorsbillentyűit), és a Tab beszorul a párbeszédpanelbe. |
| `setupHotkeys` | — → semmis | Kezeli a billentyűk rögzítését az újrakötéshez, az Escape-et (modális, legördülő menü, panel), a menü gyorsbillentyűit és a műveleti gyorsbillentyűket; A módosítóval vagy F-billentyűvel ellátott kombók gépelés közben is működnek. |
| `init` | — → semmis | Összeállítja a panelt, telepíti a gyorsbillentyűket és elindítja `PlayerSync` ; kettős befecskendezés ellen védett. |

<a id="kick-page-dependencies"></a>
## Kick oldalfüggőségek

A szkript a Kick aktuális jelölésére támaszkodik. Ahol lehetséges, látható szöveg helyett ikonokat, attribútumokat és szerkezetet használ, így minden felületi nyelven tovább működik. Ha a Kick megváltoztatja ezeket, a megfelelő funkció leáll (a többi tovább fut).

| Funkció | Mit keres |
|---|---|
| Minőség | Egy látható `<video>` , a lejátszó `button[aria-haspopup="menu"]` és `[role="menuitemradio"]` bejegyzése. |
| Elrendezés | Egy tároló `data-sidebar` és `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , egy `CollapseRight` ikongombbal `#channel-chatroom` belsejében és egy `MessagesOutline` ikongombbal a csevegés megjelenítéséhez. |
| Jutalomértesítés | Olyan `video` , amelynek forrása `reward-available` tartalmazza, vagy egy `[role="group"]` kártya, amely `daily-rewards` tartalmaz. |
| Jutalom igénylése | Egy `button[aria-haspopup="dialog"][aria-controls]` (ajándék ikon), az általa vezérelt párbeszédpanel ( `data-state` ), engedélyezett követelés gombok `.contents` gyermekkel és bezárás gomb `.sr-only` címkével. |
| Cseppek | `#rewards-panel` listaelemek `[role="progressbar"][data-state="complete"]` és egy engedélyezett gombbal. |
| Avatarok | `img[alt]` elemek, amelyek forrása a `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizálás

Minden címke, súgóüzenet, hiba, párbeszédpanel és értesítés 38 nyelven megy át a fordításfeloldón. A hiányzó kulcsok angol nyelvűek. Az új felület szövegét a rendszer az összes támogatott nyelvre lefordítja az azt hozzáadó funkcióval együtt. A nyelvválasztó zászlókat és natív neveket jelenít meg; az interfész első futtatáskor követi a böngésző nyelvét, és utána megjegyzi az explicit választást.

<a id="safety-privacy-and-compatibility"></a>
## Biztonság, adatvédelem és kompatibilitás

- Tárolás előtt a beállításokat megtisztítják; az érvénytelen értékek visszaállnak a biztonságos alapértelmezett értékekre.
- A csatornák nevei, megjegyzései, értesítési szövege és diagnosztikai kimenete a HTML-beillesztés előtt kihagyásra kerül.
- Egy egyéni gombikon újrakódolása a vászonról, és csak engedélyezett képtípusú adat URL-ként kerül tárolásra; soha nem hagyja el a böngészőt.
- A Shadow DOM elszigeteli a szkript stílusait a Kicktől; A panel billentyűzetes eseményei el vannak különítve a Kick gyorsbillentyűitől.
- Az automatikus műveletek kihagyják a kizárt csatornákat, a csökkentett módot és a hiányzó lejátszóelemeket. A jutalom igénylése soha nem nyomja meg kétszer ugyanazt a gombot egy futás során, és megvárja, amíg a néző gépel.
- A szkript nem küld hálózati kéréseket; a frissítések a felhasználói parancsfájl-kezelőből vagy a Kiadások oldalról származnak.
- A meglévő helyi beállítások megmaradnak, amikor 1.1.0-ról, 1.2.0-ról és 1.3.0-ról váltunk.
