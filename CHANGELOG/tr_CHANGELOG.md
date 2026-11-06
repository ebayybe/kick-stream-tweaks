<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · [Čeština](./cs_CHANGELOG.md) · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · **Türkçe** · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Yayın Tweak'lerini Başlat — Değişiklik Günlüğü

Kick oynatıcı tercihlerini hatırlayan ve yapılandırılabilir bir kontrol paneli ekleyen bir kullanıcı komut dosyası olan [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks) için sürüm notları.

## v1.3.1 — 2026-11-06

> Her dil ve metin boyutu için düzen sağlamlaştırma, gerçekten farklı bir Minimal stil, ödüller ve düzen yardımcıları, oyuncu dondurma alarmı ve daha akıllı bir varsayılan dil.

### Eklendi

- **Oynatıcı donma alarmı.** Durmuş bir oynatıcıyı veya siyah ekranı algılar (kodu çözülmüş çerçeveler olmadan hareket eden video süresi), yüksek bir alarm sesi çalar ve sekme simge durumuna küçültülmüş olsa bile bir bildirim görüntüler. Yapılandırılabilir algılama süresi (5-60 sn), bağımsız ses geçişi ve bir test düğmesi.
- **Ödülleri otomatik olarak al** (varsayılan olarak kapalı): ödüller penceresini açar, mevcut olanı alır, tekrar kapatır ve yayına geri döner. Ödül panelinde görünen ödüller de talep edilir. *Şimdi talep et* düğmesi içerir.
- **Ödül planı.** Varsayılan olarak komut dosyası, Kick'in kendi "ödülünüzü talep edin" bildirimini bekler ve yoklama yerine hemen (isteğe bağlı 0-60 saniyelik bir gecikmeyle) bunu talep eder. Planlanmış bir mod da (her 5-60 dakikada bir) mevcuttur.
- **Hızlı talep düğmesi.** Tek tıklamayla ödülünüzü talep eden, akışta yer alan küçük, kayan bir düğme. Herhangi bir yere sürükleyin (konum hatırlanır), dört tasarımdan (Küre, Hap, Cam, Düz), beş yerleşik simgeden, bir boyut ve bir opaklıktan birini seçin, isteğe bağlı olarak yalnızca bir ödül mevcut olduğunda gösterin. Kick'in ödül bildirimi göründüğünde parlıyor ve bir nokta gösteriyor. Ayarlar sayfasında canlı bir önizleme bulunur.
- **Kendi simgeniz.** İsteğe bağlı olarak düğmenin tamamını dolduracak şekilde düğme simgesi olarak bir PNG, JPG, WebP, GIF veya SVG (en fazla 2 MB) yükleyin. Resim küçük bir kareye yeniden kodlanır ve yalnızca tarayıcınızda saklanır.
- **Kaydırıcılarda fare tekerleği.** Her kaydırıcı, paneli kaydırmadan fare tekerleğinin üzerinde gezdirilerek ayarlanabilir.
- **İşlev referansı.** Yeni `en_FUNCTIONS.md` mimariyi, her ayarı, her işlevi ve Kick sayfasının betiğin bağlı olduğu bölümlerini belgeliyor.
- **Kılavuzlu kanal kaydetme.** Adım adım "Kayıtlı kanallar nasıl çalışır" kartı, izlediğiniz kanalın mevcut kalitesini, ses seviyesini, hızını ve sesini saklayan tek bir **Bu kanalı kaydet** düğmesi, kaydedilmemiş kanallar için Oynatma'da tek tıklamayla ipucu, listede *Düzenle* / *Bitti* düğmeleriyle etiketlenmiş bir onay işareti ve kayıtlı ayarları silmeden duraklatmak için bir anahtar.
- **Sessiz oynatma.** Oynatıcının sesini kapatmadan akışı susturur, böylece arka plan sekmesinde oynatılmaya devam eder. Genel olarak ve kayıtlı kanal başına çalışır (kanal listesinde *Sessiz* etiketi gösterilir).
- **Çok dilli ayar araması.** Arama, aksandan etkilenmez ve aynı zamanda İngilizce adlarla da eşleşir; bu nedenle, `volume` yazıldığında, herhangi bir arayüz dilindeki ayar bulunur. Bölüme veya kart başlığına göre arama yapıldığında bölümün tamamı gösterilir.
- **Sayfa düzeni kontrolleri**: sohbeti gizleyin ve panelden veya kısayol tuşlarıyla (`Alt+C`, `Alt+S`) sol menüyü daraltın ve her akışın düzenini hatırlama seçeneğiyle birlikte.
- Kenar çubuğu, sıfırlama ve yardım simgeleri için kendi anahtarlarıyla **simge animasyonları** (aynı zamanda animasyon ön ayarlarının bir parçası).
- **Kanal avatarları** Kick'ten alınır ve kayıtlı kanal listesinde gösterilir.
- 14 vurgu rengi (6’ydı).
- Her tarayıcıda aynı görünen panel içi onay iletişim kutusu.

