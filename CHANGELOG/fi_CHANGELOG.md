<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · **Suomi** · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks — muutosloki

Julkaisutiedot [Kick Stream Tweaks] (https://github.com/ebayybe/kick-stream-tweaks) -ohjelmasta, joka muistaa Kick-soittimen asetukset ja lisää konfiguroitavan ohjauspaneelin.

## v1.3.1 — 2026-11-06

> Asettelun koventaminen jokaiselle kielelle ja tekstin koolle, todella erottuva Minimal-tyyli, palkinnot ja asetteluapuohjelmat, pelaajan jäätymishälytys ja älykkäämpi oletuskieli.

### Lisätty

- **Soittimen jäätymishälytys.** Havaitsee pysähtyneen soittimen tai mustan näytön (videon aika liikkuu ilman dekoodattuja kehyksiä), toistaa kovan hälytysäänen ja näyttää ilmoituksen, vaikka välilehti olisi pienennetty. Konfiguroitava tunnistusaika (5–60 s), riippumaton äänen vaihtokytkin ja testipainike.
- **Lunasta palkintoja automaattisesti** (pois päältä oletuksena): avaa palkintoikkunan, lunastaa saatavilla olevat, sulkee sen uudelleen ja palaa streamiin. Myös palkintopaneelissa näkyvät pudotukset lunastetaan. Sisältää *Hae nyt* -painikkeen.
- **Palkintoaikataulu.** Oletusarvoisesti skripti odottaa Kickin omaa "lunasta palkintosi" -ilmoitusta ja lunastaa sen heti (valinnaisella 0–60 s viiveellä) kyselyn sijaan. Myös ajastettu tila (5–60 minuutin välein) on käytettävissä.
- **Pikalunastuspainike.** Pieni kelluva painike streamissa, joka lunastaa palkkiosi yhdellä napsautuksella. Vedä se minne tahansa (sijainti muistetaan), valitse yksi neljästä mallista (Orb, Pill, Glass, Flat), viidestä sisäänrakennetusta kuvakkeesta, koosta ja peittävyydestä, valinnaisesti näytä se vain, kun palkinto on saatavilla. Se hehkuu ja näyttää pisteen, kun Kickin palkintoilmoitus tulee näkyviin. Asetussivulla on suora esikatselu.
- **Oma kuvake.** Lataa PNG-, JPG-, WebP-, GIF- tai SVG-tiedosto (enintään 2 Mt) painikekuvakkeeksi, ja voit halutessasi täyttää koko painikkeen. Kuva koodataan uudelleen pieneen neliöön ja tallennetaan vain selaimeesi.
- **Hiiren rulla liukusäätimissä.** Jokaista liukusäädintä voidaan säätää hiiren rullalla samalla, kun sitä liikutetaan vierittämättä paneelia.
- **Function reference.** Uusi `en_FUNCTIONS.md` dokumentoi arkkitehtuurin, jokaisen asetuksen, jokaisen funktion ja Kickin sivun osat, joista komentosarja riippuu.
- **Ohjattu kanavan tallennus.** Vaiheittainen "Kuinka tallennetut kanavat toimivat" -kortti, yksi **Tallenna tämä kanava** -painike, joka tallentaa katsomasi kanavan nykyisen laadun, äänenvoimakkuuden, nopeuden ja äänen, yhden napsautuksen vihje tallentamattomien kanavien toistossa, vahvistuspala, jossa on merkintä *Muokkaa* / *Käytetty luetteloimatta* -painike asetusten poistamiseen ja tallentaminen -painike.
- **Hiljainen toisto.** Hiljentää streamin mykistämättä soitinta, joten se jatkaa toistoa taustavälilehdellä. Toimii maailmanlaajuisesti ja tallennettuja kanavia kohti (kanavaluettelossa näkyy *Silent*-tunniste).
- **Monikielisten asetusten haku.** Haku ei sisällä aksenttia, ja se vastaa myös englanninkielisiä nimiä, joten kirjoittamalla `volume` löydät asetuksen millä tahansa käyttöliittymäkielellä. Haku osion tai kortin otsikon perusteella näyttää koko osion.
- **Sivun asettelun säätimet**: piilota keskustelu ja kutista vasen valikko paneelista tai pikanäppäimillä (`Alt+C`, `Alt+S`), ja voit muistaa asettelun jokaiselle streamille.
- **Kuvakeanimaatiot** sivupalkkiin, nollaus- ja ohjekuvakkeet, omalla kytkimellä (myös osa animaation esiasetuksia).
- **Kanavien avatarit** on otettu Kickistä ja näkyvät tallennettujen kanavaluetteloiden kautta.
- 14 korostusväriä (oli 6).
- Paneelin sisäinen vahvistusikkuna, joka näyttää samalta kaikissa selaimissa.

### Muutettu

- **Käyttöliittymän kieli** seuraa nyt selaimen kieltä ensimmäisellä käyttökerralla. Kun valitset kielen, se muistetaan. Vanhemmista versioista siirretyt asetukset seuraavat selainta, kunnes kieli valitaan erikseen.
- Skripti alkaa nyt kohdasta `document-start`, joten sen näppäimistön eristys rekisteröidään ennen sivun omia kuuntelijoita.
- Asetusrivit on pinottu (tarra säätimen yläpuolella), joten teksti ei voi koskaan olla päällekkäin tai leikata millä tahansa kielellä, tekstin koossa tai paneelin leveydellä. Sivupalkin tarrat kietoutuvat sanan rajoihin.
- Animaatiovalitsimet rakennetaan uudelleen täysileveisiksi riveiksi kuvakkeilla, joten pitkät käännökset sopivat.
- **Minimal**-paneelityyli on nyt tasainen ja neliömäinen ilman hehkua, reunat korvataan jakajilla ja alleviivaustyylinen valinta, joten ero **Kick**-tyylisestä on ilmeinen.
- Paneelin kiinteä leveys on 680 px (se kutistuu sopimaan pieniin ikkunoihin). Paneelin leveysasetus ja koonmuutoskahva poistettiin, joten asettelut ovat samat kaikille.
- Ilmaisimen animaation otsikko ei enää ole "vihreä", kun käytetään eri korostusväriä.

### Korjattu

- Äänenvoimakkuuden, mykistyksen, äänettömän toiston, automaattisen äänenvoimakkuuden tai nopeuden muuttaminen vaikutti myös laatuun (laatuvalikon avaaminen uudelleen ja ilmoituksen näyttäminen). Nämä asetukset koskevat nyt vain sitä, mitä olet muuttanut; laatu otetaan käyttöön uudelleen vain, kun laatuasetus muuttuu.
- Asetushakuun kirjoittaminen voi laukaista Kickin pikanäppäimet (esim. Space vaihtoi streamin koko näytön tilaan). Paneelin sisällä olevat näppäimet eivät enää saavuta sivua.
- Haluttu äänenvoimakkuus ylikirjoitettiin, kun Kick nollasi soittimen omalle 50 %:lle uudelleenlatauksen jälkeen ja paneelin liukusäädin näytti 50 %. Muutokset, jotka sivu tekee itsestään, palautetaan nyt tallennettuun määrään. vain omat toimintasi päivittävät sen.
- Tekstin leikkaaminen ja päällekkäisyys ulkoasussa, animaatioissa ja pikanäppäimissä (pitkät tarrat, suuret tekstikoot, kapeat paneelit, pitkät käännökset).
- Minimal-tyyli poisti äänettömästi taustan sumennusasetuksen; blur toimii nyt molemmissa tyyleissä.
- Pikahakupainikkeen peittävyyden muuttaminen ei päivittänyt esikatselua.
- Liukusäätimet eivät reagoineet hiiren rullaan.
- Animaatiolaatat ("Scale", "Pop") täyttävät korttinsa.
- Profiilin poiston vahvistus käytti selaimen alkuperäistä valintaikkunaa.
- Uniajastimen siruja ei lokalisoitu.
- Tallennetuilla kanavilla ei näkynyt avatareja, eikä nykyisellä kanavalla näkynyt yhtään, ennen kuin sen profiili oli tallennettu.

### Yhteensopivuus

- Nykyiset asetukset ja tallennetut kanavat säilyvät päivitettäessä versioista 1.3.0, v1.2.0 ja v1.1.0.
- Skripti ei edelleenkään lähetä telemetriaa eikä tee omia verkkopyyntöjä.

### Linkkejä

- [Arkisto](https://github.com/ebayybe/kick-stream-tweaks)
- [Julkaisut](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Ongelmia](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 – 2026-11-03

> Täysi uudelleensuunnittelu, looginen asetusrakenne, uusittu animaatiojärjestelmä ja kierros luotettavuuskorjauksia soittimen automaatioon.

### Lisätty

- Uudelleen suunniteltu paneeli, jossa on ryhmitelty sivupalkki: **Soitin** (toisto, kanavat, työkalut), **hälytykset** (ilmoitukset, äänet), **käyttöliittymä** (ulkonäkö, animaatiot, pikakuvakkeet) ja **järjestelmä** (diagnostiikka, tiedot ja tietoja).
- Uusi **Animaatiot** -sivu: live-esikatseluvaihe, kolme yhden napsautuksen esiasetusta (täysi, vähennetty, pois päältä) ja erilliset valitsimet avaustehosteelle (ei mitään, häivytys, liuku, skaalaus, pop), hover-tehoste, ilmaisinanimaatio ja nopeus.
- Nopeat esiasetukset kaistanleveyden säästämiseen, parhaaseen laatuun, hiljaiseen katseluun ja VOD:iin, jotka otetaan käyttöön välittömästi.
- Laadukas poimintalaite on suunniteltu uudelleen lastuverkoksi; nopeus, tekstiasteikko ja uniajastin käyttävät siruja ja segmentoituja säätimiä pudotusvalikoiden sijaan.
- Kanavan sisäinen hallinta: haku, lajittelu, kiinnitys, ryhmät, muistiinpanot, kanavakohtainen muokkaus ja täydellinen varmuuskopiointi/palautus, kaikki ilman sisäkkäisiä valintaikkunoita.
- Sisäänrakennetut ääniasetukset tapahtumakohtaisella kytkimellä, äänenvoimakkuudella ja esikatselupainikkeella.
- Laatutarkistus diagnostiikassa: avaa soitinvalikon, tallentaa saatavilla olevat ominaisuudet ja sulkee sen uudelleen.
- Pikanäppäimet toimivat nyt missä tahansa näppäimistöasettelussa (niitä vastaavat fyysinen näppäin).
- Asetukset synkronoidaan avoimien Kick-välilehtien välillä.
- Korostusvärimallit mukautetun värivalitsimen vieressä, suurempi tekstimittakaava ja suosii-vähennetyn liikkeen suojaus.

### Muutettu

- Asetukset on tallennettu kevyemmässä muodossa; 1.2.x-kokoonpano, pikanäppäimet ja animaatiovalinnat siirretään automaattisesti.
- Toistonopeutta käytetään vain, kun se poikkeaa 1×:stä, joten Kickin omaa live-edge catch-up -toimintoa ei enää ohiteta.
- Kumoamishistoria säilytetään muistissa sen sijaan, että se kirjoitettaisiin paikalliseen tallennustilaan.
- Äänitapahtumat, ilmoitukset ja pikanäppäimet jakavat yhden johdonmukaisen säädinsarjan.
- Tilanneprofiili-valitsin korvataan yhden napsautuksen esiasetuksilla.

### Korjattu

- Soittimen valikon sulkeminen laadun käyttöönoton jälkeen ei enää vaaranna sen avaamista uudelleen.
- Varalaatu (esimerkiksi 720p käytettävissä olevan 1080p sijaan) ei enää korvaa kanavalle tallennettua ensisijaista laatua.
- Vain laadukkaiden tuotteiden todelliset napsautukset päivittävät "viimeksi käytetyn" laadun; automaattiset napsautukset jätetään huomioimatta.
- Asetusten haku ei enää epäonnistu kirjoittamisen jälkeen (tapahtumakohde katosi Shadow DOM:n sisällä).
- Yhdessä välilehdessä tehdyt muutokset eivät voi enää korvata toisen välilehden asetuksia.
- Paneelin pikanäppäimet eivät enää katkea muissa kuin latinalaisissa asetteluissa.
- Väärät tarrat diagnostiikkalokin ohjaimissa ja haja korean sana japanin kirjoitusten otsikossa.
- Pysähtyneen toiston tarkistukset ja suoratoiston synkronointi keskeytyvät välilehden ollessa piilossa.

### Poistettu

- Ominaisuudet, joita ei voitu todentaa Kickin pelaajaa vastaan tai jotka kopioivat sen: matalan viiveen asetus, piilota soittimen ohjaimet tyhjäkäynnillä ja GitHub-pohjainen paneelin sisäinen päivitysten tarkistus (käytä käyttäjäskriptien hallintaohjelman päivityksiä tai Julkaisut-sivua).
- Ylisuunnitellut vaihtoehdot: tallennetut ulkoasuprofiilit, osien näyttäminen/piilota/järjestäminen, vaihtoehtoiset navigointitilat, yhteensopivuuden ja käännöksen kattavuuden tarkistukset, satunnaiset/vieritä/osio-animaatiot, tapahtumakohtaiset ilmoitusten kestoajat, kanavaavattarit, ryhmien värit, manuaalinen järjestys, joukkovalinta, kanavakohtainen historia ja automaattinen puhdistus.

### Yhteensopivuus

- Nykyiset asetukset ja tallennetut kanavat säilyvät päivitettäessä versioista 1.2.0 ja v1.1.0.
- Asetukset pysyvät paikallisina selaimessa; komentosarja ei lähetä telemetriaa tai tee verkkopyyntöjä.

### Linkkejä

- [Arkisto](https://github.com/ebayybe/kick-stream-tweaks)
- [Julkaisut](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Ongelmia](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Laajensi alkuperäisen laadun ja äänenvoimakkuuden apuohjelman täydelliseksi soittimen asetustyökaluksi.

### Lisätty

- Kanavakohtaiset profiilit laadulle, äänenvoimakkuudelle, toistonopeudelle ja mykistystilalle.
- Tallennettu kanavaluettelo muistiinpanoilla, ryhmillä, profiilin muokkaus ja tuonti/vienti.
- Äänitehosteet globaalilla kytkimellä, yksittäisillä tapahtumakytkimillä, esikatseluilla ja tapahtumakohtaisella äänenvoimakkuudella.
- Ilmoitukset laadun muutoksista, palautetusta äänenvoimakkuudesta ja epäonnistuneista toimista.
- Ilmoitushistoria, toimintaloki ja diagnostiikkatyökalut selkeällä säätimellä.
- Laadun saatavuuden tarkistukset, ristiriitatarkistukset ja yhteensopivuustarkastukset.
- Vikasietotila automaattisten soittimen muutosten poistamiseen väliaikaisesti käytöstä.
- Pikanäppäimet, paneelin vetäminen, paneelin koon muuttaminen ja keskipaneelin toiminto.
- Kick- ja Minimal-paneelityylit, kompakti asettelu ja animaatiosäätimet.
- Uniajastin, koko näytön tarkennustila, soittimen uudelleensynkronointi ja toistosäätimet.
- Asetusten ja kanavaprofiilien tuonti/vienti.
- Näppäimistön navigointi, tekstin skaalaus, näytönlukijan ilmoitukset ja korkea kontrasti.
- Käyttöliittymän lokalisointi 38 tuetulle kielelle.

### Korjattu

- Estetty useiden toissijaisten valintaikkunoiden näkymisen samanaikaisesti.
- Korjattu tyhjä valintaikkuna ääniasetusikkunan yläpuolelle.
- Tyhjät ilmoitusviestit on jätetty huomioimatta tyhjien peittokuvien näyttämisen sijaan.
- Parannettu pitkien tarrojen kääriminen kapeisiin paneeleihin ja paikallisiin asetteluihin.
- Korjattu paikkamerkkien `{quality}` ja `{q}` korvaaminen ilmoituksissa.
- Päivitetty paneelin sisäisen version etiketti ja päivitetty vertailu 1.2.0:aan.

### Yhteensopivuus

- Nykyiset asetukset säilyvät päivitettäessä versiosta 1.1.0.
- Asetukset pysyvät paikallisina selaimessa; komentosarja ei lähetä telemetriaa.
- Päivitystarkistusohjelma lukee uusimman GitHub-julkaisutunnisteen eikä asenna päivityksiä automaattisesti.

### Linkkejä

- [Arkisto](https://github.com/ebayybe/kick-stream-tweaks)
- [Julkaisut](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Ongelmia](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Alkuperäinen julkinen versio keskittyi videon laadun ja äänenvoimakkuuden muistamiseen Kickissä, niiden automaattiseen soveltamiseen uusiin streameihin ja F2-asetuspaneelin tarjoamiseen.
