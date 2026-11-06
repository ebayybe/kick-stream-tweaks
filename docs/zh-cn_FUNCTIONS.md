<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · **简体中文** · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream 调整 — 函数参考

Kick Stream 调整参考 1.3.1。它描述了每个功能区域的作用、设置如何存储、脚本依赖于 Kick 页面的哪些部分以及用户脚本中每个命名函数或方法的工作方式。请参阅[存储库](https://github.com/ebayybe/kick-stream-tweaks)和[变更日志](../CHANGELOG/en_CHANGELOG.md)。

>名称与来源相符。 `void`意味着函数通过副作用起作用。编写为`Object.method`方法存在于该对象上（ `PlayerSync` 、 `Extras` 、 `GUI` 、 `Store` ）。

## 内容

1.[架构](#architecture)
2.[面向用户的行为](#user-facing-behavior)
3.[设置参考](#settings-reference)
4.[核心实用程序](#core-utilities)
5.[设置存储](#settings-storage)
6.[播放器同步（ `PlayerSync` ）](#player-synchronization-playersync)
7.[页面附加内容（ `Extras` ）](#page-extras-extras)
8.[界面构建块](#interface-building-blocks)
9.[设置页面（ `PAGES` ）](#settings-pages-pages)
10.[面板控制器（ `GUI` ）](#panel-controller-gui)
11.[热键和启动](#hotkeys-and-startup)
12.[踢掉页面依赖](#kick-page-dependencies)
13.[本地化](#localization)
14.[安全、隐私和兼容性](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## 建筑学

用户脚本是一个独立的文件，在`document-start`时使用`@grant none`运行。它没有构建步骤，也不会发出自己的网络请求。

|层 |对象/区域|责任|
|---|---|---|
|数据| `TR` 、 `DIAG` 、 `FLAGS` 、 `LANG_NAMES` | 38 种语言的翻译、本地化诊断消息、标志 SVG 和语言名称。 |
|配置| `CONFIG` ， `DEFAULTS` |常量（选择器、重试限制、预设、部分）和默认设置。 |
|存储| `sanitizeSettings` 、 `Store` 、 `persist` |验证并保存`localStorage`中的设置；在内存中保留一个撤消堆栈。 |
|玩家逻辑 | `PlayerSync` |查找视频，恢复质量、音量、速度和静音模式，观察是否卡顿。 |
|页面助手| `Extras` |布局按钮、奖励领取、频道头像和后台调度程序。 |
|接口 | `PAGES` 、 `GUI` 、助手 | Shadow-DOM 面板、通知、声音、浮动快速声明按钮、热键。 |

数据流：1.5 秒的`PlayerSync.sync`循环读取有效设置（首先是通道配置文件，然后是全局设置），将它们应用到播放器并调用`Extras.tick` 。用户操作通过`GUI`处理程序，该处理程序使用`persist`更新设置并仅将受影响的部分推送到播放器（ `media`或`all` ）。

<a id="user-facing-behavior"></a>
## 面向用户的行为

|面积 |行为 |
|---|---|
|玩家坚持|保存直播/点播质量、音量、静音状态、静音模式和速度，然后在检测到新流时应用它们。页面本身所做的更改（例如 Kick 将音量重置为 50%）将被恢复；只有查看者自己的操作才会更新保存的值。 |
|品质 |通过播放器菜单选择首选质量，在不可用时退回到下一个较低的质量（或自动），然后再次关闭菜单。只有真正的用户点击才会赋予脚本新的“上次使用”品质。 |
|音量和静音播放|每个流的音量和静音都会恢复。无声播放以零增益通过网络音频引擎路由视频，因此流可以在后台选项卡中继续播放而不会被静音。 |
|渠道概况|**保存此频道**存储正在观看的频道的当前质量、音量、速度和声音。配置文件还保存注释、组、引脚状态、头像和启用/排除标志。 |
|预设|节省带宽、最佳质量、安静观看和 VOD 一键应用。 |
|面板| `F2`或自定义热键可打开固定宽度 (680 px) 面板，其中包含分组侧边栏、搜索、Kick 和 Minimal 样式、浅色/深色主题、14 种强调色以及颜色选择器、紧凑布局、背景模糊、文本缩放、高对比度和动画控件。 |
|搜索 |不区分重音，匹配界面语言和英文名称，并匹配章节或卡片标题。在面板中输入的按键永远不会到达 Kick 的热键。 |
|滑块|每个滑块都会响应单击、拖动、键盘箭头和鼠标滚轮。 |
|声音 |网络音频提示菜单操作、设置更改、质量成功/失败和音量恢复，每个提示都带有开关、预览和音量。 |
|通知 |本地化消息可以拖动、缩放、透明、静音（请勿打扰、安静全屏）并记录在历史记录中。 |
|冻结警报|检测停滞的播放器或黑屏，播放响亮的警报（即使在隐藏的选项卡中，独立于音效开关）并显示通知。 |
|奖励 |可选的自动领取等待 Kick 的奖励通知（或按计划运行），打开奖励窗口，领取可用的奖励并关闭它。浮动的、可拖动的快速声明按钮只需单击一下即可完成相同的操作。 |
|布局|隐藏聊天并从面板或使用热键折叠左侧菜单，可以选择记住每个流的选择。 |
|工具|睡眠计时器、焦点（全屏）视图、播放器重新同步以及暂停每次自动更改的安全模式。 |
|诊断 |实时状态、检测到的质量、视频分辨率、质量扫描、冲突检查、操作日志和可复制的报告。 |
|数据|导出/导入设置、撤消、重置后恢复、备份/恢复已保存的通道。 |
|隐私 |设置、配置文件、日志和历史记录保留在浏览器存储中。没有任何东西被发送到任何地方。 |

<a id="settings-reference"></a>
## 设置参考

所有值均由`sanitizeSettings`验证；任何无效的内容都会恢复为默认值。范围是强制执行的。

### 玩家

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `autoQualityEnabled` |布尔 | `true` |自动应用首选质量。 |
| `preferredLiveQuality` 、 `preferredVodQuality` | `auto` 、 `1080p60` 、 `1080p` 、 `720p` 、 `480p` 、 `360p` `160p` `auto` |申请直播和点播的质量。 `auto`意思是“记住我最后的选择”。 |
| `lastLiveQuality` 、 `lastVodQuality` |相同 | `auto` |观看者手动选择的最后质量。 |
| `qualityFallback` | `lower` ， `auto` | `lower` |当没有提供首选质量时该怎么办。 |
| `autoVolumeEnabled` |布尔 | `true` |恢复并保护保存的卷。 |
| `volume` | 0–1 | `1` |节省的音量。 |
| `muted` |布尔 | `false` |已保存静音状态。 |
| `silent` |布尔 | `false` |无声播放（零增益音频图，播放器未静音）。 |
| `playbackRate` | 0.25–2.5 | `1` |节省速度； `1`从不强迫。 |
| `warnLoudVolume` 、 `loudVolumeThreshold` |布尔值； 60–100，第 5 步 | `true` ; `85` | 85高音量警告。 |
| `safeMode` |布尔 | `false` |暂停每个自动更改。 |
| `channelProfiles` |对象，最多 200 | `{}` |每个通道的配置文件（见下文）。 |

频道配置文件字段： `enabled` 、 `excluded` 、 `liveQuality` 、 `vodQuality` 、 `volume` 、 `muted` 、 `silent` 、 `playbackRate` 、 `displayName` 、 `pinned` 、 `avatar` （仅限`https://…kick.com/images/user/…` URL）、 `note` （240个字符）、 `group` （40个字符）、 `updatedAt` 、 `lastUsed` 。

### 通知和声音

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `notificationsEnabled` |布尔 | `true` |显示结果通知。 |
| `doNotDisturb` ， `quietFullscreen` |布尔 | `false` ， `true` |抑制通知和声音，或仅在全屏模式下。 |
| `notificationScale` | 0.8–1.4 | `1` |通知大小。 |
| `notificationDuration` | 1500–12000 毫秒，步长 500 | `3500` | 3500通知保留多长时间。 |
| `notificationOpacity` | 0.35–1 | `0.95` | 0.95通知透明度。 |
| `notificationShowIcon` |布尔 | `true` |显示状态图标。 |
| `notificationPosition` | `{x, y}`或`null` | `null` |拖动的位置。 |
| `notificationHistoryEnabled` 、 `notificationHistory` |布尔值；最多 30 个条目 | `true` ; `[]` |通知的历史记录。 |
| `soundEffectsEnabled` 、 `soundVolume` |布尔值； 0–1 | `false` ; `0.35` | 0.35主开关和音量。 |
| `soundEvents` 、 `soundEventVolumes` |每个事件： `menu` 、 `settingChanged` 、 `qualityApplied` 、 `qualityFailed` 、 `volumeApplied` |全部开启； `0.35` | 0.35每个事件的开关和音量。 |

### 外观、动作和快捷键

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `theme` | `dark` ， `light` | `dark` |颜色主题。 |
| `panelStyle` | `kick` ， `minimal` | `kick` |面板的视觉风格。 |
| `accentColor` | `#rrggbb` | `#53fc18` |强调色。 |
| `compactMode` ， `highContrast` |布尔 | `false` |密度和对比度。 |
| `backdropBlur` | 0–12 像素 | `6` |面板后面的背景模糊（适用于两种风格）。 |
| `textScale` | 0.9–1.3 | `1` |文字大小。 |
| `language` , `languageChosen` |区域设置代码；布尔 |浏览器语言； `false` |界面遵循浏览器语言，直到选择一种语言，然后记住该选择。 |
| `panelPosition` | `{x, y}`或`null` | `null` |拖动面板位置。 |
| `motionSpeed` | `fast` 、 `normal` 、 `slow` | `normal` |动画速度。 |
| `openEffect` | `none` 、 `fade` 、 `slide` 、 `scale` 、 `pop` | `scale` |面板打开/关闭效果。 |
| `hoverEffect` | `none` 、 `lift` 、 `glow` | `lift` |悬停效果。 |
| `indicatorAnimation` | `glow` 、 `pulse` 、 `breathe` 、 `off` | `glow` |徽标/指示器动画。 |
| `iconAnimations` |布尔 | `true` |动画侧边栏、重置和帮助图标。 |
| `hotkey` |组合字符串 | `F2` |打开或关闭面板。 |
| `actionHotkeys` |组合字符串 | `Alt+N` 、 `Alt+F` 、 `Alt+Q` 、 `Alt+V` 、 `Alt+C` 、 `Alt+S` |切换通知、焦点视图、重置质量、恢复音量、切换聊天、切换左侧菜单。 |

组合键存储为字符串（例如`Alt+Q`并与物理键匹配，因此它们适用于任何键盘布局。带有对象形状热键的旧版本设置会自动转换。面板宽度固定为680 px（受限于窗口大小）；先前的宽度设置将被忽略。

### 工具

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `autoRecoverStall` |布尔 | `false` |当检测到冻结时尝试`play()` 。 |
| `freezeAlertEnabled` 、 `freezeSound` |布尔 | `true` |冻结通知和警报声音。 |
| `freezeSeconds` | 5–60，步骤 5 | `10` | 10报警前没有任何进展的秒数。 |
| `layoutHideChat` 、 `layoutCollapseSidebar` |布尔 | `false` |记住布局，每页应用一次。 |
| `autoClaimRewards` |布尔 | `false` |启用自动奖励领取。 |
| `claimMode` | `notify` ， `interval` | `notify` |当 Kick 显示其通知或按时间表进行索赔时。 |
| `claimDelaySec` | 0–120，步骤 5 | `5` |出现通知后请等待（通知模式）。 |
| `claimIntervalMin` | 5–120，步骤 5 | `10` | 10检查之间的分钟数（计划模式）。 |

### 快速领取按钮

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `claimWidget` |布尔 | `false` |显示浮动按钮。 |
| `claimWidgetStyle` | `orb` 、 `pill` 、 `glass` 、 `flat` | `orb` |按钮设计。 |
| `claimWidgetIcon` | `gift` 、 `crown` 、 `star` 、 `bolt` 、 `coin` 、 `custom` | `gift` |内置图标，或用户自己的图像。 |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` ，最多 90,000 个字符 |空 |上传图像的重新编码副本。其他任何事情都会被拒绝。 |
| `claimWidgetImageFill` |布尔 | `false` |让自定义图像填充整个按钮（药丸设计未使用）。 |
| `claimWidgetSize` | `s` 、 `m` 、 `l` | `m` |按钮大小。 |
| `claimWidgetOpacity` | 0.3–1 | `0.9` | 0.9按钮不透明度（奖励可用时完全不透明）。 |
| `claimWidgetAutoHide` |布尔 | `false` |仅当奖励可用时才显示该按钮。 |
| `claimWidgetPos` | `{x, y}`或`null` | `null` |拖动的位置。 |

### 诊断和状态

|关键|类型/范围 |默认 |意义|
|---|---|---|---|
| `diagnosticsLogEnabled` ， `diagnosticsLog` |布尔值；最多 60 个条目 | `true` ; `[]` |行动日志。 |
| `activeSection` |部分 ID | `playback` |最后打开的页面。 |
| `resetBackup` |设置对象 | `null` |重置或导入之前拍摄的快照。 |

<a id="core-utilities"></a>
## 核心实用程序

|功能|参数/返回|它做什么以及如何做 |
|---|---|---|
| `detectLanguage` | — → 语言环境 |遍历`navigator.languages` ，映射区域变体（ `zh-HK` → `zh-tw` ， `nb` / `nn` → `no` ）并返回第一个支持的区域设置，或`en` 。 |
| `dictFor` |语言 → 字典 |返回语言环境的翻译表，先返回其基本语言，然后返回英语。 |
| `t` / `T` | lang、key、vars → 字符串 |使用`{placeholder}`替换解析键； `T`使用当前语言。 |
| `diagText` |索引，质量 → 字符串 |返回本地化诊断语句之一。 |
| `log` | …args → void |使用脚本前缀进行控制台日志记录。 |
| `clamp` 、 `sleep` 、 `esc` |值→值|范围限制、基于承诺的延迟和 HTML 转义。 |
| `normalizeQuality` |文本 → 字符串 |小写质量标签并删除空格。 |
| `debounce` | fn，等待 → 函数 |使用`flush`方法进行尾随去抖动。 |
| `onLocationChange` |回调 → 无效 |通过包装`pushState` / `replaceState` 、监听`popstate`并每秒轮询一次来检测单页导航。 |
| `keyLabelFromEvent` 、 `comboFromEvent` 、 `matchesCombo` |事件 → 字符串/布尔值 |根据物理按键代码构建并比较按键组合。 |
| `mkPointer` |类型，额外 → 事件 |创建用于驱动 Kick 的 ARIA 菜单的`PointerEvent` （或`MouseEvent` ，如果不可用）。 |
| `waitFor` |探测、超时、步骤 → 值/空 |轮询直到探测器返回值或超时结束。 |
| `imageToDataUrl` |图像 → 字符串 |将图像缩放到方形画布（保持比例， `willReadFrequently` ），尝试 128、96 和 64 像素，并返回不超过 70,000 个字符的 PNG 数据 URL。 |

<a id="settings-storage"></a>
## 设置存储

|功能|参数/返回|它做什么以及如何做 |
|---|---|---|
| `sanitizeProfiles` |对象 → 对象 |每个字段最多保留 200 个带有有效键和夹的配置文件；头像必须是 Kick 图像 URL。 |
| `sanitizeSettings` |对象，withBackup → 对象 |验证每个设置（类型、范围、允许值），迁移 1.1–1.3 设置（旧质量、热键、动画和部分键）并应用语言规则。 |
| `legacyHotkey` |值 → 字符串 |将对象形状的热键转换为组合字符串。 |
| `Store.load` / `Store.save` | — / 设置 → 设置/无效 |在`localStorage` ( `kickTweaks.settings.v1` ) 中读取和写入清理后的对象。 |
| `persist` |补丁， `{undo}` →无效|合并补丁、清理、通过短暂的反跳进行保存，并可选择推送撤消快照（仅保存在内存中，最多 15 个）。 |
| `storage`监听器|事件 → 无效 |当另一个 Kick 选项卡更改设置时重新加载设置，因此选项卡永远不会相互覆盖。 |

<a id="player-synchronization-playersync"></a>
## 播放器同步 ( `PlayerSync` )

### 频道和个人资料助手

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `isVod` | — → 布尔 |从 URL 检测 VOD 页面。 |
| `channelKey` | — → 字符串 |构建稳定的`channel:slug`键（或`vod:id` 、 `kick:home` ），将结果缓存三秒。在 VOD 页面上，使用距离玩家最近的频道链接。 |
| `channelSlug` | — → 字符串 |返回通道键的 slug 部分。 |
| `profile` |键 → 对象/空 |读取保存的配置文件。 |
| `profileActive` | — → 对象/空 |仅当启用且未排除当前配置文件时才返回该配置文件。 |
| `isExcluded` | — → 布尔 |检查此通道是否禁用自动化。 |
| `updateProfile` |补丁、钥匙 → 作废 |创建或合并配置文件并标记`updatedAt` 。 |
| `saveCurrentChannel` | — → 对象/空 |将观看者当前的质量、音量、静音、速度和静音状态存储为启用的配置文件，并扫描页面以查找频道头像。 |
| `effective` | — → 对象 |从活动配置文件或全局设置中解析音量、静音、静音、速度和直播/VOD 质量。 |
| `setStatus` |状态、结果→无效|更新标题和诊断中显示的状态和最后结果代码。 |

### 寻找并驾驶 Kick 的球员

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `findMainVideo`视频 | — → 视频/空 |选择最大的可见`<video>` 。 |
| `streamKey` | — → 字符串 |返回用于对每个流应用一次质量的页面路径。 |
| `isAccountButton` |按钮 → 布尔值 |拒绝标题、头像和帐户按钮。 |
| `findSettingsButton` |视频 → 按钮/空 |通过标签或视频右下角的距离查找播放器的齿轮按钮。 |
| `revealControls` |视频 → 无效 |调度悬停事件，以便显示隐藏的控件。 |
| `simulateClick` |元素 → 无效 |发送 Kick 菜单所需的完整指针事件序列。 |
| `menuItems` | — → 元素[] |列出可见的`menuitemradio`条目。 |
| `openQualityMenu` | — → 按钮/空 |打开齿轮菜单，当出现顶级菜单时进入质量条目，并等待选项。 |
| `closeMenu` |按钮→承诺|仅当菜单仍然打开时才关闭菜单（盲目的第二次单击可以重新打开它），并使用 Escape 回退。 |
| `readMenu` | — → 元素[] |记录提供的质量和检查的质量。 |
| `scanQualities` | — → 承诺<boolean>|打开菜单，记录可用质量并关闭它（用于诊断）。 |
| `activate` |项目 → 承诺 |单击一个选项并等待直到它被选中。 |
| `selectQuality` |期望，后备 → 承诺 |选择所请求的质量，否则选择下一个较低的质量，或自动。 |
| `desiredQuality` | — → 字符串 |从配置文件、首选项或上次手动选择中选择要应用的质量。 |
| `applyQualityOnce`一次 | StreamKey → Promise |每个流应用一次所需的质量，关闭菜单并通知成功或失败。 |
| `watchManualQuality` | — → 无效 |仅从真实（可信）点击中了解新的“上次使用”质量，因此自动点击和回退永远不会覆盖保存的值。 |

### 音量、静音模式、速度和监听

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `applyVolume` |视频，安静→无效|写入有效音量和静音状态（标记为脚本自己的更改）。 |
| `trackInput` | — → 无效 |记录最后一次可信指针、滚轮、触摸或键盘输入的时间。 |
| `reassertVolume` |视频 → 无效 |当页面在没有任何用户输入的情况下更改已保存的卷时，将其恢复（速率限制为每十秒八次恢复）。 |
| `watchVolume` |视频 → 无效 |监听`volumechange` ：保存用户驱动的更改，恢复页面驱动的更改。 |
| `checkLoud` |音量，静音→无效|当音量超过阈值时发出警告一次。 |
| `buildGraph` |视频 → 图/空 |通过增益节点将视频连接到`AudioContext` ；当网站不允许时报告。 |
| `applySilent` |视频 → 无效 |将增益设置为 0 进行静音播放或设置回 1，在需要时恢复上下文。 |
| `applyRate` |视频、强制 → 无效 |设置保存的速度； `1`不是强迫的，除非观众只是选择它，所以 Kick 自己的现场追赶受到尊重。 |
| `applyMedia` |视频， `{rate}` → 无效 |重新应用音量、静音模式和可选速度，而不影响质量。 |
| `monitorFreeze` |视频 → 无效 |检测停滞的播放器（时间卡住）或黑屏（时间在没有解码帧的情况下移动）并触发警报和可选的恢复。在隐藏选项卡中工作。 |

### 循环和生命周期

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `sync` | — → 承诺 |主循环：监视冻结，绑定侦听器，应用静音模式、音量、速度和质量，尊重安全模式和排除，然后调用`Extras.tick` 。 |
| `resync` | — → 承诺 |强制进行新的传递（通过预设、快速操作和质量更改使用）。 |
| `init` | — → 无效 |启动第一次同步、导航侦听器和 1.5 秒间隔。 |

<a id="page-extras-extras"></a>
## 页面附加内容 ( `Extras` )

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `root` ， `layoutState` | — → 元素 / `{chat, sidebar}` |从页面容器上的`data-chat`和`data-sidebar`读取 Kick 的布局状态。 |
| `isDesktop` | — → 布尔 |布局自动化仅在桌面宽度下运行。 |
| `click` |元素 → 布尔 |通过`PlayerSync.simulateClick`进行点击。 |
| `chatHideButton` 、 `chatShowButton` | — → 按钮/空 |找到聊天室内的折叠按钮和“显示聊天”按钮（按图标，而不是按语言）。 |
| `setChat` 、 `setSidebar` |显示 → 布尔 |通过按 Kick 自己的按钮，将聊天或左侧菜单置于所请求的状态。 |
| `applyLayout` | — → 无效 |每页应用一次记住的布局，无需手动更改。 |
| `isTyping` | — → 布尔 |当查看者在字段中输入时为 True；自动索赔等待。 |
| `rewardTrigger` 、 `popoverCard` | — → 按钮/空 |找到礼物按钮和奖励弹出卡。 |
| `rewardAvailable` | — → 布尔 |检测 Kick 自己的“奖励可用”信号（动画号召性用语）。 |
| `isEnabled` |按钮 → 布尔值 |可见且未禁用。 |
| `claimDrops` | — → 承诺<number>|按下已启用的领取按钮即可在奖励面板中完成掉落。 |
| `claimDaily` |触发 → 承诺<number>|打开奖励窗口，按每个已启用的领取按钮一次（切勿按两次相同的按钮），然后关闭窗口。 |
| `claimRewards` | `{manual}` → 承诺<number>|运行完整的索赔，报告结果并播放声音；当没有什么可以声明时，手动运行会忽略键入并报告。 |
| `normName` |文本 → 字符串 |规范化名称以进行匹配（ `_`和空格为`-` ）。 |
| `findAvatar` | slug → 字符串 |返回页面上可见的频道头像（在保存频道之前使用）。 |
| `scanAvatars` | — → 无效 |存储缺少头像的已保存频道的头像。 |
| `tick` |流密钥 → 无效 |从`sync`调用的调度程序：应用布局，扫描头像，等待奖励通知（通知模式，有延迟和两分钟的冷却时间）或检查所选的时间间隔，并轮询掉落面板。 |

<a id="interface-building-blocks"></a>
## 界面构建块

|功能|参数/返回|它做什么以及如何做 |
|---|---|---|
| `I` |名称 → svg |内联描边图标。 |
| `fmtValue` |格式，原始 → 字符串 |设置滑块值的格式（百分比、像素、秒）。 |
| `normSearch` 、 `englishOf` 、 `searchText`文本 |文本 → 字符串 |不区分重音的搜索文本，包括翻译标签的英文名称。 |
| `row` |键、标签、控件、选项 → html |设置行；默认情况下堆叠，仅内联用于开关，带有可选的帮助切换。 |
| `sw` ， `toggleRow` | … → html |开关控制和现成的开关排。 |
| `chip` 、 `seg` 、 `qualityChips` | … → html |芯片、分段控制和质量网格。 |
| `range` |属性、键、选项 → html |具有填充轨道和实时值的滑块。 |
| `card` 、 `btn` 、 `ib` | … → html |卡、文本按钮和图标按钮。 |
| `timeStr` |时间戳 → 字符串 |本地化时钟时间。 |
| `setPref` |键，值 → void |将玩家首选项写入活动频道配置文件或全局设置。 |
| `fxBtn` |键、值、标签，在 → html |带有小预览字形的效果选择器图块。 |
| `avatarHtml` |名称、网址 → html |带有字母后备的头像；失败的图像将被删除。 |
| `hasCustomIcon` 、 `cwAttrs` 、 `cwIcon` 、 `claimWidgetInner` | — → 值 |为实时按钮和设置预览构建快速声明按钮标记。 |

<a id="settings-pages-pages"></a>
## 设置页面 ( `PAGES` )

|页 |内容 |
|---|---|
| `playback` |保存此频道提示、预设、质量（自动应用、直播、VOD、后备）、音量（自动应用、滑块、静音、静音播放、响亮警告）和速度。 |
| `channels` |工作原理步骤，使用**“保存此频道”**按钮的当前频道、暂停/排除开关和编辑器，然后是保存的频道列表（搜索、排序、固定过滤器、组、编辑/完成、删除）以及备份和恢复。 |
| `tools` |睡眠计时器、页面布局、奖励（自动领取、模式、延迟或间隔、立即领取）、带实时预览的快速领取按钮设置、冻结警报和快速操作。 |
| `notifications` |开关、大小、持续时间、不透明度、预览、位置重置和历史记录。 |
| `sounds` |主开关和音量、每个事件开关、音量和预览。 |
| `appearance` |主题、风格、强调色、密度、对比度、文本大小、模糊、居中和语言。 |
| `motion` |用于打开效果、悬停效果、指示器、速度和图标动画的实时预览、预设和选择器。 |
| `shortcuts` |具有重新绑定功能的菜单热键和操作热键。 |
| `diagnostics` |状态、扫描、报告、质量和冲突检查、安全模式和操作日志。 |
| `about` |版本、链接、导出/导入、撤消、恢复和重置。 |

<a id="panel-controller-gui"></a>
## 面板控制器（ `GUI` ）

### 构建和渲染

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `build` | — → 无效 |创建shadow-DOM主机、面板、toast和活动区域，然后连接事件。 |
| `applyLook` | — → 无效 |将主题、样式、重音、模糊、文本比例、效果、语言属性和 toast 设置应用为属性和 CSS 变量。 |
| `renderChrome` | — → 无效 |呈现标题、搜索占位符、暂停按钮、页脚提示和快速声明按钮。 |
| `renderNav` | — → 无效 |呈现分组侧边栏。 |
| `renderPage` |选项 → 无效 |呈现活动页面（或搜索时的所有页面），保留滚动和键盘焦点。 |
| `filterRows` | — → 无效 |将搜索过滤器应用于行、卡片和页面。 |
| `channelEditor` |密钥、配置文件 → html |一个频道配置文件的编辑器。 |
| `refreshAll` ， `onExternalChange` | — → 无效 |重置、导入、撤消或从另一个选项卡进行更改后重新渲染所有内容。 |

### 事件和设置更改

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `wire` | — → 无效 |附加委托的单击、输入、更改、滚轮和滚动处理程序以及面板拖动。 |
| `onClick` 、 `onInput` 、 `onChange` |事件 → 无效 |将点击、滑块移动和文本编辑发送到设置、配置文件或操作。 |
| `applyRange` |键，值 → void |应用滑块值（音量、模糊、不透明度、持续时间……）。 |
| `setSetting` ， `setChannel` |密钥/补丁 → 无效 |保存设置或配置文件更改并将受影响的部分推送到播放器。 |
| `pushToPlayer` |范围、键 → void | `media`重新应用音量、静音模式和速度； `all`也重新应用质量。音量、静音、静音模式和速度永远不会重新打开质量菜单。 |
| `act` |名称、元素 → Promise |运行命名操作：预设、保存和删除通道、备份、导入/导出、声明、睡眠定时器、快捷方式、诊断等。 |
| `resetSection` | id → 无效 |恢复某一部分的默认值。 |
| `restoreVolume` | — → 无效 |重新应用保存的音量。 |
| `toggleLayout` |其中 → 无效 |隐藏或显示聊天或左侧菜单并记住选择。 |
| `confirm` ， `closeModal` |消息、选项/结果 → Promise/void |面板内确认对话框（每个浏览器中都相同）。 |
| `download` 、 `pickFile` 、 `pickImage` | … → 无效 |保存 JSON、读取 JSON 并为快速领取按钮选择图像。 |
| `startCapture` 、 `finishCapture` | id / 组合 → 无效 |重新绑定热键，拒绝重复。 |
| `replayMock` | — → 无效 |重放动画预览中打开的效果。 |

### 工具和诊断

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `startSleep` 、 `cancelSleep` 、 `syncSleep` |分钟 / — → 无效 |启动、取消和显示睡眠计时器（它会在结束时暂停视频）。 |
| `toggleFocusView` | — → 承诺 |在播放器容器上进入或离开全屏。 |
| `statusText` 、 `resultText` 、 `syncDiagnostics` | — → 字符串/空 |标题和诊断页面的本地化状态。 |
| `record` |消息，级别→无效|将带有时间戳的条目添加到操作日志中。 |
| `copyDiagnostics` | — → 承诺 |复制简短报告（版本、状态、质量、页面类型、用户代理）。 |
| `checkQuality` 、 `checkConflicts` | — → 承诺/作废 |验证是否提供了首选质量并列出了相互影响的设置。 |

### 快速领取按钮

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| renderClaimWidget | `renderClaimWidget`控件— → 无效 |创建、更新或删除浮动按钮并开始其一秒状态轮询。 |
| `syncClaimWidget` | — → 无效 |显示“奖励可用”环和点、忙碌状态和自动隐藏规则。 |
| `placeClaimWidget` | — → 无效 |定位按钮，将其夹在窗口上。 |
| `wireClaimWidget` |元素 → 无效 |使用五像素阈值进行拖动（拖动永远不会算作点击）、位置保存以及运行手动声明的点击。 |

### 通知、声音和面板行为

|方法|参数/返回|它做什么以及如何做 |
|---|---|---|
| `notify` |消息、种类、持续时间、力量 → void |显示祝酒词（除非被抑制）、记录​​历史并在活动区域​​中宣布文本。 |
| `notifyQuality` |已应用，质量 → 无效 |播放结果声音、记录并显示本地化通知。 |
| `initToastPosition` ， `wireToastDrag` | — → 无效 |恢复并保存拖动的 toast 位置。 |
| `onAvatars` | — → 无效 |刷新显示头像的页面。 |
| `ensureAudio` | — → 上下文 |创建并恢复共享的`AudioContext` （在第一个用户手势时解锁）。 |
| `playSound` 、 `stopSounds` |名称，预览 → 无效 |生成并停止网络音频提示。 |
| `playFreezeAlarm` 、 `alertFrozen` |力→虚空|播放五音符警报并发出冻结通知。 |
| `placePanel` 、 `wirePanelDrag` |位置 → 无效 |将面板放置在窗口内并使标题可拖动。 |
| `open` 、 `close` 、 `toggle` | — → 无效 |控制面板、轮询、焦点和菜单声音。 |
| `syncVolumeControls` | — → 无效 |当面板打开时，使音量滑块与播放器保持同步。 |

<a id="hotkeys-and-startup"></a>
## 热键和启动

|功能|参数/返回|它做什么以及如何做 |
|---|---|---|
| `isolateKeys` | — → 无效 |在捕获阶段的`document-start`时注册：来自面板内部的键盘事件停止传播到 Kick（因此 Space、F、M 和箭头永远不会触发玩家热键）并且 Tab 被困在对话框内。 |
| `setupHotkeys` | — → 无效 |处理重新绑定、Escape（模式、下拉菜单、面板）、菜单热键和操作热键的按键捕获；即使在打字时，带有修饰符或 F 键的组合也可以工作。 |
| `init` | — → 无效 |构建面板，安装热键并启动`PlayerSync` ；防止双重注入。 |

<a id="kick-page-dependencies"></a>
## 踢掉页面依赖

该脚本依赖于 Kick 的当前标记。它尽可能使用图标、属性和结构而不是可见文本，因此它可以在每种界面语言中正常工作。如果 Kick 更改了这些，则匹配的功能将停止工作（其余功能将继续运行）。

|特色|它在寻找什么 |
|---|---|
|品质 |可见的`<video>` 、播放器的`button[aria-haspopup="menu"]`和`[role="menuitemradio"]`条目。 |
|布局|一个包含`data-sidebar`和`data-chat`容器， `[data-testid="sidebar-collapse"]` / `sidebar-expand` ， `#channel-chatroom`内的`CollapseRight`图标按钮和用于显示聊天的`MessagesOutline`图标按钮。 |
|奖励通知 |来源包含`reward-available` `video` ，或包含`daily-rewards`视频的`[role="group"]`卡。 |
|奖励领取 |一个`button[aria-haspopup="dialog"][aria-controls]` （礼物图标），它控制的对话框（ `data-state` ），启用带有`.contents`子项的声明按钮和带有`.sr-only`标签的关闭按钮。 |
|滴| `#rewards-panel`列出带有`[role="progressbar"][data-state="complete"]`和启用按钮的项目。 |
|头像| `img[alt]`元素，其来源为`files.kick.com/images/user/…/profile_image/…` 。 |

<a id="localization"></a>
## 本地化

每个标签、帮助消息、错误、对话框和通知都会经过 38 个语言环境的翻译解析器。丢失的键会恢复为英语。新的界面文本连同添加的功能一起被翻译成所有支持的语言。语言选择器显示标志和本地名称；界面在首次运行时遵循浏览器语言，并在之后记住明确的选择。

<a id="safety-privacy-and-compatibility"></a>
## 安全、隐私和兼容性

-设置在存储前经过消毒；无效值会回退到安全默认值。
-通道名称、注释、通知文本和诊断输出在 HTML 插入之前进行转义。
-自定义按钮图标从画布重新编码，并仅存储为允许的图像类型的数据 URL；它永远不会离开浏览器。
- Shadow DOM 使脚本的样式与 Kick 隔离；面板中的键盘事件与 Kick 的热键隔离。
-自动操作跳过排除的频道、安全模式和缺少的播放器元素。奖励领取永远不会在一次运行中按同一按钮两次，并在观看者打字时等待。
-该脚本不发出网络请求；更新来自用户脚本管理器或发布页面。
-从 1.1.0、1.2.0 和 1.3.0 移动时，将保留现有的本地设置。
