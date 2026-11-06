<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · **Tiếng Việt** · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Tinh chỉnh Kick Stream — Changelog

Ghi chú phát hành cho [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), một bản mô tả người dùng ghi nhớ tùy chọn của người chơi Kick và thêm bảng điều khiển có thể định cấu hình.

## v1.3.1 — 2026-11-06

> Tăng cường bố cục cho mọi ngôn ngữ và kích thước văn bản, một phong cách Tối giản thực sự khác biệt, phần thưởng và công cụ trợ giúp bố cục, cảnh báo tạm dừng người chơi và ngôn ngữ mặc định thông minh hơn.

### Đã thêm

- **Báo động trình phát bị treo.** Phát hiện trình phát bị treo hoặc màn hình đen (thời gian video chuyển động mà không có khung hình được giải mã), phát âm thanh báo động lớn và hiển thị thông báo, ngay cả khi tab được thu nhỏ. Thời gian phát hiện có thể định cấu hình (5–60 giây), chuyển đổi âm thanh độc lập và nút kiểm tra.
- **Tự động nhận phần thưởng** (tắt theo mặc định): mở cửa sổ phần thưởng, nhận những gì có sẵn, đóng lại và quay lại luồng. Những phần thưởng xuất hiện trong bảng phần thưởng cũng được xác nhận. Bao gồm nút *Yêu cầu ngay*.
- **Lịch trình trao thưởng.** Theo mặc định, tập lệnh chờ thông báo "nhận phần thưởng của bạn" của Kick và yêu cầu phần thưởng đó ngay lập tức (với độ trễ tùy chọn 0–60 giây), thay vì bỏ phiếu. Chế độ theo lịch trình (cứ sau 5–60 phút) cũng có sẵn.
- **Nút nhận nhanh.** Một nút nổi nhỏ trên luồng giúp bạn nhận phần thưởng chỉ bằng một cú nhấp chuột. Kéo nó vào bất cứ đâu (vị trí được ghi nhớ), chọn một trong bốn thiết kế (Quả cầu, Viên thuốc, Thủy tinh, Mặt phẳng), năm biểu tượng tích hợp, kích thước và độ mờ, tùy chọn chỉ hiển thị khi có phần thưởng. Nó phát sáng và hiển thị dấu chấm khi thông báo phần thưởng của Kick xuất hiện. Trang cài đặt có bản xem trước trực tiếp.
- **Biểu tượng của riêng bạn.** Tải lên PNG, JPG, WebP, GIF hoặc SVG (tối đa 2 MB) làm biểu tượng nút, tùy ý lấp đầy toàn bộ nút. Hình ảnh được mã hóa lại thành một hình vuông nhỏ và chỉ được lưu trữ trong trình duyệt của bạn.
- **Con lăn chuột trên thanh trượt.** Mọi thanh trượt có thể được điều chỉnh bằng con lăn chuột trong khi di chuột mà không cần cuộn bảng điều khiển.
- **Tham khảo chức năng.** `en_FUNCTIONS.md` mới ghi lại kiến ​​trúc, mọi cài đặt, mọi chức năng và các phần của trang Kick mà tập lệnh phụ thuộc vào.
- **Lưu kênh có hướng dẫn.** Thẻ "Cách các kênh đã lưu hoạt động" từng bước, một nút **Lưu kênh này** lưu trữ chất lượng, âm lượng, tốc độ và âm thanh hiện tại cho kênh bạn đang xem, gợi ý một cú nhấp chuột trong Phát lại cho các kênh chưa lưu, một nút chúc mừng xác nhận, có gắn nhãn *Chỉnh sửa* / *Xong* trong danh sách và một công tắc để tạm dừng các cài đặt đã lưu mà không xóa chúng.
- **Phát lại ở chế độ im lặng.** Tắt tiếng luồng mà không tắt tiếng trình phát, để luồng này tiếp tục phát ở tab nền. Hoạt động trên toàn cầu và trên mỗi kênh đã lưu (thẻ *Im lặng* được hiển thị trong danh sách kênh).
- **Tìm kiếm cài đặt đa ngôn ngữ.** Tìm kiếm không phân biệt trọng âm và cũng khớp với tên tiếng Anh, do đó, việc nhập `volume` sẽ tìm thấy cài đặt bằng bất kỳ ngôn ngữ giao diện nào. Tìm kiếm theo phần hoặc tiêu đề thẻ sẽ hiển thị toàn bộ phần.
- **Điều khiển bố cục trang**: ẩn cuộc trò chuyện và thu gọn menu bên trái khỏi bảng điều khiển hoặc bằng phím nóng (`Alt+C`, `Alt+S`), với tùy chọn ghi nhớ bố cục cho mọi luồng.
- **Hoạt ảnh biểu tượng** cho các biểu tượng thanh bên, đặt lại và trợ giúp, với công tắc riêng (cũng là một phần của cài đặt trước hoạt ảnh).
- **Hình đại diện của kênh** được lấy từ Kick và hiển thị trong danh sách kênh đã lưu.
- 14 màu nhấn (là 6).
- Hộp thoại xác nhận trong bảng trông giống hệt nhau trên mọi trình duyệt.

