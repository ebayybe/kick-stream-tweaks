<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Функцийн лавлах

Kick Stream Tweaks 1.2.0-ийн бүх функцийн лавлах бөгөөд бүлэг бүрийн үүрэг, аргуудын ажиллагааг тайлбарлана.


## Тоглуулагчийн синхрончлол

Эдгээр арга нь Kick тоглуулагчийн төлөвийг уншиж, профайл болон үл хамаарах тохиргооны дагуу хадгалсан чанар, дуу, хурдыг хэрэглэнэ.

| Функцүүд | Тайлбар |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Эдгээр арга нь Kick тоглуулагчийн төлөвийг уншиж, профайл болон үл хамаарах тохиргооны дагуу хадгалсан чанар, дуу, хурдыг хэрэглэнэ. |

## Самбар ба байрлал

Самбар, цонх үүсгэж, загвар, товчлол, чирэх, хэмжээ болон тоглуулагчийн тохиргоог удирдана.

| Функцүүд | Тайлбар |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | Самбар, цонх үүсгэж, загвар, товчлол, чирэх, хэмжээ болон тоглуулагчийн тохиргоог удирдана. |

## Оношилгоо, мэдэгдэл ба дуу

Төлөв шинэчилж, үйл явдал бүртгэж, мэдэгдэл үзүүлж Web Audio дуу үүсгэнэ.

| Функцүүд | Тайлбар |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | Төлөв шинэчилж, үйл явдал бүртгэж, мэдэгдэл үзүүлж Web Audio дуу үүсгэнэ. |

## Цонх ба амьдралын мөчлөг

Дуу, сувгийн тохиргоо болон сувгийн жагсаалтыг нээж самбарыг удирдана.

| Функцүүд | Тайлбар |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | Дуу, сувгийн тохиргоо болон сувгийн жагсаалтыг нээж самбарыг удирдана. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)