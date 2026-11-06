<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · **Deutsch** · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Dein Kick-Player, in Erinnerung.** Qualität, Lautstärke und Geschwindigkeit werden bei jedem Stream automatisch wiederhergestellt, mit einem schnellen, vollständig lokalisierten Bedienfeld.

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Installieren](#installation) · [Merkmale](#features) · [Einstellungskarte](#settings-map) · [Verknüpfungen](#shortcuts) · [Funktionsreferenz](../docs/de_FUNCTIONS.md) · [Änderungsprotokoll](../CHANGELOG/de_CHANGELOG.md) · [Veröffentlichungen](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Merkmale

- **Qualität, die hängen bleibt.** Wählen Sie einmal eine Live- und eine VOD-Qualität; Es wird auf jeden neuen Stream angewendet. Fehlt die exakte Qualität, greift das Skript auf die nächstniedrigere (oder auf Auto) zurück.
- **Lautstärke, die bleibt.** Lautstärke und Stummschaltung werden pro Stream wiederhergestellt, mit einer Warnung bei hoher Lautstärke und einem Live-Schieberegler, der mit dem Player synchron bleibt.
- **Profile pro Kanal.** Öffnen Sie einen Stream, drücken Sie **Diesen Kanal speichern** und dieser Kanal merkt sich seine eigene Qualität, Lautstärke, Geschwindigkeit und seinen eigenen Klang. Fügen Sie eine Gruppe und eine Notiz hinzu, pausieren Sie die gespeicherten Einstellungen oder schließen Sie den Kanal vollständig von der Automatisierung aus.
- **Schnelle Voreinstellungen.** Sparen Sie Bandbreite, beste Qualität, leises Ansehen und VOD mit einem Klick.
- **Tools.** Sleep-Timer, Fokusansicht, Player-Neusynchronisierung, Seitenlayout-Steuerelemente (Chat ausblenden, linkes Menü einklappen) und ein abgesicherter Modus, der alle automatischen Änderungen anhält.
- **Einfrierungsalarm.** Gibt einen lauten Alarm aus und zeigt eine Benachrichtigung an, wenn der Player einfriert oder einen schwarzen Bildschirm anzeigt, auch wenn die Registerkarte minimiert ist.
- **Schnellanforderungsschaltfläche.** Eine schwebende, verschiebbare Schaltfläche, mit der Sie Ihre Prämie mit einem Klick anfordern können. Vier Designs, fünf Icons oder Ihr eigenes Bild, einstellbare Größe und Deckkraft.
- **Belohnungen automatisch einfordern.** Optional: Wartet auf Kicks Belohnungsbenachrichtigung (oder prüft nach einem Zeitplan), beansprucht, was verfügbar ist, und schließt das Fenster wieder (standardmäßig deaktiviert).
- **Stille Wiedergabe.** Schaltet einen Stream stumm, ohne den Player stumm zu schalten, sodass die Wiedergabe in einer Hintergrundregisterkarte fortgesetzt wird. Legen Sie es global oder pro gespeichertem Kanal fest.
- **Benachrichtigungen.** Benachrichtigungen, die Sie ziehen, in der Größe ändern und stummschalten können, sowie optionale Soundeffekte mit Lautstärke pro Ereignis.
- **Neu gestaltete Benutzeroberfläche.** Gruppierte Seitenleiste, Einstellungssuche, helle und dunkle Themen, Akzentfarben, Kompaktmodus, Textskalierung und hoher Kontrast.
- **Animationen, die Sie steuern.** Live-Vorschau, drei Voreinstellungen und separate Öffnungs-, Hover- und Anzeigeeffekte. Respektiert die Systemeinstellung „Bewegung reduzieren“.
- **38 Sprachen** mit Flaggen. Die Benutzeroberfläche folgt beim ersten Start Ihrer Browsersprache und merkt sich anschließend Ihre Auswahl.
- **Privat durch Design.** Alles bleibt in Ihrem Browser. Keine Telemetrie, keine Netzwerkanfragen.

<a id="installation"></a>
## Installation

1. Installieren Sie einen Userscript-Manager: [Tampermonkey](https://www.tampermonkey.net/) oder [Violentmonkey](https://violentmonkey.github.io/).
2. Offen [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) und bestätigen Sie die Installation.
3. Öffnen Sie einen beliebigen Stream [kick.com](https://kick.com) und drücken Sie **F2**.

Updates werden von Ihrem Userscript-Manager bereitgestellt. Sie können sich auch das ansehen [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) Seite.

## Einstellungen für einen Kanal speichern

1. Öffnen Sie den Stream des Kanals, den Sie anpassen möchten.
2. Öffnen Sie das Panel (`F2`) und drücken Sie **Diesen Kanal speichern** (auf der Seite **Kanäle** oder über den Hinweis auf der Seite **Wiedergabe**). Für diesen Kanal werden die aktuellen Qualitäts-, Lautstärke-, Geschwindigkeits- und Toneinstellungen gespeichert.
3. Passen Sie sie im Editor unter der Schaltfläche an. Sie werden jedes Mal automatisch angewendet, wenn Sie diesen Kanal öffnen.

Verwenden Sie den Schalter **Gespeicherte Einstellungen auf diesem Kanal anwenden**, um ein Profil anzuhalten, ohne es zu löschen, oder **Entfernen**, um es zu löschen. Alle gespeicherten Kanäle werden unter **Kanäle → Gespeicherte Kanäle** aufgelistet, wo Sie sie suchen, sortieren, anheften, gruppieren, Notizen hinzufügen sowie sichern und wiederherstellen können.

<a id="settings-map"></a>
## Einstellungskarte

| Gruppe | Seite | Was ist drin? |
| --- | --- | --- |
| Spieler | **Wiedergabe** | Voreinstellungen, Live-/VOD-Qualität, Fallback, Lautstärke, Stummschaltung, Warnung bei lauter Lautstärke, Geschwindigkeit |
| Spieler | **Kanäle** | Aktuelles Kanalprofil, gespeicherte Kanäle, Suche, Gruppen, Notizen, Backup |
| Spieler | **Werkzeuge** | Sleep-Timer, Seitenlayout, automatisches Einfordern von Belohnungen, Schaltfläche zum schnellen Einfordern, Einfrieralarm, schnelle Aktionen, Fokusansicht |
| Warnungen | **Benachrichtigungen** | Nicht stören, Größe, Dauer, Deckkraft, Position, Verlauf |
| Warnungen | **Geräusche** | Hauptschalter und Lautstärke, pro Ereignis umschaltbar, Lautstärke und Vorschau |
| Schnittstelle | **Aussehen** | Thema, Panel-Stil, Akzentfarbe, Dichte, Kontrast, Unschärfe, Textskalierung, Sprache |
| Schnittstelle | **Animationen** | Live-Vorschau, Voreinstellungen, Öffnungs-/Hover-/Indikatoreffekte, Geschwindigkeit |
| Schnittstelle | **Verknüpfungen** | Menü-Hotkeys und Aktions-Hotkeys |
| System | **Diagnose** | Live-Status, Qualitätsscan, Konfliktprüfung, abgesicherter Modus, Aktionsprotokoll |
| System | **Daten und Informationen** | Exportieren, importieren, rückgängig machen, zurücksetzen, Backup wiederherstellen, Links |

Jeder Schieberegler reagiert auch auf das Mausrad, während Sie darüber fahren. Verwenden Sie das Suchfeld oben im Bedienfeld, um eine Einstellung anhand des Namens zu finden. Die Suche versteht auch die englischen Namen, funktioniert also in jeder Sprache der Benutzeroberfläche gleich und dort eingegebene Schlüssel gelangen nie auf die Seite.

## Schaltfläche „Schnellanforderung“.

Aktivieren Sie es unter **Extras → Schaltfläche „Schnellanspruch“ auf der Seite**. Im Stream erscheint eine kleine Schaltfläche:

- **Ziehen** Sie es irgendwohin; seine Position bleibt im Gedächtnis.
- **Klicken** Sie darauf, um Ihre Belohnung einzufordern (es öffnet das Belohnungsfenster, klickt auf *Anfordern*, schließt das Fenster und kehrt zum Stream zurück).
- Es **leuchtet und zeigt einen roten Punkt**, wenn Kicks Belohnungsbenachrichtigung erscheint. Aktivieren Sie *Nur anzeigen, wenn eine Belohnung verfügbar ist*, um sie für den Rest der Zeit ausgeblendet zu halten.
- Wählen Sie einen **Stil** (Orb, Pill, Glass, Flat), ein integriertes **Symbol** oder **Ihr eigenes Bild** (PNG, JPG, WebP, GIF oder SVG bis zu 2 MB; quadratische Bilder mit transparentem Hintergrund sehen am besten aus), eine **Größe** und eine **Deckkraft**. Eine Live-Vorschau zeigt jede Änderung.

Die Schaltfläche ist unabhängig von der Option „Belohnungen automatisch einfordern“, sodass Sie sie manuell, automatisch oder beides einfordern können.

<a id="shortcuts"></a>
## Verknüpfungen

| Aktion | Standard |
| --- | --- |
| Öffnen/schließen Sie das Panel | `F2` |
| Benachrichtigungen umschalten | `Alt+N` |
| Chat umschalten | `Alt+C` |
| Linkes Menü umschalten | `Alt+S` |
| Fokusansicht | `Alt+F` |
| Qualität zurücksetzen | `Alt+Q` |
| Lautstärke wiederherstellen | `Alt+V` |

Jede Verknüpfung kann in **Verknüpfungen** neu gebunden werden. Bindungen folgen der physischen Taste, sodass sie auf jedem Tastaturlayout funktionieren.

<a id="languages"></a>
## Sprachen

Arabisch, Weißrussisch, Bulgarisch, Chinesisch (vereinfacht), Chinesisch (traditionell), Kroatisch, Tschechisch, Dänisch, Niederländisch, Englisch, Englisch (Indien), Finnisch, Französisch, Deutsch, Griechisch, Hindi, Ungarisch, Indonesisch, Italienisch, Japanisch, Koreanisch, Lettisch, Litauisch, Mazedonisch, Malaiisch, Mongolisch, Norwegisch, Polnisch, Portugiesisch, Rumänisch, Russisch, Serbisch, Slowakisch, Spanisch, Schwedisch, Thailändisch, Türkisch und Vietnamesisch.

## Fehlerbehebung

- **Qualität wird nicht angewendet.** Öffnen Sie **Diagnose**, drücken Sie *Diagnose aktualisieren*, um die von Kick angebotenen Qualitäten zu scannen, und dann *Ausgewählte Qualität prüfen*. Wenn ein Kanal ausgeschlossen ist oder der abgesicherte Modus aktiviert ist, wird dies in der Statuszeile angezeigt.
- **Prämien werden nicht beansprucht.** Die automatische Beanspruchung ist standardmäßig deaktiviert. Aktivieren Sie es unter **Extras → Prämien** und versuchen Sie es mit *Jetzt beanspruchen*. Es funktioniert nur auf Live-Kanälen, während die Registerkarte sichtbar ist und Sie nicht im Chat tippen. Im *Benachrichtigungsmodus* reagiert das Skript auf Kicks eigenes Belohnungsbanner.
- **Stille Wiedergabe und Audio.** Die stille Wiedergabe leitet das Video ohne Verstärkung durch die Audio-Engine des Browsers. Wenn eine Site dies blockiert, werden Sie über das Panel darüber informiert und der normale Ton bleibt unberührt.
- **Etwas verhält sich merkwürdig.** Führen Sie *Auf Konflikte prüfen* aus oder verwenden Sie *Abschnitt zurücksetzen* auf der betreffenden Seite.
- **Einstellungen sehen nach einem Update falsch aus.** Verwenden Sie **Daten & Info → Rückgängig** oder **Backup wiederherstellen**.
- **Fehler gefunden?** Klicken Sie auf *Diagnose kopieren* und hängen Sie sie an eine an [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privatsphäre

Einstellungen und Kanalprofile werden im lokalen Speicher Ihres Browsers auf kick.com gespeichert. Das Skript sendet niemals Daten irgendwohin und fordert keine zusätzlichen Berechtigungen an (`@grant none`).

## Mitwirken

Issues und Pull Requests sind willkommen. Das Skript ist eine einzelne, eigenständige Datei, daher ist kein Build-Schritt erforderlich, um eine Änderung auszuprobieren: Bearbeiten `kick-stream-tweaks.user.js` und laden Sie die Seite neu.

## Lizenz

[MIT](./LICENSE)
