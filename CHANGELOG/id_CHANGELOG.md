<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · **Bahasa Indonesia** · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Kick Stream Tweak — Changelog

Catatan rilis untuk [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), skrip pengguna yang mengingat preferensi pemain Kick dan menambahkan panel kontrol yang dapat dikonfigurasi.

## v1.3.1 — 06-11-2026

> Pengerasan tata letak untuk setiap bahasa dan ukuran teks, gaya Minimal yang benar-benar berbeda, bantuan penghargaan dan tata letak, alarm pembekuan pemain, dan bahasa default yang lebih cerdas.

### Ditambahkan

- **Alarm pembekuan pemutar.** Mendeteksi pemutar terhenti atau layar hitam (waktu video bergerak tanpa bingkai yang didekodekan), memutar suara alarm keras dan menampilkan pemberitahuan, bahkan ketika tab diminimalkan. Waktu deteksi yang dapat dikonfigurasi (5–60 detik), pengalih suara independen, dan tombol uji.
- **Klaim otomatis hadiah** (dinonaktifkan secara default): membuka jendela hadiah, mengklaim apa yang tersedia, menutupnya lagi, dan kembali ke streaming. Drop yang muncul di panel hadiah juga diklaim. Termasuk tombol *Klaim sekarang*.
- **Jadwal hadiah.** Secara default, skrip menunggu notifikasi "klaim hadiah Anda" dari Kick dan langsung mengklaimnya (dengan penundaan opsional 0–60 detik), alih-alih melakukan polling. Mode terjadwal (setiap 5–60 menit) juga tersedia.
- **Tombol klaim cepat.** Tombol mengambang kecil di aliran yang mengklaim hadiah Anda dalam satu klik. Seret ke mana saja (posisinya diingat), pilih salah satu dari empat desain (Orb, Pill, Glass, Flat), lima ikon bawaan, ukuran dan opacity, opsional tampilkan hanya ketika hadiah tersedia. Itu bersinar dan menunjukkan titik ketika pemberitahuan hadiah Kick muncul. Halaman pengaturan memiliki pratinjau langsung.
- **Ikon Anda sendiri.** Unggah PNG, JPG, WebP, GIF, atau SVG (hingga 2 MB) sebagai ikon tombol, secara opsional mengisi seluruh tombol. Gambar dikodekan ulang menjadi kotak kecil dan hanya disimpan di browser Anda.
- **Roda mouse pada penggeser.** Setiap penggeser dapat disesuaikan dengan roda mouse sambil mengarahkannya, tanpa perlu menggulir panel.
- **Referensi fungsi.** `en_FUNCTIONS.md` baru mendokumentasikan arsitektur, setiap pengaturan, setiap fungsi, dan bagian halaman Kick tempat skrip bergantung.
- **Penyimpanan saluran terpandu.** Kartu langkah demi langkah "Cara kerja saluran yang disimpan", satu tombol **Simpan saluran ini** yang menyimpan kualitas, volume, kecepatan, dan suara saat ini untuk saluran yang Anda tonton, petunjuk sekali klik di Pemutaran untuk saluran yang belum disimpan, roti konfirmasi, berlabel tombol *Edit* / *Selesai* dalam daftar dan tombol untuk menjeda pengaturan yang disimpan tanpa menghapusnya.
- **Pemutaran senyap.** Mengheningkan streaming tanpa membisukan pemutar, sehingga streaming terus diputar di tab latar belakang. Bekerja secara global dan per saluran yang disimpan (tag *Senyap* ditampilkan di daftar saluran).
- **Penelusuran setelan multibahasa.** Penelusuran tidak peka terhadap aksen dan juga cocok dengan nama bahasa Inggris, sehingga mengetik `volume` akan menemukan setelan dalam bahasa antarmuka apa pun. Pencarian berdasarkan bagian atau judul kartu menunjukkan keseluruhan bagian.
- **Kontrol tata letak halaman**: menyembunyikan obrolan dan menutup menu sebelah kiri dari panel atau dengan tombol pintas (`Alt+C`, `Alt+S`), dengan opsi untuk mengingat tata letak setiap aliran.
- **Ikon animasi** untuk ikon sidebar, reset dan bantuan, dengan tombolnya sendiri (juga bagian dari preset animasi).
- **Avatar saluran** diambil dari Kick dan ditampilkan di daftar saluran yang disimpan.
- 14 warna aksen (tadinya 6).
- Dialog konfirmasi dalam panel yang terlihat sama di setiap browser.

### Berubah

