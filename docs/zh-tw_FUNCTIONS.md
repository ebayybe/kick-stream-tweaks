<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · **繁體中文**

</div>




# Kick Stream 調整 — 函數參考

Kick Stream 調整參考 1.3.1。它描述了每個功能區域的作用、設定如何儲存、腳本依賴 Kick 頁面的哪些部分以及使用者腳本中每個命名函數或方法的工作方式。請參閱[儲存庫](https://github.com/ebayybe/kick-stream-tweaks)和[變更日誌](../CHANGELOG/en_CHANGELOG.md)。

>名稱與來源相符。 `void`意味著函數透過副作用起作用。編寫為`Object.method`方法存在於該物件上（ `PlayerSync` 、 `Extras` 、 `GUI` 、 `Store` ）。

## 內容

1.[架構](#architecture)
2.[面向使用者的行為](#user-facing-behavior)
3.[設定參考](#settings-reference)
4.[核心實用程式](#core-utilities)
5.[設定存儲](#settings-storage)
6.[播放器同步（ `PlayerSync` ）](#player-synchronization-playersync)
7.[頁面附加內容（ `Extras` ）](#page-extras-extras)
8.[介面建構塊](#interface-building-blocks)
9.[設定頁面（ `PAGES` ）](#settings-pages-pages)
10.[面板控制器（ `GUI` ）](#panel-controller-gui)
11.[熱鍵和啟動](#hotkeys-and-startup)
12.[踢掉頁面依賴](#kick-page-dependencies)
13.[本地化](#localization)
14.[安全、隱私和相容性](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## 建築學

使用者腳本是一個獨立的文件，在`document-start`時使用`@grant none`運行。它沒有建置步驟，也不會發出自己的網路請求。

|層 |物件/區域|責任|
|---|---|---|
|資料| `TR` 、 `DIAG` 、 `FLAGS` 、 `LANG_NAMES` | 38 種語言的翻譯、在地化診斷訊息、標誌 SVG 和語言名稱。 |
|配置| `CONFIG` ， `DEFAULTS` |常數（選擇器、重試限制、預設、部分）和預設值。 |
|儲存| `sanitizeSettings` 、 `Store` 、 `persist` |驗證並保存`localStorage`中的設定；在記憶體中保留一個撤消堆疊。 |
|玩家邏輯 | `PlayerSync` |尋找視頻，恢復質量、音量、速度和靜音模式，觀察是否卡頓。 |
|頁面助理| `Extras` |佈局按鈕、獎勵領取、頻道頭像和後台調度程式。 |
|介面 | `PAGES` 、 `GUI` 、助手 | Shadow-DOM 面板、通知、聲音、浮動快速聲明按鈕、熱鍵。 |

資料流：1.5 秒的`PlayerSync.sync`循環讀取有效設定（首先是通道設定文件，然後是全域設定），將它們應用到播放器並呼叫`Extras.tick` 。使用者操作透過`GUI`處理程序，該處理程序使用`persist`更新設定並僅將受影響的部分推送到播放器（ `media`或`all` ）。

<a id="user-facing-behavior"></a>
## 使用者導向的行為

|面積 |行為 |
|---|---|
|玩家堅持|保存直播/點播品質、音量、靜音狀態、靜音模式和速度，然後在偵測到新串流時套用它們。頁面本身所做的變更（例如 Kick 將音量重設為 50%）將會恢復；只有檢視者自己的動作才會更新已儲存的值。 |
|品質 |透過播放器選單選擇首選質量，在不可用時退回到下一個較低的質量（或自動），然後再次關閉選單。只有真正的使用者點擊才會賦予腳本新的「上次使用」品質。 |
|音量和靜音播放|每個串流的音量和靜音都會恢復。無聲播放以零增益通過網絡音頻引擎路由視頻，因此流可以在後台選項卡中繼續播放而不會被靜音。 |
|頻道概況|**儲存此頻道**儲存正在觀看的頻道的目前品質、音量、速度和聲音。設定檔還保存註釋、群組、引腳狀態、頭像和啟用/排除標誌。 |
|預設|節省頻寬、最佳品質、安靜觀看和 VOD 一鍵應用。 |
|面板| `F2`或自訂熱鍵可開啟固定寬度 (680 px) 面板，其中包含分組側邊欄、搜尋、Kick 和 Minimal 樣式、淺色/深色主題、14 種強調色以及色彩選擇器、緊湊佈局、背景模糊、文字縮放、高對比度和動畫控制。 |
|搜尋 |不區分重音，符合介面語言和英文名稱，並符合章節或卡片標題。在面板中輸入的按鍵永遠不會到達 Kick 的熱鍵。 |
|滑桿|每個滑桿都會回應點擊、拖曳、鍵盤箭頭和滑鼠滾輪。 |
|聲音 |網路音訊提示選單操作、設定變更、品質成功/失敗和音量恢復，每個提示都帶有開關、預覽和音量。 |
|通知 |本地化訊息可以拖曳、縮放、透明、靜音（請勿打擾、安靜全螢幕）並記錄在歷史記錄中。 |
|凍結警報|偵測停滯的播放器或黑屏，播放響亮的警報（即使在隱藏的選項卡中，獨立於音效開關）並顯示通知。 |
|獎勵 |可選的自動領取等待 Kick 的獎勵通知（或按計劃運行），打開獎勵窗口，領取可用的獎勵並關閉它。浮動的、可拖曳的快速聲明按鈕只需單擊即可完成相同的操作。 |
|佈局|隱藏聊天並從面板或使用熱鍵折疊左側選單，可以選擇記住每個串流的選擇。 |
|工具|睡眠計時器、焦點（全螢幕）視圖、播放器重新同步以及暫停每次自動變更的安全模式。 |
|診斷 |即時狀態、偵測到的品質、視訊解析度、品質掃描、衝突檢查、操作日誌和可複製的報告。 |
|資料|匯出/匯入設定、撤銷、重設後復原、備份/還原已儲存的通道。 |
|隱私 |設定、設定檔、日誌和歷史記錄保留在瀏覽器儲存中。沒有任何東西被送到任何地方。 |

<a id="settings-reference"></a>
## Settings reference

所有值均由`sanitizeSettings`驗證；任何無效的內容都會恢復為預設值。範圍是強制執行的。

### Player

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `autoQualityEnabled` |布林 | `true` |自動應用首選品質。 |
| `preferredLiveQuality` 、 `preferredVodQuality` | `auto` 、 `1080p60` 、 `1080p` 、 `720p` 、 `480p` 、 `360p` `160p` `auto` |申請直播和點播的品質。 `auto`意思是「記住我最後的選擇」。 |
| `lastLiveQuality` 、 `lastVodQuality` |相同 | `auto` |觀眾手動選擇的最後品質。 |
| `qualityFallback` | `lower` ， `auto` | `lower` |沒有提供首選品質時該怎麼辦。 |
| `autoVolumeEnabled` |布林 | `true` |恢復並保護已儲存的磁碟區。 |
| `volume` | 0–1 | `1` |節省的音量。 |
| `muted` |布林 | `false` |已儲存靜音狀態。 |
| `silent` |布林 | `false` |無聲播放（零增益音頻圖，播放器未靜音）。 |
| `playbackRate` | 0.25–2.5 | `1` | 節省速度； `1`從不強迫。 |
| `warnLoudVolume` 、 `loudVolumeThreshold` |布林值；60–100，第 5 步 | `true` ; `85` | 85高音量警告。 |
| `safeMode` |布林 | `false` |暫停每個自動更改。 |
| `channelProfiles` |對象，最多 200 | `{}` |每個通道的設定檔（見下文）。 |

頻道設定檔欄位： `enabled` 、 `excluded` 、 `liveQuality` 、 `vodQuality` 、 `volume` 、 `muted` 、 `silent` 、 `playbackRate` 、 `displayName` 、 `pinned` 、 `avatar` （僅限`https://…kick.com/images/user/…` `note` note 400） 1 月 133/ima/user/user 40) note 4個`group` 、134個字元、 143 字） `lastUsed` `updatedAt`

### 通知和聲音

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `notificationsEnabled` |布林 | `true` |顯示結果通知。 |
| `doNotDisturb` ， `quietFullscreen` |布林 | `false` ， `true` |抑制通知和聲音，或僅在全螢幕模式下。 |
| `notificationScale` | 0.8–1.4 | `1` |通知大小。 |
| `notificationDuration` | 1500–12000 毫秒，步長 500 | `3500` | 3500通知保留多久。 |
| `notificationOpacity` | 0.35–1 | `0.95` | 0.95通知透明度。 |
| `notificationShowIcon` |布林 | `true` |顯示狀態圖示。 |
| `notificationPosition` | `{x, y}`或`null` | `null` |拖曳的位置。 |
| `notificationHistoryEnabled` 、 `notificationHistory` |布林值；最多 30 個條目 | `true` ; `[]` |通知的歷史記錄。 |
| `soundEffectsEnabled` 、 `soundVolume` | 布林值；0–1 | `false` ; `0.35` | 0.35 主開關和音量。 |
| `soundEvents` 、 `soundEventVolumes` | 每個事件： `menu` 、 `settingChanged` 、 `qualityApplied` 、 `qualityFailed` 、 `volumeApplied` |全部開啟； `0.35` | 0.35 每個事件的開關和音量。 |

### 外觀、動作和快速鍵

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `theme` | `dark` ， `light` | `dark` |顏色主題。 |
| `panelStyle` | `kick` ， `minimal` | `kick` |面板的視覺風格。 |
| `accentColor` | `#rrggbb` | `#53fc18` |強調色。 |
| `compactMode` ， `highContrast` |布爾 | `false` |密度和對比。 |
| `backdropBlur` | 0–12 像素 | `6` |面板後面的背景模糊（適用於兩種風格）。 |
| `textScale` | 0.9–1.3 | `1` |文字大小。 |
| `language` , `languageChosen` |區域設定代碼；布林 |瀏覽器語言； `false` |介面遵循瀏覽器語言，直到選擇一種語言，然後記住該選擇。 |
| `panelPosition` | `{x, y}`或`null` | `null` |拖曳面板位置。 |
| `motionSpeed` | `fast` 、 `normal` 、 `slow` | `normal` |動畫速度。 |
| `openEffect` | `none` 、 `fade` 、 `slide` 、 `scale` 、 `pop` | `scale` |面板開啟/關閉效果。 |
| `hoverEffect` | `none` 、 `lift` 、 `glow` | `lift` |懸停效果。 |
| `indicatorAnimation` | `glow` 、 `pulse` 、 `breathe` 、 `off` | `glow` |標誌/指示器動畫。 |
| `iconAnimations` |布林 | `true` |動畫側邊欄、重置和幫助圖示。 |
| `hotkey` |組合字串 | `F2` |開啟或關閉面板。 |
| `actionHotkeys` |組合字串 | `Alt+N` 、 `Alt+F` 、 `Alt+Q` 、 `Alt+V` 、 `Alt+C` 、 `Alt+S` |切換通知、焦點視圖、重設品質、恢復音量、切換聊天、切換左側選單。 |

組合鍵儲存為字串（例如`Alt+Q`並與實體鍵匹配，因此它們適用於任何鍵盤佈局。帶有物件形狀熱鍵的舊版本設定會自動轉換。面板寬度固定為680 px（受限於視窗大小）；先前的寬度設定將被忽略。

### 工具

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `autoRecoverStall` |布林 | `false` |當偵測到凍結時嘗試`play()` 。 |
| `freezeAlertEnabled` 、 `freezeSound` |布爾 | `true` |凍結通知和警報聲音。 |
| `freezeSeconds` | 5–60，步驟 5 | `10` | 10警報前沒有任何進展的秒數。 |
| `layoutHideChat` 、 `layoutCollapseSidebar` |布爾 | `false` |記住佈局，每頁應用一次。 |
| `autoClaimRewards` |布爾 | `false` |啟用自動獎勵領取。 |
| `claimMode` | `notify` ， `interval` | `notify` |當 Kick 顯示其通知或按時間表進行索賠時。 |
| `claimDelaySec` | 0–120，步驟 5 | `5` |出現通知後請等待（通知模式）。 |
| `claimIntervalMin` | 5–120，步驟 5 | `10` | 10檢查之間的分鐘數（計劃模式）。 |

### 快速領取按鈕

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `claimWidget` |布林 | `false` |顯示浮動按鈕。 |
| `claimWidgetStyle` | `orb` 、 `pill` 、 `glass` 、 `flat` | `orb` |按鈕設計。 |
| `claimWidgetIcon` | `gift` 、 `crown` 、 `star` 、 `bolt` 、 `coin` 、 `custom` | `gift` |內置圖標，或用戶自己的圖像。 |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` ，最多 90,000 個字元 |空 |上傳影像的重新編碼副本。其他任何事情都會被拒絕。 |
| `claimWidgetImageFill` |布林 | `false` |讓自訂影像填滿整個按鈕（藥丸設計未使用）。 |
| `claimWidgetSize` | `s` 、 `m` 、 `l` | `m` |按鈕大小。 |
| `claimWidgetOpacity` | 0.3–1 | `0.9` | 0.9按鈕不透明度（獎勵可用時完全不透明）。 |
| `claimWidgetAutoHide` |布林 | `false` |僅當獎勵可用時才顯示該按鈕。 |
| `claimWidgetPos` | `{x, y}`或`null` | `null` |拖曳的位置。 |

### 診斷和狀態

|關鍵|類型/範圍 |預設 |意義|
|---|---|---|---|
| `diagnosticsLogEnabled` ， `diagnosticsLog` |布林值；最多 60 個條目 | `true` ; `[]` |行動日誌。 |
| `activeSection` |部分 ID | `playback` |最後開啟的頁面。 |
| `resetBackup` |設定物件 | `null` |重置或匯入先前拍攝的快照。 |

<a id="core-utilities"></a>
## 核心實用程式

|功能|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `detectLanguage` | — → 語言環境 |遍歷`navigator.languages` ，映射區域變體（ `zh-HK` → `zh-tw` ， `nb` / `nn` → `no` ）並傳回第一個支援的區域設置，或`en` 。 |
| `dictFor` |語言 → 字典 |傳回語言環境的翻譯表，先回傳其基本語言，再回傳英文。 |
| `t` / `T` | lang、key、vars → 字串 |使用`{placeholder}`取代解析鍵； `T`使用目前語言。 |
| `diagText` |索引，品質 → 字串 |傳回本地化診斷語句之一。 |
| `log` | …args → void |使用腳本前綴進行控制台日誌記錄。 |
| `clamp` 、 `sleep` 、 `esc` |值→值|範圍限制、基於承諾的延遲和 HTML 轉義。 |
| `normalizeQuality` |文字 → 字串 |小寫品質標籤並刪除空格。 |
| `debounce` | fn，等待 → 函數 |使用`flush`方法進行尾隨去抖動。 |
| `onLocationChange` |回呼 → 無效 |透過包裝`pushState` / `replaceState` 、監聽`popstate`並每秒輪詢一次來偵測單頁導覽。 |
| `keyLabelFromEvent` 、 `comboFromEvent` 、 `matchesCombo` |事件 → 字串/布林值 |根據實體按鍵程式碼建構並比較按鍵組合。 |
| `mkPointer` |類型，額外 → 事件 |建立用於驅動 Kick 的 ARIA 選單的`PointerEvent` （或`MouseEvent` ，如果不可用）。 |
| `waitFor` |探測、逾時、步驟 → 值/空 |輪詢直到探測器返回值或逾時結束。 |
| `imageToDataUrl` |圖片 → 字串 |將圖片縮放到方形畫布（保持比例， `willReadFrequently` ），嘗試 128、96 和 64 像素，並傳回不超過 70,000 個字元的 PNG 資料 URL。 |

<a id="settings-storage"></a>
## 設定存儲

|功能|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `sanitizeProfiles` |物件 → 物件 |每個欄位最多保留 200 個帶有有效鍵和夾的設定檔；頭像必須是 Kick 影像 URL。 |
| `sanitizeSettings` |對象，withBackup → 對象 |驗證每個設定（類型、範圍、允許值），遷移 1.1–1.3 設定（舊質量、熱鍵、動畫和部分鍵）並套用語言規則。 |
| `legacyHotkey` |值 → 字串 |將物件形狀的熱鍵轉換為組合字串。 |
| `Store.load` / `Store.save` | — / 設定 → 設定/無效 |在`localStorage` ( `kickTweaks.settings.v1` ) 中讀取並寫入清理後的物件。 |
| `persist` |補丁， `{undo}` →無效|合併補丁、清理、透過短暫的反跳進行儲存，並可選擇推送撤銷快照（僅保存在記憶體中，最多 15 個）。 |
| `storage`監聽器|事件 → 無效 |當另一個 Kick 選項卡更改設定時重新載入設置，因此選項卡永遠不會相互覆蓋。 |

<a id="player-synchronization-playersync"></a>
## 播放器同步 ( `PlayerSync` )

### 頻道和個人資料助手

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `isVod` | — → 布林 |從 URL 偵測 VOD 頁面。 |
| `channelKey` | — → 字串 |建立穩定的`channel:slug`鍵（或`vod:id` 、 `kick:home` ），將結果快取三秒。在 VOD 頁面上，使用距離玩家最近的頻道連結。 |
| `channelSlug` | — → 字串 |傳回通道鍵的 slug 部分。 |
| `profile` |鍵 → 物件/空 |讀取已儲存的設定檔。 |
| `profileActive` | — → 物件/空 |僅當啟用且未排除目前設定檔時才傳回該設定檔。 |
| `isExcluded` | — → 布林 |檢查此通道是否已停用自動化。 |
| `updateProfile` |補丁、鑰匙 → 作廢 |建立或合併設定檔並標記`updatedAt` 。 |
| `saveCurrentChannel` | — → 物件/空白 |將觀看者目前的品質、音量、靜音、速度和靜音狀態儲存為啟用的設定文件，並掃描頁面以尋找頻道頭像。 |
| `effective` | — → 物件 |從活動設定檔或全域設定解析音量、靜音、靜音、速度和直播/VOD 品質。 |
| `setStatus` |狀態、結果→無效|更新標題和診斷中顯示的狀態和最後結果代碼。 |

### 尋找並駕駛 Kick 的球員

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `findMainVideo`影片 | — → 影片/空 |選擇最大的可見`<video>` 。 |
| `streamKey` | — → 字串 |傳回用於對每個串流套用一次質量的頁面路徑。 |
| `isAccountButton` |按鈕 → 布林值 |拒絕標題、頭像和帳戶按鈕。 |
| `findSettingsButton` |影片 → 按鈕/空白 |透過標籤或影片右下角的距離尋找播放器的齒輪按鈕。 |
| `revealControls` |影片 → 無效 |調度懸停事件，以便顯示隱藏的控制項。 |
| `simulateClick` |元素 → 無效 |傳送 Kick 選單所需的完整指標事件序列。 |
| `menuItems` | — → 元素[] |列出可見的`menuitemradio`條目。 |
| `openQualityMenu` | — → 按鈕/空 |開啟齒輪選單，當出現頂級選單時進入品質條目，並等待選項。 |
| `closeMenu` |按鈕→承諾|僅當選單仍然打開時才關閉選單（盲目的第二次點擊可以重新開啟它），並使用 Escape 回退。 |
| `readMenu` | — → 元素[] |記錄提供的品質和檢查的品質。 |
| `scanQualities` | — → 承諾<boolean>|開啟選單，記錄可用品質並關閉它（用於診斷）。 |
| `activate` |項目 → 承諾 |點選一個選項並等待直到它被選取。 |
| `selectQuality` |期望，後備 → 承諾 |選擇所請求的質量，否則選擇下一個較低的質量，或自動。 |
| `desiredQuality` | — → 字串 |從設定檔、首選項或上次手動選擇中選擇要套用的品質。 |
| `applyQualityOnce`一次 | StreamKey → Promise |每個串流應用一次所需的質量，關閉選單並通知成功或失敗。 |
| `watchManualQuality` | — → 無效 |僅從真實（可信任）點擊中了解新的「上次使用」質量，因此自動點擊和回退永遠不會覆蓋已儲存的值。 |

### 音量、靜音模式、速度和監聽

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `applyVolume` |視頻，安靜→無效|寫入有效音量和靜音狀態（標記為腳本自己的更改）。 |
| `trackInput` | — → 無效 |記錄最後一次可信指針、滾輪、觸控或鍵盤輸入的時間。 |
| `reassertVolume` |影片 → 無效 |當頁面在沒有任何使用者輸入的情況下更改已儲存的磁碟區時，將其恢復（速率限制為每十秒八次恢復）。 |
| `watchVolume` |影片 → 無效 |監聽`volumechange` ：儲存使用者驅動的更改，恢復頁面驅動的變更。 |
| `checkLoud` |音量，靜音→無效|當音量超過閾值時發出警告一次。 |
| `buildGraph` |影片 → 圖/空 |透過增益節點將影片連接到`AudioContext` ；當網站不允許時報告。 |
| `applySilent` |影片 → 無效 |將增益設為 0 進行靜音播放或設定回 1，在需要時恢復上下文。 |
| `applyRate` |影片、強制 → 無效 |設定保存的速度； `1`不是強迫的，除非觀眾只是選擇它，所以 Kick 自己的現場追趕受到尊重。 |
| `applyMedia` |視頻， `{rate}` → 無效 |重新應用音量、靜音模式和可選速度，而不影響質量。 |
| `monitorFreeze` |影片 → 無效 |偵測停滯的播放器（時間卡住）或黑屏（時間在沒有解碼幀的情況下移動）並觸發警報和可選的恢復。在隱藏選項卡中工作。 |

### 循環和生命週期

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `sync` | — → 承諾 |主循環：監視凍結，綁定偵聽器，套用靜音模式、音量、速度和質量，尊重安全模式和排除，然後呼叫`Extras.tick` 。 |
| `resync` | — → 承諾 |強制進行新的傳遞（透過預設、快速操作和品質變更使用）。 |
| `init` | — → 無效 |啟動第一次同步、導覽偵聽器和 1.5 秒間隔。 |

<a id="page-extras-extras"></a>
## 頁面附加內容 ( `Extras` )

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `root` ， `layoutState` | — → 元素 / `{chat, sidebar}` |從頁面容器上的`data-chat`和`data-sidebar`讀取 Kick 的佈局狀態。 |
| `isDesktop` | — → 布林 |佈局自動化僅在桌面寬度下運作。 |
| `click` |元素 → 布林 |透過`PlayerSync.simulateClick`進行點選。 |
| `chatHideButton` 、 `chatShowButton` | — → 按鈕/空 |找到聊天室內的折疊按鈕和「顯示聊天」按鈕（按圖標，而不是按語言）。 |
| `setChat` 、 `setSidebar` |顯示 → 布林 |按下 Kick 自己的按鈕，將聊天或左側選單置於所要求的狀態。 |
| `applyLayout` | — → 無效 |每頁套用一次記住的版面，無需手動變更。 |
| `isTyping` | — → 布林 |當查看者在欄位中輸入時為 True；自動索賠等待。 |
| `rewardTrigger` 、 `popoverCard` | — → 按鈕/空 |找到禮物按鈕和獎勵彈出卡片。 |
| `rewardAvailable` | — → 布爾 |偵測 Kick 自己的「獎勵可用」訊號（動畫號召性用語）。 |
| `isEnabled` |按鈕 → 布林值 |可見且未停用。 |
| `claimDrops` | — → 承諾<number>|按下已啟用的領取按鈕即可在獎勵面板中完成掉落。 |
| `claimDaily` |觸發 → 承諾<number>|開啟獎勵窗口，按每個已啟用的領取按鈕一次（切勿按兩次相同的按鈕），然後關閉視窗。 |
| `claimRewards` | `{manual}` → 承諾<number>|執行完整的索賠，報告結果並播放聲音；當沒有什麼可以聲明時，手動運行會忽略鍵入並報告。 |
| `normName` |文字 → 字串 |規範化名稱以進行匹配（ `_`和空格為`-` ）。 |
| `findAvatar` | slug → 字串 |傳回頁面上可見的頻道頭像（在儲存頻道之前使用）。 |
| `scanAvatars` | — → 無效 |儲存缺少頭像的已儲存頻道的頭像。 |
| `tick` |流密鑰 → 無效 |從`sync`調用的調度程序：應用佈局，掃描頭像，等待獎勵通知（通知模式，有延遲和兩分鐘的冷卻時間）或檢查所選的時間間隔，並輪詢掉落面板。 |

<a id="interface-building-blocks"></a>
## 介面建構塊

|功能|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `I` |名稱 → svg |內聯描邊圖示。 |
| `fmtValue` |格式，原始 → 字串 |設定滑桿值的格式（百分比、像素、秒）。 |
| `normSearch` 、 `englishOf` 、 `searchText`文本 |文本 → 字串 |不區分重音的搜尋文本，包括翻譯標籤的英文名稱。 |
| `row` |鍵、標籤、控制項、選項 → html |設定行；預設情況下堆疊，僅內聯用於開關，具有可選的幫助切換。 |
| `sw` ， `toggleRow` | … → html |開關控制和現成的開關排。 |
| `chip` 、 `seg` 、 `qualityChips` | … → html |晶片、分段控制和質量網格。 |
| `range` |屬性、鍵、選項 → html |具有填滿軌道和即時值的滑桿。 |
| `card` 、 `btn` 、 `ib` | … → html |卡片、文字按鈕和圖示按鈕。 |
| `timeStr` |時間戳 → 字串 |本地化時鐘時間。 |
| `setPref` |鍵，值 → void |將玩家首選項寫入活動頻道設定檔或全域設定。 |
| `fxBtn` |鍵、值、標籤，在 → html |有小預覽字形的效果選擇器圖塊。 |
| `avatarHtml` |名稱、網址 → html |帶有字母後備的頭像；失敗的圖像將被刪除。 |
| `hasCustomIcon` 、 `cwAttrs` 、 `cwIcon` 、 `claimWidgetInner` | — → 值 |為即時按鈕和設定預覽建立快速聲明按鈕標記。 |

<a id="settings-pages-pages"></a>
## 設定頁面 ( `PAGES` )

|頁 |內容 |
|---|---|
| `playback` |儲存此頻道提示、預設、品質（自動套用、直播、VOD、後備）、音量（自動套用、滑桿、靜音、靜音播放、響亮警告）和速度。 |
| `channels` |工作原理步驟，使用**「儲存此頻道」**按鈕的目前頻道、暫停/排除開關和編輯器，然後是儲存的頻道清單（搜尋、排序、固定過濾器、群組、編輯/完成、刪除）以及備份和還原。 |
| `tools` |睡眠計時器、頁面佈局、獎勵（自動領取、模式、延遲或間隔、立即領取）、帶有即時預覽的快速領取按鈕設定、凍結警報和快速操作。 |
| `notifications` |開關、大小、持續時間、不透明度、預覽、位置重置和歷史記錄。 |
| `sounds` |主開關和音量、每個事件開關、音量和預覽。 |
| `appearance` |主題、風格、強調色、密度、對比、文字大小、模糊、居中和語言。 |
| `motion` |用於開啟效果、懸停效果、指示器、速度和圖示動畫的即時預覽、預設和選擇器。 |
| `shortcuts` |具有重新綁定功能的選單熱鍵和操作熱鍵。 |
| `diagnostics` |狀態、掃描、報告、品質和衝突檢查、安全模式和操作日誌。 |
| `about` |版本、連結、匯出/匯入、撤銷、復原和重置。 |

<a id="panel-controller-gui"></a>
## 面板控制器（ `GUI` ）

### 建置和渲染

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `build` | — → 無效 |建立shadow-DOM主機、面板、toast和活動區域，然後連接事件。 |
| `applyLook` | — → 無效 |將主題、樣式、重音、模糊、文字比例、效果、語言屬性和 toast 設定套用為屬性和 CSS 變數。 |
| `renderChrome` | — → 無效 |呈現標題、搜尋佔位符、暫停按鈕、頁腳提示和快速聲明按鈕。 |
| `renderNav` | — → 無效 |呈現分組側邊欄。 |
| `renderPage` |選項 → 無效 |呈現活動頁面（或搜尋時的所有頁面），保留滾動和鍵盤焦點。 |
| `filterRows` | — → 無效 |將搜尋過濾器套用至行、卡片和頁面。 |
| `channelEditor` |金鑰、設定檔 → html |一個頻道設定檔的編輯器。 |
| `refreshAll` ， `onExternalChange` | — → 無效 |重置、匯入、撤銷或從另一個標籤進行更改後重新渲染所有內容。 |

### 事件和設定更改

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `wire` | — → 無效 |附加委託的點擊、輸入、更改、滾輪和滾動處理程序以及面板拖曳。 |
| `onClick` 、 `onInput` 、 `onChange` |事件 → 無效 |將點擊、滑桿移動和文字編輯傳送到設定、設定檔或操作。 |
| `applyRange` |鍵，值 → void |套用滑桿值（音量、模糊、不透明度、持續時間…）。 |
| `setSetting` ， `setChannel` |金鑰/補丁 → 無效 |儲存設定或設定檔變更並將受影響的部分推送到播放器。 |
| `pushToPlayer` |範圍、鍵 → void | `media`重新套用音量、靜音模式和速度； `all`也重新套用品質。音量、靜音、靜音模式和速度永遠不會重新開啟品質選單。 |
| `act` |名稱、元素 → Promise |執行命名作業：預設、儲存和刪除通道、備份、匯入/匯出、宣告、睡眠定時器、捷徑、診斷等。 |
| `resetSection` | id → 無效 |恢復某一部分的預設值。 |
| `restoreVolume` | — → 無效 |重新套用已儲存的音量。 |
| `toggleLayout` |其中 → 無效 |隱藏或顯示聊天或左側選單並記住選擇。 |
| `confirm` ， `closeModal` |訊息、選項/結果 → Promise/void |面板內確認對話方塊（每個瀏覽器中都相同）。 |
| `download` 、 `pickFile` 、 `pickImage` | … → 無效 |儲存 JSON、讀取 JSON 並為快速擷取按鈕選擇映像。 |
| `startCapture` 、 `finishCapture` | id / 組合 → 無效 |重新綁定熱鍵，拒絕重複。 |
| `replayMock` | — → 無效 |重播動畫預覽中開啟的效果。 |

### 工具和診斷

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `startSleep` 、 `cancelSleep` 、 `syncSleep` |分鐘 / — → 無效 |啟動、取消和顯示睡眠計時器（它會在結束時暫停影片）。 |
| `toggleFocusView` | — → 承諾 |在播放器容器上進入或離開全螢幕。 |
| `statusText` 、 `resultText` 、 `syncDiagnostics` | — → 字串/空 |標題和診斷頁面的在地化狀態。 |
| `record` |訊息，等級→無效|將帶有時間戳記的條目加入操作日誌中。 |
| `copyDiagnostics` | — → 承諾 |複製簡短報告（版本、狀態、品質、頁面類型、使用者代理）。 |
| `checkQuality` 、 `checkConflicts` | — → 承諾/作廢 |驗證是否提供了首選品質並列出了相互影響的設定。 |

### 快速領取按鈕

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| renderClaimWidget | `renderClaimWidget`控制項— → 無效 |建立、更新或刪除浮動按鈕並開始其一秒鐘狀態輪詢。 |
| `syncClaimWidget` | — → 無效 |顯示「獎勵可用」環和點、忙碌狀態和自動隱藏規則。 |
| `placeClaimWidget` | — → 無效 |定位按鈕，將其夾在視窗上。 |
| `wireClaimWidget` |元素 → 無效 |使用五像素閾值進行拖曳（拖曳永遠不會算作點擊）、位置保存以及運行手動聲明的點擊。 |

### 通知、聲音和麵板行為

|方法|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `notify` |訊息、種類、持續時間、力量 → void |顯示祝酒詞（除非被抑制）、記錄歷史並在活動區域中宣布文字。 |
| `notifyQuality` |已套用，品質 → 無效 |播放結果聲音、記錄並顯示在地化通知。 |
| `initToastPosition` ， `wireToastDrag` | — → 無效 |恢復並儲存拖曳的 toast 位置。 |
| `onAvatars` | — → 無效 |刷新顯示頭像的頁面。 |
| `ensureAudio` | — → 上下文 |建立並恢復共享的`AudioContext` （在第一個使用者手勢時解鎖）。 |
| `playSound` 、 `stopSounds` |名稱，預覽 → 無效 |產生並停止網路音訊提示。 |
| `playFreezeAlarm` 、 `alertFrozen` |力→虛空|播放五音符警報並發出凍結通知。 |
| `placePanel` 、 `wirePanelDrag` |位置 → 無效 |將面板放置在視窗內並使標題可拖曳。 |
| `open` 、 `close` 、 `toggle` | — → 無效 |控制台、輪詢、焦點和選單聲音。 |
| `syncVolumeControls` | — → 無效 |當面板開啟時，使音量滑桿與播放器保持同步。 |

<a id="hotkeys-and-startup"></a>
## 熱鍵和啟動

|功能|參數/返回|它做什麼以及如何做 |
|---|---|---|
| `isolateKeys` | — → 無效 |在捕獲階段的`document-start`時註冊：來自面板內部的鍵盤事件停止傳播到 Kick（因此 Space、F、M 和箭頭永遠不會觸發玩家熱鍵）並且 Tab 被困在對話框內。 |
| `setupHotkeys` | — → 無效 |處理重新綁定、Escape（模式、下拉式選單、面板）、選單熱鍵和操作熱鍵的按鍵擷取；即使在打字時，帶有修飾符或 F 鍵的組合也可以工作。 |
| `init` | — → 無效 |建置面板，安裝熱鍵並啟動`PlayerSync` ；防止雙重註入。 |

<a id="kick-page-dependencies"></a>
## 踢掉頁面依賴

該腳本依賴 Kick 的當前標記。它盡可能使用圖標、屬性和結構而不是可見文本，因此它可以在每種介面語言中正常運作。如果 Kick 更改了這些，則匹配的功能將停止工作（其餘功能將繼續運行）。

|特色|它在找什麼 |
|---|---|
|品質 |可見的`<video>` 、播放器的`button[aria-haspopup="menu"]`和`[role="menuitemradio"]`條目。 |
|佈局|一個包含`data-sidebar`和`data-chat`容器， `[data-testid="sidebar-collapse"]` / `sidebar-expand` ， `#channel-chatroom`內的`CollapseRight`圖示按鈕和用於顯示聊天的`MessagesOutline`圖示按鈕。 |
|獎勵通知 |來源包含`reward-available` `video` ，或包含`daily-rewards`視頻的`[role="group"]`卡。 |
|獎勵領取 |一個`button[aria-haspopup="dialog"][aria-controls]` （禮物圖示），它控制的對話框（ `data-state` ），啟用帶有`.contents`子項的聲明按鈕和帶有`.sr-only`標籤的關閉按鈕。 |
|滴| `#rewards-panel`列出有`[role="progressbar"][data-state="complete"]`和啟用按鈕的項目。 |
|頭像| `img[alt]`元素，來源為`files.kick.com/images/user/…/profile_image/…` 。 |

<a id="localization"></a>
## 本地化

每個標籤、幫助訊息、錯誤、對話方塊和通知都會經過 38 個語言環境的翻譯解析器。遺失的鍵會恢復為英語。新的介面文字連同添加的功能一起被翻譯成所有支援的語言。語言選擇器顯示標誌和本地名稱；介面在首次運行時遵循瀏覽器語言，並在之後記住明確的選擇。

<a id="safety-privacy-and-compatibility"></a>
## 安全、隱私和相容性

-設定在儲存前經過消毒；無效值會回退到安全預設值。
-頻道名稱、註解、通知文字和診斷輸出在 HTML 插入之前進行轉義。
-自訂按鈕圖示從畫布重新編碼，並僅儲存為允許的圖像類型的資料 URL；它永遠不會離開瀏覽器。
- Shadow DOM 使腳本的樣式與 Kick 隔離；面板中的鍵盤事件與 Kick 的熱鍵隔離。
-自動操作跳過排除的頻道、安全模式和缺少的播放器元素。獎勵領取永遠不會在一次運行中按同一按鈕兩次，並在觀看者打字時等待。
-該腳本不發出網路請求；更新來自使用者腳本管理器或發布頁面。
-從 1.1.0、1.2.0 和 1.3.0 移動時，將保留現有的本地設定。
