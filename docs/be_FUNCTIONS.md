<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Даведнік функцый

Поўны даведнік функцый Kick Stream Tweaks 1.2.0. Тут апісана, што робіць кожная група і як працуюць метады.


## Сінхранізацыя плэера

Гэтыя метады чытаюць стан плэера Kick і прымяняюць захаваныя якасць, гучнасць і хуткасць з улікам профіляў і выключэнняў.

| Функцыі | Апісанне |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Гэтыя метады чытаюць стан плэера Kick і прымяняюць захаваныя якасць, гучнасць і хуткасць з улікам профіляў і выключэнняў. |

## Панэль і макет

Ствараюць панэль і вокны, кіруюць стылямі, спалучэннямі клавіш, перацягваннем, памерам і наладамі плэера.

| Функцыі | Апісанне |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | Ствараюць панэль і вокны, кіруюць стылямі, спалучэннямі клавіш, перацягваннем, памерам і наладамі плэера. |

## Дыягностыка, апавяшчэнні і гук

Абнаўляюць стан, запісваюць падзеі, паказваюць апавяшчэнні і ствараюць гукі Web Audio.

| Функцыі | Апісанне |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | Абнаўляюць стан, запісваюць падзеі, паказваюць апавяшчэнні і ствараюць гукі Web Audio. |

## Вокны і жыццёвы цыкл

Адкрываюць налады гуку і каналаў, спіс каналаў і кіруюць панэллю.

| Функцыі | Апісанне |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | Адкрываюць налады гуку і каналаў, спіс каналаў і кіруюць панэллю. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)