<div align="center">

**English** · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · [简体中文](./zh-cn_README.md) · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**Your Kick player, remembered.** Quality, volume and speed are restored automatically on every stream, with a fast, fully localized control panel.

[![Kick Stream Tweaks preview](https://raw.githubusercontent.com/ebayybe/kick-stream-tweaks/main/Photo/kick-stream.png)](https://github.com/ebayybe/kick-stream-tweaks/blob/main/Photo/kick-stream.png)


[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[Install](#installation) · [Features](#features) · [Settings map](#settings-map) · [Shortcuts](#shortcuts) · [Function reference](../docs/en_FUNCTIONS.md) · [Changelog](../CHANGELOG/en_CHANGELOG.md) · [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## Features

- **Quality that sticks.** Pick a live and a VOD quality once; it is applied to every new stream. If the exact quality is missing, the script falls back to the next lower one (or to Auto).
- **Volume that sticks.** Volume and mute are restored per stream, with a loud-volume warning and a live slider that stays in sync with the player.
- **Per-channel profiles.** Open a stream, press **Save this channel** and that channel remembers its own quality, volume, speed and sound. Add a group and a note, pause the saved settings, or exclude the channel from automation entirely.
- **Quick presets.** Save bandwidth, Best quality, Quiet viewing and VOD in one click.
- **Tools.** Sleep timer, focus view, player resync, page layout controls (hide chat, collapse the left menu) and a safe mode that pauses all automatic changes.
- **Freeze alarm.** Plays a loud alarm and shows a notification when the player freezes or shows a black screen, even if the tab is minimized.
- **Quick-claim button.** A floating, draggable button that claims your reward in one click. Four designs, five icons or your own image, adjustable size and opacity.
- **Auto-claim rewards.** Optional: waits for Kick's reward notification (or checks on a schedule), claims what is available and closes the window again (off by default).
- **Silent playback.** Silences a stream without muting the player, so it keeps playing in a background tab. Set it globally or per saved channel.
- **Alerts.** Notifications you can drag, resize and mute, plus optional sound effects with per-event volume.
- **Redesigned interface.** Grouped sidebar, settings search, light and dark themes, accent colors, compact mode, text scaling and high contrast.
- **Animations you control.** Live preview, three presets and separate opening, hover and indicator effects. Respects the system "reduce motion" setting.
- **38 languages** with flags. The interface follows your browser language on first run and remembers your choice afterwards.
- **Private by design.** Everything stays in your browser. No telemetry, no network requests.

<a id="installation"></a>
## Installation

1. Install a userscript manager: [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Open [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) and confirm the installation.
3. Open any stream on [kick.com](https://kick.com) and press **F2**.

Updates are delivered by your userscript manager. You can also watch the [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) page.

## Saving settings for a channel

1. Open the stream of the channel you want to customize.
2. Open the panel (`F2`) and press **Save this channel** (on the **Channels** page, or from the hint on the **Playback** page). The current quality, volume, speed and sound settings are stored for that channel.
3. Fine-tune them in the editor below the button. They are applied automatically every time you open that channel.

Use the switch **Apply the saved settings on this channel** to pause a profile without deleting it, or **Remove** to delete it. All saved channels are listed under **Channels → Saved channels**, where you can search, sort, pin, group, add notes, back up and restore them.

<a id="settings-map"></a>
## Settings map

| Group | Page | What is inside |
| --- | --- | --- |
| Player | **Playback** | Presets, live/VOD quality, fallback, volume, mute, loud-volume warning, speed |
| Player | **Channels** | Current channel profile, saved channels, search, groups, notes, backup |
| Player | **Tools** | Sleep timer, page layout, auto-claim rewards, quick-claim button, freeze alarm, quick actions, focus view |
| Alerts | **Notifications** | Do not disturb, size, duration, opacity, position, history |
| Alerts | **Sounds** | Master switch and volume, per-event switch, volume and preview |
| Interface | **Appearance** | Theme, panel style, accent color, density, contrast, blur, text scale, language |
| Interface | **Animations** | Live preview, presets, opening/hover/indicator effects, speed |
| Interface | **Shortcuts** | Menu hotkey and action hotkeys |
| System | **Diagnostics** | Live status, quality scan, conflict check, safe mode, action log |
| System | **Data & about** | Export, import, undo, reset, restore backup, links |

Every slider also responds to the mouse wheel while you hover it. Use the search box at the top of the panel to find any setting by name. Search also understands the English names, so it works the same in every interface language, and keys typed there never reach the page.

## Quick-claim button

Enable it in **Tools → Quick-claim button on the page**. A small button appears on the stream:

- **Drag** it anywhere; its position is remembered.
- **Click** it to claim your reward (it opens the rewards window, presses *Claim*, closes the window and returns to the stream).
- It **glows and shows a red dot** when Kick's reward notification appears. Turn on *Show only when a reward is available* to keep it hidden the rest of the time.
- Choose a **style** (Orb, Pill, Glass, Flat), a built-in **icon** or **your own image** (PNG, JPG, WebP, GIF or SVG up to 2 MB; square images with a transparent background look best), a **size** and an **opacity**. A live preview shows every change.

The button is separate from *Auto-claim rewards*, so you can claim by hand, automatically, or both.

<a id="shortcuts"></a>
## Shortcuts

| Action | Default |
| --- | --- |
| Open / close the panel | `F2` |
| Toggle notifications | `Alt+N` |
| Toggle chat | `Alt+C` |
| Toggle left menu | `Alt+S` |
| Focus view | `Alt+F` |
| Reset quality | `Alt+Q` |
| Restore volume | `Alt+V` |

Every shortcut can be rebound in **Shortcuts**. Bindings follow the physical key, so they work on any keyboard layout.

<a id="languages"></a>
## Languages

Arabic, Belarusian, Bulgarian, Chinese (Simplified), Chinese (Traditional), Croatian, Czech, Danish, Dutch, English, English (India), Finnish, French, German, Greek, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Latvian, Lithuanian, Macedonian, Malay, Mongolian, Norwegian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Spanish, Swedish, Thai, Turkish and Vietnamese.

## Troubleshooting

- **Quality is not applied.** Open **Diagnostics**, press *Refresh diagnostics* to scan the qualities Kick offers, then *Check selected quality*. If a channel is excluded or safe mode is on, the status line says so.
- **Rewards are not claimed.** Auto-claim is off by default. Enable it in **Tools → Rewards** and try *Claim now*. It only works on live channels, while the tab is visible and you are not typing in chat. In *notification* mode the script reacts to Kick's own reward banner.
- **Silent playback and audio.** Silent playback routes the video through the browser's audio engine with zero gain. If a site blocks that, the panel tells you and normal sound is left untouched.
- **Something behaves oddly.** Run *Check for conflicts*, or use *Reset section* on the page in question.
- **Settings look wrong after an update.** Use **Data & about → Undo** or **Restore backup**.
- **Found a bug?** Press *Copy diagnostics* and attach it to a [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues).

## Privacy

Settings and channel profiles are stored in your browser's local storage on kick.com. The script never sends data anywhere and requests no extra permissions (`@grant none`).

## Contributing

Issues and pull requests are welcome. The script is a single self-contained file, so no build step is required to try a change: edit `kick-stream-tweaks.user.js` and reload the page.

## License

[MIT](./LICENSE)