### Đã thay đổi

- **Ngôn ngữ giao diện** hiện tuân theo ngôn ngữ trình duyệt trong lần chạy đầu tiên. Một khi bạn chọn một ngôn ngữ, nó sẽ được ghi nhớ. Cài đặt được di chuyển từ các phiên bản cũ hơn sẽ tuân theo trình duyệt cho đến khi ngôn ngữ được chọn rõ ràng.
- Tập lệnh bây giờ bắt đầu tại `document-start` để cách ly bàn phím của nó được đăng ký trước trình nghe của chính trang.
- Các hàng cài đặt được xếp chồng lên nhau (nhãn phía trên điều khiển) để văn bản không bao giờ có thể chồng lên nhau hoặc cắt bớt, ở bất kỳ ngôn ngữ, kích thước văn bản hoặc chiều rộng bảng nào. Nhãn thanh bên bao bọc trên ranh giới từ.
- Bộ chọn hoạt ảnh được xây dựng lại thành các hàng có chiều rộng đầy đủ với các biểu tượng để phù hợp với các bản dịch dài.
- Kiểu bảng **Tối thiểu** giờ đây phẳng và vuông không có ánh sáng, các đường viền được thay thế bằng các dải phân cách và lựa chọn kiểu gạch chân, do đó, sự khác biệt so với **Kick** là rõ ràng.
- Bảng điều khiển có chiều rộng cố định là 680 px (nó co lại để vừa với các cửa sổ nhỏ). Cài đặt độ rộng của bảng điều khiển và tay cầm thay đổi kích thước đã bị xóa, do đó bố cục của mọi người đều giống nhau.
- Tiêu đề hoạt ảnh chỉ báo không còn hiển thị "xanh" khi sử dụng màu nhấn khác.

### Đã sửa

- Thay đổi âm lượng, tắt tiếng, phát lại im lặng, âm lượng tự động hoặc tốc độ cũng được áp dụng lại chất lượng (mở lại menu chất lượng và hiển thị thông báo). Những cài đặt đó bây giờ chỉ chạm vào những gì bạn đã thay đổi; chất lượng chỉ được áp dụng lại khi cài đặt chất lượng thay đổi.
- Nhập tìm kiếm cài đặt có thể kích hoạt các phím nóng của Kick (ví dụ: Space đã chuyển luồng sang toàn màn hình). Tổ hợp phím bên trong bảng điều khiển không còn đến được trang.
- Âm lượng ưu tiên đã bị ghi đè khi Kick đặt lại trình phát về mức 50% sau khi tải lại và thanh trượt bảng điều khiển hiển thị 50%. Những thay đổi mà trang tự thực hiện hiện được hoàn nguyên về tập đã lưu của bạn; chỉ có hành động của riêng bạn mới cập nhật nó.
- Cắt và chồng văn bản trong Giao diện, Hoạt ảnh và Phím nóng (nhãn dài, cỡ chữ lớn, bảng hẹp, bản dịch dài).
- Phong cách Tối giản đã âm thầm vô hiệu hóa cài đặt làm mờ hậu cảnh; hiện tại, tính năng làm mờ hoạt động ở cả hai kiểu.
- Thay đổi độ mờ của nút yêu cầu nhanh không cập nhật bản xem trước.
- Thanh trượt không phản ứng với con lăn chuột.
- Các ô hoạt hình ("Scale", "Pop") tràn ngập thẻ của họ.
- Xác nhận xóa hồ sơ sử dụng hộp thoại gốc của trình duyệt.
- Chip hẹn giờ ngủ không được bản địa hóa.
- Các kênh đã lưu không hiển thị hình đại diện và kênh hiện tại không hiển thị hình ảnh nào cho đến khi hồ sơ của kênh đó được lưu.

### Khả năng tương thích

- Các cài đặt hiện có và các kênh đã lưu được giữ nguyên khi cập nhật từ v1.3.0, v1.2.0 và v1.1.0.
- Tập lệnh vẫn không gửi dữ liệu từ xa và không đưa ra yêu cầu mạng nào.

