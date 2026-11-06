<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · **Hrvatski** · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream podešavanja — Referenca funkcija

Referenca za Kick Stream podešavanja 1.3.1. Opisuje što radi svako funkcionalno područje, kako se pohranjuju postavke, o kojim dijelovima Kickove stranice ovisi skripta i kako radi svaka imenovana funkcija ili metoda u korisničkoj skripti. Pogledajte [spremište](https://github.com/ebayybe/kick-stream-tweaks) i [dnevnik promjena](../CHANGELOG/en_CHANGELOG.md) .

> Imena odgovaraju izvoru. `void` znači da funkcija djeluje kroz nuspojave. Metoda napisana kao `Object.method` živi na tom objektu ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Sadržaj

1. [Arhitektura](#architecture)
2. [Ponašanje prema korisniku](#user-facing-behavior)
3. [Referenca postavki](#settings-reference)
4. [Osnovni uslužni programi](#core-utilities)
5. [Pohranjivanje postavki](#settings-storage)
6. [Sinkronizacija playera ( `PlayerSync` )](#player-synchronization-playersync)
7. [Dodaci stranici ( `Extras` )](#page-extras-extras)
8. [Sastavni dijelovi sučelja](#interface-building-blocks)
9. [Stranice postavki ( `PAGES` )](#settings-pages-pages)
10. [Upravljačka ploča ( `GUI` )](#panel-controller-gui)
11. [Prečice i pokretanje](#hotkeys-and-startup)
12. [Izbacite ovisnosti stranice](#kick-page-dependencies)
13. [Lokalizacija](#localization)
14. [Sigurnost, privatnost i kompatibilnost](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arhitektura

Userscript je jedna samostalna datoteka koja se pokreće na `document-start` s `@grant none` . Nema korak izgradnje i ne postavlja vlastite mrežne zahtjeve.

| Sloj | Objekt / područje | Odgovornost |
|---|---|---|
| Podaci | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Prijevodi za 38 jezika, lokalizirane dijagnostičke poruke, SVG oznake i nazivi jezika. |
| Konfiguracija | `CONFIG` , `DEFAULTS` | Konstante (selektori, ograničenja ponovnih pokušaja, unaprijed postavljene postavke, odjeljci) i zadane postavke. |
| Skladištenje | `sanitizeSettings` , `Store` , `persist` | Provjerava i sprema postavke u `localStorage` ; u memoriji čuva stog poništavanja. |
| Logika igrača | `PlayerSync` | Pronalazi video, vraća kvalitetu, glasnoću, brzinu i tihi način rada, prati zamrzavanja. |
| Pomoćnici stranica | `Extras` | Gumbi za raspored, traženje nagrade, avatari kanala i pozadinski planer. |
| Sučelje | `PAGES` , `GUI` , pomoćnici | Panel Shadow-DOM, obavijesti, zvukovi, plutajući gumb za brzo traženje, prečaci. |

Protok podataka: petlja `PlayerSync.sync` od 1,5 sekunde čita efektivne postavke (najprije profil kanala, zatim globalno), primjenjuje ih na player i poziva `Extras.tick` . Korisničke radnje prolaze kroz `GUI` rukovatelje, koji ažuriraju postavke s `persist` i guraju samo zahvaćeni dio u player ( `media` ili `all` ).

<a id="user-facing-behavior"></a>
## Ponašanje okrenuto korisniku

| Područje | Ponašanje |
|---|---|
| Upornost igrača | Sprema kvalitetu uživo/VOD, glasnoću, isključeno stanje, tihi način rada i brzinu, a zatim ih primjenjuje kada se otkrije novi stream. Promjene koje stranica napravi sama (na primjer Kick ponovno postavljanje glasnoće na 50%) se poništavaju; samo radnje gledatelja ažuriraju spremljene vrijednosti. |
| Kvaliteta | Odabire željenu kvalitetu putem izbornika playera, vraća se na sljedeću nižu (ili Auto) kada nije dostupna i ponovno zatvara izbornik. Samo pravi klikovi korisnika uče skriptu novoj kvaliteti "posljednje upotrebe". |
| Glasnoća i tiha reprodukcija | Glasnoća i isključivanje zvuka vraćaju se po streamu. Tiha reprodukcija usmjerava video kroz web audio mehanizam s nultim pojačanjem, tako da se stream nastavlja reproducirati u kartici u pozadini bez isključivanja zvuka. |
| Profili kanala | **Spremi ovaj kanal** pohranjuje trenutnu kvalitetu, glasnoću, brzinu i zvuk za kanal koji se gleda. Profili također sadrže bilješke, grupe, stanje pribadače, avatar i zastavice omogućeno/isključeno. |
| Unaprijed postavljene postavke | Ušteda propusnosti, najbolja kvaliteta, tiho gledanje i VOD primjenjuju se jednim klikom. |
| Ploča | `F2` ili prilagođena tipka prečaca otvara ploču fiksne širine (680 px) s grupiranom bočnom trakom, pretraživanjem, stilovima Kick i Minimal, svijetlim/tamnim temama, 14 naglašenih boja plus birač boja, kompaktnim izgledom, zamućenjem pozadine, skaliranjem teksta, visokim kontrastom i kontrolama animacije. |
| Traži | Neosjetljivo na naglaske, odgovara jeziku sučelja i engleskim nazivima te odgovara naslovima odjeljaka ili kartica. Pritisci tipki upisani na ploči nikada ne dopiru do Kickovih prečaca. |
| Klizači | Svaki klizač reagira na klikove, povlačenje, strelice tipkovnice i kotačić miša. |
| Zvukovi | Web audio signali za radnje izbornika, promjene postavki, uspjeh/neuspjeh kvalitete i vraćanje glasnoće, svaki s prekidačem, pregledom i glasnoćom. |
| Obavijesti | Lokalizirane poruke koje se mogu povlačiti, skalirati, učiniti transparentnima, utišati (ne uznemiravaj, tiho preko cijelog zaslona) i zabilježiti u povijesti. |
| Zamrzni alarm | Otkriva zaustavljeni player ili crni zaslon, reproducira glasan alarm (čak i u skrivenoj kartici, neovisno o prekidaču zvučnih efekata) i prikazuje obavijest. |
| Nagrade | Izborno automatsko potraživanje čeka Kickovu obavijest o nagradi (ili se pokreće prema rasporedu), otvara prozor s nagradama, traži ono što je dostupno i zatvara ga. Plutajući gumb za brzo traženje koji se može povlačiti čini isto jednim klikom. |
| Izgled | Skriva chat i sažima lijevi izbornik s ploče ili pomoću prečaca, opcionalno pamti izbor za svaki stream. |
| Alati | Mjerač vremena za mirovanje, prikaz fokusa (cijeli zaslon), ponovna sinkronizacija playera i siguran način rada koji pauzira svaku automatsku promjenu. |
| Dijagnostika | Status uživo, otkrivene kvalitete, razlučivost videozapisa, skeniranje kvalitete, provjera sukoba, zapisnik radnji i izvješće koje se može kopirati. |
| Podaci | Izvoz/uvoz postavki, poništavanje, vraćanje nakon resetiranja, sigurnosno kopiranje/vraćanje spremljenih kanala. |
| Privatnost | Postavke, profili, zapisnici i povijesti ostaju u pohrani preglednika. Nigdje se ništa ne šalje. |

<a id="settings-reference"></a>
## Referenca postavki

Sve vrijednosti provjerava `sanitizeSettings` ; sve nevažeće vraća se na zadano. Rasponi se provode.

### Igrač

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `autoQualityEnabled` | Booleov | `true` | Automatski primijenite željenu kvalitetu. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kvaliteta za prijavu za prijenose uživo i VOD-ove. `auto` znači "zapamti moj zadnji izbor". |
| `lastLiveQuality` , `lastVodQuality` | isto | `auto` | Posljednja kvaliteta koju je gledatelj izabrao rukom. |
| `qualityFallback` | `lower` , `auto` | `lower` | Što učiniti kada se ne nudi željena kvaliteta. |
| `autoVolumeEnabled` | Booleov | `true` | Vratite i zaštitite spremljeni volumen. |
| `volume` | 0–1 | `1` | Spremljeni volumen. |
| `muted` | Booleov | `false` | Spremljeno stanje utišavanja. |
| `silent` | Booleov | `false` | Tiha reprodukcija (zvučni grafikon s nultim pojačanjem, player nije isključen). |
| `playbackRate` | 0,25–2,5 | `1` | Spremljena brzina; `1` nikada nije prisiljen. |
| `warnLoudVolume` , `loudVolumeThreshold` | booleov; 60–100, korak 5 | `true` ; `85` | Upozorenje o velikoj glasnoći. |
| `safeMode` | Booleov | `false` | Pauzirajte svaku automatsku promjenu. |
| `channelProfiles` | objekt, do 200 | `{}` | Profili po kanalu (vidi dolje). |

Polja profila kanala: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (samo `https://…kick.com/images/user/…` URL-ovi), `note` (240 znakova), `group` (40 znakova), `updatedAt` , `lastUsed` .

### Obavijesti i zvukovi

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `notificationsEnabled` | Booleov | `true` | Prikaži obavijesti o rezultatima. |
| `doNotDisturb` , `quietFullscreen` | Booleov | `false` , `true` | Onemogući obavijesti i zvukove ili samo na cijelom zaslonu. |
| `notificationScale` | 0,8–1,4 | `1` | Veličina obavijesti. |
| `notificationDuration` | 1500–12000 ms, korak 500 | `3500` | Koliko dugo obavijest ostaje. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparentnost obavijesti. |
| `notificationShowIcon` | Booleov | `true` | Prikaži ikonu statusa. |
| `notificationPosition` | `{x, y}` ili `null` | `null` | Odvučeni položaj. |
| `notificationHistoryEnabled` , `notificationHistory` | booleov; do 30 unosa | `true` ; `[]` | Povijest obavijesti. |
| `soundEffectsEnabled` , `soundVolume` | booleov; 0–1 | `false` ; `0.35` | Glavni prekidač i glasnoća. |
| `soundEvents` , `soundEventVolumes` | po događaju: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | sve na; `0.35` | Prebacivanje i glasnoća po događaju. |

### Izgled, kretanje i prečaci

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema boja. |
| `panelStyle` | `kick` , `minimal` | `kick` | Vizualni stil panela. |
| `accentColor` | `#rrggbb` | `#53fc18` | Boja akcenta. |
| `compactMode` , `highContrast` | Booleov | `false` | Gustoća i kontrast. |
| `backdropBlur` | 0–12 px | `6` | Zamućenje pozadine iza ploče (radi u oba stila). |
| `textScale` | 0,9–1,3 | `1` | Veličina teksta. |
| `language` , `languageChosen` | lokalni kod; Booleov | jezik preglednika; `false` | Sučelje prati jezik preglednika dok se ne odabere jezik, a zatim se odabir pamti. |
| `panelPosition` | `{x, y}` ili `null` | `null` | Položaj povučene ploče. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Brzina animacije. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efekt otvaranja/zatvaranja ploče. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efekt lebdenja. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animacija logotipa/indikatora. |
| `iconAnimations` | Booleov | `true` | Animirajte ikone bočne trake, resetiranja i pomoći. |
| `hotkey` | kombinirani niz | `F2` | Otvara ili zatvara ploču. |
| `actionHotkeys` | kombinirani nizovi | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Uključivanje/isključivanje obavijesti, fokusiranje prikaza, poništavanje kvalitete, vraćanje glasnoće, uključivanje/isključivanje chata, prebacivanje lijevog izbornika. |

Kombinacije tipki pohranjuju se kao nizovi kao što je `Alt+Q` i podudaraju se s fizičkom tipkom, tako da rade na bilo kojem rasporedu tipkovnice. Postavke iz starijih verzija s tipkom prečaca u obliku objekta automatski se pretvaraju. Širina panela je fiksna na 680 px (ograničeno na veličinu prozora); prethodna postavka širine se zanemaruje.

### Alati

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `autoRecoverStall` | Booleov | `false` | Pokušajte `play()` kada se otkrije zamrzavanje. |
| `freezeAlertEnabled` , `freezeSound` | Booleov | `true` | Zamrzni obavijest i zvuk alarma. |
| `freezeSeconds` | 5–60, korak 5 | `10` | Sekunde bez napretka prije alarma. |
| `layoutHideChat` , `layoutCollapseSidebar` | Booleov | `false` | Zapamćeni izgled, primijenjen jednom po stranici. |
| `autoClaimRewards` | Booleov | `false` | Omogući automatsko traženje nagrade. |
| `claimMode` | `notify` , `interval` | `notify` | Zatražite kada Kick prikaže svoju obavijest ili prema rasporedu. |
| `claimDelaySec` | 0–120, korak 5 | `5` | Pričekajte nakon što se obavijest pojavi (način obavijesti). |
| `claimIntervalMin` | 5–120, korak 5 | `10` | Minute između provjera (zakazani način). |

### Gumb za brzo potraživanje

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `claimWidget` | Booleov | `false` | Prikaži plutajući gumb. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Dizajn gumba. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Ugrađena ikona ili vlastita slika korisnika. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , do 90 000 znakova | prazan | Ponovno kodirana kopija učitane slike. Sve ostalo se odbija. |
| `claimWidgetImageFill` | Booleov | `false` | Neka prilagođena slika ispuni cijeli gumb (ne koristi se u dizajnu pilule). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Veličina gumba. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Neprozirnost gumba (potpuna neprozirnost dok je nagrada dostupna). |
| `claimWidgetAutoHide` | Booleov | `false` | Prikaži gumb samo kada je nagrada dostupna. |
| `claimWidgetPos` | `{x, y}` ili `null` | `null` | Odvučeni položaj. |

### Dijagnostika i stanje

| Ključ | Vrsta / raspon | Zadano | Značenje |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | booleov; do 60 unosa | `true` ; `[]` | Dnevnik radnji. |
| `activeSection` | ID odjeljka | `playback` | Zadnja otvorena stranica. |
| `resetBackup` | objekt postavki | `null` | Snimka snimljena prije resetiranja ili uvoza. |

<a id="core-utilities"></a>
## Osnovni uslužni programi

| Funkcija | Parametri / povratak | Što i kako radi |
|---|---|---|
| `detectLanguage` | — → mjesto | Šeće `navigator.languages` , mapira regionalne varijante ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) i vraća prvu podržanu lokalizaciju ili `en` . |
| `dictFor` | jezik → rječnik | Vraća tablicu prijevoda za lokalizaciju, vraćajući se na osnovni jezik, a zatim na engleski. |
| `t` / `T` | lang, key, vars → niz | Razrješava ključ zamjenom `{placeholder}` ; `T` koristi trenutni jezik. |
| `diagText` | indeks, kvaliteta → niz | Vraća jednu od lokaliziranih dijagnostičkih rečenica. |
| `log` | …args → void | Zapisivanje konzole s prefiksom skripte. |
| `clamp` , `sleep` , `esc` | vrijednost → vrijednost | Ograničenje raspona, kašnjenje temeljeno na obećanju i izbjegavanje HTML-a. |
| `normalizeQuality` | tekst → niz | Oznaku kvalitete stavlja malim slovima i uklanja razmak. |
| `debounce` | fn, čekaj → funkcija | Trailing debounce metodom `flush` . |
| `onLocationChange` | povratni poziv → poništiti | Otkriva navigaciju po jednoj stranici prelamanjem `pushState` / `replaceState` , osluškujući `popstate` i anketiranjem jednom u sekundi. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | događaj → niz/booleov | Izgradite i usporedite kombinacije tipki iz koda fizičke tipke. |
| `mkPointer` | vrsta, ekstra → događaj | Stvara `PointerEvent` (ili `MouseEvent` kada nije dostupan) koji se koristi za pokretanje Kickovih ARIA izbornika. |
| `waitFor` | sonda, vremensko ograničenje, korak → vrijednost/nula | Anketiranje sve dok sonda ne vrati vrijednost ili dok vrijeme čekanja ne završi. |
| `imageToDataUrl` | slika → niz | Skalira sliku u kvadratno platno (zadržavajući proporcije, `willReadFrequently` ), pokušava 128, 96 i 64 px i vraća URL podataka PNG koji nije veći od 70 000 znakova. |

<a id="settings-storage"></a>
## Pohrana postavki

| Funkcija | Parametri / povratak | Što i kako radi |
|---|---|---|
| `sanitizeProfiles` | objekt → objekt | Čuva najviše 200 profila s važećim ključevima i spaja svako polje; avatar mora biti URL Kick slike. |
| `sanitizeSettings` | objekt, sa sigurnosnom kopijom → objekt | Provjerava valjanost svake postavke (tipovi, rasponi, dopuštene vrijednosti), migrira postavke 1.1–1.3 (naslijeđena kvaliteta, prečac, animacija i tipke odjeljaka) i primjenjuje jezično pravilo. |
| `legacyHotkey` | vrijednost → niz | Pretvara prečac u obliku objekta u kombinirani niz. |
| `Store.load` / `Store.save` | — / postavke → postavke/void | Pročitajte i zapišite sanirani objekt u `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | zakrpa, `{undo}` → poništi | Spaja zakrpu, čisti, sprema s kratkim odbijanjem i opcionalno gura snimku poništavanja (samo u memoriji, do 15). |
| slušatelj `storage` | događaj → praznina | Ponovno učitava postavke kada ih druga Kick kartica promijeni, tako da kartice nikada ne zamenjuju jedna drugu. |

<a id="player-synchronization-playersync"></a>
## Sinkronizacija playera ( `PlayerSync` )

### Pomoćnici kanala i profila

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `isVod` | — → booleov | Otkriva VOD stranicu iz URL-a. |
| `channelKey` | — → niz | Gradi stabilni `channel:slug` ključ (ili `vod:id` , `kick:home` ), pohranjujući rezultat u predmemoriju tri sekunde. Na VOD stranicama koristi se poveznica na kanal najbliži igraču. |
| `channelSlug` | — → niz | Vraća slug dio ključa kanala. |
| `profile` | ključ → objekt/nula | Čita spremljeni profil. |
| `profileActive` | — → objekt/nula | Vraća trenutni profil samo ako je omogućen i nije isključen. |
| `isExcluded` | — → booleov | Provjerava je li automatizacija onemogućena za ovaj kanal. |
| `updateProfile` | zakrpa, ključ → praznina | Stvara ili spaja profil i označava `updatedAt` . |
| `saveCurrentChannel` | — → objekt/nula | Pohranjuje gledateljevu trenutnu kvalitetu, glasnoću, isključeni zvuk, brzinu i nečujno stanje kao omogućen profil i skenira stranicu u potrazi za avatare kanala. |
| `effective` | — → objekt | Rješava glasnoću, isključivanje zvuka, tišinu, brzinu i kvalitetu uživo/VOD iz aktivnog profila ili globalnih postavki. |
| `setStatus` | status, rezultat → void | Ažurira status i kodove posljednjeg rezultata prikazane u zaglavlju i dijagnostici. |

### Pronalaženje i vožnja Kickovog igrača

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `findMainVideo` | — → video/null | Odabire najveći vidljivi `<video>` . |
| `streamKey` | — → niz | Vraća put stranice korišten za primjenu kvalitete jednom po streamu. |
| `isAccountButton` | gumb → booleov | Odbacuje zaglavlje, avatar i gumbe računa. |
| `findSettingsButton` | video → gumb/nula | Pronalazi gumb zupčanika igrača prema oznaci ili prema blizini donjeg desnog kuta videozapisa. |
| `revealControls` | video → praznina | Otpremnice lebde nad događajima tako da se pojavljuju skrivene kontrole. |
| `simulateClick` | element → praznina | Šalje cijeli slijed pokazivača i događaja koji je potreban Kickovim izbornicima. |
| `menuItems` | — → element[] | Popisuje vidljive stavke `menuitemradio` unose. |
| `openQualityMenu` | — → gumb/nula | Otvara izbornik zupčanika, ulazi u kvalitetni unos kada se pojavi izbornik najviše razine i čeka opcije. |
| `closeMenu` | gumb → Obećaj | Zatvara izbornik samo ako je još uvijek otvoren (slijepi drugi klik mogao bi ga ponovno otvoriti), s rezervnom tipkom Escape. |
| `readMenu` | — → element[] | Evidentira ponuđene kvalitete i provjerene. |
| `scanQualities` | — → Obećanje<boolean> | Otvara izbornik, bilježi dostupne kvalitete i zatvara ga (koristi ga dijagnostika). |
| `activate` | stavka → Obećanje | Klikne na jednu opciju i čeka dok se ne označi. |
| `selectQuality` | željeno, zamjena → obećanje | Odabire traženu kvalitetu, inače sljedeću nižu ili Automatski. |
| `desiredQuality` | — → niz | Odabire kvalitetu za primjenu iz profila, preferencije ili zadnjeg ručnog odabira. |
| `applyQualityOnce` | streamKey → Obećaj | Primjenjuje željenu kvalitetu jednom po streamu, zatvara izbornik i obavještava o uspjehu ili neuspjehu. |
| `watchManualQuality` | — → poništiti | Uči novu kvalitetu "zadnjeg korištenja" samo od pravih (pouzdanih) klikova, tako da automatski klikovi i zamjenski klikovi nikad ne prebrišu spremljene vrijednosti. |

### Glasnoća, tihi način rada, brzina i nadzor

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `applyVolume` | video, tiho → praznina | Zapisuje efektivnu glasnoću i isključeno stanje (označeno kao vlastita promjena skripte). |
| `trackInput` | — → poništiti | Bilježi vrijeme posljednjeg pouzdanog pokazivača, kotačića, dodira ili unosa s tipkovnice. |
| `reassertVolume` | video → praznina | Vraća spremljeni volumen natrag kada ga je stranica promijenila bez ikakvog unosa korisnika (brzina ograničena na osam vraćanja po deset sekundi). |
| `watchVolume` | video → praznina | Osluškuje `volumechange` : promjene koje pokreće korisnik se spremaju, a one koje pokreće stranica vraćaju se. |
| `checkLoud` | volumen, prigušen → praznina | Jednom upozorava kada glasnoća prijeđe prag. |
| `buildGraph` | video → graf/nula | Povezuje video u `AudioContext` kroz čvor pojačanja; izvješća kada stranica to ne dopušta. |
| `applySilent` | video → praznina | Postavlja pojačanje na 0 za tihu reprodukciju ili natrag na 1, nastavljajući kontekst po potrebi. |
| `applyRate` | video, sila → praznina | Postavlja spremljenu brzinu; `1` nije forsiran osim ako ga je gledatelj samo odabrao, tako da se poštuje Kickovo vlastito nadoknađivanje uživo. |
| `applyMedia` | video, `{rate}` → void | Ponovno primjenjuje glasnoću, tihi način rada i po izboru brzinu bez dodirivanja kvalitete. |
| `monitorFreeze` | video → praznina | Otkriva zaustavljeni player (vrijeme je zapelo) ili crni zaslon (vrijeme se kreće bez dekodiranih okvira) i pokreće alarm i izborni oporavak. Radi u skrivenim karticama. |

### Petlja i životni ciklus

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `sync` | — → Obećanje | Glavna petlja: nadzire se zamrzava, povezuje slušatelje, primjenjuje tihi način rada, glasnoću, brzinu i kvalitetu, poštuje siguran način rada i isključenja, zatim poziva `Extras.tick` . |
| `resync` | — → Obećanje | Forsira novi prolaz (koristi ga unaprijed postavljene postavke, brze akcije i promjene kvalitete). |
| `init` | — → poništiti | Pokreće prvu sinkronizaciju, slušatelja navigacije i interval od 1,5 sekunde. |

<a id="page-extras-extras"></a>
## Dodaci stranici ( `Extras` )

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Pročitajte Kickovo stanje izgleda iz `data-chat` i `data-sidebar` na spremniku stranice. |
| `isDesktop` | — → booleov | Automatizacija izgleda radi samo na širinama radne površine. |
| `click` | element → booleov | Klikovi kroz `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → gumb/nula | Pronađite gumb za sažimanje unutar sobe za razgovor i gumb "prikaži razgovor" (po ikoni, ne po jeziku). |
| `setChat` , `setSidebar` | prikaži → Boolean | Dovedite chat ili lijevi izbornik u traženo stanje pritiskom na vlastite gumbe Kicka. |
| `applyLayout` | — → poništiti | Primjenjuje zapamćeni izgled jednom po stranici, nikad se ne boreći s ručnim promjenama. |
| `isTyping` | — → booleov | Istina dok gledatelj upisuje polje; automatska potraživanja čekati. |
| `rewardTrigger` , `popoverCard` | — → gumb/nula | Pronađite gumb za poklon i skočnu karticu s nagradom. |
| `rewardAvailable` | — → booleov | Otkriva Kickov vlastiti signal "dostupna nagrada" (animirani poziv na radnju). |
| `isEnabled` | gumb → booleov | Vidljivo i nije onemogućeno. |
| `claimDrops` | — → Obećanje<number> | Pritišće omogućene gumbe za traženje dovršenih pada na ploči s nagradama. |
| `claimDaily` | okidač → obećanje<number> | Otvara prozor s nagradama, pritišće svaki omogućeni gumb za preuzimanje jednom (nikada isti gumb dvaput), zatim zatvara prozor. |
| `claimRewards` | `{manual}` → Obećanje<number> | Pokreće puni zahtjev, izvješćuje o rezultatu i reproducira zvuk; ručna izvođenja ignoriraju upisivanje i izvješćuju kada se nema što tražiti. |
| `normName` | tekst → niz | Normalizira imena za podudaranje ( `_` i razmaci do `-` ). |
| `findAvatar` | puž → žica | Vraća avatar kanala vidljiv na stranici (korišten prije spremanja kanala). |
| `scanAvatars` | — → poništiti | Pohranjuje avatare za spremljene kanale koji nemaju jedan. |
| `tick` | streamKey → void | Planer pozvan iz `sync` : primjenjuje izgled, skenira avatare, čeka obavijest o nagradi (način obavijesti, s odgodom i dvominutnim hlađenjem) ili provjerava odabrani interval i ispituje ploču za ispuštanje. |

<a id="interface-building-blocks"></a>
## Sastavni dijelovi sučelja

| Funkcija | Parametri / povratak | Što i kako radi |
|---|---|---|
| `I` | ime → svg | Umetnuta ikona poteza. |
| `fmtValue` | format, neobrađen → niz | Formatira vrijednosti klizača (postotak, pikseli, sekunde). |
| `normSearch` , `englishOf` , `searchText` | tekst → niz | Tekst za pretraživanje koji nije osjetljiv na naglasak uključujući engleski naziv prevedene oznake. |
| `row` | ključ, oznaka, kontrola, opcije → html | Red za postavljanje; složeno prema zadanim postavkama, ugrađeno samo za prekidače, s opcijskim prekidačem pomoći. |
| `sw` , `toggleRow` | … → html | Kontrola prekidača i gotov niz prekidača. |
| `chip` , `seg` , `qualityChips` | … → html | Čipovi, segmentirane kontrole i rešetka kvalitete. |
| `range` | attr, ključ, opcije → html | Klizač s popunom staze i živom vrijednošću. |
| `card` , `btn` , `ib` | … → html | Kartica, gumb s tekstom i gumb s ikonom. |
| `timeStr` | vremenska oznaka → niz | Lokalizirano vrijeme na satu. |
| `setPref` | ključ, vrijednost → void | Zapisuje postavke igrača u aktivni profil kanala ili u globalne postavke. |
| `fxBtn` | ključ, vrijednost, oznaka, na → html | Pločica alata za odabir učinaka s malim glifom za pregled. |
| `avatarHtml` | ime, url → html | Avatar sa zamjenskim pismom; neuspjela slika se uklanja. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → vrijednost | Izradite oznaku gumba za brzo potraživanje i za gumb uživo i za pregled postavki. |

<a id="settings-pages-pages"></a>
## Stranice postavki ( `PAGES` )

| Stranica | Sadržaj |
|---|---|
| `playback` | Spremi-ovaj-kanal savjet, unaprijed postavljene postavke, kvaliteta (automatska primjena, uživo, VOD, rezervni), glasnoća (automatska primjena, klizač, isključivanje zvuka, tiha reprodukcija, glasno upozorenje) i brzina. |
| `channels` | Koraci kako to radi, trenutni kanal s gumbom **Spremi ovaj kanal** , prekidači za pauziranje/isključivanje i uređivač, zatim popis spremljenih kanala (pretraživanje, sortiranje, filtar pribadače, grupe, Uredi/Gotovo, brisanje) sa sigurnosnom kopijom i vraćanjem. |
| `tools` | Mjerač vremena za isključivanje, izgled stranice, nagrade (automatsko potraživanje, način rada, odgoda ili interval, Zatraži sada), postavke gumba za brzo potraživanje s pregledom uživo, alarm za zamrzavanje i brze akcije. |
| `notifications` | Prekidači, veličina, trajanje, neprozirnost, pregled, resetiranje položaja i povijest. |
| `sounds` | Glavni prekidač i glasnoća, prekidači za svaki događaj, glasnoća i pregledi. |
| `appearance` | Tema, stil, boje isticanja, gustoća, kontrast, veličina teksta, zamućenje, centriranje i jezik. |
| `motion` | Pregled uživo, unaprijed postavljene postavke i birači za efekt otvaranja, efekt lebdenja, indikator, brzinu i animacije ikona. |
| `shortcuts` | Tipkovni prečaci izbornika i tipkovni prečaci za radnje s ponovnim povezivanjem. |
| `diagnostics` | Status, skeniranje, izvješće, provjere kvalitete i sukoba, siguran način rada i dnevnik radnji. |
| `about` | Verzija, veze, izvoz/uvoz, poništavanje, vraćanje i resetiranje. |

<a id="panel-controller-gui"></a>
## Kontroler ploče ( `GUI` )

### Izgradnja i renderiranje

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `build` | — → poništiti | Stvara shadow-DOM host, panel, tost i live regiju, zatim povezuje događaje. |
| `applyLook` | — → poništiti | Primjenjuje temu, stil, naglasak, zamućenje, skalu teksta, efekte, jezične atribute i postavke tosta kao atribute i CSS varijable. |
| `renderChrome` | — → poništiti | Renderira naslov, rezervirano mjesto za pretraživanje, gumb za pauzu, savjet za podnožje i gumb za brzo polaganje prava. |
| `renderNav` | — → poništiti | Renderira grupiranu bočnu traku. |
| `renderPage` | mogućnosti → poništiti | Renderira aktivnu stranicu (ili sve stranice tijekom pretraživanja), zadržavajući fokus pomicanja i tipkovnice. |
| `filterRows` | — → poništiti | Primjenjuje filtar pretraživanja na retke, kartice i stranice. |
| `channelEditor` | ključ, profil → html | Editor za jedan profil kanala. |
| `refreshAll` , `onExternalChange` | — → poništiti | Ponovno generirajte sve nakon resetiranja, uvoza, poništavanja ili promjene s druge kartice. |

### Događaji i promjene postavki

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `wire` | — → poništiti | Priključuje delegirane rukovatelje klikom, unosom, promjenom, kotačićem i pomicanjem te povlačenjem ploče. |
| `onClick` , `onInput` , `onChange` | događaj → praznina | Slanje klikova, pomicanja klizača i uređivanja teksta na postavke, profile ili radnje. |
| `applyRange` | ključ, vrijednost → void | Primjenjuje vrijednost klizača (glasnoća, zamućenje, neprozirnost, trajanja...). |
| `setSetting` , `setChannel` | ključ/zakrpa → praznina | Spremite postavku ili promjenu profila i gurnite pogođeni dio u player. |
| `pushToPlayer` | opseg, ključ → praznina | `media` ponovno primjenjuju glasnoću, tihi način rada i brzinu; `all` također ponovno primjenjuje kvalitetu. Glasnoća, isključivanje zvuka, tihi način rada i brzina nikad ne otvaraju ponovno izbornik kvalitete. |
| `act` | ime, element → obećanje | Pokreće imenovane akcije: unaprijed postavljene postavke, spremanje i uklanjanje kanala, sigurnosno kopiranje, uvoz/izvoz, zahtjevi, mjerač vremena mirovanja, prečaci, dijagnostika i više. |
| `resetSection` | id → nevažeći | Vraća zadane postavke jednog odjeljka. |
| `restoreVolume` | — → poništiti | Ponovno primjenjuje spremljenu glasnoću. |
| `toggleLayout` | koji → ništavan | Skriva ili prikazuje chat ili lijevi izbornik i pamti izbor. |
| `confirm` , `closeModal` | poruka, opcije / rezultat → obećanje/poništenje | Dijaloški okvir za potvrdu unutar ploče (identičan u svakom pregledniku). |
| `download` , `pickFile` , `pickImage` | … → ništavno | Spremite JSON, pročitajte JSON i odaberite sliku za gumb za brzo potraživanje. |
| `startCapture` , `finishCapture` | id / combo → void | Ponovno povežite prečac, odbijajući duplikate. |
| `replayMock` | — → poništiti | Ponovno reproducira otvoreni efekt u pregledu animacije. |

### Alati i dijagnostika

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minute / — → poništiti | Pokretanje, otkazivanje i prikaz mjerača vremena mirovanja (zaustavlja video na kraju). |
| `toggleFocusView` | — → Obećanje | Ulazi ili izlazi iz cijelog zaslona na spremniku playera. |
| `statusText` , `resultText` , `syncDiagnostics` | — → string/void | Lokalizirani status zaglavlja i dijagnostičke stranice. |
| `record` | poruka, razina → praznina | Dodaje unos s vremenskom oznakom u zapisnik radnji. |
| `copyDiagnostics` | — → Obećanje | Kopira kratko izvješće (verzija, status, kvalitete, vrsta stranice, korisnički agent). |
| `checkQuality` , `checkConflicts` | — → Obećati/ništiti | Provjerite je li ponuđena željena kvaliteta i navedite postavke koje rade jedna protiv druge. |

### Gumb za brzo potraživanje

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `renderClaimWidget` | — → poništiti | Stvara, ažurira ili uklanja plutajući gumb i pokreće anketu o stanju od jedne sekunde. |
| `syncClaimWidget` | — → poništiti | Prikazuje prsten i točku "dostupne nagrade", stanje zauzetosti i pravilo automatskog skrivanja. |
| `placeClaimWidget` | — → poništiti | Postavlja gumb, pričvršćujući ga za prozor. |
| `wireClaimWidget` | element → praznina | Povlačenje s pragom od pet piksela (povlačenje se nikada ne računa kao klik), spremanje položaja i klik koji pokreće ručni zahtjev. |

### Obavijesti, zvuk i ponašanje ploče

| Metoda | Parametri / povratak | Što i kako radi |
|---|---|---|
| `notify` | poruka, vrsta, trajanje, sila → ništavnost | Prikazuje zdravicu (osim ako nije potisnuta), bilježi povijest i najavljuje tekst u živoj regiji. |
| `notifyQuality` | primijenjeno, kvalitetno → ništavno | Reproducira zvuk rezultata, bilježi i prikazuje lokaliziranu obavijest. |
| `initToastPosition` , `wireToastDrag` | — → poništiti | Vratite i spremite povučeni položaj tosta. |
| `onAvatars` | — → poništiti | Osvježava stranice koje prikazuju avatare. |
| `ensureAudio` | — → kontekst | Stvara i nastavlja zajednički `AudioContext` (otključava se prvom gestom korisnika). |
| `playSound` , `stopSounds` | ime, pregled → poništiti | Generirajte i zaustavite web audio signale. |
| `playFreezeAlarm` , `alertFrozen` | sila → praznina | Pustite alarm od pet nota i podignite obavijest o zamrzavanju. |
| `placePanel` , `wirePanelDrag` | položaj → praznina | Postavite ploču unutar prozora i omogućite povlačenje zaglavlja. |
| `open` , `close` , `toggle` | — → poništiti | Kontrolirajte ploču, glasanje, fokus i zvukove izbornika. |
| `syncVolumeControls` | — → poništiti | Održava klizač glasnoće sinkroniziranim s playerom dok je ploča otvorena. |

<a id="hotkeys-and-startup"></a>
## Prečaci i pokretanje

| Funkcija | Parametri / povratak | Što i kako radi |
|---|---|---|
| `isolateKeys` | — → poništiti | Registrirano na `document-start` u fazi snimanja: događaji na tipkovnici koji dolaze iz ploče prestaju se prenositi na Kick (tako da razmaknica, F, M i strelice nikada ne pokreću prečace igrača), a Tab ostaje zarobljen unutar dijaloškog okvira. |
| `setupHotkeys` | — → poništiti | Rukuje snimanjem tipki za ponovno povezivanje, Escape (modalno, padajući izbornik, panel), tipkovnim prečacima izbornika i tipkovnim prečacima za radnje; kombinacije s modifikatorom ili F-tipkom rade čak i tijekom tipkanja. |
| `init` | — → poništiti | Gradi ploču, instalira prečace i pokreće `PlayerSync` ; zaštićen od dvostrukog ubrizgavanja. |

<a id="kick-page-dependencies"></a>
## Izbacite ovisnosti stranice

Skripta se oslanja na trenutnu Kickovu oznaku. Gdje god je to moguće, koristi ikone, atribute i strukturu umjesto vidljivog teksta, tako da nastavlja raditi na svim jezicima sučelja. Ako ih Kick promijeni, značajka podudaranja prestaje raditi (ostatak nastavlja raditi).

| Značajka | Što traži |
|---|---|
| Kvaliteta | Vidljivi `<video>` , igračev `button[aria-haspopup="menu"]` i unosi `[role="menuitemradio"]` . |
| Izgled | Spremnik s `data-sidebar` i `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , gumbom ikone `CollapseRight` unutar `#channel-chatroom` i gumbom ikone `MessagesOutline` za prikaz chata. |
| Obavijest o nagradi | `video` čiji izvor sadrži `reward-available` ili karticu `[role="group"]` koja sadrži videozapis `daily-rewards` . |
| Traženje nagrade | `button[aria-haspopup="dialog"][aria-controls]` (ikona poklona), dijaloški okvir kojim upravlja ( `data-state` ), omogućeni gumbi za potraživanje s podređenim elementom `.contents` i gumb za zatvaranje s oznakom `.sr-only` . |
| Kapi | `#rewards-panel` stavke popisa s `[role="progressbar"][data-state="complete"]` i omogućenim gumbom. |
| Avatari | `img[alt]` elementi čiji je izvor `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizacija

Svaka oznaka, poruka pomoći, pogreška, dijaloški okvir i obavijest prolaze kroz razrješivač prijevoda za 38 jezika. Ključevi koji nedostaju vraćaju se na engleski. Novi tekst sučelja preveden je na sve podržane jezike zajedno sa značajkom koja ga dodaje. Izbornik jezika prikazuje zastave i izvorna imena; sučelje slijedi jezik preglednika pri prvom pokretanju i pamti eksplicitni izbor nakon toga.

<a id="safety-privacy-and-compatibility"></a>
## Sigurnost, privatnost i kompatibilnost

- Postavke se dezinficiraju prije skladištenja; nevažeće vrijednosti vraćaju se na sigurne zadane vrijednosti.
- Imena kanala, bilješke, tekst obavijesti i dijagnostički izlaz se izbjegavaju prije umetanja HTML-a.
- Prilagođena ikona gumba ponovno se kodira s platna i pohranjuje samo kao podatkovni URL dopuštene vrste slike; nikad ne napušta preglednik.
- Shadow DOM čuva stilove skripte izolirane od Kicka; događaji tipkovnice s ploče izolirani su od Kickovih prečaca.
- Automatske radnje preskaču isključene kanale, siguran način rada i elemente igrača koji nedostaju. Zahtjev za nagradu nikad ne pritišće isti gumb dvaput u jednom pokretanju i čeka dok gledatelj tipka.
- Skripta ne postavlja mrežne zahtjeve; ažuriranja dolaze iz upravitelja korisničkih skripti ili stranice Izdanja.
- Postojeće lokalne postavke su sačuvane prilikom prelaska s 1.1.0, 1.2.0 i 1.3.0.
