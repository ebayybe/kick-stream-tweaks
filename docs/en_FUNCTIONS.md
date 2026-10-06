<div align="center">

[English](en_FUNCTIONS.md) · [العربية](ar_FUNCTIONS.md) · [Беларуская](be_FUNCTIONS.md) · [Български](bg_FUNCTIONS.md) · [Čeština](cs_FUNCTIONS.md) · [Dansk](da_FUNCTIONS.md) · [Deutsch](de_FUNCTIONS.md) · [Ελληνικά](el_FUNCTIONS.md) · [Español](es_FUNCTIONS.md) · [Suomi](fi_FUNCTIONS.md) · [Français](fr_FUNCTIONS.md) · [हिन्दी](hi_FUNCTIONS.md) · [English (India)](en-in_FUNCTIONS.md) · [Hrvatski](hr_FUNCTIONS.md) · [Magyar](hu_FUNCTIONS.md) · [Bahasa Indonesia](id_FUNCTIONS.md) · [Italiano](it_FUNCTIONS.md) · [日本語](ja_FUNCTIONS.md) · [한국어](ko_FUNCTIONS.md) · [Lietuvių](lt_FUNCTIONS.md) · [Latviešu](lv_FUNCTIONS.md) · [Македонски](mk_FUNCTIONS.md) · [Монгол](mn_FUNCTIONS.md) · [Bahasa Melayu](ms_FUNCTIONS.md) · [Nederlands](nl_FUNCTIONS.md) · [Norsk](no_FUNCTIONS.md) · [Polski](pl_FUNCTIONS.md) · [Português](pt_FUNCTIONS.md) · [Română](ro_FUNCTIONS.md) · [Русский](ru_FUNCTIONS.md) · [Slovenčina](sk_FUNCTIONS.md) · [Srpski](sr_FUNCTIONS.md) · [Svenska](sv_FUNCTIONS.md) · [ไทย](th_FUNCTIONS.md) · [Türkçe](tr_FUNCTIONS.md) · [Tiếng Việt](vi_FUNCTIONS.md) · [简体中文](zh-cn_FUNCTIONS.md) · [繁體中文](zh-tw_FUNCTIONS.md)

</div>

# Kick Stream Tweaks — Function Reference

