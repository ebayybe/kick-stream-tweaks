<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · **Bahasa Melayu** · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweaks — Changelog

Nota keluaran untuk [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), skrip pengguna yang mengingati pilihan pemain Kick dan menambahkan panel kawalan boleh dikonfigurasikan.

## v1.3.1 — 2026-11-06

> Pengerasan reka letak untuk setiap bahasa dan saiz teks, gaya Minimum yang benar-benar berbeza, ganjaran dan pembantu reka letak, penggera pembekuan pemain dan bahasa lalai yang lebih pintar.

### Ditambah

- **Penggera pegun pemain.** Mengesan pemain yang terhenti atau skrin hitam (masa video bergerak tanpa bingkai dinyahkod), memainkan bunyi penggera yang kuat dan menunjukkan pemberitahuan, walaupun apabila tab diminimumkan. Masa pengesanan boleh dikonfigurasikan (5–60 s), togol bunyi bebas dan butang ujian.
- **Tuntutan automatik ganjaran** (dimatikan secara lalai): membuka tetingkap ganjaran, menuntut apa yang tersedia, menutupnya semula dan kembali ke strim. Titisan yang muncul dalam panel ganjaran juga dituntut. Termasuk butang *Tuntut sekarang*.
- **Jadual ganjaran.** Secara lalai, skrip menunggu pemberitahuan "tuntut ganjaran anda" Kick sendiri dan menuntutnya serta-merta (dengan kelewatan 0–60 saat pilihan), bukannya mengundi. Mod berjadual (setiap 5–60 min) juga tersedia.
- **Butang tuntut pantas.** Butang terapung kecil pada strim yang menuntut ganjaran anda dalam satu klik. Seret ke mana-mana sahaja (kedudukan diingati), pilih salah satu daripada empat reka bentuk (Orb, Pil, Kaca, Rata), lima ikon terbina dalam, saiz dan kelegapan, secara pilihan menunjukkannya hanya apabila ganjaran tersedia. Ia bersinar dan menunjukkan titik apabila pemberitahuan ganjaran Kick muncul. Halaman tetapan mempunyai pratonton langsung.
- **Ikon anda sendiri.** Muat naik PNG, JPG, WebP, GIF atau SVG (sehingga 2 MB) sebagai ikon butang, secara pilihan mengisi keseluruhan butang. Imej dikod semula ke segi empat sama kecil dan disimpan hanya dalam penyemak imbas anda.
- **Roda tetikus pada peluncur.** Setiap peluncur boleh dilaraskan dengan roda tetikus semasa melayangkannya, tanpa menatal panel.
- **Rujukan fungsi.** `en_FUNCTIONS.md` baharu mendokumenkan seni bina, setiap tetapan, setiap fungsi dan bahagian halaman Kick yang bergantung kepada skrip.
- **Penyimpanan saluran berpandu.** Kad "Cara saluran yang disimpan berfungsi", satu butang **Simpan saluran ini** yang menyimpan kualiti, kelantangan, kelajuan dan bunyi semasa untuk saluran yang sedang anda tonton, pembayang satu klik dalam Main balik untuk saluran yang tidak disimpan, roti bakar pengesahan, berlabel *Edit* / *Selesai* butang untuk menyahsimpan tetapan yang disimpan dan menukarnya.
- **Main balik senyap.** Senyapkan strim tanpa meredamkan pemain, jadi ia terus bermain dalam tab latar belakang. Berfungsi secara global dan setiap saluran yang disimpan (teg *Senyap* ditunjukkan dalam senarai saluran).
- **Carian tetapan berbilang bahasa.** Carian tidak sensitif aksen dan juga sepadan dengan nama Inggeris, jadi menaip `volume` mencari tetapan dalam mana-mana bahasa antara muka. Mencari mengikut bahagian atau tajuk kad menunjukkan keseluruhan bahagian.
- **Kawalan reka letak halaman**: sembunyikan sembang dan runtuhkan menu kiri daripada panel atau dengan kekunci pintas (`Alt+C`, `Alt+S`), dengan pilihan untuk mengingati reka letak bagi setiap strim.
- **Animasi ikon** untuk bar sisi, set semula dan ikon bantuan, dengan suisnya sendiri (juga sebahagian daripada pratetap animasi).
- **Avatar saluran** ditangkap daripada Kick dan ditunjukkan dalam senarai saluran yang disimpan.
- 14 warna aksen (adalah 6).
- Dialog pengesahan dalam panel yang kelihatan sama dalam setiap penyemak imbas.

### Berubah

