<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · **Bahasa Melayu** · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · [Türkçe](./tr_FUNCTIONS.md) · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Kick Stream Tweaks — Rujukan Fungsi

Rujukan untuk Kick Stream Tweaks 1.3.1. Ia menerangkan perkara yang dilakukan oleh setiap kawasan berfungsi, cara tetapan disimpan, bahagian halaman Kick yang mana skrip bergantung, dan cara setiap fungsi atau kaedah yang dinamakan dalam skrip pengguna berfungsi. Lihat [repositori](https://github.com/ebayybe/kick-stream-tweaks) dan [changelog](../CHANGELOG/en_CHANGELOG.md) .

> Nama sepadan dengan sumber. `void` bermaksud fungsi bertindak melalui kesan sampingan. Kaedah yang ditulis sebagai `Object.method` hidup pada objek tersebut ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## Kandungan

1. [Seni bina](#architecture)
2. [Tingkah laku menghadap pengguna](#user-facing-behavior)
3. [Rujukan tetapan](#settings-reference)
4. [Utiliti teras](#core-utilities)
5. [Storan tetapan](#settings-storage)
6. [Penyegerakan pemain ( `PlayerSync` )](#player-synchronization-playersync)
7. [Tambahan halaman ( `Extras` )](#page-extras-extras)
8. [Blok binaan antara muka](#interface-building-blocks)
9. [Halaman tetapan ( `PAGES` )](#settings-pages-pages)
10. [Pengawal panel ( `GUI` )](#panel-controller-gui)
11. [Kekunci pintas dan permulaan](#hotkeys-and-startup)
12. [Kick kebergantungan halaman](#kick-page-dependencies)
13. [Penyetempatan](#localization)
14. [Keselamatan, privasi dan keserasian](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Seni bina

Skrip pengguna ialah satu fail serba lengkap yang dijalankan pada `document-start` dengan `@grant none` . Ia tidak mempunyai langkah binaan dan tidak membuat permintaan rangkaian sendiri.

| Lapisan | Objek / kawasan | Tanggungjawab |
|---|---|---|
| Data | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | Terjemahan untuk 38 bahasa, mesej diagnostik setempat, bendera SVG dan nama bahasa. |
| Konfigurasi | `CONFIG` , `DEFAULTS` | Pemalar (pemilih, had cuba semula, pratetap, bahagian) dan tetapan lalai. |
| Storan | `sanitizeSettings` , `Store` , `persist` | Mengesahkan dan menyimpan tetapan dalam `localStorage` ; menyimpan timbunan asal dalam ingatan. |
| Logik pemain | `PlayerSync` | Mencari video, memulihkan kualiti, kelantangan, kelajuan dan mod senyap, menonton untuk membeku. |
| Pembantu halaman | `Extras` | Butang reka letak, tuntutan ganjaran, avatar saluran dan penjadual latar belakang. |
| Antara muka | `PAGES` , `GUI` , pembantu | Panel Shadow-DOM, pemberitahuan, bunyi, butang tuntutan pantas terapung, kekunci pintas. |

Aliran data: gelung `PlayerSync.sync` 1.5 saat membaca tetapan yang berkesan (profil saluran dahulu, kemudian global), menggunakannya pada pemain dan memanggil `Extras.tick` . Tindakan pengguna melalui pengendali `GUI` , yang mengemas kini tetapan dengan `persist` dan menolak hanya bahagian yang terjejas kepada pemain ( `media` atau `all` ).

<a id="user-facing-behavior"></a>
## Tingkah laku menghadap pengguna

| Kawasan | Tingkah laku |
|---|---|
| Kegigihan pemain | Menjimatkan kualiti langsung/VOD, kelantangan, keadaan senyap, mod senyap dan kelajuan, kemudian gunakannya apabila strim baharu dikesan. Perubahan halaman yang dibuat dengan sendirinya (contohnya Kick menetapkan semula volum kepada 50%) dikembalikan; hanya tindakan penonton sendiri mengemas kini nilai yang disimpan. |
| Kualiti | Memilih kualiti pilihan melalui menu pemain, kembali ke yang lebih rendah seterusnya (atau Auto) apabila tidak tersedia, dan menutup menu sekali lagi. Hanya klik pengguna tulen yang mengajar skrip kualiti "terakhir digunakan" baharu. |
| Kelantangan dan main balik senyap | Kelantangan dan redam dipulihkan setiap strim. Main balik senyap mengarahkan video melalui enjin Audio Web pada keuntungan sifar, jadi strim terus dimainkan dalam tab latar belakang tanpa diredamkan. |
| Profil saluran | **Simpan saluran ini** menyimpan kualiti, kelantangan, kelajuan dan bunyi semasa untuk saluran yang ditonton. Profil juga menyimpan nota, kumpulan, keadaan pin, avatar dan bendera yang didayakan/dikecualikan. |
| Pratetap | Jimat lebar jalur, Kualiti terbaik, Paparan senyap dan VOD digunakan dalam satu klik. |
| Panel | `F2` atau kekunci pintas tersuai membuka panel lebar tetap (680 px) dengan bar sisi berkumpulan, carian, Gaya Tendangan dan Minimum, tema terang/gelap, 14 warna aksen serta pemilih warna, reka letak padat, kabur tirai latar, penskalaan teks, kontras tinggi dan kawalan animasi. |
| Cari | Tidak sensitif aksen, sepadan dengan bahasa antara muka dan nama Inggeris, dan sepadan dengan tajuk bahagian atau kad. Ketukan kekunci yang ditaip dalam panel tidak pernah sampai ke kekunci panas Kick. |
| Peluncur | Setiap peluncur bertindak balas kepada klik, menyeret, anak panah papan kekunci dan roda tetikus. |
| Bunyi | Petunjuk Audio Web untuk tindakan menu, perubahan tetapan, kejayaan/kegagalan kualiti dan pemulihan kelantangan, masing-masing dengan suis, pratonton dan kelantangan. |
| Pemberitahuan | Mesej setempat yang boleh diseret, diskalakan, dibuat telus, disenyapkan (jangan ganggu, senyap skrin penuh) dan direkodkan dalam sejarah. |
| Pembekukan penggera | Mengesan pemain yang terhenti atau skrin hitam, memainkan penggera yang kuat (walaupun dalam tab tersembunyi, bebas daripada suis kesan bunyi) dan menunjukkan pemberitahuan. |
| Ganjaran | Tuntutan auto pilihan menunggu pemberitahuan ganjaran Kick (atau berjalan mengikut jadual), membuka tetingkap ganjaran, menuntut apa yang tersedia dan menutupnya. Butang tuntutan pantas terapung dan boleh diseret melakukan perkara yang sama dalam satu klik. |
| Reka letak | Menyembunyikan sembang dan meruntuhkan menu kiri daripada panel atau dengan kekunci pintas, secara pilihan mengingati pilihan untuk setiap strim. |
| Alatan | Pemasa tidur, paparan fokus (skrin penuh), penyegerakan semula pemain dan mod selamat yang menjeda setiap perubahan automatik. |
| Diagnostik | Status langsung, kualiti yang dikesan, resolusi video, imbasan kualiti, semakan konflik, log tindakan dan laporan yang boleh disalin. |
| Data | Eksport/import tetapan, buat asal, pulihkan selepas tetapan semula, sandarkan/pulihkan saluran yang disimpan. |
| Privasi | Tetapan, profil, log dan sejarah kekal dalam storan penyemak imbas. Tiada apa-apa dihantar ke mana-mana. |

<a id="settings-reference"></a>
## Rujukan tetapan

Semua nilai disahkan oleh `sanitizeSettings` ; apa-apa yang tidak sah kembali kepada lalai. Julat dikuatkuasakan.

### Pemain

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `autoQualityEnabled` | boolean | `true` | Gunakan kualiti pilihan secara automatik. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Kualiti untuk memohon strim langsung dan VOD. `auto` bermaksud "ingat pilihan terakhir saya". |
| `lastLiveQuality` , `lastVodQuality` | sama | `auto` | Kualiti terakhir yang dipilih oleh penonton dengan tangan. |
| `qualityFallback` | `lower` , `auto` | `lower` | Apa yang perlu dilakukan apabila kualiti pilihan tidak ditawarkan. |
| `autoVolumeEnabled` | boolean | `true` | Pulihkan dan lindungi volum yang disimpan. |
| `volume` | 0–1 | `1` | Kelantangan disimpan. |
| `muted` | boolean | `false` | Keadaan senyap disimpan. |
| `silent` | boolean | `false` | Main balik senyap (graf audio keuntungan sifar, pemain tidak diredamkan). |
| `playbackRate` | 0.25–2.5 | `1` | Kelajuan disimpan; `1` tidak pernah dipaksa. |
| `warnLoudVolume` , `loudVolumeThreshold` | boolean; 60–100, langkah 5 | `true` ; `85` | Amaran volum tinggi. |
| `safeMode` | boolean | `false` | Jeda setiap perubahan automatik. |
| `channelProfiles` | objek, sehingga 200 | `{}` | Profil setiap saluran (lihat di bawah). |

Medan profil saluran: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (hanya `https://…kick.com/images/user/…` URL), `note` (240 aksara), `group` (40 aksara `lastUsed` ), `updatedAt` .

### Pemberitahuan dan bunyi

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `notificationsEnabled` | boolean | `true` | Tunjukkan pemberitahuan hasil. |
| `doNotDisturb` , `quietFullscreen` | boolean | `false` , `true` | Sekat pemberitahuan dan bunyi, atau hanya dalam skrin penuh. |
| `notificationScale` | 0.8–1.4 | `1` | Saiz pemberitahuan. |
| `notificationDuration` | 1500–12000 ms, langkah 500 | `3500` | Berapa lama pemberitahuan kekal. |
| `notificationOpacity` | 0.35–1 | `0.95` | Ketelusan pemberitahuan. |
| `notificationShowIcon` | boolean | `true` | Tunjukkan ikon status. |
| `notificationPosition` | `{x, y}` atau `null` | `null` | Kedudukan terseret. |
| `notificationHistoryEnabled` , `notificationHistory` | boolean; sehingga 30 penyertaan | `true` ; `[]` | Sejarah pemberitahuan. |
| `soundEffectsEnabled` , `soundVolume` | boolean; 0–1 | `false` ; `0.35` | Suis induk dan kelantangan. |
| `soundEvents` , `soundEventVolumes` | setiap acara: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | semua pada; `0.35` | Suis dan kelantangan setiap peristiwa. |

### Rupa, gerakan dan jalan pintas

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Tema warna. |
| `panelStyle` | `kick` , `minimal` | `kick` | Gaya visual panel. |
| `accentColor` | `#rrggbb` | `#53fc18` | Warna aksen. |
| `compactMode` , `highContrast` | boolean | `false` | Ketumpatan dan kontras. |
| `backdropBlur` | 0–12 px | `6` | Latar belakang kabur di belakang panel (berfungsi dalam kedua-dua gaya). |
| `textScale` | 0.9–1.3 | `1` | Saiz teks. |
| `language` , `languageChosen` | kod tempat; boolean | bahasa pelayar; `false` | Antara muka mengikut bahasa penyemak imbas sehingga bahasa dipilih, maka pilihan itu diingati. |
| `panelPosition` | `{x, y}` atau `null` | `null` | Kedudukan panel yang diseret. |
| `motionSpeed` ​​| `fast` , `normal` , `slow` | `normal` | Kelajuan animasi. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Kesan buka/tutup panel. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Kesan tuding. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Animasi logo/penunjuk. |
| `iconAnimations` | boolean | `true` | Animasikan bar sisi, tetapkan semula dan ikon bantuan. |
| `hotkey` | rentetan kombo | `F2` | Membuka atau menutup panel. |
| `actionHotkeys` | rentetan kombo | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Togol pemberitahuan, paparan fokus, tetapkan semula kualiti, pulihkan kelantangan, togol sembang, togol menu kiri. |

Gabungan kunci disimpan sebagai rentetan seperti `Alt+Q` dan dipadankan dengan kekunci fizikal, jadi ia berfungsi pada sebarang reka letak papan kekunci. Tetapan daripada versi lama dengan hotkey berbentuk objek ditukar secara automatik. Lebar panel ditetapkan pada 680 px (terhad kepada saiz tetingkap); tetapan lebar dahulu diabaikan.

### Alat

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `autoRecoverStall` | boolean | `false` | Cuba `play()` apabila pembekuan dikesan. |
| `freezeAlertEnabled` , `freezeSound` | boolean | `true` | Bekukan pemberitahuan dan bunyi penggera. |
| `freezeSeconds` | 5–60, langkah 5 | `10` | Saat tiada kemajuan sebelum penggera. |
| `layoutHideChat` , `layoutCollapseSidebar` | boolean | `false` | Reka letak yang diingati, digunakan sekali setiap halaman. |
| `autoClaimRewards` | boolean | `false` | Dayakan tuntutan ganjaran automatik. |
| `claimMode` | `notify` , `interval` | `notify` | Tuntut apabila Kick menunjukkan pemberitahuannya, atau mengikut jadual. |
| `claimDelaySec` | 0–120, langkah 5 | `5` | Tunggu selepas pemberitahuan muncul (mod pemberitahuan). |
| `claimIntervalMin` | 5–120, langkah 5 | `10` | Minit antara semakan (mod berjadual). |

### Butang tuntutan pantas

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `claimWidget` | boolean | `false` | Tunjukkan butang terapung. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Reka bentuk butang. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Ikon terbina dalam, atau imej pengguna sendiri. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , sehingga 90,000 aksara | kosong | Salinan yang dikodkan semula bagi imej yang dimuat naik. Apa-apa lagi ditolak. |
| `claimWidgetImageFill` | boolean | `false` | Biarkan imej tersuai mengisi keseluruhan butang (tidak digunakan oleh reka bentuk pil). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Saiz butang. |
| `claimWidgetOpacity` | 0.3–1 | `0.9` | Kelegapan butang (kelegapan penuh sementara ganjaran tersedia). |
| `claimWidgetAutoHide` | boolean | `false` | Tunjukkan butang hanya apabila ganjaran tersedia. |
| `claimWidgetPos` | `{x, y}` atau `null` | `null` | Kedudukan terseret. |

### Diagnostik dan keadaan

| Kunci | Jenis / julat | Lalai | Maksudnya |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boolean; sehingga 60 penyertaan | `true` ; `[]` | Log tindakan. |
| `activeSection` | id bahagian | `playback` | Halaman terakhir dibuka. |
| `resetBackup` | objek tetapan | `null` | Syot kilat diambil sebelum penetapan semula atau import. |

<a id="core-utilities"></a>
## Utiliti teras

| Fungsi | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `detectLanguage` | — → tempat | Berjalan `navigator.languages` ​​, memetakan varian serantau ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) dan mengembalikan tempat pertama yang disokong, atau `en` . |
| `dictFor` | lang → kamus | Mengembalikan jadual terjemahan untuk tempat, kembali kepada bahasa asasnya dan kemudian bahasa Inggeris. |
| `t` / `T` | lang, kunci, vars → rentetan | Menyelesaikan kunci dengan penggantian `{placeholder}` ; `T` menggunakan bahasa semasa. |
| `diagText` | indeks, kualiti → rentetan | Mengembalikan salah satu ayat diagnostik setempat. |
| `log` | …args → batal | Pengelogan konsol dengan awalan skrip. |
| `clamp` , `sleep` , `esc` | nilai → nilai | Mengehadkan julat, kelewatan berasaskan janji dan HTML melarikan diri. |
| `normalizeQuality` | teks → rentetan | Mengecilkan label kualiti dan mengalih keluar ruang putih. |
| `debounce` | fn, tunggu → fungsi | Penyahlantunan mengekori dengan kaedah `flush` . |
| `onLocationChange` | panggil balik → batal | Mengesan navigasi satu halaman dengan membungkus `pushState` / `replaceState` , mendengar `popstate` dan pengundian sekali sesaat. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | acara → rentetan/boolean | Bina dan bandingkan kombo kunci daripada kod kunci fizikal. |
| `mkPointer` | jenis, tambahan → acara | Mencipta `PointerEvent` (atau `MouseEvent` apabila tidak tersedia) digunakan untuk memacu menu ARIA Kick. |
| `waitFor` | kuar, tamat masa, langkah → nilai/null | Tinjauan sehingga siasatan mengembalikan nilai atau tamat masa tamat. |
| `imageToDataUrl` | imej → rentetan | Menskalakan imej ke dalam kanvas segi empat sama (mengekalkan perkadaran, `willReadFrequently` ), mencuba 128, 96 dan 64 px dan mengembalikan URL data PNG tidak lebih daripada 70,000 aksara. |

<a id="settings-storage"></a>
## Storan tetapan

| Fungsi | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `sanitizeProfiles` | objek → objek | Menyimpan paling banyak 200 profil dengan kunci yang sah dan pengapit setiap medan; avatar mestilah URL imej Kick. |
| `sanitizeSettings` | objek, denganBackup → objek | Mengesahkan setiap tetapan (jenis, julat, nilai yang dibenarkan), memindahkan tetapan 1.1–1.3 (kualiti lama, kunci pintas, animasi dan kekunci bahagian) dan menggunakan peraturan bahasa. |
| `legacyHotkey` | nilai → rentetan | Menukar hotkey berbentuk objek kepada rentetan kombo. |
| `Store.load` / `Store.save` | — / tetapan → tetapan/kosong | Baca dan tulis objek yang telah dibersihkan dalam `localStorage` ( `kickTweaks.settings.v1` ). |
| `persist` | tampalan, `{undo}` → batal | Menggabungkan tampung, membersihkan, menyimpan dengan nyahpantun singkat dan menolak syot kilat buat asal (disimpan dalam ingatan sahaja, sehingga 15) secara pilihan. |
| pendengar `storage` | acara → batal | Memuatkan semula tetapan apabila tab Kick lain mengubahnya, jadi tab tidak pernah menimpa satu sama lain. |

<a id="player-synchronization-playersync"></a>
## Penyegerakan pemain ( `PlayerSync` )

### Pembantu saluran dan profil

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `isVod` | — → boolean | Mengesan halaman VOD daripada URL. |
| `channelKey` | — → rentetan | Membina kekunci `channel:slug` yang stabil (atau `vod:id` , `kick:home` ), menyimpan hasil cache selama tiga saat. Pada halaman VOD pautan saluran yang paling hampir dengan pemain digunakan. |
| `channelSlug` | — → rentetan | Mengembalikan bahagian slug kunci saluran. |
| `profile` | kunci → objek/null | Membaca profil yang disimpan. |
| `profileActive` | — → objek/null | Mengembalikan profil semasa hanya apabila ia didayakan dan tidak dikecualikan. |
| `isExcluded` | — → boolean | Menyemak sama ada automasi dilumpuhkan untuk saluran ini. |
| `updateProfile` | tampalan, kunci → batal | Mencipta atau menggabungkan profil dan setem `updatedAt` . |
| `saveCurrentChannel` | — → objek/null | Menyimpan kualiti semasa, kelantangan, redam, kelajuan dan keadaan senyap sebagai profil yang didayakan dan mengimbas halaman untuk avatar saluran. |
| `effective` | — → objek | Menyelesaikan kelantangan, senyap, senyap, kelajuan dan kualiti langsung/VOD daripada profil aktif atau tetapan global. |
| `setStatus` | status, keputusan → batal | Mengemas kini status dan kod keputusan terakhir yang ditunjukkan dalam pengepala dan diagnostik. |

### Mencari dan memandu pemain Kick

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `findMainVideo` | — → video/null | Pilih `<video>` terbesar yang boleh dilihat. |
| `streamKey` | — → rentetan | Mengembalikan laluan halaman yang digunakan untuk menggunakan kualiti sekali setiap strim. |
| `isAccountButton` | butang → boolean | Menolak butang pengepala, avatar dan akaun. |
| `findSettingsButton` | video → butang/null | Mencari butang gear pemain mengikut label, atau mengikut kedekatan dengan sudut kanan bawah video. |
| `revealControls` | video → batal | Peristiwa menuding penghantaran supaya kawalan tersembunyi muncul. |
| `simulateClick` | unsur → batal | Menghantar urutan penuding-acara penuh yang diperlukan oleh menu Kick. |
| `menuItems` | — → unsur[] | Menyenaraikan entri `menuitemradio` yang boleh dilihat. |
| `openQualityMenu` | — → butang/null | Membuka menu gear, melangkah ke entri berkualiti apabila menu peringkat teratas muncul dan menunggu pilihan. |
| `closeMenu` | butang → Janji | Menutup menu hanya jika ia masih terbuka (klik kedua buta boleh membukanya semula), dengan sandaran Escape. |
| `readMenu` | — → unsur[] | Merekodkan kualiti yang ditawarkan dan yang disemak. |
| `scanQualities` | — → Janji<boolean> | Membuka menu, merekodkan kualiti yang tersedia dan menutupnya (digunakan oleh diagnostik). |
| `activate` | item → Janji | Mengklik satu pilihan dan menunggu sehingga ia ditandakan. |
| `selectQuality` | dikehendaki, sandaran → Janji | Memilih kualiti yang diminta, jika tidak, kualiti yang lebih rendah seterusnya, atau Auto. |
| `desiredQuality` | — → rentetan | Memilih kualiti untuk digunakan daripada profil, keutamaan atau pilihan manual terakhir. |
| `applyQualityOnce` | streamKey → Janji | Menggunakan kualiti yang diingini sekali setiap strim, menutup menu dan memberitahu tentang kejayaan atau kegagalan. |
| `watchManualQuality` | — → batal | Mempelajari kualiti "terakhir digunakan" baharu daripada klik tulen (dipercayai) sahaja, jadi klik automatik dan sandaran tidak pernah menimpa nilai yang disimpan. |

### Kelantangan, mod senyap, kelajuan dan pemantauan

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `applyVolume` | video, senyap → batal | Menulis kelantangan berkesan dan keadaan senyap (ditandakan sebagai perubahan skrip sendiri). |
| `trackInput` | — → batal | Merekodkan masa penuding, roda, sentuhan atau input papan kekunci yang dipercayai terakhir. |
| `reassertVolume` | video → batal | Meletakkan semula volum yang disimpan apabila halaman menukarnya tanpa sebarang input pengguna (kadar terhad kepada lapan kembalian setiap sepuluh saat). |
| `watchVolume` | video → batal | Mendengar untuk `volumechange` : perubahan dipacu pengguna disimpan, perubahan dipacu halaman dibalikkan. |
| `checkLoud` | kelantangan, diredam → batal | Memberi amaran sekali apabila kelantangan melepasi ambang. |
| `buildGraph` | video → graf/null | Menghubungkan video ke dalam `AudioContext` melalui nod keuntungan; melaporkan apabila tapak tidak membenarkannya. |
| `applySilent` | video → batal | Tetapkan keuntungan kepada 0 untuk main balik senyap atau kembali kepada 1, menyambung semula konteks apabila diperlukan. |
| `applyRate` | video, paksa → batal | Menetapkan kelajuan yang disimpan; `1` tidak dipaksa melainkan penonton hanya memilihnya, jadi tangkapan tepi langsung Kick sendiri dihormati. |
| `applyMedia` | video, `{rate}` → batal | Guna semula kelantangan, mod senyap dan kelajuan pilihan tanpa menyentuh kualiti. |
| `monitorFreeze` | video → batal | Mengesan pemain yang terhenti (masa tersekat) atau skrin hitam (masa bergerak tanpa bingkai dinyahkod) dan mencetuskan penggera dan pemulihan pilihan. Berfungsi dalam tab tersembunyi. |

### Gelung dan kitaran hayat

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `sync` | — → Janji | Gelung utama: memantau membeku, mengikat pendengar, menggunakan mod senyap, kelantangan, kelajuan dan kualiti, menghormati mod selamat dan pengecualian, kemudian memanggil `Extras.tick` . |
| `resync` | — → Janji | Memaksa pas baru (digunakan oleh pratetap, tindakan pantas dan perubahan kualiti). |
| `init` | — → batal | Memulakan penyegerakan pertama, pendengar navigasi dan selang 1.5 saat. |

<a id="page-extras-extras"></a>
## Halaman tambahan ( `Extras` )

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `root` , `layoutState` | — → elemen / `{chat, sidebar}` | Baca keadaan susun atur Kick daripada `data-chat` dan `data-sidebar` pada bekas halaman. |
| `isDesktop` | — → boolean | Automasi reka letak hanya berjalan pada lebar desktop. |
| `click` | elemen → boolean | Klik melalui `PlayerSync.simulateClick` . |
| `chatHideButton` , `chatShowButton` | — → butang/null | Cari butang runtuh di dalam bilik sembang dan butang "tunjukkan sembang" (mengikut ikon, bukan mengikut bahasa). |
| `setChat` , `setSidebar` | tunjukkan → boolean | Bawa sembang atau menu kiri ke keadaan yang diminta dengan menekan butang Kick sendiri. |
| `applyLayout` | — → batal | Menggunakan reka letak yang diingati sekali setiap halaman, tidak pernah melawan perubahan manual. |
| `isTyping` | — → boolean | Benar semasa penonton sedang menaip dalam medan; tuntutan automatik menunggu. |
| `rewardTrigger` , `popoverCard` | — → butang/null | Cari butang hadiah dan kad popover ganjaran. |
| `rewardAvailable` | — → boolean | Mengesan isyarat "ganjaran tersedia" Kick sendiri (seruan tindak animasi). |
| `isEnabled` | butang → boolean | Kelihatan dan tidak dilumpuhkan. |
| `claimDrops` | — → Janji<number> | Tekan butang tuntutan yang didayakan untuk penurunan yang lengkap dalam panel ganjaran. |
| `claimDaily` | pencetus → Janji<number> | Membuka tetingkap ganjaran, menekan setiap butang tuntutan yang didayakan sekali (tidak pernah butang yang sama dua kali), kemudian menutup tetingkap. |
| `claimRewards` | `{manual}` → Janji<number> | Menjalankan tuntutan penuh, melaporkan keputusan dan memainkan bunyi; manual berjalan mengabaikan menaip dan melaporkan apabila tiada apa-apa untuk dituntut. |
| `normName` | teks → rentetan | Menormalkan nama untuk padanan ( `_` dan ruang ke `-` ). |
| `findAvatar` | slug → rentetan | Mengembalikan avatar saluran yang boleh dilihat pada halaman (digunakan sebelum saluran disimpan). |
| `scanAvatars` | — → batal | Menyimpan avatar untuk saluran disimpan yang kekurangannya. |
| `tick` | streamKey → batal | Penjadual dipanggil daripada `sync` : menggunakan reka letak, mengimbas avatar, menunggu pemberitahuan ganjaran (mod pemberitahuan, dengan kelewatan dan bertenang selama dua minit) atau menyemak pada selang waktu yang dipilih dan mengundi panel jatuh. |

<a id="interface-building-blocks"></a>
## Blok binaan antara muka

| Fungsi | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `I` | nama → svg | Ikon lejang sebaris. |
| `fmtValue` | format, mentah → rentetan | Memformat nilai peluncur (peratus, piksel, saat). |
| `normSearch` , `englishOf` , `searchText` | teks → rentetan | Teks carian tidak sensitif aksen termasuk nama Inggeris bagi label yang diterjemahkan. |
| `row` | kunci, label, kawalan, pilihan → html | Satu baris tetapan; disusun secara lalai, sebaris hanya untuk suis, dengan togol bantuan pilihan. |
| `sw` , `toggleRow` | … → html | Kawalan suis dan baris suis siap pakai. |
| `chip` , `seg` , `qualityChips` | … → html | Cip, kawalan bersegmen dan grid kualiti. |
| `range` | attr, kunci, pilihan → html | Peluncur dengan trek isian dan nilai langsung. |
| `card` , `btn` , `ib` | … → html | Kad, butang teks dan butang ikon. |
| `timeStr` | cap masa → rentetan | Waktu jam setempat. |
| `setPref` | kunci, nilai → batal | Menulis pilihan pemain ke profil saluran aktif atau ke tetapan global. |
| `fxBtn` | kunci, nilai, label, pada → html | Jubin pemilih kesan dengan glif pratonton kecil. |
| `avatarHtml` | nama, url → html | Avatar dengan sandaran surat; imej yang gagal dialih keluar. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → nilai | Bina penanda butang tuntutan pantas untuk kedua-dua butang langsung dan pratonton tetapan. |

<a id="settings-pages-pages"></a>
## Halaman tetapan ( `PAGES` )

| Halaman | Kandungan |
|---|---|
| `playback` | Petua simpan saluran ini, pratetap, kualiti (gunakan auto, langsung, VOD, sandaran), kelantangan (guna automatik, gelangsar, redam, main balik senyap, amaran kuat) dan kelajuan. |
| `channels` | Langkah cara kerja, saluran semasa dengan butang **Simpan saluran ini** , jeda/kecuali suis dan editor, kemudian senarai saluran disimpan (cari, isih, penapis pin, kumpulan, Edit/Selesai, padam) dengan sandaran dan pulihkan. |
| `tools` | Pemasa tidur, susun atur halaman, ganjaran (tuntutan automatik, mod, kelewatan atau selang waktu, Tuntut sekarang), tetapan butang tuntutan pantas dengan pratonton langsung, penggera beku dan tindakan pantas. |
| `notifications` | Suis, saiz, tempoh, kelegapan, pratonton, tetapan semula kedudukan dan sejarah. |
| `sounds` | Suis induk dan kelantangan, suis setiap peristiwa, kelantangan dan pratonton. |
| `appearance` | Tema, gaya, warna aksen, ketumpatan, kontras, saiz teks, kabur, pemusatan dan bahasa. |
| `motion` | Pratonton langsung, pratetap dan pemilih untuk kesan terbuka, kesan tuding, penunjuk, kelajuan dan animasi ikon. |
| `shortcuts` | Kekunci pintas menu dan kekunci pintas tindakan dengan penjilidan semula. |
| `diagnostics` | Status, imbasan, laporan, kualiti dan semakan konflik, mod selamat dan log tindakan. |
| `about` | Versi, pautan, eksport/import, buat asal, pulihkan dan tetapkan semula. |

<a id="panel-controller-gui"></a>
## Pengawal panel ( `GUI` )

### Pembinaan dan rendering

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `build` | — → batal | Mencipta hos bayang-DOM, panel, roti bakar dan wilayah langsung, kemudian menyambungkan acara. |
| `applyLook` | — → batal | Menggunakan tema, gaya, aksen, kabur, skala teks, kesan, atribut bahasa dan tetapan roti bakar sebagai atribut dan pembolehubah CSS. |
| `renderChrome` | — → batal | Memaparkan tajuk, ruang letak carian, butang jeda, pembayang pengaki dan butang tuntutan pantas. |
| `renderNav` | — → batal | Memaparkan bar sisi berkumpulan. |
| `renderPage` | pilihan → batal | Memaparkan halaman aktif (atau semua halaman semasa mencari), mengekalkan fokus tatal dan papan kekunci. |
| `filterRows` | — → batal | Menggunakan penapis carian pada baris, kad dan halaman. |
| `channelEditor` | kunci, profil → html | Editor untuk satu profil saluran. |
| `refreshAll` , `onExternalChange` | — → batal | Paparkan semula semuanya selepas ditetapkan semula, import, buat asal atau perubahan daripada tab lain. |

### Peristiwa dan tetapan berubah

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `wire` | — → batal | Melampirkan pengendali klik, input, perubahan, roda dan tatal yang diwakilkan serta seretan panel. |
| `onClick` , `onInput` , `onChange` | acara → batal | Hantar klik, pergerakan peluncur dan pengeditan teks ke tetapan, profil atau tindakan. |
| `applyRange` | kunci, nilai → batal | Menggunakan nilai peluncur (kelantangan, kabur, kelegapan, tempoh…). |
| `setSetting` , `setChannel` | kunci/tampalan → batal | Simpan tetapan atau perubahan profil dan tolak bahagian yang terjejas kepada pemain. |
| `pushToPlayer` | skop, kunci → batal | `media` menggunakan semula kelantangan, mod senyap dan kelajuan; `all` juga menerapkan semula kualiti. Kelantangan, redam, mod senyap dan kelajuan jangan sekali-kali membuka semula menu kualiti. |
| `act` | nama, unsur → Janji | Menjalankan tindakan yang dinamakan: pratetap, menyimpan dan mengalih keluar saluran, sandaran, import/eksport, tuntutan, pemasa tidur, pintasan, diagnostik dan banyak lagi. |
| `resetSection` | id → batal | Memulihkan lalai satu bahagian. |
| `restoreVolume` | — → batal | Guna semula volum yang disimpan. |
| `toggleLayout` | yang → batal | Menyembunyikan atau menunjukkan sembang atau menu kiri dan mengingati pilihan. |
| `confirm` , `closeModal` | mesej, pilihan / keputusan → Janji/batal | Dialog pengesahan dalam panel (sama dalam setiap penyemak imbas). |
| `download` , `pickFile` , `pickImage` | … → batal | Simpan JSON, baca JSON dan pilih imej untuk butang tuntutan pantas. |
| `startCapture` , `finishCapture` | id / kombo → batal | Ikat semula kekunci pintas, menolak pendua. |
| `replayMock` | — → batal | Memainkan semula kesan terbuka dalam pratonton animasi. |

### Alat dan diagnostik

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | minit / — → batal | Mulakan, batalkan dan paparkan pemasa tidur (ia menjeda video pada penghujungnya). |
| `toggleFocusView` | — → Janji | Memasuki atau meninggalkan skrin penuh pada bekas pemain. |
| `statusText` , `resultText` , `syncDiagnostics` | — → rentetan/kosong | Status setempat untuk pengepala dan halaman diagnostik. |
| `record` | mesej, tahap → batal | Menambah entri bercap masa pada log tindakan. |
| `copyDiagnostics` | — → Janji | Menyalin laporan ringkas (versi, status, kualiti, jenis halaman, ejen pengguna). |
| `checkQuality` , `checkConflicts` | — → Janji/batal | Sahkan kualiti pilihan yang ditawarkan dan senaraikan tetapan yang berfungsi antara satu sama lain. |

### Butang tuntutan pantas

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `renderClaimWidget` | — → batal | Mencipta, mengemas kini atau mengalih keluar butang terapung dan memulakan tinjauan keadaan satu saatnya. |
| `syncClaimWidget` | — → batal | Menunjukkan cincin dan titik "ganjaran tersedia", keadaan sibuk dan peraturan autosembunyikan. |
| `placeClaimWidget` | — → batal | Letakkan butang, pasangkannya pada tingkap. |
| `wireClaimWidget` | unsur → batal | Seret dengan ambang lima piksel (seretan tidak pernah dikira sebagai klik), penjimatan kedudukan dan klik yang menjalankan tuntutan manual. |

### Pemberitahuan, bunyi dan tingkah laku panel

| Kaedah | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `notify` | mesej, jenis, tempoh, paksaan → batal | Menunjukkan roti bakar (melainkan ditindas), merekodkan sejarah dan mengumumkan teks dalam wilayah langsung. |
| `notifyQuality` | digunakan, kualiti → batal | Memainkan bunyi hasil, log dan menunjukkan pemberitahuan setempat. |
| `initToastPosition` , `wireToastDrag` | — → batal | Pulihkan dan simpan kedudukan roti bakar yang diseret. |
| `onAvatars` | — → batal | Menyegarkan halaman yang menunjukkan avatar. |
| `ensureAudio` | — → konteks | Mencipta dan menyambung semula `AudioContext` yang dikongsi (dibuka kunci pada gerak isyarat pengguna pertama). |
| `playSound` , `stopSounds` | nama, pratonton → batal | Hasilkan dan hentikan isyarat Audio Web. |
| `playFreezeAlarm` , `alertFrozen` | paksa → batal | Mainkan penggera lima nota dan tingkatkan pemberitahuan pembekuan. |
| `placePanel` , `wirePanelDrag` | kedudukan → batal | Letakkan panel di dalam tetingkap dan jadikan pengepala boleh diseret. |
| `open` , `close` , `toggle` | — → batal | Kawal bunyi panel, pengundian, fokus dan menu. |
| `syncVolumeControls` | — → batal | Memastikan peluncur kelantangan disegerakkan dengan pemain semasa panel dibuka. |

<a id="hotkeys-and-startup"></a>
## Kekunci pintas dan permulaan

| Fungsi | Parameter / pulangan | Apa dan bagaimana ia berlaku |
|---|---|---|
| `isolateKeys` | — → batal | Didaftarkan pada `document-start` dalam fasa tangkapan: peristiwa papan kekunci yang datang dari dalam panel berhenti merambat ke Kick (jadi Space, F, M dan anak panah tidak pernah mencetuskan kekunci pintas pemain) dan Tab terperangkap di dalam dialog. |
| `setupHotkeys` | — → batal | Mengendalikan penangkapan kunci untuk mengikat semula, Escape (modal, dropdown, panel), kekunci pintas menu dan kekunci pintas tindakan; kombo dengan pengubah suai atau kerja kunci F walaupun semasa menaip. |
| `init` | — → batal | Membina panel, memasang kekunci pintas dan memulakan `PlayerSync` ; terjaga daripada suntikan berganda. |

<a id="kick-page-dependencies"></a>
## Kebergantungan halaman tendang

Skrip bergantung pada markup semasa Kick. Seboleh-bolehnya ia menggunakan ikon, atribut dan struktur berbanding teks yang boleh dilihat, jadi ia terus berfungsi dalam setiap bahasa antara muka. Jika Kick mengubahnya, ciri padanan akan berhenti berfungsi (selebihnya terus berjalan).

| Ciri | Apa yang dicari |
|---|---|
| Kualiti | Masukan `<video>` , `button[aria-haspopup="menu"]` dan `[role="menuitemradio"]` . |
| Reka letak | Bekas dengan `data-sidebar` dan `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , butang ikon `CollapseRight` di dalam `#channel-chatroom` dan butang ikon `MessagesOutline` untuk menunjukkan sembang. |
| Pemberitahuan ganjaran | `video` yang sumbernya mengandungi `reward-available` , atau kad `[role="group"]` yang mengandungi video `daily-rewards` . |
| Tuntutan ganjaran | `button[aria-haspopup="dialog"][aria-controls]` (ikon hadiah), dialog yang dikawalnya ( `data-state` ), butang tuntutan yang didayakan dengan anak `.contents` dan butang tutup dengan label `.sr-only` . |
| Titisan | `#rewards-panel` senarai item dengan `[role="progressbar"][data-state="complete"]` dan butang yang didayakan. |
| Avatar | `img[alt]` elemen yang sumbernya ialah `files.kick.com/images/user/…/profile_image/…` . |

<a id="localization"></a>
## Penyetempatan

Setiap label, mesej bantuan, ralat, dialog dan pemberitahuan melalui penyelesai terjemahan untuk 38 tempat. Kekunci yang hilang kembali kepada bahasa Inggeris. Teks antara muka baharu diterjemahkan ke dalam semua bahasa yang disokong bersama-sama dengan ciri yang menambahkannya. Pemilih bahasa menunjukkan bendera dan nama asli; antara muka mengikut bahasa penyemak imbas pada kali pertama dijalankan dan mengingati pilihan yang jelas selepas itu.

<a id="safety-privacy-and-compatibility"></a>
## Keselamatan, privasi dan keserasian

- Tetapan dibersihkan sebelum penyimpanan; nilai tidak sah kembali kepada lalai selamat.
- Nama saluran, nota, teks pemberitahuan dan output diagnostik terlepas sebelum pemasukan HTML.
- Ikon butang tersuai dikod semula daripada kanvas dan disimpan sebagai URL data jenis imej yang dibenarkan sahaja; ia tidak pernah meninggalkan pelayar.
- Shadow DOM memastikan gaya skrip diasingkan daripada Kick; acara papan kekunci daripada panel diasingkan daripada kekunci pintas Kick.
- Tindakan automatik melangkau saluran yang dikecualikan, mod selamat dan unsur pemain yang tiada. Tuntutan ganjaran tidak sekali-kali menekan butang yang sama dua kali dalam satu larian dan menunggu sementara penonton menaip.
- Skrip tidak membuat permintaan rangkaian; kemas kini datang daripada pengurus skrip pengguna atau halaman Keluaran.
- Tetapan tempatan sedia ada dikekalkan apabila beralih daripada 1.1.0, 1.2.0 dan 1.3.0.
