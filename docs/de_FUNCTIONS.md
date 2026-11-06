<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · **Deutsch** · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks – Funktionsreferenz

Referenz für Kick Stream Tweaks 1.3.1. Es beschreibt, was jeder Funktionsbereich tut, wie die Einstellungen gespeichert werden, von welchen Teilen der Kick-Seite das Skript abhängt und wie jede benannte Funktion oder Methode im Benutzerskript funktioniert. Siehe [Repository](https://github.com/ebayybe/kick-stream-tweaks) und [Changelog](../CHANGELOG/en_CHANGELOG.md) .

> Namen stimmen mit der Quelle überein. `void` bedeutet, dass eine Funktion durch Nebenwirkungen wirkt. Eine als `Object.method` geschriebene Methode lebt von diesem Objekt ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Inhalt

1. [Architektur](#architecture)
2. [Verhalten gegenüber dem Benutzer](#user-facing-behavior)
3. [Referenz zu den Einstellungen](#settings-reference)
4. [Kerndienstprogramme](#core-utilities)
5. [Speicherung der Einstellungen](#settings-storage)
6. [Spielersynchronisierung ( `PlayerSync` )](#player-synchronization-playersync)
7. [Seiten-Extras ( `Extras` )](#page-extras-extras)
8. [Schnittstellenbausteine](#interface-building-blocks)
9. [Einstellungsseiten ( `PAGES` )](#settings-pages-pages)
10. [Panel-Controller ( `GUI` )](#panel-controller-gui)
11. [Hotkeys und Start](#hotkeys-and-startup)
12. [Seitenabhängigkeiten entfernen](#kick-page-dependencies)
13. [Lokalisierung](#localization)
14. [Sicherheit, Datenschutz und Kompatibilität](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architektur

Das Benutzerskript ist eine eigenständige Datei, die beim `document-start` mit `@grant none` ausgeführt wird. Es gibt keinen Build-Schritt und stellt keine eigenen Netzwerkanfragen.

| Schicht | Objekt / Bereich | Verantwortung |
|---|---|---|
| Daten | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Übersetzungen für 38 Sprachen, lokalisierte Diagnosemeldungen, Flaggen-SVGs und Sprachnamen. |
| Konfiguration | `CONFIG` , `DEFAULTS` | Konstanten (Selektoren, Wiederholungslimits, Voreinstellungen, Abschnitte) und Standardeinstellungen. |
| Lagerung | `sanitizeSettings` , `Store` , `persist` | Validiert und speichert Einstellungen in `localStorage` ; Behält einen Rückgängig-Stapel im Speicher. |
| Spielerlogik | `PlayerSync` | Findet das Video, stellt Qualität, Lautstärke, Geschwindigkeit und Ruhemodus wieder her und überwacht, ob es einfriert. |
| Seitenhelfer | `Extras` | Layout-Schaltflächen, Belohnungsanforderung, Kanal-Avatare und der Hintergrundplaner. |
| Schnittstelle | `PAGES` , `GUI` , Helfer | Shadow-DOM-Bedienfeld, Benachrichtigungen, Sounds, schwebende Quick-Claim-Schaltfläche, Hotkeys. |

Datenfluss: Die 1,5 Sekunden lange `PlayerSync.sync` Schleife liest die effektiven Einstellungen (zuerst Kanalprofil, dann global), wendet sie auf den Player an und ruft `Extras.tick` auf. Benutzeraktionen durchlaufen `GUI` Handler, die die Einstellungen mit `persist` aktualisieren und nur den betroffenen Teil an den Player übertragen ( `media` oder `all` ).

<a id="user-facing-behavior"></a>
## Benutzerorientiertes Verhalten

| Bereich | Verhalten |
|---|---|
| Spielerpersistenz | Speichert Live-/VOD-Qualität, Lautstärke, Stummschaltungsstatus, Stummschaltungsmodus und Geschwindigkeit und wendet diese dann an, wenn ein neuer Stream erkannt wird. Änderungen, die die Seite selbst vornimmt (z. B. Kick, das die Lautstärke auf 50 % zurücksetzt), werden rückgängig gemacht; Nur die eigenen Aktionen des Betrachters aktualisieren die gespeicherten Werte. |
| Qualität | Wählt die bevorzugte Qualität über das Player-Menü aus, greift bei Nichtverfügbarkeit auf die nächstniedrigere Qualität (oder „Auto“) zurück und schließt das Menü wieder. Nur echte Benutzerklicks verleihen dem Skript eine neue „Zuletzt verwendet“-Qualität. |
| Lautstärke und lautlose Wiedergabe | Lautstärke und Stummschaltung werden pro Stream wiederhergestellt. Bei der stillen Wiedergabe wird das Video ohne Verstärkung durch die Web-Audio-Engine geleitet, sodass der Stream weiterhin in einem Hintergrundregister abgespielt wird, ohne stummgeschaltet zu werden. |
| Kanalprofile | **„Diesen Kanal speichern“** speichert die aktuelle Qualität, Lautstärke, Geschwindigkeit und den Ton des gerade angesehenen Kanals. Profile enthalten außerdem Notizen, Gruppen, den Pin-Status, einen Avatar und die aktivierten/ausgeschlossenen Flags. |
| Voreinstellungen | Sparen Sie Bandbreite, beste Qualität, leises Fernsehen und VOD mit nur einem Klick. |
| Panel | `F2` oder ein benutzerdefinierter Hotkey öffnet ein Bedienfeld mit fester Breite (680 Pixel) mit einer gruppierten Seitenleiste, Such-, Kick- und Minimal-Stilen, hellen/dunklen Themen, 14 Akzentfarben plus Farbauswahl, kompaktem Layout, Hintergrundunschärfe, Textskalierung, hohem Kontrast und Animationssteuerelementen. |
| Suchen | Akzentunempfindlich, passt sich der Sprache der Benutzeroberfläche und den englischen Namen an und stimmt mit Abschnitts- oder Kartentiteln überein. Im Bedienfeld eingegebene Tastenanschläge erreichen niemals die Hotkeys von Kick. |
| Schieberegler | Jeder Schieberegler reagiert auf Klicks, Ziehen, Tastaturpfeile und das Mausrad. |
| Geräusche | Web-Audio-Hinweise für Menüaktionen, Einstellungsänderungen, Qualitätserfolg/-fehler und Lautstärkewiederherstellung, jeweils mit Schalter, Vorschau und Lautstärke. |
| Benachrichtigungen | Lokalisierte Nachrichten, die verschoben, skaliert, transparent gemacht, stummgeschaltet (nicht stören, im Vollbildmodus leise) und im Verlauf aufgezeichnet werden können. |
| Frostalarm | Erkennt einen blockierten Player oder einen schwarzen Bildschirm, gibt einen lauten Alarm aus (auch in einem versteckten Tab, unabhängig vom Soundeffekt-Schalter) und zeigt eine Benachrichtigung an. |
| Belohnungen | Die optionale automatische Beanspruchung wartet auf die Belohnungsbenachrichtigung von Kick (oder läuft nach einem Zeitplan), öffnet das Belohnungsfenster, beansprucht, was verfügbar ist, und schließt es. Eine schwebende, verschiebbare Schnellanforderungsschaltfläche erledigt dasselbe mit einem Klick. |
| Layout | Blendet den Chat aus und blendet das linke Menü im Bedienfeld oder mit Hotkeys aus, wobei optional die Auswahl für jeden Stream gespeichert wird. |
| Werkzeuge | Sleep-Timer, Fokusansicht (Vollbild), Player-Neusynchronisierung und ein abgesicherter Modus, der jede automatische Änderung anhält. |
| Diagnose | Live-Status, erkannte Qualitäten, Videoauflösung, Qualitätsscan, Konfliktprüfung, Aktionsprotokoll und ein kopierbarer Bericht. |
| Daten | Export/Import von Einstellungen, Rückgängig machen, Wiederherstellen nach Reset, Sichern/Wiederherstellen gespeicherter Kanäle. |
| Datenschutz | Einstellungen, Profile, Protokolle und Historien bleiben im Browserspeicher. Es wird nichts irgendwo hingeschickt. |

<a id="settings-reference"></a>
## Einstellungsreferenz

Alle Werte werden von `sanitizeSettings` validiert; Alles Ungültige wird auf die Standardeinstellung zurückgesetzt. Bereiche werden erzwungen.

### Spieler

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `autoQualityEnabled` | boolescher Wert | `true` | Wenden Sie die bevorzugte Qualität automatisch an. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Qualität zur Beantragung von Livestreams und VODs. `auto` bedeutet „meine letzte Wahl merken“. |
| `lastLiveQuality` , `lastVodQuality` | gleich | `auto` | Letzte Qualität, die der Betrachter von Hand ausgewählt hat. |
| `qualityFallback` | `lower` , `auto` | `lower` | Was tun, wenn die gewünschte Qualität nicht angeboten wird? |
| `autoVolumeEnabled` | boolescher Wert | `true` | Stellen Sie das gespeicherte Volume wieder her und schützen Sie es. |
| `volume` | 0–1 | `1` | Volumen gespart. |
| `muted` | boolescher Wert | `false` | Stummschaltungsstatus gespeichert. |
| `silent` | boolescher Wert | `false` | Leise Wiedergabe (Audiograph ohne Verstärkung, Player nicht stummgeschaltet). |
| `playbackRate` | 0,25–2,5 | `1` | Gespeicherte Geschwindigkeit; `1` wird niemals erzwungen. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolescher Wert; 60–100, Schritt 5 | `true` ; `85` | Warnung bei hohem Volumen. |
| `safeMode` | boolescher Wert | `false` | Pausieren Sie jede automatische Änderung. |
| `channelProfiles` | Objekt, bis zu 200 | `{}` | Profile pro Kanal (siehe unten). |

Kanalprofilfelder: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (nur `https://…kick.com/images/user/…` ), `note` (240 Zeichen), `group` (40 Zeichen), `updatedAt` , `lastUsed` .

### Benachrichtigungen und Töne

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `notificationsEnabled` | boolescher Wert | `true` | Ergebnisbenachrichtigungen anzeigen. |
| `doNotDisturb` , `quietFullscreen` | boolescher Wert | `false` , `true` | Benachrichtigungen und Töne unterdrücken oder nur im Vollbildmodus. |
| `notificationScale` | 0,8–1,4 | `1` | Benachrichtigungsgröße. |
| `notificationDuration` | 1500–12000 ms, Schritt 500 | `3500` | Wie lange eine Benachrichtigung bleibt. |
| `notificationOpacity` | 0,35–1 | `0.95` | Benachrichtigungstransparenz. |
| `notificationShowIcon` | boolescher Wert | `true` | Statussymbol anzeigen. |
| `notificationPosition` | `{x, y}` oder `null` | `null` | Gezogene Position. |
| `notificationHistoryEnabled` , `notificationHistory` | boolescher Wert; bis zu 30 Einträge | `true` ; `[]` | Verlauf der Benachrichtigungen. |
| `soundEffectsEnabled` , `soundVolume` | boolescher Wert; 0–1 | `false` ; `0.35` | Hauptschalter und Lautstärke. |
| `soundEvents` , `soundEventVolumes` | pro Ereignis: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | alles an; `0.35` | Umschalten und Lautstärke pro Ereignis. |

### Aussehen, Bewegung und Verknüpfungen

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Farbthema. |
| `panelStyle` | `kick` , `minimal` | `kick` | Visueller Stil des Panels. |
| `accentColor` | `#rrggbb` | `#53fc18` | Akzentfarbe. |
| `compactMode` , `highContrast` | boolescher Wert | `false` | Dichte und Kontrast. |
| `backdropBlur` | 0–12 px | `6` | Hintergrundunschärfe hinter dem Panel (funktioniert in beiden Stilen). |
| `textScale` | 0,9–1,3 | `1` | Textgröße. |
| `language` , `languageChosen` | Gebietsschemacode; boolescher Wert | Browsersprache; `false` | Die Benutzeroberfläche folgt der Browsersprache, bis eine Sprache ausgewählt wird. Anschließend wird die Auswahl gespeichert. |
| `panelPosition` | `{x, y}` oder `null` | `null` | Gezogene Panelposition. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Animationsgeschwindigkeit. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Effekt zum Öffnen/Schließen des Panels. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hover-Effekt. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logo-/Indikatoranimation. |
| `iconAnimations` | boolescher Wert | `true` | Animieren Sie Seitenleisten-, Reset- und Hilfesymbole. |
| `hotkey` | Kombinationszeichenfolge | `F2` | Öffnet oder schließt das Panel. |
| `actionHotkeys` | Combo-Strings | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Benachrichtigungen umschalten, Ansicht fokussieren, Qualität zurücksetzen, Lautstärke wiederherstellen, Chat umschalten, linkes Menü umschalten. |

Tastenkombinationen werden als Zeichenfolgen wie `Alt+Q` gespeichert und der physischen Taste zugeordnet, sodass sie auf jedem Tastaturlayout funktionieren. Einstellungen aus älteren Versionen mit einem objektförmigen Hotkey werden automatisch konvertiert. Die Panelbreite ist auf 680 px festgelegt (begrenzt auf die Fenstergröße); Die bisherige Breiteneinstellung wird ignoriert.

### Werkzeuge

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `autoRecoverStall` | boolescher Wert | `false` | Versuchen Sie `play()` wenn ein Einfrieren erkannt wird. |
| `freezeAlertEnabled` , `freezeSound` | boolescher Wert | `true` | Benachrichtigung und Alarmton einfrieren. |
| `freezeSeconds` | 5–60, Schritt 5 | `10` | Sekunden ohne Fortschritt vor dem Alarm. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolescher Wert | `false` | Gemerktes Layout, einmal pro Seite angewendet. |
| `autoClaimRewards` | boolescher Wert | `false` | Aktivieren Sie die automatische Inanspruchnahme von Prämien. |
| `claimMode` | `notify` , `interval` | `notify` | Fordern Sie den Anspruch an, wenn Kick seine Benachrichtigung anzeigt, oder nach einem Zeitplan. |
| `claimDelaySec` | 0–120, Schritt 5 | `5` | Warten Sie, bis die Benachrichtigung erscheint (Benachrichtigungsmodus). |
| `claimIntervalMin` | 5–120, Schritt 5 | `10` | Minuten zwischen den Überprüfungen (geplanter Modus). |

### Schaltfläche „Schnellanspruch“.

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `claimWidget` | boolescher Wert | `false` | Zeigen Sie die schwebende Schaltfläche an. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Knopfdesign. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Eingebautes Symbol oder das eigene Bild des Benutzers. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , bis zu 90.000 Zeichen | leer | Neukodierte Kopie des hochgeladenen Bildes. Alles andere wird abgelehnt. |
| `claimWidgetImageFill` | boolescher Wert | `false` | Lassen Sie ein benutzerdefiniertes Bild die gesamte Schaltfläche ausfüllen (wird vom Pillendesign nicht verwendet). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Knopfgröße. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Deckkraft der Schaltfläche (volle Deckkraft, solange eine Belohnung verfügbar ist). |
| `claimWidgetAutoHide` | boolescher Wert | `false` | Zeigen Sie die Schaltfläche nur an, wenn eine Belohnung verfügbar ist. |
| `claimWidgetPos` | `{x, y}` oder `null` | `null` | Gezogene Position. |

### Diagnose und Status

| Schlüssel | Typ / Bereich | Standard | Bedeutung |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolescher Wert; bis zu 60 Einträge | `true` ; `[]` | Aktionsprotokoll. |
| `activeSection` | Abschnitts-ID | `playback` | Zuletzt geöffnete Seite. |
| `resetBackup` | Einstellungsobjekt | `null` | Schnappschuss, der vor einem Zurücksetzen oder Import erstellt wurde. |

<a id="core-utilities"></a>
## Kerndienstprogramme

| Funktion | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `detectLanguage` | — → Gebietsschema | Durchläuft `navigator.languages` , ordnet regionale Varianten zu ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) und gibt das erste unterstützte Gebietsschema oder `en` zurück. |
| `dictFor` | lang → Wörterbuch | Gibt die Übersetzungstabelle für ein Gebietsschema zurück und greift auf die Basissprache und dann auf Englisch zurück. |
| `t` / `T` | lang, key, vars → string | Löst einen Schlüssel mit `{placeholder}` -Ersetzung auf; `T` verwendet die aktuelle Sprache. |
| `diagText` | Index, Qualität → String | Gibt einen der lokalisierten Diagnosesätze zurück. |
| `log` | …argumente → void | Konsolenprotokollierung mit dem Skriptpräfix. |
| `clamp` , `sleep` , `esc` | Wert → Wert | Bereichsbegrenzung, versprochene Verzögerung und HTML-Escape. |
| `normalizeQuality` | Text → Zeichenfolge | Schreibt ein Qualitätslabel in Kleinbuchstaben und entfernt Leerzeichen. |
| `debounce` | fn, warte → Funktion | Trailing-Entprellung mit einer `flush` Methode. |
| `onLocationChange` | Rückruf → ungültig | Erkennt die Navigation auf einer Seite, indem `pushState` / `replaceState` umschlossen wird, `popstate` überwacht und einmal pro Sekunde abgefragt wird. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | Ereignis → string/boolean | Erstellen und vergleichen Sie Tastenkombinationen aus dem physischen Tastencode. |
| `mkPointer` | Typ, extra → Ereignis | Erstellt ein `PointerEvent` (oder ein `MouseEvent` , wenn es nicht verfügbar ist), das zum Steuern der ARIA-Menüs von Kick verwendet wird. |
| `waitFor` | Sonde, Zeitüberschreitung, Schritt → Wert/Null | Abfragen, bis das Probe einen Wert zurückgibt oder die Zeitüberschreitung abläuft. |
| `imageToDataUrl` | Bild → Zeichenfolge | Skaliert ein Bild in eine quadratische Leinwand (unter Beibehaltung der Proportionen, `willReadFrequently` ), versucht 128, 96 und 64 Pixel und gibt eine PNG-Daten-URL zurück, die nicht größer als 70.000 Zeichen ist. |

<a id="settings-storage"></a>
## Einstellungsspeicher

| Funktion | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `sanitizeProfiles` | Objekt → Objekt | Hält höchstens 200 Profile mit gültigen Schlüsseln und klemmt jedes Feld fest; Der Avatar muss eine Kick-Bild-URL sein. |
| `sanitizeSettings` | Objekt, mitBackup → Objekt | Validiert jede Einstellung (Typen, Bereiche, zulässige Werte), migriert die Einstellungen 1.1–1.3 (ältere Qualität, Hotkey, Animation und Abschnittstasten) und wendet die Sprachregel an. |
| `legacyHotkey` | Wert → Zeichenfolge | Konvertiert einen objektförmigen Hotkey in eine Kombinationszeichenfolge. |
| `Store.load` / `Store.save` | — / Einstellungen → Einstellungen/void | Lesen und schreiben Sie das bereinigte Objekt in `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | patch, `{undo}` → ungültig | Führt einen Patch zusammen, bereinigt ihn, speichert ihn mit einem kurzen Debounce und verschiebt optional einen Undo-Snapshot (wird nur im Speicher gehalten, bis zu 15). |
| `storage` Listener | Ereignis → nichtig | Lädt die Einstellungen neu, wenn ein anderer Kick-Tab sie ändert, sodass sich die Tabs nie gegenseitig überschreiben. |

<a id="player-synchronization-playersync"></a>
## Player-Synchronisierung ( `PlayerSync` )

### Kanal- und Profilhelfer

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `isVod` | — → boolescher Wert | Erkennt eine VOD-Seite anhand der URL. |
| `channelKey` | — → Zeichenfolge | Erstellt den stabilen Schlüssel `channel:slug` (oder `vod:id` , `kick:home` ) und speichert das Ergebnis drei Sekunden lang zwischen. Auf VOD-Seiten wird der Kanallink verwendet, der dem Player am nächsten liegt. |
| `channelSlug` | — → Zeichenfolge | Gibt den Slug-Teil eines Kanalschlüssels zurück. |
| `profile` | Schlüssel → Objekt/null | Liest ein gespeichertes Profil. |
| `profileActive` | — → Objekt/null | Gibt das aktuelle Profil nur zurück, wenn es aktiviert und nicht ausgeschlossen ist. |
| `isExcluded` | — → boolescher Wert | Prüft, ob die Automatisierung für diesen Kanal deaktiviert ist. |
| `updateProfile` | Patch, Schlüssel → void | Erstellt oder führt ein Profil zusammen und stempelt `updatedAt` . |
| `saveCurrentChannel` | — → Objekt/null | Speichert die aktuelle Qualität, Lautstärke, Stummschaltung, Geschwindigkeit und den Ruhezustand des Betrachters als aktiviertes Profil und durchsucht die Seite nach dem Kanal-Avatar. |
| `effective` | — → Objekt | Löst Lautstärke, Stummschaltung, Stille, Geschwindigkeit und Live-/VOD-Qualität aus dem aktiven Profil oder den globalen Einstellungen. |
| `setStatus` | Status, Ergebnis → ungültig | Aktualisiert den Status und die letzten Ergebniscodes, die in der Kopfzeile und in der Diagnose angezeigt werden. |

### Kicks Spieler finden und fahren

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `findMainVideo` | — → video/null | Wählt das größte sichtbare `<video>` aus. |
| `streamKey` | — → Zeichenfolge | Gibt den Seitenpfad zurück, der zum Anwenden der Qualität einmal pro Stream verwendet wird. |
| `isAccountButton` | Schaltfläche → Boolescher Wert | Lehnt Header-, Avatar- und Kontoschaltflächen ab. |
| `findSettingsButton` | Video → Schaltfläche/null | Findet die Zahnradschaltfläche des Players anhand der Beschriftung oder anhand der Nähe zur unteren rechten Ecke des Videos. |
| `revealControls` | Video → nichtig | Sendet Hover-Ereignisse, sodass versteckte Steuerelemente angezeigt werden. |
| `simulateClick` | Element → nichtig | Sendet die vollständige Zeigerereignissequenz, die Kicks Menüs benötigen. |
| `menuItems` | — → element[] | Listet sichtbare `menuitemradio` Einträge auf. |
| `openQualityMenu` | — → Schaltfläche/null | Öffnet das Zahnradmenü, geht zu einem Qualitätseintrag, wenn ein Menü der obersten Ebene erscheint, und wartet auf die Optionen. |
| `closeMenu` | Schaltfläche → Versprechen | Schließt das Menü nur, wenn es noch geöffnet ist (ein blinder zweiter Klick könnte es erneut öffnen), mit einem Escape-Fallback. |
| `readMenu` | — → element[] | Erfasst die angebotenen und geprüften Qualitäten. |
| `scanQualities` | — → Versprechen<boolean> | Öffnet das Menü, zeichnet die verfügbaren Qualitäten auf und schließt es (wird für die Diagnose verwendet). |
| `activate` | Artikel → Versprechen | Klicken Sie auf eine Option und warten Sie, bis sie aktiviert ist. |
| `selectQuality` | erwünscht, Fallback → Versprechen | Wählt die gewünschte Qualität aus, andernfalls die nächstniedrigere oder Auto. |
| `desiredQuality` | — → Zeichenfolge | Wählt die anzuwendende Qualität aus dem Profil, der Präferenz oder der letzten manuellen Auswahl aus. |
| `applyQualityOnce` | streamKey → Versprechen | Wendet einmal pro Stream die gewünschte Qualität an, schließt das Menü und benachrichtigt über Erfolg oder Misserfolg. |
| `watchManualQuality` | — → nichtig | Erlernt eine neue „zuletzt verwendete“ Qualität nur durch echte (vertrauenswürdige) Klicks, sodass automatisierte Klicks und Fallbacks niemals gespeicherte Werte überschreiben. |

### Lautstärke, Lautlosmodus, Geschwindigkeit und Überwachung

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `applyVolume` | Video, ruhig → nichtig | Schreibt die effektive Lautstärke und den Stummschaltungsstatus (markiert als eigene Änderung des Skripts). |
| `trackInput` | — → nichtig | Zeichnet die Zeit der letzten vertrauenswürdigen Zeiger-, Rad-, Berührungs- oder Tastatureingabe auf. |
| `reassertVolume` | Video → nichtig | Stellt das gespeicherte Volumen wieder her, wenn die Seite es geändert hat, ohne dass eine Benutzereingabe erforderlich ist (die Rate ist auf acht Wiederherstellungen pro zehn Sekunden begrenzt). |
| `watchVolume` | Video → nichtig | Hört auf `volumechange` : Benutzergesteuerte Änderungen werden gespeichert, seitengesteuerte werden rückgängig gemacht. |
| `checkLoud` | Lautstärke, gedämpft → nichtig | Warnt einmal, wenn die Lautstärke den Schwellenwert überschreitet. |
| `buildGraph` | Video → Grafik/Null | Verbindet das Video über einen Verstärkungsknoten mit einem `AudioContext` . meldet, wenn die Website dies nicht zulässt. |
| `applySilent` | Video → nichtig | Setzt die Verstärkung auf 0 für stille Wiedergabe oder zurück auf 1 und setzt den Kontext bei Bedarf fort. |
| `applyRate` | Video, erzwingen → ungültig | Legt die gespeicherte Geschwindigkeit fest; `1` wird nicht erzwungen, es sei denn, der Zuschauer hat es einfach ausgewählt, daher wird Kicks eigener Live-Edge-Aufholprozess respektiert. |
| `applyMedia` | Video, `{rate}` → ungültig | Wendet erneut Lautstärke, Lautlosmodus und optional Geschwindigkeit an, ohne die Qualität zu beeinträchtigen. |
| `monitorFreeze` | Video → nichtig | Erkennt einen blockierten Player (Zeit bleibt hängen) oder einen schwarzen Bildschirm (Zeit läuft ohne dekodierte Bilder) und löst einen Alarm und eine optionale Wiederherstellung aus. Funktioniert in versteckten Tabs. |

### Schleife und Lebenszyklus

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `sync` | — → Versprechen | Die Hauptschleife: Überwacht das Einfrieren, bindet Zuhörer, wendet Ruhemodus, Lautstärke, Geschwindigkeit und Qualität an, respektiert den abgesicherten Modus und Ausschlüsse und ruft dann `Extras.tick` auf. |
| `resync` | — → Versprechen | Erzwingt einen neuen Durchgang (wird von Voreinstellungen, Schnellaktionen und Qualitätsänderungen verwendet). |
| `init` | — → nichtig | Startet die erste Synchronisierung, den Navigations-Listener und das 1,5-Sekunden-Intervall. |

<a id="page-extras-extras"></a>
## Seitenextras ( `Extras` )

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `root` , `layoutState` | — → element / `{chat, sidebar}` | Lesen Sie den Layoutstatus von Kick aus `data-chat` und `data-sidebar` im Seitencontainer. |
| `isDesktop` | — → boolescher Wert | Die Layoutautomatisierung läuft nur bei Desktopbreiten. |
| `click` | Element → Boolescher Wert | Klickt über `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → Schaltfläche/null | Suchen Sie im Chatroom nach der Schaltfläche zum Minimieren und der Schaltfläche „Chat anzeigen“ (nach Symbol, nicht nach Sprache). |
| `setChat` , `setSidebar` | anzeigen → boolean | Bringen Sie den Chat oder das linke Menü in den gewünschten Zustand, indem Sie Kicks eigene Tasten drücken. |
| `applyLayout` | — → nichtig | Wendet das gespeicherte Layout einmal pro Seite an, ohne dass es zu manuellen Änderungen kommt. |
| `isTyping` | — → boolescher Wert | True, während der Betrachter in ein Feld tippt; Automatische Ansprüche warten. |
| `rewardTrigger` , `popoverCard` | — → Schaltfläche/null | Finden Sie den Geschenk-Button und die Belohnungs-Popover-Karte. |
| `rewardAvailable` | — → boolescher Wert | Erkennt Kicks eigenes Signal „Belohnung verfügbar“ (den animierten Call-to-Action). |
| `isEnabled` | Schaltfläche → Boolescher Wert | Sichtbar und nicht deaktiviert. |
| `claimDrops` | — → Versprechen<number> | Drückt aktivierte Anspruchsschaltflächen für abgeschlossene Drops im Belohnungsfenster. |
| `claimDaily` | Auslöser → Versprechen<number> | Öffnet das Belohnungsfenster, drückt jede aktivierte Anspruchsschaltfläche einmal (niemals dieselbe Schaltfläche zweimal) und schließt dann das Fenster. |
| `claimRewards` | `{manual}` → Versprechen<number> | Führt eine vollständige Schadensmeldung durch, meldet das Ergebnis und spielt einen Ton ab; Manuelle Läufe ignorieren die Eingabe und melden, wenn es keinen Anspruch gibt. |
| `normName` | Text → Zeichenfolge | Normalisiert Namen für den Abgleich ( `_` und Leerzeichen bis `-` ). |
| `findAvatar` | Schnecke → Zeichenfolge | Gibt den auf der Seite sichtbaren Kanal-Avatar zurück (wird verwendet, bevor ein Kanal gespeichert wird). |
| `scanAvatars` | — → nichtig | Speichert Avatare für gespeicherte Kanäle, die keinen haben. |
| `tick` | streamKey → void | Von `sync` aufgerufener Planer: wendet das Layout an, scannt Avatare, wartet auf die Belohnungsbenachrichtigung (Benachrichtigungsmodus, mit Verzögerung und einer zweiminütigen Abkühlung) oder prüft das ausgewählte Intervall und fragt das Drop-Panel ab. |

<a id="interface-building-blocks"></a>
## Schnittstellenbausteine

| Funktion | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `I` | Name → SVG | Inline-Strichsymbol. |
| `fmtValue` | Format, roh → Zeichenfolge | Formatiert Schiebereglerwerte (Prozent, Pixel, Sekunden). |
| `normSearch` , `englishOf` , `searchText` | Text → Zeichenfolge | Akzentunabhängiger Suchtext, einschließlich des englischen Namens einer übersetzten Bezeichnung. |
| `row` | Schlüssel, Beschriftung, Steuerung, Optionen → html | Eine Einstellungsreihe; standardmäßig gestapelt, nur für Schalter inline, mit optionalem Hilfeschalter. |
| `sw` , `toggleRow` | … → html | Weichensteuerung und eine vorgefertigte Weichenreihe. |
| `chip` , `seg` , `qualityChips` | … → html | Chips, segmentierte Kontrollen und das Qualitätsraster. |
| `range` | attr, Schlüssel, Optionen → html | Schieberegler mit Füllspur und Live-Wert. |
| `card` , `btn` , `ib` | … → html | Karte, Textschaltfläche und Symbolschaltfläche. |
| `timeStr` | Zeitstempel → Zeichenfolge | Lokalisierte Uhrzeit. |
| `setPref` | Schlüssel, Wert → void | Schreibt eine Spielerpräferenz in das aktive Kanalprofil oder in die globalen Einstellungen. |
| `fxBtn` | Schlüssel, Wert, Beschriftung, auf → html | Kachel zur Effektauswahl mit einem kleinen Vorschauzeichen. |
| `avatarHtml` | Name, URL → html | Avatar mit Buchstaben-Fallback; Ein fehlerhaftes Bild wird entfernt. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → Wert | Erstellen Sie das Quick-Claim-Button-Markup sowohl für den Live-Button als auch für die Einstellungsvorschau. |

<a id="settings-pages-pages"></a>
## Einstellungsseiten ( `PAGES` )

| Seite | Inhalt |
|---|---|
| `playback` | Hinweis zum Speichern dieses Kanals, Voreinstellungen, Qualität (automatisch anwenden, Live, VOD, Fallback), Lautstärke (automatisch anwenden, Schieberegler, Stummschaltung, stille Wiedergabe, laute Warnung) und Geschwindigkeit. |
| `channels` | Schritte zur Funktionsweise, aktueller Kanal mit der Schaltfläche **„Diesen Kanal speichern“** , Pausen-/Ausschlussschalter und Editor, dann die Liste der gespeicherten Kanäle (Suchen, Sortieren, Filter anheften, Gruppen, Bearbeiten/Fertig, Löschen) mit Sicherung und Wiederherstellung. |
| `tools` | Sleep-Timer, Seitenlayout, Belohnungen (automatische Beanspruchung, Modus, Verzögerung oder Intervall, Jetzt beanspruchen), Einstellungen der Schnellbeanspruchungsschaltfläche mit Live-Vorschau, Einfrieralarm und Schnellaktionen. |
| `notifications` | Schalter, Größe, Dauer, Deckkraft, Vorschau, Positionsrücksetzung und Verlauf. |
| `sounds` | Hauptschalter und Lautstärke, ereignisspezifische Schalter, Lautstärken und Vorschauen. |
| `appearance` | Thema, Stil, Akzentfarben, Dichte, Kontrast, Textgröße, Unschärfe, Zentrierung und Sprache. |
| `motion` | Live-Vorschau, Voreinstellungen und Auswahlmöglichkeiten für Open-Effect-, Hover-Effect-, Indikator-, Geschwindigkeits- und Symbolanimationen. |
| `shortcuts` | Menü-Hotkeys und Aktions-Hotkeys mit erneuter Bindung. |
| `diagnostics` | Status, Scan, Bericht, Qualitäts- und Konfliktprüfungen, abgesicherter Modus und Aktionsprotokoll. |
| `about` | Version, Links, Export/Import, Rückgängigmachen, Wiederherstellen und Zurücksetzen. |

<a id="panel-controller-gui"></a>
## Panel-Controller ( `GUI` )

### Konstruktion und Rendering

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `build` | — → nichtig | Erstellt den Shadow-DOM-Host, das Panel, den Toast und die Live-Region und verbindet dann Ereignisse. |
| `applyLook` | — → nichtig | Wendet Design, Stil, Akzent, Unschärfe, Textskalierung, Effekte, Sprachattribute und Toasteinstellungen als Attribute und CSS-Variablen an. |
| `renderChrome` | — → nichtig | Rendert den Titel, den Suchplatzhalter, die Pause-Schaltfläche, den Fußzeilenhinweis und die Schnellzugriffsschaltfläche. |
| `renderNav` | — → nichtig | Rendert die gruppierte Seitenleiste. |
| `renderPage` | Optionen → ungültig | Rendert die aktive Seite (oder alle Seiten während der Suche) und behält dabei den Scroll- und Tastaturfokus bei. |
| `filterRows` | — → nichtig | Wendet den Suchfilter auf Zeilen, Karten und Seiten an. |
| `channelEditor` | Schlüssel, Profil → html | Editor für ein Kanalprofil. |
| `refreshAll` , `onExternalChange` | — → nichtig | Rendern Sie nach dem Zurücksetzen, Importieren, Rückgängigmachen oder einer Änderung auf einer anderen Registerkarte alles neu. |

### Ereignisse und Einstellungsänderungen

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `wire` | — → nichtig | Fügt delegierte Klick-, Eingabe-, Änderungs-, Rad- und Scroll-Handler sowie das Ziehen des Panels hinzu. |
| `onClick` , `onInput` , `onChange` | Ereignis → nichtig | Versenden Sie Klicks, Schiebereglerbewegungen und Textänderungen an Einstellungen, Profilen oder Aktionen. |
| `applyRange` | Schlüssel, Wert → void | Wendet einen Schiebereglerwert an (Lautstärke, Unschärfe, Deckkraft, Dauer …). |
| `setSetting` , `setChannel` | Schlüssel/Patch → void | Speichern Sie eine Einstellung oder eine Profiländerung und übertragen Sie den betroffenen Teil auf den Player. |
| `pushToPlayer` | Geltungsbereich, Schlüssel → void | `media` stellen Lautstärke, Ruhemodus und Geschwindigkeit wieder her; `all` bringt auch wieder Qualität. Lautstärke, Stummschaltung, lautloser Modus und Geschwindigkeit öffnen das Qualitätsmenü nie wieder. |
| `act` | Name, Element → Versprechen | Führt benannte Aktionen aus: Voreinstellungen, Speichern und Entfernen von Kanälen, Backup, Import/Export, Ansprüche, Sleep-Timer, Verknüpfungen, Diagnose und mehr. |
| `resetSection` | id → ungültig | Stellt die Standardeinstellungen eines Abschnitts wieder her. |
| `restoreVolume` | — → nichtig | Wendet das gespeicherte Volumen erneut an. |
| `toggleLayout` | welche → nichtig | Blendet den Chat oder das linke Menü ein oder aus und merkt sich die Auswahl. |
| `confirm` , `closeModal` | Nachricht, Optionen / Ergebnis → Versprechen/nichtig | Bestätigungsdialog im Panel (identisch in jedem Browser). |
| `download` , `pickFile` , `pickImage` | … → nichtig | Speichern Sie JSON, lesen Sie JSON und wählen Sie ein Bild für die Schnellanspruchsschaltfläche aus. |
| `startCapture` , `finishCapture` | id / Combo → void | Einen Hotkey erneut binden und Duplikate ablehnen. |
| `replayMock` | — → nichtig | Gibt den geöffneten Effekt in der Animationsvorschau wieder. |

### Tools und Diagnose

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | Minuten / — → ungültig | Starten, brechen Sie den Sleep-Timer ab und zeigen Sie ihn an (er pausiert das Video am Ende). |
| `toggleFocusView` | — → Versprechen | Betritt oder verlässt den Player-Container im Vollbildmodus. |
| `statusText` , `resultText` , `syncDiagnostics` | — → string/void | Lokalisierter Status für die Kopfzeile und die Diagnoseseite. |
| `record` | Nachricht, Ebene → ungültig | Fügt dem Aktionsprotokoll einen zeitgestempelten Eintrag hinzu. |
| `copyDiagnostics` | — → Versprechen | Kopiert einen kurzen Bericht (Version, Status, Qualitäten, Seitentyp, Benutzeragent). |
| `checkQuality` , `checkConflicts` | — → Versprechen/nichtig | Überprüfen Sie, ob die bevorzugte Qualität angeboten wird, und listen Sie Einstellungen auf, die gegeneinander funktionieren. |

### Schaltfläche „Schnellanspruch“.

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `renderClaimWidget` | — → nichtig | Erstellt, aktualisiert oder entfernt die schwebende Schaltfläche und startet ihre einsekündige Statusabfrage. |
| `syncClaimWidget` | — → nichtig | Zeigt den Ring und Punkt „Prämie verfügbar“, den Besetztstatus und die Regel zum automatischen Ausblenden an. |
| `placeClaimWidget` | — → nichtig | Positioniert den Knopf und klemmt ihn am Fenster fest. |
| `wireClaimWidget` | Element → nichtig | Ziehen mit einem Schwellenwert von fünf Pixeln (ein Ziehen zählt nie als Klick), Positionsspeicherung und der Klick, der einen manuellen Anspruch auslöst. |

### Benachrichtigungen, Ton und Panelverhalten

| Methode | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `notify` | Nachricht, Art, Dauer, Kraft → nichtig | Zeigt einen Toast an (sofern er nicht unterdrückt wird), zeichnet den Verlauf auf und kündigt den Text in einer Live-Region an. |
| `notifyQuality` | angewendet, Qualität → nichtig | Spielt den Ergebniston ab, protokolliert und zeigt eine lokalisierte Benachrichtigung an. |
| `initToastPosition` , `wireToastDrag` | — → nichtig | Stellen Sie die gezogene Toastposition wieder her und speichern Sie sie. |
| `onAvatars` | — → nichtig | Aktualisiert Seiten, auf denen Avatare angezeigt werden. |
| `ensureAudio` | — → Kontext | Erstellt den freigegebenen `AudioContext` und setzt ihn fort (entsperrt bei der ersten Benutzergeste). |
| `playSound` , `stopSounds` | Name, Vorschau → ungültig | Generieren und stoppen Sie die Web-Audio-Cues. |
| `playFreezeAlarm` , `alertFrozen` | Kraft → nichtig | Spielen Sie den Fünf-Noten-Alarm ab und aktivieren Sie die Einfrierbenachrichtigung. |
| `placePanel` , `wirePanelDrag` | Position → nichtig | Platzieren Sie das Panel im Fenster und machen Sie die Kopfzeile ziehbar. |
| `open` , `close` , `toggle` | — → nichtig | Steuern Sie die Bedienfeld-, Abfrage-, Fokus- und Menütöne. |
| `syncVolumeControls` | — → nichtig | Hält den Lautstärkeregler bei geöffnetem Bedienfeld mit dem Player synchronisiert. |

<a id="hotkeys-and-startup"></a>
## Hotkeys und Start

| Funktion | Parameter / Rückgabe | Was und wie es funktioniert |
|---|---|---|
| `isolateKeys` | — → nichtig | Wird beim `document-start` in der Erfassungsphase registriert: Tastaturereignisse, die aus dem Panel kommen, werden nicht mehr an Kick weitergegeben (Leertaste, F, M und die Pfeile lösen also nie Spieler-Hotkeys aus) und die Tabulatortaste bleibt im Dialog hängen. |
| `setupHotkeys` | — → nichtig | Behandelt die Tastenerfassung für erneutes Binden, Escape (modal, Dropdown, Panel), den Menü-Hotkey und die Aktions-Hotkeys; Kombinationen mit einem Modifikator oder einer F-Taste funktionieren auch während der Eingabe. |
| `init` | — → nichtig | Erstellt das Panel, installiert Hotkeys und startet `PlayerSync` ; gegen Doppelinjektion geschützt. |

<a id="kick-page-dependencies"></a>
## Seitenabhängigkeiten entfernen

Das Skript basiert auf dem aktuellen Markup von Kick. Wo immer möglich werden Symbole, Attribute und Strukturen anstelle von sichtbarem Text verwendet, sodass es weiterhin in jeder Oberflächensprache funktioniert. Wenn Kick diese ändert, funktioniert die Matching-Funktion nicht mehr (der Rest läuft weiter).

| Funktion | Wonach es sucht |
|---|---|
| Qualität | Ein sichtbares `<video>` , die `button[aria-haspopup="menu"]` und `[role="menuitemradio"]` des Players. |
| Layout | Ein Container mit `data-sidebar` und `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , einer `CollapseRight` -Symbolschaltfläche im `#channel-chatroom` und einer `MessagesOutline` Symbolschaltfläche zum Anzeigen des Chats. |
| Belohnungsbenachrichtigung | Ein `video` , dessen Quelle `reward-available` enthält, oder eine `[role="group"]` Karte, die ein `daily-rewards` -Video enthält. |
| Prämieneinforderung | Eine `button[aria-haspopup="dialog"][aria-controls]` (Geschenksymbol), der von ihr gesteuerte Dialog ( `data-state` ), aktivierte Anspruchsschaltflächen mit einem untergeordneten `.contents` Element und eine Schließen-Schaltfläche mit einer `.sr-only` Beschriftung. |
| Tropfen | `#rewards-panel` listet Elemente mit einer `[role="progressbar"][data-state="complete"]` und einer aktivierten Schaltfläche auf. |
| Avatare | `img[alt]` Elemente, deren Quelle `files.kick.com/images/user/…/profile_image/…` ist. |

<a id="localization"></a>
## Lokalisierung

Jede Beschriftung, jede Hilfemeldung, jeder Fehler, jeder Dialog und jede Benachrichtigung durchläuft den Übersetzungslöser für 38 Gebietsschemas. Fehlende Schlüssel fallen auf Englisch zurück. Der neue Schnittstellentext wird zusammen mit der Funktion, die ihn hinzufügt, in alle unterstützten Sprachen übersetzt. Die Sprachauswahl zeigt Flaggen und native Namen; Die Benutzeroberfläche folgt beim ersten Start der Browsersprache und merkt sich anschließend eine explizite Auswahl.

<a id="safety-privacy-and-compatibility"></a>
## Sicherheit, Datenschutz und Kompatibilität

- Einstellungen werden vor der Speicherung bereinigt; Ungültige Werte werden auf sichere Standardwerte zurückgesetzt.
- Kanalnamen, Notizen, Benachrichtigungstext und Diagnoseausgabe werden vor dem HTML-Einfügen maskiert.
- Ein benutzerdefiniertes Schaltflächensymbol wird von einer Leinwand neu codiert und nur als Daten-URL eines zulässigen Bildtyps gespeichert. es verlässt nie den Browser.
- Shadow DOM hält die Stile des Skripts von Kick isoliert; Tastaturereignisse aus dem Panel sind von Kicks Hotkeys isoliert.
- Automatische Aktionen überspringen ausgeschlossene Kanäle, den abgesicherten Modus und fehlende Player-Elemente. Bei der Belohnungsinanspruchnahme wird niemals zweimal in einem Durchlauf dieselbe Taste gedrückt, und es wird gewartet, während der Betrachter etwas tippt.
- Das Skript stellt keine Netzwerkanfragen; Updates kommen vom Userscript-Manager oder der Release-Seite.
- Vorhandene lokale Einstellungen bleiben beim Wechsel von 1.1.0, 1.2.0 und 1.3.0 erhalten.
