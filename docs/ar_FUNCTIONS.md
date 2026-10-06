<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — مرجع الوظائف

مرجع كامل لوظائف Kick Stream Tweaks 1.2.0. يشرح كل مجموعة وما تفعله الوظائف وكيف تعمل.


## مزامنة المشغل

تقرأ هذه الوظائف حالة مشغل Kick وتطبّق الجودة والصوت والسرعة المحفوظة، مع احترام ملفات القنوات والاستثناءات.

| الوظائف | الوصف |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | تقرأ هذه الوظائف حالة مشغل Kick وتطبّق الجودة والصوت والسرعة المحفوظة، مع احترام ملفات القنوات والاستثناءات. |

## اللوحة والتخطيط

تنشئ هذه الوظائف اللوحة والنوافذ والأساليب والاختصارات والسحب والحجم وإعدادات المشغل.

| الوظائف | الوصف |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | تنشئ هذه الوظائف اللوحة والنوافذ والأساليب والاختصارات والسحب والحجم وإعدادات المشغل. |

## التشخيص والإشعارات والصوت

تحدّث الحالة وتسجل الأحداث وتعرض الإشعارات وتولد أصوات Web Audio وتحافظ على موضع التنبيهات.

| الوظائف | الوصف |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | تحدّث الحالة وتسجل الأحداث وتعرض الإشعارات وتولد أصوات Web Audio وتحافظ على موضع التنبيهات. |

## النوافذ ودورة الحياة

تفتح هذه الوظائف إعدادات الصوت والقنوات وقائمة القنوات وتدير فتح اللوحة وإغلاقها.

| الوظائف | الوصف |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | تفتح هذه الوظائف إعدادات الصوت والقنوات وقائمة القنوات وتدير فتح اللوحة وإغلاقها. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)