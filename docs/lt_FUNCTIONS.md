<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · **Lietuvių** · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks – funkcijos nuoroda

„Kick Stream Tweaks“ 1.3.1 nuoroda. Jame aprašoma, ką daro kiekviena funkcinė sritis, kaip saugomi nustatymai, nuo kurių Kick puslapio dalių priklauso scenarijus ir kaip veikia kiekviena vartotojo scenarijuje nurodyta funkcija ar metodas. Peržiūrėkite [saugyklą](https://github.com/ebayybe/kick-stream-tweaks) ir [pakeitimų žurnalą](../CHANGELOG/en_CHANGELOG.md) .

> Vardai atitinka šaltinį. `void` reiškia, kad funkcija veikia per šalutinį poveikį. Metodas, parašytas kaip `Object.method` , yra tame objekte ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Turinys

1. [Architektūra](#architecture)
2. [Vartotojo elgesys](#user-facing-behavior)
3. [Nustatymų nuoroda](#settings-reference)
4. [Pagrindinės komunalinės paslaugos](#core-utilities)
5. [Nustatymų saugykla](#settings-storage)
6. [Grotuvo sinchronizavimas ( `PlayerSync` )](#player-synchronization-playersync)
7. [Puslapio priedai ( `Extras` )](#page-extras-extras)
8. [Sąsajos blokai](#interface-building-blocks)
9. [Nustatymų puslapiai ( `PAGES` )](#settings-pages-pages)
10. [Skydelio valdiklis ( `GUI` )](#panel-controller-gui)
11. [Spartieji klavišai ir paleidimas](#hotkeys-and-startup)
12. [Atsisakykite puslapių priklausomybių](#kick-page-dependencies)
13. [Lokalizavimas](#localization)
14. [Sauga, privatumas ir suderinamumas](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architektūra

Vartotojo scenarijus yra vienas atskiras failas, kuris paleidžiamas `document-start` su `@grant none` . Jame nėra kūrimo žingsnio ir neteikiama jokių tinklo užklausų.

| Sluoksnis | Objektas / sritis | Atsakomybė |
|---|---|---|
| Duomenys | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Vertimai į 38 kalbas, lokalizuoti diagnostiniai pranešimai, SVG žymos ir kalbų pavadinimai. |
| Konfigūracija | `CONFIG` , `DEFAULTS` | Konstantos (rinkikliai, pakartotinio bandymo ribos, išankstiniai nustatymai, skyriai) ir numatytieji nustatymai. |
| Sandėliavimas | `sanitizeSettings` , `Store` , `persist` | Patvirtina ir išsaugo nustatymus `localStorage` ; išsaugo atmintyje esantį anuliavimo krūvą. |
| Žaidėjo logika | `PlayerSync` | Suranda vaizdo įrašą, atkuria kokybę, garsumą, greitį ir tylųjį režimą, stebi, ar neužstringa. |
| Puslapio pagalbininkai | `Extras` | Išdėstymo mygtukai, paraiškos gauti atlygį, kanalo pseudoportretai ir fono planavimo priemonė. |
| Sąsaja | `PAGES` , `GUI` , pagalbininkai | „Shadow-DOM“ skydelis, pranešimai, garsai, slankusis greitojo paraiškos mygtukas, spartieji klavišai. |

Duomenų srautas: 1,5 sekundės `PlayerSync.sync` ciklas nuskaito galiojančius nustatymus (pirmiausia kanalo profilis, tada visuotinis), pritaiko juos grotuvui ir iškviečia `Extras.tick` . Vartotojo veiksmai atliekami per `GUI` tvarkykles, kurios `persist` nustatymus ir išsiunčia tik paveiktą dalį į grotuvą ( `media` arba `all` ).

<a id="user-facing-behavior"></a>
## Vartotojo elgesys

| Plotas | Elgesys |
|---|---|
| Žaidėjo atkaklumas | Išsaugo tiesioginės transliacijos / VOD kokybę, garsumą, nutildymo būseną, tylųjį režimą ir greitį, tada pritaiko juos, kai aptinkamas naujas srautas. Pakeitimai, kuriuos puslapis daro pats (pvz., „Kick“ atkuriant garsumą iki 50%), yra grąžinami; tik paties žiūrinčiojo veiksmai atnaujina išsaugotas reikšmes. |
| Kokybė | Leistuvo meniu pasirenka pageidaujamą kokybę, grįžta į kitą žemesnę (arba automatinę), kai ji nepasiekiama, ir vėl uždaro meniu. Tik tikri naudotojo paspaudimai suteikia scenarijui naujos „paskutinį kartą naudotos“ kokybės. |
| Garsumas ir tylus atkūrimas | Garsumas ir nutildymas atkuriami kiekvienam srautui. Tylus atkūrimas nukreipia vaizdo įrašą per žiniatinklio garso variklį esant nuliui, todėl srautas ir toliau grojamas fono skirtuke be nutildymo. |
| Kanalų profiliai | **Išsaugoti šį kanalą** išsaugo dabartinę žiūrimo kanalo kokybę, garsumą, greitį ir garsą. Profiliuose taip pat yra pastabų, grupių, smeigtuko būsenos, pseudoportreto ir įjungtų / neįtrauktų vėliavėlių. |
| Išankstiniai nustatymai | Išsaugokite pralaidumą, geriausią kokybę, tylų žiūrėjimą ir VOD vienu paspaudimu. |
| Skydas | `F2` arba pasirinktinis spartusis klavišas atidaro fiksuoto pločio (680 px) skydelį su sugrupuota šonine juosta, paieška, Kick ir Minimal stiliais, šviesiomis/tamsiomis temomis, 14 akcentinių spalvų ir spalvų rinkikliu, kompaktišku išdėstymu, fono suliejimo, teksto mastelio keitimo, didelio kontrasto ir animacijos valdikliais. |
| Ieškoti | Nejautrus akcentas, atitinka sąsajos kalbą ir angliškus pavadinimus bei sekcijų ar kortelių pavadinimus. Skydelyje įvesti klavišų paspaudimai niekada nepasiekia Kick sparčiųjų klavišų. |
| Slankikliai | Kiekvienas slankiklis reaguoja į paspaudimus, vilkimą, klaviatūros rodykles ir pelės ratuką. |
| Garsai | Žiniatinklio garso užuominos, skirtos meniu veiksmams, nustatymų pakeitimams, kokybės sėkmei / nesėkmei ir garsumo atkūrimui, kiekvienas su jungikliu, peržiūra ir garsumu. |
| Pranešimai | Lokalizuoti pranešimai, kuriuos galima vilkti, keisti mastelį, padaryti skaidrius, nutildyti (netrukdyti, tylus viso ekrano režimas) ir įrašyti į istoriją. |
| Užšalimo signalas | Aptinka užstrigusį grotuvą arba juodą ekraną, paleidžia garsų žadintuvą (net ir paslėptame skirtuke, nepriklausomai nuo garso efektų jungiklio) ir rodo pranešimą. |
| Apdovanojimai | Pasirenkama automatinė paraiška laukia, kol bus pranešta apie Kick apdovanojimą (arba vykdoma pagal tvarkaraštį), atidaromas apdovanojimų langas, pareikalauta, kas yra, ir uždaroma. Plaukiojantis, tempiamas greito pareiškimo mygtukas daro tą patį vienu paspaudimu. |
| Išdėstymas | Slepia pokalbį ir sutraukia kairįjį meniu iš skydelio arba sparčiaisiais klavišais, pasirinktinai prisimindamas kiekvieno srauto pasirinkimą. |
| Įrankiai | Išsijungimo laikmatis, fokusavimo (viso ekrano) rodinys, grotuvo pakartotinis sinchronizavimas ir saugus režimas, pristabdantis kiekvieną automatinį pakeitimą. |
| Diagnostika | Tiesioginė būsena, aptiktos savybės, vaizdo raiška, kokybės nuskaitymas, konfliktų patikrinimas, veiksmų žurnalas ir kopijavimo ataskaita. |
| Duomenys | Nustatymų eksportavimas / importavimas, anuliavimas, atkūrimas po atstatymo, išsaugotų kanalų atsarginių kopijų kūrimas / atkūrimas. |
| Privatumas | Nustatymai, profiliai, žurnalai ir istorijos lieka naršyklės saugykloje. Nieko niekur nesiunčiama. |

<a id="settings-reference"></a>
## Nustatymų nuoroda

Visos reikšmės yra patvirtintos `sanitizeSettings` ; viskas, kas neteisinga, grįžta į numatytuosius nustatymus. Diapazonai yra vykdomi.

### Žaidėjas

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `autoQualityEnabled` | loginis | `true` | Automatiškai pritaikykite pageidaujamą kokybę. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kokybė, kuria galima kreiptis dėl tiesioginių srautų ir VOD. `auto` reiškia „prisiminti mano paskutinį pasirinkimą“. |
| `lastLiveQuality` , `lastVodQuality` | tas pats | `auto` | Paskutinė kokybė, kurią žiūrovas pasirinko rankomis. |
| `qualityFallback` | `lower` , `auto` | `lower` | Ką daryti, kai nepasiūloma pageidaujama kokybė. |
| `autoVolumeEnabled` | loginis | `true` | Atkurkite ir apsaugokite išsaugotą garsumą. |
| `volume` | 0–1 | `1` | Išsaugotas garsumas. |
| `muted` | loginis | `false` | Išsaugota nutildymo būsena. |
| `silent` | loginis | `false` | Tylus atkūrimas (nulio stiprinimo garso grafikas, grotuvas nenutildytas). |
| `playbackRate` | 0,25–2,5 | `1` | Išsaugotas greitis; `1` niekada nėra priverstas. |
| `warnLoudVolume` , `loudVolumeThreshold` | loginis; 60–100, 5 veiksmas | `true` ; `85` | Didelės apimties įspėjimas. |
| `safeMode` | loginis | `false` | Pristabdykite kiekvieną automatinį pakeitimą. |
| `channelProfiles` | objektas, iki 200 | `{}` | Kanalo profiliai (žr. toliau). |

Kanalo profilio laukai: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (tik `https://…kick.com/images/user/…` URL), `note` (240 simbolių), `group` (40 simbolių), `updatedAt` `lastUsed` .

### Pranešimai ir garsai

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `notificationsEnabled` | loginis | `true` | Rodyti rezultatų pranešimus. |
| `doNotDisturb` , `quietFullscreen` | loginis | `false` , `true` | Slopinkite pranešimus ir garsus arba tik per visą ekraną. |
| `notificationScale` | 0,8–1,4 | `1` | Pranešimo dydis. |
| `notificationDuration` | 1500–12 000 ms, 500 žingsnis | `3500` | Kiek laiko galioja pranešimas. |
| `notificationOpacity` | 0,35–1 | `0.95` | Pranešimų skaidrumas. |
| `notificationShowIcon` | loginis | `true` | Rodyti būsenos piktogramą. |
| `notificationPosition` | `{x, y}` arba `null` | `null` | Nutempta padėtis. |
| `notificationHistoryEnabled` , `notificationHistory` | loginis; iki 30 įrašų | `true` ; `[]` | Pranešimų istorija. |
| `soundEffectsEnabled` , `soundVolume` | loginis; 0–1 | `false` ; `0.35` | Pagrindinis jungiklis ir garsumas. |
| `soundEvents` , `soundEventVolumes` | vienam įvykiui: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | viskas įjungta; `0.35` | Įvykio jungiklis ir garsumas. |

### Išvaizda, judesiai ir spartieji klavišai

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Spalvų tema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Vizualinis skydelio stilius. |
| `accentColor` | `#rrggbb` | `#53fc18` | Akcentinė spalva. |
| `compactMode` , `highContrast` | loginis | `false` | Tankis ir kontrastas. |
| `backdropBlur` | 0–12 px | `6` | Fono suliejimas už skydelio (veikia abiem stiliais). |
| `textScale` | 0,9–1,3 | `1` | Teksto dydis. |
| `language` , `languageChosen` | lokalės kodas; loginis | naršyklės kalba; `false` | Sąsaja seka naršyklės kalbą, kol pasirenkama kalba, tada pasirinkimas įsimenamas. |
| `panelPosition` | `{x, y}` arba `null` | `null` | Nutempta skydelio padėtis. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animacijos greitis. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Skydelio atidarymo/uždarymo efektas. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Užvedimo efektas. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logotipo/indikatoriaus animacija. |
| `iconAnimations` | loginis | `true` | Animuokite šoninę juostą, nustatykite iš naujo ir pagalbos piktogramas. |
| `hotkey` | kombinuota eilutė | `F2` | Atidaro arba uždaro skydelį. |
| `actionHotkeys` | kombinuotos stygos | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Perjungti pranešimus, fokusavimo rodinį, iš naujo nustatyti kokybę, atkurti garsumą, perjungti pokalbį, perjungti kairįjį meniu. |

Klavišų deriniai saugomi kaip eilutės, pvz., `Alt+Q` ir suderinami su fiziniu klavišu, todėl jie veikia bet kokiu klaviatūros išdėstymu. Senesnių versijų nustatymai su objekto formos sparčiuoju klavišu konvertuojami automatiškai. Skydelio plotis fiksuotas 680 px (ribojamas iki lango dydžio); buvęs pločio nustatymas nepaisomas.

### Įrankiai

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `autoRecoverStall` | loginis | `false` | Išbandykite `play()` kai aptiktas užšalimas. |
| `freezeAlertEnabled` , `freezeSound` | loginis | `true` | Užšaldyti pranešimo ir žadintuvo garsą. |
| `freezeSeconds` | 5–60, 5 veiksmas | `10` | Iki žadintuvo sekundės jokios pažangos. |
| `layoutHideChat` , `layoutCollapseSidebar` | loginis | `false` | Prisimintas išdėstymas, taikomas vieną kartą kiekviename puslapyje. |
| `autoClaimRewards` | loginis | `false` | Įgalinti automatinį atlygio reikalavimą. |
| `claimMode` | `notify` , `interval` | `notify` | Reikalauti, kai Kick parodys savo pranešimą arba pagal tvarkaraštį. |
| `claimDelaySec` | 0–120, 5 veiksmas | `5` | Palaukite, kol pasirodys pranešimas (pranešimo režimas). |
| `claimIntervalMin` | 5–120, 5 veiksmas | `10` | Minutės tarp patikrinimų (suplanuotas režimas). |

### Greitos pretenzijos mygtukas

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `claimWidget` | loginis | `false` | Parodykite slankiojantį mygtuką. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Mygtukų dizainas. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Integruota piktograma arba paties vartotojo vaizdas. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , iki 90 000 simbolių | tuščias | Iš naujo užkoduota įkelto vaizdo kopija. Visa kita atmetama. |
| `claimWidgetImageFill` | loginis | `false` | Leiskite pasirinktiniam vaizdui užpildyti visą mygtuką (nenaudojamas tablečių dizaine). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Mygtuko dydis. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Mygtuko neskaidrumas (visas neskaidrumas, kol yra atlygis). |
| `claimWidgetAutoHide` | loginis | `false` | Rodyti mygtuką tik tada, kai yra atlygis. |
| `claimWidgetPos` | `{x, y}` arba `null` | `null` | Nutempta padėtis. |

### Diagnostika ir būsena

| Raktas | Tipas / diapazonas | Numatytasis | Reikšmė |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | loginis; iki 60 įrašų | `true` ; `[]` | Veiksmų žurnalas. |
| `activeSection` | skyriaus ID | `playback` | Paskutinis atidarytas puslapis. |
| `resetBackup` | nustatymų objektas | `null` | Momentinė nuotrauka, padaryta prieš nustatant iš naujo arba importuojant. |

<a id="core-utilities"></a>
## Pagrindinės komunalinės paslaugos

| Funkcija | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `detectLanguage` | — → lokalė | Vaikščioja `navigator.languages` ​​, atvaizduoja regioninius variantus ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) ir grąžina pirmąją palaikomą lokalę arba `en` . |
| `dictFor` | lang → žodynas | Grąžina lokalės vertimo lentelę, grįžtant prie pagrindinės kalbos, o tada į anglų kalbą. |
| `t` / `T` | lang, klavišas, vars → eilutė | Išsprendžia raktą su pakeitimu `{placeholder}` ; `T` vartoja dabartinę kalbą. |
| `diagText` | indeksas, kokybė → eilutė | Grąžina vieną iš lokalizuotų diagnostinių sakinių. |
| `log` | …args → tuščias | Konsolės registravimas su scenarijaus priešdėliu. |
| `clamp` , `sleep` , `esc` | reikšmė → reikšmė | Diapazono ribojimas, pažadais pagrįstas delsimas ir HTML pabėgimas. |
| `normalizeQuality` | tekstas → eilutė | Sumažina kokybės etiketę ir pašalina tarpą. |
| `debounce` | fn, palaukite → funkcija | Trailing debounce naudojant `flush` metodą. |
| `onLocationChange` | atgalinis skambutis → negalioja | Aptinka vieno puslapio naršymą įvesdamas `pushState` / `replaceState` , klausydamas `popstate` ir apklausdamas kartą per sekundę. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | įvykis → eilutė/loginis | Sukurkite ir palyginkite klavišų kombinacijas iš fizinio rakto kodo. |
| `mkPointer` | tipas, papildomas → įvykis | Sukuria `PointerEvent` (arba `MouseEvent` kai nepasiekiamas), naudojamas Kick's ARIA meniu valdyti. |
| `waitFor` | zondas, skirtasis laikas, žingsnis → reikšmė / nulis | Apklausos, kol zondas grąžins reikšmę arba pasibaigs skirtasis laikas. |
| `imageToDataUrl` | vaizdas → eilutė | Padaro vaizdą į kvadratinę drobę (išlaikant proporcijas, `willReadFrequently` ), bando 128, 96 ir 64 pikselius ir pateikia ne didesnį nei 70 000 simbolių PNG duomenų URL. |

<a id="settings-storage"></a>
## Nustatymų saugykla

| Funkcija | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `sanitizeProfiles` | objektas → objektas | Išlaiko daugiausia 200 profilių su galiojančiais raktais ir fiksuoja kiekvieną lauką; avataras turi būti „Kick“ vaizdo URL. |
| `sanitizeSettings` | objektas, su atsargine kopija → objektas | Patvirtina kiekvieną nustatymą (tipus, diapazonus, leistinas reikšmes), perkelia 1,1–1,3 nustatymus (senusi kokybė, spartusis klavišas, animacija ir sekcijos klavišai) ir taiko kalbos taisyklę. |
| `legacyHotkey` | reikšmė → eilutė | Konvertuoja objekto formos spartųjį klavišą į kombinuotą eilutę. |
| `Store.load` / `Store.save` | — / nustatymai → nustatymai/tuščia | Perskaitykite ir parašykite išvalytą objektą `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | pleistras, `{undo}` → negalioja | Sujungia pataisą, dezinfekuoja, išsaugo trumpu atmetimu ir pasirinktinai išsiunčia anuliavimo momentinę kopiją (saugoma tik atmintyje, iki 15). |
| `storage` klausytojas | įvykis → negalioja | Iš naujo įkelia nustatymus, kai juos pakeičia kitas „Kick“ skirtukas, todėl skirtukai niekada neperrašo vienas kito. |

<a id="player-synchronization-playersync"></a>
## Grotuvo sinchronizavimas ( `PlayerSync` )

### Kanalo ir profilio pagalbininkai

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `isVod` | — → Būlio | Iš URL aptinka VOD puslapį. |
| `channelKey` | — → eilutė | Sukuria stabilų `channel:slug` raktas (arba `vod:id` , `kick:home` ), išsaugodamas rezultatą tris sekundes. VOD puslapiuose naudojama kanalo nuoroda, esanti arčiausiai grotuvo. |
| `channelSlug` | — → eilutė | Grąžina kanalo mygtuko dalį. |
| `profile` | klavišas → objektas/nulis | Skaito išsaugotą profilį. |
| `profileActive` | — → objektas/nulis | Grąžina dabartinį profilį tik tada, kai jis įjungtas ir nėra pašalintas. |
| `isExcluded` | — → Būlio | Patikrina, ar automatika išjungta šiame kanale. |
| `updateProfile` | pleistras, raktas → negalioja | Sukuria arba sujungia profilį ir pažymi `updatedAt` . |
| `saveCurrentChannel` | — → objektas/nulis | Išsaugo dabartinę žiūrinčiojo kokybę, garsumą, nutildymą, greitį ir tyliąją būseną kaip įgalintą profilį ir nuskaito puslapį, ieškodamas kanalo pseudoportreto. |
| `effective` | — → objektas | Išsprendžia garsumą, nutildymą, tylą, greitį ir tiesioginio vaizdo / VOD kokybę iš aktyvaus profilio arba visuotinių nustatymų. |
| `setStatus` | būsena, rezultatas → negalioja | Atnaujina būseną ir paskutinio rezultato kodus, rodomus antraštėje ir diagnostikoje. |

### Rasti ir vairuoti Kick's žaidėją

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `findMainVideo` | — → vaizdo įrašas / nulis | Parenka didžiausią matomą `<video>` . |
| `streamKey` | — → eilutė | Vieną kartą viename sraute pateikia puslapio kelią, naudojamą kokybei taikyti. |
| `isAccountButton` | mygtukas → loginis | Atmeta antraštės, avataro ir paskyros mygtukus. |
| `findSettingsButton` | vaizdo įrašas → mygtukas / nulis | Leistuvo pavaros mygtukas randamas pagal etiketę arba apatiniame dešiniajame vaizdo įrašo kampe. |
| `revealControls` | vaizdo įrašas → negalioja | Siuntimai rodomi ant įvykių, kad būtų rodomi paslėpti valdikliai. |
| `simulateClick` | elementas → tuštuma | Siunčia visą žymiklio įvykių seką, kurios reikia „Kick“ meniu. |
| `menuItems` | — → elementas[] | Išvardija matomus `menuitemradio` įrašus. |
| `openQualityMenu` | — → mygtukas/nulis | Atidaro krumpliaračio meniu, pereina į kokybės įrašą, kai pasirodo aukščiausio lygio meniu, ir laukia parinkčių. |
| `closeMenu` | mygtukas → pažadas | Meniu uždaromas tik tada, kai jis vis dar atidarytas (aklas antras spustelėjimas gali jį atidaryti iš naujo), naudojant atsarginę pabėgimo funkciją. |
| `readMenu` | — → elementas[] | Užfiksuoja siūlomas savybes ir patikrintą. |
| `scanQualities` | — → Pažadas<boolean> | Atidaro meniu, įrašo turimas savybes ir uždaro (naudojama diagnostikos). |
| `activate` | elementas → Pažadas | Paspaudžia vieną parinktį ir laukia, kol ji bus pažymėta. |
| `selectQuality` | norima, atsarginė → Pažadėk | Pasirenkama pageidaujama kokybė, kitu atveju žemesnė, arba Auto. |
| `desiredQuality` | — → eilutė | Parenka kokybę, kuri bus taikoma iš profilio, nuostatos arba paskutinio rankinio pasirinkimo. |
| `applyQualityOnce` | streamKey → Promise | Vieną kartą sraute pritaiko pageidaujamą kokybę, uždaro meniu ir praneša apie sėkmę ar nesėkmę. |
| `watchManualQuality` | — → negalioja | Išmoksta naują „paskutinį kartą naudotą“ kokybę tik iš autentiškų (patikimų) paspaudimų, todėl automatiniai paspaudimai ir atsarginiai paspaudimai niekada neperrašo išsaugotų verčių. |

### Garsumas, tylus režimas, greitis ir stebėjimas

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `applyVolume` | vaizdo įrašas, tylus → tuščias | Rašo efektyvų garsumą ir nutildymo būseną (pažymėta kaip paties scenarijaus pakeitimas). |
| `trackInput` | — → negalioja | Įrašo paskutinio patikimo žymeklio, ratuko, prisilietimo ar klaviatūros įvesties laiką. |
| `reassertVolume` | vaizdo įrašas → negalioja | Sugrąžina išsaugotą garsumą, kai puslapis jį pakeitė be jokio vartotojo įvesties (greitas ribojamas iki aštuonių grįžimų per dešimt sekundžių). |
| `watchVolume` | vaizdo įrašas → negalioja | Įsiklauso į `volumechange` : vartotojo atlikti pakeitimai išsaugomi, o puslapiais pagrįsti – grąžinami. |
| `checkLoud` | garsas, nutildytas → tuščias | Įspėja vieną kartą, kai garsumas peržengia slenkstį. |
| `buildGraph` | vaizdo įrašas → grafikas / nulis | Sujungia vaizdo įrašą į `AudioContext` per stiprinimo mazgą; praneša, kai svetainė to neleidžia. |
| `applySilent` | vaizdo įrašas → negalioja | Nustato 0 stiprinimą tyliam atkūrimui arba atgal į 1, kai reikia, atnaujina kontekstą. |
| `applyRate` | vaizdo įrašas, jėga → negalioja | Nustato išsaugotą greitį; `1` nėra priverstas, nebent žiūrovas ką tik jį pasirinko, todėl paties Kicko tiesioginis pasivijimas yra gerbiamas. |
| `applyMedia` | vaizdo įrašas, `{rate}` → negalioja | Pakartotinai pritaiko garsumą, tylųjį režimą ir, pasirinktinai, greitį, nepaliečiant kokybės. |
| `monitorFreeze` | vaizdo įrašas → negalioja | Aptinka sustojusį grotuvą (įstrigo laikas) arba juodą ekraną (laikas juda be iššifruotų kadrų) ir suaktyvina aliarmą bei pasirenkamą atkūrimą. Veikia paslėptuose skirtukuose. |

### Ciklas ir gyvavimo ciklas

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `sync` | — → Pažadas | Pagrindinė kilpa: monitoriai užstringa, suriša klausytojus, taiko tylųjį režimą, garsumą, greitį ir kokybę, gerbia saugųjį režimą ir išskyrimus, tada iškviečia `Extras.tick` . |
| `resync` | — → Pažadas | Priverčia iš naujo pereiti (naudojami išankstiniai nustatymai, greiti veiksmai ir kokybės pokyčiai). |
| `init` | — → negalioja | Pradedamas pirmasis sinchronizavimas, naršymo klausytojas ir 1,5 sekundės intervalas. |

<a id="page-extras-extras"></a>
## Puslapio priedai ( `Extras` )

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `root` , `layoutState` | — → elementas / `{chat, sidebar}` | Skaitykite „Kick“ išdėstymo būseną iš `data-chat` ir `data-sidebar` puslapio konteineryje. |
| `isDesktop` | — → Būlio | Išdėstymo automatizavimas veikia tik darbalaukio pločio. |
| `click` | elementas → loginis | Paspaudimai per `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → mygtukas/nulis | Pokalbių kambaryje raskite sutraukimo mygtuką ir mygtuką „Rodyti pokalbį“ (pagal piktogramą, o ne pagal kalbą). |
| `setChat` , `setSidebar` | rodyti → loginis | Perkelkite pokalbį arba kairįjį meniu į pageidaujamą būseną paspausdami paties Kick mygtukus. |
| `applyLayout` | — → negalioja | Vieną kartą kiekviename puslapyje pritaiko įsimintą išdėstymą, niekada nekovojant su rankiniais pakeitimais. |
| `isTyping` | — → Būlio | Tiesa, kol žiūrovas rašo lauką; automatinės pretenzijos laukia. |
| `rewardTrigger` , `popoverCard` | — → mygtukas/nulis | Raskite dovanų mygtuką ir premijos iššokančią kortelę. |
| `rewardAvailable` | — → Būlio | Aptinka paties Kick signalą „galimas atlygis“ (animuotas raginimas veikti). |
| `isEnabled` | mygtukas → loginis | Matoma ir neišjungta. |
| `claimDrops` | — → Pažadas<number> | Paspaudžia įgalintus paraiškų teikimo mygtukus, kad būtų baigti kritimai apdovanojimų skydelyje. |
| `claimDaily` | trigeris → pažadas<number> | Atidaromas apdovanojimų langas, vieną kartą paspaudžiamas kiekvienas įgalintas paraiškos mygtukas (niekada to paties mygtuko du kartus), tada uždaromas langas. |
| `claimRewards` | `{manual}` → Pažadas<number> | Vykdo visą pretenziją, praneša apie rezultatą ir paleidžia garsą; rankinis paleidimas ignoruoja spausdinimą ir praneša, kai nėra ko reikalauti. |
| `normName` | tekstas → eilutė | Normalizuoja pavadinimus, kad atitiktų ( `_` ir tarpus `-` ). |
| `findAvatar` | šliužas → styga | Grąžina puslapyje matomą kanalo pseudoportretą (naudojamą prieš išsaugant kanalą). |
| `scanAvatars` | — → negalioja | Saugo avatarus išsaugotiems kanalams, kuriems jų trūksta. |
| `tick` | streamKey → negalioja | Planuoklis iškviečiamas iš `sync` : taiko išdėstymą, nuskaito avatarus, laukia pranešimo apie atlygį (pranešimo režimas, su uždelsimu ir dviejų minučių atvėsimu) arba patikrina pasirinktą intervalą ir apklausia kritimų skydelį. |

<a id="interface-building-blocks"></a>
## Sąsajos kūrimo blokai

| Funkcija | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `I` | vardas → svg | Eilutinio brūkšnio piktograma. |
| `fmtValue` | formatas, neapdorotas → eilutė | Formatuoja slankiklio reikšmes (procentais, pikseliais, sekundėmis). |
| `normSearch` , `englishOf` , `searchText` | tekstas → eilutė | Paieškos tekstas be kirčio, ​​įskaitant anglišką išverstos etiketės pavadinimą. |
| `row` | raktas, etiketė, valdiklis, parinktys → html | Nustatymo eilutė; sukrautas pagal numatytuosius nustatymus, įterptas tik jungikliams, su pasirenkamu pagalbos perjungikliu. |
| `sw` , `toggleRow` | … → html | Jungiklio valdymas ir paruošta jungiklių eilė. |
| `chip` , `seg` , `qualityChips` | … → html | Lustai, segmentuoti valdikliai ir kokybės tinklelis. |
| `range` | attr, raktas, parinktys → html | Slankiklis su užpildymo takeliu ir tiesiogine verte. |
| `card` , `btn` , `ib` | … → html | Kortelė, teksto mygtukas ir piktogramos mygtukas. |
| `timeStr` | laiko žyma → eilutė | Lokalizuotas laikrodžio laikas. |
| `setPref` | raktas, reikšmė → negalioja | Įrašo grotuvo nuostatas į aktyvų kanalo profilį arba į visuotinius nustatymus. |
| `fxBtn` | raktas, reikšmė, etiketė, yra → html | Efektų rinkiklio plytelė su nedideliu peržiūros glifu. |
| `avatarHtml` | vardas, url → html | Avataras su atsargine raide; nepavykęs vaizdas pašalinamas. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → reikšmė | Sukurkite greitojo paraiškos mygtuko žymėjimą tiek tiesioginiam mygtukui, tiek nustatymų peržiūrai. |

<a id="settings-pages-pages"></a>
## Nustatymų puslapiai ( `PAGES` )

| Puslapis | Turinys |
|---|---|
| `playback` | Išsaugoti šį kanalą, išankstiniai nustatymai, kokybė (automatinis taikymas, tiesioginė transliacija, VOD, atsarginė dalis), garsumas (automatinis taikymas, slankiklis, nutildymas, tylus atkūrimas, garsus įspėjimas) ir greitis. |
| `channels` | Veikimo veiksmai, esamas kanalas su mygtuku **Išsaugoti šį kanalą** , pristabdyti / išskirti jungiklius ir redaktorių, tada išsaugotų kanalų sąrašas (ieškoti, rūšiuoti, prisegti filtras, grupės, redaguoti / atlikti, ištrinti) su atsargine kopija ir atkūrimu. |
| `tools` | Išsijungimo laikmatis, puslapio išdėstymas, apdovanojimai (automatinis paraiška, režimas, delsa arba intervalas, pretenzija dabar), greito paraiškos mygtuko nustatymai su tiesiogine peržiūra, stabdymo signalas ir greiti veiksmai. |
| `notifications` | Jungikliai, dydis, trukmė, neskaidrumas, peržiūra, padėties nustatymas iš naujo ir istorija. |
| `sounds` | Pagrindinis jungiklis ir garsumas, kiekvieno įvykio jungikliai, garsai ir peržiūros. |
| `appearance` | Tema, stilius, akcento spalvos, tankis, kontrastas, teksto dydis, suliejimas, centravimas ir kalba. |
| `motion` | Tiesioginė peržiūra, išankstiniai nustatymai ir rinkikliai, skirti atviram efektui, užvedimo efektui, indikatoriui, greičiui ir piktogramų animacijai. |
| `shortcuts` | Spartieji meniu klavišai ir veiksmų spartieji klavišai su perrišimu. |
| `diagnostics` | Būsena, nuskaitymas, ataskaita, kokybės ir konfliktų patikrinimai, saugus režimas ir veiksmų žurnalas. |
| `about` | Versija, nuorodos, eksportavimas / importavimas, anuliavimas, atkūrimas ir nustatymas iš naujo. |

<a id="panel-controller-gui"></a>
## Skydelio valdiklis ( `GUI` )

### Statyba ir atvaizdavimas

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `build` | — → negalioja | Sukuria šešėlinio DOM pagrindinį kompiuterį, skydelį, tostą ir tiesioginę sritį, tada sujungia įvykius. |
| `applyLook` | — → negalioja | Taiko temą, stilių, akcentą, suliejimą, teksto mastelį, efektus, kalbos atributo ir tosto nustatymus kaip atributus ir CSS kintamuosius. |
| `renderChrome` | — → negalioja | Pateikiamas pavadinimas, paieškos rezervuota vieta, pristabdymo mygtukas, poraštės užuomina ir greitojo paraiškos mygtukas. |
| `renderNav` | — → negalioja | Atvaizduoja sugrupuotą šoninę juostą. |
| `renderPage` | parinktys → negalioja | Atvaizduojamas aktyvus puslapis (arba visi puslapiai ieškant), išsaugomas slinkties ir klaviatūros fokusavimas. |
| `filterRows` | — → negalioja | Taiko paieškos filtrą eilutėms, kortelėms ir puslapiams. |
| `channelEditor` | raktas, profilis → html | Vieno kanalo profilio redaktorius. |
| `refreshAll` , `onExternalChange` | — → negalioja | Nustačius iš naujo, importavus, anuliavus ar pakeitus iš kito skirtuko, viską pateikti iš naujo. |

### Įvykių ir nustatymų pakeitimai

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `wire` | — → negalioja | Prideda deleguotas spustelėjimo, įvesties, keitimo, ratuko ir slinkties tvarkykles bei skydelio vilkimą. |
| `onClick` , `onInput` , `onChange` | įvykis → negalioja | Siųskite spustelėjimus, slankiklio judesius ir teksto redagavimus į nustatymus, profilius ar veiksmus. |
| `applyRange` | raktas, reikšmė → negalioja | Taiko slankiklio reikšmę (tūrį, suliejimą, neskaidrumą, trukmę...). |
| `setSetting` , `setChannel` | raktas / pleistras → negalioja | Išsaugokite nustatymą arba profilio pakeitimą ir nustumkite paveiktą dalį į grotuvą. |
| `pushToPlayer` | taikymo sritis, raktas → tuščias | `media` iš naujo pritaiko garsumą, tylųjį režimą ir greitį; `all` taip pat vėl pritaiko kokybę. Garsumas, nutildymas, tylus režimas ir greitis niekada iš naujo neatidaro kokybės meniu. |
| `act` | pavadinimas, elementas → Pažadas | Vykdo pavadintus veiksmus: išankstinius nustatymus, kanalų išsaugojimą ir pašalinimą, atsarginę kopiją, importavimą / eksportavimą, paraiškas, miego laikmatį, sparčiuosius klavišus, diagnostiką ir kt. |
| `resetSection` | id → negalioja | Atkuria vienos sekcijos numatytuosius nustatymus. |
| `restoreVolume` | — → negalioja | Išsaugotą garsumą pritaiko iš naujo. |
| `toggleLayout` | kuri → negalioja | Paslepia arba parodo pokalbį arba kairįjį meniu ir prisimena pasirinkimą. |
| `confirm` , `closeModal` | pranešimas, parinktys / rezultatas → Pažadas / negalioja | Patvirtinimo dialogo langas skydelyje (identiškas kiekvienoje naršyklėje). |
| `download` , `pickFile` , `pickImage` | … → negalioja | Išsaugokite JSON, perskaitykite JSON ir pasirinkite greitojo paraiškos mygtuko vaizdą. |
| `startCapture` , `finishCapture` | ID / kombinacija → negalioja | Iš naujo susiekite spartųjį klavišą, atmesdami dublikatus. |
| `replayMock` | — → negalioja | Atkuria atviro efektą animacijos peržiūroje. |

### Įrankiai ir diagnostika

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minutės / — → negalioja | Pradėkite, atšaukite ir parodykite miego laikmatį (pabaigoje jis pristabdo vaizdo įrašą). |
| `toggleFocusView` | — → Pažadas | Įeina per visą leistuvo sudėtinį ekraną arba iš jo iš jo. |
| `statusText` , `resultText` , `syncDiagnostics` | — → eilutė/tuščia | Lokalizuota antraštės ir diagnostikos puslapio būsena. |
| `record` | pranešimas, lygis → negalioja | Į veiksmų žurnalą įtraukiamas įrašas su laiko žyma. |
| `copyDiagnostics` | — → Pažadas | Nukopijuoja trumpą ataskaitą (versija, būsena, savybės, puslapio tipas, vartotojo agentas). |
| `checkQuality` , `checkConflicts` | — → Pažadas/negaliojantis | Patikrinkite, ar siūloma pageidaujama kokybė, ir išvardykite nustatymus, kurie neveikia vienas kitam. |

### Greitos pretenzijos mygtukas

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `renderClaimWidget` | — → negalioja | Sukuria, atnaujina arba pašalina slankiojantį mygtuką ir pradeda jo vienos sekundės būsenos apklausą. |
| `syncClaimWidget` | — → negalioja | Rodo žiedą ir tašką „galimas atlygis“, užimtumo būseną ir automatinio slėpimo taisyklę. |
| `placeClaimWidget` | — → negalioja | Nustatykite mygtuką ir prispauskite jį prie lango. |
| `wireClaimWidget` | elementas → tuštuma | Vilkimas naudojant penkių pikselių slenkstį (vilkimas niekada neskaičiuojamas kaip paspaudimas), padėties išsaugojimas ir paspaudimas, pagal kurį vykdomas neautomatinis reikalavimas. |

### Pranešimai, garsas ir skydelio elgsena

| Metodas | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `notify` | žinutė, rūšis, trukmė, jėga → negalioja | Rodo tostą (nebent nuslopinamas), įrašo istoriją ir paskelbia tekstą tiesioginiame regione. |
| `notifyQuality` | taikoma, kokybė → negalioja | Atkuria rezultato garsą, registruoja ir rodo lokalizuotą pranešimą. |
| `initToastPosition` , `wireToastDrag` | — → negalioja | Atkurkite ir išsaugokite nuvilktą skrudintos duonos padėtį. |
| `onAvatars` | — → negalioja | Atnaujina puslapius, kuriuose rodomi avatarai. |
| `ensureAudio` | — → kontekstas | Sukuria ir atnaujina bendrinamą `AudioContext` (atrakinama pirmuoju vartotojo gestu). |
| `playSound` , `stopSounds` | pavadinimas, peržiūra → negalioja | Generuokite ir sustabdykite žiniatinklio garso signalus. |
| `playFreezeAlarm` , `alertFrozen` | jėga → tuščia | Paleiskite penkių natų žadintuvą ir pakelkite užšalimo pranešimą. |
| `placePanel` , `wirePanelDrag` | padėtis → tuščia | Įdėkite skydelį lango viduje ir padarykite antraštę vilkimą. |
| `open` , `close` , `toggle` | — → negalioja | Valdykite skydelio, apklausos, fokusavimo ir meniu garsus. |
| `syncVolumeControls` | — → negalioja | Kai skydelis atidarytas, garsumo slankiklis sinchronizuojamas su grotuvu. |

<a id="hotkeys-and-startup"></a>
## Spartieji klavišai ir paleidimas

| Funkcija | Parametrai / grąža | Ką ir kaip tai daro |
|---|---|---|
| `isolateKeys` | — → negalioja | Užregistruota `document-start` fiksavimo fazėje: klaviatūros įvykiai, ateinantys iš skydelio, nustoja sklisti į Kick (todėl tarpas, F, M ir rodyklės niekada nesuaktyvina žaidėjo sparčiųjų klavišų), o Tab yra įstrigęs dialogo lange. |
| `setupHotkeys` | — → negalioja | Valdo klavišų fiksavimą perrišimui, Escape (modalinis, išskleidžiamasis, skydelis), meniu sparčiuosius klavišus ir veiksmo sparčiuosius klavišus; kombinacijos su modifikatoriumi arba klavišu F veikia net renkant tekstą. |
| `init` | — → negalioja | Sukuria skydelį, įdiegia sparčiuosius klavišus ir paleidžia `PlayerSync` ; apsaugotas nuo dvigubos injekcijos. |

<a id="kick-page-dependencies"></a>
## Atsikratykite puslapio priklausomybių

Scenarijus remiasi dabartiniu Kick žymėjimu. Kur įmanoma, jis naudoja piktogramas, atributus ir struktūrą, o ne matomą tekstą, todėl veikia visomis sąsajos kalbomis. Jei „Kick“ juos pakeis, atitikimo funkcija nustos veikti (likusieji veikia toliau).

| Ypatybė | Ko jis ieško |
|---|---|
| Kokybė | Matomas `<video>` , grotuvo `button[aria-haspopup="menu"]` ir `[role="menuitemradio"]` įrašai. |
| Išdėstymas | Konteineris su `data-sidebar` ir `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , piktogramos mygtukas `CollapseRight` viduje `#channel-chatroom` ir `MessagesOutline` piktogramos mygtukas, skirtas pokalbiui rodyti. |
| Pranešimas apie atlygį | `video` , kurio šaltinyje yra `reward-available` , arba `[role="group"]` kortelė, kurioje yra vaizdo įrašas `daily-rewards` . |
| Atlygio reikalavimas | `button[aria-haspopup="dialog"][aria-controls]` (dovanos piktograma), jo valdomas dialogo langas ( `data-state` ), įgalinti paraiškos mygtukai su antriniu `.contents` ir uždarymo mygtukas su `.sr-only` etikete. |
| Lašai | `#rewards-panel` sąrašo elementai su `[role="progressbar"][data-state="complete"]` ir įgalintu mygtuku. |
| Avatarai | `img[alt]` elementai, kurių šaltinis yra `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalizavimas

Kiekviena etiketė, pagalbos pranešimas, klaida, dialogo langas ir pranešimas pereina per 38 lokalių vertimo tvarkyklę. Trūksta raktų grįžta į anglų kalbą. Naujas sąsajos tekstas kartu su funkcija, kuri jį prideda, išverstas į visas palaikomas kalbas. Kalbos parinkiklis rodo vėliavėles ir vietinius pavadinimus; sąsaja pirmą kartą paleidžiama vadovaujasi naršyklės kalba, o vėliau prisimena aiškų pasirinkimą.

<a id="safety-privacy-and-compatibility"></a>
## Sauga, privatumas ir suderinamumas

- Nustatymai dezinfekuojami prieš saugojimą; neteisingos reikšmės grįžta į saugias numatytąsias vertes.
- Kanalų pavadinimai, pastabos, pranešimų tekstas ir diagnostikos išvestis pašalinami prieš įterpiant HTML.
- Tinkinto mygtuko piktograma iš naujo užkoduojama iš drobės ir išsaugoma tik kaip leistino vaizdo tipo duomenų URL; jis niekada nepalieka naršyklės.
- Shadow DOM išlaiko scenarijaus stilius atskirtus nuo Kick; klaviatūros įvykiai iš skydelio yra atskirti nuo Kick sparčiųjų klavišų.
- Automatiniai veiksmai praleidžia neįtrauktus kanalus, saugųjį režimą ir trūkstamus grotuvo elementus. Teikiant atlygį niekada nepaspaudžiamas tas pats mygtukas du kartus per vieną paleidimą ir laukiama, kol žiūrintysis įveda tekstą.
- Scenarijus neteikia tinklo užklausų; naujinimai gaunami iš vartotojo scenarijų tvarkyklės arba leidimų puslapio.
- Esami vietiniai nustatymai išsaugomi pereinant iš 1.1.0, 1.2.0 ir 1.3.0.
