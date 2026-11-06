<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · **Deutsch** · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks – Änderungsprotokoll

Versionshinweise für [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), ein Benutzerskript, das sich die Einstellungen des Kick-Players merkt und ein konfigurierbares Bedienfeld hinzufügt.

## v1.3.1 – 06.11.2026

> Layout-Härtung für jede Sprache und Textgröße, ein wirklich einzigartiger Minimal-Stil, Belohnungen und Layout-Helfer, ein Player-Freeze-Alarm und eine intelligentere Standardsprache.

### Hinzugefügt

- **Alarm beim Einfrieren des Players.** Erkennt einen blockierten Player oder einen schwarzen Bildschirm (Videozeit läuft ohne dekodierte Bilder), spielt einen lauten Alarmton ab und zeigt eine Benachrichtigung an, auch wenn die Registerkarte minimiert ist. Konfigurierbare Erkennungszeit (5–60 s), unabhängige Tonumschaltung und eine Testtaste.
- **Prämien automatisch einfordern** (standardmäßig deaktiviert): Öffnet das Belohnungsfenster, beansprucht, was verfügbar ist, schließt es wieder und kehrt zum Stream zurück. Drops, die im Belohnungsfenster erscheinen, werden ebenfalls beansprucht. Enthält eine Schaltfläche *Jetzt anfordern*.
- **Belohnungsplan.** Standardmäßig wartet das Skript auf Kicks eigene „Fordern Sie Ihre Belohnung“-Benachrichtigung und fordert sie sofort an (mit einer optionalen Verzögerung von 0–60 Sekunden), anstatt sie abzufragen. Ein geplanter Modus (alle 5–60 Minuten) ist ebenfalls verfügbar.
- **Schnellanforderungsschaltfläche.** Eine kleine schwebende Schaltfläche im Stream, mit der Sie Ihre Belohnung mit einem Klick anfordern können. Ziehen Sie es an eine beliebige Stelle (die Position wird gespeichert), wählen Sie eines von vier Designs (Kugel, Pille, Glas, Flach), fünf integrierte Symbole, eine Größe und eine Deckkraft aus und zeigen Sie es optional nur an, wenn eine Belohnung verfügbar ist. Es leuchtet und zeigt einen Punkt, wenn Kicks Belohnungsbenachrichtigung erscheint. Die Einstellungsseite verfügt über eine Live-Vorschau.
- **Ihr eigenes Symbol.** Laden Sie ein PNG, JPG, WebP, GIF oder SVG (bis zu 2 MB) als Schaltflächensymbol hoch und füllen Sie optional die gesamte Schaltfläche aus. Das Bild wird in ein kleines Quadrat umkodiert und nur in Ihrem Browser gespeichert.
- **Mausrad auf Schiebereglern.** Jeder Schieberegler kann mit dem Mausrad angepasst werden, während man darüber fährt, ohne im Bedienfeld zu scrollen.
- **Funktionsreferenz.** Das neue `en_FUNCTIONS.md` dokumentiert die Architektur, jede Einstellung, jede Funktion und die Teile von Kicks Seite, von denen das Skript abhängt.
- **Geführte Kanalspeicherung.** Eine Schritt-für-Schritt-Karte „So funktionieren gespeicherte Kanäle“, eine einzelne Schaltfläche **Diesen Kanal speichern**, die die aktuelle Qualität, Lautstärke, Geschwindigkeit und den Ton für den Kanal speichert, den Sie gerade ansehen, ein Ein-Klick-Hinweis in der Wiedergabe für nicht gespeicherte Kanäle, ein Bestätigungs-Toast, die Schaltflächen *Bearbeiten* / *Fertig* in der Liste und ein Schalter zum Anhalten gespeicherter Einstellungen, ohne sie zu löschen.
- **Stille Wiedergabe.** Schaltet den Stream stumm, ohne den Player stumm zu schalten, sodass die Wiedergabe in einer Hintergrundregisterkarte fortgesetzt wird. Funktioniert global und pro gespeichertem Kanal (in der Kanalliste wird ein *Silent*-Tag angezeigt).
- **Suche nach mehrsprachigen Einstellungen.** Die Suche ist akzentunabhängig und entspricht auch den englischen Namen. Wenn Sie also `volume` eingeben, wird die Einstellung in jeder Sprache der Benutzeroberfläche gefunden. Wenn Sie nach Abschnitt oder Kartentitel suchen, wird der gesamte Abschnitt angezeigt.
- **Seitenlayout-Steuerelemente**: Verstecken Sie den Chat und reduzieren Sie das linke Menü im Panel oder mit Hotkeys (`Alt+C`, `Alt+S`), mit einer Option, sich das Layout für jeden Stream zu merken.
- **Symbolanimationen** für die Seitenleiste, Reset- und Hilfesymbole mit eigenem Schalter (ebenfalls Teil der Animationsvoreinstellungen).
- **Kanal-Avatare** werden von Kick erfasst und in der gespeicherten Kanalliste angezeigt.
- 14 Akzentfarben (vorher 6).
- Bestätigungsdialog im Panel, der in jedem Browser identisch aussieht.

