<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — फ़ंक्शन संदर्भ

Kick Stream Tweaks 1.2.0 के फ़ंक्शनों का पूरा संदर्भ। हर समूह और उसकी विधियों का काम समझाया गया है।


## प्लेयर सिंक्रोनाइज़ेशन

ये विधियाँ Kick प्लेयर की स्थिति पढ़कर प्रोफ़ाइल और अपवादों के अनुसार सहेजी गई गुणवत्ता, वॉल्यूम और गति लागू करती हैं।

| फ़ंक्शन | विवरण |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | ये विधियाँ Kick प्लेयर की स्थिति पढ़कर प्रोफ़ाइल और अपवादों के अनुसार सहेजी गई गुणवत्ता, वॉल्यूम और गति लागू करती हैं। |

## पैनल और लेआउट

पैनल और विंडो बनाती हैं तथा शैली, शॉर्टकट, खींचना, आकार और प्लेयर सेटिंग नियंत्रित करती हैं।

| फ़ंक्शन | विवरण |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | पैनल और विंडो बनाती हैं तथा शैली, शॉर्टकट, खींचना, आकार और प्लेयर सेटिंग नियंत्रित करती हैं। |

## डायग्नोस्टिक्स, सूचनाएँ और ध्वनि

स्थिति अपडेट करती हैं, घटनाएँ लॉग करती हैं, सूचनाएँ दिखाती हैं और Web Audio ध्वनि बनाती हैं।

| फ़ंक्शन | विवरण |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | स्थिति अपडेट करती हैं, घटनाएँ लॉग करती हैं, सूचनाएँ दिखाती हैं और Web Audio ध्वनि बनाती हैं। |

## डायलॉग और जीवनचक्र

ध्वनि और चैनल सेटिंग, चैनल सूची खोलती हैं और पैनल नियंत्रित करती हैं।

| फ़ंक्शन | विवरण |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | ध्वनि और चैनल सेटिंग, चैनल सूची खोलती हैं और पैनल नियंत्रित करती हैं। |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)