- **Bahasa antarmuka** kini mengikuti bahasa browser saat pertama kali dijalankan. Setelah Anda memilih suatu bahasa, bahasa itu akan diingat. Pengaturan yang dimigrasikan dari versi lama mengikuti browser hingga bahasa dipilih secara eksplisit.
- Skrip sekarang dimulai pada `document-start` sehingga isolasi keyboardnya didaftarkan sebelum pendengar laman itu sendiri.
- Baris pengaturan ditumpuk (label di atas kontrol) sehingga teks tidak boleh tumpang tindih atau terpotong, dalam bahasa, ukuran teks, atau lebar panel apa pun. Label sidebar membungkus batas kata.
- Pemilih animasi dibuat ulang sebagai baris lebar penuh dengan ikon, sehingga terjemahan yang panjang dapat disesuaikan.
- Gaya panel **Minimal** kini datar dan persegi tanpa cahaya, batas digantikan oleh pemisah dan pemilihan gaya garis bawah, sehingga perbedaan dari **Kick** terlihat jelas.
- Panel memiliki lebar tetap 680 px (menyusut agar sesuai dengan jendela kecil). Pengaturan lebar panel dan pengatur ukuran telah dihapus, sehingga tata letaknya sama untuk semua orang.
- Judul animasi indikator tidak lagi bertuliskan "hijau" ketika warna aksen berbeda digunakan.

### Diperbaiki

- Mengubah volume, mute, pemutaran senyap, volume otomatis atau kecepatan menerapkan kembali kualitasnya juga (membuka kembali menu kualitas dan menampilkan notifikasi). Pengaturan tersebut sekarang hanya menyentuh apa yang Anda ubah; kualitas diterapkan kembali hanya ketika pengaturan kualitas berubah.
- Mengetik dalam pencarian pengaturan dapat memicu tombol pintas Kick (misalnya Space mengalihkan streaming ke layar penuh). Penekanan tombol di dalam panel tidak lagi mencapai halaman.
- Volume yang diinginkan ditimpa saat Kick menyetel ulang pemutar ke 50% miliknya setelah memuat ulang, dan penggeser panel menunjukkan 50%. Perubahan yang dibuat sendiri oleh halaman kini dikembalikan ke volume yang Anda simpan; hanya tindakan Anda sendiri yang memperbaruinya.
- Pemotongan teks dan tumpang tindih dalam Tampilan, Animasi, dan Tombol Pintas (label panjang, ukuran teks besar, panel sempit, terjemahan panjang).
- Gaya Minimal secara diam-diam menonaktifkan pengaturan keburaman latar belakang; blur sekarang berfungsi di kedua gaya.
- Mengubah opasitas tombol klaim cepat tidak memperbarui pratinjau.
- Penggeser tidak bereaksi terhadap roda mouse.
- Ubin animasi ("Skala", "Pop") memenuhi kartunya.
- Konfirmasi penghapusan profil menggunakan dialog asli browser.
- Chip pengatur waktu tidur tidak terlokalisasi.
- Saluran yang disimpan tidak menampilkan avatar, dan saluran saat ini tidak menampilkan avatar apa pun hingga profilnya disimpan.

### Kompatibilitas

- Pengaturan yang ada dan saluran yang disimpan dipertahankan saat memperbarui dari v1.3.0, v1.2.0, dan v1.1.0.
- Skrip masih tidak mengirimkan telemetri dan tidak membuat permintaan jaringan sendiri.

### Tautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Rilis](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Masalah](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 03-11-2026

> Desain ulang penuh, struktur pengaturan logis, sistem animasi yang dibangun kembali, dan serangkaian perbaikan keandalan untuk otomatisasi pemutar.

### Ditambahkan

- Panel didesain ulang dengan sidebar yang dikelompokkan: **Pemain** (Pemutaran, Saluran, Alat), **Peringatan** (Pemberitahuan, Suara), **Antarmuka** (Penampilan, Animasi, Pintasan) dan **Sistem** (Diagnostik, Data & tentang).
- Halaman **Animasi** baru: tahap pratinjau langsung, tiga preset sekali klik (Penuh, Dikurangi, Mati) dan pemilih terpisah untuk efek pembuka (Tidak Ada, Pudar, Geser, Skala, Pop), efek hover, animasi indikator, dan kecepatan.
- Preset cepat untuk Menghemat bandwidth, Kualitas terbaik, Tampilan senyap dan VOD, diterapkan secara instan.
- Pemilih kualitas didesain ulang sebagai kotak chip; kecepatan, skala teks, dan pengatur waktu tidur menggunakan chip dan kontrol tersegmentasi, bukan dropdown.
- Manajer saluran sebaris: pencarian, pengurutan, penyematan, pengelompokan, catatan, pengeditan per saluran, dan pencadangan/pemulihan penuh, semuanya tanpa dialog bersarang.
- Pengaturan suara sebaris dengan tombol per acara, volume, dan pratinjau.
- Pemindaian kualitas dalam diagnostik: membuka menu pemutar, mencatat kualitas yang tersedia dan menutupnya kembali.
- Tombol pintas sekarang berfungsi pada tata letak keyboard apa pun (disesuaikan dengan tombol fisik).
- Pengaturan sinkronisasi antara tab Kick yang terbuka.
- Contoh warna aksen di samping pemilih warna khusus, rentang skala teks yang lebih tinggi, dan perlindungan gerakan yang lebih disukai.

### Berubah

