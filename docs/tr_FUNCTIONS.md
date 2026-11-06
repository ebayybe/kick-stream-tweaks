<div align="center">

[English](./en_FUNCTIONS.md) · [العربية](./ar_FUNCTIONS.md) · [Беларуская](./be_FUNCTIONS.md) · [Български](./bg_FUNCTIONS.md) · [Čeština](./cs_FUNCTIONS.md) · [Dansk](./da_FUNCTIONS.md) · [Deutsch](./de_FUNCTIONS.md) · [Ελληνικά](./el_FUNCTIONS.md) · [Español](./es_FUNCTIONS.md) · [Suomi](./fi_FUNCTIONS.md) · [Français](./fr_FUNCTIONS.md) · [हिन्दी](./hi_FUNCTIONS.md) · [English (India)](./en-in_FUNCTIONS.md) · [Hrvatski](./hr_FUNCTIONS.md) · [Magyar](./hu_FUNCTIONS.md) · [Bahasa Indonesia](./id_FUNCTIONS.md) · [Italiano](./it_FUNCTIONS.md) · [日本語](./ja_FUNCTIONS.md) · [한국어](./ko_FUNCTIONS.md) · [Lietuvių](./lt_FUNCTIONS.md) · [Latviešu](./lv_FUNCTIONS.md) · [Македонски](./mk_FUNCTIONS.md) · [Монгол](./mn_FUNCTIONS.md) · [Bahasa Melayu](./ms_FUNCTIONS.md) · [Nederlands](./nl_FUNCTIONS.md) · [Norsk](./no_FUNCTIONS.md) · [Polski](./pl_FUNCTIONS.md) · [Português](./pt_FUNCTIONS.md) · [Română](./ro_FUNCTIONS.md) · [Русский](./ru_FUNCTIONS.md) · [Slovenčina](./sk_FUNCTIONS.md) · [Srpski](./sr_FUNCTIONS.md) · [Svenska](./sv_FUNCTIONS.md) · [ไทย](./th_FUNCTIONS.md) · **Türkçe** · [Tiếng Việt](./vi_FUNCTIONS.md) · [简体中文](./zh-cn_FUNCTIONS.md) · [繁體中文](./zh-tw_FUNCTIONS.md)

</div>




# Yayın Akışı Tweak'lerini Başlatma — İşlev Referansı

