<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Funkcijų žinynas

Išsamus Kick Stream Tweaks 1.2.0 funkcijų žinynas, aprašantis kiekvieną grupę ir metodų veikimą.


## Grotuvo sinchronizavimas

Metodai skaito Kick grotuvo būseną ir pagal profilius bei išimtis taiko išsaugotą kokybę, garsumą ir greitį.

| Funkcijos | Aprašas |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Metodai skaito Kick grotuvo būseną ir pagal profilius bei išimtis taiko išsaugotą kokybę, garsumą ir greitį. |

## Skydelis ir išdėstymas

Sukuria skydelį ir langus, valdo stilius, sparčiuosius klavišus, vilkimą, dydį ir grotuvo nustatymus.

| Funkcijos | Aprašas |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | Sukuria skydelį ir langus, valdo stilius, sparčiuosius klavišus, vilkimą, dydį ir grotuvo nustatymus. |

## Diagnostika, pranešimai ir garsas

Atnaujina būseną, registruoja įvykius, rodo pranešimus ir kuria Web Audio garsus.

| Funkcijos | Aprašas |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | Atnaujina būseną, registruoja įvykius, rodo pranešimus ir kuria Web Audio garsus. |

## Dialogai ir gyvavimo ciklas

Atidaro garso ir kanalų nustatymus, kanalų sąrašą ir valdo skydelį.

| Funkcijos | Aprašas |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | Atidaro garso ir kanalų nustatymus, kanalų sąrašą ir valdo skydelį. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)