### Değiştirildi

- **Arayüz dili** artık ilk çalıştırmada tarayıcı dilini takip ediyor. Bir dil seçtiğinizde hatırlanır. Eski sürümlerden taşınan ayarlar, bir dil açıkça seçilene kadar tarayıcıyı takip eder.
- Komut dosyası artık `document-start`'ta başlıyor, böylece klavye izolasyonu sayfanın kendi dinleyicilerinden önce kaydediliyor.
- Ayar satırları yığılmıştır (etiket kontrolün üstündedir), böylece metin hiçbir zaman herhangi bir dilde, metin boyutunda veya panel genişliğinde üst üste gelemez veya kırpılamaz. Kenar çubuğu etiketleri sözcük sınırlarına sarılır.
- Animasyon seçiciler simgeler içeren tam genişlikte satırlar halinde yeniden oluşturulduğundan uzun çeviriler sığar.
- **Minimal** panel stili artık düz ve kare, parlama yok, kenarlıklar yerini bölücülere ve altı çizili stil seçimine bırakıyor, dolayısıyla **Kick**'ten farkı çok açık.
- Panelin sabit genişliği 680 pikseldir (küçük pencerelere sığacak şekilde küçülür). Panel genişliği ayarı ve yeniden boyutlandırma tutamacı kaldırıldı, böylece düzenler herkes için aynı oldu.
- Farklı bir vurgu rengi kullanıldığında gösterge animasyonu başlığında artık "yeşil" yazmıyor.

### Sabit

- Ses seviyesi, sessiz, sessiz oynatma, otomatik ses seviyesi veya hız değiştirildiğinde kalite de yeniden uygulandı (kalite menüsünün yeniden açılması ve bir bildirim gösterilmesi). Bu ayarlar artık yalnızca değiştirdiğiniz şeylere dokunuyor; kalite yalnızca bir kalite ayarı değiştiğinde yeniden uygulanır.
- Ayarlar aramasında yazmak Kick'in kısayol tuşlarını tetikleyebilir (örneğin Space akışı tam ekrana değiştirdi). Panel içindeki tuş vuruşları artık sayfaya ulaşmıyor.
- Kick, yeniden yükleme sonrasında oynatıcıyı kendi %50'sine sıfırladığında ve panel kaydırıcısı %50'yi gösterdiğinde tercih edilen ses düzeyinin üzerine yazıldı. Sayfanın kendi başına yaptığı değişiklikler artık kayıtlı biriminize geri döndürülür; yalnızca kendi eylemleriniz onu günceller.
- Görünüm, Animasyonlar ve Kısayol Tuşlarında metin kırpma ve üst üste binme (uzun etiketler, büyük metin boyutları, dar paneller, uzun çeviriler).
- Minimal stil, arka plan bulanıklaştırma ayarını sessizce devre dışı bıraktı; bulanıklaştırma artık her iki tarzda da çalışıyor.
- Hızlı talep düğmesinin opaklığının değiştirilmesi önizlemeyi güncellemedi.
- Kaydırıcılar fare tekerleğine tepki vermedi.
- Kartlarından taşan animasyon döşemeleri ("Ölçek", "Pop").
- Profil silme onayı tarayıcının yerel iletişim kutusunu kullandı.
- Uyku zamanlayıcı çipleri yerelleştirilmemişti.
- Kaydedilen kanallarda avatar gösterilmiyordu ve mevcut kanal, profili kaydedilene kadar hiçbir avatar göstermiyordu.

### Uyumluluk