- **Bahasa antara muka** kini mengikut bahasa penyemak imbas pada kali pertama dijalankan. Sebaik sahaja anda memilih bahasa, ia akan diingati. Tetapan yang dipindahkan daripada versi lama mengikut penyemak imbas sehingga bahasa dipilih secara eksplisit.
- Skrip kini bermula pada `document-start` jadi pengasingan papan kekuncinya didaftarkan sebelum pendengar halaman itu sendiri.
- Baris tetapan disusun (label di atas kawalan) supaya teks tidak boleh bertindih atau klip, pada sebarang bahasa, saiz teks atau lebar panel. Label bar sisi membalut pada sempadan perkataan.
- Pemilih animasi dibina semula sebagai baris lebar penuh dengan ikon, terjemahan yang panjang sesuai.
- Gaya panel **Minimal** kini rata dan segi empat sama tanpa cahaya, sempadan digantikan dengan pembahagi dan pemilihan gaya garis bawah, jadi perbezaan dari **Kick** adalah jelas.
- Panel mempunyai lebar tetap 680 px (ia mengecut untuk memuatkan tingkap kecil). Tetapan lebar panel dan pemegang ubah saiz telah dialih keluar, jadi reka letak adalah sama untuk semua orang.
- Tajuk animasi penunjuk tidak lagi menyebut "hijau" apabila warna aksen berbeza digunakan.

### Tetap

- Menukar kelantangan, membisukan, main balik senyap, kelantangan automatik atau kelajuan menggunakan semula kualiti juga (membuka semula menu kualiti dan menunjukkan pemberitahuan). Tetapan tersebut kini hanya menyentuh perkara yang anda ubah; kualiti digunakan semula hanya apabila tetapan kualiti berubah.
- Menaip dalam carian tetapan boleh mencetuskan kekunci pintas Kick (contohnya Space menukar strim ke skrin penuh). Ketukan kekunci di dalam panel tidak lagi sampai ke halaman.
- Kelantangan pilihan telah ditimpa apabila Kick menetapkan semula pemain kepada 50% sendiri selepas muat semula, dan peluncur panel menunjukkan 50%. Perubahan halaman yang dibuat sendiri kini dikembalikan kepada volum anda yang disimpan; hanya tindakan anda sendiri mengemas kininya.
- Keratan teks dan bertindih dalam Rupa, Animasi dan Kekunci Panas (label panjang, saiz teks besar, panel sempit, terjemahan panjang).
- Gaya Minimal melumpuhkan tetapan kabur latar belakang secara senyap; blur kini berfungsi dalam kedua-dua gaya.
- Menukar kelegapan butang tuntutan pantas tidak mengemas kini pratonton.
- Peluncur tidak bertindak balas terhadap roda tetikus.
- Jubin animasi ("Skala", "Pop") melimpahi kad mereka.
- Pengesahan padam profil menggunakan dialog asli penyemak imbas.
- Cip pemasa tidur tidak disetempatkan.
- Saluran yang disimpan tidak menunjukkan avatar, dan saluran semasa tidak menunjukkannya sehingga profilnya disimpan.

### Keserasian

- Tetapan sedia ada dan saluran yang disimpan dikekalkan apabila mengemas kini daripada v1.3.0, v1.2.0 dan v1.1.0.
- Skrip masih tidak menghantar telemetri dan tidak membuat permintaan rangkaian sendiri.

### Pautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Keluaran](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Isu](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Reka bentuk semula penuh, struktur tetapan logik, sistem animasi yang dibina semula dan pusingan pembetulan kebolehpercayaan untuk automasi pemain.

### Ditambah

- Panel direka bentuk semula dengan bar sisi berkumpulan: **Pemain** (Main Semula, Saluran, Alat), **Isyarat** (Pemberitahuan, Bunyi), **Antaramuka** (Penampilan, Animasi, Pintasan) dan **Sistem** (Diagnostik, Data & tentang).
- Halaman **Animasi** Baharu: peringkat pratonton langsung, tiga pratetap satu klik (Penuh, Dikurangkan, Mati) dan pemilih berasingan untuk kesan pembukaan (Tiada, Pudar, Slaid, Skala, Pop), kesan tuding, animasi penunjuk dan kelajuan.
- Pratetap pantas untuk Jimat lebar jalur, Kualiti terbaik, Paparan senyap dan VOD, digunakan serta-merta.
- Pemilih kualiti direka semula sebagai grid cip; kelajuan, skala teks dan pemasa tidur menggunakan cip dan kawalan bersegmen dan bukannya menu lungsur.
- Pengurus saluran sebaris: cari, pengisihan, penyematan, kumpulan, nota, penyuntingan setiap saluran dan sandaran/pemulihan penuh, semuanya tanpa dialog bersarang.
- Tetapan bunyi sebaris dengan suis setiap peristiwa, kelantangan dan butang pratonton.
- Imbasan kualiti dalam diagnostik: membuka menu pemain, merekod kualiti yang tersedia dan menutupnya semula.
- Kekunci pintas kini berfungsi pada sebarang susun atur papan kekunci (ia dipadankan dengan kekunci fizikal).
- Tetapan menyegerak antara tab Kick terbuka.
- Tangkapan warna aksen di sebelah pemilih warna tersuai, julat skala teks yang lebih tinggi dan perlindungan gerakan yang dikurangkan pilihan.

### Berubah

