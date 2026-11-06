<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · **Suomi** · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Kick-soittimesi muistettiin.** Laatu, äänenvoimakkuus ja nopeus palautetaan automaattisesti jokaisessa suoratoistossa nopean, täysin lokalisoidun ohjauspaneelin avulla.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Asentaa](#installation) · [Ominaisuudet](#features) · [Asetukset kartta](#settings-map) · [Pikanäppäimet](#shortcuts) · [Toimintoviittaus](../docs/fi_FUNCTIONS.md) · [Muutosloki](../CHANGELOG/fi_CHANGELOG.md) · [Julkaisut](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Ominaisuudet

- **Laatu, joka pysyy.** Valitse live- ja VOD-laatu kerran; sitä sovelletaan jokaiseen uuteen streamiin. Jos tarkka laatu puuttuu, skripti palaa seuraavaksi alempaan (tai automaattiseen).
- **Äänenvoimakkuus, joka takertuu.** Äänenvoimakkuus ja mykistys palautetaan streamia kohden, kovan äänenvoimakkuuden varoituksella ja live-liukusäätimellä, joka pysyy synkronoituna soittimen kanssa.
- **Kanavakohtaiset profiilit.** Avaa suoratoisto, paina **Tallenna tämä kanava** ja kanava muistaa oman laatunsa, äänenvoimakkuutensa, nopeudensa ja äänensä. Lisää ryhmä ja muistiinpano, keskeytä tallennetut asetukset tai sulje kanava kokonaan pois automaatiosta.
- **Nopeat esiasetukset.** Säästä kaistanleveyttä, paras laatu, hiljainen katselu ja VOD yhdellä napsautuksella.
- **Työkalut.** Uniajastin, tarkennusnäkymä, soittimen uudelleensynkronointi, sivuasettelun ohjaimet (piilota keskustelu, kutista vasen valikko) ja vikasietotila, joka keskeyttää kaikki automaattiset muutokset.
- **Jäätymishälytys.** Toistaa kovan hälytyksen ja näyttää ilmoituksen, kun soitin jumiutuu tai näyttää mustan näytön, vaikka välilehti olisi pienennetty.
- **Pikalunastuspainike.** Kelluva, vedettävä painike, joka lunastaa palkintosi yhdellä napsautuksella. Neljä mallia, viisi kuvaketta tai oma kuva, säädettävä koko ja peittävyys.
- **Lunasta palkinnot automaattisesti.** Valinnainen: odottaa Kickin palkintoilmoitusta (tai tarkistaa aikataulun), lunastaa saatavilla olevat ja sulkee ikkunan uudelleen (oletuksena pois päältä).
- **Hiljainen toisto.** Hiljentää streamin mykistämättä soitinta, joten sen toisto jatkuu taustavälilehdellä. Aseta se maailmanlaajuisesti tai tallennettua kanavaa kohti.
- **Hälytykset.** Ilmoitukset, joita voit vetää, muuttaa kokoa ja mykistää, sekä valinnaiset äänitehosteet tapahtumakohtaisella äänenvoimakkuudella.
- **Uudelleensuunniteltu käyttöliittymä.** Ryhmitetty sivupalkki, asetushaku, vaaleat ja tummat teemat, korostusvärit, kompakti tila, tekstin skaalaus ja suuri kontrasti.
- **Hallitsemasi animaatiot.** Live esikatselu, kolme esiasetusta ja erilliset avaus-, hiiri- ja ilmaisintehosteet. Kunnioita järjestelmän "vähennä liikettä" -asetusta.
- **38 kieltä** lipuilla. Käyttöliittymä noudattaa selaimesi kieltä ensimmäisellä käyttökerralla ja muistaa valintasi sen jälkeen.
- **Suunniteltu yksityinen.** Kaikki säilyy selaimessasi. Ei telemetriaa, ei verkkopyyntöjä.

<a id="installation"></a>
## Asennus

1. Asenna käyttäjäskriptien hallinta: [Tampermonkey](https://www.tampermonkey.net/) tai [Violentmonkey](https://violentmonkey.github.io/).
2. Avata [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) ja vahvista asennus.
3. Avaa mikä tahansa stream päällä [kick.com](https://kick.com) ja paina **F2**.

Päivitykset toimittaa käyttäjäskriptien hallinta. Voit myös katsoa [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) sivu.

## Kanavan asetusten tallentaminen

1. Avaa muokattavan kanavan stream.
2. Avaa paneeli (`F2`) ja paina **Tallenna tämä kanava** (**Kanavat**-sivulla tai **Toisto**-sivun vihjeestä). Nykyiset laatu-, äänenvoimakkuus-, nopeus- ja ääniasetukset tallennetaan kyseiselle kanavalle.
3. Hienosäädä niitä painikkeen alla olevassa editorissa. Ne otetaan käyttöön automaattisesti aina, kun avaat kyseisen kanavan.

Käytä valitsinta **Käytä tallennettuja asetuksia tälle kanavalle** keskeyttääksesi profiilin poistamatta sitä tai **Poista** poistaaksesi sen. Kaikki tallennetut kanavat on lueteltu kohdassa **Kanavat → Tallennetut kanavat**, jossa voit etsiä, lajitella, kiinnittää, ryhmitellä, lisätä muistiinpanoja, varmuuskopioida ja palauttaa niitä.

<a id="settings-map"></a>
## Asetukset kartta

| ryhmä | Sivu | Mikä on sisällä |
| --- | --- | --- |
| Pelaaja | **Toisto** | Esiasetukset, live/VOD-laatu, vara, äänenvoimakkuus, mykistys, kovan äänenvoimakkuuden varoitus, nopeus |
| Pelaaja | **kanavat** | Nykyinen kanavaprofiili, tallennetut kanavat, haku, ryhmät, muistiinpanot, varmuuskopio |
| Pelaaja | **Työkalut** | Uniajastin, sivun asettelu, automaattinen lunastuspalkkio, pikaluottopainike, jäädytyshälytys, pikatoiminnot, tarkennusnäkymä |
| Hälytykset | **Ilmoitukset** | Älä häiritse, koko, kesto, peittävyys, sijainti, historia |
| Hälytykset | **ääniä** | Pääkytkin ja äänenvoimakkuus, tapahtumakohtainen kytkin, äänenvoimakkuus ja esikatselu |
| Käyttöliittymä | **Ulkonäkö** | Teema, paneelityyli, korostusväri, tiheys, kontrasti, sumeus, tekstin asteikko, kieli |
| Käyttöliittymä | **Animaatiot** | Live esikatselu, esiasetukset, avaus/hover/ilmaisintehosteet, nopeus |
| Käyttöliittymä | **Pikanäppäimet** | Valikko- ja toimintopikanäppäimet |
| Järjestelmä | **Diagnostiikka** | Live-tila, laadun tarkistus, ristiriitojen tarkistus, vikasietotila, toimintaloki |
| Järjestelmä | **Tiedot ja tiedot** | Vie, tuo, kumoa, nollaa, palauta varmuuskopio, linkit |

Jokainen liukusäädin reagoi myös hiiren rullaan, kun pidät sitä. Käytä paneelin yläreunassa olevaa hakukenttää löytääksesi asetukset nimellä. Haku ymmärtää myös englanninkieliset nimet, joten se toimii samalla tavalla kaikilla käyttöliittymäkielillä, eivätkä siellä kirjoitetut näppäimet koskaan pääse sivulle.

## Pikahakupainike

Ota se käyttöön kohdassa **Työkalut → Pikahakupainike sivulla**. Pieni painike ilmestyy streamiin:

- **Vedä** se minne tahansa; sen asema muistetaan.
- **Napsauta** sitä lunastaaksesi palkintosi (se avaa palkintoikkunan, painaa *Claim*, sulkee ikkunan ja palaa streamiin).
- Se **hehkuu ja näyttää punaisen pisteen**, kun Kickin palkintoilmoitus tulee näkyviin. Ota *Näytä vain, kun palkinto on saatavilla* päälle, jotta se pysyy piilossa muun ajan.
- Valitse **tyyli** (Orb, Pill, Glass, Flat), sisäänrakennettu **kuvake** tai **oma kuvasi** (PNG, JPG, WebP, GIF tai SVG enintään 2 Mt; neliönmuotoiset kuvat läpinäkyvällä taustalla näyttävät parhailta), **koko** ja **opasiteetti**. Live-esikatselu näyttää jokaisen muutoksen.

Painike on erillinen *Automaattinen lunasta palkintoista*, joten voit lunastaa käsin, automaattisesti tai molemmilla.

<a id="shortcuts"></a>
## Pikanäppäimet

| Toiminta | Oletus |
| --- | --- |
| Avaa / sulje paneeli | `F2` |
| Ota ilmoitukset käyttöön | `Alt+N` |
| Vaihda chat | `Alt+C` |
| Vaihda vasen valikko | `Alt+S` |
| Tarkennusnäkymä | `Alt+F` |
| Palauta laatu | `Alt+Q` |
| Palauta äänenvoimakkuus | `Alt+V` |

Jokainen pikakuvake voidaan palauttaa kohtaan **Pikakuvakkeet**. Sidokset noudattavat fyysistä näppäintä, joten ne toimivat missä tahansa näppäimistöasettelussa.

<a id="languages"></a>
## Kielet

Arabia, valkovenäläinen, bulgaria, kiina (yksinkertaistettu), kiina (perinteinen), kroatia, tšekki, tanska, hollanti, englanti, englanti (Intia), suomi, ranska, saksa, kreikka, hindi, unkari, indonesia, italia, japani, korea, latvia, liettua, makedonia, malaiji, mongolia, ruotsi, norja, puola, portugali, thai, slovakki, venäjä ja vietnam.

## Vianetsintä

- **Laatua ei sovelleta.** Avaa **Diagnostiikka**, paina *Päivitä diagnostiikka* tarkistaaksesi Kickin tarjoamat ominaisuudet, ja sitten *Tarkista valittu laatu*. Jos kanava on suljettu pois tai vikasietotila on päällä, tilarivillä lukee niin.
- **Palkintoja ei lunastaa.** Automaattinen lunastus on oletuksena pois päältä. Ota se käyttöön kohdassa **Työkalut → Palkinnot** ja kokeile *Lunasta nyt*. Se toimii vain live-kanavilla, kun välilehti on näkyvissä etkä kirjoita chattiin. *Ilmoitus*-tilassa skripti reagoi Kickin omaan palkintobanneriin.
- **Hiljainen toisto ja ääni.** Hiljainen toisto ohjaa videon selaimen äänimoottorin läpi ilman vahvistusta. Jos sivusto estää sen, paneeli ilmoittaa siitä ja normaali ääni ei kosketa.
- **Jokin toimii oudosti.** Suorita *Tarkista ristiriidat* tai käytä *Nollaa-osiota* kyseisellä sivulla.
- **Asetukset näyttävät vääriltä päivityksen jälkeen.** Käytä **Tiedot ja tiedot → Kumoa** tai **Palauta varmuuskopio**.
- **Löysitkö virheen?** Paina *Kopioi diagnostiikka* ja liitä se a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Yksityisyys

Asetukset ja kanavaprofiilit tallennetaan selaimesi paikalliseen tallennustilaan osoitteessa kick.com. Skripti ei koskaan lähetä tietoja minnekään eikä pyydä ylimääräisiä käyttöoikeuksia (`@grant none`).

## Osallistuminen

Ongelmat ja vetopyynnöt ovat tervetulleita. Komentosarja on yksittäinen itsenäinen tiedosto, joten muutoksen kokeilu ei vaadi koontivaihetta: muokkaa `kick-stream-tweaks.user.js` ja lataa sivu uudelleen.

## Lisenssi

[MIT](./LICENSE)
