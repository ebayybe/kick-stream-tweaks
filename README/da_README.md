<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · **Dansk** · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Din Kick-afspiller, husket.** Kvalitet, lydstyrke og hastighed gendannes automatisk på hver stream med et hurtigt, fuldt lokaliseret kontrolpanel.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Installere](#installation) · [Funktioner](#features) · [Indstillinger kort](#settings-map) · [Genveje](#shortcuts) · [Funktionsreference](../docs/da_FUNCTIONS.md) · [Ændringslog](../CHANGELOG/da_CHANGELOG.md) · [Udgivelser](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Funktioner

- **Kvalitet der hænger ved.** Vælg en live- og en VOD-kvalitet én gang; den anvendes på hver ny strøm. Hvis den nøjagtige kvalitet mangler, falder scriptet tilbage til det næste lavere (eller til Auto).
- **Lydstyrke, der holder.** Lydstyrke og mute gendannes pr. stream med en advarsel om høj lydstyrke og en live-skyder, der forbliver synkroniseret med afspilleren.
- **Profiler pr. kanal.** Åbn en stream, tryk på **Gem denne kanal**, og den kanal husker sin egen kvalitet, lydstyrke, hastighed og lyd. Tilføj en gruppe og en note, sæt de gemte indstillinger på pause, eller udeluk kanalen helt fra automatisering.
- **Hurtige forudindstillinger.** Spar båndbredde, bedste kvalitet, stille visning og VOD med ét klik.
- **Værktøjer.** Sleep-timer, fokusvisning, afspillergensynkronisering, sidelayoutkontroller (skjul chat, skjul venstremenuen) og en sikker tilstand, der sætter alle automatiske ændringer på pause.
- **Frys alarm.** Afspiller en høj alarm og viser en meddelelse, når afspilleren fryser eller viser en sort skærm, selvom fanen er minimeret.
- **Knap til hurtig krav.** En flydende knap, der kan trækkes i, og som kræver din belønning med et enkelt klik. Fire designs, fem ikoner eller dit eget billede, justerbar størrelse og opacitet.
- **Automatisk krav på belønninger.** Valgfrit: Venter på Kicks belønningsmeddelelse (eller kontrollerer en tidsplan), gør krav på, hvad der er tilgængeligt og lukker vinduet igen (deaktiveret som standard).
- **Lydløs afspilning.** Slår en stream på lydløs uden at slå lyden fra afspilleren, så den bliver ved med at spille på en baggrundsfane. Indstil det globalt eller pr. gemt kanal.
- **Advarsler.** Meddelelser, du kan trække, ændre størrelse på og slå fra, plus valgfri lydeffekter med lydstyrke pr. begivenhed.
- **Redesignet grænseflade.** Grupperet sidebjælke, indstillingssøgning, lyse og mørke temaer, accentfarver, kompakt tilstand, tekstskalering og høj kontrast.
- **Animationer, du styrer.** Live preview, tre forudindstillinger og separate åbnings-, svæve- og indikatoreffekter. Respekterer systemets "reducer bevægelse" indstilling.
- **38 sprog** med flag. Interfacet følger dit browsersprog ved første kørsel og husker dit valg bagefter.
- **Privat af design.** Alt forbliver i din browser. Ingen telemetri, ingen netværksanmodninger.

<a id="installation"></a>
## Installation

1. Installer en brugerscript manager: [Tampermonkey](https://www.tampermonkey.net/) eller [Violentmonkey](https://violentmonkey.github.io/).
2. Åben [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) og bekræft installationen.
3. Åbn enhver stream på [kick.com](https://kick.com) og tryk på **F2**.

Opdateringer leveres af din brugerscript manager. Du kan også se [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) side.

## Gemmer indstillinger for en kanal

1. Åbn strømmen for den kanal, du vil tilpasse.
2. Åbn panelet (`F2`) og tryk på **Gem denne kanal** (på **Kanaler**-siden eller fra tippet på **Afspilningssiden**). De aktuelle indstillinger for kvalitet, lydstyrke, hastighed og lyd gemmes for den pågældende kanal.
3. Finjuster dem i editoren under knappen. De anvendes automatisk, hver gang du åbner den kanal.

Brug kontakten **Anvend de gemte indstillinger på denne kanal** for at sætte en profil på pause uden at slette den, eller **Fjern** for at slette den. Alle gemte kanaler er opført under **Kanaler → Gemte kanaler**, hvor du kan søge, sortere, fastgøre, gruppere, tilføje noter, sikkerhedskopiere og gendanne dem.

<a id="settings-map"></a>
## Indstillinger kort

| Gruppe | Side | Hvad er indeni |
| --- | --- | --- |
| Spiller | **Afspilning** | Forudindstillinger, live/VOD-kvalitet, fallback, lydstyrke, mute, advarsel om høj lydstyrke, hastighed |
| Spiller | **Kanaler** | Aktuel kanalprofil, gemte kanaler, søgning, grupper, noter, backup |
| Spiller | **Værktøj** | Sleep-timer, sidelayout, automatisk krav på belønninger, hurtig-krav-knap, frysealarm, hurtige handlinger, fokusvisning |
| Advarsler | **Underretninger** | Forstyr ikke, størrelse, varighed, opacitet, position, historie |
| Advarsler | **Lyde** | Hovedkontakt og lydstyrke, kontakt pr. begivenhed, lydstyrke og forhåndsvisning |
| Interface | **Udseende** | Tema, panelstil, accentfarve, tæthed, kontrast, sløring, tekstskala, sprog |
| Interface | **Animationer** | Live preview, forudindstillinger, åbning/hover/indikatoreffekter, hastighed |
| Interface | **Genveje** | Menu-genvejstaster og handlings-genvejstaster |
| System | **Diagnostik** | Live status, kvalitetsscanning, konfliktkontrol, sikker tilstand, handlingslog |
| System | **Data og om** | Eksporter, importer, fortryd, nulstil, gendan backup, links |

Hver skyder reagerer også på musehjulet, mens du holder den. Brug søgefeltet øverst i panelet for at finde enhver indstilling efter navn. Søgning forstår også de engelske navne, så det fungerer på samme måde på alle grænsefladesprog, og taster, der indtastes der, når aldrig siden.

## Knap til hurtig krav

Aktiver det i **Værktøjer → Hurtigt krav-knap på siden**. En lille knap vises på streamen:

- **Træk** den hvor som helst; dens position huskes.
- **Klik** det for at gøre krav på din belønning (det åbner belønningsvinduet, trykker på *Claim*, lukker vinduet og vender tilbage til streamen).
- Den **lyser og viser en rød prik**, når Kicks belønningsmeddelelse vises. Aktiver *Vis kun, når en belønning er tilgængelig* for at holde den skjult resten af ​​tiden.
- Vælg en **stil** (Orb, Pill, Glass, Flat), et indbygget **ikon** eller **dit eget billede** (PNG, JPG, WebP, GIF eller SVG op til 2 MB; firkantede billeder med en gennemsigtig baggrund ser bedst ud), en **størrelse** og en **opacitet**. En live forhåndsvisning viser hver ændring.

Knappen er adskilt fra *Automatisk krav på belønninger*, så du kan gøre krav manuelt, automatisk eller begge dele.

<a id="shortcuts"></a>
## Genveje

| Handling | Misligholdelse |
| --- | --- |
| Åbn/luk panelet | `F2` |
| Skift notifikationer | `Alt+N` |
| Slå chat til/fra | `Alt+C` |
| Skift venstre menu | `Alt+S` |
| Fokus visning | `Alt+F` |
| Nulstil kvalitet | `Alt+Q` |
| Gendan lydstyrken | `Alt+V` |

Hver genvej kan rebound i **Genveje**. Bindinger følger den fysiske nøgle, så de fungerer på ethvert tastaturlayout.

<a id="languages"></a>
## Sprog

Arabisk, hviderussisk, bulgarsk, kinesisk (forenklet), kinesisk (traditionel), kroatisk, tjekkisk, dansk, hollandsk, engelsk, engelsk (Indien), finsk, fransk, tysk, græsk, hindi, ungarsk, indonesisk, italiensk, japansk, koreansk, lettisk, litauisk, makedonsk, malaysisk, mongolsk, norsk, serbisk, spansk, svensk, spansk, slovsk, portugisisk, serbisk, polsk, slovsk, slovakisk, svensk, rumænsk, svensk, slovsk, Thai, tyrkisk og vietnamesisk.

## Fejlfinding

- **Kvalitet anvendes ikke.** Åbn **Diagnostik**, tryk på *Opdater diagnostik* for at scanne de kvaliteter, Kick tilbyder, og derefter *Tjek valgt kvalitet*. Hvis en kanal er udelukket, eller sikker tilstand er aktiveret, siger statuslinjen det.
- **Der gøres ikke krav på belønninger.** Automatisk krav er deaktiveret som standard. Aktiver det i **Værktøjer → Belønninger** og prøv *Gør krav nu*. Det virker kun på live-kanaler, mens fanen er synlig, og du ikke skriver i chat. I *meddelelsestilstand* reagerer scriptet på Kicks eget belønningsbanner.
- **Tavs afspilning og lyd.** Lydløs afspilning dirigerer videoen gennem browserens lydmotor med nul forstærkning. Hvis et websted blokerer det, fortæller panelet dig, og normal lyd forbliver urørt.
- **Noget opfører sig mærkeligt.** Kør *Tjek for konflikter*, eller brug *Nulstil sektion* på den pågældende side.
- **Indstillinger ser forkerte ud efter en opdatering.** Brug **Data og om → Fortryd** eller **Gendan sikkerhedskopiering**.
- **Har du fundet en fejl?** Tryk på *Kopier diagnostik* og vedhæft den til en [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privatliv

Indstillinger og kanalprofiler gemmes i din browsers lokale lager på kick.com. Scriptet sender aldrig data nogen steder og anmoder ikke om ekstra tilladelser (`@grant none`).

## Bidrager

Problemer og pull-anmodninger er velkomne. Scriptet er en enkelt selvstændig fil, så der kræves ikke noget byggetrin for at prøve en ændring: edit `kick-stream-tweaks.user.js` og genindlæs siden.

## Licens

[MIT](./LICENSE)