- V1.3.0, v1.2.0 ve v1.1.0'dan güncelleme yapılırken mevcut ayarlar ve kayıtlı kanallar korunur.
- Betik hala telemetri göndermiyor ve kendi ağ isteğinde bulunmuyor.

### Bağlantılar

- [Depo](https://github.com/ebayybe/kick-stream-tweaks)
- [Yayınlar](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Sorunlar](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Tamamen yeniden tasarım, mantıksal ayar yapısı, yeniden oluşturulmuş animasyon sistemi ve oynatıcı otomasyonu için bir dizi güvenilirlik düzeltmesi.

### Eklendi

- Gruplandırılmış kenar çubuğuna sahip yeniden tasarlanmış panel: **Oynatıcı** (Oynatma, Kanallar, Araçlar), **Uyarılar** (Bildirimler, Sesler), **Arayüz** (Görünüm, Animasyonlar, Kısayollar) ve **Sistem** (Teşhis, Veriler ve hakkında).
- Yeni **Animasyonlar** sayfası: canlı önizleme aşaması, tek tıklamayla üç ön ayar (Tam, Küçültülmüş, Kapalı) ve açılış efekti (Yok, Soldur, Slayt, Ölçek, Pop), fareyle üzerine gelme efekti, gösterge animasyonu ve hız için ayrı seçiciler.
- Bant genişliğinden tasarruf edin, En iyi kalite, Sessiz görüntüleme ve VOD için hızlı ön ayarlar anında uygulanır.
- Kalite seçici, çip ızgarası olarak yeniden tasarlandı; hız, metin ölçeği ve uyku zamanlayıcısı, açılır menüler yerine çipleri ve bölümlenmiş kontrolleri kullanır.
- Satır içi kanal yöneticisi: iç içe diyaloglar olmadan arama, sıralama, sabitleme, gruplar, notlar, kanal başına düzenleme ve tam yedekleme/geri yükleme.
- Olay başına geçiş, ses seviyesi ve önizleme düğmesiyle satır içi ses ayarları.
- Teşhiste kalite taraması: oynatıcı menüsünü açar, mevcut kaliteleri kaydeder ve tekrar kapatır.
- Kısayol tuşları artık herhangi bir klavye düzeninde çalışıyor (fiziksel tuşlarla eşleştiriliyorlar).
- Açık Kick sekmeleri arasında ayarlar senkronize edilir.
- Özel renk seçicinin yanında vurgu renk örnekleri, daha yüksek bir metin ölçeği aralığı ve tercihlerin azaltıldığı hareket koruması.

### Değiştirildi

- Ayarlar daha yalın bir formatta saklanır; 1.2.x yapılandırması, kısayol tuşları ve animasyon seçenekleri otomatik olarak taşınır.
- Oynatma hızı yalnızca 1×'den farklı olduğunda uygulanır, bu nedenle Kick'in kendi canlı kenar yakalaması artık geçersiz kılınmaz.
- Geri alma geçmişi, yerel depolamaya yazılmak yerine bellekte tutulur.
- Ses etkinlikleri, bildirimler ve kısayol tuşları tutarlı bir kontrol grubunu paylaşır.
- "Durum profili" seçicinin yerini tek tıklamayla yapılan ön ayarlar aldı.

### Sabit

- Kalite uygulandıktan sonra oynatıcı menüsünün kapatılması artık yeniden açılma riskini ortadan kaldırıyor.
- Geri dönüş kalitesi (örneğin, mevcut olmayan 1080p yerine 720p) artık bir kanal için kaydedilen tercih edilen kalitenin üzerine yazılmaz.
- Yalnızca kaliteli öğelere yapılan gerçek tıklamalar "son kullanılan" kaliteyi günceller; otomatik tıklamalar dikkate alınmaz.
- Ayarlar araması artık yazıldıktan sonra başarısız olmuyor (olay hedefi Gölge DOM'da kayboldu).
- Bir sekmede yapılan değişiklikler artık başka bir sekmedeki ayarların üzerine yazılamaz.
- Panel kısayol tuşları artık Latin olmayan düzenlerde bozulmuyor.
- Tanılama günlüğü kontrollerindeki hatalı etiketler ve Japonca alfabe başlığında başıboş Korece sözcük.
- Sekme gizliyken duraklatılmış oynatma kontrolleri ve akış senkronizasyonu duraklatılır.

### Kaldırıldı

- Kick'in oynatıcısına karşı doğrulanamayan veya kopyalanamayan özellikler: düşük gecikme süresi tercihi, boştayken oynatıcı kontrollerini gizleme ve GitHub tabanlı panel içi güncelleme kontrolü (kullanıcı komut dosyası yöneticinizin güncellemelerini veya Sürümler sayfasını kullanın).
- Aşırı tasarlanmış seçenekler: kayıtlı görünüm profilleri, bölüm gösterme/gizleme/yeniden sıralama, alternatif gezinme modları, uyumluluk ve çeviri kapsamı kontrolleri, rastgele/kaydırma/bölüm animasyonları, olay başına bildirim süreleri, kanal avatarları, grup renkleri, manuel sıralama, toplu seçim, kanal başına geçmiş ve otomatik temizleme.

### Uyumluluk

- V1.2.0 ve v1.1.0'dan güncelleme yapılırken mevcut ayarlar ve kayıtlı kanallar korunur.
- Ayarlar tarayıcıda yerel kalır; komut dosyası telemetri göndermez veya ağ isteklerinde bulunmaz.

### Bağlantılar

- [Depo](https://github.com/ebayybe/kick-stream-tweaks)
- [Yayınlar](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Sorunlar](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Orijinal kalite ve ses seviyesi yardımcısını tam oynatıcı ayarları araç setine genişletti.

### Eklendi

- Kalite, ses seviyesi, oynatma hızı ve sessiz durumu için kanal başına profiller.
- Notlar, gruplar, profil düzenleme ve içe/dışa aktarma içeren kayıtlı kanal listesi.
- Genel bir anahtar, bireysel olay anahtarları, önizlemeler ve olay başına ses seviyesi ile ses efektleri.
- Kalite değişiklikleri, geri yüklenen hacim ve başarısız eylemler için bildirimler.
- Açık kontrollere sahip bildirim geçmişi, eylem günlüğü ve teşhis araçları.
- Kalite kullanılabilirliği kontrolleri, çakışma kontrolleri ve uyumluluk kontrolleri.
- Otomatik oynatıcı değişikliklerini geçici olarak devre dışı bırakmak için güvenli mod.
- Kısayol tuşları, panel sürükleme, paneli yeniden boyutlandırma ve orta panel eylemi.
- Kick ve Minimal panel stilleri, kompakt düzen ve animasyon kontrolleri.
- Uyku zamanlayıcısı, tam ekran odak modu, oynatıcının yeniden senkronizasyonu ve oynatma kontrolleri.
- Ayarların ve kanal profillerinin içe/dışa aktarımı.
- Klavyeyle gezinme, metin ölçeklendirme, ekran okuyucu duyuruları ve yüksek kontrast.
- Desteklenen 38 dil için arayüz yerelleştirmesi.

### Sabit

- Birden fazla ikincil iletişim kutusunun aynı anda görünmesi engellendi.
- Ses ayarları penceresinin üstünde görünen boş bir iletişim kutusu düzeltildi.
- Boş kaplamalar göstermek yerine boş bildirim mesajlarının göz ardı edilmesi.
- Dar panellerde ve yerelleştirilmiş düzenlerde iyileştirilmiş uzun etiket sarma.
- Bildirimlerdeki `{quality` ve `{q` yer tutucu değişimi düzeltildi.
- Panel içi sürüm etiketi güncellendi ve 1.2.0'a güncelleme karşılaştırması yapıldı.

### Uyumluluk

- V1.1.0'dan güncelleme yapılırken mevcut ayarlar korunur.
- Ayarlar tarayıcıda yerel kalır; komut dosyası telemetri göndermez.
- Güncelleme denetleyicisi en son GitHub sürüm etiketini okur ve güncellemeleri otomatik olarak yüklemez.

### Bağlantılar

- [Depo](https://github.com/ebayybe/kick-stream-tweaks)
- [Yayınlar](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Sorunlar](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Orijinal genel sürüm, Kick'teki video kalitesini ve ses düzeyini hatırlamaya, bunları otomatik olarak yeni akışlara uygulamaya ve bir F2 ayar paneli sağlamaya odaklanıyordu.
