<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · **Tiếng Việt** · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Tinh chỉnh Kick Stream — Tham khảo chức năng

Tài liệu tham khảo về Tinh chỉnh Kick Stream 1.3.1. Nó mô tả mọi khu vực chức năng thực hiện chức năng gì, cách lưu trữ cài đặt, tập lệnh phụ thuộc vào phần nào của trang Kick và cách hoạt động của từng chức năng hoặc phương thức được đặt tên trong bản mô tả người dùng. Xem [kho lưu trữ](https://github.com/ebayybe/kick-stream-tweaks) và [nhật ký thay đổi](../CHANGELOG/en_CHANGELOG.md) .

> Tên phù hợp với nguồn. `void` có nghĩa là một chức năng hoạt động thông qua các tác dụng phụ. Một phương thức được viết dưới dạng `Object.method` tồn tại trên đối tượng đó ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Nội dung

1. [Kiến trúc](#architecture)
2. [Hành vi hướng tới người dùng](#user-facing-behavior)
3. [Tham khảo cài đặt](#settings-reference)
4. [Tiện ích cốt lõi](#core-utilities)
5. [Lưu trữ cài đặt](#settings-storage)
6. [Đồng bộ hóa trình phát ( `PlayerSync` )](#player-synchronization-playersync)
7. [Tính năng bổ sung của trang ( `Extras` )](#page-extras-extras)
8. [Khối xây dựng giao diện](#interface-building-blocks)
9. [Trang cài đặt ( `PAGES` )](#settings-pages-pages)
10. [Bộ điều khiển bảng ( `GUI` )](#panel-controller-gui)
11. [Phím nóng và khởi động](#hotkeys-and-startup)
12. [Phụ thuộc vào trang kick](#kick-page-dependencies)
13. [Bản địa hóa](#localization)
14. [An toàn, quyền riêng tư và khả năng tương thích](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Ngành kiến ​​​​trúc

Userscript là một tệp độc lập chạy khi `document-start` với `@grant none` . Nó không có bước xây dựng và không thực hiện các yêu cầu mạng riêng.

| Lớp | Đối tượng/khu vực | Trách nhiệm |
|---|---|---|
| Dữ liệu | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Bản dịch cho 38 ngôn ngữ, thông báo chẩn đoán được bản địa hóa, gắn cờ SVG và tên ngôn ngữ. |
| Cấu hình | `CONFIG` , `DEFAULTS` | Các hằng số (bộ chọn, giới hạn thử lại, giá trị đặt trước, phần) và cài đặt mặc định. |
| Lưu trữ | `sanitizeSettings` , `Store` , `persist` | Xác thực và lưu cài đặt trong `localStorage` ; giữ một ngăn xếp hoàn tác trong bộ nhớ. |
| Logic của người chơi | `PlayerSync` | Tìm video, khôi phục chất lượng, âm lượng, tốc độ và chế độ im lặng, theo dõi tình trạng treo. |
| Người trợ giúp trang | `Extras` | Các nút bố trí, nhận phần thưởng, hình đại diện kênh và bộ lập lịch nền. |
| Giao diện | `PAGES` , `GUI` , người trợ giúp | Bảng điều khiển Shadow-DOM, thông báo, âm thanh, nút yêu cầu nhanh nổi, phím nóng. |

Luồng dữ liệu: vòng lặp `PlayerSync.sync` 1,5 giây đọc cài đặt hiệu quả (cấu hình kênh trước, sau đó là chung), áp dụng chúng cho trình phát và gọi `Extras.tick` . Hành động của người dùng đi qua trình xử lý `GUI` , cập nhật cài đặt `persist` và chỉ đẩy phần bị ảnh hưởng tới trình phát ( `media` hoặc `all` ).

<a id="user-facing-behavior"></a>
## Hành vi hướng tới người dùng

| Khu vực | Hành vi |
|---|---|
| Sự kiên trì của người chơi | Lưu chất lượng, âm lượng, trạng thái tắt tiếng, chế độ im lặng và tốc độ trực tiếp/VOD, sau đó áp dụng chúng khi phát hiện luồng mới. Những thay đổi do trang tự thực hiện (ví dụ: Kick đặt lại âm lượng về 50%) sẽ được hoàn nguyên; chỉ hành động của chính người xem mới cập nhật các giá trị đã lưu. |
| Chất lượng | Chọn chất lượng ưu tiên thông qua menu trình phát, quay lại chất lượng thấp hơn tiếp theo (hoặc Tự động) khi không khả dụng và đóng menu lại. Chỉ những cú nhấp chuột thực sự của người dùng mới mang lại cho tập lệnh chất lượng mới "được sử dụng lần cuối". |
| Phát lại âm lượng và im lặng | Âm lượng và tắt tiếng được khôi phục trên mỗi luồng. Tính năng phát lại im lặng định tuyến video thông qua công cụ Web Audio ở mức tăng 0, do đó luồng tiếp tục phát trong tab nền mà không bị tắt tiếng. |
| Hồ sơ kênh | **Lưu kênh này** lưu trữ chất lượng, âm lượng, tốc độ và âm thanh hiện tại của kênh đang xem. Hồ sơ cũng chứa các ghi chú, nhóm, trạng thái ghim, hình đại diện và các cờ được bật/loại trừ. |
| Cài đặt trước | Tiết kiệm băng thông, Chất lượng tốt nhất, Xem yên tĩnh và áp dụng VOD chỉ bằng một cú nhấp chuột. |
| Bảng điều khiển | `F2` hoặc phím nóng tùy chỉnh sẽ mở bảng điều khiển có chiều rộng cố định (680 px) với thanh bên được nhóm, tìm kiếm, kiểu Kick và Minimal, chủ đề sáng/tối, 14 màu nhấn cộng với bộ chọn màu, bố cục nhỏ gọn, làm mờ phông nền, chia tỷ lệ văn bản, độ tương phản cao và điều khiển hoạt ảnh. |
| Tìm kiếm | Không phân biệt trọng âm, khớp với ngôn ngữ giao diện và tên tiếng Anh, đồng thời khớp với tiêu đề phần hoặc thẻ. Tổ hợp phím gõ vào bảng điều khiển không bao giờ chạm tới phím nóng của Kick. |
| Thanh trượt | Mọi thanh trượt đều phản ứng với các lần nhấp, kéo, mũi tên trên bàn phím và con lăn chuột. |
| Âm thanh | Các tín hiệu Âm thanh trên Web cho các hành động trên menu, thay đổi cài đặt, thành công/thất bại về chất lượng và khôi phục âm lượng, mỗi tín hiệu đều có một nút chuyển, xem trước và âm lượng. |
| Thông báo | Tin nhắn được bản địa hóa có thể được kéo, thu nhỏ, làm trong suốt, tắt tiếng (không làm phiền, tắt tiếng toàn màn hình) và ghi lại trong lịch sử. |
| Báo động đóng băng | Phát hiện trình phát bị treo hoặc màn hình đen, phát âm báo lớn (ngay cả trong tab ẩn, không phụ thuộc vào nút chuyển hiệu ứng âm thanh) và hiển thị thông báo. |
| Phần thưởng | Tự động yêu cầu tùy chọn chờ thông báo phần thưởng của Kick (hoặc chạy theo lịch), mở cửa sổ phần thưởng, yêu cầu những gì có sẵn và đóng nó. Nút xác nhận nhanh nổi, có thể kéo và thực hiện tương tự chỉ bằng một cú nhấp chuột. |
| Bố cục | Ẩn cuộc trò chuyện và thu gọn menu bên trái khỏi bảng điều khiển hoặc bằng phím nóng, tùy ý ghi nhớ lựa chọn cho mỗi luồng. |
| Công cụ | Hẹn giờ ngủ, xem tiêu điểm (toàn màn hình), đồng bộ lại trình phát và chế độ an toàn tạm dừng mọi thay đổi tự động. |
| Chẩn đoán | Trạng thái trực tiếp, chất lượng được phát hiện, độ phân giải video, quét chất lượng, kiểm tra xung đột, nhật ký hành động và báo cáo có thể sao chép. |
| Dữ liệu | Xuất/nhập cài đặt, hoàn tác, khôi phục sau khi đặt lại, sao lưu/khôi phục các kênh đã lưu. |
| Quyền riêng tư | Cài đặt, hồ sơ, nhật ký và lịch sử vẫn được lưu trong bộ nhớ của trình duyệt. Không có gì được gửi đi bất cứ đâu. |

<a id="settings-reference"></a>
## Tham chiếu cài đặt

Tất cả các giá trị được xác thực `sanitizeSettings` ; bất cứ điều gì không hợp lệ sẽ trở về mặc định. Phạm vi được thực thi.

### Người chơi

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Tự động áp dụng chất lượng ưa thích. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Chất lượng để áp dụng cho các buổi phát trực tiếp và VOD. `auto` có nghĩa là "hãy nhớ lựa chọn cuối cùng của tôi". |
| `lastLiveQuality` , `lastVodQuality` | giống nhau | `auto` | Chất lượng cuối cùng được người xem chọn lọc bằng tay. |
| `qualityFallback` | `lower` , `auto` | `lower` | Phải làm gì khi chất lượng ưa thích không được cung cấp. |
| `autoVolumeEnabled` | boolean | `true` | Khôi phục và bảo vệ âm lượng đã lưu. |
| `volume` | 0–1 | `1` | Khối lượng đã lưu. |
| `muted` | boolean | `false` | Đã lưu trạng thái tắt tiếng. |
| `silent` | boolean | `false` | Phát lại im lặng (biểu đồ âm thanh không tăng, trình phát không bị tắt tiếng). |
| `playbackRate` | 0,25–2,5 | `1` | Tốc độ đã lưu; `1` không bao giờ bị ép buộc. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, bước 5 | `true` ; `85` | Cảnh báo âm lượng lớn. |
| `safeMode` | boolean | `false` | Tạm dừng mọi thay đổi tự động. |
| `channelProfiles` | đối tượng, lên tới 200 | `{}` | Hồ sơ trên mỗi kênh (xem bên dưới). |

Các trường hồ sơ kênh: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (chỉ `https://…kick.com/images/user/…` URL), `note` (240 ký tự), `group` (40 ký tự), `updatedAt` , `lastUsed` .

### Thông báo và âm thanh

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Hiển thị thông báo kết quả. |
| `doNotDisturb` , `quietFullscreen` màn hình | boolean | `false` , `true` | Loại bỏ thông báo và âm thanh hoặc chỉ ở chế độ toàn màn hình. |
| `notificationScale` | 0,8–1,4 | `1` | Kích thước thông báo |
| `notificationDuration` | 1500–12000 mili giây, bước 500 | `3500` | Thông báo tồn tại trong bao lâu. |
| `notificationOpacity` | 0,35–1 | `0.95` | Thông báo minh bạch. |
| `notificationShowIcon` | boolean | `true` | Hiển thị biểu tượng trạng thái. |
| `notificationPosition` | `{x, y}` hoặc `null` | `null` | Vị trí kéo. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; lên tới 30 mục | `true` ; `[]` | Lịch sử của thông báo. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Công tắc chính và âm lượng. |
| `soundEvents` , `soundEventVolumes` | mỗi sự kiện: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | tất cả trên ; `0.35` | Chuyển đổi và âm lượng theo sự kiện. |

### Ngoại hình, chuyển động và phím tắt

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Chủ đề màu sắc. |
| `panelStyle` | `kick` , `minimal` | `kick` | Phong cách trực quan của bảng điều khiển. |
| `accentColor` | `#rrggbb` | `#53fc18` | Màu nhấn. |
| `compactMode` , `highContrast` | boolean | `false` | Mật độ và độ tương phản. |
| `backdropBlur` | 0–12 pixel | `6` | Làm mờ nền phía sau bảng điều khiển (hoạt động ở cả hai kiểu). |
| `textScale` | 0,9–1,3 | `1` | Kích thước văn bản. |
| `language` , `languageChosen` | mã địa phương; boolean | ngôn ngữ trình duyệt; `false` | Giao diện tuân theo ngôn ngữ trình duyệt cho đến khi ngôn ngữ được chọn, sau đó lựa chọn được ghi nhớ. |
| `panelPosition` | `{x, y}` hoặc `null` | `null` | Vị trí bảng điều khiển được kéo. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Tốc độ hoạt hình. |
| `openEffect` | `none` , `fade` , `slide` , chia `scale` , `pop` | `scale` | Hiệu ứng đóng/mở bảng điều khiển. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Hiệu ứng di chuột. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Hoạt hình logo/chỉ báo. |
| `iconAnimations` | boolean | `true` | Làm sinh động các biểu tượng thanh bên, đặt lại và trợ giúp. |
| `hotkey` | chuỗi kết hợp | `F2` | Mở hoặc đóng bảng điều khiển. |
| `actionHotkeys` | chuỗi kết hợp | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Chuyển đổi thông báo, chế độ xem tập trung, đặt lại chất lượng, khôi phục âm lượng, chuyển đổi trò chuyện, chuyển đổi menu bên trái. |

Tổ hợp phím được lưu trữ dưới dạng chuỗi chẳng hạn như `Alt+Q` và được khớp bằng phím vật lý để chúng hoạt động trên mọi bố cục bàn phím. Cài đặt từ các phiên bản cũ hơn bằng phím nóng hình đối tượng sẽ được chuyển đổi tự động. Chiều rộng của bảng được cố định ở 680 px (giới hạn ở kích thước cửa sổ); cài đặt chiều rộng trước đây bị bỏ qua.

### Công cụ

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Hãy thử `play()` khi phát hiện thấy tình trạng đóng băng. |
| `freezeAlertEnabled` , `freezeSound` | boolean | `true` | Đóng băng thông báo và âm thanh báo động. |
| `freezeSeconds` | 5–60, bước 5 | `10` | Vài giây không có tiến triển trước khi có báo động. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolean | `false` | Bố cục được ghi nhớ, được áp dụng một lần trên mỗi trang. |
| `autoClaimRewards` | boolean | `false` | Cho phép nhận phần thưởng tự động. |
| `claimMode` | `notify` , `interval` | `notify` | Yêu cầu khi Kick hiển thị thông báo hoặc theo lịch trình. |
| `claimDelaySec` | 0–120, bước 5 | `5` | Đợi sau khi thông báo xuất hiện (chế độ thông báo). |
| `claimIntervalMin` | 5–120, bước 5 | `10` | Phút giữa các lần kiểm tra (chế độ theo lịch trình). |

### Nút yêu cầu nhanh

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Hiển thị nút nổi. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Thiết kế nút. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Biểu tượng tích hợp hoặc hình ảnh của chính người dùng. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , tối đa 90.000 ký tự | trống | Bản sao được mã hóa lại của hình ảnh đã tải lên. Bất cứ điều gì khác đều bị từ chối. |
| `claimWidgetImageFill` | boolean | `false` | Để hình ảnh tùy chỉnh lấp đầy toàn bộ nút (không được thiết kế viên thuốc sử dụng). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Kích thước nút. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Độ mờ của nút (độ mờ hoàn toàn khi có phần thưởng). |
| `claimWidgetAutoHide` | boolean | `false` | Chỉ hiển thị nút khi có phần thưởng. |
| `claimWidgetPos` | `{x, y}` hoặc `null` | `null` | Vị trí kéo. |

### Chẩn đoán và trạng thái

| Chìa khóa | Loại / phạm vi | Mặc định | Ý nghĩa |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; lên tới 60 mục | `true` ; `[]` | Nhật ký hành động. |
| `activeSection` | id phần | `playback` | Trang được mở lần cuối. |
| `resetBackup` | đối tượng cài đặt | `null` | Ảnh chụp nhanh trước khi đặt lại hoặc nhập. |

<a id="core-utilities"></a>
## Tiện ích cốt lõi

| Chức năng | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `detectLanguage` | — → ngôn ngữ | Đi `navigator.languages` ​​, ánh xạ các biến thể khu vực ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) và trả về ngôn ngữ được hỗ trợ đầu tiên hoặc `en` . |
| `dictFor` | lang → từ điển | Trả về bảng dịch cho một ngôn ngữ, quay lại ngôn ngữ cơ sở và sau đó là tiếng Anh. |
| `t` / `T` | lang, key, vars → chuỗi | Giải quyết một khóa bằng sự thay thế `{placeholder}` ; `T` sử dụng ngôn ngữ hiện tại. |
| `diagText` | chỉ số, chất lượng → chuỗi | Trả về một trong các câu chẩn đoán đã bản địa hóa. |
| `log` | …args → void | Ghi nhật ký bảng điều khiển bằng tiền tố tập lệnh. |
| `clamp` , `sleep` , `esc` | giá trị → giá trị | Giới hạn phạm vi, độ trễ dựa trên lời hứa và thoát HTML. |
| `normalizeQuality` | văn bản → chuỗi | Viết thường nhãn chất lượng và loại bỏ khoảng trắng. |
| `debounce` | fn, đợi → hàm | Gỡ lỗi theo sau bằng phương pháp `flush` . |
| `onLocationChange` | gọi lại → void | Phát hiện điều hướng một trang bằng cách gói `pushState` / `replaceState` , nghe `popstate` và thăm dò ý kiến ​​​​một lần mỗi giây. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | sự kiện → chuỗi/boolean | Xây dựng và so sánh các tổ hợp phím từ mã phím vật lý. |
| `mkPointer` | loại, phụ → sự kiện | Tạo `PointerEvent` (hoặc `MouseEvent` khi không khả dụng) được sử dụng để điều khiển các menu ARIA của Kick. |
| `waitFor` | thăm dò, hết thời gian, bước → giá trị/null | Thăm dò cho đến khi thăm dò trả về giá trị hoặc hết thời gian chờ. |
| `imageToDataUrl` | hình ảnh → chuỗi | Chia tỷ lệ hình ảnh thành khung vẽ hình vuông (giữ tỷ lệ, `willReadFrequently` ), thử 128, 96 và 64 px và trả về URL dữ liệu PNG không lớn hơn 70.000 ký tự. |

<a id="settings-storage"></a>
## Lưu trữ cài đặt

| Chức năng | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `sanitizeProfiles` | vật → vật | Giữ tối đa 200 hồ sơ với các khóa và kẹp hợp lệ ở mọi trường; hình đại diện phải là URL hình ảnh Kick. |
| `sanitizeSettings` | đối tượng, withBackup → đối tượng | Xác thực mọi cài đặt (loại, phạm vi, giá trị được phép), di chuyển cài đặt 1,1–1,3 (chất lượng cũ, phím nóng, hoạt ảnh và phím phần) và áp dụng quy tắc ngôn ngữ. |
| `legacyHotkey` | giá trị → chuỗi | Chuyển đổi một phím nóng hình đối tượng thành một chuỗi tổ hợp. |
| `Store.load` / `Store.save` | — / cài đặt → cài đặt/void | Đọc và ghi đối tượng đã được lọc trong `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | vá, `{undo}` → void | Hợp nhất một bản vá, dọn dẹp, lưu với một lần gỡ lỗi ngắn và tùy chọn đẩy một ảnh chụp nhanh hoàn tác (chỉ được lưu trong bộ nhớ, tối đa 15). |
| người nghe `storage` | sự kiện → vô hiệu | Tải lại cài đặt khi một tab Kick khác thay đổi chúng, do đó các tab không bao giờ ghi đè lên nhau. |

<a id="player-synchronization-playersync"></a>
## Đồng bộ hóa trình phát ( `PlayerSync` )

### Người trợ giúp kênh và hồ sơ

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `isVod` | — → boolean | Phát hiện trang VOD từ URL. |
| `channelKey` | — → chuỗi | Xây dựng khóa `channel:slug` ổn định (hoặc `vod:id` , `kick:home` ), lưu kết quả vào bộ nhớ đệm trong ba giây. Trên các trang VOD, liên kết kênh gần trình phát nhất sẽ được sử dụng. |
| `channelSlug` | — → chuỗi | Trả về phần sên của khóa kênh. |
| `profile` | khóa → đối tượng/null | Đọc hồ sơ đã lưu. |
| `profileActive` | — → đối tượng/null | Chỉ trả về cấu hình hiện tại khi nó được bật và không bị loại trừ. |
| `isExcluded` | — → boolean | Kiểm tra xem kênh này có bị tắt tính năng tự động hóa hay không. |
| `updateProfile` | bản vá, khóa → void | Tạo hoặc hợp nhất một hồ sơ và đóng `updatedAt` . |
| `saveCurrentChannel` | — → đối tượng/null | Lưu trữ chất lượng, âm lượng, tắt tiếng, tốc độ và trạng thái im lặng hiện tại của người xem dưới dạng hồ sơ đã bật và quét trang để tìm hình đại diện của kênh. |
| `effective` | — → đối tượng | Giải quyết âm lượng, tắt tiếng, im lặng, tốc độ và chất lượng trực tiếp/VOD từ cấu hình hoạt động hoặc cài đặt chung. |
| `setStatus` | trạng thái, kết quả → void | Cập nhật trạng thái và mã kết quả cuối cùng được hiển thị trong tiêu đề và chẩn đoán. |

### Tìm và điều khiển người chơi của Kick

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `findMainVideo` | — → video/null | Chọn `<video>` hiển thị lớn nhất. |
| `streamKey` | — → chuỗi | Trả về đường dẫn trang được sử dụng để áp dụng chất lượng một lần cho mỗi luồng. |
| `isAccountButton` | nút → boolean | Từ chối các nút tiêu đề, hình đại diện và tài khoản. |
| `findSettingsButton` | video → nút/null | Tìm nút bánh răng của trình phát theo nhãn hoặc theo vị trí gần góc dưới bên phải của video. |
| `revealControls` | video → vô hiệu | Gửi các sự kiện di chuột để các điều khiển ẩn xuất hiện. |
| `simulateClick` | phần tử → khoảng trống | Gửi chuỗi sự kiện con trỏ đầy đủ mà menu của Kick cần. |
| `menuItems` | — → phần tử[] | Liệt kê các mục `menuitemradio` hiển thị. |
| `openQualityMenu` | — → nút/null | Mở menu bánh răng, bước vào mục nhập chất lượng khi menu cấp cao nhất xuất hiện và chờ các tùy chọn. |
| `closeMenu` | nút → Lời hứa | Chỉ đóng menu nếu nó vẫn mở (một cú nhấp chuột thứ hai mù quáng có thể mở lại nó), với dự phòng Escape. |
| `readMenu` | — → phần tử[] | Ghi lại những phẩm chất được cung cấp và những phẩm chất được kiểm tra. |
| `scanQualities` | — → Lời hứa<boolean> | Mở menu, ghi lại các chất lượng có sẵn và đóng nó lại (được sử dụng bởi chẩn đoán). |
| `activate` | mục → Lời hứa | Nhấp vào một tùy chọn và đợi cho đến khi nó được chọn. |
| `selectQuality` | mong muốn, dự phòng → Promise | Chọn chất lượng được yêu cầu, nếu không thì chọn chất lượng thấp hơn tiếp theo hoặc Tự động. |
| `desiredQuality` | — → chuỗi | Chọn chất lượng để áp dụng từ hồ sơ, tùy chọn hoặc lựa chọn thủ công cuối cùng. |
| `applyQualityOnce` | StreamKey → Lời hứa | Áp dụng chất lượng mong muốn một lần cho mỗi luồng, đóng menu và thông báo thành công hay thất bại. |
| `watchManualQuality` | — → vô hiệu | Tìm hiểu chất lượng mới "được sử dụng lần cuối" chỉ từ các nhấp chuột chính hãng (đáng tin cậy), do đó, các nhấp chuột và dự phòng tự động không bao giờ ghi đè các giá trị đã lưu. |

### Âm lượng, chế độ im lặng, tốc độ và giám sát

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `applyVolume` | video, yên tĩnh → vô hiệu | Ghi âm lượng hiệu dụng và trạng thái tắt tiếng (được đánh dấu là thay đổi của chính tập lệnh). |
| `trackInput` | — → vô hiệu | Ghi lại thời gian của lần nhập con trỏ, bánh xe, cảm ứng hoặc bàn phím đáng tin cậy cuối cùng. |
| `reassertVolume` | video → vô hiệu | Khôi phục âm lượng đã lưu khi trang thay đổi nó mà không cần bất kỳ thao tác nhập nào của người dùng (tốc độ giới hạn ở 8 lần hoàn nguyên trong 10 giây). |
| `watchVolume` | video → vô hiệu | Lắng nghe `volumechange` : các thay đổi do người dùng thực hiện được lưu, các thay đổi do trang điều khiển được hoàn nguyên. |
| `checkLoud` | âm lượng, tắt tiếng → void | Cảnh báo một lần khi âm lượng vượt ngưỡng. |
| `buildGraph` | video → đồ thị/null | Nối video vào `AudioContext` thông qua nút khuếch đại; báo cáo khi trang web không cho phép. |
| `applySilent` | video → vô hiệu | Đặt mức tăng thành 0 để phát lại im lặng hoặc quay lại 1, tiếp tục ngữ cảnh khi cần. |
| `applyRate` | video, lực → vô hiệu | Đặt tốc độ đã lưu; `1` không bị ép buộc trừ khi người xem tự chọn nó, vì vậy khả năng bắt kịp trực tiếp của Kick được tôn trọng. |
| `applyMedia` | video, `{rate}` → void | Áp dụng lại âm lượng, chế độ im lặng và tốc độ tùy chọn mà không ảnh hưởng đến chất lượng. |
| `monitorFreeze` | video → vô hiệu | Phát hiện trình phát bị treo (thời gian bị kẹt) hoặc màn hình đen (thời gian di chuyển mà không có khung được giải mã) và kích hoạt cảnh báo cũng như khôi phục tùy chọn. Hoạt động trong các tab ẩn. |

### Vòng lặp và vòng đời

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `sync` | — → Hứa | Vòng lặp chính: giám sát tình trạng treo, liên kết người nghe, áp dụng chế độ im lặng, âm lượng, tốc độ và chất lượng, tôn trọng chế độ an toàn và loại trừ, sau đó gọi `Extras.tick` . |
| `resync` | — → Hứa | Buộc một đường chuyền mới (được sử dụng bởi các cài đặt trước, hành động nhanh và thay đổi chất lượng). |
| `init` | — → vô hiệu | Bắt đầu đồng bộ hóa đầu tiên, trình nghe điều hướng và khoảng thời gian 1,5 giây. |

<a id="page-extras-extras"></a>
## Phần bổ sung của trang ( `Extras` )

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `root` , `layoutState` | — → phần tử / `{chat, sidebar}` | Đọc trạng thái bố cục của Kick từ `data-chat` và `data-sidebar` trên vùng chứa trang. |
| `isDesktop` | — → boolean | Tự động hóa bố cục chỉ chạy ở độ rộng của màn hình. |
| `click` | phần tử → boolean | Nhấp chuột thông qua `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → nút/null | Xác định vị trí nút thu gọn bên trong phòng chat và nút "hiển thị trò chuyện" (theo biểu tượng, không phải theo ngôn ngữ). |
| `setChat` , `setSidebar` | hiển thị → boolean | Đưa cuộc trò chuyện hoặc menu bên trái về trạng thái được yêu cầu bằng cách nhấn các nút riêng của Kick. |
| `applyLayout` | — → vô hiệu | Áp dụng bố cục đã ghi nhớ một lần trên mỗi trang, không bao giờ chống lại các thay đổi thủ công. |
| `isTyping` | — → boolean | Đúng khi người xem đang nhập vào một trường; yêu cầu tự động chờ đợi. |
| `rewardTrigger` , `popoverCard` | — → nút/null | Tìm nút quà tặng và thẻ bật lên phần thưởng. |
| `rewardAvailable` | — → boolean | Phát hiện tín hiệu "có sẵn phần thưởng" của Kick (lời kêu gọi hành động hoạt hình). |
| `isEnabled` | nút → boolean | Hiển thị và không bị vô hiệu hóa. |
| `claimDrops` | — → Lời hứa<number> | Nhấn nút xác nhận đã bật cho những lần rơi hoàn thành trong bảng phần thưởng. |
| `claimDaily` | kích hoạt → Lời hứa<number> | Mở cửa sổ phần thưởng, nhấn từng nút yêu cầu đã bật một lần (không bao giờ nhấn cùng một nút hai lần), sau đó đóng cửa sổ. |
| `claimRewards` | `{manual}` → Lời hứa<number> | Chạy một yêu cầu đầy đủ, báo cáo kết quả và phát âm thanh; chạy thủ công bỏ qua việc gõ và báo cáo khi không có gì để yêu cầu. |
| `normName` | văn bản → chuỗi | Chuẩn hóa tên để khớp ( `_` và dấu cách với `-` ). |
| `findAvatar` | sên → chuỗi | Trả về hình đại diện kênh hiển thị trên trang (được sử dụng trước khi lưu kênh). |
| `scanAvatars` | — → vô hiệu | Lưu trữ hình đại diện cho các kênh đã lưu mà thiếu hình đại diện. |
| `tick` | StreamKey → void | Trình lập lịch được gọi từ `sync` : áp dụng bố cục, quét hình đại diện, chờ thông báo phần thưởng (chế độ thông báo, có độ trễ và thời gian hồi chiêu là hai phút) hoặc kiểm tra khoảng thời gian đã chọn và thăm dò bảng điều khiển thả ra. |

<a id="interface-building-blocks"></a>
## Khối xây dựng giao diện

| Chức năng | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `I` | tên → svg | Biểu tượng nét nội tuyến. |
| `fmtValue` | định dạng, thô → chuỗi | Định dạng giá trị thanh trượt (phần trăm, pixel, giây). |
| `normSearch` , `englishOf` , `searchText` | văn bản → chuỗi | Văn bản tìm kiếm không phân biệt trọng âm bao gồm tên tiếng Anh của nhãn đã dịch. |
| `row` | khóa, nhãn, điều khiển, tùy chọn → html | Một hàng cài đặt; được xếp chồng theo mặc định, chỉ nội tuyến cho các công tắc, với nút chuyển đổi trợ giúp tùy chọn. |
| `sw` , `toggleRow` | … → html | Điều khiển công tắc và hàng công tắc làm sẵn. |
| `chip` , `seg` , `qualityChips` | … → html | Chip, điều khiển phân đoạn và lưới chất lượng. |
| `range` | attr, khóa, tùy chọn → html | Thanh trượt với đường điền và giá trị trực tiếp. |
| `card` , `btn` , `ib` | … → html | Thẻ, nút văn bản và nút biểu tượng. |
| `timeStr` | dấu thời gian → chuỗi | Đồng hồ thời gian cục bộ. |
| `setPref` | khóa, giá trị → void | Ghi tùy chọn người chơi vào hồ sơ kênh đang hoạt động hoặc cài đặt chung. |
| `fxBtn` | khóa, giá trị, nhãn, trên → html | Ô chọn hiệu ứng có hình tượng xem trước nhỏ. |
| `avatarHtml` | tên, url → html | Hình đại diện với một chữ cái dự phòng; một hình ảnh bị lỗi sẽ bị xóa. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → giá trị | Xây dựng đánh dấu nút xác nhận nhanh cho cả nút trực tiếp và bản xem trước cài đặt. |

<a id="settings-pages-pages"></a>
## Trang cài đặt ( `PAGES` )

| Trang | Nội dung |
|---|---|
| `playback` | Gợi ý lưu kênh này, cài đặt trước, chất lượng (tự động áp dụng, trực tiếp, VOD, dự phòng), âm lượng (tự động áp dụng, thanh trượt, tắt tiếng, phát lại im lặng, cảnh báo lớn) và tốc độ. |
| `channels` | Các bước cách hoạt động, kênh hiện tại bằng nút **Lưu kênh này** , tạm dừng/loại trừ các công tắc và trình chỉnh sửa, sau đó là danh sách kênh đã lưu (tìm kiếm, sắp xếp, ghim bộ lọc, nhóm, Chỉnh sửa/Xong, xóa) cùng với bản sao lưu và khôi phục. |
| `tools` | Hẹn giờ ngủ, bố cục trang, phần thưởng (tự động xác nhận, chế độ, độ trễ hoặc khoảng thời gian, Xác nhận ngay), cài đặt nút xác nhận nhanh với bản xem trước trực tiếp, cảnh báo đóng băng và hành động nhanh. |
| `notifications` | Chuyển đổi, kích thước, thời lượng, độ mờ, xem trước, đặt lại vị trí và lịch sử. |
| `sounds` | Chuyển đổi và âm lượng chính, chuyển đổi theo sự kiện, âm lượng và bản xem trước. |
| `appearance` | Chủ đề, phong cách, màu nhấn, mật độ, độ tương phản, kích thước văn bản, độ mờ, căn giữa và ngôn ngữ. |
| `motion` | Xem trước trực tiếp, cài đặt trước và bộ chọn cho hiệu ứng mở, hiệu ứng di chuột, chỉ báo, tốc độ và hoạt ảnh biểu tượng. |
| `shortcuts` | Phím nóng menu và phím nóng hành động có chức năng đảo ngược. |
| `diagnostics` | Trạng thái, quét, báo cáo, kiểm tra chất lượng và xung đột, chế độ an toàn và nhật ký hành động. |
| `about` | Phiên bản, liên kết, xuất/nhập, hoàn tác, khôi phục và đặt lại. |

<a id="panel-controller-gui"></a>
## Bộ điều khiển bảng ( `GUI` )

### Xây dựng và dựng hình

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `build` | — → vô hiệu | Tạo máy chủ Shadow-DOM, bảng điều khiển, vùng báo cáo và vùng trực tiếp, sau đó kết nối các sự kiện. |
| `applyLook` | — → vô hiệu | Áp dụng chủ đề, kiểu, giọng, độ mờ, tỷ lệ văn bản, hiệu ứng, thuộc tính ngôn ngữ và cài đặt bánh mì nướng làm thuộc tính và biến CSS. |
| `renderChrome` | — → vô hiệu | Hiển thị tiêu đề, phần giữ chỗ tìm kiếm, nút tạm dừng, gợi ý chân trang và nút xác nhận nhanh. |
| `renderNav` | — → vô hiệu | Hiển thị thanh bên được nhóm. |
| `renderPage` | tùy chọn → vô hiệu | Hiển thị trang đang hoạt động (hoặc tất cả các trang trong khi tìm kiếm), duy trì tiêu điểm cuộn và bàn phím. |
| `filterRows` | — → vô hiệu | Áp dụng bộ lọc tìm kiếm cho hàng, thẻ và trang. |
| `channelEditor` | khóa, hồ sơ → html | Trình chỉnh sửa cho một hồ sơ kênh. |
| `refreshAll` , `onExternalChange` | — → vô hiệu | Kết xuất lại mọi thứ sau khi đặt lại, nhập, hoàn tác hoặc thay đổi từ tab khác. |

### Thay đổi sự kiện và cài đặt

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `wire` | — → vô hiệu | Đính kèm các trình xử lý nhấp chuột, nhập liệu, thay đổi, bánh xe và cuộn được ủy quyền cũng như thao tác kéo bảng. |
| `onClick` , `onInput` , `onChange` | sự kiện → vô hiệu | Gửi các nhấp chuột, di chuyển thanh trượt và chỉnh sửa văn bản đối với cài đặt, cấu hình hoặc hành động. |
| `applyRange` | khóa, giá trị → void | Áp dụng giá trị thanh trượt (âm lượng, độ mờ, độ mờ, thời lượng…). |
| `setSetting` , `setChannel` | khóa/bản vá → void | Lưu cài đặt hoặc thay đổi cấu hình và đẩy phần bị ảnh hưởng đến trình phát. |
| `pushToPlayer` | phạm vi, khóa → void | `media` áp dụng lại âm lượng, chế độ im lặng và tốc độ; `all` cũng được áp dụng lại chất lượng. Âm lượng, tắt tiếng, chế độ im lặng và tốc độ không bao giờ mở lại menu chất lượng. |
| `act` | tên, phần tử → Lời hứa | Chạy các hành động được đặt tên: cài đặt trước, lưu và xóa kênh, sao lưu, nhập/xuất, xác nhận quyền sở hữu, hẹn giờ ngủ, phím tắt, chẩn đoán, v.v. |
| `resetSection` | id → vô hiệu | Khôi phục mặc định của một phần. |
| `restoreVolume` | — → vô hiệu | Áp dụng lại âm lượng đã lưu. |
| `toggleLayout` | cái nào → vô hiệu | Ẩn hoặc hiển thị cuộc trò chuyện hoặc menu bên trái và ghi nhớ lựa chọn. |
| `confirm` , `closeModal` | tin nhắn, tùy chọn / kết quả → Promise/void | Hộp thoại xác nhận trong bảng điều khiển (giống hệt nhau trong mọi trình duyệt). |
| `download` , `pickFile` , `pickImage` | … → vô hiệu | Lưu JSON, đọc JSON và chọn hình ảnh cho nút xác nhận nhanh. |
| `startCapture` , `finishCapture` | id/combo → void | Rebind một phím nóng, từ chối trùng lặp. |
| `replayMock` | — → vô hiệu | Phát lại hiệu ứng mở trong bản xem trước hoạt ảnh. |

### Công cụ và chẩn đoán

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | phút / — → vô hiệu | Bắt đầu, hủy và hiển thị bộ hẹn giờ ngủ (nó tạm dừng video ở cuối). |
| `toggleFocusView` | — → Hứa | Vào hoặc rời khỏi chế độ toàn màn hình trên vùng chứa trình phát. |
| `statusText` , `resultText` , `syncDiagnostics` | — → chuỗi/void | Trạng thái bản địa hóa cho tiêu đề và trang chẩn đoán. |
| `record` | tin nhắn, cấp độ → void | Thêm mục nhập có dấu thời gian vào nhật ký hành động. |
| `copyDiagnostics` | — → Hứa | Sao chép một báo cáo ngắn (phiên bản, trạng thái, chất lượng, loại trang, tác nhân người dùng). |
| `checkQuality` , `checkConflicts` | — → Hứa/vô hiệu | Xác minh chất lượng ưu tiên được cung cấp và liệt kê các cài đặt hoạt động tương hỗ với nhau. |

### Nút yêu cầu nhanh

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `renderClaimWidget` | — → vô hiệu | Tạo, cập nhật hoặc xóa nút nổi và bắt đầu cuộc thăm dò trạng thái một giây của nó. |
| `syncClaimWidget` | — → vô hiệu | Hiển thị vòng và dấu chấm "có phần thưởng", trạng thái bận và quy tắc tự động ẩn. |
| `placeClaimWidget` | — → vô hiệu | Định vị nút, kẹp nó vào cửa sổ. |
| `wireClaimWidget` | phần tử → khoảng trống | Kéo có ngưỡng 5 pixel (một lần kéo không bao giờ được tính là một lần nhấp), lưu vị trí và lần nhấp chạy xác nhận quyền sở hữu thủ công. |

### Thông báo, âm thanh và hoạt động của bảng điều khiển

| Phương pháp | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `notify` | tin nhắn, loại, thời lượng, lực lượng → void | Hiển thị nâng ly chúc mừng (trừ khi bị chặn), ghi lại lịch sử và thông báo văn bản trong một vùng trực tiếp. |
| `notifyQuality` | áp dụng, chất lượng → vô hiệu | Phát âm thanh kết quả, ghi nhật ký và hiển thị thông báo được bản địa hóa. |
| `initToastPosition` , `wireToastDrag` | — → vô hiệu | Khôi phục và lưu vị trí bánh mì nướng đã kéo. |
| `onAvatars` | — → vô hiệu | Làm mới các trang hiển thị hình đại diện. |
| `ensureAudio` Audio | — → bối cảnh | Tạo và tiếp tục `AudioContext` được chia sẻ (được mở khóa bằng cử chỉ đầu tiên của người dùng). |
| `playSound` , `stopSounds` | tên, xem trước → void | Tạo và dừng tín hiệu Web Audio. |
| `playFreezeAlarm` , `alertFrozen` | lực → vô hiệu | Phát báo thức năm nốt và đưa ra thông báo đóng băng. |
| `placePanel` , `wirePanelDrag` | vị trí → vô hiệu | Đặt bảng điều khiển bên trong cửa sổ và làm cho tiêu đề có thể kéo được. |
| `open` , `close` , `toggle` | — → vô hiệu | Kiểm soát âm thanh bảng điều khiển, bỏ phiếu, tiêu điểm và menu. |
| `syncVolumeControls` | — → vô hiệu | Giữ thanh trượt âm lượng đồng bộ với trình phát trong khi bảng điều khiển mở. |

<a id="hotkeys-and-startup"></a>
## Phím nóng và khởi động

| Chức năng | Tham số / trả về | Nó là gì và như thế nào |
|---|---|---|
| `isolateKeys` | — → vô hiệu | Đã đăng ký khi `document-start` trong giai đoạn chụp: các sự kiện bàn phím xuất phát từ bên trong bảng điều khiển sẽ ngừng truyền tới Kick (vì vậy Space, F, M và các mũi tên không bao giờ kích hoạt các phím nóng của người chơi) và Tab bị kẹt bên trong hộp thoại. |
| `setupHotkeys` | — → vô hiệu | Xử lý tính năng chụp phím để đóng lại, Escape (phương thức, thả xuống, bảng điều khiển), phím nóng menu và phím nóng hành động; các tổ hợp có phím bổ trợ hoặc phím F hoạt động ngay cả khi đang gõ. |
| `init` | — → vô hiệu | Xây dựng bảng điều khiển, cài đặt phím nóng và khởi động `PlayerSync` ; được bảo vệ khỏi việc tiêm hai lần. |

<a id="kick-page-dependencies"></a>
## Phụ thuộc vào trang Kick

Kịch bản dựa trên đánh dấu hiện tại của Kick. Bất cứ khi nào có thể, nó sử dụng các biểu tượng, thuộc tính và cấu trúc thay vì văn bản hiển thị, để nó tiếp tục hoạt động ở mọi ngôn ngữ giao diện. Nếu Kick thay đổi những điều này, tính năng khớp sẽ ngừng hoạt động (phần còn lại vẫn tiếp tục chạy).

| Tính năng | Nó tìm kiếm cái gì |
|---|---|
| Chất lượng | Các mục nhập `<video>` , `button[aria-haspopup="menu"]` và `[role="menuitemradio"]` của trình phát hiển thị. |
| Bố cục | Một vùng chứa có `data-sidebar` và `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , nút biểu tượng `CollapseRight` bên trong `#channel-chatroom` và nút biểu tượng `MessagesOutline` để hiển thị cuộc trò chuyện. |
| Thông báo phần thưởng | `video` có nguồn chứa `reward-available` hoặc thẻ `[role="group"]` chứa video `daily-rewards` . |
| Yêu cầu phần thưởng | Một `button[aria-haspopup="dialog"][aria-controls]` (biểu tượng quà tặng), hộp thoại mà nó điều khiển ( `data-state` ), bật các nút xác nhận có phần con `.contents` và một nút đóng có nhãn `.sr-only` . |
| Giọt | `#rewards-panel` liệt kê các mục có `[role="progressbar"][data-state="complete"]` và nút bật. |
| Hình đại diện | Các phần tử `img[alt]` có nguồn là `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Bản địa hóa

Mọi nhãn, thông báo trợ giúp, lỗi, hộp thoại và thông báo đều đi qua trình phân giải bản dịch cho 38 ngôn ngữ. Thiếu phím lại chuyển sang tiếng Anh. Văn bản giao diện mới được dịch sang tất cả các ngôn ngữ được hỗ trợ cùng với tính năng bổ sung nó. Bộ chọn ngôn ngữ hiển thị cờ và tên bản địa; giao diện tuân theo ngôn ngữ trình duyệt trong lần chạy đầu tiên và ghi nhớ một lựa chọn rõ ràng sau đó.

<a id="safety-privacy-and-compatibility"></a>
## An toàn, riêng tư và tương thích

- Cài đặt được vệ sinh trước khi lưu trữ; các giá trị không hợp lệ sẽ trở về giá trị mặc định an toàn.
- Tên kênh, ghi chú, văn bản thông báo và đầu ra chẩn đoán được thoát trước khi chèn HTML.
- Biểu tượng nút tùy chỉnh được mã hóa lại từ khung vẽ và chỉ được lưu trữ dưới dạng URL dữ liệu của loại hình ảnh được phép; nó không bao giờ rời khỏi trình duyệt.
- Shadow DOM giữ phong cách của tập lệnh tách biệt với Kick; các sự kiện bàn phím từ bảng điều khiển được tách biệt khỏi các phím nóng của Kick.
- Hành động tự động bỏ qua các kênh bị loại trừ, chế độ an toàn và các yếu tố trình phát bị thiếu. Việc xác nhận phần thưởng không bao giờ nhấn cùng một nút hai lần trong một lần chạy và chờ trong khi người xem gõ.
- Tập lệnh không đưa ra yêu cầu mạng; các bản cập nhật đến từ trình quản lý userscript hoặc trang Phát hành.
- Cài đặt cục bộ hiện tại được giữ nguyên khi chuyển từ 1.1.0, 1.2.0 và 1.3.0.