### Liên kết

- [Kho lưu trữ](https://github.com/ebayybe/kick-stream-tweaks)
- [Bản phát hành](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Vấn đề](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Thiết kế lại hoàn toàn, cấu trúc cài đặt hợp lý, hệ thống hoạt ảnh được xây dựng lại và một loạt các bản sửa lỗi về độ tin cậy cho quá trình tự động hóa trình phát.

### Đã thêm

- Bảng điều khiển được thiết kế lại với thanh bên được nhóm: **Trình phát** (Phát lại, Kênh, Công cụ), **Cảnh báo** (Thông báo, Âm thanh), **Giao diện** (Giao diện, Hoạt ảnh, Phím tắt) và **Hệ thống** (Chẩn đoán, Dữ liệu & thông tin).
- Trang **Hoạt ảnh** mới: giai đoạn xem trước trực tiếp, ba cài đặt trước chỉ bằng một cú nhấp chuột (Đầy đủ, Giảm, Tắt) và các bộ chọn riêng biệt cho hiệu ứng mở (Không có, Làm mờ, Trượt, Tỷ lệ, Bật lên), hiệu ứng di chuột, hoạt ảnh chỉ báo và tốc độ.
- Cài đặt trước nhanh để Tiết kiệm băng thông, Chất lượng tốt nhất, Xem yên tĩnh và VOD, được áp dụng ngay lập tức.
- Bộ chọn chất lượng được thiết kế lại dưới dạng lưới chip; tốc độ, tỷ lệ văn bản và bộ hẹn giờ ngủ sử dụng chip và điều khiển được phân đoạn thay vì menu thả xuống.
- Trình quản lý kênh nội tuyến: tìm kiếm, sắp xếp, ghim, nhóm, ghi chú, chỉnh sửa theo kênh và sao lưu/khôi phục toàn bộ, tất cả đều không có hộp thoại lồng nhau.
- Cài đặt âm thanh nội tuyến với nút chuyển đổi, âm lượng và xem trước cho mỗi sự kiện.
- Quét chất lượng trong chẩn đoán: mở menu trình phát, ghi lại các chất lượng có sẵn và đóng lại.
- Phím nóng hiện hoạt động trên mọi bố cục bàn phím (chúng được khớp với phím vật lý).
- Đồng bộ hóa cài đặt giữa các tab Kick đang mở.
- Các mẫu màu nhấn bên cạnh bộ chọn màu tùy chỉnh, phạm vi tỷ lệ văn bản cao hơn và biện pháp bảo vệ ưu tiên giảm chuyển động.

### Đã thay đổi

- Cài đặt được lưu trữ ở định dạng gọn gàng hơn; cấu hình 1.2.x, các phím nóng và lựa chọn hoạt ảnh được di chuyển tự động.
- Tốc độ phát lại chỉ được áp dụng khi khác 1×, do đó khả năng bắt kịp trực tiếp của Kick không còn bị ghi đè.
- Lịch sử hoàn tác được lưu trong bộ nhớ thay vì được ghi vào bộ nhớ cục bộ.
- Sự kiện âm thanh, thông báo và phím nóng chia sẻ một bộ điều khiển nhất quán.
- Bộ chọn "Hồ sơ tình huống" được thay thế bằng các cài đặt trước bằng một cú nhấp chuột.

### Đã sửa

- Đóng menu trình phát sau khi áp dụng chất lượng không còn nguy cơ mở lại nó nữa.
- Chất lượng dự phòng (ví dụ: 720p thay vì 1080p không khả dụng) không còn ghi đè chất lượng ưu tiên đã lưu cho kênh.
- Chỉ những cú nhấp chuột thực sự vào các mặt hàng chất lượng mới cập nhật chất lượng "được sử dụng lần cuối"; các nhấp chuột tự động bị bỏ qua.
- Tìm kiếm cài đặt không còn thất bại sau khi nhập (mục tiêu sự kiện bị mất bên trong Shadow DOM).
- Những thay đổi được thực hiện trong một tab không còn có thể ghi đè cài đặt từ tab khác.
- Các phím nóng của bảng điều khiển không còn bị hỏng trên các bố cục không phải tiếng Latinh.
- Nhãn không chính xác trong điều khiển nhật ký chẩn đoán và từ tiếng Hàn bị lạc trong tiêu đề chữ viết tiếng Nhật.
- Kiểm tra phát lại bị đình trệ và tạm dừng đồng bộ hóa luồng trong khi tab bị ẩn.

### Đã xóa

- Các tính năng không thể xác minh được hoặc trùng lặp với trình phát của Kick: tùy chọn độ trễ thấp, ẩn điều khiển trình phát khi không hoạt động và kiểm tra cập nhật trong bảng điều khiển dựa trên GitHub (sử dụng các bản cập nhật của trình quản lý mô tả người dùng của bạn hoặc trang Phát hành).
- Các tùy chọn được thiết kế quá mức: cấu hình giao diện đã lưu, hiển thị/ẩn/sắp xếp lại phần, chế độ điều hướng thay thế, kiểm tra tính tương thích và phạm vi dịch thuật, hoạt ảnh ngẫu nhiên/cuộn/phần, thời lượng thông báo cho mỗi sự kiện, hình đại diện kênh, màu nhóm, sắp xếp thủ công, lựa chọn hàng loạt, lịch sử trên mỗi kênh và tự động dọn dẹp.

### Khả năng tương thích

- Các cài đặt hiện có và các kênh đã lưu được giữ nguyên khi cập nhật từ v1.2.0 và v1.1.0.
- Cài đặt vẫn cục bộ trên trình duyệt; tập lệnh không gửi dữ liệu từ xa hoặc thực hiện các yêu cầu mạng.

### Liên kết

- [Kho lưu trữ](https://github.com/ebayybe/kick-stream-tweaks)
- [Bản phát hành](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Vấn đề](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Mở rộng trình trợ giúp âm lượng và chất lượng ban đầu thành bộ công cụ cài đặt trình phát đầy đủ.

### Đã thêm

- Cấu hình mỗi kênh về chất lượng, âm lượng, tốc độ phát lại và trạng thái tắt tiếng.
- Danh sách kênh đã lưu với ghi chú, nhóm, chỉnh sửa hồ sơ và nhập/xuất.
- Hiệu ứng âm thanh với nút chuyển toàn cục, nút chuyển sự kiện riêng lẻ, bản xem trước và âm lượng cho mỗi sự kiện.
- Thông báo về thay đổi chất lượng, khối lượng được khôi phục và các hành động thất bại.
- Lịch sử thông báo, nhật ký hành động và các công cụ chẩn đoán với các điều khiển rõ ràng.
- Kiểm tra tính khả dụng của chất lượng, kiểm tra xung đột và kiểm tra tính tương thích.
- Chế độ an toàn để tạm thời vô hiệu hóa các thay đổi trình phát tự động.
- Phím nóng, kéo bảng, thay đổi kích thước bảng và thao tác trên bảng điều khiển trung tâm.
- Kiểu bảng điều khiển Kick và Minimal, bố cục nhỏ gọn và điều khiển hoạt ảnh.
- Hẹn giờ ngủ, chế độ lấy nét toàn màn hình, điều khiển đồng bộ lại trình phát và phát lại.
- Nhập/xuất cài đặt và hồ sơ kênh.
- Điều hướng bàn phím, chia tỷ lệ văn bản, thông báo bằng trình đọc màn hình và độ tương phản cao.
- Bản địa hóa giao diện cho 38 ngôn ngữ được hỗ trợ.

### Đã sửa

- Ngăn chặn nhiều hộp thoại phụ xuất hiện cùng một lúc.
- Đã sửa lỗi hộp thoại trống xuất hiện phía trên cửa sổ cài đặt âm thanh.
- Bỏ qua các tin nhắn thông báo trống thay vì hiển thị các lớp phủ trống.
- Cải thiện việc gói nhãn dài trên bảng hẹp và bố cục cục bộ.
- Đã sửa lỗi thay thế phần giữ chỗ `{quality` và `{q` trong thông báo.
- Đã cập nhật nhãn phiên bản trong bảng và so sánh cập nhật với 1.2.0.

### Khả năng tương thích

- Các cài đặt hiện tại được giữ nguyên khi cập nhật từ v1.1.0.
- Cài đặt vẫn cục bộ trên trình duyệt; kịch bản không gửi đo từ xa.
- Trình kiểm tra cập nhật đọc thẻ phát hành GitHub mới nhất và không tự động cài đặt các bản cập nhật.

### Liên kết

- [Kho lưu trữ](https://github.com/ebayybe/kick-stream-tweaks)
- [Bản phát hành](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Vấn đề](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Phiên bản công khai ban đầu tập trung vào việc ghi nhớ chất lượng và âm lượng video trên Kick, tự động áp dụng chúng cho các luồng mới và cung cấp bảng cài đặt F2.