- Tetapan disimpan dalam format yang lebih kurus; konfigurasi 1.2.x, kekunci pintas dan pilihan animasi dipindahkan secara automatik.
- Kelajuan main balik hanya digunakan apabila ia berbeza daripada 1×, jadi tangkapan tepi langsung Kick tidak lagi ditindih.
- Buat asal sejarah disimpan dalam ingatan dan bukannya ditulis ke storan tempatan.
- Peristiwa bunyi, pemberitahuan dan kekunci pintas berkongsi satu set kawalan yang konsisten.
- Pemilih "Profil situasi" digantikan dengan pratetap satu klik.

### Tetap

- Menutup menu pemain selepas menggunakan kualiti tidak lagi berisiko membukanya semula.
- Kualiti sandaran (contohnya 720p dan bukannya 1080p yang tidak tersedia) tidak lagi menimpa kualiti pilihan yang disimpan untuk saluran.
- Hanya klik sebenar pada item berkualiti mengemas kini kualiti "terakhir digunakan"; klik automatik diabaikan.
- Carian tetapan tidak lagi gagal selepas menaip (sasaran acara telah hilang di dalam Shadow DOM).
- Perubahan yang dibuat dalam satu tab tidak lagi boleh menulis ganti tetapan daripada tab lain.
- Kekunci panas panel tidak lagi pecah pada susun atur bukan Latin.
- Label yang salah dalam kawalan log diagnostik dan perkataan Korea yang sesat dalam tajuk skrip Jepun.
- Semakan main balik terhenti dan penyegerakan strim dijeda semasa tab disembunyikan.

### Dialih keluar

- Ciri yang tidak boleh disahkan terhadap pemain Kick atau menduplikasinya: keutamaan kependaman rendah, menyembunyikan kawalan pemain semasa melahu dan semakan kemas kini dalam panel berasaskan GitHub (gunakan kemas kini pengurus skrip pengguna anda atau halaman Keluaran).
- Pilihan yang terlalu direkayasa: profil penampilan yang disimpan, paparan bahagian/sembunyi/susun semula, mod navigasi alternatif, keserasian dan semakan liputan terjemahan, animasi rawak/tatal/bahagian, tempoh pemberitahuan setiap peristiwa, avatar saluran, warna kumpulan, pesanan manual, pemilihan pukal, sejarah setiap saluran dan pembersihan automatik.

### Keserasian

- Tetapan sedia ada dan saluran yang disimpan dikekalkan apabila mengemas kini daripada v1.2.0 dan v1.1.0.
- Tetapan kekal setempat kepada penyemak imbas; skrip tidak menghantar telemetri atau membuat permintaan rangkaian.

### Pautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Keluaran](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Isu](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Memperluas kualiti asal dan pembantu volum menjadi kit alat tetapan pemain penuh.

### Ditambah

- Profil setiap saluran untuk kualiti, kelantangan, kelajuan main balik dan keadaan senyap.
- Senarai saluran yang disimpan dengan nota, kumpulan, penyuntingan profil dan import/eksport.
- Kesan bunyi dengan suis global, suis acara individu, pratonton dan volum setiap acara.
- Pemberitahuan untuk perubahan kualiti, kelantangan yang dipulihkan dan tindakan yang gagal.
- Sejarah pemberitahuan, log tindakan dan alat diagnostik dengan kawalan yang jelas.
- Semakan ketersediaan kualiti, semakan konflik dan semakan keserasian.
- Mod selamat untuk melumpuhkan perubahan pemain automatik buat sementara waktu.
- Kekunci pintas, seret panel, saiz semula panel dan tindakan panel tengah.
- Gaya panel Kick dan Minimal, susun atur padat dan kawalan animasi.
- Pemasa tidur, mod fokus skrin penuh, penyegerakan semula pemain dan kawalan main balik.
- Import/eksport tetapan dan profil saluran.
- Navigasi papan kekunci, penskalaan teks, pengumuman pembaca skrin dan kontras tinggi.
- Penyetempatan antara muka untuk 38 bahasa yang disokong.

### Tetap

- Menghalang berbilang dialog sekunder daripada muncul pada masa yang sama.
- Membetulkan dialog kosong yang muncul di atas tetingkap tetapan bunyi.
- Mengabaikan mesej pemberitahuan kosong dan bukannya menunjukkan tindanan kosong.
- Pembalut label panjang yang dipertingkatkan pada panel sempit dan susun atur setempat.
- Membetulkan penggantian pemegang tempat `{quality}` dan `{q}` dalam pemberitahuan.
- Kemas kini label versi dalam panel dan kemas kini perbandingan kepada 1.2.0.

### Keserasian

- Tetapan sedia ada dikekalkan apabila mengemas kini daripada v1.1.0.
- Tetapan kekal setempat kepada penyemak imbas; skrip tidak menghantar telemetri.
- Penyemak kemas kini membaca teg keluaran GitHub terkini dan tidak memasang kemas kini secara automatik.

### Pautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Keluaran](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Isu](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Versi awam asal memfokuskan pada mengingati kualiti dan kelantangan video pada Kick, menerapkannya secara automatik pada strim baharu dan menyediakan panel tetapan F2.