- Pengaturan disimpan dalam format yang lebih ramping; konfigurasi 1.2.x, tombol pintas dan pilihan animasi dimigrasikan secara otomatis.
- Kecepatan pemutaran hanya diterapkan ketika berbeda dari 1×, jadi kejar-kejaran Kick sendiri tidak lagi dikesampingkan.
- Riwayat pembatalan disimpan di memori alih-alih ditulis ke penyimpanan lokal.
- Acara suara, notifikasi, dan tombol pintas berbagi satu set kontrol yang konsisten.
- Pemilih "Profil situasi" diganti dengan preset sekali klik.

### Diperbaiki

- Menutup menu pemutar setelah menerapkan kualitas tidak lagi berisiko membukanya kembali.
- Kualitas cadangan (misalnya 720p, bukan 1080p yang tidak tersedia) tidak lagi menimpa kualitas pilihan yang disimpan untuk suatu saluran.
- Hanya klik nyata pada item berkualitas yang memperbarui kualitas "terakhir digunakan"; klik otomatis diabaikan.
- Pencarian pengaturan tidak lagi gagal setelah mengetik (target event hilang di dalam Shadow DOM).
- Perubahan yang dilakukan pada satu tab tidak dapat lagi menimpa pengaturan dari tab lain.
- Tombol pintas panel tidak lagi rusak pada tata letak non-Latin.
- Label yang salah pada kontrol log diagnostik dan kata Korea yang menyimpang pada judul skrip Jepang.
- Pemeriksaan pemutaran terhenti dan jeda sinkronisasi streaming saat tab disembunyikan.

### Dihapus

- Fitur yang tidak dapat diverifikasi terhadap pemain Kick atau menduplikasinya: preferensi latensi rendah, sembunyikan kontrol pemain saat idle dan pemeriksaan pembaruan dalam panel berbasis GitHub (gunakan pembaruan manajer skrip pengguna Anda atau halaman Rilis).
- Opsi rekayasa berlebihan: profil tampilan tersimpan, tampilan/sembunyikan/susun ulang bagian, mode navigasi alternatif, pemeriksaan kompatibilitas dan cakupan terjemahan, animasi acak/gulir/bagian, durasi pemberitahuan per acara, avatar saluran, warna grup, pemesanan manual, pemilihan massal, riwayat per saluran, dan pembersihan otomatis.

### Kompatibilitas

- Pengaturan yang ada dan saluran tersimpan dipertahankan saat memperbarui dari v1.2.0 dan v1.1.0.
- Pengaturan tetap bersifat lokal untuk browser; skrip tidak mengirim telemetri atau membuat permintaan jaringan.

### Tautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Rilis](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Masalah](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 07-10-2026

> Memperluas pembantu kualitas dan volume asli menjadi perangkat pengaturan pemutar lengkap.

### Ditambahkan

- Profil per saluran untuk kualitas, volume, kecepatan pemutaran, dan status bisu.
- Daftar saluran tersimpan dengan catatan, grup, pengeditan profil, dan impor/ekspor.
- Efek suara dengan saklar global, saklar acara individual, pratinjau dan volume per acara.
- Pemberitahuan untuk perubahan kualitas, volume yang dipulihkan, dan tindakan yang gagal.
- Riwayat pemberitahuan, log tindakan, dan alat diagnostik dengan kontrol yang jelas.
- Pemeriksaan ketersediaan kualitas, pemeriksaan konflik dan pemeriksaan kompatibilitas.
- Mode aman untuk menonaktifkan sementara perubahan pemutar otomatis.
- Tombol pintas, menyeret panel, mengubah ukuran panel, dan tindakan panel tengah.
- Gaya panel Tendangan dan Minimal, tata letak ringkas, dan kontrol animasi.
- Pengatur waktu tidur, mode fokus layar penuh, sinkronisasi ulang pemutar, dan kontrol pemutaran.
- Impor/ekspor pengaturan dan profil saluran.
- Navigasi keyboard, penskalaan teks, pengumuman pembaca layar, dan kontras tinggi.
- Lokalisasi antarmuka untuk 38 bahasa yang didukung.

### Diperbaiki

- Mencegah beberapa dialog sekunder muncul secara bersamaan.
- Memperbaiki dialog kosong yang muncul di atas jendela pengaturan suara.
- Mengabaikan pesan notifikasi kosong alih-alih menampilkan overlay kosong.
- Pembungkusan label panjang yang lebih baik pada panel sempit dan tata letak lokal.
- Penggantian placeholder `{quality` dan `{q}` dalam notifikasi telah diperbaiki.
- Memperbarui label versi dalam panel dan memperbarui perbandingan ke 1.2.0.

### Kompatibilitas

- Pengaturan yang ada dipertahankan saat memperbarui dari v1.1.0.
- Pengaturan tetap bersifat lokal untuk browser; skrip tidak mengirim telemetri.
- Pemeriksa pembaruan membaca tag rilis GitHub terbaru dan tidak menginstal pembaruan secara otomatis.

### Tautan

- [Repositori](https://github.com/ebayybe/kick-stream-tweaks)
- [Rilis](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Masalah](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Versi publik asli berfokus pada mengingat kualitas dan volume video di Kick, menerapkannya secara otomatis ke streaming baru, dan menyediakan panel pengaturan F2.
