<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Funktionsreferenz

Vollständige Funktionsreferenz für Kick Stream Tweaks 1.2.0. Beschreibt jede Gruppe und die Arbeitsweise der Methoden.


## Player-Synchronisierung

Diese Methoden lesen den Kick-Player und wenden gespeicherte Qualität, Lautstärke und Geschwindigkeit gemäß Profilen und Ausnahmen an.

| Funktionen | Beschreibung |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Diese Methoden lesen den Kick-Player und wenden gespeicherte Qualität, Lautstärke und Geschwindigkeit gemäß Profilen und Ausnahmen an. |

## Panel und Layout

Erstellen Panel und Fenster und steuern Stile, Tastenkürzel, Ziehen, Größe und Player-Einstellungen.

| Funktionen | Beschreibung |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | Erstellen Panel und Fenster und steuern Stile, Tastenkürzel, Ziehen, Größe und Player-Einstellungen. |

## Diagnose, Benachrichtigungen und Sound

Aktualisieren Status, protokollieren Ereignisse, zeigen Benachrichtigungen und erzeugen Web-Audio-Töne.

| Funktionen | Beschreibung |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | Aktualisieren Status, protokollieren Ereignisse, zeigen Benachrichtigungen und erzeugen Web-Audio-Töne. |

## Dialoge und Lebenszyklus

Öffnen Sound- und Kanaleinstellungen sowie die Kanalliste und steuern das Panel.

| Funktionen | Beschreibung |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | Öffnen Sound- und Kanaleinstellungen sowie die Kanalliste und steuern das Panel. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)