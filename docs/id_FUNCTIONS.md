<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · **Bahasa Indonesia** · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Referensi Fungsi

Referensi untuk Kick Stream Tweaks 1.3.1. Ini menjelaskan apa yang dilakukan setiap area fungsional, bagaimana pengaturan disimpan, bagian halaman Kick mana yang bergantung pada skrip, dan bagaimana setiap fungsi atau metode yang disebutkan dalam skrip pengguna bekerja. Lihat [repositori](https://github.com/ebayybe/kick-stream-tweaks) dan [changelog](../CHANGELOG/en_CHANGELOG.md) .

> Nama sesuai dengan sumbernya. `void` berarti suatu fungsi bertindak melalui efek samping. Sebuah metode yang ditulis sebagai `Object.method` ada di objek itu ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Isi

1. [Arsitektur](#architecture)
2. [Perilaku yang dihadapi pengguna](#user-facing-behavior)
3. [Referensi pengaturan](#settings-reference)
4. [Utilitas inti](#core-utilities)
5. [Pengaturan penyimpanan](#settings-storage)
6. [Sinkronisasi pemutar ( `PlayerSync` )](#player-synchronization-playersync)
7. [Halaman ekstra ( `Extras` )](#page-extras-extras)
8. [Blok penyusun antarmuka](#interface-building-blocks)
9. [Halaman pengaturan ( `PAGES` )](#settings-pages-pages)
10. [Pengontrol panel ( `GUI` )](#panel-controller-gui)
11. [Tombol pintas dan startup](#hotkeys-and-startup)
12. [Tendang ketergantungan halaman](#kick-page-dependencies)
13. [Lokalisasi](#localization)
14. [Keamanan, privasi dan kompatibilitas](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Arsitektur

Skrip pengguna adalah salah satu file mandiri yang dijalankan saat `document-start` dengan `@grant none` . Ia tidak memiliki langkah pembuatan dan tidak membuat permintaan jaringannya sendiri.

| Lapisan | Objek/daerah | Tanggung jawab |
|---|---|---|
| Data | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Terjemahan untuk 38 bahasa, pesan diagnostik yang dilokalkan, tandai SVG, dan nama bahasa. |
| Konfigurasi | `CONFIG` , `DEFAULTS` | Konstanta (pemilih, batas percobaan ulang, preset, bagian) dan pengaturan default. |
| Penyimpanan | `sanitizeSettings` , `Store` , `persist` | Memvalidasi dan menyimpan pengaturan di `localStorage` ; menyimpan tumpukan undo di dalam memori. |
| Logika pemain | `PlayerSync` | Menemukan video, mengembalikan kualitas, volume, kecepatan dan mode senyap, mengawasi macet. |
| Pembantu halaman | `Extras` | Tombol tata letak, klaim hadiah, avatar saluran, dan penjadwal latar belakang. |
| Antarmuka | `PAGES` , `GUI` , pembantu | Panel Shadow-DOM, notifikasi, suara, tombol klaim cepat mengambang, tombol pintas. |

Aliran data: loop `PlayerSync.sync` 1,5 detik membaca pengaturan efektif (profil saluran terlebih dahulu, lalu global), menerapkannya ke pemutar dan memanggil `Extras.tick` . Tindakan pengguna melalui penangan `GUI` , yang memperbarui pengaturan dengan `persist` dan hanya mendorong bagian yang terpengaruh ke pemutar ( `media` atau `all` ).

<a id="user-facing-behavior"></a>
## Perilaku yang dihadapi pengguna

| Daerah | Perilaku |
|---|---|
| Kegigihan pemain | Menyimpan kualitas live/VOD, volume, status senyap, mode senyap, dan kecepatan, lalu menerapkannya saat streaming baru terdeteksi. Perubahan yang dilakukan halaman itu sendiri (misalnya Kick yang menyetel ulang volume ke 50%) akan dikembalikan; hanya tindakan pemirsa yang memperbarui nilai yang disimpan. |
| Kualitas | Memilih kualitas yang diinginkan melalui menu pemutar, kembali ke kualitas yang lebih rendah berikutnya (atau Otomatis) bila tidak tersedia, dan menutup menu lagi. Hanya klik pengguna asli yang mengajarkan skrip kualitas "terakhir digunakan" yang baru. |
| Volume dan pemutaran senyap | Volume dan bisu dipulihkan per streaming. Pemutaran senyap merutekan video melalui mesin Audio Web dengan penguatan nol, sehingga streaming terus diputar di tab latar belakang tanpa dibisukan. |
| Profil saluran | **Simpan saluran ini** menyimpan kualitas, volume, kecepatan, dan suara saat ini untuk saluran yang sedang ditonton. Profil juga menyimpan catatan, grup, status pin, avatar, dan bendera yang diaktifkan/dikecualikan. |
| Preset | Hemat bandwidth, Kualitas terbaik, Tampilan senyap, dan VOD berlaku dalam satu klik. |
| Panel | `F2` atau tombol pintas khusus membuka panel dengan lebar tetap (680 piksel) dengan bilah sisi yang dikelompokkan, pencarian, gaya Kick dan Minimal, tema terang/gelap, 14 warna aksen ditambah pemilih warna, tata letak ringkas, keburaman latar belakang, penskalaan teks, kontras tinggi, dan kontrol animasi. |
| Cari | Tidak sensitif terhadap aksen, cocok dengan bahasa antarmuka dan nama dalam bahasa Inggris, serta cocok dengan bagian atau judul kartu. Penekanan tombol yang diketik di panel tidak pernah mencapai tombol pintas Kick. |
| Penggeser | Setiap penggeser merespons klik, tarikan, panah keyboard, dan roda mouse. |
| Kedengarannya | Petunjuk Audio Web untuk tindakan menu, perubahan pengaturan, keberhasilan/kegagalan kualitas, dan pemulihan volume, masing-masing dengan tombol, pratinjau, dan volume. |
| Pemberitahuan | Pesan yang dilokalkan yang dapat diseret, diskalakan, dibuat transparan, dibungkam (jangan ganggu, senyapkan layar penuh) dan dicatat dalam riwayat. |
| Bekukan alarm | Mendeteksi pemutar yang terhenti atau layar hitam, memutar alarm keras (bahkan di tab tersembunyi, terlepas dari tombol efek suara) dan menampilkan pemberitahuan. |
| Hadiah | Klaim otomatis opsional menunggu pemberitahuan hadiah Kick (atau berjalan sesuai jadwal), membuka jendela hadiah, mengklaim apa yang tersedia dan menutupnya. Tombol klaim cepat yang mengambang dan dapat diseret melakukan hal yang sama dalam satu klik. |
| Tata Letak | Menyembunyikan obrolan dan menutup menu kiri dari panel atau dengan tombol pintas, secara opsional mengingat pilihan untuk setiap aliran. |
| Alat | Pengatur waktu tidur, tampilan fokus (layar penuh), sinkronisasi ulang pemutar, dan mode aman yang menjeda setiap perubahan otomatis. |
| Diagnostik | Status langsung, kualitas terdeteksi, resolusi video, pemindaian kualitas, pemeriksaan konflik, log tindakan, dan laporan yang dapat disalin. |
| Data | Ekspor/impor pengaturan, batalkan, pulihkan setelah disetel ulang, buat cadangan/pulihkan saluran yang disimpan. |
| Privasi | Pengaturan, profil, log, dan riwayat tetap berada di penyimpanan browser. Tidak ada yang dikirim ke mana pun. |

<a id="settings-reference"></a>
## Referensi pengaturan

All values are validated by `sanitizeSettings` ; apa pun yang tidak valid akan kembali ke default. Rentang diberlakukan.

### Pemain

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Terapkan kualitas pilihan secara otomatis. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kualitas untuk diterapkan pada streaming langsung dan VOD. `auto` means "remember my last choice". |
| `lastLiveQuality` , `lastVodQuality` | sama | `auto` | Kualitas terakhir yang dipilih pemirsa dengan tangan. |
| `qualityFallback` | `lower` , `auto` | `lower` | Apa yang harus dilakukan bila kualitas yang diinginkan tidak ditawarkan. |
| `autoVolumeEnabled` | boolean | `true` | Pulihkan dan lindungi volume yang disimpan. |
| `volume` | 0–1 | `1` | Volume yang disimpan. |
| `muted` | boolean | `false` | Status bisu tersimpan. |
| `silent` | boolean | `false` | Pemutaran senyap (grafik audio tanpa penguatan, pemutar tidak dibisukan). |
| `playbackRate` | 0,25–2,5 | `1` | Kecepatan tersimpan; `1` tidak pernah dipaksa. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, langkah 5 | `true` ; `85` | Peringatan volume tinggi. |
| `safeMode` | boolean | `false` | Jeda setiap perubahan otomatis. |
| `channelProfiles` | objek, hingga 200 | `{}` | Profil per saluran (lihat di bawah). |

Bidang profil saluran: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (hanya `https://…kick.com/images/user/…` URL), `note` (240 karakter), `group` (40 karakter), `updatedAt` , `lastUsed` .

### Pemberitahuan dan suara

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Tampilkan pemberitahuan hasil. |
| `doNotDisturb` , `quietFullscreen` | boolean | `false` , `true` | Sembunyikan notifikasi dan suara, atau hanya dalam layar penuh. |
| `notificationScale` | 0,8–1,4 | `1` | Ukuran notifikasi. |
| `notificationDuration` | 1500–12000 ms, langkah 500 | `3500` | Berapa lama notifikasi bertahan. |
| `notificationOpacity` | 0,35–1 | `0.95` | Transparansi pemberitahuan. |
| `notificationShowIcon` | boolean | `true` | Tampilkan ikon status. |
| `notificationPosition` | `{x, y}` atau `null` | `null` | Posisi terseret. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; hingga 30 entri | `true` ; `[]` | Sejarah pemberitahuan. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Sakelar utama dan volume. |
| `soundEvents` , `soundEventVolumes` | per acara: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | semuanya aktif; `0.35` | Sakelar dan volume per peristiwa. |

### Penampilan, gerakan, dan pintasan

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema warna. |
| `panelStyle` | `kick` , `minimal` | `kick` | Gaya visual panel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Warna aksen. |
| `compactMode` , `highContrast` | boolean | `false` | Kepadatan dan kontras. |
| `backdropBlur` | 0–12 piksel | `6` | Latar belakang buram di belakang panel (berfungsi di kedua gaya). |
| `textScale` | 0,9–1,3 | `1` | Ukuran teks. |
| `language` , `languageChosen` | kode lokal; boolean | bahasa peramban; `false` | Antarmuka mengikuti bahasa browser hingga suatu bahasa dipilih, kemudian pilihan tersebut diingat. |
| `panelPosition` | `{x, y}` atau `null` | `null` | Posisi panel diseret. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Kecepatan animasi. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Efek buka/tutup panel. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Efek melayang. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animasi logo/indikator. |
| `iconAnimations` | boolean | `true` | Menganimasikan sidebar, mengatur ulang, dan ikon bantuan. |
| `hotkey` | string kombo | `F2` | Membuka atau menutup panel. |
| `actionHotkeys` | string kombo | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Alihkan notifikasi, tampilan fokus, setel ulang kualitas, pulihkan volume, alihkan obrolan, alihkan menu ke kiri. |

Kombo tombol disimpan sebagai string seperti `Alt+Q` dan dicocokkan dengan tombol fisik, sehingga dapat digunakan pada tata letak keyboard apa pun. Pengaturan dari versi lama dengan hotkey berbentuk objek dikonversi secara otomatis. Lebar panel ditetapkan pada 680 px (terbatas pada ukuran jendela); pengaturan lebar sebelumnya diabaikan.

### Peralatan

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Coba `play()` ketika pembekuan terdeteksi. |
| `freezeAlertEnabled` , `freezeSound` | boolean | `true` | Membekukan notifikasi dan suara alarm. |
| `freezeSeconds` | 5–60, langkah 5 | `10` | Beberapa detik tidak ada kemajuan sebelum alarm berbunyi. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolean | `false` | Tata letak yang diingat, diterapkan sekali per halaman. |
| `autoClaimRewards` | boolean | `false` | Aktifkan klaim hadiah otomatis. |
| `claimMode` | `notify` , `interval` | `notify` | Klaim saat Kick menampilkan notifikasinya, atau sesuai jadwal. |
| `claimDelaySec` | 0–120, langkah 5 | `5` | Tunggu setelah muncul notifikasi (mode notifikasi). |
| `claimIntervalMin` | 5–120, langkah 5 | `10` | Menit antar pemeriksaan (mode terjadwal). |

### Tombol klaim cepat

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Tampilkan tombol mengambang. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Desain tombol. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Ikon bawaan, atau gambar milik pengguna. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , hingga 90.000 karakter | kosong | Salinan gambar yang diunggah dikodekan ulang. Yang lainnya ditolak. |
| `claimWidgetImageFill` | boolean | `false` | Biarkan gambar khusus memenuhi seluruh tombol (tidak digunakan oleh desain pil). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Ukuran tombol. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Opasitas tombol (opasitas penuh saat hadiah tersedia). |
| `claimWidgetAutoHide` | boolean | `false` | Tampilkan tombol hanya ketika hadiah tersedia. |
| `claimWidgetPos` | `{x, y}` atau `null` | `null` | Posisi terseret. |

### Diagnostik dan status

| Kunci | Jenis / rentang | Bawaan | Arti |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; hingga 60 entri | `true` ; `[]` | Catatan tindakan. |
| `activeSection` | id bagian | `playback` | Halaman terakhir dibuka. |
| `resetBackup` | objek pengaturan | `null` | Snapshot diambil sebelum reset atau impor. |

<a id="core-utilities"></a>
## Utilitas inti

| Fungsi | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `detectLanguage` | — → lokal | Berjalan `navigator.languages` , memetakan varian regional ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) dan mengembalikan lokal pertama yang didukung, atau `en` . |
| `dictFor` | lang → kamus | Mengembalikan tabel terjemahan untuk suatu lokal, kembali ke bahasa dasarnya dan kemudian bahasa Inggris. |
| `t` / `T` | lang, kunci, vars → string | Menyelesaikan kunci dengan substitusi `{placeholder}` ; `T` menggunakan bahasa saat ini. |
| `diagText` | indeks, kualitas → string | Mengembalikan salah satu kalimat diagnostik yang dilokalkan. |
| `log` | …args → batal | Pencatatan log konsol dengan awalan skrip. |
| `clamp` , `sleep` , `esc` | nilai → nilai | Pembatasan jangkauan, penundaan berbasis janji, dan pelolosan HTML. |
| `normalizeQuality` | teks → string | Menurunkan label kualitas dan menghilangkan spasi. |
| `debounce` | fn, tunggu → fungsi | Trailing debounce dengan metode `flush` . |
| `onLocationChange` | panggilan balik → batal | Mendeteksi navigasi satu halaman dengan menggabungkan `pushState` / `replaceState` , mendengarkan `popstate` dan polling sekali per detik. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | acara → string/boolean | Bangun dan bandingkan kombo kunci dari kode kunci fisik. |
| `mkPointer` | ketik, ekstra → acara | Membuat `PointerEvent` (atau `MouseEvent` jika tidak tersedia) yang digunakan untuk menggerakkan menu ARIA Kick. |
| `waitFor` | penyelidikan, batas waktu, langkah → nilai/null | Jajak pendapat hingga pemeriksaan mengembalikan nilai atau batas waktu berakhir. |
| `imageToDataUrl` | gambar → tali | Mengubah skala gambar menjadi kanvas persegi (menjaga proporsi, `willReadFrequently` ), mencoba 128, 96 dan 64 piksel dan mengembalikan URL data PNG yang tidak lebih dari 70.000 karakter. |

<a id="settings-storage"></a>
## Pengaturan penyimpanan

| Fungsi | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `sanitizeProfiles` | objek → objek | Menyimpan paling banyak 200 profil dengan kunci yang valid dan menjepit setiap bidang; avatar harus berupa URL gambar Kick. |
| `sanitizeSettings` | objek, dengan Cadangan → objek | Memvalidasi setiap pengaturan (jenis, rentang, nilai yang diizinkan), memigrasikan pengaturan 1.1–1.3 (kualitas lama, tombol pintas, animasi, dan tombol bagian) dan menerapkan aturan bahasa. |
| `legacyHotkey` | nilai → string | Mengonversi hotkey berbentuk objek menjadi string kombo. |
| `Store.load` / `Store.save` | — / pengaturan → pengaturan/batal | Baca dan tulis objek yang sudah dibersihkan di `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | tambalan, `{undo}` → batal | Menggabungkan patch, membersihkan, menyimpan dengan debounce singkat dan secara opsional mendorong undo snapshot (disimpan dalam memori saja, hingga 15). |
| pendengar `storage` | acara → batal | Memuat ulang pengaturan ketika tab Kick lain mengubahnya, sehingga tab tidak pernah saling menimpa. |

<a id="player-synchronization-playersync"></a>
## Sinkronisasi pemutar ( `PlayerSync` )

### Pembantu saluran dan profil

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `isVod` | — → boolean | Mendeteksi halaman VOD dari URL. |
| `channelKey` | — → tali | Membangun `channel:slug` key yang stabil (atau `vod:id` , `kick:home` ), menyimpan hasilnya selama tiga detik. Pada halaman VOD, tautan saluran terdekat dengan pemutar digunakan. |
| `channelSlug` | — → tali | Mengembalikan bagian slug dari kunci saluran. |
| `profile` | kunci → objek/null | Membaca profil yang disimpan. |
| `profileActive` | — → objek/null | Mengembalikan profil saat ini hanya jika diaktifkan dan tidak dikecualikan. |
| `isExcluded` | — → boolean | Memeriksa apakah otomatisasi dinonaktifkan untuk saluran ini. |
| `updateProfile` | tambalan, kunci → batal | Membuat atau menggabungkan profil dan stempel `updatedAt` . |
| `saveCurrentChannel` | — → objek/null | Menyimpan kualitas, volume, keheningan, kecepatan, dan keadaan senyap pemirsa saat ini sebagai profil yang diaktifkan dan memindai laman untuk mencari avatar saluran. |
| `effective` | — → objek | Menyelesaikan volume, mute, silent, kecepatan dan kualitas live/VOD dari profil aktif atau pengaturan global. |
| `setStatus` | status, hasil → batal | Memperbarui status dan kode hasil terakhir yang ditampilkan di header dan diagnostik. |

### Menemukan dan mengemudikan pemain Kick

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `findMainVideo` Utama | — → video/batal | Memilih `<video>` terbesar yang terlihat. |
| `streamKey` | — → tali | Mengembalikan jalur halaman yang digunakan untuk menerapkan kualitas satu kali per aliran. |
| `isAccountButton` | tombol → boolean | Menolak tombol header, avatar, dan akun. |
| `findSettingsButton` | video → tombol/batal | Menemukan tombol roda gigi pemutar berdasarkan label, atau berdasarkan kedekatannya dengan pojok kanan bawah video. |
| `revealControls` | video → batal | Mengirimkan acara hover sehingga kontrol tersembunyi muncul. |
| `simulateClick` | elemen → batal | Mengirimkan urutan acara penunjuk lengkap yang dibutuhkan menu Kick. |
| `menuItems` | — → elemen[] | Mencantumkan entri `menuitemradio` yang terlihat. |
| `openQualityMenu` | — → tombol/batal | Membuka menu perkakas, masuk ke entri berkualitas ketika menu tingkat atas muncul, dan menunggu opsi. |
| `closeMenu` | tombol → Janji | Menutup menu hanya jika masih terbuka (klik kedua secara buta dapat membukanya kembali), dengan fallback Escape. |
| `readMenu` | — → elemen[] | Catat kualitas yang ditawarkan dan kualitas yang diperiksa. |
| `scanQualities` | — → Janji<boolean> | Membuka menu, mencatat kualitas yang tersedia dan menutupnya (digunakan untuk diagnostik). |
| `activate` | barang → Janji | Klik salah satu opsi dan tunggu hingga dicentang. |
| `selectQuality` | diinginkan, mundur → Janji | Memilih kualitas yang diminta, jika tidak, kualitas berikutnya lebih rendah, atau Otomatis. |
| `desiredQuality` | — → tali | Memilih kualitas yang akan diterapkan dari profil, preferensi, atau pilihan manual terakhir. |
| `applyQualityOnce` | streamKey → Janji | Menerapkan kualitas yang diinginkan satu kali per streaming, menutup menu dan memberi tahu tentang keberhasilan atau kegagalan. |
| `watchManualQuality` | — → batal | Mempelajari kualitas baru "yang terakhir digunakan" hanya dari klik asli (tepercaya), sehingga klik otomatis dan penggantian tidak pernah menimpa nilai yang disimpan. |

### Volume, mode senyap, kecepatan dan pemantauan

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `applyVolume` | video, tenang → kosong | Menulis volume efektif dan status bisu (ditandai sebagai perubahan skrip sendiri). |
| `trackInput` | — → batal | Merekam waktu input penunjuk, roda, sentuhan, atau keyboard terakhir yang dipercaya. |
| `reassertVolume` | video → batal | Mengembalikan volume yang disimpan ketika halaman mengubahnya tanpa masukan pengguna apa pun (dibatasi hingga delapan pengembalian per sepuluh detik). |
| `watchVolume` | video → batal | Mendengarkan `volumechange` : perubahan yang didorong oleh pengguna disimpan, perubahan yang didorong oleh halaman dikembalikan. |
| `checkLoud` | volume, tidak bersuara → batal | Memperingatkan sekali ketika volume melewati ambang batas. |
| `buildGraph` | video → grafik/null | Menyambungkan video ke dalam `AudioContext` melalui node penguatan; melaporkan ketika situs tidak mengizinkannya. |
| `applySilent` | video → batal | Menyetel penguatan ke 0 untuk pemutaran senyap atau kembali ke 1, melanjutkan konteks bila diperlukan. |
| `applyRate` | video, paksa → batal | Mengatur kecepatan yang disimpan; `1` tidak dipaksakan kecuali pemirsa baru saja memilihnya, jadi kejar-kejaran Kick sendiri dihormati. |
| `applyMedia` | video, `{rate}` → batal | Menerapkan kembali volume, mode senyap, dan kecepatan opsional tanpa menyentuh kualitas. |
| `monitorFreeze` | video → batal | Mendeteksi pemutar yang terhenti (waktu terhenti) atau layar hitam (waktu bergerak tanpa bingkai yang didekodekan) dan memicu alarm dan pemulihan opsional. Bekerja di tab tersembunyi. |

### Loop dan siklus hidup

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `sync` | — → Janji | Loop utama: memantau macet, mengikat pendengar, menerapkan mode senyap, volume, kecepatan dan kualitas, menghormati mode aman dan pengecualian, lalu memanggil `Extras.tick` . |
| `resync` | — → Janji | Memaksa izin baru (digunakan oleh preset, tindakan cepat, dan perubahan kualitas). |
| `init` | — → batal | Memulai sinkronisasi pertama, pendengar navigasi, dan interval 1,5 detik. |

<a id="page-extras-extras"></a>
## Ekstra halaman ( `Extras` )

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `root` , `layoutState` | — → elemen / `{chat, sidebar}` | Baca status tata letak Kick dari `data-chat` dan `data-sidebar` di penampung halaman. |
| `isDesktop` | — → boolean | Otomatisasi tata letak hanya berjalan pada lebar desktop. |
| `click` | elemen → boolean | Klik melalui `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → tombol/batal | Temukan tombol ciutkan di dalam ruang obrolan dan tombol "tampilkan obrolan" (menurut ikon, bukan bahasa). |
| `setChat` , `setSidebar` | tampilkan → boolean | Bawa obrolan atau menu kiri ke keadaan yang diminta dengan menekan tombol Kick sendiri. |
| `applyLayout` | — → batal | Menerapkan tata letak yang diingat satu kali per halaman, tidak pernah melawan perubahan manual. |
| `isTyping` | — → boolean | Benar saat pemirsa mengetik di suatu bidang; klaim otomatis tunggu. |
| `rewardTrigger` , `popoverCard` | — → tombol/batal | Temukan tombol hadiah dan kartu popover hadiah. |
| `rewardAvailable` | — → boolean | Mendeteksi sinyal "hadiah tersedia" milik Kick (animasi ajakan bertindak). |
| `isEnabled` | tombol → boolean | Terlihat dan tidak dinonaktifkan. |
| `claimDrops` | — → Janji<number> | Menekan tombol klaim yang diaktifkan untuk penurunan yang telah diselesaikan di panel hadiah. |
| `claimDaily` | pemicu → Janji<number> | Membuka jendela hadiah, menekan setiap tombol klaim yang diaktifkan satu kali (jangan pernah menekan tombol yang sama dua kali), lalu menutup jendela. |
| `claimRewards` | `{manual}` → Janji<number> | Menjalankan klaim penuh, melaporkan hasilnya dan memutar suara; berjalan manual mengabaikan pengetikan dan melaporkan ketika tidak ada yang perlu diklaim. |
| `normName` | teks → string | Menormalkan nama untuk pencocokan ( `_` dan spasi hingga `-` ). |
| `findAvatar` | siput → tali | Mengembalikan avatar saluran yang terlihat di halaman (digunakan sebelum saluran disimpan). |
| `scanAvatars` | — → batal | Menyimpan avatar untuk saluran tersimpan yang tidak memilikinya. |
| `tick` | streamKey → batal | Penjadwal dipanggil dari `sync` : menerapkan tata letak, memindai avatar, menunggu notifikasi hadiah (mode notifikasi, dengan penundaan dan waktu tunggu dua menit) atau memeriksa interval yang dipilih, dan melakukan polling pada panel drop. |

<a id="interface-building-blocks"></a>
## Blok penyusun antarmuka

| Fungsi | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `I` | nama → svg | Ikon goresan sebaris. |
| `fmtValue` | format, mentah → string | Memformat nilai penggeser (persen, piksel, detik). |
| `normSearch` , `englishOf` , `searchText` | teks → string | Teks penelusuran tanpa aksen yang menyertakan nama bahasa Inggris dari label terjemahan. |
| `row` | kunci, label, kontrol, opsi → html | Baris pengaturan; ditumpuk secara default, hanya sebaris untuk sakelar, dengan sakelar bantuan opsional. |
| `sw` , `toggleRow` | … → html | Kontrol sakelar dan baris sakelar yang sudah jadi. |
| `chip` , `seg` , `qualityChips` | … → html | Chip, kontrol tersegmentasi, dan kisi kualitas. |
| `range` | attr, kunci, opsi → html | Slider dengan track isian dan nilai langsung. |
| `card` , `btn` , `ib` | … → html | Kartu, tombol teks, dan tombol ikon. |
| `timeStr` | cap waktu → string | Waktu jam yang dilokalkan. |
| `setPref` | kunci, nilai → batal | Menulis preferensi pemain ke profil saluran aktif atau ke pengaturan global. |
| `fxBtn` | kunci, nilai, label, pada → html | Ubin pemilih efek dengan mesin terbang pratinjau kecil. |
| `avatarHtml` | nama, url → html | Avatar dengan huruf mundur; gambar yang gagal dihapus. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → nilai | Buat markup tombol klaim cepat untuk tombol langsung dan pratinjau pengaturan. |

<a id="settings-pages-pages"></a>
## Halaman pengaturan ( `PAGES` )

| Halaman | Isi |
|---|---|
| `playback` | Petunjuk simpan saluran ini, preset, kualitas (penerapan otomatis, siaran langsung, VOD, fallback), volume (penerapan otomatis, penggeser, bisu, pemutaran senyap, peringatan keras) dan kecepatan. |
| `channels` | Langkah-langkah cara kerjanya, saluran saat ini dengan tombol **Simpan saluran ini** , jeda/kecualikan sakelar dan editor, lalu daftar saluran yang disimpan (cari, urutkan, pin filter, grup, Edit/Selesai, hapus) dengan cadangan dan pemulihan. |
| `tools` | Pengatur waktu tidur, tata letak halaman, hadiah (klaim otomatis, mode, penundaan atau interval, Klaim sekarang), pengaturan tombol klaim cepat dengan pratinjau langsung, alarm beku, dan tindakan cepat. |
| `notifications` | Peralihan, ukuran, durasi, opasitas, pratinjau, pengaturan ulang posisi, dan riwayat. |
| `sounds` | Sakelar dan volume utama, sakelar per acara, volume, dan pratinjau. |
| `appearance` | Tema, gaya, warna aksen, kepadatan, kontras, ukuran teks, keburaman, pemusatan, dan bahasa. |
| `motion` | Pratinjau langsung, preset dan pemilih untuk efek terbuka, efek hover, indikator, kecepatan dan animasi ikon. |
| `shortcuts` | Tombol pintas menu dan tombol pintas tindakan dengan rebinding. |
| `diagnostics` | Status, pemindaian, laporan, pemeriksaan kualitas dan konflik, mode aman, dan log tindakan. |
| `about` | Versi, tautan, ekspor/impor, batalkan, pulihkan, dan setel ulang. |

<a id="panel-controller-gui"></a>
## Pengontrol panel ( `GUI` )

### Konstruksi dan rendering

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `build` | — → batal | Membuat host shadow-DOM, panel, toast, dan wilayah langsung, lalu menyambungkan acara. |
| `applyLook` | — → batal | Menerapkan pengaturan tema, gaya, aksen, blur, skala teks, efek, atribut bahasa, dan roti panggang sebagai atribut dan variabel CSS. |
| `renderChrome` | — → batal | Merender judul, placeholder pencarian, tombol jeda, petunjuk footer, dan tombol klaim cepat. |
| `renderNav` | — → batal | Merender sidebar yang dikelompokkan. |
| `renderPage` | pilihan → batal | Merender halaman aktif (atau semua halaman saat mencari), mempertahankan fokus gulir dan keyboard. |
| `filterRows` | — → batal | Menerapkan filter pencarian ke baris, kartu, dan halaman. |
| `channelEditor` | kunci, profil → html | Editor untuk satu profil saluran. |
| `refreshAll` , `onExternalChange` | — → batal | Render ulang semuanya setelah menyetel ulang, mengimpor, membatalkan, atau mengubah dari tab lain. |

### Acara dan pengaturan berubah

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `wire` | — → batal | Melampirkan penangan klik, masukan, ubah, roda dan gulir yang didelegasikan, serta tarikan panel. |
| `onClick` , `onInput` , `onChange` | acara → batal | Mengirimkan klik, pergerakan penggeser, dan pengeditan teks ke pengaturan, profil, atau tindakan. |
| `applyRange` | kunci, nilai → batal | Menerapkan nilai penggeser (volume, blur, opacity, durasi…). |
| `setSetting` , `setChannel` | kunci/tambalan → batal | Simpan pengaturan atau perubahan profil dan dorong bagian yang terpengaruh ke pemutar. |
| `pushToPlayer` | ruang lingkup, kunci → batal | `media` menerapkan kembali volume, mode senyap, dan kecepatan; `all` juga menerapkan kembali kualitas. Volume, mute, mode senyap, dan kecepatan tidak pernah membuka kembali menu kualitas. |
| `act` | nama, elemen → Janji | Menjalankan tindakan bernama: preset, menyimpan dan menghapus saluran, pencadangan, impor/ekspor, klaim, pengatur waktu tidur, pintasan, diagnostik, dan banyak lagi. |
| `resetSection` | id → batal | Mengembalikan default satu bagian. |
| `restoreVolume` | — → batal | Menerapkan kembali volume yang disimpan. |
| `toggleLayout` | yang → batal | Menyembunyikan atau menampilkan obrolan atau menu sebelah kiri dan mengingat pilihannya. |
| `confirm` , `closeModal` | pesan, pilihan / hasil → Janji/batal | Dialog konfirmasi dalam panel (sama di setiap browser). |
| `download` , `pickFile` , `pickImage` | … → batal | Simpan JSON, baca JSON dan pilih gambar untuk tombol klaim cepat. |
| `startCapture` , `finishCapture` | id / kombo → batal | Rebind hotkey, tolak duplikat. |
| `replayMock` | — → batal | Memutar ulang efek terbuka di pratinjau animasi. |

### Alat dan diagnostik

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | menit / — → batal | Mulai, batalkan, dan tampilkan pengatur waktu tidur (ini menjeda video di akhir). |
| `toggleFocusView` | — → Janji | Masuk atau keluar dari layar penuh pada wadah pemutar. |
| `statusText` , `resultText` , `syncDiagnostics` | — → string/batal | Status yang dilokalkan untuk header dan halaman diagnostik. |
| `record` | pesan, tingkat → batal | Menambahkan entri yang diberi stempel waktu ke log tindakan. |
| `copyDiagnostics` | — → Janji | Menyalin laporan singkat (versi, status, kualitas, jenis halaman, agen pengguna). |
| `checkQuality` , `checkConflicts` | — → Janji/batal | Verifikasi kualitas pilihan yang ditawarkan dan buat daftar pengaturan yang sesuai satu sama lain. |

### Tombol klaim cepat

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `renderClaimWidget` | — → batal | Membuat, memperbarui, atau menghapus tombol mengambang dan memulai jajak pendapat status satu detik. |
| `syncClaimWidget` | — → batal | Menampilkan dering dan titik "hadiah tersedia", status sibuk, dan aturan sembunyikan otomatis. |
| `placeClaimWidget` | — → batal | Posisikan tombol dengan menjepitnya ke jendela. |
| `wireClaimWidget` | elemen → batal | Seret dengan ambang lima piksel (seret tidak dihitung sebagai klik), penyimpanan posisi, dan klik yang menjalankan klaim manual. |

### Pemberitahuan, suara dan perilaku panel

| Metode | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `notify` | pesan, jenis, durasi, kekuatan → batal | Menampilkan bersulang (kecuali jika ditekan), mencatat sejarah dan mengumumkan teks di wilayah langsung. |
| `notifyQuality` | diterapkan, kualitas → batal | Memutar suara hasil, mencatat dan menampilkan pemberitahuan yang dilokalkan. |
| `initToastPosition` , `wireToastDrag` | — → batal | Kembalikan dan simpan posisi roti panggang yang diseret. |
| `onAvatars` | — → batal | Menyegarkan halaman yang menampilkan avatar. |
| `ensureAudio` | — → konteks | Membuat dan melanjutkan `AudioContext` bersama (tidak terkunci pada isyarat pengguna pertama). |
| `playSound` , `stopSounds` | nama, pratinjau → batal | Hasilkan dan hentikan isyarat Audio Web. |
| `playFreezeAlarm` , `alertFrozen` | kekuatan → batal | Mainkan alarm lima nada dan naikkan notifikasi pembekuan. |
| `placePanel` , `wirePanelDrag` | posisi → batal | Tempatkan panel di dalam jendela dan buat header dapat diseret. |
| `open` , `close` , `toggle` | — → batal | Kontrol panel, polling, fokus, dan suara menu. |
| `syncVolumeControls` | — → batal | Menjaga penggeser volume tetap sinkron dengan pemutar saat panel terbuka. |

<a id="hotkeys-and-startup"></a>
## Tombol pintas dan startup

| Fungsi | Parameter / pengembalian | Apa dan bagaimana cara kerjanya |
|---|---|---|
| `isolateKeys` | — → batal | Terdaftar di `document-start` dalam fase pengambilan: peristiwa keyboard yang datang dari dalam panel berhenti menyebar ke Kick (jadi Spasi, F, M, dan panah tidak pernah memicu tombol pintas pemain) dan Tab terjebak di dalam dialog. |
| `setupHotkeys` | — → batal | Menangani pengambilan kunci untuk rebinding, Escape (modal, dropdown, panel), hotkey menu, dan hotkey tindakan; kombo dengan pengubah atau tombol F berfungsi bahkan saat mengetik. |
| `init` | — → batal | Membangun panel, menginstal hotkey dan memulai `PlayerSync` ; dilindungi terhadap injeksi ganda. |

<a id="kick-page-dependencies"></a>
## Tendang ketergantungan halaman

Script bergantung pada markup Kick saat ini. Jika memungkinkan, ia menggunakan ikon, atribut, dan struktur, bukan teks yang terlihat, sehingga tetap berfungsi dalam setiap bahasa antarmuka. Jika Kick mengubahnya, fitur pencocokan berhenti bekerja (sisanya tetap berjalan).

| Fitur | Apa yang dicari |
|---|---|
| Kualitas | Entri `<video>` , `button[aria-haspopup="menu"]` dan `[role="menuitemradio"]` pemutar yang terlihat. |
| Tata Letak | Wadah dengan `data-sidebar` dan `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , tombol ikon `CollapseRight` di dalam `#channel-chatroom` dan tombol ikon `MessagesOutline` untuk menampilkan obrolan. |
| Pemberitahuan hadiah | `video` yang sumbernya berisi `reward-available` , atau kartu `[role="group"]` yang berisi video `daily-rewards` . |
| Klaim hadiah | `button[aria-haspopup="dialog"][aria-controls]` (ikon hadiah), dialog yang dikontrolnya ( `data-state` ), mengaktifkan tombol klaim dengan turunan `.contents` dan tombol tutup dengan label `.sr-only` . |
| Tetes | `#rewards-panel` mencantumkan item dengan `[role="progressbar"][data-state="complete"]` dan tombol yang diaktifkan. |
| Avatar | `img[alt]` elemen yang sumbernya `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Lokalisasi

Setiap label, pesan bantuan, kesalahan, dialog, dan pemberitahuan melewati pemecah masalah terjemahan untuk 38 lokal. Kunci yang hilang akan kembali ke bahasa Inggris. Teks antarmuka baru diterjemahkan ke semua bahasa yang didukung bersama dengan fitur yang menambahkannya. Pemilih bahasa menampilkan bendera dan nama asli; antarmuka mengikuti bahasa browser saat pertama kali dijalankan dan mengingat pilihan eksplisit setelahnya.

<a id="safety-privacy-and-compatibility"></a>
## Keamanan, privasi, dan kompatibilitas

- Pengaturan dibersihkan sebelum disimpan; nilai yang tidak valid dikembalikan ke default yang aman.
- Nama saluran, catatan, teks pemberitahuan, dan keluaran diagnostik di-escape sebelum penyisipan HTML.
- Ikon tombol khusus dikodekan ulang dari kanvas dan disimpan sebagai URL data dari jenis gambar yang diizinkan saja; itu tidak pernah meninggalkan browser.
- Shadow DOM menjaga gaya skrip tetap terisolasi dari Kick; acara keyboard dari panel diisolasi dari hotkey Kick.
- Tindakan otomatis melewati saluran yang dikecualikan, mode aman, dan elemen pemain yang hilang. Pengklaim hadiah tidak pernah menekan tombol yang sama dua kali sekaligus dan menunggu saat pemirsa mengetik.
- Script tidak membuat permintaan jaringan; pembaruan datang dari pengelola skrip pengguna atau halaman Rilis.
- Pengaturan lokal yang ada dipertahankan saat berpindah dari 1.1.0, 1.2.0, dan 1.3.0.
