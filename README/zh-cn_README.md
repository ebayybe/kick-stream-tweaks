<div align="center">

[English](./en_README.md) · [العربية](./ar_README.md) · [Беларуская](./be_README.md) · [Български](./bg_README.md) · [Čeština](./cs_README.md) · [Dansk](./da_README.md) · [Deutsch](./de_README.md) · [Ελληνικά](./el_README.md) · [Español](./es_README.md) · [Suomi](./fi_README.md) · [Français](./fr_README.md) · [हिन्दी](./hi_README.md) · [English (India)](./en-in_README.md) · [Hrvatski](./hr_README.md) · [Magyar](./hu_README.md) · [Bahasa Indonesia](./id_README.md) · [Italiano](./it_README.md) · [日本語](./ja_README.md) · [한국어](./ko_README.md) · [Lietuvių](./lt_README.md) · [Latviešu](./lv_README.md) · [Македонски](./mk_README.md) · [Монгол](./mn_README.md) · [Bahasa Melayu](./ms_README.md) · [Nederlands](./nl_README.md) · [Norsk](./no_README.md) · [Polski](./pl_README.md) · [Português](./pt_README.md) · [Română](./ro_README.md) · [Русский](./ru_README.md) · [Slovenčina](./sk_README.md) · [Srpski](./sr_README.md) · [Svenska](./sv_README.md) · [ไทย](./th_README.md) · [Türkçe](./tr_README.md) · [Tiếng Việt](./vi_README.md) · **简体中文** · [繁體中文](./zh-tw_README.md)

# Kick Stream Tweaks

**记住您的 Kick 播放器。** 每个流的质量、音量和速度都会通过快速、完全本地化的控制面板自动恢复。

