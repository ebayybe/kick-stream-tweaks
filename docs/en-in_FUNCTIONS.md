<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · **English (India)** · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Function Reference

Reference for Kick Stream Tweaks 1.3.1. It describes what every functional area does, how the settings are stored, which parts of Kick's page the script depends on, and how each named function or method in the userscript works. See the [repository](https://github.com/ebayybe/kick-stream-tweaks) and [changelog](../CHANGELOG/en_CHANGELOG.md).

> Names match the source. `void` means that a function acts through side effects. A method written as `Object.method` lives on that object (`PlayerSync`, `Extras`, `GUI`, `Store`).

## Contents

1. [Architecture](#architecture)
2. [User-facing behavior](#user-facing-behavior)
3. [Settings reference](#settings-reference)
4. [Core utilities](#core-utilities)
5. [Settings storage](#settings-storage)
6. [Player synchronization (`PlayerSync`)](#player-synchronization-playersync)
7. [Page extras (`Extras`)](#page-extras-extras)
8. [Interface building blocks](#interface-building-blocks)
9. [Settings pages (`PAGES`)](#settings-pages-pages)
10. [Panel controller (`GUI`)](#panel-controller-gui)
11. [Hotkeys and startup](#hotkeys-and-startup)
12. [Kick page dependencies](#kick-page-dependencies)
13. [Localization](#localization)
14. [Safety, privacy and compatibility](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Architecture

The userscript is one self-contained file that runs at `document-start` with `@grant none`. It has no build step and makes no network requests of its own.

| Layer | Object / area | Responsibility |
|---|---|---|
| Data | `TR`, `DIAG`, `FLAGS`, `LANG_NAMES` | Translations for 38 languages, localized diagnostic messages, flag SVGs and language names. |
| Configuration | `CONFIG`, `DEFAULTS` | Constants (selectors, retry limits, presets, sections) and default settings. |
| Storage | `sanitizeSettings`, `Store`, `persist` | Validates and saves settings in `localStorage`; keeps an in-memory undo stack. |
| Player logic | `PlayerSync` | Finds the video, restores quality, volume, speed and silent mode, watches for freezes. |
| Page helpers | `Extras` | Layout buttons, reward claiming, channel avatars and the background scheduler. |
| Interface | `PAGES`, `GUI`, helpers | Shadow-DOM panel, notifications, sounds, floating quick-claim button, hotkeys. |

Data flow: the 1.5-second `PlayerSync.sync` loop reads the effective settings (channel profile first, then global), applies them to the player and calls `Extras.tick`. User actions go through `GUI` handlers, which update settings with `persist` and push only the affected part to the player (`media` or `all`).

<a id="user-facing-behavior"></a>
## User-facing behavior

| Area | Behavior |
|---|---|
| Player persistence | Saves live/VOD quality, volume, mute state, silent mode and speed, then applies them when a new stream is detected. Changes the page makes by itself (for example Kick resetting the volume to 50%) are reverted; only the viewer's own actions update the saved values. |
| Quality | Selects the preferred quality through the player menu, falls back to the next lower one (or Auto) when unavailable, and closes the menu again. Only genuine user clicks teach the script a new "last used" quality. |
| Volume and silent playback | Volume and mute are restored per stream. Silent playback routes the video through the Web Audio engine at zero gain, so the stream keeps playing in a background tab without being muted. |
| Channel profiles | **Save this channel** stores the current quality, volume, speed and sound for the channel being watched. Profiles also hold notes, groups, pin state, an avatar and the enabled/excluded flags. |
| Presets | Save bandwidth, Best quality, Quiet viewing and VOD apply in one click. |
| Panel | `F2` or a custom hotkey opens a fixed-width (680 px) panel with a grouped sidebar, search, Kick and Minimal styles, light/dark themes, 14 accent colors plus a color picker, compact layout, backdrop blur, text scaling, high contrast and animation controls. |
| Search | Accent-insensitive, matches the interface language and the English names, and matches section or card titles. Keystrokes typed in the panel never reach Kick's hotkeys. |
| Sliders | Every slider responds to clicks, dragging, keyboard arrows and the mouse wheel. |
| Sounds | Web Audio cues for menu actions, setting changes, quality success/failure and volume restoration, each with a switch, preview and volume. |
| Notifications | Localized messages that can be dragged, scaled, made transparent, silenced (do not disturb, quiet fullscreen) and recorded in history. |
| Freeze alarm | Detects a stalled player or a black screen, plays a loud alarm (even in a hidden tab, independent of the sound-effects switch) and shows a notification. |
| Rewards | Optional auto-claim waits for Kick's reward notification (or runs on a schedule), opens the rewards window, claims what is available and closes it. A floating, draggable quick-claim button does the same in one click. |
| Layout | Hides the chat and collapses the left menu from the panel or with hotkeys, optionally remembering the choice for every stream. |
| Tools | Sleep timer, focus (fullscreen) view, player resync and a safe mode that pauses every automatic change. |
| Diagnostics | Live status, detected qualities, video resolution, quality scan, conflict check, action log and a copyable report. |
| Data | Export/import of settings, undo, restore after reset, backup/restore of saved channels. |
| Privacy | Settings, profiles, logs and histories stay in browser storage. Nothing is sent anywhere. |

<a id="settings-reference"></a>
## Settings reference

All values are validated by `sanitizeSettings`; anything invalid falls back to the default. Ranges are enforced.

### Player

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Apply the preferred quality automatically. |
| `preferredLiveQuality`, `preferredVodQuality` | `auto`, `1080p60`, `1080p`, `720p`, `480p`, `360p`, `160p` | `auto` | Quality to apply for live streams and VODs. `auto` means "remember my last choice". |
| `lastLiveQuality`, `lastVodQuality` | same | `auto` | Last quality the viewer picked by hand. |
| `qualityFallback` | `lower`, `auto` | `lower` | What to do when the preferred quality is not offered. |
| `autoVolumeEnabled` | boolean | `true` | Restore and protect the saved volume. |
| `volume` | 0–1 | `1` | Saved volume. |
| `muted` | boolean | `false` | Saved mute state. |
| `silent` | boolean | `false` | Silent playback (zero-gain audio graph, player not muted). |
| `playbackRate` | 0.25–2.5 | `1` | Saved speed; `1` is never forced. |
| `warnLoudVolume`, `loudVolumeThreshold` | boolean; 60–100, step 5 | `true`; `85` | High-volume warning. |
| `safeMode` | boolean | `false` | Pause every automatic change. |
| `channelProfiles` | object, up to 200 | `{}` | Per-channel profiles (see below). |

Channel profile fields: `enabled`, `excluded`, `liveQuality`, `vodQuality`, `volume`, `muted`, `silent`, `playbackRate`, `displayName`, `pinned`, `avatar` (only `https://…kick.com/images/user/…` URLs), `note` (240 characters), `group` (40 characters), `updatedAt`, `lastUsed`.

### Notifications and sounds

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Show result notifications. |
| `doNotDisturb`, `quietFullscreen` | boolean | `false`, `true` | Suppress notifications and sounds, or only in fullscreen. |
| `notificationScale` | 0.8–1.4 | `1` | Notification size. |
| `notificationDuration` | 1500–12000 ms, step 500 | `3500` | How long a notification stays. |
| `notificationOpacity` | 0.35–1 | `0.95` | Notification transparency. |
| `notificationShowIcon` | boolean | `true` | Show the status icon. |
| `notificationPosition` | `{x, y}` or `null` | `null` | Dragged position. |
| `notificationHistoryEnabled`, `notificationHistory` | boolean; up to 30 entries | `true`; `[]` | History of notifications. |
| `soundEffectsEnabled`, `soundVolume` | boolean; 0–1 | `false`; `0.35` | Master switch and volume. |
| `soundEvents`, `soundEventVolumes` | per event: `menu`, `settingChanged`, `qualityApplied`, `qualityFailed`, `volumeApplied` | all on; `0.35` | Per-event switch and volume. |

### Appearance, motion and shortcuts

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `theme` | `dark`, `light` | `dark` | Color theme. |
| `panelStyle` | `kick`, `minimal` | `kick` | Visual style of the panel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Accent color. |
| `compactMode`, `highContrast` | boolean | `false` | Density and contrast. |
| `backdropBlur` | 0–12 px | `6` | Background blur behind the panel (works in both styles). |
| `textScale` | 0.9–1.3 | `1` | Text size. |
| `language`, `languageChosen` | locale code; boolean | browser language; `false` | The interface follows the browser language until a language is chosen, then the choice is remembered. |
| `panelPosition` | `{x, y}` or `null` | `null` | Dragged panel position. |
| `motionSpeed` | `fast`, `normal`, `slow` | `normal` | Animation speed. |
| `openEffect` | `none`, `fade`, `slide`, `scale`, `pop` | `scale` | Panel open/close effect. |
| `hoverEffect` | `none`, `lift`, `glow` | `lift` | Hover effect. |
| `indicatorAnimation` | `glow`, `pulse`, `breathe`, `off` | `glow` | Logo/indicator animation. |
| `iconAnimations` | boolean | `true` | Animate sidebar, reset and help icons. |
| `hotkey` | combo string | `F2` | Opens or closes the panel. |
| `actionHotkeys` | combo strings | `Alt+N`, `Alt+F`, `Alt+Q`, `Alt+V`, `Alt+C`, `Alt+S` | Toggle notifications, focus view, reset quality, restore volume, toggle chat, toggle left menu. |

Key combos are stored as strings such as `Alt+Q` and matched by physical key, so they work on any keyboard layout. Settings from older versions with an object-shaped hotkey are converted automatically. The panel width is fixed at 680 px (limited to the window size); the former width setting is ignored.

### Tools

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Try `play()` when a freeze is detected. |
| `freezeAlertEnabled`, `freezeSound` | boolean | `true` | Freeze notification and alarm sound. |
| `freezeSeconds` | 5–60, step 5 | `10` | Seconds of no progress before the alarm. |
| `layoutHideChat`, `layoutCollapseSidebar` | boolean | `false` | Remembered layout, applied once per page. |
| `autoClaimRewards` | boolean | `false` | Enable automatic reward claiming. |
| `claimMode` | `notify`, `interval` | `notify` | Claim when Kick shows its notification, or on a schedule. |
| `claimDelaySec` | 0–120, step 5 | `5` | Wait after the notification appears (notification mode). |
| `claimIntervalMin` | 5–120, step 5 | `10` | Minutes between checks (scheduled mode). |

### Quick-claim button

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Show the floating button. |
| `claimWidgetStyle` | `orb`, `pill`, `glass`, `flat` | `orb` | Button design. |
| `claimWidgetIcon` | `gift`, `crown`, `star`, `bolt`, `coin`, `custom` | `gift` | Built-in icon, or the user's own image. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…`, up to 90,000 characters | empty | Re-encoded copy of the uploaded image. Anything else is rejected. |
| `claimWidgetImageFill` | boolean | `false` | Let a custom image fill the whole button (not used by the pill design). |
| `claimWidgetSize` | `s`, `m`, `l` | `m` | Button size. |
| `claimWidgetOpacity` | 0.3–1 | `0.9` | Button opacity (full opacity while a reward is available). |
| `claimWidgetAutoHide` | boolean | `false` | Show the button only when a reward is available. |
| `claimWidgetPos` | `{x, y}` or `null` | `null` | Dragged position. |

### Diagnostics and state

| Key | Type / range | Default | Meaning |
|---|---|---|---|
| `diagnosticsLogEnabled`, `diagnosticsLog` | boolean; up to 60 entries | `true`; `[]` | Action log. |
| `activeSection` | section id | `playback` | Last opened page. |
| `resetBackup` | settings object | `null` | Snapshot taken before a reset or an import. |

<a id="core-utilities"></a>
## Core utilities

| Function | Parameters / return | What and how it does |
|---|---|---|
| `detectLanguage` | — → locale | Walks `navigator.languages`, maps regional variants (`zh-HK` → `zh-tw`, `nb`/`nn` → `no`) and returns the first supported locale, or `en`. |
| `dictFor` | lang → dictionary | Returns the translation table for a locale, falling back to its base language and then English. |
| `t` / `T` | lang, key, vars → string | Resolves a key with `{placeholder}` substitution; `T` uses the current language. |
| `diagText` | index, quality → string | Returns one of the localized diagnostic sentences. |
| `log` | …args → void | Console logging with the script prefix. |
| `clamp`, `sleep`, `esc` | value → value | Range limiting, promise-based delay and HTML escaping. |
| `normalizeQuality` | text → string | Lowercases a quality label and removes whitespace. |
| `debounce` | fn, wait → function | Trailing debounce with a `flush` method. |
| `onLocationChange` | callback → void | Detects single-page navigation by wrapping `pushState`/`replaceState`, listening to `popstate` and polling once per second. |
| `keyLabelFromEvent`, `comboFromEvent`, `matchesCombo` | event → string/boolean | Build and compare key combos from the physical key code. |
| `mkPointer` | type, extra → event | Creates a `PointerEvent` (or a `MouseEvent` when unavailable) used to drive Kick's ARIA menus. |
| `waitFor` | probe, timeout, step → value/null | Polls until the probe returns a value or the timeout ends. |
| `imageToDataUrl` | image → string | Scales an image into a square canvas (keeping proportions, `willReadFrequently`), tries 128, 96 and 64 px and returns a PNG data URL no larger than 70,000 characters. |

<a id="settings-storage"></a>
## Settings storage

| Function | Parameters / return | What and how it does |
|---|---|---|
| `sanitizeProfiles` | object → object | Keeps at most 200 profiles with valid keys and clamps every field; the avatar must be a Kick image URL. |
| `sanitizeSettings` | object, withBackup → object | Validates every setting (types, ranges, allowed values), migrates 1.1–1.3 settings (legacy quality, hotkey, animation and section keys) and applies the language rule. |
| `legacyHotkey` | value → string | Converts an object-shaped hotkey into a combo string. |
| `Store.load` / `Store.save` | — / settings → settings/void | Read and write the sanitized object in `localStorage` (`kickTweaks.settings.v1`). |
| `persist` | patch, `{undo}` → void | Merges a patch, sanitizes, saves with a short debounce and optionally pushes an undo snapshot (kept in memory only, up to 15). |
| `storage` listener | event → void | Reloads settings when another Kick tab changes them, so tabs never overwrite each other. |

<a id="player-synchronization-playersync"></a>
## Player synchronization (`PlayerSync`)

### Channel and profile helpers

| Method | Parameters / return | What and how it does |
|---|---|---|
| `isVod` | — → boolean | Detects a VOD page from the URL. |
| `channelKey` | — → string | Builds the stable `channel:slug` key (or `vod:id`, `kick:home`), caching the result for three seconds. On VOD pages the channel link nearest the player is used. |
| `channelSlug` | — → string | Returns the slug part of a channel key. |
| `profile` | key → object/null | Reads a saved profile. |
| `profileActive` | — → object/null | Returns the current profile only when it is enabled and not excluded. |
| `isExcluded` | — → boolean | Checks whether automation is disabled for this channel. |
| `updateProfile` | patch, key → void | Creates or merges a profile and stamps `updatedAt`. |
| `saveCurrentChannel` | — → object/null | Stores the viewer's current quality, volume, mute, speed and silent state as an enabled profile and scans the page for the channel avatar. |
| `effective` | — → object | Resolves volume, mute, silent, speed and live/VOD quality from the active profile or the global settings. |
| `setStatus` | status, result → void | Updates the status and last-result codes shown in the header and diagnostics. |

### Finding and driving Kick's player

| Method | Parameters / return | What and how it does |
|---|---|---|
| `findMainVideo` | — → video/null | Picks the largest visible `<video>`. |
| `streamKey` | — → string | Returns the page path used to apply quality once per stream. |
| `isAccountButton` | button → boolean | Rejects header, avatar and account buttons. |
| `findSettingsButton` | video → button/null | Finds the player's gear button by label, or by proximity to the video's lower-right corner. |
| `revealControls` | video → void | Dispatches hover events so hidden controls appear. |
| `simulateClick` | element → void | Sends the full pointer-event sequence Kick's menus need. |
| `menuItems` | — → element[] | Lists visible `menuitemradio` entries. |
| `openQualityMenu` | — → button/null | Opens the gear menu, steps into a quality entry when a top-level menu appears, and waits for the options. |
| `closeMenu` | button → Promise | Closes the menu only if it is still open (a blind second click could re-open it), with an Escape fallback. |
| `readMenu` | — → element[] | Records the offered qualities and the checked one. |
| `scanQualities` | — → Promise<boolean> | Opens the menu, records the available qualities and closes it (used by diagnostics). |
| `activate` | item → Promise | Clicks one option and waits until it is checked. |
| `selectQuality` | desired, fallback → Promise | Selects the requested quality, otherwise the next lower one, or Auto. |
| `desiredQuality` | — → string | Chooses the quality to apply from the profile, the preference or the last manual choice. |
| `applyQualityOnce` | streamKey → Promise | Applies the desired quality once per stream, closes the menu and notifies about success or failure. |
| `watchManualQuality` | — → void | Learns a new "last used" quality from genuine (trusted) clicks only, so automated clicks and fallbacks never overwrite saved values. |

### Volume, silent mode, speed and monitoring

| Method | Parameters / return | What and how it does |
|---|---|---|
| `applyVolume` | video, quiet → void | Writes the effective volume and mute state (marked as the script's own change). |
| `trackInput` | — → void | Records the time of the last trusted pointer, wheel, touch or keyboard input. |
| `reassertVolume` | video → void | Puts the saved volume back when the page changed it without any user input (rate-limited to eight reverts per ten seconds). |
| `watchVolume` | video → void | Listens for `volumechange`: user-driven changes are saved, page-driven ones are reverted. |
| `checkLoud` | volume, muted → void | Warns once when the volume crosses the threshold. |
| `buildGraph` | video → graph/null | Wires the video into an `AudioContext` through a gain node; reports when the site does not allow it. |
| `applySilent` | video → void | Sets the gain to 0 for silent playback or back to 1, resuming the context when needed. |
| `applyRate` | video, force → void | Sets the saved speed; `1` is not forced unless the viewer just chose it, so Kick's own live-edge catch-up is respected. |
| `applyMedia` | video, `{rate}` → void | Re-applies volume, silent mode and optionally speed without touching quality. |
| `monitorFreeze` | video → void | Detects a stalled player (time stuck) or a black screen (time moving without decoded frames) and triggers the alarm and optional recovery. Works in hidden tabs. |

### Loop and lifecycle

| Method | Parameters / return | What and how it does |
|---|---|---|
| `sync` | — → Promise | The main loop: monitors freezes, binds listeners, applies silent mode, volume, speed and quality, respects safe mode and exclusions, then calls `Extras.tick`. |
| `resync` | — → Promise | Forces a fresh pass (used by presets, quick actions and quality changes). |
| `init` | — → void | Starts the first sync, the navigation listener and the 1.5-second interval. |

<a id="page-extras-extras"></a>
## Page extras (`Extras`)

| Method | Parameters / return | What and how it does |
|---|---|---|
| `root`, `layoutState` | — → element / `{chat, sidebar}` | Read Kick's layout state from `data-chat` and `data-sidebar` on the page container. |
| `isDesktop` | — → boolean | Layout automation only runs at desktop widths. |
| `click` | element → boolean | Clicks through `PlayerSync.simulateClick`. |
| `chatHideButton`, `chatShowButton` | — → button/null | Locate the collapse button inside the chatroom and the "show chat" button (by icon, not by language). |
| `setChat`, `setSidebar` | show → boolean | Bring the chat or the left menu to the requested state by pressing Kick's own buttons. |
| `applyLayout` | — → void | Applies the remembered layout once per page, never fighting manual changes. |
| `isTyping` | — → boolean | True while the viewer is typing in a field; automatic claims wait. |
| `rewardTrigger`, `popoverCard` | — → button/null | Find the gift button and the reward popover card. |
| `rewardAvailable` | — → boolean | Detects Kick's own "reward available" signal (the animated call-to-action). |
| `isEnabled` | button → boolean | Visible and not disabled. |
| `claimDrops` | — → Promise<number> | Presses enabled claim buttons for completed drops in the rewards panel. |
| `claimDaily` | trigger → Promise<number> | Opens the rewards window, presses each enabled claim button once (never the same button twice), then closes the window. |
| `claimRewards` | `{manual}` → Promise<number> | Runs a full claim, reports the result and plays a sound; manual runs ignore typing and report when there is nothing to claim. |
| `normName` | text → string | Normalizes names for matching (`_` and spaces to `-`). |
| `findAvatar` | slug → string | Returns the channel avatar visible on the page (used before a channel is saved). |
| `scanAvatars` | — → void | Stores avatars for saved channels that lack one. |
| `tick` | streamKey → void | Scheduler called from `sync`: applies the layout, scans avatars, waits for the reward notification (notification mode, with delay and a two-minute cool-down) or checks on the chosen interval, and polls the drops panel. |

<a id="interface-building-blocks"></a>
## Interface building blocks

| Function | Parameters / return | What and how it does |
|---|---|---|
| `I` | name → svg | Inline stroke icon. |
| `fmtValue` | format, raw → string | Formats slider values (percent, pixels, seconds). |
| `normSearch`, `englishOf`, `searchText` | text → string | Accent-insensitive search text including the English name of a translated label. |
| `row` | key, label, control, options → html | A setting row; stacked by default, inline only for switches, with an optional help toggle. |
| `sw`, `toggleRow` | … → html | Switch control and a ready-made switch row. |
| `chip`, `seg`, `qualityChips` | … → html | Chips, segmented controls and the quality grid. |
| `range` | attr, key, options → html | Slider with fill track and live value. |
| `card`, `btn`, `ib` | … → html | Card, text button and icon button. |
| `timeStr` | timestamp → string | Localized clock time. |
| `setPref` | key, value → void | Writes a player preference to the active channel profile or to the global settings. |
| `fxBtn` | key, value, label, on → html | Effect picker tile with a small preview glyph. |
| `avatarHtml` | name, url → html | Avatar with a letter fallback; a failed image is removed. |
| `hasCustomIcon`, `cwAttrs`, `cwIcon`, `claimWidgetInner` | — → value | Build the quick-claim button markup for both the live button and the settings preview. |

<a id="settings-pages-pages"></a>
## Settings pages (`PAGES`)

| Page | Contents |
|---|---|
| `playback` | Save-this-channel hint, presets, quality (auto-apply, live, VOD, fallback), volume (auto-apply, slider, mute, silent playback, loud warning) and speed. |
| `channels` | How-it-works steps, current channel with the **Save this channel** button, pause/exclude switches and editor, then the saved-channel list (search, sort, pin filter, groups, Edit/Done, delete) with backup and restore. |
| `tools` | Sleep timer, page layout, rewards (auto-claim, mode, delay or interval, Claim now), quick-claim button settings with live preview, freeze alarm and quick actions. |
| `notifications` | Switches, size, duration, opacity, preview, position reset and history. |
| `sounds` | Master switch and volume, per-event switches, volumes and previews. |
| `appearance` | Theme, style, accent colors, density, contrast, text size, blur, centering and language. |
| `motion` | Live preview, presets and pickers for open effect, hover effect, indicator, speed and icon animations. |
| `shortcuts` | Menu hotkey and action hotkeys with rebinding. |
| `diagnostics` | Status, scan, report, quality and conflict checks, safe mode and action log. |
| `about` | Version, links, export/import, undo, restore and reset. |

<a id="panel-controller-gui"></a>
## Panel controller (`GUI`)

### Construction and rendering

| Method | Parameters / return | What and how it does |
|---|---|---|
| `build` | — → void | Creates the shadow-DOM host, panel, toast and live region, then wires events. |
| `applyLook` | — → void | Applies theme, style, accent, blur, text scale, effects, language attribute and toast settings as attributes and CSS variables. |
| `renderChrome` | — → void | Renders title, search placeholder, pause button, footer hint and the quick-claim button. |
| `renderNav` | — → void | Renders the grouped sidebar. |
| `renderPage` | options → void | Renders the active page (or all pages while searching), preserving scroll and keyboard focus. |
| `filterRows` | — → void | Applies the search filter to rows, cards and pages. |
| `channelEditor` | key, profile → html | Editor for one channel profile. |
| `refreshAll`, `onExternalChange` | — → void | Re-render everything after reset, import, undo or a change from another tab. |

### Events and settings changes

| Method | Parameters / return | What and how it does |
|---|---|---|
| `wire` | — → void | Attaches delegated click, input, change, wheel and scroll handlers and the panel drag. |
| `onClick`, `onInput`, `onChange` | event → void | Dispatch clicks, slider moves and text edits to settings, profiles or actions. |
| `applyRange` | key, value → void | Applies a slider value (volume, blur, opacity, durations…). |
| `setSetting`, `setChannel` | key/patch → void | Save a setting or a profile change and push the affected part to the player. |
| `pushToPlayer` | scope, key → void | `media` re-applies volume, silent mode and speed; `all` also re-applies quality. Volume, mute, silent mode and speed never reopen the quality menu. |
| `act` | name, element → Promise | Runs named actions: presets, saving and removing channels, backup, import/export, claims, sleep timer, shortcuts, diagnostics and more. |
| `resetSection` | id → void | Restores one section's defaults. |
| `restoreVolume` | — → void | Re-applies the saved volume. |
| `toggleLayout` | which → void | Hides or shows the chat or the left menu and remembers the choice. |
| `confirm`, `closeModal` | message, options / result → Promise/void | In-panel confirmation dialog (identical in every browser). |
| `download`, `pickFile`, `pickImage` | … → void | Save JSON, read JSON and choose an image for the quick-claim button. |
| `startCapture`, `finishCapture` | id / combo → void | Rebind a hotkey, rejecting duplicates. |
| `replayMock` | — → void | Replays the open effect in the animation preview. |

### Tools and diagnostics

| Method | Parameters / return | What and how it does |
|---|---|---|
| `startSleep`, `cancelSleep`, `syncSleep` | minutes / — → void | Start, cancel and display the sleep timer (it pauses the video at the end). |
| `toggleFocusView` | — → Promise | Enters or leaves fullscreen on the player container. |
| `statusText`, `resultText`, `syncDiagnostics` | — → string/void | Localized status for the header and the diagnostics page. |
| `record` | message, level → void | Adds a timestamped entry to the action log. |
| `copyDiagnostics` | — → Promise | Copies a short report (version, status, qualities, page type, user agent). |
| `checkQuality`, `checkConflicts` | — → Promise/void | Verify the preferred quality is offered and list settings that work against each other. |

### Quick-claim button

| Method | Parameters / return | What and how it does |
|---|---|---|
| `renderClaimWidget` | — → void | Creates, updates or removes the floating button and starts its one-second state poll. |
| `syncClaimWidget` | — → void | Shows the "reward available" ring and dot, the busy state and the auto-hide rule. |
| `placeClaimWidget` | — → void | Positions the button, clamping it to the window. |
| `wireClaimWidget` | element → void | Drag with a five-pixel threshold (a drag never counts as a click), position saving and the click that runs a manual claim. |

### Notifications, sound and panel behavior

| Method | Parameters / return | What and how it does |
|---|---|---|
| `notify` | message, kind, duration, force → void | Shows a toast (unless suppressed), records history and announces the text in a live region. |
| `notifyQuality` | applied, quality → void | Plays the result sound, logs and shows a localized notification. |
| `initToastPosition`, `wireToastDrag` | — → void | Restore and save the dragged toast position. |
| `onAvatars` | — → void | Refreshes pages that show avatars. |
| `ensureAudio` | — → context | Creates and resumes the shared `AudioContext` (unlocked on the first user gesture). |
| `playSound`, `stopSounds` | name, preview → void | Generate and stop the Web Audio cues. |
| `playFreezeAlarm`, `alertFrozen` | force → void | Play the five-note alarm and raise the freeze notification. |
| `placePanel`, `wirePanelDrag` | position → void | Place the panel inside the window and make the header draggable. |
| `open`, `close`, `toggle` | — → void | Control the panel, polling, focus and menu sounds. |
| `syncVolumeControls` | — → void | Keeps the volume slider in sync with the player while the panel is open. |

<a id="hotkeys-and-startup"></a>
## Hotkeys and startup

| Function | Parameters / return | What and how it does |
|---|---|---|
| `isolateKeys` | — → void | Registered at `document-start` in the capture phase: keyboard events that come from inside the panel stop propagating to Kick (so Space, F, M and the arrows never trigger player hotkeys) and Tab is trapped inside the dialog. |
| `setupHotkeys` | — → void | Handles key capture for rebinding, Escape (modal, dropdown, panel), the menu hotkey and the action hotkeys; combos with a modifier or an F-key work even while typing. |
| `init` | — → void | Builds the panel, installs hotkeys and starts `PlayerSync`; guarded against double injection. |

<a id="kick-page-dependencies"></a>
## Kick page dependencies

The script relies on Kick's current markup. Wherever possible it uses icons, attributes and structure rather than visible text, so it keeps working in every interface language. If Kick changes these, the matching feature stops working (the rest keeps running).

| Feature | What it looks for |
|---|---|
| Quality | A visible `<video>`, the player's `button[aria-haspopup="menu"]` and `[role="menuitemradio"]` entries. |
| Layout | A container with `data-sidebar` and `data-chat`, `[data-testid="sidebar-collapse"]`/`sidebar-expand`, a `CollapseRight` icon button inside `#channel-chatroom` and a `MessagesOutline` icon button for showing the chat. |
| Reward notification | A `video` whose source contains `reward-available`, or a `[role="group"]` card containing a `daily-rewards` video. |
| Reward claiming | A `button[aria-haspopup="dialog"][aria-controls]` (gift icon), the dialog it controls (`data-state`), enabled claim buttons with a `.contents` child and a close button with an `.sr-only` label. |
| Drops | `#rewards-panel` list items with a `[role="progressbar"][data-state="complete"]` and an enabled button. |
| Avatars | `img[alt]` elements whose source is `files.kick.com/images/user/…/profile_image/…`. |

<a id="localization"></a>
## Localization

Every label, help message, error, dialog and notification goes through the translation resolver for 38 locales. Missing keys fall back to English. New interface text is translated into all supported languages together with the feature that adds it. The language selector shows flags and native names; the interface follows the browser language on first run and remembers an explicit choice afterwards.

<a id="safety-privacy-and-compatibility"></a>
## Safety, privacy and compatibility

- Settings are sanitized before storage; invalid values fall back to safe defaults.
- Channel names, notes, notification text and diagnostic output are escaped before HTML insertion.
- A custom button icon is re-encoded from a canvas and stored as a data URL of an allowed image type only; it never leaves the browser.
- Shadow DOM keeps the script's styles isolated from Kick; keyboard events from the panel are isolated from Kick's hotkeys.
- Automatic actions skip excluded channels, safe mode and missing player elements. Reward claiming never presses the same button twice in one run and waits while the viewer types.
- The script makes no network requests; updates come from the userscript manager or the Releases page.
- Existing local settings are preserved when moving from 1.1.0, 1.2.0 and 1.3.0.
