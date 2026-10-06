<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Tài liệu tham chiếu chức năng

Tài liệu đầy đủ về các chức năng của Kick Stream Tweaks 1.2.0, giải thích từng nhóm và cách hoạt động.


## Đồng bộ trình phát

Các hàm đọc trạng thái trình phát Kick và áp dụng chất lượng, âm lượng, tốc độ đã lưu theo hồ sơ và ngoại lệ.

| Hàm | Mô tả |
|---|---|
| load, save, isVod, channelKey, getChannelProfile, updateChannelProfile, channelMeta, isChannelExcluded, effectivePlaybackRate, applyPlaybackRate, wirePlayerControls, tryLowLatencyOption, checkLoudVolume, monitorPlayback, qualitySettingKeys, setStatus, findMainVideo, getStreamKey, isLikelyAccountButton, findSettingsButton, revealControls, simulateClick, getQualityMenuItems, selectQualityItem, activateQualityItem, applyQualityOnce, applyVolume, watchVolumeChanges, watchManualQualityChanges, syncCurrentStream, init | Các hàm đọc trạng thái trình phát Kick và áp dụng chất lượng, âm lượng, tốc độ đã lưu theo hồ sơ và ngoại lệ. |

## Bảng điều khiển và bố cục

Tạo bảng và cửa sổ, quản lý kiểu, phím tắt, kéo, kích thước và cài đặt trình phát.

| Hàm | Mô tả |
|---|---|
| applyAccentColor, applyDesignProfile, build, setPanelPosition, startSleepTimer, cancelSleepTimer, toggleFocusView, reapplyPlayerSettings, wirePanelDragging, resetSection, checkForUpdates, css, render, renderSoundSettings, renderChannelSettings, renderChannelList, wireEvents, syncVolumeControls | Tạo bảng và cửa sổ, quản lý kiểu, phím tắt, kéo, kích thước và cài đặt trình phát. |

## Chẩn đoán, thông báo và âm thanh

Cập nhật trạng thái, ghi sự kiện, hiển thị thông báo và tạo âm thanh Web Audio.

| Hàm | Mô tả |
|---|---|
| syncDiagnostics, recordDiagnostic, buildDiagnosticsReport, localizeDiagnostic, notifyQualityResult, previewNotification, initToastPosition, wireToastDragging, hideNotification, notify, startVolumePolling, stopVolumePolling, playSound, stopSounds | Cập nhật trạng thái, ghi sự kiện, hiển thị thông báo và tạo âm thanh Web Audio. |

## Hộp thoại và vòng đời

Mở cài đặt âm thanh, kênh, danh sách kênh và điều khiển bảng.

| Hàm | Mô tả |
|---|---|
| openSoundSettings, closeSoundSettings, openChannelSettings, closeChannelSettings, openChannelList, closeChannelList, open, close, toggle, describeHotkey | Mở cài đặt âm thanh, kênh, danh sách kênh và điều khiển bảng. |


[GitHub](https://github.com/ebayybe/kick-stream-tweaks)