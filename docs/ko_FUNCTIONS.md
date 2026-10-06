<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — 기능 참조

Kick Stream Tweaks 1.2.0의 전체 기능 참조입니다. 각 그룹과 메서드의 동작을 설명합니다.


## 플레이어 동기화

Kick 플레이어 상태를 읽고 프로필과 제외 설정에 따라 저장된 화질, 음량, 속도를 적용합니다.

| 함수 | 설명 |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Kick 플레이어 상태를 읽고 프로필과 제외 설정에 따라 저장된 화질, 음량, 속도를 적용합니다. |

## 패널 및 레이아웃

패널과 창을 만들고 스타일, 단축키, 드래그, 크기 및 플레이어 설정을 관리합니다.

| 함수 | 설명 |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | 패널과 창을 만들고 스타일, 단축키, 드래그, 크기 및 플레이어 설정을 관리합니다. |

## 진단, 알림 및 사운드

상태를 갱신하고 이벤트를 기록하며 알림과 Web Audio 효과음을 제공합니다.

| 함수 | 설명 |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | 상태를 갱신하고 이벤트를 기록하며 알림과 Web Audio 효과음을 제공합니다. |

## 대화 상자 및 수명 주기

사운드와 채널 설정, 채널 목록을 열고 패널을 관리합니다.

| 함수 | 설명 |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | 사운드와 채널 설정, 채널 목록을 열고 패널을 관리합니다. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)