Reference for Kick Stream Tweaks 1.2.0. It describes what every functional area does and how the named methods in the current userscript work. See the [repository](https://github.com/ebayybe/kick-stream-tweaks) and [changelog](../en_CHANGELOG.md).

> Function names match the source. `void` means that a method acts through side effects.

## User-facing behavior

| Area | Behavior |
|---|---|
| Player persistence | Saves live/VOD quality, volume, mute state and speed, then applies them when a new stream is detected. |
| Channel profiles | Stores quality, VOD quality, volume, speed, mute, notes, groups, avatar and enabled/excluded state per channel. |
| Panel | F2 or a custom hotkey opens the panel. Kick and Minimal styles support compact layout, dragging, resizing, accent color, blur, animation, high contrast and text scaling. |
| Sounds | Web Audio cues cover menu actions, setting changes, quality success/failure and volume restoration. Each event has its own switch, preview and volume. |
| Notifications | Localized result messages can be moved, resized, made transparent, disabled per event, recorded in history or suppressed in quiet/fullscreen mode. |
| Player tools | Includes sleep timer, focus/fullscreen view, low-latency preference, stalled-player recovery, idle-control hiding and high-volume warnings. |
| Diagnostics | Shows player state, available qualities, stream key, action log, conflicts, compatibility and translation coverage. |
| Localization | Every label, help message, error, dialog and update message goes through the translation resolver for 38 locales. |
| Privacy | Settings, profiles, logs and histories stay in browser storage. The update check runs only after the user presses its button. |

## Player synchronization

| Method | Parameters / return | What and how it does |
|---|---|---|
| `load` / `save` | settings / void | Loads or writes the sanitized settings object in local storage. |
| `isVod` | — → boolean | Detects a VOD page. |
| `channelKey` | — → string | Builds the stable channel:slug storage key. |
| `getChannelProfile` | — → object/null | Gets the current channel profile. |
| `updateChannelProfile` | patch → void | Merges profile changes and updates its timestamp. |
| `channelMeta` | — → object | Reads name, slug, avatar and profile URL from Kick. |
| `isChannelExcluded` | — → boolean | Checks whether automatic actions are disabled for this channel. |
| `effectivePlaybackRate` | — → number | Resolves speed from channel profile or global settings. |
| `applyPlaybackRate` | video → void | Sets the saved speed on the video. |
| `wirePlayerControls` | video → void | Watches volume, mute, idle controls and warning state. |
| `tryLowLatencyOption` | showFailure → boolean | Attempts Kick low latency and optionally records failure. |
| `checkLoudVolume` | volume, muted → void | Shows a warning when volume crosses the threshold. |
| `monitorPlayback` | video → void | Detects stalled playback and attempts recovery. |
| `qualitySettingKeys` | — → string[] | Returns live and VOD quality storage keys. |
| `setStatus` | status, result → void | Updates player status and diagnostic result. |
| `findMainVideo` | — → video/null | Finds the active Kick video element. |
| `getStreamKey` | video → string | Creates the key used for one-time stream application. |
| `isLikelyAccountButton` | button → boolean | Separates account controls from player controls. |
| `findSettingsButton` | video → element/null | Finds the player's quality/settings button. |
| `revealControls` | video → void | Reveals controls before scripted interaction. |
| `simulateClick` | element → void | Sends the pointer/click sequence used by Kick controls. |
| `getQualityMenuItems` | — → element[] | Collects choices from the open quality menu. |
| `selectQualityItem` | desired, fallback → Promise<boolean> | Selects requested quality or applies fallback behavior. |
| `activateQualityItem` | item → Promise<boolean> | Activates one menu item and verifies it. |
| `applyQualityOnce` | streamKey → Promise<boolean> | Applies saved quality once for a stream. |
| `applyVolume` | video → void | Restores volume and mute state. |
| `watchVolumeChanges` | video → void | Records manual volume changes. |
| `watchManualQualityChanges` | — → void | Saves manual quality selections. |
| `syncCurrentStream` | — → Promise<void> | Runs quality, volume, speed and recovery synchronization. |
| `init` | — → void | Starts the adapter, observers and synchronization loop. |

## Panel, layout and player tools

| Method | Parameters / return | What and how it does |
|---|---|---|
| `applyAccentColor` | value → void | Validates accent color and derives readable text color. |
| `applyDesignProfile` | kick/minimal/custom → void | Applies a visual preset and renders it. |
| `build` | — → void | Creates the shadow-DOM host, panel, toast and modal shells. |
| `setPanelPosition` | position, persist → void | Places the panel inside the viewport and optionally saves it. |
| `startSleepTimer` / `cancelSleepTimer` | minutes / — → void | Starts or cancels the sleep timer. |
| `toggleFocusView` | — → Promise<void> | Enters or leaves best-effort fullscreen focus view. |
| `reapplyPlayerSettings` | — → void | Immediately reapplies current channel/global settings. |
| `wirePanelDragging` | — → void | Enables header dragging and saves the position. |
| `resetSection` | id → void | Restores defaults for one section. |
| `checkForUpdates` | — → Promise<void> | Reads the newest GitHub tag and compares it with 1.2.0. |
| `css` | — → string | Returns scoped responsive, modal and accessibility CSS. |
| `render` | — → void | Rebuilds localized markup, applies settings and wires controls. |
| `renderSoundSettings` | lang → void | Renders event switches, help, previews and sliders. |
| `renderChannelSettings` | lang → void | Renders quality, volume, speed, mute, notes, groups and history. |
| `renderChannelList` | lang, query → void | Renders searchable and sortable saved-channel cards. |
| `wireEvents` | lang → void | Connects navigation, controls, imports, exports, checks and action sounds. |
| `syncVolumeControls` | — → void | Keeps sliders and number fields synchronized with the player. |

## Diagnostics, notifications and sound

| Method | Parameters / return | What and how it does |
|---|---|---|
| `syncDiagnostics` | — → void | Refreshes status, last result and summaries. |
| `recordDiagnostic` | message, level → void | Adds a timestamped event when logging is enabled. |
| `buildDiagnosticsReport` | — → string | Builds a report without unnecessary private data. |
| `localizeDiagnostic` | message → string | Converts known diagnostic text to the active language. |
| `notifyQualityResult` | applied, quality → void | Plays a result sound, logs the event and shows a localized notification. |
| `previewNotification` | — → void | Shows a draggable sample quality notification. |
| `initToastPosition` | — → void | Restores the saved notification position inside the viewport. |
| `wireToastDragging` | — → void | Makes notifications draggable and saves their position. |
| `hideNotification` | — → void | Hides the current toast and clears its timer. |
| `notify` | message, kind, duration, force → void | Shows a success/error toast unless notifications are suppressed. |
| `startVolumePolling` / `stopVolumePolling` | — → void | Starts or stops live volume synchronization while the panel is open. |
| `playSound` | eventName, preview → void | Generates a Web Audio cue respecting global and event switches. |
| `stopSounds` | — → void | Stops and disconnects all active sound nodes. |

## Dialogs and lifecycle

| Method | Parameters / return | What and how it does |
|---|---|---|
| `openSoundSettings` / `closeSoundSettings` | — → void | Opens or closes sound settings and hides other secondary dialogs. |
| `openChannelSettings` / `closeChannelSettings` | channelKey / — → void | Opens or closes detailed settings for one channel. |
| `openChannelList` / `closeChannelList` | — → void | Opens or closes the saved-channel manager. |
| `open` / `close` / `toggle` | — → void | Controls the main panel, polling, cleanup and menu sounds. |
| `describeHotkey` | hotkey → string | Formats the configured key combination for the footer. |

## Safety and compatibility

- Settings are sanitized before storage; invalid values fall back to safe defaults.
- Channel names, notes, notification text and diagnostic output are escaped before HTML insertion.
- Shadow DOM keeps extension styles isolated from Kick.
- Automatic actions skip excluded channels, safe mode and missing player elements.
- The update checker is opt-in and reads only the latest release tag from GitHub.
- Existing local settings are preserved when moving from 1.1.0.