Kick Stream Tweaks 1.3.1 için referans. Her işlevsel alanın ne yaptığını, ayarların nasıl saklandığını, komut dosyasının Kick sayfasının hangi bölümlerine bağlı olduğunu ve kullanıcı metninde adı geçen her işlevin veya yöntemin nasıl çalıştığını açıklar. [Depoya](https://github.com/ebayybe/kick-stream-tweaks) ve [değişiklik günlüğüne](../CHANGELOG/en_CHANGELOG.md) bakın.

> Adlar kaynakla eşleşiyor. `void` bir fonksiyonun yan etkiler yoluyla etki ettiği anlamına gelir. `Object.method` olarak yazılan bir yöntem bu nesnede bulunur ( `PlayerSync` , `Extras` , `GUI` , `Store` ).

## İçindekiler

1. [Mimarlık](#architecture)
2. [Kullanıcıya yönelik davranış](#user-facing-behavior)
3. [Ayarlar referansı](#settings-reference)
4. [Temel araçlar](#core-utilities)
5. [Ayarların saklanması](#settings-storage)
6. [Oyuncu senkronizasyonu ( `PlayerSync` )](#player-synchronization-playersync)
7. [Sayfa ekstraları ( `Extras` )](#page-extras-extras)
8. [Arayüz yapı taşları](#interface-building-blocks)
9. [Ayarlar sayfaları ( `PAGES` )](#settings-pages-pages)
10. [Panel denetleyicisi ( `GUI` )](#panel-controller-gui)
11. [Kısayol tuşları ve başlatma](#hotkeys-and-startup)
12. [Sayfa bağımlılıklarını başlat](#kick-page-dependencies)
13. [Yerelleştirme](#localization)
14. [Güvenlik, gizlilik ve uyumluluk](#safety-privacy-and-compatibility)

<a id="architecture"></a>
## Mimarlık

Kullanıcı betiği `document-start` `@grant none` ile çalışan bağımsız bir dosyadır. Oluşturma adımı yoktur ve kendi ağ isteğinde bulunmaz.

| Katman | Nesne / alan | Sorumluluk |
|---|---|---|
| Veri | `TR` , `DIAG` , `FLAGS` , `LANG_NAMES` | 38 dile yönelik çeviriler, yerelleştirilmiş teşhis mesajları, işaret SVG'leri ve dil adları. |
| Yapılandırma | `CONFIG` , `DEFAULTS` | Sabitler (seçiciler, yeniden deneme sınırları, ön ayarlar, bölümler) ve varsayılan ayarlar. |
| Depolama | `sanitizeSettings` , `Store` , `persist` | `localStorage` ayarları doğrular ve kaydeder; bellekte bir geri alma yığını tutar. |
| Oyuncu mantığı | `PlayerSync` | Videoyu bulur, kaliteyi, ses seviyesini, hızı ve sessiz modunu geri yükler, donmaları izler. |
| Sayfa yardımcıları | `Extras` | Düzen düğmeleri, ödül alma, kanal avatarları ve arka plan planlayıcı. |
| Arayüz | `PAGES` , `GUI` , yardımcılar | Shadow-DOM paneli, bildirimler, sesler, kayan hızlı talep düğmesi, kısayol tuşları. |

Veri akışı: 1,5 saniyelik `PlayerSync.sync` döngüsü, etkili ayarları okur (önce kanal profili, ardından genel), bunları oynatıcıya uygular ve `Extras.tick` çağırır. Kullanıcı eylemleri, ayarları `persist` olarak güncelleyen ve yalnızca etkilenen kısmı ( `media` veya `all` ) oynatıcıya gönderen `GUI` işleyicilerinden geçer.

<a id="user-facing-behavior"></a>
## Kullanıcıya yönelik davranış

| Alan | Davranış |
|---|---|
| Oyuncu kalıcılığı | Canlı/VOD kalitesini, ses seviyesini, sessiz durumunu, sessiz modu ve hızı kaydeder ve ardından yeni bir akış algılandığında bunları uygular. Sayfanın kendi kendine yaptığı değişiklikler (örneğin Kick'in sesi %50'ye sıfırlaması) geri alınır; kaydedilen değerleri yalnızca izleyicinin kendi eylemleri günceller. |
| Kalite | Oynatıcı menüsünden tercih edilen kaliteyi seçer, mevcut olmadığında bir sonraki alt kaliteye (veya Otomatik) geri döner ve menüyü tekrar kapatır. Yalnızca gerçek kullanıcı tıklamaları, betiğe yeni bir "son kullanılan" niteliğini öğretir. |
| Ses seviyesi ve sessiz oynatma | Ses seviyesi ve ses kapatma, akış başına geri yüklenir. Sessiz oynatma, videoyu Web Sesi motoru üzerinden sıfır kazançla yönlendirir, böylece akış sessize alınmadan arka plan sekmesinde oynatılmaya devam eder. |
| Kanal profilleri | **Bu kanalı kaydet,** izlenen kanalın mevcut kalitesini, ses seviyesini, hızını ve sesini saklar. Profiller ayrıca notları, grupları, pin durumunu, avatarı ve etkin/hariç tutulan bayrakları da içerir. |
| Ön ayarlar | Bant genişliğinden tasarruf edin, En iyi kalite, Sessiz görüntüleme ve VOD tek tıklamayla uygulanır. |
| Paneli | `F2` veya özel bir kısayol tuşu, gruplandırılmış bir kenar çubuğu, arama, Kick ve Minimal stiller, açık/koyu temalar, 14 vurgu rengi artı bir renk seçici, kompakt düzen, arka plan bulanıklığı, metin ölçekleme, yüksek kontrast ve animasyon kontrolleri içeren sabit genişlikte (680 piksel) bir panel açar. |
| Ara | Vurguya duyarlı değildir, arayüz diliyle İngilizce adlarla eşleşir ve bölüm veya kart başlıklarıyla eşleşir. Panele yazılan tuş vuruşları hiçbir zaman Kick'in kısayol tuşlarına ulaşmaz. |
| Kaydırıcılar | Her kaydırıcı tıklamalara, sürüklemeye, klavye oklarına ve fare tekerleğine yanıt verir. |
| Sesler | Menü eylemleri, ayar değişiklikleri, kalite başarısı/başarısızlığı ve ses düzeyi restorasyonu için Web Sesi ipuçları; her birinde bir anahtar, önizleme ve ses düzeyi bulunur. |
| Bildirimler | Sürüklenebilen, ölçeklendirilebilen, şeffaf hale getirilebilen, sessize alınabilen (rahatsız etmeyin, tam ekran sessize alın) ve tarihe kaydedilebilen yerelleştirilmiş mesajlar. |
| Donma alarmı | Durmuş bir oynatıcıyı veya siyah ekranı algılar, yüksek sesli bir alarm çalar (ses efekti anahtarından bağımsız olarak gizli bir sekmede bile olsa) ve bir bildirim gösterir. |
| Ödüller | İsteğe bağlı otomatik talep, Kick'in ödül bildirimini bekler (veya bir programa göre çalışır), ödüller penceresini açar, mevcut olanı talep eder ve kapatır. Kayan, sürüklenebilir bir hızlı talep düğmesi, tek tıklamayla aynı şeyi yapar. |
| Düzen | Sohbeti gizler ve soldaki menüyü panelden veya kısayol tuşlarıyla daraltır, isteğe bağlı olarak her akış için seçimi hatırlar. |
| Araçlar | Uyku zamanlayıcısı, odak (tam ekran) görünümü, oynatıcının yeniden senkronizasyonu ve her otomatik değişikliği duraklatan güvenli mod. |
| Teşhis | Canlı durum, algılanan nitelikler, video çözünürlüğü, kalite taraması, çakışma kontrolü, eylem günlüğü ve kopyalanabilir bir rapor. |
| Veri | Ayarları dışa/içe aktarma, geri alma, sıfırlamadan sonra geri yükleme, kayıtlı kanalları yedekleme/geri yükleme. |
| Gizlilik | Ayarlar, profiller, günlükler ve geçmişler tarayıcı depolama alanında kalır. Hiçbir yere hiçbir şey gönderilmiyor. |

<a id="settings-reference"></a>
## Ayarlar referansı

Tüm değerler `sanitizeSettings` tarafından doğrulanır; geçersiz olan her şey varsayılana geri döner. Aralıklar uygulanır.

### Oyuncu

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `autoQualityEnabled` | boole | `true` | Tercih edilen kaliteyi otomatik olarak uygulayın. |
| `preferredLiveQuality` , `preferredVodQuality` | `auto` , `1080p60` , `1080p` , `720p` , `480p` , `360p` , `160p` | `auto` | Canlı yayınlar ve VOD'lar için geçerli kalite. `auto` "son seçimimi hatırla" anlamına gelir. |
| `lastLiveQuality` , `lastVodQuality` | aynı | `auto` | İzleyicinin elle seçtiği son kalite. |
| `qualityFallback` | `lower` , `auto` | `lower` | Tercih edilen kalite sunulmadığında ne yapılmalıdır? |
| `autoVolumeEnabled` | boole | `true` | Kaydedilen birimi geri yükleyin ve koruyun. |
| `volume` | 0–1 | `1` | Kaydedilen hacim. |
| `muted` ​​| boole | `false` | Sessiz durumu kaydedildi. |
| `silent` | boole | `false` | Sessiz oynatma (sıfır kazançlı ses grafiği, oynatıcının sesi kapatılmamış). |
| `playbackRate` | 0,25–2,5 | `1` | Kaydedilen hız; `1` asla zorlanmaz. |
| `warnLoudVolume` , `loudVolumeThreshold` | boole; 60–100, adım 5 | `true` ; `85` | Yüksek hacimli uyarı. |
| `safeMode` | boole | `false` | Her otomatik değişikliği duraklatın. |
| `channelProfiles` | nesne, en fazla 200 | `{}` | Kanal başına profiller (aşağıya bakın). |

Kanal profili alanları: `enabled` , `excluded` , `liveQuality` , `vodQuality` , `volume` , `muted` , `silent` , `playbackRate` , `displayName` , `pinned` , `avatar` (yalnızca `https://…kick.com/images/user/…` URL'ler), `note` (240 karakter), `group` (40 karakter), `updatedAt` , `lastUsed` .

### Bildirimler ve sesler

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `notificationsEnabled` | boole | `true` | Sonuç bildirimlerini göster. |
| `doNotDisturb` , `quietFullscreen` | boole | `false` , `true` | Bildirimleri ve sesleri veya yalnızca tam ekranda bastırın. |
| `notificationScale` | 0,8–1,4 | `1` | Bildirim boyutu. |
| `notificationDuration` | 1500–12000 ms, adım 500 | `3500` | Bir bildirimin ne kadar süreyle kalacağı. |
| `notificationOpacity` | 0,35–1 | `0.95` | Bildirim şeffaflığı. |
| `notificationShowIcon` | boole | `true` | Durum simgesini göster. |
| `notificationPosition` | `{x, y}` veya `null` | `null` | Sürüklenen konum. |
| `notificationHistoryEnabled` , `notificationHistory` | boole; en fazla 30 giriş | `true` ; `[]` | Bildirimlerin geçmişi. |
| `soundEffectsEnabled` , `soundVolume` | boole; 0–1 | `false` ; `0.35` | Ana anahtar ve ses seviyesi. |
| `soundEvents` , `soundEventVolumes` | olay başına: `menu` , `settingChanged` , `qualityApplied` , `qualityFailed` , `volumeApplied` | hepsi açık; `0.35` | Olay başına geçiş ve ses seviyesi. |

### Görünüm, hareket ve kısayollar

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `theme` | `dark` , `light` | `dark` | Renk teması. |
| `panelStyle` | `kick` , `minimal` | `kick` | Panelin görsel stili. |
| `accentColor` | `#rrggbb` | `#53fc18` | Vurgu rengi. |
| `compactMode` , `highContrast` | boole | `false` | Yoğunluk ve kontrast. |
| `backdropBlur` | 0–12 piksel | `6` | Panelin arkasında arka plan bulanıklığı (her iki stilde de çalışır). |
| `textScale` | 0,9–1,3 | `1` | Metin boyutu. |
| `language` , `languageChosen` | yerel ayar kodu; boole | tarayıcı dili; `false` | Arayüz, bir dil seçilene kadar tarayıcı dilini takip eder, ardından seçim hatırlanır. |
| `panelPosition` | `{x, y}` veya `null` | `null` | Sürüklenen panel konumu. |
| `motionSpeed` | `fast` , `normal` , `slow` | `normal` | Animasyon hızı. |
| `openEffect` | `none` , `fade` , `slide` , `scale` , `pop` | `scale` | Panel açma/kapama efekti. |
| `hoverEffect` | `none` , `lift` , `glow` | `lift` | Vurgulu etkisi. |
| `indicatorAnimation` | `glow` , `pulse` , `breathe` , `off` | `glow` | Logo/gösterge animasyonu. |
| `iconAnimations` | boole | `true` | Kenar çubuğunu canlandırın, sıfırlayın ve yardım simgelerini kullanın. |
| `hotkey` | birleşik dize | `F2` | Paneli açar veya kapatır. |
| `actionHotkeys` | karma dizeler | `Alt+N` , `Alt+F` , `Alt+Q` , `Alt+V` , `Alt+C` , `Alt+S` | Bildirimleri değiştirin, görünüme odaklanın, kaliteyi sıfırlayın, ses seviyesini geri yükleyin, sohbeti değiştirin, sol menüye geçin. |

Key combos are stored as strings such as `Alt+Q` and matched by physical key, so they work on any keyboard layout. Nesne şeklindeki kısayol tuşuna sahip eski sürümlerdeki ayarlar otomatik olarak dönüştürülür. Panel genişliği 680 piksel olarak sabitlenmiştir (pencere boyutuyla sınırlıdır); önceki genişlik ayarı dikkate alınmaz.

### Aletler

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `autoRecoverStall` | boole | `false` | Bir donma algılandığında `play()` işlevini deneyin. |
| `freezeAlertEnabled` , `freezeSound` | boole | `true` | Bildirimi ve alarm sesini dondurun. |
| `freezeSeconds` | 5–60, adım 5 | `10` | Alarmdan önceki saniyelerde ilerleme yok. |
| `layoutHideChat` , `layoutCollapseSidebar` | boole | `false` | Hatırlanan düzen, sayfa başına bir kez uygulanır. |
| `autoClaimRewards` | boole | `false` | Otomatik ödül talebini etkinleştirin. |
| `claimMode` | `notify` , `interval` | `notify` | Kick bildirimini gösterdiğinde veya bir programa göre hak talebinde bulunun. |
| `claimDelaySec` | 0–120, adım 5 | `5` | Bildirim göründükten sonra bekleyin (bildirim modu). |
| `claimIntervalMin` | 5–120, adım 5 | `10` | Kontroller arasındaki dakikalar (planlanmış mod). |

### Hızlı talep düğmesi

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `claimWidget` | boole | `false` | Kayan düğmeyi göster. |
| `claimWidgetStyle` | `orb` , `pill` , `glass` , `flat` | `orb` | Düğme tasarımı. |
| `claimWidgetIcon` | `gift` , `crown` , `star` , `bolt` , `coin` , `custom` | `gift` | Yerleşik simge veya kullanıcının kendi resmi. |
| `claimWidgetCustomIcon` | `data:image/(png\|webp\|jpeg);base64,…` , en fazla 90.000 karakter | boş | Yüklenen görüntünün yeniden kodlanmış kopyası. Bunun dışındaki her şey reddedilir. |
| `claimWidgetImageFill` | boole | `false` | Özel bir görüntünün tüm düğmeyi doldurmasına izin verin (hap tasarımında kullanılmaz). |
| `claimWidgetSize` | `s` , `m` , `l` | `m` | Düğme boyutu. |
| `claimWidgetOpacity` | 0,3–1 | `0.9` | Düğme opaklığı (ödül mevcutken tam opaklık). |
| `claimWidgetAutoHide` | boole | `false` | Düğmeyi yalnızca bir ödül mevcut olduğunda gösterin. |
| `claimWidgetPos` | `{x, y}` veya `null` | `null` | Sürüklenen konum. |

### Teşhis ve durum

| Anahtar | Tip / aralık | Varsayılan | Anlamı |
|---|---|---|---|
| `diagnosticsLogEnabled` , `diagnosticsLog` | boole; 60 girişe kadar | `true` ; `[]` | Eylem günlüğü. |
| `activeSection` | bölüm kimliği | `playback` | Son açılan sayfa. |
| `resetBackup` | ayarlar nesnesi | `null` | Sıfırlama veya içe aktarma işleminden önce çekilen anlık görüntü. |

<a id="core-utilities"></a>
## Temel yardımcı programlar

| İşlev | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `detectLanguage` | — → yerel ayar | `navigator.languages` ​​üzerinde yürür, bölgesel değişkenleri eşler ( `zh-HK` → `zh-tw` , `nb` / `nn` → `no` ) ve desteklenen ilk yerel ayarı veya `en` döndürür. |
| `dictFor` | dil → sözlük | Bir yerel ayara ilişkin çeviri tablosunu, temel diline ve ardından İngilizceye geri dönerek döndürür. |
| `t` / `T` | dil, anahtar, değişkenler → dize | Bir anahtarı `{placeholder}` ikamesi ile çözer; `T` geçerli dili kullanır. |
| `diagText` | indeks, kalite → string | Yerelleştirilmiş tanılama cümlelerinden birini döndürür. |
| `log` | …args → geçersiz | Komut dosyası önekiyle konsol günlüğü kaydı. |
| `clamp` , `sleep` , `esc` | değer → değer | Aralık sınırlama, söze dayalı gecikme ve HTML kaçışı. |
| `normalizeQuality` | metin → dize | Kalite etiketini küçük harfle yazar ve boşlukları kaldırır. |
| `debounce` | fn, bekle → işlev | Bir `flush` yöntemiyle sondaki geri sıçrama. |
| `onLocationChange` | geri arama → geçersiz | `pushState` / `replaceState` sararak, `popstate` dinleyerek ve saniyede bir yoklama yaparak tek sayfalı gezinmeyi algılar. |
| `keyLabelFromEvent` , `comboFromEvent` , `matchesCombo` | olay → dize/boolean | Fiziksel anahtar kodundan tuş kombinasyonlarını oluşturun ve karşılaştırın. |
| `mkPointer` | yazın, ekstra → olay | Kick'in ARIA menülerini çalıştırmak için bir `PointerEvent` (veya kullanılamadığında bir `MouseEvent` ) oluşturur. |
| `waitFor` | prob, zaman aşımı, adım → değer/boş | Araştırma bir değer döndürünceye veya zaman aşımı bitene kadar yoklama yapar. |
| `imageToDataUrl` | resim → dize | Bir görüntüyü kare bir tuval halinde ölçeklendirir (oranları koruyarak, `willReadFrequently` ), 128, 96 ve 64 pikseli dener ve 70.000 karakterden büyük olmayan bir PNG veri URL'si döndürür. |

<a id="settings-storage"></a>
## Ayarların saklanması

| İşlev | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `sanitizeProfiles` | nesne → nesne | Her alanda geçerli anahtarlar ve kelepçelerle en fazla 200 profili tutar; avatar bir Kick görseli URL'si olmalıdır. |
| `sanitizeSettings` | nesne, withBackup → nesne | Her ayarı (türler, aralıklar, izin verilen değerler) doğrular, 1.1-1.3 ayarlarını (eski kalite, kısayol tuşu, animasyon ve bölüm tuşları) taşır ve dil kuralını uygular. |
| `legacyHotkey` | değer → dize | Nesne şeklindeki bir kısayol tuşunu birleşik dizeye dönüştürür. |
| `Store.load` / `Store.save` | — / ayarlar → ayarlar/void | Temizlenmiş nesneyi `localStorage` okuyun ve yazın ( `kickTweaks.settings.v1` ). |
| `persist` | yama, `{undo}` → geçersiz | Bir yamayı birleştirir, temizler, kısa bir geri dönüşle kaydeder ve isteğe bağlı olarak geri alınan bir anlık görüntüyü gönderir (yalnızca bellekte tutulur, en fazla 15). |
| `storage` dinleyicisi | olay → geçersiz | Başka bir Kick sekmesi değiştirdiğinde ayarları yeniden yükler, böylece sekmeler hiçbir zaman birbirinin üzerine yazmaz. |

<a id="player-synchronization-playersync"></a>
## Oyuncu senkronizasyonu ( `PlayerSync` )

### Kanal ve profil yardımcıları

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `isVod` | — → boolean | URL'den bir VOD sayfasını algılar. |
| `channelKey` | — → dize | Sonucu üç saniye boyunca önbelleğe alarak stabil `channel:slug` anahtarını (veya `vod:id` , `kick:home` ) oluşturur. VOD sayfalarında oynatıcıya en yakın kanal bağlantısı kullanılır. |
| `channelSlug` | — → dize | Kanal anahtarının bilgi kısmını döndürür. |
| `profile` | tuşu → nesne/boş | Kaydedilmiş bir profili okur. |
| `profileActive` | — → nesne/boş | Geçerli profili yalnızca etkinleştirildiğinde ve hariç tutulmadığında döndürür. |
| `isExcluded` | — → boolean | Bu kanal için otomasyonun devre dışı olup olmadığını kontrol eder. |
| `updateProfile` | yama, anahtar → geçersiz | Bir profil oluşturur veya birleştirir ve `updatedAt` damgasını atar. |
| `saveCurrentChannel` | — → nesne/boş | İzleyicinin mevcut kalitesini, ses seviyesini, sessiz durumunu, hızını ve sessiz durumunu etkin bir profil olarak saklar ve sayfayı kanal avatarı için tarar. |
| `effective` | — → nesne | Ses seviyesini, sessizliği, sessizliği, hızı ve canlı/VOD kalitesini etkin profilden veya genel ayarlardan çözer. |
| `setStatus` | durum, sonuç → geçersiz | Başlıkta ve teşhiste gösterilen durumu ve son sonuç kodlarını günceller. |

### Kick'in oyuncusunu bulma ve kullanma

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `findMainVideo` | — → video/boş | Görünür en büyük `<video>` öğesini seçer. |
| `streamKey` | — → dize | Akış başına bir kez kaliteyi uygulamak için kullanılan sayfa yolunu döndürür. |
| `isAccountButton` | düğmesi → boolean | Başlık, avatar ve hesap düğmelerini reddeder. |
| `findSettingsButton` | video → düğme/boş | Oynatıcının vites düğmesini etikete göre veya videonun sağ alt köşesine yakınlığa göre bulur. |
| `revealControls` | video → geçersiz | Gizli kontrollerin görünmesi için fareyle üzerine gelme olaylarını gönderir. |
| `simulateClick` | eleman → geçersiz | Kick'in menülerinin ihtiyaç duyduğu tam işaretçi-olay dizisini gönderir. |
| `menuItems` | — → öğe[] | Görünür `menuitemradio` girişlerini listeler. |
| `openQualityMenu` | — → düğme/boş | Dişli menüsünü açar, üst düzey bir menü göründüğünde kaliteli bir girişe adım atar ve seçenekleri bekler. |
| `closeMenu` | düğmesi → Söz | Menüyü yalnızca hala açıksa kapatır (kör bir ikinci tıklama onu yeniden açabilir), Escape geri dönüşüyle. |
| `readMenu` | — → öğe[] | Sunulan kaliteleri ve kontrol edilenleri kaydeder. |
| `scanQualities` | — → Söz<boolean> | Menüyü açar, mevcut kaliteleri kaydeder ve kapatır (tanılama tarafından kullanılır). |
| `activate` | öğe → Söz | Bir seçeneğe tıklar ve işaretlenene kadar bekler. |
| `selectQuality` | istenen, geri dönüş → Söz | İstenilen kaliteyi, aksi takdirde bir sonraki düşük kaliteyi veya Otomatik'i seçer. |
| `desiredQuality` | — → dize | Profilden, tercihten veya son manuel seçimden uygulanacak kaliteyi seçer. |
| `applyQualityOnce` | StreamKey → Söz | İstenilen kaliteyi yayın başına bir kez uygular, menüyü kapatır ve başarı veya başarısızlık hakkında bilgi verir. |
| `watchManualQuality` | — → geçersiz | Yalnızca gerçek (güvenilir) tıklamalardan yeni bir "son kullanılan" kalitesini öğrenir, böylece otomatik tıklamalar ve geri dönüşler hiçbir zaman kayıtlı değerlerin üzerine yazmaz. |

### Ses seviyesi, sessiz mod, hız ve izleme

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `applyVolume` | video, sessiz → geçersiz | Etkin ses düzeyini ve sessiz durumunu yazar (komut dosyasının kendi değişikliği olarak işaretlenir). |
| `trackInput` | — → geçersiz | Son güvenilen işaretçinin, tekerleğin, dokunmanın veya klavye girişinin zamanını kaydeder. |
| `reassertVolume` | video → geçersiz | Sayfa herhangi bir kullanıcı girişi olmadan değiştirildiğinde kaydedilen birimi geri koyar (on saniyede sekiz geri dönüşle hız sınırlıdır). |
| `watchVolume` | video → geçersiz | `volumechange` dinler: kullanıcı odaklı değişiklikler kaydedilir, sayfa odaklı değişiklikler geri alınır. |
| `checkLoud` | ses seviyesi, sessiz → geçersiz | Ses düzeyi eşiği aştığında bir kez uyarır. |
| `buildGraph` | video → grafik/null | Videoyu bir kazanç düğümü aracılığıyla bir `AudioContext` bağlar; site buna izin vermediğinde raporlar. |
| `applySilent` | video → geçersiz | Sessiz oynatma için kazancı 0'a veya gerektiğinde bağlamı devam ettirerek 1'e geri ayarlar. |
| `applyRate` | video, kuvvet → geçersiz | Kaydedilen hızı ayarlar; `1` izleyici seçmediği sürece zorlanmaz, bu nedenle Kick'in kendi canlı kenar yakalamasına saygı gösterilir. |
| `applyMedia` | video, `{rate}` → geçersiz | Kaliteye dokunmadan ses seviyesini, sessiz modu ve isteğe bağlı olarak hızı yeniden uygular. |
| `monitorFreeze` | video → geçersiz | Durmuş bir oynatıcıyı (sıkışmış zaman) veya siyah ekranı (kodu çözülmüş çerçeveler olmadan hareket eden zaman) algılar ve alarmı ve isteğe bağlı kurtarmayı tetikler. Gizli sekmelerde çalışır. |

### Döngü ve yaşam döngüsü

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `sync` | — → Söz | Ana döngü: donmaları izler, dinleyicileri bağlar, sessiz modu, ses seviyesini, hızı ve kaliteyi uygular, güvenli moda ve istisnalara saygı gösterir, ardından `Extras.tick` çağırır. |
| `resync` | — → Söz | Yeni bir geçişe zorlar (ön ayarlar, hızlı eylemler ve kalite değişiklikleri tarafından kullanılır). |
| `init` | — → geçersiz | İlk senkronizasyonu, gezinme dinleyicisini ve 1,5 saniyelik aralığı başlatır. |

<a id="page-extras-extras"></a>
## Sayfa ekstraları ( `Extras` )

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `root` , `layoutState` | — → öğe / `{chat, sidebar}` | Sayfa kapsayıcısındaki `data-chat` ve `data-sidebar` Kick'in düzen durumunu okuyun. |
| `isDesktop` | — → boolean | Düzen otomasyonu yalnızca masaüstü genişliklerinde çalışır. |
| `click` | öğe → boolean | `PlayerSync.simulateClick` aracılığıyla yapılan tıklamalar. |
| `chatHideButton` , `chatShowButton` | — → düğme/boş | Sohbet odasının içindeki daralt düğmesini ve "sohbeti göster" düğmesini bulun (dile göre değil, simgeye göre). |
| `setChat` , `setSidebar` | göster → boolean | Kick'in kendi düğmelerine basarak sohbeti veya sol menüyü istenen duruma getirin. |
| `applyLayout` | — → geçersiz | Hatırlanan düzeni sayfa başına bir kez uygular ve hiçbir zaman manuel değişikliklerle uğraşmaz. |
| `isTyping` | — → boolean | İzleyici bir alana yazarken doğrudur; otomatik talepler bekleyin. |
| `rewardTrigger` , `popoverCard` | — → düğme/boş | Hediye düğmesini ve ödül açılır kartını bulun. |
| `rewardAvailable` | — → boolean | Kick'in kendi "ödül mevcut" sinyalini (animasyonlu harekete geçirici mesaj) algılar. |
| `isEnabled` | düğmesi → boolean | Görünür ve devre dışı değil. |
| `claimDrops` | — → Söz<number> | Ödül panelinde tamamlanan düşüşler için etkinleştirilen talep düğmelerine basar. |
| `claimDaily` | tetikleyici → Söz<number> | Ödül penceresini açar, etkin olan her talep düğmesine bir kez basar (asla aynı düğmeye iki kez basılmaz), ardından pencereyi kapatır. |
| `claimRewards` | `{manual}` → Söz<number> | Tam bir talep çalıştırır, sonucu bildirir ve bir ses çalar; manuel çalıştırmalar yazmayı göz ardı eder ve talep edilecek bir şey olmadığında rapor verir. |
| `normName` | metin → dize | Adları eşleştirmek için normalleştirir ( `_` ve boşluklar `-` ile). |
| `findAvatar` | sümüklü böcek → dize | Sayfada görünen kanal avatarını döndürür (kanal kaydedilmeden önce kullanılır). |
| `scanAvatars` | — → geçersiz | Avatarı olmayan kayıtlı kanallar için avatarları saklar. |
| `tick` | StreamKey → void | Zamanlayıcı `sync` çağrılır: düzeni uygular, avatarları tarar, ödül bildirimini bekler (gecikmeli ve iki dakikalık bekleme süresine sahip bildirim modu) veya seçilen aralığı kontrol eder ve düşme panelini yoklar. |

<a id="interface-building-blocks"></a>
## Arayüz yapı taşları

| İşlev | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `I` | ad → svg | Satır içi kontur simgesi. |
| `fmtValue` | biçim, ham → dize | Kaydırıcı değerlerini (yüzde, piksel, saniye) biçimlendirir. |
| `normSearch` , `englishOf` , `searchText` | metin → dize | Çevrilmiş bir etiketin İngilizce adını içeren, vurguya duyarlı olmayan arama metni. |
| `row` | anahtar, etiket, kontrol, seçenekler → html | Bir ayar satırı; varsayılan olarak yığınlanmıştır, yalnızca anahtarlar için satır içidir ve isteğe bağlı bir yardım düğmesi vardır. |
| `sw` , `toggleRow` | … → html | Anahtar kontrolü ve hazır bir anahtar sırası. |
| `chip` , `seg` , `qualityChips` | … → html | Çipler, bölümlere ayrılmış kontroller ve kalite ızgarası. |
| `range` | öznitelik, anahtar, seçenekler → html | Doldurma izi ve canlı değer içeren kaydırıcı. |
| `card` , `btn` , `ib` | … → html | Kart, metin düğmesi ve simge düğmesi. |
| `timeStr` | zaman damgası → dize | Yerelleştirilmiş saat zamanı. |
| `setPref` | anahtar, değer → geçersiz | Etkin kanal profiline veya genel ayarlara bir oynatıcı tercihi yazar. |
| `fxBtn` | anahtar, değer, etiket, açık → html | Küçük bir önizleme glifine sahip efekt seçici döşemesi. |
| `avatarHtml` | ad, URL → html | Bir harf geri dönüşü olan Avatar; başarısız bir görüntü kaldırılır. |
| `hasCustomIcon` , `cwAttrs` , `cwIcon` , `claimWidgetInner` | — → değer | Hem canlı düğme hem de ayarlar önizlemesi için hızlı talep düğmesi işaretlemesini oluşturun. |

<a id="settings-pages-pages"></a>
## Ayarlar sayfaları ( `PAGES` )

| Sayfa | İçindekiler |
|---|---|
| `playback` | Bu kanalı kaydet ipucu, ön ayarlar, kalite (otomatik uygulama, canlı, VOD, geri dönüş), ses seviyesi (otomatik uygulama, kaydırıcı, sessize alma, sessiz oynatma, sesli uyarı) ve hız. |
| `channels` | Nasıl çalışır adımları, **Bu kanalı kaydet** düğmesiyle mevcut kanal, duraklatma/hariç tutma anahtarları ve düzenleyici, ardından yedekleme ve geri yükleme ile kayıtlı kanal listesi (arama, sıralama, sabitleme filtresi, gruplar, Düzenle/Bitti, sil). |
| `tools` | Kapanma zamanlayıcısı, sayfa düzeni, ödüller (otomatik talep, mod, gecikme veya aralık, Şimdi talep et), canlı önizleme, donma alarmı ve hızlı eylemlerle hızlı talep düğmesi ayarları. |
| `notifications` | Anahtarlar, boyut, süre, opaklık, önizleme, konum sıfırlama ve geçmiş. |
| `sounds` | Ana anahtar ve ses seviyesi, olay başına anahtarlar, hacimler ve önizlemeler. |
| `appearance` | Tema, stil, vurgu renkleri, yoğunluk, kontrast, metin boyutu, bulanıklık, ortalama ve dil. |
| `motion` | Açık efekt, fareyle üzerine gelme efekti, gösterge, hız ve simge animasyonları için canlı önizleme, ön ayarlar ve seçiciler. |
| `shortcuts` | Yeniden bağlama özelliğine sahip menü kısayol tuşu ve eylem kısayol tuşları. |
| `diagnostics` | Durum, tarama, raporlama, kalite ve çakışma kontrolleri, güvenli mod ve eylem günlüğü. |
| `about` | Sürüm, bağlantılar, dışa aktarma/içe aktarma, geri alma, geri yükleme ve sıfırlama. |

<a id="panel-controller-gui"></a>
## Panel denetleyicisi ( `GUI` )

### İnşaat ve işleme

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `build` | — → geçersiz | Gölge DOM ana bilgisayarını, panelini, tost ve canlı bölgeyi oluşturur, ardından olayları bağlar. |
| `applyLook` | — → geçersiz | Nitelikler ve CSS değişkenleri olarak tema, stil, vurgu, bulanıklaştırma, metin ölçeği, efektler, dil niteliği ve tost ayarlarını uygular. |
| `renderChrome` | — → geçersiz | Başlığı, arama yer tutucusunu, duraklatma düğmesini, alt bilgi ipucunu ve hızlı talep düğmesini işler. |
| `renderNav` | — → geçersiz | Gruplandırılmış kenar çubuğunu işler. |
| `renderPage` | seçenekler → geçersiz | Kaydırma ve klavye odağını koruyarak etkin sayfayı (veya arama sırasında tüm sayfaları) işler. |
| `filterRows` | — → geçersiz | Arama filtresini satırlara, kartlara ve sayfalara uygular. |
| `channelEditor` | anahtar, profil → html | Bir kanal profilinin editörü. |
| `refreshAll` , `onExternalChange` | — → geçersiz | Sıfırlama, içe aktarma, geri alma veya başka bir sekmede değişiklik yaptıktan sonra her şeyi yeniden oluşturun. |

### Etkinlikler ve ayar değişiklikleri

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `wire` | — → geçersiz | Temsilci tıklama, giriş, değiştirme, tekerlek ve kaydırma işleyicilerini ve panel sürüklemeyi ekler. |
| `onClick` , `onInput` , `onChange` | olay → geçersiz | Tıklamaları, kaydırıcı hareketlerini ve metin düzenlemelerini ayarlara, profillere veya eylemlere gönderin. |
| `applyRange` | anahtar, değer → geçersiz | Bir kaydırıcı değeri uygular (ses seviyesi, bulanıklık, opaklık, süreler…). |
| `setSetting` , `setChannel` | anahtar/yama → geçersiz | Bir ayarı veya profil değişikliğini kaydedin ve etkilenen kısmı oynatıcıya aktarın. |
| `pushToPlayer` | kapsam, anahtar → void | `media` ses düzeyini, sessiz modunu ve hızı yeniden uygular; `all` aynı zamanda kaliteyi yeniden uygular. Ses seviyesi, sessiz mod ve hız hiçbir zaman kalite menüsünü yeniden açmaz. |
| `act` | isim, eleman → Söz | Adlandırılmış eylemleri çalıştırır: ön ayarlar, kanalları kaydetme ve kaldırma, yedekleme, içe/dışa aktarma, talepler, uyku zamanlayıcısı, kısayollar, teşhisler ve daha fazlası. |
| `resetSection` | kimlik → geçersiz | Bir bölümün varsayılanlarını geri yükler. |
| `restoreVolume` | — → geçersiz | Kaydedilen hacmi yeniden uygular. |
| `toggleLayout` | hangisi → geçersiz | Sohbeti veya sol menüyü gizler veya gösterir ve seçimi hatırlar. |
| `confirm` , `closeModal` | mesaj, seçenekler / sonuç → Söz/geçersiz | Panel içi onay iletişim kutusu (her tarayıcıda aynıdır). |
| `download` , `pickFile` , `pickImage` | … → geçersiz | JSON'u kaydedin, JSON'u okuyun ve hızlı talep düğmesi için bir resim seçin. |
| `startCapture` , `finishCapture` | kimlik / birleşik → geçersiz | Kopyaları reddederek bir kısayol tuşunu yeniden bağlayın. |
| `replayMock` | — → geçersiz | Animasyon önizlemesinde açık efekti yeniden oynatır. |

### Araçlar ve teşhis

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `startSleep` , `cancelSleep` , `syncSleep` | dakika / — → geçersiz | Uyku zamanlayıcısını başlatın, iptal edin ve görüntüleyin (videonun sonunda duraklatılır). |
| `toggleFocusView` | — → Söz | Oynatıcı kapsayıcısında tam ekrana girer veya çıkar. |
| `statusText` , `resultText` , `syncDiagnostics` | — → dize/boşluk | Başlık ve teşhis sayfası için yerelleştirilmiş durum. |
| `record` | mesaj, seviye → geçersiz | Eylem günlüğüne zaman damgalı bir giriş ekler. |
| `copyDiagnostics` | — → Söz | Kısa bir raporu kopyalar (sürüm, durum, nitelikler, sayfa türü, kullanıcı aracısı). |
| `checkQuality` , `checkConflicts` | — → Söz/geçersizlik | Tercih edilen kalitenin sunulduğunu doğrulayın ve birbirine zıt çalışan ayarları listeleyin. |

### Hızlı talep düğmesi

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `renderClaimWidget` | — → geçersiz | Kayan düğmeyi oluşturur, günceller veya kaldırır ve bir saniyelik durum yoklamasını başlatır. |
| `syncClaimWidget` | — → geçersiz | "Ödül mevcut" halkasını ve noktasını, meşgul durumunu ve otomatik gizleme kuralını gösterir. |
| `placeClaimWidget` | — → geçersiz | Düğmeyi pencereye sıkıştırarak konumlandırır. |
| `wireClaimWidget` | eleman → geçersiz | Beş piksellik eşikle sürükleyin (sürükleme hiçbir zaman tıklama olarak sayılmaz), konum kaydetme ve manuel hak talebini çalıştıran tıklama. |

### Bildirimler, ses ve panel davranışı

| Yöntem | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `notify` | mesaj, tür, süre, kuvvet → void | Bir kadeh kaldırır (bastırılmadığı sürece), geçmişi kaydeder ve metni canlı bir bölgede duyurur. |
| `notifyQuality` | uygulanmış, kalite → geçersiz | Sonuç sesini çalar, günlüğe kaydeder ve yerelleştirilmiş bir bildirim gösterir. |
| `initToastPosition` , `wireToastDrag` | — → geçersiz | Sürüklenen kızartma konumunu geri yükleyin ve kaydedin. |
| `onAvatars` | — → geçersiz | Avatarları gösteren sayfaları yeniler. |
| `ensureAudio` | — → bağlam | Paylaşılan `AudioContext` oluşturur ve devam ettirir (ilk kullanıcı hareketinde kilidi açılır). |
| `playSound` , `stopSounds` | ad, önizleme → void | Web Sesi ipuçlarını oluşturun ve durdurun. |
| `playFreezeAlarm` , `alertFrozen` | kuvvet → boşluk | Beş notalı alarmı çalın ve donma bildirimini yükseltin. |
| `placePanel` , `wirePanelDrag` | konum → geçersiz | Paneli pencerenin içine yerleştirin ve başlığı sürüklenebilir hale getirin. |
| `open` , `close` , `toggle` | — → geçersiz | Paneli, yoklamayı, odağı ve menü seslerini kontrol edin. |
| `syncVolumeControls` | — → geçersiz | Panel açıkken ses kaydırıcısını oynatıcıyla senkronize tutar. |

<a id="hotkeys-and-startup"></a>
## Kısayol tuşları ve başlangıç

| İşlev | Parametreler / dönüş | Ne ve nasıl |
|---|---|---|
| `isolateKeys` | — → geçersiz | Yakalama aşamasında `document-start` kayıtlıdır: panelin içinden gelen klavye olayları Kick'e yayılmayı durdurur (böylece Space, F, M ve oklar hiçbir zaman oynatıcı kısayol tuşlarını tetiklemez) ve Sekme iletişim kutusunun içinde sıkışıp kalır. |
| `setupHotkeys` | — → geçersiz | Yeniden bağlama, Kaçış (modal, açılır menü, panel), menü kısayol tuşu ve eylem kısayol tuşları için tuş yakalamayı yönetir; değiştirici veya F tuşuyla yapılan kombinasyonlar yazarken bile çalışır. |
| `init` | — → geçersiz | Paneli oluşturur, kısayol tuşlarını yükler ve `PlayerSync` başlatır; çift ​​enjeksiyona karşı korumalı. |

<a id="kick-page-dependencies"></a>
## Sayfa bağımlılıklarını başlat

Senaryo, Kick'in mevcut işaretlemesine dayanıyor. Mümkün olan her yerde görünür metin yerine simgeler, nitelikler ve yapı kullanır, böylece her arayüz dilinde çalışmaya devam eder. Kick bunları değiştirirse eşleştirme özelliği çalışmayı durdurur (geri kalanı çalışmaya devam eder).

| Özellik | Ne arıyor |
|---|---|
| Kalite | Görünür bir `<video>` , oynatıcının `button[aria-haspopup="menu"]` ve `[role="menuitemradio"]` girişleri. |
| Düzen | `data-sidebar` ve `data-chat` , `[data-testid="sidebar-collapse"]` / `sidebar-expand` , `#channel-chatroom` içinde bir `CollapseRight` simge düğmesi ve sohbeti göstermek için bir `MessagesOutline` simgesi düğmesi içeren bir kapsayıcı. |
| Ödül bildirimi | Kaynağında `reward-available` olan bir `video` veya `daily-rewards` videosu içeren bir `[role="group"]` kartı. |
| Ödül talep etme | Bir `button[aria-haspopup="dialog"][aria-controls]` (hediye simgesi), kontrol ettiği iletişim kutusu ( `data-state` ), `.contents` alt öğesi olan etkin talep düğmeleri ve `.sr-only` etiketli bir kapatma düğmesi. |
| Damlalar | `#rewards-panel` öğelerini `[role="progressbar"][data-state="complete"]` ve etkinleştirilmiş bir düğmeyle listeler. |
| Avatarlar | Kaynağı `files.kick.com/images/user/…/profile_image/…` olan `img[alt]` öğeleri. |

<a id="localization"></a>
## Yerelleştirme

Her etiket, yardım mesajı, hata, diyalog ve bildirim 38 yerel ayar için çeviri çözümleyiciden geçer. Eksik anahtarlar İngilizce'ye geri döner. Yeni arayüz metni, onu ekleyen özellik ile birlikte desteklenen tüm dillere çevrilir. Dil seçici bayrakları ve yerel adları gösterir; arayüz ilk çalıştırmada tarayıcı dilini takip eder ve daha sonra açık bir seçimi hatırlar.

<a id="safety-privacy-and-compatibility"></a>
## Güvenlik, gizlilik ve uyumluluk

- Ayarlar saklanmadan önce sterilize edilir; geçersiz değerler güvenli varsayılanlara geri döner.
- Kanal adları, notlar, bildirim metni ve teşhis çıktısı, HTML eklemeden önce çıkarılır.
- Özel bir düğme simgesi bir tuvalden yeniden kodlanır ve yalnızca izin verilen görüntü türünün veri URL'si olarak saklanır; tarayıcıdan asla ayrılmaz.
- Shadow DOM, betiğin stillerini Kick'ten izole eder; Paneldeki klavye olayları Kick'in kısayol tuşlarından izole edilmiştir.
- Otomatik eylemler hariç tutulan kanalları, güvenli modu ve eksik oynatıcı öğelerini atlar. Ödül talebinde asla aynı düğmeye iki kez basılmaz ve izleyici yazarken beklenir.
- Betik hiçbir ağ isteğinde bulunmaz; güncellemeler kullanıcı betiği yöneticisinden veya Sürümler sayfasından gelir.
- 1.1.0, 1.2.0 ve 1.3.0'dan geçiş yaparken mevcut yerel ayarlar korunur.
