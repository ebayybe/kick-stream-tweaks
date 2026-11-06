<div align="center">

[English](./en_CHANGELOG.md) · [العربية](./ar_CHANGELOG.md) · [Беларуская](./be_CHANGELOG.md) · [Български](./bg_CHANGELOG.md) · **Čeština** · [Dansk](./da_CHANGELOG.md) · [Deutsch](./de_CHANGELOG.md) · [Ελληνικά](./el_CHANGELOG.md) · [Español](./es_CHANGELOG.md) · [Suomi](./fi_CHANGELOG.md) · [Français](./fr_CHANGELOG.md) · [हिन्दी](./hi_CHANGELOG.md) · [English (India)](./en-in_CHANGELOG.md) · [Hrvatski](./hr_CHANGELOG.md) · [Magyar](./hu_CHANGELOG.md) · [Bahasa Indonesia](./id_CHANGELOG.md) · [Italiano](./it_CHANGELOG.md) · [日本語](./ja_CHANGELOG.md) · [한국어](./ko_CHANGELOG.md) · [Lietuvių](./lt_CHANGELOG.md) · [Latviešu](./lv_CHANGELOG.md) · [Македонски](./mk_CHANGELOG.md) · [Монгол](./mn_CHANGELOG.md) · [Bahasa Melayu](./ms_CHANGELOG.md) · [Nederlands](./nl_CHANGELOG.md) · [Norsk](./no_CHANGELOG.md) · [Polski](./pl_CHANGELOG.md) · [Português](./pt_CHANGELOG.md) · [Română](./ro_CHANGELOG.md) · [Русский](./ru_CHANGELOG.md) · [Slovenčina](./sk_CHANGELOG.md) · [Srpski](./sr_CHANGELOG.md) · [Svenska](./sv_CHANGELOG.md) · [ไทย](./th_CHANGELOG.md) · [Türkçe](./tr_CHANGELOG.md) · [Tiếng Việt](./vi_CHANGELOG.md) · [简体中文](./zh-cn_CHANGELOG.md) · [繁體中文](./zh-tw_CHANGELOG.md)
</div>

# Vylepšení Kick Stream — Changelog

