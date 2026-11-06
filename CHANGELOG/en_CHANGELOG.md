<div align="center">

**English** · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)

</div> 

# Kick Stream Tweaks — Changelog

Release notes for [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), a userscript that remembers Kick player preferences and adds a configurable control panel.

## v1.3.1 — 2026-11-06

> Layout hardening for every language and text size, a truly distinct Minimal style, rewards and layout helpers, a player-freeze alarm and a smarter default language.

### Added

- **Player freeze alarm.** Detects a stalled player or a black screen (video time moving without decoded frames), plays a loud alarm sound and shows a notification, even when the tab is minimized. Configurable detection time (5–60 s), independent sound toggle and a test button.
- **Auto-claim rewards** (off by default): opens the rewards window, claims what is available, closes it again and returns to the stream. Drops that appear in the rewards panel are claimed too. Includes a *Claim now* button.
- **Reward schedule.** By default the script waits for Kick's own "claim your reward" notification and claims it right away (with an optional 0–60 s delay), instead of polling. A scheduled mode (every 5–60 min) is available too.
- **Quick-claim button.** A small floating button on the stream that claims your reward in one click. Drag it anywhere (the position is remembered), pick one of four designs (Orb, Pill, Glass, Flat), five built-in icons, a size and an opacity, optionally show it only when a reward is available. It glows and shows a dot when Kick's reward notification appears. The settings page has a live preview.
- **Your own icon.** Upload a PNG, JPG, WebP, GIF or SVG (up to 2 MB) as the button icon, optionally filling the whole button. The image is re-encoded to a small square and stored only in your browser.
- **Mouse wheel on sliders.** Every slider can be adjusted with the mouse wheel while hovering it, without scrolling the panel.
- **Function reference.** New `en_FUNCTIONS.md` documents the architecture, every setting, every function and the parts of Kick's page the script depends on.
- **Guided channel saving.** A step-by-step "How saved channels work" card, a single **Save this channel** button that stores the current quality, volume, speed and sound for the channel you are watching, a one-click hint in Playback for unsaved channels, a confirmation toast, labeled *Edit* / *Done* buttons in the list and a switch to pause saved settings without deleting them.
- **Silent playback.** Silences the stream without muting the player, so it keeps playing in a background tab. Works globally and per saved channel (a *Silent* tag is shown in the channel list).
- **Multilingual settings search.** Search is accent-insensitive and also matches the English names, so typing `volume` finds the setting in any interface language. Searching by section or card title shows the whole section.
- **Page layout controls**: hide the chat and collapse the left menu from the panel or with hotkeys (`Alt+C`, `Alt+S`), with an option to remember the layout for every stream.
- **Icon animations** for the sidebar, reset and help icons, with their own switch (also part of the animation presets).
- **Channel avatars** are captured from Kick and shown in the saved channel list.
- 14 accent colors (was 6).
- In-panel confirmation dialog that looks identical in every browser.

### Changed

- **Interface language** now follows the browser language on first run. Once you pick a language, it is remembered. Settings migrated from older versions follow the browser until a language is chosen explicitly.
- The script now starts at `document-start` so its keyboard isolation is registered before the page's own listeners.
- Settings rows are stacked (label above control) so text can never overlap or clip, at any language, text size or panel width. Sidebar labels wrap on word boundaries.
- Animation pickers are rebuilt as full-width rows with icons, so long translations fit.
- **Minimal** panel style is now flat and square with no glow, borders replaced by dividers and underline-style selection, so the difference from **Kick** is obvious.
- The panel has a fixed width of 680 px (it shrinks to fit small windows). The panel width setting and the resize handle were removed, so layouts are the same for everyone.
- Indicator animation title no longer says "green" when a different accent color is used.

### Fixed

