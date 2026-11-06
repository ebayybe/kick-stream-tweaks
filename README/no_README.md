<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · **Norsk** · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Kick-spilleren din, husket.** Kvalitet, volum og hastighet gjenopprettes automatisk på hver strøm, med et raskt, fullstendig lokalisert kontrollpanel.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Installer](#installation) · [Funksjoner](#features) · [Innstillinger kart](#settings-map) · [Snarveier](#shortcuts) · [Funksjonsreferanse](../docs/no_FUNCTIONS.md) · [Endringslogg](../CHANGELOG/no_CHANGELOG.md) · [Utgivelser](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Funksjoner

- **Kvalitet som holder seg.** Velg en live- og en VOD-kvalitet én gang; den brukes på hver ny strøm. Hvis den nøyaktige kvaliteten mangler, faller skriptet tilbake til den neste lavere (eller til Auto).
- **Volum som holder seg.** Volum og demping gjenopprettes per strøm, med en advarsel om høyt volum og en direkteglidebryter som forblir synkronisert med spilleren.
- **Profiler per kanal.** Åpne en strøm, trykk på **Lagre denne kanalen** og den kanalen husker sin egen kvalitet, volum, hastighet og lyd. Legg til en gruppe og et notat, sett de lagrede innstillingene på pause, eller ekskluder kanalen helt fra automatisering.
- **Raske forhåndsinnstillinger.** Lagre båndbredde, beste kvalitet, stille visning og VOD med ett klikk.
- **Verktøy.** Innsovningstimer, fokusvisning, synkronisering av spilleren, sidelayoutkontroller (skjul chat, skjul venstremenyen) og en sikker modus som setter alle automatiske endringer på pause.
- **Frys alarm.** Spiller en høy alarm og viser et varsel når spilleren fryser eller viser en svart skjerm, selv om fanen er minimert.
- **Knapp for rask krav.** En flytende knapp som kan dras og som krever belønningen din med ett klikk. Fire design, fem ikoner eller ditt eget bilde, justerbar størrelse og opasitet.
- **Automatisk krav på belønninger.** Valgfritt: venter på Kicks belønningsvarsel (eller sjekker en tidsplan), gjør krav på det som er tilgjengelig og lukker vinduet igjen (av som standard).
- **Stille avspilling.** Demper en strøm uten å dempe spilleren, slik at den fortsetter å spille i en bakgrunnsfane. Angi den globalt eller per lagret kanal.
- **Varsler.** Varsler du kan dra, endre størrelse på og dempe, pluss valgfrie lydeffekter med volum per hendelse.
- **Redesignet grensesnitt.** Gruppert sidefelt, innstillingssøk, lyse og mørke temaer, aksentfarger, kompakt modus, tekstskalering og høy kontrast.
- **Animasjoner du kontrollerer.** Live forhåndsvisning, tre forhåndsinnstillinger og separate åpnings-, sveve- og indikatoreffekter. Respekterer systemets "reduser bevegelse"-innstilling.
- **38 språk** med flagg. Grensesnittet følger nettleserspråket ditt ved første kjøring og husker valget ditt etterpå.
- **Privat av design.** Alt forblir i nettleseren din. Ingen telemetri, ingen nettverksforespørsler.

<a id="installation"></a>
## Installasjon

1. Installer en brukerskriptbehandling: [Tampermonkey](https://www.tampermonkey.net/) eller [Violentmonkey](https://violentmonkey.github.io/).
2. Åpne [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) og bekreft installasjonen.
3. Åpne hvilken som helst strøm på [kick.com](https://kick.com) og trykk **F2**.

Oppdateringer leveres av brukerskriptbehandleren din. Du kan også se [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) side.

## Lagre innstillinger for en kanal

1. Åpne strømmen til kanalen du vil tilpasse.
2. Åpne panelet (`F2`) og trykk på **Lagre denne kanalen** (på **Kanaler**-siden, eller fra hintet på **Avspilling**-siden). Gjeldende innstillinger for kvalitet, volum, hastighet og lyd lagres for den kanalen.
3. Finjuster dem i editoren under knappen. De brukes automatisk hver gang du åpner den kanalen.

Bruk bryteren **Bruk de lagrede innstillingene på denne kanalen** for å sette en profil på pause uten å slette den, eller **Fjern** for å slette den. Alle lagrede kanaler er oppført under **Kanaler → Lagrede kanaler**, hvor du kan søke, sortere, feste, gruppere, legge til notater, sikkerhetskopiere og gjenopprette dem.

<a id="settings-map"></a>
## Innstillinger kart

| Gruppe | Side | Hva er inni |
| --- | --- | --- |
| Spiller | **Avspilling** | Forhåndsinnstillinger, live/VOD-kvalitet, fallback, volum, demping, advarsel om høyt volum, hastighet |
| Spiller | **Kanaler** | Gjeldende kanalprofil, lagrede kanaler, søk, grupper, notater, sikkerhetskopiering |
| Spiller | **Verktøy** | Innsovningstimer, sidelayout, automatisk krav på belønninger, hurtigkravknapp, frysealarm, raske handlinger, fokusvisning |
| Varsler | **Varsler** | Ikke forstyrr, størrelse, varighet, opasitet, posisjon, historie |
| Varsler | **Lyder** | Hovedbryter og volum, bryter per hendelse, volum og forhåndsvisning |
| Grensesnitt | **Utseende** | Tema, panelstil, aksentfarge, tetthet, kontrast, uskarphet, tekstskala, språk |
| Grensesnitt | **Animasjoner** | Live forhåndsvisning, forhåndsinnstillinger, åpning/sveve/indikatoreffekter, hastighet |
| Grensesnitt | **Snarveier** | Meny hurtigtast og handling hurtigtaster |
| System | **Diagnostikk** | Livestatus, kvalitetsskanning, konfliktsjekk, sikker modus, handlingslogg |
| System | **Data og om** | Eksporter, importer, angre, tilbakestill, gjenopprett sikkerhetskopiering, koblinger |

Hver glidebryter reagerer også på musehjulet mens du holder den. Bruk søkeboksen øverst i panelet for å finne en hvilken som helst innstilling etter navn. Søk forstår også de engelske navnene, så det fungerer på samme måte i alle grensesnittspråk, og tastene som skrives der når aldri siden.

## Hurtigkravknapp

Aktiver det i **Verktøy → Hurtigkravknapp på siden**. En liten knapp vises på strømmen:

- **Dra** den hvor som helst; dens posisjon huskes.
- **Klikk** den for å kreve belønningen din (den åpner belønningsvinduet, trykker på *Claim*, lukker vinduet og går tilbake til strømmen).
- Den **lyser og viser en rød prikk** når Kicks belønningsvarsel vises. Slå på *Vis bare når en belønning er tilgjengelig* for å holde den skjult resten av tiden.
- Velg en **stil** (Orb, Pill, Glass, Flat), et innebygd **ikon** eller **ditt eget bilde** (PNG, JPG, WebP, GIF eller SVG opptil 2 MB; kvadratiske bilder med gjennomsiktig bakgrunn ser best ut), en **størrelse** og en **opasitet**. En live forhåndsvisning viser hver endring.

Knappen er atskilt fra *Automatisk krav på belønninger*, slik at du kan gjøre krav for hånd, automatisk eller begge deler.

<a id="shortcuts"></a>
## Snarveier

| Handling | Misligholde |
| --- | --- |
| Åpne/lukk panelet | `F2` |
| Slå på varsler | `Alt+N` |
| Slå av/på chat | `Alt+C` |
| Veksle til venstre meny | `Alt+S` |
| Fokusvisning | `Alt+F` |
| Tilbakestill kvalitet | `Alt+Q` |
| Gjenopprett volumet | `Alt+V` |

Hver snarvei kan rebound i **Snarveier**. Bindinger følger den fysiske nøkkelen, så de fungerer på alle tastaturoppsett.

<a id="languages"></a>
## Språk

Arabisk, hviterussisk, bulgarsk, kinesisk (forenklet), kinesisk (tradisjonell), kroatisk, tsjekkisk, dansk, nederlandsk, engelsk, engelsk (India), finsk, fransk, tysk, gresk, hindi, ungarsk, indonesisk, italiensk, japansk, koreansk, latvisk, litauisk, makedonsk, malaysisk, mongolsk, norsk, serbisk, spansk, svensk, spansk, portugisisk, serbisk, polsk, slovakisk, svensk, slovakisk, svensk, Thai, tyrkisk og vietnamesisk.

## Feilsøking

- **Kvalitet brukes ikke.** Åpne **Diagnostikk**, trykk på *Oppdater diagnostikk* for å skanne egenskapene Kick tilbyr, deretter *Sjekk valgt kvalitet*. Hvis en kanal er ekskludert eller sikker modus er på, sier statuslinjen det.
- **Belønninger gjøres ikke krav på.** Automatisk krav er av som standard. Aktiver det i **Verktøy → Belønninger** og prøv *Krev nå*. Det fungerer kun på live-kanaler, mens fanen er synlig og du ikke skriver i chat. I *varslingsmodus* reagerer skriptet på Kicks eget belønningsbanner.
- **Stille avspilling og lyd.** Stille avspilling ruter videoen gjennom nettleserens lydmotor med null forsterkning. Hvis et nettsted blokkerer det, forteller panelet deg, og normal lyd forblir urørt.
- **Noe oppfører seg merkelig.** Kjør *Se etter konflikter*, eller bruk *Tilbakestill-delen* på den aktuelle siden.
- **Innstillingene ser feil ut etter en oppdatering.** Bruk **Data og om → Angre** eller **Gjenopprett sikkerhetskopiering**.
- **Fant du en feil?** Trykk på *Kopier diagnostikk* og legg den ved en [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privatliv

Innstillinger og kanalprofiler lagres i nettleserens lokale lagringsplass på kick.com. Skriptet sender aldri data hvor som helst og ber ingen ekstra tillatelser (`@grant none`).

## Bidrar

Problemer og pull-forespørsler er velkomne. Skriptet er en enkelt selvstendig fil, så det kreves ikke noe byggetrinn for å prøve en endring: edit `kick-stream-tweaks.user.js` og last inn siden på nytt.

## Tillatelse

[MIT](./LICENSE)