Poznámky k vydání pro [Kick Stream Tweaks](https://github.com/ebayybe/kick-stream-tweaks), uživatelský skript, který si pamatuje předvolby hráče Kick a přidává konfigurovatelný ovládací panel.

## v1.3.1 — 2026-11-06

> Zpevnění rozvržení pro každý jazyk a velikost textu, skutečně výrazný styl Minimal, odměny a pomocníci s rozložením, alarm zamrznutí hráče a chytřejší výchozí jazyk.

### Přidáno

- **Alarm zamrznutí přehrávače.** Detekuje zablokovaný přehrávač nebo černou obrazovku (čas videa se pohybuje bez dekódovaných snímků), přehraje hlasitý zvuk budíku a zobrazí upozornění, i když je karta minimalizována. Nastavitelná doba detekce (5–60 s), nezávislé přepínání zvuku a testovací tlačítko.
- **Automatické vyzvednutí odměn** (ve výchozím nastavení vypnuto): otevře okno odměn, vyzvedne, co je k dispozici, znovu je zavře a vrátí se do streamu. Poklesy, které se objeví na panelu odměn, jsou také nárokovány. Obsahuje tlačítko *Nárokovat nyní*.
- **Plán odměn.** Ve výchozím nastavení skript místo dotazování čeká na Kickovo vlastní oznámení „vyžádejte si odměnu“ a nárokuje si ji ihned (s volitelným zpožděním 0–60 s). K dispozici je také plánovaný režim (každých 5–60 minut).
- **Tlačítko pro rychlý nárok.** Malé plovoucí tlačítko ve streamu, které si nárokuje odměnu jedním kliknutím. Přetáhněte jej kamkoli (pozice je zapamatována), vyberte si jeden ze čtyř vzorů (Orb, Pill, Glass, Flat), pět vestavěných ikon, velikost a neprůhlednost, volitelně jej zobrazte, pouze když je k dispozici odměna. Když se objeví Kickovo oznámení o odměně, svítí a zobrazuje tečku. Stránka nastavení má živý náhled.
- **Vaše vlastní ikona.** Nahrajte PNG, JPG, WebP, GIF nebo SVG (až 2 MB) jako ikonu tlačítka, volitelně vyplňte celé tlačítko. Obrázek je překódován na malý čtvereček a uložen pouze ve vašem prohlížeči.
- **Kolečko myši na posuvnících.** Každý posuvník lze upravit pomocí kolečka myši, když na něj umístíte, aniž byste museli posouvat panel.
- **Reference funkcí.** Nový `en_FUNCTIONS.md` dokumentuje architekturu, každé nastavení, každou funkci a části Kickovy stránky, na kterých skript závisí.
- **Ukládání kanálů s průvodcem.** Karta „Jak fungují uložené kanály“ krok za krokem, jediné tlačítko **Uložit tento kanál**, které ukládá aktuální kvalitu, hlasitost, rychlost a zvuk pro kanál, který sledujete, nápověda jedním kliknutím v Přehrávání pro neuložené kanály, potvrzovací přípitek s tlačítky *Upravit* / *Hotovo* v seznamu a přepnutím na pozastavení uložených nastavení.
- **Tiché přehrávání.** Ztiší stream bez ztlumení přehrávače, takže se nadále přehrává na kartě na pozadí. Funguje globálně a pro každý uložený kanál (v seznamu kanálů je zobrazena značka *Silent*).
- **Hledání vícejazyčných nastavení.** Vyhledávání je bez zvýraznění a odpovídá také anglickým názvům, takže zadáním `volume` najdete nastavení v jakémkoli jazyce rozhraní. Vyhledávání podle sekce nebo názvu karty zobrazí celou sekci.
- **Ovládací prvky rozvržení stránky**: skryjte chat a sbalte levé menu z panelu nebo pomocí klávesových zkratek (`Alt+C`, `Alt+S`), s možností zapamatovat si rozvržení pro každý stream.
- ** Animace ikon** pro postranní panel, ikony resetování a nápovědy s vlastním přepínačem (také součástí předvoleb animací).
- **Avatary kanálů** jsou zachyceny z Kick a zobrazeny v seznamu uložených kanálů.
- 14 akcentních barev (bylo 6).
- Dialogové okno pro potvrzení na panelu, které vypadá stejně v každém prohlížeči.

### Změněno

- **Jazyk rozhraní** se nyní při prvním spuštění řídí jazykem prohlížeče. Jakmile si jazyk vyberete, zapamatuje se. Nastavení migrovaná ze starších verzí se řídí prohlížečem, dokud není výslovně vybrán jazyk.
- Skript nyní začíná na `document-start`, takže jeho izolace klávesnice je zaregistrována před vlastními posluchači stránky.
- Řádky nastavení jsou naskládané (štítek nad ovládacím prvkem), takže text se nikdy nemůže překrývat ani ořezávat v jakémkoli jazyce, velikosti textu nebo šířce panelu. Popisky postranního panelu se zakrývají na hranicích slov.
- Výběry animací jsou přestavěny na řádky s plnou šířkou s ikonami, takže se hodí dlouhé překlady.
- Styl panelu **Minimal** je nyní plochý a čtvercový bez lesku, okraje byly nahrazeny přepážkami a výběrem stylu podtržení, takže rozdíl od **Kick** je zřejmý.
- Panel má pevnou šířku 680 px (zmenší se, aby se vešel do malých oken). Nastavení šířky panelu a úchyt pro změnu velikosti byly odstraněny, takže rozvržení jsou pro všechny stejná.
- Název animace indikátoru již neříká „zelená“, když je použita jiná barva zvýraznění.

### Opraveno

- Změna hlasitosti, ztlumení, tiché přehrávání, automatická hlasitost nebo rychlost také znovu použila kvalitu (opětovné otevření nabídky kvality a zobrazení upozornění). Tato nastavení se nyní dotýkají pouze toho, co jste změnili; kvalita se znovu použije pouze při změně nastavení kvality.
- Zadání do vyhledávání nastavení by mohlo spustit Kickovy klávesové zkratky (například Space přepnul stream na celou obrazovku). Stisky kláves uvnitř panelu se již nedostanou na stránku.
- Preferovaná hlasitost byla přepsána, když Kick po opětovném načtení resetoval přehrávač na jeho vlastních 50 % a posuvník panelu ukázal 50 %. Změny, které stránka sama provede, se nyní vrátí do vašeho uloženého svazku; pouze vaše vlastní akce jej aktualizují.
- Ořezávání a překrývání textu ve vzhledu, animacích a klávesových zkratkách (dlouhé štítky, velké velikosti textu, úzké panely, dlouhé překlady).
- Styl Minimální tiše deaktivoval nastavení rozostření pozadí; rozostření nyní funguje v obou stylech.
- Změna neprůhlednosti tlačítka rychlého nároku neaktualizovala náhled.
- Posuvníky nereagovaly na kolečko myši.
- Animační dlaždice ("Měřítko", "Pop") přetékají svými kartami.
- Potvrzení smazání profilu použilo nativní dialog prohlížeče.
- Čipy časovače spánku nebyly lokalizovány.
- Uložené kanály nezobrazovaly žádné avatary a aktuální kanál nezobrazoval žádné, dokud nebyl uložen jeho profil.

### Kompatibilita

- Stávající nastavení a uložené kanály jsou zachovány při aktualizaci z verze 1.3.0, v1.2.0 a v1.1.0.
- Skript stále neposílá žádnou telemetrii a nevytváří žádné vlastní síťové požadavky.

### Odkazy

- [Úložiště](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydání](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.3.0 — 2026-11-03

> Úplný redesign, logická struktura nastavení, přestavěný animační systém a řada oprav spolehlivosti pro automatizaci přehrávače.

### Přidáno

- Přepracovaný panel se seskupeným postranním panelem: **Přehrávač** (přehrávání, kanály, nástroje), **Upozornění** (oznámení, zvuky), **Rozhraní** (vzhled, animace, zkratky) a **Systém** (Diagnostika, data a informace).
- Nová stránka **Animace**: scéna živého náhledu, tři předvolby na jedno kliknutí (Plná, Zmenšená, Vypnuto) a samostatné výběry pro efekt otevření (Žádné, Zeslabování, Posunutí, Měřítko, Pop), efekt vznášení, animace indikátoru a rychlost.
- Rychlé předvolby pro úsporu šířky pásma, nejlepší kvalitu, tiché sledování a VOD, aplikované okamžitě.
- Kvalitní sběrač předělaný jako mřížka na třísky; rychlost, měřítko textu a časovač spánku používají čipy a segmentované ovládací prvky namísto rozevíracích seznamů.
- Inline channel manager: vyhledávání, třídění, připínání, skupiny, poznámky, editace jednotlivých kanálů a úplné zálohování/obnovení, vše bez vnořených dialogů.
- Inline nastavení zvuku s přepínačem pro jednotlivé události, hlasitostí a tlačítkem náhledu.
- Kontrola kvality v diagnostice: otevře nabídku přehrávače, zaznamená dostupné kvality a znovu ji zavře.
- Klávesové zkratky nyní fungují na libovolném rozložení klávesnice (jsou přizpůsobeny fyzické klávese).
- Synchronizace nastavení mezi otevřenými kartami Kick.
- Zvýraznění vzorníků barev vedle vlastního výběru barvy, větší rozsah měřítka textu a ochrana předvolby s omezeným pohybem.

### Změněno

- Nastavení jsou uložena ve štíhlejším formátu; konfigurace 1.2.x, klávesové zkratky a volby animace se migrují automaticky.
- Rychlost přehrávání se použije pouze tehdy, když se liší od 1×, takže Kickovo vlastní dohánění živé hrany již není přepsáno.
- Historie vracení je uchovávána v paměti namísto zapisování do místního úložiště.
- Zvukové události, oznámení a klávesové zkratky sdílejí jednu konzistentní sadu ovládacích prvků.
- Volič "Profil situace" je nahrazen předvolbami na jedno kliknutí.

### Opraveno

- Zavřením nabídky přehrávače po použití kvality již nehrozí její opětovné otevření.
- Záložní kvalita (například 720p místo nedostupného 1080p) již nepřepisuje preferovanou kvalitu uloženou pro kanál.
- Pouze skutečná kliknutí na kvalitní položky aktualizují kvalitu "naposledy použité"; automatická kliknutí jsou ignorována.
- Hledání nastavení již po zadání neselže (cíl události byl ztracen uvnitř Shadow DOM).
- Změny provedené na jedné kartě již nemohou přepsat nastavení z jiné karty.
- Klávesové zkratky panelu se již nepřerušují v rozloženích bez latinky.
- Nesprávné štítky v ovládacích prvcích protokolu diagnostiky a chybné korejské slovo v názvu japonského skriptu.
- Kontroly zastaveného přehrávání a synchronizace streamu se pozastaví, když je karta skrytá.

### Odebráno

- Funkce, které nebylo možné ověřit proti přehrávači Kick nebo jej duplikovat: preference nízké latence, skrytí ovládacích prvků přehrávače při nečinnosti a kontrola aktualizací na panelu GitHub (použijte aktualizace správce uživatelských skriptů nebo stránku Vydání).
- Přepracované možnosti: uložené profily vzhledu, zobrazení/skrytí/změna pořadí sekcí, alternativní režimy navigace, kontroly kompatibility a pokrytí překladu, animace náhodné/posouvání/sekce, trvání upozornění na událost, avatary kanálu, barvy skupin, ruční řazení, hromadný výběr, historie jednotlivých kanálů a automatické čištění.

### Kompatibilita

- Stávající nastavení a uložené kanály jsou zachovány při aktualizaci z verze 1.2.0 a v1.1.0.
- Nastavení zůstávají lokální pro prohlížeč; skript neposílá telemetrii ani nevydává síťové požadavky.

### Odkazy

- [Úložiště](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydání](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.2.0 — 2026-10-07

> Rozšíření původního pomocníka kvality a hlasitosti na úplnou sadu nástrojů pro nastavení přehrávače.

### Přidáno

- Profily pro jednotlivé kanály pro kvalitu, hlasitost, rychlost přehrávání a stav ztlumení.
- Uložený seznam kanálů s poznámkami, skupinami, úpravami profilu a importem/exportem.
- Zvukové efekty s globálním přepínačem, přepínači jednotlivých událostí, náhledy a hlasitostí jednotlivých událostí.
- Upozornění na změny kvality, obnovený objem a neúspěšné akce.
- Historie oznámení, protokol akcí a diagnostické nástroje s jasnými ovládacími prvky.
- Kontrola dostupnosti kvality, kontrola konfliktů a kontrola kompatibility.
- Nouzový režim pro dočasné zakázání automatických změn přehrávače.
- Klávesové zkratky, přetahování panelu, změna velikosti panelu a akce na středovém panelu.
- Styly panelů Kick a Minimal, kompaktní rozvržení a ovládání animace.
- Časovač vypnutí, režim ostření na celou obrazovku, resynchronizace přehrávače a ovládání přehrávání.
- Import/export nastavení a profilů kanálů.
- Navigace pomocí klávesnice, změna měřítka textu, hlášení odečítače obrazovky a vysoký kontrast.
- Lokalizace rozhraní pro 38 podporovaných jazyků.

### Opraveno

- Zabráněno zobrazení více sekundárních dialogů současně.
- Opraven prázdný dialog zobrazující se nad oknem nastavení zvuku.
- Ignorovány prázdné oznamovací zprávy místo zobrazení prázdných překryvných vrstev.
- Vylepšené balení dlouhých štítků na úzkých panelech a lokalizovaných rozvrženích.
- Opraveno nahrazení zástupných symbolů `{quality}` a `{q}` v oznámeních.
- Aktualizován štítek verze na panelu a porovnání aktualizací na 1.2.0.

### Kompatibilita

- Při aktualizaci z v1.1.0 jsou stávající nastavení zachována.
- Nastavení zůstávají lokální pro prohlížeč; skript neposílá telemetrii.
- Kontrola aktualizací čte nejnovější značku vydání GitHubu a neinstaluje aktualizace automaticky.

### Odkazy

- [Úložiště](https://github.com/ebayybe/kick-stream-tweaks)
- [Vydání](https://github.com/ebayybe/kick-stream-tweaks/releases)
- [Problémy](https://github.com/ebayybe/kick-stream-tweaks/issues)

## v1.1.0

Původní veřejná verze se zaměřila na zapamatování kvality a hlasitosti videa na Kick, jejich automatické použití na nové streamy a poskytnutí panelu nastavení F2.
