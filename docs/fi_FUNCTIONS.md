<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · **Suomi** · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — toimintoviite

Viite Kick Stream Tweaksiin 1.3.1. Se kuvaa mitä kukin toiminnallinen alue tekee, kuinka asetukset tallennetaan, mistä Kickin sivun osista skripti riippuu ja kuinka kukin käyttäjäkirjoituksessa nimetty funktio tai menetelmä toimii. Katso [arkisto](https://github.com/ebayybe/kick-stream-tweaks) ja [muutosloki](../CHANGELOG/en_CHANGELOG.md) .

> Nimet vastaavat lähdettä. `void` tarkoittaa, että toiminto toimii sivuvaikutusten kautta. Objektissa on `Object.method` muodossa kirjoitettu menetelmä ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Sisältö

1. [Arkkitehtuuri](#architecture)
2. [Käyttäjiä osoittava käyttäytyminen](#user-facing-behavior)
3. [Asetusten viite](#settings-reference)
4. [Perusapuohjelmat](#core-utilities)
5. [Asetusten tallennus](#settings-storage)
6. [Soittimen synkronointi ( `PlayerSync` )](#player-synchronization-playersync)
7. [Sivun lisäosat ( `Extras` )](#page-extras-extras)
8. [Käyttöliittymän rakennuspalikoita](#interface-building-blocks)
9. [Asetussivut ( `PAGES` )](#settings-pages-pages)
10. [Paneeliohjain ( `GUI` )](#panel-controller-gui)
11. [Pikanäppäimet ja käynnistys](#hotkeys-and-startup)
12. [Kick sivuriippuvuudet](#kick-page-dependencies)
13. [Lokalisointi](#localization)
14. [Turvallisuus, yksityisyys ja yhteensopivuus](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arkkitehtuuri

Userscript on yksi itsenäinen tiedosto, joka suoritetaan `document-start` `@grant none` . Siinä ei ole rakennusvaihetta eikä se tee omia verkkopyyntöjä.

| Kerros | Kohde/alue | Vastuu |
|---|---|---|
| Tiedot | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Käännökset 38 kielelle, lokalisoidut diagnostiikkaviestit, lippu-SVG:t ja kielten nimet. |
| Kokoonpano | `CONFIG` , `DEFAULTS` | Vakiot (valitsimet, uudelleenyritysrajat, esiasetukset, osiot) ja oletusasetukset. |
| Varastointi | `sanitizeSettings` , `Store` , `persist` | Vahvistaa ja tallentaa asetukset `localStorage` ; säilyttää muistissa olevan kumoamispinon. |
| Pelaajan logiikka | `PlayerSync` | Etsii videon, palauttaa laadun, äänenvoimakkuuden, nopeuden ja äänettömän tilan, tarkkailee jäätymistä. |
| Sivun avustajat | `Extras` | Asettelupainikkeet, palkintojen lunastaminen, kanavan avatarit ja tausta-aikataulu. |
| Käyttöliittymä | `PAGES` , `GUI` , helpers | Shadow-DOM-paneeli, ilmoitukset, äänet, kelluva pikailmoituspainike, pikanäppäimet. |

Tiedonkulku: 1,5 sekunnin `PlayerSync.sync` silmukka lukee voimassa olevat asetukset (ensin kanavaprofiili, sitten globaali), ottaa ne käyttöön soittimessa ja kutsuu `Extras.tick` . Käyttäjän toiminnot kulkevat `GUI` -käsittelijöiden kautta, jotka päivittävät asetukset `persist` ja työntävät soittimeen vain asianomaisen osan ( `media` tai `all` ).

<a id="user-facing-behavior"></a>
## Käyttäjiä osoittava käyttäytyminen

| Alue | Käyttäytyminen |
|---|---|
| Pelaajan sinnikkyys | Tallentaa live-/VOD-laadun, äänenvoimakkuuden, mykistystilan, äänettömän tilan ja nopeuden ja ottaa ne käyttöön, kun uusi stream havaitaan. Sivun itse tekemät muutokset (esim. Kick nollaa äänenvoimakkuuden 50 %) palautetaan; vain katsojan omat toiminnot päivittävät tallennetut arvot. |
| Laatu | Valitsee haluamasi laadun soittimen valikosta, palaa seuraavaan alempaan laatuun (tai Automaattiseen), kun se ei ole käytettävissä, ja sulkee valikon uudelleen. Vain aidot käyttäjän napsautukset opettavat skriptille uuden "viimeksi käytetyn" laadun. |
| Äänenvoimakkuus ja äänetön toisto | Äänenvoimakkuus ja mykistys palautetaan streamia kohden. Äänetön toisto reitittää videon Web Audio -moottorin läpi ilman vahvistusta, joten suoratoisto jatkuu taustavälilehdellä ilman mykistystä. |
| Kanavaprofiilit | **Tallenna tämä kanava** tallentaa katsottavan kanavan nykyisen laadun, äänenvoimakkuuden, nopeuden ja äänen. Profiilit sisältävät myös muistiinpanoja, ryhmiä, pin-tilan, avatarin ja käytössä/poissuljetut liput. |
| Esiasetukset | Säästä kaistanleveyttä, paras laatu, hiljainen katselu ja VOD yhdellä napsautuksella. |
| Paneeli | `F2` tai mukautettu pikanäppäin avaa kiinteän leveyden (680 px) paneelin, jossa on ryhmitelty sivupalkki, haku, Kick- ja Minimal-tyylit, vaaleat/tummat teemat, 14 korostusväriä sekä värivalitsin, kompakti asettelu, taustan sumeus, tekstin skaalaus, korkea kontrasti ja animaatiosäätimet. |
| Hae | Aksenttiherkkä, vastaa käyttöliittymän kieltä ja englanninkielisiä nimiä ja vastaa osien tai korttien otsikoita. Paneelissa kirjoitetut näppäinpainallukset eivät koskaan saavuta Kickin pikanäppäimiä. |
| Liukusäätimet | Jokainen liukusäädin reagoi napsautuksiin, vetämistä, näppäimistön nuolia ja hiiren rullaa. |
| Äänet | Web Audio -vihjeitä valikkotoimintoihin, asetusten muutoksiin, laadun onnistumiseen/epäonnistumiseen ja äänenvoimakkuuden palauttamiseen, jokaisessa on kytkin, esikatselu ja äänenvoimakkuus. |
| Ilmoitukset | Lokalisoidut viestit, jotka voidaan vetää, skaalata, tehdä läpinäkyviksi, hiljentää (älä häiritse, hiljainen koko näyttö) ja tallentaa historiaan. |
| Jäätymishälytys | Havaitsee pysähtyneen soittimen tai mustan näytön, toistaa kovan hälytyksen (jopa piilotetussa välilehdessä äänitehostekytkimestä riippumatta) ja näyttää ilmoituksen. |
| Palkinnot | Valinnainen automaattinen lunastus odottaa Kickin palkintoilmoitusta (tai suoritetaan aikataulun mukaan), avaa palkintoikkunan, lunastaa saatavilla olevat ja sulkee sen. Kelluva, vedettävä pikavaatimuspainike tekee saman yhdellä napsautuksella. |
| Asettelu | Piilottaa keskustelun ja tiivistää vasemman valikon paneelista tai pikanäppäimillä muistaen valinnaisen valinnan jokaiselle streamille. |
| Työkalut | Uniajastin, tarkennus (koko näytön) näkymä, soittimen uudelleensynkronointi ja vikasietotila, joka keskeyttää jokaisen automaattisen muutoksen. |
| Diagnostiikka | Live-tila, havaitut ominaisuudet, videon resoluutio, laadun tarkistus, ristiriitojen tarkistus, toimintaloki ja kopioitava raportti. |
| Tiedot | Asetusten vienti/tuonti, kumoaminen, palautus nollauksen jälkeen, tallennettujen kanavien varmuuskopiointi/palautus. |
| Yksityisyys | Asetukset, profiilit, lokit ja historiat säilyvät selaimen tallennustilassa. Mitään ei lähetetä minnekään. |

<a id="settings-reference"></a>
## Asetusten viite

`sanitizeSettings` vahvistaa kaikki arvot; mikä tahansa virheellinen palaa oletusarvoon. Alueita valvotaan.

### Pelaaja

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `autoQualityEnabled` | boolen | `true` | Ota haluamasi laatu käyttöön automaattisesti. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Laatua live-lähetyksiin ja VOD:iin. `auto` tarkoittaa "muista viimeinen valintani". |
| `lastLiveQuality` , `lastVodQuality` | sama | `auto` | Viimeinen laatu, jonka katsoja poimi käsin. |
| `qualityFallback` | `lower` , `auto` | `lower` | Mitä tehdä, kun haluttua laatua ei tarjota. |
| `autoVolumeEnabled` | boolen | `true` | Palauta ja suojaa tallennettu asema. |
| `volume` | 0-1 | `1` | Tallennettu äänenvoimakkuus. |
| `muted` | boolen | `false` | Mykistystila tallennettu. |
| `silent` | boolen | `false` | Äänetön toisto (nolla-äänikaavio, soitinta ei mykistetty). |
| `playbackRate` | 0,25–2,5 | `1` | Tallennettu nopeus; `1` ei ole koskaan pakotettu. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolen; 60–100, vaihe 5 | `true` ; `85` | Suuren äänenvoimakkuuden varoitus. |
| `safeMode` | boolen | `false` | Keskeytä jokainen automaattinen muutos. |
| `channelProfiles` | esine, enintään 200 | `{}` | Kanavakohtaiset profiilit (katso alla). |

Kanavaprofiilin kentät: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (vain `https://…kick.com/images/user/…` URL-osoitteet), `note` (240 merkkiä), `group` (40 merkkiä), `lastUsed` `updatedAt` At .

### Ilmoitukset ja äänet

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `notificationsEnabled` | boolen | `true` | Näytä tulosilmoitukset. |
| `doNotDisturb` , `quietFullscreen` | boolen | `false` , `true` | Estä ilmoitukset ja äänet tai vain koko näytön tilassa. |
| `notificationScale` | 0,8–1,4 | `1` | Ilmoituksen koko. |
| `notificationDuration` | 1500–12000 ms, vaihe 500 | `3500` | Kuinka kauan ilmoitus säilyy. |
| `notificationOpacity` | 0,35–1 | `0.95` | Ilmoitusten läpinäkyvyys. |
| `notificationShowIcon` | boolen | `true` | Näytä tilakuvake. |
| `notificationPosition` | `{x, y}` tai `null` | `null` | Vedetty sijainti. |
| `notificationHistoryEnabled` , `notificationHistory` | boolen; enintään 30 merkintää | `true` ; `[]` | Ilmoitushistoria. |
| `soundEffectsEnabled` , `soundVolume` | boolen; 0-1 | `false` ; `0.35` | Pääkytkin ja äänenvoimakkuus. |
| `soundEvents` , `soundEventVolumes` | tapahtumaa kohden: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | kaikki päällä; `0.35` | Tapahtumakohtainen kytkin ja äänenvoimakkuus. |

### Ulkonäkö, liike ja pikakuvakkeet

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Väri teema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Paneelin visuaalinen tyyli. |
| `accentColor` | `#rrggbb` | `#53fc18` | Aksenttiväri. |
| `compactMode` , `highContrast` | boolen | `false` | Tiheys ja kontrasti. |
| `backdropBlur` | 0–12 px | `6` | Taustan hämärtyminen paneelin takana (toimii molemmissa tyyleissä). |
| `textScale` | 0,9–1,3 | `1` | Tekstin koko. |
| `language` , `languageChosen` | aluekoodi; boolen | selaimen kieli; `false` | Käyttöliittymä seuraa selaimen kieltä, kunnes kieli valitaan, sitten valinta muistetaan. |
| `panelPosition` | `{x, y}` tai `null` | `null` | Vedetyn paneelin sijainti. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Animaation nopeus. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Paneelin avaus/sulje-efekti. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hover-tehoste. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logon/ilmaisimen animaatio. |
| `iconAnimations` | boolen | `true` | Animoi sivupalkki, nollaa ja ohjekuvakkeet. |
| `hotkey` | yhdistelmämerkkijono | `F2` | Avaa tai sulkee paneelin. |
| `actionHotkeys` | yhdistelmäjouset | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Vaihda ilmoitukset, tarkennusnäkymä, nollaa laatu, palauta äänenvoimakkuus, vaihda chat, vaihda vasenta valikkoa. |

Näppäinyhdistelmät tallennetaan merkkijonoina, kuten `Alt+Q` ja ne yhdistetään fyysisen näppäimen kanssa, joten ne toimivat missä tahansa näppäimistöasettelussa. Asetukset vanhemmista versioista, joissa on objektimuotoinen pikanäppäin, muunnetaan automaattisesti. Paneelin leveys on kiinteä 680 px (rajoitettu ikkunan kokoon); aiempi leveysasetus jätetään huomioimatta.

### Työkalut

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `autoRecoverStall` | boolen | `false` | Kokeile `play()` tä, kun jumiutuminen havaitaan. |
| `freezeAlertEnabled` , `freezeSound` | boolen | `true` | Jäädyttää ilmoitus ja hälytysääni. |
| `freezeSeconds` | 5–60, vaihe 5 | `10` | Sekuntia ei edistystä ennen hälytystä. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolen | `false` | Muistettu asettelu, käytetty kerran sivulla. |
| `autoClaimRewards` | boolen | `false` | Ota automaattinen palkintojen hakeminen käyttöön. |
| `claimMode` | `notify` , `interval` | `notify` | Lunasta, kun Kick näyttää ilmoituksensa tai aikataulun mukaan. |
| `claimDelaySec` | 0–120, vaihe 5 | `5` | Odota, kun ilmoitus tulee näkyviin (ilmoitustila). |
| `claimIntervalMin` | 5–120, vaihe 5 | `10` | Minuutit tarkistusten välillä (aikataulutettu tila). |

### Pikahakupainike

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `claimWidget` | boolen | `false` | Näytä kelluva painike. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Painikkeiden suunnittelu. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Sisäänrakennettu kuvake tai käyttäjän oma kuva. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , enintään 90 000 merkkiä | tyhjä | Uudelleenkoodattu kopio ladatusta kuvasta. Kaikki muu hylätään. |
| `claimWidgetImageFill` | boolen | `false` | Anna mukautetun kuvan täyttää koko painike (ei käytetä pillereiden suunnittelussa). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Painikkeen koko. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Painikkeen peittävyys (täysi läpinäkyvyys, kun palkinto on saatavilla). |
| `claimWidgetAutoHide` | boolen | `false` | Näytä painike vain, kun palkinto on saatavilla. |
| `claimWidgetPos` | `{x, y}` tai `null` | `null` | Vedetty sijainti. |

### Diagnostiikka ja tila

| Avain | Tyyppi / alue | Oletus | Merkitys |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolen; enintään 60 merkintää | `true` ; `[]` | Toimintaloki. |
| `activeSection` | osion tunnus | `playback` | Viimeksi avattu sivu. |
| `resetBackup` | asetusobjekti | `null` | Tilannekuva otettu ennen nollausta tai tuontia. |

<a id="core-utilities"></a>
## Ydinapuohjelmat

| Toiminto | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `detectLanguage` | — → alue | Kävelee `navigator.languages` ​​, kartoittaa alueelliset variantit ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) ja palauttaa ensimmäisen tuetun kielialueen tai `en` . |
| `dictFor` | lang → sanakirja | Palauttaa kielen käännöstaulukon peruskieleen ja sitten englannin kieleen. |
| `t` / `T` | lang, avain, vars → merkkijono | Ratkaisee avaimen korvauksella `{placeholder}` ; `T` käyttää nykyistä kieltä. |
| `diagText` | indeksi, laatu → merkkijono | Palauttaa yhden paikallisista diagnostisista lauseista. |
| `log` | …args → tyhjä | Konsolin kirjaus komentosarjan etuliitteellä. |
| `clamp` , `sleep` , `esc` | arvo → arvo | Alueen rajoittaminen, lupauspohjainen viive ja HTML-pako. |
| `normalizeQuality` | teksti → merkkijono | Pienentää laatumerkintää ja poistaa välilyönnit. |
| `debounce` | fn, odota → funktio | Jäljellä oleva debounce `flush` . |
| `onLocationChange` | takaisinsoitto → mitätön | Havaitsee yhden sivun navigoinnin kääreillä `pushState` / `replaceState` , kuuntelee `popstate` ja pollaa kerran sekunnissa. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | tapahtuma → merkkijono/boolean | Rakenna ja vertaa avainkomboja fyysisen avainkoodin perusteella. |
| `mkPointer` | tyyppi, ylimääräinen → tapahtuma | Luo `PointerEvent` (tai `MouseEvent` jos se ei ole käytettävissä), jota käytetään Kickin ARIA-valikoiden ohjaamiseen. |
| `waitFor` | anturi, aikakatkaisu, askel → arvo/nolla | Pollaus, kunnes anturi palauttaa arvon tai aikakatkaisu päättyy. |
| `imageToDataUrl` | kuva → merkkijono | Skaalaa kuvan neliön muotoiseksi kankaaksi (säilytä mittasuhteet, `willReadFrequently` ), yrittää 128, 96 ja 64 pikseliä ja palauttaa enintään 70 000 merkin pituisen PNG-tietojen URL-osoitteen. |

<a id="settings-storage"></a>
## Asetusten tallennustila

| Toiminto | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `sanitizeProfiles` | esine → esine | Säilyttää enintään 200 profiilia kelvollisilla avaimilla ja kiinnittää joka kentällä; avatarin on oltava Kick-kuvan URL-osoite. |
| `sanitizeSettings` | objekti, varmuuskopiolla → objekti | Vahvistaa kaikki asetukset (tyypit, alueet, sallitut arvot), siirtää 1,1–1,3-asetukset (vanha laatu, pikanäppäin, animaatio ja osioavaimet) ja soveltaa kielisääntöä. |
| `legacyHotkey` | arvo → merkkijono | Muuntaa objektin muotoisen pikanäppäimen yhdistelmämerkkijonoksi. |
| `Store.load` / `Store.save` | — / asetukset → asetukset/tyhjä | Lue ja kirjoita desinfioitu objekti `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | korjaustiedosto, `{undo}` → mitätön | Yhdistää korjaustiedoston, puhdistaa, tallentaa lyhyellä palautuksella ja valinnaisesti työntää kumoamisvedoksen (säilytetään vain muistissa, enintään 15). |
| `storage` | tapahtuma → mitätön | Lataa asetukset uudelleen, kun toinen Kick-välilehti muuttaa niitä, joten välilehdet eivät koskaan korvaa toisiaan. |

<a id="player-synchronization-playersync"></a>
## Soittimen synkronointi ( `PlayerSync` )

### Kanava- ja profiiliapulaiset

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `isVod` | — → Boolen | Havaitsee VOD-sivun URL-osoitteesta. |
| `channelKey` | — → merkkijono | Rakentaa vakaan `channel:slug` key (tai `vod:id` , `kick:home` ) ja tallentaa tuloksen välimuistiin kolmen sekunnin ajan. VOD-sivuilla käytetään soitinta lähinnä olevaa kanavalinkkiä. |
| `channelSlug` | — → merkkijono | Palauttaa kanavanäppäimen slug-osan. |
| `profile` | avain → objekti/nolla | Lukee tallennetun profiilin. |
| `profileActive` | — → objekti/nolla | Palauttaa nykyisen profiilin vain, kun se on käytössä eikä poissuljettu. |
| `isExcluded` | — → Boolen | Tarkistaa, onko automaatio poistettu käytöstä tällä kanavalla. |
| `updateProfile` | paikka, avain → mitätön | Luo tai yhdistää profiilin ja leimaa `updatedAt` . |
| `saveCurrentChannel` | — → objekti/nolla | Tallentaa katsojan nykyisen laadun, äänenvoimakkuuden, mykistyksen, nopeuden ja äänettömän tilan käyttöön otettuna profiilina ja etsii sivulta kanavan avatarin. |
| `effective` | — → esine | Ratkaisee äänenvoimakkuuden, mykistyksen, äänettömän, nopeuden ja live/VOD-laadun aktiivisesta profiilista tai yleisistä asetuksista. |
| `setStatus` | tila, tulos → mitätön | Päivittää otsikossa ja diagnostiikassa näkyvät tilan ja viimeisen tuloksen koodit. |

### Kickin pelaajan löytäminen ja ajaminen

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `findMainVideo` | — → video/null | Valitsee suurimman näkyvän `<video>` . |
| `streamKey` | — → merkkijono | Palauttaa sivupolun, jota käytetään laadun soveltamiseen kerran streamia kohden. |
| `isAccountButton` | painike → boolean | Hylkää otsikon, avatarin ja tilipainikkeet. |
| `findSettingsButton` | video → painike/nolla | Löytää soittimen rataspainikkeen tunnisteen tai videon oikean alakulman läheisyyden perusteella. |
| `revealControls` | video → mitätön | Lähetykset leijailevat tapahtumia, joten piilotetut säätimet tulevat näkyviin. |
| `simulateClick` | elementti → tyhjä | Lähettää koko osoitin-tapahtumasarjan, jota Kickin valikot tarvitsevat. |
| `menuItems` | — → elementti[] | Luetteloi näkyvät `menuitemradio` merkinnät. |
| `openQualityMenu` | — → painike/nolla | Avaa ratasvalikon, siirtyy laatukohtaan, kun ylätason valikko tulee näkyviin, ja odottaa vaihtoehtoja. |
| `closeMenu` | painike → Lupa | Sulkee valikon vain, jos se on edelleen auki (sokea toinen napsautus voi avata sen uudelleen) Escape-varaustoiminnolla. |
| `readMenu` | — → elementti[] | Kirjaa tarjotut ja tarkastetut ominaisuudet. |
| `scanQualities` | — → Lupaa<boolean> | Avaa valikon, tallentaa käytettävissä olevat ominaisuudet ja sulkee sen (diagnostiikan käyttämä). |
| `activate` | kohde → Lupa | Napsauta yhtä vaihtoehtoa ja odottaa, kunnes se on valittu. |
| `selectQuality` | haluttu, vara → Lupa | Valitsee pyydetyn laadun, muussa tapauksessa seuraavan alemman tai Automaattinen. |
| `desiredQuality` | — → merkkijono | Valitsee käytettävän laadun profiilista, asetuksesta tai viimeisestä manuaalisesta valinnasta. |
| `applyQualityOnce` | streamKey → Lupa | Käyttää haluttua laatua kerran streamia kohden, sulkee valikon ja ilmoittaa onnistumisesta tai epäonnistumisesta. |
| `watchManualQuality` | — → mitätön | Oppii uuden "viimeksi käytetyn" laadun vain aidoista (luotetuista) napsautuksista, joten automaattiset napsautukset ja varatoiminnot eivät koskaan korvaa tallennettuja arvoja. |

### Äänenvoimakkuus, äänetön tila, nopeus ja valvonta

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `applyVolume` | video, hiljainen → tyhjä | Kirjoittaa tehokkaan äänenvoimakkuuden ja mykistyksen tilan (merkitty komentosarjan omaksi muutokseksi). |
| `trackInput` | — → mitätön | Tallentaa viimeisen luotetun osoittimen, kiekon, kosketuksen tai näppäimistön ajan. |
| `reassertVolume` | video → mitätön | Asettaa tallennetun äänenvoimakkuuden takaisin, kun sivu muutti sitä ilman käyttäjän syötteitä (nopeus rajoitettu kahdeksaan palautukseen 10 sekunnissa). |
| `watchVolume` | video → mitätön | Kuuntelee `volumechange` : käyttäjälähtöiset muutokset tallennetaan, sivupohjaiset peruutetaan. |
| `checkLoud` | äänenvoimakkuus, mykistetty → tyhjä | Varoittaa kerran, kun äänenvoimakkuus ylittää kynnyksen. |
| `buildGraph` | video → kaavio/nolla | Johtaa videon `AudioContext` vahvistussolmun kautta; raportoi, kun sivusto ei salli sitä. |
| `applySilent` | video → mitätön | Asettaa vahvistukseksi 0 äänettömälle toistolle tai takaisin 1:ksi ja jatkaa kontekstia tarvittaessa. |
| `applyRate` | video, pakottaa → mitätöi | Asettaa tallennetun nopeuden; `1` ei ole pakotettu, ellei katsoja juuri sitä ole valinnut, joten Kickin omaa live-eden kiinniottelua kunnioitetaan. |
| `applyMedia` | video, `{rate}` → mitätön | Ottaa uudelleen käyttöön äänenvoimakkuuden, äänettömän tilan ja valinnaisesti nopeuden koskematta laatuun. |
| `monitorFreeze` | video → mitätön | Havaitsee pysähtyneen soittimen (juoksuaika) tai mustan näytön (aika liikkuu ilman dekoodattuja kehyksiä) ja laukaisee hälytyksen ja valinnaisen palautuksen. Toimii piilotetuilla välilehdillä. |

### Silmukka ja elinkaari

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `sync` | — → Lupa | Pääsilmukka: monitorit jumittuvat, sitoo kuuntelijoita, käyttää hiljaista tilaa, äänenvoimakkuutta, nopeutta ja laatua, kunnioittaa turvatilaa ja poissulkemisia ja kutsuu sitten `Extras.tick` . |
| `resync` | — → Lupa | Pakottaa uuden passin (käytetään esiasetuksissa, nopeissa toimissa ja laatumuutoksissa). |
| `init` | — → mitätön | Käynnistää ensimmäisen synkronoinnin, navigointikuuntelijan ja 1,5 sekunnin intervallin. |

<a id="page-extras-extras"></a>
## Sivun lisäosat ( `Extras` )

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `root` , `layoutState` | — → elementti / `{chat, sidebar}` | Lue Kickin asettelun tila `data-chat` ja `data-sidebar` sivusäiliössä. |
| `isDesktop` | — → Boolen | Asetteluautomaatio toimii vain työpöydän leveydellä. |
| `click` | elementti → boolen | Napsautukset `PlayerSync.simulateClick` kautta. |
| `chatHideButton` , `chatShowButton` | — → painike/nolla | Etsi tiivistyspainike chat-huoneesta ja "näytä keskustelu" -painike (kuvakkeen, ei kielen mukaan). |
| `setChat` , `setSidebar` | näytä → boolean | Tuo chat tai vasen valikko haluttuun tilaan painamalla Kickin omia painikkeita. |
| `applyLayout` | — → mitätön | Käyttää muistettua asettelua kerran sivulla ilman, että se ei koskaan taistele manuaalisia muutoksia vastaan. |
| `isTyping` | — → Boolen | Totta, kun katsoja kirjoittaa kenttään; automaattiset korvaukset odottavat. |
| `rewardTrigger` , `popoverCard` | — → painike/nolla | Etsi lahjapainike ja palkintoponnahduskortti. |
| `rewardAvailable` | — → Boolen | Havaitsee Kickin oman "palkinto saatavilla" -signaalin (animoitu toimintakehotus). |
| `isEnabled` | painike → boolean | Näkyy eikä pois käytöstä. |
| `claimDrops` | — → Lupaa<number> | Painaa käytössä olevia vaatimuspainikkeita palkintopaneelin suoritetuille pudotuksille. |
| `claimDaily` | laukaisin → Lupaa<number> | Avaa palkintoikkunan, painaa jokaista käytössä olevaa vaatimuspainiketta kerran (ei koskaan samaa painiketta kahdesti) ja sulkee sitten ikkunan. |
| `claimRewards` | `{manual}` → Lupaus<number> | Suorittaa täyden vaatimuksen, raportoi tuloksen ja toistaa äänen; manuaaliset ajot ohittavat kirjoittamisen ja raportoivat, kun ei ole mitään väitettävää. |
| `normName` | teksti → merkkijono | Normalisoi nimet vastaavia ( `_` ja välilyöntejä `-` ) varten. |
| `findAvatar` | etana → merkkijono | Palauttaa sivulla näkyvän kanavan avatarin (käytetään ennen kanavan tallentamista). |
| `scanAvatars` | — → mitätön | Tallentaa avatarit tallennetuille kanaville, joista sellainen puuttuu. |
| `tick` | streamKey → void | Ajastin kutsuttiin `sync` : ottaa käyttöön asettelun, skannaa avatarit, odottaa palkintoilmoitusta (ilmoitustila, viiveellä ja kahden minuutin viilennyksellä) tai tarkistaa valitun aikavälin ja kyselyn pudotuspaneelista. |

<a id="interface-building-blocks"></a>
## Käyttöliittymän rakennuspalikoita

| Toiminto | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `I` | nimi → svg | Upotettu vedon kuvake. |
| `fmtValue` | muoto, raaka → merkkijono | Muotoilee liukusäätimen arvot (prosenttia, pikseliä, sekuntia). |
| `normSearch` , `englishOf` , `searchText` | teksti → merkkijono | Aksenttiherkkä hakuteksti, joka sisältää käännetyn tarran englanninkielisen nimen. |
| `row` | avain, otsikko, ohjausobjekti, asetukset → html | asetusrivi; oletuksena pinottu, vain kytkimiä varten, valinnaisella ohjekytkimellä. |
| `sw` , `toggleRow` | … → html | Kytkinohjaus ja valmis kytkinrivi. |
| `chip` , `seg` , `qualityChips` | … → html | Sirut, segmentoidut säätimet ja laaturuudukko. |
| `range` | attr, avain, asetukset → html | Liukusäädin täyttöraidalla ja live-arvolla. |
| `card` , `btn` , `ib` | … → html | Kortti, tekstipainike ja kuvakepainike. |
| `timeStr` | aikaleima → merkkijono | Lokalisoitu kellonaika. |
| `setPref` | avain, arvo → tyhjä | Kirjoittaa pelaaja-asetukset aktiiviseen kanavaprofiiliin tai yleisiin asetuksiin. |
| `fxBtn` | avain, arvo, tunniste, → html | Tehosteen valitsinlaatta pienellä esikatselukuvauksella. |
| `avatarHtml` | nimi, url → html | Avatar kirjaimella; epäonnistunut kuva poistetaan. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → arvo | Luo pikavaatimuspainikkeen merkintä sekä live-painikkeelle että asetusten esikatselulle. |

<a id="settings-pages-pages"></a>
## Asetussivut ( `PAGES` )

| Sivu | Sisältö |
|---|---|
| `playback` | Tallenna tämä kanava vihje, esiasetukset, laatu (automaattinen käyttö, live, VOD, vara), äänenvoimakkuus (automaattinen käyttö, liukusäädin, mykistys, äänetön toisto, kova varoitus) ja nopeus. |
| `channels` | Toimintaohjeet, nykyinen kanava **Tallenna tämä kanava** -painikkeella, keskeytä/poissulkevat kytkimet ja editori, sitten tallennettu kanavaluettelo (haku, lajittelu, kiinnityssuodatin, ryhmät, Muokkaa/Valmis, Poista) varmuuskopioinnin ja palautuksen kanssa. |
| `tools` | Uniajastin, sivun asettelu, palkinnot (automaattinen vaatimus, tila, viive tai väli, Lunasta nyt), pikaluottopainikkeen asetukset live-esikatselulla, jäädytyshälytys ja nopeat toiminnot. |
| `notifications` | Kytkimet, koko, kesto, peittävyys, esikatselu, sijainnin nollaus ja historia. |
| `sounds` | Pääkytkin ja äänenvoimakkuus, tapahtumakohtaiset kytkimet, äänenvoimakkuudet ja esikatselut. |
| `appearance` | Teema, tyyli, korostusvärit, tiheys, kontrasti, tekstin koko, sumeus, keskitys ja kieli. |
| `motion` | Live esikatselu, esiasetukset ja valitsimet avoimelle tehosteelle, hover-tehosteelle, ilmaisimelle, nopeudelle ja kuvakeanimaatioille. |
| `shortcuts` | Menu-pikanäppäin ja toimintopikanäppäimet, joissa on uudelleensidonta. |
| `diagnostics` | Tila, skannaus, raportti, laatu- ja ristiriitatarkistukset, vikasietotila ja toimintaloki. |
| `about` | Versio, linkit, vienti/tuonti, kumoa, palauta ja nollaa. |

<a id="panel-controller-gui"></a>
## Paneeliohjain ( `GUI` )

### Rakentaminen ja renderointi

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `build` | — → mitätön | Luo shadow-DOM-isäntä-, paneeli-, toast- ja live-alueen ja kytkee sitten tapahtumat. |
| `applyLook` | — → mitätön | Käyttää teemaa, tyyliä, korostusta, sumennusta, tekstin mittakaavaa, tehosteita, kielimääritteitä ja paahtoleipäasetuksia attribuutteina ja CSS-muuttujina. |
| `renderChrome` | — → mitätön | Näyttää otsikon, haun paikkamerkin, taukopainikkeen, alatunnisteen vihjeen ja pikavaatimuspainikkeen. |
| `renderNav` | — → mitätön | Muodostaa ryhmitellyn sivupalkin. |
| `renderPage` | valinnat → mitätön | Muodostaa aktiivisen sivun (tai kaikki sivut haun aikana), säilyttäen vieritys- ja näppäimistökohdistuksen. |
| `filterRows` | — → mitätön | Käyttää hakusuodatinta riveihin, kortteihin ja sivuihin. |
| `channelEditor` | avain, profiili → html | Muokkaus yhdelle kanavaprofiilille. |
| `refreshAll` , `onExternalChange` | — → mitätön | Renderöi kaikki uudelleen nollauksen, tuonnin, kumoamisen tai toisesta välilehdestä tehdyn muutoksen jälkeen. |

### Tapahtumat ja asetukset muuttuvat

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `wire` | — → mitätön | Liittää delegoidut napsautus-, syöttö-, muutos-, rulla- ja vierityskäsittelijät ja paneelin vedon. |
| `onClick` , `onInput` , `onChange` | tapahtuma → mitätön | Lähetä napsautukset, liukusäätimen liikkeet ja tekstimuokkaukset asetuksiin, profiileihin tai toimiin. |
| `applyRange` | avain, arvo → tyhjä | Käyttää liukusäätimen arvoa (äänenvoimakkuus, sumeus, peittävyys, kestot…). |
| `setSetting` , `setChannel` | avain/patch → mitätön | Tallenna asetus tai profiilimuutos ja työnnä kyseinen osa soittimeen. |
| `pushToPlayer` | ulottuvuus, avain → tyhjä | `media` käyttää uudelleen äänenvoimakkuutta, hiljaista tilaa ja nopeutta; `all` myös soveltaa uudelleen laatua. Äänenvoimakkuus, mykistys, äänetön tila ja nopeus eivät koskaan avaa laatuvalikkoa uudelleen. |
| `act` | nimi, elementti → Lupa | Suorittaa nimettyjä toimintoja: esiasetukset, kanavien tallentaminen ja poistaminen, varmuuskopiointi, tuonti/vienti, vaatimukset, uniajastin, pikakuvakkeet, diagnostiikka ja paljon muuta. |
| `resetSection` | id → mitätön | Palauttaa yhden osion oletusasetukset. |
| `restoreVolume` | — → mitätön | Ottaa tallennetun äänenvoimakkuuden uudelleen käyttöön. |
| `toggleLayout` | joka → mitätön | Piilottaa tai näyttää chatin tai vasemman valikon ja muistaa valinnan. |
| `confirm` , `closeModal` | viesti, valinnat / tulos → Lupa/ mitätöi | Paneelin sisäinen vahvistusikkuna (sama kaikissa selaimissa). |
| `download` , `pickFile` , `pickImage` | … → mitätön | Tallenna JSON, lue JSON ja valitse kuva pikavaatimuspainikkeelle. |
| `startCapture` , `finishCapture` | id / combo → void | Sido pikanäppäin uudelleen ja hylkää kaksoiskappaleet. |
| `replayMock` | — → mitätön | Toistaa avoimen tehosteen animaation esikatselussa. |

### Työkalut ja diagnostiikka

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minuuttia / — → mitätön | Käynnistä, peruuta ja näytä uniajastin (se keskeyttää videon lopussa). |
| `toggleFocusView` | — → Lupa | Siirtyy soittimen säilön koko näytölle tai poistuu siitä. |
| `statusText` , `resultText` , `syncDiagnostics` | — → merkkijono/tyhjäys | Otsikon ja diagnostiikkasivun lokalisoitu tila. |
| `record` | viesti, taso → mitätön | Lisää aikaleiman merkinnän toimintalokiin. |
| `copyDiagnostics` | — → Lupa | Kopioi lyhyen raportin (versio, tila, ominaisuudet, sivutyyppi, käyttäjäagentti). |
| `checkQuality` , `checkConflicts` | — → Lupaus/mitä | Varmista, että ensisijaista laatua tarjotaan ja luettele asetukset, jotka toimivat toisiaan vastaan. |

### Pikahakupainike

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `renderClaimWidget` | — → mitätön | Luo, päivittää tai poistaa kelluvan painikkeen ja käynnistää sen yhden sekunnin tilakyselyn. |
| `syncClaimWidget` | — → mitätön | Näyttää "palkinto saatavilla" -renkaan ja pisteen, varatun tilan ja automaattisen piilotussäännön. |
| `placeClaimWidget` | — → mitätön | Aseta painike ja kiinnitä se ikkunaan. |
| `wireClaimWidget` | elementti → tyhjä | Vedä viiden pikselin kynnysarvolla (vetämistä ei koskaan lasketa napsautukseksi), sijainnin tallennus ja klikkaus, joka suorittaa manuaalisen vaatimuksen. |

### Ilmoitukset, ääni ja paneelin toiminta

| Menetelmä | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `notify` | viesti, laji, kesto, voima → mitätön | Näyttää maljan (ellei sitä ole estetty), tallentaa historian ja ilmoittaa tekstin live-alueella. |
| `notifyQuality` | sovellettu, laatu → mitätön | Toistaa tulosäänen, kirjaa lokit ja näyttää lokalisoidun ilmoituksen. |
| `initToastPosition` , `wireToastDrag` | — → mitätön | Palauta ja tallenna vedetty paahtoleivän sijainti. |
| `onAvatars` | — → mitätön | Päivittää avatareja näyttävät sivut. |
| `ensureAudio` | — → konteksti | Luo jaetun `AudioContext` ja jatkaa sitä (lukitus avataan käyttäjän ensimmäisellä eleellä). |
| `playSound` , `stopSounds` | nimi, esikatselu → mitätön | Luo ja pysäytä Web Audio -vihjeet. |
| `playFreezeAlarm` , `alertFrozen` | voima → tyhjä | Soita viiden sävelen hälytys ja nosta jäätymisilmoitus. |
| `placePanel` , `wirePanelDrag` | asema → tyhjä | Aseta paneeli ikkunan sisään ja tee otsikosta vedettävä. |
| `open` , `close` , `toggle` | — → mitätön | Ohjaa paneelin, kyselyn, tarkennuksen ja valikon ääniä. |
| `syncVolumeControls` | — → mitätön | Pitää äänenvoimakkuuden liukusäätimen synkronoituna soittimen kanssa, kun paneeli on auki. |

<a id="hotkeys-and-startup"></a>
## Pikanäppäimet ja käynnistys

| Toiminto | Parametrit / paluu | Mitä ja miten se tekee |
|---|---|---|
| `isolateKeys` | — → mitätön | Rekisteröity `document-start` kaappausvaiheessa: paneelin sisältä tulevat näppäimistötapahtumat lakkaavat leviämästä Kickiin (joten Space, F, M ja nuolet eivät koskaan laukaise pelaajan pikanäppäimiä) ja Tab jää loukkuun dialogiin. |
| `setupHotkeys` | — → mitätön | Käsittelee näppäinkaappauksen uudelleensidontaa, Escapea (modaalinen, pudotusvalikko, paneeli), valikon pikanäppäimiä ja toimintonäppäimiä; Yhdistelmät muokkaimella tai F-näppäimellä toimivat myös kirjoitettaessa. |
| `init` | — → mitätön | Rakentaa paneelin, asentaa pikanäppäimet ja käynnistää `PlayerSync` ; suojattu kaksoisruiskeelta. |

<a id="kick-page-dependencies"></a>
## Kick sivuriippuvuudet

Käsikirjoitus perustuu Kickin nykyiseen merkintään. Aina kun mahdollista, se käyttää kuvakkeita, attribuutteja ja rakennetta näkyvän tekstin sijaan, joten se toimii edelleen kaikilla käyttöliittymäkielillä. Jos Kick muuttaa näitä, vastaavuustoiminto lakkaa toimimasta (loput jatkuvat).

| Ominaisuus | Mitä se etsii |
|---|---|
| Laatu | Näkyvä `<video>` , soittimen `button[aria-haspopup="menu"]` ja `[role="menuitemradio"]` . |
| Asettelu | Säilö, jossa on `data-sidebar` ja `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , `CollapseRight` kuvakepainike `#channel-chatroom` ja `MessagesOutline` kuvakepainike keskustelun näyttämistä varten. |
| Palkintoilmoitus | `video` , jonka lähde sisältää `reward-available` , tai `[role="group"]` kortti, joka sisältää `daily-rewards` videon. |
| Palkinnon hakeminen | `button[aria-haspopup="dialog"][aria-controls]` (lahjakuvake), sen hallitsema valintaikkuna ( `data-state` ), käytössä olevat vaatimuspainikkeet, joissa on `.contents` alakirja ja sulje-painike, jossa on `.sr-only` tunniste. |
| Pisarat | `#rewards-panel` luettelokohteet, joissa on `[role="progressbar"][data-state="complete"]` ja käytössä oleva painike. |
| Avatarit | `img[alt]` -elementit, joiden lähde on `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalisointi

Jokainen tarra, ohjeviesti, virhe, valintaikkuna ja ilmoitus käy läpi käännösratkaisun 38 kielelle. Puuttuvat avaimet palaavat englanniksi. Uusi käyttöliittymäteksti käännetään kaikille tuetuille kielille yhdessä sen lisäävän ominaisuuden kanssa. Kielen valitsin näyttää liput ja alkuperäiset nimet; käyttöliittymä noudattaa selaimen kieltä ensimmäisellä käyttökerralla ja muistaa sen jälkeen nimenomaisen valinnan.

<a id="safety-privacy-and-compatibility"></a>
## Turvallisuus, yksityisyys ja yhteensopivuus

- Asetukset desinfioidaan ennen varastointia; virheelliset arvot palaavat turvallisiin oletusarvoihin.
- Kanavien nimet, muistiinpanot, ilmoitusteksti ja diagnostiikkatulosteet on pakotettu ennen HTML-lisäystä.
- Mukautettu painikekuvake koodataan uudelleen kankaasta ja tallennetaan vain sallitun kuvatyypin data-URL-osoitteeksi. se ei koskaan poistu selaimesta.
- Shadow DOM pitää käsikirjoituksen tyylit erillään Kickistä; näppäimistötapahtumat paneelista on eristetty Kickin pikanäppäimistä.
- Automaattiset toiminnot ohittavat poissuljetut kanavat, vikasietotilan ja puuttuvat soitinelementit. Palkinnon lunastus ei koskaan paina samaa painiketta kahdesti yhdellä kertaa ja odottaa, kun katsoja kirjoittaa.
- Skripti ei tee verkkopyyntöjä; päivitykset tulevat käyttäjäskriptien hallinnasta tai Julkaisut-sivulta.
- Nykyiset paikalliset asetukset säilyvät, kun siirrytään versioista 1.1.0, 1.2.0 ja 1.3.0.