[![Version](https://img.shields.io/badge/version-1.3.1-53fc18?style=flat-square)](https://github.com/ebayybe/kick-stream-tweaks/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Languages](https://img.shields.io/badge/languages-38-8a5cf6?style=flat-square)](#languages)
[![Userscript](https://img.shields.io/badge/Tampermonkey%20%7C%20Violentmonkey-supported-orange?style=flat-square)](#installation)

[安装](#installation) · [特征](#features) · [设置图](#settings-map) · [快捷方式](#shortcuts) · [功能参考](../docs/zh-cn_FUNCTIONS.md) · [变更日志](../CHANGELOG/zh-cn_CHANGELOG.md) · [发布](https://github.com/ebayybe/kick-stream-tweaks/releases)

</div>

<a id="features"></a>
## 特征

- **质量始终如一。** 选择一次直播和点播质量；它适用于每个新流。如果缺少确切的质量，脚本将回退到下一个较低的质量（或自动）。
- **音量保持不变。** 每个流都会恢复音量和静音，并带有大声音量警告和与播放器保持同步的实时滑块。
- **每频道配置文件。** 打开一个流，按 **保存此频道**，该频道会记住自己的质量、音量、速度和声音。添加组和注释、暂停已保存的设置或完全从自动化中排除通道。
- **快速预设。** 一键节省带宽、最佳质量、安静观看和点播。
- **工具。** 睡眠计时器、焦点视图、播放器重新同步、页面布局控件（隐藏聊天、折叠左侧菜单）以及暂停所有自动更改的安全模式。
- **冻结警报。** 当播放器冻结或显示黑屏时，即使选项卡最小化，也会发出响亮的警报并显示通知。
- **快速领取按钮。** 一个可拖动的浮动按钮，只需单击一下即可领取奖励。四种设计，五个图标或您自己的图像，可调节大小和不透明度。
- **自动领取奖励。** 可选：等待 Kick 的奖励通知（或检查时间表），领取可用奖励并再次关闭窗口（默认情况下关闭）。
- **静默播放。** 使流静音而不使播放器静音，因此它可以在后台选项卡中继续播放。全局或每个保存的通道进行设置。
- **警报。** 您可以拖动、调整大小和静音的通知，以及带有每个事件音量的可选音效。
- **重新设计的界面。**分组侧边栏、设置搜索、浅色和深色主题、强调色、紧凑模式、文本缩放和高对比度。
- **您控制的动画。** 实时预览、三个预设以及单独的打开、悬停和指示器效果。尊重系统“减少运动”设置。
- **38 种语言** 带标志。界面在首次运行时遵循您的浏览器语言，并在之后记住您的选择。
- **设计上的私密性。**一切都保留在您的浏览器中。没有遥测，没有网络请求。

<a id="installation"></a>
## 安装

1. 安装用户脚本管理器： [Tampermonkey](https://www.tampermonkey.net/) 或者 [Violentmonkey](https://violentmonkey.github.io/)。
2. 打开 [`kick-stream-tweaks.user.js`](https://github.com/ebayybe/kick-stream-tweaks/raw/main/kick-stream-tweaks.user.js) 并确认安装。
3. 打开任何流 [kick.com](https://kick.com) 并按 **F2**。

更新由您的用户脚本管理器提供。您还可以观看 [Releases](https://github.com/ebayybe/kick-stream-tweaks/releases) 页。

## 保存通道设置

1. 打开您要自定义的频道的码流。
2. 打开面板（`F2`）并按**保存此频道**（在**频道**页面上，或根据**播放**页面上的提示）。存储该频道的当前质量、音量、速度和声音设置。
3. 在按钮下方的编辑器中微调它们。每次您打开该频道时，它们都会自动应用。

使用开关**应用此频道上保存的设置**来暂停配置文件而不删除它，或使用**删除**来删除它。所有保存的频道都列在**频道 → 已保存的频道**下，您可以在其中搜索、排序、固定、分组、添加注释、备份和恢复它们。

<a id="settings-map"></a>
## 设置图

| 团体 | 页 | 里面有什么 |
| --- | --- | --- |
| 玩家 | **回放** | 预设、直播/点播质量、回退、音量、静音、大声警告、速度 |
| 玩家 | **频道** | 当前频道配置文件、已保存频道、搜索、分组、注释、备份 |
| 玩家 | **工具** | 睡眠计时器、页面布局、自动领取奖励、快速领取按钮、冻结警报、快速操作、焦点视图 |
| 警报 | **通知** | 请勿打扰、大小、持续时间、不透明度、位置、历史记录 |
| 警报 | **声音** | 主开关和音量、每个事件开关、音量和预览 |
| 界面 | **外貌** | 主题、面板样式、强调色、密度、对比度、模糊、文本比例、语言 |
| 界面 | **动画** | 实时预览、预设、打开/悬停/指示器效果、速度 |
| 界面 | **快捷方式** | 菜单热键和操作热键 |
| 系统 | **诊断** | 实时状态、质量扫描、冲突检查、安全模式、操作日志 |
| 系统 | **数据及关于** | 导出、导入、撤消、重置、恢复备份、链接 |

当您将鼠标悬停时，每个滑块也会响应鼠标滚轮。使用面板顶部的搜索框按名称查找任何设置。搜索还可以理解英文名称，因此它在每种界面语言中的工作方式都是相同的，并且在那里键入的键永远不会到达页面。

## 快速领取按钮

在**工具→页面上的快速领取按钮**中启用它。流上会出现一个小按钮：

- **拖**它到任何地方；它的位置被记住。
- **点击**它来领取您的奖励（它会打开奖励窗口，按*领取*，关闭窗口并返回到流）。
- 当 Kick 的奖励通知出现时，它**会发光并显示一个红点**。启用“仅在奖励可用时显示”，以使其在其余时间保持隐藏。
- 选择**样式**（球体、药丸、玻璃、平面）、内置**图标**或**您自己的图像**（PNG、JPG、WebP、GIF 或 SVG，最大 2 MB；具有透明背景的方形图像效果最佳）、**尺寸**和**不透明度**。实时预览显示每一个变化。

该按钮与“自动领取奖励”分开，因此您可以手动、自动或两者都领取。

<a id="shortcuts"></a>
## 快捷方式

| 行动 | 默认 |
| --- | --- |
| 打开/关闭面板 | `F2` |
| 切换通知 | `Alt+N` |
| 切换聊天 | `Alt+C` |
| 切换左侧菜单 | `Alt+S` |
| 焦点视图 | `Alt+F` |
| 重置质量 | `Alt+Q` |
| 恢复音量 | `Alt+V` |

每个快捷方式都可以在**快捷方式**中反弹。绑定遵循物理键，因此它们适用于任何键盘布局。

<a id="languages"></a>
## 语言

阿拉伯语、白俄罗斯语、保加利亚语、中文（简体）、中文（繁体）、克罗地亚语、捷克语、丹麦语、荷兰语、英语、英语（印度）、芬兰语、法语、德语、希腊语、印地语、匈牙利语、印度尼西亚语、意大利语、日语、韩语、拉脱维亚语、立陶宛语、马其顿语、马来语、蒙古语、挪威语、波兰语、葡萄牙语、罗马尼亚语、俄语、塞尔维亚语、斯洛伐克语、西班牙语、瑞典语、泰语、土耳其语和越南语。

## 故障排除

- **不应用质量。** 打开 **诊断**，按 *刷新诊断* 扫描 Kick 提供的质量，然后 *检查所选质量*。如果通道被排除或安全模式已打开，状态行会进行说明。
- **不领取奖励。** 默认情况下，自动领取处于关闭状态。在**工具 → 奖励**中启用它并尝试*立即领取*。它仅适用于直播频道，而选项卡可见并且您没有在聊天中输入内容。在*通知*模式下，脚本会对 Kick 自己的奖励横幅做出反应。
- **静默播放和音频。**静默播放通过浏览器的音频引擎以零增益路由视频。如果某个站点阻止了该功能，面板会告诉您，并且正常声音不会受到影响。
- **某些行为很奇怪。**运行*检查冲突*，或在有问题的页面上使用*重置部分*。
- **更新后设置看起来不正确。**使用**数据和关于→撤消**或**恢复备份**。
- **发现错误？** 按*复制诊断*并将其附加到 [new issue](https://github.com/ebayybe/kick-stream-tweaks/issues)。

## 隐私

设置和频道配置文件存储在 kick.com 上浏览器的本地存储中。该脚本从不向任何地方发送数据并且不请求额外的权限（`@grant none`）。

## 贡献

欢迎提出问题和拉取请求。该脚本是一个独立的文件，因此不需要构建步骤来尝试更改：编辑 `kick-stream-tweaks.user.js` 并重新加载页面。

## 执照

[MIT](./LICENSE)