- Changing volume, mute, silent playback, auto-volume or speed re-applied the quality as well (re-opening the quality menu and showing a notification). Those settings now only touch what you changed; quality is re-applied only when a quality setting changes.
- Typing in the settings search could trigger Kick's hotkeys (for example Space switched the stream to fullscreen). Keystrokes inside the panel no longer reach the page.
- The preferred volume was overwritten when Kick reset the player to its own 50% after a reload, and the panel slider showed 50%. Changes the page makes on its own are now reverted to your saved volume; only your own actions update it.
- Text clipping and overlapping in Appearance, Animations and Hotkeys (long labels, large text sizes, narrow panels, long translations).
- The Minimal style silently disabled the background blur setting; blur now works in both styles.
- Changing the quick-claim button opacity did not update the preview.
- Sliders did not react to the mouse wheel.
- Animation tiles ("Scale", "Pop") overflowing their cards.
- Delete-profile confirmation used the browser's native dialog.
- Sleep timer chips were not localized.
- Saved channels showed no avatars, and the current channel showed none until its profile was saved.

### Compatibility

- Existing settings and saved channels are preserved when updating from v1.3.0, v1.2.0 and v1.1.0.
- The script still sends no telemetry and makes no network requests of its own.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Full redesign, a logical settings structure, a rebuilt animation system and a round of reliability fixes for the player automation.

### Added

- Redesigned panel with a grouped sidebar: **Player** (Playback, Channels, Tools), **Alerts** (Notifications, Sounds), **Interface** (Appearance, Animations, Shortcuts) and **System** (Diagnostics, Data & about).
- New **Animations** page: a live preview stage, three one-click presets (Full, Reduced, Off) and separate pickers for the opening effect (None, Fade, Slide, Scale, Pop), hover effect, indicator animation and speed.
- Quick presets for Save bandwidth, Best quality, Quiet viewing and VOD, applied instantly.
- Quality picker redesigned as a chip grid; speed, text scale and sleep timer use chips and segmented controls instead of dropdowns.
- Inline channel manager: search, sorting, pinning, groups, notes, per-channel editing and full backup/restore, all without nested dialogs.
- Inline sound settings with a per-event switch, volume and preview button.
- Quality scan in diagnostics: opens the player menu, records the available qualities and closes it again.
- Hotkeys now work on any keyboard layout (they are matched by physical key).
- Settings sync between open Kick tabs.
- Accent color swatches next to the custom color picker, a higher text-scale range and a prefers-reduced-motion safeguard.

### Changed

- Settings are stored in a leaner format; the 1.2.x configuration, hotkeys and animation choices are migrated automatically.
- Playback speed is only applied when it differs from 1×, so Kick's own live-edge catch-up is no longer overridden.
- Undo history is kept in memory instead of being written to local storage.
- Sound events, notifications and hotkeys share one consistent set of controls.
- The "Situation profile" selector is replaced by one-click presets.

### Fixed

- Closing the player menu after applying quality no longer risks re-opening it.
- A fallback quality (for example 720p instead of an unavailable 1080p) no longer overwrites the preferred quality saved for a channel.
- Only real clicks on quality items update the "last used" quality; automated clicks are ignored.
- Settings search no longer fails after typing (event target was lost inside the Shadow DOM).
- Changes made in one tab can no longer overwrite settings from another tab.
- Panel hotkeys no longer break on non-Latin layouts.
- Incorrect labels in the diagnostics log controls and a stray Korean word in the Japanese script title.
- Stalled-playback checks and stream sync pause while the tab is hidden.

### Removed

- Features that could not be verified against Kick's player or duplicated it: low-latency preference, hide player controls on idle and the GitHub-based in-panel update check (use your userscript manager's updates or the Releases page).
- Over-engineered options: saved appearance profiles, section show/hide/reorder, alternative navigation modes, compatibility and translation-coverage checks, random/scroll/section animations, per-event notification durations, channel avatars, group colors, manual ordering, bulk selection, per-channel history and automatic cleanup.

### Compatibility

- Existing settings and saved channels are preserved when updating from v1.2.0 and v1.1.0.
- Settings remain local to the browser; the script does not send telemetry or make network requests.

### Links

- [Repository](https://github.com/ebayybe/kick-stream-tweaks)
- [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Issues](https://github.com/ebayybe/kick-stream-tweaks/issues)

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