### Geändert

- **Schnittstellensprache** folgt jetzt beim ersten Start der Browsersprache. Sobald Sie eine Sprache ausgewählt haben, wird sie gespeichert. Von älteren Versionen migrierte Einstellungen folgen dem Browser, bis explizit eine Sprache ausgewählt wird.
– Das Skript startet jetzt bei `document-start`, sodass seine Tastaturisolation vor den eigenen Listenern der Seite registriert wird.
- Die Einstellungszeilen sind gestapelt (Beschriftung über dem Steuerelement), sodass sich Text in keiner Sprache, Textgröße oder Panelbreite überlappen oder abschneiden kann. Seitenleistenbeschriftungen werden an Wortgrenzen umbrochen.
- Animationsauswahlfelder werden als Zeilen voller Breite mit Symbolen neu erstellt, sodass lange Übersetzungen passen.
- Der Panel-Stil **Minimal** ist jetzt flach und quadratisch ohne Glanz, Ränder werden durch Trennlinien und Auswahl im Unterstreichungsstil ersetzt, sodass der Unterschied zu **Kick** offensichtlich ist.
- Das Panel hat eine feste Breite von 680 Pixeln (es wird verkleinert, um in kleine Fenster zu passen). Die Einstellung der Panelbreite und der Griff zur Größenänderung wurden entfernt, sodass die Layouts für alle gleich sind.
- Der Titel der Anzeigeanimation sagt nicht mehr „grün“, wenn eine andere Akzentfarbe verwendet wird.

### Behoben

- Durch Ändern der Lautstärke, der Stummschaltung, der lautlosen Wiedergabe, der automatischen Lautstärke oder der Geschwindigkeit wurde auch die Qualität neu angewendet (erneutes Öffnen des Qualitätsmenüs und Anzeigen einer Benachrichtigung). Diese Einstellungen betreffen jetzt nur noch das, was Sie geändert haben. Die Qualität wird nur dann erneut angewendet, wenn sich eine Qualitätseinstellung ändert.
- Das Eingeben der Einstellungssuche könnte Kicks Hotkeys auslösen (zum Beispiel hat Space den Stream auf Vollbild umgeschaltet). Tastenanschläge innerhalb des Panels erreichen die Seite nicht mehr.
- Die bevorzugte Lautstärke wurde überschrieben, als Kick den Player nach einem Neuladen auf seine eigenen 50 % zurücksetzte und der Panel-Schieberegler 50 % anzeigte. Änderungen, die die Seite selbst vornimmt, werden jetzt auf Ihr gespeichertes Volumen zurückgesetzt; Nur Ihre eigenen Aktionen aktualisieren es.
- Textbeschneidung und Überlappung in Darstellung, Animationen und Hotkeys (lange Beschriftungen, große Textgrößen, schmale Felder, lange Übersetzungen).
- Der Minimal-Stil hat die Hintergrundunschärfe-Einstellung stillschweigend deaktiviert; Unschärfe funktioniert jetzt in beiden Stilen.
- Durch das Ändern der Deckkraft der Schnellabruf-Schaltfläche wurde die Vorschau nicht aktualisiert.
- Schieberegler reagierten nicht auf das Mausrad.
- Animationskacheln („Scale“, „Pop“), die über ihre Karten hinauslaufen.
- Zur Bestätigung des Profillöschens wurde das native Dialogfeld des Browsers verwendet.
- Sleep-Timer-Chips wurden nicht lokalisiert.
- Gespeicherte Kanäle zeigten keine Avatare und der aktuelle Kanal zeigte keine, bis sein Profil gespeichert wurde.

