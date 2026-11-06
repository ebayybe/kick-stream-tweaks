<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · **한국어** · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# 킥 스트림 조정 - 기능 참조

킥 스트림 조정에 대한 참조 1.3.1. 모든 기능 영역이 수행하는 작업, 설정이 저장되는 방법, 스크립트가 Kick 페이지의 어느 부분에 의존하는지, 사용자 스크립트에서 명명된 각 함수 또는 메서드가 작동하는 방식을 설명합니다. [저장소](https://github.com/ebayybe/kick-stream-tweaks) 및 [변경 로그를](../CHANGELOG/en_CHANGELOG.md) 참조하세요.

> 이름이 출처와 일치합니다. `void` 기능이 부작용을 통해 작동한다는 것을 의미합니다. `Object.method` 로 작성된 메소드는 해당 객체( `PlayerSync` , `Extras` , `GUI` , `Store` )에 있습니다.

## 내용물

1. [건축](#architecture)
2. [사용자 대면 행동](#user-facing-behavior)
3. [설정 참고](#settings-reference)
4. [핵심 유틸리티](#core-utilities)
5. [설정 저장](#settings-storage)
6. [플레이어 동기화( `PlayerSync` )](#player-synchronization-playersync)
7. [페이지 추가 항목( `Extras` )](#page-extras-extras)
8. [인터페이스 빌딩 블록](#interface-building-blocks)
9. [설정 페이지( `PAGES` )](#settings-pages-pages)
10. [패널 컨트롤러( `GUI` )](#panel-controller-gui)
11. [단축키 및 시작](#hotkeys-and-startup)
12. [페이지 의존성 제거](#kick-page-dependencies)
13. [현지화](#localization)
14. [안전, 개인 정보 보호 및 호환성](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## 건축학

사용자 스크립트는 `document-start` 시 `@grant none` 으로 실행되는 하나의 자체 포함 파일입니다. 빌드 단계가 없으며 자체적으로 네트워크를 요청하지 않습니다.

| 레이어 | 개체/영역 | 책임 |
|---|---|---|
| 데이터 | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | 38개 언어 번역, 현지화된 진단 메시지, 플래그 SVG 및 언어 이름. |
| 구성 | `CONFIG` , `DEFAULTS` | 상수(선택기, 재시도 제한, 사전 설정, 섹션) 및 기본 설정. |
| 저장 | `sanitizeSettings` , `Store` , `persist` | `localStorage` 의 설정을 확인하고 저장합니다. 메모리 내 실행 취소 스택을 유지합니다. |
| 플레이어 로직 | `PlayerSync` | 비디오를 찾고 품질, 볼륨, 속도 및 무음 모드를 복원하고 정지를 감시합니다. |
| 페이지 도우미 | `Extras` | 레이아웃 버튼, 보상 청구, 채널 아바타 및 배경 스케줄러. |
| 인터페이스 | `PAGES` , `GUI` , 도우미 | Shadow-DOM 패널, 알림, 소리, 부동 빠른 청구 버튼, 단축키. |

데이터 흐름: 1.5초 `PlayerSync.sync` 루프는 유효한 설정(채널 프로필을 먼저 읽은 다음 전역)을 읽고 이를 플레이어에 적용하고 `Extras.tick` 호출합니다. 사용자 작업은 `persist` 통해 설정을 업데이트하고 영향을 받는 부분만 플레이어( `media` 또는 `all` )에 푸시하는 `GUI` 처리기를 거칩니다.

<a id="user-facing-behavior"></a>
## 사용자 대상 동작

| 면적 | 행동 |
|---|---|
| 플레이어 지속성 | 라이브/VOD 품질, 볼륨, 음소거 상태, 무음 모드 및 속도를 저장한 후 새 스트림이 감지되면 적용합니다. 페이지 자체의 변경 사항(예: Kick으로 볼륨을 50%로 재설정)은 되돌려집니다. 뷰어 자신의 작업만 저장된 값을 업데이트합니다. |
| 품질 | 플레이어 메뉴를 통해 원하는 품질을 선택하고, 사용할 수 없는 경우 다음 낮은 품질(또는 자동)로 돌아가고 메뉴를 다시 닫습니다. 실제 사용자 클릭만이 스크립트에 새로운 "마지막 사용" 품질을 가르칩니다. |
| 볼륨 및 무음 재생 | 볼륨 및 음소거는 스트림별로 복원됩니다. 무음 재생은 웹 오디오 엔진을 통해 게인이 0인 비디오를 라우팅하므로 스트림은 음소거되지 않고 백그라운드 탭에서 계속 재생됩니다. |
| 채널 프로필 | **이 채널 저장은** 시청 중인 채널의 현재 품질, 볼륨, 속도 및 사운드를 저장합니다. 프로필에는 메모, 그룹, 핀 상태, 아바타 및 활성화/제외 플래그도 포함되어 있습니다. |
| 사전 설정 | 한 번의 클릭으로 대역폭 절약, 최고 품질, 조용한 시청 및 VOD 적용이 가능합니다. |
| 패널 | `F2` 또는 사용자 정의 단축키를 누르면 그룹화된 사이드바, 검색, 킥 및 최소 스타일, 밝은/어두운 테마, 14가지 강조 색상과 색상 선택기, 컴팩트 레이아웃, 배경 흐림, 텍스트 크기 조절, 고대비 및 애니메이션 제어 기능이 포함된 고정 너비(680px) 패널이 열립니다. |
| 검색 | 악센트를 구분하지 않고 인터페이스 언어 및 영어 이름과 일치하며 섹션 또는 카드 제목과 일치합니다. 패널에 입력된 키 입력은 Kick의 단축키에 도달하지 않습니다. |
| 슬라이더 | 모든 슬라이더는 클릭, 드래그, 키보드 화살표 및 마우스 휠에 반응합니다. |
| 소리 | 메뉴 작업, 설정 변경, 품질 성공/실패 및 볼륨 복원에 대한 웹 오디오 신호(각각 스위치, 미리보기 및 볼륨 포함) |
| 알림 | 끌기, 크기 조정, 투명화, 무음(방해 금지, 전체 화면 조용히) 및 기록에 기록할 수 있는 현지화된 메시지입니다. |
| 동결 경보 | 정지된 플레이어나 검은색 화면을 감지하고 큰 소리로 알람을 울리며(사운드 효과 스위치와 관계없이 숨겨진 탭에서도) 알림을 표시합니다. |
| 보상 | 선택적 자동 청구는 Kick의 보상 알림을 기다리고(또는 일정에 따라 실행됨) 보상 창을 열고 사용 가능한 항목을 청구하고 닫습니다. 떠다니는 드래그 가능한 빠른 소유권 주장 버튼은 한 번의 클릭으로 동일한 기능을 수행합니다. |
| 레이아웃 | 채팅을 숨기고 패널이나 단축키를 사용하여 왼쪽 메뉴를 축소하며 선택적으로 모든 스트림에 대한 선택 사항을 기억합니다. |
| 도구 | 절전 타이머, 포커스(전체 화면) 보기, 플레이어 재동기화 및 모든 자동 변경을 일시 중지하는 안전 모드. |
| 진단 | 실시간 상태, 감지된 품질, 비디오 해상도, 품질 스캔, 충돌 확인, 작업 로그 및 복사 가능한 보고서. |
| 데이터 | 설정 내보내기/가져오기, 실행 취소, 재설정 후 복원, 저장된 채널 백업/복원. |
| 개인정보 보호 | 설정, 프로필, 로그 및 기록은 브라우저 저장소에 유지됩니다. 아무데도 전송되지 않습니다. |

<a id="settings-reference"></a>
## 설정 참조

모든 값은 `sanitizeSettings` 에 의해 검증됩니다. 잘못된 것은 모두 기본값으로 돌아갑니다. 범위가 적용됩니다.

### 플레이어

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `autoQualityEnabled` | 부울 | `true` | 선호하는 품질을 자동으로 적용합니다. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | 라이브 스트리밍 및 VOD에 적용할 수 있는 품질입니다. `auto` "마지막 선택을 기억한다"는 뜻입니다. |
| `lastLiveQuality` , `lastVodQuality` | 같은 | `auto` | 시청자가 직접 선택한 마지막 품질입니다. |
| `qualityFallback` | `lower` , `auto` | `lower` | 원하는 품질이 제공되지 않는 경우 어떻게 해야 합니까? |
| `autoVolumeEnabled` | 부울 | `true` | 저장된 볼륨을 복원하고 보호합니다. |
| `volume` | 0–1 | `1` | 저장된 볼륨. |
| `muted` | 부울 | `false` | 음소거 상태가 저장되었습니다. |
| `silent` | 부울 | `false` | 자동 재생(제로 게인 오디오 그래프, 플레이어가 음소거되지 않음) |
| `playbackRate` | 0.25–2.5 | `1` | 저장된 속도; `1` 절대 강요하지 않습니다. |
| `warnLoudVolume` , `loudVolumeThreshold` | 부울; 60~100, 5단계 | `true` ; `85` | 대용량 경고. |
| `safeMode` | 부울 | `false` | 모든 자동 변경을 일시 중지합니다. |
| `channelProfiles` | 개체, 최대 200개 | `{}` | 채널별 프로필(아래 참조) |

채널 프로필 필드: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` ( `https://…kick.com/images/user/…` URL만 해당), `note` (240자), `group` (40자), `updatedAt` , `lastUsed` .

### 알림 및 소리

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `notificationsEnabled` | 부울 | `true` | 결과 알림을 표시합니다. |
| `doNotDisturb` , `quietFullscreen` | 부울 | `false` , `true` | 알림 및 소리를 억제하거나 전체 화면에서만 억제합니다. |
| `notificationScale` | 0.8~1.4 | `1` | 알림 크기. |
| `notificationDuration` | 1500~12000ms, 500단계 | `3500` | 알림이 유지되는 기간입니다. |
| `notificationOpacity` | 0.35–1 | `0.95` | 알림 투명성. |
| `notificationShowIcon` | 부울 | `true` | 상태 아이콘을 표시합니다. |
| `notificationPosition` | `{x, y}` 또는 `null` | `null` | 드래그된 위치입니다. |
| `notificationHistoryEnabled` , `notificationHistory` | 부울; 최대 30개 항목 | `true` ; `[]` | 알림 내역. |
| `soundEffectsEnabled` , `soundVolume` | 부울; 0–1 | `false` ; `0.35` | 마스터 스위치와 볼륨. |
| `soundEvents` , `soundEventVolumes` | 이벤트별: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | 모두; `0.35` | 이벤트별 스위치 및 볼륨. |

### 모양, 모션 및 단축키

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | 색상 테마. |
| `panelStyle` | `kick` , `minimal` | `kick` | 패널의 시각적 스타일. |
| `accentColor` | `#rrggbb` | `#53fc18` | 악센트 색상. |
| `compactMode` , `highContrast` | 부울 | `false` | 밀도와 대비. |
| `backdropBlur` | 0~12픽셀 | `6` | 패널 뒤의 배경 흐림(두 스타일 모두에서 작동) |
| `textScale` | 0.9~1.3 | `1` | 텍스트 크기. |
| `language` , `languageChosen` | 로케일 코드; 부울 | 브라우저 언어; `false` | 인터페이스는 언어를 선택할 때까지 브라우저 언어를 따르고 그 다음에는 선택 사항이 기억됩니다. |
| `panelPosition` | `{x, y}` 또는 `null` | `null` | 드래그된 패널 위치. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | 애니메이션 속도. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | 패널 열기/닫기 효과. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | 호버 효과. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | 로고/표시 애니메이션. |
| `iconAnimations` | 부울 | `true` | 사이드바, 재설정 및 도움말 아이콘에 애니메이션을 적용합니다. |
| `hotkey` | 콤보 문자열 | `F2` | 패널을 열거나 닫습니다. |
| `actionHotkeys` | 콤보 문자열 | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | 알림 전환, 보기 집중, 품질 재설정, 볼륨 복원, 채팅 전환, 왼쪽 메뉴 전환. |

키 콤보는 `Alt+Q` 와 같은 문자열로 저장되고 물리적 키와 일치하므로 모든 키보드 레이아웃에서 작동합니다. 개체 모양의 단축키가 있는 이전 버전의 설정은 자동으로 변환됩니다. 패널 너비는 680px로 고정됩니다(창 크기로 제한됨). 이전 너비 설정은 무시됩니다.

### 도구

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `autoRecoverStall` | 부울 | `false` | 정지가 감지되면 `play()` 시도해 보세요. |
| `freezeAlertEnabled` , `freezeSound` | 부울 | `true` | 알림 및 알람 소리를 정지합니다. |
| `freezeSeconds` | 5~60, 5단계 | `10` | 알람이 울리기 전 몇 초 동안 진행되지 않았습니다. |
| `layoutHideChat` , `layoutCollapseSidebar` | 부울 | `false` | 기억된 레이아웃은 페이지당 한 번씩 적용됩니다. |
| `autoClaimRewards` | 부울 | `false` | 자동 보상 청구를 활성화합니다. |
| `claimMode` | `notify` , `interval` | `notify` | Kick이 알림을 표시하거나 일정에 따라 청구합니다. |
| `claimDelaySec` | 0–120, 5단계 | `5` | 알림이 표시된 후 기다립니다(알림 모드). |
| `claimIntervalMin` | 5–120, 5단계 | `10` | 확인 간격(분)(예약 모드) |

### 빠른 소유권 주장 버튼

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `claimWidget` | 부울 | `false` | 플로팅 버튼을 표시합니다. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | 버튼 디자인. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | 내장 아이콘 또는 사용자 자신의 이미지. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , 최대 90,000자 | 비어 있음 | 업로드된 이미지의 복사본을 다시 인코딩했습니다. 다른 것은 거부됩니다. |
| `claimWidgetImageFill` | 부울 | `false` | 사용자 정의 이미지가 전체 버튼을 채우도록 합니다(알약 디자인에서는 사용되지 않음). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | 버튼 크기. |
| `claimWidgetOpacity` | 0.3–1 | `0.9` | 버튼 불투명도(보상이 제공되는 동안 완전 불투명). |
| `claimWidgetAutoHide` | 부울 | `false` | 보상이 있을 때만 버튼을 표시하세요. |
| `claimWidgetPos` | `{x, y}` 또는 `null` | `null` | 드래그된 위치입니다. |

### 진단 및 상태

| 열쇠 | 유형/범위 | 기본값 | 의미 |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | 부울; 최대 60개 항목 | `true` ; `[]` | 작업 로그. |
| `activeSection` | 섹션 ID | `playback` | 마지막으로 열어본 페이지. |
| `resetBackup` | 설정 개체 | `null` | 재설정 또는 가져오기 전에 찍은 스냅샷입니다. |

<a id="core-utilities"></a>
## 핵심 유틸리티

| 기능 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `detectLanguage` | — → 로케일 | `navigator.languages` 언어를 탐색하고 지역 변형( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` )을 매핑하고 첫 번째로 지원되는 로케일인 `en` 반환합니다. |
| `dictFor` | 언어 → 사전 | 로케일에 대한 번역 테이블을 반환하며 기본 언어와 영어로 대체됩니다. |
| `t` / `T` | 랭, 키, 변수 → 문자열 | `{placeholder}` 대체를 사용하여 키를 확인합니다. `T` 현재 언어를 사용합니다. |
| `diagText` | 색인, 품질 → 문자열 | 현지화된 진단 문장 중 하나를 반환합니다. |
| `log` | ...args → 무효 | 스크립트 접두사가 포함된 콘솔 로깅입니다. |
| `clamp` , `sleep` , `esc` | 가치 → 가치 | 범위 제한, 약속 기반 지연 및 HTML 이스케이프. |
| `normalizeQuality` | 텍스트 → 문자열 | 품질 라벨을 소문자로 바꾸고 공백을 제거합니다. |
| `debounce` | fn, 대기 → 기능 | `flush` 메서드를 사용한 후행 디바운스. |
| `onLocationChange` | 콜백 → 무효 | `pushState` / `replaceState` 를 래핑하고 `popstate` 수신하며 초당 한 번씩 폴링하여 단일 페이지 탐색을 감지합니다. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | 이벤트 → 문자열/부울 | 실제 키 코드에서 키 콤보를 만들고 비교하세요. |
| `mkPointer` | 유형, 추가 → 이벤트 | Kick의 ARIA 메뉴를 구동하는 데 사용되는 `PointerEvent` (또는 사용할 수 없는 경우 `MouseEvent` )를 만듭니다. |
| `waitFor` | 프로브, 타임아웃, 단계 → 값/null | 프로브가 값을 반환하거나 제한 시간이 끝날 때까지 폴링합니다. |
| `imageToDataUrl` | 이미지 → 문자열 | 이미지를 정사각형 캔버스로 크기 조정하고(비율 유지, `willReadFrequently` ) 128, 96 및 64px를 시도하고 70,000자 이하의 PNG 데이터 URL을 반환합니다. |

<a id="settings-storage"></a>
## 설정 저장

| 기능 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `sanitizeProfiles` | 개체 → 개체 | 유효한 키가 있는 프로필을 최대 200개까지 유지하고 모든 필드를 고정합니다. 아바타는 Kick 이미지 URL이어야 합니다. |
| `sanitizeSettings` | 개체, withBackup → 개체 | 모든 설정(유형, 범위, 허용된 값)을 검증하고 1.1~1.3 설정(레거시 품질, 단축키, 애니메이션 및 섹션 키)을 마이그레이션하고 언어 규칙을 적용합니다. |
| `legacyHotkey` | 값 → 문자열 | 개체 모양의 단축키를 콤보 문자열로 변환합니다. |
| `Store.load` / `Store.save` | — / 설정 → 설정/무효 | `localStorage` ( `kickTweaks.settings.v1` )에서 삭제된 개체를 읽고 씁니다. |
| `persist` | 패치, `{undo}` → 무효 | 패치를 병합하고, 정리하고, 짧은 디바운스를 통해 저장하고, 선택적으로 실행 취소 스냅샷을 푸시합니다(메모리에만 보관, 최대 15개). |
| `storage` 리스너 | 이벤트 → 무효 | 다른 킥 탭이 설정을 변경할 때 설정을 다시 로드하므로 탭이 서로 덮어쓰지 않습니다. |

<a id="player-synchronization-playersync"></a>
## 플레이어 동기화( `PlayerSync` )

### 채널 및 프로필 도우미

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `isVod` | — → 부울 | URL에서 VOD 페이지를 감지합니다. |
| `channelKey` | — → 문자열 | 안정적인 `channel:slug` 키(또는 `vod:id` , `kick:home` )를 빌드하여 3초 동안 결과를 캐시합니다. VOD 페이지에서는 플레이어와 가장 가까운 채널 링크가 사용됩니다. |
| `channelSlug` | — → 문자열 | 채널 키의 슬러그 부분을 반환합니다. |
| `profile` | 키 → 객체/널 | 저장된 프로필을 읽습니다. |
| `profileActive` | — → 객체/널 | 활성화되어 있고 제외되지 않은 경우에만 현재 프로필을 반환합니다. |
| `isExcluded` | — → 부울 | 이 채널에 대한 자동화가 비활성화되어 있는지 확인합니다. |
| `updateProfile` | 패치, 키 → 무효 | 프로필을 생성하거나 병합하고 `updatedAt` 스탬프를 찍습니다. |
| `saveCurrentChannel` | — → 객체/널 | 시청자의 현재 품질, 볼륨, 음소거, 속도 및 무음 상태를 활성화된 프로필로 저장하고 페이지에서 채널 아바타를 검색합니다. |
| `effective` | — → 개체 | 활성 프로필 또는 전역 설정에서 볼륨, 음소거, 무음, 속도 및 라이브/VOD 품질을 확인합니다. |
| `setStatus` | 상태, 결과 → 무효 | 헤더와 진단에 표시된 상태 및 마지막 결과 코드를 업데이트합니다. |

### 킥 선수 찾아 운전하기

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `findMainVideo` | — → 비디오/널 | 보이는 가장 큰 `<video>` 선택합니다. |
| `streamKey` | — → 문자열 | 스트림당 한 번씩 품질을 적용하는 데 사용되는 페이지 경로를 반환합니다. |
| `isAccountButton` | 버튼 → 부울 | 헤더, 아바타, 계정 버튼을 거부합니다. |
| `findSettingsButton` | 비디오 → 버튼/널 | 라벨별로 또는 동영상의 오른쪽 하단 모서리에 근접하여 플레이어의 톱니바퀴 버튼을 찾습니다. |
| `revealControls` | 비디오 → 무효 | 숨겨진 컨트롤이 표시되도록 호버 이벤트를 전달합니다. |
| `simulateClick` | 요소 → 무효 | Kick의 메뉴에 필요한 전체 포인터 이벤트 시퀀스를 보냅니다. |
| `menuItems` | — → 요소[] | 보이는 `menuitemradio` 항목을 나열합니다. |
| `openQualityMenu` | — → 버튼/널 | 기어 메뉴를 열고, 최상위 메뉴가 나타나면 품질 항목으로 들어가 옵션을 기다립니다. |
| `closeMenu` | 버튼 → 약속 | Escape 폴백을 사용하여 아직 열려 있는 경우에만 메뉴를 닫습니다(두 번째 클릭으로 다시 열 수 있음). |
| `readMenu` | — → 요소[] | 제공된 품질과 확인된 품질을 기록합니다. |
| `scanQualities` | — → 약속<boolean> | 메뉴를 열고 사용 가능한 품질을 기록한 다음 닫습니다(진단에 사용됨). |
| `activate` | 항목 → 약속 | 하나의 옵션을 클릭하고 선택될 때까지 기다립니다. |
| `selectQuality` | 원함, 대체 → 약속 | 요청된 품질을 선택합니다. 그렇지 않으면 다음 낮은 품질 또는 자동을 선택합니다. |
| `desiredQuality` | — → 문자열 | 프로필, 기본 설정 또는 마지막 수동 선택에서 적용할 품질을 선택합니다. |
| `applyQualityOnce` | streamKey → 약속 | 스트림당 한 번씩 원하는 품질을 적용하고 메뉴를 닫은 후 성공 또는 실패를 알립니다. |
| `watchManualQuality` | — → 무효 | 실제(신뢰할 수 있는) 클릭에서만 새로운 "마지막 사용" 품질을 학습하므로 자동화된 클릭 및 대체가 저장된 값을 덮어쓰지 않습니다. |

### 볼륨, 무음 모드, 속도 및 모니터링

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `applyVolume` | 영상, 조용 → 무효 | 유효 볼륨 및 음소거 상태를 기록합니다(스크립트 자체 변경 사항으로 표시됨). |
| `trackInput` | — → 무효 | 마지막으로 신뢰할 수 있는 포인터, 휠, 터치 또는 키보드 입력 시간을 기록합니다. |
| `reassertVolume` | 비디오 → 무효 | 사용자 입력 없이 페이지가 변경된 경우 저장된 볼륨을 다시 되돌립니다(속도는 10초당 8회 되돌리기로 제한됨). |
| `watchVolume` | 비디오 → 무효 | `volumechange` 수신: 사용자가 주도한 변경 사항은 저장되고, 페이지 중심 변경 사항은 되돌려집니다. |
| `checkLoud` | 볼륨, 음소거 → 무효 | 볼륨이 임계값을 초과하면 한 번 경고합니다. |
| `buildGraph` | 비디오 → 그래프/널 | 게인 노드를 통해 비디오를 `AudioContext` 에 연결합니다. 사이트에서 허용하지 않는 경우 이를 보고합니다. |
| `applySilent` | 비디오 → 무효 | 자동 재생을 위해 게인을 0으로 설정하거나 다시 1로 설정하여 필요할 때 컨텍스트를 재개합니다. |
| `applyRate` | 비디오, 강제 → 무효 | 저장된 속도를 설정합니다. `1` 시청자가 그냥 선택하지 않는 한 강제되지 않기 때문에 킥만의 라이브 엣지 캐치업은 존중된다. |
| `applyMedia` | 비디오, `{rate}` → 무효 | 품질을 건드리지 않고 볼륨, 무음 모드 및 선택적으로 속도를 다시 적용합니다. |
| `monitorFreeze` | 비디오 → 무효 | 정지된 플레이어(시간이 멈춤) 또는 검은색 화면(디코딩된 프레임 없이 시간이 이동함)을 감지하고 경보 및 선택적 복구를 트리거합니다. 숨겨진 탭에서 작동합니다. |

### 루프 및 수명 주기

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `sync` | — → 약속 | 메인 루프: 정지를 모니터링하고, 청취자를 바인딩하고, 무음 모드, 볼륨, 속도 및 품질을 적용하고, 안전 모드 및 제외 사항을 준수한 다음, `Extras.tick` 호출합니다. |
| `resync` | — → 약속 | 새로운 패스를 강제합니다(사전 설정, 빠른 작업 및 품질 변경에 사용됨). |
| `init` | — → 무효 | 첫 번째 동기화, 탐색 수신기 및 1.5초 간격을 시작합니다. |

<a id="page-extras-extras"></a>
## 페이지 추가 항목( `Extras` )

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `root` , `layoutState` | — → 요소 / `{chat, sidebar}` | 페이지 컨테이너의 `data-chat` 및 `data-sidebar` 에서 Kick의 레이아웃 상태를 읽습니다. |
| `isDesktop` | — → 부울 | 레이아웃 자동화는 데스크탑 너비에서만 실행됩니다. |
| `click` | 요소 → 부울 | `PlayerSync.simulateClick` 통한 클릭. |
| `chatHideButton` , `chatShowButton` | — → 버튼/널 | 채팅방 내 축소 버튼과 "채팅 표시" 버튼(언어가 아닌 아이콘 기준)을 찾으세요. |
| `setChat` , `setSidebar` | 표시 → 부울 | Kick의 자체 버튼을 눌러 채팅이나 왼쪽 메뉴를 요청한 상태로 가져옵니다. |
| `applyLayout` | — → 무효 | 페이지당 한 번씩 기억된 레이아웃을 적용하며 수동 변경 사항을 적용하지 않습니다. |
| `isTyping` | — → 부울 | 뷰어가 필드에 입력하는 동안에는 True입니다. 자동 청구가 기다려집니다. |
| `rewardTrigger` , `popoverCard` | — → 버튼/널 | 선물 버튼과 보상 팝오버 카드를 찾으세요. |
| `rewardAvailable` | — → 부울 | Kick 자체의 "보상 가능" 신호(애니메이션 클릭 유도 문구)를 감지합니다. |
| `isEnabled` | 버튼 → 부울 | 표시되며 비활성화되지 않습니다. |
| `claimDrops` | — → 약속<number> | 보상 패널에서 완료된 드롭에 대해 활성화된 청구 버튼을 누릅니다. |
| `claimDaily` | 방아쇠 → 약속<number> | 보상 창을 열고 활성화된 각 청구 버튼을 한 번(같은 버튼을 두 번 누르지 않음) 누른 다음 창을 닫습니다. |
| `claimRewards` | `{manual}` → 약속<number> | 전체 청구를 실행하고 결과를 보고하며 소리를 재생합니다. 수동 실행에서는 입력을 무시하고 청구할 항목이 없으면 보고합니다. |
| `normName` | 텍스트 → 문자열 | 일치하는 이름을 정규화합니다( `_` 및 공백을 `-` 로). |
| `findAvatar` | 슬러그 → 문자열 | 페이지에 표시되는 채널 아바타를 반환합니다(채널이 저장되기 전에 사용됨). |
| `scanAvatars` | — → 무효 | 아바타가 없는 저장된 채널의 아바타를 저장합니다. |
| `tick` | streamKey → 무효 | `sync` 에서 호출되는 스케줄러: 레이아웃을 적용하고, 아바타를 스캔하고, 보상 알림(알림 모드, 지연 및 2분 쿨다운 포함)을 기다리거나 선택한 간격을 확인하고 드롭 패널을 폴링합니다. |

<a id="interface-building-blocks"></a>
## 인터페이스 빌딩 블록

| 기능 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `I` | 이름 → svg | 인라인 스트로크 아이콘입니다. |
| `fmtValue` | 형식, 원시 → 문자열 | 슬라이더 값의 형식을 지정합니다(퍼센트, 픽셀, 초). |
| `normSearch` , `englishOf` , `searchText` | 텍스트 → 문자열 | 번역된 라벨의 영어 이름을 포함하여 악센트를 구분하지 않는 검색 텍스트입니다. |
| `row` | 키, 라벨, 컨트롤, 옵션 → html | 설정 행; 기본적으로 스택되어 있고 스위치에 대해서만 인라인이며 선택적 도움말 토글이 있습니다. |
| `sw` , `toggleRow` | ... → HTML | 스위치 제어 및 기성 스위치 행. |
| `chip` , `seg` , `qualityChips` | ... → HTML | 칩, 분할된 컨트롤 및 품질 그리드. |
| `range` | 속성, 키, 옵션 → html | 채우기 트랙과 실시간 값이 있는 슬라이더입니다. |
| `card` , `btn` , `ib` | ... → HTML | 카드, 텍스트 버튼 및 아이콘 버튼. |
| `timeStr` | 타임스탬프 → 문자열 | 현지화된 시계 시간. |
| `setPref` | 키, 값 → 무효 | 활성 채널 프로필 또는 전역 설정에 플레이어 기본 설정을 기록합니다. |
| `fxBtn` | 키, 값, 라벨, 켜기 → html | 작은 미리보기 문자 모양이 있는 효과 선택기 타일입니다. |
| `avatarHtml` | 이름, URL → html | 문자 대체 기능이 있는 아바타. 실패한 이미지는 제거됩니다. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → 값 | 라이브 버튼과 설정 미리보기 모두에 대한 빠른 소유권 주장 버튼 마크업을 구축합니다. |

<a id="settings-pages-pages"></a>
## 설정 페이지( `PAGES` )

| 페이지 | 내용 |
|---|---|
| `playback` | 이 채널 저장 힌트, 사전 설정, 품질(자동 적용, 라이브, VOD, 대체), 볼륨(자동 적용, 슬라이더, 음소거, 무음 재생, 큰 경고) 및 속도. |
| `channels` | 작동 방법 단계, **이 채널 저장** 버튼이 있는 현재 채널, 일시 중지/제외 스위치 및 편집기, 백업 및 복원이 포함된 저장된 채널 목록(검색, 정렬, 핀 필터, 그룹, 편집/완료, 삭제). |
| `tools` | 수면 타이머, 페이지 레이아웃, 보상(자동 청구, 모드, 지연 또는 간격, 지금 청구), 실시간 미리보기가 포함된 빠른 청구 버튼 설정, 동결 알람 및 빠른 작업. |
| `notifications` | 스위치, 크기, 지속 시간, 불투명도, 미리보기, 위치 재설정 및 기록. |
| `sounds` | 마스터 스위치 및 볼륨, 이벤트별 스위치, 볼륨 및 미리보기. |
| `appearance` | 테마, 스타일, 강조 색상, 밀도, 대비, 텍스트 크기, 흐림, 센터링 및 언어. |
| `motion` | 개방형 효과, 호버 효과, 표시기, 속도 및 아이콘 애니메이션을 위한 실시간 미리보기, 사전 설정 및 선택기입니다. |
| `shortcuts` | 리바인딩 기능이 있는 메뉴 단축키 및 작업 단축키. |
| `diagnostics` | 상태, 스캔, 보고, 품질 및 충돌 검사, 안전 모드 및 작업 로그. |
| `about` | 버전, 링크, 내보내기/가져오기, 실행 취소, 복원 및 재설정. |

<a id="panel-controller-gui"></a>
## 패널 컨트롤러( `GUI` )

### 구성 및 렌더링

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `build` | — → 무효 | Shadow-DOM 호스트, 패널, 토스트 및 라이브 영역을 생성한 다음 이벤트를 연결합니다. |
| `applyLook` | — → 무효 | 테마, 스타일, 악센트, 흐림, 텍스트 크기, 효과, 언어 속성 및 토스트 설정을 속성 및 CSS 변수로 적용합니다. |
| `renderChrome` | — → 무효 | 제목, 검색 자리 표시자, 일시 중지 버튼, 바닥글 힌트 및 빠른 소유권 주장 버튼을 렌더링합니다. |
| `renderNav` | — → 무효 | 그룹화된 사이드바를 렌더링합니다. |
| `renderPage` | 옵션 → 무효 | 스크롤 및 키보드 포커스를 유지하면서 활성 페이지(또는 검색하는 동안 모든 페이지)를 렌더링합니다. |
| `filterRows` | — → 무효 | 행, 카드, 페이지에 검색 필터를 적용합니다. |
| `channelEditor` | 키, 프로필 → html | 하나의 채널 프로필에 대한 편집자입니다. |
| `refreshAll` , `onExternalChange` | — → 무효 | 다른 탭에서 재설정, 가져오기, 실행 취소 또는 변경 후 모든 것을 다시 렌더링합니다. |

### 이벤트 및 설정 변경

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `wire` | — → 무효 | 위임된 클릭, 입력, 변경, 휠 및 스크롤 핸들러와 패널 드래그를 연결합니다. |
| `onClick` , `onInput` , `onChange` | 이벤트 → 무효 | 설정, 프로필 또는 작업에 대한 클릭, 슬라이더 이동 및 텍스트 편집을 전달합니다. |
| `applyRange` | 키, 값 → 무효 | 슬라이더 값(볼륨, 흐림, 불투명도, 지속 시간…)을 적용합니다. |
| `setSetting` , `setChannel` | 키/패치 → 무효 | 설정이나 프로필 변경 사항을 저장하고 영향을 받는 부분을 플레이어에 푸시합니다. |
| `pushToPlayer` | 범위, 키 → 무효 | `media` 볼륨, 무음 모드 및 속도를 다시 적용합니다. `all` 품질을 다시 적용합니다. 볼륨, 음소거, 무음 모드 및 속도는 품질 메뉴를 다시 열지 않습니다. |
| `act` | 이름, 요소 → 약속 | 사전 설정, 채널 저장 및 제거, 백업, 가져오기/내보내기, 클레임, 절전 타이머, 바로 가기, 진단 등 명명된 작업을 실행합니다. |
| `resetSection` | 아이디 → 무효 | 한 섹션의 기본값을 복원합니다. |
| `restoreVolume` | — → 무효 | 저장된 볼륨을 다시 적용합니다. |
| `toggleLayout` | 어느 → 무효 | 채팅이나 왼쪽 메뉴를 숨기거나 표시하고 선택 사항을 기억합니다. |
| `confirm` , `closeModal` | 메시지, 옵션/결과 → 약속/무효 | 패널 내 확인 대화 상자(모든 브라우저에서 동일) |
| `download` , `pickFile` , `pickImage` | ... → 무효 | JSON을 저장하고, JSON을 읽고, 빠른 청구 버튼에 사용할 이미지를 선택하세요. |
| `startCapture` , `finishCapture` | ID / 콤보 → 무효 | 단축키를 다시 바인딩하여 중복을 거부합니다. |
| `replayMock` | — → 무효 | 애니메이션 미리보기에서 열린 효과를 재생합니다. |

### 도구 및 진단

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | 분 / — → 무효 | 취침 타이머를 시작, 취소 및 표시합니다(마지막에 비디오를 일시 중지합니다). |
| `toggleFocusView` | — → 약속 | 플레이어 컨테이너에서 전체 화면을 시작하거나 종료합니다. |
| `statusText` , `resultText` , `syncDiagnostics` | — → 문자열/공허 | 헤더 및 진단 페이지의 현지화된 상태입니다. |
| `record` | 메시지, 레벨 → 무효 | 작업 로그에 타임스탬프 항목을 추가합니다. |
| `copyDiagnostics` | — → 약속 | 간단한 보고서(버전, 상태, 품질, 페이지 유형, 사용자 에이전트)를 복사합니다. |
| `checkQuality` , `checkConflicts` | — → 약속/무효 | 선호하는 품질이 제공되는지 확인하고 서로 상충되는 설정을 나열합니다. |

### 빠른 소유권 주장 버튼

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `renderClaimWidget` | — → 무효 | 플로팅 버튼을 생성, 업데이트 또는 제거하고 1초 상태 폴링을 시작합니다. |
| `syncClaimWidget` | — → 무효 | "보상 가능" 링과 점, 통화 중 상태, 자동 숨기기 규칙을 표시합니다. |
| `placeClaimWidget` | — → 무효 | 버튼을 창에 고정하여 위치를 지정합니다. |
| `wireClaimWidget` | 요소 → 무효 | 5픽셀 임계값으로 드래그(드래그는 클릭으로 계산되지 않음), 위치 저장 및 수동 소유권 주장을 실행하는 클릭. |

### 알림, 소리 및 패널 동작

| 방법 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `notify` | 메시지, 종류, 기간, 강제 → 무효 | 표시되지 않는 한 토스트를 표시하고 기록을 기록하며 라이브 영역에서 텍스트를 알립니다. |
| `notifyQuality` | 적용, 품질 → 무효 | 결과 사운드를 재생하고 현지화된 알림을 기록하고 표시합니다. |
| `initToastPosition` , `wireToastDrag` | — → 무효 | 드래그한 토스트 위치를 복원하고 저장합니다. |
| `onAvatars` | — → 무효 | 아바타를 표시하는 페이지를 새로 고칩니다. |
| `ensureAudio` | — → 맥락 | 공유된 `AudioContext` 생성하고 다시 시작합니다(첫 번째 사용자 동작에서 잠금 해제됨). |
| `playSound` , `stopSounds` | 이름, 미리보기 → 무효 | 웹 오디오 신호를 생성하고 중지합니다. |
| `playFreezeAlarm` , `alertFrozen` | 힘 → 무효 | 5개 음표 알람을 재생하고 정지 알림을 올립니다. |
| `placePanel` , `wirePanelDrag` | 위치 → 무효 | 패널을 창 안에 배치하고 헤더를 드래그 가능하게 만듭니다. |
| `open` , `close` , `toggle` | — → 무효 | 패널, 폴링, 포커스 및 메뉴 사운드를 제어합니다. |
| `syncVolumeControls` | — → 무효 | 패널이 열려 있는 동안 볼륨 슬라이더를 플레이어와 동기화 상태로 유지합니다. |

<a id="hotkeys-and-startup"></a>
## 단축키 및 시작

| 기능 | 매개변수 / 반환 | 무엇을, 어떻게 하는가 |
|---|---|---|
| `isolateKeys` | — → 무효 | 캡처 단계의 `document-start` 시 등록됩니다. 패널 내부에서 발생하는 키보드 이벤트가 Kick으로 전파되는 것을 중지하고(따라서 Space, F, M 및 화살표는 플레이어 단축키를 트리거하지 않음) Tab이 대화 상자 내부에 갇히게 됩니다. |
| `setupHotkeys` | — → 무효 | 리바인딩, Escape(모달, 드롭다운, 패널), 메뉴 단축키 및 작업 단축키에 대한 키 캡처를 처리합니다. 수정자나 F 키를 사용한 콤보는 입력하는 동안에도 작동합니다. |
| `init` | — → 무효 | 패널을 빌드하고 단축키를 설치하며 `PlayerSync` 시작합니다. 이중 주입을 방지합니다. |

<a id="kick-page-dependencies"></a>
## 페이지 의존성 킥

스크립트는 Kick의 현재 마크업에 의존합니다. 가능한 경우 눈에 보이는 텍스트 대신 아이콘, 속성 및 구조를 사용하므로 모든 인터페이스 언어에서 계속 작동합니다. Kick이 이를 변경하면 일치 기능이 작동을 중지합니다(나머지는 계속 실행됨).

| 기능 | 무엇을 찾는가 |
|---|---|
| 품질 | 보이는 `<video>` , 플레이어 `button[aria-haspopup="menu"]` 및 `[role="menuitemradio"]` 항목. |
| 레이아웃 | `data-sidebar` 및 `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , `#channel-chatroom` 내부 `CollapseRight` 아이콘 버튼 및 채팅을 표시하기 위한 `MessagesOutline` 아이콘 버튼이 있는 컨테이너입니다. |
| 보상 알림 | 소스에 `reward-available` 포함된 `video` 또는 `daily-rewards` 동영상이 포함된 `[role="group"]` 카드. |
| 보상청구 | `button[aria-haspopup="dialog"][aria-controls]` (선물 아이콘), 이 버튼이 제어하는 ​​대화 상자( `data-state` ), `.contents` 하위 항목이 있는 활성화된 청구 버튼 및 `.sr-only` 라벨이 있는 닫기 버튼. |
| 방울 | `#rewards-panel` 목록 항목에는 `[role="progressbar"][data-state="complete"]` 및 활성화된 버튼이 있습니다. |
| 아바타 | `img[alt]` 소스가 `files.kick.com/images/user/…/profile_image/…` 인 요소. |

<a id="localization"></a>
## 현지화

모든 레이블, 도움말 메시지, 오류, 대화 상자 및 알림은 38개 로캘에 대한 번역 확인 프로그램을 거칩니다. 누락된 키는 영어로 대체됩니다. 새로운 인터페이스 텍스트는 이를 추가하는 기능과 함께 지원되는 모든 언어로 번역됩니다. 언어 선택기에는 플래그와 기본 이름이 표시됩니다. 인터페이스는 처음 실행 시 브라우저 언어를 따르고 이후에는 명시적인 선택을 기억합니다.

<a id="safety-privacy-and-compatibility"></a>
## 안전, 개인 정보 보호 및 호환성

- 설정은 저장되기 전에 삭제됩니다. 유효하지 않은 값은 안전한 기본값으로 돌아갑니다.
- 채널 이름, 메모, 알림 텍스트 및 진단 출력은 HTML 삽입 전에 이스케이프됩니다.
- 사용자 정의 버튼 아이콘은 캔버스에서 다시 인코딩되어 허용된 이미지 유형의 데이터 URL로만 저장됩니다. 브라우저를 떠나지 않습니다.
- Shadow DOM은 스크립트 스타일을 Kick과 분리하여 유지합니다. 패널의 키보드 이벤트는 Kick의 단축키와 격리됩니다.
- 자동 작업은 제외된 채널, 안전 모드 및 누락된 플레이어 요소를 건너뜁니다. 보상 청구는 한 번에 동일한 버튼을 두 번 누르지 않으며 시청자가 입력하는 동안 기다립니다.
- 스크립트는 네트워크 요청을 하지 않습니다. 업데이트는 사용자 스크립트 관리자 또는 릴리스 페이지에서 제공됩니다.
- 1.1.0, 1.2.0, 1.3.0에서 이동 시 기존 로컬 설정은 그대로 유지됩니다.
