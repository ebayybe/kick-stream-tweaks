<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div>

# Kick Stream Tweaks — Changelog

Release notes for [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), a userscript that remembers Kick player preferences and adds a configurable control panel.

## v1.2.0 — 2026-10-07

> Expanded the original quality and volume helper into a full player settings toolkit.

### Added

- Per-channel profiles for quality, volume, playback speed and mute state.
- Saved channel list with notes, groups, profile editing and import/export.
- Sound effects with a global switch, individual event switches, previews and per-event volume.
- Notifications for quality changes, restored volume and failed actions.
- Notification history, action log and diagnostic tools with clear controls.
- Quality availability checks, conflict checks and compatibility checks.
- Safe mode for temporarily disabling automatic player changes.
- Hotkeys, panel dragging, panel resizing and a center-panel action.
- Kick and Minimal panel styles, compact layout and animation controls.
- Sleep timer, fullscreen focus mode, player resync and playback controls.
- Import/export of settings and channel profiles.
- Keyboard navigation, text scaling, screen-reader announcements and high contrast.
- Interface localization for 38 supported languages.

### Fixed

- Prevented multiple secondary dialogs from appearing at the same time.
- Fixed an empty dialog appearing above the sound settings window.
- Ignored empty notification messages instead of showing blank overlays.
- Improved long-label wrapping on narrow panels and localized layouts.
- Fixed `{quality}` and `{q}` placeholder replacement in notifications.
- Updated the in-panel version label and update comparison to 1.2.0.

### Compatibility

- Existing settings are preserved when updating from v1.1.0.
- Settings remain local to the browser; the script does not send telemetry.
- The update checker reads the latest GitHub release tag and does not install updates automatically.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

The original public version focused on remembering video quality and volume on Kick, applying them automatically to new streams, and providing an F2 settings panel.