### Kompatibilität

- Vorhandene Einstellungen und gespeicherte Kanäle bleiben beim Update von v1.3.0, v1.2.0 und v1.1.0 erhalten.
- Das Skript sendet weiterhin keine Telemetrie und stellt keine eigenen Netzwerkanfragen.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Veröffentlichungen](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 – 03.11.2026

> Vollständige Neugestaltung, eine logische Einstellungsstruktur, ein neu aufgebautes Animationssystem und eine Reihe von Zuverlässigkeitskorrekturen für die Player-Automatisierung.

### Hinzugefügt

- Neu gestaltetes Bedienfeld mit einer gruppierten Seitenleiste: **Player** (Wiedergabe, Kanäle, Tools), **Benachrichtigungen** (Benachrichtigungen, Töne), **Oberfläche** (Darstellung, Animationen, Verknüpfungen) und **System** (Diagnose, Daten und Info).
- Neue Seite **Animationen**: eine Live-Vorschau, drei Ein-Klick-Voreinstellungen (Voll, Reduziert, Aus) und separate Auswahlmöglichkeiten für den Eröffnungseffekt (Keine, Ausblenden, Schieben, Skalieren, Pop), Hover-Effekt, Anzeigeanimation und Geschwindigkeit.
- Schnelle Voreinstellungen für „Bandbreite sparen“, „Beste Qualität“, „Leise Anzeige“ und „VOD“, die sofort angewendet werden.
- Qualitätspicker als Chip-Gitter umgestaltet; Geschwindigkeit, Textskalierung und Sleep-Timer verwenden Chips und segmentierte Steuerelemente anstelle von Dropdowns.
- Inline-Kanalmanager: Suchen, Sortieren, Anheften, Gruppen, Notizen, Bearbeitung pro Kanal und vollständige Sicherung/Wiederherstellung, alles ohne verschachtelte Dialoge.
- Inline-Soundeinstellungen mit einem Schalter für jedes Ereignis, einer Lautstärke- und Vorschautaste.
- Qualitätsscan in der Diagnose: öffnet das Player-Menü, erfasst die verfügbaren Qualitäten und schließt es wieder.
- Hotkeys funktionieren jetzt bei jedem Tastaturlayout (sie entsprechen der physischen Taste).
- Einstellungen werden zwischen geöffneten Kick-Tabs synchronisiert.
- Akzentuierte Farbfelder neben dem benutzerdefinierten Farbwähler, ein größerer Textskalierungsbereich und ein Schutz vor bevorzugter reduzierter Bewegung.

### Geändert

- Einstellungen werden in einem schlankeren Format gespeichert; Die 1.2.x-Konfiguration, Hotkeys und Animationsoptionen werden automatisch migriert.
– Die Wiedergabegeschwindigkeit wird nur angewendet, wenn sie von 1× abweicht, sodass Kicks eigenes Live-Edge-Aufholen nicht mehr außer Kraft gesetzt wird.
- Der Rückgängig-Verlauf wird im Speicher gehalten, anstatt in den lokalen Speicher geschrieben zu werden.
- Soundereignisse, Benachrichtigungen und Hotkeys teilen sich einen einheitlichen Satz an Steuerelementen.
- Die Auswahl „Situationsprofil“ wird durch Ein-Klick-Voreinstellungen ersetzt.

### Behoben

- Beim Schließen des Player-Menüs nach dem Anwenden der Qualität besteht nicht mehr das Risiko, dass es erneut geöffnet wird.
- Eine Fallback-Qualität (z. B. 720p anstelle eines nicht verfügbaren 1080p) überschreibt nicht mehr die für einen Kanal gespeicherte bevorzugte Qualität.
- Nur echte Klicks auf Qualitätsartikel aktualisieren die „zuletzt verwendete“ Qualität; Automatisierte Klicks werden ignoriert.
– Die Suche nach Einstellungen schlägt nach der Eingabe nicht mehr fehl (das Ereignisziel ging im Shadow DOM verloren).
- Änderungen, die auf einer Registerkarte vorgenommen werden, können die Einstellungen einer anderen Registerkarte nicht mehr überschreiben.
- Panel-Hotkeys funktionieren bei nicht-lateinischen Layouts nicht mehr.
– Falsche Beschriftungen in den Diagnoseprotokoll-Steuerelementen und ein verirrtes koreanisches Wort im japanischen Skripttitel.
- Überprüfung auf angehaltene Wiedergabe und Unterbrechung der Stream-Synchronisierung, während die Registerkarte ausgeblendet ist.

### Entfernt

- Funktionen, die nicht mit Kicks Player verifiziert werden konnten oder dupliziert wurden: Einstellung für niedrige Latenz, Ausblenden der Player-Steuerelemente im Leerlauf und die GitHub-basierte In-Panel-Update-Prüfung (verwenden Sie die Updates Ihres Userscript-Managers oder die Seite „Releases“).
- Überentwickelte Optionen: gespeicherte Darstellungsprofile, Ein-/Ausblenden/Neuanordnen von Abschnitten, alternative Navigationsmodi, Kompatibilitäts- und Übersetzungsabdeckungsprüfungen, Zufalls-/Bildlauf-/Abschnittsanimationen, Benachrichtigungsdauer pro Ereignis, Kanal-Avatare, Gruppenfarben, manuelle Reihenfolge, Massenauswahl, Verlauf pro Kanal und automatische Bereinigung.

### Kompatibilität

- Vorhandene Einstellungen und gespeicherte Kanäle bleiben beim Update von v1.2.0 und v1.1.0 erhalten.
- Die Einstellungen bleiben lokal im Browser; Das Skript sendet keine Telemetriedaten und stellt keine Netzwerkanfragen.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Veröffentlichungen](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 – 07.10.2026

> Der ursprüngliche Helfer für Qualität und Lautstärke wurde zu einem vollständigen Toolkit für Player-Einstellungen erweitert.

### Hinzugefügt

- Kanalspezifische Profile für Qualität, Lautstärke, Wiedergabegeschwindigkeit und Stummschaltungsstatus.
- Gespeicherte Kanalliste mit Notizen, Gruppen, Profilbearbeitung und Import/Export.
- Soundeffekte mit einem globalen Schalter, einzelnen Ereignisschaltern, Vorschauen und Lautstärke pro Ereignis.
- Benachrichtigungen über Qualitätsänderungen, wiederhergestelltes Volumen und fehlgeschlagene Aktionen.
- Benachrichtigungsverlauf, Aktionsprotokoll und Diagnosetools mit klaren Steuerelementen.
- Qualitätsverfügbarkeitsprüfungen, Konfliktprüfungen und Kompatibilitätsprüfungen.
- Abgesicherter Modus zum vorübergehenden Deaktivieren automatischer Spielerwechsel.
- Hotkeys, Panel-Ziehen, Panel-Größenänderung und eine Aktion im mittleren Panel.
- Kick- und Minimal-Panel-Stile, kompaktes Layout und Animationssteuerelemente.
- Sleep-Timer, Vollbild-Fokusmodus, Player-Neusynchronisierung und Wiedergabesteuerung.
- Import/Export von Einstellungen und Kanalprofilen.
- Tastaturnavigation, Textskalierung, Sprachausgabeansagen und hoher Kontrast.
- Schnittstellenlokalisierung für 38 unterstützte Sprachen.

### Behoben

– Es wurde verhindert, dass mehrere sekundäre Dialoge gleichzeitig angezeigt werden.
– Ein leerer Dialog, der über dem Fenster mit den Toneinstellungen angezeigt wurde, wurde behoben.
- Leere Benachrichtigungsmeldungen wurden ignoriert, anstatt leere Überlagerungen anzuzeigen.
- Verbesserte Verpackung langer Etiketten auf schmalen Panels und lokalisierten Layouts.
– Das Ersetzen der Platzhalter `{quality}` und `{q}` in Benachrichtigungen wurde korrigiert.
– Die In-Panel-Versionsbezeichnung und der Update-Vergleich wurden auf 1.2.0 aktualisiert.

### Kompatibilität

- Vorhandene Einstellungen bleiben beim Update von v1.1.0 erhalten.
- Die Einstellungen bleiben lokal im Browser; Das Skript sendet keine Telemetriedaten.
– Der Update-Checker liest das neueste GitHub-Release-Tag und installiert Updates nicht automatisch.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Veröffentlichungen](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Probleme](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Die ursprüngliche öffentliche Version konzentrierte sich darauf, die Videoqualität und -lautstärke bei Kick zu speichern, sie automatisch auf neue Streams anzuwenden und ein F2-Einstellungsfeld bereitzustellen.
